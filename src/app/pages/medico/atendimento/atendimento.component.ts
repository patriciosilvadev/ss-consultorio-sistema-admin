import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ConfiguracoesService } from '../../../shared/services/configuracoes.service';
import { UtilService } from '../../../shared/services/util.service';
import { Anamnese, Consulta, InfoConsulta, ListagemDocumentos, ConsultaAtendimento } from '../../../shared/interface';
import { NbToastrService } from '@nebular/theme';
import { TOASTR } from '../../../shared/constants/toastr';
import { ANAMNESE } from '../../../shared/constants/anamnese';
import { FormGroup, FormControl } from '@angular/forms';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';
import { StorageService } from '../../../shared/services/storage.service';
import { AtendimentoService } from '../../../shared/services/atendimento.service';
import { EditorComponent } from '../../../shared/components';
import { DomSanitizer } from '@angular/platform-browser';
import { PREVIEW } from '../../../shared/constants/pdf';
import { ActivatedRoute } from '@angular/router';
import { DocumentosEnum } from '../../../shared/enums/documentos.enum';

@Component({
    selector: 'ngx-atendimento',
    templateUrl: 'atendimento.component.html',
    styleUrls: ['atendimento.component.scss']
})

export class AtendimentoComponent implements OnInit {
    public isLoading = false;
    public isLoadingTab = false;
    public tempo = '00:00:00';
    public form: FormGroup;
    public formDisabled = true;
    public tabActive = 'anamnese';
    public atendimento: 'nao_iniciado' | 'em_andamento' = 'nao_iniciado';
    public menu = [
        { label: 'Anamnese', value: 'anamnese' },
        { label: 'Prescrição', value: 'prescricao' },
        { label: 'Pedidos de exames', value: 'pedidosExames' },
        { label: 'Laudos de exames', value: 'laudoExames' },
        { label: 'Atestados', value: 'atestado' }
    ];

    public documentos = [
        { item: 'laudoExames', id: 1, tab1: 'Novo laudo', tab2: 'Laudo emitidas', print: 'Laudo de exames' },
        { item: 'atestado', id: 2, tab1: 'Novo atestado', tab2: 'Atestados emitidos', print: 'Atestados' },
        { item: 'pedidosExames', id: 3, tab1: 'Novo pedido de exame', tab2: 'Pedido de exames emitidos', print: 'Pedidos de exames' },
        { item: 'prescricao', id: 4, tab1: 'Nova Prescrição', tab2: 'Prescrições emitidas', print: 'Prescrição' },
    ];

    public lista: any;
    public consulta: ConsultaAtendimento;
    public templates: ListagemDocumentos[];

    public listagemDocumentos: any[] = [];

    @ViewChild(EditorComponent, { static: false }) editor: EditorComponent;

    constructor(
        public localStorage: LocalStorageService,
        public configuracoesService: ConfiguracoesService,
        public util: UtilService,
        private toastrService: NbToastrService,
        public recepcionistaService: RecepcionistaService,
        public storageService: StorageService,
        private atendimentoService: AtendimentoService,
        private domSanitizer: DomSanitizer,
        private route: ActivatedRoute) { }

    async ngOnInit() {
        await this.obterDadosIniciais();
        if (this.consulta.idStatusConsulta === 4) {
            this.startCount();
            this.habilitarFormulario();
            setTimeout(() => {
                this.preencherAnamnese();
            }, 0);
        }
    }

    verificarConsulta() {
        this.atendimento = this.consulta.idStatusConsulta === 4 ? 'em_andamento' : 'nao_iniciado';
    }

