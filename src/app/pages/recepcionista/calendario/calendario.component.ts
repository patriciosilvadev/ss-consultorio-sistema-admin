import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NbCalendarRange, NbIconLibraries, NbDialogService, NbDatepickerComponent, NbDatepicker } from '@nebular/theme';
import * as moment from 'moment';
import { CalendarioService } from '../../../shared/services/calendarios.service';
import { CalendarioComponent } from '../../../shared/components';
import { CalendarioData } from '../../../@core/data/calendario';
import { CalendarioDoDiaComponent } from '../../../shared/components/calendario-do-dia/calendario-do-dia.component';
import { LegendasComponent } from '../legendas/legendas.component';
import { AgendarConsultaComponent } from '../agendar-consulta/agendar-consulta.component';
import { AlterarStatusComponent } from '../alterar-status/alterar-status.component';
import { DetalhesConsultaComponent } from '../detalhes-consulta/detalhes-consulta.component';
import { CalendarCustomDayCellComponent } from './day-cell.component';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';
import { BloqueioComponent } from '../bloqueio/bloqueio.component';

@Component({
  selector: 'ngx-calendario-recepcionista',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  entryComponents: [CalendarCustomDayCellComponent]
})
export class CalendarioRecepcaoComponent implements OnInit {

  public data: any[];
  public date = new Date();
  public isOpen = true;
  public range: NbCalendarRange<Date>;
  public isLoading = false;
  public dataEvent: any = null;
  public dayCellComponent = CalendarCustomDayCellComponent;
  public group: any[];
  public dataCalendarioDia: any;

  public visao = '2';
  public medico = 1;
  public lugar = 1;
  public especialidade = '1';
  public diaDe = '';
  public diaAte = '';
  public filter = (date) => false;

  @ViewChild(CalendarioComponent, { static: false }) calendario: CalendarioComponent;
  @ViewChild(CalendarioDoDiaComponent, { static: false }) calendarioDoDia: CalendarioDoDiaComponent;
  @ViewChild('ngmodelAte', { static: false }) datePicker: NbDatepickerComponent<any>;

