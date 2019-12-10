import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ConfiguracoesService } from '../../../shared/services/configuracoes.service';
import { UtilService } from '../../../shared/services/util.service';
import { Anamnese, Consulta, InfoConsulta, ListagemDocumentos } from '../../../shared/interface';
import { NbToastrService } from '@nebular/theme';
import { TOASTR } from '../../../shared/constants/toastr';
import { ANAMNESE } from '../../../shared/constants/anamnese';
import { FormGroup, FormControl } from '@angular/forms';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';
import { StorageService } from '../../../shared/services/storage.service';
import { AtendimentoService } from '../../../shared/services/atendimento.service';
import { EditorComponent } from '../../../shared/components';

@Component({
    selector: 'ngx-atendimento',
    templateUrl: 'atendimento.component.html',
    styleUrls: ['atendimento.component.scss']
})

export class AtendimentoComponent implements OnInit {
    public isLoading = false;
    public tempo = '00:00:00';
    public form: FormGroup;
    public formDisabled = true;
    public tabActive = 'anamnese';
    public disabledIniciarAtendimento = false;
    public menu = [
        { label: 'Anamnese', value: 'anamnese' },
        { label: 'Prescrição', value: 'prescricao' },
        { label: 'Pedidos de exames', value: 'pedidosExames' },
        { label: 'Laudos de exames', value: 'laudoExames' },
        { label: 'Atestados', value: 'atestado' }
    ];
    public lista: any;
    public consulta: InfoConsulta;
    public templates: ListagemDocumentos[];
    public templatePrescricao = null;

    @ViewChild(EditorComponent, {static: false}) editor: EditorComponent;

    constructor(
        public localStorage: LocalStorageService,
        public configuracoesService: ConfiguracoesService,
        public util: UtilService,
        private toastrService: NbToastrService,
        public recepcionistaService: RecepcionistaService,
        public storageService: StorageService,
        private atendimentoService: AtendimentoService) { }

    async ngOnInit() {
        await this.obterDadosIniciais();
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
        await this.recepcionistaService.obterConsultaId(this.storageService.storage.consulta).then(response => {
            if (response.sucesso) {
                this.consulta = response.objeto;
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
            templatePrescricao: new FormControl(null)
        });
        this.lista.forEach(e => {
            e.children.forEach(f => {
                this.addControl(f.control);
            });
        });
        this.form.get('templatePrescricao').valueChanges.subscribe(async e => {
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
        const dataAtual = moment(this.consulta.dataCadastro);
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
                this.disabledIniciarAtendimento = true;
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

    setTabActive(tab: string) {
        this.tabActive = tab;
    }

    getTemplaterPerFilter(id) {
        return this.templates.filter(e => e.tipoTemplate === id);
    }
}
