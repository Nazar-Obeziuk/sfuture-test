import './polyfills.server.mjs';
import{B as d,C as m,F as E,H as D,I as h,K as n,L as v,P as o}from"./chunk-5IG6QJXX.mjs";import{n as l,q as p}from"./chunk-KQAQM22D.mjs";import{h as f}from"./chunk-MZKWKPOA.mjs";var I=(()=>{let s=class s{constructor(t){this.afs=t,this.planCollection=d(this.afs,"users")}getUser(t){let e=n(this.afs,`users/${t}`);return E(e,{idField:"id"})}createUserEvent(t,e){let r=n(this.afs,"users",t);return o(r,{planEvents:h(e)})}updateUserEvent(t,e,r){return f(this,null,function*(){let a=n(this.afs,"users",t),c=(yield v(a)).data(),u=c.planEvents.findIndex(x=>x.id===e);return u!==-1?(c.planEvents[u]=r,o(a,{planEvents:c.planEvents})):(console.error(`Exercise with ID ${e} not found in userExercises`),Promise.reject(`Exercise with ID ${e} not found in userExercises`))})}deleteUserEvent(t,e){let r=n(this.afs,"users",t);return o(r,{planEvents:D(e)})}};s.\u0275fac=function(e){return new(e||s)(p(m))},s.\u0275prov=l({token:s,factory:s.\u0275fac,providedIn:"root"});let i=s;return i})();export{I as a};