  constructor(iconsLibrary: NbIconLibraries,
    public calendarioService: CalendarioService,
    public calendarioMock: CalendarioData,
    private dialogService: NbDialogService,
    private recepcionistaService: RecepcionistaService) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }

  async ngOnInit() {
    // this.isLoading = true;
    // const data = {
    //   idMedico: this.medico,
    //   idConsultorio: this.lugar,
    //   dataInicial: `${moment().year()}-01-01`,
    //   dataFinal: `${moment().year()}-12-31`,
    // };
    // await this.recepcionistaService.obterConsultas(data).then(response => {
    //   this.data = response.objeto;
    //   this.filter = (date) => {
    //     return this.data.map(e => moment(e.data).format('YYYY-MM-DD')).indexOf(moment(date).format('YYYY-MM-DD')) > -1;
    //   };
    //   const event = this.data.filter(e => moment(e.data).month() === moment().month());
    //   for (const e of event) {
    //     if (moment(e.data).diff(moment(), 'days') >= 0) {
    //       this.dataEvent = moment(e.data).toDate();
    //       break;
    //     }
    //   }
    //   this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
    //   this.obterGrupoHoje();
    //   this.isLoading = false;
    // });
  }

  changeDia(event) {
    this.dataEvent = moment(event).format('YYYY-MM-DD');
    this.obterGrupoClick();
    this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
  }

  async filtrar() {
    this.isLoading = true;
    const data = {
      idMedico: this.medico,
      idConsultorio: this.lugar,
      dataInicial: moment(this.diaDe).format('YYYY-MM-DD'),
      dataFinal: moment(this.diaAte).format('YYYY-MM-DD'),
    };
    await this.recepcionistaService.obterConsultas(data).then(response => {
      this.data = response.objeto;
      this.filter = (date) => {
        return this.data.map(e => moment(e.data).format('YYYY-MM-DD')).indexOf(moment(date).format('YYYY-MM-DD')) > -1;
      };
      this.proximoDiaUtil();
      this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
      this.obterGrupoHoje();
      this.isLoading = false;
    });
  }

  proximoDiaUtil() {
    this.data = this.data.sort((a: any, b: any): any => {
      return <any>moment(a.data).toDate() - <any>moment(b.data).toDate();
    });
    if (
      moment()
        .isBefore(moment(this.data[this.data.length - 1].data))
      && !moment()
        .isAfter(moment(this.data[0].data))) {
      this.dataEvent = moment.min(this.data.map(e => moment(e.data))).toDate();
    } else if (
      moment()
        .isBefore(moment(this.data[this.data.length - 1].data))
      && moment()
        .isAfter(moment(this.data[0].data))) {
      const event = this.data.filter(e => moment(e.data).diff(moment(), 'days') >= 0)[0];
      this.dataEvent = moment(event.data).toDate();
    } else {
      this.dataEvent = moment.max(this.data.map(e => moment(e.data))).toDate();
    }
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  getIconHeader() {
    return this.isOpen ? 'close-outline' : 'menu-2-outline';
  }

  changeMesPainel(type: string) {
    if (type === 'proximo') {
      const index = this.obterIndex(this.group[4].data);
      // const totalIndex = this.data.length - 1;
      // let min = 1;
      // const max = 5;
      // this.group = this.data.filter((e, ind) => {
      //   if ((index < ind) && index + 5 <= totalIndex) {
      //     const iformatado = min++;
      //     return (this.data[index + iformatado] && iformatado <= max) && (index + iformatado === ind + (min === 1 ? min : 0));
      //   } else {
      //     return false;
      //   }
      // });
      console.log(this.group);
    } else {
      const index = this.obterIndex(this.group[0].data);
      if (index === 0) {
        return;
      }
      const min = 1;
      let max = 5;
      this.group = this.data.filter((e, ind) => {
        console.log(index - 4 <= 0);
        if (index - 4 <= 0) {
          const iformatado = max--;
          console.log(iformatado);
          return (this.data[index + iformatado] && iformatado >= min);
        } else {
          return false;
        }
      });
      console.log(this.group);
    }
    // this.calendario.changeMes(type);
  }

  obterGrupoHoje() {
    const index = this.obterIndex(this.dataEvent);
    console.log(index);
    let min = 0;
    const max = 4;
    this.group = this.data.filter((e, ind) => {
      if (index <= ind) {
        const iformatado = min++;
        return (this.data[index + iformatado] && iformatado <= max) && (index + iformatado === ind);
      } else {
        return false;
      }
    });
    if (this.group.length < 5) {
      const sobra = 5 - this.group.length;
      for (let i = 1; i <= sobra; i++) {
        const indexSobra = this.obterIndex(this.group[0].data) - i;
        this.group.unshift(this.data[indexSobra]);
      }
    }
    console.log(this.group);
  }

  obterIndex(data): number {
    return this.data.map(e => moment(e.data).format('YYYY-MM-DD')).indexOf(moment(data).format('YYYY-MM-DD'));
  }

  obterGrupoClick() {
    const index = this.obterIndex(this.dataEvent);
    let min = -2;
    let max = 2;
    if (index - 2 < 0) {
      min = 0;
      max = 4;
      if (index - 1 === 0) {
        min = -1;
        max = 3;
      }
    }
    this.group = this.obterGrupo(min, max, index);
    if (this.group.length < 5) {
      const sobra = 5 - this.group.length;
      for (let i = 1; i <= sobra; i++) {
        const indexSobra = this.obterIndex(this.group[0].data) - i;
        this.group.unshift(this.data[indexSobra]);
      }

    }
    console.log(this.group);
  }

  setMinAndMaxValueAte(event) {
    this.datePicker.min = moment(event).add(1, 'month').toDate();
    this.datePicker.max = moment(event).add(1, 'year').toDate();
  }

  obterGrupo(min: number, max: number, index: number): any[] {
    return this.data.filter((e, ind) => {
      if (index - 2 <= ind) {
        const iformatado = min++;
        return (this.data[index + iformatado] && iformatado <= max) && (index + iformatado === ind);
      } else {
        return false;
      }
    });
  }

  dataSelecionada(evento) {
    this.visao = '1';
    this.dataEvent = moment(evento.diaCompleta).toDate();
    this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
    console.log(this.dataCalendarioDia);
  }

  changeDiaPainel(type: string) {
    this.calendarioDoDia.changeDia(type);
  }

  async mostrarLegendas() {
    this.dialogService.open(
      LegendasComponent,
      {
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }

  agendar(data) {
    this.dialogService.open(
      AgendarConsultaComponent,
      {
        context: {
          dados: data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }

  alterarStatus(data) {
    this.dialogService.open(
      AlterarStatusComponent,
      {
        context: {
          dados: data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }

  infoConsulta(data) {
    this.dialogService.open(
      DetalhesConsultaComponent,
      {
        context: {
          dados: data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }

  bloqueio(data) {
    this.dialogService.open(
      BloqueioComponent,
      {
        context: {
          dados: data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }
}
