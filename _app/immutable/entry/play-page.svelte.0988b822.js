import{S as D,i as F,s as K,k as m,q as A,a as R,l as g,m as b,r as U,h as d,c as O,n as T,Y as Q,b as z,G as u,a8 as q,M as J,N as P,H as G,J as V,U as W,o as X,u as Z,a7 as $}from"../chunks/index.a8d5bdb7.js";/* empty css                     */import"../chunks/theme.33f233a9.js";import"../chunks/singletons.513e2f62.js";import{g as x}from"../chunks/navigation.b6a65b51.js";function H(n,e,a){const s=n.slice();return s[8]=e[a],s}function Y(n){let e,a=j(n[8])+"",s,_,o;return{c(){e=m("option"),s=A(a),_=R(),this.h()},l(r){e=g(r,"OPTION",{});var i=b(e);s=U(i,a),_=O(i),i.forEach(d),this.h()},h(){e.__value=o=n[8],e.value=e.__value},m(r,i){z(r,e,i),u(e,s),u(e,_)},p(r,i){i&1&&a!==(a=j(r[8])+"")&&Z(s,a),i&1&&o!==(o=r[8])&&(e.__value=o,e.value=e.__value)},d(r){r&&d(e)}}}function ee(n){let e,a,s,_,o,r,i,k,p,N,c,v,w,S,E,I=n[0],h=[];for(let t=0;t<I.length;t+=1)h[t]=Y(H(n,I,t));return{c(){e=m("main"),a=m("article"),s=m("label"),_=A(`Character
			`),o=m("select");for(let t=0;t<h.length;t+=1)h[t].c();r=R(),i=m("label"),k=A(`Spielername
			`),p=m("input"),N=R(),c=m("button"),v=A("Auswählen"),this.h()},l(t){e=g(t,"MAIN",{class:!0});var f=b(e);a=g(f,"ARTICLE",{});var l=b(a);s=g(l,"LABEL",{});var L=b(s);_=U(L,`Character
			`),o=g(L,"SELECT",{id:!0});var B=b(o);for(let C=0;C<h.length;C+=1)h[C].l(B);B.forEach(d),L.forEach(d),r=O(l),i=g(l,"LABEL",{});var y=b(i);k=U(y,`Spielername
			`),p=g(y,"INPUT",{type:!0}),y.forEach(d),N=O(l),c=g(l,"BUTTON",{});var M=b(c);v=U(M,"Auswählen"),M.forEach(d),l.forEach(d),f.forEach(d),this.h()},h(){T(o,"id","charSelector"),n[1]===void 0&&Q(()=>n[4].call(o)),T(p,"type","text"),c.disabled=w=!n[2]||n[2].length<0||!n[1]||n[1].length<0,T(e,"class","container")},m(t,f){z(t,e,f),u(e,a),u(a,s),u(s,_),u(s,o);for(let l=0;l<h.length;l+=1)h[l].m(o,null);q(o,n[1]),u(a,r),u(a,i),u(i,k),u(i,p),J(p,n[2]),u(a,N),u(a,c),u(c,v),S||(E=[P(o,"change",n[4]),P(p,"input",n[5]),P(c,"click",n[6])],S=!0)},p(t,[f]){if(f&1){I=t[0];let l;for(l=0;l<I.length;l+=1){const L=H(t,I,l);h[l]?h[l].p(L,f):(h[l]=Y(L),h[l].c(),h[l].m(o,null))}for(;l<h.length;l+=1)h[l].d(1);h.length=I.length}f&3&&q(o,t[1]),f&4&&p.value!==t[2]&&J(p,t[2]),f&7&&w!==(w=!t[2]||t[2].length<0||!t[1]||t[1].length<0)&&(c.disabled=w)},i:G,o:G,d(t){t&&d(e),V(h,t),S=!1,W(E)}}}function j(n){const e=window.localStorage.getItem("c"+n);if(e)return JSON.parse(e).name}function te(n,e,a){let s,_=[],o,r;X(()=>{s=new URLSearchParams(window.location.search),a(0,_=Array.from(window.localStorage,(c,v)=>window.localStorage.key(v)??"").filter(c=>c.length>0&&c[0]=="c").map(c=>c.slice(1)))});async function i(){if(!s||!o||!r){console.log("nope 1");return}const c=s.get("server"),v=s.get("playerId"),w=s.get("groupId");if(c&&v&&w){const S=new URLSearchParams(s);S.append("playerName",r);const E=new URL("game",document.baseURI);E.hash=o,E.search=S.toString(),x(E)}}function k(){o=$(this),a(1,o),a(0,_)}function p(){r=this.value,a(2,r)}return[_,o,r,i,k,p,()=>i()]}class re extends D{constructor(e){super(),F(this,e,te,ee,K,{})}}export{re as default};