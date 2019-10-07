(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{NumQ:function(n,t,e){"use strict";e.r(t);var l=e("CcnG"),a=e("Xk95"),o=function(){return function(){}}(),i=e("pMnS"),r=e("jXVt"),s=e("hNE6"),u=e("8iWb"),d=e("K3WT"),c=e("Ip0R"),p=e("gIcY"),m=e("rj8x"),f=e("mrSG"),h=e("wd/R"),g=e("irsC"),v=e("nbXG"),b=e("vPSP"),C=function(){function n(n,t,e,l,a){this.calendarioMock=n,this.calendarioService=t,this.recepcionistaService=e,this.localStorage=l,this.toastrService=a,this.isLoading=!1,this.dataEvent=null,this.dataCalendarioDia=null,this.listagemConsultorios=[]}return n.prototype.ngOnInit=function(){return f.__awaiter(this,void 0,void 0,function(){var n=this;return f.__generator(this,function(t){switch(t.label){case 0:return this.medico=this.localStorage.getJson("login").id,this.isLoading=!0,[4,this.obterDadosIniciais()];case 1:return t.sent(),[4,this.recepcionistaService.obterConsultorios(this.medico).then(function(t){return f.__awaiter(n,void 0,void 0,function(){return f.__generator(this,function(n){switch(n.label){case 0:return t.sucesso?(this.listagemConsultorios=t.resultado,this.lugar=this.listagemConsultorios[0].idConsultorio,this.lugarEscolhido=this.lugar,[4,this.obterConsulta()]):[3,2];case 1:return n.sent(),[3,3];case 2:this.listagemConsultorios=null,this.toastrService.show("",t.error,{status:"danger",duration:b.a.timer,position:b.a.position}),n.label=3;case 3:return[2]}})})}).catch(function(t){n.toastrService.show("",b.a.msgErroPadrao,{status:"danger",duration:b.a.timer,position:b.a.position})}).finally(function(){n.isLoading=!1})];case 2:return t.sent(),[2]}})})},n.prototype.obterConsulta=function(){return f.__awaiter(this,void 0,void 0,function(){var n,t=this;return f.__generator(this,function(e){switch(e.label){case 0:return this.isLoading=!0,n={idMedico:this.medico,idConsultorio:this.lugarEscolhido,dataInicial:h().subtract(1,"month").format("YYYY-MM-DD"),dataFinal:h().add(1,"month").format("YYYY-MM-DD")},[4,this.recepcionistaService.obterConsultas(n).then(function(n){n.sucesso?(t.data=n.objeto,t.proximoDiaUtil()):t.toastrService.show("",n.mensagens[0],{status:"danger",duration:b.a.timer,position:b.a.position})}).catch(function(n){t.data=null}).finally(function(){t.isLoading=!1})];case 1:return e.sent(),[2]}})})},n.prototype.changeConsultorio=function(n){this.lugarEscolhido=n},n.prototype.formatarHeader=function(){return this.dataEvent?h(this.dataEvent).date()+" de\n            "+this.calendarioService.formatarMes(h(this.dataEvent).month()).extenso+" de\n            "+h(this.dataEvent).year()+",\n            "+this.calendarioService.formatarDay(h(this.dataEvent).day()).extenso:"-"},n.prototype.proximoDiaUtil=function(){if(this.data=this.data.sort(function(n,t){return h(n.data).toDate()-h(t.data).toDate()}),h().isBefore(h(this.data[this.data.length-1].data))&&!h().isAfter(h(this.data[0].data)))this.dataEvent=h.min(this.data.map(function(n){return h(n.data)})).toDate();else if(h().isBefore(h(this.data[this.data.length-1].data))&&h().isAfter(h(this.data[0].data))){var n=this.data.filter(function(n){return h(n.data).diff(h(),"days")>=0})[0];this.dataEvent=h(n.data).toDate()}else this.dataEvent=h.max(this.data.map(function(n){return h(n.data)})).toDate();this.selecionarDiaNoCalendario()},n.prototype.selecionarDiaNoCalendario=function(){var n=this;this.dataCalendarioDia=this.data.filter(function(t){return h(t.data).format("YYYY-MM-DD")===h(n.dataEvent).format("YYYY-MM-DD")})[0]},n.prototype.obterDadosIniciais=function(){return f.__awaiter(this,void 0,void 0,function(){return f.__generator(this,function(n){switch(n.label){case 0:return[4,Promise.all([this.obterStatusConsulta(),this.obterTiposAtendimento()])];case 1:return n.sent(),[2]}})})},n.prototype.obterStatusConsulta=function(){return f.__awaiter(this,void 0,void 0,function(){var n=this;return f.__generator(this,function(t){switch(t.label){case 0:return[4,this.recepcionistaService.obterStatusConsulta().then(function(t){t.sucesso?n.statusConsultas=t.objeto:n.toastrService.show("",t.mensagens[0],{status:"danger",duration:b.a.timer,position:b.a.position})})];case 1:return t.sent(),[2]}})})},n.prototype.obterTiposAtendimento=function(){return f.__awaiter(this,void 0,void 0,function(){var n=this;return f.__generator(this,function(t){switch(t.label){case 0:return[4,this.recepcionistaService.obterTiposAtendimento().then(function(t){t.sucesso?n.tiposAtendimentos=t.objeto:n.toastrService.show("",t.mensagens[0],{status:"danger",duration:b.a.timer,position:b.a.position})})];case 1:return t.sent(),[2]}})})},n.prototype.showCalendario=function(){for(var n=0,t=this.dataCalendarioDia.horarios;n<t.length;n++)if(t[n].consulta)return!0;return!1},n}(),w=l["\u0275crt"]({encapsulation:0,styles:["nb-card-header[_ngcontent-%COMP%] {\n      align-items: center;\n\n      > h5 {\n      color: black;\n      }\n    }\n    nb-select[_ngcontent-%COMP%] {\n      min-width: 200px;\n    }\n\n    .msgError[_ngcontent-%COMP%] {\n      font-size: 15px;\n      font-weight: bold;\n    }"],data:{}});function _(n){return l["\u0275vid"](0,[(n()(),l["\u0275eld"](0,0,null,null,2,"nb-option",[],[[2,"selected",null],[1,"disabled",0],[8,"tabIndex",0]],[[null,"click"],[null,"keydown.space"],[null,"keydown.enter"]],function(n,t,e){var a=!0;return"click"===t&&(a=!1!==l["\u0275nov"](n,1).onClick(e)&&a),"keydown.space"===t&&(a=!1!==l["\u0275nov"](n,1).onClick(e)&&a),"keydown.enter"===t&&(a=!1!==l["\u0275nov"](n,1).onClick(e)&&a),a},r.jb,r.K)),l["\u0275did"](1,180224,[[1,4]],0,a.Cc,[a.o,l.ElementRef,l.ChangeDetectorRef],{value:[0,"value"]},null),(n()(),l["\u0275ted"](2,0,[""," "]))],function(n,t){n(t,1,0,t.context.$implicit.idConsultorio)},function(n,t){n(t,0,0,l["\u0275nov"](t,1).selectedClass,l["\u0275nov"](t,1).disabledAttribute,l["\u0275nov"](t,1).tabindex),n(t,2,0,t.context.$implicit.nome)})}function y(n){return l["\u0275vid"](0,[(n()(),l["\u0275eld"](0,0,null,null,1,"ngx-calendario-do-dia",[],null,null,null,s.b,s.a)),l["\u0275did"](1,638976,null,0,u.a,[d.a,a.fc],{data:[0,"data"],dataSelecionada:[1,"dataSelecionada"],verDiasLivre:[2,"verDiasLivre"],showHeader:[3,"showHeader"],statusConsultas:[4,"statusConsultas"],tiposAtendimentos:[5,"tiposAtendimentos"]},null)],function(n,t){var e=t.component;n(t,1,0,e.dataCalendarioDia,e.dataEvent,!1,!1,e.statusConsultas,e.tiposAtendimentos)},null)}function S(n){return l["\u0275vid"](0,[(n()(),l["\u0275eld"](0,0,null,null,1,"span",[["class","msgError"]],null,null,null,null,null)),(n()(),l["\u0275ted"](-1,null,["Nenhuma Consulta marcada no dia."]))],null,null)}function D(n){return l["\u0275vid"](0,[(n()(),l["\u0275eld"](0,0,null,null,5,"nb-card-body",[],null,null,null,r.V,r.w)),l["\u0275did"](1,49152,null,0,a.mb,[],null,null),(n()(),l["\u0275and"](16777216,null,0,1,null,y)),l["\u0275did"](3,16384,null,0,c.NgIf,[l.ViewContainerRef,l.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),l["\u0275and"](16777216,null,0,1,null,S)),l["\u0275did"](5,16384,null,0,c.NgIf,[l.ViewContainerRef,l.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,t){var e=t.component;n(t,3,0,e.showCalendario()),n(t,5,0,!e.showCalendario())},null)}function M(n){return l["\u0275vid"](0,[(n()(),l["\u0275eld"](0,16777216,null,null,23,"nb-card",[["nbSpinnerStatus","primary"]],[[2,"size-tiny",null],[2,"size-small",null],[2,"size-medium",null],[2,"size-large",null],[2,"size-giant",null],[2,"status-primary",null],[2,"status-info",null],[2,"status-success",null],[2,"status-warning",null],[2,"status-danger",null],[2,"accent",null],[2,"accent-primary",null],[2,"accent-info",null],[2,"accent-success",null],[2,"accent-warning",null],[2,"accent-danger",null],[2,"nb-spinner-container",null]],null,null,r.W,r.x)),l["\u0275did"](1,49152,null,0,a.nb,[],null,null),l["\u0275did"](2,81920,null,0,a.vd,[l.ViewContainerRef,l.ComponentFactoryResolver,l.Renderer2,l.ElementRef],{spinnerStatus:[0,"spinnerStatus"],nbSpinner:[1,"nbSpinner"]},null),(n()(),l["\u0275eld"](3,0,null,0,18,"nb-card-header",[["class","d-flex"]],null,null,null,r.Y,r.z)),l["\u0275did"](4,49152,null,0,a.qb,[],null,null),(n()(),l["\u0275eld"](5,0,null,0,1,"h5",[],null,null,null,null,null)),(n()(),l["\u0275ted"](6,null,["",""])),(n()(),l["\u0275eld"](7,0,null,0,14,"div",[["class","ml-auto d-flex"]],null,null,null,null,null)),(n()(),l["\u0275eld"](8,0,null,null,10,"nb-select",[["fullWidth",""],["placeholder","Consult\xf3rio"]],[[2,"appearance-outline",null],[2,"appearance-filled",null],[2,"appearance-hero",null],[2,"full-width",null],[2,"open",null],[2,"size-tiny",null],[2,"size-small",null],[2,"size-medium",null],[2,"size-large",null],[2,"size-giant",null],[2,"status-primary",null],[2,"status-info",null],[2,"status-success",null],[2,"status-warning",null],[2,"status-danger",null],[2,"shape-rectangle",null],[2,"shape-round",null],[2,"shape-semi-round",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(n,t,e){var l=!0,a=n.component;return"ngModelChange"===t&&(l=!1!==a.changeConsultorio(e)&&l),"ngModelChange"===t&&(l=!1!==(a.lugar=e)&&l),l},r.kb,r.L)),l["\u0275prd"](6144,null,a.o,null,[a.jd]),l["\u0275did"](10,5423104,null,2,a.jd,[a.k,a.Jc,l.ElementRef,a.Qc,a.de,l.ChangeDetectorRef],{fullWidth:[0,"fullWidth"],placeholder:[1,"placeholder"]},null),l["\u0275qud"](603979776,1,{options:1}),l["\u0275qud"](603979776,2,{customLabel:0}),l["\u0275prd"](1024,null,p.NG_VALUE_ACCESSOR,function(n){return[n]},[a.jd]),l["\u0275did"](14,671744,null,0,p.NgModel,[[8,null],[8,null],[8,null],[6,p.NG_VALUE_ACCESSOR]],{model:[0,"model"]},{update:"ngModelChange"}),l["\u0275prd"](2048,null,p.NgControl,null,[p.NgModel]),l["\u0275did"](16,16384,null,0,p.NgControlStatus,[[4,p.NgControl]],null,null),(n()(),l["\u0275and"](16777216,null,1,1,null,_)),l["\u0275did"](18,278528,null,0,c.NgForOf,[l.ViewContainerRef,l.TemplateRef,l.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),l["\u0275eld"](19,0,null,null,2,"button",[["class","ml-4"],["nbButton",""],["status","primary"]],[[2,"appearance-filled",null],[2,"appearance-outline",null],[2,"appearance-ghost",null],[2,"appearance-hero",null],[2,"full-width",null],[1,"aria-disabled",0],[2,"btn-disabled",null],[1,"tabindex",0],[2,"size-tiny",null],[2,"size-small",null],[2,"size-medium",null],[2,"size-large",null],[2,"size-giant",null],[2,"status-primary",null],[2,"status-info",null],[2,"status-success",null],[2,"status-warning",null],[2,"status-danger",null],[2,"shape-rectangle",null],[2,"shape-round",null],[2,"shape-semi-round",null],[2,"icon-start",null],[2,"icon-end",null],[2,"transitions",null]],[[null,"click"]],function(n,t,e){var a=!0,o=n.component;return"click"===t&&(a=!1!==l["\u0275nov"](n,20).onClick(e)&&a),"click"===t&&(a=!1!==o.obterConsulta()&&a),a},r.T,r.u)),l["\u0275did"](20,4243456,null,0,a.P,[l.Renderer2,l.ElementRef,l.ChangeDetectorRef],{status:[0,"status"]},null),(n()(),l["\u0275ted"](-1,0,["Buscar"])),(n()(),l["\u0275and"](16777216,null,1,1,null,D)),l["\u0275did"](23,16384,null,0,c.NgIf,[l.ViewContainerRef,l.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,t){var e=t.component;n(t,2,0,"primary",e.isLoading),n(t,10,0,"","Consult\xf3rio"),n(t,14,0,e.lugar),n(t,18,0,e.listagemConsultorios),n(t,20,0,"primary"),n(t,23,0,e.data)},function(n,t){var e=t.component;n(t,0,1,[l["\u0275nov"](t,1).tiny,l["\u0275nov"](t,1).small,l["\u0275nov"](t,1).medium,l["\u0275nov"](t,1).large,l["\u0275nov"](t,1).giant,l["\u0275nov"](t,1).primary,l["\u0275nov"](t,1).info,l["\u0275nov"](t,1).success,l["\u0275nov"](t,1).warning,l["\u0275nov"](t,1).danger,l["\u0275nov"](t,1).hasAccent,l["\u0275nov"](t,1).primaryAccent,l["\u0275nov"](t,1).infoAccent,l["\u0275nov"](t,1).successAccent,l["\u0275nov"](t,1).warningAccent,l["\u0275nov"](t,1).dangerAccent,l["\u0275nov"](t,2).isSpinnerExist]),n(t,6,0,e.formatarHeader()),n(t,8,1,[l["\u0275nov"](t,10).outline,l["\u0275nov"](t,10).filled,l["\u0275nov"](t,10).hero,l["\u0275nov"](t,10).fullWidth,l["\u0275nov"](t,10).isOpen,l["\u0275nov"](t,10).tiny,l["\u0275nov"](t,10).small,l["\u0275nov"](t,10).medium,l["\u0275nov"](t,10).large,l["\u0275nov"](t,10).giant,l["\u0275nov"](t,10).primary,l["\u0275nov"](t,10).info,l["\u0275nov"](t,10).success,l["\u0275nov"](t,10).warning,l["\u0275nov"](t,10).danger,l["\u0275nov"](t,10).rectangle,l["\u0275nov"](t,10).round,l["\u0275nov"](t,10).semiRound,l["\u0275nov"](t,16).ngClassUntouched,l["\u0275nov"](t,16).ngClassTouched,l["\u0275nov"](t,16).ngClassPristine,l["\u0275nov"](t,16).ngClassDirty,l["\u0275nov"](t,16).ngClassValid,l["\u0275nov"](t,16).ngClassInvalid,l["\u0275nov"](t,16).ngClassPending]),n(t,19,1,[l["\u0275nov"](t,20).filled,l["\u0275nov"](t,20).outline,l["\u0275nov"](t,20).ghost,l["\u0275nov"](t,20).hero,l["\u0275nov"](t,20).fullWidth,l["\u0275nov"](t,20).disabled,l["\u0275nov"](t,20).disabled,l["\u0275nov"](t,20).tabbable,l["\u0275nov"](t,20).tiny,l["\u0275nov"](t,20).small,l["\u0275nov"](t,20).medium,l["\u0275nov"](t,20).large,l["\u0275nov"](t,20).giant,l["\u0275nov"](t,20).primary,l["\u0275nov"](t,20).info,l["\u0275nov"](t,20).success,l["\u0275nov"](t,20).warning,l["\u0275nov"](t,20).danger,l["\u0275nov"](t,20).rectangle,l["\u0275nov"](t,20).round,l["\u0275nov"](t,20).semiRound,l["\u0275nov"](t,20).iconLeft,l["\u0275nov"](t,20).iconRight,l["\u0275nov"](t,20).transitions])})}function R(n){return l["\u0275vid"](0,[(n()(),l["\u0275eld"](0,0,null,null,2,"ngx-agenda-do-dia",[],null,null,null,M,w)),l["\u0275prd"](512,null,m.a,m.a,[]),l["\u0275did"](2,114688,null,0,C,[m.a,d.a,g.a,v.a,a.Nd],null,null)],function(n,t){n(t,2,0)},null)}var k=l["\u0275ccf"]("ngx-agenda-do-dia",C,R,{},{},[]),E=e("ZYCi"),I=e("eDkP"),L=e("Fzqc"),N=e("6uYy"),A=e("4c35"),z=e("dWZg"),Y=e("qAlS"),x=e("JwYR"),F=e("tNr7"),j=e("UoT3"),O=e("PCNd"),P=function(){return function(){}}();e.d(t,"MedicoModuleNgFactory",function(){return T});var T=l["\u0275cmf"](o,[],function(n){return l["\u0275mod"]([l["\u0275mpd"](512,l.ComponentFactoryResolver,l["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,r.k,r.h,r.j,r.b,r.c,r.g,r.e,r.f,r.o,k,r.l]],[3,l.ComponentFactoryResolver],l.NgModuleRef]),l["\u0275mpd"](4608,c.NgLocalization,c.NgLocaleLocalization,[l.LOCALE_ID,[2,c["\u0275angular_packages_common_common_a"]]]),l["\u0275mpd"](4608,p["\u0275angular_packages_forms_forms_o"],p["\u0275angular_packages_forms_forms_o"],[]),l["\u0275mpd"](4608,a.Zc,a.Zc,[E.l]),l["\u0275mpd"](4608,I.d,I.d,[I.i,I.e,l.ComponentFactoryResolver,I.h,I.f,l.Injector,l.NgZone,c.DOCUMENT,L.b,[2,c.Location]]),l["\u0275mpd"](5120,I.j,I.k,[I.d]),l["\u0275mpd"](4608,a.id,a.id,[]),l["\u0275mpd"](4608,a.Lb,a.Bc,[l.LOCALE_ID]),l["\u0275mpd"](4608,c.DatePipe,c.DatePipe,[l.LOCALE_ID]),l["\u0275mpd"](4608,a.Z,a.Z,[a.Lb]),l["\u0275mpd"](4608,p.FormBuilder,p.FormBuilder,[]),l["\u0275mpd"](4608,a.Ub,a.Ub,[a.k,a.j,a.Qc,a.Jc,l.Injector,l.ComponentFactoryResolver]),l["\u0275mpd"](5120,N.g,N.f,[N.a,N.d]),l["\u0275mpd"](4608,N.i,N.i,[N.g]),l["\u0275mpd"](1073742336,c.CommonModule,c.CommonModule,[]),l["\u0275mpd"](1073742336,p["\u0275angular_packages_forms_forms_d"],p["\u0275angular_packages_forms_forms_d"],[]),l["\u0275mpd"](1073742336,p.FormsModule,p.FormsModule,[]),l["\u0275mpd"](1073742336,E.p,E.p,[[2,E.u],[2,E.l]]),l["\u0275mpd"](1073742336,a.qe,a.qe,[]),l["\u0275mpd"](1073742336,a.qc,a.qc,[]),l["\u0275mpd"](1073742336,a.gc,a.gc,[a.fc]),l["\u0275mpd"](1073742336,a.zc,a.zc,[]),l["\u0275mpd"](1073742336,a.K,a.K,[]),l["\u0275mpd"](1073742336,a.fe,a.fe,[]),l["\u0275mpd"](1073742336,a.G,a.G,[]),l["\u0275mpd"](1073742336,L.a,L.a,[]),l["\u0275mpd"](1073742336,A.f,A.f,[]),l["\u0275mpd"](1073742336,z.b,z.b,[]),l["\u0275mpd"](1073742336,Y.b,Y.b,[]),l["\u0275mpd"](1073742336,I.g,I.g,[]),l["\u0275mpd"](1073742336,a.tb,a.tb,[]),l["\u0275mpd"](1073742336,a.sb,a.sb,[]),l["\u0275mpd"](1073742336,a.Hc,a.Hc,[]),l["\u0275mpd"](1073742336,a.Q,a.Q,[]),l["\u0275mpd"](1073742336,a.hd,a.hd,[]),l["\u0275mpd"](1073742336,a.pd,a.pd,[]),l["\u0275mpd"](1073742336,a.Ib,a.Ib,[]),l["\u0275mpd"](1073742336,x.f,x.f,[]),l["\u0275mpd"](1073742336,a.ic,a.ic,[]),l["\u0275mpd"](1073742336,a.rb,a.rb,[]),l["\u0275mpd"](1073742336,a.Fb,a.Fb,[]),l["\u0275mpd"](1073742336,a.ld,a.ld,[]),l["\u0275mpd"](1073742336,F.a,F.a,[a.fc]),l["\u0275mpd"](1073742336,a.Sb,a.Sb,[]),l["\u0275mpd"](1073742336,a.vc,a.vc,[]),l["\u0275mpd"](1073742336,a.W,a.W,[]),l["\u0275mpd"](1073742336,a.M,a.M,[]),l["\u0275mpd"](1073742336,a.hb,a.hb,[]),l["\u0275mpd"](1073742336,a.X,a.X,[]),l["\u0275mpd"](1073742336,a.Qd,a.Qd,[]),l["\u0275mpd"](1073742336,p.ReactiveFormsModule,p.ReactiveFormsModule,[]),l["\u0275mpd"](1073742336,N.e,N.e,[]),l["\u0275mpd"](1073742336,j.CurrencyMaskModule,j.CurrencyMaskModule,[]),l["\u0275mpd"](1073742336,O.b,O.b,[]),l["\u0275mpd"](1073742336,P,P,[]),l["\u0275mpd"](1073742336,a.wd,a.wd,[]),l["\u0275mpd"](1073742336,o,o,[]),l["\u0275mpd"](256,a.j,{},[]),l["\u0275mpd"](256,N.d,void 0,[]),l["\u0275mpd"](256,N.a,N.h,[]),l["\u0275mpd"](1024,E.j,function(){return[[{path:"",redirectTo:"agenda-do-dia",pathMatch:"full"},{path:"agenda-do-dia",component:C}]]},[])])})}}]);