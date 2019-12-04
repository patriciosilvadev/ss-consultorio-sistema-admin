(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{NumQ:function(n,l,t){"use strict";t.r(l);var e=t("CcnG"),o=t("Xk95"),a=function(){return function(){}}(),i=t("pMnS"),u=t("jXVt"),r=t("ZYjt"),s=t("gIcY"),d=t("Ip0R"),c=t("hNE6"),m=t("8iWb"),v=t("K3WT"),g=t("ZYCi"),p=t("rj8x"),f=t("mrSG"),h=t("wd/R"),b=t("irsC"),C=t("nbXG"),y=t("vPSP"),w=function(){function n(n,l,t,e,o){this.calendarioMock=n,this.calendarioService=l,this.recepcionistaService=t,this.localStorage=e,this.toastrService=o,this.isLoading=!1,this.dataEvent=null,this.dataCalendarioDia=null,this.listagemConsultorios=[]}return n.prototype.ngOnInit=function(){return f.__awaiter(this,void 0,void 0,function(){var n=this;return f.__generator(this,function(l){switch(l.label){case 0:return this.medico=this.localStorage.getJson("login").id,this.isLoading=!0,[4,this.obterDadosIniciais()];case 1:return l.sent(),[4,this.recepcionistaService.obterConsultorios(this.medico).then(function(l){return f.__awaiter(n,void 0,void 0,function(){return f.__generator(this,function(n){switch(n.label){case 0:return l.sucesso?(this.listagemConsultorios=l.resultado,this.lugar=this.listagemConsultorios[0].idConsultorio,[4,this.obterConsulta(this.lugar)]):[3,2];case 1:return n.sent(),[3,3];case 2:this.listagemConsultorios=null,this.toastrService.show("",l.error,{status:"danger",duration:y.a.timer,position:y.a.position}),n.label=3;case 3:return[2]}})})}).catch(function(l){n.toastrService.show("",y.a.msgErroPadrao,{status:"danger",duration:y.a.timer,position:y.a.position})}).finally(function(){n.isLoading=!1})];case 2:return l.sent(),[2]}})})},n.prototype.obterConsulta=function(n){return f.__awaiter(this,void 0,void 0,function(){var l,t=this;return f.__generator(this,function(e){switch(e.label){case 0:return this.isLoading=!0,l={idMedico:this.medico,idConsultorio:n,dataInicial:h().subtract(2,"month").format("YYYY-MM-DD"),dataFinal:h().add(4,"month").format("YYYY-MM-DD")},[4,this.recepcionistaService.obterConsultas(l).then(function(n){n.sucesso?(t.data=n.objeto,t.proximoDiaUtil()):t.toastrService.show("",n.mensagens[0],{status:"danger",duration:y.a.timer,position:y.a.position})}).catch(function(n){t.data=null}).finally(function(){t.isLoading=!1})];case 1:return e.sent(),[2]}})})},n.prototype.formatarHeader=function(){return this.dataEvent?h(this.dataEvent).date()+" de\n            "+this.calendarioService.formatarMes(h(this.dataEvent).month()).extenso+" de\n            "+h(this.dataEvent).year()+",\n            "+this.calendarioService.formatarDay(h(this.dataEvent).day()).extenso:"Sem dados"},n.prototype.proximoDiaUtil=function(){if(this.data=this.data.sort(function(n,l){return h(n.data).toDate()-h(l.data).toDate()}),h().isBefore(h(this.data[this.data.length-1].data))&&!h().isAfter(h(this.data[0].data)))this.dataEvent=h.min(this.data.map(function(n){return h(n.data)})).toDate();else if(h().isBefore(h(this.data[this.data.length-1].data))&&h().isAfter(h(this.data[0].data))){var n=this.data.filter(function(n){return h(n.data).diff(h(),"days")>=0})[0];this.dataEvent=h(n.data).toDate()}else this.dataEvent=h.max(this.data.map(function(n){return h(n.data)})).toDate();this.selecionarDiaNoCalendario()},n.prototype.selecionarDiaNoCalendario=function(){var n=this;this.dataCalendarioDia=this.data.filter(function(l){return h(l.data).format("YYYY-MM-DD")===h(n.dataEvent).format("YYYY-MM-DD")})[0]},n.prototype.obterDadosIniciais=function(){return f.__awaiter(this,void 0,void 0,function(){return f.__generator(this,function(n){switch(n.label){case 0:return[4,Promise.all([this.obterStatusConsulta(),this.obterTiposAtendimento()])];case 1:return n.sent(),[2]}})})},n.prototype.obterStatusConsulta=function(){return f.__awaiter(this,void 0,void 0,function(){var n=this;return f.__generator(this,function(l){switch(l.label){case 0:return[4,this.recepcionistaService.obterStatusConsulta().then(function(l){l.sucesso?n.statusConsultas=l.objeto:n.toastrService.show("",l.mensagens[0],{status:"danger",duration:y.a.timer,position:y.a.position})})];case 1:return l.sent(),[2]}})})},n.prototype.obterTiposAtendimento=function(){return f.__awaiter(this,void 0,void 0,function(){var n=this;return f.__generator(this,function(l){switch(l.label){case 0:return[4,this.recepcionistaService.obterTiposAtendimento().then(function(l){l.sucesso?n.tiposAtendimentos=l.objeto:n.toastrService.show("",l.mensagens[0],{status:"danger",duration:y.a.timer,position:y.a.position})})];case 1:return l.sent(),[2]}})})},n.prototype.showCalendario=function(){for(var n=0,l=this.dataCalendarioDia.horarios;n<l.length;n++)if(l[n].consulta)return!0;return!1},n.prototype.obterIndexData=function(n){return this.data.map(function(n){return h(n.data).format("YYYY-MM-DD")}).indexOf(h(n).format("YYYY-MM-DD"))},n.prototype.changeDia=function(n){var l=this.obterIndexData(this.dataEvent);if("proximo"===n){if(l+1>this.data.length-1)return;this.dataCalendarioDia=this.data[l+1],this.dataEvent=h(this.data[l+1].data).toDate()}else{if(l-1<0)return;this.dataCalendarioDia=this.data[l-1],this.dataEvent=h(this.data[l-1].data).toDate()}},n}(),_=e["\u0275crt"]({encapsulation:0,styles:["nb-card-header[_ngcontent-%COMP%] {\n      align-items: center;\n\n      > h5 {\n      color: black;\n      }\n    }\n    nb-select[_ngcontent-%COMP%] {\n      min-width: 200px;\n    }\n\n    .msgError[_ngcontent-%COMP%] {\n      font-size: 15px;\n      font-weight: bold;\n    }"],data:{}});function D(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,2,"nb-option",[],[[2,"selected",null],[1,"disabled",0],[8,"tabIndex",0]],[[null,"click"],[null,"keydown.space"],[null,"keydown.enter"]],function(n,l,t){var o=!0;return"click"===l&&(o=!1!==e["\u0275nov"](n,1).onClick(t)&&o),"keydown.space"===l&&(o=!1!==e["\u0275nov"](n,1).onClick(t)&&o),"keydown.enter"===l&&(o=!1!==e["\u0275nov"](n,1).onClick(t)&&o),o},u.jb,u.K)),e["\u0275did"](1,180224,[[1,4]],0,o.Cc,[o.o,e.ElementRef,e.ChangeDetectorRef],{value:[0,"value"]},null),(n()(),e["\u0275ted"](2,0,[""," "]))],function(n,l){n(l,1,0,l.context.$implicit.idConsultorio)},function(n,l){n(l,0,0,e["\u0275nov"](l,1).selectedClass,e["\u0275nov"](l,1).disabledAttribute,e["\u0275nov"](l,1).tabindex),n(l,2,0,l.context.$implicit.nome)})}function R(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,20,"div",[["class","ml-auto d-flex"]],null,null,null,null,null)),(n()(),e["\u0275eld"](1,0,null,null,8,"div",[["class","d-flex mr-4"]],null,null,null,null,null)),(n()(),e["\u0275eld"](2,0,null,null,3,"button",[["class","mr-2"],["ghost",""],["nbButton",""],["status","primary"]],[[2,"appearance-filled",null],[2,"appearance-outline",null],[2,"appearance-ghost",null],[2,"appearance-hero",null],[2,"full-width",null],[1,"aria-disabled",0],[2,"btn-disabled",null],[1,"tabindex",0],[2,"size-tiny",null],[2,"size-small",null],[2,"size-medium",null],[2,"size-large",null],[2,"size-giant",null],[2,"status-primary",null],[2,"status-info",null],[2,"status-success",null],[2,"status-warning",null],[2,"status-danger",null],[2,"shape-rectangle",null],[2,"shape-round",null],[2,"shape-semi-round",null],[2,"icon-start",null],[2,"icon-end",null],[2,"transitions",null]],[[null,"click"]],function(n,l,t){var o=!0,a=n.component;return"click"===l&&(o=!1!==e["\u0275nov"](n,3).onClick(t)&&o),"click"===l&&(o=!1!==a.changeDia("anterior")&&o),o},u.T,u.u)),e["\u0275did"](3,4243456,null,0,o.P,[e.Renderer2,e.ElementRef,e.ChangeDetectorRef],{status:[0,"status"],ghost:[1,"ghost"]},null),(n()(),e["\u0275eld"](4,0,null,0,1,"nb-icon",[["icon","chevron-left-outline"]],[[8,"innerHTML",1],[2,"status-primary",null],[2,"status-info",null],[2,"status-success",null],[2,"status-warning",null],[2,"status-danger",null]],null,null,u.bb,u.C)),e["\u0275did"](5,638976,null,0,o.ec,[r.b,o.fc,e.ElementRef,e.Renderer2],{icon:[0,"icon"]},null),(n()(),e["\u0275eld"](6,0,null,null,3,"button",[["class","ml-2"],["ghost",""],["nbButton",""],["status","primary"]],[[2,"appearance-filled",null],[2,"appearance-outline",null],[2,"appearance-ghost",null],[2,"appearance-hero",null],[2,"full-width",null],[1,"aria-disabled",0],[2,"btn-disabled",null],[1,"tabindex",0],[2,"size-tiny",null],[2,"size-small",null],[2,"size-medium",null],[2,"size-large",null],[2,"size-giant",null],[2,"status-primary",null],[2,"status-info",null],[2,"status-success",null],[2,"status-warning",null],[2,"status-danger",null],[2,"shape-rectangle",null],[2,"shape-round",null],[2,"shape-semi-round",null],[2,"icon-start",null],[2,"icon-end",null],[2,"transitions",null]],[[null,"click"]],function(n,l,t){var o=!0,a=n.component;return"click"===l&&(o=!1!==e["\u0275nov"](n,7).onClick(t)&&o),"click"===l&&(o=!1!==a.changeDia("proximo")&&o),o},u.T,u.u)),e["\u0275did"](7,4243456,null,0,o.P,[e.Renderer2,e.ElementRef,e.ChangeDetectorRef],{status:[0,"status"],ghost:[1,"ghost"]},null),(n()(),e["\u0275eld"](8,0,null,0,1,"nb-icon",[["icon","chevron-right-outline"]],[[8,"innerHTML",1],[2,"status-primary",null],[2,"status-info",null],[2,"status-success",null],[2,"status-warning",null],[2,"status-danger",null]],null,null,u.bb,u.C)),e["\u0275did"](9,638976,null,0,o.ec,[r.b,o.fc,e.ElementRef,e.Renderer2],{icon:[0,"icon"]},null),(n()(),e["\u0275eld"](10,0,null,null,10,"nb-select",[["class","align-center"],["fullWidth",""],["placeholder","Consult\xf3rio"],["style","display: flex !important"]],[[2,"appearance-outline",null],[2,"appearance-filled",null],[2,"appearance-hero",null],[2,"full-width",null],[2,"open",null],[2,"size-tiny",null],[2,"size-small",null],[2,"size-medium",null],[2,"size-large",null],[2,"size-giant",null],[2,"status-primary",null],[2,"status-info",null],[2,"status-success",null],[2,"status-warning",null],[2,"status-danger",null],[2,"shape-rectangle",null],[2,"shape-round",null],[2,"shape-semi-round",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(n,l,t){var e=!0,o=n.component;return"ngModelChange"===l&&(e=!1!==o.obterConsulta(t)&&e),"ngModelChange"===l&&(e=!1!==(o.lugar=t)&&e),e},u.kb,u.L)),e["\u0275prd"](6144,null,o.o,null,[o.jd]),e["\u0275did"](12,5423104,null,2,o.jd,[o.k,o.Jc,e.ElementRef,o.Qc,o.de,e.ChangeDetectorRef],{fullWidth:[0,"fullWidth"],placeholder:[1,"placeholder"]},null),e["\u0275qud"](603979776,1,{options:1}),e["\u0275qud"](603979776,2,{customLabel:0}),e["\u0275prd"](1024,null,s.NG_VALUE_ACCESSOR,function(n){return[n]},[o.jd]),e["\u0275did"](16,671744,null,0,s.NgModel,[[8,null],[8,null],[8,null],[6,s.NG_VALUE_ACCESSOR]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,s.NgControl,null,[s.NgModel]),e["\u0275did"](18,16384,null,0,s.NgControlStatus,[[4,s.NgControl]],null,null),(n()(),e["\u0275and"](16777216,null,1,1,null,D)),e["\u0275did"](20,278528,null,0,d.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(n,l){var t=l.component;n(l,3,0,"primary",""),n(l,5,0,"chevron-left-outline"),n(l,7,0,"primary",""),n(l,9,0,"chevron-right-outline"),n(l,12,0,"","Consult\xf3rio"),n(l,16,0,t.lugar),n(l,20,0,t.listagemConsultorios)},function(n,l){n(l,2,1,[e["\u0275nov"](l,3).filled,e["\u0275nov"](l,3).outline,e["\u0275nov"](l,3).ghost,e["\u0275nov"](l,3).hero,e["\u0275nov"](l,3).fullWidth,e["\u0275nov"](l,3).disabled,e["\u0275nov"](l,3).disabled,e["\u0275nov"](l,3).tabbable,e["\u0275nov"](l,3).tiny,e["\u0275nov"](l,3).small,e["\u0275nov"](l,3).medium,e["\u0275nov"](l,3).large,e["\u0275nov"](l,3).giant,e["\u0275nov"](l,3).primary,e["\u0275nov"](l,3).info,e["\u0275nov"](l,3).success,e["\u0275nov"](l,3).warning,e["\u0275nov"](l,3).danger,e["\u0275nov"](l,3).rectangle,e["\u0275nov"](l,3).round,e["\u0275nov"](l,3).semiRound,e["\u0275nov"](l,3).iconLeft,e["\u0275nov"](l,3).iconRight,e["\u0275nov"](l,3).transitions]),n(l,4,0,e["\u0275nov"](l,5).html,e["\u0275nov"](l,5).primary,e["\u0275nov"](l,5).info,e["\u0275nov"](l,5).success,e["\u0275nov"](l,5).warning,e["\u0275nov"](l,5).danger),n(l,6,1,[e["\u0275nov"](l,7).filled,e["\u0275nov"](l,7).outline,e["\u0275nov"](l,7).ghost,e["\u0275nov"](l,7).hero,e["\u0275nov"](l,7).fullWidth,e["\u0275nov"](l,7).disabled,e["\u0275nov"](l,7).disabled,e["\u0275nov"](l,7).tabbable,e["\u0275nov"](l,7).tiny,e["\u0275nov"](l,7).small,e["\u0275nov"](l,7).medium,e["\u0275nov"](l,7).large,e["\u0275nov"](l,7).giant,e["\u0275nov"](l,7).primary,e["\u0275nov"](l,7).info,e["\u0275nov"](l,7).success,e["\u0275nov"](l,7).warning,e["\u0275nov"](l,7).danger,e["\u0275nov"](l,7).rectangle,e["\u0275nov"](l,7).round,e["\u0275nov"](l,7).semiRound,e["\u0275nov"](l,7).iconLeft,e["\u0275nov"](l,7).iconRight,e["\u0275nov"](l,7).transitions]),n(l,8,0,e["\u0275nov"](l,9).html,e["\u0275nov"](l,9).primary,e["\u0275nov"](l,9).info,e["\u0275nov"](l,9).success,e["\u0275nov"](l,9).warning,e["\u0275nov"](l,9).danger),n(l,10,1,[e["\u0275nov"](l,12).outline,e["\u0275nov"](l,12).filled,e["\u0275nov"](l,12).hero,e["\u0275nov"](l,12).fullWidth,e["\u0275nov"](l,12).isOpen,e["\u0275nov"](l,12).tiny,e["\u0275nov"](l,12).small,e["\u0275nov"](l,12).medium,e["\u0275nov"](l,12).large,e["\u0275nov"](l,12).giant,e["\u0275nov"](l,12).primary,e["\u0275nov"](l,12).info,e["\u0275nov"](l,12).success,e["\u0275nov"](l,12).warning,e["\u0275nov"](l,12).danger,e["\u0275nov"](l,12).rectangle,e["\u0275nov"](l,12).round,e["\u0275nov"](l,12).semiRound,e["\u0275nov"](l,18).ngClassUntouched,e["\u0275nov"](l,18).ngClassTouched,e["\u0275nov"](l,18).ngClassPristine,e["\u0275nov"](l,18).ngClassDirty,e["\u0275nov"](l,18).ngClassValid,e["\u0275nov"](l,18).ngClassInvalid,e["\u0275nov"](l,18).ngClassPending])})}function S(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"ngx-calendario-do-dia",[],null,null,null,c.b,c.a)),e["\u0275did"](1,638976,null,0,m.a,[v.a,o.fc],{data:[0,"data"],dataSelecionada:[1,"dataSelecionada"],verDiasLivre:[2,"verDiasLivre"],showHeader:[3,"showHeader"],statusConsultas:[4,"statusConsultas"],tiposAtendimentos:[5,"tiposAtendimentos"]},null)],function(n,l){var t=l.component;n(l,1,0,t.dataCalendarioDia,t.dataEvent,!1,!1,t.statusConsultas,t.tiposAtendimentos)},null)}function M(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"span",[["class","msgError"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Nenhuma Consulta marcada no dia."]))],null,null)}function x(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,4,"div",[],null,null,null,null,null)),(n()(),e["\u0275and"](16777216,null,null,1,null,S)),e["\u0275did"](2,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,M)),e["\u0275did"](4,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){var t=l.component;n(l,2,0,t.showCalendario()),n(l,4,0,!t.showCalendario())},null)}function k(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,5,"div",[],null,null,null,null,null)),(n()(),e["\u0275eld"](1,0,null,null,4,"span",[["class","msgError"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["Primeiro crie uma agenda nova clicando "])),(n()(),e["\u0275eld"](3,0,null,null,2,"a",[["routerLink","/configuracoes/agenda"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(n,l,t){var o=!0;return"click"===l&&(o=!1!==e["\u0275nov"](n,4).onClick(t.button,t.ctrlKey,t.metaKey,t.shiftKey)&&o),o},null,null)),e["\u0275did"](4,671744,null,0,g.o,[g.l,g.a,d.LocationStrategy],{routerLink:[0,"routerLink"]},null),(n()(),e["\u0275ted"](-1,null,["aqui"]))],function(n,l){n(l,4,0,"/configuracoes/agenda")},function(n,l){n(l,3,0,e["\u0275nov"](l,4).target,e["\u0275nov"](l,4).href)})}function z(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,16777216,null,null,14,"nb-card",[["nbSpinnerStatus","primary"]],[[2,"size-tiny",null],[2,"size-small",null],[2,"size-medium",null],[2,"size-large",null],[2,"size-giant",null],[2,"status-primary",null],[2,"status-info",null],[2,"status-success",null],[2,"status-warning",null],[2,"status-danger",null],[2,"accent",null],[2,"accent-primary",null],[2,"accent-info",null],[2,"accent-success",null],[2,"accent-warning",null],[2,"accent-danger",null],[2,"nb-spinner-container",null]],null,null,u.W,u.x)),e["\u0275did"](1,49152,null,0,o.nb,[],null,null),e["\u0275did"](2,81920,null,0,o.vd,[e.ViewContainerRef,e.ComponentFactoryResolver,e.Renderer2,e.ElementRef],{spinnerStatus:[0,"spinnerStatus"],nbSpinner:[1,"nbSpinner"]},null),(n()(),e["\u0275eld"](3,0,null,0,5,"nb-card-header",[["class","d-flex"]],null,null,null,u.Y,u.z)),e["\u0275did"](4,49152,null,0,o.qb,[],null,null),(n()(),e["\u0275eld"](5,0,null,0,1,"h5",[],null,null,null,null,null)),(n()(),e["\u0275ted"](6,null,["",""])),(n()(),e["\u0275and"](16777216,null,0,1,null,R)),e["\u0275did"](8,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275eld"](9,0,null,1,5,"nb-card-body",[],null,null,null,u.V,u.w)),e["\u0275did"](10,49152,null,0,o.mb,[],null,null),(n()(),e["\u0275and"](16777216,null,0,1,null,x)),e["\u0275did"](12,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),e["\u0275and"](16777216,null,0,1,null,k)),e["\u0275did"](14,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){var t=l.component;n(l,2,0,"primary",t.isLoading),n(l,8,0,t.dataEvent),n(l,12,0,t.data),n(l,14,0,!t.dataEvent)},function(n,l){var t=l.component;n(l,0,1,[e["\u0275nov"](l,1).tiny,e["\u0275nov"](l,1).small,e["\u0275nov"](l,1).medium,e["\u0275nov"](l,1).large,e["\u0275nov"](l,1).giant,e["\u0275nov"](l,1).primary,e["\u0275nov"](l,1).info,e["\u0275nov"](l,1).success,e["\u0275nov"](l,1).warning,e["\u0275nov"](l,1).danger,e["\u0275nov"](l,1).hasAccent,e["\u0275nov"](l,1).primaryAccent,e["\u0275nov"](l,1).infoAccent,e["\u0275nov"](l,1).successAccent,e["\u0275nov"](l,1).warningAccent,e["\u0275nov"](l,1).dangerAccent,e["\u0275nov"](l,2).isSpinnerExist]),n(l,6,0,t.formatarHeader())})}function E(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,2,"ngx-agenda-do-dia",[],null,null,null,z,_)),e["\u0275prd"](512,null,p.a,p.a,[]),e["\u0275did"](2,114688,null,0,w,[p.a,v.a,b.a,C.a,o.Nd],null,null)],function(n,l){n(l,2,0)},null)}var A=e["\u0275ccf"]("ngx-agenda-do-dia",w,E,{},{},[]),I=t("wDT+"),N=t("XexH"),F=t("aXbf"),L=t("vQKj"),O=t("115y"),Y=t("kEHr"),P=t("vDDV"),T=function(){function n(n,l,t,e){this.localStorage=n,this.configuracoesService=l,this.util=t,this.toastrService=e,this.isLoading=!1,this.tempo="00:00:00",this.menu=[{label:"1",value:"1"},{label:"2",value:"2"},{label:"3",value:"3"},{label:"4",value:"4"}]}return n.prototype.ngOnInit=function(){return f.__awaiter(this,void 0,void 0,function(){return f.__generator(this,function(n){switch(n.label){case 0:return[4,this.obterAnamnese()];case 1:return n.sent(),this.startCount(),[2]}})})},n.prototype.obterAnamnese=function(){return f.__awaiter(this,void 0,void 0,function(){var n,l=this;return f.__generator(this,function(t){switch(t.label){case 0:return n=this.localStorage.getJson("login").id,this.isLoading=!0,[4,this.configuracoesService.obterAnamnese(n).then(function(n){if(n.sucesso){var t=Object.keys(n.objeto);t=t.filter(function(l){return n.objeto[l]});var e=P.a;l.lista=[],e.forEach(function(n){var e=[];n.children.forEach(function(n){t.indexOf(n.control)>-1&&e.push(n)}),e.length&&l.lista.push({title:n.title,children:e})}),l.initializeForm()}else l.toastrService.show("",n.mensagens[0],{status:"danger",duration:y.a.timer,position:y.a.position})}).catch(function(n){l.toastrService.show("",y.a.msgErroPadrao,{status:"danger",duration:y.a.timer,position:y.a.position})}).finally(function(){return f.__awaiter(l,void 0,void 0,function(){var n=this;return f.__generator(this,function(l){switch(l.label){case 0:return[4,this.util.loading(400,function(){return n.isLoading=!1})];case 1:return l.sent(),[2]}})})})];case 1:return t.sent(),[2]}})})},n.prototype.initializeForm=function(){var n=this;this.form=new s.FormGroup({}),console.log(this.lista),this.lista.forEach(function(l){l.children.forEach(function(l){n.addControl(l.control)})})},n.prototype.addControl=function(n){this.form.addControl(n,new s.FormControl(null))},n.prototype.startCount=function(){var n=this,l=h();setInterval(function(){var t=h.utc(h(new Date).diff(l)).format("HH:mm:ss");n.tempo=t},1e3)},n}(),V=e["\u0275crt"]({encapsulation:0,styles:[[".title[_ngcontent-%COMP%]{font-size:20px}.tempo[_ngcontent-%COMP%]{padding:2px 16px;background-color:#c5cee0;border-radius:6px;font-size:21px}nb-list-item[_ngcontent-%COMP%]:first-child{border-top:none}nb-list-item[_ngcontent-%COMP%]{border:none}nb-list-item[_ngcontent-%COMP%]:last-child{border-bottom:none}.group-form[_ngcontent-%COMP%]{margin-top:20px}.group-form[_ngcontent-%COMP%]:first-child{margin-top:0}"]],data:{}});function j(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,2,"nb-list-item",[],[[1,"role",0]],null,null,u.hb,u.I)),e["\u0275did"](1,49152,null,0,o.uc,[],null,null),(n()(),e["\u0275ted"](2,0,[" "," "]))],null,function(n,l){n(l,0,0,e["\u0275nov"](l,1).role),n(l,2,0,l.context.$implicit.label)})}function W(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,6,"nb-list-item",[["class","cursor-pointer"]],[[1,"role",0]],null,null,u.hb,u.I)),e["\u0275did"](1,49152,null,0,o.uc,[],null,null),(n()(),e["\u0275eld"](2,0,null,0,4,"ngx-input-simple",[["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],null,null,I.b,I.a)),e["\u0275did"](3,671744,null,0,s.FormControlName,[[3,s.ControlContainer],[8,null],[8,null],[8,null],[2,s["\u0275angular_packages_forms_forms_q"]]],{name:[0,"name"]},null),e["\u0275prd"](2048,null,s.NgControl,null,[s.FormControlName]),e["\u0275did"](5,114688,null,0,N.a,[[6,s.NgControl],F.a,L.a],{label:[0,"label"],type:[1,"type"],feedback:[2,"feedback"]},null),e["\u0275did"](6,16384,null,0,s.NgControlStatus,[[4,s.NgControl]],null,null)],function(n,l){n(l,3,0,l.context.$implicit.control),n(l,5,0,l.context.$implicit.label,"text",!1)},function(n,l){n(l,0,0,e["\u0275nov"](l,1).role),n(l,2,0,e["\u0275nov"](l,6).ngClassUntouched,e["\u0275nov"](l,6).ngClassTouched,e["\u0275nov"](l,6).ngClassPristine,e["\u0275nov"](l,6).ngClassDirty,e["\u0275nov"](l,6).ngClassValid,e["\u0275nov"](l,6).ngClassInvalid,e["\u0275nov"](l,6).ngClassPending)})}function H(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,10,"nb-card",[["class","mb-0 group-form"]],[[2,"size-tiny",null],[2,"size-small",null],[2,"size-medium",null],[2,"size-large",null],[2,"size-giant",null],[2,"status-primary",null],[2,"status-info",null],[2,"status-success",null],[2,"status-warning",null],[2,"status-danger",null],[2,"accent",null],[2,"accent-primary",null],[2,"accent-info",null],[2,"accent-success",null],[2,"accent-warning",null],[2,"accent-danger",null]],null,null,u.W,u.x)),e["\u0275did"](1,49152,null,0,o.nb,[],null,null),(n()(),e["\u0275eld"](2,0,null,0,2,"nb-card-header",[],null,null,null,u.Y,u.z)),e["\u0275did"](3,49152,null,0,o.qb,[],null,null),(n()(),e["\u0275ted"](4,0,["",""])),(n()(),e["\u0275eld"](5,0,null,1,5,"nb-card-body",[],null,null,null,u.V,u.w)),e["\u0275did"](6,49152,null,0,o.mb,[],null,null),(n()(),e["\u0275eld"](7,0,null,0,3,"nb-list",[],[[1,"role",0]],null,null,u.gb,u.H)),e["\u0275did"](8,49152,null,0,o.tc,[],null,null),(n()(),e["\u0275and"](16777216,null,0,1,null,W)),e["\u0275did"](10,278528,null,0,d.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(n,l){n(l,10,0,l.context.$implicit.children)},function(n,l){n(l,0,1,[e["\u0275nov"](l,1).tiny,e["\u0275nov"](l,1).small,e["\u0275nov"](l,1).medium,e["\u0275nov"](l,1).large,e["\u0275nov"](l,1).giant,e["\u0275nov"](l,1).primary,e["\u0275nov"](l,1).info,e["\u0275nov"](l,1).success,e["\u0275nov"](l,1).warning,e["\u0275nov"](l,1).danger,e["\u0275nov"](l,1).hasAccent,e["\u0275nov"](l,1).primaryAccent,e["\u0275nov"](l,1).infoAccent,e["\u0275nov"](l,1).successAccent,e["\u0275nov"](l,1).warningAccent,e["\u0275nov"](l,1).dangerAccent]),n(l,4,0,l.context.$implicit.title),n(l,7,0,e["\u0275nov"](l,8).role)})}function q(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,5,"div",[["class","col-sm-8"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(n,l,t){var o=!0;return"submit"===l&&(o=!1!==e["\u0275nov"](n,1).onSubmit(t)&&o),"reset"===l&&(o=!1!==e["\u0275nov"](n,1).onReset()&&o),o},null,null)),e["\u0275did"](1,540672,null,0,s.FormGroupDirective,[[8,null],[8,null]],{form:[0,"form"]},null),e["\u0275prd"](2048,null,s.ControlContainer,null,[s.FormGroupDirective]),e["\u0275did"](3,16384,null,0,s.NgControlStatusGroup,[[4,s.ControlContainer]],null,null),(n()(),e["\u0275and"](16777216,null,null,1,null,H)),e["\u0275did"](5,278528,null,0,d.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(n,l){var t=l.component;n(l,1,0,t.form),n(l,5,0,t.lista)},function(n,l){n(l,0,0,e["\u0275nov"](l,3).ngClassUntouched,e["\u0275nov"](l,3).ngClassTouched,e["\u0275nov"](l,3).ngClassPristine,e["\u0275nov"](l,3).ngClassDirty,e["\u0275nov"](l,3).ngClassValid,e["\u0275nov"](l,3).ngClassInvalid,e["\u0275nov"](l,3).ngClassPending)})}function G(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,16777216,null,null,22,"nb-card",[["nbSpinnerStatus","primary"]],[[2,"size-tiny",null],[2,"size-small",null],[2,"size-medium",null],[2,"size-large",null],[2,"size-giant",null],[2,"status-primary",null],[2,"status-info",null],[2,"status-success",null],[2,"status-warning",null],[2,"status-danger",null],[2,"accent",null],[2,"accent-primary",null],[2,"accent-info",null],[2,"accent-success",null],[2,"accent-warning",null],[2,"accent-danger",null],[2,"nb-spinner-container",null]],null,null,u.W,u.x)),e["\u0275did"](1,49152,null,0,o.nb,[],null,null),e["\u0275did"](2,81920,null,0,o.vd,[e.ViewContainerRef,e.ComponentFactoryResolver,e.Renderer2,e.ElementRef],{spinnerStatus:[0,"spinnerStatus"],nbSpinner:[1,"nbSpinner"]},null),(n()(),e["\u0275eld"](3,0,null,0,5,"nb-card-header",[["class","d-flex vertical-align"]],null,null,null,u.Y,u.z)),e["\u0275did"](4,49152,null,0,o.qb,[],null,null),(n()(),e["\u0275eld"](5,0,null,0,1,"div",[["class","mr-auto title"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,[" Atendimento "])),(n()(),e["\u0275eld"](7,0,null,0,1,"div",[["class","ml-auto tempo"]],null,null,null,null,null)),(n()(),e["\u0275ted"](8,null,[" "," "])),(n()(),e["\u0275eld"](9,0,null,1,13,"nb-card-body",[],null,null,null,u.V,u.w)),e["\u0275did"](10,49152,null,0,o.mb,[],null,null),(n()(),e["\u0275eld"](11,0,null,0,11,"div",[["class","row"]],null,null,null,null,null)),(n()(),e["\u0275eld"](12,0,null,null,8,"div",[["class","col-sm-4"]],null,null,null,null,null)),(n()(),e["\u0275eld"](13,0,null,null,7,"nb-card",[["class","mb-0"]],[[2,"size-tiny",null],[2,"size-small",null],[2,"size-medium",null],[2,"size-large",null],[2,"size-giant",null],[2,"status-primary",null],[2,"status-info",null],[2,"status-success",null],[2,"status-warning",null],[2,"status-danger",null],[2,"accent",null],[2,"accent-primary",null],[2,"accent-info",null],[2,"accent-success",null],[2,"accent-warning",null],[2,"accent-danger",null]],null,null,u.W,u.x)),e["\u0275did"](14,49152,null,0,o.nb,[],null,null),(n()(),e["\u0275eld"](15,0,null,1,5,"nb-card-body",[["class","p-0"]],null,null,null,u.V,u.w)),e["\u0275did"](16,49152,null,0,o.mb,[],null,null),(n()(),e["\u0275eld"](17,0,null,0,3,"nb-list",[],[[1,"role",0]],null,null,u.gb,u.H)),e["\u0275did"](18,49152,null,0,o.tc,[],null,null),(n()(),e["\u0275and"](16777216,null,0,1,null,j)),e["\u0275did"](20,278528,null,0,d.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),e["\u0275and"](16777216,null,null,1,null,q)),e["\u0275did"](22,16384,null,0,d.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){var t=l.component;n(l,2,0,"primary",t.isLoading),n(l,20,0,t.menu),n(l,22,0,t.lista)},function(n,l){var t=l.component;n(l,0,1,[e["\u0275nov"](l,1).tiny,e["\u0275nov"](l,1).small,e["\u0275nov"](l,1).medium,e["\u0275nov"](l,1).large,e["\u0275nov"](l,1).giant,e["\u0275nov"](l,1).primary,e["\u0275nov"](l,1).info,e["\u0275nov"](l,1).success,e["\u0275nov"](l,1).warning,e["\u0275nov"](l,1).danger,e["\u0275nov"](l,1).hasAccent,e["\u0275nov"](l,1).primaryAccent,e["\u0275nov"](l,1).infoAccent,e["\u0275nov"](l,1).successAccent,e["\u0275nov"](l,1).warningAccent,e["\u0275nov"](l,1).dangerAccent,e["\u0275nov"](l,2).isSpinnerExist]),n(l,8,0,t.tempo),n(l,13,1,[e["\u0275nov"](l,14).tiny,e["\u0275nov"](l,14).small,e["\u0275nov"](l,14).medium,e["\u0275nov"](l,14).large,e["\u0275nov"](l,14).giant,e["\u0275nov"](l,14).primary,e["\u0275nov"](l,14).info,e["\u0275nov"](l,14).success,e["\u0275nov"](l,14).warning,e["\u0275nov"](l,14).danger,e["\u0275nov"](l,14).hasAccent,e["\u0275nov"](l,14).primaryAccent,e["\u0275nov"](l,14).infoAccent,e["\u0275nov"](l,14).successAccent,e["\u0275nov"](l,14).warningAccent,e["\u0275nov"](l,14).dangerAccent]),n(l,17,0,e["\u0275nov"](l,18).role)})}function U(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"ngx-atendimento",[],null,null,null,G,V)),e["\u0275did"](1,114688,null,0,T,[C.a,O.a,Y.a,o.Nd],null,null)],function(n,l){n(l,1,0)},null)}var K=e["\u0275ccf"]("ngx-atendimento",T,U,{},{},[]),Q=t("eDkP"),J=t("Fzqc"),Z=t("6uYy"),B=t("4c35"),X=t("dWZg"),$=t("qAlS"),nn=t("JwYR"),ln=t("tNr7"),tn=t("kQDJ"),en=t("UoT3"),on=t("PCNd"),an=function(){return function(){}}();t.d(l,"MedicoModuleNgFactory",function(){return un});var un=e["\u0275cmf"](a,[],function(n){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,u.k,u.h,u.j,u.b,u.c,u.g,u.e,u.f,u.o,A,K,u.l]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,d.NgLocalization,d.NgLocaleLocalization,[e.LOCALE_ID,[2,d["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,s["\u0275angular_packages_forms_forms_o"],s["\u0275angular_packages_forms_forms_o"],[]),e["\u0275mpd"](4608,o.Zc,o.Zc,[g.l]),e["\u0275mpd"](4608,Q.d,Q.d,[Q.i,Q.e,e.ComponentFactoryResolver,Q.h,Q.f,e.Injector,e.NgZone,d.DOCUMENT,J.b,[2,d.Location]]),e["\u0275mpd"](5120,Q.j,Q.k,[Q.d]),e["\u0275mpd"](4608,o.id,o.id,[]),e["\u0275mpd"](4608,o.Lb,o.Bc,[e.LOCALE_ID]),e["\u0275mpd"](4608,d.DatePipe,d.DatePipe,[e.LOCALE_ID]),e["\u0275mpd"](4608,o.Z,o.Z,[o.Lb]),e["\u0275mpd"](4608,s.FormBuilder,s.FormBuilder,[]),e["\u0275mpd"](4608,o.Ub,o.Ub,[o.k,o.j,o.Qc,o.Jc,e.Injector,e.ComponentFactoryResolver]),e["\u0275mpd"](5120,Z.g,Z.f,[Z.a,Z.d]),e["\u0275mpd"](4608,Z.i,Z.i,[Z.g]),e["\u0275mpd"](1073742336,d.CommonModule,d.CommonModule,[]),e["\u0275mpd"](1073742336,s["\u0275angular_packages_forms_forms_d"],s["\u0275angular_packages_forms_forms_d"],[]),e["\u0275mpd"](1073742336,s.FormsModule,s.FormsModule,[]),e["\u0275mpd"](1073742336,g.p,g.p,[[2,g.u],[2,g.l]]),e["\u0275mpd"](1073742336,o.qe,o.qe,[]),e["\u0275mpd"](1073742336,o.qc,o.qc,[]),e["\u0275mpd"](1073742336,o.gc,o.gc,[o.fc]),e["\u0275mpd"](1073742336,o.zc,o.zc,[]),e["\u0275mpd"](1073742336,o.K,o.K,[]),e["\u0275mpd"](1073742336,o.fe,o.fe,[]),e["\u0275mpd"](1073742336,o.G,o.G,[]),e["\u0275mpd"](1073742336,J.a,J.a,[]),e["\u0275mpd"](1073742336,B.f,B.f,[]),e["\u0275mpd"](1073742336,X.b,X.b,[]),e["\u0275mpd"](1073742336,$.b,$.b,[]),e["\u0275mpd"](1073742336,Q.g,Q.g,[]),e["\u0275mpd"](1073742336,o.tb,o.tb,[]),e["\u0275mpd"](1073742336,o.sb,o.sb,[]),e["\u0275mpd"](1073742336,o.Hc,o.Hc,[]),e["\u0275mpd"](1073742336,o.Q,o.Q,[]),e["\u0275mpd"](1073742336,o.hd,o.hd,[]),e["\u0275mpd"](1073742336,o.pd,o.pd,[]),e["\u0275mpd"](1073742336,o.Ib,o.Ib,[]),e["\u0275mpd"](1073742336,nn.f,nn.f,[]),e["\u0275mpd"](1073742336,o.ic,o.ic,[]),e["\u0275mpd"](1073742336,o.rb,o.rb,[]),e["\u0275mpd"](1073742336,o.Fb,o.Fb,[]),e["\u0275mpd"](1073742336,o.ld,o.ld,[]),e["\u0275mpd"](1073742336,ln.a,ln.a,[o.fc]),e["\u0275mpd"](1073742336,o.Sb,o.Sb,[]),e["\u0275mpd"](1073742336,o.vc,o.vc,[]),e["\u0275mpd"](1073742336,o.W,o.W,[]),e["\u0275mpd"](1073742336,o.M,o.M,[]),e["\u0275mpd"](1073742336,o.hb,o.hb,[]),e["\u0275mpd"](1073742336,o.X,o.X,[]),e["\u0275mpd"](1073742336,o.Qd,o.Qd,[]),e["\u0275mpd"](1073742336,tn.CKEditorModule,tn.CKEditorModule,[]),e["\u0275mpd"](1073742336,s.ReactiveFormsModule,s.ReactiveFormsModule,[]),e["\u0275mpd"](1073742336,Z.e,Z.e,[]),e["\u0275mpd"](1073742336,en.CurrencyMaskModule,en.CurrencyMaskModule,[]),e["\u0275mpd"](1073742336,on.b,on.b,[]),e["\u0275mpd"](1073742336,an,an,[]),e["\u0275mpd"](1073742336,o.wd,o.wd,[]),e["\u0275mpd"](1073742336,a,a,[]),e["\u0275mpd"](256,o.j,{},[]),e["\u0275mpd"](256,Z.d,void 0,[]),e["\u0275mpd"](256,Z.a,Z.h,[]),e["\u0275mpd"](1024,g.j,function(){return[[{path:"",redirectTo:"agenda-do-dia",pathMatch:"full"},{path:"agenda-do-dia",component:w},{path:"atendimento",component:T}]]},[])])})}}]);