"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6884],{6884:(M,s,l)=>{l.r(s),l.d(s,{UpdateWeekPageModule:()=>U});var c=l(6895),r=l(433),t=l(4556),u=l(1407),e=l(8256),h=l(529),k=l(4465);const Z=[{path:"",component:(()=>{class o{constructor(a,n,d,i){this.http=a,this.toastService=n,this.route=d,this.router=i,this.route.params.subscribe(p=>{console.log(p),this.selectedWeekId=p._id,console.log(this.selectedWeekId)})}ngOnInit(){}updateCourse(){this.http.put(`http://localhost:3000/weeklyCourse/updateWeek/${this.selectedWeekId}`,{week:this.Week,readingmeterial:this.Readingmeterial,assignment:this.Assignment,additionalContent:this.AdditionalContent,announcement:this.Announcement,startDate:this.StartDate,endDate:this.EndDate}).subscribe(n=>{console.log(n),this.router.navigate(["/prof-course-content"])},n=>{})}}return o.\u0275fac=function(a){return new(a||o)(e.Y36(h.eN),e.Y36(k.k),e.Y36(u.gz),e.Y36(u.F0))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-update-week"]],decls:64,vars:7,consts:[[1,"ion-no-border"],["color","tertiary"],["slot","start"],["defaultHref","/prof-course-content","color","dark"],[1,"ion-padding-top"],["color","white"],["position","floating"],["placeholder","Select a week",3,"ngModel","ngModelChange"],["value","week1","color","dark"],["value","week2"],["value","week3"],["value","week4"],["value","week5"],["value","week6"],["value","week7"],["value","week8"],["value","week9"],["value","week10"],["placeholder","Enter your pdf link here",3,"ngModel","ngModelChange"],["placeholder","Give Assignment to your Students",3,"ngModel","ngModelChange"],["placeholder","Give a pdf link for addl content",3,"ngModel","ngModelChange"],["placeholder","Anounce if Something to mention",3,"ngModel","ngModelChange"],["placeholder","Select start date","type","date",3,"ngModel","ngModelChange"],["placeholder","Select End date","type","date",3,"ngModel","ngModelChange"],["size","full","color","tertiary",3,"click"]],template:function(a,n){1&a&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2),e._UZ(3,"ion-back-button",3),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"Update WeeklyCourse"),e.qZA()()(),e.TgZ(6,"ion-content",4)(7,"div",4)(8,"ion-card",5)(9,"ion-card-header",1),e._uU(10,"Weekly Course Content Details"),e.qZA(),e.TgZ(11,"ion-card-content")(12,"ion-item",5)(13,"ion-label",6),e._uU(14,"Week"),e.qZA(),e.TgZ(15,"ion-select",7),e.NdJ("ngModelChange",function(i){return n.Week=i}),e.TgZ(16,"ion-select-option",8),e._uU(17,"First Week"),e.qZA(),e.TgZ(18,"ion-select-option",9),e._uU(19,"Second Week"),e.qZA(),e.TgZ(20,"ion-select-option",10),e._uU(21,"Third Week"),e.qZA(),e.TgZ(22,"ion-select-option",11),e._uU(23,"Fourth Week"),e.qZA(),e.TgZ(24,"ion-select-option",12),e._uU(25,"Fifth Week"),e.qZA(),e.TgZ(26,"ion-select-option",13),e._uU(27,"Sixth Week"),e.qZA(),e.TgZ(28,"ion-select-option",14),e._uU(29,"Seventh Week"),e.qZA(),e.TgZ(30,"ion-select-option",15),e._uU(31,"Eighth Week"),e.qZA(),e.TgZ(32,"ion-select-option",16),e._uU(33,"Ninth Week"),e.qZA(),e.TgZ(34,"ion-select-option",17),e._uU(35,"Tenth Week"),e.qZA()()(),e.TgZ(36,"ion-item",5)(37,"ion-label",6),e._uU(38,"Reading meterial"),e.qZA(),e._UZ(39,"br"),e.TgZ(40,"ion-input",18),e.NdJ("ngModelChange",function(i){return n.Readingmeterial=i}),e.qZA()(),e.TgZ(41,"ion-item",5)(42,"ion-label",6),e._uU(43,"Assignment"),e.qZA(),e.TgZ(44,"ion-input",19),e.NdJ("ngModelChange",function(i){return n.Assignment=i}),e.qZA()(),e.TgZ(45,"ion-item",5)(46,"ion-label",6),e._uU(47,"Additional Content"),e.qZA(),e._UZ(48,"br"),e.TgZ(49,"ion-input",20),e.NdJ("ngModelChange",function(i){return n.AdditionalContent=i}),e.qZA()(),e.TgZ(50,"ion-item",5)(51,"ion-label",6),e._uU(52,"Annoncement"),e.qZA(),e.TgZ(53,"ion-input",21),e.NdJ("ngModelChange",function(i){return n.Announcement=i}),e.qZA()(),e.TgZ(54,"ion-item",5)(55,"ion-label",6),e._uU(56,"Start Date"),e.qZA(),e.TgZ(57,"ion-input",22),e.NdJ("ngModelChange",function(i){return n.StartDate=i}),e.qZA()(),e.TgZ(58,"ion-item",5)(59,"ion-label",6),e._uU(60,"End Date"),e.qZA(),e.TgZ(61,"ion-input",23),e.NdJ("ngModelChange",function(i){return n.EndDate=i}),e.qZA()(),e.TgZ(62,"ion-button",24),e.NdJ("click",function(){return n.updateCourse()}),e._uU(63,"Update Course"),e.qZA()()()()()),2&a&&(e.xp6(15),e.Q6J("ngModel",n.Week),e.xp6(25),e.Q6J("ngModel",n.Readingmeterial),e.xp6(4),e.Q6J("ngModel",n.Assignment),e.xp6(5),e.Q6J("ngModel",n.AdditionalContent),e.xp6(4),e.Q6J("ngModel",n.Announcement),e.xp6(4),e.Q6J("ngModel",n.StartDate),e.xp6(4),e.Q6J("ngModel",n.EndDate))},dependencies:[r.JJ,r.On,t.oU,t.YG,t.Sm,t.PM,t.FN,t.Zi,t.W2,t.Gu,t.pK,t.Ie,t.Q$,t.t9,t.n0,t.wd,t.sr,t.QI,t.j9,t.cs],styles:["ion-toolbar[_ngcontent-%COMP%]{border-radius:0 0 10px 10px}"]}),o})()}];let m=(()=>{class o{}return o.\u0275fac=function(a){return new(a||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[u.Bz.forChild(Z),u.Bz]}),o})(),U=(()=>{class o{}return o.\u0275fac=function(a){return new(a||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[c.ez,r.u5,t.Pc,m]}),o})()}}]);