    async obterDadosIniciais() {
        this.isLoading = true;
        await Promise.all([this.obterAnamnese(), this.obterConsultaId(), this.obterTemplates()]).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        }).finally(async () => {
            await this.util.loading(400, () => this.isLoading = false);
        });
    }

    async obterConsultaId(): Promise<void> {
        const id = parseInt(this.route.snapshot.paramMap.get('idConsulta'), 10);
        await this.atendimentoService.obterConsultaMedico(id).then(response => {
            if (response.sucesso) {
                this.consulta = response.objeto;
                this.verificarConsulta();
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        });
    }

    async obterAnamnese(): Promise<void> {
        const idMedico = this.localStorage.getJson('login').id;
        await this.configuracoesService.obterAnamnese(idMedico).then(response => {
            if (response.sucesso) {
                let _anamnese = Object.keys(response.objeto);
                _anamnese = _anamnese.filter(element => {
                    return response.objeto[element];
                });
                const arr = ANAMNESE;
                this.lista = [];
                arr.forEach(f => {
                    const filhos = [];
                    f.children.forEach(c => {
                        if (_anamnese.indexOf(c.control) > -1) {
                            filhos.push(c);
                        }
                    });
                    if (filhos.length) {
                        const novoObj = {
                            title: f.title,
                            children: filhos
                        };
                        this.lista.push(novoObj);
                    }
                });
                this.initializeForm();
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        });
    }

    async obterTemplates(): Promise<void> {
        const idMedico = this.localStorage.getJson('login').id;
        await this.configuracoesService.listarDocumentos(idMedico).then(response => {
            if (response.sucesso) {
                this.templates = response.objeto;
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        });
    }

    initializeForm() {
        this.form = new FormGroup({
            prescricao: new FormControl(null),
            template: new FormControl(null),
            laudoExames: new FormControl(null),
            atestado: new FormControl(null),
            pedidosExames: new FormControl(null),
        });
        this.lista.forEach(e => {
            e.children.forEach(f => {
                this.addControl(f.control);
            });
        });
        this.form.get('template').valueChanges.subscribe(async e => {
            if (!e) { return; }
            this.editor.removerTexto();
            await this.obterDocumentoFormatado(e);
        });
    }

    async obterDocumentoFormatado(idTemplate) {
        this.isLoading = true;
        const idConsulta = this.consulta.id;
        await this.atendimentoService.obterListagemUsuarios(idConsulta, idTemplate).then(response => {
            if (response.sucesso) {
                this.editor.adicionarTexto(response.objeto);
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        }).finally(() => {
            this.isLoading = false;
        });
    }

    addControl(control: string) {
        this.form.addControl(control, new FormControl({ value: null, disabled: true }));
    }

    startCount() {
        const dataAtual = moment(this.consulta.dataStatusConsulta);
        setInterval(() => {
            const tempo = moment.utc(moment(new Date()).diff(dataAtual)).format('HH:mm:ss');
            this.tempo = tempo;
        }, 1000);
    }

    habilitarFormulario() {
        this.form.enable();
        this.formDisabled = false;
    }

    async iniciarAtendimento() {
        this.isLoading = true;
        const data = {
            idStatusConsulta: 4,
            idConsulta: this.consulta.id,
            valor: null,
            formaPagamento: null
        };
        await this.recepcionistaService.alterarStatus(data).then(async response => {
            if (response.sucesso) {
                await this.obterConsultaId();
                this.startCount();
                this.habilitarFormulario();
                this.verificarConsulta();
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        }).finally(() => {
            this.isLoading = false;
        });
    }

    async finalizarAtendimento() {
        console.log('atendimento finalizado');
    }

    setTabActive(tab: string) {
        this.tabActive = tab;
    }

    getTemplaterPerFilter(id) {
        return this.templates.filter(e => e.tipoTemplate === id);
    }

    async salvarDocumento(id: number, documento: string) {
        this.editor.removerTexto();
        await this.criarTemplate(id, this.form.get(documento).value);
    }

    async criarTemplate(tipoTemplate, textoHtml) {
        this.isLoadingTab = true;
        const data = {
            idConsulta: this.consulta.id,
            tipoTemplate,
            textoHtml
        };
        await this.atendimentoService.criarTemplate(data).then(response => {
            if (response.sucesso) {
                this.toastrService.show('', 'Template criado com sucesso',
                    { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        }).finally(() => {
            this.isLoadingTab = false;
        });
    }

    getSanitazer(html) {
        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }

    printPreview(titulo: string, texto: string, type: 'print' | 'preview') {
        const popupWin = window.open('', '_blank', `width=${PREVIEW.width},height=${PREVIEW.height},location=no,left=200px`);
        popupWin.document.open();
        popupWin.document.write(`<html><title>${titulo || '-'}</title></head><body ${type === 'print' ? 'onload="window.print()"' : ''}>`);
        popupWin.document.write(texto);
        popupWin.document.write('</html>');
        popupWin.document.close();
    }

    excluirDoc(id: number, idDoc: number) {
        this.isLoadingTab = true;
        this.atendimentoService.removerTemplate(id).then(async response => {
            if (response.sucesso) {
                await this.obterConsultaId();
                this.atualizarListagemDocumentos(idDoc);
                this.toastrService.show('', 'Template removido com sucesso',
                    { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        }).finally(() => {
            this.isLoadingTab = false;
        });
    }

    async changeTab(event, idDocumento) {
        const tabValid = [
            'Laudo emitidas',
            'Atestados emitidos',
            'Pedido de exames emitidos',
            'Prescrições emitidas'
        ];
        if (tabValid.indexOf(event.tabTitle) > -1) {
            this.isLoadingTab = true;
            await this.obterConsultaId();
            this.listagemDocumentos = this.consulta.consultasTemplatesDocumentos
                .filter(e => e.tipoTemplate === idDocumento);
            this.isLoadingTab = false;
        }
    }

    atualizarListagemDocumentos(idDocumento) {
        this.listagemDocumentos = this.consulta.consultasTemplatesDocumentos
            .filter(e => e.tipoTemplate === idDocumento);
    }

    async registrarAnamnese() {
        this.isLoading = true;
        const data = {
            idConsulta: this.consulta.id,
        };
        this.lista.forEach(e => {
            e.children.forEach(f => {
                data[f.control] = this.form.get(f.control).value;
            });
        });
        await this.atendimentoService.registrarAnamnese(data).then(response => {
            if (response.sucesso) {
                this.toastrService.show('', 'Anamnese registrada com sucesso',
                    { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        }).finally(() => {
            this.isLoading = false;
        });
    }

    preencherAnamnese() {
        const arr = ANAMNESE;
        const consulta = Object.keys(this.consulta.consultaAnamnese);
        arr.forEach(e => {
            e.children.forEach(c => {
                if (consulta.indexOf(c.control) > -1, this.consulta.consultaAnamnese[c.control]) {
                    this.form.get(c.control).setValue(this.consulta.consultaAnamnese[c.control]);
                }
            });
        });
    }
}
