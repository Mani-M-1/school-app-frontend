"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8606],{8606:(T,c,g)=>{g.r(c),g.d(c,{WeeklyCoursePageModule:()=>k});var _=g(6895),d=g(433),r=g(4556),C=g(1407),e=g(8256),p=g(529),h=g(4465);function m(i,u){if(1&i){const o=e.EpF();e.TgZ(0,"div")(1,"ion-card",4)(2,"ion-card-header",1),e._uU(3,"Course Content Details"),e.qZA(),e.TgZ(4,"ion-card-content")(5,"ion-item",4)(6,"ion-label",5),e._uU(7,"Week"),e.qZA(),e.TgZ(8,"ion-select",16),e.NdJ("ngModelChange",function(t){const s=e.CHM(o).index,a=e.oxw();return e.KtG(a.CourseContent[s].week=t)}),e.TgZ(9,"ion-select-option",17),e._uU(10,"First Week"),e.qZA(),e.TgZ(11,"ion-select-option",18),e._uU(12,"Second Week"),e.qZA(),e.TgZ(13,"ion-select-option",19),e._uU(14,"Third Week"),e.qZA(),e.TgZ(15,"ion-select-option",20),e._uU(16,"Fourth Week"),e.qZA(),e.TgZ(17,"ion-select-option",21),e._uU(18,"Fifth Week"),e.qZA(),e.TgZ(19,"ion-select-option",22),e._uU(20,"Sixth Week"),e.qZA(),e.TgZ(21,"ion-select-option",23),e._uU(22,"Seventh Week"),e.qZA(),e.TgZ(23,"ion-select-option",24),e._uU(24,"Eighth Week"),e.qZA(),e.TgZ(25,"ion-select-option",25),e._uU(26,"Ninth Week"),e.qZA(),e.TgZ(27,"ion-select-option",26),e._uU(28,"Tenth Week"),e.qZA()()(),e.TgZ(29,"ion-item",4)(30,"ion-label",5),e._uU(31,"Reading meterial"),e.qZA(),e._UZ(32,"br"),e.TgZ(33,"ion-input",27),e.NdJ("ngModelChange",function(t){const s=e.CHM(o).index,a=e.oxw();return e.KtG(a.CourseContent[s].readingmeterial=t)}),e.qZA()(),e.TgZ(34,"ion-item",4)(35,"ion-label",5),e._uU(36,"Assignment"),e.qZA(),e.TgZ(37,"ion-input",28),e.NdJ("ngModelChange",function(t){const s=e.CHM(o).index,a=e.oxw();return e.KtG(a.CourseContent[s].assignment=t)}),e.qZA()(),e.TgZ(38,"ion-item",4)(39,"ion-label",5),e._uU(40,"Additional Content"),e.qZA(),e._UZ(41,"br"),e.TgZ(42,"ion-input",29),e.NdJ("ngModelChange",function(t){const s=e.CHM(o).index,a=e.oxw();return e.KtG(a.CourseContent[s].additionalContent=t)}),e.qZA()(),e.TgZ(43,"ion-item",4)(44,"ion-label",5),e._uU(45,"Annoncement"),e.qZA(),e.TgZ(46,"ion-input",30),e.NdJ("ngModelChange",function(t){const s=e.CHM(o).index,a=e.oxw();return e.KtG(a.CourseContent[s].annoncement=t)}),e.qZA()(),e.TgZ(47,"ion-item",4)(48,"ion-label",5),e._uU(49,"Start Date"),e.qZA(),e.TgZ(50,"ion-input",31),e.NdJ("ngModelChange",function(t){const s=e.CHM(o).index,a=e.oxw();return e.KtG(a.CourseContent[s].startDate=t)}),e.qZA()(),e.TgZ(51,"ion-item",4)(52,"ion-label",5),e._uU(53,"End Date"),e.qZA(),e.TgZ(54,"ion-input",32),e.NdJ("ngModelChange",function(t){const s=e.CHM(o).index,a=e.oxw();return e.KtG(a.CourseContent[s].endDate=t)}),e.qZA()(),e.TgZ(55,"ion-button",33),e.NdJ("click",function(){e.CHM(o);const t=e.oxw();return e.KtG(t.SubmitCourse())}),e._uU(56,"Submit Course"),e.qZA()()()()}if(2&i){const o=u.index,n=e.oxw();e.xp6(8),e.MGl("name","week",o,""),e.Q6J("ngModel",n.CourseContent[o].week),e.xp6(25),e.MGl("name","readingmeterial",o,""),e.Q6J("ngModel",n.CourseContent[o].readingmeterial),e.xp6(4),e.MGl("name","assignment",o,""),e.Q6J("ngModel",n.CourseContent[o].assignment),e.xp6(5),e.MGl("name","additionalContent",o,""),e.Q6J("ngModel",n.CourseContent[o].additionalContent),e.xp6(4),e.MGl("name","annoncement",o,""),e.Q6J("ngModel",n.CourseContent[o].annoncement),e.xp6(4),e.MGl("name","startDate",o,""),e.Q6J("ngModel",n.CourseContent[o].startDate),e.xp6(4),e.MGl("name","endDate",o,""),e.Q6J("ngModel",n.CourseContent[o].endDate)}}const M=[{path:"",component:(()=>{class i{constructor(o,n,t,l){this.http=o,this.router=n,this.formBuilder=t,this.toastService=l,this.CourseContent=[{selectedWeek:""}]}ngOnInit(){}SubmitCourse(){console.log(this.CourseName),console.log(this.ProfessorName),console.log(this.CourseDate),console.log(this.Coursetimings),console.log(this.Accessclass),console.log(this.Discription),console.log(this.CourseImage),console.log(this.CourseContent),this.http.post("http://localhost:3000/weeklyCourse",{CourseName:this.CourseName,ProfessorName:this.ProfessorName,CourseDate:this.CourseDate,Coursetimings:this.Coursetimings,Accessclass:this.Accessclass,Discription:this.Discription,CourseImage:this.CourseImage,CourseContent:this.CourseContent}).subscribe(n=>{console.log(n),this.router.navigate(["/m-prof"])},n=>{console.log(n),this.toastService.presentToast("Please enter valid details")})}}return i.\u0275fac=function(o){return new(o||i)(e.Y36(p.eN),e.Y36(C.F0),e.Y36(d.qu),e.Y36(h.k))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-weekly-course"]],decls:40,vars:8,consts:[[1,"ion-no-border"],["color","tertiary"],["slot","start"],["defaultHref","/m-prof","color","dark"],["color","white"],["position","floating"],["placeholder","Enter your Course Name",3,"ngModel","ngModelChange"],["placeholder","Professor name",3,"ngModel","ngModelChange"],["color","white",1,"CourseDate"],["placeholder","Enter Course date","type","date",3,"ngModel","ngModelChange"],["color","white",1,"CourseTimings"],["placeholder","Enter Course time","type","time",3,"ngModel","ngModelChange"],["placeholder","Enter who can access this class",3,"ngModel","ngModelChange"],["label","Outline textarea","labelPlacement","floating","fill","outline","placeholder","Discription",3,"ngModel","ngModelChange"],["placeholder","Write image link here",3,"ngModel","ngModelChange"],[4,"ngFor","ngForOf"],["placeholder","Select a week",3,"ngModel","name","ngModelChange"],["value","week1","color","dark"],["value","week2"],["value","week3"],["value","week4"],["value","week5"],["value","week6"],["value","week7"],["value","week8"],["value","week9"],["value","week10"],["placeholder","Enter your pdf link here",3,"ngModel","name","ngModelChange"],["placeholder","Give Assignment to your Students",3,"ngModel","name","ngModelChange"],["placeholder","Give a pdf link for addl content",3,"ngModel","name","ngModelChange"],["placeholder","Anounce if Something to mention",3,"ngModel","name","ngModelChange"],["placeholder","Select start date","type","date",3,"ngModel","name","ngModelChange"],["placeholder","Select End date","type","date",3,"ngModel","name","ngModelChange"],["size","full","color","tertiary",3,"click"]],template:function(o,n){1&o&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2),e._UZ(3,"ion-back-button",3),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"Create your Weekly Course schedule here"),e.qZA()()(),e.TgZ(6,"ion-content")(7,"div")(8,"ion-card",4)(9,"ion-card-header",1),e._uU(10,"Course Details"),e.qZA(),e.TgZ(11,"ion-card-content")(12,"ion-item",4)(13,"ion-label",5),e._uU(14,"Course Name"),e.qZA(),e.TgZ(15,"ion-input",6),e.NdJ("ngModelChange",function(l){return n.CourseName=l}),e.qZA()(),e.TgZ(16,"ion-item",4)(17,"ion-label",5),e._uU(18,"Professor"),e.qZA(),e.TgZ(19,"ion-input",7),e.NdJ("ngModelChange",function(l){return n.ProfessorName=l}),e.qZA()(),e.TgZ(20,"ion-item",8)(21,"ion-label",5),e._uU(22,"Course Date"),e.qZA(),e.TgZ(23,"ion-input",9),e.NdJ("ngModelChange",function(l){return n.CourseDate=l}),e.qZA()(),e.TgZ(24,"ion-item",10)(25,"ion-label",5),e._uU(26,"Course timings"),e.qZA(),e.TgZ(27,"ion-input",11),e.NdJ("ngModelChange",function(l){return n.Coursetimings=l}),e.qZA()(),e.TgZ(28,"ion-item",4)(29,"ion-label",5),e._uU(30,"Access class"),e.qZA(),e.TgZ(31,"ion-input",12),e.NdJ("ngModelChange",function(l){return n.Accessclass=l}),e.qZA()(),e.TgZ(32,"ion-item",4)(33,"ion-textarea",13),e.NdJ("ngModelChange",function(l){return n.Discription=l}),e.qZA()(),e.TgZ(34,"ion-item",4)(35,"ion-label",5),e._uU(36,"Course Image"),e.qZA(),e._UZ(37,"br"),e.TgZ(38,"ion-input",14),e.NdJ("ngModelChange",function(l){return n.CourseImage=l}),e.qZA()()()(),e.YNc(39,m,57,14,"div",15),e.qZA()()),2&o&&(e.xp6(15),e.Q6J("ngModel",n.CourseName),e.xp6(4),e.Q6J("ngModel",n.ProfessorName),e.xp6(4),e.Q6J("ngModel",n.CourseDate),e.xp6(4),e.Q6J("ngModel",n.Coursetimings),e.xp6(4),e.Q6J("ngModel",n.Accessclass),e.xp6(2),e.Q6J("ngModel",n.Discription),e.xp6(5),e.Q6J("ngModel",n.CourseImage),e.xp6(1),e.Q6J("ngForOf",n.CourseContent))},dependencies:[_.sg,d.JJ,d.On,r.oU,r.YG,r.Sm,r.PM,r.FN,r.Zi,r.W2,r.Gu,r.pK,r.Ie,r.Q$,r.t9,r.n0,r.g2,r.wd,r.sr,r.QI,r.j9,r.cs],styles:["ion-toolbar[_ngcontent-%COMP%]{border-radius:0 0 10px 10px}ion-title[_ngcontent-%COMP%]{font-size:1.1em;padding-left:0}ion-item[_ngcontent-%COMP%]{padding:5pxpx}ion-card-header[_ngcontent-%COMP%]{font-size:1.3em;font-weight:bolder}"]}),i})()}];let Z=(()=>{class i{}return i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[C.Bz.forChild(M),C.Bz]}),i})(),k=(()=>{class i{}return i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[_.ez,d.u5,d.UX,r.Pc,Z]}),i})()}}]);