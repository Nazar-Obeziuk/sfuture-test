import{a as B,b as R}from"./chunk-Z74TWC33.js";import{a as W}from"./chunk-7JM5YIYR.js";import{a as L,b as G,c as K}from"./chunk-5GFXIVCV.js";import{a as J}from"./chunk-KQNCCB3Z.js";import{m as q}from"./chunk-QOQ3CAGC.js";import{$ as U,A as P,E as _,F as d,J as f,M as E,N as k,O as C,P as b,Q as w,R as o,S as r,T as h,U as y,W as x,X as p,Z as s,_ as m,ba as I,da as z,ea as D,ja as H,l as S,ma as V,o as M,ob as T,p as O,pa as $,t as g,ta as A,u}from"./chunk-RCXM74FE.js";function Z(i,e){if(i&1){let c=y();o(0,"div",4)(1,"div",5)(2,"div",6)(3,"div",7),s(4),r(),o(5,"p",8),s(6),r(),o(7,"button",9),x("click",function(){let a=g(c).$implicit,l=p();return u(l.addCoach(a))}),s(8,"Add Coach"),r()(),o(9,"div",10),h(10,"img",11),r()()()}if(i&2){let c=e.$implicit,t=p();_(4),m(c.status),_(2),m(c.name),_(),f("disabled",t.isUserCoachAdded),_(3),f("src",c.imagePath,P)}}var Q=(()=>{let e=class e{constructor(t,n,a){this.coachService=t,this.userCoachService=n,this.toastr=a,this.userCoaches=[],this.isUserCoachAdded=!1}ngOnInit(){this.getUserCoaches(),this.checkUserCoach()}getPersonalData(){let t=localStorage.getItem("currentUser");this.currentUserId=t?JSON.parse(t):void 0}getUserCoaches(){this.coachService.getAllCoaches().subscribe(t=>{this.userCoaches=t})}checkUserCoach(){localStorage.getItem("currentUser")&&(this.getPersonalData(),this.userCoachService.getOneUser(this.currentUserId.uid).subscribe(t=>{t.coaches.length===1?this.isUserCoachAdded=!0:this.isUserCoachAdded=!1}))}addCoach(t){localStorage.getItem("currentUser")?(this.getPersonalData(),this.userCoachService.setUserCoach(this.currentUserId.uid,t).then(()=>{this.toastr.success("Coach successfully added")}).catch(n=>{console.log(n)})):alert("Please sign in to your account or create one")}};e.\u0275fac=function(n){return new(n||e)(d(L),d(R),d(T))},e.\u0275cmp=M({type:e,selectors:[["app-coacher"]],standalone:!0,features:[I],decls:6,vars:0,consts:[[1,"container"],[1,"wrapper"],[1,"wrapper__main"],[1,"wrapper__main_inner"],[1,"main__inner_coach"],[1,"inner__coach_wrapper"],[1,"inner__coach_info"],[1,"coach__info_category"],[1,"coach__info_name"],["type","button",1,"coach__info_button",3,"disabled","click"],[1,"inner__coach_img"],["alt","",1,"coach__img_item",3,"src"],["class","main__inner_coach"]],template:function(n,a){n&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),b(4,Z,11,4,"div",12,C),r()()()()),n&2&&(_(4),w(a.userCoaches))},styles:[".container[_ngcontent-%COMP%]{width:590px;height:120px}.wrapper[_ngcontent-%COMP%]{width:100%;height:100%}.wrapper__main[_ngcontent-%COMP%]{width:100%;height:100%;border:1px solid #f5f5f5;border-radius:10px;overflow-x:auto;white-space:nowrap}.wrapper__main[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.wrapper__main_inner[_ngcontent-%COMP%]{width:588px;height:100%;padding:10px}.main__inner_coach[_ngcontent-%COMP%]{width:280px;height:100px;display:inline-block;margin-right:10px;-webkit-user-select:none;user-select:none}.inner__coach_img[_ngcontent-%COMP%]{width:50%;height:100%}.inner__coach_info[_ngcontent-%COMP%]{height:100%;padding:8px;display:flex;justify-content:space-between;flex-direction:column}.inner__coach_wrapper[_ngcontent-%COMP%]{width:280px;height:100px;display:flex;align-items:flex-start;justify-content:space-between;border-radius:10px;background:#9ECEFF}.coach__img_item[_ngcontent-%COMP%]{width:100%;height:100%;border-radius:0 10px 10px 0}.coach__info_name[_ngcontent-%COMP%]{color:#212121;font-size:16px;font-weight:600}.coach__info_button[_ngcontent-%COMP%]{width:84px;height:26px;background:#007EFE;border:none;border-radius:4px;color:#fff;cursor:pointer;outline:none}.coach__info_category[_ngcontent-%COMP%]{width:62px;height:20px;background:#fff;border-radius:4px;font-size:12px;font-weight:600;color:#007efe;display:flex;align-items:center;justify-content:center}@media (max-width: 440px){.container[_ngcontent-%COMP%]{max-width:100%;height:120px}.wrapper[_ngcontent-%COMP%]{width:100%;height:100%}.wrapper__main_inner[_ngcontent-%COMP%]{width:100%;padding-right:10px}}"]});let i=e;return i})();function ee(i,e){if(i&1&&(o(0,"div",15)(1,"h1",16),s(2),r(),o(3,"p",17),s(4),r()()),i&2){let c=p();_(2),U("Welcome ",c.userName,"!"),_(2),m(c.today)}}function te(i,e){if(i&1&&(o(0,"div",15)(1,"h1",16),s(2,"Welcome in SFuture!"),r(),o(3,"p",17),s(4),r()()),i&2){let c=p();_(4),m(c.today)}}function ie(i,e){if(i&1){let c=y();o(0,"button",13),x("click",function(n){g(c);let a=p();return u(a.onCategoryChange(n))}),s(1),r()}if(i&2){let c=e.$implicit;_(),m(c.name)}}function ne(i,e){i&1&&(o(0,"span"),s(1,"..."),r())}function re(i,e){if(i&1){let c=y();o(0,"div",18)(1,"div",19)(2,"div",20),s(3),r(),o(4,"div",21)(5,"h3",22),s(6),z(7,"slice"),E(8,ne,2,0,"span"),r(),o(9,"p",23),s(10),r()(),o(11,"div",24)(12,"button",25),x("click",function(){let a=g(c).$implicit,l=p(2);return u(l.addExerciseToUser(a))}),s(13,"Add Exercise"),r()()(),o(14,"div",26),h(15,"img",27),r()()}if(i&2){let c=e.$implicit;_(3),m(c.category.name),_(3),U(" ",D(7,5,c.name,0,10)," "),_(2),k(8,c.name.length>=10?8:-1),_(2),U("Duration - ",c.duration," min"),_(5),f("src",c.imagePath,P)}}function oe(i,e){if(i&1&&b(0,re,16,9,"div",28,C),i&2){let c=p();w(c.userExercises)}}function ce(i,e){i&1&&(o(0,"h3",29),s(1,"Nothing found in this category"),r())}var F=(()=>{let e=class e{constructor(t,n,a,l,v){this.exerciseService=t,this.categoryService=n,this.userExerciseService=a,this.router=l,this.toastr=v,this.userExercises=[],this.userAllCategories=[],this.isUserSignedIn=!1,this.eventSubscription=this.router.events.subscribe(j=>{j instanceof V&&(this.getAllUserExercise(),this.getAllUserCategories())})}ngOnInit(){this.getUserName(),this.getTodayDate(),this.checkIfUserSignedIn()}ngOnDestroy(){this.eventSubscription.unsubscribe()}checkIfUserSignedIn(){localStorage.getItem("currentUser")?this.isUserSignedIn=!0:this.isUserSignedIn=!1}getUserName(){let t=localStorage.getItem("currentUser"),n=t?JSON.parse(t):void 0;n&&(this.userName=n.firstName)}getTodayDate(){let t=new Date,n=t.getDate(),l=["January","February","March","April","May","June","July","August","September","October","November","December"][t.getMonth()],j=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][t.getDay()];this.today=`${n} ${j} ${l}`}getAllUserExercise(){this.exerciseService.getAllExercises().subscribe(t=>{this.userExercises=t})}getAllUserCategories(){this.categoryService.getAllCategories().subscribe(t=>{this.userAllCategories=t})}onCategoryChange(t){let n=t.target.textContent;n==="ALL"?this.exerciseService.getAllExercises().subscribe(a=>{this.userExercises=a}):this.exerciseService.getAllExercisesByCategory(n).subscribe(a=>{this.userExercises=a})}addExerciseToUser(t){if(localStorage.getItem("currentUser")){let n=localStorage.getItem("currentUser"),a=n?JSON.parse(n):void 0;this.userExerciseService.setUserExercise(a?.uid,t).then(()=>{this.toastr.success("The exercise was added")}).catch(l=>{this.toastr.error("Something went wrong"),console.log(l)})}else alert("Please sign in to your account or create one")}};e.\u0275fac=function(n){return new(n||e)(d(G),d(K),d(W),d($),d(T))},e.\u0275cmp=M({type:e,selectors:[["app-home"]],standalone:!0,features:[I],decls:26,vars:2,consts:[[1,"container"],[1,"wrapper"],[1,"wrapper__main"],["class","wrapper__main_header"],[1,"wrapper__main_blocks"],[1,"main__coach_title"],[1,"wrapper__main_shedule"],[1,"main__shedule_title"],[1,"wrapper__exercise_block"],[1,"exercise__block_inner"],[1,"exercise__block_header"],[1,"exercise__header_title"],[1,"exercise__header_scroll"],["type","button",1,"exercise__scroll_button",3,"click"],[1,"exercise__block_main"],[1,"wrapper__main_header"],[1,"main__header_title"],[1,"main__header_date"],[1,"exercise__main_item"],[1,"exercise__item_info"],[1,"item__info_category"],[1,"item__info_text"],[1,"info__text_name"],[1,"info__text_duration"],[1,"item__info_button"],["type","button",1,"info__button",3,"click"],[1,"exercise__item_banner"],["alt","",1,"item__banner_image",3,"src"],["class","exercise__main_item"],[1,"exercise__empty"],["class","exercise__scroll_button","type","button"]],template:function(n,a){n&1&&(o(0,"div",0)(1,"div",1)(2,"div",2),E(3,ee,5,2,"div",3)(4,te,5,1),o(5,"div",4)(6,"h3",5),s(7,"Choose your coach"),r(),h(8,"app-coacher"),r(),o(9,"div",6)(10,"h3",7),s(11,"Training Analytics"),r(),h(12,"app-schedule"),r()(),o(13,"div",8)(14,"div",9)(15,"div",10)(16,"h2",11),s(17,"Search exercise by category"),r()(),o(18,"div",12)(19,"button",13),x("click",function(v){return a.onCategoryChange(v)}),s(20,"ALL"),r(),b(21,ie,2,1,"button",30,C),r(),o(23,"div",14),E(24,oe,2,0)(25,ce,2,0),r()()()()()),n&2&&(_(3),k(3,a.isUserSignedIn?3:4),_(18),w(a.userAllCategories),_(3),k(24,a.userExercises.length>=1?24:25))},dependencies:[B,Q,J,q],styles:[".container[_ngcontent-%COMP%]{width:100%;padding:30px}.wrapper[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.wrapper__main[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;flex-direction:column}.wrapper__main_blocks[_ngcontent-%COMP%]{width:100%}.wrapper__exercise_block[_ngcontent-%COMP%]{width:360px;height:620px;background:#f5f5f5;border-radius:10px;padding:20px}.main__shedule_title[_ngcontent-%COMP%], .main__coach_title[_ngcontent-%COMP%]{margin-bottom:10px;color:#212121}.exercise__block_header[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center;justify-content:space-between}.exercise__block_main[_ngcontent-%COMP%]{height:510px;width:100%;display:flex;align-items:center;flex-direction:column;gap:12px;margin-top:20px;overflow:scroll}.exercise__block_main[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.exercise__header_title[_ngcontent-%COMP%]{font-size:18px;font-weight:600;color:#212121}.exercise__header_category[_ngcontent-%COMP%]{width:80px;height:32px;background:#9ECEFF;border-radius:20px;border:none;outline:none;color:#007efe;font-weight:500}.exercise__header_scroll[_ngcontent-%COMP%]{width:100%;overflow-x:auto;white-space:nowrap;margin-top:12px}.exercise__header_scroll[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.exercise__main_item[_ngcontent-%COMP%]{width:320px;height:140px;background:#fff;border-radius:10px;display:flex;align-items:center;justify-content:space-between;cursor:pointer}.exercise__item_info[_ngcontent-%COMP%]{height:100%;display:flex;align-items:flex-start;justify-content:space-between;flex-direction:column;padding:10px}.exercise__item_banner[_ngcontent-%COMP%]{width:140px;height:140px}.exercise__scroll_button[_ngcontent-%COMP%]{width:64px;height:24px;background:#007EFE;border:1px solid transparent;border-radius:20px;color:#fff;font-size:12px;margin-right:6px;transition:.4s;outline:none;cursor:pointer}.exercise__scroll_button[_ngcontent-%COMP%]:hover{background:none;border-color:#007efe;color:#007efe}.exercise__empty[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#007efe}.header__category_title[_ngcontent-%COMP%]{color:#007efe;font-weight:500;font-size:14px}.item__info_category[_ngcontent-%COMP%]{width:50px;height:20px;background:#9ECEFF;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#007efe}.item__info_text[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:center;flex-direction:column;gap:4px}.item__banner_image[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain;border-radius:10px}.info__text_name[_ngcontent-%COMP%]{font-size:20px}.info__text_duration[_ngcontent-%COMP%]{font-size:13px;color:#7e7e7e}.info__button[_ngcontent-%COMP%]{width:100px;height:30px;background:#007EFE;border-radius:4px;border:none;outline:none;cursor:pointer;font-size:14px;color:#fff}@media (max-width: 440px){.container[_ngcontent-%COMP%]{max-width:100%;padding:0;margin-top:80px}.wrapper[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center;flex-direction:column}.wrapper__main[_ngcontent-%COMP%]{width:100%;padding:0 20px;display:flex;align-items:flex-start;justify-content:space-between;flex-direction:column}.wrapper__main_blocks[_ngcontent-%COMP%]{margin-top:20px}.wrapper__main_shedule[_ngcontent-%COMP%]{width:100%;margin-top:20px}.wrapper__exercise_block[_ngcontent-%COMP%]{width:100%}.main__header_title[_ngcontent-%COMP%]{font-size:26px;color:#212121}.main__header_date[_ngcontent-%COMP%]{font-size:14px;color:#212121}.exercise__main_item[_ngcontent-%COMP%]{width:96%}.exercise__item_info[_ngcontent-%COMP%], .exercise__item_banner[_ngcontent-%COMP%]{width:50%}}@media (max-width: 440px){.info__text_name[_ngcontent-%COMP%]{font-size:18px}.info__text_duration[_ngcontent-%COMP%]{font-size:14px}}@media (max-width: 360px){.info__text_name[_ngcontent-%COMP%]{font-size:16px}.info__text_duration[_ngcontent-%COMP%]{font-size:12px}.exercise__scroll_button[_ngcontent-%COMP%]{width:58px;height:20px;font-size:11px}}"]});let i=e;return i})();var ae=[{path:"",component:F}],X=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=O({type:e}),e.\u0275inj=S({imports:[A.forChild(ae),A]});let i=e;return i})();var Pe=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=O({type:e}),e.\u0275inj=S({imports:[H,X,F]});let i=e;return i})();export{Pe as HomeModule};
