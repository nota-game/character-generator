var Np=Object.defineProperty,Sp=Object.defineProperties;var Mp=Object.getOwnPropertyDescriptors;var ks=Object.getOwnPropertySymbols;var Tp=Object.prototype.hasOwnProperty,kp=Object.prototype.propertyIsEnumerable;var sa=(e,n,i)=>n in e?Np(e,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[n]=i,Te=(e,n)=>{for(var i in n||(n={}))Tp.call(n,i)&&sa(e,i,n[i]);if(ks)for(var i of ks(n))kp.call(n,i)&&sa(e,i,n[i]);return e},bn=(e,n)=>Sp(e,Mp(n));var at=(e,n,i)=>(sa(e,typeof n!="symbol"?n+"":n,i),i);const yn=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];function Ep(e){let n=2,i,t,r,a,c,l,u,f,o,s="";for(;n<e.length;n=n+3)i=e[n-2],t=e[n-1],r=e[n],l=yn[i>>2],a=(i&3)<<4,c=t>>4,u=yn[a|c],a=(t&15)<<2,c=r>>6,f=yn[a|c],o=yn[r&63],s+=l+u+f+o;return n===e.length?(i=e[n-2],t=e[n-1],l=yn[i>>2],u=yn[(i&3)<<4|t>>4],f=yn[(t&15)<<2],s+=l+u+f+"="):n===e.length+1&&(i=e[n-2],l=yn[i>>2],u=yn[(i&3)<<4],s+=l+u+"=="),s}const ii=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,0,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];function P5(e){const n=e.length,i=n/4*3;if(i!==(i|0))throw new Error("Input is not a valid base64 encoding.");const t=new Uint8Array(i);let r,a,c,l,u=3,f=0;for(;u<e.length;u+=4)r=ii[e.charCodeAt(u-3)],a=ii[e.charCodeAt(u-2)],c=ii[e.charCodeAt(u-1)],l=ii[e.charCodeAt(u)],(r===-1||r===void 0)&&ai(e,u-3),(a===-1||a===void 0)&&ai(e,u-2),(c===-1||c===void 0)&&ai(e,u-1),(l===-1||l===void 0)&&ai(e,u),t[f++]=r<<2|a>>4,t[f++]=a<<4|c>>2,t[f++]=c<<6|l;if(e[n-1]==="="){const o=e[n-2]==="="?2:1;return t.subarray(0,i-o)}return t}function ai(e,n){throw new Error(`Not a valid base64 string. Found "${e[n]}" at index ${n}.`)}function wr(){return wr=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e},wr.apply(this,arguments)}var Zl={epsilon:1e-12,matrix:"Matrix",number:"number",precision:64,predictable:!1,randomSeed:null};function Fe(e){return typeof e=="number"}function $e(e){return!e||typeof e!="object"||typeof e.constructor!="function"?!1:e.isBigNumber===!0&&typeof e.constructor.prototype=="object"&&e.constructor.prototype.isBigNumber===!0||typeof e.constructor.isDecimal=="function"&&e.constructor.isDecimal(e)===!0}function Mn(e){return e&&typeof e=="object"&&Object.getPrototypeOf(e).isComplex===!0||!1}function yt(e){return e&&typeof e=="object"&&Object.getPrototypeOf(e).isFraction===!0||!1}function Kt(e){return e&&e.constructor.prototype.isUnit===!0||!1}function Or(e){return typeof e=="string"}var Ze=Array.isArray;function Ce(e){return e&&e.constructor.prototype.isMatrix===!0||!1}function xt(e){return Array.isArray(e)||Ce(e)}function di(e){return e&&e.isDenseMatrix&&e.constructor.prototype.isMatrix===!0||!1}function Vn(e){return e&&e.isSparseMatrix&&e.constructor.prototype.isMatrix===!0||!1}function Bi(e){return e&&e.constructor.prototype.isRange===!0||!1}function Ut(e){return e&&e.constructor.prototype.isIndex===!0||!1}function Cp(e){return typeof e=="boolean"}function Xl(e){return e&&e.constructor.prototype.isResultSet===!0||!1}function Pa(e){return e&&e.constructor.prototype.isHelp===!0||!1}function Bp(e){return typeof e=="function"}function Lp(e){return e instanceof Date}function Dp(e){return e instanceof RegExp}function $a(e){return!!(e&&typeof e=="object"&&e.constructor===Object&&!Mn(e)&&!yt(e))}function Ip(e){return e===null}function Op(e){return e===void 0}function Gn(e){return e&&e.isAccessorNode===!0&&e.constructor.prototype.isNode===!0||!1}function Kr(e){return e&&e.isArrayNode===!0&&e.constructor.prototype.isNode===!0||!1}function zp(e){return e&&e.isAssignmentNode===!0&&e.constructor.prototype.isNode===!0||!1}function Pp(e){return e&&e.isBlockNode===!0&&e.constructor.prototype.isNode===!0||!1}function $p(e){return e&&e.isConditionalNode===!0&&e.constructor.prototype.isNode===!0||!1}function Ye(e){return e&&e.isConstantNode===!0&&e.constructor.prototype.isNode===!0||!1}function Vt(e){return e&&e.isFunctionAssignmentNode===!0&&e.constructor.prototype.isNode===!0||!1}function Hn(e){return e&&e.isFunctionNode===!0&&e.constructor.prototype.isNode===!0||!1}function wt(e){return e&&e.isIndexNode===!0&&e.constructor.prototype.isNode===!0||!1}function We(e){return e&&e.isNode===!0&&e.constructor.prototype.isNode===!0||!1}function Li(e){return e&&e.isObjectNode===!0&&e.constructor.prototype.isNode===!0||!1}function Ir(e){return e&&e.isOperatorNode===!0&&e.constructor.prototype.isNode===!0||!1}function Wt(e){return e&&e.isParenthesisNode===!0&&e.constructor.prototype.isNode===!0||!1}function _p(e){return e&&e.isRangeNode===!0&&e.constructor.prototype.isNode===!0||!1}function vr(e){return e&&e.isSymbolNode===!0&&e.constructor.prototype.isNode===!0||!1}function _a(e){return e&&e.constructor.prototype.isChain===!0||!1}function je(e){var n=typeof e;return n==="object"?e===null?"null":Array.isArray(e)?"Array":e instanceof Date?"Date":e instanceof RegExp?"RegExp":$e(e)?"BigNumber":Mn(e)?"Complex":yt(e)?"Fraction":Ce(e)?"Matrix":Kt(e)?"Unit":Ut(e)?"Index":Bi(e)?"Range":Xl(e)?"ResultSet":We(e)?e.type:_a(e)?"Chain":Pa(e)?"Help":"Object":n==="function"?"Function":n}function ke(e){var n=typeof e;if(n==="number"||n==="string"||n==="boolean"||e===null||e===void 0)return e;if(typeof e.clone=="function")return e.clone();if(Array.isArray(e))return e.map(function(i){return ke(i)});if(e instanceof Date)return new Date(e.valueOf());if($e(e))return e;if(e instanceof RegExp)throw new TypeError("Cannot clone "+e);return Fp(e,ke)}function Fp(e,n){var i={};for(var t in e)Ne(e,t)&&(i[t]=n(e[t]));return i}function Fa(e,n){for(var i in n)Ne(n,i)&&(e[i]=n[i]);return e}function $t(e,n){var i,t,r;if(Array.isArray(e)){if(!Array.isArray(n)||e.length!==n.length)return!1;for(t=0,r=e.length;t<r;t++)if(!$t(e[t],n[t]))return!1;return!0}else{if(typeof e=="function")return e===n;if(e instanceof Object){if(Array.isArray(n)||!(n instanceof Object))return!1;for(i in e)if(!(i in n)||!$t(e[i],n[i]))return!1;for(i in n)if(!(i in e))return!1;return!0}else return e===n}}function Rp(e,n,i){var t=!0,r;Object.defineProperty(e,n,{get:function(){return t&&(r=i(),t=!1),r},set:function(c){r=c,t=!1},configurable:!0,enumerable:!0})}function Ne(e,n){return e&&Object.hasOwnProperty.call(e,n)}function qp(e,n){for(var i={},t=0;t<n.length;t++){var r=n[t],a=e[r];a!==void 0&&(i[r]=a)}return i}var Kp=["Matrix","Array"],Up=["number","BigNumber","Fraction"],se=function(n){if(n)throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);return Object.freeze(Zl)};wr(se,Zl,{MATRIX_OPTIONS:Kp,NUMBER_OPTIONS:Up});var zr=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function Yl(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Vp(e){if(e.__esModule)return e;var n=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(e).forEach(function(i){var t=Object.getOwnPropertyDescriptor(e,i);Object.defineProperty(n,i,t.get?t:{enumerable:!0,get:function(){return e[i]}})}),n}var Jl={exports:{}};(function(e,n){(function(i,t){e.exports=t()})(zr,function(){function i(){return!0}function t(){return!1}function r(){}function a(){var c=[{name:"number",test:function(z){return typeof z=="number"}},{name:"string",test:function(z){return typeof z=="string"}},{name:"boolean",test:function(z){return typeof z=="boolean"}},{name:"Function",test:function(z){return typeof z=="function"}},{name:"Array",test:Array.isArray},{name:"Date",test:function(z){return z instanceof Date}},{name:"RegExp",test:function(z){return z instanceof RegExp}},{name:"Object",test:function(z){return typeof z=="object"&&z!==null&&z.constructor===Object}},{name:"null",test:function(z){return z===null}},{name:"undefined",test:function(z){return z===void 0}}],l={name:"any",test:i},u=[],f=[],o={types:c,conversions:f,ignore:u};function s(z){var F=$(o.types,function(q){return q.name===z});if(F)return F;if(z==="any")return l;var J=$(o.types,function(q){return q.name.toLowerCase()===z.toLowerCase()});throw new TypeError('Unknown type "'+z+'"'+(J?'. Did you mean "'+J.name+'"?':""))}function m(z){return z===l?999:o.types.indexOf(z)}function h(z){var F=$(o.types,function(J){return J.test(z)});if(F)return F.name;throw new TypeError("Value has unknown type. Value: "+z)}function p(z,F){if(!z.signatures)throw new TypeError("Function is no typed-function");var J;if(typeof F=="string"){J=F.split(",");for(var q=0;q<J.length;q++)J[q]=J[q].trim()}else if(Array.isArray(F))J=F;else throw new TypeError("String array or a comma separated string expected");var oe=J.join(","),le=z.signatures[oe];if(le)return le;throw new TypeError("Signature not found (signature: "+(z.name||"unnamed")+"("+J.join(", ")+"))")}function g(z,F){var J=h(z);if(F===J)return z;for(var q=0;q<o.conversions.length;q++){var oe=o.conversions[q];if(oe.from===J&&oe.to===F)return oe.convert(z)}throw new Error("Cannot convert from "+J+" to "+F)}function y(z){return z.map(function(F){var J=F.types.map(T);return(F.restParam?"...":"")+J.join("|")}).join(",")}function w(z,F){var J=z.indexOf("...")===0,q=J?z.length>3?z.slice(3):"any":z,oe=q.split("|").map(re).filter(ae).filter(ne),le=L(F,oe),ve=oe.map(function(pe){var Ae=s(pe);return{name:pe,typeIndex:m(Ae),test:Ae.test,conversion:null,conversionIndex:-1}}),he=le.map(function(pe){var Ae=s(pe.from);return{name:pe.from,typeIndex:m(Ae),test:Ae.test,conversion:pe,conversionIndex:F.indexOf(pe)}});return{types:ve.concat(he),restParam:J}}function A(z,F,J){var q=[];return z.trim()!==""&&(q=z.split(",").map(re).map(function(oe,le,ve){var he=w(oe,J);if(he.restParam&&le!==ve.length-1)throw new SyntaxError('Unexpected rest parameter "'+oe+'": only allowed for the last parameter');return he})),q.some(ue)?null:{params:q,fn:F}}function v(z){var F=be(z);return F?F.restParam:!1}function b(z){return z.types.some(function(F){return F.conversion!=null})}function x(z){if(!z||z.types.length===0)return i;if(z.types.length===1)return s(z.types[0].name).test;if(z.types.length===2){var F=s(z.types[0].name).test,J=s(z.types[1].name).test;return function(le){return F(le)||J(le)}}else{var q=z.types.map(function(oe){return s(oe.name).test});return function(le){for(var ve=0;ve<q.length;ve++)if(q[ve](le))return!0;return!1}}}function d(z){var F,J,q;if(v(z)){F=ee(z).map(x);var oe=F.length,le=x(be(z)),ve=function(he){for(var pe=oe;pe<he.length;pe++)if(!le(he[pe]))return!1;return!0};return function(pe){for(var Ae=0;Ae<F.length;Ae++)if(!F[Ae](pe[Ae]))return!1;return ve(pe)&&pe.length>=oe+1}}else return z.length===0?function(pe){return pe.length===0}:z.length===1?(J=x(z[0]),function(pe){return J(pe[0])&&pe.length===1}):z.length===2?(J=x(z[0]),q=x(z[1]),function(pe){return J(pe[0])&&q(pe[1])&&pe.length===2}):(F=z.map(x),function(pe){for(var Ae=0;Ae<F.length;Ae++)if(!F[Ae](pe[Ae]))return!1;return pe.length===F.length})}function M(z,F){return F<z.params.length?z.params[F]:v(z.params)?be(z.params):null}function S(z,F,J){var q=M(z,F),oe=q?J?q.types.filter(N):q.types:[];return oe.map(T)}function T(z){return z.name}function N(z){return z.conversion===null||z.conversion===void 0}function D(z,F){var J=Z(K(z,function(q){return S(q,F,!1)}));return J.indexOf("any")!==-1?["any"]:J}function k(z,F,J){var q,oe,le=z||"unnamed",ve=J,he;for(he=0;he<F.length;he++){var pe=ve.filter(function(nr){var qr=x(M(nr,he));return(he<nr.params.length||v(nr.params))&&qr(F[he])});if(pe.length===0){if(oe=D(ve,he),oe.length>0){var Ae=h(F[he]);return q=new TypeError("Unexpected type of argument in function "+le+" (expected: "+oe.join(" or ")+", actual: "+Ae+", index: "+he+")"),q.data={category:"wrongType",fn:le,index:he,actual:Ae,expected:oe},q}}else ve=pe}var Xe=ve.map(function(nr){return v(nr.params)?1/0:nr.params.length});if(F.length<Math.min.apply(null,Xe))return oe=D(ve,he),q=new TypeError("Too few arguments in function "+le+" (expected: "+oe.join(" or ")+", index: "+F.length+")"),q.data={category:"tooFewArgs",fn:le,index:F.length,expected:oe},q;var or=Math.max.apply(null,Xe);return F.length>or?(q=new TypeError("Too many arguments in function "+le+" (expected: "+or+", actual: "+F.length+")"),q.data={category:"tooManyArgs",fn:le,index:F.length,expectedLength:or},q):(q=new TypeError('Arguments of type "'+F.join(", ")+'" do not match any of the defined signatures of function '+le+"."),q.data={category:"mismatch",actual:F.map(h)},q)}function I(z){for(var F=999,J=0;J<z.types.length;J++)N(z.types[J])&&(F=Math.min(F,z.types[J].typeIndex));return F}function _(z){for(var F=999,J=0;J<z.types.length;J++)N(z.types[J])||(F=Math.min(F,z.types[J].conversionIndex));return F}function O(z,F){var J;return J=z.restParam-F.restParam,J!==0||(J=b(z)-b(F),J!==0)||(J=I(z)-I(F),J!==0)?J:_(z)-_(F)}function B(z,F){var J=Math.min(z.params.length,F.params.length),q,oe;if(oe=z.params.some(b)-F.params.some(b),oe!==0)return oe;for(q=0;q<J;q++)if(oe=b(z.params[q])-b(F.params[q]),oe!==0)return oe;for(q=0;q<J;q++)if(oe=O(z.params[q],F.params[q]),oe!==0)return oe;return z.params.length-F.params.length}function L(z,F){var J={};return z.forEach(function(q){F.indexOf(q.from)===-1&&F.indexOf(q.to)!==-1&&!J[q.from]&&(J[q.from]=q)}),Object.keys(J).map(function(q){return J[q]})}function V(z,F){var J=F;if(z.some(b)){var q=v(z),oe=z.map(C);J=function(){for(var pe=[],Ae=q?arguments.length-1:arguments.length,Xe=0;Xe<Ae;Xe++)pe[Xe]=oe[Xe](arguments[Xe]);return q&&(pe[Ae]=arguments[Ae].map(oe[Ae])),F.apply(this,pe)}}var le=J;if(v(z)){var ve=z.length-1;le=function(){return J.apply(this,we(arguments,0,ve).concat([we(arguments,ve)]))}}return le}function C(z){var F,J,q,oe,le=[],ve=[];switch(z.types.forEach(function(he){he.conversion&&(le.push(s(he.conversion.from).test),ve.push(he.conversion.convert))}),ve.length){case 0:return function(pe){return pe};case 1:return F=le[0],q=ve[0],function(pe){return F(pe)?q(pe):pe};case 2:return F=le[0],J=le[1],q=ve[0],oe=ve[1],function(pe){return F(pe)?q(pe):J(pe)?oe(pe):pe};default:return function(pe){for(var Ae=0;Ae<ve.length;Ae++)if(le[Ae](pe))return ve[Ae](pe);return pe}}}function U(z){var F={};return z.forEach(function(J){J.params.some(b)||X(J.params,!0).forEach(function(q){F[y(q)]=J.fn})}),F}function X(z,F){function J(q,oe,le){if(oe<q.length){var ve=q[oe],he=F?ve.types.filter(N):ve.types,pe;if(ve.restParam){var Ae=he.filter(N);pe=Ae.length<he.length?[Ae,he]:[he]}else pe=he.map(function(or){return[or]});return K(pe,function(or){return J(q,oe+1,le.concat([or]))})}else{var Xe=le.map(function(or,nr){return{types:or,restParam:nr===q.length-1&&v(q)}});return[Xe]}}return J(z,0,[])}function j(z,F){for(var J=Math.max(z.params.length,F.params.length),q=0;q<J;q++){var oe=S(z,q,!0),le=S(F,q,!0);if(!ye(oe,le))return!1}var ve=z.params.length,he=F.params.length,pe=v(z.params),Ae=v(F.params);return pe?Ae?ve===he:he>=ve:Ae?ve>=he:ve===he}function W(z,F){if(Object.keys(F).length===0)throw new SyntaxError("No signatures provided");var J=[];Object.keys(F).map(function(ir){return A(ir,F[ir],o.conversions)}).filter(te).forEach(function(ir){var xr=$(J,function(sn){return j(sn,ir)});if(xr)throw new TypeError('Conflicting signatures "'+y(xr.params)+'" and "'+y(ir.params)+'".');J.push(ir)});var q=K(J,function(ir){var xr=ir?X(ir.params,!1):[];return xr.map(function(sn){return{params:sn,fn:ir.fn}})}).filter(te);q.sort(B);var oe=q[0]&&q[0].params.length<=2&&!v(q[0].params),le=q[1]&&q[1].params.length<=2&&!v(q[1].params),ve=q[2]&&q[2].params.length<=2&&!v(q[2].params),he=q[3]&&q[3].params.length<=2&&!v(q[3].params),pe=q[4]&&q[4].params.length<=2&&!v(q[4].params),Ae=q[5]&&q[5].params.length<=2&&!v(q[5].params),Xe=oe&&le&&ve&&he&&pe&&Ae,or=q.map(function(ir){return d(ir.params)}),nr=oe?x(q[0].params[0]):t,qr=le?x(q[1].params[0]):t,$r=ve?x(q[2].params[0]):t,vn=he?x(q[3].params[0]):t,Ge=pe?x(q[4].params[0]):t,In=Ae?x(q[5].params[0]):t,E=oe?x(q[0].params[1]):t,H=le?x(q[1].params[1]):t,ie=ve?x(q[2].params[1]):t,ge=he?x(q[3].params[1]):t,Ie=pe?x(q[4].params[1]):t,_e=Ae?x(q[5].params[1]):t,mr=q.map(function(ir){return V(ir.params,ir.fn)}),ia=oe?mr[0]:r,cp=le?mr[1]:r,lp=ve?mr[2]:r,fp=he?mr[3]:r,mp=pe?mr[4]:r,hp=Ae?mr[5]:r,pp=oe?q[0].params.length:-1,gp=le?q[1].params.length:-1,dp=ve?q[2].params.length:-1,vp=he?q[3].params.length:-1,bp=pe?q[4].params.length:-1,yp=Ae?q[5].params.length:-1,xp=Xe?6:0,wp=q.length,Ap=function(){for(var xr=xp;xr<wp;xr++)if(or[xr](arguments))return mr[xr].apply(this,arguments);return o.onMismatch(z,arguments,q)},aa=function ir(xr,sn){return arguments.length===pp&&nr(xr)&&E(sn)?ia.apply(ir,arguments):arguments.length===gp&&qr(xr)&&H(sn)?cp.apply(ir,arguments):arguments.length===dp&&$r(xr)&&ie(sn)?lp.apply(ir,arguments):arguments.length===vp&&vn(xr)&&ge(sn)?fp.apply(ir,arguments):arguments.length===bp&&Ge(xr)&&Ie(sn)?mp.apply(ir,arguments):arguments.length===yp&&In(xr)&&_e(sn)?hp.apply(ir,arguments):Ap.apply(ir,arguments)};try{Object.defineProperty(aa,"name",{value:z})}catch{}return aa.signatures=U(q),aa}function Q(z,F,J){throw k(z,F,J)}function ne(z){return o.ignore.indexOf(z)===-1}function re(z){return z.trim()}function ae(z){return!!z}function te(z){return z!==null}function ue(z){return z.types.length===0}function ee(z){return z.slice(0,z.length-1)}function be(z){return z[z.length-1]}function we(z,F,J){return Array.prototype.slice.call(z,F,J)}function me(z,F){return z.indexOf(F)!==-1}function ye(z,F){for(var J=0;J<z.length;J++)if(me(F,z[J]))return!0;return!1}function $(z,F){for(var J=0;J<z.length;J++)if(F(z[J]))return z[J]}function Z(z){for(var F={},J=0;J<z.length;J++)F[z[J]]=!0;return Object.keys(F)}function K(z,F){return Array.prototype.concat.apply([],z.map(F))}function R(z){for(var F="",J=0;J<z.length;J++){var q=z[J];if((typeof q.signatures=="object"||typeof q.signature=="string")&&q.name!==""){if(F==="")F=q.name;else if(F!==q.name){var oe=new Error("Function names do not match (expected: "+F+", actual: "+q.name+")");throw oe.data={actual:q.name,expected:F},oe}}}return F}function Y(z){var F,J={};function q(he,pe){if(J.hasOwnProperty(he)&&pe!==J[he])throw F=new Error('Signature "'+he+'" is defined twice'),F.data={signature:he},F}for(var oe=0;oe<z.length;oe++){var le=z[oe];if(typeof le.signatures=="object")for(var ve in le.signatures)le.signatures.hasOwnProperty(ve)&&(q(ve,le.signatures[ve]),J[ve]=le.signatures[ve]);else if(typeof le.signature=="string")q(le.signature,le),J[le.signature]=le;else throw F=new TypeError("Function is no typed-function (index: "+oe+")"),F.data={index:oe},F}return J}return o=W("typed",{"string, Object":W,Object:function(z){var F=[];for(var J in z)z.hasOwnProperty(J)&&F.push(z[J]);var q=R(F);return W(q,z)},"...Function":function(z){return W(R(z),Y(z))},"string, ...Function":function(z,F){return W(z,Y(F))}}),o.create=a,o.types=c,o.conversions=f,o.ignore=u,o.onMismatch=Q,o.throwMismatchError=Q,o.createError=k,o.convert=g,o.find=p,o.addType=function(z,F){if(!z||typeof z.name!="string"||typeof z.test!="function")throw new TypeError("Object with properties {name: string, test: function} expected");if(F!==!1){for(var J=0;J<o.types.length;J++)if(o.types[J].name==="Object"){o.types.splice(J,0,z);return}}o.types.push(z)},o.addConversion=function(z){if(!z||typeof z.from!="string"||typeof z.to!="string"||typeof z.convert!="function")throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");o.conversions.push(z)},o}return a()})})(Jl);var Es=Jl.exports;function Se(e){return typeof e=="boolean"?!0:isFinite(e)?e===Math.round(e):!1}var Pn=Math.sign||function(e){return e>0?1:e<0?-1:0},Wp=Math.log2||function(n){return Math.log(n)/Math.LN2},Gp=Math.log10||function(n){return Math.log(n)/Math.LN10},Hp=Math.log1p||function(e){return Math.log(e+1)},Zp=Math.cbrt||function(n){if(n===0)return n;var i=n<0,t;return i&&(n=-n),isFinite(n)?(t=Math.exp(Math.log(n)/3),t=(n/(t*t)+2*t)/3):t=n,i?-t:t},Xp=Math.expm1||function(n){return n>=2e-4||n<=-2e-4?Math.exp(n)-1:n+n*n/2+n*n*n/6};function oa(e,n,i){var t={2:"0b",8:"0o",16:"0x"},r=t[n],a="";if(i){if(i<1)throw new Error("size must be in greater than 0");if(!Se(i))throw new Error("size must be an integer");if(e>2**(i-1)-1||e<-(2**(i-1)))throw new Error("Value must be in range [-2^".concat(i-1,", 2^").concat(i-1,"-1]"));if(!Se(e))throw new Error("Value must be an integer");e<0&&(e=e+2**i),a="i".concat(i)}var c="";return e<0&&(e=-e,c="-"),"".concat(c).concat(r).concat(e.toString(n)).concat(a)}function Wn(e,n){if(typeof n=="function")return n(e);if(e===1/0)return"Infinity";if(e===-1/0)return"-Infinity";if(isNaN(e))return"NaN";var i="auto",t,r;if(n&&(n.notation&&(i=n.notation),Fe(n)?t=n:Fe(n.precision)&&(t=n.precision),n.wordSize&&(r=n.wordSize,typeof r!="number")))throw new Error('Option "wordSize" must be a number');switch(i){case"fixed":return Ql(e,t);case"exponential":return jl(e,t);case"engineering":return Yp(e,t);case"bin":return oa(e,2,r);case"oct":return oa(e,8,r);case"hex":return oa(e,16,r);case"auto":return Jp(e,t,n&&n).replace(/((\.\d*?)(0+))($|e)/,function(){var a=arguments[2],c=arguments[4];return a!=="."?a+c:c});default:throw new Error('Unknown notation "'+i+'". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.')}}function Di(e){var n=String(e).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);if(!n)throw new SyntaxError("Invalid number "+e);var i=n[1],t=n[2],r=parseFloat(n[4]||"0"),a=t.indexOf(".");r+=a!==-1?a-1:t.length-1;var c=t.replace(".","").replace(/^0*/,function(l){return r-=l.length,""}).replace(/0*$/,"").split("").map(function(l){return parseInt(l)});return c.length===0&&(c.push(0),r++),{sign:i,coefficients:c,exponent:r}}function Yp(e,n){if(isNaN(e)||!isFinite(e))return String(e);var i=Di(e),t=Ii(i,n),r=t.exponent,a=t.coefficients,c=r%3===0?r:r<0?r-3-r%3:r-r%3;if(Fe(n))for(;n>a.length||r-c+1>a.length;)a.push(0);else for(var l=Math.abs(r-c)-(a.length-1),u=0;u<l;u++)a.push(0);for(var f=Math.abs(r-c),o=1;f>0;)o++,f--;var s=a.slice(o).join(""),m=Fe(n)&&s.length||s.match(/[1-9]/)?"."+s:"",h=a.slice(0,o).join("")+m+"e"+(r>=0?"+":"")+c.toString();return t.sign+h}function Ql(e,n){if(isNaN(e)||!isFinite(e))return String(e);var i=Di(e),t=typeof n=="number"?Ii(i,i.exponent+1+n):i,r=t.coefficients,a=t.exponent+1,c=a+(n||0);return r.length<c&&(r=r.concat(mt(c-r.length))),a<0&&(r=mt(-a+1).concat(r),a=1),a<r.length&&r.splice(a,0,a===0?"0.":"."),t.sign+r.join("")}function jl(e,n){if(isNaN(e)||!isFinite(e))return String(e);var i=Di(e),t=n?Ii(i,n):i,r=t.coefficients,a=t.exponent;r.length<n&&(r=r.concat(mt(n-r.length)));var c=r.shift();return t.sign+c+(r.length>0?"."+r.join(""):"")+"e"+(a>=0?"+":"")+a}function Jp(e,n,i){if(isNaN(e)||!isFinite(e))return String(e);var t=i&&i.lowerExp!==void 0?i.lowerExp:-3,r=i&&i.upperExp!==void 0?i.upperExp:5,a=Di(e),c=n?Ii(a,n):a;if(c.exponent<t||c.exponent>=r)return jl(e,n);var l=c.coefficients,u=c.exponent;l.length<n&&(l=l.concat(mt(n-l.length))),l=l.concat(mt(u-l.length+1+(l.length<n?n-l.length:0))),l=mt(-u).concat(l);var f=u>0?u:0;return f<l.length-1&&l.splice(f+1,0,"."),c.sign+l.join("")}function Ii(e,n){for(var i={sign:e.sign,coefficients:e.coefficients,exponent:e.exponent},t=i.coefficients;n<=0;)t.unshift(0),i.exponent++,n++;if(t.length>n){var r=t.splice(n,t.length-n);if(r[0]>=5){var a=n-1;for(t[a]++;t[a]===10;)t.pop(),a===0&&(t.unshift(0),i.exponent++,a++),a--,t[a]++}}return i}function mt(e){for(var n=[],i=0;i<e;i++)n.push(0);return n}function Qp(e){return e.toExponential().replace(/e.*$/,"").replace(/^0\.?0*|\./,"").length}var jp=Number.EPSILON||2220446049250313e-31;function _r(e,n,i){if(i==null)return e===n;if(e===n)return!0;if(isNaN(e)||isNaN(n))return!1;if(isFinite(e)&&isFinite(n)){var t=Math.abs(e-n);return t<jp?!0:t<=Math.max(Math.abs(e),Math.abs(n))*i}return!1}var eg=Math.acosh||function(e){return Math.log(Math.sqrt(e*e-1)+e)},rg=Math.asinh||function(e){return Math.log(Math.sqrt(e*e+1)+e)},ng=Math.atanh||function(e){return Math.log((1+e)/(1-e))/2},tg=Math.cosh||function(e){return(Math.exp(e)+Math.exp(-e))/2},ig=Math.sinh||function(e){return(Math.exp(e)-Math.exp(-e))/2},ag=Math.tanh||function(e){var n=Math.exp(2*e);return(n-1)/(n+1)};function sg(e,n){var i=e>0?!0:e<0?!1:1/e===1/0,t=n>0?!0:n<0?!1:1/n===1/0;return i^t?-e:e}function ua(e,n,i){var t=e.constructor,r=new t(2),a="";if(i){if(i<1)throw new Error("size must be in greater than 0");if(!Se(i))throw new Error("size must be an integer");if(e.greaterThan(r.pow(i-1).sub(1))||e.lessThan(r.pow(i-1).mul(-1)))throw new Error("Value must be in range [-2^".concat(i-1,", 2^").concat(i-1,"-1]"));if(!e.isInteger())throw new Error("Value must be an integer");e.lessThan(0)&&(e=e.add(r.pow(i))),a="i".concat(i)}switch(n){case 2:return"".concat(e.toBinary()).concat(a);case 8:return"".concat(e.toOctal()).concat(a);case 16:return"".concat(e.toHexadecimal()).concat(a);default:throw new Error("Base ".concat(n," not supported "))}}function og(e,n){if(typeof n=="function")return n(e);if(!e.isFinite())return e.isNaN()?"NaN":e.gt(0)?"Infinity":"-Infinity";var i="auto",t,r;if(n!==void 0&&(n.notation&&(i=n.notation),typeof n=="number"?t=n:n.precision&&(t=n.precision),n.wordSize&&(r=n.wordSize,typeof r!="number")))throw new Error('Option "wordSize" must be a number');switch(i){case"fixed":return cg(e,t);case"exponential":return Cs(e,t);case"engineering":return ug(e,t);case"bin":return ua(e,2,r);case"oct":return ua(e,8,r);case"hex":return ua(e,16,r);case"auto":{var a=n&&n.lowerExp!==void 0?n.lowerExp:-3,c=n&&n.upperExp!==void 0?n.upperExp:5;if(e.isZero())return"0";var l,u=e.toSignificantDigits(t),f=u.e;return f>=a&&f<c?l=u.toFixed():l=Cs(e,t),l.replace(/((\.\d*?)(0+))($|e)/,function(){var o=arguments[2],s=arguments[4];return o!=="."?o+s:s})}default:throw new Error('Unknown notation "'+i+'". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.')}}function ug(e,n){var i=e.e,t=i%3===0?i:i<0?i-3-i%3:i-i%3,r=e.mul(Math.pow(10,-t)),a=r.toPrecision(n);return a.indexOf("e")!==-1&&(a=r.toString()),a+"e"+(i>=0?"+":"")+t.toString()}function Cs(e,n){return n!==void 0?e.toExponential(n-1):e.toExponential()}function cg(e,n){return e.toFixed(n)}function lg(e,n){var i=e.length-n.length,t=e.length;return e.substring(i,t)===n}function Oe(e,n){var i=fg(e,n);return n&&typeof n=="object"&&"truncate"in n&&i.length>n.truncate?i.substring(0,n.truncate-3)+"...":i}function fg(e,n){if(typeof e=="number")return Wn(e,n);if($e(e))return og(e,n);if(mg(e))return!n||n.fraction!=="decimal"?e.s*e.n+"/"+e.d:e.toString();if(Array.isArray(e))return ef(e,n);if(Or(e))return'"'+e+'"';if(typeof e=="function")return e.syntax?String(e.syntax):"function";if(e&&typeof e=="object"){if(typeof e.format=="function")return e.format(n);if(e&&e.toString(n)!=={}.toString())return e.toString(n);var i=Object.keys(e).map(t=>'"'+t+'": '+Oe(e[t],n));return"{"+i.join(", ")+"}"}return String(e)}function si(e){for(var n=String(e),i="",t=0;t<n.length;){var r=n.charAt(t);r==="\\"?(i+=r,t++,r=n.charAt(t),(r===""||'"\\/bfnrtu'.indexOf(r)===-1)&&(i+="\\"),i+=r):r==='"'?i+='\\"':i+=r,t++}return'"'+i+'"'}function Ur(e){var n=String(e);return n=n.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),n}function ef(e,n){if(Array.isArray(e)){for(var i="[",t=e.length,r=0;r<t;r++)r!==0&&(i+=", "),i+=ef(e[r],n);return i+="]",i}else return Oe(e,n)}function mg(e){return e&&typeof e=="object"&&typeof e.s=="number"&&typeof e.n=="number"&&typeof e.d=="number"||!1}function st(e,n){if(!Or(e))throw new TypeError("Unexpected type of argument in function compareText (expected: string or Array or Matrix, actual: "+je(e)+", index: 0)");if(!Or(n))throw new TypeError("Unexpected type of argument in function compareText (expected: string or Array or Matrix, actual: "+je(n)+", index: 1)");return e===n?0:e>n?1:-1}function ze(e,n,i){if(!(this instanceof ze))throw new SyntaxError("Constructor must be called with the new operator");this.actual=e,this.expected=n,this.relation=i,this.message="Dimension mismatch ("+(Array.isArray(e)?"["+e.join(", ")+"]":e)+" "+(this.relation||"!=")+" "+(Array.isArray(n)?"["+n.join(", ")+"]":n)+")",this.stack=new Error().stack}ze.prototype=new RangeError;ze.prototype.constructor=RangeError;ze.prototype.name="DimensionError";ze.prototype.isDimensionError=!0;function rn(e,n,i){if(!(this instanceof rn))throw new SyntaxError("Constructor must be called with the new operator");this.index=e,arguments.length<3?(this.min=0,this.max=n):(this.min=n,this.max=i),this.min!==void 0&&this.index<this.min?this.message="Index out of range ("+this.index+" < "+this.min+")":this.max!==void 0&&this.index>=this.max?this.message="Index out of range ("+this.index+" > "+(this.max-1)+")":this.message="Index out of range ("+this.index+")",this.stack=new Error().stack}rn.prototype=new RangeError;rn.prototype.constructor=RangeError;rn.prototype.name="IndexError";rn.prototype.isIndexError=!0;function Re(e){for(var n=[];Array.isArray(e);)n.push(e.length),e=e[0];return n}function rf(e,n,i){var t,r=e.length;if(r!==n[i])throw new ze(r,n[i]);if(i<n.length-1){var a=i+1;for(t=0;t<r;t++){var c=e[t];if(!Array.isArray(c))throw new ze(n.length-1,n.length,"<");rf(e[t],n,a)}}else for(t=0;t<r;t++)if(Array.isArray(e[t]))throw new ze(n.length+1,n.length,">")}function Bs(e,n){var i=n.length===0;if(i){if(Array.isArray(e))throw new ze(e.length,0)}else rf(e,n,0)}function Je(e,n){if(!Fe(e)||!Se(e))throw new TypeError("Index must be an integer (value: "+e+")");if(e<0||typeof n=="number"&&e>=n)throw new rn(e,n)}function pt(e,n,i){if(!Array.isArray(e)||!Array.isArray(n))throw new TypeError("Array expected");if(n.length===0)throw new Error("Resizing to scalar is not supported");n.forEach(function(r){if(!Fe(r)||!Se(r)||r<0)throw new TypeError("Invalid size, must contain positive integers (size: "+Oe(n)+")")});var t=i!==void 0?i:0;return da(e,n,0,t),e}function da(e,n,i,t){var r,a,c=e.length,l=n[i],u=Math.min(c,l);if(e.length=l,i<n.length-1){var f=i+1;for(r=0;r<u;r++)a=e[r],Array.isArray(a)||(a=[a],e[r]=a),da(a,n,f,t);for(r=u;r<l;r++)a=[],e[r]=a,da(a,n,f,t)}else{for(r=0;r<u;r++)for(;Array.isArray(e[r]);)e[r]=e[r][0];for(r=u;r<l;r++)e[r]=t}}function nf(e,n){var i=qe(e),t=i.length;if(!Array.isArray(e)||!Array.isArray(n))throw new TypeError("Array expected");if(n.length===0)throw new ze(0,t,"!=");n=Ra(n,t);var r=tf(n);if(t!==r)throw new ze(r,t,"!=");try{return hg(i,n)}catch(a){throw a instanceof ze?new ze(r,t,"!="):a}}function Ra(e,n){var i=tf(e),t=e.slice(),r=-1,a=e.indexOf(r),c=e.indexOf(r,a+1)>=0;if(c)throw new Error("More than one wildcard in sizes");var l=a>=0,u=n%i===0;if(l)if(u)t[a]=-n/i;else throw new Error("Could not replace wildcard, since "+n+" is no multiple of "+-i);return t}function tf(e){return e.reduce((n,i)=>n*i,1)}function hg(e,n){for(var i=e,t,r=n.length-1;r>0;r--){var a=n[r];t=[];for(var c=i.length/a,l=0;l<c;l++)t.push(i.slice(l*a,(l+1)*a));i=t}return i}function vi(e,n){for(var i=n||Re(e);Array.isArray(e)&&e.length===1;)e=e[0],i.shift();for(var t=i.length;i[t-1]===1;)t--;return t<i.length&&(e=af(e,t,0),i.length=t),e}function af(e,n,i){var t,r;if(i<n){var a=i+1;for(t=0,r=e.length;t<r;t++)e[t]=af(e[t],n,a)}else for(;Array.isArray(e);)e=e[0];return e}function sf(e,n,i,t){var r=t||Re(e);if(i)for(var a=0;a<i;a++)e=[e],r.unshift(1);for(e=of(e,n,0);r.length<n;)r.push(1);return e}function of(e,n,i){var t,r;if(Array.isArray(e)){var a=i+1;for(t=0,r=e.length;t<r;t++)e[t]=of(e[t],n,a)}else for(var c=i;c<n;c++)e=[e];return e}function qe(e){if(!Array.isArray(e))return e;var n=[];return e.forEach(function i(t){Array.isArray(t)?t.forEach(i):n.push(t)}),n}function Tn(e,n){return Array.prototype.map.call(e,n)}function Oi(e,n){Array.prototype.forEach.call(e,n)}function uf(e,n){if(Re(e).length!==1)throw new Error("Only one dimensional matrices supported");return Array.prototype.filter.call(e,n)}function bi(e,n){if(Re(e).length!==1)throw new Error("Only one dimensional matrices supported");return Array.prototype.filter.call(e,i=>n.test(i))}function Ls(e,n){return Array.prototype.join.call(e,n)}function gt(e){if(!Array.isArray(e))throw new TypeError("Array input expected");if(e.length===0)return e;var n=[],i=0;n[0]={value:e[0],identifier:0};for(var t=1;t<e.length;t++)e[t]===e[t-1]?i++:i=0,n.push({value:e[t],identifier:i});return n}function yi(e){if(!Array.isArray(e))throw new TypeError("Array input expected");if(e.length===0)return e;for(var n=[],i=0;i<e.length;i++)n.push(e[i].value);return n}function _t(e,n){for(var i,t=0,r=0;r<e.length;r++){var a=e[r],c=Array.isArray(a);if(r===0&&c&&(t=a.length),c&&a.length!==t)return;var l=c?_t(a,n):n(a);if(i===void 0)i=l;else if(i!==l)return"mixed"}return i}function P(e,n,i,t){function r(a){var c=qp(a,n.map(dg));return pg(e,n,a),i(c)}return r.isFactory=!0,r.fn=e,r.dependencies=n.slice().sort(),t&&(r.meta=t),r}function pg(e,n,i){var t=n.filter(a=>!gg(a)).every(a=>i[a]!==void 0);if(!t){var r=n.filter(a=>i[a]===void 0);throw new Error('Cannot create function "'.concat(e,'", ')+"some dependencies are missing: ".concat(r.map(a=>'"'.concat(a,'"')).join(", "),"."))}}function gg(e){return e&&e[0]==="?"}function dg(e){return e&&e[0]==="?"?e.slice(1):e}function Vr(e,n){if(cf(e)&&qa(e,n))return e[n];throw typeof e[n]=="function"&&Ka(e,n)?new Error('Cannot access method "'+n+'" as a property'):new Error('No access to property "'+n+'"')}function dt(e,n,i){if(cf(e)&&qa(e,n))return e[n]=i,i;throw new Error('No access to property "'+n+'"')}function vg(e,n){return n in e}function qa(e,n){return!e||typeof e!="object"?!1:Ne(yg,n)?!0:!(n in Object.prototype||n in Function.prototype)}function bg(e,n){if(!Ka(e,n))throw new Error('No access to method "'+n+'"')}function Ka(e,n){return e==null||typeof e[n]!="function"||Ne(e,n)&&Object.getPrototypeOf&&n in Object.getPrototypeOf(e)?!1:Ne(xg,n)?!0:!(n in Object.prototype||n in Function.prototype)}function cf(e){return typeof e=="object"&&e&&e.constructor===Object}var yg={length:!0,name:!0},xg={toString:!0,valueOf:!0,toLocaleString:!0};class Ua{constructor(n){this.wrappedObject=n}keys(){return Object.keys(this.wrappedObject)}get(n){return Vr(this.wrappedObject,n)}set(n,i){return dt(this.wrappedObject,n,i),this}has(n){return vg(this.wrappedObject,n)}}function wn(){return new Map}function Va(e){if(!e)return wn();if(zi(e))return e;if($a(e))return new Ua(e);throw new Error("createMap can create maps from objects or Maps")}function wg(e){if(e instanceof Ua)return e.wrappedObject;var n={};for(var i of e.keys()){var t=e.get(i);dt(n,i,t)}return n}function zi(e){return e?e instanceof Map||e instanceof Ua||typeof e.set=="function"&&typeof e.get=="function"&&typeof e.keys=="function"&&typeof e.has=="function":!1}function Ds(e){for(var n=arguments.length,i=new Array(n>1?n-1:0),t=1;t<n;t++)i[t-1]=arguments[t];for(var r of i)if(!!r){if(zi(r))for(var a of r.keys())e.set(a,r.get(a));else if($a(r))for(var c of Object.keys(r))e.set(c,r[c])}return e}var lf=function(){return lf=Es.create,Es},Ag=["?BigNumber","?Complex","?DenseMatrix","?Fraction"],Ng=P("typed",Ag,function(n){var{BigNumber:i,Complex:t,DenseMatrix:r,Fraction:a}=n,c=lf();return c.types=[{name:"number",test:Fe},{name:"Complex",test:Mn},{name:"BigNumber",test:$e},{name:"Fraction",test:yt},{name:"Unit",test:Kt},{name:"string",test:Or},{name:"Chain",test:_a},{name:"Array",test:Ze},{name:"Matrix",test:Ce},{name:"DenseMatrix",test:di},{name:"SparseMatrix",test:Vn},{name:"Range",test:Bi},{name:"Index",test:Ut},{name:"boolean",test:Cp},{name:"ResultSet",test:Xl},{name:"Help",test:Pa},{name:"function",test:Bp},{name:"Date",test:Lp},{name:"RegExp",test:Dp},{name:"null",test:Ip},{name:"undefined",test:Op},{name:"AccessorNode",test:Gn},{name:"ArrayNode",test:Kr},{name:"AssignmentNode",test:zp},{name:"BlockNode",test:Pp},{name:"ConditionalNode",test:$p},{name:"ConstantNode",test:Ye},{name:"FunctionNode",test:Hn},{name:"FunctionAssignmentNode",test:Vt},{name:"IndexNode",test:wt},{name:"Node",test:We},{name:"ObjectNode",test:Li},{name:"OperatorNode",test:Ir},{name:"ParenthesisNode",test:Wt},{name:"RangeNode",test:_p},{name:"SymbolNode",test:vr},{name:"Map",test:zi},{name:"Object",test:$a}],c.conversions=[{from:"number",to:"BigNumber",convert:function(u){if(i||ca(u),Qp(u)>15)throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: "+u+"). Use function bignumber(x) to convert to BigNumber.");return new i(u)}},{from:"number",to:"Complex",convert:function(u){return t||oi(u),new t(u,0)}},{from:"number",to:"string",convert:function(u){return u+""}},{from:"BigNumber",to:"Complex",convert:function(u){return t||oi(u),new t(u.toNumber(),0)}},{from:"Fraction",to:"BigNumber",convert:function(u){throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.")}},{from:"Fraction",to:"Complex",convert:function(u){return t||oi(u),new t(u.valueOf(),0)}},{from:"number",to:"Fraction",convert:function(u){a||la(u);var f=new a(u);if(f.valueOf()!==u)throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: "+u+"). Use function fraction(x) to convert to Fraction.");return f}},{from:"string",to:"number",convert:function(u){var f=Number(u);if(isNaN(f))throw new Error('Cannot convert "'+u+'" to a number');return f}},{from:"string",to:"BigNumber",convert:function(u){i||ca(u);try{return new i(u)}catch{throw new Error('Cannot convert "'+u+'" to BigNumber')}}},{from:"string",to:"Fraction",convert:function(u){a||la(u);try{return new a(u)}catch{throw new Error('Cannot convert "'+u+'" to Fraction')}}},{from:"string",to:"Complex",convert:function(u){t||oi(u);try{return new t(u)}catch{throw new Error('Cannot convert "'+u+'" to Complex')}}},{from:"boolean",to:"number",convert:function(u){return+u}},{from:"boolean",to:"BigNumber",convert:function(u){return i||ca(u),new i(+u)}},{from:"boolean",to:"Fraction",convert:function(u){return a||la(u),new a(+u)}},{from:"boolean",to:"string",convert:function(u){return String(u)}},{from:"Array",to:"Matrix",convert:function(u){return r||Sg(),new r(u)}},{from:"Matrix",to:"Array",convert:function(u){return u.valueOf()}}],c});function ca(e){throw new Error("Cannot convert value ".concat(e," into a BigNumber: no class 'BigNumber' provided"))}function oi(e){throw new Error("Cannot convert value ".concat(e," into a Complex number: no class 'Complex' provided"))}function Sg(){throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided")}function la(e){throw new Error("Cannot convert value ".concat(e," into a Fraction, no class 'Fraction' provided."))}var Mg="ResultSet",Tg=[],kg=P(Mg,Tg,()=>{function e(n){if(!(this instanceof e))throw new SyntaxError("Constructor must be called with the new operator");this.entries=n||[]}return e.prototype.type="ResultSet",e.prototype.isResultSet=!0,e.prototype.valueOf=function(){return this.entries},e.prototype.toString=function(){return"["+this.entries.join(", ")+"]"},e.prototype.toJSON=function(){return{mathjs:"ResultSet",entries:this.entries}},e.fromJSON=function(n){return new e(n.entries)},e},{isClass:!0}),ft=9e15,Rn=1e9,va="0123456789abcdef",xi="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",wi="3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",ba={precision:20,rounding:4,modulo:1,toExpNeg:-7,toExpPos:21,minE:-ft,maxE:ft,crypto:!1},ff,An,Le=!0,Pi="[DecimalError] ",_n=Pi+"Invalid argument: ",mf=Pi+"Precision limit exceeded",hf=Pi+"crypto unavailable",pf="[object Decimal]",Nr=Math.floor,hr=Math.pow,Eg=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,Cg=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,Bg=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,gf=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,Qr=1e7,Ee=7,Lg=9007199254740991,Dg=xi.length-1,ya=wi.length-1,ce={toStringTag:pf};ce.absoluteValue=ce.abs=function(){var e=new this.constructor(this);return e.s<0&&(e.s=1),Me(e)};ce.ceil=function(){return Me(new this.constructor(this),this.e+1,2)};ce.clampedTo=ce.clamp=function(e,n){var i,t=this,r=t.constructor;if(e=new r(e),n=new r(n),!e.s||!n.s)return new r(NaN);if(e.gt(n))throw Error(_n+n);return i=t.cmp(e),i<0?e:t.cmp(n)>0?n:new r(t)};ce.comparedTo=ce.cmp=function(e){var n,i,t,r,a=this,c=a.d,l=(e=new a.constructor(e)).d,u=a.s,f=e.s;if(!c||!l)return!u||!f?NaN:u!==f?u:c===l?0:!c^u<0?1:-1;if(!c[0]||!l[0])return c[0]?u:l[0]?-f:0;if(u!==f)return u;if(a.e!==e.e)return a.e>e.e^u<0?1:-1;for(t=c.length,r=l.length,n=0,i=t<r?t:r;n<i;++n)if(c[n]!==l[n])return c[n]>l[n]^u<0?1:-1;return t===r?0:t>r^u<0?1:-1};ce.cosine=ce.cos=function(){var e,n,i=this,t=i.constructor;return i.d?i.d[0]?(e=t.precision,n=t.rounding,t.precision=e+Math.max(i.e,i.sd())+Ee,t.rounding=1,i=Ig(t,xf(t,i)),t.precision=e,t.rounding=n,Me(An==2||An==3?i.neg():i,e,n,!0)):new t(1):new t(NaN)};ce.cubeRoot=ce.cbrt=function(){var e,n,i,t,r,a,c,l,u,f,o=this,s=o.constructor;if(!o.isFinite()||o.isZero())return new s(o);for(Le=!1,a=o.s*hr(o.s*o,1/3),!a||Math.abs(a)==1/0?(i=br(o.d),e=o.e,(a=(e-i.length+1)%3)&&(i+=a==1||a==-2?"0":"00"),a=hr(i,1/3),e=Nr((e+1)/3)-(e%3==(e<0?-1:2)),a==1/0?i="5e"+e:(i=a.toExponential(),i=i.slice(0,i.indexOf("e")+1)+e),t=new s(i),t.s=o.s):t=new s(a.toString()),c=(e=s.precision)+3;;)if(l=t,u=l.times(l).times(l),f=u.plus(o),t=rr(f.plus(o).times(l),f.plus(u),c+2,1),br(l.d).slice(0,c)===(i=br(t.d)).slice(0,c))if(i=i.slice(c-3,c+1),i=="9999"||!r&&i=="4999"){if(!r&&(Me(l,e+1,0),l.times(l).times(l).eq(o))){t=l;break}c+=4,r=1}else{(!+i||!+i.slice(1)&&i.charAt(0)=="5")&&(Me(t,e+1,1),n=!t.times(t).times(t).eq(o));break}return Le=!0,Me(t,e,s.rounding,n)};ce.decimalPlaces=ce.dp=function(){var e,n=this.d,i=NaN;if(n){if(e=n.length-1,i=(e-Nr(this.e/Ee))*Ee,e=n[e],e)for(;e%10==0;e/=10)i--;i<0&&(i=0)}return i};ce.dividedBy=ce.div=function(e){return rr(this,new this.constructor(e))};ce.dividedToIntegerBy=ce.divToInt=function(e){var n=this,i=n.constructor;return Me(rr(n,new i(e),0,1,1),i.precision,i.rounding)};ce.equals=ce.eq=function(e){return this.cmp(e)===0};ce.floor=function(){return Me(new this.constructor(this),this.e+1,3)};ce.greaterThan=ce.gt=function(e){return this.cmp(e)>0};ce.greaterThanOrEqualTo=ce.gte=function(e){var n=this.cmp(e);return n==1||n===0};ce.hyperbolicCosine=ce.cosh=function(){var e,n,i,t,r,a=this,c=a.constructor,l=new c(1);if(!a.isFinite())return new c(a.s?1/0:NaN);if(a.isZero())return l;i=c.precision,t=c.rounding,c.precision=i+Math.max(a.e,a.sd())+4,c.rounding=1,r=a.d.length,r<32?(e=Math.ceil(r/3),n=(1/_i(4,e)).toString()):(e=16,n="2.3283064365386962890625e-10"),a=vt(c,1,a.times(n),new c(1),!0);for(var u,f=e,o=new c(8);f--;)u=a.times(a),a=l.minus(u.times(o.minus(u.times(o))));return Me(a,c.precision=i,c.rounding=t,!0)};ce.hyperbolicSine=ce.sinh=function(){var e,n,i,t,r=this,a=r.constructor;if(!r.isFinite()||r.isZero())return new a(r);if(n=a.precision,i=a.rounding,a.precision=n+Math.max(r.e,r.sd())+4,a.rounding=1,t=r.d.length,t<3)r=vt(a,2,r,r,!0);else{e=1.4*Math.sqrt(t),e=e>16?16:e|0,r=r.times(1/_i(5,e)),r=vt(a,2,r,r,!0);for(var c,l=new a(5),u=new a(16),f=new a(20);e--;)c=r.times(r),r=r.times(l.plus(c.times(u.times(c).plus(f))))}return a.precision=n,a.rounding=i,Me(r,n,i,!0)};ce.hyperbolicTangent=ce.tanh=function(){var e,n,i=this,t=i.constructor;return i.isFinite()?i.isZero()?new t(i):(e=t.precision,n=t.rounding,t.precision=e+7,t.rounding=1,rr(i.sinh(),i.cosh(),t.precision=e,t.rounding=n)):new t(i.s)};ce.inverseCosine=ce.acos=function(){var e,n=this,i=n.constructor,t=n.abs().cmp(1),r=i.precision,a=i.rounding;return t!==-1?t===0?n.isNeg()?Jr(i,r,a):new i(0):new i(NaN):n.isZero()?Jr(i,r+4,a).times(.5):(i.precision=r+6,i.rounding=1,n=n.asin(),e=Jr(i,r+4,a).times(.5),i.precision=r,i.rounding=a,e.minus(n))};ce.inverseHyperbolicCosine=ce.acosh=function(){var e,n,i=this,t=i.constructor;return i.lte(1)?new t(i.eq(1)?0:NaN):i.isFinite()?(e=t.precision,n=t.rounding,t.precision=e+Math.max(Math.abs(i.e),i.sd())+4,t.rounding=1,Le=!1,i=i.times(i).minus(1).sqrt().plus(i),Le=!0,t.precision=e,t.rounding=n,i.ln()):new t(i)};ce.inverseHyperbolicSine=ce.asinh=function(){var e,n,i=this,t=i.constructor;return!i.isFinite()||i.isZero()?new t(i):(e=t.precision,n=t.rounding,t.precision=e+2*Math.max(Math.abs(i.e),i.sd())+6,t.rounding=1,Le=!1,i=i.times(i).plus(1).sqrt().plus(i),Le=!0,t.precision=e,t.rounding=n,i.ln())};ce.inverseHyperbolicTangent=ce.atanh=function(){var e,n,i,t,r=this,a=r.constructor;return r.isFinite()?r.e>=0?new a(r.abs().eq(1)?r.s/0:r.isZero()?r:NaN):(e=a.precision,n=a.rounding,t=r.sd(),Math.max(t,e)<2*-r.e-1?Me(new a(r),e,n,!0):(a.precision=i=t-r.e,r=rr(r.plus(1),new a(1).minus(r),i+e,1),a.precision=e+4,a.rounding=1,r=r.ln(),a.precision=e,a.rounding=n,r.times(.5))):new a(NaN)};ce.inverseSine=ce.asin=function(){var e,n,i,t,r=this,a=r.constructor;return r.isZero()?new a(r):(n=r.abs().cmp(1),i=a.precision,t=a.rounding,n!==-1?n===0?(e=Jr(a,i+4,t).times(.5),e.s=r.s,e):new a(NaN):(a.precision=i+6,a.rounding=1,r=r.div(new a(1).minus(r.times(r)).sqrt().plus(1)).atan(),a.precision=i,a.rounding=t,r.times(2)))};ce.inverseTangent=ce.atan=function(){var e,n,i,t,r,a,c,l,u,f=this,o=f.constructor,s=o.precision,m=o.rounding;if(f.isFinite()){if(f.isZero())return new o(f);if(f.abs().eq(1)&&s+4<=ya)return c=Jr(o,s+4,m).times(.25),c.s=f.s,c}else{if(!f.s)return new o(NaN);if(s+4<=ya)return c=Jr(o,s+4,m).times(.5),c.s=f.s,c}for(o.precision=l=s+10,o.rounding=1,i=Math.min(28,l/Ee+2|0),e=i;e;--e)f=f.div(f.times(f).plus(1).sqrt().plus(1));for(Le=!1,n=Math.ceil(l/Ee),t=1,u=f.times(f),c=new o(f),r=f;e!==-1;)if(r=r.times(u),a=c.minus(r.div(t+=2)),r=r.times(u),c=a.plus(r.div(t+=2)),c.d[n]!==void 0)for(e=n;c.d[e]===a.d[e]&&e--;);return i&&(c=c.times(2<<i-1)),Le=!0,Me(c,o.precision=s,o.rounding=m,!0)};ce.isFinite=function(){return!!this.d};ce.isInteger=ce.isInt=function(){return!!this.d&&Nr(this.e/Ee)>this.d.length-2};ce.isNaN=function(){return!this.s};ce.isNegative=ce.isNeg=function(){return this.s<0};ce.isPositive=ce.isPos=function(){return this.s>0};ce.isZero=function(){return!!this.d&&this.d[0]===0};ce.lessThan=ce.lt=function(e){return this.cmp(e)<0};ce.lessThanOrEqualTo=ce.lte=function(e){return this.cmp(e)<1};ce.logarithm=ce.log=function(e){var n,i,t,r,a,c,l,u,f=this,o=f.constructor,s=o.precision,m=o.rounding,h=5;if(e==null)e=new o(10),n=!0;else{if(e=new o(e),i=e.d,e.s<0||!i||!i[0]||e.eq(1))return new o(NaN);n=e.eq(10)}if(i=f.d,f.s<0||!i||!i[0]||f.eq(1))return new o(i&&!i[0]?-1/0:f.s!=1?NaN:i?0:1/0);if(n)if(i.length>1)a=!0;else{for(r=i[0];r%10===0;)r/=10;a=r!==1}if(Le=!1,l=s+h,c=$n(f,l),t=n?Ai(o,l+10):$n(e,l),u=rr(c,t,l,1),Ft(u.d,r=s,m))do if(l+=10,c=$n(f,l),t=n?Ai(o,l+10):$n(e,l),u=rr(c,t,l,1),!a){+br(u.d).slice(r+1,r+15)+1==1e14&&(u=Me(u,s+1,0));break}while(Ft(u.d,r+=10,m));return Le=!0,Me(u,s,m)};ce.minus=ce.sub=function(e){var n,i,t,r,a,c,l,u,f,o,s,m,h=this,p=h.constructor;if(e=new p(e),!h.d||!e.d)return!h.s||!e.s?e=new p(NaN):h.d?e.s=-e.s:e=new p(e.d||h.s!==e.s?h:NaN),e;if(h.s!=e.s)return e.s=-e.s,h.plus(e);if(f=h.d,m=e.d,l=p.precision,u=p.rounding,!f[0]||!m[0]){if(m[0])e.s=-e.s;else if(f[0])e=new p(h);else return new p(u===3?-0:0);return Le?Me(e,l,u):e}if(i=Nr(e.e/Ee),o=Nr(h.e/Ee),f=f.slice(),a=o-i,a){for(s=a<0,s?(n=f,a=-a,c=m.length):(n=m,i=o,c=f.length),t=Math.max(Math.ceil(l/Ee),c)+2,a>t&&(a=t,n.length=1),n.reverse(),t=a;t--;)n.push(0);n.reverse()}else{for(t=f.length,c=m.length,s=t<c,s&&(c=t),t=0;t<c;t++)if(f[t]!=m[t]){s=f[t]<m[t];break}a=0}for(s&&(n=f,f=m,m=n,e.s=-e.s),c=f.length,t=m.length-c;t>0;--t)f[c++]=0;for(t=m.length;t>a;){if(f[--t]<m[t]){for(r=t;r&&f[--r]===0;)f[r]=Qr-1;--f[r],f[t]+=Qr}f[t]-=m[t]}for(;f[--c]===0;)f.pop();for(;f[0]===0;f.shift())--i;return f[0]?(e.d=f,e.e=$i(f,i),Le?Me(e,l,u):e):new p(u===3?-0:0)};ce.modulo=ce.mod=function(e){var n,i=this,t=i.constructor;return e=new t(e),!i.d||!e.s||e.d&&!e.d[0]?new t(NaN):!e.d||i.d&&!i.d[0]?Me(new t(i),t.precision,t.rounding):(Le=!1,t.modulo==9?(n=rr(i,e.abs(),0,3,1),n.s*=e.s):n=rr(i,e,0,t.modulo,1),n=n.times(e),Le=!0,i.minus(n))};ce.naturalExponential=ce.exp=function(){return xa(this)};ce.naturalLogarithm=ce.ln=function(){return $n(this)};ce.negated=ce.neg=function(){var e=new this.constructor(this);return e.s=-e.s,Me(e)};ce.plus=ce.add=function(e){var n,i,t,r,a,c,l,u,f,o,s=this,m=s.constructor;if(e=new m(e),!s.d||!e.d)return!s.s||!e.s?e=new m(NaN):s.d||(e=new m(e.d||s.s===e.s?s:NaN)),e;if(s.s!=e.s)return e.s=-e.s,s.minus(e);if(f=s.d,o=e.d,l=m.precision,u=m.rounding,!f[0]||!o[0])return o[0]||(e=new m(s)),Le?Me(e,l,u):e;if(a=Nr(s.e/Ee),t=Nr(e.e/Ee),f=f.slice(),r=a-t,r){for(r<0?(i=f,r=-r,c=o.length):(i=o,t=a,c=f.length),a=Math.ceil(l/Ee),c=a>c?a+1:c+1,r>c&&(r=c,i.length=1),i.reverse();r--;)i.push(0);i.reverse()}for(c=f.length,r=o.length,c-r<0&&(r=c,i=o,o=f,f=i),n=0;r;)n=(f[--r]=f[r]+o[r]+n)/Qr|0,f[r]%=Qr;for(n&&(f.unshift(n),++t),c=f.length;f[--c]==0;)f.pop();return e.d=f,e.e=$i(f,t),Le?Me(e,l,u):e};ce.precision=ce.sd=function(e){var n,i=this;if(e!==void 0&&e!==!!e&&e!==1&&e!==0)throw Error(_n+e);return i.d?(n=df(i.d),e&&i.e+1>n&&(n=i.e+1)):n=NaN,n};ce.round=function(){var e=this,n=e.constructor;return Me(new n(e),e.e+1,n.rounding)};ce.sine=ce.sin=function(){var e,n,i=this,t=i.constructor;return i.isFinite()?i.isZero()?new t(i):(e=t.precision,n=t.rounding,t.precision=e+Math.max(i.e,i.sd())+Ee,t.rounding=1,i=zg(t,xf(t,i)),t.precision=e,t.rounding=n,Me(An>2?i.neg():i,e,n,!0)):new t(NaN)};ce.squareRoot=ce.sqrt=function(){var e,n,i,t,r,a,c=this,l=c.d,u=c.e,f=c.s,o=c.constructor;if(f!==1||!l||!l[0])return new o(!f||f<0&&(!l||l[0])?NaN:l?c:1/0);for(Le=!1,f=Math.sqrt(+c),f==0||f==1/0?(n=br(l),(n.length+u)%2==0&&(n+="0"),f=Math.sqrt(n),u=Nr((u+1)/2)-(u<0||u%2),f==1/0?n="5e"+u:(n=f.toExponential(),n=n.slice(0,n.indexOf("e")+1)+u),t=new o(n)):t=new o(f.toString()),i=(u=o.precision)+3;;)if(a=t,t=a.plus(rr(c,a,i+2,1)).times(.5),br(a.d).slice(0,i)===(n=br(t.d)).slice(0,i))if(n=n.slice(i-3,i+1),n=="9999"||!r&&n=="4999"){if(!r&&(Me(a,u+1,0),a.times(a).eq(c))){t=a;break}i+=4,r=1}else{(!+n||!+n.slice(1)&&n.charAt(0)=="5")&&(Me(t,u+1,1),e=!t.times(t).eq(c));break}return Le=!0,Me(t,u,o.rounding,e)};ce.tangent=ce.tan=function(){var e,n,i=this,t=i.constructor;return i.isFinite()?i.isZero()?new t(i):(e=t.precision,n=t.rounding,t.precision=e+10,t.rounding=1,i=i.sin(),i.s=1,i=rr(i,new t(1).minus(i.times(i)).sqrt(),e+10,0),t.precision=e,t.rounding=n,Me(An==2||An==4?i.neg():i,e,n,!0)):new t(NaN)};ce.times=ce.mul=function(e){var n,i,t,r,a,c,l,u,f,o=this,s=o.constructor,m=o.d,h=(e=new s(e)).d;if(e.s*=o.s,!m||!m[0]||!h||!h[0])return new s(!e.s||m&&!m[0]&&!h||h&&!h[0]&&!m?NaN:!m||!h?e.s/0:e.s*0);for(i=Nr(o.e/Ee)+Nr(e.e/Ee),u=m.length,f=h.length,u<f&&(a=m,m=h,h=a,c=u,u=f,f=c),a=[],c=u+f,t=c;t--;)a.push(0);for(t=f;--t>=0;){for(n=0,r=u+t;r>t;)l=a[r]+h[t]*m[r-t-1]+n,a[r--]=l%Qr|0,n=l/Qr|0;a[r]=(a[r]+n)%Qr|0}for(;!a[--c];)a.pop();return n?++i:a.shift(),e.d=a,e.e=$i(a,i),Le?Me(e,s.precision,s.rounding):e};ce.toBinary=function(e,n){return Wa(this,2,e,n)};ce.toDecimalPlaces=ce.toDP=function(e,n){var i=this,t=i.constructor;return i=new t(i),e===void 0?i:(Pr(e,0,Rn),n===void 0?n=t.rounding:Pr(n,0,8),Me(i,e+i.e+1,n))};ce.toExponential=function(e,n){var i,t=this,r=t.constructor;return e===void 0?i=ln(t,!0):(Pr(e,0,Rn),n===void 0?n=r.rounding:Pr(n,0,8),t=Me(new r(t),e+1,n),i=ln(t,!0,e+1)),t.isNeg()&&!t.isZero()?"-"+i:i};ce.toFixed=function(e,n){var i,t,r=this,a=r.constructor;return e===void 0?i=ln(r):(Pr(e,0,Rn),n===void 0?n=a.rounding:Pr(n,0,8),t=Me(new a(r),e+r.e+1,n),i=ln(t,!1,e+t.e+1)),r.isNeg()&&!r.isZero()?"-"+i:i};ce.toFraction=function(e){var n,i,t,r,a,c,l,u,f,o,s,m,h=this,p=h.d,g=h.constructor;if(!p)return new g(h);if(f=i=new g(1),t=u=new g(0),n=new g(t),a=n.e=df(p)-h.e-1,c=a%Ee,n.d[0]=hr(10,c<0?Ee+c:c),e==null)e=a>0?n:f;else{if(l=new g(e),!l.isInt()||l.lt(f))throw Error(_n+l);e=l.gt(n)?a>0?n:f:l}for(Le=!1,l=new g(br(p)),o=g.precision,g.precision=a=p.length*Ee*2;s=rr(l,n,0,1,1),r=i.plus(s.times(t)),r.cmp(e)!=1;)i=t,t=r,r=f,f=u.plus(s.times(r)),u=r,r=n,n=l.minus(s.times(r)),l=r;return r=rr(e.minus(i),t,0,1,1),u=u.plus(r.times(f)),i=i.plus(r.times(t)),u.s=f.s=h.s,m=rr(f,t,a,1).minus(h).abs().cmp(rr(u,i,a,1).minus(h).abs())<1?[f,t]:[u,i],g.precision=o,Le=!0,m};ce.toHexadecimal=ce.toHex=function(e,n){return Wa(this,16,e,n)};ce.toNearest=function(e,n){var i=this,t=i.constructor;if(i=new t(i),e==null){if(!i.d)return i;e=new t(1),n=t.rounding}else{if(e=new t(e),n===void 0?n=t.rounding:Pr(n,0,8),!i.d)return e.s?i:e;if(!e.d)return e.s&&(e.s=i.s),e}return e.d[0]?(Le=!1,i=rr(i,e,0,n,1).times(e),Le=!0,Me(i)):(e.s=i.s,i=e),i};ce.toNumber=function(){return+this};ce.toOctal=function(e,n){return Wa(this,8,e,n)};ce.toPower=ce.pow=function(e){var n,i,t,r,a,c,l=this,u=l.constructor,f=+(e=new u(e));if(!l.d||!e.d||!l.d[0]||!e.d[0])return new u(hr(+l,f));if(l=new u(l),l.eq(1))return l;if(t=u.precision,a=u.rounding,e.eq(1))return Me(l,t,a);if(n=Nr(e.e/Ee),n>=e.d.length-1&&(i=f<0?-f:f)<=Lg)return r=vf(u,l,i,t),e.s<0?new u(1).div(r):Me(r,t,a);if(c=l.s,c<0){if(n<e.d.length-1)return new u(NaN);if((e.d[n]&1)==0&&(c=1),l.e==0&&l.d[0]==1&&l.d.length==1)return l.s=c,l}return i=hr(+l,f),n=i==0||!isFinite(i)?Nr(f*(Math.log("0."+br(l.d))/Math.LN10+l.e+1)):new u(i+"").e,n>u.maxE+1||n<u.minE-1?new u(n>0?c/0:0):(Le=!1,u.rounding=l.s=1,i=Math.min(12,(n+"").length),r=xa(e.times($n(l,t+i)),t),r.d&&(r=Me(r,t+5,1),Ft(r.d,t,a)&&(n=t+10,r=Me(xa(e.times($n(l,n+i)),n),n+5,1),+br(r.d).slice(t+1,t+15)+1==1e14&&(r=Me(r,t+1,0)))),r.s=c,Le=!0,u.rounding=a,Me(r,t,a))};ce.toPrecision=function(e,n){var i,t=this,r=t.constructor;return e===void 0?i=ln(t,t.e<=r.toExpNeg||t.e>=r.toExpPos):(Pr(e,1,Rn),n===void 0?n=r.rounding:Pr(n,0,8),t=Me(new r(t),e,n),i=ln(t,e<=t.e||t.e<=r.toExpNeg,e)),t.isNeg()&&!t.isZero()?"-"+i:i};ce.toSignificantDigits=ce.toSD=function(e,n){var i=this,t=i.constructor;return e===void 0?(e=t.precision,n=t.rounding):(Pr(e,1,Rn),n===void 0?n=t.rounding:Pr(n,0,8)),Me(new t(i),e,n)};ce.toString=function(){var e=this,n=e.constructor,i=ln(e,e.e<=n.toExpNeg||e.e>=n.toExpPos);return e.isNeg()&&!e.isZero()?"-"+i:i};ce.truncated=ce.trunc=function(){return Me(new this.constructor(this),this.e+1,1)};ce.valueOf=ce.toJSON=function(){var e=this,n=e.constructor,i=ln(e,e.e<=n.toExpNeg||e.e>=n.toExpPos);return e.isNeg()?"-"+i:i};function br(e){var n,i,t,r=e.length-1,a="",c=e[0];if(r>0){for(a+=c,n=1;n<r;n++)t=e[n]+"",i=Ee-t.length,i&&(a+=On(i)),a+=t;c=e[n],t=c+"",i=Ee-t.length,i&&(a+=On(i))}else if(c===0)return"0";for(;c%10===0;)c/=10;return a+c}function Pr(e,n,i){if(e!==~~e||e<n||e>i)throw Error(_n+e)}function Ft(e,n,i,t){var r,a,c,l;for(a=e[0];a>=10;a/=10)--n;return--n<0?(n+=Ee,r=0):(r=Math.ceil((n+1)/Ee),n%=Ee),a=hr(10,Ee-n),l=e[r]%a|0,t==null?n<3?(n==0?l=l/100|0:n==1&&(l=l/10|0),c=i<4&&l==99999||i>3&&l==49999||l==5e4||l==0):c=(i<4&&l+1==a||i>3&&l+1==a/2)&&(e[r+1]/a/100|0)==hr(10,n-2)-1||(l==a/2||l==0)&&(e[r+1]/a/100|0)==0:n<4?(n==0?l=l/1e3|0:n==1?l=l/100|0:n==2&&(l=l/10|0),c=(t||i<4)&&l==9999||!t&&i>3&&l==4999):c=((t||i<4)&&l+1==a||!t&&i>3&&l+1==a/2)&&(e[r+1]/a/1e3|0)==hr(10,n-3)-1,c}function hi(e,n,i){for(var t,r=[0],a,c=0,l=e.length;c<l;){for(a=r.length;a--;)r[a]*=n;for(r[0]+=va.indexOf(e.charAt(c++)),t=0;t<r.length;t++)r[t]>i-1&&(r[t+1]===void 0&&(r[t+1]=0),r[t+1]+=r[t]/i|0,r[t]%=i)}return r.reverse()}function Ig(e,n){var i,t,r;if(n.isZero())return n;t=n.d.length,t<32?(i=Math.ceil(t/3),r=(1/_i(4,i)).toString()):(i=16,r="2.3283064365386962890625e-10"),e.precision+=i,n=vt(e,1,n.times(r),new e(1));for(var a=i;a--;){var c=n.times(n);n=c.times(c).minus(c).times(8).plus(1)}return e.precision-=i,n}var rr=function(){function e(t,r,a){var c,l=0,u=t.length;for(t=t.slice();u--;)c=t[u]*r+l,t[u]=c%a|0,l=c/a|0;return l&&t.unshift(l),t}function n(t,r,a,c){var l,u;if(a!=c)u=a>c?1:-1;else for(l=u=0;l<a;l++)if(t[l]!=r[l]){u=t[l]>r[l]?1:-1;break}return u}function i(t,r,a,c){for(var l=0;a--;)t[a]-=l,l=t[a]<r[a]?1:0,t[a]=l*c+t[a]-r[a];for(;!t[0]&&t.length>1;)t.shift()}return function(t,r,a,c,l,u){var f,o,s,m,h,p,g,y,w,A,v,b,x,d,M,S,T,N,D,k,I=t.constructor,_=t.s==r.s?1:-1,O=t.d,B=r.d;if(!O||!O[0]||!B||!B[0])return new I(!t.s||!r.s||(O?B&&O[0]==B[0]:!B)?NaN:O&&O[0]==0||!B?_*0:_/0);for(u?(h=1,o=t.e-r.e):(u=Qr,h=Ee,o=Nr(t.e/h)-Nr(r.e/h)),D=B.length,T=O.length,w=new I(_),A=w.d=[],s=0;B[s]==(O[s]||0);s++);if(B[s]>(O[s]||0)&&o--,a==null?(d=a=I.precision,c=I.rounding):l?d=a+(t.e-r.e)+1:d=a,d<0)A.push(1),p=!0;else{if(d=d/h+2|0,s=0,D==1){for(m=0,B=B[0],d++;(s<T||m)&&d--;s++)M=m*u+(O[s]||0),A[s]=M/B|0,m=M%B|0;p=m||s<T}else{for(m=u/(B[0]+1)|0,m>1&&(B=e(B,m,u),O=e(O,m,u),D=B.length,T=O.length),S=D,v=O.slice(0,D),b=v.length;b<D;)v[b++]=0;k=B.slice(),k.unshift(0),N=B[0],B[1]>=u/2&&++N;do m=0,f=n(B,v,D,b),f<0?(x=v[0],D!=b&&(x=x*u+(v[1]||0)),m=x/N|0,m>1?(m>=u&&(m=u-1),g=e(B,m,u),y=g.length,b=v.length,f=n(g,v,y,b),f==1&&(m--,i(g,D<y?k:B,y,u))):(m==0&&(f=m=1),g=B.slice()),y=g.length,y<b&&g.unshift(0),i(v,g,b,u),f==-1&&(b=v.length,f=n(B,v,D,b),f<1&&(m++,i(v,D<b?k:B,b,u))),b=v.length):f===0&&(m++,v=[0]),A[s++]=m,f&&v[0]?v[b++]=O[S]||0:(v=[O[S]],b=1);while((S++<T||v[0]!==void 0)&&d--);p=v[0]!==void 0}A[0]||A.shift()}if(h==1)w.e=o,ff=p;else{for(s=1,m=A[0];m>=10;m/=10)s++;w.e=s+o*h-1,Me(w,l?a+w.e+1:a,c,p)}return w}}();function Me(e,n,i,t){var r,a,c,l,u,f,o,s,m,h=e.constructor;e:if(n!=null){if(s=e.d,!s)return e;for(r=1,l=s[0];l>=10;l/=10)r++;if(a=n-r,a<0)a+=Ee,c=n,o=s[m=0],u=o/hr(10,r-c-1)%10|0;else if(m=Math.ceil((a+1)/Ee),l=s.length,m>=l)if(t){for(;l++<=m;)s.push(0);o=u=0,r=1,a%=Ee,c=a-Ee+1}else break e;else{for(o=l=s[m],r=1;l>=10;l/=10)r++;a%=Ee,c=a-Ee+r,u=c<0?0:o/hr(10,r-c-1)%10|0}if(t=t||n<0||s[m+1]!==void 0||(c<0?o:o%hr(10,r-c-1)),f=i<4?(u||t)&&(i==0||i==(e.s<0?3:2)):u>5||u==5&&(i==4||t||i==6&&(a>0?c>0?o/hr(10,r-c):0:s[m-1])%10&1||i==(e.s<0?8:7)),n<1||!s[0])return s.length=0,f?(n-=e.e+1,s[0]=hr(10,(Ee-n%Ee)%Ee),e.e=-n||0):s[0]=e.e=0,e;if(a==0?(s.length=m,l=1,m--):(s.length=m+1,l=hr(10,Ee-a),s[m]=c>0?(o/hr(10,r-c)%hr(10,c)|0)*l:0),f)for(;;)if(m==0){for(a=1,c=s[0];c>=10;c/=10)a++;for(c=s[0]+=l,l=1;c>=10;c/=10)l++;a!=l&&(e.e++,s[0]==Qr&&(s[0]=1));break}else{if(s[m]+=l,s[m]!=Qr)break;s[m--]=0,l=1}for(a=s.length;s[--a]===0;)s.pop()}return Le&&(e.e>h.maxE?(e.d=null,e.e=NaN):e.e<h.minE&&(e.e=0,e.d=[0])),e}function ln(e,n,i){if(!e.isFinite())return yf(e);var t,r=e.e,a=br(e.d),c=a.length;return n?(i&&(t=i-c)>0?a=a.charAt(0)+"."+a.slice(1)+On(t):c>1&&(a=a.charAt(0)+"."+a.slice(1)),a=a+(e.e<0?"e":"e+")+e.e):r<0?(a="0."+On(-r-1)+a,i&&(t=i-c)>0&&(a+=On(t))):r>=c?(a+=On(r+1-c),i&&(t=i-r-1)>0&&(a=a+"."+On(t))):((t=r+1)<c&&(a=a.slice(0,t)+"."+a.slice(t)),i&&(t=i-c)>0&&(r+1===c&&(a+="."),a+=On(t))),a}function $i(e,n){var i=e[0];for(n*=Ee;i>=10;i/=10)n++;return n}function Ai(e,n,i){if(n>Dg)throw Le=!0,i&&(e.precision=i),Error(mf);return Me(new e(xi),n,1,!0)}function Jr(e,n,i){if(n>ya)throw Error(mf);return Me(new e(wi),n,i,!0)}function df(e){var n=e.length-1,i=n*Ee+1;if(n=e[n],n){for(;n%10==0;n/=10)i--;for(n=e[0];n>=10;n/=10)i++}return i}function On(e){for(var n="";e--;)n+="0";return n}function vf(e,n,i,t){var r,a=new e(1),c=Math.ceil(t/Ee+4);for(Le=!1;;){if(i%2&&(a=a.times(n),Os(a.d,c)&&(r=!0)),i=Nr(i/2),i===0){i=a.d.length-1,r&&a.d[i]===0&&++a.d[i];break}n=n.times(n),Os(n.d,c)}return Le=!0,a}function Is(e){return e.d[e.d.length-1]&1}function bf(e,n,i){for(var t,r=new e(n[0]),a=0;++a<n.length;)if(t=new e(n[a]),t.s)r[i](t)&&(r=t);else{r=t;break}return r}function xa(e,n){var i,t,r,a,c,l,u,f=0,o=0,s=0,m=e.constructor,h=m.rounding,p=m.precision;if(!e.d||!e.d[0]||e.e>17)return new m(e.d?e.d[0]?e.s<0?0:1/0:1:e.s?e.s<0?0:e:0/0);for(n==null?(Le=!1,u=p):u=n,l=new m(.03125);e.e>-2;)e=e.times(l),s+=5;for(t=Math.log(hr(2,s))/Math.LN10*2+5|0,u+=t,i=a=c=new m(1),m.precision=u;;){if(a=Me(a.times(e),u,1),i=i.times(++o),l=c.plus(rr(a,i,u,1)),br(l.d).slice(0,u)===br(c.d).slice(0,u)){for(r=s;r--;)c=Me(c.times(c),u,1);if(n==null)if(f<3&&Ft(c.d,u-t,h,f))m.precision=u+=10,i=a=l=new m(1),o=0,f++;else return Me(c,m.precision=p,h,Le=!0);else return m.precision=p,c}c=l}}function $n(e,n){var i,t,r,a,c,l,u,f,o,s,m,h=1,p=10,g=e,y=g.d,w=g.constructor,A=w.rounding,v=w.precision;if(g.s<0||!y||!y[0]||!g.e&&y[0]==1&&y.length==1)return new w(y&&!y[0]?-1/0:g.s!=1?NaN:y?0:g);if(n==null?(Le=!1,o=v):o=n,w.precision=o+=p,i=br(y),t=i.charAt(0),Math.abs(a=g.e)<15e14){for(;t<7&&t!=1||t==1&&i.charAt(1)>3;)g=g.times(e),i=br(g.d),t=i.charAt(0),h++;a=g.e,t>1?(g=new w("0."+i),a++):g=new w(t+"."+i.slice(1))}else return f=Ai(w,o+2,v).times(a+""),g=$n(new w(t+"."+i.slice(1)),o-p).plus(f),w.precision=v,n==null?Me(g,v,A,Le=!0):g;for(s=g,u=c=g=rr(g.minus(1),g.plus(1),o,1),m=Me(g.times(g),o,1),r=3;;){if(c=Me(c.times(m),o,1),f=u.plus(rr(c,new w(r),o,1)),br(f.d).slice(0,o)===br(u.d).slice(0,o))if(u=u.times(2),a!==0&&(u=u.plus(Ai(w,o+2,v).times(a+""))),u=rr(u,new w(h),o,1),n==null)if(Ft(u.d,o-p,A,l))w.precision=o+=p,f=c=g=rr(s.minus(1),s.plus(1),o,1),m=Me(g.times(g),o,1),r=l=1;else return Me(u,w.precision=v,A,Le=!0);else return w.precision=v,u;u=f,r+=2}}function yf(e){return String(e.s*e.s/0)}function wa(e,n){var i,t,r;for((i=n.indexOf("."))>-1&&(n=n.replace(".","")),(t=n.search(/e/i))>0?(i<0&&(i=t),i+=+n.slice(t+1),n=n.substring(0,t)):i<0&&(i=n.length),t=0;n.charCodeAt(t)===48;t++);for(r=n.length;n.charCodeAt(r-1)===48;--r);if(n=n.slice(t,r),n){if(r-=t,e.e=i=i-t-1,e.d=[],t=(i+1)%Ee,i<0&&(t+=Ee),t<r){for(t&&e.d.push(+n.slice(0,t)),r-=Ee;t<r;)e.d.push(+n.slice(t,t+=Ee));n=n.slice(t),t=Ee-n.length}else t-=r;for(;t--;)n+="0";e.d.push(+n),Le&&(e.e>e.constructor.maxE?(e.d=null,e.e=NaN):e.e<e.constructor.minE&&(e.e=0,e.d=[0]))}else e.e=0,e.d=[0];return e}function Og(e,n){var i,t,r,a,c,l,u,f,o;if(n.indexOf("_")>-1){if(n=n.replace(/(\d)_(?=\d)/g,"$1"),gf.test(n))return wa(e,n)}else if(n==="Infinity"||n==="NaN")return+n||(e.s=NaN),e.e=NaN,e.d=null,e;if(Cg.test(n))i=16,n=n.toLowerCase();else if(Eg.test(n))i=2;else if(Bg.test(n))i=8;else throw Error(_n+n);for(a=n.search(/p/i),a>0?(u=+n.slice(a+1),n=n.substring(2,a)):n=n.slice(2),a=n.indexOf("."),c=a>=0,t=e.constructor,c&&(n=n.replace(".",""),l=n.length,a=l-a,r=vf(t,new t(i),a,a*2)),f=hi(n,i,Qr),o=f.length-1,a=o;f[a]===0;--a)f.pop();return a<0?new t(e.s*0):(e.e=$i(f,o),e.d=f,Le=!1,c&&(e=rr(e,r,l*4)),u&&(e=e.times(Math.abs(u)<54?hr(2,u):Fn.pow(2,u))),Le=!0,e)}function zg(e,n){var i,t=n.d.length;if(t<3)return n.isZero()?n:vt(e,2,n,n);i=1.4*Math.sqrt(t),i=i>16?16:i|0,n=n.times(1/_i(5,i)),n=vt(e,2,n,n);for(var r,a=new e(5),c=new e(16),l=new e(20);i--;)r=n.times(n),n=n.times(a.plus(r.times(c.times(r).minus(l))));return n}function vt(e,n,i,t,r){var a,c,l,u,f=e.precision,o=Math.ceil(f/Ee);for(Le=!1,u=i.times(i),l=new e(t);;){if(c=rr(l.times(u),new e(n++*n++),f,1),l=r?t.plus(c):t.minus(c),t=rr(c.times(u),new e(n++*n++),f,1),c=l.plus(t),c.d[o]!==void 0){for(a=o;c.d[a]===l.d[a]&&a--;);if(a==-1)break}a=l,l=t,t=c,c=a}return Le=!0,c.d.length=o+1,c}function _i(e,n){for(var i=e;--n;)i*=e;return i}function xf(e,n){var i,t=n.s<0,r=Jr(e,e.precision,1),a=r.times(.5);if(n=n.abs(),n.lte(a))return An=t?4:1,n;if(i=n.divToInt(r),i.isZero())An=t?3:2;else{if(n=n.minus(i.times(r)),n.lte(a))return An=Is(i)?t?2:3:t?4:1,n;An=Is(i)?t?1:4:t?3:2}return n.minus(r).abs()}function Wa(e,n,i,t){var r,a,c,l,u,f,o,s,m,h=e.constructor,p=i!==void 0;if(p?(Pr(i,1,Rn),t===void 0?t=h.rounding:Pr(t,0,8)):(i=h.precision,t=h.rounding),!e.isFinite())o=yf(e);else{for(o=ln(e),c=o.indexOf("."),p?(r=2,n==16?i=i*4-3:n==8&&(i=i*3-2)):r=n,c>=0&&(o=o.replace(".",""),m=new h(1),m.e=o.length-c,m.d=hi(ln(m),10,r),m.e=m.d.length),s=hi(o,10,r),a=u=s.length;s[--u]==0;)s.pop();if(!s[0])o=p?"0p+0":"0";else{if(c<0?a--:(e=new h(e),e.d=s,e.e=a,e=rr(e,m,i,t,0,r),s=e.d,a=e.e,f=ff),c=s[i],l=r/2,f=f||s[i+1]!==void 0,f=t<4?(c!==void 0||f)&&(t===0||t===(e.s<0?3:2)):c>l||c===l&&(t===4||f||t===6&&s[i-1]&1||t===(e.s<0?8:7)),s.length=i,f)for(;++s[--i]>r-1;)s[i]=0,i||(++a,s.unshift(1));for(u=s.length;!s[u-1];--u);for(c=0,o="";c<u;c++)o+=va.charAt(s[c]);if(p){if(u>1)if(n==16||n==8){for(c=n==16?4:3,--u;u%c;u++)o+="0";for(s=hi(o,r,n),u=s.length;!s[u-1];--u);for(c=1,o="1.";c<u;c++)o+=va.charAt(s[c])}else o=o.charAt(0)+"."+o.slice(1);o=o+(a<0?"p":"p+")+a}else if(a<0){for(;++a;)o="0"+o;o="0."+o}else if(++a>u)for(a-=u;a--;)o+="0";else a<u&&(o=o.slice(0,a)+"."+o.slice(a))}o=(n==16?"0x":n==2?"0b":n==8?"0o":"")+o}return e.s<0?"-"+o:o}function Os(e,n){if(e.length>n)return e.length=n,!0}function Pg(e){return new this(e).abs()}function $g(e){return new this(e).acos()}function _g(e){return new this(e).acosh()}function Fg(e,n){return new this(e).plus(n)}function Rg(e){return new this(e).asin()}function qg(e){return new this(e).asinh()}function Kg(e){return new this(e).atan()}function Ug(e){return new this(e).atanh()}function Vg(e,n){e=new this(e),n=new this(n);var i,t=this.precision,r=this.rounding,a=t+4;return!e.s||!n.s?i=new this(NaN):!e.d&&!n.d?(i=Jr(this,a,1).times(n.s>0?.25:.75),i.s=e.s):!n.d||e.isZero()?(i=n.s<0?Jr(this,t,r):new this(0),i.s=e.s):!e.d||n.isZero()?(i=Jr(this,a,1).times(.5),i.s=e.s):n.s<0?(this.precision=a,this.rounding=1,i=this.atan(rr(e,n,a,1)),n=Jr(this,a,1),this.precision=t,this.rounding=r,i=e.s<0?i.minus(n):i.plus(n)):i=this.atan(rr(e,n,a,1)),i}function Wg(e){return new this(e).cbrt()}function Gg(e){return Me(e=new this(e),e.e+1,2)}function Hg(e,n,i){return new this(e).clamp(n,i)}function Zg(e){if(!e||typeof e!="object")throw Error(Pi+"Object expected");var n,i,t,r=e.defaults===!0,a=["precision",1,Rn,"rounding",0,8,"toExpNeg",-ft,0,"toExpPos",0,ft,"maxE",0,ft,"minE",-ft,0,"modulo",0,9];for(n=0;n<a.length;n+=3)if(i=a[n],r&&(this[i]=ba[i]),(t=e[i])!==void 0)if(Nr(t)===t&&t>=a[n+1]&&t<=a[n+2])this[i]=t;else throw Error(_n+i+": "+t);if(i="crypto",r&&(this[i]=ba[i]),(t=e[i])!==void 0)if(t===!0||t===!1||t===0||t===1)if(t)if(typeof crypto!="undefined"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))this[i]=!0;else throw Error(hf);else this[i]=!1;else throw Error(_n+i+": "+t);return this}function Xg(e){return new this(e).cos()}function Yg(e){return new this(e).cosh()}function wf(e){var n,i,t;function r(a){var c,l,u,f=this;if(!(f instanceof r))return new r(a);if(f.constructor=r,zs(a)){f.s=a.s,Le?!a.d||a.e>r.maxE?(f.e=NaN,f.d=null):a.e<r.minE?(f.e=0,f.d=[0]):(f.e=a.e,f.d=a.d.slice()):(f.e=a.e,f.d=a.d?a.d.slice():a.d);return}if(u=typeof a,u==="number"){if(a===0){f.s=1/a<0?-1:1,f.e=0,f.d=[0];return}if(a<0?(a=-a,f.s=-1):f.s=1,a===~~a&&a<1e7){for(c=0,l=a;l>=10;l/=10)c++;Le?c>r.maxE?(f.e=NaN,f.d=null):c<r.minE?(f.e=0,f.d=[0]):(f.e=c,f.d=[a]):(f.e=c,f.d=[a]);return}else if(a*0!==0){a||(f.s=NaN),f.e=NaN,f.d=null;return}return wa(f,a.toString())}else if(u!=="string")throw Error(_n+a);return(l=a.charCodeAt(0))===45?(a=a.slice(1),f.s=-1):(l===43&&(a=a.slice(1)),f.s=1),gf.test(a)?wa(f,a):Og(f,a)}if(r.prototype=ce,r.ROUND_UP=0,r.ROUND_DOWN=1,r.ROUND_CEIL=2,r.ROUND_FLOOR=3,r.ROUND_HALF_UP=4,r.ROUND_HALF_DOWN=5,r.ROUND_HALF_EVEN=6,r.ROUND_HALF_CEIL=7,r.ROUND_HALF_FLOOR=8,r.EUCLID=9,r.config=r.set=Zg,r.clone=wf,r.isDecimal=zs,r.abs=Pg,r.acos=$g,r.acosh=_g,r.add=Fg,r.asin=Rg,r.asinh=qg,r.atan=Kg,r.atanh=Ug,r.atan2=Vg,r.cbrt=Wg,r.ceil=Gg,r.clamp=Hg,r.cos=Xg,r.cosh=Yg,r.div=Jg,r.exp=Qg,r.floor=jg,r.hypot=e1,r.ln=r1,r.log=n1,r.log10=i1,r.log2=t1,r.max=a1,r.min=s1,r.mod=o1,r.mul=u1,r.pow=c1,r.random=l1,r.round=f1,r.sign=m1,r.sin=h1,r.sinh=p1,r.sqrt=g1,r.sub=d1,r.sum=v1,r.tan=b1,r.tanh=y1,r.trunc=x1,e===void 0&&(e={}),e&&e.defaults!==!0)for(t=["precision","rounding","toExpNeg","toExpPos","maxE","minE","modulo","crypto"],n=0;n<t.length;)e.hasOwnProperty(i=t[n++])||(e[i]=this[i]);return r.config(e),r}function Jg(e,n){return new this(e).div(n)}function Qg(e){return new this(e).exp()}function jg(e){return Me(e=new this(e),e.e+1,3)}function e1(){var e,n,i=new this(0);for(Le=!1,e=0;e<arguments.length;)if(n=new this(arguments[e++]),n.d)i.d&&(i=i.plus(n.times(n)));else{if(n.s)return Le=!0,new this(1/0);i=n}return Le=!0,i.sqrt()}function zs(e){return e instanceof Fn||e&&e.toStringTag===pf||!1}function r1(e){return new this(e).ln()}function n1(e,n){return new this(e).log(n)}function t1(e){return new this(e).log(2)}function i1(e){return new this(e).log(10)}function a1(){return bf(this,arguments,"lt")}function s1(){return bf(this,arguments,"gt")}function o1(e,n){return new this(e).mod(n)}function u1(e,n){return new this(e).mul(n)}function c1(e,n){return new this(e).pow(n)}function l1(e){var n,i,t,r,a=0,c=new this(1),l=[];if(e===void 0?e=this.precision:Pr(e,1,Rn),t=Math.ceil(e/Ee),this.crypto)if(crypto.getRandomValues)for(n=crypto.getRandomValues(new Uint32Array(t));a<t;)r=n[a],r>=429e7?n[a]=crypto.getRandomValues(new Uint32Array(1))[0]:l[a++]=r%1e7;else if(crypto.randomBytes){for(n=crypto.randomBytes(t*=4);a<t;)r=n[a]+(n[a+1]<<8)+(n[a+2]<<16)+((n[a+3]&127)<<24),r>=214e7?crypto.randomBytes(4).copy(n,a):(l.push(r%1e7),a+=4);a=t/4}else throw Error(hf);else for(;a<t;)l[a++]=Math.random()*1e7|0;for(t=l[--a],e%=Ee,t&&e&&(r=hr(10,Ee-e),l[a]=(t/r|0)*r);l[a]===0;a--)l.pop();if(a<0)i=0,l=[0];else{for(i=-1;l[0]===0;i-=Ee)l.shift();for(t=1,r=l[0];r>=10;r/=10)t++;t<Ee&&(i-=Ee-t)}return c.e=i,c.d=l,c}function f1(e){return Me(e=new this(e),e.e+1,this.rounding)}function m1(e){return e=new this(e),e.d?e.d[0]?e.s:0*e.s:e.s||NaN}function h1(e){return new this(e).sin()}function p1(e){return new this(e).sinh()}function g1(e){return new this(e).sqrt()}function d1(e,n){return new this(e).sub(n)}function v1(){var e=0,n=arguments,i=new this(n[e]);for(Le=!1;i.s&&++e<n.length;)i=i.plus(n[e]);return Le=!0,Me(i,this.precision,this.rounding)}function b1(e){return new this(e).tan()}function y1(e){return new this(e).tanh()}function x1(e){return Me(e=new this(e),e.e+1,1)}ce[Symbol.for("nodejs.util.inspect.custom")]=ce.toString;ce[Symbol.toStringTag]="Decimal";var Fn=ce.constructor=wf(ba);xi=new Fn(xi);wi=new Fn(wi);var w1="BigNumber",A1=["?on","config"],N1=P(w1,A1,e=>{var{on:n,config:i}=e,t=Fn.clone({precision:i.precision,modulo:Fn.EUCLID});return t.prototype=Object.create(t.prototype),t.prototype.type="BigNumber",t.prototype.isBigNumber=!0,t.prototype.toJSON=function(){return{mathjs:"BigNumber",value:this.toString()}},t.fromJSON=function(r){return new t(r.value)},n&&n("config",function(r,a){r.precision!==a.precision&&t.config({precision:r.precision})}),t},{isClass:!0}),Af={exports:{}};/**
 * @license Complex.js v2.1.1 12/05/2020
 *
 * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/(function(e,n){(function(i){var t=Math.cosh||function(s){return Math.abs(s)<1e-9?1-s:(Math.exp(s)+Math.exp(-s))*.5},r=Math.sinh||function(s){return Math.abs(s)<1e-9?s:(Math.exp(s)-Math.exp(-s))*.5},a=function(s){var m=Math.PI/4;if(-m>s||s>m)return Math.cos(s)-1;var h=s*s;return h*(h*(h*(h*(h*(h*(h*(h/20922789888e3-1/87178291200)+1/479001600)-1/3628800)+1/40320)-1/720)+1/24)-1/2)},c=function(s,m){var h=Math.abs(s),p=Math.abs(m);return h<3e3&&p<3e3?Math.sqrt(h*h+p*p):(h<p?(h=p,p=s/m):p=m/s,h*Math.sqrt(1+p*p))},l=function(){throw SyntaxError("Invalid Param")};function u(s,m){var h=Math.abs(s),p=Math.abs(m);return s===0?Math.log(p):m===0?Math.log(h):h<3e3&&p<3e3?Math.log(s*s+m*m)*.5:(s=s/2,m=m/2,.5*Math.log(s*s+m*m)+Math.LN2)}var f=function(s,m){var h={re:0,im:0};if(s==null)h.re=h.im=0;else if(m!==void 0)h.re=s,h.im=m;else switch(typeof s){case"object":if("im"in s&&"re"in s)h.re=s.re,h.im=s.im;else if("abs"in s&&"arg"in s){if(!Number.isFinite(s.abs)&&Number.isFinite(s.arg))return o.INFINITY;h.re=s.abs*Math.cos(s.arg),h.im=s.abs*Math.sin(s.arg)}else if("r"in s&&"phi"in s){if(!Number.isFinite(s.r)&&Number.isFinite(s.phi))return o.INFINITY;h.re=s.r*Math.cos(s.phi),h.im=s.r*Math.sin(s.phi)}else s.length===2?(h.re=s[0],h.im=s[1]):l();break;case"string":h.im=h.re=0;var p=s.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g),g=1,y=0;p===null&&l();for(var w=0;w<p.length;w++){var A=p[w];A===" "||A==="	"||A===`
`||(A==="+"?g++:A==="-"?y++:A==="i"||A==="I"?(g+y===0&&l(),p[w+1]!==" "&&!isNaN(p[w+1])?(h.im+=parseFloat((y%2?"-":"")+p[w+1]),w++):h.im+=parseFloat((y%2?"-":"")+"1"),g=y=0):((g+y===0||isNaN(A))&&l(),p[w+1]==="i"||p[w+1]==="I"?(h.im+=parseFloat((y%2?"-":"")+A),w++):h.re+=parseFloat((y%2?"-":"")+A),g=y=0))}g+y>0&&l();break;case"number":h.im=0,h.re=s;break;default:l()}return isNaN(h.re)||isNaN(h.im),h};function o(s,m){if(!(this instanceof o))return new o(s,m);var h=f(s,m);this.re=h.re,this.im=h.im}o.prototype={re:0,im:0,sign:function(){var s=this.abs();return new o(this.re/s,this.im/s)},add:function(s,m){var h=new o(s,m);return this.isInfinite()&&h.isInfinite()?o.NAN:this.isInfinite()||h.isInfinite()?o.INFINITY:new o(this.re+h.re,this.im+h.im)},sub:function(s,m){var h=new o(s,m);return this.isInfinite()&&h.isInfinite()?o.NAN:this.isInfinite()||h.isInfinite()?o.INFINITY:new o(this.re-h.re,this.im-h.im)},mul:function(s,m){var h=new o(s,m);return this.isInfinite()&&h.isZero()||this.isZero()&&h.isInfinite()?o.NAN:this.isInfinite()||h.isInfinite()?o.INFINITY:h.im===0&&this.im===0?new o(this.re*h.re,0):new o(this.re*h.re-this.im*h.im,this.re*h.im+this.im*h.re)},div:function(s,m){var h=new o(s,m);if(this.isZero()&&h.isZero()||this.isInfinite()&&h.isInfinite())return o.NAN;if(this.isInfinite()||h.isZero())return o.INFINITY;if(this.isZero()||h.isInfinite())return o.ZERO;s=this.re,m=this.im;var p=h.re,g=h.im,y,w;return g===0?new o(s/p,m/p):Math.abs(p)<Math.abs(g)?(w=p/g,y=p*w+g,new o((s*w+m)/y,(m*w-s)/y)):(w=g/p,y=g*w+p,new o((s+m*w)/y,(m-s*w)/y))},pow:function(s,m){var h=new o(s,m);if(s=this.re,m=this.im,h.isZero())return o.ONE;if(h.im===0){if(m===0&&s>0)return new o(Math.pow(s,h.re),0);if(s===0)switch((h.re%4+4)%4){case 0:return new o(Math.pow(m,h.re),0);case 1:return new o(0,Math.pow(m,h.re));case 2:return new o(-Math.pow(m,h.re),0);case 3:return new o(0,-Math.pow(m,h.re))}}if(s===0&&m===0&&h.re>0&&h.im>=0)return o.ZERO;var p=Math.atan2(m,s),g=u(s,m);return s=Math.exp(h.re*g-h.im*p),m=h.im*g+h.re*p,new o(s*Math.cos(m),s*Math.sin(m))},sqrt:function(){var s=this.re,m=this.im,h=this.abs(),p,g;if(s>=0){if(m===0)return new o(Math.sqrt(s),0);p=.5*Math.sqrt(2*(h+s))}else p=Math.abs(m)/Math.sqrt(2*(h-s));return s<=0?g=.5*Math.sqrt(2*(h-s)):g=Math.abs(m)/Math.sqrt(2*(h+s)),new o(p,m<0?-g:g)},exp:function(){var s=Math.exp(this.re);return this.im,new o(s*Math.cos(this.im),s*Math.sin(this.im))},expm1:function(){var s=this.re,m=this.im;return new o(Math.expm1(s)*Math.cos(m)+a(m),Math.exp(s)*Math.sin(m))},log:function(){var s=this.re,m=this.im;return new o(u(s,m),Math.atan2(m,s))},abs:function(){return c(this.re,this.im)},arg:function(){return Math.atan2(this.im,this.re)},sin:function(){var s=this.re,m=this.im;return new o(Math.sin(s)*t(m),Math.cos(s)*r(m))},cos:function(){var s=this.re,m=this.im;return new o(Math.cos(s)*t(m),-Math.sin(s)*r(m))},tan:function(){var s=2*this.re,m=2*this.im,h=Math.cos(s)+t(m);return new o(Math.sin(s)/h,r(m)/h)},cot:function(){var s=2*this.re,m=2*this.im,h=Math.cos(s)-t(m);return new o(-Math.sin(s)/h,r(m)/h)},sec:function(){var s=this.re,m=this.im,h=.5*t(2*m)+.5*Math.cos(2*s);return new o(Math.cos(s)*t(m)/h,Math.sin(s)*r(m)/h)},csc:function(){var s=this.re,m=this.im,h=.5*t(2*m)-.5*Math.cos(2*s);return new o(Math.sin(s)*t(m)/h,-Math.cos(s)*r(m)/h)},asin:function(){var s=this.re,m=this.im,h=new o(m*m-s*s+1,-2*s*m).sqrt(),p=new o(h.re-m,h.im+s).log();return new o(p.im,-p.re)},acos:function(){var s=this.re,m=this.im,h=new o(m*m-s*s+1,-2*s*m).sqrt(),p=new o(h.re-m,h.im+s).log();return new o(Math.PI/2-p.im,p.re)},atan:function(){var s=this.re,m=this.im;if(s===0){if(m===1)return new o(0,1/0);if(m===-1)return new o(0,-1/0)}var h=s*s+(1-m)*(1-m),p=new o((1-m*m-s*s)/h,-2*s/h).log();return new o(-.5*p.im,.5*p.re)},acot:function(){var s=this.re,m=this.im;if(m===0)return new o(Math.atan2(1,s),0);var h=s*s+m*m;return h!==0?new o(s/h,-m/h).atan():new o(s!==0?s/0:0,m!==0?-m/0:0).atan()},asec:function(){var s=this.re,m=this.im;if(s===0&&m===0)return new o(0,1/0);var h=s*s+m*m;return h!==0?new o(s/h,-m/h).acos():new o(s!==0?s/0:0,m!==0?-m/0:0).acos()},acsc:function(){var s=this.re,m=this.im;if(s===0&&m===0)return new o(Math.PI/2,1/0);var h=s*s+m*m;return h!==0?new o(s/h,-m/h).asin():new o(s!==0?s/0:0,m!==0?-m/0:0).asin()},sinh:function(){var s=this.re,m=this.im;return new o(r(s)*Math.cos(m),t(s)*Math.sin(m))},cosh:function(){var s=this.re,m=this.im;return new o(t(s)*Math.cos(m),r(s)*Math.sin(m))},tanh:function(){var s=2*this.re,m=2*this.im,h=t(s)+Math.cos(m);return new o(r(s)/h,Math.sin(m)/h)},coth:function(){var s=2*this.re,m=2*this.im,h=t(s)-Math.cos(m);return new o(r(s)/h,-Math.sin(m)/h)},csch:function(){var s=this.re,m=this.im,h=Math.cos(2*m)-t(2*s);return new o(-2*r(s)*Math.cos(m)/h,2*t(s)*Math.sin(m)/h)},sech:function(){var s=this.re,m=this.im,h=Math.cos(2*m)+t(2*s);return new o(2*t(s)*Math.cos(m)/h,-2*r(s)*Math.sin(m)/h)},asinh:function(){var s=this.im;this.im=-this.re,this.re=s;var m=this.asin();return this.re=-this.im,this.im=s,s=m.re,m.re=-m.im,m.im=s,m},acosh:function(){var s=this.acos();if(s.im<=0){var m=s.re;s.re=-s.im,s.im=m}else{var m=s.im;s.im=-s.re,s.re=m}return s},atanh:function(){var s=this.re,m=this.im,h=s>1&&m===0,p=1-s,g=1+s,y=p*p+m*m,w=y!==0?new o((g*p-m*m)/y,(m*p+g*m)/y):new o(s!==-1?s/0:0,m!==0?m/0:0),A=w.re;return w.re=u(w.re,w.im)/2,w.im=Math.atan2(w.im,A)/2,h&&(w.im=-w.im),w},acoth:function(){var s=this.re,m=this.im;if(s===0&&m===0)return new o(0,Math.PI/2);var h=s*s+m*m;return h!==0?new o(s/h,-m/h).atanh():new o(s!==0?s/0:0,m!==0?-m/0:0).atanh()},acsch:function(){var s=this.re,m=this.im;if(m===0)return new o(s!==0?Math.log(s+Math.sqrt(s*s+1)):1/0,0);var h=s*s+m*m;return h!==0?new o(s/h,-m/h).asinh():new o(s!==0?s/0:0,m!==0?-m/0:0).asinh()},asech:function(){var s=this.re,m=this.im;if(this.isZero())return o.INFINITY;var h=s*s+m*m;return h!==0?new o(s/h,-m/h).acosh():new o(s!==0?s/0:0,m!==0?-m/0:0).acosh()},inverse:function(){if(this.isZero())return o.INFINITY;if(this.isInfinite())return o.ZERO;var s=this.re,m=this.im,h=s*s+m*m;return new o(s/h,-m/h)},conjugate:function(){return new o(this.re,-this.im)},neg:function(){return new o(-this.re,-this.im)},ceil:function(s){return s=Math.pow(10,s||0),new o(Math.ceil(this.re*s)/s,Math.ceil(this.im*s)/s)},floor:function(s){return s=Math.pow(10,s||0),new o(Math.floor(this.re*s)/s,Math.floor(this.im*s)/s)},round:function(s){return s=Math.pow(10,s||0),new o(Math.round(this.re*s)/s,Math.round(this.im*s)/s)},equals:function(s,m){var h=new o(s,m);return Math.abs(h.re-this.re)<=o.EPSILON&&Math.abs(h.im-this.im)<=o.EPSILON},clone:function(){return new o(this.re,this.im)},toString:function(){var s=this.re,m=this.im,h="";return this.isNaN()?"NaN":this.isInfinite()?"Infinity":(Math.abs(s)<o.EPSILON&&(s=0),Math.abs(m)<o.EPSILON&&(m=0),m===0?h+s:(s!==0?(h+=s,h+=" ",m<0?(m=-m,h+="-"):h+="+",h+=" "):m<0&&(m=-m,h+="-"),m!==1&&(h+=m),h+"i"))},toVector:function(){return[this.re,this.im]},valueOf:function(){return this.im===0?this.re:null},isNaN:function(){return isNaN(this.re)||isNaN(this.im)},isZero:function(){return this.im===0&&this.re===0},isFinite:function(){return isFinite(this.re)&&isFinite(this.im)},isInfinite:function(){return!(this.isNaN()||this.isFinite())}},o.ZERO=new o(0,0),o.ONE=new o(1,0),o.I=new o(0,1),o.PI=new o(Math.PI,0),o.E=new o(Math.E,0),o.INFINITY=new o(1/0,1/0),o.NAN=new o(NaN,NaN),o.EPSILON=1e-15,Object.defineProperty(o,"__esModule",{value:!0}),o.default=o,o.Complex=o,e.exports=o})()})(Af);var Lr=Yl(Af.exports),S1="Complex",M1=[],T1=P(S1,M1,()=>(Lr.prototype.type="Complex",Lr.prototype.isComplex=!0,Lr.prototype.toJSON=function(){return{mathjs:"Complex",re:this.re,im:this.im}},Lr.prototype.toPolar=function(){return{r:this.abs(),phi:this.arg()}},Lr.prototype.format=function(e){var n="",i=this.im,t=this.re,r=Wn(this.re,e),a=Wn(this.im,e),c=Fe(e)?e:e?e.precision:null;if(c!==null){var l=Math.pow(10,-c);Math.abs(t/i)<l&&(t=0),Math.abs(i/t)<l&&(i=0)}return i===0?n=r:t===0?i===1?n="i":i===-1?n="-i":n=a+"i":i<0?i===-1?n=r+" - i":n=r+" - "+a.substring(1)+"i":i===1?n=r+" + i":n=r+" + "+a+"i",n},Lr.fromPolar=function(e){switch(arguments.length){case 1:{var n=arguments[0];if(typeof n=="object")return Lr(n);throw new TypeError("Input has to be an object with r and phi keys.")}case 2:{var i=arguments[0],t=arguments[1];if(Fe(i)){if(Kt(t)&&t.hasBase("ANGLE")&&(t=t.toNumber("rad")),Fe(t))return new Lr({r:i,phi:t});throw new TypeError("Phi is not a number nor an angle unit.")}else throw new TypeError("Radius r is not a number.")}default:throw new SyntaxError("Wrong number of arguments in function fromPolar")}},Lr.prototype.valueOf=Lr.prototype.toString,Lr.fromJSON=function(e){return new Lr(e)},Lr.compare=function(e,n){return e.re>n.re?1:e.re<n.re?-1:e.im>n.im?1:e.im<n.im?-1:0},Lr),{isClass:!0}),Nf={exports:{}};/**
 * @license Fraction.js v4.2.0 05/03/2022
 * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
 *
 * Copyright (c) 2021, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/(function(e,n){(function(i){var t=2e3,r={s:1,n:0,d:1};function a(p,g){if(isNaN(p=parseInt(p,10)))throw h.InvalidParameter;return p*g}function c(p,g){if(g===0)throw h.DivisionByZero;var y=Object.create(h.prototype);y.s=p<0?-1:1,p=p<0?-p:p;var w=m(p,g);return y.n=p/w,y.d=g/w,y}function l(p){for(var g={},y=p,w=2,A=4;A<=y;){for(;y%w===0;)y/=w,g[w]=(g[w]||0)+1;A+=1+2*w++}return y!==p?y>1&&(g[y]=(g[y]||0)+1):g[p]=(g[p]||0)+1,g}var u=function(p,g){var y=0,w=1,A=1,v=0,b=0,x=0,d=1,M=1,S=0,T=1,N=1,D=1,k=1e7,I;if(p!=null)if(g!==void 0){if(y=p,w=g,A=y*w,y%1!==0||w%1!==0)throw h.NonIntegerParameter}else switch(typeof p){case"object":{if("d"in p&&"n"in p)y=p.n,w=p.d,"s"in p&&(y*=p.s);else if(0 in p)y=p[0],1 in p&&(w=p[1]);else throw h.InvalidParameter;A=y*w;break}case"number":{if(p<0&&(A=p,p=-p),p%1===0)y=p;else if(p>0){for(p>=1&&(M=Math.pow(10,Math.floor(1+Math.log(p)/Math.LN10)),p/=M);T<=k&&D<=k;)if(I=(S+N)/(T+D),p===I){T+D<=k?(y=S+N,w=T+D):D>T?(y=N,w=D):(y=S,w=T);break}else p>I?(S+=N,T+=D):(N+=S,D+=T),T>k?(y=N,w=D):(y=S,w=T);y*=M}else(isNaN(p)||isNaN(g))&&(w=y=NaN);break}case"string":{if(T=p.match(/\d+|./g),T===null)throw h.InvalidParameter;if(T[S]==="-"?(A=-1,S++):T[S]==="+"&&S++,T.length===S+1?b=a(T[S++],A):T[S+1]==="."||T[S]==="."?(T[S]!=="."&&(v=a(T[S++],A)),S++,(S+1===T.length||T[S+1]==="("&&T[S+3]===")"||T[S+1]==="'"&&T[S+3]==="'")&&(b=a(T[S],A),d=Math.pow(10,T[S].length),S++),(T[S]==="("&&T[S+2]===")"||T[S]==="'"&&T[S+2]==="'")&&(x=a(T[S+1],A),M=Math.pow(10,T[S+1].length)-1,S+=3)):T[S+1]==="/"||T[S+1]===":"?(b=a(T[S],A),d=a(T[S+2],1),S+=3):T[S+3]==="/"&&T[S+1]===" "&&(v=a(T[S],A),b=a(T[S+2],A),d=a(T[S+4],1),S+=5),T.length<=S){w=d*M,A=y=x+w*v+M*b;break}}default:throw h.InvalidParameter}if(w===0)throw h.DivisionByZero;r.s=A<0?-1:1,r.n=Math.abs(y),r.d=Math.abs(w)};function f(p,g,y){for(var w=1;g>0;p=p*p%y,g>>=1)g&1&&(w=w*p%y);return w}function o(p,g){for(;g%2===0;g/=2);for(;g%5===0;g/=5);if(g===1)return 0;for(var y=10%g,w=1;y!==1;w++)if(y=y*10%g,w>t)return 0;return w}function s(p,g,y){for(var w=1,A=f(10,y,g),v=0;v<300;v++){if(w===A)return v;w=w*10%g,A=A*10%g}return 0}function m(p,g){if(!p)return g;if(!g)return p;for(;;){if(p%=g,!p)return g;if(g%=p,!g)return p}}function h(p,g){if(u(p,g),this instanceof h)p=m(r.d,r.n),this.s=r.s,this.n=r.n/p,this.d=r.d/p;else return c(r.s*r.n,r.d)}h.DivisionByZero=new Error("Division by Zero"),h.InvalidParameter=new Error("Invalid argument"),h.NonIntegerParameter=new Error("Parameters must be integer"),h.prototype={s:1,n:0,d:1,abs:function(){return c(this.n,this.d)},neg:function(){return c(-this.s*this.n,this.d)},add:function(p,g){return u(p,g),c(this.s*this.n*r.d+r.s*this.d*r.n,this.d*r.d)},sub:function(p,g){return u(p,g),c(this.s*this.n*r.d-r.s*this.d*r.n,this.d*r.d)},mul:function(p,g){return u(p,g),c(this.s*r.s*this.n*r.n,this.d*r.d)},div:function(p,g){return u(p,g),c(this.s*r.s*this.n*r.d,this.d*r.n)},clone:function(){return c(this.s*this.n,this.d)},mod:function(p,g){if(isNaN(this.n)||isNaN(this.d))return new h(NaN);if(p===void 0)return c(this.s*this.n%this.d,1);if(u(p,g),r.n===0&&this.d===0)throw h.DivisionByZero;return c(this.s*(r.d*this.n)%(r.n*this.d),r.d*this.d)},gcd:function(p,g){return u(p,g),c(m(r.n,this.n)*m(r.d,this.d),r.d*this.d)},lcm:function(p,g){return u(p,g),r.n===0&&this.n===0?c(0,1):c(r.n*this.n,m(r.n,this.n)*m(r.d,this.d))},ceil:function(p){return p=Math.pow(10,p||0),isNaN(this.n)||isNaN(this.d)?new h(NaN):c(Math.ceil(p*this.s*this.n/this.d),p)},floor:function(p){return p=Math.pow(10,p||0),isNaN(this.n)||isNaN(this.d)?new h(NaN):c(Math.floor(p*this.s*this.n/this.d),p)},round:function(p){return p=Math.pow(10,p||0),isNaN(this.n)||isNaN(this.d)?new h(NaN):c(Math.round(p*this.s*this.n/this.d),p)},inverse:function(){return c(this.s*this.d,this.n)},pow:function(p,g){if(u(p,g),r.d===1)return r.s<0?c(Math.pow(this.s*this.d,r.n),Math.pow(this.n,r.n)):c(Math.pow(this.s*this.n,r.n),Math.pow(this.d,r.n));if(this.s<0)return null;var y=l(this.n),w=l(this.d),A=1,v=1;for(var b in y)if(b!=="1"){if(b==="0"){A=0;break}if(y[b]*=r.n,y[b]%r.d===0)y[b]/=r.d;else return null;A*=Math.pow(b,y[b])}for(var b in w)if(b!=="1"){if(w[b]*=r.n,w[b]%r.d===0)w[b]/=r.d;else return null;v*=Math.pow(b,w[b])}return r.s<0?c(v,A):c(A,v)},equals:function(p,g){return u(p,g),this.s*this.n*r.d===r.s*r.n*this.d},compare:function(p,g){u(p,g);var y=this.s*this.n*r.d-r.s*r.n*this.d;return(0<y)-(y<0)},simplify:function(p){if(isNaN(this.n)||isNaN(this.d))return this;p=p||.001;for(var g=this.abs(),y=g.toContinued(),w=1;w<y.length;w++){for(var A=c(y[w-1],1),v=w-2;v>=0;v--)A=A.inverse().add(y[v]);if(A.sub(g).abs().valueOf()<p)return A.mul(this.s)}return this},divisible:function(p,g){return u(p,g),!(!(r.n*this.d)||this.n*r.d%(r.n*this.d))},valueOf:function(){return this.s*this.n/this.d},toFraction:function(p){var g,y="",w=this.n,A=this.d;return this.s<0&&(y+="-"),A===1?y+=w:(p&&(g=Math.floor(w/A))>0&&(y+=g,y+=" ",w%=A),y+=w,y+="/",y+=A),y},toLatex:function(p){var g,y="",w=this.n,A=this.d;return this.s<0&&(y+="-"),A===1?y+=w:(p&&(g=Math.floor(w/A))>0&&(y+=g,w%=A),y+="\\frac{",y+=w,y+="}{",y+=A,y+="}"),y},toContinued:function(){var p,g=this.n,y=this.d,w=[];if(isNaN(g)||isNaN(y))return w;do w.push(Math.floor(g/y)),p=g%y,g=y,y=p;while(g!==1);return w},toString:function(p){var g=this.n,y=this.d;if(isNaN(g)||isNaN(y))return"NaN";p=p||15;var w=o(g,y),A=s(g,y,w),v=this.s<0?"-":"";if(v+=g/y|0,g%=y,g*=10,g&&(v+="."),w){for(var b=A;b--;)v+=g/y|0,g%=y,g*=10;v+="(";for(var b=w;b--;)v+=g/y|0,g%=y,g*=10;v+=")"}else for(var b=p;g&&b--;)v+=g/y|0,g%=y,g*=10;return v}},Object.defineProperty(h,"__esModule",{value:!0}),h.default=h,h.Fraction=h,e.exports=h})()})(Nf);var ot=Yl(Nf.exports),k1="Fraction",E1=[],C1=P(k1,E1,()=>(ot.prototype.type="Fraction",ot.prototype.isFraction=!0,ot.prototype.toJSON=function(){return{mathjs:"Fraction",n:this.s*this.n,d:this.d}},ot.fromJSON=function(e){return new ot(e)},ot),{isClass:!0}),B1="Range",L1=[],D1=P(B1,L1,()=>{function e(n,i,t){if(!(this instanceof e))throw new SyntaxError("Constructor must be called with the new operator");var r=n!=null,a=i!=null,c=t!=null;if(r){if($e(n))n=n.toNumber();else if(typeof n!="number")throw new TypeError("Parameter start must be a number")}if(a){if($e(i))i=i.toNumber();else if(typeof i!="number")throw new TypeError("Parameter end must be a number")}if(c){if($e(t))t=t.toNumber();else if(typeof t!="number")throw new TypeError("Parameter step must be a number")}this.start=r?parseFloat(n):0,this.end=a?parseFloat(i):0,this.step=c?parseFloat(t):1}return e.prototype.type="Range",e.prototype.isRange=!0,e.parse=function(n){if(typeof n!="string")return null;var i=n.split(":"),t=i.map(function(a){return parseFloat(a)}),r=t.some(function(a){return isNaN(a)});if(r)return null;switch(t.length){case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[2],t[1]);default:return null}},e.prototype.clone=function(){return new e(this.start,this.end,this.step)},e.prototype.size=function(){var n=0,i=this.start,t=this.step,r=this.end,a=r-i;return Pn(t)===Pn(a)?n=Math.ceil(a/t):a===0&&(n=0),isNaN(n)&&(n=0),[n]},e.prototype.min=function(){var n=this.size()[0];if(n>0)return this.step>0?this.start:this.start+(n-1)*this.step},e.prototype.max=function(){var n=this.size()[0];if(n>0)return this.step>0?this.start+(n-1)*this.step:this.start},e.prototype.forEach=function(n){var i=this.start,t=this.step,r=this.end,a=0;if(t>0)for(;i<r;)n(i,[a],this),i+=t,a++;else if(t<0)for(;i>r;)n(i,[a],this),i+=t,a++},e.prototype.map=function(n){var i=[];return this.forEach(function(t,r,a){i[r[0]]=n(t,r,a)}),i},e.prototype.toArray=function(){var n=[];return this.forEach(function(i,t){n[t[0]]=i}),n},e.prototype.valueOf=function(){return this.toArray()},e.prototype.format=function(n){var i=Wn(this.start,n);return this.step!==1&&(i+=":"+Wn(this.step,n)),i+=":"+Wn(this.end,n),i},e.prototype.toString=function(){return this.format()},e.prototype.toJSON=function(){return{mathjs:"Range",start:this.start,end:this.end,step:this.step}},e.fromJSON=function(n){return new e(n.start,n.end,n.step)},e},{isClass:!0}),I1="Matrix",O1=[],z1=P(I1,O1,()=>{function e(){if(!(this instanceof e))throw new SyntaxError("Constructor must be called with the new operator")}return e.prototype.type="Matrix",e.prototype.isMatrix=!0,e.prototype.storage=function(){throw new Error("Cannot invoke storage on a Matrix interface")},e.prototype.datatype=function(){throw new Error("Cannot invoke datatype on a Matrix interface")},e.prototype.create=function(n,i){throw new Error("Cannot invoke create on a Matrix interface")},e.prototype.subset=function(n,i,t){throw new Error("Cannot invoke subset on a Matrix interface")},e.prototype.get=function(n){throw new Error("Cannot invoke get on a Matrix interface")},e.prototype.set=function(n,i,t){throw new Error("Cannot invoke set on a Matrix interface")},e.prototype.resize=function(n,i){throw new Error("Cannot invoke resize on a Matrix interface")},e.prototype.reshape=function(n,i){throw new Error("Cannot invoke reshape on a Matrix interface")},e.prototype.clone=function(){throw new Error("Cannot invoke clone on a Matrix interface")},e.prototype.size=function(){throw new Error("Cannot invoke size on a Matrix interface")},e.prototype.map=function(n,i){throw new Error("Cannot invoke map on a Matrix interface")},e.prototype.forEach=function(n){throw new Error("Cannot invoke forEach on a Matrix interface")},e.prototype[Symbol.iterator]=function(){throw new Error("Cannot iterate a Matrix interface")},e.prototype.toArray=function(){throw new Error("Cannot invoke toArray on a Matrix interface")},e.prototype.valueOf=function(){throw new Error("Cannot invoke valueOf on a Matrix interface")},e.prototype.format=function(n){throw new Error("Cannot invoke format on a Matrix interface")},e.prototype.toString=function(){throw new Error("Cannot invoke toString on a Matrix interface")},e},{isClass:!0}),P1="DenseMatrix",$1=["Matrix"],_1=P(P1,$1,e=>{var{Matrix:n}=e;function i(o,s){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if(s&&!Or(s))throw new Error("Invalid datatype: "+s);if(Ce(o))o.type==="DenseMatrix"?(this._data=ke(o._data),this._size=ke(o._size),this._datatype=s||o._datatype):(this._data=o.toArray(),this._size=o.size(),this._datatype=s||o._datatype);else if(o&&Ze(o.data)&&Ze(o.size))this._data=o.data,this._size=o.size,Bs(this._data,this._size),this._datatype=s||o.datatype;else if(Ze(o))this._data=f(o),this._size=Re(this._data),Bs(this._data,this._size),this._datatype=s;else{if(o)throw new TypeError("Unsupported type of data ("+je(o)+")");this._data=[],this._size=[0],this._datatype=s}}i.prototype=new n,i.prototype.createDenseMatrix=function(o,s){return new i(o,s)},i.prototype.type="DenseMatrix",i.prototype.isDenseMatrix=!0,i.prototype.getDataType=function(){return _t(this._data,je)},i.prototype.storage=function(){return"dense"},i.prototype.datatype=function(){return this._datatype},i.prototype.create=function(o,s){return new i(o,s)},i.prototype.subset=function(o,s,m){switch(arguments.length){case 1:return t(this,o);case 2:case 3:return a(this,o,s,m);default:throw new SyntaxError("Wrong number of arguments")}},i.prototype.get=function(o){if(!Ze(o))throw new TypeError("Array expected");if(o.length!==this._size.length)throw new ze(o.length,this._size.length);for(var s=0;s<o.length;s++)Je(o[s],this._size[s]);for(var m=this._data,h=0,p=o.length;h<p;h++){var g=o[h];Je(g,m.length),m=m[g]}return m},i.prototype.set=function(o,s,m){if(!Ze(o))throw new TypeError("Array expected");if(o.length<this._size.length)throw new ze(o.length,this._size.length,"<");var h,p,g,y=o.map(function(A){return A+1});u(this,y,m);var w=this._data;for(h=0,p=o.length-1;h<p;h++)g=o[h],Je(g,w.length),w=w[g];return g=o[o.length-1],Je(g,w.length),w[g]=s,this};function t(o,s){if(!Ut(s))throw new TypeError("Invalid index");var m=s.isScalar();if(m)return o.get(s.min());var h=s.size();if(h.length!==o._size.length)throw new ze(h.length,o._size.length);for(var p=s.min(),g=s.max(),y=0,w=o._size.length;y<w;y++)Je(p[y],o._size[y]),Je(g[y],o._size[y]);return new i(r(o._data,s,h.length,0),o._datatype)}function r(o,s,m,h){var p=h===m-1,g=s.dimension(h);return p?g.map(function(y){return Je(y,o.length),o[y]}).valueOf():g.map(function(y){Je(y,o.length);var w=o[y];return r(w,s,m,h+1)}).valueOf()}function a(o,s,m,h){if(!s||s.isIndex!==!0)throw new TypeError("Invalid index");var p=s.size(),g=s.isScalar(),y;if(Ce(m)?(y=m.size(),m=m.valueOf()):y=Re(m),g){if(y.length!==0)throw new TypeError("Scalar expected");o.set(s.min(),m,h)}else{if(p.length<o._size.length)throw new ze(p.length,o._size.length,"<");if(y.length<p.length){for(var w=0,A=0;p[w]===1&&y[w]===1;)w++;for(;p[w]===1;)A++,w++;m=sf(m,p.length,A,y)}if(!$t(p,y))throw new ze(p,y,">");var v=s.max().map(function(d){return d+1});u(o,v,h);var b=p.length,x=0;c(o._data,s,m,b,x)}return o}function c(o,s,m,h,p){var g=p===h-1,y=s.dimension(p);g?y.forEach(function(w,A){Je(w),o[w]=m[A[0]]}):y.forEach(function(w,A){Je(w),c(o[w],s,m[A[0]],h,p+1)})}i.prototype.resize=function(o,s,m){if(!xt(o))throw new TypeError("Array or Matrix expected");var h=o.valueOf().map(g=>Array.isArray(g)&&g.length===1?g[0]:g),p=m?this.clone():this;return l(p,h,s)};function l(o,s,m){if(s.length===0){for(var h=o._data;Ze(h);)h=h[0];return h}return o._size=s.slice(0),o._data=pt(o._data,o._size,m),o}i.prototype.reshape=function(o,s){var m=s?this.clone():this;m._data=nf(m._data,o);var h=m._size.reduce((p,g)=>p*g);return m._size=Ra(o,h),m};function u(o,s,m){for(var h=o._size.slice(0),p=!1;h.length<s.length;)h.push(0),p=!0;for(var g=0,y=s.length;g<y;g++)s[g]>h[g]&&(h[g]=s[g],p=!0);p&&l(o,h,m)}i.prototype.clone=function(){var o=new i({data:ke(this._data),size:ke(this._size),datatype:this._datatype});return o},i.prototype.size=function(){return this._size.slice(0)},i.prototype.map=function(o){var s=this,m=function g(y,w){return Ze(y)?y.map(function(A,v){return g(A,w.concat(v))}):o(y,w,s)},h=m(this._data,[]),p=this._datatype!==void 0?_t(h,je):void 0;return new i(h,p)},i.prototype.forEach=function(o){var s=this,m=function h(p,g){Ze(p)?p.forEach(function(y,w){h(y,g.concat(w))}):o(p,g,s)};m(this._data,[])},i.prototype[Symbol.iterator]=function*(){var o=function*s(m,h){if(Ze(m))for(var p=0;p<m.length;p++)yield*s(m[p],h.concat(p));else yield{value:m,index:h}};yield*o(this._data,[])},i.prototype.rows=function(){var o=[],s=this.size();if(s.length!==2)throw new TypeError("Rows can only be returned for a 2D matrix.");var m=this._data;for(var h of m)o.push(new i([h],this._datatype));return o},i.prototype.columns=function(){var o=this,s=[],m=this.size();if(m.length!==2)throw new TypeError("Rows can only be returned for a 2D matrix.");for(var h=this._data,p=function(w){var A=h.map(v=>[v[w]]);s.push(new i(A,o._datatype))},g=0;g<m[1];g++)p(g);return s},i.prototype.toArray=function(){return ke(this._data)},i.prototype.valueOf=function(){return this._data},i.prototype.format=function(o){return Oe(this._data,o)},i.prototype.toString=function(){return Oe(this._data)},i.prototype.toJSON=function(){return{mathjs:"DenseMatrix",data:this._data,size:this._size,datatype:this._datatype}},i.prototype.diagonal=function(o){if(o){if($e(o)&&(o=o.toNumber()),!Fe(o)||!Se(o))throw new TypeError("The parameter k must be an integer number")}else o=0;for(var s=o>0?o:0,m=o<0?-o:0,h=this._size[0],p=this._size[1],g=Math.min(h-m,p-s),y=[],w=0;w<g;w++)y[w]=this._data[w+m][w+s];return new i({data:y,size:[g],datatype:this._datatype})},i.diagonal=function(o,s,m,h){if(!Ze(o))throw new TypeError("Array expected, size parameter");if(o.length!==2)throw new Error("Only two dimensions matrix are supported");if(o=o.map(function(M){if($e(M)&&(M=M.toNumber()),!Fe(M)||!Se(M)||M<1)throw new Error("Size values must be positive integers");return M}),m){if($e(m)&&(m=m.toNumber()),!Fe(m)||!Se(m))throw new TypeError("The parameter k must be an integer number")}else m=0;var p=m>0?m:0,g=m<0?-m:0,y=o[0],w=o[1],A=Math.min(y-g,w-p),v;if(Ze(s)){if(s.length!==A)throw new Error("Invalid value array length");v=function(S){return s[S]}}else if(Ce(s)){var b=s.size();if(b.length!==1||b[0]!==A)throw new Error("Invalid matrix length");v=function(S){return s.get([S])}}else v=function(){return s};h||(h=$e(v(0))?v(0).mul(0):0);var x=[];if(o.length>0){x=pt(x,o,h);for(var d=0;d<A;d++)x[d+g][d+p]=v(d)}return new i({data:x,size:[y,w]})},i.fromJSON=function(o){return new i(o)},i.prototype.swapRows=function(o,s){if(!Fe(o)||!Se(o)||!Fe(s)||!Se(s))throw new Error("Row index must be positive integers");if(this._size.length!==2)throw new Error("Only two dimensional matrix is supported");return Je(o,this._size[0]),Je(s,this._size[0]),i._swapRows(o,s,this._data),this},i._swapRows=function(o,s,m){var h=m[o];m[o]=m[s],m[s]=h};function f(o){for(var s=0,m=o.length;s<m;s++){var h=o[s];Ze(h)?o[s]=f(h):h&&h.isMatrix===!0&&(o[s]=f(h.valueOf()))}return o}return i},{isClass:!0}),Ps="clone",F1=["typed"],R1=P(Ps,F1,e=>{var{typed:n}=e;return n(Ps,{any:ke})});function Sf(e){var n=e.length,i=e[0].length,t,r,a=[];for(r=0;r<i;r++){var c=[];for(t=0;t<n;t++)c.push(e[t][r]);a.push(c)}return a}function At(e){for(var n=0;n<e.length;n++)if(xt(e[n]))return!0;return!1}function kn(e,n){Ce(e)&&(e=e.valueOf());for(var i=0,t=e.length;i<t;i++){var r=e[i];Array.isArray(r)?kn(r,n):n(r)}}function xe(e,n,i){return e&&typeof e.map=="function"?e.map(function(t){return xe(t,n)}):n(e)}function Fi(e,n,i){var t=Array.isArray(e)?Re(e):e.size();if(n<0||n>=t.length)throw new rn(n,t.length);return Ce(e)?e.create(Ni(e.valueOf(),n,i)):Ni(e,n,i)}function Ni(e,n,i){var t,r,a,c;if(n<=0)if(Array.isArray(e[0])){for(c=Sf(e),r=[],t=0;t<c.length;t++)r[t]=Ni(c[t],n-1,i);return r}else{for(a=e[0],t=1;t<e.length;t++)a=i(a,e[t]);return a}else{for(r=[],t=0;t<e.length;t++)r[t]=Ni(e[t],n-1,i);return r}}function $s(e,n,i,t,r,a,c,l,u,f,o){var s=e._values,m=e._index,h=e._ptr,p,g,y,w;if(t)for(g=h[n],y=h[n+1],p=g;p<y;p++)w=m[p],i[w]!==a?(i[w]=a,c.push(w),f?(t[w]=u?l(s[p],o):l(o,s[p]),r[w]=a):t[w]=s[p]):(t[w]=u?l(s[p],t[w]):l(t[w],s[p]),r[w]=a);else for(g=h[n],y=h[n+1],p=g;p<y;p++)w=m[p],i[w]!==a?(i[w]=a,c.push(w)):r[w]=a}var _s="isInteger",q1=["typed"],K1=P(_s,q1,e=>{var{typed:n}=e;return n(_s,{number:Se,BigNumber:function(t){return t.isInt()},Fraction:function(t){return t.d===1&&isFinite(t.n)},"Array | Matrix":function(t){return xe(t,this)}})}),nn="number",Zn="number, number";function Mf(e){return Math.abs(e)}Mf.signature=nn;function Tf(e,n){return e+n}Tf.signature=Zn;function kf(e,n){return e*n}kf.signature=Zn;function Ef(e){return-e}Ef.signature=nn;function Cf(e){return e}Cf.signature=nn;function Ot(e){return Zp(e)}Ot.signature=nn;function Bf(e){return e*e*e}Bf.signature=nn;function Lf(e){return Math.exp(e)}Lf.signature=nn;function Df(e){return Xp(e)}Df.signature=nn;function If(e,n){if(!Se(e)||!Se(n))throw new Error("Parameters in function gcd must be integer numbers");for(var i;n!==0;)i=e%n,e=n,n=i;return e<0?-e:e}If.signature=Zn;function Of(e,n){if(!Se(e)||!Se(n))throw new Error("Parameters in function lcm must be integer numbers");if(e===0||n===0)return 0;for(var i,t=e*n;n!==0;)i=n,n=e%i,e=i;return Math.abs(t/e)}Of.signature=Zn;function U1(e,n){return n?Math.log(e)/Math.log(n):Math.log(e)}function zf(e){return Gp(e)}zf.signature=nn;function Pf(e){return Wp(e)}Pf.signature=nn;function $f(e,n){if(n>0)return e-n*Math.floor(e/n);if(n===0)return e;throw new Error("Cannot calculate mod for a negative divisor")}$f.signature=Zn;function Fs(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2,i=n<0;if(i&&(n=-n),n===0)throw new Error("Root must be non-zero");if(e<0&&Math.abs(n)%2!==1)throw new Error("Root must be odd when a is negative.");if(e===0)return i?1/0:0;if(!isFinite(e))return i?0:e;var t=Math.pow(Math.abs(e),1/n);return t=e<0?-t:t,i?1/t:t}function Aa(e){return Pn(e)}Aa.signature=nn;function _f(e){return e*e}_f.signature=nn;function Ff(e,n){var i,t,r,a=0,c=1,l=1,u=0;if(!Se(e)||!Se(n))throw new Error("Parameters in function xgcd must be integer numbers");for(;n;)t=Math.floor(e/n),r=e-t*n,i=a,a=c-t*a,c=i,i=l,l=u-t*l,u=i,e=n,n=r;var f;return e<0?f=[-e,-c,-u]:f=[e,e?c:0,u],f}Ff.signature=Zn;function Rf(e,n){return e*e<1&&n===1/0||e*e>1&&n===-1/0?0:Math.pow(e,n)}Rf.signature=Zn;function Rs(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;if(!Se(n)||n<0||n>15)throw new Error("Number of decimals in function round must be an integer from 0 to 15 inclusive");return parseFloat(Ql(e,n))}var V1="number",Nt="number, number";function qf(e,n){if(!Se(e)||!Se(n))throw new Error("Integers expected in function bitAnd");return e&n}qf.signature=Nt;function Kf(e){if(!Se(e))throw new Error("Integer expected in function bitNot");return~e}Kf.signature=V1;function Uf(e,n){if(!Se(e)||!Se(n))throw new Error("Integers expected in function bitOr");return e|n}Uf.signature=Nt;function Vf(e,n){if(!Se(e)||!Se(n))throw new Error("Integers expected in function bitXor");return e^n}Vf.signature=Nt;function Wf(e,n){if(!Se(e)||!Se(n))throw new Error("Integers expected in function leftShift");return e<<n}Wf.signature=Nt;function Gf(e,n){if(!Se(e)||!Se(n))throw new Error("Integers expected in function rightArithShift");return e>>n}Gf.signature=Nt;function Hf(e,n){if(!Se(e)||!Se(n))throw new Error("Integers expected in function rightLogShift");return e>>>n}Hf.signature=Nt;function Nn(e,n){if(n<e)return 1;if(n===e)return n;var i=n+e>>1;return Nn(e,i)*Nn(i+1,n)}function Zf(e,n){if(!Se(e)||e<0)throw new TypeError("Positive integer value expected in function combinations");if(!Se(n)||n<0)throw new TypeError("Positive integer value expected in function combinations");if(n>e)throw new TypeError("k must be less than or equal to n");for(var i=e-n,t=1,r=n<i?i+1:n+1,a=2,c=n<i?n:i,l=r;l<=e;++l)for(t*=l;a<=c&&t%a===0;)t/=a,++a;return a<=c&&(t/=Nn(a,c)),t}Zf.signature="number, number";var W1=Math.PI,G1=2*Math.PI,H1=Math.E,Z1=1.618033988749895,X1="number",Ga="number, number";function Xf(e){return!e}Xf.signature=X1;function Yf(e,n){return!!(e||n)}Yf.signature=Ga;function Jf(e,n){return!!e!=!!n}Jf.signature=Ga;function Qf(e,n){return!!(e&&n)}Qf.signature=Ga;function Ha(e){var n;if(Se(e))return e<=0?isFinite(e)?1/0:NaN:e>171?1/0:Nn(1,e-1);if(e<.5)return Math.PI/(Math.sin(Math.PI*e)*Ha(1-e));if(e>=171.35)return 1/0;if(e>85){var i=e*e,t=i*e,r=t*e,a=r*e;return Math.sqrt(2*Math.PI/e)*Math.pow(e/Math.E,e)*(1+1/(12*e)+1/(288*i)-139/(51840*t)-571/(2488320*r)+163879/(209018880*a)+5246819/(75246796800*a*e))}--e,n=ht[0];for(var c=1;c<ht.length;++c)n+=ht[c]/(e+c);var l=e+jf+.5;return Math.sqrt(2*Math.PI)*Math.pow(l,e+.5)*Math.exp(-l)*n}Ha.signature="number";var jf=4.7421875,ht=[.9999999999999971,57.15623566586292,-59.59796035547549,14.136097974741746,-.4919138160976202,3399464998481189e-20,4652362892704858e-20,-9837447530487956e-20,.0001580887032249125,-.00021026444172410488,.00021743961811521265,-.0001643181065367639,8441822398385275e-20,-26190838401581408e-21,36899182659531625e-22],em=.9189385332046728,Y1=5,J1=7,qs=[1.000000000190015,76.18009172947146,-86.50532032941678,24.01409824083091,-1.231739572450155,.001208650973866179,-5395239384953e-18];function Si(e){if(e<0)return NaN;if(e===0)return 1/0;if(!isFinite(e))return e;if(e<.5)return Math.log(Math.PI/Math.sin(Math.PI*e))-Si(1-e);e=e-1;for(var n=e+Y1+.5,i=qs[0],t=J1-1;t>=1;t--)i+=qs[t]/(e+t);return em+(e+.5)*Math.log(n)-n+Math.log(i)}Si.signature="number";var Sr="number";function rm(e){return eg(e)}rm.signature=Sr;function nm(e){return Math.atan(1/e)}nm.signature=Sr;function tm(e){return isFinite(e)?(Math.log((e+1)/e)+Math.log(e/(e-1)))/2:0}tm.signature=Sr;function im(e){return Math.asin(1/e)}im.signature=Sr;function am(e){var n=1/e;return Math.log(n+Math.sqrt(n*n+1))}am.signature=Sr;function sm(e){return Math.acos(1/e)}sm.signature=Sr;function om(e){var n=1/e,i=Math.sqrt(n*n-1);return Math.log(i+n)}om.signature=Sr;function um(e){return rg(e)}um.signature=Sr;function cm(e){return ng(e)}cm.signature=Sr;function lm(e){return 1/Math.tan(e)}lm.signature=Sr;function fm(e){var n=Math.exp(2*e);return(n+1)/(n-1)}fm.signature=Sr;function mm(e){return 1/Math.sin(e)}mm.signature=Sr;function hm(e){return e===0?Number.POSITIVE_INFINITY:Math.abs(2/(Math.exp(e)-Math.exp(-e)))*Pn(e)}hm.signature=Sr;function pm(e){return 1/Math.cos(e)}pm.signature=Sr;function gm(e){return 2/(Math.exp(e)+Math.exp(-e))}gm.signature=Sr;function dm(e){return ig(e)}dm.signature=Sr;var Ri="number";function vm(e){return e<0}vm.signature=Ri;function bm(e){return e>0}bm.signature=Ri;function ym(e){return e===0}ym.signature=Ri;function xm(e){return Number.isNaN(e)}xm.signature=Ri;var Ks="isNegative",Q1=["typed"],j1=P(Ks,Q1,e=>{var{typed:n}=e;return n(Ks,{number:vm,BigNumber:function(t){return t.isNeg()&&!t.isZero()&&!t.isNaN()},Fraction:function(t){return t.s<0},Unit:function(t){return this(t.value)},"Array | Matrix":function(t){return xe(t,this)}})}),Us="isNumeric",ed=["typed"],rd=P(Us,ed,e=>{var{typed:n}=e;return n(Us,{"number | BigNumber | Fraction | boolean":function(){return!0},"Complex | Unit | string | null | undefined | Node":function(){return!1},"Array | Matrix":function(t){return xe(t,this)}})}),Vs="hasNumericValue",nd=["typed","isNumeric"],td=P(Vs,nd,e=>{var{typed:n,isNumeric:i}=e;return n(Vs,{string:function(r){return r.trim().length>0&&!isNaN(Number(r))},any:function(r){return i(r)}})}),Ws="isPositive",id=["typed"],ad=P(Ws,id,e=>{var{typed:n}=e;return n(Ws,{number:bm,BigNumber:function(t){return!t.isNeg()&&!t.isZero()&&!t.isNaN()},Fraction:function(t){return t.s>0&&t.n>0},Unit:function(t){return this(t.value)},"Array | Matrix":function(t){return xe(t,this)}})}),Gs="isZero",sd=["typed"],od=P(Gs,sd,e=>{var{typed:n}=e;return n(Gs,{number:ym,BigNumber:function(t){return t.isZero()},Complex:function(t){return t.re===0&&t.im===0},Fraction:function(t){return t.d===1&&t.n===0},Unit:function(t){return this(t.value)},"Array | Matrix":function(t){return xe(t,this)}})}),Hs="isNaN",ud=["typed"],cd=P(Hs,ud,e=>{var{typed:n}=e;return n(Hs,{number:xm,BigNumber:function(t){return t.isNaN()},Fraction:function(t){return!1},Complex:function(t){return t.isNaN()},Unit:function(t){return Number.isNaN(t.value)},"Array | Matrix":function(t){return xe(t,Number.isNaN)}})}),Zs="typeOf",ld=["typed"],fd=P(Zs,ld,e=>{var{typed:n}=e;return n(Zs,{any:je})});function fn(e,n,i){if(i==null)return e.eq(n);if(e.eq(n))return!0;if(e.isNaN()||n.isNaN())return!1;if(e.isFinite()&&n.isFinite()){var t=e.minus(n).abs();if(t.isZero())return!0;var r=e.constructor.max(e.abs(),n.abs());return t.lte(r.times(i))}return!1}function md(e,n,i){return _r(e.re,n.re,i)&&_r(e.im,n.im,i)}var Mi="equalScalar",hd=["typed","config"],pd=P(Mi,hd,e=>{var{typed:n,config:i}=e;return n(Mi,{"boolean, boolean":function(r,a){return r===a},"number, number":function(r,a){return _r(r,a,i.epsilon)},"BigNumber, BigNumber":function(r,a){return r.eq(a)||fn(r,a,i.epsilon)},"Fraction, Fraction":function(r,a){return r.equals(a)},"Complex, Complex":function(r,a){return md(r,a,i.epsilon)},"Unit, Unit":function(r,a){if(!r.equalBase(a))throw new Error("Cannot compare units with different base");return this(r.value,a.value)}})});P(Mi,["typed","config"],e=>{var{typed:n,config:i}=e;return n(Mi,{"number, number":function(r,a){return _r(r,a,i.epsilon)}})});var gd="SparseMatrix",dd=["typed","equalScalar","Matrix"],vd=P(gd,dd,e=>{var{typed:n,equalScalar:i,Matrix:t}=e;function r(g,y){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if(y&&!Or(y))throw new Error("Invalid datatype: "+y);if(Ce(g))a(this,g,y);else if(g&&Ze(g.index)&&Ze(g.ptr)&&Ze(g.size))this._values=g.values,this._index=g.index,this._ptr=g.ptr,this._size=g.size,this._datatype=y||g.datatype;else if(Ze(g))c(this,g,y);else{if(g)throw new TypeError("Unsupported type of data ("+je(g)+")");this._values=[],this._index=[],this._ptr=[0],this._size=[0,0],this._datatype=y}}function a(g,y,w){y.type==="SparseMatrix"?(g._values=y._values?ke(y._values):void 0,g._index=ke(y._index),g._ptr=ke(y._ptr),g._size=ke(y._size),g._datatype=w||y._datatype):c(g,y.valueOf(),w||y._datatype)}function c(g,y,w){g._values=[],g._index=[],g._ptr=[],g._datatype=w;var A=y.length,v=0,b=i,x=0;if(Or(w)&&(b=n.find(i,[w,w])||i,x=n.convert(0,w)),A>0){var d=0;do{g._ptr.push(g._index.length);for(var M=0;M<A;M++){var S=y[M];if(Ze(S)){if(d===0&&v<S.length&&(v=S.length),d<S.length){var T=S[d];b(T,x)||(g._values.push(T),g._index.push(M))}}else d===0&&v<1&&(v=1),b(S,x)||(g._values.push(S),g._index.push(M))}d++}while(d<v)}g._ptr.push(g._index.length),g._size=[A,v]}r.prototype=new t,r.prototype.createSparseMatrix=function(g,y){return new r(g,y)},r.prototype.type="SparseMatrix",r.prototype.isSparseMatrix=!0,r.prototype.getDataType=function(){return _t(this._values,je)},r.prototype.storage=function(){return"sparse"},r.prototype.datatype=function(){return this._datatype},r.prototype.create=function(g,y){return new r(g,y)},r.prototype.density=function(){var g=this._size[0],y=this._size[1];return g!==0&&y!==0?this._index.length/(g*y):0},r.prototype.subset=function(g,y,w){if(!this._values)throw new Error("Cannot invoke subset on a Pattern only matrix");switch(arguments.length){case 1:return l(this,g);case 2:case 3:return u(this,g,y,w);default:throw new SyntaxError("Wrong number of arguments")}};function l(g,y){if(!Ut(y))throw new TypeError("Invalid index");var w=y.isScalar();if(w)return g.get(y.min());var A=y.size();if(A.length!==g._size.length)throw new ze(A.length,g._size.length);var v,b,x,d,M=y.min(),S=y.max();for(v=0,b=g._size.length;v<b;v++)Je(M[v],g._size[v]),Je(S[v],g._size[v]);var T=g._values,N=g._index,D=g._ptr,k=y.dimension(0),I=y.dimension(1),_=[],O=[];k.forEach(function(C,U){O[C]=U[0],_[C]=!0});var B=T?[]:void 0,L=[],V=[];return I.forEach(function(C){for(V.push(L.length),x=D[C],d=D[C+1];x<d;x++)v=N[x],_[v]===!0&&(L.push(O[v]),B&&B.push(T[x]))}),V.push(L.length),new r({values:B,index:L,ptr:V,size:A,datatype:g._datatype})}function u(g,y,w,A){if(!y||y.isIndex!==!0)throw new TypeError("Invalid index");var v=y.size(),b=y.isScalar(),x;if(Ce(w)?(x=w.size(),w=w.toArray()):x=Re(w),b){if(x.length!==0)throw new TypeError("Scalar expected");g.set(y.min(),w,A)}else{if(v.length!==1&&v.length!==2)throw new ze(v.length,g._size.length,"<");if(x.length<v.length){for(var d=0,M=0;v[d]===1&&x[d]===1;)d++;for(;v[d]===1;)M++,d++;w=sf(w,v.length,M,x)}if(!$t(v,x))throw new ze(v,x,">");if(v.length===1){var S=y.dimension(0);S.forEach(function(D,k){Je(D),g.set([D,0],w[k[0]],A)})}else{var T=y.dimension(0),N=y.dimension(1);T.forEach(function(D,k){Je(D),N.forEach(function(I,_){Je(I),g.set([D,I],w[k[0]][_[0]],A)})})}}return g}r.prototype.get=function(g){if(!Ze(g))throw new TypeError("Array expected");if(g.length!==this._size.length)throw new ze(g.length,this._size.length);if(!this._values)throw new Error("Cannot invoke get on a Pattern only matrix");var y=g[0],w=g[1];Je(y,this._size[0]),Je(w,this._size[1]);var A=f(y,this._ptr[w],this._ptr[w+1],this._index);return A<this._ptr[w+1]&&this._index[A]===y?this._values[A]:0},r.prototype.set=function(g,y,w){if(!Ze(g))throw new TypeError("Array expected");if(g.length!==this._size.length)throw new ze(g.length,this._size.length);if(!this._values)throw new Error("Cannot invoke set on a Pattern only matrix");var A=g[0],v=g[1],b=this._size[0],x=this._size[1],d=i,M=0;Or(this._datatype)&&(d=n.find(i,[this._datatype,this._datatype])||i,M=n.convert(0,this._datatype)),(A>b-1||v>x-1)&&(m(this,Math.max(A+1,b),Math.max(v+1,x),w),b=this._size[0],x=this._size[1]),Je(A,b),Je(v,x);var S=f(A,this._ptr[v],this._ptr[v+1],this._index);return S<this._ptr[v+1]&&this._index[S]===A?d(y,M)?o(S,v,this._values,this._index,this._ptr):this._values[S]=y:s(S,A,v,y,this._values,this._index,this._ptr),this};function f(g,y,w,A){if(w-y===0)return w;for(var v=y;v<w;v++)if(A[v]===g)return v;return y}function o(g,y,w,A,v){w.splice(g,1),A.splice(g,1);for(var b=y+1;b<v.length;b++)v[b]--}function s(g,y,w,A,v,b,x){v.splice(g,0,A),b.splice(g,0,y);for(var d=w+1;d<x.length;d++)x[d]++}r.prototype.resize=function(g,y,w){if(!xt(g))throw new TypeError("Array or Matrix expected");var A=g.valueOf().map(b=>Array.isArray(b)&&b.length===1?b[0]:b);if(A.length!==2)throw new Error("Only two dimensions matrix are supported");A.forEach(function(b){if(!Fe(b)||!Se(b)||b<0)throw new TypeError("Invalid size, must contain positive integers (size: "+Oe(A)+")")});var v=w?this.clone():this;return m(v,A[0],A[1],y)};function m(g,y,w,A){var v=A||0,b=i,x=0;Or(g._datatype)&&(b=n.find(i,[g._datatype,g._datatype])||i,x=n.convert(0,g._datatype),v=n.convert(v,g._datatype));var d=!b(v,x),M=g._size[0],S=g._size[1],T,N,D;if(w>S){for(N=S;N<w;N++)if(g._ptr[N]=g._values.length,d)for(T=0;T<M;T++)g._values.push(v),g._index.push(T);g._ptr[w]=g._values.length}else w<S&&(g._ptr.splice(w+1,S-w),g._values.splice(g._ptr[w],g._values.length),g._index.splice(g._ptr[w],g._index.length));if(S=w,y>M){if(d){var k=0;for(N=0;N<S;N++){g._ptr[N]=g._ptr[N]+k,D=g._ptr[N+1]+k;var I=0;for(T=M;T<y;T++,I++)g._values.splice(D+I,0,v),g._index.splice(D+I,0,T),k++}g._ptr[S]=g._values.length}}else if(y<M){var _=0;for(N=0;N<S;N++){g._ptr[N]=g._ptr[N]-_;var O=g._ptr[N],B=g._ptr[N+1]-_;for(D=O;D<B;D++)T=g._index[D],T>y-1&&(g._values.splice(D,1),g._index.splice(D,1),_++)}g._ptr[N]=g._values.length}return g._size[0]=y,g._size[1]=w,g}r.prototype.reshape=function(g,y){if(!Ze(g))throw new TypeError("Array expected");if(g.length!==2)throw new Error("Sparse matrices can only be reshaped in two dimensions");g.forEach(function(C){if(!Fe(C)||!Se(C)||C<=-2||C===0)throw new TypeError("Invalid size, must contain positive integers or -1 (size: "+Oe(g)+")")});var w=this._size[0]*this._size[1];g=Ra(g,w);var A=g[0]*g[1];if(w!==A)throw new Error("Reshaping sparse matrix will result in the wrong number of elements");var v=y?this.clone():this;if(this._size[0]===g[0]&&this._size[1]===g[1])return v;for(var b=[],x=0;x<v._ptr.length;x++)for(var d=0;d<v._ptr[x+1]-v._ptr[x];d++)b.push(x);for(var M=v._values.slice(),S=v._index.slice(),T=0;T<v._index.length;T++){var N=S[T],D=b[T],k=N*v._size[1]+D;b[T]=k%g[1],S[T]=Math.floor(k/g[1])}v._values.length=0,v._index.length=0,v._ptr.length=g[1]+1,v._size=g.slice();for(var I=0;I<v._ptr.length;I++)v._ptr[I]=0;for(var _=0;_<M.length;_++){var O=S[_],B=b[_],L=M[_],V=f(O,v._ptr[B],v._ptr[B+1],v._index);s(V,O,B,L,v._values,v._index,v._ptr)}return v},r.prototype.clone=function(){var g=new r({values:this._values?ke(this._values):void 0,index:ke(this._index),ptr:ke(this._ptr),size:ke(this._size),datatype:this._datatype});return g},r.prototype.size=function(){return this._size.slice(0)},r.prototype.map=function(g,y){if(!this._values)throw new Error("Cannot invoke map on a Pattern only matrix");var w=this,A=this._size[0],v=this._size[1],b=function(d,M,S){return g(d,[M,S],w)};return h(this,0,A-1,0,v-1,b,y)};function h(g,y,w,A,v,b,x){var d=[],M=[],S=[],T=i,N=0;Or(g._datatype)&&(T=n.find(i,[g._datatype,g._datatype])||i,N=n.convert(0,g._datatype));for(var D=function(W,Q,ne){W=b(W,Q,ne),T(W,N)||(d.push(W),M.push(Q))},k=A;k<=v;k++){S.push(d.length);var I=g._ptr[k],_=g._ptr[k+1];if(x)for(var O=I;O<_;O++){var B=g._index[O];B>=y&&B<=w&&D(g._values[O],B-y,k-A)}else{for(var L={},V=I;V<_;V++){var C=g._index[V];L[C]=g._values[V]}for(var U=y;U<=w;U++){var X=U in L?L[U]:0;D(X,U-y,k-A)}}}return S.push(d.length),new r({values:d,index:M,ptr:S,size:[w-y+1,v-A+1]})}r.prototype.forEach=function(g,y){if(!this._values)throw new Error("Cannot invoke forEach on a Pattern only matrix");for(var w=this,A=this._size[0],v=this._size[1],b=0;b<v;b++){var x=this._ptr[b],d=this._ptr[b+1];if(y)for(var M=x;M<d;M++){var S=this._index[M];g(this._values[M],[S,b],w)}else{for(var T={},N=x;N<d;N++){var D=this._index[N];T[D]=this._values[N]}for(var k=0;k<A;k++){var I=k in T?T[k]:0;g(I,[k,b],w)}}}},r.prototype[Symbol.iterator]=function*(){if(!this._values)throw new Error("Cannot iterate a Pattern only matrix");for(var g=this._size[1],y=0;y<g;y++)for(var w=this._ptr[y],A=this._ptr[y+1],v=w;v<A;v++){var b=this._index[v];yield{value:this._values[v],index:[b,y]}}},r.prototype.toArray=function(){return p(this._values,this._index,this._ptr,this._size,!0)},r.prototype.valueOf=function(){return p(this._values,this._index,this._ptr,this._size,!1)};function p(g,y,w,A,v){var b=A[0],x=A[1],d=[],M,S;for(M=0;M<b;M++)for(d[M]=[],S=0;S<x;S++)d[M][S]=0;for(S=0;S<x;S++)for(var T=w[S],N=w[S+1],D=T;D<N;D++)M=y[D],d[M][S]=g?v?ke(g[D]):g[D]:1;return d}return r.prototype.format=function(g){for(var y=this._size[0],w=this._size[1],A=this.density(),v="Sparse Matrix ["+Oe(y,g)+" x "+Oe(w,g)+"] density: "+Oe(A,g)+`
`,b=0;b<w;b++)for(var x=this._ptr[b],d=this._ptr[b+1],M=x;M<d;M++){var S=this._index[M];v+=`
    (`+Oe(S,g)+", "+Oe(b,g)+") ==> "+(this._values?Oe(this._values[M],g):"X")}return v},r.prototype.toString=function(){return Oe(this.toArray())},r.prototype.toJSON=function(){return{mathjs:"SparseMatrix",values:this._values,index:this._index,ptr:this._ptr,size:this._size,datatype:this._datatype}},r.prototype.diagonal=function(g){if(g){if($e(g)&&(g=g.toNumber()),!Fe(g)||!Se(g))throw new TypeError("The parameter k must be an integer number")}else g=0;var y=g>0?g:0,w=g<0?-g:0,A=this._size[0],v=this._size[1],b=Math.min(A-w,v-y),x=[],d=[],M=[];M[0]=0;for(var S=y;S<v&&x.length<b;S++)for(var T=this._ptr[S],N=this._ptr[S+1],D=T;D<N;D++){var k=this._index[D];if(k===S-y+w){x.push(this._values[D]),d[x.length-1]=k-w;break}}return M.push(x.length),new r({values:x,index:d,ptr:M,size:[b,1]})},r.fromJSON=function(g){return new r(g)},r.diagonal=function(g,y,w,A,v){if(!Ze(g))throw new TypeError("Array expected, size parameter");if(g.length!==2)throw new Error("Only two dimensions matrix are supported");if(g=g.map(function(C){if($e(C)&&(C=C.toNumber()),!Fe(C)||!Se(C)||C<1)throw new Error("Size values must be positive integers");return C}),w){if($e(w)&&(w=w.toNumber()),!Fe(w)||!Se(w))throw new TypeError("The parameter k must be an integer number")}else w=0;var b=i,x=0;Or(v)&&(b=n.find(i,[v,v])||i,x=n.convert(0,v));var d=w>0?w:0,M=w<0?-w:0,S=g[0],T=g[1],N=Math.min(S-M,T-d),D;if(Ze(y)){if(y.length!==N)throw new Error("Invalid value array length");D=function(U){return y[U]}}else if(Ce(y)){var k=y.size();if(k.length!==1||k[0]!==N)throw new Error("Invalid matrix length");D=function(U){return y.get([U])}}else D=function(){return y};for(var I=[],_=[],O=[],B=0;B<T;B++){O.push(I.length);var L=B-d;if(L>=0&&L<N){var V=D(L);b(V,x)||(_.push(L+M),I.push(V))}}return O.push(I.length),new r({values:I,index:_,ptr:O,size:[S,T]})},r.prototype.swapRows=function(g,y){if(!Fe(g)||!Se(g)||!Fe(y)||!Se(y))throw new Error("Row index must be positive integers");if(this._size.length!==2)throw new Error("Only two dimensional matrix is supported");return Je(g,this._size[0]),Je(y,this._size[0]),r._swapRows(g,y,this._size[1],this._values,this._index,this._ptr),this},r._forEachRow=function(g,y,w,A,v){for(var b=A[g],x=A[g+1],d=b;d<x;d++)v(w[d],y[d])},r._swapRows=function(g,y,w,A,v,b){for(var x=0;x<w;x++){var d=b[x],M=b[x+1],S=f(g,d,M,v),T=f(y,d,M,v);if(S<M&&T<M&&v[S]===g&&v[T]===y){if(A){var N=A[S];A[S]=A[T],A[T]=N}continue}if(S<M&&v[S]===g&&(T>=M||v[T]!==y)){var D=A?A[S]:void 0;v.splice(T,0,y),A&&A.splice(T,0,D),v.splice(T<=S?S+1:S,1),A&&A.splice(T<=S?S+1:S,1);continue}if(T<M&&v[T]===y&&(S>=M||v[S]!==g)){var k=A?A[T]:void 0;v.splice(S,0,g),A&&A.splice(S,0,k),v.splice(S<=T?T+1:T,1),A&&A.splice(S<=T?T+1:T,1)}}},r},{isClass:!0}),bd="number",yd=["typed"];function xd(e){var n=e.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);if(n){var i={"0b":2,"0o":8,"0x":16}[n[1]],t=n[2],r=n[3];return{input:e,radix:i,integerPart:t,fractionalPart:r}}else return null}function wd(e){for(var n=parseInt(e.integerPart,e.radix),i=0,t=0;t<e.fractionalPart.length;t++){var r=parseInt(e.fractionalPart[t],e.radix);i+=r/Math.pow(e.radix,t+1)}var a=n+i;if(isNaN(a))throw new SyntaxError('String "'+e.input+'" is no valid number');return a}var Ad=P(bd,yd,e=>{var{typed:n}=e,i=n("number",{"":function(){return 0},number:function(r){return r},string:function(r){if(r==="NaN")return NaN;var a=xd(r);if(a)return wd(a);var c=0,l=r.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);l&&(c=Number(l[2]),r=l[1]);var u=Number(r);if(isNaN(u))throw new SyntaxError('String "'+r+'" is no valid number');if(l){if(u>2**c-1)throw new SyntaxError('String "'.concat(r,'" is out of range'));u>=2**(c-1)&&(u=u-2**c)}return u},BigNumber:function(r){return r.toNumber()},Fraction:function(r){return r.valueOf()},Unit:function(r){throw new Error("Second argument with valueless unit expected")},null:function(r){return 0},"Unit, string | Unit":function(r,a){return r.toNumber(a)},"Array | Matrix":function(r){return xe(r,this)}});return i.fromJSON=function(t){return parseFloat(t.value)},i}),Xs="string",Nd=["typed"],Sd=P(Xs,Nd,e=>{var{typed:n}=e;return n(Xs,{"":function(){return""},number:Wn,null:function(t){return"null"},boolean:function(t){return t+""},string:function(t){return t},"Array | Matrix":function(t){return xe(t,this)},any:function(t){return String(t)}})}),Ys="boolean",Md=["typed"],Td=P(Ys,Md,e=>{var{typed:n}=e;return n(Ys,{"":function(){return!1},boolean:function(t){return t},number:function(t){return!!t},null:function(t){return!1},BigNumber:function(t){return!t.isZero()},string:function(t){var r=t.toLowerCase();if(r==="true")return!0;if(r==="false")return!1;var a=Number(t);if(t!==""&&!isNaN(a))return!!a;throw new Error('Cannot convert "'+t+'" to a boolean')},"Array | Matrix":function(t){return xe(t,this)}})}),kd="bignumber",Ed=["typed","BigNumber"],Cd=P(kd,Ed,e=>{var{typed:n,BigNumber:i}=e;return n("bignumber",{"":function(){return new i(0)},number:function(r){return new i(r+"")},string:function(r){var a=r.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);if(a){var c=a[2],l=i(a[1]),u=new i(2).pow(Number(c));if(l.gt(u.sub(1)))throw new SyntaxError('String "'.concat(r,'" is out of range'));var f=new i(2).pow(Number(c)-1);return l.gte(f)?l.sub(u):l}return new i(r)},BigNumber:function(r){return r},Fraction:function(r){return new i(r.n).div(r.d).times(r.s)},null:function(r){return new i(0)},"Array | Matrix":function(r){return xe(r,this)}})}),Bd="complex",Ld=["typed","Complex"],Dd=P(Bd,Ld,e=>{var{typed:n,Complex:i}=e;return n("complex",{"":function(){return i.ZERO},number:function(r){return new i(r,0)},"number, number":function(r,a){return new i(r,a)},"BigNumber, BigNumber":function(r,a){return new i(r.toNumber(),a.toNumber())},Fraction:function(r){return new i(r.valueOf(),0)},Complex:function(r){return r.clone()},string:function(r){return i(r)},null:function(r){return i(0)},Object:function(r){if("re"in r&&"im"in r)return new i(r.re,r.im);if("r"in r&&"phi"in r||"abs"in r&&"arg"in r)return new i(r);throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)")},"Array | Matrix":function(r){return xe(r,this)}})}),Id="fraction",Od=["typed","Fraction"],zd=P(Id,Od,e=>{var{typed:n,Fraction:i}=e;return n("fraction",{number:function(r){if(!isFinite(r)||isNaN(r))throw new Error(r+" cannot be represented as a fraction");return new i(r)},string:function(r){return new i(r)},"number, number":function(r,a){return new i(r,a)},null:function(r){return new i(0)},BigNumber:function(r){return new i(r.toString())},Fraction:function(r){return r},Object:function(r){return new i(r)},"Array | Matrix":function(r){return xe(r,this)}})}),Js="matrix",Pd=["typed","Matrix","DenseMatrix","SparseMatrix"],$d=P(Js,Pd,e=>{var{typed:n,Matrix:i,DenseMatrix:t,SparseMatrix:r}=e;return n(Js,{"":function(){return a([])},string:function(l){return a([],l)},"string, string":function(l,u){return a([],l,u)},Array:function(l){return a(l)},Matrix:function(l){return a(l,l.storage())},"Array | Matrix, string":a,"Array | Matrix, string, string":a});function a(c,l,u){if(l==="dense"||l==="default"||l===void 0)return new t(c,u);if(l==="sparse")return new r(c,u);throw new TypeError("Unknown matrix type "+JSON.stringify(l)+".")}}),Qs="matrixFromFunction",_d=["typed","matrix","isZero"],Fd=P(Qs,_d,e=>{var{typed:n,matrix:i,isZero:t}=e;return n(Qs,{"Array | Matrix, function, string, string":function(c,l,u,f){return r(c,l,u,f)},"Array | Matrix, function, string":function(c,l,u){return r(c,l,u)},"Matrix, function":function(c,l){return r(c,l,"dense")},"Array, function":function(c,l){return r(c,l,"dense").toArray()},"Array | Matrix, string, function":function(c,l,u){return r(c,u,l)},"Array | Matrix, string, string, function":function(c,l,u,f){return r(c,f,l,u)}});function r(a,c,l,u){var f;return u!==void 0?f=i(l,u):f=i(l),f.resize(a),f.forEach(function(o,s){var m=c(s);t(m)||f.set(s,m)}),f}}),js="matrixFromRows",Rd=["typed","matrix","flatten","size"],qd=P(js,Rd,e=>{var{typed:n,matrix:i,flatten:t,size:r}=e;return n(js,{"...Array":function(u){return a(u)},"...Matrix":function(u){return i(a(u.map(f=>f.toArray())))}});function a(l){if(l.length===0)throw new TypeError("At least one row is needed to construct a matrix.");var u=c(l[0]),f=[];for(var o of l){var s=c(o);if(s!==u)throw new TypeError("The vectors had different length: "+(u|0)+" \u2260 "+(s|0));f.push(t(o))}return f}function c(l){var u=r(l);if(u.length===1)return u[0];if(u.length===2){if(u[0]===1)return u[1];if(u[1]===1)return u[0];throw new TypeError("At least one of the arguments is not a vector.")}else throw new TypeError("Only one- or two-dimensional vectors are supported.")}}),eo="matrixFromColumns",Kd=["typed","matrix","flatten","size"],Ud=P(eo,Kd,e=>{var{typed:n,matrix:i,flatten:t,size:r}=e;return n(eo,{"...Array":function(u){return a(u)},"...Matrix":function(u){return i(a(u.map(f=>f.toArray())))}});function a(l){if(l.length===0)throw new TypeError("At least one column is needed to construct a matrix.");for(var u=c(l[0]),f=[],o=0;o<u;o++)f[o]=[];for(var s of l){var m=c(s);if(m!==u)throw new TypeError("The vectors had different length: "+(u|0)+" \u2260 "+(m|0));for(var h=t(s),p=0;p<u;p++)f[p].push(h[p])}return f}function c(l){var u=r(l);if(u.length===1)return u[0];if(u.length===2){if(u[0]===1)return u[1];if(u[1]===1)return u[0];throw new TypeError("At least one of the arguments is not a vector.")}else throw new TypeError("Only one- or two-dimensional vectors are supported.")}}),ro="splitUnit",Vd=["typed"],Wd=P(ro,Vd,e=>{var{typed:n}=e;return n(ro,{"Unit, Array":function(t,r){return t.splitUnit(r)}})}),no="unaryMinus",Gd=["typed"],Hd=P(no,Gd,e=>{var{typed:n}=e;return n(no,{number:Ef,Complex:function(t){return t.neg()},BigNumber:function(t){return t.neg()},Fraction:function(t){return t.neg()},Unit:function(t){var r=t.clone();return r.value=this(t.value),r},"Array | Matrix":function(t){return xe(t,this)}})}),to="unaryPlus",Zd=["typed","config","BigNumber"],Xd=P(to,Zd,e=>{var{typed:n,config:i,BigNumber:t}=e;return n(to,{number:Cf,Complex:function(a){return a},BigNumber:function(a){return a},Fraction:function(a){return a},Unit:function(a){return a.clone()},"Array | Matrix":function(a){return xe(a,this)},"boolean | string":function(a){return i.number==="BigNumber"?new t(+a):+a}})}),io="abs",Yd=["typed"],Jd=P(io,Yd,e=>{var{typed:n}=e;return n(io,{number:Mf,Complex:function(t){return t.abs()},BigNumber:function(t){return t.abs()},Fraction:function(t){return t.abs()},"Array | Matrix":function(t){return xe(t,this)},Unit:function(t){return t.abs()}})}),ao="apply",Qd=["typed","isInteger"],wm=P(ao,Qd,e=>{var{typed:n,isInteger:i}=e;return n(ao,{"Array | Matrix, number | BigNumber, function":function(r,a,c){if(!i(a))throw new TypeError("Integer number expected for dimension");var l=Array.isArray(r)?Re(r):r.size();if(a<0||a>=l.length)throw new rn(a,l.length);return Ce(r)?r.create(Ti(r.valueOf(),a,c)):Ti(r,a,c)}})});function Ti(e,n,i){var t,r,a;if(n<=0)if(Array.isArray(e[0])){for(a=jd(e),r=[],t=0;t<a.length;t++)r[t]=Ti(a[t],n-1,i);return r}else return i(e);else{for(r=[],t=0;t<e.length;t++)r[t]=Ti(e[t],n-1,i);return r}}function jd(e){var n=e.length,i=e[0].length,t,r,a=[];for(r=0;r<i;r++){var c=[];for(t=0;t<n;t++)c.push(e[t][r]);a.push(c)}return a}var so="addScalar",ev=["typed"],rv=P(so,ev,e=>{var{typed:n}=e;return n(so,{"number, number":Tf,"Complex, Complex":function(t,r){return t.add(r)},"BigNumber, BigNumber":function(t,r){return t.plus(r)},"Fraction, Fraction":function(t,r){return t.add(r)},"Unit, Unit":function(t,r){if(t.value===null||t.value===void 0)throw new Error("Parameter x contains a unit with undefined value");if(r.value===null||r.value===void 0)throw new Error("Parameter y contains a unit with undefined value");if(!t.equalBase(r))throw new Error("Units do not match");var a=t.clone();return a.value=this(a.value,r.value),a.fixPrefix=!1,a}})}),oo="cbrt",nv=["config","typed","isNegative","unaryMinus","matrix","Complex","BigNumber","Fraction"],tv=P(oo,nv,e=>{var{config:n,typed:i,isNegative:t,unaryMinus:r,matrix:a,Complex:c,BigNumber:l,Fraction:u}=e;return i(oo,{number:Ot,Complex:f,"Complex, boolean":f,BigNumber:function(m){return m.cbrt()},Unit:o,"Array | Matrix":function(m){return xe(m,this)}});function f(s,m){var h=s.arg()/3,p=s.abs(),g=new c(Ot(p),0).mul(new c(0,h).exp());if(m){var y=[g,new c(Ot(p),0).mul(new c(0,h+Math.PI*2/3).exp()),new c(Ot(p),0).mul(new c(0,h-Math.PI*2/3).exp())];return n.matrix==="Array"?y:a(y)}else return g}function o(s){if(s.value&&Mn(s.value)){var m=s.clone();return m.value=1,m=m.pow(1/3),m.value=f(s.value),m}else{var h=t(s.value);h&&(s.value=r(s.value));var p;$e(s.value)?p=new l(1).div(3):yt(s.value)?p=new u(1,3):p=1/3;var g=s.pow(p);return h&&(g.value=r(g.value)),g}}}),iv="algorithm11",av=["typed","equalScalar"],yr=P(iv,av,e=>{var{typed:n,equalScalar:i}=e;return function(r,a,c,l){var u=r._values,f=r._index,o=r._ptr,s=r._size,m=r._datatype;if(!u)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var h=s[0],p=s[1],g,y=i,w=0,A=c;typeof m=="string"&&(g=m,y=n.find(i,[g,g]),w=n.convert(0,g),a=n.convert(a,g),A=n.find(c,[g,g]));for(var v=[],b=[],x=[],d=0;d<p;d++){x[d]=b.length;for(var M=o[d],S=o[d+1],T=M;T<S;T++){var N=f[T],D=l?A(a,u[T]):A(u[T],a);y(D,w)||(b.push(N),v.push(D))}}return x[p]=b.length,r.createSparseMatrix({values:v,index:b,ptr:x,size:[h,p],datatype:g})}}),sv="algorithm12",ov=["typed","DenseMatrix"],dr=P(sv,ov,e=>{var{typed:n,DenseMatrix:i}=e;return function(r,a,c,l){var u=r._values,f=r._index,o=r._ptr,s=r._size,m=r._datatype;if(!u)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var h=s[0],p=s[1],g,y=c;typeof m=="string"&&(g=m,a=n.convert(a,g),y=n.find(c,[g,g]));for(var w=[],A=[],v=[],b=0;b<p;b++){for(var x=b+1,d=o[b],M=o[b+1],S=d;S<M;S++){var T=f[S];A[T]=u[S],v[T]=x}for(var N=0;N<h;N++)b===0&&(w[N]=[]),v[N]===x?w[N][b]=l?y(a,A[N]):y(A[N],a):w[N][b]=l?y(a,0):y(0,a)}return new i({data:w,size:[h,p],datatype:g})}}),uv="algorithm14",cv=["typed"],Ve=P(uv,cv,e=>{var{typed:n}=e;return function(r,a,c,l){var u=r._data,f=r._size,o=r._datatype,s,m=c;typeof o=="string"&&(s=o,a=n.convert(a,s),m=n.find(c,[s,s]));var h=f.length>0?i(m,0,f,f[0],u,a,l):[];return r.createDenseMatrix({data:h,size:ke(f),datatype:s})};function i(t,r,a,c,l,u,f){var o=[];if(r===a.length-1)for(var s=0;s<c;s++)o[s]=f?t(u,l[s]):t(l[s],u);else for(var m=0;m<c;m++)o[m]=i(t,r+1,a,a[r+1],l[m],u,f);return o}}),Na="ceil",lv=["typed","config","round","matrix","equalScalar","zeros","DenseMatrix"],fv=P(Na,["typed","config","round"],e=>{var{typed:n,config:i,round:t}=e;return n(Na,{number:function(a){return _r(a,t(a),i.epsilon)?t(a):Math.ceil(a)},"number, number":function(a,c){if(_r(a,t(a,c),i.epsilon))return t(a,c);var[l,u]="".concat(a,"e").split("e"),f=Math.ceil(Number("".concat(l,"e").concat(Number(u)+c)));return[l,u]="".concat(f,"e").split("e"),Number("".concat(l,"e").concat(Number(u)-c))}})}),mv=P(Na,lv,e=>{var{typed:n,config:i,round:t,matrix:r,equalScalar:a,zeros:c,DenseMatrix:l}=e,u=yr({typed:n,equalScalar:a}),f=dr({typed:n,DenseMatrix:l}),o=Ve({typed:n}),s=fv({typed:n,config:i,round:t});return n("ceil",{number:s.signatures.number,"number,number":s.signatures["number,number"],Complex:function(h){return h.ceil()},"Complex, number":function(h,p){return h.ceil(p)},"Complex, BigNumber":function(h,p){return h.ceil(p.toNumber())},BigNumber:function(h){return fn(h,t(h),i.epsilon)?t(h):h.ceil()},"BigNumber, BigNumber":function(h,p){return fn(h,t(h,p),i.epsilon)?t(h,p):h.toDecimalPlaces(p.toNumber(),Fn.ROUND_CEIL)},Fraction:function(h){return h.ceil()},"Fraction, number":function(h,p){return h.ceil(p)},"Fraction, BigNumber":function(h,p){return h.ceil(p.toNumber())},"Array | Matrix":function(h){return xe(h,this)},"Array, number | BigNumber":function(h,p){return xe(h,g=>this(g,p))},"SparseMatrix, number | BigNumber":function(h,p){return u(h,p,this,!1)},"DenseMatrix, number | BigNumber":function(h,p){return o(h,p,this,!1)},"number | Complex | Fraction | BigNumber, Array":function(h,p){return o(r(p),h,this,!0).valueOf()},"number | Complex | Fraction | BigNumber, Matrix":function(h,p){return a(h,0)?c(p.size(),p.storage()):p.storage()==="dense"?o(p,h,this,!0):f(p,h,this,!0)}})}),uo="cube",hv=["typed"],pv=P(uo,hv,e=>{var{typed:n}=e;return n(uo,{number:Bf,Complex:function(t){return t.mul(t).mul(t)},BigNumber:function(t){return t.times(t).times(t)},Fraction:function(t){return t.pow(3)},"Array | Matrix":function(t){return xe(t,this)},Unit:function(t){return t.pow(3)}})}),co="exp",gv=["typed"],dv=P(co,gv,e=>{var{typed:n}=e;return n(co,{number:Lf,Complex:function(t){return t.exp()},BigNumber:function(t){return t.exp()},"Array | Matrix":function(t){return xe(t,this)}})}),lo="expm1",vv=["typed","Complex"],bv=P(lo,vv,e=>{var{typed:n,Complex:i}=e;return n(lo,{number:Df,Complex:function(r){var a=Math.exp(r.re);return new i(a*Math.cos(r.im)-1,a*Math.sin(r.im))},BigNumber:function(r){return r.exp().minus(1)},"Array | Matrix":function(r){return xe(r,this)}})}),Sa="fix",yv=["typed","Complex","matrix","ceil","floor","equalScalar","zeros","DenseMatrix"],xv=P(Sa,["typed","ceil","floor"],e=>{var{typed:n,ceil:i,floor:t}=e;return n(Sa,{number:function(a){return a>0?t(a):i(a)},"number, number":function(a,c){return a>0?t(a,c):i(a,c)}})}),wv=P(Sa,yv,e=>{var{typed:n,Complex:i,matrix:t,ceil:r,floor:a,equalScalar:c,zeros:l,DenseMatrix:u}=e,f=dr({typed:n,DenseMatrix:u}),o=Ve({typed:n}),s=xv({typed:n,ceil:r,floor:a});return n("fix",{number:s.signatures.number,"number, number | BigNumber":s.signatures["number,number"],Complex:function(h){return new i(h.re>0?Math.floor(h.re):Math.ceil(h.re),h.im>0?Math.floor(h.im):Math.ceil(h.im))},"Complex, number":function(h,p){return new i(h.re>0?a(h.re,p):r(h.re,p),h.im>0?a(h.im,p):r(h.im,p))},"Complex, BigNumber":function(h,p){var g=p.toNumber();return new i(h.re>0?a(h.re,g):r(h.re,g),h.im>0?a(h.im,g):r(h.im,g))},BigNumber:function(h){return h.isNegative()?r(h):a(h)},"BigNumber, number | BigNumber":function(h,p){return h.isNegative()?r(h,p):a(h,p)},Fraction:function(h){return h.s<0?h.ceil():h.floor()},"Fraction, number | BigNumber":function(h,p){return h.s<0?r(h,p):a(h,p)},"Array | Matrix":function(h){return xe(h,this)},"Array | Matrix, number | BigNumber":function(h,p){return xe(h,g=>this(g,p))},"number | Complex | Fraction | BigNumber, Array":function(h,p){return o(t(p),h,this,!0).valueOf()},"number | Complex | Fraction | BigNumber, Matrix":function(h,p){return c(h,0)?l(p.size(),p.storage()):p.storage()==="dense"?o(p,h,this,!0):f(p,h,this,!0)}})}),Ma="floor",Av=["typed","config","round","matrix","equalScalar","zeros","DenseMatrix"],Nv=P(Ma,["typed","config","round"],e=>{var{typed:n,config:i,round:t}=e;return n(Ma,{number:function(a){return _r(a,t(a),i.epsilon)?t(a):Math.floor(a)},"number, number":function(a,c){if(_r(a,t(a,c),i.epsilon))return t(a,c);var[l,u]="".concat(a,"e").split("e"),f=Math.floor(Number("".concat(l,"e").concat(Number(u)+c)));return[l,u]="".concat(f,"e").split("e"),Number("".concat(l,"e").concat(Number(u)-c))}})}),Sv=P(Ma,Av,e=>{var{typed:n,config:i,round:t,matrix:r,equalScalar:a,zeros:c,DenseMatrix:l}=e,u=yr({typed:n,equalScalar:a}),f=dr({typed:n,DenseMatrix:l}),o=Ve({typed:n}),s=Nv({typed:n,config:i,round:t});return n("floor",{number:s.signatures.number,"number,number":s.signatures["number,number"],Complex:function(h){return h.floor()},"Complex, number":function(h,p){return h.floor(p)},"Complex, BigNumber":function(h,p){return h.floor(p.toNumber())},BigNumber:function(h){return fn(h,t(h),i.epsilon)?t(h):h.floor()},"BigNumber, BigNumber":function(h,p){return fn(h,t(h,p),i.epsilon)?t(h,p):h.toDecimalPlaces(p.toNumber(),Fn.ROUND_FLOOR)},Fraction:function(h){return h.floor()},"Fraction, number":function(h,p){return h.floor(p)},"Fraction, BigNumber":function(h,p){return h.floor(p.toNumber())},"Array | Matrix":function(h){return xe(h,this)},"Array, number | BigNumber":function(h,p){return xe(h,g=>this(g,p))},"SparseMatrix, number | BigNumber":function(h,p){return u(h,p,this,!1)},"DenseMatrix, number | BigNumber":function(h,p){return o(h,p,this,!1)},"number | Complex | Fraction | BigNumber, Array":function(h,p){return o(r(p),h,this,!0).valueOf()},"number | Complex | Fraction | BigNumber, Matrix":function(h,p){return a(h,0)?c(p.size(),p.storage()):p.storage()==="dense"?o(p,h,this,!0):f(p,h,this,!0)}})}),Mv="algorithm01",Tv=["typed"],qn=P(Mv,Tv,e=>{var{typed:n}=e;return function(t,r,a,c){var l=t._data,u=t._size,f=t._datatype,o=r._values,s=r._index,m=r._ptr,h=r._size,p=r._datatype;if(u.length!==h.length)throw new ze(u.length,h.length);if(u[0]!==h[0]||u[1]!==h[1])throw new RangeError("Dimension mismatch. Matrix A ("+u+") must match Matrix B ("+h+")");if(!o)throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var g=u[0],y=u[1],w=typeof f=="string"&&f===p?f:void 0,A=w?n.find(a,[w,w]):a,v,b,x=[];for(v=0;v<g;v++)x[v]=[];var d=[],M=[];for(b=0;b<y;b++){for(var S=b+1,T=m[b],N=m[b+1],D=T;D<N;D++)v=s[D],d[v]=c?A(o[D],l[v][b]):A(l[v][b],o[D]),M[v]=S;for(v=0;v<g;v++)M[v]===S?x[v][b]=d[v]:x[v][b]=l[v][b]}return t.createDenseMatrix({data:x,size:[g,y],datatype:w})}}),kv="algorithm04",Ev=["typed","equalScalar"],Za=P(kv,Ev,e=>{var{typed:n,equalScalar:i}=e;return function(r,a,c){var l=r._values,u=r._index,f=r._ptr,o=r._size,s=r._datatype,m=a._values,h=a._index,p=a._ptr,g=a._size,y=a._datatype;if(o.length!==g.length)throw new ze(o.length,g.length);if(o[0]!==g[0]||o[1]!==g[1])throw new RangeError("Dimension mismatch. Matrix A ("+o+") must match Matrix B ("+g+")");var w=o[0],A=o[1],v,b=i,x=0,d=c;typeof s=="string"&&s===y&&(v=s,b=n.find(i,[v,v]),x=n.convert(0,v),d=n.find(c,[v,v]));var M=l&&m?[]:void 0,S=[],T=[],N=l&&m?[]:void 0,D=l&&m?[]:void 0,k=[],I=[],_,O,B,L,V;for(O=0;O<A;O++){T[O]=S.length;var C=O+1;for(L=f[O],V=f[O+1],B=L;B<V;B++)_=u[B],S.push(_),k[_]=C,N&&(N[_]=l[B]);for(L=p[O],V=p[O+1],B=L;B<V;B++)if(_=h[B],k[_]===C){if(N){var U=d(N[_],m[B]);b(U,x)?k[_]=null:N[_]=U}}else S.push(_),I[_]=C,D&&(D[_]=m[B]);if(N&&D)for(B=T[O];B<S.length;)_=S[B],k[_]===C?(M[B]=N[_],B++):I[_]===C?(M[B]=D[_],B++):S.splice(B,1)}return T[A]=S.length,r.createSparseMatrix({values:M,index:S,ptr:T,size:[w,A],datatype:v})}}),Cv="algorithm10",Bv=["typed","DenseMatrix"],Xn=P(Cv,Bv,e=>{var{typed:n,DenseMatrix:i}=e;return function(r,a,c,l){var u=r._values,f=r._index,o=r._ptr,s=r._size,m=r._datatype;if(!u)throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var h=s[0],p=s[1],g,y=c;typeof m=="string"&&(g=m,a=n.convert(a,g),y=n.find(c,[g,g]));for(var w=[],A=[],v=[],b=0;b<p;b++){for(var x=b+1,d=o[b],M=o[b+1],S=d;S<M;S++){var T=f[S];A[T]=u[S],v[T]=x}for(var N=0;N<h;N++)b===0&&(w[N]=[]),v[N]===x?w[N][b]=l?y(a,A[N]):y(A[N],a):w[N][b]=a}return new i({data:w,size:[h,p],datatype:g})}}),Lv="algorithm13",Dv=["typed"],er=P(Lv,Dv,e=>{var{typed:n}=e;return function(r,a,c){var l=r._data,u=r._size,f=r._datatype,o=a._data,s=a._size,m=a._datatype,h=[];if(u.length!==s.length)throw new ze(u.length,s.length);for(var p=0;p<u.length;p++){if(u[p]!==s[p])throw new RangeError("Dimension mismatch. Matrix A ("+u+") must match Matrix B ("+s+")");h[p]=u[p]}var g,y=c;typeof f=="string"&&f===m&&(g=f,y=n.find(c,[g,g]));var w=h.length>0?i(y,0,h,h[0],l,o):[];return r.createDenseMatrix({data:w,size:h,datatype:g})};function i(t,r,a,c,l,u){var f=[];if(r===a.length-1)for(var o=0;o<c;o++)f[o]=t(l[o],u[o]);else for(var s=0;s<c;s++)f[s]=i(t,r+1,a,a[r+1],l[s],u[s]);return f}}),fo="gcd",Iv=["typed","matrix","equalScalar","BigNumber","DenseMatrix"],Ov=P(fo,Iv,e=>{var{typed:n,matrix:i,equalScalar:t,BigNumber:r,DenseMatrix:a}=e,c=qn({typed:n}),l=Za({typed:n,equalScalar:t}),u=Xn({typed:n,DenseMatrix:a}),f=er({typed:n}),o=Ve({typed:n});return n(fo,{"number, number":If,"BigNumber, BigNumber":s,"Fraction, Fraction":function(h,p){return h.gcd(p)},"SparseMatrix, SparseMatrix":function(h,p){return l(h,p,this)},"SparseMatrix, DenseMatrix":function(h,p){return c(p,h,this,!0)},"DenseMatrix, SparseMatrix":function(h,p){return c(h,p,this,!1)},"DenseMatrix, DenseMatrix":function(h,p){return f(h,p,this)},"Array, Array":function(h,p){return this(i(h),i(p)).valueOf()},"Array, Matrix":function(h,p){return this(i(h),p)},"Matrix, Array":function(h,p){return this(h,i(p))},"SparseMatrix, number | BigNumber":function(h,p){return u(h,p,this,!1)},"DenseMatrix, number | BigNumber":function(h,p){return o(h,p,this,!1)},"number | BigNumber, SparseMatrix":function(h,p){return u(p,h,this,!0)},"number | BigNumber, DenseMatrix":function(h,p){return o(p,h,this,!0)},"Array, number | BigNumber":function(h,p){return o(i(h),p,this,!1).valueOf()},"number | BigNumber, Array":function(h,p){return o(i(p),h,this,!0).valueOf()},"Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber":function(h,p,g){for(var y=this(h,p),w=0;w<g.length;w++)y=this(y,g[w]);return y}});function s(m,h){if(!m.isInt()||!h.isInt())throw new Error("Parameters in function gcd must be integer numbers");for(var p=new r(0);!h.isZero();){var g=m.mod(h);m=h,h=g}return m.lt(p)?m.neg():m}}),zv="algorithm02",Pv=["typed","equalScalar"],tn=P(zv,Pv,e=>{var{typed:n,equalScalar:i}=e;return function(r,a,c,l){var u=r._data,f=r._size,o=r._datatype,s=a._values,m=a._index,h=a._ptr,p=a._size,g=a._datatype;if(f.length!==p.length)throw new ze(f.length,p.length);if(f[0]!==p[0]||f[1]!==p[1])throw new RangeError("Dimension mismatch. Matrix A ("+f+") must match Matrix B ("+p+")");if(!s)throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var y=f[0],w=f[1],A,v=i,b=0,x=c;typeof o=="string"&&o===g&&(A=o,v=n.find(i,[A,A]),b=n.convert(0,A),x=n.find(c,[A,A]));for(var d=[],M=[],S=[],T=0;T<w;T++){S[T]=M.length;for(var N=h[T],D=h[T+1],k=N;k<D;k++){var I=m[k],_=l?x(s[k],u[I][T]):x(u[I][T],s[k]);v(_,b)||(M.push(I),d.push(_))}}return S[w]=M.length,a.createSparseMatrix({values:d,index:M,ptr:S,size:[y,w],datatype:A})}}),$v="algorithm06",_v=["typed","equalScalar"],qi=P($v,_v,e=>{var{typed:n,equalScalar:i}=e;return function(r,a,c){var l=r._values,u=r._size,f=r._datatype,o=a._values,s=a._size,m=a._datatype;if(u.length!==s.length)throw new ze(u.length,s.length);if(u[0]!==s[0]||u[1]!==s[1])throw new RangeError("Dimension mismatch. Matrix A ("+u+") must match Matrix B ("+s+")");var h=u[0],p=u[1],g,y=i,w=0,A=c;typeof f=="string"&&f===m&&(g=f,y=n.find(i,[g,g]),w=n.convert(0,g),A=n.find(c,[g,g]));for(var v=l&&o?[]:void 0,b=[],x=[],d=v?[]:void 0,M=[],S=[],T=0;T<p;T++){x[T]=b.length;var N=T+1;if($s(r,T,M,d,S,N,b,A),$s(a,T,M,d,S,N,b,A),d)for(var D=x[T];D<b.length;){var k=b[D];if(S[k]===N){var I=d[k];y(I,w)?b.splice(D,1):(v.push(I),D++)}else b.splice(D,1)}else for(var _=x[T];_<b.length;){var O=b[_];S[O]!==N?b.splice(_,1):_++}}return x[p]=b.length,r.createSparseMatrix({values:v,index:b,ptr:x,size:[h,p],datatype:g})}}),mo="lcm",Fv=["typed","matrix","equalScalar"],Rv=P(mo,Fv,e=>{var{typed:n,matrix:i,equalScalar:t}=e,r=tn({typed:n,equalScalar:t}),a=qi({typed:n,equalScalar:t}),c=yr({typed:n,equalScalar:t}),l=er({typed:n}),u=Ve({typed:n});return n(mo,{"number, number":Of,"BigNumber, BigNumber":f,"Fraction, Fraction":function(s,m){return s.lcm(m)},"SparseMatrix, SparseMatrix":function(s,m){return a(s,m,this)},"SparseMatrix, DenseMatrix":function(s,m){return r(m,s,this,!0)},"DenseMatrix, SparseMatrix":function(s,m){return r(s,m,this,!1)},"DenseMatrix, DenseMatrix":function(s,m){return l(s,m,this)},"Array, Array":function(s,m){return this(i(s),i(m)).valueOf()},"Array, Matrix":function(s,m){return this(i(s),m)},"Matrix, Array":function(s,m){return this(s,i(m))},"SparseMatrix, number | BigNumber":function(s,m){return c(s,m,this,!1)},"DenseMatrix, number | BigNumber":function(s,m){return u(s,m,this,!1)},"number | BigNumber, SparseMatrix":function(s,m){return c(m,s,this,!0)},"number | BigNumber, DenseMatrix":function(s,m){return u(m,s,this,!0)},"Array, number | BigNumber":function(s,m){return u(i(s),m,this,!1).valueOf()},"number | BigNumber, Array":function(s,m){return u(i(m),s,this,!0).valueOf()},"Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber":function(s,m,h){for(var p=this(s,m),g=0;g<h.length;g++)p=this(p,h[g]);return p}});function f(o,s){if(!o.isInt()||!s.isInt())throw new Error("Parameters in function lcm must be integer numbers");if(o.isZero())return o;if(s.isZero())return s;for(var m=o.times(s);!s.isZero();){var h=s;s=o.mod(h),o=h}return m.div(o).abs()}}),ho="log10",qv=["typed","config","Complex"],Kv=P(ho,qv,e=>{var{typed:n,config:i,Complex:t}=e;return n(ho,{number:function(a){return a>=0||i.predictable?zf(a):new t(a,0).log().div(Math.LN10)},Complex:function(a){return new t(a).log().div(Math.LN10)},BigNumber:function(a){return!a.isNegative()||i.predictable?a.log():new t(a.toNumber(),0).log().div(Math.LN10)},"Array | Matrix":function(a){return xe(a,this)}})}),po="log2",Uv=["typed","config","Complex"],Vv=P(po,Uv,e=>{var{typed:n,config:i,Complex:t}=e;return n(po,{number:function(c){return c>=0||i.predictable?Pf(c):r(new t(c,0))},Complex:r,BigNumber:function(c){return!c.isNegative()||i.predictable?c.log(2):r(new t(c.toNumber(),0))},"Array | Matrix":function(c){return xe(c,this)}});function r(a){var c=Math.sqrt(a.re*a.re+a.im*a.im);return new t(Math.log2?Math.log2(c):Math.log(c)/Math.LN2,Math.atan2(a.im,a.re)/Math.LN2)}}),Wv="algorithm03",Gv=["typed"],Cr=P(Wv,Gv,e=>{var{typed:n}=e;return function(t,r,a,c){var l=t._data,u=t._size,f=t._datatype,o=r._values,s=r._index,m=r._ptr,h=r._size,p=r._datatype;if(u.length!==h.length)throw new ze(u.length,h.length);if(u[0]!==h[0]||u[1]!==h[1])throw new RangeError("Dimension mismatch. Matrix A ("+u+") must match Matrix B ("+h+")");if(!o)throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var g=u[0],y=u[1],w,A=0,v=a;typeof f=="string"&&f===p&&(w=f,A=n.convert(0,w),v=n.find(a,[w,w]));for(var b=[],x=0;x<g;x++)b[x]=[];for(var d=[],M=[],S=0;S<y;S++){for(var T=S+1,N=m[S],D=m[S+1],k=N;k<D;k++){var I=s[k];d[I]=c?v(o[k],l[I][S]):v(l[I][S],o[k]),M[I]=T}for(var _=0;_<g;_++)M[_]===T?b[_][S]=d[_]:b[_][S]=c?v(A,l[_][S]):v(l[_][S],A)}return t.createDenseMatrix({data:b,size:[g,y],datatype:w})}}),Hv="algorithm05",Zv=["typed","equalScalar"],Ki=P(Hv,Zv,e=>{var{typed:n,equalScalar:i}=e;return function(r,a,c){var l=r._values,u=r._index,f=r._ptr,o=r._size,s=r._datatype,m=a._values,h=a._index,p=a._ptr,g=a._size,y=a._datatype;if(o.length!==g.length)throw new ze(o.length,g.length);if(o[0]!==g[0]||o[1]!==g[1])throw new RangeError("Dimension mismatch. Matrix A ("+o+") must match Matrix B ("+g+")");var w=o[0],A=o[1],v,b=i,x=0,d=c;typeof s=="string"&&s===y&&(v=s,b=n.find(i,[v,v]),x=n.convert(0,v),d=n.find(c,[v,v]));var M=l&&m?[]:void 0,S=[],T=[],N=M?[]:void 0,D=M?[]:void 0,k=[],I=[],_,O,B,L;for(O=0;O<A;O++){T[O]=S.length;var V=O+1;for(B=f[O],L=f[O+1];B<L;B++)_=u[B],S.push(_),k[_]=V,N&&(N[_]=l[B]);for(B=p[O],L=p[O+1];B<L;B++)_=h[B],k[_]!==V&&S.push(_),I[_]=V,D&&(D[_]=m[B]);if(M)for(B=T[O];B<S.length;){_=S[B];var C=k[_],U=I[_];if(C===V||U===V){var X=C===V?N[_]:x,j=U===V?D[_]:x,W=d(X,j);b(W,x)?S.splice(B,1):(M.push(W),B++)}}}return T[A]=S.length,r.createSparseMatrix({values:M,index:S,ptr:T,size:[w,A],datatype:v})}}),go="mod",Xv=["typed","matrix","equalScalar","DenseMatrix"],Yv=P(go,Xv,e=>{var{typed:n,matrix:i,equalScalar:t,DenseMatrix:r}=e,a=tn({typed:n,equalScalar:t}),c=Cr({typed:n}),l=Ki({typed:n,equalScalar:t}),u=yr({typed:n,equalScalar:t}),f=dr({typed:n,DenseMatrix:r}),o=er({typed:n}),s=Ve({typed:n});return n(go,{"number, number":$f,"BigNumber, BigNumber":function(h,p){if(p.isNeg())throw new Error("Cannot calculate mod for a negative divisor");return p.isZero()?h:h.mod(p)},"Fraction, Fraction":function(h,p){if(p.compare(0)<0)throw new Error("Cannot calculate mod for a negative divisor");return h.compare(0)>=0?h.mod(p):h.mod(p).add(p).mod(p)},"SparseMatrix, SparseMatrix":function(h,p){return l(h,p,this,!1)},"SparseMatrix, DenseMatrix":function(h,p){return a(p,h,this,!0)},"DenseMatrix, SparseMatrix":function(h,p){return c(h,p,this,!1)},"DenseMatrix, DenseMatrix":function(h,p){return o(h,p,this)},"Array, Array":function(h,p){return this(i(h),i(p)).valueOf()},"Array, Matrix":function(h,p){return this(i(h),p)},"Matrix, Array":function(h,p){return this(h,i(p))},"SparseMatrix, any":function(h,p){return u(h,p,this,!1)},"DenseMatrix, any":function(h,p){return s(h,p,this,!1)},"any, SparseMatrix":function(h,p){return f(p,h,this,!0)},"any, DenseMatrix":function(h,p){return s(p,h,this,!0)},"Array, any":function(h,p){return s(i(h),p,this,!1).valueOf()},"any, Array":function(h,p){return s(i(p),h,this,!0).valueOf()}})}),Jv="multiplyScalar",Qv=["typed"],jv=P(Jv,Qv,e=>{var{typed:n}=e;return n("multiplyScalar",{"number, number":kf,"Complex, Complex":function(t,r){return t.mul(r)},"BigNumber, BigNumber":function(t,r){return t.times(r)},"Fraction, Fraction":function(t,r){return t.mul(r)},"number | Fraction | BigNumber | Complex, Unit":function(t,r){var a=r.clone();return a.value=a.value===null?a._normalize(t):this(a.value,t),a},"Unit, number | Fraction | BigNumber | Complex":function(t,r){var a=t.clone();return a.value=a.value===null?a._normalize(r):this(a.value,r),a},"Unit, Unit":function(t,r){return t.multiply(r)}})}),vo="multiply",e0=["typed","matrix","addScalar","multiplyScalar","equalScalar","dot"],r0=P(vo,e0,e=>{var{typed:n,matrix:i,addScalar:t,multiplyScalar:r,equalScalar:a,dot:c}=e,l=yr({typed:n,equalScalar:a}),u=Ve({typed:n});function f(x,d){switch(x.length){case 1:switch(d.length){case 1:if(x[0]!==d[0])throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");break;case 2:if(x[0]!==d[0])throw new RangeError("Dimension mismatch in multiplication. Vector length ("+x[0]+") must match Matrix rows ("+d[0]+")");break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has "+d.length+" dimensions)")}break;case 2:switch(d.length){case 1:if(x[1]!==d[0])throw new RangeError("Dimension mismatch in multiplication. Matrix columns ("+x[1]+") must match Vector length ("+d[0]+")");break;case 2:if(x[1]!==d[0])throw new RangeError("Dimension mismatch in multiplication. Matrix A columns ("+x[1]+") must match Matrix B rows ("+d[0]+")");break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has "+d.length+" dimensions)")}break;default:throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has "+x.length+" dimensions)")}}function o(x,d,M){if(M===0)throw new Error("Cannot multiply two empty vectors");return c(x,d)}function s(x,d){if(d.storage()!=="dense")throw new Error("Support for SparseMatrix not implemented");return m(x,d)}function m(x,d){var M=x._data,S=x._size,T=x._datatype,N=d._data,D=d._size,k=d._datatype,I=S[0],_=D[1],O,B=t,L=r;T&&k&&T===k&&typeof T=="string"&&(O=T,B=n.find(t,[O,O]),L=n.find(r,[O,O]));for(var V=[],C=0;C<_;C++){for(var U=L(M[0],N[0][C]),X=1;X<I;X++)U=B(U,L(M[X],N[X][C]));V[C]=U}return x.createDenseMatrix({data:V,size:[_],datatype:O})}var h=n("_multiplyMatrixVector",{"DenseMatrix, any":g,"SparseMatrix, any":A}),p=n("_multiplyMatrixMatrix",{"DenseMatrix, DenseMatrix":y,"DenseMatrix, SparseMatrix":w,"SparseMatrix, DenseMatrix":v,"SparseMatrix, SparseMatrix":b});function g(x,d){var M=x._data,S=x._size,T=x._datatype,N=d._data,D=d._datatype,k=S[0],I=S[1],_,O=t,B=r;T&&D&&T===D&&typeof T=="string"&&(_=T,O=n.find(t,[_,_]),B=n.find(r,[_,_]));for(var L=[],V=0;V<k;V++){for(var C=M[V],U=B(C[0],N[0]),X=1;X<I;X++)U=O(U,B(C[X],N[X]));L[V]=U}return x.createDenseMatrix({data:L,size:[k],datatype:_})}function y(x,d){var M=x._data,S=x._size,T=x._datatype,N=d._data,D=d._size,k=d._datatype,I=S[0],_=S[1],O=D[1],B,L=t,V=r;T&&k&&T===k&&typeof T=="string"&&(B=T,L=n.find(t,[B,B]),V=n.find(r,[B,B]));for(var C=[],U=0;U<I;U++){var X=M[U];C[U]=[];for(var j=0;j<O;j++){for(var W=V(X[0],N[0][j]),Q=1;Q<_;Q++)W=L(W,V(X[Q],N[Q][j]));C[U][j]=W}}return x.createDenseMatrix({data:C,size:[I,O],datatype:B})}function w(x,d){var M=x._data,S=x._size,T=x._datatype,N=d._values,D=d._index,k=d._ptr,I=d._size,_=d._datatype;if(!N)throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");var O=S[0],B=I[1],L,V=t,C=r,U=a,X=0;T&&_&&T===_&&typeof T=="string"&&(L=T,V=n.find(t,[L,L]),C=n.find(r,[L,L]),U=n.find(a,[L,L]),X=n.convert(0,L));for(var j=[],W=[],Q=[],ne=d.createSparseMatrix({values:j,index:W,ptr:Q,size:[O,B],datatype:L}),re=0;re<B;re++){Q[re]=W.length;var ae=k[re],te=k[re+1];if(te>ae)for(var ue=0,ee=0;ee<O;ee++){for(var be=ee+1,we=void 0,me=ae;me<te;me++){var ye=D[me];ue!==be?(we=C(M[ee][ye],N[me]),ue=be):we=V(we,C(M[ee][ye],N[me]))}ue===be&&!U(we,X)&&(W.push(ee),j.push(we))}}return Q[B]=W.length,ne}function A(x,d){var M=x._values,S=x._index,T=x._ptr,N=x._datatype;if(!M)throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var D=d._data,k=d._datatype,I=x._size[0],_=d._size[0],O=[],B=[],L=[],V,C=t,U=r,X=a,j=0;N&&k&&N===k&&typeof N=="string"&&(V=N,C=n.find(t,[V,V]),U=n.find(r,[V,V]),X=n.find(a,[V,V]),j=n.convert(0,V));var W=[],Q=[];L[0]=0;for(var ne=0;ne<_;ne++){var re=D[ne];if(!X(re,j))for(var ae=T[ne],te=T[ne+1],ue=ae;ue<te;ue++){var ee=S[ue];Q[ee]?W[ee]=C(W[ee],U(re,M[ue])):(Q[ee]=!0,B.push(ee),W[ee]=U(re,M[ue]))}}for(var be=B.length,we=0;we<be;we++){var me=B[we];O[we]=W[me]}return L[1]=B.length,x.createSparseMatrix({values:O,index:B,ptr:L,size:[I,1],datatype:V})}function v(x,d){var M=x._values,S=x._index,T=x._ptr,N=x._datatype;if(!M)throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var D=d._data,k=d._datatype,I=x._size[0],_=d._size[0],O=d._size[1],B,L=t,V=r,C=a,U=0;N&&k&&N===k&&typeof N=="string"&&(B=N,L=n.find(t,[B,B]),V=n.find(r,[B,B]),C=n.find(a,[B,B]),U=n.convert(0,B));for(var X=[],j=[],W=[],Q=x.createSparseMatrix({values:X,index:j,ptr:W,size:[I,O],datatype:B}),ne=[],re=[],ae=0;ae<O;ae++){W[ae]=j.length;for(var te=ae+1,ue=0;ue<_;ue++){var ee=D[ue][ae];if(!C(ee,U))for(var be=T[ue],we=T[ue+1],me=be;me<we;me++){var ye=S[me];re[ye]!==te?(re[ye]=te,j.push(ye),ne[ye]=V(ee,M[me])):ne[ye]=L(ne[ye],V(ee,M[me]))}}for(var $=W[ae],Z=j.length,K=$;K<Z;K++){var R=j[K];X[K]=ne[R]}}return W[O]=j.length,Q}function b(x,d){var M=x._values,S=x._index,T=x._ptr,N=x._datatype,D=d._values,k=d._index,I=d._ptr,_=d._datatype,O=x._size[0],B=d._size[1],L=M&&D,V,C=t,U=r;N&&_&&N===_&&typeof N=="string"&&(V=N,C=n.find(t,[V,V]),U=n.find(r,[V,V]));for(var X=L?[]:void 0,j=[],W=[],Q=x.createSparseMatrix({values:X,index:j,ptr:W,size:[O,B],datatype:V}),ne=L?[]:void 0,re=[],ae,te,ue,ee,be,we,me,ye,$=0;$<B;$++){W[$]=j.length;var Z=$+1;for(be=I[$],we=I[$+1],ee=be;ee<we;ee++)if(ye=k[ee],L)for(te=T[ye],ue=T[ye+1],ae=te;ae<ue;ae++)me=S[ae],re[me]!==Z?(re[me]=Z,j.push(me),ne[me]=U(D[ee],M[ae])):ne[me]=C(ne[me],U(D[ee],M[ae]));else for(te=T[ye],ue=T[ye+1],ae=te;ae<ue;ae++)me=S[ae],re[me]!==Z&&(re[me]=Z,j.push(me));if(L)for(var K=W[$],R=j.length,Y=K;Y<R;Y++){var z=j[Y];X[Y]=ne[z]}}return W[B]=j.length,Q}return n(vo,Fa({"Array, Array":function(d,M){f(Re(d),Re(M));var S=this(i(d),i(M));return Ce(S)?S.valueOf():S},"Matrix, Matrix":function(d,M){var S=d.size(),T=M.size();return f(S,T),S.length===1?T.length===1?o(d,M,S[0]):s(d,M):T.length===1?h(d,M):p(d,M)},"Matrix, Array":function(d,M){return this(d,i(M))},"Array, Matrix":function(d,M){return this(i(d,M.storage()),M)},"SparseMatrix, any":function(d,M){return l(d,M,r,!1)},"DenseMatrix, any":function(d,M){return u(d,M,r,!1)},"any, SparseMatrix":function(d,M){return l(M,d,r,!0)},"any, DenseMatrix":function(d,M){return u(M,d,r,!0)},"Array, any":function(d,M){return u(i(d),M,r,!1).valueOf()},"any, Array":function(d,M){return u(i(M),d,r,!0).valueOf()},"any, any":r,"any, any, ...any":function(d,M,S){for(var T=this(d,M),N=0;N<S.length;N++)T=this(T,S[N]);return T}},r.signatures))}),bo="nthRoot",n0=["typed","matrix","equalScalar","BigNumber"],t0=P(bo,n0,e=>{var{typed:n,matrix:i,equalScalar:t,BigNumber:r}=e,a=qn({typed:n}),c=tn({typed:n,equalScalar:t}),l=qi({typed:n,equalScalar:t}),u=yr({typed:n,equalScalar:t}),f=er({typed:n}),o=Ve({typed:n}),s="Complex number not supported in function nthRoot. Use nthRoots instead.";return n(bo,{number:Fs,"number, number":Fs,BigNumber:function(p){return m(p,new r(2))},Complex:function(p){throw new Error(s)},"Complex, number":function(p,g){throw new Error(s)},"BigNumber, BigNumber":m,"Array | Matrix":function(p){return this(p,2)},"SparseMatrix, SparseMatrix":function(p,g){if(g.density()===1)return l(p,g,this);throw new Error("Root must be non-zero")},"SparseMatrix, DenseMatrix":function(p,g){return c(g,p,this,!0)},"DenseMatrix, SparseMatrix":function(p,g){if(g.density()===1)return a(p,g,this,!1);throw new Error("Root must be non-zero")},"DenseMatrix, DenseMatrix":function(p,g){return f(p,g,this)},"Array, Array":function(p,g){return this(i(p),i(g)).valueOf()},"Array, Matrix":function(p,g){return this(i(p),g)},"Matrix, Array":function(p,g){return this(p,i(g))},"SparseMatrix, number | BigNumber":function(p,g){return u(p,g,this,!1)},"DenseMatrix, number | BigNumber":function(p,g){return o(p,g,this,!1)},"number | BigNumber, SparseMatrix":function(p,g){if(g.density()===1)return u(g,p,this,!0);throw new Error("Root must be non-zero")},"number | BigNumber, DenseMatrix":function(p,g){return o(g,p,this,!0)},"Array, number | BigNumber":function(p,g){return this(i(p),g).valueOf()},"number | BigNumber, Array":function(p,g){return this(p,i(g)).valueOf()}});function m(h,p){var g=r.precision,y=r.clone({precision:g+2}),w=new r(0),A=new y(1),v=p.isNegative();if(v&&(p=p.neg()),p.isZero())throw new Error("Root must be non-zero");if(h.isNegative()&&!p.abs().mod(2).equals(1))throw new Error("Root must be odd when a is negative.");if(h.isZero())return v?new y(1/0):0;if(!h.isFinite())return v?w:h;var b=h.abs().pow(A.div(p));return b=h.isNeg()?b.neg():b,new r((v?A.div(b):b).toPrecision(g))}}),yo="sign",i0=["typed","BigNumber","Fraction","complex"],a0=P(yo,i0,e=>{var{typed:n,BigNumber:i,complex:t,Fraction:r}=e;return n(yo,{number:Aa,Complex:function(c){return c.im===0?t(Aa(c.re)):c.sign()},BigNumber:function(c){return new i(c.cmp(0))},Fraction:function(c){return new r(c.s,1)},"Array | Matrix":function(c){return xe(c,this)},Unit:function(c){if(!c._isDerived()&&c.units[0].unit.offset!==0)throw new TypeError("sign is ambiguous for units with offset");return this(c.value)}})}),s0="sqrt",o0=["config","typed","Complex"],u0=P(s0,o0,e=>{var{config:n,typed:i,Complex:t}=e;return i("sqrt",{number:r,Complex:function(c){return c.sqrt()},BigNumber:function(c){return!c.isNegative()||n.predictable?c.sqrt():r(c.toNumber())},"Array | Matrix":function(c){return xe(c,this)},Unit:function(c){return c.pow(.5)}});function r(a){return isNaN(a)?NaN:a>=0||n.predictable?Math.sqrt(a):new t(a,0).sqrt()}}),xo="square",c0=["typed"],l0=P(xo,c0,e=>{var{typed:n}=e;return n(xo,{number:_f,Complex:function(t){return t.mul(t)},BigNumber:function(t){return t.times(t)},Fraction:function(t){return t.mul(t)},"Array | Matrix":function(t){return xe(t,this)},Unit:function(t){return t.pow(2)}})}),wo="subtract",f0=["typed","matrix","equalScalar","addScalar","unaryMinus","DenseMatrix"],m0=P(wo,f0,e=>{var{typed:n,matrix:i,equalScalar:t,addScalar:r,unaryMinus:a,DenseMatrix:c}=e,l=qn({typed:n}),u=Cr({typed:n}),f=Ki({typed:n,equalScalar:t}),o=Xn({typed:n,DenseMatrix:c}),s=er({typed:n}),m=Ve({typed:n});return n(wo,{"number, number":function(p,g){return p-g},"Complex, Complex":function(p,g){return p.sub(g)},"BigNumber, BigNumber":function(p,g){return p.minus(g)},"Fraction, Fraction":function(p,g){return p.sub(g)},"Unit, Unit":function(p,g){if(p.value===null)throw new Error("Parameter x contains a unit with undefined value");if(g.value===null)throw new Error("Parameter y contains a unit with undefined value");if(!p.equalBase(g))throw new Error("Units do not match");var y=p.clone();return y.value=this(y.value,g.value),y.fixPrefix=!1,y},"SparseMatrix, SparseMatrix":function(p,g){return ui(p,g),f(p,g,this)},"SparseMatrix, DenseMatrix":function(p,g){return ui(p,g),u(g,p,this,!0)},"DenseMatrix, SparseMatrix":function(p,g){return ui(p,g),l(p,g,this,!1)},"DenseMatrix, DenseMatrix":function(p,g){return ui(p,g),s(p,g,this)},"Array, Array":function(p,g){return this(i(p),i(g)).valueOf()},"Array, Matrix":function(p,g){return this(i(p),g)},"Matrix, Array":function(p,g){return this(p,i(g))},"SparseMatrix, any":function(p,g){return o(p,a(g),r)},"DenseMatrix, any":function(p,g){return m(p,g,this)},"any, SparseMatrix":function(p,g){return o(g,p,this,!0)},"any, DenseMatrix":function(p,g){return m(g,p,this,!0)},"Array, any":function(p,g){return m(i(p),g,this,!1).valueOf()},"any, Array":function(p,g){return m(i(g),p,this,!0).valueOf()}})});function ui(e,n){var i=e.size(),t=n.size();if(i.length!==t.length)throw new ze(i.length,t.length)}var Ao="xgcd",h0=["typed","config","matrix","BigNumber"],p0=P(Ao,h0,e=>{var{typed:n,config:i,matrix:t,BigNumber:r}=e;return n(Ao,{"number, number":function(l,u){var f=Ff(l,u);return i.matrix==="Array"?f:t(f)},"BigNumber, BigNumber":a});function a(c,l){var u,f,o,s=new r(0),m=new r(1),h=s,p=m,g=m,y=s;if(!c.isInt()||!l.isInt())throw new Error("Parameters in function xgcd must be integer numbers");for(;!l.isZero();)f=c.div(l).floor(),o=c.mod(l),u=h,h=p.minus(f.times(h)),p=u,u=g,g=y.minus(f.times(g)),y=u,c=l,l=o;var w;return c.lt(s)?w=[c.neg(),p.neg(),y.neg()]:w=[c,c.isZero()?0:p,y],i.matrix==="Array"?w:t(w)}}),No="invmod",g0=["typed","config","BigNumber","xgcd","equal","smaller","mod","add","isInteger"],d0=P(No,g0,e=>{var{typed:n,config:i,BigNumber:t,xgcd:r,equal:a,smaller:c,mod:l,add:u,isInteger:f}=e;return n(No,{"number, number":o,"BigNumber, BigNumber":o});function o(s,m){if(!f(s)||!f(m))throw new Error("Parameters in function invmod must be integer numbers");if(s=l(s,m),a(m,0))throw new Error("Divisor must be non zero");var h=r(s,m);h=h.valueOf();var[p,g]=h;return a(p,t(1))?(g=l(g,m),c(g,t(0))&&(g=u(g,m)),g):NaN}}),v0="algorithm09",b0=["typed","equalScalar"],Am=P(v0,b0,e=>{var{typed:n,equalScalar:i}=e;return function(r,a,c){var l=r._values,u=r._index,f=r._ptr,o=r._size,s=r._datatype,m=a._values,h=a._index,p=a._ptr,g=a._size,y=a._datatype;if(o.length!==g.length)throw new ze(o.length,g.length);if(o[0]!==g[0]||o[1]!==g[1])throw new RangeError("Dimension mismatch. Matrix A ("+o+") must match Matrix B ("+g+")");var w=o[0],A=o[1],v,b=i,x=0,d=c;typeof s=="string"&&s===y&&(v=s,b=n.find(i,[v,v]),x=n.convert(0,v),d=n.find(c,[v,v]));var M=l&&m?[]:void 0,S=[],T=[],N=M?[]:void 0,D=[],k,I,_,O,B;for(I=0;I<A;I++){T[I]=S.length;var L=I+1;if(N)for(O=p[I],B=p[I+1],_=O;_<B;_++)k=h[_],D[k]=L,N[k]=m[_];for(O=f[I],B=f[I+1],_=O;_<B;_++)if(k=u[_],N){var V=D[k]===L?N[k]:x,C=d(l[_],V);b(C,x)||(S.push(k),M.push(C))}else S.push(k)}return T[A]=S.length,r.createSparseMatrix({values:M,index:S,ptr:T,size:[w,A],datatype:v})}}),So="dotMultiply",y0=["typed","matrix","equalScalar","multiplyScalar"],x0=P(So,y0,e=>{var{typed:n,matrix:i,equalScalar:t,multiplyScalar:r}=e,a=tn({typed:n,equalScalar:t}),c=Am({typed:n,equalScalar:t}),l=yr({typed:n,equalScalar:t}),u=er({typed:n}),f=Ve({typed:n});return n(So,{"any, any":r,"SparseMatrix, SparseMatrix":function(s,m){return c(s,m,r,!1)},"SparseMatrix, DenseMatrix":function(s,m){return a(m,s,r,!0)},"DenseMatrix, SparseMatrix":function(s,m){return a(s,m,r,!1)},"DenseMatrix, DenseMatrix":function(s,m){return u(s,m,r)},"Array, Array":function(s,m){return this(i(s),i(m)).valueOf()},"Array, Matrix":function(s,m){return this(i(s),m)},"Matrix, Array":function(s,m){return this(s,i(m))},"SparseMatrix, any":function(s,m){return l(s,m,r,!1)},"DenseMatrix, any":function(s,m){return f(s,m,r,!1)},"any, SparseMatrix":function(s,m){return l(m,s,r,!0)},"any, DenseMatrix":function(s,m){return f(m,s,r,!0)},"Array, any":function(s,m){return f(i(s),m,r,!1).valueOf()},"any, Array":function(s,m){return f(i(m),s,r,!0).valueOf()}})});function w0(e,n){if(e.isFinite()&&!e.isInteger()||n.isFinite()&&!n.isInteger())throw new Error("Integers expected in function bitAnd");var i=e.constructor;if(e.isNaN()||n.isNaN())return new i(NaN);if(e.isZero()||n.eq(-1)||e.eq(n))return e;if(n.isZero()||e.eq(-1))return n;if(!e.isFinite()||!n.isFinite()){if(!e.isFinite()&&!n.isFinite())return e.isNegative()===n.isNegative()?e:new i(0);if(!e.isFinite())return n.isNegative()?e:e.isNegative()?new i(0):n;if(!n.isFinite())return e.isNegative()?n:n.isNegative()?new i(0):e}return Xa(e,n,function(t,r){return t&r})}function Rt(e){if(e.isFinite()&&!e.isInteger())throw new Error("Integer expected in function bitNot");var n=e.constructor,i=n.precision;n.config({precision:1e9});var t=e.plus(new n(1));return t.s=-t.s||null,n.config({precision:i}),t}function A0(e,n){if(e.isFinite()&&!e.isInteger()||n.isFinite()&&!n.isInteger())throw new Error("Integers expected in function bitOr");var i=e.constructor;if(e.isNaN()||n.isNaN())return new i(NaN);var t=new i(-1);return e.isZero()||n.eq(t)||e.eq(n)?n:n.isZero()||e.eq(t)?e:!e.isFinite()||!n.isFinite()?!e.isFinite()&&!e.isNegative()&&n.isNegative()||e.isNegative()&&!n.isNegative()&&!n.isFinite()?t:e.isNegative()&&n.isNegative()?e.isFinite()?e:n:e.isFinite()?n:e:Xa(e,n,function(r,a){return r|a})}function Xa(e,n,i){var t=e.constructor,r,a,c=+(e.s<0),l=+(n.s<0);if(c){r=ci(Rt(e));for(var u=0;u<r.length;++u)r[u]^=1}else r=ci(e);if(l){a=ci(Rt(n));for(var f=0;f<a.length;++f)a[f]^=1}else a=ci(n);var o,s,m;r.length<=a.length?(o=r,s=a,m=c):(o=a,s=r,m=l);var h=o.length,p=s.length,g=i(c,l)^1,y=new t(g^1),w=new t(1),A=new t(2),v=t.precision;for(t.config({precision:1e9});h>0;)i(o[--h],s[--p])===g&&(y=y.plus(w)),w=w.times(A);for(;p>0;)i(m,s[--p])===g&&(y=y.plus(w)),w=w.times(A);return t.config({precision:v}),g===0&&(y.s=-y.s),y}function ci(e){for(var n=e.d,i=n[0]+"",t=1;t<n.length;++t){for(var r=n[t]+"",a=7-r.length;a--;)r="0"+r;i+=r}for(var c=i.length;i.charAt(c)==="0";)c--;var l=e.e,u=i.slice(0,c+1||1),f=u.length;if(l>0)if(++l>f)for(l-=f;l--;)u+="0";else l<f&&(u=u.slice(0,l)+"."+u.slice(l));for(var o=[0],s=0;s<u.length;){for(var m=o.length;m--;)o[m]*=10;o[0]+=parseInt(u.charAt(s++));for(var h=0;h<o.length;++h)o[h]>1&&((o[h+1]===null||o[h+1]===void 0)&&(o[h+1]=0),o[h+1]+=o[h]>>1,o[h]&=1)}return o.reverse()}function N0(e,n){if(e.isFinite()&&!e.isInteger()||n.isFinite()&&!n.isInteger())throw new Error("Integers expected in function bitXor");var i=e.constructor;if(e.isNaN()||n.isNaN())return new i(NaN);if(e.isZero())return n;if(n.isZero())return e;if(e.eq(n))return new i(0);var t=new i(-1);return e.eq(t)?Rt(n):n.eq(t)?Rt(e):!e.isFinite()||!n.isFinite()?!e.isFinite()&&!n.isFinite()?t:new i(e.isNegative()===n.isNegative()?1/0:-1/0):Xa(e,n,function(r,a){return r^a})}function S0(e,n){if(e.isFinite()&&!e.isInteger()||n.isFinite()&&!n.isInteger())throw new Error("Integers expected in function leftShift");var i=e.constructor;return e.isNaN()||n.isNaN()||n.isNegative()&&!n.isZero()?new i(NaN):e.isZero()||n.isZero()?e:!e.isFinite()&&!n.isFinite()?new i(NaN):n.lt(55)?e.times(Math.pow(2,n.toNumber())+""):e.times(new i(2).pow(n))}function M0(e,n){if(e.isFinite()&&!e.isInteger()||n.isFinite()&&!n.isInteger())throw new Error("Integers expected in function rightArithShift");var i=e.constructor;return e.isNaN()||n.isNaN()||n.isNegative()&&!n.isZero()?new i(NaN):e.isZero()||n.isZero()?e:n.isFinite()?n.lt(55)?e.div(Math.pow(2,n.toNumber())+"").floor():e.div(new i(2).pow(n)).floor():e.isNegative()?new i(-1):e.isFinite()?new i(0):new i(NaN)}var Mo="bitAnd",T0=["typed","matrix","equalScalar"],k0=P(Mo,T0,e=>{var{typed:n,matrix:i,equalScalar:t}=e,r=tn({typed:n,equalScalar:t}),a=qi({typed:n,equalScalar:t}),c=yr({typed:n,equalScalar:t}),l=er({typed:n}),u=Ve({typed:n});return n(Mo,{"number, number":qf,"BigNumber, BigNumber":w0,"SparseMatrix, SparseMatrix":function(o,s){return a(o,s,this,!1)},"SparseMatrix, DenseMatrix":function(o,s){return r(s,o,this,!0)},"DenseMatrix, SparseMatrix":function(o,s){return r(o,s,this,!1)},"DenseMatrix, DenseMatrix":function(o,s){return l(o,s,this)},"Array, Array":function(o,s){return this(i(o),i(s)).valueOf()},"Array, Matrix":function(o,s){return this(i(o),s)},"Matrix, Array":function(o,s){return this(o,i(s))},"SparseMatrix, any":function(o,s){return c(o,s,this,!1)},"DenseMatrix, any":function(o,s){return u(o,s,this,!1)},"any, SparseMatrix":function(o,s){return c(s,o,this,!0)},"any, DenseMatrix":function(o,s){return u(s,o,this,!0)},"Array, any":function(o,s){return u(i(o),s,this,!1).valueOf()},"any, Array":function(o,s){return u(i(s),o,this,!0).valueOf()}})}),To="bitNot",E0=["typed"],C0=P(To,E0,e=>{var{typed:n}=e;return n(To,{number:Kf,BigNumber:Rt,"Array | Matrix":function(t){return xe(t,this)}})}),ko="bitOr",B0=["typed","matrix","equalScalar","DenseMatrix"],L0=P(ko,B0,e=>{var{typed:n,matrix:i,equalScalar:t,DenseMatrix:r}=e,a=qn({typed:n}),c=Za({typed:n,equalScalar:t}),l=Xn({typed:n,DenseMatrix:r}),u=er({typed:n}),f=Ve({typed:n});return n(ko,{"number, number":Uf,"BigNumber, BigNumber":A0,"SparseMatrix, SparseMatrix":function(s,m){return c(s,m,this)},"SparseMatrix, DenseMatrix":function(s,m){return a(m,s,this,!0)},"DenseMatrix, SparseMatrix":function(s,m){return a(s,m,this,!1)},"DenseMatrix, DenseMatrix":function(s,m){return u(s,m,this)},"Array, Array":function(s,m){return this(i(s),i(m)).valueOf()},"Array, Matrix":function(s,m){return this(i(s),m)},"Matrix, Array":function(s,m){return this(s,i(m))},"SparseMatrix, any":function(s,m){return l(s,m,this,!1)},"DenseMatrix, any":function(s,m){return f(s,m,this,!1)},"any, SparseMatrix":function(s,m){return l(m,s,this,!0)},"any, DenseMatrix":function(s,m){return f(m,s,this,!0)},"Array, any":function(s,m){return f(i(s),m,this,!1).valueOf()},"any, Array":function(s,m){return f(i(m),s,this,!0).valueOf()}})}),D0="algorithm07",I0=["typed","DenseMatrix"],mn=P(D0,I0,e=>{var{typed:n,DenseMatrix:i}=e;return function(a,c,l){var u=a._size,f=a._datatype,o=c._size,s=c._datatype;if(u.length!==o.length)throw new ze(u.length,o.length);if(u[0]!==o[0]||u[1]!==o[1])throw new RangeError("Dimension mismatch. Matrix A ("+u+") must match Matrix B ("+o+")");var m=u[0],h=u[1],p,g=0,y=l;typeof f=="string"&&f===s&&(p=f,g=n.convert(0,p),y=n.find(l,[p,p]));var w,A,v=[];for(w=0;w<m;w++)v[w]=[];var b=[],x=[],d=[],M=[];for(A=0;A<h;A++){var S=A+1;for(t(a,A,d,b,S),t(c,A,M,x,S),w=0;w<m;w++){var T=d[w]===S?b[w]:g,N=M[w]===S?x[w]:g;v[w][A]=y(T,N)}}return new i({data:v,size:[m,h],datatype:p})};function t(r,a,c,l,u){for(var f=r._values,o=r._index,s=r._ptr,m=s[a],h=s[a+1];m<h;m++){var p=o[m];c[p]=u,l[p]=f[m]}}}),Eo="bitXor",O0=["typed","matrix","DenseMatrix"],z0=P(Eo,O0,e=>{var{typed:n,matrix:i,DenseMatrix:t}=e,r=Cr({typed:n}),a=mn({typed:n,DenseMatrix:t}),c=dr({typed:n,DenseMatrix:t}),l=er({typed:n}),u=Ve({typed:n});return n(Eo,{"number, number":Vf,"BigNumber, BigNumber":N0,"SparseMatrix, SparseMatrix":function(o,s){return a(o,s,this)},"SparseMatrix, DenseMatrix":function(o,s){return r(s,o,this,!0)},"DenseMatrix, SparseMatrix":function(o,s){return r(o,s,this,!1)},"DenseMatrix, DenseMatrix":function(o,s){return l(o,s,this)},"Array, Array":function(o,s){return this(i(o),i(s)).valueOf()},"Array, Matrix":function(o,s){return this(i(o),s)},"Matrix, Array":function(o,s){return this(o,i(s))},"SparseMatrix, any":function(o,s){return c(o,s,this,!1)},"DenseMatrix, any":function(o,s){return u(o,s,this,!1)},"any, SparseMatrix":function(o,s){return c(s,o,this,!0)},"any, DenseMatrix":function(o,s){return u(s,o,this,!0)},"Array, any":function(o,s){return u(i(o),s,this,!1).valueOf()},"any, Array":function(o,s){return u(i(s),o,this,!0).valueOf()}})}),Co="arg",P0=["typed"],$0=P(Co,P0,e=>{var{typed:n}=e;return n(Co,{number:function(t){return Math.atan2(0,t)},BigNumber:function(t){return t.constructor.atan2(0,t)},Complex:function(t){return t.arg()},"Array | Matrix":function(t){return xe(t,this)}})}),Bo="conj",_0=["typed"],F0=P(Bo,_0,e=>{var{typed:n}=e;return n(Bo,{number:function(t){return t},BigNumber:function(t){return t},Complex:function(t){return t.conjugate()},"Array | Matrix":function(t){return xe(t,this)}})}),Lo="im",R0=["typed"],q0=P(Lo,R0,e=>{var{typed:n}=e;return n(Lo,{number:function(t){return 0},BigNumber:function(t){return t.mul(0)},Fraction:function(t){return t.mul(0)},Complex:function(t){return t.im},"Array | Matrix":function(t){return xe(t,this)}})}),Do="re",K0=["typed"],U0=P(Do,K0,e=>{var{typed:n}=e;return n(Do,{number:function(t){return t},BigNumber:function(t){return t},Fraction:function(t){return t},Complex:function(t){return t.re},"Array | Matrix":function(t){return xe(t,this)}})}),Io="not",V0=["typed"],W0=P(Io,V0,e=>{var{typed:n}=e;return n(Io,{number:Xf,Complex:function(t){return t.re===0&&t.im===0},BigNumber:function(t){return t.isZero()||t.isNaN()},Unit:function(t){return t.value!==null?this(t.value):!0},"Array | Matrix":function(t){return xe(t,this)}})}),Oo="or",G0=["typed","matrix","equalScalar","DenseMatrix"],H0=P(Oo,G0,e=>{var{typed:n,matrix:i,equalScalar:t,DenseMatrix:r}=e,a=Cr({typed:n}),c=Ki({typed:n,equalScalar:t}),l=dr({typed:n,DenseMatrix:r}),u=er({typed:n}),f=Ve({typed:n});return n(Oo,{"number, number":Yf,"Complex, Complex":function(s,m){return s.re!==0||s.im!==0||m.re!==0||m.im!==0},"BigNumber, BigNumber":function(s,m){return!s.isZero()&&!s.isNaN()||!m.isZero()&&!m.isNaN()},"Unit, Unit":function(s,m){return this(s.value||0,m.value||0)},"SparseMatrix, SparseMatrix":function(s,m){return c(s,m,this)},"SparseMatrix, DenseMatrix":function(s,m){return a(m,s,this,!0)},"DenseMatrix, SparseMatrix":function(s,m){return a(s,m,this,!1)},"DenseMatrix, DenseMatrix":function(s,m){return u(s,m,this)},"Array, Array":function(s,m){return this(i(s),i(m)).valueOf()},"Array, Matrix":function(s,m){return this(i(s),m)},"Matrix, Array":function(s,m){return this(s,i(m))},"SparseMatrix, any":function(s,m){return l(s,m,this,!1)},"DenseMatrix, any":function(s,m){return f(s,m,this,!1)},"any, SparseMatrix":function(s,m){return l(m,s,this,!0)},"any, DenseMatrix":function(s,m){return f(m,s,this,!0)},"Array, any":function(s,m){return f(i(s),m,this,!1).valueOf()},"any, Array":function(s,m){return f(i(m),s,this,!0).valueOf()}})}),zo="xor",Z0=["typed","matrix","DenseMatrix"],X0=P(zo,Z0,e=>{var{typed:n,matrix:i,DenseMatrix:t}=e,r=Cr({typed:n}),a=mn({typed:n,DenseMatrix:t}),c=dr({typed:n,DenseMatrix:t}),l=er({typed:n}),u=Ve({typed:n});return n(zo,{"number, number":Jf,"Complex, Complex":function(o,s){return(o.re!==0||o.im!==0)!=(s.re!==0||s.im!==0)},"BigNumber, BigNumber":function(o,s){return(!o.isZero()&&!o.isNaN())!=(!s.isZero()&&!s.isNaN())},"Unit, Unit":function(o,s){return this(o.value||0,s.value||0)},"SparseMatrix, SparseMatrix":function(o,s){return a(o,s,this)},"SparseMatrix, DenseMatrix":function(o,s){return r(s,o,this,!0)},"DenseMatrix, SparseMatrix":function(o,s){return r(o,s,this,!1)},"DenseMatrix, DenseMatrix":function(o,s){return l(o,s,this)},"Array, Array":function(o,s){return this(i(o),i(s)).valueOf()},"Array, Matrix":function(o,s){return this(i(o),s)},"Matrix, Array":function(o,s){return this(o,i(s))},"SparseMatrix, any":function(o,s){return c(o,s,this,!1)},"DenseMatrix, any":function(o,s){return u(o,s,this,!1)},"any, SparseMatrix":function(o,s){return c(s,o,this,!0)},"any, DenseMatrix":function(o,s){return u(s,o,this,!0)},"Array, any":function(o,s){return u(i(o),s,this,!1).valueOf()},"any, Array":function(o,s){return u(i(s),o,this,!0).valueOf()}})}),Po="concat",Y0=["typed","matrix","isInteger"],Nm=P(Po,Y0,e=>{var{typed:n,matrix:i,isInteger:t}=e;return n(Po,{"...Array | Matrix | number | BigNumber":function(a){var c,l=a.length,u=-1,f,o=!1,s=[];for(c=0;c<l;c++){var m=a[c];if(Ce(m)&&(o=!0),Fe(m)||$e(m)){if(c!==l-1)throw new Error("Dimension must be specified as last argument");if(f=u,u=m.valueOf(),!t(u))throw new TypeError("Integer number expected for dimension");if(u<0||c>0&&u>f)throw new rn(u,f+1)}else{var h=ke(m).valueOf(),p=Re(h);if(s[c]=h,f=u,u=p.length-1,c>0&&u!==f)throw new ze(f+1,u+1)}}if(s.length===0)throw new SyntaxError("At least one matrix expected");for(var g=s.shift();s.length;)g=Sm(g,s.shift(),u,0);return o?i(g):g},"...string":function(a){return a.join("")}})});function Sm(e,n,i,t){if(t<i){if(e.length!==n.length)throw new ze(e.length,n.length);for(var r=[],a=0;a<e.length;a++)r[a]=Sm(e[a],n[a],i,t+1);return r}else return e.concat(n)}var $o="column",J0=["typed","Index","matrix","range"],Mm=P($o,J0,e=>{var{typed:n,Index:i,matrix:t,range:r}=e;return n($o,{"Matrix, number":a,"Array, number":function(l,u){return a(t(ke(l)),u).valueOf()}});function a(c,l){if(c.size().length!==2)throw new Error("Only two dimensional matrix is supported");Je(l,c.size()[1]);var u=r(0,c.size()[0]),f=new i(u,l);return c.subset(f)}}),_o="count",Q0=["typed","size","prod"],j0=P(_o,Q0,e=>{var{typed:n,size:i,prod:t}=e;return n(_o,{string:function(a){return a.length},"Matrix | Array":function(a){return t(i(a))}})}),Fo="cross",eb=["typed","matrix","subtract","multiply"],rb=P(Fo,eb,e=>{var{typed:n,matrix:i,subtract:t,multiply:r}=e;return n(Fo,{"Matrix, Matrix":function(l,u){return i(a(l.toArray(),u.toArray()))},"Matrix, Array":function(l,u){return i(a(l.toArray(),u))},"Array, Matrix":function(l,u){return i(a(l,u.toArray()))},"Array, Array":a});function a(c,l){var u=Math.max(Re(c).length,Re(l).length);c=vi(c),l=vi(l);var f=Re(c),o=Re(l);if(f.length!==1||o.length!==1||f[0]!==3||o[0]!==3)throw new RangeError("Vectors with length 3 expected (Size A = ["+f.join(", ")+"], B = ["+o.join(", ")+"])");var s=[t(r(c[1],l[2]),r(c[2],l[1])),t(r(c[2],l[0]),r(c[0],l[2])),t(r(c[0],l[1]),r(c[1],l[0]))];return u>1?[s]:s}}),Ro="diag",nb=["typed","matrix","DenseMatrix","SparseMatrix"],tb=P(Ro,nb,e=>{var{typed:n,matrix:i,DenseMatrix:t,SparseMatrix:r}=e;return n(Ro,{Array:function(f){return a(f,0,Re(f),null)},"Array, number":function(f,o){return a(f,o,Re(f),null)},"Array, BigNumber":function(f,o){return a(f,o.toNumber(),Re(f),null)},"Array, string":function(f,o){return a(f,0,Re(f),o)},"Array, number, string":function(f,o,s){return a(f,o,Re(f),s)},"Array, BigNumber, string":function(f,o,s){return a(f,o.toNumber(),Re(f),s)},Matrix:function(f){return a(f,0,f.size(),f.storage())},"Matrix, number":function(f,o){return a(f,o,f.size(),f.storage())},"Matrix, BigNumber":function(f,o){return a(f,o.toNumber(),f.size(),f.storage())},"Matrix, string":function(f,o){return a(f,0,f.size(),o)},"Matrix, number, string":function(f,o,s){return a(f,o,f.size(),s)},"Matrix, BigNumber, string":function(f,o,s){return a(f,o.toNumber(),f.size(),s)}});function a(u,f,o,s){if(!Se(f))throw new TypeError("Second parameter in function diag must be an integer");var m=f>0?f:0,h=f<0?-f:0;switch(o.length){case 1:return c(u,f,s,o[0],h,m);case 2:return l(u,f,s,o,h,m)}throw new RangeError("Matrix for function diag must be 2 dimensional")}function c(u,f,o,s,m,h){var p=[s+m,s+h];if(o&&o!=="sparse"&&o!=="dense")throw new TypeError("Unknown matrix type ".concat(o,'"'));var g=o==="sparse"?r.diagonal(p,u,f):t.diagonal(p,u,f);return o!==null?g:g.valueOf()}function l(u,f,o,s,m,h){if(Ce(u)){var p=u.diagonal(f);return o!==null?o!==p.storage()?i(p,o):p:p.valueOf()}for(var g=Math.min(s[0]-m,s[1]-h),y=[],w=0;w<g;w++)y[w]=u[w+m][w+h];return o!==null?i(y):y}});function ib(e){var n=0,i=1,t=Object.create(null),r=Object.create(null),a=0,c=function(u){var f=r[u];if(!!f&&(delete t[f],delete r[u],--n,i===f)){if(!n){a=0,i=1;return}for(;!hasOwnProperty.call(t,++i););}};return e=Math.abs(e),{hit:function(u){var f=r[u],o=++a;if(t[o]=u,r[u]=o,!f)return++n,n<=e?void 0:(u=t[i],c(u),u);if(delete t[f],i===f)for(;!hasOwnProperty.call(t,++i););},delete:c,clear:function(){n=a=0,i=1,t=Object.create(null),r=Object.create(null)}}}function Gt(e){var{hasher:n,limit:i}=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return i=i==null?Number.POSITIVE_INFINITY:i,n=n==null?JSON.stringify:n,function t(){typeof t.cache!="object"&&(t.cache={values:new Map,lru:ib(i||Number.POSITIVE_INFINITY)});for(var r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];var c=n(r);if(t.cache.values.has(c))return t.cache.lru.hit(c),t.cache.values.get(c);var l=e.apply(e,r);return t.cache.values.set(c,l),t.cache.values.delete(t.cache.lru.hit(c)),l}}function St(e){return Object.keys(e.signatures||{}).reduce(function(n,i){var t=(i.match(/,/g)||[]).length+1;return Math.max(n,t)},-1)}var ab="filter",sb=["typed"],ob=P(ab,sb,e=>{var{typed:n}=e;return n("filter",{"Array, function":qo,"Matrix, function":function(t,r){return t.create(qo(t.toArray(),r))},"Array, RegExp":bi,"Matrix, RegExp":function(t,r){return t.create(bi(t.toArray(),r))}})});function qo(e,n){var i=St(n);return uf(e,function(t,r,a){return i===1?n(t):i===2?n(t,[r]):n(t,[r],a)})}var Ko="flatten",ub=["typed","matrix"],cb=P(Ko,ub,e=>{var{typed:n,matrix:i}=e;return n(Ko,{Array:function(r){return qe(ke(r))},Matrix:function(r){var a=qe(ke(r.toArray()));return i(a)}})}),Uo="forEach",lb=["typed"],fb=P(Uo,lb,e=>{var{typed:n}=e;return n(Uo,{"Array, function":mb,"Matrix, function":function(t,r){return t.forEach(r)}})});function mb(e,n){var i=St(n),t=function r(a,c){Array.isArray(a)?Oi(a,function(l,u){r(l,c.concat(u))}):i===1?n(a):i===2?n(a,c):n(a,c,e)};t(e,[])}var Vo="getMatrixDataType",hb=["typed"],pb=P(Vo,hb,e=>{var{typed:n}=e;return n(Vo,{Array:function(t){return _t(t,je)},Matrix:function(t){return t.getDataType()}})}),Wo="identity",gb=["typed","config","matrix","BigNumber","DenseMatrix","SparseMatrix"],db=P(Wo,gb,e=>{var{typed:n,config:i,matrix:t,BigNumber:r,DenseMatrix:a,SparseMatrix:c}=e;return n(Wo,{"":function(){return i.matrix==="Matrix"?t([]):[]},string:function(o){return t(o)},"number | BigNumber":function(o){return u(o,o,i.matrix==="Matrix"?"dense":void 0)},"number | BigNumber, string":function(o,s){return u(o,o,s)},"number | BigNumber, number | BigNumber":function(o,s){return u(o,s,i.matrix==="Matrix"?"dense":void 0)},"number | BigNumber, number | BigNumber, string":function(o,s,m){return u(o,s,m)},Array:function(o){return l(o)},"Array, string":function(o,s){return l(o,s)},Matrix:function(o){return l(o.valueOf(),o.storage())},"Matrix, string":function(o,s){return l(o.valueOf(),s)}});function l(f,o){switch(f.length){case 0:return o?t(o):[];case 1:return u(f[0],f[0],o);case 2:return u(f[0],f[1],o);default:throw new Error("Vector containing two values expected")}}function u(f,o,s){var m=$e(f)||$e(o)?r:null;if($e(f)&&(f=f.toNumber()),$e(o)&&(o=o.toNumber()),!Se(f)||f<1)throw new Error("Parameters in function identity must be positive integers");if(!Se(o)||o<1)throw new Error("Parameters in function identity must be positive integers");var h=m?new r(1):1,p=m?new m(0):0,g=[f,o];if(s){if(s==="sparse")return c.diagonal(g,h,0,p);if(s==="dense")return a.diagonal(g,h,0,p);throw new TypeError('Unknown matrix type "'.concat(s,'"'))}for(var y=pt([],g,p),w=f<o?f:o,A=0;A<w;A++)y[A][A]=h;return y}}),Go="kron",vb=["typed","matrix","multiplyScalar"],bb=P(Go,vb,e=>{var{typed:n,matrix:i,multiplyScalar:t}=e;return n(Go,{"Matrix, Matrix":function(c,l){return i(r(c.toArray(),l.toArray()))},"Matrix, Array":function(c,l){return i(r(c.toArray(),l))},"Array, Matrix":function(c,l){return i(r(c,l.toArray()))},"Array, Array":r});function r(a,c){if(Re(a).length===1&&(a=[a]),Re(c).length===1&&(c=[c]),Re(a).length>2||Re(c).length>2)throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = "+JSON.stringify(a.length)+", y = "+JSON.stringify(c.length)+")");var l=[],u=[];return a.map(function(f){return c.map(function(o){return u=[],l.push(u),f.map(function(s){return o.map(function(m){return u.push(t(s,m))})})})})&&l}}),Ho="map",yb=["typed"],xb=P(Ho,yb,e=>{var{typed:n}=e;return n(Ho,{"Array, function":wb,"Matrix, function":function(t,r){return t.map(r)}})});function wb(e,n){var i=St(n),t=function r(a,c){if(Array.isArray(a))return a.map(function(f,o){return r(f,c.concat(o))});try{return i===1?n(a):i===2?n(a,c):n(a,c,e)}catch(f){if(f instanceof TypeError&&"data"in f&&f.data.category==="wrongType"){var l="map attempted to call '".concat(f.data.fn,"(").concat(a),u=JSON.stringify(c);throw i===2?l+=","+u:i!==1&&(l+=",".concat(u,",").concat(e)),l+=")' but argument ".concat(f.data.index+1," of type "),l+="".concat(f.data.actual," does not match expected type "),l+=f.data.expected.join(" or "),new TypeError(l)}throw f}};return t(e,[])}var Zo="diff",Ab=["typed","matrix","subtract","number"],Tm=P(Zo,Ab,e=>{var{typed:n,matrix:i,subtract:t,number:r}=e;return n(Zo,{"Array | Matrix":function(o){return Ce(o)?i(c(o.toArray())):c(o)},"Array | Matrix, number":function(o,s){if(!Se(s))throw new RangeError("Dimension must be a whole number");return Ce(o)?i(a(o.toArray(),s)):a(o,s)},"Array | Matrix, BigNumber":function(o,s){return this(o,r(s))}});function a(f,o){if(Ce(f)&&(f=f.toArray()),!Array.isArray(f))throw RangeError("Array/Matrix does not have that many dimensions");if(o>0){var s=[];return f.forEach(m=>{s.push(a(m,o-1))}),s}else{if(o===0)return c(f);throw RangeError("Cannot have negative dimension")}}function c(f){var o=[],s=f.length;if(s<2)return f;for(var m=1;m<s;m++)o.push(l(f[m-1],f[m]));return o}function l(f,o){Ce(f)&&(f=f.toArray()),Ce(o)&&(o=o.toArray());var s=Array.isArray(f),m=Array.isArray(o);if(s&&m)return u(f,o);if(!s&&!m)return t(o,f);throw TypeError("Cannot calculate difference between 1 array and 1 non-array")}function u(f,o){if(f.length!==o.length)throw RangeError("Not all sub-arrays have the same length");for(var s=[],m=f.length,h=0;h<m;h++)s.push(l(f[h],o[h]));return s}}),Nb="ones",Sb=["typed","config","matrix","BigNumber"],Mb=P(Nb,Sb,e=>{var{typed:n,config:i,matrix:t,BigNumber:r}=e;return n("ones",{"":function(){return i.matrix==="Array"?a([]):a([],"default")},"...number | BigNumber | string":function(f){var o=f[f.length-1];if(typeof o=="string"){var s=f.pop();return a(f,s)}else return i.matrix==="Array"?a(f):a(f,"default")},Array:a,Matrix:function(f){var o=f.storage();return a(f.valueOf(),o)},"Array | Matrix, string":function(f,o){return a(f.valueOf(),o)}});function a(u,f){var o=c(u),s=o?new r(1):1;if(l(u),f){var m=t(f);return u.length>0?m.resize(u,s):m}else{var h=[];return u.length>0?pt(h,u,s):h}}function c(u){var f=!1;return u.forEach(function(o,s,m){$e(o)&&(f=!0,m[s]=o.toNumber())}),f}function l(u){u.forEach(function(f){if(typeof f!="number"||!Se(f)||f<0)throw new Error("Parameters in function ones must be positive integers")})}});function Ya(){throw new Error('No "bignumber" implementation available')}function km(){throw new Error('No "fraction" implementation available')}function Em(){throw new Error('No "matrix" implementation available')}var Xo="range",Tb=["typed","config","?matrix","?bignumber","smaller","smallerEq","larger","largerEq"],Cm=P(Xo,Tb,e=>{var{typed:n,config:i,matrix:t,bignumber:r,smaller:a,smallerEq:c,larger:l,largerEq:u}=e;return n(Xo,{string:o,"string, boolean":o,"number, number":function(w,A){return f(s(w,A,1))},"number, number, number":function(w,A,v){return f(s(w,A,v))},"number, number, boolean":function(w,A,v){return f(v?m(w,A,1):s(w,A,1))},"number, number, number, boolean":function(w,A,v,b){return f(b?m(w,A,v):s(w,A,v))},"BigNumber, BigNumber":function(w,A){var v=w.constructor;return f(h(w,A,new v(1)))},"BigNumber, BigNumber, BigNumber":function(w,A,v){return f(h(w,A,v))},"BigNumber, BigNumber, boolean":function(w,A,v){var b=w.constructor;return f(v?p(w,A,new b(1)):h(w,A,new b(1)))},"BigNumber, BigNumber, BigNumber, boolean":function(w,A,v,b){return f(b?p(w,A,v):h(w,A,v))}});function f(y){return i.matrix==="Matrix"?t?t(y):Em():y}function o(y,w){var A=g(y);if(!A)throw new SyntaxError('String "'+y+'" is no valid range');var v;return i.number==="BigNumber"?(r===void 0&&Ya(),v=w?p:h,f(v(r(A.start),r(A.end),r(A.step)))):(v=w?m:s,f(v(A.start,A.end,A.step)))}function s(y,w,A){var v=[],b=y;if(A>0)for(;a(b,w);)v.push(b),b+=A;else if(A<0)for(;l(b,w);)v.push(b),b+=A;return v}function m(y,w,A){var v=[],b=y;if(A>0)for(;c(b,w);)v.push(b),b+=A;else if(A<0)for(;u(b,w);)v.push(b),b+=A;return v}function h(y,w,A){var v=r(0),b=[],x=y;if(A.gt(v))for(;a(x,w);)b.push(x),x=x.plus(A);else if(A.lt(v))for(;l(x,w);)b.push(x),x=x.plus(A);return b}function p(y,w,A){var v=r(0),b=[],x=y;if(A.gt(v))for(;c(x,w);)b.push(x),x=x.plus(A);else if(A.lt(v))for(;u(x,w);)b.push(x),x=x.plus(A);return b}function g(y){var w=y.split(":"),A=w.map(function(b){return Number(b)}),v=A.some(function(b){return isNaN(b)});if(v)return null;switch(A.length){case 2:return{start:A[0],end:A[1],step:1};case 3:return{start:A[0],end:A[2],step:A[1]};default:return null}}}),Yo="reshape",kb=["typed","isInteger","matrix"],Eb=P(Yo,kb,e=>{var{typed:n,isInteger:i}=e;return n(Yo,{"Matrix, Array":function(r,a){return r.reshape(a)},"Array, Array":function(r,a){return a.forEach(function(c){if(!i(c))throw new TypeError("Invalid size for dimension: "+c)}),nf(r,a)}})});function Mt(e,n,i,t){if(!(this instanceof Mt))throw new SyntaxError("Constructor must be called with the new operator");this.fn=e,this.count=n,this.min=i,this.max=t,this.message="Wrong number of arguments in function "+e+" ("+n+" provided, "+i+(t!=null?"-"+t:"")+" expected)",this.stack=new Error().stack}Mt.prototype=new Error;Mt.prototype.constructor=Error;Mt.prototype.name="ArgumentsError";Mt.prototype.isArgumentsError=!0;var Cb="resize",Bb=["config","matrix"],Lb=P(Cb,Bb,e=>{var{config:n,matrix:i}=e;return function(a,c,l){if(arguments.length!==2&&arguments.length!==3)throw new Mt("resize",arguments.length,2,3);if(Ce(c)&&(c=c.valueOf()),$e(c[0])&&(c=c.map(function(o){return $e(o)?o.toNumber():o})),Ce(a))return a.resize(c,l,!0);if(typeof a=="string")return t(a,c,l);var u=Array.isArray(a)?!1:n.matrix!=="Array";if(c.length===0){for(;Array.isArray(a);)a=a[0];return ke(a)}else{Array.isArray(a)||(a=[a]),a=ke(a);var f=pt(a,c,l);return u?i(f):f}};function t(r,a,c){if(c!==void 0){if(typeof c!="string"||c.length!==1)throw new TypeError("Single character expected as defaultValue")}else c=" ";if(a.length!==1)throw new ze(a.length,1);var l=a[0];if(typeof l!="number"||!Se(l))throw new TypeError("Invalid size, must contain positive integers (size: "+Oe(a)+")");if(r.length>l)return r.substring(0,l);if(r.length<l){for(var u=r,f=0,o=l-r.length;f<o;f++)u+=c;return u}else return r}}),Jo="rotate",Db=["typed","multiply","rotationMatrix"],Ib=P(Jo,Db,e=>{var{typed:n,multiply:i,rotationMatrix:t}=e;return n(Jo,{"Array , number | BigNumber | Complex | Unit":function(c,l){r(c,2);var u=i(t(l),c);return u.toArray()},"Matrix , number | BigNumber | Complex | Unit":function(c,l){return r(c,2),i(t(l),c)},"Array, number | BigNumber | Complex | Unit, Array | Matrix":function(c,l,u){r(c,3);var f=i(t(l,u),c);return f},"Matrix, number | BigNumber | Complex | Unit, Array | Matrix":function(c,l,u){return r(c,3),i(t(l,u),c)}});function r(a,c){var l=Array.isArray(a)?Re(a):a.size();if(l.length>2)throw new RangeError("Vector must be of dimensions 1x".concat(c));if(l.length===2&&l[1]!==1)throw new RangeError("Vector must be of dimensions 1x".concat(c));if(l[0]!==c)throw new RangeError("Vector must be of dimensions 1x".concat(c))}}),Qo="rotationMatrix",Ob=["typed","config","multiplyScalar","addScalar","unaryMinus","norm","matrix","BigNumber","DenseMatrix","SparseMatrix","cos","sin"],zb=P(Qo,Ob,e=>{var{typed:n,config:i,multiplyScalar:t,addScalar:r,unaryMinus:a,norm:c,BigNumber:l,matrix:u,DenseMatrix:f,SparseMatrix:o,cos:s,sin:m}=e;return n(Qo,{"":function(){return i.matrix==="Matrix"?u([]):[]},string:function(v){return u(v)},"number | BigNumber | Complex | Unit":function(v){return h(v,i.matrix==="Matrix"?"dense":void 0)},"number | BigNumber | Complex | Unit, string":function(v,b){return h(v,b)},"number | BigNumber | Complex | Unit, Array":function(v,b){var x=u(b);return p(x),w(v,x,void 0)},"number | BigNumber | Complex | Unit, Matrix":function(v,b){p(b);var x=b.storage()||(i.matrix==="Matrix"?"dense":void 0);return w(v,b,x)},"number | BigNumber | Complex | Unit, Array, string":function(v,b,x){var d=u(b);return p(d),w(v,d,x)},"number | BigNumber | Complex | Unit, Matrix, string":function(v,b,x){return p(b),w(v,b,x)}});function h(A,v){var b=$e(A),x=b?new l(-1):-1,d=s(A),M=m(A),S=[[d,t(x,M)],[M,d]];return y(S,v)}function p(A){var v=A.size();if(v.length<1||v[0]!==3)throw new RangeError("Vector must be of dimensions 1x3")}function g(A){return A.reduce((v,b)=>t(v,b))}function y(A,v){if(v){if(v==="sparse")return new o(A);if(v==="dense")return new f(A);throw new TypeError('Unknown matrix type "'.concat(v,'"'))}return A}function w(A,v,b){var x=c(v);if(x===0)throw new RangeError("Rotation around zero vector");var d=$e(A)?l:null,M=d?new d(1):1,S=d?new d(-1):-1,T=d?new d(v.get([0])/x):v.get([0])/x,N=d?new d(v.get([1])/x):v.get([1])/x,D=d?new d(v.get([2])/x):v.get([2])/x,k=s(A),I=r(M,a(k)),_=m(A),O=r(k,g([T,T,I])),B=r(g([T,N,I]),g([S,D,_])),L=r(g([T,D,I]),g([N,_])),V=r(g([T,N,I]),g([D,_])),C=r(k,g([N,N,I])),U=r(g([N,D,I]),g([S,T,_])),X=r(g([T,D,I]),g([S,N,_])),j=r(g([N,D,I]),g([T,_])),W=r(k,g([D,D,I])),Q=[[O,B,L],[V,C,U],[X,j,W]];return y(Q,b)}}),jo="row",Pb=["typed","Index","matrix","range"],Bm=P(jo,Pb,e=>{var{typed:n,Index:i,matrix:t,range:r}=e;return n(jo,{"Matrix, number":a,"Array, number":function(l,u){return a(t(ke(l)),u).valueOf()}});function a(c,l){if(c.size().length!==2)throw new Error("Only two dimensional matrix is supported");Je(l,c.size()[0]);var u=r(0,c.size()[1]),f=new i(l,u);return c.subset(f)}}),eu="size",$b=["typed","config","?matrix"],_b=P(eu,$b,e=>{var{typed:n,config:i,matrix:t}=e;return n(eu,{Matrix:function(a){return a.create(a.size())},Array:Re,string:function(a){return i.matrix==="Array"?[a.length]:t([a.length])},"number | Complex | BigNumber | Unit | boolean | null":function(a){return i.matrix==="Array"?[]:t?t([]):Em()}})}),ru="squeeze",Fb=["typed","matrix"],Rb=P(ru,Fb,e=>{var{typed:n,matrix:i}=e;return n(ru,{Array:function(r){return vi(ke(r))},Matrix:function(r){var a=vi(r.toArray());return Array.isArray(a)?i(a):a},any:function(r){return ke(r)}})}),nu="subset",qb=["typed","matrix"],Lm=P(nu,qb,e=>{var{typed:n,matrix:i}=e;return n(nu,{"Array, Index":function(r,a){var c=i(r),l=c.subset(a);return a.isScalar()?l:l.valueOf()},"Matrix, Index":function(r,a){return r.subset(a)},"Object, Index":Ub,"string, Index":Kb,"Array, Index, any":function(r,a,c){return i(ke(r)).subset(a,c,void 0).valueOf()},"Array, Index, any, any":function(r,a,c,l){return i(ke(r)).subset(a,c,l).valueOf()},"Matrix, Index, any":function(r,a,c){return r.clone().subset(a,c)},"Matrix, Index, any, any":function(r,a,c,l){return r.clone().subset(a,c,l)},"string, Index, string":tu,"string, Index, string, string":tu,"Object, Index, any":Vb})});function Kb(e,n){if(!Ut(n))throw new TypeError("Index expected");if(n.size().length!==1)throw new ze(n.size().length,1);var i=e.length;Je(n.min()[0],i),Je(n.max()[0],i);var t=n.dimension(0),r="";return t.forEach(function(a){r+=e.charAt(a)}),r}function tu(e,n,i,t){if(!n||n.isIndex!==!0)throw new TypeError("Index expected");if(n.size().length!==1)throw new ze(n.size().length,1);if(t!==void 0){if(typeof t!="string"||t.length!==1)throw new TypeError("Single character expected as defaultValue")}else t=" ";var r=n.dimension(0),a=r.size()[0];if(a!==i.length)throw new ze(r.size()[0],i.length);var c=e.length;Je(n.min()[0]),Je(n.max()[0]);for(var l=[],u=0;u<c;u++)l[u]=e.charAt(u);if(r.forEach(function(s,m){l[s]=i.charAt(m[0])}),l.length>c)for(var f=c-1,o=l.length;f<o;f++)l[f]||(l[f]=t);return l.join("")}function Ub(e,n){if(n.size().length!==1)throw new ze(n.size(),1);var i=n.dimension(0);if(typeof i!="string")throw new TypeError("String expected as index to retrieve an object property");return Vr(e,i)}function Vb(e,n,i){if(n.size().length!==1)throw new ze(n.size(),1);var t=n.dimension(0);if(typeof t!="string")throw new TypeError("String expected as index to retrieve an object property");var r=ke(e);return dt(r,t,i),r}var Wb="transpose",Gb=["typed","matrix"],Hb=P(Wb,Gb,e=>{var{typed:n,matrix:i}=e;return n("transpose",{Array:function(c){return this(i(c)).valueOf()},Matrix:function(c){var l=c.size(),u;switch(l.length){case 1:u=c.clone();break;case 2:{var f=l[0],o=l[1];if(o===0)throw new RangeError("Cannot transpose a 2D matrix with no columns (size: "+Oe(l)+")");switch(c.storage()){case"dense":u=t(c,f,o);break;case"sparse":u=r(c,f,o);break}}break;default:throw new RangeError("Matrix must be a vector or two dimensional (size: "+Oe(this._size)+")")}return u},any:function(c){return ke(c)}});function t(a,c,l){for(var u=a._data,f=[],o,s=0;s<l;s++){o=f[s]=[];for(var m=0;m<c;m++)o[m]=ke(u[m][s])}return a.createDenseMatrix({data:f,size:[l,c],datatype:a._datatype})}function r(a,c,l){for(var u=a._values,f=a._index,o=a._ptr,s=u?[]:void 0,m=[],h=[],p=[],g=0;g<c;g++)p[g]=0;var y,w,A;for(y=0,w=f.length;y<w;y++)p[f[y]]++;for(var v=0,b=0;b<c;b++)h.push(v),v+=p[b],p[b]=h[b];for(h.push(v),A=0;A<l;A++)for(var x=o[A],d=o[A+1],M=x;M<d;M++){var S=p[f[M]]++;m[S]=A,u&&(s[S]=ke(u[M]))}return a.createSparseMatrix({values:s,index:m,ptr:h,size:[l,c],datatype:a._datatype})}}),iu="ctranspose",Zb=["typed","transpose","conj"],Xb=P(iu,Zb,e=>{var{typed:n,transpose:i,conj:t}=e;return n(iu,{any:function(a){return t(i(a))}})}),au="zeros",Yb=["typed","config","matrix","BigNumber"],Jb=P(au,Yb,e=>{var{typed:n,config:i,matrix:t,BigNumber:r}=e;return n(au,{"":function(){return i.matrix==="Array"?a([]):a([],"default")},"...number | BigNumber | string":function(f){var o=f[f.length-1];if(typeof o=="string"){var s=f.pop();return a(f,s)}else return i.matrix==="Array"?a(f):a(f,"default")},Array:a,Matrix:function(f){var o=f.storage();return a(f.valueOf(),o)},"Array | Matrix, string":function(f,o){return a(f.valueOf(),o)}});function a(u,f){var o=c(u),s=o?new r(0):0;if(l(u),f){var m=t(f);return u.length>0?m.resize(u,s):m}else{var h=[];return u.length>0?pt(h,u,s):h}}function c(u){var f=!1;return u.forEach(function(o,s,m){$e(o)&&(f=!0,m[s]=o.toNumber())}),f}function l(u){u.forEach(function(f){if(typeof f!="number"||!Se(f)||f<0)throw new Error("Parameters in function zeros must be positive integers")})}}),Qb="erf",jb=["typed"],e2=P(Qb,jb,e=>{var{typed:n}=e;return n("name",{number:function(c){var l=Math.abs(c);return l>=t2?Pn(c):l<=r2?Pn(c)*i(l):l<=4?Pn(c)*(1-t(l)):Pn(c)*(1-r(l))},"Array | Matrix":function(c){return xe(c,this)}});function i(a){var c=a*a,l=xn[0][4]*c,u=c,f;for(f=0;f<3;f+=1)l=(l+xn[0][f])*c,u=(u+ut[0][f])*c;return a*(l+xn[0][3])/(u+ut[0][3])}function t(a){var c=xn[1][8]*a,l=a,u;for(u=0;u<7;u+=1)c=(c+xn[1][u])*a,l=(l+ut[1][u])*a;var f=(c+xn[1][7])/(l+ut[1][7]),o=parseInt(a*16)/16,s=(a-o)*(a+o);return Math.exp(-o*o)*Math.exp(-s)*f}function r(a){var c=1/(a*a),l=xn[2][5]*c,u=c,f;for(f=0;f<4;f+=1)l=(l+xn[2][f])*c,u=(u+ut[2][f])*c;var o=c*(l+xn[2][4])/(u+ut[2][4]);o=(n2-o)/a,c=parseInt(a*16)/16;var s=(a-c)*(a+c);return Math.exp(-c*c)*Math.exp(-s)*o}}),r2=.46875,n2=.5641895835477563,xn=[[3.1611237438705655,113.86415415105016,377.485237685302,3209.3775891384694,.18577770618460315],[.5641884969886701,8.883149794388377,66.11919063714163,298.6351381974001,881.952221241769,1712.0476126340707,2051.0783778260716,1230.3393547979972,21531153547440383e-24],[.30532663496123236,.36034489994980445,.12578172611122926,.016083785148742275,.0006587491615298378,.016315387137302097]],ut=[[23.601290952344122,244.02463793444417,1282.6165260773723,2844.236833439171],[15.744926110709835,117.6939508913125,537.1811018620099,1621.3895745666903,3290.7992357334597,4362.619090143247,3439.3676741437216,1230.3393548037495],[2.568520192289822,1.8729528499234604,.5279051029514285,.06051834131244132,.0023352049762686918]],t2=Math.pow(2,53),su="mode",i2=["typed","isNaN","isNumeric"],a2=P(su,i2,e=>{var{typed:n,isNaN:i,isNumeric:t}=e;return n(su,{"Array | Matrix":r,"...":function(c){return r(c)}});function r(a){a=qe(a.valueOf());var c=a.length;if(c===0)throw new Error("Cannot calculate mode of an empty array");for(var l={},u=[],f=0,o=0;o<a.length;o++){var s=a[o];if(t(s)&&i(s))throw new Error("Cannot calculate mode of an array containing NaN values");s in l||(l[s]=0),l[s]++,l[s]===f?u.push(s):l[s]>f&&(f=l[s],u=[s])}return u}});function Er(e,n,i){var t;return String(e).indexOf("Unexpected type")!==-1?(t=arguments.length>2?" (type: "+je(i)+", value: "+JSON.stringify(i)+")":" (type: "+e.data.actual+")",new TypeError("Cannot calculate "+n+", unexpected type of argument"+t)):String(e).indexOf("complex numbers")!==-1?(t=arguments.length>2?" (type: "+je(i)+", value: "+JSON.stringify(i)+")":"",new TypeError("Cannot calculate "+n+", no ordering relation is defined for complex numbers"+t)):e}var ou="prod",s2=["typed","config","multiplyScalar","numeric"],o2=P(ou,s2,e=>{var{typed:n,config:i,multiplyScalar:t,numeric:r}=e;return n(ou,{"Array | Matrix":a,"Array | Matrix, number | BigNumber":function(l,u){throw new Error("prod(A, dim) is not yet supported")},"...":function(l){return a(l)}});function a(c){var l;if(kn(c,function(u){try{l=l===void 0?u:t(l,u)}catch(f){throw Er(f,"prod",u)}}),typeof l=="string"&&(l=r(l,i.number)),l===void 0)throw new Error("Cannot calculate prod of an empty array");return l}}),uu="format",u2=["typed"],c2=P(uu,u2,e=>{var{typed:n}=e;return n(uu,{any:Oe,"any, Object | function | number":Oe})}),cu="bin",l2=["typed","format"],f2=P(cu,l2,e=>{var{typed:n,format:i}=e;return n(cu,{"number | BigNumber":function(r){return i(r,{notation:"bin"})},"number | BigNumber, number":function(r,a){return i(r,{notation:"bin",wordSize:a})}})}),lu="oct",m2=["typed","format"],h2=P(lu,m2,e=>{var{typed:n,format:i}=e;return n(lu,{"number | BigNumber":function(r){return i(r,{notation:"oct"})},"number | BigNumber, number":function(r,a){return i(r,{notation:"oct",wordSize:a})}})}),fu="hex",p2=["typed","format"],g2=P(fu,p2,e=>{var{typed:n,format:i}=e;return n(fu,{"number | BigNumber":function(r){return i(r,{notation:"hex"})},"number | BigNumber, number":function(r,a){return i(r,{notation:"hex",wordSize:a})}})}),mu="print",d2=["typed"],v2=P(mu,d2,e=>{var{typed:n}=e;return n(mu,{"string, Object | Array":hu,"string, Object | Array, number | Object":hu})});function hu(e,n,i){return e.replace(/\$([\w.]+)/g,function(t,r){for(var a=r.split("."),c=n[a.shift()];a.length&&c!==void 0;){var l=a.shift();c=l?c[l]:c+"."}return c!==void 0?Or(c)?c:Oe(c,i):t})}var pu="to",b2=["typed","matrix"],y2=P(pu,b2,e=>{var{typed:n,matrix:i}=e,t=er({typed:n}),r=Ve({typed:n});return n(pu,{"Unit, Unit | string":function(c,l){return c.to(l)},"Matrix, Matrix":function(c,l){return t(c,l,this)},"Array, Array":function(c,l){return this(i(c),i(l)).valueOf()},"Array, Matrix":function(c,l){return this(i(c),l)},"Matrix, Array":function(c,l){return this(c,i(l))},"Matrix, any":function(c,l){return r(c,l,this,!1)},"any, Matrix":function(c,l){return r(l,c,this,!0)},"Array, any":function(c,l){return r(i(c),l,this,!1).valueOf()},"any, Array":function(c,l){return r(i(l),c,this,!0).valueOf()}})}),gu="isPrime",x2=["typed"],w2=P(gu,x2,e=>{var{typed:n}=e;return n(gu,{number:function(t){if(t*0!==0)return!1;if(t<=3)return t>1;if(t%2===0||t%3===0)return!1;for(var r=5;r*r<=t;r+=6)if(t%r===0||t%(r+2)===0)return!1;return!0},BigNumber:function(t){if(t.toNumber()*0!==0)return!1;if(t.lte(3))return t.gt(1);if(t.mod(2).eq(0)||t.mod(3).eq(0))return!1;if(t.lt(Math.pow(2,32))){for(var r=t.toNumber(),a=5;a*a<=r;a+=6)if(r%a===0||r%(a+2)===0)return!1;return!0}function c(A,v,b){for(var x=1;!v.eq(0);)v.mod(2).eq(0)?(v=v.div(2),A=A.mul(A).mod(b)):(v=v.sub(1),x=A.mul(x).mod(b));return x}var l=t.constructor.clone({precision:t.toFixed(0).length*2});t=new l(t);for(var u=0,f=t.sub(1);f.mod(2).eq(0);)f=f.div(2),u+=1;var o=null;if(t.lt("3317044064679887385961981"))o=[2,3,5,7,11,13,17,19,23,29,31,37,41].filter(A=>A<t);else{var s=Math.min(t.toNumber()-2,Math.floor(2*Math.pow(t.toFixed(0).length*Math.log(10),2)));o=[];for(var m=2;m<=s;m+=1)o.push(s)}for(var h=0;h<o.length;h+=1){var p=o[h],g=c(t.sub(t).add(p),f,t);if(!g.eq(1)){for(var y=0,w=g;!w.eq(t.sub(1));y+=1,w=w.mul(w).mod(t))if(y===u-1)return!1}}return!0},"Array | Matrix":function(t){return xe(t,this)}})}),A2="numeric",N2=["number","?bignumber","?fraction"],S2=P(A2,N2,e=>{var{number:n,bignumber:i,fraction:t}=e,r={string:!0,number:!0,BigNumber:!0,Fraction:!0},a={number:c=>n(c),BigNumber:i?c=>i(c):Ya,Fraction:t?c=>t(c):km};return function(l,u){var f=je(l);if(!(f in r))throw new TypeError("Cannot convert "+l+' of type "'+f+'"; valid input types are '+Object.keys(r).join(", "));if(!(u in a))throw new TypeError("Cannot convert "+l+' to type "'+u+'"; valid output types are '+Object.keys(a).join(", "));return u===f?l:a[u](l)}}),du="divideScalar",M2=["typed","numeric"],T2=P(du,M2,e=>{var{typed:n,numeric:i}=e;return n(du,{"number, number":function(r,a){return r/a},"Complex, Complex":function(r,a){return r.div(a)},"BigNumber, BigNumber":function(r,a){return r.div(a)},"Fraction, Fraction":function(r,a){return r.div(a)},"Unit, number | Fraction | BigNumber":function(r,a){var c=r.clone(),l=i(1,je(a));return c.value=this(c.value===null?c._normalize(l):c.value,a),c},"number | Fraction | BigNumber, Unit":function(r,a){var c=a.clone();c=c.pow(-1);var l=i(1,je(r));return c.value=this(r,a.value===null?a._normalize(l):a.value),c},"Unit, Unit":function(r,a){return r.divide(a)}})}),vu="pow",k2=["typed","config","identity","multiply","matrix","inv","fraction","number","Complex"],E2=P(vu,k2,e=>{var{typed:n,config:i,identity:t,multiply:r,matrix:a,inv:c,number:l,fraction:u,Complex:f}=e;return n(vu,{"number, number":o,"Complex, Complex":function(p,g){return p.pow(g)},"BigNumber, BigNumber":function(p,g){return g.isInteger()||p>=0||i.predictable?p.pow(g):new f(p.toNumber(),0).pow(g.toNumber(),0)},"Fraction, Fraction":function(p,g){var y=p.pow(g);if(y!=null)return y;if(i.predictable)throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");return o(p.valueOf(),g.valueOf())},"Array, number":s,"Array, BigNumber":function(p,g){return s(p,g.toNumber())},"Matrix, number":m,"Matrix, BigNumber":function(p,g){return m(p,g.toNumber())},"Unit, number | BigNumber":function(p,g){return p.pow(g)}});function o(h,p){if(i.predictable&&!Se(p)&&h<0)try{var g=u(p),y=l(g);if((p===y||Math.abs((p-y)/p)<1e-14)&&g.d%2===1)return(g.n%2===0?1:-1)*Math.pow(-h,p)}catch{}return i.predictable&&(h<-1&&p===1/0||h>-1&&h<0&&p===-1/0)?NaN:Se(p)||h>=0||i.predictable?Rf(h,p):h*h<1&&p===1/0||h*h>1&&p===-1/0?0:new f(h,0).pow(p,0)}function s(h,p){if(!Se(p))throw new TypeError("For A^b, b must be an integer (value is "+p+")");var g=Re(h);if(g.length!==2)throw new Error("For A^b, A must be 2 dimensional (A has "+g.length+" dimensions)");if(g[0]!==g[1])throw new Error("For A^b, A must be square (size is "+g[0]+"x"+g[1]+")");if(p<0)try{return s(c(h),-p)}catch(A){throw A.message==="Cannot calculate inverse, determinant is zero"?new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is "+p+")"):A}for(var y=t(g[0]).valueOf(),w=h;p>=1;)(p&1)===1&&(y=r(w,y)),p>>=1,w=r(w,w);return y}function m(h,p){return a(s(h.valueOf(),p))}}),ct="Number of decimals in function round must be an integer",bu="round",C2=["typed","matrix","equalScalar","zeros","BigNumber","DenseMatrix"],B2=P(bu,C2,e=>{var{typed:n,matrix:i,equalScalar:t,zeros:r,BigNumber:a,DenseMatrix:c}=e,l=yr({typed:n,equalScalar:t}),u=dr({typed:n,DenseMatrix:c}),f=Ve({typed:n});return n(bu,{number:Rs,"number, number":Rs,"number, BigNumber":function(s,m){if(!m.isInteger())throw new TypeError(ct);return new a(s).toDecimalPlaces(m.toNumber())},Complex:function(s){return s.round()},"Complex, number":function(s,m){if(m%1)throw new TypeError(ct);return s.round(m)},"Complex, BigNumber":function(s,m){if(!m.isInteger())throw new TypeError(ct);var h=m.toNumber();return s.round(h)},BigNumber:function(s){return s.toDecimalPlaces(0)},"BigNumber, BigNumber":function(s,m){if(!m.isInteger())throw new TypeError(ct);return s.toDecimalPlaces(m.toNumber())},Fraction:function(s){return s.round()},"Fraction, number":function(s,m){if(m%1)throw new TypeError(ct);return s.round(m)},"Fraction, BigNumber":function(s,m){if(!m.isInteger())throw new TypeError(ct);return s.round(m.toNumber())},"Array | Matrix":function(s){return xe(s,this)},"SparseMatrix, number | BigNumber":function(s,m){return l(s,m,this,!1)},"DenseMatrix, number | BigNumber":function(s,m){return f(s,m,this,!1)},"Array, number | BigNumber":function(s,m){return f(i(s),m,this,!1).valueOf()},"number | Complex | BigNumber | Fraction, SparseMatrix":function(s,m){return t(s,0)?r(m.size(),m.storage()):u(m,s,this,!0)},"number | Complex | BigNumber | Fraction, DenseMatrix":function(s,m){return t(s,0)?r(m.size(),m.storage()):f(m,s,this,!0)},"number | Complex | BigNumber | Fraction, Array":function(s,m){return f(i(m),s,this,!0).valueOf()}})}),yu="log",L2=["config","typed","divideScalar","Complex"],D2=P(yu,L2,e=>{var{typed:n,config:i,divideScalar:t,Complex:r}=e;return n(yu,{number:function(c){return c>=0||i.predictable?U1(c):new r(c,0).log()},Complex:function(c){return c.log()},BigNumber:function(c){return!c.isNegative()||i.predictable?c.ln():new r(c.toNumber(),0).log()},"Array | Matrix":function(c){return xe(c,this)},"any, any":function(c,l){return t(this(c),this(l))}})}),xu="log1p",I2=["typed","config","divideScalar","log","Complex"],O2=P(xu,I2,e=>{var{typed:n,config:i,divideScalar:t,log:r,Complex:a}=e;return n(xu,{number:function(u){return u>=-1||i.predictable?Hp(u):c(new a(u,0))},Complex:c,BigNumber:function(u){var f=u.plus(1);return!f.isNegative()||i.predictable?f.ln():c(new a(u.toNumber(),0))},"Array | Matrix":function(u){return xe(u,this)},"any, any":function(u,f){return t(this(u),r(f))}});function c(l){var u=l.re+1;return new a(Math.log(Math.sqrt(u*u+l.im*l.im)),Math.atan2(l.im,u))}}),wu="nthRoots",z2=["config","typed","divideScalar","Complex"],P2=P(wu,z2,e=>{var{typed:n,config:i,divideScalar:t,Complex:r}=e,a=[function(u){return new r(u,0)},function(u){return new r(0,u)},function(u){return new r(-u,0)},function(u){return new r(0,-u)}];function c(l,u){if(u<0)throw new Error("Root must be greater than zero");if(u===0)throw new Error("Root must be non-zero");if(u%1!==0)throw new Error("Root must be an integer");if(l===0||l.abs()===0)return[new r(0,0)];var f=typeof l=="number",o;(f||l.re===0||l.im===0)&&(f?o=2*+(l<0):l.im===0?o=2*+(l.re<0):o=2*+(l.im<0)+1);for(var s=l.arg(),m=l.abs(),h=[],p=Math.pow(m,1/u),g=0;g<u;g++){var y=(o+4*g)/u;if(y===Math.round(y)){h.push(a[y%4](p));continue}h.push(new r({r:p,phi:(s+2*Math.PI*g)/u}))}return h}return n(wu,{Complex:function(u){return c(u,2)},"Complex, number":c})}),Au="dotPow",$2=["typed","equalScalar","matrix","pow","DenseMatrix"],_2=P(Au,$2,e=>{var{typed:n,equalScalar:i,matrix:t,pow:r,DenseMatrix:a}=e,c=Cr({typed:n}),l=mn({typed:n,DenseMatrix:a}),u=yr({typed:n,equalScalar:i}),f=dr({typed:n,DenseMatrix:a}),o=er({typed:n}),s=Ve({typed:n});return n(Au,{"any, any":r,"SparseMatrix, SparseMatrix":function(h,p){return l(h,p,r,!1)},"SparseMatrix, DenseMatrix":function(h,p){return c(p,h,r,!0)},"DenseMatrix, SparseMatrix":function(h,p){return c(h,p,r,!1)},"DenseMatrix, DenseMatrix":function(h,p){return o(h,p,r)},"Array, Array":function(h,p){return this(t(h),t(p)).valueOf()},"Array, Matrix":function(h,p){return this(t(h),p)},"Matrix, Array":function(h,p){return this(h,t(p))},"SparseMatrix, any":function(h,p){return u(h,p,this,!1)},"DenseMatrix, any":function(h,p){return s(h,p,this,!1)},"any, SparseMatrix":function(h,p){return f(p,h,this,!0)},"any, DenseMatrix":function(h,p){return s(p,h,this,!0)},"Array, any":function(h,p){return s(t(h),p,this,!1).valueOf()},"any, Array":function(h,p){return s(t(p),h,this,!0).valueOf()}})}),Nu="dotDivide",F2=["typed","matrix","equalScalar","divideScalar","DenseMatrix"],R2=P(Nu,F2,e=>{var{typed:n,matrix:i,equalScalar:t,divideScalar:r,DenseMatrix:a}=e,c=tn({typed:n,equalScalar:t}),l=Cr({typed:n}),u=mn({typed:n,DenseMatrix:a}),f=yr({typed:n,equalScalar:t}),o=dr({typed:n,DenseMatrix:a}),s=er({typed:n}),m=Ve({typed:n});return n(Nu,{"any, any":r,"SparseMatrix, SparseMatrix":function(p,g){return u(p,g,r,!1)},"SparseMatrix, DenseMatrix":function(p,g){return c(g,p,r,!0)},"DenseMatrix, SparseMatrix":function(p,g){return l(p,g,r,!1)},"DenseMatrix, DenseMatrix":function(p,g){return s(p,g,r)},"Array, Array":function(p,g){return this(i(p),i(g)).valueOf()},"Array, Matrix":function(p,g){return this(i(p),g)},"Matrix, Array":function(p,g){return this(p,i(g))},"SparseMatrix, any":function(p,g){return f(p,g,r,!1)},"DenseMatrix, any":function(p,g){return m(p,g,r,!1)},"any, SparseMatrix":function(p,g){return o(g,p,r,!0)},"any, DenseMatrix":function(p,g){return m(g,p,r,!0)},"Array, any":function(p,g){return m(i(p),g,r,!1).valueOf()},"any, Array":function(p,g){return m(i(g),p,r,!0).valueOf()}})});function Ht(e){var{DenseMatrix:n}=e;return function(t,r,a){var c=t.size();if(c.length!==2)throw new RangeError("Matrix must be two dimensional (size: "+Oe(c)+")");var l=c[0],u=c[1];if(l!==u)throw new RangeError("Matrix must be square (size: "+Oe(c)+")");var f=[];if(Ce(r)){var o=r.size(),s=r._data;if(o.length===1){if(o[0]!==l)throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for(var m=0;m<l;m++)f[m]=[s[m]];return new n({data:f,size:[l,1],datatype:r._datatype})}if(o.length===2){if(o[0]!==l||o[1]!==1)throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");if(di(r)){if(a){f=[];for(var h=0;h<l;h++)f[h]=[s[h][0]];return new n({data:f,size:[l,1],datatype:r._datatype})}return r}if(Vn(r)){for(var p=0;p<l;p++)f[p]=[0];for(var g=r._values,y=r._index,w=r._ptr,A=w[1],v=w[0];v<A;v++){var b=y[v];f[b][0]=g[v]}return new n({data:f,size:[l,1],datatype:r._datatype})}}throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.")}if(Ze(r)){var x=Re(r);if(x.length===1){if(x[0]!==l)throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for(var d=0;d<l;d++)f[d]=[r[d]];return new n({data:f,size:[l,1]})}if(x.length===2){if(x[0]!==l||x[1]!==1)throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for(var M=0;M<l;M++)f[M]=[r[M][0]];return new n({data:f,size:[l,1]})}throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.")}}}var Su="lsolve",q2=["typed","matrix","divideScalar","multiplyScalar","subtract","equalScalar","DenseMatrix"],K2=P(Su,q2,e=>{var{typed:n,matrix:i,divideScalar:t,multiplyScalar:r,subtract:a,equalScalar:c,DenseMatrix:l}=e,u=Ht({DenseMatrix:l});return n(Su,{"SparseMatrix, Array | Matrix":function(m,h){return o(m,h)},"DenseMatrix, Array | Matrix":function(m,h){return f(m,h)},"Array, Array | Matrix":function(m,h){var p=i(m),g=f(p,h);return g.valueOf()}});function f(s,m){m=u(s,m,!0);for(var h=m._data,p=s._size[0],g=s._size[1],y=[],w=s._data,A=0;A<g;A++){var v=h[A][0]||0,b=void 0;if(c(v,0))b=0;else{var x=w[A][A];if(c(x,0))throw new Error("Linear system cannot be solved since matrix is singular");b=t(v,x);for(var d=A+1;d<p;d++)h[d]=[a(h[d][0]||0,r(b,w[d][A]))]}y[A]=[b]}return new l({data:y,size:[p,1]})}function o(s,m){m=u(s,m,!0);for(var h=m._data,p=s._size[0],g=s._size[1],y=s._values,w=s._index,A=s._ptr,v=[],b=0;b<g;b++){var x=h[b][0]||0;if(c(x,0))v[b]=[0];else{for(var d=0,M=[],S=[],T=A[b],N=A[b+1],D=T;D<N;D++){var k=w[D];k===b?d=y[D]:k>b&&(M.push(y[D]),S.push(k))}if(c(d,0))throw new Error("Linear system cannot be solved since matrix is singular");for(var I=t(x,d),_=0,O=S.length;_<O;_++){var B=S[_];h[B]=[a(h[B][0]||0,r(I,M[_]))]}v[b]=[I]}}return new l({data:v,size:[p,1]})}}),Mu="usolve",U2=["typed","matrix","divideScalar","multiplyScalar","subtract","equalScalar","DenseMatrix"],V2=P(Mu,U2,e=>{var{typed:n,matrix:i,divideScalar:t,multiplyScalar:r,subtract:a,equalScalar:c,DenseMatrix:l}=e,u=Ht({DenseMatrix:l});return n(Mu,{"SparseMatrix, Array | Matrix":function(m,h){return o(m,h)},"DenseMatrix, Array | Matrix":function(m,h){return f(m,h)},"Array, Array | Matrix":function(m,h){var p=i(m),g=f(p,h);return g.valueOf()}});function f(s,m){m=u(s,m,!0);for(var h=m._data,p=s._size[0],g=s._size[1],y=[],w=s._data,A=g-1;A>=0;A--){var v=h[A][0]||0,b=void 0;if(c(v,0))b=0;else{var x=w[A][A];if(c(x,0))throw new Error("Linear system cannot be solved since matrix is singular");b=t(v,x);for(var d=A-1;d>=0;d--)h[d]=[a(h[d][0]||0,r(b,w[d][A]))]}y[A]=[b]}return new l({data:y,size:[p,1]})}function o(s,m){m=u(s,m,!0);for(var h=m._data,p=s._size[0],g=s._size[1],y=s._values,w=s._index,A=s._ptr,v=[],b=g-1;b>=0;b--){var x=h[b][0]||0;if(c(x,0))v[b]=[0];else{for(var d=0,M=[],S=[],T=A[b],N=A[b+1],D=N-1;D>=T;D--){var k=w[D];k===b?d=y[D]:k<b&&(M.push(y[D]),S.push(k))}if(c(d,0))throw new Error("Linear system cannot be solved since matrix is singular");for(var I=t(x,d),_=0,O=S.length;_<O;_++){var B=S[_];h[B]=[a(h[B][0],r(I,M[_]))]}v[b]=[I]}}return new l({data:v,size:[p,1]})}}),Tu="lsolveAll",W2=["typed","matrix","divideScalar","multiplyScalar","subtract","equalScalar","DenseMatrix"],G2=P(Tu,W2,e=>{var{typed:n,matrix:i,divideScalar:t,multiplyScalar:r,subtract:a,equalScalar:c,DenseMatrix:l}=e,u=Ht({DenseMatrix:l});return n(Tu,{"SparseMatrix, Array | Matrix":function(m,h){return o(m,h)},"DenseMatrix, Array | Matrix":function(m,h){return f(m,h)},"Array, Array | Matrix":function(m,h){var p=i(m),g=f(p,h);return g.map(y=>y.valueOf())}});function f(s,m){for(var h=[u(s,m,!0)._data.map(S=>S[0])],p=s._data,g=s._size[0],y=s._size[1],w=0;w<y;w++)for(var A=h.length,v=0;v<A;v++){var b=h[v];if(c(p[w][w],0))if(c(b[w],0)){if(v===0){var d=[...b];d[w]=1;for(var M=w+1;M<y;M++)d[M]=a(d[M],p[M][w]);h.push(d)}}else{if(v===0)return[];h.splice(v,1),v-=1,A-=1}else{b[w]=t(b[w],p[w][w]);for(var x=w+1;x<y;x++)b[x]=a(b[x],r(b[w],p[x][w]))}}return h.map(S=>new l({data:S.map(T=>[T]),size:[g,1]}))}function o(s,m){for(var h=[u(s,m,!0)._data.map(X=>X[0])],p=s._size[0],g=s._size[1],y=s._values,w=s._index,A=s._ptr,v=0;v<g;v++)for(var b=h.length,x=0;x<b;x++){for(var d=h[x],M=[],S=[],T=A[v],N=A[v+1],D=0,k=T;k<N;k++){var I=w[k];I===v?D=y[k]:I>v&&(M.push(y[k]),S.push(I))}if(c(D,0))if(c(d[v],0)){if(x===0){var L=[...d];L[v]=1;for(var V=0,C=S.length;V<C;V++){var U=S[V];L[U]=a(L[U],M[V])}h.push(L)}}else{if(x===0)return[];h.splice(x,1),x-=1,b-=1}else{d[v]=t(d[v],D);for(var _=0,O=S.length;_<O;_++){var B=S[_];d[B]=a(d[B],r(d[v],M[_]))}}}return h.map(X=>new l({data:X.map(j=>[j]),size:[p,1]}))}}),ku="usolveAll",H2=["typed","matrix","divideScalar","multiplyScalar","subtract","equalScalar","DenseMatrix"],Z2=P(ku,H2,e=>{var{typed:n,matrix:i,divideScalar:t,multiplyScalar:r,subtract:a,equalScalar:c,DenseMatrix:l}=e,u=Ht({DenseMatrix:l});return n(ku,{"SparseMatrix, Array | Matrix":function(m,h){return o(m,h)},"DenseMatrix, Array | Matrix":function(m,h){return f(m,h)},"Array, Array | Matrix":function(m,h){var p=i(m),g=f(p,h);return g.map(y=>y.valueOf())}});function f(s,m){for(var h=[u(s,m,!0)._data.map(S=>S[0])],p=s._data,g=s._size[0],y=s._size[1],w=y-1;w>=0;w--)for(var A=h.length,v=0;v<A;v++){var b=h[v];if(c(p[w][w],0))if(c(b[w],0)){if(v===0){var d=[...b];d[w]=1;for(var M=w-1;M>=0;M--)d[M]=a(d[M],p[M][w]);h.push(d)}}else{if(v===0)return[];h.splice(v,1),v-=1,A-=1}else{b[w]=t(b[w],p[w][w]);for(var x=w-1;x>=0;x--)b[x]=a(b[x],r(b[w],p[x][w]))}}return h.map(S=>new l({data:S.map(T=>[T]),size:[g,1]}))}function o(s,m){for(var h=[u(s,m,!0)._data.map(X=>X[0])],p=s._size[0],g=s._size[1],y=s._values,w=s._index,A=s._ptr,v=g-1;v>=0;v--)for(var b=h.length,x=0;x<b;x++){for(var d=h[x],M=[],S=[],T=A[v],N=A[v+1],D=0,k=N-1;k>=T;k--){var I=w[k];I===v?D=y[k]:I<v&&(M.push(y[k]),S.push(I))}if(c(D,0))if(c(d[v],0)){if(x===0){var L=[...d];L[v]=1;for(var V=0,C=S.length;V<C;V++){var U=S[V];L[U]=a(L[U],M[V])}h.push(L)}}else{if(x===0)return[];h.splice(x,1),x-=1,b-=1}else{d[v]=t(d[v],D);for(var _=0,O=S.length;_<O;_++){var B=S[_];d[B]=a(d[B],r(d[v],M[_]))}}}return h.map(X=>new l({data:X.map(j=>[j]),size:[p,1]}))}}),X2="algorithm08",Y2=["typed","equalScalar"],Ja=P(X2,Y2,e=>{var{typed:n,equalScalar:i}=e;return function(r,a,c){var l=r._values,u=r._index,f=r._ptr,o=r._size,s=r._datatype,m=a._values,h=a._index,p=a._ptr,g=a._size,y=a._datatype;if(o.length!==g.length)throw new ze(o.length,g.length);if(o[0]!==g[0]||o[1]!==g[1])throw new RangeError("Dimension mismatch. Matrix A ("+o+") must match Matrix B ("+g+")");if(!l||!m)throw new Error("Cannot perform operation on Pattern Sparse Matrices");var w=o[0],A=o[1],v,b=i,x=0,d=c;typeof s=="string"&&s===y&&(v=s,b=n.find(i,[v,v]),x=n.convert(0,v),d=n.find(c,[v,v]));for(var M=[],S=[],T=[],N=[],D=[],k,I,_,O,B=0;B<A;B++){T[B]=S.length;var L=B+1;for(I=f[B],_=f[B+1],k=I;k<_;k++)O=u[k],D[O]=L,N[O]=l[k],S.push(O);for(I=p[B],_=p[B+1],k=I;k<_;k++)O=h[k],D[O]===L&&(N[O]=d(N[O],m[k]));for(k=T[B];k<S.length;){O=S[k];var V=N[O];b(V,x)?S.splice(k,1):(M.push(V),k++)}}return T[A]=S.length,r.createSparseMatrix({values:M,index:S,ptr:T,size:[w,A],datatype:v})}}),Eu="leftShift",J2=["typed","matrix","equalScalar","zeros","DenseMatrix"],Q2=P(Eu,J2,e=>{var{typed:n,matrix:i,equalScalar:t,zeros:r,DenseMatrix:a}=e,c=qn({typed:n}),l=tn({typed:n,equalScalar:t}),u=Ja({typed:n,equalScalar:t}),f=Xn({typed:n,DenseMatrix:a}),o=yr({typed:n,equalScalar:t}),s=er({typed:n}),m=Ve({typed:n});return n(Eu,{"number, number":Wf,"BigNumber, BigNumber":S0,"SparseMatrix, SparseMatrix":function(p,g){return u(p,g,this,!1)},"SparseMatrix, DenseMatrix":function(p,g){return l(g,p,this,!0)},"DenseMatrix, SparseMatrix":function(p,g){return c(p,g,this,!1)},"DenseMatrix, DenseMatrix":function(p,g){return s(p,g,this)},"Array, Array":function(p,g){return this(i(p),i(g)).valueOf()},"Array, Matrix":function(p,g){return this(i(p),g)},"Matrix, Array":function(p,g){return this(p,i(g))},"SparseMatrix, number | BigNumber":function(p,g){return t(g,0)?p.clone():o(p,g,this,!1)},"DenseMatrix, number | BigNumber":function(p,g){return t(g,0)?p.clone():m(p,g,this,!1)},"number | BigNumber, SparseMatrix":function(p,g){return t(p,0)?r(g.size(),g.storage()):f(g,p,this,!0)},"number | BigNumber, DenseMatrix":function(p,g){return t(p,0)?r(g.size(),g.storage()):m(g,p,this,!0)},"Array, number | BigNumber":function(p,g){return this(i(p),g).valueOf()},"number | BigNumber, Array":function(p,g){return this(p,i(g)).valueOf()}})}),Cu="rightArithShift",j2=["typed","matrix","equalScalar","zeros","DenseMatrix"],ey=P(Cu,j2,e=>{var{typed:n,matrix:i,equalScalar:t,zeros:r,DenseMatrix:a}=e,c=qn({typed:n}),l=tn({typed:n,equalScalar:t}),u=Ja({typed:n,equalScalar:t}),f=Xn({typed:n,DenseMatrix:a}),o=yr({typed:n,equalScalar:t}),s=er({typed:n}),m=Ve({typed:n});return n(Cu,{"number, number":Gf,"BigNumber, BigNumber":M0,"SparseMatrix, SparseMatrix":function(p,g){return u(p,g,this,!1)},"SparseMatrix, DenseMatrix":function(p,g){return l(g,p,this,!0)},"DenseMatrix, SparseMatrix":function(p,g){return c(p,g,this,!1)},"DenseMatrix, DenseMatrix":function(p,g){return s(p,g,this)},"Array, Array":function(p,g){return this(i(p),i(g)).valueOf()},"Array, Matrix":function(p,g){return this(i(p),g)},"Matrix, Array":function(p,g){return this(p,i(g))},"SparseMatrix, number | BigNumber":function(p,g){return t(g,0)?p.clone():o(p,g,this,!1)},"DenseMatrix, number | BigNumber":function(p,g){return t(g,0)?p.clone():m(p,g,this,!1)},"number | BigNumber, SparseMatrix":function(p,g){return t(p,0)?r(g.size(),g.storage()):f(g,p,this,!0)},"number | BigNumber, DenseMatrix":function(p,g){return t(p,0)?r(g.size(),g.storage()):m(g,p,this,!0)},"Array, number | BigNumber":function(p,g){return this(i(p),g).valueOf()},"number | BigNumber, Array":function(p,g){return this(p,i(g)).valueOf()}})}),Bu="rightLogShift",ry=["typed","matrix","equalScalar","zeros","DenseMatrix"],ny=P(Bu,ry,e=>{var{typed:n,matrix:i,equalScalar:t,zeros:r,DenseMatrix:a}=e,c=qn({typed:n}),l=tn({typed:n,equalScalar:t}),u=Ja({typed:n,equalScalar:t}),f=Xn({typed:n,DenseMatrix:a}),o=yr({typed:n,equalScalar:t}),s=er({typed:n}),m=Ve({typed:n});return n(Bu,{"number, number":Hf,"SparseMatrix, SparseMatrix":function(p,g){return u(p,g,this,!1)},"SparseMatrix, DenseMatrix":function(p,g){return l(g,p,this,!0)},"DenseMatrix, SparseMatrix":function(p,g){return c(p,g,this,!1)},"DenseMatrix, DenseMatrix":function(p,g){return s(p,g,this)},"Array, Array":function(p,g){return this(i(p),i(g)).valueOf()},"Array, Matrix":function(p,g){return this(i(p),g)},"Matrix, Array":function(p,g){return this(p,i(g))},"SparseMatrix, number | BigNumber":function(p,g){return t(g,0)?p.clone():o(p,g,this,!1)},"DenseMatrix, number | BigNumber":function(p,g){return t(g,0)?p.clone():m(p,g,this,!1)},"number | BigNumber, SparseMatrix":function(p,g){return t(p,0)?r(g.size(),g.storage()):f(g,p,this,!0)},"number | BigNumber, DenseMatrix":function(p,g){return t(p,0)?r(g.size(),g.storage()):m(g,p,this,!0)},"Array, number | BigNumber":function(p,g){return this(i(p),g).valueOf()},"number | BigNumber, Array":function(p,g){return this(p,i(g)).valueOf()}})}),Lu="and",ty=["typed","matrix","equalScalar","zeros","not"],iy=P(Lu,ty,e=>{var{typed:n,matrix:i,equalScalar:t,zeros:r,not:a}=e,c=tn({typed:n,equalScalar:t}),l=qi({typed:n,equalScalar:t}),u=yr({typed:n,equalScalar:t}),f=er({typed:n}),o=Ve({typed:n});return n(Lu,{"number, number":Qf,"Complex, Complex":function(m,h){return(m.re!==0||m.im!==0)&&(h.re!==0||h.im!==0)},"BigNumber, BigNumber":function(m,h){return!m.isZero()&&!h.isZero()&&!m.isNaN()&&!h.isNaN()},"Unit, Unit":function(m,h){return this(m.value||0,h.value||0)},"SparseMatrix, SparseMatrix":function(m,h){return l(m,h,this,!1)},"SparseMatrix, DenseMatrix":function(m,h){return c(h,m,this,!0)},"DenseMatrix, SparseMatrix":function(m,h){return c(m,h,this,!1)},"DenseMatrix, DenseMatrix":function(m,h){return f(m,h,this)},"Array, Array":function(m,h){return this(i(m),i(h)).valueOf()},"Array, Matrix":function(m,h){return this(i(m),h)},"Matrix, Array":function(m,h){return this(m,i(h))},"SparseMatrix, any":function(m,h){return a(h)?r(m.size(),m.storage()):u(m,h,this,!1)},"DenseMatrix, any":function(m,h){return a(h)?r(m.size(),m.storage()):o(m,h,this,!1)},"any, SparseMatrix":function(m,h){return a(m)?r(m.size(),m.storage()):u(h,m,this,!0)},"any, DenseMatrix":function(m,h){return a(m)?r(m.size(),m.storage()):o(h,m,this,!0)},"Array, any":function(m,h){return this(i(m),h).valueOf()},"any, Array":function(m,h){return this(m,i(h)).valueOf()}})}),Du="compare",ay=["typed","config","matrix","equalScalar","BigNumber","Fraction","DenseMatrix"],sy=P(Du,ay,e=>{var{typed:n,config:i,equalScalar:t,matrix:r,BigNumber:a,Fraction:c,DenseMatrix:l}=e,u=Cr({typed:n}),f=Ki({typed:n,equalScalar:t}),o=dr({typed:n,DenseMatrix:l}),s=er({typed:n}),m=Ve({typed:n});return n(Du,{"boolean, boolean":function(p,g){return p===g?0:p>g?1:-1},"number, number":function(p,g){return _r(p,g,i.epsilon)?0:p>g?1:-1},"BigNumber, BigNumber":function(p,g){return fn(p,g,i.epsilon)?new a(0):new a(p.cmp(g))},"Fraction, Fraction":function(p,g){return new c(p.compare(g))},"Complex, Complex":function(){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(p,g){if(!p.equalBase(g))throw new Error("Cannot compare units with different base");return this(p.value,g.value)},"SparseMatrix, SparseMatrix":function(p,g){return f(p,g,this)},"SparseMatrix, DenseMatrix":function(p,g){return u(g,p,this,!0)},"DenseMatrix, SparseMatrix":function(p,g){return u(p,g,this,!1)},"DenseMatrix, DenseMatrix":function(p,g){return s(p,g,this)},"Array, Array":function(p,g){return this(r(p),r(g)).valueOf()},"Array, Matrix":function(p,g){return this(r(p),g)},"Matrix, Array":function(p,g){return this(p,r(g))},"SparseMatrix, any":function(p,g){return o(p,g,this,!1)},"DenseMatrix, any":function(p,g){return m(p,g,this,!1)},"any, SparseMatrix":function(p,g){return o(g,p,this,!0)},"any, DenseMatrix":function(p,g){return m(g,p,this,!0)},"Array, any":function(p,g){return m(r(p),g,this,!1).valueOf()},"any, Array":function(p,g){return m(r(g),p,this,!0).valueOf()}})}),lt=function e(n,i){var t=/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,r=/(^[ ]*|[ ]*$)/g,a=/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,c=/^0x[0-9a-f]+$/i,l=/^0/,u=function(v){return e.insensitive&&(""+v).toLowerCase()||""+v},f=u(n).replace(r,"")||"",o=u(i).replace(r,"")||"",s=f.replace(t,"\0$1\0").replace(/\0$/,"").replace(/^\0/,"").split("\0"),m=o.replace(t,"\0$1\0").replace(/\0$/,"").replace(/^\0/,"").split("\0"),h=parseInt(f.match(c),16)||s.length!==1&&f.match(a)&&Date.parse(f),p=parseInt(o.match(c),16)||h&&o.match(a)&&Date.parse(o)||null,g,y;if(p){if(h<p)return-1;if(h>p)return 1}for(var w=0,A=Math.max(s.length,m.length);w<A;w++){if(g=!(s[w]||"").match(l)&&parseFloat(s[w])||s[w]||0,y=!(m[w]||"").match(l)&&parseFloat(m[w])||m[w]||0,isNaN(g)!==isNaN(y))return isNaN(g)?1:-1;if(typeof g!=typeof y&&(g+="",y+=""),g<y)return-1;if(g>y)return 1}return 0},Iu="compareNatural",oy=["typed","compare"],uy=P(Iu,oy,e=>{var{typed:n,compare:i}=e,t=i.signatures["boolean,boolean"];return n(Iu,{"any, any":function(u,f){var o=je(u),s=je(f),m;if((o==="number"||o==="BigNumber"||o==="Fraction")&&(s==="number"||s==="BigNumber"||s==="Fraction"))return m=i(u,f),m.toString()!=="0"?m>0?1:-1:lt(o,s);if(o==="Array"||o==="Matrix"||s==="Array"||s==="Matrix")return m=r(this,u,f),m!==0?m:lt(o,s);if(o!==s)return lt(o,s);if(o==="Complex")return cy(u,f);if(o==="Unit")return u.equalBase(f)?this(u.value,f.value):a(this,u.formatUnits(),f.formatUnits());if(o==="boolean")return t(u,f);if(o==="string")return lt(u,f);if(o==="Object")return c(this,u,f);if(o==="null"||o==="undefined")return 0;throw new TypeError('Unsupported type of value "'+o+'"')}});function r(l,u,f){return Vn(u)&&Vn(f)?a(l,u.toJSON().values,f.toJSON().values):Vn(u)?r(l,u.toArray(),f):Vn(f)?r(l,u,f.toArray()):di(u)?r(l,u.toJSON().data,f):di(f)?r(l,u,f.toJSON().data):Array.isArray(u)?Array.isArray(f)?a(l,u,f):r(l,u,[f]):r(l,[u],f)}function a(l,u,f){for(var o=0,s=Math.min(u.length,f.length);o<s;o++){var m=l(u[o],f[o]);if(m!==0)return m}return u.length>f.length?1:u.length<f.length?-1:0}function c(l,u,f){var o=Object.keys(u),s=Object.keys(f);o.sort(lt),s.sort(lt);var m=a(l,o,s);if(m!==0)return m;for(var h=0;h<o.length;h++){var p=l(u[o[h]],f[s[h]]);if(p!==0)return p}return 0}});function cy(e,n){return e.re>n.re?1:e.re<n.re?-1:e.im>n.im?1:e.im<n.im?-1:0}var Ou="compareText",ly=["typed","matrix"],fy=P(Ou,ly,e=>{var{typed:n,matrix:i}=e,t=er({typed:n}),r=Ve({typed:n});return n(Ou,{"any, any":st,"DenseMatrix, DenseMatrix":function(c,l){return t(c,l,st)},"Array, Array":function(c,l){return this(i(c),i(l)).valueOf()},"Array, Matrix":function(c,l){return this(i(c),l)},"Matrix, Array":function(c,l){return this(c,i(l))},"DenseMatrix, any":function(c,l){return r(c,l,st,!1)},"any, DenseMatrix":function(c,l){return r(l,c,st,!0)},"Array, any":function(c,l){return r(i(c),l,st,!1).valueOf()},"any, Array":function(c,l){return r(i(l),c,st,!0).valueOf()}})}),ki="equal",my=["typed","matrix","equalScalar","DenseMatrix"],hy=P(ki,my,e=>{var{typed:n,matrix:i,equalScalar:t,DenseMatrix:r}=e,a=Cr({typed:n}),c=mn({typed:n,DenseMatrix:r}),l=dr({typed:n,DenseMatrix:r}),u=er({typed:n}),f=Ve({typed:n});return n(ki,{"any, any":function(s,m){return s===null?m===null:m===null?s===null:s===void 0?m===void 0:m===void 0?s===void 0:t(s,m)},"SparseMatrix, SparseMatrix":function(s,m){return c(s,m,t)},"SparseMatrix, DenseMatrix":function(s,m){return a(m,s,t,!0)},"DenseMatrix, SparseMatrix":function(s,m){return a(s,m,t,!1)},"DenseMatrix, DenseMatrix":function(s,m){return u(s,m,t)},"Array, Array":function(s,m){return this(i(s),i(m)).valueOf()},"Array, Matrix":function(s,m){return this(i(s),m)},"Matrix, Array":function(s,m){return this(s,i(m))},"SparseMatrix, any":function(s,m){return l(s,m,t,!1)},"DenseMatrix, any":function(s,m){return f(s,m,t,!1)},"any, SparseMatrix":function(s,m){return l(m,s,t,!0)},"any, DenseMatrix":function(s,m){return f(m,s,t,!0)},"Array, any":function(s,m){return f(i(s),m,t,!1).valueOf()},"any, Array":function(s,m){return f(i(m),s,t,!0).valueOf()}})});P(ki,["typed","equalScalar"],e=>{var{typed:n,equalScalar:i}=e;return n(ki,{"any, any":function(r,a){return r===null?a===null:a===null?r===null:r===void 0?a===void 0:a===void 0?r===void 0:i(r,a)}})});var zu="equalText",py=["typed","compareText","isZero"],gy=P(zu,py,e=>{var{typed:n,compareText:i,isZero:t}=e;return n(zu,{"any, any":function(a,c){return t(i(a,c))}})}),Pu="smaller",dy=["typed","config","matrix","DenseMatrix"],vy=P(Pu,dy,e=>{var{typed:n,config:i,matrix:t,DenseMatrix:r}=e,a=Cr({typed:n}),c=mn({typed:n,DenseMatrix:r}),l=dr({typed:n,DenseMatrix:r}),u=er({typed:n}),f=Ve({typed:n});return n(Pu,{"boolean, boolean":function(s,m){return s<m},"number, number":function(s,m){return s<m&&!_r(s,m,i.epsilon)},"BigNumber, BigNumber":function(s,m){return s.lt(m)&&!fn(s,m,i.epsilon)},"Fraction, Fraction":function(s,m){return s.compare(m)===-1},"Complex, Complex":function(s,m){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(s,m){if(!s.equalBase(m))throw new Error("Cannot compare units with different base");return this(s.value,m.value)},"SparseMatrix, SparseMatrix":function(s,m){return c(s,m,this)},"SparseMatrix, DenseMatrix":function(s,m){return a(m,s,this,!0)},"DenseMatrix, SparseMatrix":function(s,m){return a(s,m,this,!1)},"DenseMatrix, DenseMatrix":function(s,m){return u(s,m,this)},"Array, Array":function(s,m){return this(t(s),t(m)).valueOf()},"Array, Matrix":function(s,m){return this(t(s),m)},"Matrix, Array":function(s,m){return this(s,t(m))},"SparseMatrix, any":function(s,m){return l(s,m,this,!1)},"DenseMatrix, any":function(s,m){return f(s,m,this,!1)},"any, SparseMatrix":function(s,m){return l(m,s,this,!0)},"any, DenseMatrix":function(s,m){return f(m,s,this,!0)},"Array, any":function(s,m){return f(t(s),m,this,!1).valueOf()},"any, Array":function(s,m){return f(t(m),s,this,!0).valueOf()}})}),$u="smallerEq",by=["typed","config","matrix","DenseMatrix"],yy=P($u,by,e=>{var{typed:n,config:i,matrix:t,DenseMatrix:r}=e,a=Cr({typed:n}),c=mn({typed:n,DenseMatrix:r}),l=dr({typed:n,DenseMatrix:r}),u=er({typed:n}),f=Ve({typed:n});return n($u,{"boolean, boolean":function(s,m){return s<=m},"number, number":function(s,m){return s<=m||_r(s,m,i.epsilon)},"BigNumber, BigNumber":function(s,m){return s.lte(m)||fn(s,m,i.epsilon)},"Fraction, Fraction":function(s,m){return s.compare(m)!==1},"Complex, Complex":function(){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(s,m){if(!s.equalBase(m))throw new Error("Cannot compare units with different base");return this(s.value,m.value)},"SparseMatrix, SparseMatrix":function(s,m){return c(s,m,this)},"SparseMatrix, DenseMatrix":function(s,m){return a(m,s,this,!0)},"DenseMatrix, SparseMatrix":function(s,m){return a(s,m,this,!1)},"DenseMatrix, DenseMatrix":function(s,m){return u(s,m,this)},"Array, Array":function(s,m){return this(t(s),t(m)).valueOf()},"Array, Matrix":function(s,m){return this(t(s),m)},"Matrix, Array":function(s,m){return this(s,t(m))},"SparseMatrix, any":function(s,m){return l(s,m,this,!1)},"DenseMatrix, any":function(s,m){return f(s,m,this,!1)},"any, SparseMatrix":function(s,m){return l(m,s,this,!0)},"any, DenseMatrix":function(s,m){return f(m,s,this,!0)},"Array, any":function(s,m){return f(t(s),m,this,!1).valueOf()},"any, Array":function(s,m){return f(t(m),s,this,!0).valueOf()}})}),_u="larger",xy=["typed","config","matrix","DenseMatrix"],wy=P(_u,xy,e=>{var{typed:n,config:i,matrix:t,DenseMatrix:r}=e,a=Cr({typed:n}),c=mn({typed:n,DenseMatrix:r}),l=dr({typed:n,DenseMatrix:r}),u=er({typed:n}),f=Ve({typed:n});return n(_u,{"boolean, boolean":function(s,m){return s>m},"number, number":function(s,m){return s>m&&!_r(s,m,i.epsilon)},"BigNumber, BigNumber":function(s,m){return s.gt(m)&&!fn(s,m,i.epsilon)},"Fraction, Fraction":function(s,m){return s.compare(m)===1},"Complex, Complex":function(){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(s,m){if(!s.equalBase(m))throw new Error("Cannot compare units with different base");return this(s.value,m.value)},"SparseMatrix, SparseMatrix":function(s,m){return c(s,m,this)},"SparseMatrix, DenseMatrix":function(s,m){return a(m,s,this,!0)},"DenseMatrix, SparseMatrix":function(s,m){return a(s,m,this,!1)},"DenseMatrix, DenseMatrix":function(s,m){return u(s,m,this)},"Array, Array":function(s,m){return this(t(s),t(m)).valueOf()},"Array, Matrix":function(s,m){return this(t(s),m)},"Matrix, Array":function(s,m){return this(s,t(m))},"SparseMatrix, any":function(s,m){return l(s,m,this,!1)},"DenseMatrix, any":function(s,m){return f(s,m,this,!1)},"any, SparseMatrix":function(s,m){return l(m,s,this,!0)},"any, DenseMatrix":function(s,m){return f(m,s,this,!0)},"Array, any":function(s,m){return f(t(s),m,this,!1).valueOf()},"any, Array":function(s,m){return f(t(m),s,this,!0).valueOf()}})}),Fu="largerEq",Ay=["typed","config","matrix","DenseMatrix"],Ny=P(Fu,Ay,e=>{var{typed:n,config:i,matrix:t,DenseMatrix:r}=e,a=Cr({typed:n}),c=mn({typed:n,DenseMatrix:r}),l=dr({typed:n,DenseMatrix:r}),u=er({typed:n}),f=Ve({typed:n});return n(Fu,{"boolean, boolean":function(s,m){return s>=m},"number, number":function(s,m){return s>=m||_r(s,m,i.epsilon)},"BigNumber, BigNumber":function(s,m){return s.gte(m)||fn(s,m,i.epsilon)},"Fraction, Fraction":function(s,m){return s.compare(m)!==-1},"Complex, Complex":function(){throw new TypeError("No ordering relation is defined for complex numbers")},"Unit, Unit":function(s,m){if(!s.equalBase(m))throw new Error("Cannot compare units with different base");return this(s.value,m.value)},"SparseMatrix, SparseMatrix":function(s,m){return c(s,m,this)},"SparseMatrix, DenseMatrix":function(s,m){return a(m,s,this,!0)},"DenseMatrix, SparseMatrix":function(s,m){return a(s,m,this,!1)},"DenseMatrix, DenseMatrix":function(s,m){return u(s,m,this)},"Array, Array":function(s,m){return this(t(s),t(m)).valueOf()},"Array, Matrix":function(s,m){return this(t(s),m)},"Matrix, Array":function(s,m){return this(s,t(m))},"SparseMatrix, any":function(s,m){return l(s,m,this,!1)},"DenseMatrix, any":function(s,m){return f(s,m,this,!1)},"any, SparseMatrix":function(s,m){return l(m,s,this,!0)},"any, DenseMatrix":function(s,m){return f(m,s,this,!0)},"Array, any":function(s,m){return f(t(s),m,this,!1).valueOf()},"any, Array":function(s,m){return f(t(m),s,this,!0).valueOf()}})}),Ru="deepEqual",Sy=["typed","equal"],My=P(Ru,Sy,e=>{var{typed:n,equal:i}=e;return n(Ru,{"any, any":function(a,c){return t(a.valueOf(),c.valueOf())}});function t(r,a){if(Array.isArray(r))if(Array.isArray(a)){var c=r.length;if(c!==a.length)return!1;for(var l=0;l<c;l++)if(!t(r[l],a[l]))return!1;return!0}else return!1;else return Array.isArray(a)?!1:i(r,a)}}),Ta="unequal",Ty=["typed","config","equalScalar","matrix","DenseMatrix"],ky=P(Ta,Ty,e=>{var{typed:n,config:i,equalScalar:t,matrix:r,DenseMatrix:a}=e,c=Cr({typed:n}),l=mn({typed:n,DenseMatrix:a}),u=dr({typed:n,DenseMatrix:a}),f=er({typed:n}),o=Ve({typed:n});return n("unequal",{"any, any":function(h,p){return h===null?p!==null:p===null?h!==null:h===void 0?p!==void 0:p===void 0?h!==void 0:s(h,p)},"SparseMatrix, SparseMatrix":function(h,p){return l(h,p,s)},"SparseMatrix, DenseMatrix":function(h,p){return c(p,h,s,!0)},"DenseMatrix, SparseMatrix":function(h,p){return c(h,p,s,!1)},"DenseMatrix, DenseMatrix":function(h,p){return f(h,p,s)},"Array, Array":function(h,p){return this(r(h),r(p)).valueOf()},"Array, Matrix":function(h,p){return this(r(h),p)},"Matrix, Array":function(h,p){return this(h,r(p))},"SparseMatrix, any":function(h,p){return u(h,p,s,!1)},"DenseMatrix, any":function(h,p){return o(h,p,s,!1)},"any, SparseMatrix":function(h,p){return u(p,h,s,!0)},"any, DenseMatrix":function(h,p){return o(p,h,s,!0)},"Array, any":function(h,p){return o(r(h),p,s,!1).valueOf()},"any, Array":function(h,p){return o(r(p),h,s,!0).valueOf()}});function s(m,h){return!t(m,h)}});P(Ta,["typed","equalScalar"],e=>{var{typed:n,equalScalar:i}=e;return n(Ta,{"any, any":function(r,a){return r===null?a!==null:a===null?r!==null:r===void 0?a!==void 0:a===void 0?r!==void 0:!i(r,a)}})});var qu="partitionSelect",Ey=["typed","isNumeric","isNaN","compare"],Cy=P(qu,Ey,e=>{var{typed:n,isNumeric:i,isNaN:t,compare:r}=e,a=r,c=(f,o)=>-r(f,o);return n(qu,{"Array | Matrix, number":function(o,s){return l(o,s,a)},"Array | Matrix, number, string":function(o,s,m){if(m==="asc")return l(o,s,a);if(m==="desc")return l(o,s,c);throw new Error('Compare string must be "asc" or "desc"')},"Array | Matrix, number, function":l});function l(f,o,s){if(!Se(o)||o<0)throw new Error("k must be a non-negative integer");if(Ce(f)){var m=f.size();if(m.length>1)throw new Error("Only one dimensional matrices supported");return u(f.valueOf(),o,s)}if(Array.isArray(f))return u(f,o,s)}function u(f,o,s){if(o>=f.length)throw new Error("k out of bounds");for(var m=0;m<f.length;m++)if(i(f[m])&&t(f[m]))return f[m];for(var h=0,p=f.length-1;h<p;){for(var g=h,y=p,w=f[Math.floor(Math.random()*(p-h+1))+h];g<y;)if(s(f[g],w)>=0){var A=f[y];f[y]=f[g],f[g]=A,--y}else++g;s(f[g],w)>0&&--g,o<=g?p=g:h=g+1}return f[o]}}),Ku="sort",By=["typed","matrix","compare","compareNatural"],Ly=P(Ku,By,e=>{var{typed:n,matrix:i,compare:t,compareNatural:r}=e,a=t,c=(o,s)=>-t(o,s);return n(Ku,{Array:function(s){return u(s),s.sort(a)},Matrix:function(s){return f(s),i(s.toArray().sort(a),s.storage())},"Array, function":function(s,m){return u(s),s.sort(m)},"Matrix, function":function(s,m){return f(s),i(s.toArray().sort(m),s.storage())},"Array, string":function(s,m){return u(s),s.sort(l(m))},"Matrix, string":function(s,m){return f(s),i(s.toArray().sort(l(m)),s.storage())}});function l(o){if(o==="asc")return a;if(o==="desc")return c;if(o==="natural")return r;throw new Error('String "asc", "desc", or "natural" expected')}function u(o){if(Re(o).length!==1)throw new Error("One dimensional array expected")}function f(o){if(o.size().length!==1)throw new Error("One dimensional matrix expected")}}),Uu="max",Dy=["typed","config","numeric","larger"],Dm=P(Uu,Dy,e=>{var{typed:n,config:i,numeric:t,larger:r}=e;return n(Uu,{"Array | Matrix":c,"Array | Matrix, number | BigNumber":function(u,f){return Fi(u,f.valueOf(),a)},"...":function(u){if(At(u))throw new TypeError("Scalar values expected in function max");return c(u)}});function a(l,u){try{return r(l,u)?l:u}catch(f){throw Er(f,"max",u)}}function c(l){var u;if(kn(l,function(f){try{isNaN(f)&&typeof f=="number"?u=NaN:(u===void 0||r(f,u))&&(u=f)}catch(o){throw Er(o,"max",f)}}),u===void 0)throw new Error("Cannot calculate max of an empty array");return typeof u=="string"&&(u=t(u,i.number)),u}}),Vu="min",Iy=["typed","config","numeric","smaller"],Im=P(Vu,Iy,e=>{var{typed:n,config:i,numeric:t,smaller:r}=e;return n(Vu,{"Array | Matrix":c,"Array | Matrix, number | BigNumber":function(u,f){return Fi(u,f.valueOf(),a)},"...":function(u){if(At(u))throw new TypeError("Scalar values expected in function min");return c(u)}});function a(l,u){try{return r(l,u)?l:u}catch(f){throw Er(f,"min",u)}}function c(l){var u;if(kn(l,function(f){try{isNaN(f)&&typeof f=="number"?u=NaN:(u===void 0||r(f,u))&&(u=f)}catch(o){throw Er(o,"min",f)}}),u===void 0)throw new Error("Cannot calculate min of an empty array");return typeof u=="string"&&(u=t(u,i.number)),u}}),Oy="ImmutableDenseMatrix",zy=["smaller","DenseMatrix"],Py=P(Oy,zy,e=>{var{smaller:n,DenseMatrix:i}=e;function t(r,a){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(a&&!Or(a))throw new Error("Invalid datatype: "+a);if(Ce(r)||Ze(r)){var c=new i(r,a);this._data=c._data,this._size=c._size,this._datatype=c._datatype,this._min=null,this._max=null}else if(r&&Ze(r.data)&&Ze(r.size))this._data=r.data,this._size=r.size,this._datatype=r.datatype,this._min=typeof r.min!="undefined"?r.min:null,this._max=typeof r.max!="undefined"?r.max:null;else{if(r)throw new TypeError("Unsupported type of data ("+je(r)+")");this._data=[],this._size=[0],this._datatype=a,this._min=null,this._max=null}}return t.prototype=new i,t.prototype.type="ImmutableDenseMatrix",t.prototype.isImmutableDenseMatrix=!0,t.prototype.subset=function(r){switch(arguments.length){case 1:{var a=i.prototype.subset.call(this,r);return Ce(a)?new t({data:a._data,size:a._size,datatype:a._datatype}):a}case 2:case 3:throw new Error("Cannot invoke set subset on an Immutable Matrix instance");default:throw new SyntaxError("Wrong number of arguments")}},t.prototype.set=function(){throw new Error("Cannot invoke set on an Immutable Matrix instance")},t.prototype.resize=function(){throw new Error("Cannot invoke resize on an Immutable Matrix instance")},t.prototype.reshape=function(){throw new Error("Cannot invoke reshape on an Immutable Matrix instance")},t.prototype.clone=function(){return new t({data:ke(this._data),size:ke(this._size),datatype:this._datatype})},t.prototype.toJSON=function(){return{mathjs:"ImmutableDenseMatrix",data:this._data,size:this._size,datatype:this._datatype}},t.fromJSON=function(r){return new t(r)},t.prototype.swapRows=function(){throw new Error("Cannot invoke swapRows on an Immutable Matrix instance")},t.prototype.min=function(){if(this._min===null){var r=null;this.forEach(function(a){(r===null||n(a,r))&&(r=a)}),this._min=r!==null?r:void 0}return this._min},t.prototype.max=function(){if(this._max===null){var r=null;this.forEach(function(a){(r===null||n(r,a))&&(r=a)}),this._max=r!==null?r:void 0}return this._max},t},{isClass:!0}),$y="Index",_y=["ImmutableDenseMatrix"],Fy=P($y,_y,e=>{var{ImmutableDenseMatrix:n}=e;function i(r){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");this._dimensions=[],this._isScalar=!0;for(var a=0,c=arguments.length;a<c;a++){var l=arguments[a];if(Bi(l))this._dimensions.push(l),this._isScalar=!1;else if(Array.isArray(l)||Ce(l)){var u=t(l.valueOf());this._dimensions.push(u);var f=u.size();(f.length!==1||f[0]!==1)&&(this._isScalar=!1)}else if(typeof l=="number")this._dimensions.push(t([l]));else if(typeof l=="string")this._dimensions.push(l);else throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range")}}i.prototype.type="Index",i.prototype.isIndex=!0;function t(r){for(var a=0,c=r.length;a<c;a++)if(typeof r[a]!="number"||!Se(r[a]))throw new TypeError("Index parameters must be positive integer numbers");return new n(r)}return i.prototype.clone=function(){var r=new i;return r._dimensions=ke(this._dimensions),r._isScalar=this._isScalar,r},i.create=function(r){var a=new i;return i.apply(a,r),a},i.prototype.size=function(){for(var r=[],a=0,c=this._dimensions.length;a<c;a++){var l=this._dimensions[a];r[a]=typeof l=="string"?1:l.size()[0]}return r},i.prototype.max=function(){for(var r=[],a=0,c=this._dimensions.length;a<c;a++){var l=this._dimensions[a];r[a]=typeof l=="string"?l:l.max()}return r},i.prototype.min=function(){for(var r=[],a=0,c=this._dimensions.length;a<c;a++){var l=this._dimensions[a];r[a]=typeof l=="string"?l:l.min()}return r},i.prototype.forEach=function(r){for(var a=0,c=this._dimensions.length;a<c;a++)r(this._dimensions[a],a,this)},i.prototype.dimension=function(r){return this._dimensions[r]||null},i.prototype.isObjectProperty=function(){return this._dimensions.length===1&&typeof this._dimensions[0]=="string"},i.prototype.getObjectProperty=function(){return this.isObjectProperty()?this._dimensions[0]:null},i.prototype.isScalar=function(){return this._isScalar},i.prototype.toArray=function(){for(var r=[],a=0,c=this._dimensions.length;a<c;a++){var l=this._dimensions[a];r.push(typeof l=="string"?l:l.toArray())}return r},i.prototype.valueOf=i.prototype.toArray,i.prototype.toString=function(){for(var r=[],a=0,c=this._dimensions.length;a<c;a++){var l=this._dimensions[a];typeof l=="string"?r.push(JSON.stringify(l)):r.push(l.toString())}return"["+r.join(", ")+"]"},i.prototype.toJSON=function(){return{mathjs:"Index",dimensions:this._dimensions}},i.fromJSON=function(r){return i.create(r.dimensions)},i},{isClass:!0}),Ry="FibonacciHeap",qy=["smaller","larger"],Ky=P(Ry,qy,e=>{var{smaller:n,larger:i}=e,t=1/Math.log((1+Math.sqrt(5))/2);function r(){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this._minimum=null,this._size=0}r.prototype.type="FibonacciHeap",r.prototype.isFibonacciHeap=!0,r.prototype.insert=function(o,s){var m={key:o,value:s,degree:0};if(this._minimum){var h=this._minimum;m.left=h,m.right=h.right,h.right=m,m.right.left=m,n(o,h.key)&&(this._minimum=m)}else m.left=m,m.right=m,this._minimum=m;return this._size++,m},r.prototype.size=function(){return this._size},r.prototype.clear=function(){this._minimum=null,this._size=0},r.prototype.isEmpty=function(){return this._size===0},r.prototype.extractMinimum=function(){var o=this._minimum;if(o===null)return o;for(var s=this._minimum,m=o.degree,h=o.child;m>0;){var p=h.right;h.left.right=h.right,h.right.left=h.left,h.left=s,h.right=s.right,s.right=h,h.right.left=h,h.parent=null,h=p,m--}return o.left.right=o.right,o.right.left=o.left,o===o.right?s=null:(s=o.right,s=f(s,this._size)),this._size--,this._minimum=s,o},r.prototype.remove=function(o){this._minimum=a(this._minimum,o,-1),this.extractMinimum()};function a(o,s,m){s.key=m;var h=s.parent;return h&&n(s.key,h.key)&&(c(o,s,h),l(o,h)),n(s.key,o.key)&&(o=s),o}function c(o,s,m){s.left.right=s.right,s.right.left=s.left,m.degree--,m.child===s&&(m.child=s.right),m.degree===0&&(m.child=null),s.left=o,s.right=o.right,o.right=s,s.right.left=s,s.parent=null,s.mark=!1}function l(o,s){var m=s.parent;!m||(s.mark?(c(o,s,m),l(m)):s.mark=!0)}var u=function(s,m){s.left.right=s.right,s.right.left=s.left,s.parent=m,m.child?(s.left=m.child,s.right=m.child.right,m.child.right=s,s.right.left=s):(m.child=s,s.right=s,s.left=s),m.degree++,s.mark=!1};function f(o,s){var m=Math.floor(Math.log(s)*t)+1,h=new Array(m),p=0,g=o;if(g)for(p++,g=g.right;g!==o;)p++,g=g.right;for(var y;p>0;){for(var w=g.degree,A=g.right;y=h[w],!!y;){if(i(g.key,y.key)){var v=y;y=g,g=v}u(y,g),h[w]=null,w++}h[w]=g,g=A,p--}o=null;for(var b=0;b<m;b++)y=h[b],y&&(o?(y.left.right=y.right,y.right.left=y.left,y.left=o,y.right=o.right,o.right=y,y.right.left=y,n(y.key,o.key)&&(o=y)):o=y);return o}return r},{isClass:!0}),Uy="Spa",Vy=["addScalar","equalScalar","FibonacciHeap"],Wy=P(Uy,Vy,e=>{var{addScalar:n,equalScalar:i,FibonacciHeap:t}=e;function r(){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");this._values=[],this._heap=new t}return r.prototype.type="Spa",r.prototype.isSpa=!0,r.prototype.set=function(a,c){if(this._values[a])this._values[a].value=c;else{var l=this._heap.insert(a,c);this._values[a]=l}},r.prototype.get=function(a){var c=this._values[a];return c?c.value:0},r.prototype.accumulate=function(a,c){var l=this._values[a];l?l.value=n(l.value,c):(l=this._heap.insert(a,c),this._values[a]=l)},r.prototype.forEach=function(a,c,l){var u=this._heap,f=this._values,o=[],s=u.extractMinimum();for(s&&o.push(s);s&&s.key<=c;)s.key>=a&&(i(s.value,0)||l(s.key,s.value,this)),s=u.extractMinimum(),s&&o.push(s);for(var m=0;m<o.length;m++){var h=o[m];s=u.insert(h.key,h.value),f[s.key]=s}},r.prototype.swap=function(a,c){var l=this._values[a],u=this._values[c];if(!l&&u)l=this._heap.insert(a,u.value),this._heap.remove(u),this._values[a]=l,this._values[c]=void 0;else if(l&&!u)u=this._heap.insert(c,l.value),this._heap.remove(l),this._values[c]=u,this._values[a]=void 0;else if(l&&u){var f=l.value;l.value=u.value,u.value=f}},r},{isClass:!0});function Om(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}var Gy=Gt(function(e){return new e(1).exp()},{hasher:Ui}),Hy=Gt(function(e){return new e(1).plus(new e(5).sqrt()).div(2)},{hasher:Ui}),Qa=Gt(function(e){return e.acos(-1)},{hasher:Ui}),Zy=Gt(function(e){return Qa(e).times(2)},{hasher:Ui});function Ui(e){return e[0].precision}function Wu(e,n){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),i.push.apply(i,t)}return i}function fa(e){for(var n=1;n<arguments.length;n++){var i=arguments[n]!=null?arguments[n]:{};n%2?Wu(Object(i),!0).forEach(function(t){Om(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):Wu(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}var Xy="Unit",Yy=["?on","config","addScalar","subtract","multiplyScalar","divideScalar","pow","abs","fix","round","equal","isNumeric","format","number","Complex","BigNumber","Fraction"],Jy=P(Xy,Yy,e=>{var{on:n,config:i,addScalar:t,subtract:r,multiplyScalar:a,divideScalar:c,pow:l,abs:u,fix:f,round:o,equal:s,isNumeric:m,format:h,number:p,Complex:g,BigNumber:y,Fraction:w}=e,A=p;function v($,Z){if(!(this instanceof v))throw new Error("Constructor must be called with the new operator");if(!($==null||m($)||Mn($)))throw new TypeError("First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined");if(Z!==void 0&&(typeof Z!="string"||Z===""))throw new TypeError("Second parameter in Unit constructor must be a string");if(Z!==void 0){var K=v.parse(Z);this.units=K.units,this.dimensions=K.dimensions}else{this.units=[{unit:j,prefix:L.NONE,power:0}],this.dimensions=[];for(var R=0;R<V.length;R++)this.dimensions[R]=0}this.value=$!=null?this._normalize($):null,this.fixPrefix=!1,this.skipAutomaticSimplification=!0}v.prototype.type="Unit",v.prototype.isUnit=!0;var b,x,d;function M(){for(;d===" "||d==="	";)N()}function S($){return $>="0"&&$<="9"||$==="."}function T($){return $>="0"&&$<="9"}function N(){x++,d=b.charAt(x)}function D($){x=$,d=b.charAt(x)}function k(){var $="",Z=x;if(d==="+"?N():d==="-"&&($+=d,N()),!S(d))return D(Z),null;if(d==="."){if($+=d,N(),!T(d))return D(Z),null}else{for(;T(d);)$+=d,N();d==="."&&($+=d,N())}for(;T(d);)$+=d,N();if(d==="E"||d==="e"){var K="",R=x;if(K+=d,N(),(d==="+"||d==="-")&&(K+=d,N()),!T(d))return D(R),$;for($=$+K;T(d);)$+=d,N()}return $}function I(){for(var $="";T(d)||v.isValidAlpha(d);)$+=d,N();var Z=$.charAt(0);return v.isValidAlpha(Z)?$:null}function _($){return d===$?(N(),$):null}v.parse=function($,Z){if(Z=Z||{},b=$,x=-1,d="",typeof b!="string")throw new TypeError("Invalid argument in Unit.parse, string expected");var K=new v;K.units=[];var R=1,Y=!1;N(),M();var z=k(),F=null;if(z){if(i.number==="BigNumber")F=new y(z);else if(i.number==="Fraction")try{F=new w(z)}catch{F=parseFloat(z)}else F=parseFloat(z);M(),_("*")?(R=1,Y=!0):_("/")&&(R=-1,Y=!0)}for(var J=[],q=1;;){for(M();d==="(";)J.push(R),q*=R,R=1,N(),M();var oe=void 0;if(d){var le=d;if(oe=I(),oe===null)throw new SyntaxError('Unexpected "'+le+'" in "'+b+'" at index '+x.toString())}else break;var ve=O(oe);if(ve===null)throw new SyntaxError('Unit "'+oe+'" not found.');var he=R*q;if(M(),_("^")){M();var pe=k();if(pe===null)throw new SyntaxError('In "'+$+'", "^" must be followed by a floating-point number');he*=pe}K.units.push({unit:ve.unit,prefix:ve.prefix,power:he});for(var Ae=0;Ae<V.length;Ae++)K.dimensions[Ae]+=(ve.unit.dimensions[Ae]||0)*he;for(M();d===")";){if(J.length===0)throw new SyntaxError('Unmatched ")" in "'+b+'" at index '+x.toString());q/=J.pop(),N(),M()}if(Y=!1,_("*")?(R=1,Y=!0):_("/")?(R=-1,Y=!0):R=1,ve.unit.base){var Xe=ve.unit.base.key;re.auto[Xe]={unit:ve.unit,prefix:ve.prefix}}}if(M(),d)throw new SyntaxError('Could not parse: "'+$+'"');if(Y)throw new SyntaxError('Trailing characters: "'+$+'"');if(J.length!==0)throw new SyntaxError('Unmatched "(" in "'+b+'"');if(K.units.length===0&&!Z.allowNoUnits)throw new SyntaxError('"'+$+'" contains no units');return K.value=F!==void 0?K._normalize(F):null,K},v.prototype.clone=function(){var $=new v;$.fixPrefix=this.fixPrefix,$.skipAutomaticSimplification=this.skipAutomaticSimplification,$.value=ke(this.value),$.dimensions=this.dimensions.slice(0),$.units=[];for(var Z=0;Z<this.units.length;Z++){$.units[Z]={};for(var K in this.units[Z])Ne(this.units[Z],K)&&($.units[Z][K]=this.units[Z][K])}return $},v.prototype._isDerived=function(){return this.units.length===0?!1:this.units.length>1||Math.abs(this.units[0].power-1)>1e-15},v.prototype._normalize=function($){if($==null||this.units.length===0)return $;for(var Z=$,K=v._getNumberConverter(je($)),R=0;R<this.units.length;R++){var Y=K(this.units[R].unit.value),z=K(this.units[R].prefix.value),F=K(this.units[R].power);Z=a(Z,l(a(Y,z),F))}return Z},v.prototype._denormalize=function($,Z){if($==null||this.units.length===0)return $;for(var K=$,R=v._getNumberConverter(je($)),Y=0;Y<this.units.length;Y++){var z=R(this.units[Y].unit.value),F=R(this.units[Y].prefix.value),J=R(this.units[Y].power);K=c(K,l(a(z,F),J))}return K};var O=Gt($=>{if(Ne(W,$)){var Z=W[$],K=Z.prefixes[""];return{unit:Z,prefix:K}}for(var R in W)if(Ne(W,R)&&lg($,R)){var Y=W[R],z=$.length-R.length,F=$.substring(0,z),J=Ne(Y.prefixes,F)?Y.prefixes[F]:void 0;if(J!==void 0)return{unit:Y,prefix:J}}return null},{hasher:$=>$[0],limit:100});v.isValuelessUnit=function($){return O($)!==null},v.prototype.hasBase=function($){if(typeof $=="string"&&($=C[$]),!$)return!1;for(var Z=0;Z<V.length;Z++)if(Math.abs((this.dimensions[Z]||0)-($.dimensions[Z]||0))>1e-12)return!1;return!0},v.prototype.equalBase=function($){for(var Z=0;Z<V.length;Z++)if(Math.abs((this.dimensions[Z]||0)-($.dimensions[Z]||0))>1e-12)return!1;return!0},v.prototype.equals=function($){return this.equalBase($)&&s(this.value,$.value)},v.prototype.multiply=function($){for(var Z=this.clone(),K=0;K<V.length;K++)Z.dimensions[K]=(this.dimensions[K]||0)+($.dimensions[K]||0);for(var R=0;R<$.units.length;R++){var Y=fa({},$.units[R]);Z.units.push(Y)}if(this.value!==null||$.value!==null){var z=this.value===null?this._normalize(1):this.value,F=$.value===null?$._normalize(1):$.value;Z.value=a(z,F)}else Z.value=null;return Z.skipAutomaticSimplification=!1,B(Z)},v.prototype.divide=function($){for(var Z=this.clone(),K=0;K<V.length;K++)Z.dimensions[K]=(this.dimensions[K]||0)-($.dimensions[K]||0);for(var R=0;R<$.units.length;R++){var Y=fa(fa({},$.units[R]),{},{power:-$.units[R].power});Z.units.push(Y)}if(this.value!==null||$.value!==null){var z=this.value===null?this._normalize(1):this.value,F=$.value===null?$._normalize(1):$.value;Z.value=c(z,F)}else Z.value=null;return Z.skipAutomaticSimplification=!1,B(Z)},v.prototype.pow=function($){for(var Z=this.clone(),K=0;K<V.length;K++)Z.dimensions[K]=(this.dimensions[K]||0)*$;for(var R=0;R<Z.units.length;R++)Z.units[R].power*=$;return Z.value!==null?Z.value=l(Z.value,$):Z.value=null,Z.skipAutomaticSimplification=!1,B(Z)};function B($){return $.equalBase(C.NONE)&&$.value!==null&&!i.predictable?$.value:$}v.prototype.abs=function(){var $=this.clone();if($.value!==null)if($._isDerived()||$.units[0].unit.offset===0)$.value=u($.value);else{var Z=v._getNumberConverter(je($.value)),K=Z($.units[0].unit.value),R=Z($.units[0].unit.offset),Y=a(K,R);$.value=r(u(t($.value,Y)),Y)}for(var z in $.units)($.units[z].unit.name==="VA"||$.units[z].unit.name==="VAR")&&($.units[z].unit=W.W);return $},v.prototype.to=function($){var Z=this.value===null?this._normalize(1):this.value,K;if(typeof $=="string")K=v.parse($);else if(Kt($))K=$.clone();else throw new Error("String or Unit expected as parameter");if(!this.equalBase(K))throw new Error("Units do not match ('".concat(K.toString(),"' != '").concat(this.toString(),"')"));if(K.value!==null)throw new Error("Cannot convert to a unit with a value");if(this.value===null||this._isDerived()||this.units[0].unit.offset===K.units[0].unit.offset)K.value=ke(Z);else{var R=v._getNumberConverter(je(Z)),Y=R(this.units[0].unit.value),z=R(this.units[0].unit.offset),F=a(Y,z),J=R(K.units[0].unit.value),q=R(K.units[0].unit.offset),oe=a(J,q);K.value=r(t(Z,F),oe)}return K.fixPrefix=!0,K.skipAutomaticSimplification=!0,K},v.prototype.toNumber=function($){return A(this.toNumeric($))},v.prototype.toNumeric=function($){var Z;return $?Z=this.to($):Z=this.clone(),Z._isDerived()||Z.units.length===0?Z._denormalize(Z.value):Z._denormalize(Z.value,Z.units[0].prefix.value)},v.prototype.toString=function(){return this.format()},v.prototype.toJSON=function(){return{mathjs:"Unit",value:this._denormalize(this.value),unit:this.formatUnits(),fixPrefix:this.fixPrefix}},v.fromJSON=function($){var Z=new v($.value,$.unit);return Z.fixPrefix=$.fixPrefix||!1,Z},v.prototype.valueOf=v.prototype.toString,v.prototype.simplify=function(){var $=this.clone(),Z=[],K;for(var R in ae)if(Ne(ae,R)&&$.hasBase(C[R])){K=R;break}if(K==="NONE")$.units=[];else{var Y;if(K&&Ne(ae,K)&&(Y=ae[K]),Y)$.units=[{unit:Y.unit,prefix:Y.prefix,power:1}];else{for(var z=!1,F=0;F<V.length;F++){var J=V[F];Math.abs($.dimensions[F]||0)>1e-12&&(Ne(ae,J)?Z.push({unit:ae[J].unit,prefix:ae[J].prefix,power:$.dimensions[F]||0}):z=!0)}Z.length<$.units.length&&!z&&($.units=Z)}}return $},v.prototype.toSI=function(){for(var $=this.clone(),Z=[],K=0;K<V.length;K++){var R=V[K];if(Math.abs($.dimensions[K]||0)>1e-12)if(Ne(re.si,R))Z.push({unit:re.si[R].unit,prefix:re.si[R].prefix,power:$.dimensions[K]||0});else throw new Error("Cannot express custom unit "+R+" in SI units")}return $.units=Z,$.fixPrefix=!0,$.skipAutomaticSimplification=!0,$},v.prototype.formatUnits=function(){for(var $="",Z="",K=0,R=0,Y=0;Y<this.units.length;Y++)this.units[Y].power>0?(K++,$+=" "+this.units[Y].prefix.name+this.units[Y].unit.name,Math.abs(this.units[Y].power-1)>1e-15&&($+="^"+this.units[Y].power)):this.units[Y].power<0&&R++;if(R>0)for(var z=0;z<this.units.length;z++)this.units[z].power<0&&(K>0?(Z+=" "+this.units[z].prefix.name+this.units[z].unit.name,Math.abs(this.units[z].power+1)>1e-15&&(Z+="^"+-this.units[z].power)):(Z+=" "+this.units[z].prefix.name+this.units[z].unit.name,Z+="^"+this.units[z].power));$=$.substr(1),Z=Z.substr(1),K>1&&R>0&&($="("+$+")"),R>1&&K>0&&(Z="("+Z+")");var F=$;return K>0&&R>0&&(F+=" / "),F+=Z,F},v.prototype.format=function($){var Z=this.skipAutomaticSimplification||this.value===null?this.clone():this.simplify(),K=!1;typeof Z.value!="undefined"&&Z.value!==null&&Mn(Z.value)&&(K=Math.abs(Z.value.re)<1e-14);for(var R in Z.units)Ne(Z.units,R)&&Z.units[R].unit&&(Z.units[R].unit.name==="VA"&&K?Z.units[R].unit=W.VAR:Z.units[R].unit.name==="VAR"&&!K&&(Z.units[R].unit=W.VA));Z.units.length===1&&!Z.fixPrefix&&Math.abs(Z.units[0].power-Math.round(Z.units[0].power))<1e-14&&(Z.units[0].prefix=Z._bestPrefix());var Y=Z._denormalize(Z.value),z=Z.value!==null?h(Y,$||{}):"",F=Z.formatUnits();return Z.value&&Mn(Z.value)&&(z="("+z+")"),F.length>0&&z.length>0&&(z+=" "),z+=F,z},v.prototype._bestPrefix=function(){if(this.units.length!==1)throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");if(Math.abs(this.units[0].power-Math.round(this.units[0].power))>=1e-14)throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");var $=this.value!==null?u(this.value):0,Z=u(this.units[0].unit.value),K=this.units[0].prefix;if($===0)return K;var R=this.units[0].power,Y=Math.log($/Math.pow(K.value*Z,R))/Math.LN10-1.2;if(Y>-2.200001&&Y<1.800001)return K;Y=Math.abs(Y);var z=this.units[0].unit.prefixes;for(var F in z)if(Ne(z,F)){var J=z[F];if(J.scientific){var q=Math.abs(Math.log($/Math.pow(J.value*Z,R))/Math.LN10-1.2);(q<Y||q===Y&&J.name.length<K.name.length)&&(K=J,Y=q)}}return K},v.prototype.splitUnit=function($){for(var Z=this.clone(),K=[],R=0;R<$.length&&(Z=Z.to($[R]),R!==$.length-1);R++){var Y=Z.toNumeric(),z=o(Y),F=void 0,J=s(z,Y);J?F=z:F=f(Z.toNumeric());var q=new v(F,$[R].toString());K.push(q),Z=r(Z,q)}for(var oe=0,le=0;le<K.length;le++)oe=t(oe,K[le].value);return s(oe,this.value)&&(Z.value=0),K.push(Z),K};var L={NONE:{"":{name:"",value:1,scientific:!0}},SHORT:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:10,scientific:!1},h:{name:"h",value:100,scientific:!1},k:{name:"k",value:1e3,scientific:!0},M:{name:"M",value:1e6,scientific:!0},G:{name:"G",value:1e9,scientific:!0},T:{name:"T",value:1e12,scientific:!0},P:{name:"P",value:1e15,scientific:!0},E:{name:"E",value:1e18,scientific:!0},Z:{name:"Z",value:1e21,scientific:!0},Y:{name:"Y",value:1e24,scientific:!0},d:{name:"d",value:.1,scientific:!1},c:{name:"c",value:.01,scientific:!1},m:{name:"m",value:.001,scientific:!0},u:{name:"u",value:1e-6,scientific:!0},n:{name:"n",value:1e-9,scientific:!0},p:{name:"p",value:1e-12,scientific:!0},f:{name:"f",value:1e-15,scientific:!0},a:{name:"a",value:1e-18,scientific:!0},z:{name:"z",value:1e-21,scientific:!0},y:{name:"y",value:1e-24,scientific:!0}},LONG:{"":{name:"",value:1,scientific:!0},deca:{name:"deca",value:10,scientific:!1},hecto:{name:"hecto",value:100,scientific:!1},kilo:{name:"kilo",value:1e3,scientific:!0},mega:{name:"mega",value:1e6,scientific:!0},giga:{name:"giga",value:1e9,scientific:!0},tera:{name:"tera",value:1e12,scientific:!0},peta:{name:"peta",value:1e15,scientific:!0},exa:{name:"exa",value:1e18,scientific:!0},zetta:{name:"zetta",value:1e21,scientific:!0},yotta:{name:"yotta",value:1e24,scientific:!0},deci:{name:"deci",value:.1,scientific:!1},centi:{name:"centi",value:.01,scientific:!1},milli:{name:"milli",value:.001,scientific:!0},micro:{name:"micro",value:1e-6,scientific:!0},nano:{name:"nano",value:1e-9,scientific:!0},pico:{name:"pico",value:1e-12,scientific:!0},femto:{name:"femto",value:1e-15,scientific:!0},atto:{name:"atto",value:1e-18,scientific:!0},zepto:{name:"zepto",value:1e-21,scientific:!0},yocto:{name:"yocto",value:1e-24,scientific:!0}},SQUARED:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:100,scientific:!1},h:{name:"h",value:1e4,scientific:!1},k:{name:"k",value:1e6,scientific:!0},M:{name:"M",value:1e12,scientific:!0},G:{name:"G",value:1e18,scientific:!0},T:{name:"T",value:1e24,scientific:!0},P:{name:"P",value:1e30,scientific:!0},E:{name:"E",value:1e36,scientific:!0},Z:{name:"Z",value:1e42,scientific:!0},Y:{name:"Y",value:1e48,scientific:!0},d:{name:"d",value:.01,scientific:!1},c:{name:"c",value:1e-4,scientific:!1},m:{name:"m",value:1e-6,scientific:!0},u:{name:"u",value:1e-12,scientific:!0},n:{name:"n",value:1e-18,scientific:!0},p:{name:"p",value:1e-24,scientific:!0},f:{name:"f",value:1e-30,scientific:!0},a:{name:"a",value:1e-36,scientific:!0},z:{name:"z",value:1e-42,scientific:!0},y:{name:"y",value:1e-48,scientific:!0}},CUBIC:{"":{name:"",value:1,scientific:!0},da:{name:"da",value:1e3,scientific:!1},h:{name:"h",value:1e6,scientific:!1},k:{name:"k",value:1e9,scientific:!0},M:{name:"M",value:1e18,scientific:!0},G:{name:"G",value:1e27,scientific:!0},T:{name:"T",value:1e36,scientific:!0},P:{name:"P",value:1e45,scientific:!0},E:{name:"E",value:1e54,scientific:!0},Z:{name:"Z",value:1e63,scientific:!0},Y:{name:"Y",value:1e72,scientific:!0},d:{name:"d",value:.001,scientific:!1},c:{name:"c",value:1e-6,scientific:!1},m:{name:"m",value:1e-9,scientific:!0},u:{name:"u",value:1e-18,scientific:!0},n:{name:"n",value:1e-27,scientific:!0},p:{name:"p",value:1e-36,scientific:!0},f:{name:"f",value:1e-45,scientific:!0},a:{name:"a",value:1e-54,scientific:!0},z:{name:"z",value:1e-63,scientific:!0},y:{name:"y",value:1e-72,scientific:!0}},BINARY_SHORT_SI:{"":{name:"",value:1,scientific:!0},k:{name:"k",value:1e3,scientific:!0},M:{name:"M",value:1e6,scientific:!0},G:{name:"G",value:1e9,scientific:!0},T:{name:"T",value:1e12,scientific:!0},P:{name:"P",value:1e15,scientific:!0},E:{name:"E",value:1e18,scientific:!0},Z:{name:"Z",value:1e21,scientific:!0},Y:{name:"Y",value:1e24,scientific:!0}},BINARY_SHORT_IEC:{"":{name:"",value:1,scientific:!0},Ki:{name:"Ki",value:1024,scientific:!0},Mi:{name:"Mi",value:Math.pow(1024,2),scientific:!0},Gi:{name:"Gi",value:Math.pow(1024,3),scientific:!0},Ti:{name:"Ti",value:Math.pow(1024,4),scientific:!0},Pi:{name:"Pi",value:Math.pow(1024,5),scientific:!0},Ei:{name:"Ei",value:Math.pow(1024,6),scientific:!0},Zi:{name:"Zi",value:Math.pow(1024,7),scientific:!0},Yi:{name:"Yi",value:Math.pow(1024,8),scientific:!0}},BINARY_LONG_SI:{"":{name:"",value:1,scientific:!0},kilo:{name:"kilo",value:1e3,scientific:!0},mega:{name:"mega",value:1e6,scientific:!0},giga:{name:"giga",value:1e9,scientific:!0},tera:{name:"tera",value:1e12,scientific:!0},peta:{name:"peta",value:1e15,scientific:!0},exa:{name:"exa",value:1e18,scientific:!0},zetta:{name:"zetta",value:1e21,scientific:!0},yotta:{name:"yotta",value:1e24,scientific:!0}},BINARY_LONG_IEC:{"":{name:"",value:1,scientific:!0},kibi:{name:"kibi",value:1024,scientific:!0},mebi:{name:"mebi",value:Math.pow(1024,2),scientific:!0},gibi:{name:"gibi",value:Math.pow(1024,3),scientific:!0},tebi:{name:"tebi",value:Math.pow(1024,4),scientific:!0},pebi:{name:"pebi",value:Math.pow(1024,5),scientific:!0},exi:{name:"exi",value:Math.pow(1024,6),scientific:!0},zebi:{name:"zebi",value:Math.pow(1024,7),scientific:!0},yobi:{name:"yobi",value:Math.pow(1024,8),scientific:!0}},BTU:{"":{name:"",value:1,scientific:!0},MM:{name:"MM",value:1e6,scientific:!0}}};L.SHORTLONG=wr({},L.SHORT,L.LONG),L.BINARY_SHORT=wr({},L.BINARY_SHORT_SI,L.BINARY_SHORT_IEC),L.BINARY_LONG=wr({},L.BINARY_LONG_SI,L.BINARY_LONG_IEC);var V=["MASS","LENGTH","TIME","CURRENT","TEMPERATURE","LUMINOUS_INTENSITY","AMOUNT_OF_SUBSTANCE","ANGLE","BIT"],C={NONE:{dimensions:[0,0,0,0,0,0,0,0,0]},MASS:{dimensions:[1,0,0,0,0,0,0,0,0]},LENGTH:{dimensions:[0,1,0,0,0,0,0,0,0]},TIME:{dimensions:[0,0,1,0,0,0,0,0,0]},CURRENT:{dimensions:[0,0,0,1,0,0,0,0,0]},TEMPERATURE:{dimensions:[0,0,0,0,1,0,0,0,0]},LUMINOUS_INTENSITY:{dimensions:[0,0,0,0,0,1,0,0,0]},AMOUNT_OF_SUBSTANCE:{dimensions:[0,0,0,0,0,0,1,0,0]},FORCE:{dimensions:[1,1,-2,0,0,0,0,0,0]},SURFACE:{dimensions:[0,2,0,0,0,0,0,0,0]},VOLUME:{dimensions:[0,3,0,0,0,0,0,0,0]},ENERGY:{dimensions:[1,2,-2,0,0,0,0,0,0]},POWER:{dimensions:[1,2,-3,0,0,0,0,0,0]},PRESSURE:{dimensions:[1,-1,-2,0,0,0,0,0,0]},ELECTRIC_CHARGE:{dimensions:[0,0,1,1,0,0,0,0,0]},ELECTRIC_CAPACITANCE:{dimensions:[-1,-2,4,2,0,0,0,0,0]},ELECTRIC_POTENTIAL:{dimensions:[1,2,-3,-1,0,0,0,0,0]},ELECTRIC_RESISTANCE:{dimensions:[1,2,-3,-2,0,0,0,0,0]},ELECTRIC_INDUCTANCE:{dimensions:[1,2,-2,-2,0,0,0,0,0]},ELECTRIC_CONDUCTANCE:{dimensions:[-1,-2,3,2,0,0,0,0,0]},MAGNETIC_FLUX:{dimensions:[1,2,-2,-1,0,0,0,0,0]},MAGNETIC_FLUX_DENSITY:{dimensions:[1,0,-2,-1,0,0,0,0,0]},FREQUENCY:{dimensions:[0,0,-1,0,0,0,0,0,0]},ANGLE:{dimensions:[0,0,0,0,0,0,0,1,0]},BIT:{dimensions:[0,0,0,0,0,0,0,0,1]}};for(var U in C)Ne(C,U)&&(C[U].key=U);var X={},j={name:"",base:X,value:1,offset:0,dimensions:V.map($=>0)},W={meter:{name:"meter",base:C.LENGTH,prefixes:L.LONG,value:1,offset:0},inch:{name:"inch",base:C.LENGTH,prefixes:L.NONE,value:.0254,offset:0},foot:{name:"foot",base:C.LENGTH,prefixes:L.NONE,value:.3048,offset:0},yard:{name:"yard",base:C.LENGTH,prefixes:L.NONE,value:.9144,offset:0},mile:{name:"mile",base:C.LENGTH,prefixes:L.NONE,value:1609.344,offset:0},link:{name:"link",base:C.LENGTH,prefixes:L.NONE,value:.201168,offset:0},rod:{name:"rod",base:C.LENGTH,prefixes:L.NONE,value:5.0292,offset:0},chain:{name:"chain",base:C.LENGTH,prefixes:L.NONE,value:20.1168,offset:0},angstrom:{name:"angstrom",base:C.LENGTH,prefixes:L.NONE,value:1e-10,offset:0},m:{name:"m",base:C.LENGTH,prefixes:L.SHORT,value:1,offset:0},in:{name:"in",base:C.LENGTH,prefixes:L.NONE,value:.0254,offset:0},ft:{name:"ft",base:C.LENGTH,prefixes:L.NONE,value:.3048,offset:0},yd:{name:"yd",base:C.LENGTH,prefixes:L.NONE,value:.9144,offset:0},mi:{name:"mi",base:C.LENGTH,prefixes:L.NONE,value:1609.344,offset:0},li:{name:"li",base:C.LENGTH,prefixes:L.NONE,value:.201168,offset:0},rd:{name:"rd",base:C.LENGTH,prefixes:L.NONE,value:5.02921,offset:0},ch:{name:"ch",base:C.LENGTH,prefixes:L.NONE,value:20.1168,offset:0},mil:{name:"mil",base:C.LENGTH,prefixes:L.NONE,value:254e-7,offset:0},m2:{name:"m2",base:C.SURFACE,prefixes:L.SQUARED,value:1,offset:0},sqin:{name:"sqin",base:C.SURFACE,prefixes:L.NONE,value:64516e-8,offset:0},sqft:{name:"sqft",base:C.SURFACE,prefixes:L.NONE,value:.09290304,offset:0},sqyd:{name:"sqyd",base:C.SURFACE,prefixes:L.NONE,value:.83612736,offset:0},sqmi:{name:"sqmi",base:C.SURFACE,prefixes:L.NONE,value:2589988110336e-6,offset:0},sqrd:{name:"sqrd",base:C.SURFACE,prefixes:L.NONE,value:25.29295,offset:0},sqch:{name:"sqch",base:C.SURFACE,prefixes:L.NONE,value:404.6873,offset:0},sqmil:{name:"sqmil",base:C.SURFACE,prefixes:L.NONE,value:64516e-14,offset:0},acre:{name:"acre",base:C.SURFACE,prefixes:L.NONE,value:4046.86,offset:0},hectare:{name:"hectare",base:C.SURFACE,prefixes:L.NONE,value:1e4,offset:0},m3:{name:"m3",base:C.VOLUME,prefixes:L.CUBIC,value:1,offset:0},L:{name:"L",base:C.VOLUME,prefixes:L.SHORT,value:.001,offset:0},l:{name:"l",base:C.VOLUME,prefixes:L.SHORT,value:.001,offset:0},litre:{name:"litre",base:C.VOLUME,prefixes:L.LONG,value:.001,offset:0},cuin:{name:"cuin",base:C.VOLUME,prefixes:L.NONE,value:16387064e-12,offset:0},cuft:{name:"cuft",base:C.VOLUME,prefixes:L.NONE,value:.028316846592,offset:0},cuyd:{name:"cuyd",base:C.VOLUME,prefixes:L.NONE,value:.764554857984,offset:0},teaspoon:{name:"teaspoon",base:C.VOLUME,prefixes:L.NONE,value:5e-6,offset:0},tablespoon:{name:"tablespoon",base:C.VOLUME,prefixes:L.NONE,value:15e-6,offset:0},drop:{name:"drop",base:C.VOLUME,prefixes:L.NONE,value:5e-8,offset:0},gtt:{name:"gtt",base:C.VOLUME,prefixes:L.NONE,value:5e-8,offset:0},minim:{name:"minim",base:C.VOLUME,prefixes:L.NONE,value:6161152e-14,offset:0},fluiddram:{name:"fluiddram",base:C.VOLUME,prefixes:L.NONE,value:36966911e-13,offset:0},fluidounce:{name:"fluidounce",base:C.VOLUME,prefixes:L.NONE,value:2957353e-11,offset:0},gill:{name:"gill",base:C.VOLUME,prefixes:L.NONE,value:.0001182941,offset:0},cc:{name:"cc",base:C.VOLUME,prefixes:L.NONE,value:1e-6,offset:0},cup:{name:"cup",base:C.VOLUME,prefixes:L.NONE,value:.0002365882,offset:0},pint:{name:"pint",base:C.VOLUME,prefixes:L.NONE,value:.0004731765,offset:0},quart:{name:"quart",base:C.VOLUME,prefixes:L.NONE,value:.0009463529,offset:0},gallon:{name:"gallon",base:C.VOLUME,prefixes:L.NONE,value:.003785412,offset:0},beerbarrel:{name:"beerbarrel",base:C.VOLUME,prefixes:L.NONE,value:.1173478,offset:0},oilbarrel:{name:"oilbarrel",base:C.VOLUME,prefixes:L.NONE,value:.1589873,offset:0},hogshead:{name:"hogshead",base:C.VOLUME,prefixes:L.NONE,value:.238481,offset:0},fldr:{name:"fldr",base:C.VOLUME,prefixes:L.NONE,value:36966911e-13,offset:0},floz:{name:"floz",base:C.VOLUME,prefixes:L.NONE,value:2957353e-11,offset:0},gi:{name:"gi",base:C.VOLUME,prefixes:L.NONE,value:.0001182941,offset:0},cp:{name:"cp",base:C.VOLUME,prefixes:L.NONE,value:.0002365882,offset:0},pt:{name:"pt",base:C.VOLUME,prefixes:L.NONE,value:.0004731765,offset:0},qt:{name:"qt",base:C.VOLUME,prefixes:L.NONE,value:.0009463529,offset:0},gal:{name:"gal",base:C.VOLUME,prefixes:L.NONE,value:.003785412,offset:0},bbl:{name:"bbl",base:C.VOLUME,prefixes:L.NONE,value:.1173478,offset:0},obl:{name:"obl",base:C.VOLUME,prefixes:L.NONE,value:.1589873,offset:0},g:{name:"g",base:C.MASS,prefixes:L.SHORT,value:.001,offset:0},gram:{name:"gram",base:C.MASS,prefixes:L.LONG,value:.001,offset:0},ton:{name:"ton",base:C.MASS,prefixes:L.SHORT,value:907.18474,offset:0},t:{name:"t",base:C.MASS,prefixes:L.SHORT,value:1e3,offset:0},tonne:{name:"tonne",base:C.MASS,prefixes:L.LONG,value:1e3,offset:0},grain:{name:"grain",base:C.MASS,prefixes:L.NONE,value:6479891e-11,offset:0},dram:{name:"dram",base:C.MASS,prefixes:L.NONE,value:.0017718451953125,offset:0},ounce:{name:"ounce",base:C.MASS,prefixes:L.NONE,value:.028349523125,offset:0},poundmass:{name:"poundmass",base:C.MASS,prefixes:L.NONE,value:.45359237,offset:0},hundredweight:{name:"hundredweight",base:C.MASS,prefixes:L.NONE,value:45.359237,offset:0},stick:{name:"stick",base:C.MASS,prefixes:L.NONE,value:.115,offset:0},stone:{name:"stone",base:C.MASS,prefixes:L.NONE,value:6.35029318,offset:0},gr:{name:"gr",base:C.MASS,prefixes:L.NONE,value:6479891e-11,offset:0},dr:{name:"dr",base:C.MASS,prefixes:L.NONE,value:.0017718451953125,offset:0},oz:{name:"oz",base:C.MASS,prefixes:L.NONE,value:.028349523125,offset:0},lbm:{name:"lbm",base:C.MASS,prefixes:L.NONE,value:.45359237,offset:0},cwt:{name:"cwt",base:C.MASS,prefixes:L.NONE,value:45.359237,offset:0},s:{name:"s",base:C.TIME,prefixes:L.SHORT,value:1,offset:0},min:{name:"min",base:C.TIME,prefixes:L.NONE,value:60,offset:0},h:{name:"h",base:C.TIME,prefixes:L.NONE,value:3600,offset:0},second:{name:"second",base:C.TIME,prefixes:L.LONG,value:1,offset:0},sec:{name:"sec",base:C.TIME,prefixes:L.LONG,value:1,offset:0},minute:{name:"minute",base:C.TIME,prefixes:L.NONE,value:60,offset:0},hour:{name:"hour",base:C.TIME,prefixes:L.NONE,value:3600,offset:0},day:{name:"day",base:C.TIME,prefixes:L.NONE,value:86400,offset:0},week:{name:"week",base:C.TIME,prefixes:L.NONE,value:7*86400,offset:0},month:{name:"month",base:C.TIME,prefixes:L.NONE,value:2629800,offset:0},year:{name:"year",base:C.TIME,prefixes:L.NONE,value:31557600,offset:0},decade:{name:"decade",base:C.TIME,prefixes:L.NONE,value:315576e3,offset:0},century:{name:"century",base:C.TIME,prefixes:L.NONE,value:315576e4,offset:0},millennium:{name:"millennium",base:C.TIME,prefixes:L.NONE,value:315576e5,offset:0},hertz:{name:"Hertz",base:C.FREQUENCY,prefixes:L.LONG,value:1,offset:0,reciprocal:!0},Hz:{name:"Hz",base:C.FREQUENCY,prefixes:L.SHORT,value:1,offset:0,reciprocal:!0},rad:{name:"rad",base:C.ANGLE,prefixes:L.SHORT,value:1,offset:0},radian:{name:"radian",base:C.ANGLE,prefixes:L.LONG,value:1,offset:0},deg:{name:"deg",base:C.ANGLE,prefixes:L.SHORT,value:null,offset:0},degree:{name:"degree",base:C.ANGLE,prefixes:L.LONG,value:null,offset:0},grad:{name:"grad",base:C.ANGLE,prefixes:L.SHORT,value:null,offset:0},gradian:{name:"gradian",base:C.ANGLE,prefixes:L.LONG,value:null,offset:0},cycle:{name:"cycle",base:C.ANGLE,prefixes:L.NONE,value:null,offset:0},arcsec:{name:"arcsec",base:C.ANGLE,prefixes:L.NONE,value:null,offset:0},arcmin:{name:"arcmin",base:C.ANGLE,prefixes:L.NONE,value:null,offset:0},A:{name:"A",base:C.CURRENT,prefixes:L.SHORT,value:1,offset:0},ampere:{name:"ampere",base:C.CURRENT,prefixes:L.LONG,value:1,offset:0},K:{name:"K",base:C.TEMPERATURE,prefixes:L.NONE,value:1,offset:0},degC:{name:"degC",base:C.TEMPERATURE,prefixes:L.NONE,value:1,offset:273.15},degF:{name:"degF",base:C.TEMPERATURE,prefixes:L.NONE,value:1/1.8,offset:459.67},degR:{name:"degR",base:C.TEMPERATURE,prefixes:L.NONE,value:1/1.8,offset:0},kelvin:{name:"kelvin",base:C.TEMPERATURE,prefixes:L.NONE,value:1,offset:0},celsius:{name:"celsius",base:C.TEMPERATURE,prefixes:L.NONE,value:1,offset:273.15},fahrenheit:{name:"fahrenheit",base:C.TEMPERATURE,prefixes:L.NONE,value:1/1.8,offset:459.67},rankine:{name:"rankine",base:C.TEMPERATURE,prefixes:L.NONE,value:1/1.8,offset:0},mol:{name:"mol",base:C.AMOUNT_OF_SUBSTANCE,prefixes:L.SHORT,value:1,offset:0},mole:{name:"mole",base:C.AMOUNT_OF_SUBSTANCE,prefixes:L.LONG,value:1,offset:0},cd:{name:"cd",base:C.LUMINOUS_INTENSITY,prefixes:L.SHORT,value:1,offset:0},candela:{name:"candela",base:C.LUMINOUS_INTENSITY,prefixes:L.LONG,value:1,offset:0},N:{name:"N",base:C.FORCE,prefixes:L.SHORT,value:1,offset:0},newton:{name:"newton",base:C.FORCE,prefixes:L.LONG,value:1,offset:0},dyn:{name:"dyn",base:C.FORCE,prefixes:L.SHORT,value:1e-5,offset:0},dyne:{name:"dyne",base:C.FORCE,prefixes:L.LONG,value:1e-5,offset:0},lbf:{name:"lbf",base:C.FORCE,prefixes:L.NONE,value:4.4482216152605,offset:0},poundforce:{name:"poundforce",base:C.FORCE,prefixes:L.NONE,value:4.4482216152605,offset:0},kip:{name:"kip",base:C.FORCE,prefixes:L.LONG,value:4448.2216,offset:0},kilogramforce:{name:"kilogramforce",base:C.FORCE,prefixes:L.NONE,value:9.80665,offset:0},J:{name:"J",base:C.ENERGY,prefixes:L.SHORT,value:1,offset:0},joule:{name:"joule",base:C.ENERGY,prefixes:L.SHORT,value:1,offset:0},erg:{name:"erg",base:C.ENERGY,prefixes:L.NONE,value:1e-7,offset:0},Wh:{name:"Wh",base:C.ENERGY,prefixes:L.SHORT,value:3600,offset:0},BTU:{name:"BTU",base:C.ENERGY,prefixes:L.BTU,value:1055.05585262,offset:0},eV:{name:"eV",base:C.ENERGY,prefixes:L.SHORT,value:1602176565e-28,offset:0},electronvolt:{name:"electronvolt",base:C.ENERGY,prefixes:L.LONG,value:1602176565e-28,offset:0},W:{name:"W",base:C.POWER,prefixes:L.SHORT,value:1,offset:0},watt:{name:"watt",base:C.POWER,prefixes:L.LONG,value:1,offset:0},hp:{name:"hp",base:C.POWER,prefixes:L.NONE,value:745.6998715386,offset:0},VAR:{name:"VAR",base:C.POWER,prefixes:L.SHORT,value:g.I,offset:0},VA:{name:"VA",base:C.POWER,prefixes:L.SHORT,value:1,offset:0},Pa:{name:"Pa",base:C.PRESSURE,prefixes:L.SHORT,value:1,offset:0},psi:{name:"psi",base:C.PRESSURE,prefixes:L.NONE,value:6894.75729276459,offset:0},atm:{name:"atm",base:C.PRESSURE,prefixes:L.NONE,value:101325,offset:0},bar:{name:"bar",base:C.PRESSURE,prefixes:L.SHORTLONG,value:1e5,offset:0},torr:{name:"torr",base:C.PRESSURE,prefixes:L.NONE,value:133.322,offset:0},mmHg:{name:"mmHg",base:C.PRESSURE,prefixes:L.NONE,value:133.322,offset:0},mmH2O:{name:"mmH2O",base:C.PRESSURE,prefixes:L.NONE,value:9.80665,offset:0},cmH2O:{name:"cmH2O",base:C.PRESSURE,prefixes:L.NONE,value:98.0665,offset:0},coulomb:{name:"coulomb",base:C.ELECTRIC_CHARGE,prefixes:L.LONG,value:1,offset:0},C:{name:"C",base:C.ELECTRIC_CHARGE,prefixes:L.SHORT,value:1,offset:0},farad:{name:"farad",base:C.ELECTRIC_CAPACITANCE,prefixes:L.LONG,value:1,offset:0},F:{name:"F",base:C.ELECTRIC_CAPACITANCE,prefixes:L.SHORT,value:1,offset:0},volt:{name:"volt",base:C.ELECTRIC_POTENTIAL,prefixes:L.LONG,value:1,offset:0},V:{name:"V",base:C.ELECTRIC_POTENTIAL,prefixes:L.SHORT,value:1,offset:0},ohm:{name:"ohm",base:C.ELECTRIC_RESISTANCE,prefixes:L.SHORTLONG,value:1,offset:0},henry:{name:"henry",base:C.ELECTRIC_INDUCTANCE,prefixes:L.LONG,value:1,offset:0},H:{name:"H",base:C.ELECTRIC_INDUCTANCE,prefixes:L.SHORT,value:1,offset:0},siemens:{name:"siemens",base:C.ELECTRIC_CONDUCTANCE,prefixes:L.LONG,value:1,offset:0},S:{name:"S",base:C.ELECTRIC_CONDUCTANCE,prefixes:L.SHORT,value:1,offset:0},weber:{name:"weber",base:C.MAGNETIC_FLUX,prefixes:L.LONG,value:1,offset:0},Wb:{name:"Wb",base:C.MAGNETIC_FLUX,prefixes:L.SHORT,value:1,offset:0},tesla:{name:"tesla",base:C.MAGNETIC_FLUX_DENSITY,prefixes:L.LONG,value:1,offset:0},T:{name:"T",base:C.MAGNETIC_FLUX_DENSITY,prefixes:L.SHORT,value:1,offset:0},b:{name:"b",base:C.BIT,prefixes:L.BINARY_SHORT,value:1,offset:0},bits:{name:"bits",base:C.BIT,prefixes:L.BINARY_LONG,value:1,offset:0},B:{name:"B",base:C.BIT,prefixes:L.BINARY_SHORT,value:8,offset:0},bytes:{name:"bytes",base:C.BIT,prefixes:L.BINARY_LONG,value:8,offset:0}},Q={meters:"meter",inches:"inch",feet:"foot",yards:"yard",miles:"mile",links:"link",rods:"rod",chains:"chain",angstroms:"angstrom",lt:"l",litres:"litre",liter:"litre",liters:"litre",teaspoons:"teaspoon",tablespoons:"tablespoon",minims:"minim",fluiddrams:"fluiddram",fluidounces:"fluidounce",gills:"gill",cups:"cup",pints:"pint",quarts:"quart",gallons:"gallon",beerbarrels:"beerbarrel",oilbarrels:"oilbarrel",hogsheads:"hogshead",gtts:"gtt",grams:"gram",tons:"ton",tonnes:"tonne",grains:"grain",drams:"dram",ounces:"ounce",poundmasses:"poundmass",hundredweights:"hundredweight",sticks:"stick",lb:"lbm",lbs:"lbm",kips:"kip",kgf:"kilogramforce",acres:"acre",hectares:"hectare",sqfeet:"sqft",sqyard:"sqyd",sqmile:"sqmi",sqmiles:"sqmi",mmhg:"mmHg",mmh2o:"mmH2O",cmh2o:"cmH2O",seconds:"second",secs:"second",minutes:"minute",mins:"minute",hours:"hour",hr:"hour",hrs:"hour",days:"day",weeks:"week",months:"month",years:"year",decades:"decade",centuries:"century",millennia:"millennium",hertz:"hertz",radians:"radian",degrees:"degree",gradians:"gradian",cycles:"cycle",arcsecond:"arcsec",arcseconds:"arcsec",arcminute:"arcmin",arcminutes:"arcmin",BTUs:"BTU",watts:"watt",joules:"joule",amperes:"ampere",coulombs:"coulomb",volts:"volt",ohms:"ohm",farads:"farad",webers:"weber",teslas:"tesla",electronvolts:"electronvolt",moles:"mole",bit:"bits",byte:"bytes"};function ne($){if($.number==="BigNumber"){var Z=Qa(y);W.rad.value=new y(1),W.deg.value=Z.div(180),W.grad.value=Z.div(200),W.cycle.value=Z.times(2),W.arcsec.value=Z.div(648e3),W.arcmin.value=Z.div(10800)}else W.rad.value=1,W.deg.value=Math.PI/180,W.grad.value=Math.PI/200,W.cycle.value=Math.PI*2,W.arcsec.value=Math.PI/648e3,W.arcmin.value=Math.PI/10800;W.radian.value=W.rad.value,W.degree.value=W.deg.value,W.gradian.value=W.grad.value}ne(i),n&&n("config",function($,Z){$.number!==Z.number&&ne($)});var re={si:{NONE:{unit:j,prefix:L.NONE[""]},LENGTH:{unit:W.m,prefix:L.SHORT[""]},MASS:{unit:W.g,prefix:L.SHORT.k},TIME:{unit:W.s,prefix:L.SHORT[""]},CURRENT:{unit:W.A,prefix:L.SHORT[""]},TEMPERATURE:{unit:W.K,prefix:L.SHORT[""]},LUMINOUS_INTENSITY:{unit:W.cd,prefix:L.SHORT[""]},AMOUNT_OF_SUBSTANCE:{unit:W.mol,prefix:L.SHORT[""]},ANGLE:{unit:W.rad,prefix:L.SHORT[""]},BIT:{unit:W.bits,prefix:L.SHORT[""]},FORCE:{unit:W.N,prefix:L.SHORT[""]},ENERGY:{unit:W.J,prefix:L.SHORT[""]},POWER:{unit:W.W,prefix:L.SHORT[""]},PRESSURE:{unit:W.Pa,prefix:L.SHORT[""]},ELECTRIC_CHARGE:{unit:W.C,prefix:L.SHORT[""]},ELECTRIC_CAPACITANCE:{unit:W.F,prefix:L.SHORT[""]},ELECTRIC_POTENTIAL:{unit:W.V,prefix:L.SHORT[""]},ELECTRIC_RESISTANCE:{unit:W.ohm,prefix:L.SHORT[""]},ELECTRIC_INDUCTANCE:{unit:W.H,prefix:L.SHORT[""]},ELECTRIC_CONDUCTANCE:{unit:W.S,prefix:L.SHORT[""]},MAGNETIC_FLUX:{unit:W.Wb,prefix:L.SHORT[""]},MAGNETIC_FLUX_DENSITY:{unit:W.T,prefix:L.SHORT[""]},FREQUENCY:{unit:W.Hz,prefix:L.SHORT[""]}}};re.cgs=JSON.parse(JSON.stringify(re.si)),re.cgs.LENGTH={unit:W.m,prefix:L.SHORT.c},re.cgs.MASS={unit:W.g,prefix:L.SHORT[""]},re.cgs.FORCE={unit:W.dyn,prefix:L.SHORT[""]},re.cgs.ENERGY={unit:W.erg,prefix:L.NONE[""]},re.us=JSON.parse(JSON.stringify(re.si)),re.us.LENGTH={unit:W.ft,prefix:L.NONE[""]},re.us.MASS={unit:W.lbm,prefix:L.NONE[""]},re.us.TEMPERATURE={unit:W.degF,prefix:L.NONE[""]},re.us.FORCE={unit:W.lbf,prefix:L.NONE[""]},re.us.ENERGY={unit:W.BTU,prefix:L.BTU[""]},re.us.POWER={unit:W.hp,prefix:L.NONE[""]},re.us.PRESSURE={unit:W.psi,prefix:L.NONE[""]},re.auto=JSON.parse(JSON.stringify(re.si));var ae=re.auto;v.setUnitSystem=function($){if(Ne(re,$))ae=re[$];else throw new Error("Unit system "+$+" does not exist. Choices are: "+Object.keys(re).join(", "))},v.getUnitSystem=function(){for(var $ in re)if(Ne(re,$)&&re[$]===ae)return $},v.typeConverters={BigNumber:function(Z){return new y(Z+"")},Fraction:function(Z){return new w(Z)},Complex:function(Z){return Z},number:function(Z){return Z}},v._getNumberConverter=function($){if(!v.typeConverters[$])throw new TypeError('Unsupported type "'+$+'"');return v.typeConverters[$]};for(var te in W)if(Ne(W,te)){var ue=W[te];ue.dimensions=ue.base.dimensions}for(var ee in Q)if(Ne(Q,ee)){var be=W[Q[ee]],we={};for(var me in be)Ne(be,me)&&(we[me]=be[me]);we.name=ee,W[ee]=we}v.isValidAlpha=function(Z){return/^[a-zA-Z]$/.test(Z)};function ye($){for(var Z=0;Z<$.length;Z++){if(d=$.charAt(Z),Z===0&&!v.isValidAlpha(d))throw new Error('Invalid unit name (must begin with alpha character): "'+$+'"');if(Z>0&&!(v.isValidAlpha(d)||T(d)))throw new Error('Invalid unit name (only alphanumeric characters are allowed): "'+$+'"')}}return v.createUnit=function($,Z){if(typeof $!="object")throw new TypeError("createUnit expects first parameter to be of type 'Object'");if(Z&&Z.override){for(var K in $)if(Ne($,K)&&v.deleteUnit(K),$[K].aliases)for(var R=0;R<$[K].aliases.length;R++)v.deleteUnit($[K].aliases[R])}var Y;for(var z in $)Ne($,z)&&(Y=v.createUnitSingle(z,$[z]));return Y},v.createUnitSingle=function($,Z,K){if((typeof Z=="undefined"||Z===null)&&(Z={}),typeof $!="string")throw new TypeError("createUnitSingle expects first parameter to be of type 'string'");if(Ne(W,$))throw new Error('Cannot create unit "'+$+'": a unit with that name already exists');ye($);var R=null,Y=[],z=0,F,J,q;if(Z&&Z.type==="Unit")R=Z.clone();else if(typeof Z=="string")Z!==""&&(F=Z);else if(typeof Z=="object")F=Z.definition,J=Z.prefixes,z=Z.offset,q=Z.baseName,Z.aliases&&(Y=Z.aliases.valueOf());else throw new TypeError('Cannot create unit "'+$+'" from "'+Z.toString()+'": expecting "string" or "Unit" or "Object"');if(Y){for(var oe=0;oe<Y.length;oe++)if(Ne(W,Y[oe]))throw new Error('Cannot create alias "'+Y[oe]+'": a unit with that name already exists')}if(F&&typeof F=="string"&&!R)try{R=v.parse(F,{allowNoUnits:!0})}catch(E){throw E.message='Could not create unit "'+$+'" from "'+F+'": '+E.message,E}else F&&F.type==="Unit"&&(R=F.clone());Y=Y||[],z=z||0,J&&J.toUpperCase?J=L[J.toUpperCase()]||L.NONE:J=L.NONE;var le={};if(R){le={name:$,value:R.value,dimensions:R.dimensions.slice(0),prefixes:J,offset:z};var Ae=!1;for(var Xe in C)if(Ne(C,Xe)){for(var or=!0,nr=0;nr<V.length;nr++)if(Math.abs((le.dimensions[nr]||0)-(C[Xe].dimensions[nr]||0))>1e-12){or=!1;break}if(or){Ae=!0,le.base=C[Xe];break}}if(!Ae){q=q||$+"_STUFF";var qr={dimensions:R.dimensions.slice(0)};qr.key=q,C[q]=qr,ae[q]={unit:le,prefix:L.NONE[""]},le.base=C[q]}}else{if(q=q||$+"_STUFF",V.indexOf(q)>=0)throw new Error('Cannot create new base unit "'+$+'": a base unit with that name already exists (and cannot be overridden)');V.push(q);for(var ve in C)Ne(C,ve)&&(C[ve].dimensions[V.length-1]=0);for(var he={dimensions:[]},pe=0;pe<V.length;pe++)he.dimensions[pe]=0;he.dimensions[V.length-1]=1,he.key=q,C[q]=he,le={name:$,value:1,dimensions:C[q].dimensions.slice(0),prefixes:J,offset:z,base:C[q]},ae[q]={unit:le,prefix:L.NONE[""]}}v.UNITS[$]=le;for(var $r=0;$r<Y.length;$r++){var vn=Y[$r],Ge={};for(var In in le)Ne(le,In)&&(Ge[In]=le[In]);Ge.name=vn,v.UNITS[vn]=Ge}return delete O.cache,new v(null,$)},v.deleteUnit=function($){delete v.UNITS[$]},v.PREFIXES=L,v.BASE_DIMENSIONS=V,v.BASE_UNITS=C,v.UNIT_SYSTEMS=re,v.UNITS=W,v},{isClass:!0}),Gu="unit",Qy=["typed","Unit"],jy=P(Gu,Qy,e=>{var{typed:n,Unit:i}=e;return n(Gu,{Unit:function(r){return r.clone()},string:function(r){return i.isValuelessUnit(r)?new i(null,r):i.parse(r,{allowNoUnits:!0})},"number | BigNumber | Fraction | Complex, string":function(r,a){return new i(r,a)},"Array | Matrix":function(r){return xe(r,this)}})}),Hu="sparse",ex=["typed","SparseMatrix"],rx=P(Hu,ex,e=>{var{typed:n,SparseMatrix:i}=e;return n(Hu,{"":function(){return new i([])},string:function(r){return new i([],r)},"Array | Matrix":function(r){return new i(r)},"Array | Matrix, string":function(r,a){return new i(r,a)}})}),Zu="createUnit",nx=["typed","Unit"],tx=P(Zu,nx,e=>{var{typed:n,Unit:i}=e;return n(Zu,{"Object, Object":function(r,a){return i.createUnit(r,a)},Object:function(r){return i.createUnit(r,{})},"string, Unit | string | Object, Object":function(r,a,c){var l={};return l[r]=a,i.createUnit(l,c)},"string, Unit | string | Object":function(r,a){var c={};return c[r]=a,i.createUnit(c,{})},string:function(r){var a={};return a[r]={},i.createUnit(a,{})}})}),Xu="acos",ix=["typed","config","Complex"],ax=P(Xu,ix,e=>{var{typed:n,config:i,Complex:t}=e;return n(Xu,{number:function(a){return a>=-1&&a<=1||i.predictable?Math.acos(a):new t(a,0).acos()},Complex:function(a){return a.acos()},BigNumber:function(a){return a.acos()},"Array | Matrix":function(a){return xe(a,this)}})}),Yu="acosh",sx=["typed","config","Complex"],ox=P(Yu,sx,e=>{var{typed:n,config:i,Complex:t}=e;return n(Yu,{number:function(a){return a>=1||i.predictable?rm(a):a<=-1?new t(Math.log(Math.sqrt(a*a-1)-a),Math.PI):new t(a,0).acosh()},Complex:function(a){return a.acosh()},BigNumber:function(a){return a.acosh()},"Array | Matrix":function(a){return xe(a,this)}})}),Ju="acot",ux=["typed","BigNumber"],cx=P(Ju,ux,e=>{var{typed:n,BigNumber:i}=e;return n(Ju,{number:nm,Complex:function(r){return r.acot()},BigNumber:function(r){return new i(1).div(r).atan()},"Array | Matrix":function(r){return xe(r,this)}})}),Qu="acoth",lx=["typed","config","Complex","BigNumber"],fx=P(Qu,lx,e=>{var{typed:n,config:i,Complex:t,BigNumber:r}=e;return n(Qu,{number:function(c){return c>=1||c<=-1||i.predictable?tm(c):new t(c,0).acoth()},Complex:function(c){return c.acoth()},BigNumber:function(c){return new r(1).div(c).atanh()},"Array | Matrix":function(c){return xe(c,this)}})}),ju="acsc",mx=["typed","config","Complex","BigNumber"],hx=P(ju,mx,e=>{var{typed:n,config:i,Complex:t,BigNumber:r}=e;return n(ju,{number:function(c){return c<=-1||c>=1||i.predictable?im(c):new t(c,0).acsc()},Complex:function(c){return c.acsc()},BigNumber:function(c){return new r(1).div(c).asin()},"Array | Matrix":function(c){return xe(c,this)}})}),ec="acsch",px=["typed","BigNumber"],gx=P(ec,px,e=>{var{typed:n,BigNumber:i}=e;return n(ec,{number:am,Complex:function(r){return r.acsch()},BigNumber:function(r){return new i(1).div(r).asinh()},"Array | Matrix":function(r){return xe(r,this)}})}),rc="asec",dx=["typed","config","Complex","BigNumber"],vx=P(rc,dx,e=>{var{typed:n,config:i,Complex:t,BigNumber:r}=e;return n(rc,{number:function(c){return c<=-1||c>=1||i.predictable?sm(c):new t(c,0).asec()},Complex:function(c){return c.asec()},BigNumber:function(c){return new r(1).div(c).acos()},"Array | Matrix":function(c){return xe(c,this)}})}),nc="asech",bx=["typed","config","Complex","BigNumber"],yx=P(nc,bx,e=>{var{typed:n,config:i,Complex:t,BigNumber:r}=e;return n(nc,{number:function(c){if(c<=1&&c>=-1||i.predictable){var l=1/c;if(l>0||i.predictable)return om(c);var u=Math.sqrt(l*l-1);return new t(Math.log(u-l),Math.PI)}return new t(c,0).asech()},Complex:function(c){return c.asech()},BigNumber:function(c){return new r(1).div(c).acosh()},"Array | Matrix":function(c){return xe(c,this)}})}),tc="asin",xx=["typed","config","Complex"],wx=P(tc,xx,e=>{var{typed:n,config:i,Complex:t}=e;return n(tc,{number:function(a){return a>=-1&&a<=1||i.predictable?Math.asin(a):new t(a,0).asin()},Complex:function(a){return a.asin()},BigNumber:function(a){return a.asin()},"Array | Matrix":function(a){return xe(a,this)}})}),Ax="asinh",Nx=["typed"],Sx=P(Ax,Nx,e=>{var{typed:n}=e;return n("asinh",{number:um,Complex:function(t){return t.asinh()},BigNumber:function(t){return t.asinh()},"Array | Matrix":function(t){return xe(t,this)}})}),Mx="atan",Tx=["typed"],kx=P(Mx,Tx,e=>{var{typed:n}=e;return n("atan",{number:function(t){return Math.atan(t)},Complex:function(t){return t.atan()},BigNumber:function(t){return t.atan()},"Array | Matrix":function(t){return xe(t,this)}})}),ic="atan2",Ex=["typed","matrix","equalScalar","BigNumber","DenseMatrix"],Cx=P(ic,Ex,e=>{var{typed:n,matrix:i,equalScalar:t,BigNumber:r,DenseMatrix:a}=e,c=tn({typed:n,equalScalar:t}),l=Cr({typed:n}),u=Am({typed:n,equalScalar:t}),f=yr({typed:n,equalScalar:t}),o=dr({typed:n,DenseMatrix:a}),s=er({typed:n}),m=Ve({typed:n});return n(ic,{"number, number":Math.atan2,"BigNumber, BigNumber":function(p,g){return r.atan2(p,g)},"SparseMatrix, SparseMatrix":function(p,g){return u(p,g,this,!1)},"SparseMatrix, DenseMatrix":function(p,g){return c(g,p,this,!0)},"DenseMatrix, SparseMatrix":function(p,g){return l(p,g,this,!1)},"DenseMatrix, DenseMatrix":function(p,g){return s(p,g,this)},"Array, Array":function(p,g){return this(i(p),i(g)).valueOf()},"Array, Matrix":function(p,g){return this(i(p),g)},"Matrix, Array":function(p,g){return this(p,i(g))},"SparseMatrix, number | BigNumber":function(p,g){return f(p,g,this,!1)},"DenseMatrix, number | BigNumber":function(p,g){return m(p,g,this,!1)},"number | BigNumber, SparseMatrix":function(p,g){return o(g,p,this,!0)},"number | BigNumber, DenseMatrix":function(p,g){return m(g,p,this,!0)},"Array, number | BigNumber":function(p,g){return m(i(p),g,this,!1).valueOf()},"number | BigNumber, Array":function(p,g){return m(i(g),p,this,!0).valueOf()}})}),ac="atanh",Bx=["typed","config","Complex"],Lx=P(ac,Bx,e=>{var{typed:n,config:i,Complex:t}=e;return n(ac,{number:function(a){return a<=1&&a>=-1||i.predictable?cm(a):new t(a,0).atanh()},Complex:function(a){return a.atanh()},BigNumber:function(a){return a.atanh()},"Array | Matrix":function(a){return xe(a,this)}})}),sc="cos",Dx=["typed"],Ix=P(sc,Dx,e=>{var{typed:n}=e;return n(sc,{number:Math.cos,Complex:function(t){return t.cos()},BigNumber:function(t){return t.cos()},Unit:function(t){if(!t.hasBase(t.constructor.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cos is no angle");return this(t.value)},"Array | Matrix":function(t){return xe(t,this)}})}),oc="cosh",Ox=["typed"],zx=P(oc,Ox,e=>{var{typed:n}=e;return n(oc,{number:tg,Complex:function(t){return t.cosh()},BigNumber:function(t){return t.cosh()},Unit:function(t){if(!t.hasBase(t.constructor.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cosh is no angle");return this(t.value)},"Array | Matrix":function(t){return xe(t,this)}})}),uc="cot",Px=["typed","BigNumber"],$x=P(uc,Px,e=>{var{typed:n,BigNumber:i}=e;return n(uc,{number:lm,Complex:function(r){return r.cot()},BigNumber:function(r){return new i(1).div(r.tan())},Unit:function(r){if(!r.hasBase(r.constructor.BASE_UNITS.ANGLE))throw new TypeError("Unit in function cot is no angle");return this(r.value)},"Array | Matrix":function(r){return xe(r,this)}})}),cc="coth",_x=["typed","BigNumber"],Fx=P(cc,_x,e=>{var{typed:n,BigNumber:i}=e;return n(cc,{number:fm,Complex:function(r){return r.coth()},BigNumber:function(r){return new i(1).div(r.tanh())},Unit:function(r){if(!r.hasBase(r.constructor.BASE_UNITS.ANGLE))throw new TypeError("Unit in function coth is no angle");return this(r.value)},"Array | Matrix":function(r){return xe(r,this)}})}),lc="csc",Rx=["typed","BigNumber"],qx=P(lc,Rx,e=>{var{typed:n,BigNumber:i}=e;return n(lc,{number:mm,Complex:function(r){return r.csc()},BigNumber:function(r){return new i(1).div(r.sin())},Unit:function(r){if(!r.hasBase(r.constructor.BASE_UNITS.ANGLE))throw new TypeError("Unit in function csc is no angle");return this(r.value)},"Array | Matrix":function(r){return xe(r,this)}})}),fc="csch",Kx=["typed","BigNumber"],Ux=P(fc,Kx,e=>{var{typed:n,BigNumber:i}=e;return n(fc,{number:hm,Complex:function(r){return r.csch()},BigNumber:function(r){return new i(1).div(r.sinh())},Unit:function(r){if(!r.hasBase(r.constructor.BASE_UNITS.ANGLE))throw new TypeError("Unit in function csch is no angle");return this(r.value)},"Array | Matrix":function(r){return xe(r,this)}})}),mc="sec",Vx=["typed","BigNumber"],Wx=P(mc,Vx,e=>{var{typed:n,BigNumber:i}=e;return n(mc,{number:pm,Complex:function(r){return r.sec()},BigNumber:function(r){return new i(1).div(r.cos())},Unit:function(r){if(!r.hasBase(r.constructor.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sec is no angle");return this(r.value)},"Array | Matrix":function(r){return xe(r,this)}})}),hc="sech",Gx=["typed","BigNumber"],Hx=P(hc,Gx,e=>{var{typed:n,BigNumber:i}=e;return n(hc,{number:gm,Complex:function(r){return r.sech()},BigNumber:function(r){return new i(1).div(r.cosh())},Unit:function(r){if(!r.hasBase(r.constructor.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sech is no angle");return this(r.value)},"Array | Matrix":function(r){return xe(r,this)}})}),pc="sin",Zx=["typed"],Xx=P(pc,Zx,e=>{var{typed:n}=e;return n(pc,{number:Math.sin,Complex:function(t){return t.sin()},BigNumber:function(t){return t.sin()},Unit:function(t){if(!t.hasBase(t.constructor.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sin is no angle");return this(t.value)},"Array | Matrix":function(t){return xe(t,this)}})}),gc="sinh",Yx=["typed"],Jx=P(gc,Yx,e=>{var{typed:n}=e;return n(gc,{number:dm,Complex:function(t){return t.sinh()},BigNumber:function(t){return t.sinh()},Unit:function(t){if(!t.hasBase(t.constructor.BASE_UNITS.ANGLE))throw new TypeError("Unit in function sinh is no angle");return this(t.value)},"Array | Matrix":function(t){return xe(t,this)}})}),dc="tan",Qx=["typed"],jx=P(dc,Qx,e=>{var{typed:n}=e;return n(dc,{number:Math.tan,Complex:function(t){return t.tan()},BigNumber:function(t){return t.tan()},Unit:function(t){if(!t.hasBase(t.constructor.BASE_UNITS.ANGLE))throw new TypeError("Unit in function tan is no angle");return this(t.value)},"Array | Matrix":function(t){return xe(t,this)}})}),ew="tanh",rw=["typed"],nw=P(ew,rw,e=>{var{typed:n}=e;return n("tanh",{number:ag,Complex:function(t){return t.tanh()},BigNumber:function(t){return t.tanh()},Unit:function(t){if(!t.hasBase(t.constructor.BASE_UNITS.ANGLE))throw new TypeError("Unit in function tanh is no angle");return this(t.value)},"Array | Matrix":function(t){return xe(t,this)}})}),vc="setCartesian",tw=["typed","size","subset","compareNatural","Index","DenseMatrix"],iw=P(vc,tw,e=>{var{typed:n,size:i,subset:t,compareNatural:r,Index:a,DenseMatrix:c}=e;return n(vc,{"Array | Matrix, Array | Matrix":function(u,f){var o=[];if(t(i(u),new a(0))!==0&&t(i(f),new a(0))!==0){var s=qe(Array.isArray(u)?u:u.toArray()).sort(r),m=qe(Array.isArray(f)?f:f.toArray()).sort(r);o=[];for(var h=0;h<s.length;h++)for(var p=0;p<m.length;p++)o.push([s[h],m[p]])}return Array.isArray(u)&&Array.isArray(f)?o:new c(o)}})}),bc="setDifference",aw=["typed","size","subset","compareNatural","Index","DenseMatrix"],sw=P(bc,aw,e=>{var{typed:n,size:i,subset:t,compareNatural:r,Index:a,DenseMatrix:c}=e;return n(bc,{"Array | Matrix, Array | Matrix":function(u,f){var o;if(t(i(u),new a(0))===0)o=[];else{if(t(i(f),new a(0))===0)return qe(u.toArray());var s=gt(qe(Array.isArray(u)?u:u.toArray()).sort(r)),m=gt(qe(Array.isArray(f)?f:f.toArray()).sort(r));o=[];for(var h,p=0;p<s.length;p++){h=!1;for(var g=0;g<m.length;g++)if(r(s[p].value,m[g].value)===0&&s[p].identifier===m[g].identifier){h=!0;break}h||o.push(s[p])}}return Array.isArray(u)&&Array.isArray(f)?yi(o):new c(yi(o))}})}),yc="setDistinct",ow=["typed","size","subset","compareNatural","Index","DenseMatrix"],uw=P(yc,ow,e=>{var{typed:n,size:i,subset:t,compareNatural:r,Index:a,DenseMatrix:c}=e;return n(yc,{"Array | Matrix":function(u){var f;if(t(i(u),new a(0))===0)f=[];else{var o=qe(Array.isArray(u)?u:u.toArray()).sort(r);f=[],f.push(o[0]);for(var s=1;s<o.length;s++)r(o[s],o[s-1])!==0&&f.push(o[s])}return Array.isArray(u)?f:new c(f)}})}),xc="setIntersect",cw=["typed","size","subset","compareNatural","Index","DenseMatrix"],lw=P(xc,cw,e=>{var{typed:n,size:i,subset:t,compareNatural:r,Index:a,DenseMatrix:c}=e;return n(xc,{"Array | Matrix, Array | Matrix":function(u,f){var o;if(t(i(u),new a(0))===0||t(i(f),new a(0))===0)o=[];else{var s=gt(qe(Array.isArray(u)?u:u.toArray()).sort(r)),m=gt(qe(Array.isArray(f)?f:f.toArray()).sort(r));o=[];for(var h=0;h<s.length;h++)for(var p=0;p<m.length;p++)if(r(s[h].value,m[p].value)===0&&s[h].identifier===m[p].identifier){o.push(s[h]);break}}return Array.isArray(u)&&Array.isArray(f)?yi(o):new c(yi(o))}})}),wc="setIsSubset",fw=["typed","size","subset","compareNatural","Index"],mw=P(wc,fw,e=>{var{typed:n,size:i,subset:t,compareNatural:r,Index:a}=e;return n(wc,{"Array | Matrix, Array | Matrix":function(l,u){if(t(i(l),new a(0))===0)return!0;if(t(i(u),new a(0))===0)return!1;for(var f=gt(qe(Array.isArray(l)?l:l.toArray()).sort(r)),o=gt(qe(Array.isArray(u)?u:u.toArray()).sort(r)),s,m=0;m<f.length;m++){s=!1;for(var h=0;h<o.length;h++)if(r(f[m].value,o[h].value)===0&&f[m].identifier===o[h].identifier){s=!0;break}if(s===!1)return!1}return!0}})}),Ac="setMultiplicity",hw=["typed","size","subset","compareNatural","Index"],pw=P(Ac,hw,e=>{var{typed:n,size:i,subset:t,compareNatural:r,Index:a}=e;return n(Ac,{"number | BigNumber | Fraction | Complex, Array | Matrix":function(l,u){if(t(i(u),new a(0))===0)return 0;for(var f=qe(Array.isArray(u)?u:u.toArray()),o=0,s=0;s<f.length;s++)r(f[s],l)===0&&o++;return o}})}),Nc="setPowerset",gw=["typed","size","subset","compareNatural","Index"],dw=P(Nc,gw,e=>{var{typed:n,size:i,subset:t,compareNatural:r,Index:a}=e;return n(Nc,{"Array | Matrix":function(f){if(t(i(f),new a(0))===0)return[];for(var o=qe(Array.isArray(f)?f:f.toArray()).sort(r),s=[],m=0;m.toString(2).length<=o.length;)s.push(c(o,m.toString(2).split("").reverse())),m++;return l(s)}});function c(u,f){for(var o=[],s=0;s<f.length;s++)f[s]==="1"&&o.push(u[s]);return o}function l(u){for(var f=[],o=u.length-1;o>0;o--)for(var s=0;s<o;s++)u[s].length>u[s+1].length&&(f=u[s],u[s]=u[s+1],u[s+1]=f);return u}}),Sc="setSize",vw=["typed","compareNatural"],bw=P(Sc,vw,e=>{var{typed:n,compareNatural:i}=e;return n(Sc,{"Array | Matrix":function(r){return Array.isArray(r)?qe(r).length:qe(r.toArray()).length},"Array | Matrix, boolean":function(r,a){if(a===!1||r.length===0)return Array.isArray(r)?qe(r).length:qe(r.toArray()).length;for(var c=qe(Array.isArray(r)?r:r.toArray()).sort(i),l=1,u=1;u<c.length;u++)i(c[u],c[u-1])!==0&&l++;return l}})}),Mc="setSymDifference",yw=["typed","size","concat","subset","setDifference","Index"],xw=P(Mc,yw,e=>{var{typed:n,size:i,concat:t,subset:r,setDifference:a,Index:c}=e;return n(Mc,{"Array | Matrix, Array | Matrix":function(u,f){if(r(i(u),new c(0))===0)return qe(f);if(r(i(f),new c(0))===0)return qe(u);var o=qe(u),s=qe(f);return t(a(o,s),a(s,o))}})}),Tc="setUnion",ww=["typed","size","concat","subset","setIntersect","setSymDifference","Index"],Aw=P(Tc,ww,e=>{var{typed:n,size:i,concat:t,subset:r,setIntersect:a,setSymDifference:c,Index:l}=e;return n(Tc,{"Array | Matrix, Array | Matrix":function(f,o){if(r(i(f),new l(0))===0)return qe(o);if(r(i(o),new l(0))===0)return qe(f);var s=qe(f),m=qe(o);return t(c(s,m),a(s,m))}})}),kc="add",Nw=["typed","matrix","addScalar","equalScalar","DenseMatrix","SparseMatrix"],Sw=P(kc,Nw,e=>{var{typed:n,matrix:i,addScalar:t,equalScalar:r,DenseMatrix:a,SparseMatrix:c}=e,l=qn({typed:n}),u=Za({typed:n,equalScalar:r}),f=Xn({typed:n,DenseMatrix:a}),o=er({typed:n}),s=Ve({typed:n});return n(kc,Fa({"DenseMatrix, DenseMatrix":function(h,p){return o(h,p,t)},"DenseMatrix, SparseMatrix":function(h,p){return l(h,p,t,!1)},"SparseMatrix, DenseMatrix":function(h,p){return l(p,h,t,!0)},"SparseMatrix, SparseMatrix":function(h,p){return u(h,p,t)},"Array, Array":function(h,p){return this(i(h),i(p)).valueOf()},"Array, Matrix":function(h,p){return this(i(h),p)},"Matrix, Array":function(h,p){return this(h,i(p))},"DenseMatrix, any":function(h,p){return s(h,p,t,!1)},"SparseMatrix, any":function(h,p){return f(h,p,t,!1)},"any, DenseMatrix":function(h,p){return s(p,h,t,!0)},"any, SparseMatrix":function(h,p){return f(p,h,t,!0)},"Array, any":function(h,p){return s(i(h),p,t,!1).valueOf()},"any, Array":function(h,p){return s(i(p),h,t,!0).valueOf()},"any, any":t,"any, any, ...any":function(h,p,g){for(var y=this(h,p),w=0;w<g.length;w++)y=this(y,g[w]);return y}},t.signatures))}),Ec="hypot",Mw=["typed","abs","addScalar","divideScalar","multiplyScalar","sqrt","smaller","isPositive"],Tw=P(Ec,Mw,e=>{var{typed:n,abs:i,addScalar:t,divideScalar:r,multiplyScalar:a,sqrt:c,smaller:l,isPositive:u}=e;return n(Ec,{"... number | BigNumber":f,Array:function(s){return this.apply(this,qe(s))},Matrix:function(s){return this.apply(this,qe(s.toArray()))}});function f(o){for(var s=0,m=0,h=0;h<o.length;h++){var p=i(o[h]);l(m,p)?(s=a(s,a(r(m,p),r(m,p))),s=t(s,1),m=p):s=t(s,u(p)?a(r(p,m),r(p,m)):p)}return a(m,c(s))}}),Cc="norm",kw=["typed","abs","add","pow","conj","sqrt","multiply","equalScalar","larger","smaller","matrix","ctranspose","eigs"],Ew=P(Cc,kw,e=>{var{typed:n,abs:i,add:t,pow:r,conj:a,sqrt:c,multiply:l,equalScalar:u,larger:f,smaller:o,matrix:s,ctranspose:m,eigs:h}=e;return n(Cc,{number:Math.abs,Complex:function(S){return S.abs()},BigNumber:function(S){return S.abs()},boolean:function(S){return Math.abs(S)},Array:function(S){return d(s(S),2)},Matrix:function(S){return d(S,2)},"number | Complex | BigNumber | boolean, number | BigNumber | string":function(S){return this(S)},"Array, number | BigNumber | string":function(S,T){return d(s(S),T)},"Matrix, number | BigNumber | string":function(S,T){return d(S,T)}});function p(M){var S=0;return M.forEach(function(T){var N=i(T);f(N,S)&&(S=N)},!0),S}function g(M){var S;return M.forEach(function(T){var N=i(T);(!S||o(N,S))&&(S=N)},!0),S||0}function y(M,S){if(S===Number.POSITIVE_INFINITY||S==="inf")return p(M);if(S===Number.NEGATIVE_INFINITY||S==="-inf")return g(M);if(S==="fro")return d(M,2);if(typeof S=="number"&&!isNaN(S)){if(!u(S,0)){var T=0;return M.forEach(function(N){T=t(r(i(N),S),T)},!0),r(T,1/S)}return Number.POSITIVE_INFINITY}throw new Error("Unsupported parameter value")}function w(M){var S=0;return M.forEach(function(T,N){S=t(S,l(T,a(T)))}),i(c(S))}function A(M){var S=[],T=0;return M.forEach(function(N,D){var k=D[1],I=t(S[k]||0,i(N));f(I,T)&&(T=I),S[k]=I},!0),T}function v(M){var S=M.size();if(S[0]!==S[1])throw new RangeError("Invalid matrix dimensions");var T=m(M),N=l(T,M),D=h(N).values.toArray(),k=D[D.length-1];return i(c(k))}function b(M){var S=[],T=0;return M.forEach(function(N,D){var k=D[0],I=t(S[k]||0,i(N));f(I,T)&&(T=I),S[k]=I},!0),T}function x(M,S){if(S===1)return A(M);if(S===Number.POSITIVE_INFINITY||S==="inf")return b(M);if(S==="fro")return w(M);if(S===2)return v(M);throw new Error("Unsupported parameter value "+S)}function d(M,S){var T=M.size();if(T.length===1)return y(M,S);if(T.length===2){if(T[0]&&T[1])return x(M,S);throw new RangeError("Invalid matrix dimensions")}}}),Bc="dot",Cw=["typed","addScalar","multiplyScalar","conj","size"],Bw=P(Bc,Cw,e=>{var{typed:n,addScalar:i,multiplyScalar:t,conj:r,size:a}=e;return n(Bc,{"Array | DenseMatrix, Array | DenseMatrix":l,"SparseMatrix, SparseMatrix":u});function c(o,s){var m=f(o),h=f(s),p,g;if(m.length===1)p=m[0];else if(m.length===2&&m[1]===1)p=m[0];else throw new RangeError("Expected a column vector, instead got a matrix of size ("+m.join(", ")+")");if(h.length===1)g=h[0];else if(h.length===2&&h[1]===1)g=h[0];else throw new RangeError("Expected a column vector, instead got a matrix of size ("+h.join(", ")+")");if(p!==g)throw new RangeError("Vectors must have equal length ("+p+" != "+g+")");if(p===0)throw new RangeError("Cannot calculate the dot product of empty vectors");return p}function l(o,s){var m=c(o,s),h=Ce(o)?o._data:o,p=Ce(o)?o._datatype:void 0,g=Ce(s)?s._data:s,y=Ce(s)?s._datatype:void 0,w=f(o).length===2,A=f(s).length===2,v=i,b=t;if(p&&y&&p===y&&typeof p=="string"){var x=p;v=n.find(i,[x,x]),b=n.find(t,[x,x])}if(!w&&!A){for(var d=b(r(h[0]),g[0]),M=1;M<m;M++)d=v(d,b(r(h[M]),g[M]));return d}if(!w&&A){for(var S=b(r(h[0]),g[0][0]),T=1;T<m;T++)S=v(S,b(r(h[T]),g[T][0]));return S}if(w&&!A){for(var N=b(r(h[0][0]),g[0]),D=1;D<m;D++)N=v(N,b(r(h[D][0]),g[D]));return N}if(w&&A){for(var k=b(r(h[0][0]),g[0][0]),I=1;I<m;I++)k=v(k,b(r(h[I][0]),g[I][0]));return k}}function u(o,s){c(o,s);for(var m=o._index,h=o._values,p=s._index,g=s._values,y=0,w=i,A=t,v=0,b=0;v<m.length&&b<p.length;){var x=m[v],d=p[b];if(x<d){v++;continue}if(x>d){b++;continue}x===d&&(y=w(y,A(h[v],g[b])),v++,b++)}return y}function f(o){return Ce(o)?o.size():a(o)}}),Lw="trace",Dw=["typed","matrix","add"],Iw=P(Lw,Dw,e=>{var{typed:n,matrix:i,add:t}=e;return n("trace",{Array:function(l){return r(i(l))},SparseMatrix:a,DenseMatrix:r,any:ke});function r(c){var l=c._size,u=c._data;switch(l.length){case 1:if(l[0]===1)return ke(u[0]);throw new RangeError("Matrix must be square (size: "+Oe(l)+")");case 2:{var f=l[0],o=l[1];if(f===o){for(var s=0,m=0;m<f;m++)s=t(s,u[m][m]);return s}else throw new RangeError("Matrix must be square (size: "+Oe(l)+")")}default:throw new RangeError("Matrix must be two dimensional (size: "+Oe(l)+")")}}function a(c){var l=c._values,u=c._index,f=c._ptr,o=c._size,s=o[0],m=o[1];if(s===m){var h=0;if(l.length>0)for(var p=0;p<m;p++)for(var g=f[p],y=f[p+1],w=g;w<y;w++){var A=u[w];if(A===p){h=t(h,l[w]);break}if(A>p)break}return h}throw new RangeError("Matrix must be square (size: "+Oe(o)+")")}}),Lc="index",Ow=["typed","Index"],zw=P(Lc,Ow,e=>{var{typed:n,Index:i}=e;return n(Lc,{"...number | string | BigNumber | Range | Array | Matrix":function(r){var a=r.map(function(l){return $e(l)?l.toNumber():Array.isArray(l)||Ce(l)?l.map(function(u){return $e(u)?u.toNumber():u}):l}),c=new i;return i.apply(c,a),c}})}),zm=new Set(["end"]),Pw="Node",$w=["mathWithTransform"],_w=P(Pw,$w,e=>{var{mathWithTransform:n}=e;function i(){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator")}i.prototype.evaluate=function(r){return this.compile().evaluate(r)},i.prototype.type="Node",i.prototype.isNode=!0,i.prototype.comment="",i.prototype.compile=function(){var r=this._compile(n,{}),a={},c=null;function l(u){var f=Va(u);return t(f),r(f,a,c)}return{evaluate:l}},i.prototype._compile=function(r,a){throw new Error("Method _compile should be implemented by type "+this.type)},i.prototype.forEach=function(r){throw new Error("Cannot run forEach on a Node interface")},i.prototype.map=function(r){throw new Error("Cannot run map on a Node interface")},i.prototype._ifNode=function(r){if(!We(r))throw new TypeError("Callback function must return a Node");return r},i.prototype.traverse=function(r){r(this,null,null);function a(c,l){c.forEach(function(u,f,o){l(u,f,o),a(u,l)})}a(this,r)},i.prototype.transform=function(r){function a(c,l,u){var f=r(c,l,u);return f!==c?f:c.map(a)}return a(this,null,null)},i.prototype.filter=function(r){var a=[];return this.traverse(function(c,l,u){r(c,l,u)&&a.push(c)}),a},i.prototype.clone=function(){throw new Error("Cannot clone a Node interface")},i.prototype.cloneDeep=function(){return this.map(function(r){return r.cloneDeep()})},i.prototype.equals=function(r){return r?$t(this,r):!1},i.prototype.toString=function(r){var a=this._getCustomString(r);return typeof a!="undefined"?a:this._toString(r)},i.prototype.toJSON=function(){throw new Error("Cannot serialize object: toJSON not implemented by "+this.type)},i.prototype.toHTML=function(r){var a=this._getCustomString(r);return typeof a!="undefined"?a:this.toHTML(r)},i.prototype._toString=function(){throw new Error("_toString not implemented for "+this.type)},i.prototype.toTex=function(r){var a=this._getCustomString(r);return typeof a!="undefined"?a:this._toTex(r)},i.prototype._toTex=function(r){throw new Error("_toTex not implemented for "+this.type)},i.prototype._getCustomString=function(r){if(r&&typeof r=="object")switch(typeof r.handler){case"object":case"undefined":return;case"function":return r.handler(this,r);default:throw new TypeError("Object or function expected as callback")}},i.prototype.getIdentifier=function(){return this.type},i.prototype.getContent=function(){return this};function t(r){for(var a of[...zm])if(r.has(a))throw new Error('Scope contains an illegal symbol, "'+a+'" is a reserved keyword')}return i},{isClass:!0,isNode:!0});function Br(e){return e&&e.isIndexError?new rn(e.index+1,e.min+1,e.max!==void 0?e.max+1:void 0):e}function Pm(e){var{subset:n}=e;return function(t,r){try{if(Array.isArray(t))return n(t,r);if(t&&typeof t.subset=="function")return t.subset(r);if(typeof t=="string")return n(t,r);if(typeof t=="object"){if(!r.isObjectProperty())throw new TypeError("Cannot apply a numeric index as object property");return Vr(t,r.getObjectProperty())}else throw new TypeError("Cannot apply index: unsupported type of object")}catch(a){throw Br(a)}}}var Fw="AccessorNode",Rw=["subset","Node"],qw=P(Fw,Rw,e=>{var{subset:n,Node:i}=e,t=Pm({subset:n});function r(c,l){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if(!We(c))throw new TypeError('Node expected for parameter "object"');if(!wt(l))throw new TypeError('IndexNode expected for parameter "index"');this.object=c||null,this.index=l,Object.defineProperty(this,"name",{get:function(){return this.index?this.index.isObjectProperty()?this.index.getObjectProperty():"":this.object.name||""}.bind(this),set:function(){throw new Error("Cannot assign a new name, name is read-only")}})}r.prototype=new i,r.prototype.type="AccessorNode",r.prototype.isAccessorNode=!0,r.prototype._compile=function(c,l){var u=this.object._compile(c,l),f=this.index._compile(c,l);if(this.index.isObjectProperty()){var o=this.index.getObjectProperty();return function(m,h,p){return Vr(u(m,h,p),o)}}else return function(m,h,p){var g=u(m,h,p),y=f(m,h,g);return t(g,y)}},r.prototype.forEach=function(c){c(this.object,"object",this),c(this.index,"index",this)},r.prototype.map=function(c){return new r(this._ifNode(c(this.object,"object",this)),this._ifNode(c(this.index,"index",this)))},r.prototype.clone=function(){return new r(this.object,this.index)},r.prototype._toString=function(c){var l=this.object.toString(c);return a(this.object)&&(l="("+l+")"),l+this.index.toString(c)},r.prototype.toHTML=function(c){var l=this.object.toHTML(c);return a(this.object)&&(l='<span class="math-parenthesis math-round-parenthesis">(</span>'+l+'<span class="math-parenthesis math-round-parenthesis">)</span>'),l+this.index.toHTML(c)},r.prototype._toTex=function(c){var l=this.object.toTex(c);return a(this.object)&&(l="\\left(' + object + '\\right)"),l+this.index.toTex(c)},r.prototype.toJSON=function(){return{mathjs:"AccessorNode",object:this.object,index:this.index}},r.fromJSON=function(c){return new r(c.object,c.index)};function a(c){return!(Gn(c)||Kr(c)||Ye(c)||Hn(c)||Li(c)||Wt(c)||vr(c))}return r},{isClass:!0,isNode:!0}),Kw="ArrayNode",Uw=["Node"],Vw=P(Kw,Uw,e=>{var{Node:n}=e;function i(t){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if(this.items=t||[],!Array.isArray(this.items)||!this.items.every(We))throw new TypeError("Array containing Nodes expected")}return i.prototype=new n,i.prototype.type="ArrayNode",i.prototype.isArrayNode=!0,i.prototype._compile=function(t,r){var a=Tn(this.items,function(u){return u._compile(t,r)}),c=t.config.matrix!=="Array";if(c){var l=t.matrix;return function(f,o,s){return l(Tn(a,function(m){return m(f,o,s)}))}}else return function(f,o,s){return Tn(a,function(m){return m(f,o,s)})}},i.prototype.forEach=function(t){for(var r=0;r<this.items.length;r++){var a=this.items[r];t(a,"items["+r+"]",this)}},i.prototype.map=function(t){for(var r=[],a=0;a<this.items.length;a++)r[a]=this._ifNode(t(this.items[a],"items["+a+"]",this));return new i(r)},i.prototype.clone=function(){return new i(this.items.slice(0))},i.prototype._toString=function(t){var r=this.items.map(function(a){return a.toString(t)});return"["+r.join(", ")+"]"},i.prototype.toJSON=function(){return{mathjs:"ArrayNode",items:this.items}},i.fromJSON=function(t){return new i(t.items)},i.prototype.toHTML=function(t){var r=this.items.map(function(a){return a.toHTML(t)});return'<span class="math-parenthesis math-square-parenthesis">[</span>'+r.join('<span class="math-separator">,</span>')+'<span class="math-parenthesis math-square-parenthesis">]</span>'},i.prototype._toTex=function(t){function r(a,c){var l=a.some(Kr)&&!a.every(Kr),u=c||l,f=u?"&":"\\\\",o=a.map(function(s){return s.items?r(s.items,!c):s.toTex(t)}).join(f);return l||!u||u&&!c?"\\begin{bmatrix}"+o+"\\end{bmatrix}":o}return r(this.items,!1)},i},{isClass:!0,isNode:!0});function Ww(e){var{subset:n,matrix:i}=e;return function(r,a,c){try{if(Array.isArray(r))return i(r).subset(a,c).valueOf();if(r&&typeof r.subset=="function")return r.subset(a,c);if(typeof r=="string")return n(r,a,c);if(typeof r=="object"){if(!a.isObjectProperty())throw TypeError("Cannot apply a numeric index as object property");return dt(r,a.getObjectProperty(),c),r}else throw new TypeError("Cannot apply index: unsupported type of object")}catch(l){throw Br(l)}}}var on=[{AssignmentNode:{},FunctionAssignmentNode:{}},{ConditionalNode:{latexLeftParens:!1,latexRightParens:!1,latexParens:!1}},{"OperatorNode:or":{associativity:"left",associativeWith:[]}},{"OperatorNode:xor":{associativity:"left",associativeWith:[]}},{"OperatorNode:and":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitOr":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitXor":{associativity:"left",associativeWith:[]}},{"OperatorNode:bitAnd":{associativity:"left",associativeWith:[]}},{"OperatorNode:equal":{associativity:"left",associativeWith:[]},"OperatorNode:unequal":{associativity:"left",associativeWith:[]},"OperatorNode:smaller":{associativity:"left",associativeWith:[]},"OperatorNode:larger":{associativity:"left",associativeWith:[]},"OperatorNode:smallerEq":{associativity:"left",associativeWith:[]},"OperatorNode:largerEq":{associativity:"left",associativeWith:[]},RelationalNode:{associativity:"left",associativeWith:[]}},{"OperatorNode:leftShift":{associativity:"left",associativeWith:[]},"OperatorNode:rightArithShift":{associativity:"left",associativeWith:[]},"OperatorNode:rightLogShift":{associativity:"left",associativeWith:[]}},{"OperatorNode:to":{associativity:"left",associativeWith:[]}},{RangeNode:{}},{"OperatorNode:add":{associativity:"left",associativeWith:["OperatorNode:add","OperatorNode:subtract"]},"OperatorNode:subtract":{associativity:"left",associativeWith:[]}},{"OperatorNode:multiply":{associativity:"left",associativeWith:["OperatorNode:multiply","OperatorNode:divide","Operator:dotMultiply","Operator:dotDivide"]},"OperatorNode:divide":{associativity:"left",associativeWith:[],latexLeftParens:!1,latexRightParens:!1,latexParens:!1},"OperatorNode:dotMultiply":{associativity:"left",associativeWith:["OperatorNode:multiply","OperatorNode:divide","OperatorNode:dotMultiply","OperatorNode:doDivide"]},"OperatorNode:dotDivide":{associativity:"left",associativeWith:[]},"OperatorNode:mod":{associativity:"left",associativeWith:[]}},{"OperatorNode:unaryPlus":{associativity:"right"},"OperatorNode:unaryMinus":{associativity:"right"},"OperatorNode:bitNot":{associativity:"right"},"OperatorNode:not":{associativity:"right"}},{"OperatorNode:pow":{associativity:"right",associativeWith:[],latexRightParens:!1},"OperatorNode:dotPow":{associativity:"right",associativeWith:[]}},{"OperatorNode:factorial":{associativity:"left"}},{"OperatorNode:transpose":{associativity:"left"}}];function Qe(e,n){var i=e;n!=="keep"&&(i=e.getContent());for(var t=i.getIdentifier(),r=0;r<on.length;r++)if(t in on[r])return r;return null}function Lt(e,n){var i=e;n!=="keep"&&(i=e.getContent());var t=i.getIdentifier(),r=Qe(i,n);if(r===null)return null;var a=on[r][t];if(Ne(a,"associativity")){if(a.associativity==="left")return"left";if(a.associativity==="right")return"right";throw Error("'"+t+"' has the invalid associativity '"+a.associativity+"'.")}return null}function ma(e,n,i){var t=i!=="keep"?e.getContent():e,r=i!=="keep"?e.getContent():n,a=t.getIdentifier(),c=r.getIdentifier(),l=Qe(t,i);if(l===null)return null;var u=on[l][a];if(Ne(u,"associativeWith")&&u.associativeWith instanceof Array){for(var f=0;f<u.associativeWith.length;f++)if(u.associativeWith[f]===c)return!0;return!1}return null}var Gw="AssignmentNode",Hw=["subset","?matrix","Node"],Zw=P(Gw,Hw,e=>{var{subset:n,matrix:i,Node:t}=e,r=Pm({subset:n}),a=Ww({subset:n,matrix:i});function c(u,f,o){if(!(this instanceof c))throw new SyntaxError("Constructor must be called with the new operator");if(this.object=u,this.index=o?f:null,this.value=o||f,!vr(u)&&!Gn(u))throw new TypeError('SymbolNode or AccessorNode expected as "object"');if(vr(u)&&u.name==="end")throw new Error('Cannot assign to symbol "end"');if(this.index&&!wt(this.index))throw new TypeError('IndexNode expected as "index"');if(!We(this.value))throw new TypeError('Node expected as "value"');Object.defineProperty(this,"name",{get:function(){return this.index?this.index.isObjectProperty()?this.index.getObjectProperty():"":this.object.name||""}.bind(this),set:function(){throw new Error("Cannot assign a new name, name is read-only")}})}c.prototype=new t,c.prototype.type="AssignmentNode",c.prototype.isAssignmentNode=!0,c.prototype._compile=function(u,f){var o=this.object._compile(u,f),s=this.index?this.index._compile(u,f):null,m=this.value._compile(u,f),h=this.object.name;if(this.index)if(this.index.isObjectProperty()){var p=this.index.getObjectProperty();return function(v,b,x){var d=o(v,b,x),M=m(v,b,x);return dt(d,p,M),M}}else{if(vr(this.object))return function(v,b,x){var d=o(v,b,x),M=m(v,b,x),S=s(v,b,d);return v.set(h,a(d,S,M)),M};var g=this.object.object._compile(u,f);if(this.object.index.isObjectProperty()){var y=this.object.index.getObjectProperty();return function(v,b,x){var d=g(v,b,x),M=Vr(d,y),S=s(v,b,M),T=m(v,b,x);return dt(d,y,a(M,S,T)),T}}else{var w=this.object.index._compile(u,f);return function(v,b,x){var d=g(v,b,x),M=w(v,b,d),S=r(d,M),T=s(v,b,S),N=m(v,b,x);return a(d,M,a(S,T,N)),N}}}else{if(!vr(this.object))throw new TypeError("SymbolNode expected as object");return function(v,b,x){var d=m(v,b,x);return v.set(h,d),d}}},c.prototype.forEach=function(u){u(this.object,"object",this),this.index&&u(this.index,"index",this),u(this.value,"value",this)},c.prototype.map=function(u){var f=this._ifNode(u(this.object,"object",this)),o=this.index?this._ifNode(u(this.index,"index",this)):null,s=this._ifNode(u(this.value,"value",this));return new c(f,o,s)},c.prototype.clone=function(){return new c(this.object,this.index,this.value)};function l(u,f){f||(f="keep");var o=Qe(u,f),s=Qe(u.value,f);return f==="all"||s!==null&&s<=o}return c.prototype._toString=function(u){var f=this.object.toString(u),o=this.index?this.index.toString(u):"",s=this.value.toString(u);return l(this,u&&u.parenthesis)&&(s="("+s+")"),f+o+" = "+s},c.prototype.toJSON=function(){return{mathjs:"AssignmentNode",object:this.object,index:this.index,value:this.value}},c.fromJSON=function(u){return new c(u.object,u.index,u.value)},c.prototype.toHTML=function(u){var f=this.object.toHTML(u),o=this.index?this.index.toHTML(u):"",s=this.value.toHTML(u);return l(this,u&&u.parenthesis)&&(s='<span class="math-paranthesis math-round-parenthesis">(</span>'+s+'<span class="math-paranthesis math-round-parenthesis">)</span>'),f+o+'<span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>'+s},c.prototype._toTex=function(u){var f=this.object.toTex(u),o=this.index?this.index.toTex(u):"",s=this.value.toTex(u);return l(this,u&&u.parenthesis)&&(s="\\left(".concat(s,"\\right)")),f+o+":="+s},c},{isClass:!0,isNode:!0}),Xw="BlockNode",Yw=["ResultSet","Node"],Jw=P(Xw,Yw,e=>{var{ResultSet:n,Node:i}=e;function t(r){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(!Array.isArray(r))throw new Error("Array expected");this.blocks=r.map(function(a){var c=a&&a.node,l=a&&a.visible!==void 0?a.visible:!0;if(!We(c))throw new TypeError('Property "node" must be a Node');if(typeof l!="boolean")throw new TypeError('Property "visible" must be a boolean');return{node:c,visible:l}})}return t.prototype=new i,t.prototype.type="BlockNode",t.prototype.isBlockNode=!0,t.prototype._compile=function(r,a){var c=Tn(this.blocks,function(l){return{evaluate:l.node._compile(r,a),visible:l.visible}});return function(u,f,o){var s=[];return Oi(c,function(h){var p=h.evaluate(u,f,o);h.visible&&s.push(p)}),new n(s)}},t.prototype.forEach=function(r){for(var a=0;a<this.blocks.length;a++)r(this.blocks[a].node,"blocks["+a+"].node",this)},t.prototype.map=function(r){for(var a=[],c=0;c<this.blocks.length;c++){var l=this.blocks[c],u=this._ifNode(r(l.node,"blocks["+c+"].node",this));a[c]={node:u,visible:l.visible}}return new t(a)},t.prototype.clone=function(){var r=this.blocks.map(function(a){return{node:a.node,visible:a.visible}});return new t(r)},t.prototype._toString=function(r){return this.blocks.map(function(a){return a.node.toString(r)+(a.visible?"":";")}).join(`
`)},t.prototype.toJSON=function(){return{mathjs:"BlockNode",blocks:this.blocks}},t.fromJSON=function(r){return new t(r.blocks)},t.prototype.toHTML=function(r){return this.blocks.map(function(a){return a.node.toHTML(r)+(a.visible?"":'<span class="math-separator">;</span>')}).join('<span class="math-separator"><br /></span>')},t.prototype._toTex=function(r){return this.blocks.map(function(a){return a.node.toTex(r)+(a.visible?"":";")}).join(`\\;\\;
`)},t},{isClass:!0,isNode:!0}),Qw="ConditionalNode",jw=["Node"],eA=P(Qw,jw,e=>{var{Node:n}=e;function i(r,a,c){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if(!We(r))throw new TypeError("Parameter condition must be a Node");if(!We(a))throw new TypeError("Parameter trueExpr must be a Node");if(!We(c))throw new TypeError("Parameter falseExpr must be a Node");this.condition=r,this.trueExpr=a,this.falseExpr=c}i.prototype=new n,i.prototype.type="ConditionalNode",i.prototype.isConditionalNode=!0,i.prototype._compile=function(r,a){var c=this.condition._compile(r,a),l=this.trueExpr._compile(r,a),u=this.falseExpr._compile(r,a);return function(o,s,m){return t(c(o,s,m))?l(o,s,m):u(o,s,m)}},i.prototype.forEach=function(r){r(this.condition,"condition",this),r(this.trueExpr,"trueExpr",this),r(this.falseExpr,"falseExpr",this)},i.prototype.map=function(r){return new i(this._ifNode(r(this.condition,"condition",this)),this._ifNode(r(this.trueExpr,"trueExpr",this)),this._ifNode(r(this.falseExpr,"falseExpr",this)))},i.prototype.clone=function(){return new i(this.condition,this.trueExpr,this.falseExpr)},i.prototype._toString=function(r){var a=r&&r.parenthesis?r.parenthesis:"keep",c=Qe(this,a),l=this.condition.toString(r),u=Qe(this.condition,a);(a==="all"||this.condition.type==="OperatorNode"||u!==null&&u<=c)&&(l="("+l+")");var f=this.trueExpr.toString(r),o=Qe(this.trueExpr,a);(a==="all"||this.trueExpr.type==="OperatorNode"||o!==null&&o<=c)&&(f="("+f+")");var s=this.falseExpr.toString(r),m=Qe(this.falseExpr,a);return(a==="all"||this.falseExpr.type==="OperatorNode"||m!==null&&m<=c)&&(s="("+s+")"),l+" ? "+f+" : "+s},i.prototype.toJSON=function(){return{mathjs:"ConditionalNode",condition:this.condition,trueExpr:this.trueExpr,falseExpr:this.falseExpr}},i.fromJSON=function(r){return new i(r.condition,r.trueExpr,r.falseExpr)},i.prototype.toHTML=function(r){var a=r&&r.parenthesis?r.parenthesis:"keep",c=Qe(this,a),l=this.condition.toHTML(r),u=Qe(this.condition,a);(a==="all"||this.condition.type==="OperatorNode"||u!==null&&u<=c)&&(l='<span class="math-parenthesis math-round-parenthesis">(</span>'+l+'<span class="math-parenthesis math-round-parenthesis">)</span>');var f=this.trueExpr.toHTML(r),o=Qe(this.trueExpr,a);(a==="all"||this.trueExpr.type==="OperatorNode"||o!==null&&o<=c)&&(f='<span class="math-parenthesis math-round-parenthesis">(</span>'+f+'<span class="math-parenthesis math-round-parenthesis">)</span>');var s=this.falseExpr.toHTML(r),m=Qe(this.falseExpr,a);return(a==="all"||this.falseExpr.type==="OperatorNode"||m!==null&&m<=c)&&(s='<span class="math-parenthesis math-round-parenthesis">(</span>'+s+'<span class="math-parenthesis math-round-parenthesis">)</span>'),l+'<span class="math-operator math-conditional-operator">?</span>'+f+'<span class="math-operator math-conditional-operator">:</span>'+s},i.prototype._toTex=function(r){return"\\begin{cases} {"+this.trueExpr.toTex(r)+"}, &\\quad{\\text{if }\\;"+this.condition.toTex(r)+"}\\\\{"+this.falseExpr.toTex(r)+"}, &\\quad{\\text{otherwise}}\\end{cases}"};function t(r){if(typeof r=="number"||typeof r=="boolean"||typeof r=="string")return!!r;if(r){if($e(r))return!r.isZero();if(Mn(r))return!!(r.re||r.im);if(Kt(r))return!!r.value}if(r==null)return!1;throw new TypeError('Unsupported type of condition "'+je(r)+'"')}return i},{isClass:!0,isNode:!0}),ka=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e},rA={"{":"\\{","}":"\\}","\\":"\\textbackslash{}","#":"\\#",$:"\\$","%":"\\%","&":"\\&","^":"\\textasciicircum{}",_:"\\_","~":"\\textasciitilde{}"},nA={"\u2013":"\\--","\u2014":"\\---"," ":"~","	":"\\qquad{}","\r\n":"\\newline{}","\n":"\\newline{}"},tA=function(n,i){return ka({},n,i)},iA=function(e){for(var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=n.preserveFormatting,t=i===void 0?!1:i,r=n.escapeMapFn,a=r===void 0?tA:r,c=String(e),l="",u=a(ka({},rA),t?ka({},nA):{}),f=Object.keys(u),o=function(){var m=!1;f.forEach(function(h,p){m||c.length>=h.length&&c.slice(0,h.length)===h&&(l+=u[f[p]],c=c.slice(h.length,c.length),m=!0)}),m||(l+=c.slice(0,1),c=c.slice(1,c.length))};c;)o();return l},aA=iA,Ea={Alpha:"A",alpha:"\\alpha",Beta:"B",beta:"\\beta",Gamma:"\\Gamma",gamma:"\\gamma",Delta:"\\Delta",delta:"\\delta",Epsilon:"E",epsilon:"\\epsilon",varepsilon:"\\varepsilon",Zeta:"Z",zeta:"\\zeta",Eta:"H",eta:"\\eta",Theta:"\\Theta",theta:"\\theta",vartheta:"\\vartheta",Iota:"I",iota:"\\iota",Kappa:"K",kappa:"\\kappa",varkappa:"\\varkappa",Lambda:"\\Lambda",lambda:"\\lambda",Mu:"M",mu:"\\mu",Nu:"N",nu:"\\nu",Xi:"\\Xi",xi:"\\xi",Omicron:"O",omicron:"o",Pi:"\\Pi",pi:"\\pi",varpi:"\\varpi",Rho:"P",rho:"\\rho",varrho:"\\varrho",Sigma:"\\Sigma",sigma:"\\sigma",varsigma:"\\varsigma",Tau:"T",tau:"\\tau",Upsilon:"\\Upsilon",upsilon:"\\upsilon",Phi:"\\Phi",phi:"\\phi",varphi:"\\varphi",Chi:"X",chi:"\\chi",Psi:"\\Psi",psi:"\\psi",Omega:"\\Omega",omega:"\\omega",true:"\\mathrm{True}",false:"\\mathrm{False}",i:"i",inf:"\\infty",Inf:"\\infty",infinity:"\\infty",Infinity:"\\infty",oo:"\\infty",lim:"\\lim",undefined:"\\mathbf{?}"},Ue={transpose:"^\\top",ctranspose:"^H",factorial:"!",pow:"^",dotPow:".^\\wedge",unaryPlus:"+",unaryMinus:"-",bitNot:"\\~",not:"\\neg",multiply:"\\cdot",divide:"\\frac",dotMultiply:".\\cdot",dotDivide:".:",mod:"\\mod",add:"+",subtract:"-",to:"\\rightarrow",leftShift:"<<",rightArithShift:">>",rightLogShift:">>>",equal:"=",unequal:"\\neq",smaller:"<",larger:">",smallerEq:"\\leq",largerEq:"\\geq",bitAnd:"\\&",bitXor:"\\underline{|}",bitOr:"|",and:"\\wedge",xor:"\\veebar",or:"\\vee"},Dc={abs:{1:"\\left|${args[0]}\\right|"},add:{2:"\\left(${args[0]}".concat(Ue.add,"${args[1]}\\right)")},cbrt:{1:"\\sqrt[3]{${args[0]}}"},ceil:{1:"\\left\\lceil${args[0]}\\right\\rceil"},cube:{1:"\\left(${args[0]}\\right)^3"},divide:{2:"\\frac{${args[0]}}{${args[1]}}"},dotDivide:{2:"\\left(${args[0]}".concat(Ue.dotDivide,"${args[1]}\\right)")},dotMultiply:{2:"\\left(${args[0]}".concat(Ue.dotMultiply,"${args[1]}\\right)")},dotPow:{2:"\\left(${args[0]}".concat(Ue.dotPow,"${args[1]}\\right)")},exp:{1:"\\exp\\left(${args[0]}\\right)"},expm1:"\\left(e".concat(Ue.pow,"{${args[0]}}-1\\right)"),fix:{1:"\\mathrm{${name}}\\left(${args[0]}\\right)"},floor:{1:"\\left\\lfloor${args[0]}\\right\\rfloor"},gcd:"\\gcd\\left(${args}\\right)",hypot:"\\hypot\\left(${args}\\right)",log:{1:"\\ln\\left(${args[0]}\\right)",2:"\\log_{${args[1]}}\\left(${args[0]}\\right)"},log10:{1:"\\log_{10}\\left(${args[0]}\\right)"},log1p:{1:"\\ln\\left(${args[0]}+1\\right)",2:"\\log_{${args[1]}}\\left(${args[0]}+1\\right)"},log2:"\\log_{2}\\left(${args[0]}\\right)",mod:{2:"\\left(${args[0]}".concat(Ue.mod,"${args[1]}\\right)")},multiply:{2:"\\left(${args[0]}".concat(Ue.multiply,"${args[1]}\\right)")},norm:{1:"\\left\\|${args[0]}\\right\\|",2:void 0},nthRoot:{2:"\\sqrt[${args[1]}]{${args[0]}}"},nthRoots:{2:"\\{y : $y^{args[1]} = {${args[0]}}\\}"},pow:{2:"\\left(${args[0]}\\right)".concat(Ue.pow,"{${args[1]}}")},round:{1:"\\left\\lfloor${args[0]}\\right\\rceil",2:void 0},sign:{1:"\\mathrm{${name}}\\left(${args[0]}\\right)"},sqrt:{1:"\\sqrt{${args[0]}}"},square:{1:"\\left(${args[0]}\\right)^2"},subtract:{2:"\\left(${args[0]}".concat(Ue.subtract,"${args[1]}\\right)")},unaryMinus:{1:"".concat(Ue.unaryMinus,"\\left(${args[0]}\\right)")},unaryPlus:{1:"".concat(Ue.unaryPlus,"\\left(${args[0]}\\right)")},bitAnd:{2:"\\left(${args[0]}".concat(Ue.bitAnd,"${args[1]}\\right)")},bitNot:{1:Ue.bitNot+"\\left(${args[0]}\\right)"},bitOr:{2:"\\left(${args[0]}".concat(Ue.bitOr,"${args[1]}\\right)")},bitXor:{2:"\\left(${args[0]}".concat(Ue.bitXor,"${args[1]}\\right)")},leftShift:{2:"\\left(${args[0]}".concat(Ue.leftShift,"${args[1]}\\right)")},rightArithShift:{2:"\\left(${args[0]}".concat(Ue.rightArithShift,"${args[1]}\\right)")},rightLogShift:{2:"\\left(${args[0]}".concat(Ue.rightLogShift,"${args[1]}\\right)")},bellNumbers:{1:"\\mathrm{B}_{${args[0]}}"},catalan:{1:"\\mathrm{C}_{${args[0]}}"},stirlingS2:{2:"\\mathrm{S}\\left(${args}\\right)"},arg:{1:"\\arg\\left(${args[0]}\\right)"},conj:{1:"\\left(${args[0]}\\right)^*"},im:{1:"\\Im\\left\\lbrace${args[0]}\\right\\rbrace"},re:{1:"\\Re\\left\\lbrace${args[0]}\\right\\rbrace"},and:{2:"\\left(${args[0]}".concat(Ue.and,"${args[1]}\\right)")},not:{1:Ue.not+"\\left(${args[0]}\\right)"},or:{2:"\\left(${args[0]}".concat(Ue.or,"${args[1]}\\right)")},xor:{2:"\\left(${args[0]}".concat(Ue.xor,"${args[1]}\\right)")},cross:{2:"\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)"},ctranspose:{1:"\\left(${args[0]}\\right)".concat(Ue.ctranspose)},det:{1:"\\det\\left(${args[0]}\\right)"},dot:{2:"\\left(${args[0]}\\cdot${args[1]}\\right)"},expm:{1:"\\exp\\left(${args[0]}\\right)"},inv:{1:"\\left(${args[0]}\\right)^{-1}"},pinv:{1:"\\left(${args[0]}\\right)^{+}"},sqrtm:{1:"{${args[0]}}".concat(Ue.pow,"{\\frac{1}{2}}")},trace:{1:"\\mathrm{tr}\\left(${args[0]}\\right)"},transpose:{1:"\\left(${args[0]}\\right)".concat(Ue.transpose)},combinations:{2:"\\binom{${args[0]}}{${args[1]}}"},combinationsWithRep:{2:"\\left(\\!\\!{\\binom{${args[0]}}{${args[1]}}}\\!\\!\\right)"},factorial:{1:"\\left(${args[0]}\\right)".concat(Ue.factorial)},gamma:{1:"\\Gamma\\left(${args[0]}\\right)"},lgamma:{1:"\\ln\\Gamma\\left(${args[0]}\\right)"},equal:{2:"\\left(${args[0]}".concat(Ue.equal,"${args[1]}\\right)")},larger:{2:"\\left(${args[0]}".concat(Ue.larger,"${args[1]}\\right)")},largerEq:{2:"\\left(${args[0]}".concat(Ue.largerEq,"${args[1]}\\right)")},smaller:{2:"\\left(${args[0]}".concat(Ue.smaller,"${args[1]}\\right)")},smallerEq:{2:"\\left(${args[0]}".concat(Ue.smallerEq,"${args[1]}\\right)")},unequal:{2:"\\left(${args[0]}".concat(Ue.unequal,"${args[1]}\\right)")},erf:{1:"erf\\left(${args[0]}\\right)"},max:"\\max\\left(${args}\\right)",min:"\\min\\left(${args}\\right)",variance:"\\mathrm{Var}\\left(${args}\\right)",acos:{1:"\\cos^{-1}\\left(${args[0]}\\right)"},acosh:{1:"\\cosh^{-1}\\left(${args[0]}\\right)"},acot:{1:"\\cot^{-1}\\left(${args[0]}\\right)"},acoth:{1:"\\coth^{-1}\\left(${args[0]}\\right)"},acsc:{1:"\\csc^{-1}\\left(${args[0]}\\right)"},acsch:{1:"\\mathrm{csch}^{-1}\\left(${args[0]}\\right)"},asec:{1:"\\sec^{-1}\\left(${args[0]}\\right)"},asech:{1:"\\mathrm{sech}^{-1}\\left(${args[0]}\\right)"},asin:{1:"\\sin^{-1}\\left(${args[0]}\\right)"},asinh:{1:"\\sinh^{-1}\\left(${args[0]}\\right)"},atan:{1:"\\tan^{-1}\\left(${args[0]}\\right)"},atan2:{2:"\\mathrm{atan2}\\left(${args}\\right)"},atanh:{1:"\\tanh^{-1}\\left(${args[0]}\\right)"},cos:{1:"\\cos\\left(${args[0]}\\right)"},cosh:{1:"\\cosh\\left(${args[0]}\\right)"},cot:{1:"\\cot\\left(${args[0]}\\right)"},coth:{1:"\\coth\\left(${args[0]}\\right)"},csc:{1:"\\csc\\left(${args[0]}\\right)"},csch:{1:"\\mathrm{csch}\\left(${args[0]}\\right)"},sec:{1:"\\sec\\left(${args[0]}\\right)"},sech:{1:"\\mathrm{sech}\\left(${args[0]}\\right)"},sin:{1:"\\sin\\left(${args[0]}\\right)"},sinh:{1:"\\sinh\\left(${args[0]}\\right)"},tan:{1:"\\tan\\left(${args[0]}\\right)"},tanh:{1:"\\tanh\\left(${args[0]}\\right)"},to:{2:"\\left(${args[0]}".concat(Ue.to,"${args[1]}\\right)")},numeric:function(n,i){return n.args[0].toTex()},number:{0:"0",1:"\\left(${args[0]}\\right)",2:"\\left(\\left(${args[0]}\\right)${args[1]}\\right)"},string:{0:'\\mathtt{""}',1:"\\mathrm{string}\\left(${args[0]}\\right)"},bignumber:{0:"0",1:"\\left(${args[0]}\\right)"},complex:{0:"0",1:"\\left(${args[0]}\\right)",2:"\\left(\\left(${args[0]}\\right)+".concat(Ea.i,"\\cdot\\left(${args[1]}\\right)\\right)")},matrix:{0:"\\begin{bmatrix}\\end{bmatrix}",1:"\\left(${args[0]}\\right)",2:"\\left(${args[0]}\\right)"},sparse:{0:"\\begin{bsparse}\\end{bsparse}",1:"\\left(${args[0]}\\right)"},unit:{1:"\\left(${args[0]}\\right)",2:"\\left(\\left(${args[0]}\\right)${args[1]}\\right)"}},sA="\\mathrm{${name}}\\left(${args}\\right)",Ic={deg:"^\\circ"};function Ca(e){return aA(e,{preserveFormatting:!0})}function $m(e,n){return n=typeof n=="undefined"?!1:n,n?Ne(Ic,e)?Ic[e]:"\\mathrm{"+Ca(e)+"}":Ne(Ea,e)?Ea[e]:Ca(e)}var oA="ConstantNode",uA=["Node"],cA=P(oA,uA,e=>{var{Node:n}=e;function i(t){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");this.value=t}return i.prototype=new n,i.prototype.type="ConstantNode",i.prototype.isConstantNode=!0,i.prototype._compile=function(t,r){var a=this.value;return function(){return a}},i.prototype.forEach=function(t){},i.prototype.map=function(t){return this.clone()},i.prototype.clone=function(){return new i(this.value)},i.prototype._toString=function(t){return Oe(this.value,t)},i.prototype.toHTML=function(t){var r=this._toString(t);switch(je(this.value)){case"number":case"BigNumber":case"Fraction":return'<span class="math-number">'+r+"</span>";case"string":return'<span class="math-string">'+r+"</span>";case"boolean":return'<span class="math-boolean">'+r+"</span>";case"null":return'<span class="math-null-symbol">'+r+"</span>";case"undefined":return'<span class="math-undefined">'+r+"</span>";default:return'<span class="math-symbol">'+r+"</span>"}},i.prototype.toJSON=function(){return{mathjs:"ConstantNode",value:this.value}},i.fromJSON=function(t){return new i(t.value)},i.prototype._toTex=function(t){var r=this._toString(t);switch(je(this.value)){case"string":return"\\mathtt{"+Ca(r)+"}";case"number":case"BigNumber":{if(!isFinite(this.value))return this.value.valueOf()<0?"-\\infty":"\\infty";var a=r.toLowerCase().indexOf("e");if(a!==-1)return r.substring(0,a)+"\\cdot10^{"+r.substring(a+1)+"}"}return r;case"Fraction":return this.value.toLatex();default:return r}},i},{isClass:!0,isNode:!0}),lA="FunctionAssignmentNode",fA=["typed","Node"],mA=P(lA,fA,e=>{var{typed:n,Node:i}=e;function t(a,c,l){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(typeof a!="string")throw new TypeError('String expected for parameter "name"');if(!Array.isArray(c))throw new TypeError('Array containing strings or objects expected for parameter "params"');if(!We(l))throw new TypeError('Node expected for parameter "expr"');if(zm.has(a))throw new Error('Illegal function name, "'+a+'" is a reserved keyword');this.name=a,this.params=c.map(function(u){return u&&u.name||u}),this.types=c.map(function(u){return u&&u.type||"any"}),this.expr=l}t.prototype=new i,t.prototype.type="FunctionAssignmentNode",t.prototype.isFunctionAssignmentNode=!0,t.prototype._compile=function(a,c){var l=Object.create(c);Oi(this.params,function(h){l[h]=!0});var u=this.expr._compile(a,l),f=this.name,o=this.params,s=Ls(this.types,","),m=f+"("+Ls(this.params,", ")+")";return function(p,g,y){var w={};w[s]=function(){for(var v=Object.create(g),b=0;b<o.length;b++)v[o[b]]=arguments[b];return u(p,v,y)};var A=n(f,w);return A.syntax=m,p.set(f,A),A}},t.prototype.forEach=function(a){a(this.expr,"expr",this)},t.prototype.map=function(a){var c=this._ifNode(a(this.expr,"expr",this));return new t(this.name,this.params.slice(0),c)},t.prototype.clone=function(){return new t(this.name,this.params.slice(0),this.expr)};function r(a,c){var l=Qe(a,c),u=Qe(a.expr,c);return c==="all"||u!==null&&u<=l}return t.prototype._toString=function(a){var c=a&&a.parenthesis?a.parenthesis:"keep",l=this.expr.toString(a);return r(this,c)&&(l="("+l+")"),this.name+"("+this.params.join(", ")+") = "+l},t.prototype.toJSON=function(){var a=this.types;return{mathjs:"FunctionAssignmentNode",name:this.name,params:this.params.map(function(c,l){return{name:c,type:a[l]}}),expr:this.expr}},t.fromJSON=function(a){return new t(a.name,a.params,a.expr)},t.prototype.toHTML=function(a){for(var c=a&&a.parenthesis?a.parenthesis:"keep",l=[],u=0;u<this.params.length;u++)l.push('<span class="math-symbol math-parameter">'+Ur(this.params[u])+"</span>");var f=this.expr.toHTML(a);return r(this,c)&&(f='<span class="math-parenthesis math-round-parenthesis">(</span>'+f+'<span class="math-parenthesis math-round-parenthesis">)</span>'),'<span class="math-function">'+Ur(this.name)+'</span><span class="math-parenthesis math-round-parenthesis">(</span>'+l.join('<span class="math-separator">,</span>')+'<span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>'+f},t.prototype._toTex=function(a){var c=a&&a.parenthesis?a.parenthesis:"keep",l=this.expr.toTex(a);return r(this,c)&&(l="\\left(".concat(l,"\\right)")),"\\mathrm{"+this.name+"}\\left("+this.params.map($m).join(",")+"\\right):="+l},t},{isClass:!0,isNode:!0}),hA="IndexNode",pA=["Node","size"],gA=P(hA,pA,e=>{var{Node:n,size:i}=e;function t(r,a){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");if(this.dimensions=r,this.dotNotation=a||!1,!Array.isArray(r)||!r.every(We))throw new TypeError('Array containing Nodes expected for parameter "dimensions"');if(this.dotNotation&&!this.isObjectProperty())throw new Error("dotNotation only applicable for object properties")}return t.prototype=new n,t.prototype.type="IndexNode",t.prototype.isIndexNode=!0,t.prototype._compile=function(r,a){var c=Tn(this.dimensions,function(u,f){var o=u.filter(h=>h.isSymbolNode&&h.name==="end").length>0;if(o){var s=Object.create(a);s.end=!0;var m=u._compile(r,s);return function(p,g,y){if(!Ce(y)&&!Ze(y)&&!Or(y))throw new TypeError('Cannot resolve "end": context must be a Matrix, Array, or string but is '+je(y));var w=i(y).valueOf(),A=Object.create(g);return A.end=w[f],m(p,A,y)}}else return u._compile(r,a)}),l=Vr(r,"index");return function(f,o,s){var m=Tn(c,function(h){return h(f,o,s)});return l(...m)}},t.prototype.forEach=function(r){for(var a=0;a<this.dimensions.length;a++)r(this.dimensions[a],"dimensions["+a+"]",this)},t.prototype.map=function(r){for(var a=[],c=0;c<this.dimensions.length;c++)a[c]=this._ifNode(r(this.dimensions[c],"dimensions["+c+"]",this));return new t(a,this.dotNotation)},t.prototype.clone=function(){return new t(this.dimensions.slice(0),this.dotNotation)},t.prototype.isObjectProperty=function(){return this.dimensions.length===1&&Ye(this.dimensions[0])&&typeof this.dimensions[0].value=="string"},t.prototype.getObjectProperty=function(){return this.isObjectProperty()?this.dimensions[0].value:null},t.prototype._toString=function(r){return this.dotNotation?"."+this.getObjectProperty():"["+this.dimensions.join(", ")+"]"},t.prototype.toJSON=function(){return{mathjs:"IndexNode",dimensions:this.dimensions,dotNotation:this.dotNotation}},t.fromJSON=function(r){return new t(r.dimensions,r.dotNotation)},t.prototype.toHTML=function(r){for(var a=[],c=0;c<this.dimensions.length;c++)a[c]=this.dimensions[c].toHTML();return this.dotNotation?'<span class="math-operator math-accessor-operator">.</span><span class="math-symbol math-property">'+Ur(this.getObjectProperty())+"</span>":'<span class="math-parenthesis math-square-parenthesis">[</span>'+a.join('<span class="math-separator">,</span>')+'<span class="math-parenthesis math-square-parenthesis">]</span>'},t.prototype._toTex=function(r){var a=this.dimensions.map(function(c){return c.toTex(r)});return this.dotNotation?"."+this.getObjectProperty():"_{"+a.join(",")+"}"},t},{isClass:!0,isNode:!0}),dA="ObjectNode",vA=["Node"],bA=P(dA,vA,e=>{var{Node:n}=e;function i(t){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if(this.properties=t||{},t&&(typeof t!="object"||!Object.keys(t).every(function(r){return We(t[r])})))throw new TypeError("Object containing Nodes expected")}return i.prototype=new n,i.prototype.type="ObjectNode",i.prototype.isObjectNode=!0,i.prototype._compile=function(t,r){var a={};for(var c in this.properties)if(Ne(this.properties,c)){var l=si(c),u=JSON.parse(l);if(!qa(this.properties,u))throw new Error('No access to property "'+u+'"');a[u]=this.properties[c]._compile(t,r)}return function(o,s,m){var h={};for(var p in a)Ne(a,p)&&(h[p]=a[p](o,s,m));return h}},i.prototype.forEach=function(t){for(var r in this.properties)Ne(this.properties,r)&&t(this.properties[r],"properties["+si(r)+"]",this)},i.prototype.map=function(t){var r={};for(var a in this.properties)Ne(this.properties,a)&&(r[a]=this._ifNode(t(this.properties[a],"properties["+si(a)+"]",this)));return new i(r)},i.prototype.clone=function(){var t={};for(var r in this.properties)Ne(this.properties,r)&&(t[r]=this.properties[r]);return new i(t)},i.prototype._toString=function(t){var r=[];for(var a in this.properties)Ne(this.properties,a)&&r.push(si(a)+": "+this.properties[a].toString(t));return"{"+r.join(", ")+"}"},i.prototype.toJSON=function(){return{mathjs:"ObjectNode",properties:this.properties}},i.fromJSON=function(t){return new i(t.properties)},i.prototype.toHTML=function(t){var r=[];for(var a in this.properties)Ne(this.properties,a)&&r.push('<span class="math-symbol math-property">'+Ur(a)+'</span><span class="math-operator math-assignment-operator math-property-assignment-operator math-binary-operator">:</span>'+this.properties[a].toHTML(t));return'<span class="math-parenthesis math-curly-parenthesis">{</span>'+r.join('<span class="math-separator">,</span>')+'<span class="math-parenthesis math-curly-parenthesis">}</span>'},i.prototype._toTex=function(t){var r=[];for(var a in this.properties)Ne(this.properties,a)&&r.push("\\mathbf{"+a+":} & "+this.properties[a].toTex(t)+"\\\\");return"\\left\\{\\begin{array}{ll}".concat(r.join(`
`),"\\end{array}\\right\\}")},i},{isClass:!0,isNode:!0}),yA="OperatorNode",xA=["Node"],wA=P(yA,xA,e=>{var{Node:n}=e;function i(r,a,c,l,u){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if(typeof r!="string")throw new TypeError('string expected for parameter "op"');if(typeof a!="string")throw new TypeError('string expected for parameter "fn"');if(!Array.isArray(c)||!c.every(We))throw new TypeError('Array containing Nodes expected for parameter "args"');this.implicit=l===!0,this.isPercentage=u===!0,this.op=r,this.fn=a,this.args=c||[]}i.prototype=new n,i.prototype.type="OperatorNode",i.prototype.isOperatorNode=!0,i.prototype._compile=function(r,a){if(typeof this.fn!="string"||!Ka(r,this.fn))throw r[this.fn]?new Error('No access to function "'+this.fn+'"'):new Error("Function "+this.fn+' missing in provided namespace "math"');var c=Vr(r,this.fn),l=Tn(this.args,function(s){return s._compile(r,a)});if(l.length===1){var u=l[0];return function(m,h,p){return c(u(m,h,p))}}else if(l.length===2){var f=l[0],o=l[1];return function(m,h,p){return c(f(m,h,p),o(m,h,p))}}else return function(m,h,p){return c.apply(null,Tn(l,function(g){return g(m,h,p)}))}},i.prototype.forEach=function(r){for(var a=0;a<this.args.length;a++)r(this.args[a],"args["+a+"]",this)},i.prototype.map=function(r){for(var a=[],c=0;c<this.args.length;c++)a[c]=this._ifNode(r(this.args[c],"args["+c+"]",this));return new i(this.op,this.fn,a,this.implicit,this.isPercentage)},i.prototype.clone=function(){return new i(this.op,this.fn,this.args.slice(0),this.implicit,this.isPercentage)},i.prototype.isUnary=function(){return this.args.length===1},i.prototype.isBinary=function(){return this.args.length===2};function t(r,a,c,l,u){var f=Qe(r,a),o=Lt(r,a);if(a==="all"||l.length>2&&r.getIdentifier()!=="OperatorNode:add"&&r.getIdentifier()!=="OperatorNode:multiply")return l.map(function(S){switch(S.getContent().type){case"ArrayNode":case"ConstantNode":case"SymbolNode":case"ParenthesisNode":return!1;default:return!0}});var s;switch(l.length){case 0:s=[];break;case 1:{var m=Qe(l[0],a);if(u&&m!==null){var h,p;if(a==="keep"?(h=l[0].getIdentifier(),p=r.getIdentifier()):(h=l[0].getContent().getIdentifier(),p=r.getContent().getIdentifier()),on[f][p].latexLeftParens===!1){s=[!1];break}if(on[m][h].latexParens===!1){s=[!1];break}}if(m===null){s=[!1];break}if(m<=f){s=[!0];break}s=[!1]}break;case 2:{var g,y=Qe(l[0],a),w=ma(r,l[0],a);y===null?g=!1:y===f&&o==="right"&&!w||y<f?g=!0:g=!1;var A,v=Qe(l[1],a),b=ma(r,l[1],a);if(v===null?A=!1:v===f&&o==="left"&&!b||v<f?A=!0:A=!1,u){var x,d,M;a==="keep"?(x=r.getIdentifier(),d=r.args[0].getIdentifier(),M=r.args[1].getIdentifier()):(x=r.getContent().getIdentifier(),d=r.args[0].getContent().getIdentifier(),M=r.args[1].getContent().getIdentifier()),y!==null&&(on[f][x].latexLeftParens===!1&&(g=!1),on[y][d].latexParens===!1&&(g=!1)),v!==null&&(on[f][x].latexRightParens===!1&&(A=!1),on[v][M].latexParens===!1&&(A=!1))}s=[g,A]}break;default:(r.getIdentifier()==="OperatorNode:add"||r.getIdentifier()==="OperatorNode:multiply")&&(s=l.map(function(S){var T=Qe(S,a),N=ma(r,S,a),D=Lt(S,a);return T===null?!1:f===T&&o===D&&!N?!0:T<f}));break}return l.length>=2&&r.getIdentifier()==="OperatorNode:multiply"&&r.implicit&&a==="auto"&&c==="hide"&&(s=l.map(function(S,T){var N=S.getIdentifier()==="ParenthesisNode";return!!(s[T]||N)})),s}return i.prototype._toString=function(r){var a=r&&r.parenthesis?r.parenthesis:"keep",c=r&&r.implicit?r.implicit:"hide",l=this.args,u=t(this,a,c,l,!1);if(l.length===1){var f=Lt(this,a),o=l[0].toString(r);u[0]&&(o="("+o+")");var s=/[a-zA-Z]+/.test(this.op);return f==="right"?this.op+(s?" ":"")+o:f==="left"?o+(s?" ":"")+this.op:o+this.op}else if(l.length===2){var m=l[0].toString(r),h=l[1].toString(r);return u[0]&&(m="("+m+")"),u[1]&&(h="("+h+")"),this.implicit&&this.getIdentifier()==="OperatorNode:multiply"&&c==="hide"?m+" "+h:m+" "+this.op+" "+h}else if(l.length>2&&(this.getIdentifier()==="OperatorNode:add"||this.getIdentifier()==="OperatorNode:multiply")){var p=l.map(function(g,y){return g=g.toString(r),u[y]&&(g="("+g+")"),g});return this.implicit&&this.getIdentifier()==="OperatorNode:multiply"&&c==="hide"?p.join(" "):p.join(" "+this.op+" ")}else return this.fn+"("+this.args.join(", ")+")"},i.prototype.toJSON=function(){return{mathjs:"OperatorNode",op:this.op,fn:this.fn,args:this.args,implicit:this.implicit,isPercentage:this.isPercentage}},i.fromJSON=function(r){return new i(r.op,r.fn,r.args,r.implicit,r.isPercentage)},i.prototype.toHTML=function(r){var a=r&&r.parenthesis?r.parenthesis:"keep",c=r&&r.implicit?r.implicit:"hide",l=this.args,u=t(this,a,c,l,!1);if(l.length===1){var f=Lt(this,a),o=l[0].toHTML(r);return u[0]&&(o='<span class="math-parenthesis math-round-parenthesis">(</span>'+o+'<span class="math-parenthesis math-round-parenthesis">)</span>'),f==="right"?'<span class="math-operator math-unary-operator math-lefthand-unary-operator">'+Ur(this.op)+"</span>"+o:o+'<span class="math-operator math-unary-operator math-righthand-unary-operator">'+Ur(this.op)+"</span>"}else if(l.length===2){var s=l[0].toHTML(r),m=l[1].toHTML(r);return u[0]&&(s='<span class="math-parenthesis math-round-parenthesis">(</span>'+s+'<span class="math-parenthesis math-round-parenthesis">)</span>'),u[1]&&(m='<span class="math-parenthesis math-round-parenthesis">(</span>'+m+'<span class="math-parenthesis math-round-parenthesis">)</span>'),this.implicit&&this.getIdentifier()==="OperatorNode:multiply"&&c==="hide"?s+'<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>'+m:s+'<span class="math-operator math-binary-operator math-explicit-binary-operator">'+Ur(this.op)+"</span>"+m}else{var h=l.map(function(p,g){return p=p.toHTML(r),u[g]&&(p='<span class="math-parenthesis math-round-parenthesis">(</span>'+p+'<span class="math-parenthesis math-round-parenthesis">)</span>'),p});return l.length>2&&(this.getIdentifier()==="OperatorNode:add"||this.getIdentifier()==="OperatorNode:multiply")?this.implicit&&this.getIdentifier()==="OperatorNode:multiply"&&c==="hide"?h.join('<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>'):h.join('<span class="math-operator math-binary-operator math-explicit-binary-operator">'+Ur(this.op)+"</span>"):'<span class="math-function">'+Ur(this.fn)+'</span><span class="math-paranthesis math-round-parenthesis">(</span>'+h.join('<span class="math-separator">,</span>')+'<span class="math-paranthesis math-round-parenthesis">)</span>'}},i.prototype._toTex=function(r){var a=r&&r.parenthesis?r.parenthesis:"keep",c=r&&r.implicit?r.implicit:"hide",l=this.args,u=t(this,a,c,l,!0),f=Ue[this.fn];if(f=typeof f=="undefined"?this.op:f,l.length===1){var o=Lt(this,a),s=l[0].toTex(r);return u[0]&&(s="\\left(".concat(s,"\\right)")),o==="right"?f+s:s+f}else if(l.length===2){var m=l[0],h=m.toTex(r);u[0]&&(h="\\left(".concat(h,"\\right)"));var p=l[1],g=p.toTex(r);u[1]&&(g="\\left(".concat(g,"\\right)"));var y;switch(a==="keep"?y=m.getIdentifier():y=m.getContent().getIdentifier(),this.getIdentifier()){case"OperatorNode:divide":return f+"{"+h+"}{"+g+"}";case"OperatorNode:pow":switch(h="{"+h+"}",g="{"+g+"}",y){case"ConditionalNode":case"OperatorNode:divide":h="\\left(".concat(h,"\\right)")}break;case"OperatorNode:multiply":if(this.implicit&&c==="hide")return h+"~"+g}return h+f+g}else if(l.length>2&&(this.getIdentifier()==="OperatorNode:add"||this.getIdentifier()==="OperatorNode:multiply")){var w=l.map(function(A,v){return A=A.toTex(r),u[v]&&(A="\\left(".concat(A,"\\right)")),A});return this.getIdentifier()==="OperatorNode:multiply"&&this.implicit?w.join("~"):w.join(f)}else return"\\mathrm{"+this.fn+"}\\left("+l.map(function(A){return A.toTex(r)}).join(",")+"\\right)"},i.prototype.getIdentifier=function(){return this.type+":"+this.fn},i},{isClass:!0,isNode:!0}),AA="ParenthesisNode",NA=["Node"],SA=P(AA,NA,e=>{var{Node:n}=e;function i(t){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if(!We(t))throw new TypeError('Node expected for parameter "content"');this.content=t}return i.prototype=new n,i.prototype.type="ParenthesisNode",i.prototype.isParenthesisNode=!0,i.prototype._compile=function(t,r){return this.content._compile(t,r)},i.prototype.getContent=function(){return this.content.getContent()},i.prototype.forEach=function(t){t(this.content,"content",this)},i.prototype.map=function(t){var r=t(this.content,"content",this);return new i(r)},i.prototype.clone=function(){return new i(this.content)},i.prototype._toString=function(t){return!t||t&&!t.parenthesis||t&&t.parenthesis==="keep"?"("+this.content.toString(t)+")":this.content.toString(t)},i.prototype.toJSON=function(){return{mathjs:"ParenthesisNode",content:this.content}},i.fromJSON=function(t){return new i(t.content)},i.prototype.toHTML=function(t){return!t||t&&!t.parenthesis||t&&t.parenthesis==="keep"?'<span class="math-parenthesis math-round-parenthesis">(</span>'+this.content.toHTML(t)+'<span class="math-parenthesis math-round-parenthesis">)</span>':this.content.toHTML(t)},i.prototype._toTex=function(t){return!t||t&&!t.parenthesis||t&&t.parenthesis==="keep"?"\\left(".concat(this.content.toTex(t),"\\right)"):this.content.toTex(t)},i},{isClass:!0,isNode:!0}),MA="RangeNode",TA=["Node"],kA=P(MA,TA,e=>{var{Node:n}=e;function i(r,a,c){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if(!We(r))throw new TypeError("Node expected");if(!We(a))throw new TypeError("Node expected");if(c&&!We(c))throw new TypeError("Node expected");if(arguments.length>3)throw new Error("Too many arguments");this.start=r,this.end=a,this.step=c||null}i.prototype=new n,i.prototype.type="RangeNode",i.prototype.isRangeNode=!0,i.prototype.needsEnd=function(){var r=this.filter(function(a){return vr(a)&&a.name==="end"});return r.length>0},i.prototype._compile=function(r,a){var c=r.range,l=this.start._compile(r,a),u=this.end._compile(r,a);if(this.step){var f=this.step._compile(r,a);return function(s,m,h){return c(l(s,m,h),u(s,m,h),f(s,m,h))}}else return function(s,m,h){return c(l(s,m,h),u(s,m,h))}},i.prototype.forEach=function(r){r(this.start,"start",this),r(this.end,"end",this),this.step&&r(this.step,"step",this)},i.prototype.map=function(r){return new i(this._ifNode(r(this.start,"start",this)),this._ifNode(r(this.end,"end",this)),this.step&&this._ifNode(r(this.step,"step",this)))},i.prototype.clone=function(){return new i(this.start,this.end,this.step&&this.step)};function t(r,a){var c=Qe(r,a),l={},u=Qe(r.start,a);if(l.start=u!==null&&u<=c||a==="all",r.step){var f=Qe(r.step,a);l.step=f!==null&&f<=c||a==="all"}var o=Qe(r.end,a);return l.end=o!==null&&o<=c||a==="all",l}return i.prototype._toString=function(r){var a=r&&r.parenthesis?r.parenthesis:"keep",c=t(this,a),l,u=this.start.toString(r);if(c.start&&(u="("+u+")"),l=u,this.step){var f=this.step.toString(r);c.step&&(f="("+f+")"),l+=":"+f}var o=this.end.toString(r);return c.end&&(o="("+o+")"),l+=":"+o,l},i.prototype.toJSON=function(){return{mathjs:"RangeNode",start:this.start,end:this.end,step:this.step}},i.fromJSON=function(r){return new i(r.start,r.end,r.step)},i.prototype.toHTML=function(r){var a=r&&r.parenthesis?r.parenthesis:"keep",c=t(this,a),l,u=this.start.toHTML(r);if(c.start&&(u='<span class="math-parenthesis math-round-parenthesis">(</span>'+u+'<span class="math-parenthesis math-round-parenthesis">)</span>'),l=u,this.step){var f=this.step.toHTML(r);c.step&&(f='<span class="math-parenthesis math-round-parenthesis">(</span>'+f+'<span class="math-parenthesis math-round-parenthesis">)</span>'),l+='<span class="math-operator math-range-operator">:</span>'+f}var o=this.end.toHTML(r);return c.end&&(o='<span class="math-parenthesis math-round-parenthesis">(</span>'+o+'<span class="math-parenthesis math-round-parenthesis">)</span>'),l+='<span class="math-operator math-range-operator">:</span>'+o,l},i.prototype._toTex=function(r){var a=r&&r.parenthesis?r.parenthesis:"keep",c=t(this,a),l=this.start.toTex(r);if(c.start&&(l="\\left(".concat(l,"\\right)")),this.step){var u=this.step.toTex(r);c.step&&(u="\\left(".concat(u,"\\right)")),l+=":"+u}var f=this.end.toTex(r);return c.end&&(f="\\left(".concat(f,"\\right)")),l+=":"+f,l},i},{isClass:!0,isNode:!0}),EA="RelationalNode",CA=["Node"],BA=P(EA,CA,e=>{var{Node:n}=e;function i(t,r){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if(!Array.isArray(t))throw new TypeError("Parameter conditionals must be an array");if(!Array.isArray(r))throw new TypeError("Parameter params must be an array");if(t.length!==r.length-1)throw new TypeError("Parameter params must contain exactly one more element than parameter conditionals");this.conditionals=t,this.params=r}return i.prototype=new n,i.prototype.type="RelationalNode",i.prototype.isRelationalNode=!0,i.prototype._compile=function(t,r){var a=this,c=this.params.map(l=>l._compile(t,r));return function(u,f,o){for(var s,m=c[0](u,f,o),h=0;h<a.conditionals.length;h++){s=m,m=c[h+1](u,f,o);var p=Vr(t,a.conditionals[h]);if(!p(s,m))return!1}return!0}},i.prototype.forEach=function(t){this.params.forEach((r,a)=>t(r,"params["+a+"]",this),this)},i.prototype.map=function(t){return new i(this.conditionals.slice(),this.params.map((r,a)=>this._ifNode(t(r,"params["+a+"]",this)),this))},i.prototype.clone=function(){return new i(this.conditionals,this.params)},i.prototype._toString=function(t){for(var r=t&&t.parenthesis?t.parenthesis:"keep",a=Qe(this,r),c=this.params.map(function(o,s){var m=Qe(o,r);return r==="all"||m!==null&&m<=a?"("+o.toString(t)+")":o.toString(t)}),l={equal:"==",unequal:"!=",smaller:"<",larger:">",smallerEq:"<=",largerEq:">="},u=c[0],f=0;f<this.conditionals.length;f++)u+=" "+l[this.conditionals[f]]+" "+c[f+1];return u},i.prototype.toJSON=function(){return{mathjs:"RelationalNode",conditionals:this.conditionals,params:this.params}},i.fromJSON=function(t){return new i(t.conditionals,t.params)},i.prototype.toHTML=function(t){for(var r=t&&t.parenthesis?t.parenthesis:"keep",a=Qe(this,r),c=this.params.map(function(o,s){var m=Qe(o,r);return r==="all"||m!==null&&m<=a?'<span class="math-parenthesis math-round-parenthesis">(</span>'+o.toHTML(t)+'<span class="math-parenthesis math-round-parenthesis">)</span>':o.toHTML(t)}),l={equal:"==",unequal:"!=",smaller:"<",larger:">",smallerEq:"<=",largerEq:">="},u=c[0],f=0;f<this.conditionals.length;f++)u+='<span class="math-operator math-binary-operator math-explicit-binary-operator">'+Ur(l[this.conditionals[f]])+"</span>"+c[f+1];return u},i.prototype._toTex=function(t){for(var r=t&&t.parenthesis?t.parenthesis:"keep",a=Qe(this,r),c=this.params.map(function(f,o){var s=Qe(f,r);return r==="all"||s!==null&&s<=a?"\\left("+f.toTex(t)+"\right)":f.toTex(t)}),l=c[0],u=0;u<this.conditionals.length;u++)l+=Ue[this.conditionals[u]]+c[u+1];return l},i},{isClass:!0,isNode:!0}),LA="SymbolNode",DA=["math","?Unit","Node"],IA=P(LA,DA,e=>{var{math:n,Unit:i,Node:t}=e;function r(c){return i?i.isValuelessUnit(c):!1}function a(c){if(!(this instanceof a))throw new SyntaxError("Constructor must be called with the new operator");if(typeof c!="string")throw new TypeError('String expected for parameter "name"');this.name=c}return a.prototype=new t,a.prototype.type="SymbolNode",a.prototype.isSymbolNode=!0,a.prototype._compile=function(c,l){var u=this.name;if(l[u]===!0)return function(o,s,m){return s[u]};if(u in c)return function(o,s,m){return o.has(u)?o.get(u):Vr(c,u)};var f=r(u);return function(o,s,m){return o.has(u)?o.get(u):f?new i(null,u):a.onUndefinedSymbol(u)}},a.prototype.forEach=function(c){},a.prototype.map=function(c){return this.clone()},a.onUndefinedSymbol=function(c){throw new Error("Undefined symbol "+c)},a.prototype.clone=function(){return new a(this.name)},a.prototype._toString=function(c){return this.name},a.prototype.toHTML=function(c){var l=Ur(this.name);return l==="true"||l==="false"?'<span class="math-symbol math-boolean">'+l+"</span>":l==="i"?'<span class="math-symbol math-imaginary-symbol">'+l+"</span>":l==="Infinity"?'<span class="math-symbol math-infinity-symbol">'+l+"</span>":l==="NaN"?'<span class="math-symbol math-nan-symbol">'+l+"</span>":l==="null"?'<span class="math-symbol math-null-symbol">'+l+"</span>":l==="undefined"?'<span class="math-symbol math-undefined-symbol">'+l+"</span>":'<span class="math-symbol">'+l+"</span>"},a.prototype.toJSON=function(){return{mathjs:"SymbolNode",name:this.name}},a.fromJSON=function(c){return new a(c.name)},a.prototype._toTex=function(c){var l=!1;typeof n[this.name]=="undefined"&&r(this.name)&&(l=!0);var u=$m(this.name,l);return u[0]==="\\"?u:" "+u},a},{isClass:!0,isNode:!0});function zt(e){for(var n=arguments.length,i=new Array(n>1?n-1:0),t=1;t<n;t++)i[t-1]=arguments[t];return typeof e.createSubScope=="function"?Ds(e.createSubScope(),...i):Ds(wn(),e,...i)}var OA="FunctionNode",zA=["math","Node","SymbolNode"],PA=P(OA,zA,e=>{var{math:n,Node:i,SymbolNode:t}=e;function r(f,o){if(!(this instanceof r))throw new SyntaxError("Constructor must be called with the new operator");if(typeof f=="string"&&(f=new t(f)),!We(f))throw new TypeError('Node expected as parameter "fn"');if(!Array.isArray(o)||!o.every(We))throw new TypeError('Array containing Nodes expected for parameter "args"');this.fn=f,this.args=o||[],Object.defineProperty(this,"name",{get:function(){return this.fn.name||""}.bind(this),set:function(){throw new Error("Cannot assign a new name, name is read-only")}})}r.prototype=new i,r.prototype.type="FunctionNode",r.prototype.isFunctionNode=!0;var a=f=>Oe(f,{truncate:78});r.prototype._compile=function(f,o){if(!(this instanceof r))throw new TypeError("No valid FunctionNode");var s=this.args.map(S=>S._compile(f,o));if(vr(this.fn)){var m=this.fn.name;if(o[m]){var w=this.args;return function(T,N,D){var k=N[m];if(typeof k!="function")throw new TypeError("Argument '".concat(m,"' was not a function; received: ").concat(a(k)));if(k.rawArgs)return k(w,f,zt(T,N),T);var I=s.map(_=>_(T,N,D));return k.apply(k,I)}}else{var h=m in f?Vr(f,m):void 0,p=typeof h=="function"&&h.rawArgs===!0,g=S=>{var T;if(S.has(m))T=S.get(m);else if(m in f)T=Vr(f,m);else return r.onUndefinedFunction(m);if(typeof T=="function")return T;throw new TypeError("'".concat(m,`' is not a function; its value is:
  `).concat(a(T)))};if(p){var y=this.args;return function(T,N,D){var k=g(T);return k(y,f,zt(T,N),T)}}else switch(s.length){case 0:return function(T,N,D){var k=g(T);return k()};case 1:return function(T,N,D){var k=g(T),I=s[0];return k(I(T,N,D))};case 2:return function(T,N,D){var k=g(T),I=s[0],_=s[1];return k(I(T,N,D),_(T,N,D))};default:return function(T,N,D){var k=g(T),I=s.map(_=>_(T,N,D));return k(...I)}}}}else if(Gn(this.fn)&&wt(this.fn.index)&&this.fn.index.isObjectProperty()){var A=this.fn.object._compile(f,o),v=this.fn.index.getObjectProperty(),b=this.args;return function(T,N,D){var k=A(T,N,D);bg(k,v);var I=k[v]&&k[v].rawArgs;if(I)return k[v](b,f,zt(T,N),T);var _=s.map(O=>O(T,N,D));return k[v].apply(k,_)}}else{var x=this.fn.toString(),d=this.fn._compile(f,o),M=this.args;return function(T,N,D){var k=d(T,N,D);if(typeof k!="function")throw new TypeError("Expression '".concat(x,"' did not evaluate to a function; value is:")+`
  `.concat(a(k)));if(k.rawArgs)return k(M,f,zt(T,N),T);var I=s.map(_=>_(T,N,D));return k.apply(k,I)}}},r.prototype.forEach=function(f){f(this.fn,"fn",this);for(var o=0;o<this.args.length;o++)f(this.args[o],"args["+o+"]",this)},r.prototype.map=function(f){for(var o=this._ifNode(f(this.fn,"fn",this)),s=[],m=0;m<this.args.length;m++)s[m]=this._ifNode(f(this.args[m],"args["+m+"]",this));return new r(o,s)},r.prototype.clone=function(){return new r(this.fn,this.args.slice(0))},r.onUndefinedFunction=function(f){throw new Error("Undefined function "+f)};var c=r.prototype.toString;r.prototype.toString=function(f){var o,s=this.fn.toString(f);return f&&typeof f.handler=="object"&&Ne(f.handler,s)&&(o=f.handler[s](this,f)),typeof o!="undefined"?o:c.call(this,f)},r.prototype._toString=function(f){var o=this.args.map(function(m){return m.toString(f)}),s=Vt(this.fn)?"("+this.fn.toString(f)+")":this.fn.toString(f);return s+"("+o.join(", ")+")"},r.prototype.toJSON=function(){return{mathjs:"FunctionNode",fn:this.fn,args:this.args}},r.fromJSON=function(f){return new r(f.fn,f.args)},r.prototype.toHTML=function(f){var o=this.args.map(function(s){return s.toHTML(f)});return'<span class="math-function">'+Ur(this.fn)+'</span><span class="math-paranthesis math-round-parenthesis">(</span>'+o.join('<span class="math-separator">,</span>')+'<span class="math-paranthesis math-round-parenthesis">)</span>'};function l(f,o,s){for(var m="",h=/\$(?:\{([a-z_][a-z_0-9]*)(?:\[([0-9]+)\])?\}|\$)/gi,p=0,g;(g=h.exec(f))!==null;)if(m+=f.substring(p,g.index),p=g.index,g[0]==="$$")m+="$",p++;else{p+=g[0].length;var y=o[g[1]];if(!y)throw new ReferenceError("Template: Property "+g[1]+" does not exist.");if(g[2]===void 0)switch(typeof y){case"string":m+=y;break;case"object":if(We(y))m+=y.toTex(s);else if(Array.isArray(y))m+=y.map(function(w,A){if(We(w))return w.toTex(s);throw new TypeError("Template: "+g[1]+"["+A+"] is not a Node.")}).join(",");else throw new TypeError("Template: "+g[1]+" has to be a Node, String or array of Nodes");break;default:throw new TypeError("Template: "+g[1]+" has to be a Node, String or array of Nodes")}else if(We(y[g[2]]&&y[g[2]]))m+=y[g[2]].toTex(s);else throw new TypeError("Template: "+g[1]+"["+g[2]+"] is not a Node.")}return m+=f.slice(p),m}var u=r.prototype.toTex;return r.prototype.toTex=function(f){var o;return f&&typeof f.handler=="object"&&Ne(f.handler,this.name)&&(o=f.handler[this.name](this,f)),typeof o!="undefined"?o:u.call(this,f)},r.prototype._toTex=function(f){var o=this.args.map(function(h){return h.toTex(f)}),s;Dc[this.name]&&(s=Dc[this.name]),n[this.name]&&(typeof n[this.name].toTex=="function"||typeof n[this.name].toTex=="object"||typeof n[this.name].toTex=="string")&&(s=n[this.name].toTex);var m;switch(typeof s){case"function":m=s(this,f);break;case"string":m=l(s,this,f);break;case"object":switch(typeof s[o.length]){case"function":m=s[o.length](this,f);break;case"string":m=l(s[o.length],this,f);break}}return typeof m!="undefined"?m:l(sA,this,f)},r.prototype.getIdentifier=function(){return this.type+":"+this.name},r},{isClass:!0,isNode:!0}),Oc="parse",$A=["typed","numeric","config","AccessorNode","ArrayNode","AssignmentNode","BlockNode","ConditionalNode","ConstantNode","FunctionAssignmentNode","FunctionNode","IndexNode","ObjectNode","OperatorNode","ParenthesisNode","RangeNode","RelationalNode","SymbolNode"],_A=P(Oc,$A,e=>{var{typed:n,numeric:i,config:t,AccessorNode:r,ArrayNode:a,AssignmentNode:c,BlockNode:l,ConditionalNode:u,ConstantNode:f,FunctionAssignmentNode:o,FunctionNode:s,IndexNode:m,ObjectNode:h,OperatorNode:p,ParenthesisNode:g,RangeNode:y,RelationalNode:w,SymbolNode:A}=e,v=n(Oc,{string:function(H){return U(H,{})},"Array | Matrix":function(H){return b(H,{})},"string, Object":function(H,ie){var ge=ie.nodes!==void 0?ie.nodes:{};return U(H,ge)},"Array | Matrix, Object":b});function b(E){var H=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ie=H.nodes!==void 0?H.nodes:{};return xe(E,function(ge){if(typeof ge!="string")throw new TypeError("String expected");return U(ge,ie)})}var x={NULL:0,DELIMITER:1,NUMBER:2,SYMBOL:3,UNKNOWN:4},d={",":!0,"(":!0,")":!0,"[":!0,"]":!0,"{":!0,"}":!0,'"':!0,"'":!0,";":!0,"+":!0,"-":!0,"*":!0,".*":!0,"/":!0,"./":!0,"%":!0,"^":!0,".^":!0,"~":!0,"!":!0,"&":!0,"|":!0,"^|":!0,"=":!0,":":!0,"?":!0,"==":!0,"!=":!0,"<":!0,">":!0,"<=":!0,">=":!0,"<<":!0,">>":!0,">>>":!0},M={mod:!0,to:!0,in:!0,and:!0,xor:!0,or:!0,not:!0},S={true:!0,false:!1,null:null,undefined:void 0},T=["NaN","Infinity"];function N(){return{extraNodes:{},expression:"",comment:"",index:0,token:"",tokenType:x.NULL,nestingLevel:0,conditionalLevel:null}}function D(E,H){return E.expression.substr(E.index,H)}function k(E){return D(E,1)}function I(E){E.index++}function _(E){return E.expression.charAt(E.index-1)}function O(E){return E.expression.charAt(E.index+1)}function B(E){for(E.tokenType=x.NULL,E.token="",E.comment="";;){if(k(E)==="#")for(;k(E)!==`
`&&k(E)!=="";)E.comment+=k(E),I(E);if(v.isWhitespace(k(E),E.nestingLevel))I(E);else break}if(k(E)===""){E.tokenType=x.DELIMITER;return}if(k(E)===`
`&&!E.nestingLevel){E.tokenType=x.DELIMITER,E.token=k(E),I(E);return}var H=k(E),ie=D(E,2),ge=D(E,3);if(ge.length===3&&d[ge]){E.tokenType=x.DELIMITER,E.token=ge,I(E),I(E),I(E);return}if(ie.length===2&&d[ie]){E.tokenType=x.DELIMITER,E.token=ie,I(E),I(E);return}if(d[H]){E.tokenType=x.DELIMITER,E.token=H,I(E);return}if(v.isDigitDot(H)){E.tokenType=x.NUMBER;var Ie=D(E,2);if(Ie==="0b"||Ie==="0o"||Ie==="0x"){for(E.token+=k(E),I(E),E.token+=k(E),I(E);v.isHexDigit(k(E));)E.token+=k(E),I(E);if(k(E)===".")for(E.token+=".",I(E);v.isHexDigit(k(E));)E.token+=k(E),I(E);else if(k(E)==="i")for(E.token+="i",I(E);v.isDigit(k(E));)E.token+=k(E),I(E);return}if(k(E)==="."){if(E.token+=k(E),I(E),!v.isDigit(k(E))){E.tokenType=x.DELIMITER;return}}else{for(;v.isDigit(k(E));)E.token+=k(E),I(E);v.isDecimalMark(k(E),O(E))&&(E.token+=k(E),I(E))}for(;v.isDigit(k(E));)E.token+=k(E),I(E);if(k(E)==="E"||k(E)==="e"){if(v.isDigit(O(E))||O(E)==="-"||O(E)==="+"){if(E.token+=k(E),I(E),(k(E)==="+"||k(E)==="-")&&(E.token+=k(E),I(E)),!v.isDigit(k(E)))throw Ge(E,'Digit expected, got "'+k(E)+'"');for(;v.isDigit(k(E));)E.token+=k(E),I(E);if(v.isDecimalMark(k(E),O(E)))throw Ge(E,'Digit expected, got "'+k(E)+'"')}else if(O(E)===".")throw I(E),Ge(E,'Digit expected, got "'+k(E)+'"')}return}if(v.isAlpha(k(E),_(E),O(E))){for(;v.isAlpha(k(E),_(E),O(E))||v.isDigit(k(E));)E.token+=k(E),I(E);Ne(M,E.token)?E.tokenType=x.DELIMITER:E.tokenType=x.SYMBOL;return}for(E.tokenType=x.UNKNOWN;k(E)!=="";)E.token+=k(E),I(E);throw Ge(E,'Syntax error in part "'+E.token+'"')}function L(E){do B(E);while(E.token===`
`)}function V(E){E.nestingLevel++}function C(E){E.nestingLevel--}v.isAlpha=function(H,ie,ge){return v.isValidLatinOrGreek(H)||v.isValidMathSymbol(H,ge)||v.isValidMathSymbol(ie,H)},v.isValidLatinOrGreek=function(H){return/^[a-zA-Z_$\u00C0-\u02AF\u0370-\u03FF\u2100-\u214F]$/.test(H)},v.isValidMathSymbol=function(H,ie){return/^[\uD835]$/.test(H)&&/^[\uDC00-\uDFFF]$/.test(ie)&&/^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(ie)},v.isWhitespace=function(H,ie){return H===" "||H==="	"||H===`
`&&ie>0},v.isDecimalMark=function(H,ie){return H==="."&&ie!=="/"&&ie!=="*"&&ie!=="^"},v.isDigitDot=function(H){return H>="0"&&H<="9"||H==="."},v.isDigit=function(H){return H>="0"&&H<="9"},v.isHexDigit=function(H){return H>="0"&&H<="9"||H>="a"&&H<="f"||H>="A"&&H<="F"};function U(E,H){var ie=N();wr(ie,{expression:E,extraNodes:H}),B(ie);var ge=X(ie);if(ie.token!=="")throw ie.tokenType===x.DELIMITER?In(ie,"Unexpected operator "+ie.token):Ge(ie,'Unexpected part "'+ie.token+'"');return ge}function X(E){var H,ie=[],ge;for(E.token!==""&&E.token!==`
`&&E.token!==";"&&(H=j(E),H.comment=E.comment);E.token===`
`||E.token===";";)ie.length===0&&H&&(ge=E.token!==";",ie.push({node:H,visible:ge})),B(E),E.token!==`
`&&E.token!==";"&&E.token!==""&&(H=j(E),H.comment=E.comment,ge=E.token!==";",ie.push({node:H,visible:ge}));return ie.length>0?new l(ie):(H||(H=new f(void 0),H.comment=E.comment),H)}function j(E){var H,ie,ge,Ie,_e=W(E);if(E.token==="="){if(vr(_e))return H=_e.name,L(E),ge=j(E),new c(new A(H),ge);if(Gn(_e))return L(E),ge=j(E),new c(_e.object,_e.index,ge);if(Hn(_e)&&vr(_e.fn)&&(Ie=!0,ie=[],H=_e.name,_e.args.forEach(function(mr,ia){vr(mr)?ie[ia]=mr.name:Ie=!1}),Ie))return L(E),ge=j(E),new o(H,ie,ge);throw Ge(E,"Invalid left hand side of assignment operator =")}return _e}function W(E){for(var H=Q(E);E.token==="?";){var ie=E.conditionalLevel;E.conditionalLevel=E.nestingLevel,L(E);var ge=H,Ie=j(E);if(E.token!==":")throw Ge(E,"False part of conditional expression expected");E.conditionalLevel=null,L(E);var _e=j(E);H=new u(ge,Ie,_e),E.conditionalLevel=ie}return H}function Q(E){for(var H=ne(E);E.token==="or";)L(E),H=new p("or","or",[H,ne(E)]);return H}function ne(E){for(var H=re(E);E.token==="xor";)L(E),H=new p("xor","xor",[H,re(E)]);return H}function re(E){for(var H=ae(E);E.token==="and";)L(E),H=new p("and","and",[H,ae(E)]);return H}function ae(E){for(var H=te(E);E.token==="|";)L(E),H=new p("|","bitOr",[H,te(E)]);return H}function te(E){for(var H=ue(E);E.token==="^|";)L(E),H=new p("^|","bitXor",[H,ue(E)]);return H}function ue(E){for(var H=ee(E);E.token==="&";)L(E),H=new p("&","bitAnd",[H,ee(E)]);return H}function ee(E){for(var H=[be(E)],ie=[],ge={"==":"equal","!=":"unequal","<":"smaller",">":"larger","<=":"smallerEq",">=":"largerEq"};Ne(ge,E.token);){var Ie={name:E.token,fn:ge[E.token]};ie.push(Ie),L(E),H.push(be(E))}return H.length===1?H[0]:H.length===2?new p(ie[0].name,ie[0].fn,H):new w(ie.map(_e=>_e.fn),H)}function be(E){var H,ie,ge,Ie;H=we(E);for(var _e={"<<":"leftShift",">>":"rightArithShift",">>>":"rightLogShift"};Ne(_e,E.token);)ie=E.token,ge=_e[ie],L(E),Ie=[H,we(E)],H=new p(ie,ge,Ie);return H}function we(E){var H,ie,ge,Ie;H=me(E);for(var _e={to:"to",in:"to"};Ne(_e,E.token);)ie=E.token,ge=_e[ie],L(E),ie==="in"&&E.token===""?H=new p("*","multiply",[H,new A("in")],!0):(Ie=[H,me(E)],H=new p(ie,ge,Ie));return H}function me(E){var H,ie=[];if(E.token===":"?H=new f(1):H=ye(E),E.token===":"&&E.conditionalLevel!==E.nestingLevel){for(ie.push(H);E.token===":"&&ie.length<3;)L(E),E.token===")"||E.token==="]"||E.token===","||E.token===""?ie.push(new A("end")):ie.push(ye(E));ie.length===3?H=new y(ie[0],ie[2],ie[1]):H=new y(ie[0],ie[1])}return H}function ye(E){var H,ie,ge,Ie;H=$(E);for(var _e={"+":"add","-":"subtract"};Ne(_e,E.token);){ie=E.token,ge=_e[ie],L(E);var mr=$(E);mr.isPercentage?Ie=[H,new p("*","multiply",[H,mr])]:Ie=[H,mr],H=new p(ie,ge,Ie)}return H}function $(E){var H,ie,ge,Ie;H=Z(E),ie=H;for(var _e={"*":"multiply",".*":"dotMultiply","/":"divide","./":"dotDivide"};Ne(_e,E.token);)ge=E.token,Ie=_e[ge],L(E),ie=Z(E),H=new p(ge,Ie,[H,ie]);return H}function Z(E){var H,ie;for(H=K(E),ie=H;E.tokenType===x.SYMBOL||E.token==="in"&&Ye(H)||E.tokenType===x.NUMBER&&!Ye(ie)&&(!Ir(ie)||ie.op==="!")||E.token==="(";)ie=K(E),H=new p("*","multiply",[H,ie],!0);return H}function K(E){for(var H=R(E),ie=H,ge=[];E.token==="/"&&Ye(ie);)if(ge.push(wr({},E)),L(E),E.tokenType===x.NUMBER)if(ge.push(wr({},E)),L(E),E.tokenType===x.SYMBOL||E.token==="(")wr(E,ge.pop()),ge.pop(),ie=R(E),H=new p("/","divide",[H,ie]);else{ge.pop(),wr(E,ge.pop());break}else{wr(E,ge.pop());break}return H}function R(E){var H,ie,ge,Ie;H=Y(E);for(var _e={"%":"mod",mod:"mod"};Ne(_e,E.token);)ie=E.token,ge=_e[ie],L(E),ie==="%"&&E.tokenType===x.DELIMITER&&E.token!=="("?H=new p("/","divide",[H,new f(100)],!1,!0):(Ie=[H,Y(E)],H=new p(ie,ge,Ie));return H}function Y(E){var H,ie,ge,Ie={"-":"unaryMinus","+":"unaryPlus","~":"bitNot",not:"not"};return Ne(Ie,E.token)?(ge=Ie[E.token],H=E.token,L(E),ie=[Y(E)],new p(H,ge,ie)):z(E)}function z(E){var H,ie,ge,Ie;return H=F(E),(E.token==="^"||E.token===".^")&&(ie=E.token,ge=ie==="^"?"pow":"dotPow",L(E),Ie=[H,Y(E)],H=new p(ie,ge,Ie)),H}function F(E){var H,ie,ge,Ie;H=J(E);for(var _e={"!":"factorial","'":"ctranspose"};Ne(_e,E.token);)ie=E.token,ge=_e[ie],B(E),Ie=[H],H=new p(ie,ge,Ie),H=oe(E,H);return H}function J(E){var H=[];if(E.tokenType===x.SYMBOL&&Ne(E.extraNodes,E.token)){var ie=E.extraNodes[E.token];if(B(E),E.token==="("){if(H=[],V(E),B(E),E.token!==")")for(H.push(j(E));E.token===",";)B(E),H.push(j(E));if(E.token!==")")throw Ge(E,"Parenthesis ) expected");C(E),B(E)}return new ie(H)}return q(E)}function q(E){var H,ie;return E.tokenType===x.SYMBOL||E.tokenType===x.DELIMITER&&E.token in M?(ie=E.token,B(E),Ne(S,ie)?H=new f(S[ie]):T.indexOf(ie)!==-1?H=new f(i(ie,"number")):H=new A(ie),H=oe(E,H),H):le(E)}function oe(E,H,ie){for(var ge;(E.token==="("||E.token==="["||E.token===".")&&(!ie||ie.indexOf(E.token)!==-1);)if(ge=[],E.token==="(")if(vr(H)||Gn(H)){if(V(E),B(E),E.token!==")")for(ge.push(j(E));E.token===",";)B(E),ge.push(j(E));if(E.token!==")")throw Ge(E,"Parenthesis ) expected");C(E),B(E),H=new s(H,ge)}else return H;else if(E.token==="["){if(V(E),B(E),E.token!=="]")for(ge.push(j(E));E.token===",";)B(E),ge.push(j(E));if(E.token!=="]")throw Ge(E,"Parenthesis ] expected");C(E),B(E),H=new r(H,new m(ge))}else{if(B(E),E.tokenType!==x.SYMBOL)throw Ge(E,"Property name expected after dot");ge.push(new f(E.token)),B(E);var Ie=!0;H=new r(H,new m(ge,Ie))}return H}function le(E){var H,ie;return E.token==='"'?(ie=ve(E),H=new f(ie),H=oe(E,H),H):he(E)}function ve(E){for(var H="";k(E)!==""&&k(E)!=='"';)k(E)==="\\"&&(H+=k(E),I(E)),H+=k(E),I(E);if(B(E),E.token!=='"')throw Ge(E,'End of string " expected');return B(E),JSON.parse('"'+H+'"')}function he(E){var H,ie;return E.token==="'"?(ie=pe(E),H=new f(ie),H=oe(E,H),H):Ae(E)}function pe(E){for(var H="";k(E)!==""&&k(E)!=="'";)k(E)==="\\"&&(H+=k(E),I(E)),H+=k(E),I(E);if(B(E),E.token!=="'")throw Ge(E,"End of string ' expected");return B(E),JSON.parse('"'+H+'"')}function Ae(E){var H,ie,ge,Ie;if(E.token==="["){if(V(E),B(E),E.token!=="]"){var _e=Xe(E);if(E.token===";"){for(ge=1,ie=[_e];E.token===";";)B(E),ie[ge]=Xe(E),ge++;if(E.token!=="]")throw Ge(E,"End of matrix ] expected");C(E),B(E),Ie=ie[0].items.length;for(var mr=1;mr<ge;mr++)if(ie[mr].items.length!==Ie)throw In(E,"Column dimensions mismatch ("+ie[mr].items.length+" !== "+Ie+")");H=new a(ie)}else{if(E.token!=="]")throw Ge(E,"End of matrix ] expected");C(E),B(E),H=_e}}else C(E),B(E),H=new a([]);return oe(E,H)}return or(E)}function Xe(E){for(var H=[j(E)],ie=1;E.token===",";)B(E),H[ie]=j(E),ie++;return new a(H)}function or(E){if(E.token==="{"){V(E);var H,ie={};do if(B(E),E.token!=="}"){if(E.token==='"')H=ve(E);else if(E.token==="'")H=pe(E);else if(E.tokenType===x.SYMBOL||E.tokenType===x.DELIMITER&&E.token in M)H=E.token,B(E);else throw Ge(E,"Symbol or string expected as object key");if(E.token!==":")throw Ge(E,"Colon : expected after object key");B(E),ie[H]=j(E)}while(E.token===",");if(E.token!=="}")throw Ge(E,"Comma , or bracket } expected after object value");C(E),B(E);var ge=new h(ie);return ge=oe(E,ge),ge}return nr(E)}function nr(E){var H;return E.tokenType===x.NUMBER?(H=E.token,B(E),new f(i(H,t.number))):qr(E)}function qr(E){var H;if(E.token==="("){if(V(E),B(E),H=j(E),E.token!==")")throw Ge(E,"Parenthesis ) expected");return C(E),B(E),H=new g(H),H=oe(E,H),H}return $r(E)}function $r(E){throw E.token===""?Ge(E,"Unexpected end of expression"):Ge(E,"Value expected")}function vn(E){return E.index-E.token.length+1}function Ge(E,H){var ie=vn(E),ge=new SyntaxError(H+" (char "+ie+")");return ge.char=ie,ge}function In(E,H){var ie=vn(E),ge=new SyntaxError(H+" (char "+ie+")");return ge.char=ie,ge}return v}),zc="compile",FA=["typed","parse"],RA=P(zc,FA,e=>{var{typed:n,parse:i}=e;return n(zc,{string:function(r){return i(r).compile()},"Array | Matrix":function(r){return xe(r,function(a){return i(a).compile()})}})}),Pc="evaluate",qA=["typed","parse"],KA=P(Pc,qA,e=>{var{typed:n,parse:i}=e;return n(Pc,{string:function(r){var a=wn();return i(r).compile().evaluate(a)},"string, Map | Object":function(r,a){return i(r).compile().evaluate(a)},"Array | Matrix":function(r){var a=wn();return xe(r,function(c){return i(c).compile().evaluate(a)})},"Array | Matrix, Map | Object":function(r,a){return xe(r,function(c){return i(c).compile().evaluate(a)})}})}),UA="Parser",VA=["evaluate"],WA=P(UA,VA,e=>{var{evaluate:n}=e;function i(){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");Object.defineProperty(this,"scope",{value:wn(),writable:!1})}return i.prototype.type="Parser",i.prototype.isParser=!0,i.prototype.evaluate=function(t){return n(t,this.scope)},i.prototype.get=function(t){if(this.scope.has(t))return this.scope.get(t)},i.prototype.getAll=function(){return wg(this.scope)},i.prototype.getAllAsMap=function(){return this.scope},i.prototype.set=function(t,r){return this.scope.set(t,r),r},i.prototype.remove=function(t){this.scope.delete(t)},i.prototype.clear=function(){this.scope.clear()},i},{isClass:!0}),$c="parser",GA=["typed","Parser"],HA=P($c,GA,e=>{var{typed:n,Parser:i}=e;return n($c,{"":function(){return new i}})}),_c="lup",ZA=["typed","matrix","abs","addScalar","divideScalar","multiplyScalar","subtract","larger","equalScalar","unaryMinus","DenseMatrix","SparseMatrix","Spa"],XA=P(_c,ZA,e=>{var{typed:n,matrix:i,abs:t,addScalar:r,divideScalar:a,multiplyScalar:c,subtract:l,larger:u,equalScalar:f,unaryMinus:o,DenseMatrix:s,SparseMatrix:m,Spa:h}=e;return n(_c,{DenseMatrix:function(w){return p(w)},SparseMatrix:function(w){return g(w)},Array:function(w){var A=i(w),v=p(A);return{L:v.L.valueOf(),U:v.U.valueOf(),p:v.p}}});function p(y){var w=y._size[0],A=y._size[1],v=Math.min(w,A),b=ke(y._data),x=[],d=[w,v],M=[],S=[v,A],T,N,D,k=[];for(T=0;T<w;T++)k[T]=T;for(N=0;N<A;N++){if(N>0)for(T=0;T<w;T++){var I=Math.min(T,N),_=0;for(D=0;D<I;D++)_=r(_,c(b[T][D],b[D][N]));b[T][N]=l(b[T][N],_)}var O=N,B=0,L=0;for(T=N;T<w;T++){var V=b[T][N],C=t(V);u(C,B)&&(O=T,B=C,L=V)}if(N!==O&&(k[N]=[k[O],k[O]=k[N]][0],s._swapRows(N,O,b)),N<w)for(T=N+1;T<w;T++){var U=b[T][N];f(U,0)||(b[T][N]=a(b[T][N],L))}}for(N=0;N<A;N++)for(T=0;T<w;T++){if(N===0&&(T<A&&(M[T]=[]),x[T]=[]),T<N){T<A&&(M[T][N]=b[T][N]),N<w&&(x[T][N]=0);continue}if(T===N){T<A&&(M[T][N]=b[T][N]),N<w&&(x[T][N]=1);continue}T<A&&(M[T][N]=0),N<w&&(x[T][N]=b[T][N])}var X=new s({data:x,size:d}),j=new s({data:M,size:S}),W=[];for(T=0,v=k.length;T<v;T++)W[k[T]]=T;return{L:X,U:j,p:W,toString:function(){return"L: "+this.L.toString()+`
U: `+this.U.toString()+`
P: `+this.p}}}function g(y){var w=y._size[0],A=y._size[1],v=Math.min(w,A),b=y._values,x=y._index,d=y._ptr,M=[],S=[],T=[],N=[w,v],D=[],k=[],I=[],_=[v,A],O,B,L,V=[],C=[];for(O=0;O<w;O++)V[O]=O,C[O]=O;var U=function(W,Q){var ne=C[W],re=C[Q];V[ne]=Q,V[re]=W,C[W]=re,C[Q]=ne},X=function(){var W=new h;B<w&&(T.push(M.length),M.push(1),S.push(B)),I.push(D.length);var Q=d[B],ne=d[B+1];for(L=Q;L<ne;L++)O=x[L],W.set(V[O],b[L]);B>0&&W.forEach(0,B-1,function(ue,ee){m._forEachRow(ue,M,S,T,function(be,we){be>ue&&W.accumulate(be,o(c(we,ee)))})});var re=B,ae=W.get(B),te=t(ae);W.forEach(B+1,w-1,function(ue,ee){var be=t(ee);u(be,te)&&(re=ue,te=be,ae=ee)}),B!==re&&(m._swapRows(B,re,N[1],M,S,T),m._swapRows(B,re,_[1],D,k,I),W.swap(B,re),U(B,re)),W.forEach(0,w-1,function(ue,ee){ue<=B?(D.push(ee),k.push(ue)):(ee=a(ee,ae),f(ee,0)||(M.push(ee),S.push(ue)))})};for(B=0;B<A;B++)X();return I.push(D.length),T.push(M.length),{L:new m({values:M,index:S,ptr:T,size:N}),U:new m({values:D,index:k,ptr:I,size:_}),p:V,toString:function(){return"L: "+this.L.toString()+`
U: `+this.U.toString()+`
P: `+this.p}}}}),Fc="qr",YA=["typed","matrix","zeros","identity","isZero","equal","sign","sqrt","conj","unaryMinus","addScalar","divideScalar","multiplyScalar","subtract","complex"],JA=P(Fc,YA,e=>{var{typed:n,matrix:i,zeros:t,identity:r,isZero:a,equal:c,sign:l,sqrt:u,conj:f,unaryMinus:o,addScalar:s,divideScalar:m,multiplyScalar:h,subtract:p,complex:g}=e;return wr(n(Fc,{DenseMatrix:function(b){return w(b)},SparseMatrix:function(b){return A()},Array:function(b){var x=i(b),d=w(x);return{Q:d.Q.valueOf(),R:d.R.valueOf()}}}),{_denseQRimpl:y});function y(v){var b=v._size[0],x=v._size[1],d=r([b],"dense"),M=d._data,S=v.clone(),T=S._data,N,D,k,I=t([b],"");for(k=0;k<Math.min(x,b);++k){var _=T[k][k],O=o(c(_,0)?1:l(_)),B=f(O),L=0;for(N=k;N<b;N++)L=s(L,h(T[N][k],f(T[N][k])));var V=h(O,u(L));if(!a(V)){var C=p(_,V);for(I[k]=1,N=k+1;N<b;N++)I[N]=m(T[N][k],C);var U=o(f(m(C,V))),X=void 0;for(D=k;D<x;D++){for(X=0,N=k;N<b;N++)X=s(X,h(f(I[N]),T[N][D]));for(X=h(X,U),N=k;N<b;N++)T[N][D]=h(p(T[N][D],h(I[N],X)),B)}for(N=0;N<b;N++){for(X=0,D=k;D<b;D++)X=s(X,h(M[N][D],I[D]));for(X=h(X,U),D=k;D<b;++D)M[N][D]=m(p(M[N][D],h(X,f(I[D]))),B)}}}return{Q:d,R:S,toString:function(){return"Q: "+this.Q.toString()+`
R: `+this.R.toString()}}}function w(v){var b=y(v),x=b.R._data;if(v._data.length>0)for(var d=x[0][0].type==="Complex"?g(0):0,M=0;M<x.length;++M)for(var S=0;S<M&&S<(x[0]||[]).length;++S)x[M][S]=d;return b}function A(v){throw new Error("qr not implemented for sparse matrices yet")}});function QA(e,n,i,t){for(var r=e._values,a=e._index,c=e._ptr,l=e._size,u=e._datatype,f=l[0],o=l[1],s=t&&e._values?[]:null,m=[],h=[],p=0,g=0;g<o;g++){h[g]=p;for(var y=i?i[g]:g,w=c[y],A=c[y+1],v=w;v<A;v++){var b=n?n[a[v]]:a[v];m[p]=b,s&&(s[p]=r[v]),p++}}return h[o]=p,e.createSparseMatrix({values:s,index:m,ptr:h,size:[f,o],datatype:u})}function _m(e,n,i,t,r,a,c){var l=0;for(i[c]=e;l>=0;){var u=i[c+l],f=i[t+u];f===-1?(l--,a[n++]=u):(i[t+u]=i[r+f],++l,i[c+l]=f)}return n}function jA(e,n){if(!e)return null;var i=0,t,r=[],a=[],c=0,l=n,u=2*n;for(t=0;t<n;t++)a[c+t]=-1;for(t=n-1;t>=0;t--)e[t]!==-1&&(a[l+t]=a[c+e[t]],a[c+e[t]]=t);for(t=0;t<n;t++)e[t]===-1&&(i=_m(t,i,a,c,l,r,u));return r}function eN(e,n){if(!e)return null;var i=e._index,t=e._ptr,r=e._size,a=r[0],c=r[1],l=[],u=[],f=0,o=c,s,m;if(n)for(s=0;s<a;s++)u[o+s]=-1;for(var h=0;h<c;h++){l[h]=-1,u[f+h]=-1;for(var p=t[h],g=t[h+1],y=p;y<g;y++){var w=i[y];for(s=n?u[o+w]:w;s!==-1&&s<h;s=m)m=u[f+s],u[f+s]=h,m===-1&&(l[s]=h);n&&(u[o+w]=h)}}return l}function rN(e,n,i){for(var t=e._values,r=e._index,a=e._ptr,c=e._size,l=c[1],u=0,f=0;f<l;f++){var o=a[f];for(a[f]=u;o<a[f+1];o++)n(r[o],f,t?t[o]:1,i)&&(r[u]=r[o],t&&(t[u]=t[o]),u++)}return a[l]=u,r.splice(u,r.length-u),t&&t.splice(u,t.length-u),u}function zn(e){return-e-2}var nN="csAmd",tN=["add","multiply","transpose"],iN=P(nN,tN,e=>{var{add:n,multiply:i,transpose:t}=e;return function(o,s){if(!s||o<=0||o>3)return null;var m=s._size,h=m[0],p=m[1],g=0,y=Math.max(16,10*Math.sqrt(p));y=Math.min(p-2,y);var w=r(o,s,h,p,y);rN(w,u,null);for(var A=w._index,v=w._ptr,b=v[p],x=[],d=[],M=0,S=p+1,T=2*(p+1),N=3*(p+1),D=4*(p+1),k=5*(p+1),I=6*(p+1),_=7*(p+1),O=x,B=a(p,v,d,M,N,O,T,_,S,I,D,k),L=c(p,v,d,k,D,I,y,S,N,O,T),V=0,C,U,X,j,W,Q,ne,re,ae,te,ue,ee,be,we,me,ye;L<p;){for(X=-1;V<p&&(X=d[N+V])===-1;V++);d[T+X]!==-1&&(O[d[T+X]]=-1),d[N+V]=d[T+X];var $=d[D+X],Z=d[S+X];L+=Z;var K=0;d[S+X]=-Z;var R=v[X],Y=$===0?R:b,z=Y;for(j=1;j<=$+1;j++){for(j>$?(Q=X,ne=R,re=d[M+X]-$):(Q=A[R++],ne=v[Q],re=d[M+Q]),W=1;W<=re;W++)C=A[ne++],!((ae=d[S+C])<=0)&&(K+=ae,d[S+C]=-ae,A[z++]=C,d[T+C]!==-1&&(O[d[T+C]]=O[C]),O[C]!==-1?d[T+O[C]]=d[T+C]:d[N+d[k+C]]=d[T+C]);Q!==X&&(v[Q]=zn(X),d[I+Q]=0)}for($!==0&&(b=z),d[k+X]=K,v[X]=Y,d[M+X]=z-Y,d[D+X]=-2,B=l(B,g,d,I,p),te=Y;te<z;te++)if(C=A[te],!((ue=d[D+C])<=0)){ae=-d[S+C];var F=B-ae;for(R=v[C],ee=v[C]+ue-1;R<=ee;R++)Q=A[R],d[I+Q]>=B?d[I+Q]-=ae:d[I+Q]!==0&&(d[I+Q]=d[k+Q]+F)}for(te=Y;te<z;te++){for(C=A[te],ee=v[C],be=ee+d[D+C]-1,we=ee,me=0,ye=0,R=ee;R<=be;R++)if(Q=A[R],d[I+Q]!==0){var J=d[I+Q]-B;J>0?(ye+=J,A[we++]=Q,me+=Q):(v[Q]=zn(X),d[I+Q]=0)}d[D+C]=we-ee+1;var q=we,oe=ee+d[M+C];for(R=be+1;R<oe;R++){U=A[R];var le=d[S+U];le<=0||(ye+=le,A[we++]=U,me+=U)}ye===0?(v[C]=zn(X),ae=-d[S+C],K-=ae,Z+=ae,L+=ae,d[S+C]=0,d[D+C]=-1):(d[k+C]=Math.min(d[k+C],ye),A[we]=A[q],A[q]=A[ee],A[ee]=X,d[M+C]=we-ee+1,me=(me<0?-me:me)%p,d[T+C]=d[_+me],d[_+me]=C,O[C]=me)}for(d[k+X]=K,g=Math.max(g,K),B=l(B+g,g,d,I,p),te=Y;te<z;te++)if(C=A[te],!(d[S+C]>=0))for(me=O[C],C=d[_+me],d[_+me]=-1;C!==-1&&d[T+C]!==-1;C=d[T+C],B++){for(re=d[M+C],ue=d[D+C],R=v[C]+1;R<=v[C]+re-1;R++)d[I+A[R]]=B;var ve=C;for(U=d[T+C];U!==-1;){var he=d[M+U]===re&&d[D+U]===ue;for(R=v[U]+1;he&&R<=v[U]+re-1;R++)d[I+A[R]]!==B&&(he=0);he?(v[U]=zn(C),d[S+C]+=d[S+U],d[S+U]=0,d[D+U]=-1,U=d[T+U],d[T+ve]=U):(ve=U,U=d[T+U])}}for(R=Y,te=Y;te<z;te++)C=A[te],!((ae=-d[S+C])<=0)&&(d[S+C]=ae,ye=d[k+C]+K-ae,ye=Math.min(ye,p-L-ae),d[N+ye]!==-1&&(O[d[N+ye]]=C),d[T+C]=d[N+ye],O[C]=-1,d[N+ye]=C,V=Math.min(V,ye),d[k+C]=ye,A[R++]=C);d[S+X]=Z,(d[M+X]=R-Y)===0&&(v[X]=-1,d[I+X]=0),$!==0&&(b=R)}for(C=0;C<p;C++)v[C]=zn(v[C]);for(U=0;U<=p;U++)d[N+U]=-1;for(U=p;U>=0;U--)d[S+U]>0||(d[T+U]=d[N+v[U]],d[N+v[U]]=U);for(Q=p;Q>=0;Q--)d[S+Q]<=0||v[Q]!==-1&&(d[T+Q]=d[N+v[Q]],d[N+v[Q]]=Q);for(X=0,C=0;C<=p;C++)v[C]===-1&&(X=_m(C,X,d,N,T,x,I));return x.splice(x.length-1,1),x};function r(f,o,s,m,h){var p=t(o);if(f===1&&m===s)return n(o,p);if(f===2){for(var g=p._index,y=p._ptr,w=0,A=0;A<s;A++){var v=y[A];if(y[A]=w,!(y[A+1]-v>h))for(var b=y[A+1];v<b;v++)g[w++]=g[v]}return y[s]=w,o=t(p),i(p,o)}return i(p,o)}function a(f,o,s,m,h,p,g,y,w,A,v,b){for(var x=0;x<f;x++)s[m+x]=o[x+1]-o[x];s[m+f]=0;for(var d=0;d<=f;d++)s[h+d]=-1,p[d]=-1,s[g+d]=-1,s[y+d]=-1,s[w+d]=1,s[A+d]=1,s[v+d]=0,s[b+d]=s[m+d];var M=l(0,0,s,A,f);return s[v+f]=-2,o[f]=-1,s[A+f]=0,M}function c(f,o,s,m,h,p,g,y,w,A,v){for(var b=0,x=0;x<f;x++){var d=s[m+x];if(d===0)s[h+x]=-2,b++,o[x]=-1,s[p+x]=0;else if(d>g)s[y+x]=0,s[h+x]=-1,b++,o[x]=zn(f),s[y+f]++;else{var M=s[w+d];M!==-1&&(A[M]=x),s[v+x]=s[w+d],s[w+d]=x}}return b}function l(f,o,s,m,h){if(f<2||f+o<0){for(var p=0;p<h;p++)s[m+p]!==0&&(s[m+p]=1);f=2}return f}function u(f,o){return f!==o}});function aN(e,n,i,t,r,a,c){var l,u,f=0,o;if(e<=n||i[t+n]<=i[r+e])return-1;i[r+e]=i[t+n];var s=i[a+e];if(i[a+e]=n,s===-1)f=1,o=e;else{for(f=2,o=s;o!==i[c+o];o=i[c+o]);for(l=s;l!==o;l=u)u=i[c+l],i[c+l]=o}return{jleaf:f,q:o}}var sN="csCounts",oN=["transpose"],uN=P(sN,oN,e=>{var{transpose:n}=e;return function(i,t,r,a){if(!i||!t||!r)return null;var c=i._size,l=c[0],u=c[1],f,o,s,m,h,p,g,y=4*u+(a?u+l+1:0),w=[],A=0,v=u,b=2*u,x=3*u,d=4*u,M=5*u+1;for(s=0;s<y;s++)w[s]=-1;var S=[],T=n(i),N=T._index,D=T._ptr;for(s=0;s<u;s++)for(o=r[s],S[o]=w[x+o]===-1?1:0;o!==-1&&w[x+o]===-1;o=t[o])w[x+o]=s;if(a){for(s=0;s<u;s++)w[r[s]]=s;for(f=0;f<l;f++){for(s=u,p=D[f],g=D[f+1],h=p;h<g;h++)s=Math.min(s,w[N[h]]);w[M+f]=w[d+s],w[d+s]=f}}for(f=0;f<u;f++)w[A+f]=f;for(s=0;s<u;s++){for(o=r[s],t[o]!==-1&&S[t[o]]--,m=a?w[d+s]:o;m!==-1;m=a?w[M+m]:-1)for(h=D[m];h<D[m+1];h++){f=N[h];var k=aN(f,o,w,x,v,b,A);k.jleaf>=1&&S[o]++,k.jleaf===2&&S[k.q]--}t[o]!==-1&&(w[A+o]=t[o])}for(o=0;o<u;o++)t[o]!==-1&&(S[t[o]]+=S[o]);return S}}),cN="csSqr",lN=["add","multiply","transpose"],fN=P(cN,lN,e=>{var{add:n,multiply:i,transpose:t}=e,r=iN({add:n,multiply:i,transpose:t}),a=uN({transpose:t});return function(u,f,o){var s=f._ptr,m=f._size,h=m[1],p,g={};if(g.q=r(u,f),u&&!g.q)return null;if(o){var y=u?QA(f,null,g.q,0):f;g.parent=eN(y,1);var w=jA(g.parent,h);if(g.cp=a(y,g.parent,w,1),y&&g.parent&&g.cp&&c(y,g))for(g.unz=0,p=0;p<h;p++)g.unz+=g.cp[p]}else g.unz=4*s[h]+h,g.lnz=g.unz;return g};function c(l,u){var f=l._ptr,o=l._index,s=l._size,m=s[0],h=s[1];u.pinv=[],u.leftmost=[];var p=u.parent,g=u.pinv,y=u.leftmost,w=[],A=0,v=m,b=m+h,x=m+2*h,d,M,S,T,N;for(M=0;M<h;M++)w[v+M]=-1,w[b+M]=-1,w[x+M]=0;for(d=0;d<m;d++)y[d]=-1;for(M=h-1;M>=0;M--)for(T=f[M],N=f[M+1],S=T;S<N;S++)y[o[S]]=M;for(d=m-1;d>=0;d--)g[d]=-1,M=y[d],M!==-1&&(w[x+M]++===0&&(w[b+M]=d),w[A+d]=w[v+M],w[v+M]=d);for(u.lnz=0,u.m2=m,M=0;M<h;M++)if(d=w[v+M],u.lnz++,d<0&&(d=u.m2++),g[d]=M,!(--x[M]<=0)){u.lnz+=w[x+M];var D=p[M];D!==-1&&(w[x+D]===0&&(w[b+D]=w[b+M]),w[A+w[b+M]]=w[v+D],w[v+D]=w[A+d],w[x+D]+=w[x+M])}for(d=0;d<m;d++)g[d]<0&&(g[d]=M++);return!0}});function Ba(e,n){return e[n]<0}function Fm(e,n){e[n]=zn(e[n])}function Rc(e){return e<0?zn(e):e}function mN(e,n,i,t,r){var a=n._index,c=n._ptr,l=n._size,u=l[1],f,o,s,m=0;for(t[0]=e;m>=0;){e=t[m];var h=r?r[e]:e;Ba(c,e)||(Fm(c,e),t[u+m]=h<0?0:Rc(c[h]));var p=1;for(o=t[u+m],s=h<0?0:Rc(c[h+1]);o<s;o++)if(f=a[o],!Ba(c,f)){t[u+m]=o,t[++m]=f,p=0;break}p&&(m--,t[--i]=e)}return i}function hN(e,n,i,t,r){var a=e._ptr,c=e._size,l=n._index,u=n._ptr,f=c[1],o,s,m,h=f;for(s=u[i],m=u[i+1],o=s;o<m;o++){var p=l[o];Ba(a,p)||(h=mN(p,e,h,t,r))}for(o=h;o<f;o++)Fm(a,t[o]);return h}var pN="csSpsolve",gN=["divideScalar","multiply","subtract"],dN=P(pN,gN,e=>{var{divideScalar:n,multiply:i,subtract:t}=e;return function(a,c,l,u,f,o,s){var m=a._values,h=a._index,p=a._ptr,g=a._size,y=g[1],w=c._values,A=c._index,v=c._ptr,b,x,d,M,S=hN(a,c,l,u,o);for(b=S;b<y;b++)f[u[b]]=0;for(x=v[l],d=v[l+1],b=x;b<d;b++)f[A[b]]=w[b];for(var T=S;T<y;T++){var N=u[T],D=o?o[N]:N;if(!(D<0))for(x=p[D],d=p[D+1],f[N]=n(f[N],m[s?x:d-1]),b=s?x+1:x,M=s?d:d-1;b<M;b++){var k=h[b];f[k]=t(f[k],i(m[b],f[N]))}}return S}}),vN="csLu",bN=["abs","divideScalar","multiply","subtract","larger","largerEq","SparseMatrix"],yN=P(vN,bN,e=>{var{abs:n,divideScalar:i,multiply:t,subtract:r,larger:a,largerEq:c,SparseMatrix:l}=e,u=dN({divideScalar:i,multiply:t,subtract:r});return function(o,s,m){if(!o)return null;var h=o._size,p=h[1],g,y=100,w=100;s&&(g=s.q,y=s.lnz||y,w=s.unz||w);var A=[],v=[],b=[],x=new l({values:A,index:v,ptr:b,size:[p,p]}),d=[],M=[],S=[],T=new l({values:d,index:M,ptr:S,size:[p,p]}),N=[],D,k,I=[],_=[];for(D=0;D<p;D++)I[D]=0,N[D]=-1,b[D+1]=0;y=0,w=0;for(var O=0;O<p;O++){b[O]=y,S[O]=w;var B=g?g[O]:O,L=u(x,o,B,_,I,N,1),V=-1,C=-1;for(k=L;k<p;k++)if(D=_[k],N[D]<0){var U=n(I[D]);a(U,C)&&(C=U,V=D)}else M[w]=N[D],d[w++]=I[D];if(V===-1||C<=0)return null;N[B]<0&&c(n(I[B]),t(C,m))&&(V=B);var X=I[V];for(M[w]=O,d[w++]=X,N[V]=O,v[y]=V,A[y++]=1,k=L;k<p;k++)D=_[k],N[D]<0&&(v[y]=D,A[y++]=i(I[D],X)),I[D]=0}for(b[p]=y,S[p]=w,k=0;k<y;k++)v[k]=N[v[k]];return A.splice(y,A.length-y),v.splice(y,v.length-y),d.splice(w,d.length-w),M.splice(w,M.length-w),{L:x,U:T,pinv:N}}}),qc="slu",xN=["typed","abs","add","multiply","transpose","divideScalar","subtract","larger","largerEq","SparseMatrix"],wN=P(qc,xN,e=>{var{typed:n,abs:i,add:t,multiply:r,transpose:a,divideScalar:c,subtract:l,larger:u,largerEq:f,SparseMatrix:o}=e,s=fN({add:t,multiply:r,transpose:a}),m=yN({abs:i,divideScalar:c,multiply:r,subtract:l,larger:u,largerEq:f,SparseMatrix:o});return n(qc,{"SparseMatrix, number, number":function(p,g,y){if(!Se(g)||g<0||g>3)throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");if(y<0||y>1)throw new Error("Partial pivoting threshold must be a number from 0 to 1");var w=s(g,p,!1),A=m(p,w,y);return{L:A.L,U:A.U,p:A.pinv,q:w.q,toString:function(){return"L: "+this.L.toString()+`
U: `+this.U.toString()+`
p: `+this.p.toString()+(this.q?`
q: `+this.q.toString():"")+`
`}}}})});function Kc(e,n){var i,t=n.length,r=[];if(e)for(i=0;i<t;i++)r[e[i]]=n[i];else for(i=0;i<t;i++)r[i]=n[i];return r}var Uc="lusolve",AN=["typed","matrix","lup","slu","usolve","lsolve","DenseMatrix"],NN=P(Uc,AN,e=>{var{typed:n,matrix:i,lup:t,slu:r,usolve:a,lsolve:c,DenseMatrix:l}=e,u=Ht({DenseMatrix:l});return n(Uc,{"Array, Array | Matrix":function(m,h){m=i(m);var p=t(m),g=o(p.L,p.U,p.p,null,h);return g.valueOf()},"DenseMatrix, Array | Matrix":function(m,h){var p=t(m);return o(p.L,p.U,p.p,null,h)},"SparseMatrix, Array | Matrix":function(m,h){var p=t(m);return o(p.L,p.U,p.p,null,h)},"SparseMatrix, Array | Matrix, number, number":function(m,h,p,g){var y=r(m,p,g);return o(y.L,y.U,y.p,y.q,h)},"Object, Array | Matrix":function(m,h){return o(m.L,m.U,m.p,m.q,h)}});function f(s){if(Ce(s))return s;if(Ze(s))return i(s);throw new TypeError("Invalid Matrix LU decomposition")}function o(s,m,h,p,g){s=f(s),m=f(m),h&&(g=u(s,g,!0),g._data=Kc(h,g._data));var y=c(s,g),w=a(m,y);return p&&(w._data=Kc(p,w._data)),w}}),SN="Help",MN=["parse"],TN=P(SN,MN,e=>{var{parse:n}=e;function i(t){if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if(!t)throw new Error('Argument "doc" missing');this.doc=t}return i.prototype.type="Help",i.prototype.isHelp=!0,i.prototype.toString=function(){var t=this.doc||{},r=`
`;if(t.name&&(r+="Name: "+t.name+`

`),t.category&&(r+="Category: "+t.category+`

`),t.description&&(r+=`Description:
    `+t.description+`

`),t.syntax&&(r+=`Syntax:
    `+t.syntax.join(`
    `)+`

`),t.examples){r+=`Examples:
`;for(var a={},c=0;c<t.examples.length;c++){var l=t.examples[c];r+="    "+l+`
`;var u=void 0;try{u=n(l).compile().evaluate(a)}catch(f){u=f}u!==void 0&&!Pa(u)&&(r+="        "+Oe(u,{precision:14})+`
`)}r+=`
`}return t.mayThrow&&t.mayThrow.length&&(r+="Throws: "+t.mayThrow.join(", ")+`

`),t.seealso&&t.seealso.length&&(r+="See also: "+t.seealso.join(", ")+`
`),r},i.prototype.toJSON=function(){var t=ke(this.doc);return t.mathjs="Help",t},i.fromJSON=function(t){var r={};return Object.keys(t).filter(a=>a!=="mathjs").forEach(a=>{r[a]=t[a]}),new i(r)},i.prototype.valueOf=i.prototype.toString,i},{isClass:!0}),kN="Chain",EN=["?on","math"],CN=P(kN,EN,e=>{var{on:n,math:i}=e;function t(u){if(!(this instanceof t))throw new SyntaxError("Constructor must be called with the new operator");_a(u)?this.value=u.value:this.value=u}t.prototype.type="Chain",t.prototype.isChain=!0,t.prototype.done=function(){return this.value},t.prototype.valueOf=function(){return this.value},t.prototype.toString=function(){return Oe(this.value)},t.prototype.toJSON=function(){return{mathjs:"Chain",value:this.value}},t.fromJSON=function(u){return new t(u.value)};function r(u,f){typeof f=="function"&&(t.prototype[u]=c(f))}function a(u,f){Rp(t.prototype,u,function(){var s=f();if(typeof s=="function")return c(s)})}function c(u){return function(){for(var f=[this.value],o=0;o<arguments.length;o++)f[o+1]=arguments[o];return new t(u.apply(u,f))}}t.createProxy=function(u,f){if(typeof u=="string")r(u,f);else{var o=function(h){Ne(u,h)&&l[h]===void 0&&a(h,()=>u[h])};for(var s in u)o(s)}};var l={expression:!0,docs:!0,type:!0,classes:!0,json:!0,error:!0,isChain:!0};return t.createProxy(i),n&&n("import",function(u,f,o){o||a(u,f)}),t},{isClass:!0}),Vc={name:"e",category:"Constants",syntax:["e"],description:"Euler's number, the base of the natural logarithm. Approximately equal to 2.71828",examples:["e","e ^ 2","exp(2)","log(e)"],seealso:["exp"]},BN={name:"false",category:"Constants",syntax:["false"],description:"Boolean value false",examples:["false"],seealso:["true"]},LN={name:"i",category:"Constants",syntax:["i"],description:"Imaginary unit, defined as i*i=-1. A complex number is described as a + b*i, where a is the real part, and b is the imaginary part.",examples:["i","i * i","sqrt(-1)"],seealso:[]},DN={name:"Infinity",category:"Constants",syntax:["Infinity"],description:"Infinity, a number which is larger than the maximum number that can be handled by a floating point number.",examples:["Infinity","1 / 0"],seealso:[]},IN={name:"LN10",category:"Constants",syntax:["LN10"],description:"Returns the natural logarithm of 10, approximately equal to 2.302",examples:["LN10","log(10)"],seealso:[]},ON={name:"LN2",category:"Constants",syntax:["LN2"],description:"Returns the natural logarithm of 2, approximately equal to 0.693",examples:["LN2","log(2)"],seealso:[]},zN={name:"LOG10E",category:"Constants",syntax:["LOG10E"],description:"Returns the base-10 logarithm of E, approximately equal to 0.434",examples:["LOG10E","log(e, 10)"],seealso:[]},PN={name:"LOG2E",category:"Constants",syntax:["LOG2E"],description:"Returns the base-2 logarithm of E, approximately equal to 1.442",examples:["LOG2E","log(e, 2)"],seealso:[]},$N={name:"NaN",category:"Constants",syntax:["NaN"],description:"Not a number",examples:["NaN","0 / 0"],seealso:[]},_N={name:"null",category:"Constants",syntax:["null"],description:"Value null",examples:["null"],seealso:["true","false"]},FN={name:"phi",category:"Constants",syntax:["phi"],description:"Phi is the golden ratio. Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. Phi is defined as `(1 + sqrt(5)) / 2` and is approximately 1.618034...",examples:["phi"],seealso:[]},Wc={name:"pi",category:"Constants",syntax:["pi"],description:"The number pi is a mathematical constant that is the ratio of a circle's circumference to its diameter, and is approximately equal to 3.14159",examples:["pi","sin(pi/2)"],seealso:["tau"]},RN={name:"SQRT1_2",category:"Constants",syntax:["SQRT1_2"],description:"Returns the square root of 1/2, approximately equal to 0.707",examples:["SQRT1_2","sqrt(1/2)"],seealso:[]},qN={name:"SQRT2",category:"Constants",syntax:["SQRT2"],description:"Returns the square root of 2, approximately equal to 1.414",examples:["SQRT2","sqrt(2)"],seealso:[]},KN={name:"tau",category:"Constants",syntax:["tau"],description:"Tau is the ratio constant of a circle's circumference to radius, equal to 2 * pi, approximately 6.2832.",examples:["tau","2 * pi"],seealso:["pi"]},UN={name:"true",category:"Constants",syntax:["true"],description:"Boolean value true",examples:["true"],seealso:["false"]},VN={name:"version",category:"Constants",syntax:["version"],description:"A string with the version number of math.js",examples:["version"],seealso:[]},WN={name:"bignumber",category:"Construction",syntax:["bignumber(x)"],description:"Create a big number from a number or string.",examples:["0.1 + 0.2","bignumber(0.1) + bignumber(0.2)",'bignumber("7.2")','bignumber("7.2e500")',"bignumber([0.1, 0.2, 0.3])"],seealso:["boolean","complex","fraction","index","matrix","string","unit"]},GN={name:"boolean",category:"Construction",syntax:["x","boolean(x)"],description:"Convert a string or number into a boolean.",examples:["boolean(0)","boolean(1)","boolean(3)",'boolean("true")','boolean("false")',"boolean([1, 0, 1, 1])"],seealso:["bignumber","complex","index","matrix","number","string","unit"]},HN={name:"complex",category:"Construction",syntax:["complex()","complex(re, im)","complex(string)"],description:"Create a complex number.",examples:["complex()","complex(2, 3)",'complex("7 - 2i")'],seealso:["bignumber","boolean","index","matrix","number","string","unit"]},ZN={name:"createUnit",category:"Construction",syntax:["createUnit(definitions)","createUnit(name, definition)"],description:"Create a user-defined unit and register it with the Unit type.",examples:['createUnit("foo")','createUnit("knot", {definition: "0.514444444 m/s", aliases: ["knots", "kt", "kts"]})','createUnit("mph", "1 mile/hour")'],seealso:["unit","splitUnit"]},XN={name:"fraction",category:"Construction",syntax:["fraction(num)","fraction(matrix)","fraction(num,den)","fraction({n: num, d: den})"],description:"Create a fraction from a number or from integer numerator and denominator.",examples:["fraction(0.125)","fraction(1, 3) + fraction(2, 5)","fraction({n: 333, d: 53})","fraction([sqrt(9), sqrt(10), sqrt(11)])"],seealso:["bignumber","boolean","complex","index","matrix","string","unit"]},YN={name:"index",category:"Construction",syntax:["[start]","[start:end]","[start:step:end]","[start1, start 2, ...]","[start1:end1, start2:end2, ...]","[start1:step1:end1, start2:step2:end2, ...]"],description:"Create an index to get or replace a subset of a matrix",examples:["[]","[1, 2, 3]","A = [1, 2, 3; 4, 5, 6]","A[1, :]","A[1, 2] = 50","A[0:2, 0:2] = ones(2, 2)"],seealso:["bignumber","boolean","complex","matrix,","number","range","string","unit"]},JN={name:"matrix",category:"Construction",syntax:["[]","[a1, b1, ...; a2, b2, ...]","matrix()",'matrix("dense")',"matrix([...])"],description:"Create a matrix.",examples:["[]","[1, 2, 3]","[1, 2, 3; 4, 5, 6]","matrix()","matrix([3, 4])",'matrix([3, 4; 5, 6], "sparse")','matrix([3, 4; 5, 6], "sparse", "number")'],seealso:["bignumber","boolean","complex","index","number","string","unit","sparse"]},QN={name:"number",category:"Construction",syntax:["x","number(x)","number(unit, valuelessUnit)"],description:"Create a number or convert a string or boolean into a number.",examples:["2","2e3","4.05","number(2)",'number("7.2")',"number(true)","number([true, false, true, true])",'number(unit("52cm"), "m")'],seealso:["bignumber","boolean","complex","fraction","index","matrix","string","unit"]},jN={name:"sparse",category:"Construction",syntax:["sparse()","sparse([a1, b1, ...; a1, b2, ...])",'sparse([a1, b1, ...; a1, b2, ...], "number")'],description:"Create a sparse matrix.",examples:["sparse()","sparse([3, 4; 5, 6])",'sparse([3, 0; 5, 0], "number")'],seealso:["bignumber","boolean","complex","index","number","string","unit","matrix"]},eS={name:"splitUnit",category:"Construction",syntax:["splitUnit(unit: Unit, parts: Unit[])"],description:"Split a unit in an array of units whose sum is equal to the original unit.",examples:['splitUnit(1 m, ["feet", "inch"])'],seealso:["unit","createUnit"]},rS={name:"string",category:"Construction",syntax:['"text"',"string(x)"],description:"Create a string or convert a value to a string",examples:['"Hello World!"',"string(4.2)","string(3 + 2i)"],seealso:["bignumber","boolean","complex","index","matrix","number","unit"]},nS={name:"unit",category:"Construction",syntax:["value unit","unit(value, unit)","unit(string)"],description:"Create a unit.",examples:["5.5 mm","3 inch",'unit(7.1, "kilogram")','unit("23 deg")'],seealso:["bignumber","boolean","complex","index","matrix","number","string"]},tS={name:"config",category:"Core",syntax:["config()","config(options)"],description:"Get configuration or change configuration.",examples:["config()","1/3 + 1/4",'config({number: "Fraction"})',"1/3 + 1/4"],seealso:[]},iS={name:"import",category:"Core",syntax:["import(functions)","import(functions, options)"],description:"Import functions or constants from an object.",examples:["import({myFn: f(x)=x^2, myConstant: 32 })","myFn(2)","myConstant"],seealso:[]},aS={name:"typed",category:"Core",syntax:["typed(signatures)","typed(name, signatures)"],description:"Create a typed function.",examples:['double = typed({ "number": f(x)=x+x })',"double(2)",'double("hello")'],seealso:[]},sS={name:"derivative",category:"Algebra",syntax:["derivative(expr, variable)","derivative(expr, variable, {simplify: boolean})"],description:"Takes the derivative of an expression expressed in parser Nodes. The derivative will be taken over the supplied variable in the second parameter. If there are multiple variables in the expression, it will return a partial derivative.",examples:['derivative("2x^3", "x")','derivative("2x^3", "x", {simplify: false})','derivative("2x^2 + 3x + 4", "x")','derivative("sin(2x)", "x")','f = parse("x^2 + x")','x = parse("x")',"df = derivative(f, x)","df.evaluate({x: 3})"],seealso:["simplify","parse","evaluate"]},oS={name:"leafCount",category:"Algebra",syntax:["leafCount(expr)"],description:"Computes the number of leaves in the parse tree of the given expression",examples:['leafCount("e^(i*pi)-1")','leafCount(parse("{a: 22/7, b: 10^(1/2)}"))'],seealso:["simplify"]},uS={name:"lsolve",category:"Algebra",syntax:["x=lsolve(L, b)"],description:"Finds one solution of the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.",examples:["a = [-2, 3; 2, 1]","b = [11, 9]","x = lsolve(a, b)"],seealso:["lsolveAll","lup","lusolve","usolve","matrix","sparse"]},cS={name:"lsolveAll",category:"Algebra",syntax:["x=lsolveAll(L, b)"],description:"Finds all solutions of the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.",examples:["a = [-2, 3; 2, 1]","b = [11, 9]","x = lsolve(a, b)"],seealso:["lsolve","lup","lusolve","usolve","matrix","sparse"]},lS={name:"lup",category:"Algebra",syntax:["lup(m)"],description:"Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U",examples:["lup([[2, 1], [1, 4]])","lup(matrix([[2, 1], [1, 4]]))","lup(sparse([[2, 1], [1, 4]]))"],seealso:["lusolve","lsolve","usolve","matrix","sparse","slu","qr"]},fS={name:"lusolve",category:"Algebra",syntax:["x=lusolve(A, b)","x=lusolve(lu, b)"],description:"Solves the linear system A * x = b where A is an [n x n] matrix and b is a [n] column vector.",examples:["a = [-2, 3; 2, 1]","b = [11, 9]","x = lusolve(a, b)"],seealso:["lup","slu","lsolve","usolve","matrix","sparse"]},mS={name:"qr",category:"Algebra",syntax:["qr(A)"],description:"Calculates the Matrix QR decomposition. Matrix `A` is decomposed in two matrices (`Q`, `R`) where `Q` is an orthogonal matrix and `R` is an upper triangular matrix.",examples:["qr([[1, -1,  4], [1,  4, -2], [1,  4,  2], [1,  -1, 0]])"],seealso:["lup","slu","matrix"]},hS={name:"rationalize",category:"Algebra",syntax:["rationalize(expr)","rationalize(expr, scope)","rationalize(expr, scope, detailed)"],description:"Transform a rationalizable expression in a rational fraction. If rational fraction is one variable polynomial then converts the numerator and denominator in canonical form, with decreasing exponents, returning the coefficients of numerator.",examples:['rationalize("2x/y - y/(x+1)")','rationalize("2x/y - y/(x+1)", true)'],seealso:["simplify"]},pS={name:"resolve",category:"Algebra",syntax:["resolve(node, scope)"],description:"Recursively substitute variables in an expression tree.",examples:['resolve(parse("1 + x"), { x: 7 })','resolve(parse("size(text)"), { text: "Hello World" })','resolve(parse("x + y"), { x: parse("3z") })','resolve(parse("3x"), { x: parse("y+z"), z: parse("w^y") })'],seealso:["simplify","evaluate"],mayThrow:["ReferenceError"]},gS={name:"simplify",category:"Algebra",syntax:["simplify(expr)","simplify(expr, rules)"],description:"Simplify an expression tree.",examples:['simplify("3 + 2 / 4")','simplify("2x + x")','f = parse("x * (x + 2 + x)")',"simplified = simplify(f)","simplified.evaluate({x: 2})"],seealso:["simplifyCore","derivative","evaluate","parse","rationalize","resolve"]},dS={name:"simplifyCore",category:"Algebra",syntax:["simplifyCore(node)"],description:"Perform simple one-pass simplifications on an expression tree.",examples:['simplifyCore(parse("0*x"))','simplifyCore(parse("(x+0)*2"))'],seealso:["simplify","evaluate"]},vS={name:"slu",category:"Algebra",syntax:["slu(A, order, threshold)"],description:"Calculate the Matrix LU decomposition with full pivoting. Matrix A is decomposed in two matrices (L, U) and two permutation vectors (pinv, q) where P * A * Q = L * U",examples:["slu(sparse([4.5, 0, 3.2, 0; 3.1, 2.9, 0, 0.9; 0, 1.7, 3, 0; 3.5, 0.4, 0, 1]), 1, 0.001)"],seealso:["lusolve","lsolve","usolve","matrix","sparse","lup","qr"]},bS={name:"symbolicEqual",category:"Algebra",syntax:["symbolicEqual(expr1, expr2)","symbolicEqual(expr1, expr2, options)"],description:"Returns true if the difference of the expressions simplifies to 0",examples:['symbolicEqual("x*y","y*x")','symbolicEqual("abs(x^2)", "x^2")','symbolicEqual("abs(x)", "x", {context: {abs: {trivial: true}}})'],seealso:["simplify","evaluate"]},yS={name:"usolve",category:"Algebra",syntax:["x=usolve(U, b)"],description:"Finds one solution of the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.",examples:["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"],seealso:["usolveAll","lup","lusolve","lsolve","matrix","sparse"]},xS={name:"usolveAll",category:"Algebra",syntax:["x=usolve(U, b)"],description:"Finds all solutions of the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.",examples:["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"],seealso:["usolve","lup","lusolve","lsolve","matrix","sparse"]},wS={name:"abs",category:"Arithmetic",syntax:["abs(x)"],description:"Compute the absolute value.",examples:["abs(3.5)","abs(-4.2)"],seealso:["sign"]},AS={name:"add",category:"Operators",syntax:["x + y","add(x, y)"],description:"Add two values.",examples:["a = 2.1 + 3.6","a - 3.6","3 + 2i","3 cm + 2 inch",'"2.3" + "4"'],seealso:["subtract"]},NS={name:"cbrt",category:"Arithmetic",syntax:["cbrt(x)","cbrt(x, allRoots)"],description:"Compute the cubic root value. If x = y * y * y, then y is the cubic root of x. When `x` is a number or complex number, an optional second argument `allRoots` can be provided to return all three cubic roots. If not provided, the principal root is returned",examples:["cbrt(64)","cube(4)","cbrt(-8)","cbrt(2 + 3i)","cbrt(8i)","cbrt(8i, true)","cbrt(27 m^3)"],seealso:["square","sqrt","cube","multiply"]},SS={name:"ceil",category:"Arithmetic",syntax:["ceil(x)"],description:"Round a value towards plus infinity. If x is complex, both real and imaginary part are rounded towards plus infinity.",examples:["ceil(3.2)","ceil(3.8)","ceil(-4.2)"],seealso:["floor","fix","round"]},MS={name:"cube",category:"Arithmetic",syntax:["cube(x)"],description:"Compute the cube of a value. The cube of x is x * x * x.",examples:["cube(2)","2^3","2 * 2 * 2"],seealso:["multiply","square","pow"]},TS={name:"divide",category:"Operators",syntax:["x / y","divide(x, y)"],description:"Divide two values.",examples:["a = 2 / 3","a * 3","4.5 / 2","3 + 4 / 2","(3 + 4) / 2","18 km / 4.5"],seealso:["multiply"]},kS={name:"dotDivide",category:"Operators",syntax:["x ./ y","dotDivide(x, y)"],description:"Divide two values element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","b = [2, 1, 1; 3, 2, 5]","a ./ b"],seealso:["multiply","dotMultiply","divide"]},ES={name:"dotMultiply",category:"Operators",syntax:["x .* y","dotMultiply(x, y)"],description:"Multiply two values element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","b = [2, 1, 1; 3, 2, 5]","a .* b"],seealso:["multiply","divide","dotDivide"]},CS={name:"dotPow",category:"Operators",syntax:["x .^ y","dotPow(x, y)"],description:"Calculates the power of x to y element wise.",examples:["a = [1, 2, 3; 4, 5, 6]","a .^ 2"],seealso:["pow"]},BS={name:"exp",category:"Arithmetic",syntax:["exp(x)"],description:"Calculate the exponent of a value.",examples:["exp(1.3)","e ^ 1.3","log(exp(1.3))","x = 2.4","(exp(i*x) == cos(x) + i*sin(x))   # Euler's formula"],seealso:["expm","expm1","pow","log"]},LS={name:"expm",category:"Arithmetic",syntax:["exp(x)"],description:"Compute the matrix exponential, expm(A) = e^A. The matrix must be square. Not to be confused with exp(a), which performs element-wise exponentiation.",examples:["expm([[0,2],[0,0]])"],seealso:["exp"]},DS={name:"expm1",category:"Arithmetic",syntax:["expm1(x)"],description:"Calculate the value of subtracting 1 from the exponential value.",examples:["expm1(2)","pow(e, 2) - 1","log(expm1(2) + 1)"],seealso:["exp","pow","log"]},IS={name:"fix",category:"Arithmetic",syntax:["fix(x)"],description:"Round a value towards zero. If x is complex, both real and imaginary part are rounded towards zero.",examples:["fix(3.2)","fix(3.8)","fix(-4.2)","fix(-4.8)"],seealso:["ceil","floor","round"]},OS={name:"floor",category:"Arithmetic",syntax:["floor(x)"],description:"Round a value towards minus infinity.If x is complex, both real and imaginary part are rounded towards minus infinity.",examples:["floor(3.2)","floor(3.8)","floor(-4.2)"],seealso:["ceil","fix","round"]},zS={name:"gcd",category:"Arithmetic",syntax:["gcd(a, b)","gcd(a, b, c, ...)"],description:"Compute the greatest common divisor.",examples:["gcd(8, 12)","gcd(-4, 6)","gcd(25, 15, -10)"],seealso:["lcm","xgcd"]},PS={name:"hypot",category:"Arithmetic",syntax:["hypot(a, b, c, ...)","hypot([a, b, c, ...])"],description:"Calculate the hypotenusa of a list with values. ",examples:["hypot(3, 4)","sqrt(3^2 + 4^2)","hypot(-2)","hypot([3, 4, 5])"],seealso:["abs","norm"]},$S={name:"invmod",category:"Arithmetic",syntax:["invmod(a, b)"],description:"Calculate the (modular) multiplicative inverse of a modulo b. Solution to the equation ax \u2263 1 (mod b)",examples:["invmod(8, 12)=NaN","invmod(7, 13)=2","math.invmod(15151, 15122)=10429"],seealso:["gcd","xgcd"]},_S={name:"lcm",category:"Arithmetic",syntax:["lcm(x, y)"],description:"Compute the least common multiple.",examples:["lcm(4, 6)","lcm(6, 21)","lcm(6, 21, 5)"],seealso:["gcd"]},FS={name:"log",category:"Arithmetic",syntax:["log(x)","log(x, base)"],description:"Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).",examples:["log(3.5)","a = log(2.4)","exp(a)","10 ^ 4","log(10000, 10)","log(10000) / log(10)","b = log(1024, 2)","2 ^ b"],seealso:["exp","log1p","log2","log10"]},RS={name:"log10",category:"Arithmetic",syntax:["log10(x)"],description:"Compute the 10-base logarithm of a value.",examples:["log10(0.00001)","log10(10000)","10 ^ 4","log(10000) / log(10)","log(10000, 10)"],seealso:["exp","log"]},qS={name:"log1p",category:"Arithmetic",syntax:["log1p(x)","log1p(x, base)"],description:"Calculate the logarithm of a `value+1`",examples:["log1p(2.5)","exp(log1p(1.4))","pow(10, 4)","log1p(9999, 10)","log1p(9999) / log(10)"],seealso:["exp","log","log2","log10"]},KS={name:"log2",category:"Arithmetic",syntax:["log2(x)"],description:"Calculate the 2-base of a value. This is the same as calculating `log(x, 2)`.",examples:["log2(0.03125)","log2(16)","log2(16) / log2(2)","pow(2, 4)"],seealso:["exp","log1p","log","log10"]},US={name:"mod",category:"Operators",syntax:["x % y","x mod y","mod(x, y)"],description:"Calculates the modulus, the remainder of an integer division.",examples:["7 % 3","11 % 2","10 mod 4","isOdd(x) = x % 2","isOdd(2)","isOdd(3)"],seealso:["divide"]},VS={name:"multiply",category:"Operators",syntax:["x * y","multiply(x, y)"],description:"multiply two values.",examples:["a = 2.1 * 3.4","a / 3.4","2 * 3 + 4","2 * (3 + 4)","3 * 2.1 km"],seealso:["divide"]},WS={name:"norm",category:"Arithmetic",syntax:["norm(x)","norm(x, p)"],description:"Calculate the norm of a number, vector or matrix.",examples:["abs(-3.5)","norm(-3.5)","norm(3 - 4i)","norm([1, 2, -3], Infinity)","norm([1, 2, -3], -Infinity)","norm([3, 4], 2)","norm([[1, 2], [3, 4]], 1)",'norm([[1, 2], [3, 4]], "inf")','norm([[1, 2], [3, 4]], "fro")']},GS={name:"nthRoot",category:"Arithmetic",syntax:["nthRoot(a)","nthRoot(a, root)"],description:'Calculate the nth root of a value. The principal nth root of a positive real number A, is the positive real solution of the equation "x^root = A".',examples:["4 ^ 3","nthRoot(64, 3)","nthRoot(9, 2)","sqrt(9)"],seealso:["nthRoots","pow","sqrt"]},HS={name:"nthRoots",category:"Arithmetic",syntax:["nthRoots(A)","nthRoots(A, root)"],description:'Calculate the nth roots of a value. An nth root of a positive real number A, is a positive real solution of the equation "x^root = A". This function returns an array of complex values.',examples:["nthRoots(1)","nthRoots(1, 3)"],seealso:["sqrt","pow","nthRoot"]},ZS={name:"pow",category:"Operators",syntax:["x ^ y","pow(x, y)"],description:"Calculates the power of x to y, x^y.",examples:["2^3","2*2*2","1 + e ^ (pi * i)","math.pow([[1, 2], [4, 3]], 2)","math.pow([[1, 2], [4, 3]], -1)"],seealso:["multiply","nthRoot","nthRoots","sqrt"]},XS={name:"round",category:"Arithmetic",syntax:["round(x)","round(x, n)"],description:"round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.",examples:["round(3.2)","round(3.8)","round(-4.2)","round(-4.8)","round(pi, 3)","round(123.45678, 2)"],seealso:["ceil","floor","fix"]},YS={name:"sign",category:"Arithmetic",syntax:["sign(x)"],description:"Compute the sign of a value. The sign of a value x is 1 when x>1, -1 when x<0, and 0 when x=0.",examples:["sign(3.5)","sign(-4.2)","sign(0)"],seealso:["abs"]},JS={name:"sqrt",category:"Arithmetic",syntax:["sqrt(x)"],description:"Compute the square root value. If x = y * y, then y is the square root of x.",examples:["sqrt(25)","5 * 5","sqrt(-1)"],seealso:["square","sqrtm","multiply","nthRoot","nthRoots","pow"]},QS={name:"sqrtm",category:"Arithmetic",syntax:["sqrtm(x)"],description:"Calculate the principal square root of a square matrix. The principal square root matrix `X` of another matrix `A` is such that `X * X = A`.",examples:["sqrtm([[1, 2], [3, 4]])"],seealso:["sqrt","abs","square","multiply"]},jS={name:"square",category:"Arithmetic",syntax:["square(x)"],description:"Compute the square of a value. The square of x is x * x.",examples:["square(3)","sqrt(9)","3^2","3 * 3"],seealso:["multiply","pow","sqrt","cube"]},eM={name:"subtract",category:"Operators",syntax:["x - y","subtract(x, y)"],description:"subtract two values.",examples:["a = 5.3 - 2","a + 2","2/3 - 1/6","2 * 3 - 3","2.1 km - 500m"],seealso:["add"]},rM={name:"unaryMinus",category:"Operators",syntax:["-x","unaryMinus(x)"],description:"Inverse the sign of a value. Converts booleans and strings to numbers.",examples:["-4.5","-(-5.6)",'-"22"'],seealso:["add","subtract","unaryPlus"]},nM={name:"unaryPlus",category:"Operators",syntax:["+x","unaryPlus(x)"],description:"Converts booleans and strings to numbers.",examples:["+true",'+"2"'],seealso:["add","subtract","unaryMinus"]},tM={name:"xgcd",category:"Arithmetic",syntax:["xgcd(a, b)"],description:"Calculate the extended greatest common divisor for two values. The result is an array [d, x, y] with 3 entries, where d is the greatest common divisor, and d = x * a + y * b.",examples:["xgcd(8, 12)","gcd(8, 12)","xgcd(36163, 21199)"],seealso:["gcd","lcm"]},iM={name:"bitAnd",category:"Bitwise",syntax:["x & y","bitAnd(x, y)"],description:"Bitwise AND operation. Performs the logical AND operation on each pair of the corresponding bits of the two given values by multiplying them. If both bits in the compared position are 1, the bit in the resulting binary representation is 1, otherwise, the result is 0",examples:["5 & 3","bitAnd(53, 131)","[1, 12, 31] & 42"],seealso:["bitNot","bitOr","bitXor","leftShift","rightArithShift","rightLogShift"]},aM={name:"bitNot",category:"Bitwise",syntax:["~x","bitNot(x)"],description:"Bitwise NOT operation. Performs a logical negation on each bit of the given value. Bits that are 0 become 1, and those that are 1 become 0.",examples:["~1","~2","bitNot([2, -3, 4])"],seealso:["bitAnd","bitOr","bitXor","leftShift","rightArithShift","rightLogShift"]},sM={name:"bitOr",category:"Bitwise",syntax:["x | y","bitOr(x, y)"],description:"Bitwise OR operation. Performs the logical inclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if the first bit is 1 or the second bit is 1 or both bits are 1, otherwise, the result is 0.",examples:["5 | 3","bitOr([1, 2, 3], 4)"],seealso:["bitAnd","bitNot","bitXor","leftShift","rightArithShift","rightLogShift"]},oM={name:"bitXor",category:"Bitwise",syntax:["bitXor(x, y)"],description:"Bitwise XOR operation, exclusive OR. Performs the logical exclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if only the first bit is 1 or only the second bit is 1, but will be 0 if both are 0 or both are 1.",examples:["bitOr(1, 2)","bitXor([2, 3, 4], 4)"],seealso:["bitAnd","bitNot","bitOr","leftShift","rightArithShift","rightLogShift"]},uM={name:"leftShift",category:"Bitwise",syntax:["x << y","leftShift(x, y)"],description:"Bitwise left logical shift of a value x by y number of bits.",examples:["4 << 1","8 >> 1"],seealso:["bitAnd","bitNot","bitOr","bitXor","rightArithShift","rightLogShift"]},cM={name:"rightArithShift",category:"Bitwise",syntax:["x >> y","rightArithShift(x, y)"],description:"Bitwise right arithmetic shift of a value x by y number of bits.",examples:["8 >> 1","4 << 1","-12 >> 2"],seealso:["bitAnd","bitNot","bitOr","bitXor","leftShift","rightLogShift"]},lM={name:"rightLogShift",category:"Bitwise",syntax:["x >>> y","rightLogShift(x, y)"],description:"Bitwise right logical shift of a value x by y number of bits.",examples:["8 >>> 1","4 << 1","-12 >>> 2"],seealso:["bitAnd","bitNot","bitOr","bitXor","leftShift","rightArithShift"]},fM={name:"bellNumbers",category:"Combinatorics",syntax:["bellNumbers(n)"],description:"The Bell Numbers count the number of partitions of a set. A partition is a pairwise disjoint subset of S whose union is S. `bellNumbers` only takes integer arguments. The following condition must be enforced: n >= 0.",examples:["bellNumbers(3)","bellNumbers(8)"],seealso:["stirlingS2"]},mM={name:"catalan",category:"Combinatorics",syntax:["catalan(n)"],description:"The Catalan Numbers enumerate combinatorial structures of many different types. catalan only takes integer arguments. The following condition must be enforced: n >= 0.",examples:["catalan(3)","catalan(8)"],seealso:["bellNumbers"]},hM={name:"composition",category:"Combinatorics",syntax:["composition(n, k)"],description:"The composition counts of n into k parts. composition only takes integer arguments. The following condition must be enforced: k <= n.",examples:["composition(5, 3)"],seealso:["combinations"]},pM={name:"stirlingS2",category:"Combinatorics",syntax:["stirlingS2(n, k)"],description:"he Stirling numbers of the second kind, counts the number of ways to partition a set of n labelled objects into k nonempty unlabelled subsets. `stirlingS2` only takes integer arguments. The following condition must be enforced: k <= n. If n = k or k = 1, then s(n,k) = 1.",examples:["stirlingS2(5, 3)"],seealso:["bellNumbers"]},gM={name:"arg",category:"Complex",syntax:["arg(x)"],description:"Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).",examples:["arg(2 + 2i)","atan2(3, 2)","arg(2 + 3i)"],seealso:["re","im","conj","abs"]},dM={name:"conj",category:"Complex",syntax:["conj(x)"],description:"Compute the complex conjugate of a complex value. If x = a+bi, the complex conjugate is a-bi.",examples:["conj(2 + 3i)","conj(2 - 3i)","conj(-5.2i)"],seealso:["re","im","abs","arg"]},vM={name:"im",category:"Complex",syntax:["im(x)"],description:"Get the imaginary part of a complex number.",examples:["im(2 + 3i)","re(2 + 3i)","im(-5.2i)","im(2.4)"],seealso:["re","conj","abs","arg"]},bM={name:"re",category:"Complex",syntax:["re(x)"],description:"Get the real part of a complex number.",examples:["re(2 + 3i)","im(2 + 3i)","re(-5.2i)","re(2.4)"],seealso:["im","conj","abs","arg"]},yM={name:"evaluate",category:"Expression",syntax:["evaluate(expression)","evaluate([expr1, expr2, expr3, ...])"],description:"Evaluate an expression or an array with expressions.",examples:['evaluate("2 + 3")','evaluate("sqrt(" + 4 + ")")'],seealso:[]},xM={name:"help",category:"Expression",syntax:["help(object)","help(string)"],description:"Display documentation on a function or data type.",examples:["help(sqrt)",'help("complex")'],seealso:[]},wM={name:"distance",category:"Geometry",syntax:["distance([x1, y1], [x2, y2])","distance([[x1, y1], [x2, y2]])"],description:"Calculates the Euclidean distance between two points.",examples:["distance([0,0], [4,4])","distance([[0,0], [4,4]])"],seealso:[]},AM={name:"intersect",category:"Geometry",syntax:["intersect(expr1, expr2, expr3, expr4)","intersect(expr1, expr2, expr3)"],description:"Computes the intersection point of lines and/or planes.",examples:["intersect([0, 0], [10, 10], [10, 0], [0, 10])","intersect([1, 0, 1],  [4, -2, 2], [1, 1, 1, 6])"],seealso:[]},NM={name:"and",category:"Logical",syntax:["x and y","and(x, y)"],description:"Logical and. Test whether two values are both defined with a nonzero/nonempty value.",examples:["true and false","true and true","2 and 4"],seealso:["not","or","xor"]},SM={name:"not",category:"Logical",syntax:["not x","not(x)"],description:"Logical not. Flips the boolean value of given argument.",examples:["not true","not false","not 2","not 0"],seealso:["and","or","xor"]},MM={name:"or",category:"Logical",syntax:["x or y","or(x, y)"],description:"Logical or. Test if at least one value is defined with a nonzero/nonempty value.",examples:["true or false","false or false","0 or 4"],seealso:["not","and","xor"]},TM={name:"xor",category:"Logical",syntax:["x xor y","xor(x, y)"],description:"Logical exclusive or, xor. Test whether one and only one value is defined with a nonzero/nonempty value.",examples:["true xor false","false xor false","true xor true","0 xor 4"],seealso:["not","and","or"]},kM={name:"column",category:"Matrix",syntax:["column(x, index)"],description:"Return a column from a matrix or array.",examples:["A = [[1, 2], [3, 4]]","column(A, 1)","column(A, 2)"],seealso:["row","matrixFromColumns"]},EM={name:"concat",category:"Matrix",syntax:["concat(A, B, C, ...)","concat(A, B, C, ..., dim)"],description:"Concatenate matrices. By default, the matrices are concatenated by the last dimension. The dimension on which to concatenate can be provided as last argument.",examples:["A = [1, 2; 5, 6]","B = [3, 4; 7, 8]","concat(A, B)","concat(A, B, 1)","concat(A, B, 2)"],seealso:["det","diag","identity","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]},CM={name:"count",category:"Matrix",syntax:["count(x)"],description:"Count the number of elements of a matrix, array or string.",examples:["a = [1, 2; 3, 4; 5, 6]","count(a)","size(a)",'count("hello world")'],seealso:["size"]},BM={name:"cross",category:"Matrix",syntax:["cross(A, B)"],description:"Calculate the cross product for two vectors in three dimensional space.",examples:["cross([1, 1, 0],  [0, 1, 1])","cross([3, -3, 1], [4, 9, 2])","cross([2, 3, 4],  [5, 6, 7])"],seealso:["multiply","dot"]},LM={name:"ctranspose",category:"Matrix",syntax:["x'","ctranspose(x)"],description:"Complex Conjugate and Transpose a matrix",examples:["a = [1, 2, 3; 4, 5, 6]","a'","ctranspose(a)"],seealso:["concat","det","diag","identity","inv","ones","range","size","squeeze","subset","trace","zeros"]},DM={name:"det",category:"Matrix",syntax:["det(x)"],description:"Calculate the determinant of a matrix",examples:["det([1, 2; 3, 4])","det([-2, 2, 3; -1, 1, 3; 2, 0, -1])"],seealso:["concat","diag","identity","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]},IM={name:"diag",category:"Matrix",syntax:["diag(x)","diag(x, k)"],description:"Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.",examples:["diag(1:3)","diag(1:3, 1)","a = [1, 2, 3; 4, 5, 6; 7, 8, 9]","diag(a)"],seealso:["concat","det","identity","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]},OM={name:"diff",category:"Matrix",syntax:["diff(arr)","diff(arr, dim)"],description:["Create a new matrix or array with the difference of the passed matrix or array.","Dim parameter is optional and used to indicant the dimension of the array/matrix to apply the difference","If no dimension parameter is passed it is assumed as dimension 0","Dimension is zero-based in javascript and one-based in the parser","Arrays must be 'rectangular' meaning arrays like [1, 2]","If something is passed as a matrix it will be returned as a matrix but other than that all matrices are converted to arrays"],examples:["diff([1, 2, 4, 7, 0])","diff([1, 2, 4, 7, 0], 0)","diff(matrix([1, 2, 4, 7, 0]))","diff([[1, 2], [3, 4]])","diff([[1, 2], [3, 4]], 0)","diff([[1, 2], [3, 4]], 1)","diff([[1, 2], [3, 4]], bignumber(1))","diff(matrix([[1, 2], [3, 4]]), 1)","diff([[1, 2], matrix([3, 4])], 1)"],seealso:["subtract","partitionSelect"]},zM={name:"dot",category:"Matrix",syntax:["dot(A, B)","A * B"],description:"Calculate the dot product of two vectors. The dot product of A = [a1, a2, a3, ..., an] and B = [b1, b2, b3, ..., bn] is defined as dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn",examples:["dot([2, 4, 1], [2, 2, 3])","[2, 4, 1] * [2, 2, 3]"],seealso:["multiply","cross"]},PM={name:"eigs",category:"Matrix",syntax:["eigs(x)"],description:"Calculate the eigenvalues and eigenvectors of a real symmetric matrix",examples:["eigs([[5, 2.3], [2.3, 1]])"],seealso:["inv"]},$M={name:"filter",category:"Matrix",syntax:["filter(x, test)"],description:"Filter items in a matrix.",examples:["isPositive(x) = x > 0","filter([6, -2, -1, 4, 3], isPositive)","filter([6, -2, 0, 1, 0], x != 0)"],seealso:["sort","map","forEach"]},_M={name:"flatten",category:"Matrix",syntax:["flatten(x)"],description:"Flatten a multi dimensional matrix into a single dimensional matrix.",examples:["a = [1, 2, 3; 4, 5, 6]","size(a)","b = flatten(a)","size(b)"],seealso:["concat","resize","size","squeeze"]},FM={name:"forEach",category:"Matrix",syntax:["forEach(x, callback)"],description:"Iterates over all elements of a matrix/array, and executes the given callback function.",examples:["numberOfPets = {}","addPet(n) = numberOfPets[n] = (numberOfPets[n] ? numberOfPets[n]:0 ) + 1;",'forEach(["Dog","Cat","Cat"], addPet)',"numberOfPets"],seealso:["map","sort","filter"]},RM={name:"getMatrixDataType",category:"Matrix",syntax:["getMatrixDataType(x)"],description:'Find the data type of all elements in a matrix or array, for example "number" if all items are a number and "Complex" if all values are complex numbers. If a matrix contains more than one data type, it will return "mixed".',examples:["getMatrixDataType([1, 2, 3])","getMatrixDataType([[5 cm], [2 inch]])",'getMatrixDataType([1, "text"])',"getMatrixDataType([1, bignumber(4)])"],seealso:["matrix","sparse","typeOf"]},qM={name:"identity",category:"Matrix",syntax:["identity(n)","identity(m, n)","identity([m, n])"],description:"Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.",examples:["identity(3)","identity(3, 5)","a = [1, 2, 3; 4, 5, 6]","identity(size(a))"],seealso:["concat","det","diag","inv","ones","range","size","squeeze","subset","trace","transpose","zeros"]},KM={name:"inv",category:"Matrix",syntax:["inv(x)"],description:"Calculate the inverse of a matrix",examples:["inv([1, 2; 3, 4])","inv(4)","1 / 4"],seealso:["concat","det","diag","identity","ones","range","size","squeeze","subset","trace","transpose","zeros"]},UM={name:"pinv",category:"Matrix",syntax:["pinv(x)"],description:"Calculate the Moore\u2013Penrose inverse of a matrix",examples:["pinv([1, 2; 3, 4])","pinv([[1, 0], [0, 1], [0, 1]])","pinv(4)"],seealso:["inv"]},VM={name:"kron",category:"Matrix",syntax:["kron(x, y)"],description:"Calculates the kronecker product of 2 matrices or vectors.",examples:["kron([[1, 0], [0, 1]], [[1, 2], [3, 4]])","kron([1,1], [2,3,4])"],seealso:["multiply","dot","cross"]},WM={name:"map",category:"Matrix",syntax:["map(x, callback)"],description:"Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.",examples:["map([1, 2, 3], square)"],seealso:["filter","forEach"]},GM={name:"matrixFromColumns",category:"Matrix",syntax:["math.matrixFromColumns(...arr)","math.matrixFromColumns(row1, row2)","math.matrixFromColumns(row1, row2, row3)"],description:"Create a dense matrix from vectors as individual columns.",examples:["matrixFromColumns([1, 2, 3], [[4],[5],[6]])"],seealso:["matrix","matrixFromRows","matrixFromFunction","zeros"]},HM={name:"matrixFromFunction",category:"Matrix",syntax:["math.matrixFromFunction(size, fn)","math.matrixFromFunction(size, fn, format)","math.matrixFromFunction(size, fn, format, datatype)","math.matrixFromFunction(size, format, fn)","math.matrixFromFunction(size, format, datatype, fn)"],description:"Create a matrix by evaluating a generating function at each index.",examples:["f(I) = I[1] - I[2]","matrixFromFunction([3,3], f)","g(I) = I[1] - I[2] == 1 ? 4 : 0",'matrixFromFunction([100, 100], "sparse", g)',"matrixFromFunction([5], random)"],seealso:["matrix","matrixFromRows","matrixFromColumns","zeros"]},ZM={name:"matrixFromRows",category:"Matrix",syntax:["math.matrixFromRows(...arr)","math.matrixFromRows(row1, row2)","math.matrixFromRows(row1, row2, row3)"],description:"Create a dense matrix from vectors as individual rows.",examples:["matrixFromRows([1, 2, 3], [[4],[5],[6]])"],seealso:["matrix","matrixFromColumns","matrixFromFunction","zeros"]},XM={name:"ones",category:"Matrix",syntax:["ones(m)","ones(m, n)","ones(m, n, p, ...)","ones([m])","ones([m, n])","ones([m, n, p, ...])"],description:"Create a matrix containing ones.",examples:["ones(3)","ones(3, 5)","ones([2,3]) * 4.5","a = [1, 2, 3; 4, 5, 6]","ones(size(a))"],seealso:["concat","det","diag","identity","inv","range","size","squeeze","subset","trace","transpose","zeros"]},YM={name:"partitionSelect",category:"Matrix",syntax:["partitionSelect(x, k)","partitionSelect(x, k, compare)"],description:"Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.",examples:["partitionSelect([5, 10, 1], 2)",'partitionSelect(["C", "B", "A", "D"], 1)'],seealso:["sort"]},JM={name:"range",category:"Type",syntax:["start:end","start:step:end","range(start, end)","range(start, end, step)","range(string)"],description:"Create a range. Lower bound of the range is included, upper bound is excluded.",examples:["1:5","3:-1:-3","range(3, 7)","range(0, 12, 2)",'range("4:10")',"a = [1, 2, 3, 4; 5, 6, 7, 8]","a[1:2, 1:2]"],seealso:["concat","det","diag","identity","inv","ones","size","squeeze","subset","trace","transpose","zeros"]},QM={name:"reshape",category:"Matrix",syntax:["reshape(x, sizes)"],description:"Reshape a multi dimensional array to fit the specified dimensions.",examples:["reshape([1, 2, 3, 4, 5, 6], [2, 3])","reshape([[1, 2], [3, 4]], [1, 4])","reshape([[1, 2], [3, 4]], [4])"],seealso:["size","squeeze","resize"]},jM={name:"resize",category:"Matrix",syntax:["resize(x, size)","resize(x, size, defaultValue)"],description:"Resize a matrix.",examples:["resize([1,2,3,4,5], [3])","resize([1,2,3], [5])","resize([1,2,3], [5], -1)","resize(2, [2, 3])",'resize("hello", [8], "!")'],seealso:["size","subset","squeeze","reshape"]},e4={name:"rotate",category:"Matrix",syntax:["rotate(w, theta)","rotate(w, theta, v)"],description:"Returns a 2-D rotation matrix (2x2) for a given angle (in radians). Returns a 2-D rotation matrix (3x3) of a given angle (in radians) around given axis.",examples:["rotate([1, 0], math.pi / 2)",'rotate(matrix([1, 0]), unit("35deg"))','rotate([1, 0, 0], unit("90deg"), [0, 0, 1])','rotate(matrix([1, 0, 0]), unit("90deg"), matrix([0, 0, 1]))'],seealso:["matrix","rotationMatrix"]},r4={name:"rotationMatrix",category:"Matrix",syntax:["rotationMatrix(theta)","rotationMatrix(theta, v)","rotationMatrix(theta, v, format)"],description:"Returns a 2-D rotation matrix (2x2) for a given angle (in radians). Returns a 2-D rotation matrix (3x3) of a given angle (in radians) around given axis.",examples:["rotationMatrix(pi / 2)",'rotationMatrix(unit("45deg"), [0, 0, 1])','rotationMatrix(1, matrix([0, 0, 1]), "sparse")'],seealso:["cos","sin"]},n4={name:"row",category:"Matrix",syntax:["row(x, index)"],description:"Return a row from a matrix or array.",examples:["A = [[1, 2], [3, 4]]","row(A, 1)","row(A, 2)"],seealso:["column","matrixFromRows"]},t4={name:"size",category:"Matrix",syntax:["size(x)"],description:"Calculate the size of a matrix.",examples:["size(2.3)",'size("hello world")',"a = [1, 2; 3, 4; 5, 6]","size(a)","size(1:6)"],seealso:["concat","count","det","diag","identity","inv","ones","range","squeeze","subset","trace","transpose","zeros"]},i4={name:"sort",category:"Matrix",syntax:["sort(x)","sort(x, compare)"],description:'Sort the items in a matrix. Compare can be a string "asc", "desc", "natural", or a custom sort function.',examples:["sort([5, 10, 1])",'sort(["C", "B", "A", "D"])',"sortByLength(a, b) = size(a)[1] - size(b)[1]",'sort(["Langdon", "Tom", "Sara"], sortByLength)','sort(["10", "1", "2"], "natural")'],seealso:["map","filter","forEach"]},a4={name:"squeeze",category:"Matrix",syntax:["squeeze(x)"],description:"Remove inner and outer singleton dimensions from a matrix.",examples:["a = zeros(3,2,1)","size(squeeze(a))","b = zeros(1,1,3)","size(squeeze(b))"],seealso:["concat","det","diag","identity","inv","ones","range","size","subset","trace","transpose","zeros"]},s4={name:"subset",category:"Matrix",syntax:["value(index)","value(index) = replacement","subset(value, [index])","subset(value, [index], replacement)"],description:"Get or set a subset of the entries of a matrix or characters of a string. Indexes are one-based. There should be one index specification for each dimension of the target. Each specification can be a single index, a list of indices, or a range in colon notation `l:u`. In a range, both the lower bound l and upper bound u are included; and if a bound is omitted it defaults to the most extreme valid value. The cartesian product of the indices specified in each dimension determines the target of the operation.",examples:["d = [1, 2; 3, 4]","e = []","e[1, 1:2] = [5, 6]","e[2, :] = [7, 8]","f = d * e","f[2, 1]","f[:, 1]","f[[1,2], [1,3]] = [9, 10; 11, 12]","f"],seealso:["concat","det","diag","identity","inv","ones","range","size","squeeze","trace","transpose","zeros"]},o4={name:"trace",category:"Matrix",syntax:["trace(A)"],description:"Calculate the trace of a matrix: the sum of the elements on the main diagonal of a square matrix.",examples:["A = [1, 2, 3; -1, 2, 3; 2, 0, 3]","trace(A)"],seealso:["concat","det","diag","identity","inv","ones","range","size","squeeze","subset","transpose","zeros"]},u4={name:"transpose",category:"Matrix",syntax:["x'","transpose(x)"],description:"Transpose a matrix",examples:["a = [1, 2, 3; 4, 5, 6]","a'","transpose(a)"],seealso:["concat","det","diag","identity","inv","ones","range","size","squeeze","subset","trace","zeros"]},c4={name:"zeros",category:"Matrix",syntax:["zeros(m)","zeros(m, n)","zeros(m, n, p, ...)","zeros([m])","zeros([m, n])","zeros([m, n, p, ...])"],description:"Create a matrix containing zeros.",examples:["zeros(3)","zeros(3, 5)","a = [1, 2, 3; 4, 5, 6]","zeros(size(a))"],seealso:["concat","det","diag","identity","inv","ones","range","size","squeeze","subset","trace","transpose"]},l4={name:"combinations",category:"Probability",syntax:["combinations(n, k)"],description:"Compute the number of combinations of n items taken k at a time",examples:["combinations(7, 5)"],seealso:["combinationsWithRep","permutations","factorial"]},f4={name:"combinationsWithRep",category:"Probability",syntax:["combinationsWithRep(n, k)"],description:"Compute the number of combinations of n items taken k at a time with replacements.",examples:["combinationsWithRep(7, 5)"],seealso:["combinations","permutations","factorial"]},m4={name:"factorial",category:"Probability",syntax:["n!","factorial(n)"],description:"Compute the factorial of a value",examples:["5!","5 * 4 * 3 * 2 * 1","3!"],seealso:["combinations","combinationsWithRep","permutations","gamma"]},h4={name:"gamma",category:"Probability",syntax:["gamma(n)"],description:"Compute the gamma function. For small values, the Lanczos approximation is used, and for large values the extended Stirling approximation.",examples:["gamma(4)","3!","gamma(1/2)","sqrt(pi)"],seealso:["factorial"]},p4={name:"lgamma",category:"Probability",syntax:["lgamma(n)"],description:"Logarithm of the gamma function for real, positive numbers and complex numbers, using Lanczos approximation for numbers and Stirling series for complex numbers.",examples:["lgamma(4)","lgamma(1/2)","lgamma(math.i)","lgamma(complex(1.1, 2))"],seealso:["gamma"]},g4={name:"kldivergence",category:"Probability",syntax:["kldivergence(x, y)"],description:"Calculate the Kullback-Leibler (KL) divergence  between two distributions.",examples:["kldivergence([0.7,0.5,0.4], [0.2,0.9,0.5])"],seealso:[]},d4={name:"multinomial",category:"Probability",syntax:["multinomial(A)"],description:"Multinomial Coefficients compute the number of ways of picking a1, a2, ..., ai unordered outcomes from `n` possibilities. multinomial takes one array of integers as an argument. The following condition must be enforced: every ai > 0.",examples:["multinomial([1, 2, 1])"],seealso:["combinations","factorial"]},v4={name:"permutations",category:"Probability",syntax:["permutations(n)","permutations(n, k)"],description:"Compute the number of permutations of n items taken k at a time",examples:["permutations(5)","permutations(5, 3)"],seealso:["combinations","combinationsWithRep","factorial"]},b4={name:"pickRandom",category:"Probability",syntax:["pickRandom(array)","pickRandom(array, number)","pickRandom(array, weights)","pickRandom(array, number, weights)","pickRandom(array, weights, number)"],description:"Pick a random entry from a given array.",examples:["pickRandom(0:10)","pickRandom([1, 3, 1, 6])","pickRandom([1, 3, 1, 6], 2)","pickRandom([1, 3, 1, 6], [2, 3, 2, 1])","pickRandom([1, 3, 1, 6], 2, [2, 3, 2, 1])","pickRandom([1, 3, 1, 6], [2, 3, 2, 1], 2)"],seealso:["random","randomInt"]},y4={name:"random",category:"Probability",syntax:["random()","random(max)","random(min, max)","random(size)","random(size, max)","random(size, min, max)"],description:"Return a random number.",examples:["random()","random(10, 20)","random([2, 3])"],seealso:["pickRandom","randomInt"]},x4={name:"randomInt",category:"Probability",syntax:["randomInt(max)","randomInt(min, max)","randomInt(size)","randomInt(size, max)","randomInt(size, min, max)"],description:"Return a random integer number",examples:["randomInt(10, 20)","randomInt([2, 3], 10)"],seealso:["pickRandom","random"]},w4={name:"compare",category:"Relational",syntax:["compare(x, y)"],description:"Compare two values. Returns 1 when x > y, -1 when x < y, and 0 when x == y.",examples:["compare(2, 3)","compare(3, 2)","compare(2, 2)","compare(5cm, 40mm)","compare(2, [1, 2, 3])"],seealso:["equal","unequal","smaller","smallerEq","largerEq","compareNatural","compareText"]},A4={name:"compareNatural",category:"Relational",syntax:["compareNatural(x, y)"],description:"Compare two values of any type in a deterministic, natural way. Returns 1 when x > y, -1 when x < y, and 0 when x == y.",examples:["compareNatural(2, 3)","compareNatural(3, 2)","compareNatural(2, 2)","compareNatural(5cm, 40mm)",'compareNatural("2", "10")',"compareNatural(2 + 3i, 2 + 4i)","compareNatural([1, 2, 4], [1, 2, 3])","compareNatural([1, 5], [1, 2, 3])","compareNatural([1, 2], [1, 2])","compareNatural({a: 2}, {a: 4})"],seealso:["equal","unequal","smaller","smallerEq","largerEq","compare","compareText"]},N4={name:"compareText",category:"Relational",syntax:["compareText(x, y)"],description:"Compare two strings lexically. Comparison is case sensitive. Returns 1 when x > y, -1 when x < y, and 0 when x == y.",examples:['compareText("B", "A")','compareText("A", "B")','compareText("A", "A")','compareText("2", "10")','compare("2", "10")',"compare(2, 10)",'compareNatural("2", "10")','compareText("B", ["A", "B", "C"])'],seealso:["compare","compareNatural"]},S4={name:"deepEqual",category:"Relational",syntax:["deepEqual(x, y)"],description:"Check equality of two matrices element wise. Returns true if the size of both matrices is equal and when and each of the elements are equal.",examples:["deepEqual([1,3,4], [1,3,4])","deepEqual([1,3,4], [1,3])"],seealso:["equal","unequal","smaller","larger","smallerEq","largerEq","compare"]},M4={name:"equal",category:"Relational",syntax:["x == y","equal(x, y)"],description:"Check equality of two values. Returns true if the values are equal, and false if not.",examples:["2+2 == 3","2+2 == 4","a = 3.2","b = 6-2.8","a == b","50cm == 0.5m"],seealso:["unequal","smaller","larger","smallerEq","largerEq","compare","deepEqual","equalText"]},T4={name:"equalText",category:"Relational",syntax:["equalText(x, y)"],description:"Check equality of two strings. Comparison is case sensitive. Returns true if the values are equal, and false if not.",examples:['equalText("Hello", "Hello")','equalText("a", "A")','equal("2e3", "2000")','equalText("2e3", "2000")','equalText("B", ["A", "B", "C"])'],seealso:["compare","compareNatural","compareText","equal"]},k4={name:"larger",category:"Relational",syntax:["x > y","larger(x, y)"],description:"Check if value x is larger than y. Returns true if x is larger than y, and false if not.",examples:["2 > 3","5 > 2*2","a = 3.3","b = 6-2.8","(a > b)","(b < a)","5 cm > 2 inch"],seealso:["equal","unequal","smaller","smallerEq","largerEq","compare"]},E4={name:"largerEq",category:"Relational",syntax:["x >= y","largerEq(x, y)"],description:"Check if value x is larger or equal to y. Returns true if x is larger or equal to y, and false if not.",examples:["2 >= 1+1","2 > 1+1","a = 3.2","b = 6-2.8","(a >= b)"],seealso:["equal","unequal","smallerEq","smaller","compare"]},C4={name:"smaller",category:"Relational",syntax:["x < y","smaller(x, y)"],description:"Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.",examples:["2 < 3","5 < 2*2","a = 3.3","b = 6-2.8","(a < b)","5 cm < 2 inch"],seealso:["equal","unequal","larger","smallerEq","largerEq","compare"]},B4={name:"smallerEq",category:"Relational",syntax:["x <= y","smallerEq(x, y)"],description:"Check if value x is smaller or equal to value y. Returns true if x is smaller than y, and false if not.",examples:["2 <= 1+1","2 < 1+1","a = 3.2","b = 6-2.8","(a <= b)"],seealso:["equal","unequal","larger","smaller","largerEq","compare"]},L4={name:"unequal",category:"Relational",syntax:["x != y","unequal(x, y)"],description:"Check unequality of two values. Returns true if the values are unequal, and false if they are equal.",examples:["2+2 != 3","2+2 != 4","a = 3.2","b = 6-2.8","a != b","50cm != 0.5m","5 cm != 2 inch"],seealso:["equal","smaller","larger","smallerEq","largerEq","compare","deepEqual"]},D4={name:"setCartesian",category:"Set",syntax:["setCartesian(set1, set2)"],description:"Create the cartesian product of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays and the values will be sorted in ascending order before the operation.",examples:["setCartesian([1, 2], [3, 4])"],seealso:["setUnion","setIntersect","setDifference","setPowerset"]},I4={name:"setDifference",category:"Set",syntax:["setDifference(set1, set2)"],description:"Create the difference of two (multi)sets: every element of set1, that is not the element of set2. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",examples:["setDifference([1, 2, 3, 4], [3, 4, 5, 6])","setDifference([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],seealso:["setUnion","setIntersect","setSymDifference"]},O4={name:"setDistinct",category:"Set",syntax:["setDistinct(set)"],description:"Collect the distinct elements of a multiset. A multi-dimension array will be converted to a single-dimension array before the operation.",examples:["setDistinct([1, 1, 1, 2, 2, 3])"],seealso:["setMultiplicity"]},z4={name:"setIntersect",category:"Set",syntax:["setIntersect(set1, set2)"],description:"Create the intersection of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",examples:["setIntersect([1, 2, 3, 4], [3, 4, 5, 6])","setIntersect([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],seealso:["setUnion","setDifference"]},P4={name:"setIsSubset",category:"Set",syntax:["setIsSubset(set1, set2)"],description:"Check whether a (multi)set is a subset of another (multi)set: every element of set1 is the element of set2. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",examples:["setIsSubset([1, 2], [3, 4, 5, 6])","setIsSubset([3, 4], [3, 4, 5, 6])"],seealso:["setUnion","setIntersect","setDifference"]},$4={name:"setMultiplicity",category:"Set",syntax:["setMultiplicity(element, set)"],description:"Count the multiplicity of an element in a multiset. A multi-dimension array will be converted to a single-dimension array before the operation.",examples:["setMultiplicity(1, [1, 2, 2, 4])","setMultiplicity(2, [1, 2, 2, 4])"],seealso:["setDistinct","setSize"]},_4={name:"setPowerset",category:"Set",syntax:["setPowerset(set)"],description:"Create the powerset of a (multi)set: the powerset contains very possible subsets of a (multi)set. A multi-dimension array will be converted to a single-dimension array before the operation.",examples:["setPowerset([1, 2, 3])"],seealso:["setCartesian"]},F4={name:"setSize",category:"Set",syntax:["setSize(set)","setSize(set, unique)"],description:'Count the number of elements of a (multi)set. When the second parameter "unique" is true, count only the unique values. A multi-dimension array will be converted to a single-dimension array before the operation.',examples:["setSize([1, 2, 2, 4])","setSize([1, 2, 2, 4], true)"],seealso:["setUnion","setIntersect","setDifference"]},R4={name:"setSymDifference",category:"Set",syntax:["setSymDifference(set1, set2)"],description:"Create the symmetric difference of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",examples:["setSymDifference([1, 2, 3, 4], [3, 4, 5, 6])","setSymDifference([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],seealso:["setUnion","setIntersect","setDifference"]},q4={name:"setUnion",category:"Set",syntax:["setUnion(set1, set2)"],description:"Create the union of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",examples:["setUnion([1, 2, 3, 4], [3, 4, 5, 6])","setUnion([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],seealso:["setIntersect","setDifference"]},K4={name:"erf",category:"Special",syntax:["erf(x)"],description:"Compute the erf function of a value using a rational Chebyshev approximations for different intervals of x",examples:["erf(0.2)","erf(-0.5)","erf(4)"],seealso:[]},U4={name:"mad",category:"Statistics",syntax:["mad(a, b, c, ...)","mad(A)"],description:"Compute the median absolute deviation of a matrix or a list with values. The median absolute deviation is defined as the median of the absolute deviations from the median.",examples:["mad(10, 20, 30)","mad([1, 2, 3])"],seealso:["mean","median","std","abs"]},V4={name:"max",category:"Statistics",syntax:["max(a, b, c, ...)","max(A)","max(A, dim)"],description:"Compute the maximum value of a list of values.",examples:["max(2, 3, 4, 1)","max([2, 3, 4, 1])","max([2, 5; 4, 3])","max([2, 5; 4, 3], 1)","max([2, 5; 4, 3], 2)","max(2.7, 7.1, -4.5, 2.0, 4.1)","min(2.7, 7.1, -4.5, 2.0, 4.1)"],seealso:["mean","median","min","prod","std","sum","variance"]},W4={name:"mean",category:"Statistics",syntax:["mean(a, b, c, ...)","mean(A)","mean(A, dim)"],description:"Compute the arithmetic mean of a list of values.",examples:["mean(2, 3, 4, 1)","mean([2, 3, 4, 1])","mean([2, 5; 4, 3])","mean([2, 5; 4, 3], 1)","mean([2, 5; 4, 3], 2)","mean([1.0, 2.7, 3.2, 4.0])"],seealso:["max","median","min","prod","std","sum","variance"]},G4={name:"median",category:"Statistics",syntax:["median(a, b, c, ...)","median(A)"],description:"Compute the median of all values. The values are sorted and the middle value is returned. In case of an even number of values, the average of the two middle values is returned.",examples:["median(5, 2, 7)","median([3, -1, 5, 7])"],seealso:["max","mean","min","prod","std","sum","variance","quantileSeq"]},H4={name:"min",category:"Statistics",syntax:["min(a, b, c, ...)","min(A)","min(A, dim)"],description:"Compute the minimum value of a list of values.",examples:["min(2, 3, 4, 1)","min([2, 3, 4, 1])","min([2, 5; 4, 3])","min([2, 5; 4, 3], 1)","min([2, 5; 4, 3], 2)","min(2.7, 7.1, -4.5, 2.0, 4.1)","max(2.7, 7.1, -4.5, 2.0, 4.1)"],seealso:["max","mean","median","prod","std","sum","variance"]},Z4={name:"mode",category:"Statistics",syntax:["mode(a, b, c, ...)","mode(A)","mode(A, a, b, B, c, ...)"],description:"Computes the mode of all values as an array. In case mode being more than one, multiple values are returned in an array.",examples:["mode(2, 1, 4, 3, 1)","mode([1, 2.7, 3.2, 4, 2.7])","mode(1, 4, 6, 1, 6)"],seealso:["max","mean","min","median","prod","std","sum","variance"]},X4={name:"prod",category:"Statistics",syntax:["prod(a, b, c, ...)","prod(A)"],description:"Compute the product of all values.",examples:["prod(2, 3, 4)","prod([2, 3, 4])","prod([2, 5; 4, 3])"],seealso:["max","mean","min","median","min","std","sum","variance"]},Y4={name:"quantileSeq",category:"Statistics",syntax:["quantileSeq(A, prob[, sorted])","quantileSeq(A, [prob1, prob2, ...][, sorted])","quantileSeq(A, N[, sorted])"],description:`Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probablity are: Number, BigNumber. 

In case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.`,examples:["quantileSeq([3, -1, 5, 7], 0.5)","quantileSeq([3, -1, 5, 7], [1/3, 2/3])","quantileSeq([3, -1, 5, 7], 2)","quantileSeq([-1, 3, 5, 7], 0.5, true)"],seealso:["mean","median","min","max","prod","std","sum","variance"]},J4={name:"std",category:"Statistics",syntax:["std(a, b, c, ...)","std(A)","std(A, normalization)"],description:'Compute the standard deviation of all values, defined as std(A) = sqrt(variance(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',examples:["std(2, 4, 6)","std([2, 4, 6, 8])",'std([2, 4, 6, 8], "uncorrected")','std([2, 4, 6, 8], "biased")',"std([1, 2, 3; 4, 5, 6])"],seealso:["max","mean","min","median","prod","sum","variance"]},Q4={name:"cumsum",category:"Statistics",syntax:["cumsum(a, b, c, ...)","cumsum(A)"],description:"Compute the cumulative sum of all values.",examples:["cumsum(2, 3, 4, 1)","cumsum([2, 3, 4, 1])","cumsum([1, 2; 3, 4])","cumsum([1, 2; 3, 4], 1)","cumsum([1, 2; 3, 4], 2)"],seealso:["max","mean","median","min","prod","std","sum","variance"]},j4={name:"sum",category:"Statistics",syntax:["sum(a, b, c, ...)","sum(A)"],description:"Compute the sum of all values.",examples:["sum(2, 3, 4, 1)","sum([2, 3, 4, 1])","sum([2, 5; 4, 3])"],seealso:["max","mean","median","min","prod","std","sum","variance"]},e3={name:"variance",category:"Statistics",syntax:["variance(a, b, c, ...)","variance(A)","variance(A, normalization)"],description:'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',examples:["variance(2, 4, 6)","variance([2, 4, 6, 8])",'variance([2, 4, 6, 8], "uncorrected")','variance([2, 4, 6, 8], "biased")',"variance([1, 2, 3; 4, 5, 6])"],seealso:["max","mean","min","median","min","prod","std","sum"]},r3={name:"acos",category:"Trigonometry",syntax:["acos(x)"],description:"Compute the inverse cosine of a value in radians.",examples:["acos(0.5)","acos(cos(2.3))"],seealso:["cos","atan","asin"]},n3={name:"acosh",category:"Trigonometry",syntax:["acosh(x)"],description:"Calculate the hyperbolic arccos of a value, defined as `acosh(x) = ln(sqrt(x^2 - 1) + x)`.",examples:["acosh(1.5)"],seealso:["cosh","asinh","atanh"]},t3={name:"acot",category:"Trigonometry",syntax:["acot(x)"],description:"Calculate the inverse cotangent of a value.",examples:["acot(0.5)","acot(cot(0.5))","acot(2)"],seealso:["cot","atan"]},i3={name:"acoth",category:"Trigonometry",syntax:["acoth(x)"],description:"Calculate the hyperbolic arccotangent of a value, defined as `acoth(x) = (ln((x+1)/x) + ln(x/(x-1))) / 2`.",examples:["acoth(2)","acoth(0.5)"],seealso:["acsch","asech"]},a3={name:"acsc",category:"Trigonometry",syntax:["acsc(x)"],description:"Calculate the inverse cotangent of a value.",examples:["acsc(2)","acsc(csc(0.5))","acsc(0.5)"],seealso:["csc","asin","asec"]},s3={name:"acsch",category:"Trigonometry",syntax:["acsch(x)"],description:"Calculate the hyperbolic arccosecant of a value, defined as `acsch(x) = ln(1/x + sqrt(1/x^2 + 1))`.",examples:["acsch(0.5)"],seealso:["asech","acoth"]},o3={name:"asec",category:"Trigonometry",syntax:["asec(x)"],description:"Calculate the inverse secant of a value.",examples:["asec(0.5)","asec(sec(0.5))","asec(2)"],seealso:["acos","acot","acsc"]},u3={name:"asech",category:"Trigonometry",syntax:["asech(x)"],description:"Calculate the inverse secant of a value.",examples:["asech(0.5)"],seealso:["acsch","acoth"]},c3={name:"asin",category:"Trigonometry",syntax:["asin(x)"],description:"Compute the inverse sine of a value in radians.",examples:["asin(0.5)","asin(sin(0.5))"],seealso:["sin","acos","atan"]},l3={name:"asinh",category:"Trigonometry",syntax:["asinh(x)"],description:"Calculate the hyperbolic arcsine of a value, defined as `asinh(x) = ln(x + sqrt(x^2 + 1))`.",examples:["asinh(0.5)"],seealso:["acosh","atanh"]},f3={name:"atan",category:"Trigonometry",syntax:["atan(x)"],description:"Compute the inverse tangent of a value in radians.",examples:["atan(0.5)","atan(tan(0.5))"],seealso:["tan","acos","asin"]},m3={name:"atan2",category:"Trigonometry",syntax:["atan2(y, x)"],description:"Computes the principal value of the arc tangent of y/x in radians.",examples:["atan2(2, 2) / pi","angle = 60 deg in rad","x = cos(angle)","y = sin(angle)","atan2(y, x)"],seealso:["sin","cos","tan"]},h3={name:"atanh",category:"Trigonometry",syntax:["atanh(x)"],description:"Calculate the hyperbolic arctangent of a value, defined as `atanh(x) = ln((1 + x)/(1 - x)) / 2`.",examples:["atanh(0.5)"],seealso:["acosh","asinh"]},p3={name:"cos",category:"Trigonometry",syntax:["cos(x)"],description:"Compute the cosine of x in radians.",examples:["cos(2)","cos(pi / 4) ^ 2","cos(180 deg)","cos(60 deg)","sin(0.2)^2 + cos(0.2)^2"],seealso:["acos","sin","tan"]},g3={name:"cosh",category:"Trigonometry",syntax:["cosh(x)"],description:"Compute the hyperbolic cosine of x in radians.",examples:["cosh(0.5)"],seealso:["sinh","tanh","coth"]},d3={name:"cot",category:"Trigonometry",syntax:["cot(x)"],description:"Compute the cotangent of x in radians. Defined as 1/tan(x)",examples:["cot(2)","1 / tan(2)"],seealso:["sec","csc","tan"]},v3={name:"coth",category:"Trigonometry",syntax:["coth(x)"],description:"Compute the hyperbolic cotangent of x in radians.",examples:["coth(2)","1 / tanh(2)"],seealso:["sech","csch","tanh"]},b3={name:"csc",category:"Trigonometry",syntax:["csc(x)"],description:"Compute the cosecant of x in radians. Defined as 1/sin(x)",examples:["csc(2)","1 / sin(2)"],seealso:["sec","cot","sin"]},y3={name:"csch",category:"Trigonometry",syntax:["csch(x)"],description:"Compute the hyperbolic cosecant of x in radians. Defined as 1/sinh(x)",examples:["csch(2)","1 / sinh(2)"],seealso:["sech","coth","sinh"]},x3={name:"sec",category:"Trigonometry",syntax:["sec(x)"],description:"Compute the secant of x in radians. Defined as 1/cos(x)",examples:["sec(2)","1 / cos(2)"],seealso:["cot","csc","cos"]},w3={name:"sech",category:"Trigonometry",syntax:["sech(x)"],description:"Compute the hyperbolic secant of x in radians. Defined as 1/cosh(x)",examples:["sech(2)","1 / cosh(2)"],seealso:["coth","csch","cosh"]},A3={name:"sin",category:"Trigonometry",syntax:["sin(x)"],description:"Compute the sine of x in radians.",examples:["sin(2)","sin(pi / 4) ^ 2","sin(90 deg)","sin(30 deg)","sin(0.2)^2 + cos(0.2)^2"],seealso:["asin","cos","tan"]},N3={name:"sinh",category:"Trigonometry",syntax:["sinh(x)"],description:"Compute the hyperbolic sine of x in radians.",examples:["sinh(0.5)"],seealso:["cosh","tanh"]},S3={name:"tan",category:"Trigonometry",syntax:["tan(x)"],description:"Compute the tangent of x in radians.",examples:["tan(0.5)","sin(0.5) / cos(0.5)","tan(pi / 4)","tan(45 deg)"],seealso:["atan","sin","cos"]},M3={name:"tanh",category:"Trigonometry",syntax:["tanh(x)"],description:"Compute the hyperbolic tangent of x in radians.",examples:["tanh(0.5)","sinh(0.5) / cosh(0.5)"],seealso:["sinh","cosh"]},T3={name:"to",category:"Units",syntax:["x to unit","to(x, unit)"],description:"Change the unit of a value.",examples:["5 inch to cm","3.2kg to g","16 bytes in bits"],seealso:[]},k3={name:"bin",category:"Utils",syntax:["bin(value)"],description:"Format a number as binary",examples:["bin(2)"],seealso:["oct","hex"]},E3={name:"clone",category:"Utils",syntax:["clone(x)"],description:"Clone a variable. Creates a copy of primitive variables,and a deep copy of matrices",examples:["clone(3.5)","clone(2 - 4i)","clone(45 deg)","clone([1, 2; 3, 4])",'clone("hello world")'],seealso:[]},C3={name:"format",category:"Utils",syntax:["format(value)","format(value, precision)"],description:"Format a value of any type as string.",examples:["format(2.3)","format(3 - 4i)","format([])","format(pi, 3)"],seealso:["print"]},B3={name:"hasNumericValue",category:"Utils",syntax:["hasNumericValue(x)"],description:"Test whether a value is an numeric value. In case of a string, true is returned if the string contains a numeric value.",examples:["hasNumericValue(2)",'hasNumericValue("2")','isNumeric("2")',"hasNumericValue(0)","hasNumericValue(bignumber(500))","hasNumericValue(fraction(0.125))","hasNumericValue(2 + 3i)",'hasNumericValue([2.3, "foo", false])'],seealso:["isInteger","isZero","isNegative","isPositive","isNaN","isNumeric"]},L3={name:"hex",category:"Utils",syntax:["hex(value)"],description:"Format a number as hexadecimal",examples:["hex(240)"],seealso:["bin","oct"]},D3={name:"isInteger",category:"Utils",syntax:["isInteger(x)"],description:"Test whether a value is an integer number.",examples:["isInteger(2)","isInteger(3.5)","isInteger([3, 0.5, -2])"],seealso:["isNegative","isNumeric","isPositive","isZero"]},I3={name:"isNaN",category:"Utils",syntax:["isNaN(x)"],description:"Test whether a value is NaN (not a number)",examples:["isNaN(2)","isNaN(0 / 0)","isNaN(NaN)","isNaN(Infinity)"],seealso:["isNegative","isNumeric","isPositive","isZero"]},O3={name:"isNegative",category:"Utils",syntax:["isNegative(x)"],description:"Test whether a value is negative: smaller than zero.",examples:["isNegative(2)","isNegative(0)","isNegative(-4)","isNegative([3, 0.5, -2])"],seealso:["isInteger","isNumeric","isPositive","isZero"]},z3={name:"isNumeric",category:"Utils",syntax:["isNumeric(x)"],description:"Test whether a value is a numeric value. Returns true when the input is a number, BigNumber, Fraction, or boolean.",examples:["isNumeric(2)",'isNumeric("2")','hasNumericValue("2")',"isNumeric(0)","isNumeric(bignumber(500))","isNumeric(fraction(0.125))","isNumeric(2 + 3i)",'isNumeric([2.3, "foo", false])'],seealso:["isInteger","isZero","isNegative","isPositive","isNaN","hasNumericValue"]},P3={name:"isPositive",category:"Utils",syntax:["isPositive(x)"],description:"Test whether a value is positive: larger than zero.",examples:["isPositive(2)","isPositive(0)","isPositive(-4)","isPositive([3, 0.5, -2])"],seealso:["isInteger","isNumeric","isNegative","isZero"]},$3={name:"isPrime",category:"Utils",syntax:["isPrime(x)"],description:"Test whether a value is prime: has no divisors other than itself and one.",examples:["isPrime(3)","isPrime(-2)","isPrime([2, 17, 100])"],seealso:["isInteger","isNumeric","isNegative","isZero"]},_3={name:"isZero",category:"Utils",syntax:["isZero(x)"],description:"Test whether a value is zero.",examples:["isZero(2)","isZero(0)","isZero(-4)","isZero([3, 0, -2, 0])"],seealso:["isInteger","isNumeric","isNegative","isPositive"]},F3={name:"numeric",category:"Utils",syntax:["numeric(x)"],description:"Convert a numeric input to a specific numeric type: number, BigNumber, or Fraction.",examples:['numeric("4")','numeric("4", "number")','numeric("4", "BigNumber")','numeric("4", "Fraction)','numeric(4, "Fraction")','numeric(fraction(2, 5), "number)'],seealso:["number","fraction","bignumber","string","format"]},R3={name:"oct",category:"Utils",syntax:["oct(value)"],description:"Format a number as octal",examples:["oct(56)"],seealso:["bin","hex"]},q3={name:"print",category:"Utils",syntax:["print(template, values)","print(template, values, precision)"],description:"Interpolate values into a string template.",examples:['print("Lucy is $age years old", {age: 5})','print("The value of pi is $pi", {pi: pi}, 3)','print("Hello, $user.name!", {user: {name: "John"}})','print("Values: $0, $1, $2", [6, 9, 4])'],seealso:["format"]},K3={name:"typeOf",category:"Utils",syntax:["typeOf(x)"],description:"Get the type of a variable.",examples:["typeOf(3.5)","typeOf(2 - 4i)","typeOf(45 deg)",'typeOf("hello world")'],seealso:["getMatrixDataType"]},U3={bignumber:WN,boolean:GN,complex:HN,createUnit:ZN,fraction:XN,index:YN,matrix:JN,number:QN,sparse:jN,splitUnit:eS,string:rS,unit:nS,e:Vc,E:Vc,false:BN,i:LN,Infinity:DN,LN2:ON,LN10:IN,LOG2E:PN,LOG10E:zN,NaN:$N,null:_N,pi:Wc,PI:Wc,phi:FN,SQRT1_2:RN,SQRT2:qN,tau:KN,true:UN,version:VN,speedOfLight:{description:"Speed of light in vacuum",examples:["speedOfLight"]},gravitationConstant:{description:"Newtonian constant of gravitation",examples:["gravitationConstant"]},planckConstant:{description:"Planck constant",examples:["planckConstant"]},reducedPlanckConstant:{description:"Reduced Planck constant",examples:["reducedPlanckConstant"]},magneticConstant:{description:"Magnetic constant (vacuum permeability)",examples:["magneticConstant"]},electricConstant:{description:"Electric constant (vacuum permeability)",examples:["electricConstant"]},vacuumImpedance:{description:"Characteristic impedance of vacuum",examples:["vacuumImpedance"]},coulomb:{description:"Coulomb's constant",examples:["coulomb"]},elementaryCharge:{description:"Elementary charge",examples:["elementaryCharge"]},bohrMagneton:{description:"Borh magneton",examples:["bohrMagneton"]},conductanceQuantum:{description:"Conductance quantum",examples:["conductanceQuantum"]},inverseConductanceQuantum:{description:"Inverse conductance quantum",examples:["inverseConductanceQuantum"]},magneticFluxQuantum:{description:"Magnetic flux quantum",examples:["magneticFluxQuantum"]},nuclearMagneton:{description:"Nuclear magneton",examples:["nuclearMagneton"]},klitzing:{description:"Von Klitzing constant",examples:["klitzing"]},bohrRadius:{description:"Borh radius",examples:["bohrRadius"]},classicalElectronRadius:{description:"Classical electron radius",examples:["classicalElectronRadius"]},electronMass:{description:"Electron mass",examples:["electronMass"]},fermiCoupling:{description:"Fermi coupling constant",examples:["fermiCoupling"]},fineStructure:{description:"Fine-structure constant",examples:["fineStructure"]},hartreeEnergy:{description:"Hartree energy",examples:["hartreeEnergy"]},protonMass:{description:"Proton mass",examples:["protonMass"]},deuteronMass:{description:"Deuteron Mass",examples:["deuteronMass"]},neutronMass:{description:"Neutron mass",examples:["neutronMass"]},quantumOfCirculation:{description:"Quantum of circulation",examples:["quantumOfCirculation"]},rydberg:{description:"Rydberg constant",examples:["rydberg"]},thomsonCrossSection:{description:"Thomson cross section",examples:["thomsonCrossSection"]},weakMixingAngle:{description:"Weak mixing angle",examples:["weakMixingAngle"]},efimovFactor:{description:"Efimov factor",examples:["efimovFactor"]},atomicMass:{description:"Atomic mass constant",examples:["atomicMass"]},avogadro:{description:"Avogadro's number",examples:["avogadro"]},boltzmann:{description:"Boltzmann constant",examples:["boltzmann"]},faraday:{description:"Faraday constant",examples:["faraday"]},firstRadiation:{description:"First radiation constant",examples:["firstRadiation"]},loschmidt:{description:"Loschmidt constant at T=273.15 K and p=101.325 kPa",examples:["loschmidt"]},gasConstant:{description:"Gas constant",examples:["gasConstant"]},molarPlanckConstant:{description:"Molar Planck constant",examples:["molarPlanckConstant"]},molarVolume:{description:"Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa",examples:["molarVolume"]},sackurTetrode:{description:"Sackur-Tetrode constant at T=1 K and p=101.325 kPa",examples:["sackurTetrode"]},secondRadiation:{description:"Second radiation constant",examples:["secondRadiation"]},stefanBoltzmann:{description:"Stefan-Boltzmann constant",examples:["stefanBoltzmann"]},wienDisplacement:{description:"Wien displacement law constant",examples:["wienDisplacement"]},molarMass:{description:"Molar mass constant",examples:["molarMass"]},molarMassC12:{description:"Molar mass constant of carbon-12",examples:["molarMassC12"]},gravity:{description:"Standard acceleration of gravity (standard acceleration of free-fall on Earth)",examples:["gravity"]},planckLength:{description:"Planck length",examples:["planckLength"]},planckMass:{description:"Planck mass",examples:["planckMass"]},planckTime:{description:"Planck time",examples:["planckTime"]},planckCharge:{description:"Planck charge",examples:["planckCharge"]},planckTemperature:{description:"Planck temperature",examples:["planckTemperature"]},derivative:sS,lsolve:uS,lsolveAll:cS,lup:lS,lusolve:fS,leafCount:oS,resolve:pS,simplify:gS,simplifyCore:dS,symbolicEqual:bS,rationalize:hS,slu:vS,usolve:yS,usolveAll:xS,qr:mS,abs:wS,add:AS,cbrt:NS,ceil:SS,cube:MS,divide:TS,dotDivide:kS,dotMultiply:ES,dotPow:CS,exp:BS,expm:LS,expm1:DS,fix:IS,floor:OS,gcd:zS,hypot:PS,lcm:_S,log:FS,log2:KS,log1p:qS,log10:RS,mod:US,multiply:VS,norm:WS,nthRoot:GS,nthRoots:HS,pow:ZS,round:XS,sign:YS,sqrt:JS,sqrtm:QS,square:jS,subtract:eM,unaryMinus:rM,unaryPlus:nM,xgcd:tM,invmod:$S,bitAnd:iM,bitNot:aM,bitOr:sM,bitXor:oM,leftShift:uM,rightArithShift:cM,rightLogShift:lM,bellNumbers:fM,catalan:mM,composition:hM,stirlingS2:pM,config:tS,import:iS,typed:aS,arg:gM,conj:dM,re:bM,im:vM,evaluate:yM,help:xM,distance:wM,intersect:AM,and:NM,not:SM,or:MM,xor:TM,concat:EM,count:CM,cross:BM,column:kM,ctranspose:LM,det:DM,diag:IM,diff:OM,dot:zM,getMatrixDataType:RM,identity:qM,filter:$M,flatten:_M,forEach:FM,inv:KM,pinv:UM,eigs:PM,kron:VM,matrixFromFunction:HM,matrixFromRows:ZM,matrixFromColumns:GM,map:WM,ones:XM,partitionSelect:YM,range:JM,resize:jM,reshape:QM,rotate:e4,rotationMatrix:r4,row:n4,size:t4,sort:i4,squeeze:a4,subset:s4,trace:o4,transpose:u4,zeros:c4,combinations:l4,combinationsWithRep:f4,factorial:m4,gamma:h4,kldivergence:g4,lgamma:p4,multinomial:d4,permutations:v4,pickRandom:b4,random:y4,randomInt:x4,compare:w4,compareNatural:A4,compareText:N4,deepEqual:S4,equal:M4,equalText:T4,larger:k4,largerEq:E4,smaller:C4,smallerEq:B4,unequal:L4,setCartesian:D4,setDifference:I4,setDistinct:O4,setIntersect:z4,setIsSubset:P4,setMultiplicity:$4,setPowerset:_4,setSize:F4,setSymDifference:R4,setUnion:q4,erf:K4,cumsum:Q4,mad:U4,max:V4,mean:W4,median:G4,min:H4,mode:Z4,prod:X4,quantileSeq:Y4,std:J4,sum:j4,variance:e3,acos:r3,acosh:n3,acot:t3,acoth:i3,acsc:a3,acsch:s3,asec:o3,asech:u3,asin:c3,asinh:l3,atan:f3,atanh:h3,atan2:m3,cos:p3,cosh:g3,cot:d3,coth:v3,csc:b3,csch:y3,sec:x3,sech:w3,sin:A3,sinh:N3,tan:S3,tanh:M3,to:T3,clone:E3,format:C3,bin:k3,oct:R3,hex:L3,isNaN:I3,isInteger:D3,isNegative:O3,isNumeric:z3,hasNumericValue:B3,isPositive:P3,isPrime:$3,isZero:_3,print:q3,typeOf:K3,numeric:F3},Gc="help",V3=["typed","mathWithTransform","Help"],W3=P(Gc,V3,e=>{var{typed:n,mathWithTransform:i,Help:t}=e;return n(Gc,{any:function(a){var c,l=a;if(typeof a!="string"){for(c in i)if(Ne(i,c)&&a===i[c]){l=c;break}}var u=Vr(U3,l);if(!u){var f=typeof l=="function"?l.name:l;throw new Error('No documentation found on "'+f+'"')}return new t(u)}})}),Hc="chain",G3=["typed","Chain"],H3=P(Hc,G3,e=>{var{typed:n,Chain:i}=e;return n(Hc,{"":function(){return new i},any:function(r){return new i(r)}})}),Zc="det",Z3=["typed","matrix","subtract","multiply","divideScalar","isZero","unaryMinus"],X3=P(Zc,Z3,e=>{var{typed:n,matrix:i,subtract:t,multiply:r,divideScalar:a,isZero:c,unaryMinus:l}=e;return n(Zc,{any:function(o){return ke(o)},"Array | Matrix":function(o){var s;switch(Ce(o)?s=o.size():Array.isArray(o)?(o=i(o),s=o.size()):s=[],s.length){case 0:return ke(o);case 1:if(s[0]===1)return ke(o.valueOf()[0]);throw new RangeError("Matrix must be square (size: "+Oe(s)+")");case 2:{var m=s[0],h=s[1];if(m===h)return u(o.clone().valueOf(),m);throw new RangeError("Matrix must be square (size: "+Oe(s)+")")}default:throw new RangeError("Matrix must be two dimensional (size: "+Oe(s)+")")}}});function u(f,o,s){if(o===1)return ke(f[0][0]);if(o===2)return t(r(f[0][0],f[1][1]),r(f[1][0],f[0][1]));for(var m=!1,h=new Array(o).fill(0).map((M,S)=>S),p=0;p<o;p++){var g=h[p];if(c(f[g][p])){var y=void 0;for(y=p+1;y<o;y++)if(!c(f[h[y]][p])){g=h[y],h[y]=h[p],h[p]=g,m=!m;break}if(y===o)return f[g][p]}for(var w=f[g][p],A=p===0?1:f[h[p-1]][p-1],v=p+1;v<o;v++)for(var b=h[v],x=p+1;x<o;x++)f[b][x]=a(t(r(f[b][x],w),r(f[b][p],f[g][x])),A)}var d=f[h[o-1]][o-1];return m?l(d):d}}),Xc="inv",Y3=["typed","matrix","divideScalar","addScalar","multiply","unaryMinus","det","identity","abs"],J3=P(Xc,Y3,e=>{var{typed:n,matrix:i,divideScalar:t,addScalar:r,multiply:a,unaryMinus:c,det:l,identity:u,abs:f}=e;return n(Xc,{"Array | Matrix":function(m){var h=Ce(m)?m.size():Re(m);switch(h.length){case 1:if(h[0]===1)return Ce(m)?i([t(1,m.valueOf()[0])]):[t(1,m[0])];throw new RangeError("Matrix must be square (size: "+Oe(h)+")");case 2:{var p=h[0],g=h[1];if(p===g)return Ce(m)?i(o(m.valueOf(),p,g),m.storage()):o(m,p,g);throw new RangeError("Matrix must be square (size: "+Oe(h)+")")}default:throw new RangeError("Matrix must be two dimensional (size: "+Oe(h)+")")}},any:function(m){return t(1,m)}});function o(s,m,h){var p,g,y,w,A;if(m===1){if(w=s[0][0],w===0)throw Error("Cannot calculate inverse, determinant is zero");return[[t(1,w)]]}else if(m===2){var v=l(s);if(v===0)throw Error("Cannot calculate inverse, determinant is zero");return[[t(s[1][1],v),t(c(s[0][1]),v)],[t(c(s[1][0]),v),t(s[0][0],v)]]}else{var b=s.concat();for(p=0;p<m;p++)b[p]=b[p].concat();for(var x=u(m).valueOf(),d=0;d<h;d++){var M=f(b[d][d]),S=d;for(p=d+1;p<m;)f(b[p][d])>M&&(M=f(b[p][d]),S=p),p++;if(M===0)throw Error("Cannot calculate inverse, determinant is zero");p=S,p!==d&&(A=b[d],b[d]=b[p],b[p]=A,A=x[d],x[d]=x[p],x[p]=A);var T=b[d],N=x[d];for(p=0;p<m;p++){var D=b[p],k=x[p];if(p!==d){if(D[d]!==0){for(y=t(c(D[d]),T[d]),g=d;g<h;g++)D[g]=r(D[g],a(y,T[g]));for(g=0;g<h;g++)k[g]=r(k[g],a(y,N[g]))}}else{for(y=T[d],g=d;g<h;g++)D[g]=t(D[g],y);for(g=0;g<h;g++)k[g]=t(k[g],y)}}}return x}}}),Yc="pinv",Q3=["typed","matrix","inv","deepEqual","equal","dotDivide","dot","ctranspose","divideScalar","multiply","add","Complex"],j3=P(Yc,Q3,e=>{var{typed:n,matrix:i,inv:t,deepEqual:r,equal:a,dotDivide:c,dot:l,ctranspose:u,divideScalar:f,multiply:o,add:s,Complex:m}=e;return n(Yc,{"Array | Matrix":function(v){var b=Ce(v)?v.size():Re(v);switch(b.length){case 1:return w(v)?u(v):b[0]===1?t(v):c(u(v),l(v,v));case 2:{if(w(v))return u(v);var x=b[0],d=b[1];if(x===d)try{return t(v)}catch(M){if(!(M instanceof Error&&M.message.match(/Cannot calculate inverse, determinant is zero/)))throw M}return Ce(v)?i(h(v.valueOf(),x,d),v.storage()):h(v,x,d)}default:throw new RangeError("Matrix must be two dimensional (size: "+Oe(b)+")")}},any:function(v){return a(v,0)?ke(v):f(1,v)}});function h(A,v,b){var{C:x,F:d}=g(A,v,b),M=o(t(o(u(x),x)),u(x)),S=o(u(d),t(o(d,u(d))));return o(S,M)}function p(A,v,b){for(var x=ke(A),d=0,M=0;M<v;M++){if(b<=d)return x;for(var S=M;y(x[S][d]);)if(S++,v===S&&(S=M,d++,b===d))return x;[x[S],x[M]]=[x[M],x[S]];for(var T=x[M][d],N=0;N<b;N++)x[M][N]=c(x[M][N],T);for(var D=0;D<v;D++)if(D!==M){T=x[D][d];for(var k=0;k<b;k++)x[D][k]=s(x[D][k],o(-1,o(T,x[M][k])))}d++}return x}function g(A,v,b){var x=p(A,v,b),d=A.map((S,T)=>S.filter((N,D)=>D<v&&!y(l(x[D],x[D])))),M=x.filter((S,T)=>!y(l(x[T],x[T])));return{C:d,F:M}}function y(A){return a(s(A,m(1,1)),s(0,m(1,1)))}function w(A){return r(s(A,m(1,1)),s(o(A,0),m(1,1)))}});function e6(e){var{addScalar:n,subtract:i,flatten:t,multiply:r,multiplyScalar:a,divideScalar:c,sqrt:l,abs:u,bignumber:f,diag:o,inv:s,qr:m,usolve:h,usolveAll:p,equal:g,complex:y,larger:w,smaller:A,matrixFromColumns:v,dot:b}=e;function x(U,X,j,W,Q){Q===void 0&&(Q=!0);var ne=d(U,X,j,W,Q);M(U,X,j,W,Q,ne);var{values:re,C:ae}=S(U,X,j,W,Q),te;return Q&&(te=T(U,X,ae,ne,re,j,W),te=v(...te)),{values:re,vectors:te}}function d(U,X,j,W,Q){var ne=W==="BigNumber",re=W==="Complex",ae=ne?f(0):0,te=ne?f(1):re?y(1):1,ue=ne?f(1):1,ee=ne?f(10):2,be=a(ee,ee),we;Q&&(we=Array(X).fill(te));for(var me=!1;!me;){me=!0;for(var ye=0;ye<X;ye++){for(var $=ae,Z=ae,K=0;K<X;K++)if(ye!==K){var R=u(U[ye][K]);$=n($,R),Z=n(Z,R)}if(!g($,0)&&!g(Z,0)){for(var Y=ue,z=$,F=c(Z,ee),J=a(Z,ee);A(z,F);)z=a(z,be),Y=a(Y,ee);for(;w(z,J);)z=c(z,be),Y=c(Y,ee);var q=A(c(n(z,Z),Y),a(n($,Z),.95));if(q){me=!1;for(var oe=c(1,Y),le=0;le<X;le++)ye!==le&&(U[ye][le]=a(U[ye][le],Y),U[le][ye]=a(U[le][ye],oe));Q&&(we[ye]=a(we[ye],Y))}}}}return o(we)}function M(U,X,j,W,Q,ne){var re=W==="BigNumber",ae=W==="Complex",te=re?f(0):ae?y(0):0;re&&(j=f(j));for(var ue=0;ue<X-2;ue++){for(var ee=0,be=te,we=ue+1;we<X;we++){var me=U[we][ue];A(u(be),u(me))&&(be=me,ee=we)}if(!A(u(be),j)){if(ee!==ue+1){var ye=U[ee];U[ee]=U[ue+1],U[ue+1]=ye;for(var $=0;$<X;$++){var Z=U[$][ee];U[$][ee]=U[$][ue+1],U[$][ue+1]=Z}if(Q){var K=ne[ee];ne[ee]=ne[ue+1],ne[ue+1]=K}}for(var R=ue+2;R<X;R++){var Y=c(U[R][ue],be);if(Y!==0){for(var z=0;z<X;z++)U[R][z]=i(U[R][z],a(Y,U[ue+1][z]));for(var F=0;F<X;F++)U[F][ue+1]=n(U[F][ue+1],a(Y,U[F][R]));if(Q)for(var J=0;J<X;J++)ne[R][J]=i(ne[R][J],a(Y,ne[ue+1][J]))}}}}return ne}function S(U,X,j,W,Q){var ne=W==="BigNumber",re=W==="Complex",ae=ne?f(1):re?y(1):1;ne&&(j=f(j));for(var te=ke(U),ue=[],ee=X,be=[],we=Q?o(Array(X).fill(ae)):void 0,me=Q?o(Array(ee).fill(ae)):void 0,ye=0;ye<=100;){ye+=1;for(var $=0,Z=0;Z<ee;Z++)te[Z][Z]=i(te[Z][Z],$);var{Q:K,R}=m(te);te=r(R,K);for(var Y=0;Y<ee;Y++)te[Y][Y]=n(te[Y][Y],$);if(Q&&(me=r(me,K)),ee===1||A(u(te[ee-1][ee-2]),j)){ye=0,ue.push(te[ee-1][ee-1]),Q&&(be.unshift([[1]]),k(me,X),we=r(we,me),ee>1&&(me=o(Array(ee-1).fill(ae)))),ee-=1,te.pop();for(var z=0;z<ee;z++)te[z].pop()}else if(ee===2||A(u(te[ee-2][ee-3]),j)){ye=0;var F=N(te[ee-2][ee-2],te[ee-2][ee-1],te[ee-1][ee-2],te[ee-1][ee-1]);ue.push(...F),Q&&(be.unshift(D(te[ee-2][ee-2],te[ee-2][ee-1],te[ee-1][ee-2],te[ee-1][ee-1],F[0],F[1],j,W)),k(me,X),we=r(we,me),ee>2&&(me=o(Array(ee-2).fill(ae)))),ee-=2,te.pop(),te.pop();for(var J=0;J<ee;J++)te[J].pop(),te[J].pop()}if(ee===0)break}if(ue.sort((le,ve)=>+i(u(le),u(ve))),ye>100){var q=Error("The eigenvalues failed to converge. Only found these eigenvalues: "+ue.join(", "));throw q.values=ue,q.vectors=[],q}var oe=Q?r(we,I(be,X)):void 0;return{values:ue,C:oe}}function T(U,X,j,W,Q,ne,re){var ae=s(j),te=r(ae,U,j),ue=re==="BigNumber",ee=re==="Complex",be=ue?f(0):ee?y(0):0,we=ue?f(1):ee?y(1):1,me=[],ye=[];for(var $ of Q){var Z=_(me,$,g);Z===-1?(me.push($),ye.push(1)):ye[Z]+=1}for(var K=[],R=me.length,Y=Array(X).fill(be),z=o(Array(X).fill(we)),F=[],J=function(ve){var he=me[ve],pe=i(te,r(he,z)),Ae=p(pe,Y);for(Ae.shift();Ae.length<ye[ve];){var Xe=O(pe,X,Ae,ne,re);if(Xe==null){F.push(he);break}Ae.push(Xe)}var or=r(s(W),j);Ae=Ae.map(nr=>r(or,nr)),K.push(...Ae.map(nr=>t(nr)))},q=0;q<R;q++)J(q);if(F.length!==0){var oe=new Error("Failed to find eigenvectors for the following eigenvalues: "+F.join(", "));throw oe.values=Q,oe.vectors=K,oe}return K}function N(U,X,j,W){var Q=n(U,W),ne=i(a(U,W),a(X,j)),re=a(Q,.5),ae=a(l(i(a(Q,Q),a(4,ne))),.5);return[n(re,ae),i(re,ae)]}function D(U,X,j,W,Q,ne,re,ae){var te=ae==="BigNumber",ue=ae==="Complex",ee=te?f(0):ue?y(0):0,be=te?f(1):ue?y(1):1;if(A(u(j),re))return[[be,ee],[ee,be]];if(w(u(i(Q,ne)),re))return[[i(Q,W),i(ne,W)],[j,j]];var we=i(U,Q),me=i(X,Q),ye=i(j,Q),$=i(W,Q);return A(u(me),re)?[[we,be],[ye,ee]]:[[me,ee],[$,be]]}function k(U,X){for(var j=0;j<U.length;j++)U[j].push(...Array(X-U[j].length).fill(0));for(var W=U.length;W<X;W++)U.push(Array(X).fill(0)),U[W][W]=1;return U}function I(U,X){for(var j=[],W=0;W<X;W++)j[W]=Array(X).fill(0);var Q=0;for(var ne of U){for(var re=ne.length,ae=0;ae<re;ae++)for(var te=0;te<re;te++)j[Q+ae][Q+te]=ne[ae][te];Q+=re}return j}function _(U,X,j){for(var W=0;W<U.length;W++)if(j(U[W],X))return W;return-1}function O(U,X,j,W,Q){for(var ne=Q==="BigNumber"?f(1e3):1e3,re,ae=0;re=B(X,j,Q),re=h(U,re),!w(V(re),ne);)if(++ae>=5)return null;for(ae=0;;){var te=h(U,re);if(A(V(L(re,[te])),W))break;if(++ae>=10)return null;re=C(te)}return re}function B(U,X,j){var W=j==="BigNumber",Q=j==="Complex",ne=Array(U).fill(0).map(re=>2*Math.random()-1);return W&&(ne=ne.map(re=>f(re))),Q&&(ne=ne.map(re=>y(re))),ne=L(ne,X),C(ne,j)}function L(U,X){for(var j of X)U=i(U,r(c(b(j,U),b(j,j)),j));return U}function V(U){return u(l(b(U,U)))}function C(U,X){var j=X==="BigNumber",W=X==="Complex",Q=j?f(1):W?y(1):1;return r(c(Q,V(U)),U)}return x}function r6(e){var{config:n,addScalar:i,subtract:t,abs:r,atan:a,cos:c,sin:l,multiplyScalar:u,inv:f,bignumber:o,multiply:s,add:m}=e;function h(N,D){var k=arguments.length>2&&arguments[2]!==void 0?arguments[2]:n.epsilon,I=arguments.length>3?arguments[3]:void 0;if(I==="number")return p(N,k);if(I==="BigNumber")return g(N,k);throw TypeError("Unsupported data type: "+I)}function p(N,D){for(var k=N.length,I=Math.abs(D/k),_,O=new Array(k),B=0;B<k;B++)O[B]=T(k,0),O[B][B]=1;for(var L=d(N);Math.abs(L[1])>=Math.abs(I);){var V=L[0][0],C=L[0][1];_=y(N[V][V],N[C][C],N[V][C]),N=x(N,_,V,C),O=A(O,_,V,C),L=d(N)}for(var U=T(k,0),X=0;X<k;X++)U[X]=N[X][X];return S(ke(U),ke(O))}function g(N,D){for(var k=N.length,I=r(D/k),_,O=new Array(k),B=0;B<k;B++)O[B]=T(k,0),O[B][B]=1;for(var L=M(N);r(L[1])>=r(I);){var V=L[0][0],C=L[0][1];_=w(N[V][V],N[C][C],N[V][C]),N=b(N,_,V,C),O=v(O,_,V,C),L=M(N)}for(var U=T(k,0),X=0;X<k;X++)U[X]=N[X][X];return S(ke(U),ke(O))}function y(N,D,k){var I=D-N;return Math.abs(I)<=n.epsilon?Math.PI/4:.5*Math.atan(2*k/(D-N))}function w(N,D,k){var I=t(D,N);return r(I)<=n.epsilon?o(-1).acos().div(4):u(.5,a(s(2,k,f(I))))}function A(N,D,k,I){for(var _=N.length,O=Math.cos(D),B=Math.sin(D),L=T(_,0),V=T(_,0),C=0;C<_;C++)L[C]=O*N[C][k]-B*N[C][I],V[C]=B*N[C][k]+O*N[C][I];for(var U=0;U<_;U++)N[U][k]=L[U],N[U][I]=V[U];return N}function v(N,D,k,I){for(var _=N.length,O=c(D),B=l(D),L=T(_,o(0)),V=T(_,o(0)),C=0;C<_;C++)L[C]=t(u(O,N[C][k]),u(B,N[C][I])),V[C]=i(u(B,N[C][k]),u(O,N[C][I]));for(var U=0;U<_;U++)N[U][k]=L[U],N[U][I]=V[U];return N}function b(N,D,k,I){for(var _=N.length,O=o(c(D)),B=o(l(D)),L=u(O,O),V=u(B,B),C=T(_,o(0)),U=T(_,o(0)),X=s(o(2),O,B,N[k][I]),j=i(t(u(L,N[k][k]),X),u(V,N[I][I])),W=m(u(V,N[k][k]),X,u(L,N[I][I])),Q=0;Q<_;Q++)C[Q]=t(u(O,N[k][Q]),u(B,N[I][Q])),U[Q]=i(u(B,N[k][Q]),u(O,N[I][Q]));N[k][k]=j,N[I][I]=W,N[k][I]=o(0),N[I][k]=o(0);for(var ne=0;ne<_;ne++)ne!==k&&ne!==I&&(N[k][ne]=C[ne],N[ne][k]=C[ne],N[I][ne]=U[ne],N[ne][I]=U[ne]);return N}function x(N,D,k,I){for(var _=N.length,O=Math.cos(D),B=Math.sin(D),L=O*O,V=B*B,C=T(_,0),U=T(_,0),X=L*N[k][k]-2*O*B*N[k][I]+V*N[I][I],j=V*N[k][k]+2*O*B*N[k][I]+L*N[I][I],W=0;W<_;W++)C[W]=O*N[k][W]-B*N[I][W],U[W]=B*N[k][W]+O*N[I][W];N[k][k]=X,N[I][I]=j,N[k][I]=0,N[I][k]=0;for(var Q=0;Q<_;Q++)Q!==k&&Q!==I&&(N[k][Q]=C[Q],N[Q][k]=C[Q],N[I][Q]=U[Q],N[Q][I]=U[Q]);return N}function d(N){for(var D=N.length,k=0,I=[0,1],_=0;_<D;_++)for(var O=_+1;O<D;O++)Math.abs(k)<Math.abs(N[_][O])&&(k=Math.abs(N[_][O]),I=[_,O]);return[I,k]}function M(N){for(var D=N.length,k=0,I=[0,1],_=0;_<D;_++)for(var O=_+1;O<D;O++)r(k)<r(N[_][O])&&(k=r(N[_][O]),I=[_,O]);return[I,k]}function S(N,D){for(var k=N.length,I=Array(k),_=Array(k),O=0;O<k;O++)_[O]=Array(k);for(var B=0;B<k;B++){for(var L=0,V=N[0],C=0;C<N.length;C++)r(N[C])<r(V)&&(L=C,V=N[L]);I[B]=N.splice(L,1)[0];for(var U=0;U<k;U++)_[U][B]=D[U][L],D[U].splice(L,1)}return{values:I,vectors:_}}function T(N,D){for(var k=new Array(N),I=0;I<N;I++)k[I]=D;return k}return h}var n6="eigs",t6=["config","typed","matrix","addScalar","equal","subtract","abs","atan","cos","sin","multiplyScalar","divideScalar","inv","bignumber","multiply","add","larger","column","flatten","number","complex","sqrt","diag","qr","usolve","usolveAll","im","re","smaller","matrixFromColumns","dot"],i6=P(n6,t6,e=>{var{config:n,typed:i,matrix:t,addScalar:r,subtract:a,equal:c,abs:l,atan:u,cos:f,sin:o,multiplyScalar:s,divideScalar:m,inv:h,bignumber:p,multiply:g,add:y,larger:w,column:A,flatten:v,number:b,complex:x,sqrt:d,diag:M,qr:S,usolve:T,usolveAll:N,im:D,re:k,smaller:I,matrixFromColumns:_,dot:O}=e,B=r6({config:n,addScalar:r,subtract:a,column:A,flatten:v,equal:c,abs:l,atan:u,cos:f,sin:o,multiplyScalar:s,inv:h,bignumber:p,complex:x,multiply:g,add:y}),L=e6({config:n,addScalar:r,subtract:a,multiply:g,multiplyScalar:s,flatten:v,divideScalar:m,sqrt:d,abs:l,bignumber:p,diag:M,qr:S,inv:h,usolve:T,usolveAll:N,equal:c,complex:x,larger:w,smaller:I,matrixFromColumns:_,dot:O});return i("eigs",{Array:function(Q){var ne=t(Q);return V(ne)},"Array, number|BigNumber":function(Q,ne){var re=t(Q);return V(re,ne)},Matrix:function(Q){var{values:ne,vectors:re}=V(Q);return{values:t(ne),vectors:t(re)}},"Matrix, number|BigNumber":function(Q,ne){var{values:re,vectors:ae}=V(Q,ne);return{values:t(re),vectors:t(ae)}}});function V(W,Q){Q===void 0&&(Q=n.epsilon);var ne=W.size();if(ne.length!==2||ne[0]!==ne[1])throw new RangeError("Matrix must be square (size: "+Oe(ne)+")");var re=W.toArray(),ae=ne[0];if(U(re,ae,Q)&&(X(re,ae),C(re,ae,Q))){var te=j(W,re,ae);return B(re,ae,Q,te)}var ue=j(W,re,ae);return L(re,ae,Q,ue)}function C(W,Q,ne){for(var re=0;re<Q;re++)for(var ae=re;ae<Q;ae++)if(w(p(l(a(W[re][ae],W[ae][re]))),ne))return!1;return!0}function U(W,Q,ne){for(var re=0;re<Q;re++)for(var ae=0;ae<Q;ae++)if(w(p(l(D(W[re][ae]))),ne))return!1;return!0}function X(W,Q){for(var ne=0;ne<Q;ne++)for(var re=0;re<Q;re++)W[ne][re]=k(W[ne][re])}function j(W,Q,ne){var re=W.datatype();if(re==="number"||re==="BigNumber"||re==="Complex")return re;for(var ae=!1,te=!1,ue=!1,ee=0;ee<ne;ee++)for(var be=0;be<ne;be++){var we=Q[ee][be];if(Fe(we)||yt(we))ae=!0;else if($e(we))te=!0;else if(Mn(we))ue=!0;else throw TypeError("Unsupported type in Matrix: "+je(we))}if(te&&ue&&console.warn("Complex BigNumbers not supported, this operation will lose precission."),ue){for(var me=0;me<ne;me++)for(var ye=0;ye<ne;ye++)Q[me][ye]=x(Q[me][ye]);return"Complex"}if(te){for(var $=0;$<ne;$++)for(var Z=0;Z<ne;Z++)Q[$][Z]=p(Q[$][Z]);return"BigNumber"}if(ae){for(var K=0;K<ne;K++)for(var R=0;R<ne;R++)Q[K][R]=b(Q[K][R]);return"number"}else throw TypeError("Matrix contains unsupported types only.")}}),Jc="expm",a6=["typed","abs","add","identity","inv","multiply"],s6=P(Jc,a6,e=>{var{typed:n,abs:i,add:t,identity:r,inv:a,multiply:c}=e;return n(Jc,{Matrix:function(s){var m=s.size();if(m.length!==2||m[0]!==m[1])throw new RangeError("Matrix must be square (size: "+Oe(m)+")");for(var h=m[0],p=1e-15,g=l(s),y=u(g,p),w=y.q,A=y.j,v=c(s,Math.pow(2,-A)),b=r(h),x=r(h),d=1,M=v,S=-1,T=1;T<=w;T++)T>1&&(M=c(M,v),S=-S),d=d*(w-T+1)/((2*w-T+1)*T),b=t(b,c(d,M)),x=t(x,c(d*S,M));for(var N=c(a(x),b),D=0;D<A;D++)N=c(N,N);return Vn(s)?s.createSparseMatrix(N):N}});function l(o){for(var s=o.size()[0],m=0,h=0;h<s;h++){for(var p=0,g=0;g<s;g++)p+=i(o.get([h,g]));m=Math.max(p,m)}return m}function u(o,s){for(var m=30,h=0;h<m;h++)for(var p=0;p<=h;p++){var g=h-p;if(f(o,p,g)<s)return{q:p,j:g}}throw new Error("Could not find acceptable parameters to compute the matrix exponential (try increasing maxSearchSize in expm.js)")}function f(o,s,m){for(var h=1,p=2;p<=s;p++)h*=p;for(var g=h,y=s+1;y<=2*s;y++)g*=y;var w=g*(2*s+1);return 8*Math.pow(o/Math.pow(2,m),2*s)*h*h/(g*w)}}),Qc="sqrtm",o6=["typed","abs","add","multiply","sqrt","subtract","inv","size","max","identity"],u6=P(Qc,o6,e=>{var{typed:n,abs:i,add:t,multiply:r,sqrt:a,subtract:c,inv:l,size:u,max:f,identity:o}=e,s=1e3,m=1e-6;function h(p){var g,y=0,w=p,A=o(u(p));do{var v=w;if(w=r(.5,t(v,l(A))),A=r(.5,t(A,l(v))),g=f(i(c(w,v))),g>m&&++y>s)throw new Error("computing square root of matrix: iterative method could not converge")}while(g>m);return w}return n(Qc,{"Array | Matrix":function(g){var y=Ce(g)?g.size():Re(g);switch(y.length){case 1:if(y[0]===1)return a(g);throw new RangeError("Matrix must be square (size: "+Oe(y)+")");case 2:{var w=y[0],A=y[1];if(w===A)return h(g);throw new RangeError("Matrix must be square (size: "+Oe(y)+")")}default:throw new RangeError("Matrix must be at most two dimensional (size: "+Oe(y)+")")}}})}),c6="divide",l6=["typed","matrix","multiply","equalScalar","divideScalar","inv"],f6=P(c6,l6,e=>{var{typed:n,matrix:i,multiply:t,equalScalar:r,divideScalar:a,inv:c}=e,l=yr({typed:n,equalScalar:r}),u=Ve({typed:n});return n("divide",Fa({"Array | Matrix, Array | Matrix":function(o,s){return t(o,c(s))},"DenseMatrix, any":function(o,s){return u(o,s,a,!1)},"SparseMatrix, any":function(o,s){return l(o,s,a,!1)},"Array, any":function(o,s){return u(i(o),s,a,!1).valueOf()},"any, Array | Matrix":function(o,s){return t(o,c(s))}},a.signatures))}),jc="distance",m6=["typed","addScalar","subtract","divideScalar","multiplyScalar","unaryMinus","sqrt","abs"],h6=P(jc,m6,e=>{var{typed:n,addScalar:i,subtract:t,multiplyScalar:r,divideScalar:a,unaryMinus:c,sqrt:l,abs:u}=e;return n(jc,{"Array, Array, Array":function(x,d,M){if(x.length===2&&d.length===2&&M.length===2){if(!o(x))throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");if(!o(d))throw new TypeError("Array with 2 numbers or BigNumbers expected for second argument");if(!o(M))throw new TypeError("Array with 2 numbers or BigNumbers expected for third argument");var S=a(t(M[1],M[0]),t(d[1],d[0])),T=r(r(S,S),d[0]),N=c(r(S,d[0])),D=x[1];return y(x[0],x[1],T,N,D)}else throw new TypeError("Invalid Arguments: Try again")},"Object, Object, Object":function(x,d,M){if(Object.keys(x).length===2&&Object.keys(d).length===2&&Object.keys(M).length===2){if(!o(x))throw new TypeError("Values of pointX and pointY should be numbers or BigNumbers");if(!o(d))throw new TypeError("Values of lineOnePtX and lineOnePtY should be numbers or BigNumbers");if(!o(M))throw new TypeError("Values of lineTwoPtX and lineTwoPtY should be numbers or BigNumbers");if("pointX"in x&&"pointY"in x&&"lineOnePtX"in d&&"lineOnePtY"in d&&"lineTwoPtX"in M&&"lineTwoPtY"in M){var S=a(t(M.lineTwoPtY,M.lineTwoPtX),t(d.lineOnePtY,d.lineOnePtX)),T=r(r(S,S),d.lineOnePtX),N=c(r(S,d.lineOnePtX)),D=x.pointX;return y(x.pointX,x.pointY,T,N,D)}else throw new TypeError("Key names do not match")}else throw new TypeError("Invalid Arguments: Try again")},"Array, Array":function(x,d){if(x.length===2&&d.length===3){if(!o(x))throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");if(!s(d))throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");return y(x[0],x[1],d[0],d[1],d[2])}else if(x.length===3&&d.length===6){if(!s(x))throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");if(!h(d))throw new TypeError("Array with 6 numbers or BigNumbers expected for second argument");return w(x[0],x[1],x[2],d[0],d[1],d[2],d[3],d[4],d[5])}else if(x.length===d.length&&x.length>0){if(!m(x))throw new TypeError("All values of an array should be numbers or BigNumbers");if(!m(d))throw new TypeError("All values of an array should be numbers or BigNumbers");return A(x,d)}else throw new TypeError("Invalid Arguments: Try again")},"Object, Object":function(x,d){if(Object.keys(x).length===2&&Object.keys(d).length===3){if(!o(x))throw new TypeError("Values of pointX and pointY should be numbers or BigNumbers");if(!s(d))throw new TypeError("Values of xCoeffLine, yCoeffLine and constant should be numbers or BigNumbers");if("pointX"in x&&"pointY"in x&&"xCoeffLine"in d&&"yCoeffLine"in d&&"constant"in d)return y(x.pointX,x.pointY,d.xCoeffLine,d.yCoeffLine,d.constant);throw new TypeError("Key names do not match")}else if(Object.keys(x).length===3&&Object.keys(d).length===6){if(!s(x))throw new TypeError("Values of pointX, pointY and pointZ should be numbers or BigNumbers");if(!h(d))throw new TypeError("Values of x0, y0, z0, a, b and c should be numbers or BigNumbers");if("pointX"in x&&"pointY"in x&&"x0"in d&&"y0"in d&&"z0"in d&&"a"in d&&"b"in d&&"c"in d)return w(x.pointX,x.pointY,x.pointZ,d.x0,d.y0,d.z0,d.a,d.b,d.c);throw new TypeError("Key names do not match")}else if(Object.keys(x).length===2&&Object.keys(d).length===2){if(!o(x))throw new TypeError("Values of pointOneX and pointOneY should be numbers or BigNumbers");if(!o(d))throw new TypeError("Values of pointTwoX and pointTwoY should be numbers or BigNumbers");if("pointOneX"in x&&"pointOneY"in x&&"pointTwoX"in d&&"pointTwoY"in d)return A([x.pointOneX,x.pointOneY],[d.pointTwoX,d.pointTwoY]);throw new TypeError("Key names do not match")}else if(Object.keys(x).length===3&&Object.keys(d).length===3){if(!s(x))throw new TypeError("Values of pointOneX, pointOneY and pointOneZ should be numbers or BigNumbers");if(!s(d))throw new TypeError("Values of pointTwoX, pointTwoY and pointTwoZ should be numbers or BigNumbers");if("pointOneX"in x&&"pointOneY"in x&&"pointOneZ"in x&&"pointTwoX"in d&&"pointTwoY"in d&&"pointTwoZ"in d)return A([x.pointOneX,x.pointOneY,x.pointOneZ],[d.pointTwoX,d.pointTwoY,d.pointTwoZ]);throw new TypeError("Key names do not match")}else throw new TypeError("Invalid Arguments: Try again")},Array:function(x){if(!g(x))throw new TypeError("Incorrect array format entered for pairwise distance calculation");return v(x)}});function f(b){return typeof b=="number"||$e(b)}function o(b){return b.constructor!==Array&&(b=p(b)),f(b[0])&&f(b[1])}function s(b){return b.constructor!==Array&&(b=p(b)),f(b[0])&&f(b[1])&&f(b[2])}function m(b){return Array.isArray(b)||(b=p(b)),b.every(f)}function h(b){return b.constructor!==Array&&(b=p(b)),f(b[0])&&f(b[1])&&f(b[2])&&f(b[3])&&f(b[4])&&f(b[5])}function p(b){for(var x=Object.keys(b),d=[],M=0;M<x.length;M++)d.push(b[x[M]]);return d}function g(b){if(b[0].length===2&&f(b[0][0])&&f(b[0][1])){if(b.some(x=>x.length!==2||!f(x[0])||!f(x[1])))return!1}else if(b[0].length===3&&f(b[0][0])&&f(b[0][1])&&f(b[0][2])){if(b.some(x=>x.length!==3||!f(x[0])||!f(x[1])||!f(x[2])))return!1}else return!1;return!0}function y(b,x,d,M,S){var T=u(i(i(r(d,b),r(M,x)),S)),N=l(i(r(d,d),r(M,M)));return a(T,N)}function w(b,x,d,M,S,T,N,D,k){var I=[t(r(t(S,x),k),r(t(T,d),D)),t(r(t(T,d),N),r(t(M,b),k)),t(r(t(M,b),D),r(t(S,x),N))];I=l(i(i(r(I[0],I[0]),r(I[1],I[1])),r(I[2],I[2])));var _=l(i(i(r(N,N),r(D,D)),r(k,k)));return a(I,_)}function A(b,x){for(var d=b.length,M=0,S=0,T=0;T<d;T++)S=t(b[T],x[T]),M=i(r(S,S),M);return l(M)}function v(b){for(var x=[],d=[],M=[],S=0;S<b.length-1;S++)for(var T=S+1;T<b.length;T++)b[0].length===2?(d=[b[S][0],b[S][1]],M=[b[T][0],b[T][1]]):b[0].length===3&&(d=[b[S][0],b[S][1],b[S][2]],M=[b[T][0],b[T][1],b[T][2]]),x.push(A(d,M));return x}}),p6="intersect",g6=["typed","config","abs","add","addScalar","matrix","multiply","multiplyScalar","divideScalar","subtract","smaller","equalScalar","flatten","isZero","isNumeric"],d6=P(p6,g6,e=>{var{typed:n,config:i,abs:t,add:r,addScalar:a,matrix:c,multiply:l,multiplyScalar:u,divideScalar:f,subtract:o,smaller:s,equalScalar:m,flatten:h,isZero:p,isNumeric:g}=e;return n("intersect",{"Array, Array, Array":y,"Array, Array, Array, Array":w,"Matrix, Matrix, Matrix":function(D,k,I){var _=y(D.valueOf(),k.valueOf(),I.valueOf());return _===null?null:c(_)},"Matrix, Matrix, Matrix, Matrix":function(D,k,I,_){var O=w(D.valueOf(),k.valueOf(),I.valueOf(),_.valueOf());return O===null?null:c(O)}});function y(N,D,k){if(N=A(N),D=A(D),k=A(k),!b(N))throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");if(!b(D))throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");if(!x(k))throw new TypeError("Array with 4 numbers expected as third argument");return T(N[0],N[1],N[2],D[0],D[1],D[2],k[0],k[1],k[2],k[3])}function w(N,D,k,I){if(N=A(N),D=A(D),k=A(k),I=A(I),N.length===2){if(!v(N))throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");if(!v(D))throw new TypeError("Array with 2 numbers or BigNumbers expected for second argument");if(!v(k))throw new TypeError("Array with 2 numbers or BigNumbers expected for third argument");if(!v(I))throw new TypeError("Array with 2 numbers or BigNumbers expected for fourth argument");return d(N,D,k,I)}else if(N.length===3){if(!b(N))throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");if(!b(D))throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");if(!b(k))throw new TypeError("Array with 3 numbers or BigNumbers expected for third argument");if(!b(I))throw new TypeError("Array with 3 numbers or BigNumbers expected for fourth argument");return S(N[0],N[1],N[2],D[0],D[1],D[2],k[0],k[1],k[2],I[0],I[1],I[2])}else throw new TypeError("Arrays with two or thee dimensional points expected")}function A(N){return N.length===1?N[0]:N.length>1&&Array.isArray(N[0])&&N.every(D=>Array.isArray(D)&&D.length===1)?h(N):N}function v(N){return N.length===2&&g(N[0])&&g(N[1])}function b(N){return N.length===3&&g(N[0])&&g(N[1])&&g(N[2])}function x(N){return N.length===4&&g(N[0])&&g(N[1])&&g(N[2])&&g(N[3])}function d(N,D,k,I){var _=N,O=k,B=o(_,D),L=o(O,I),V=o(u(B[0],L[1]),u(L[0],B[1]));if(p(V)||s(t(V),i.epsilon))return null;var C=u(L[0],_[1]),U=u(L[1],_[0]),X=u(L[0],O[1]),j=u(L[1],O[0]),W=f(a(o(o(C,U),X),j),V);return r(l(B,W),_)}function M(N,D,k,I,_,O,B,L,V,C,U,X){var j=u(o(N,D),o(k,I)),W=u(o(_,O),o(B,L)),Q=u(o(V,C),o(U,X));return a(a(j,W),Q)}function S(N,D,k,I,_,O,B,L,V,C,U,X){var j=M(N,B,C,B,D,L,U,L,k,V,X,V),W=M(C,B,I,N,U,L,_,D,X,V,O,k),Q=M(N,B,I,N,D,L,_,D,k,V,O,k),ne=M(C,B,C,B,U,L,U,L,X,V,X,V),re=M(I,N,I,N,_,D,_,D,O,k,O,k),ae=o(u(j,W),u(Q,ne)),te=o(u(re,ne),u(W,W));if(p(te))return null;var ue=f(ae,te),ee=f(a(j,u(ue,W)),ne),be=a(N,u(ue,o(I,N))),we=a(D,u(ue,o(_,D))),me=a(k,u(ue,o(O,k))),ye=a(B,u(ee,o(C,B))),$=a(L,u(ee,o(U,L))),Z=a(V,u(ee,o(X,V)));return m(be,ye)&&m(we,$)&&m(me,Z)?[be,we,me]:null}function T(N,D,k,I,_,O,B,L,V,C){var U=u(N,B),X=u(I,B),j=u(D,L),W=u(_,L),Q=u(k,V),ne=u(O,V),re=o(o(o(C,U),j),Q),ae=o(o(o(a(a(X,W),ne),U),j),Q),te=f(re,ae),ue=a(N,u(te,o(I,N))),ee=a(D,u(te,o(_,D))),be=a(k,u(te,o(O,k)));return[ue,ee,be]}}),el="sum",v6=["typed","config","add","numeric"],Rm=P(el,v6,e=>{var{typed:n,config:i,add:t,numeric:r}=e;return n(el,{"Array | Matrix":a,"Array | Matrix, number | BigNumber":c,"...":function(u){if(At(u))throw new TypeError("Scalar values expected in function sum");return a(u)}});function a(l){var u;return kn(l,function(f){try{u=u===void 0?f:t(u,f)}catch(o){throw Er(o,"sum",f)}}),u===void 0&&(u=r(0,i.number)),typeof u=="string"&&(u=r(u,i.number)),u}function c(l,u){try{var f=Fi(l,u,t);return f}catch(o){throw Er(o,"sum")}}}),li="cumsum",b6=["typed","add","unaryPlus"],qm=P(li,b6,e=>{var{typed:n,add:i,unaryPlus:t}=e;return n(li,{Array:r,Matrix:function(f){return f.create(r(f.valueOf()))},"Array, number | BigNumber":c,"Matrix, number | BigNumber":function(f,o){return f.create(c(f.valueOf(),o))},"...":function(f){if(At(f))throw new TypeError("All values expected to be scalar in function cumsum");return r(f)}});function r(u){try{return a(u)}catch(f){throw Er(f,li)}}function a(u){if(u.length===0)return[];for(var f=[t(u[0])],o=1;o<u.length;++o)f.push(i(f[o-1],u[o]));return f}function c(u,f){var o=Re(u);if(f<0||f>=o.length)throw new rn(f,o.length);try{return l(u,f)}catch(s){throw Er(s,li)}}function l(u,f){var o,s,m;if(f<=0){var h=u[0][0];if(Array.isArray(h)){for(m=Sf(u),s=[],o=0;o<m.length;o++)s[o]=l(m[o],f-1);return s}else return a(u)}else{for(s=[],o=0;o<u.length;o++)s[o]=l(u[o],f-1);return s}}}),rl="mean",y6=["typed","add","divide"],Km=P(rl,y6,e=>{var{typed:n,add:i,divide:t}=e;return n(rl,{"Array | Matrix":a,"Array | Matrix, number | BigNumber":r,"...":function(l){if(At(l))throw new TypeError("Scalar values expected in function mean");return a(l)}});function r(c,l){try{var u=Fi(c,l,i),f=Array.isArray(c)?Re(c):c.size();return t(u,f[l])}catch(o){throw Er(o,"mean")}}function a(c){var l,u=0;if(kn(c,function(f){try{l=l===void 0?f:i(l,f),u++}catch(o){throw Er(o,"mean",f)}}),u===0)throw new Error("Cannot calculate the mean of an empty array");return t(l,u)}}),nl="median",x6=["typed","add","divide","compare","partitionSelect"],w6=P(nl,x6,e=>{var{typed:n,add:i,divide:t,compare:r,partitionSelect:a}=e;function c(f){try{f=qe(f.valueOf());var o=f.length;if(o===0)throw new Error("Cannot calculate median of an empty array");if(o%2===0){for(var s=o/2-1,m=a(f,s+1),h=f[s],p=0;p<s;++p)r(f[p],h)>0&&(h=f[p]);return u(h,m)}else{var g=a(f,(o-1)/2);return l(g)}}catch(y){throw Er(y,"median")}}var l=n({"number | BigNumber | Complex | Unit":function(o){return o}}),u=n({"number | BigNumber | Complex | Unit, number | BigNumber | Complex | Unit":function(o,s){return t(i(o,s),2)}});return n(nl,{"Array | Matrix":c,"Array | Matrix, number | BigNumber":function(o,s){throw new Error("median(A, dim) is not yet supported")},"...":function(o){if(At(o))throw new TypeError("Scalar values expected in function median");return c(o)}})}),tl="mad",A6=["typed","abs","map","median","subtract"],N6=P(tl,A6,e=>{var{typed:n,abs:i,map:t,median:r,subtract:a}=e;return n(tl,{"Array | Matrix":c,"...":function(u){return c(u)}});function c(l){if(l=qe(l.valueOf()),l.length===0)throw new Error("Cannot calculate median absolute deviation (mad) of an empty array");try{var u=r(l);return r(t(l,function(f){return i(a(f,u))}))}catch(f){throw f instanceof TypeError&&f.message.indexOf("median")!==-1?new TypeError(f.message.replace("median","mad")):Er(f,"mad")}}}),ha="unbiased",il="variance",S6=["typed","add","subtract","multiply","divide","apply","isNaN"],Um=P(il,S6,e=>{var{typed:n,add:i,subtract:t,multiply:r,divide:a,apply:c,isNaN:l}=e;return n(il,{"Array | Matrix":function(s){return u(s,ha)},"Array | Matrix, string":u,"Array | Matrix, number | BigNumber":function(s,m){return f(s,m,ha)},"Array | Matrix, number | BigNumber, string":f,"...":function(s){return u(s,ha)}});function u(o,s){var m,h=0;if(o.length===0)throw new SyntaxError("Function variance requires one or more parameters (0 provided)");if(kn(o,function(y){try{m=m===void 0?y:i(m,y),h++}catch(w){throw Er(w,"variance",y)}}),h===0)throw new Error("Cannot calculate variance of an empty array");var p=a(m,h);if(m=void 0,kn(o,function(y){var w=t(y,p);m=m===void 0?r(w,w):i(m,r(w,w))}),l(m))return m;switch(s){case"uncorrected":return a(m,h);case"biased":return a(m,h+1);case"unbiased":{var g=$e(m)?m.mul(0):0;return h===1?g:a(m,h-1)}default:throw new Error('Unknown normalization "'+s+'". Choose "unbiased" (default), "uncorrected", or "biased".')}}function f(o,s,m){try{if(o.length===0)throw new SyntaxError("Function variance requires one or more parameters (0 provided)");return c(o,s,h=>u(h,m))}catch(h){throw Er(h,"variance")}}}),M6="quantileSeq",T6=["typed","add","multiply","partitionSelect","compare"],k6=P(M6,T6,e=>{var{typed:n,add:i,multiply:t,partitionSelect:r,compare:a}=e;function c(f,o,s){var m,h,p;if(arguments.length<2||arguments.length>3)throw new SyntaxError("Function quantileSeq requires two or three parameters");if(xt(f)){if(s=s||!1,typeof s=="boolean"){if(h=f.valueOf(),Fe(o)){if(o<0)throw new Error("N/prob must be non-negative");if(o<=1)return l(h,o,s);if(o>1){if(!Se(o))throw new Error("N must be a positive integer");var g=o+1;m=new Array(o);for(var y=0;y<o;)m[y]=l(h,++y/g,s);return m}}if($e(o)){var w=o.constructor;if(o.isNegative())throw new Error("N/prob must be non-negative");if(p=new w(1),o.lte(p))return new w(l(h,o,s));if(o.gt(p)){if(!o.isInteger())throw new Error("N must be a positive integer");var A=o.toNumber();if(A>4294967295)throw new Error("N must be less than or equal to 2^32-1, as that is the maximum length of an Array");var v=new w(A+1);m=new Array(A);for(var b=0;b<A;)m[b]=new w(l(h,new w(++b).div(v),s));return m}}if(Array.isArray(o)){m=new Array(o.length);for(var x=0;x<m.length;++x){var d=o[x];if(Fe(d)){if(d<0||d>1)throw new Error("Probability must be between 0 and 1, inclusive")}else if($e(d)){if(p=new d.constructor(1),d.isNegative()||d.gt(p))throw new Error("Probability must be between 0 and 1, inclusive")}else throw new TypeError("Unexpected type of argument in function quantileSeq");m[x]=l(h,d,s)}return m}throw new TypeError("Unexpected type of argument in function quantileSeq")}throw new TypeError("Unexpected type of argument in function quantileSeq")}throw new TypeError("Unexpected type of argument in function quantileSeq")}function l(f,o,s){var m=qe(f),h=m.length;if(h===0)throw new Error("Cannot calculate quantile of an empty sequence");if(Fe(o)){var p=o*(h-1),g=p%1;if(g===0){var y=s?m[p]:r(m,p);return u(y),y}var w=Math.floor(p),A,v;if(s)A=m[w],v=m[w+1];else{v=r(m,w+1),A=m[w];for(var b=0;b<w;++b)a(m[b],A)>0&&(A=m[b])}return u(A),u(v),i(t(A,1-g),t(v,g))}var x=o.times(h-1);if(x.isInteger()){x=x.toNumber();var d=s?m[x]:r(m,x);return u(d),d}var M=x.floor(),S=x.minus(M),T=M.toNumber(),N,D;if(s)N=m[T],D=m[T+1];else{D=r(m,T+1),N=m[T];for(var k=0;k<T;++k)a(m[k],N)>0&&(N=m[k])}u(N),u(D);var I=new S.constructor(1);return i(t(N,I.minus(S)),t(D,S))}var u=n({"number | BigNumber | Unit":function(o){return o}});return c}),al="std",E6=["typed","sqrt","variance"],Vm=P(al,E6,e=>{var{typed:n,sqrt:i,variance:t}=e;return n(al,{"Array | Matrix":r,"Array | Matrix, string":r,"Array | Matrix, number | BigNumber":r,"Array | Matrix, number | BigNumber, string":r,"...":function(c){return r(c)}});function r(a,c){if(a.length===0)throw new SyntaxError("Function std requires one or more parameters (0 provided)");try{return i(t.apply(null,arguments))}catch(l){throw l instanceof TypeError&&l.message.indexOf(" variance")!==-1?new TypeError(l.message.replace(" variance"," std")):l}}}),sl="combinations",C6=["typed"],B6=P(sl,C6,e=>{var{typed:n}=e;return n(sl,{"number, number":Zf,"BigNumber, BigNumber":function(t,r){var a=t.constructor,c,l,u=t.minus(r),f=new a(1);if(!ol(t)||!ol(r))throw new TypeError("Positive integer value expected in function combinations");if(r.gt(t))throw new TypeError("k must be less than n in function combinations");if(c=f,r.lt(u))for(l=f;l.lte(u);l=l.plus(f))c=c.times(r.plus(l)).dividedBy(l);else for(l=f;l.lte(r);l=l.plus(f))c=c.times(u.plus(l)).dividedBy(l);return c}})});function ol(e){return e.isInteger()&&e.gte(0)}var ul="combinationsWithRep",L6=["typed"],D6=P(ul,L6,e=>{var{typed:n}=e;return n(ul,{"number, number":function(t,r){if(!Se(t)||t<0)throw new TypeError("Positive integer value expected in function combinationsWithRep");if(!Se(r)||r<0)throw new TypeError("Positive integer value expected in function combinationsWithRep");if(t<1)throw new TypeError("k must be less than or equal to n + k - 1");if(r<t-1){var a=Nn(t,t+r-1);return a/Nn(1,r)}var c=Nn(r+1,t+r-1);return c/Nn(1,t-1)},"BigNumber, BigNumber":function(t,r){var a=t.constructor,c,l,u=new a(1),f=t.minus(u);if(!cl(t)||!cl(r))throw new TypeError("Positive integer value expected in function combinationsWithRep");if(t.lt(u))throw new TypeError("k must be less than or equal to n + k - 1 in function combinationsWithRep");if(c=u,r.lt(f))for(l=u;l.lte(f);l=l.plus(u))c=c.times(r.plus(l)).dividedBy(l);else for(l=u;l.lte(r);l=l.plus(u))c=c.times(f.plus(l)).dividedBy(l);return c}})});function cl(e){return e.isInteger()&&e.gte(0)}var ll="gamma",I6=["typed","config","multiplyScalar","pow","BigNumber","Complex"],O6=P(ll,I6,e=>{var{typed:n,config:i,multiplyScalar:t,pow:r,BigNumber:a,Complex:c}=e;return n(ll,{number:Ha,Complex:function(f){if(f.im===0)return this(f.re);if(f.re<.5){var o=new c(1-f.re,-f.im),s=new c(Math.PI*f.re,Math.PI*f.im);return new c(Math.PI).div(s.sin()).div(this(o))}f=new c(f.re-1,f.im);for(var m=new c(ht[0],0),h=1;h<ht.length;++h){var p=new c(ht[h],0);m=m.add(p.div(f.add(h)))}var g=new c(f.re+jf+.5,f.im),y=Math.sqrt(2*Math.PI),w=g.pow(f.add(.5)),A=g.neg().exp();return m.mul(y).mul(w).mul(A)},BigNumber:function(f){if(f.isInteger())return f.isNegative()||f.isZero()?new a(1/0):l(f.minus(1));if(!f.isFinite())return new a(f.isNegative()?NaN:1/0);throw new Error("Integer BigNumber expected")},"Array | Matrix":function(f){return xe(f,this)}});function l(u){if(u<8)return new a([1,1,2,6,24,120,720,5040][u]);var f=i.precision+(Math.log(u.toNumber())|0),o=a.clone({precision:f});if(u%2===1)return u.times(l(new a(u-1)));for(var s=u,m=new o(u),h=u.toNumber();s>2;)s-=2,h+=s,m=m.times(h);return new a(m.toPrecision(a.precision))}}),fl="lgamma",z6=["Complex","typed"],P6=P(fl,z6,e=>{var{Complex:n,typed:i}=e,t=7,r=7,a=[-.029550653594771242,.00641025641025641,-.0019175269175269176,.0008417508417508417,-.0005952380952380953,.0007936507936507937,-.002777777777777778,.08333333333333333];return i(fl,{number:Si,Complex:function(f){var o=6.283185307179586,s=1.1447298858494002,m=.1;if(f.isNaN())return new n(NaN,NaN);if(f.im===0)return new n(Si(f.re),0);if(f.re>=t||Math.abs(f.im)>=r)return c(f);if(f.re<=m){var h=sg(o,f.im)*Math.floor(.5*f.re+.25),p=f.mul(Math.PI).sin().log(),g=this(new n(1-f.re,-f.im));return new n(s,h).sub(p).sub(g)}else return f.im>=0?l(f):l(f.conjugate()).conjugate()},BigNumber:function(){throw new Error("mathjs doesn't yet provide an implementation of the algorithm lgamma for BigNumber")}});function c(u){for(var f=u.sub(.5).mul(u.log()).sub(u).add(em),o=new n(1,0).div(u),s=o.div(u),m=a[0],h=a[1],p=2*s.re,g=s.re*s.re+s.im*s.im,y=2;y<8;y++){var w=h;h=-g*m+a[y],m=p*m+w}var A=o.mul(s.mul(m).add(h));return f.add(A)}function l(u){var f=0,o=0,s=u;for(u=u.add(1);u.re<=t;){s=s.mul(u);var m=s.im<0?1:0;m!==0&&o===0&&f++,o=m,u=u.add(1)}return c(u).sub(s.log()).sub(new n(0,f*2*Math.PI*1))}}),ml="factorial",$6=["typed","gamma"],_6=P(ml,$6,e=>{var{typed:n,gamma:i}=e;return n(ml,{number:function(r){if(r<0)throw new Error("Value must be non-negative");return i(r+1)},BigNumber:function(r){if(r.isNegative())throw new Error("Value must be non-negative");return i(r.plus(1))},"Array | Matrix":function(r){return xe(r,this)}})}),hl="kldivergence",F6=["typed","matrix","divide","sum","multiply","dotDivide","log","isNumeric"],R6=P(hl,F6,e=>{var{typed:n,matrix:i,divide:t,sum:r,multiply:a,dotDivide:c,log:l,isNumeric:u}=e;return n(hl,{"Array, Array":function(s,m){return f(i(s),i(m))},"Matrix, Array":function(s,m){return f(s,i(m))},"Array, Matrix":function(s,m){return f(i(s),m)},"Matrix, Matrix":function(s,m){return f(s,m)}});function f(o,s){var m=s.size().length,h=o.size().length;if(m>1)throw new Error("first object must be one dimensional");if(h>1)throw new Error("second object must be one dimensional");if(m!==h)throw new Error("Length of two vectors must be equal");var p=r(o);if(p===0)throw new Error("Sum of elements in first object must be non zero");var g=r(s);if(g===0)throw new Error("Sum of elements in second object must be non zero");var y=t(o,r(o)),w=t(s,r(s)),A=r(a(y,l(c(y,w))));return u(A)?A:Number.NaN}}),pl="multinomial",q6=["typed","add","divide","multiply","factorial","isInteger","isPositive"],K6=P(pl,q6,e=>{var{typed:n,add:i,divide:t,multiply:r,factorial:a,isInteger:c,isPositive:l}=e;return n(pl,{"Array | Matrix":function(f){var o=0,s=1;return kn(f,function(m){if(!c(m)||!l(m))throw new TypeError("Positive integer value expected in function multinomial");o=i(o,m),s=r(s,a(m))}),t(a(o),s)}})}),gl="permutations",U6=["typed","factorial"],V6=P(gl,U6,e=>{var{typed:n,factorial:i}=e;return n(gl,{"number | BigNumber":i,"number, number":function(r,a){if(!Se(r)||r<0)throw new TypeError("Positive integer value expected in function permutations");if(!Se(a)||a<0)throw new TypeError("Positive integer value expected in function permutations");if(a>r)throw new TypeError("second argument k must be less than or equal to first argument n");return Nn(r-a+1,r)},"BigNumber, BigNumber":function(r,a){var c,l;if(!dl(r)||!dl(a))throw new TypeError("Positive integer value expected in function permutations");if(a.gt(r))throw new TypeError("second argument k must be less than or equal to first argument n");var u=r.mul(0).add(1);for(c=u,l=r.minus(a).plus(1);l.lte(r);l=l.plus(1))c=c.times(l);return c}})});function dl(e){return e.isInteger()&&e.gte(0)}var Wm={exports:{}};(function(e){(function(n,i,t){function r(u){var f=this,o=l();f.next=function(){var s=2091639*f.s0+f.c*23283064365386963e-26;return f.s0=f.s1,f.s1=f.s2,f.s2=s-(f.c=s|0)},f.c=1,f.s0=o(" "),f.s1=o(" "),f.s2=o(" "),f.s0-=o(u),f.s0<0&&(f.s0+=1),f.s1-=o(u),f.s1<0&&(f.s1+=1),f.s2-=o(u),f.s2<0&&(f.s2+=1),o=null}function a(u,f){return f.c=u.c,f.s0=u.s0,f.s1=u.s1,f.s2=u.s2,f}function c(u,f){var o=new r(u),s=f&&f.state,m=o.next;return m.int32=function(){return o.next()*4294967296|0},m.double=function(){return m()+(m()*2097152|0)*11102230246251565e-32},m.quick=m,s&&(typeof s=="object"&&a(s,o),m.state=function(){return a(o,{})}),m}function l(){var u=4022871197,f=function(o){o=String(o);for(var s=0;s<o.length;s++){u+=o.charCodeAt(s);var m=.02519603282416938*u;u=m>>>0,m-=u,m*=u,u=m>>>0,m-=u,u+=m*4294967296}return(u>>>0)*23283064365386963e-26};return f}i&&i.exports?i.exports=c:t&&t.amd?t(function(){return c}):this.alea=c})(zr,e,!1)})(Wm);var Gm={exports:{}};(function(e){(function(n,i,t){function r(l){var u=this,f="";u.x=0,u.y=0,u.z=0,u.w=0,u.next=function(){var s=u.x^u.x<<11;return u.x=u.y,u.y=u.z,u.z=u.w,u.w^=u.w>>>19^s^s>>>8},l===(l|0)?u.x=l:f+=l;for(var o=0;o<f.length+64;o++)u.x^=f.charCodeAt(o)|0,u.next()}function a(l,u){return u.x=l.x,u.y=l.y,u.z=l.z,u.w=l.w,u}function c(l,u){var f=new r(l),o=u&&u.state,s=function(){return(f.next()>>>0)/4294967296};return s.double=function(){do var m=f.next()>>>11,h=(f.next()>>>0)/4294967296,p=(m+h)/(1<<21);while(p===0);return p},s.int32=f.next,s.quick=s,o&&(typeof o=="object"&&a(o,f),s.state=function(){return a(f,{})}),s}i&&i.exports?i.exports=c:t&&t.amd?t(function(){return c}):this.xor128=c})(zr,e,!1)})(Gm);var Hm={exports:{}};(function(e){(function(n,i,t){function r(l){var u=this,f="";u.next=function(){var s=u.x^u.x>>>2;return u.x=u.y,u.y=u.z,u.z=u.w,u.w=u.v,(u.d=u.d+362437|0)+(u.v=u.v^u.v<<4^(s^s<<1))|0},u.x=0,u.y=0,u.z=0,u.w=0,u.v=0,l===(l|0)?u.x=l:f+=l;for(var o=0;o<f.length+64;o++)u.x^=f.charCodeAt(o)|0,o==f.length&&(u.d=u.x<<10^u.x>>>4),u.next()}function a(l,u){return u.x=l.x,u.y=l.y,u.z=l.z,u.w=l.w,u.v=l.v,u.d=l.d,u}function c(l,u){var f=new r(l),o=u&&u.state,s=function(){return(f.next()>>>0)/4294967296};return s.double=function(){do var m=f.next()>>>11,h=(f.next()>>>0)/4294967296,p=(m+h)/(1<<21);while(p===0);return p},s.int32=f.next,s.quick=s,o&&(typeof o=="object"&&a(o,f),s.state=function(){return a(f,{})}),s}i&&i.exports?i.exports=c:t&&t.amd?t(function(){return c}):this.xorwow=c})(zr,e,!1)})(Hm);var Zm={exports:{}};(function(e){(function(n,i,t){function r(l){var u=this;u.next=function(){var o=u.x,s=u.i,m,h;return m=o[s],m^=m>>>7,h=m^m<<24,m=o[s+1&7],h^=m^m>>>10,m=o[s+3&7],h^=m^m>>>3,m=o[s+4&7],h^=m^m<<7,m=o[s+7&7],m=m^m<<13,h^=m^m<<9,o[s]=h,u.i=s+1&7,h};function f(o,s){var m,h=[];if(s===(s|0))h[0]=s;else for(s=""+s,m=0;m<s.length;++m)h[m&7]=h[m&7]<<15^s.charCodeAt(m)+h[m+1&7]<<13;for(;h.length<8;)h.push(0);for(m=0;m<8&&h[m]===0;++m);for(m==8&&(h[7]=-1),o.x=h,o.i=0,m=256;m>0;--m)o.next()}f(u,l)}function a(l,u){return u.x=l.x.slice(),u.i=l.i,u}function c(l,u){l==null&&(l=+new Date);var f=new r(l),o=u&&u.state,s=function(){return(f.next()>>>0)/4294967296};return s.double=function(){do var m=f.next()>>>11,h=(f.next()>>>0)/4294967296,p=(m+h)/(1<<21);while(p===0);return p},s.int32=f.next,s.quick=s,o&&(o.x&&a(o,f),s.state=function(){return a(f,{})}),s}i&&i.exports?i.exports=c:t&&t.amd?t(function(){return c}):this.xorshift7=c})(zr,e,!1)})(Zm);var Xm={exports:{}};(function(e){(function(n,i,t){function r(l){var u=this;u.next=function(){var o=u.w,s=u.X,m=u.i,h,p;return u.w=o=o+1640531527|0,p=s[m+34&127],h=s[m=m+1&127],p^=p<<13,h^=h<<17,p^=p>>>15,h^=h>>>12,p=s[m]=p^h,u.i=m,p+(o^o>>>16)|0};function f(o,s){var m,h,p,g,y,w=[],A=128;for(s===(s|0)?(h=s,s=null):(s=s+"\0",h=0,A=Math.max(A,s.length)),p=0,g=-32;g<A;++g)s&&(h^=s.charCodeAt((g+32)%s.length)),g===0&&(y=h),h^=h<<10,h^=h>>>15,h^=h<<4,h^=h>>>13,g>=0&&(y=y+1640531527|0,m=w[g&127]^=h+y,p=m==0?p+1:0);for(p>=128&&(w[(s&&s.length||0)&127]=-1),p=127,g=4*128;g>0;--g)h=w[p+34&127],m=w[p=p+1&127],h^=h<<13,m^=m<<17,h^=h>>>15,m^=m>>>12,w[p]=h^m;o.w=y,o.X=w,o.i=p}f(u,l)}function a(l,u){return u.i=l.i,u.w=l.w,u.X=l.X.slice(),u}function c(l,u){l==null&&(l=+new Date);var f=new r(l),o=u&&u.state,s=function(){return(f.next()>>>0)/4294967296};return s.double=function(){do var m=f.next()>>>11,h=(f.next()>>>0)/4294967296,p=(m+h)/(1<<21);while(p===0);return p},s.int32=f.next,s.quick=s,o&&(o.X&&a(o,f),s.state=function(){return a(f,{})}),s}i&&i.exports?i.exports=c:t&&t.amd?t(function(){return c}):this.xor4096=c})(zr,e,!1)})(Xm);var Ym={exports:{}};(function(e){(function(n,i,t){function r(l){var u=this,f="";u.next=function(){var s=u.b,m=u.c,h=u.d,p=u.a;return s=s<<25^s>>>7^m,m=m-h|0,h=h<<24^h>>>8^p,p=p-s|0,u.b=s=s<<20^s>>>12^m,u.c=m=m-h|0,u.d=h<<16^m>>>16^p,u.a=p-s|0},u.a=0,u.b=0,u.c=-1640531527,u.d=1367130551,l===Math.floor(l)?(u.a=l/4294967296|0,u.b=l|0):f+=l;for(var o=0;o<f.length+20;o++)u.b^=f.charCodeAt(o)|0,u.next()}function a(l,u){return u.a=l.a,u.b=l.b,u.c=l.c,u.d=l.d,u}function c(l,u){var f=new r(l),o=u&&u.state,s=function(){return(f.next()>>>0)/4294967296};return s.double=function(){do var m=f.next()>>>11,h=(f.next()>>>0)/4294967296,p=(m+h)/(1<<21);while(p===0);return p},s.int32=f.next,s.quick=s,o&&(typeof o=="object"&&a(o,f),s.state=function(){return a(f,{})}),s}i&&i.exports?i.exports=c:t&&t.amd?t(function(){return c}):this.tychei=c})(zr,e,!1)})(Ym);var Jm={exports:{}};(function(e){(function(n,i,t){var r=256,a=6,c=52,l="random",u=t.pow(r,a),f=t.pow(2,c),o=f*2,s=r-1,m;function h(b,x,d){var M=[];x=x==!0?{entropy:!0}:x||{};var S=w(y(x.entropy?[b,v(i)]:b==null?A():b,3),M),T=new p(M),N=function(){for(var D=T.g(a),k=u,I=0;D<f;)D=(D+I)*r,k*=r,I=T.g(1);for(;D>=o;)D/=2,k/=2,I>>>=1;return(D+I)/k};return N.int32=function(){return T.g(4)|0},N.quick=function(){return T.g(4)/4294967296},N.double=N,w(v(T.S),i),(x.pass||d||function(D,k,I,_){return _&&(_.S&&g(_,T),D.state=function(){return g(T,{})}),I?(t[l]=D,k):D})(N,S,"global"in x?x.global:this==t,x.state)}function p(b){var x,d=b.length,M=this,S=0,T=M.i=M.j=0,N=M.S=[];for(d||(b=[d++]);S<r;)N[S]=S++;for(S=0;S<r;S++)N[S]=N[T=s&T+b[S%d]+(x=N[S])],N[T]=x;(M.g=function(D){for(var k,I=0,_=M.i,O=M.j,B=M.S;D--;)k=B[_=s&_+1],I=I*r+B[s&(B[_]=B[O=s&O+k])+(B[O]=k)];return M.i=_,M.j=O,I})(r)}function g(b,x){return x.i=b.i,x.j=b.j,x.S=b.S.slice(),x}function y(b,x){var d=[],M=typeof b,S;if(x&&M=="object")for(S in b)try{d.push(y(b[S],x-1))}catch{}return d.length?d:M=="string"?b:b+"\0"}function w(b,x){for(var d=b+"",M,S=0;S<d.length;)x[s&S]=s&(M^=x[s&S]*19)+d.charCodeAt(S++);return v(x)}function A(){try{var b;return m&&(b=m.randomBytes)?b=b(r):(b=new Uint8Array(r),(n.crypto||n.msCrypto).getRandomValues(b)),v(b)}catch{var x=n.navigator,d=x&&x.plugins;return[+new Date,n,d,n.screen,v(i)]}}function v(b){return String.fromCharCode.apply(0,b)}if(w(t.random(),i),e.exports){e.exports=h;try{m=require("crypto")}catch{}}else t["seed"+l]=h})(typeof self!="undefined"?self:zr,[],Math)})(Jm);var W6=Wm.exports,G6=Gm.exports,H6=Hm.exports,Z6=Zm.exports,X6=Xm.exports,Y6=Ym.exports,Yn=Jm.exports;Yn.alea=W6;Yn.xor128=G6;Yn.xorwow=H6;Yn.xorshift7=Z6;Yn.xor4096=X6;Yn.tychei=Y6;var Qm=Yn,J6=Qm(Date.now());function bt(e){var n;function i(r){n=r===null?J6:Qm(String(r))}i(e);function t(){return n()}return t}var vl="pickRandom",Q6=["typed","config","?on"],j6=P(vl,Q6,e=>{var{typed:n,config:i,on:t}=e,r=bt(i.randomSeed);return t&&t("config",function(c,l){c.randomSeed!==l.randomSeed&&(r=bt(c.randomSeed))}),n(vl,{"Array | Matrix":function(l){return a(l,{})},"Array | Matrix, Object":function(l,u){return a(l,u)},"Array | Matrix, number":function(l,u){return a(l,{number:u})},"Array | Matrix, Array | Matrix":function(l,u){return a(l,{weights:u})},"Array | Matrix, Array | Matrix, number":function(l,u,f){return a(l,{number:f,weights:u})},"Array | Matrix, number, Array | Matrix":function(l,u,f){return a(l,{number:u,weights:f})}});function a(c,l){var{number:u,weights:f,elementWise:o=!0}=l,s=typeof u=="undefined";s&&(u=1);var m=Ce(c)?c.create:Ce(f)?f.create:null;c=c.valueOf(),f&&(f=f.valueOf()),o===!0&&(c=qe(c),f=qe(f));var h=0;if(typeof f!="undefined"){if(f.length!==c.length)throw new Error("Weights must have the same length as possibles");for(var p=0,g=f.length;p<g;p++){if(!Fe(f[p])||f[p]<0)throw new Error("Weights must be an array of positive numbers");h+=f[p]}}for(var y=c.length,w=[],A;w.length<u;){if(typeof f=="undefined")A=c[Math.floor(r()*y)];else for(var v=r()*h,b=0,x=c.length;b<x;b++)if(v-=f[b],v<0){A=c[b];break}w.push(A)}return s?w[0]:m?m(w):w}});function ja(e,n){var i=[];if(e=e.slice(0),e.length>1)for(var t=0,r=e.shift();t<r;t++)i.push(ja(e,n));else for(var a=0,c=e.shift();a<c;a++)i.push(n());return i}var bl="random",e8=["typed","config","?on"],r8=P(bl,e8,e=>{var{typed:n,config:i,on:t}=e,r=bt(i.randomSeed);return t&&t("config",function(l,u){l.randomSeed!==u.randomSeed&&(r=bt(l.randomSeed))}),n(bl,{"":()=>c(0,1),number:l=>c(0,l),"number, number":(l,u)=>c(l,u),"Array | Matrix":l=>a(l,0,1),"Array | Matrix, number":(l,u)=>a(l,0,u),"Array | Matrix, number, number":(l,u,f)=>a(l,u,f)});function a(l,u,f){var o=ja(l.valueOf(),()=>c(u,f));return Ce(l)?l.create(o):o}function c(l,u){return l+r()*(u-l)}}),yl="randomInt",n8=["typed","config","?on"],t8=P(yl,n8,e=>{var{typed:n,config:i,on:t}=e,r=bt(i.randomSeed);return t&&t("config",function(l,u){l.randomSeed!==u.randomSeed&&(r=bt(l.randomSeed))}),n(yl,{"":()=>c(0,1),number:l=>c(0,l),"number, number":(l,u)=>c(l,u),"Array | Matrix":l=>a(l,0,1),"Array | Matrix, number":(l,u)=>a(l,0,u),"Array | Matrix, number, number":(l,u,f)=>a(l,u,f)});function a(l,u,f){var o=ja(l.valueOf(),()=>c(u,f));return Ce(l)?l.create(o):o}function c(l,u){return Math.floor(l+r()*(u-l))}}),xl="stirlingS2",i8=["typed","addScalar","subtract","multiplyScalar","divideScalar","pow","factorial","combinations","isNegative","isInteger","number","?bignumber","larger"],a8=P(xl,i8,e=>{var{typed:n,addScalar:i,subtract:t,multiplyScalar:r,divideScalar:a,pow:c,factorial:l,combinations:u,isNegative:f,isInteger:o,number:s,bignumber:m,larger:h}=e,p=[],g=[];return n(xl,{"number | BigNumber, number | BigNumber":function(w,A){if(!o(w)||f(w)||!o(A)||f(A))throw new TypeError("Non-negative integer value expected in function stirlingS2");if(h(A,w))throw new TypeError("k must be less than or equal to n in function stirlingS2");var v=!(Fe(w)&&Fe(A)),b=v?g:p,x=v?m:s,d=s(w),M=s(A);if(b[d]&&b[d].length>M)return b[d][M];for(var S=0;S<=d;++S)if(b[S]||(b[S]=[x(S===0?1:0)]),S!==0)for(var T=b[S],N=b[S-1],D=T.length;D<=S&&D<=M;++D)D===S?T[D]=1:T[D]=i(r(x(D),N[D]),N[D-1]);return b[d][M]}})}),wl="bellNumbers",s8=["typed","addScalar","isNegative","isInteger","stirlingS2"],o8=P(wl,s8,e=>{var{typed:n,addScalar:i,isNegative:t,isInteger:r,stirlingS2:a}=e;return n(wl,{"number | BigNumber":function(l){if(!r(l)||t(l))throw new TypeError("Non-negative integer value expected in function bellNumbers");for(var u=0,f=0;f<=l;f++)u=i(u,a(l,f));return u}})}),Al="catalan",u8=["typed","addScalar","divideScalar","multiplyScalar","combinations","isNegative","isInteger"],c8=P(Al,u8,e=>{var{typed:n,addScalar:i,divideScalar:t,multiplyScalar:r,combinations:a,isNegative:c,isInteger:l}=e;return n(Al,{"number | BigNumber":function(f){if(!l(f)||c(f))throw new TypeError("Non-negative integer value expected in function catalan");return t(a(r(f,2),f),i(f,1))}})}),Nl="composition",l8=["typed","addScalar","combinations","isNegative","isPositive","isInteger","larger"],f8=P(Nl,l8,e=>{var{typed:n,addScalar:i,combinations:t,isPositive:r,isNegative:a,isInteger:c,larger:l}=e;return n(Nl,{"number | BigNumber, number | BigNumber":function(f,o){if(!c(f)||!r(f)||!c(o)||!r(o))throw new TypeError("Positive integer value expected in function composition");if(l(o,f))throw new TypeError("k must be less than or equal to n in function composition");return t(i(f,-1),i(o,-1))}})}),Sl="leafCount",m8=["parse","typed"],h8=P(Sl,m8,e=>{var{parse:n,typed:i}=e;function t(r){var a=0;return r.forEach(c=>{a+=t(c)}),a||1}return i(Sl,{string:function(a){return this(n(a))},Node:function(a){return t(a)}})});function Ml(e,n){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),i.push.apply(i,t)}return i}function pa(e){for(var n=1;n<arguments.length;n++){var i=arguments[n]!=null?arguments[n]:{};n%2?Ml(Object(i),!0).forEach(function(t){Om(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):Ml(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}var p8="simplifyUtil",g8=["FunctionNode","OperatorNode","SymbolNode"],es=P(p8,g8,e=>{var{FunctionNode:n,OperatorNode:i,SymbolNode:t}=e,r=!0,a=!1,c="defaultF",l={add:{trivial:r,total:r,commutative:r,associative:r},unaryPlus:{trivial:r,total:r,commutative:r,associative:r},subtract:{trivial:a,total:r,commutative:a,associative:a},multiply:{trivial:r,total:r,commutative:r,associative:r},divide:{trivial:a,total:r,commutative:a,associative:a},paren:{trivial:r,total:r,commutative:r,associative:a},defaultF:{trivial:a,total:r,commutative:a,associative:a}},u={divide:{total:a},log:{total:a}},f={subtract:{total:a},abs:{trivial:r},log:{total:r}};function o(v,b){var x=arguments.length>2&&arguments[2]!==void 0?arguments[2]:l,d=c;if(typeof v=="string"?d=v:Ir(v)?d=v.fn.toString():Hn(v)?d=v.name:Wt(v)&&(d="paren"),Ne(x,d)){var M=x[d];if(Ne(M,b))return M[b];if(Ne(l,d))return l[d][b]}if(Ne(x,c)){var S=x[c];return Ne(S,b)?S[b]:l[c][b]}if(Ne(l,d)){var T=l[d];if(Ne(T,b))return T[b]}return l[c][b]}function s(v){var b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:l;return o(v,"commutative",b)}function m(v){var b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:l;return o(v,"associative",b)}function h(v,b){var x=pa({},v);for(var d in b)Ne(v,d)?x[d]=pa(pa({},b[d]),v[d]):x[d]=b[d];return x}function p(v,b){if(!v.args||v.args.length===0)return v;v.args=g(v,b);for(var x=0;x<v.args.length;x++)p(v.args[x],b)}function g(v,b){var x,d=[],M=function S(T){for(var N=0;N<T.args.length;N++){var D=T.args[N];Ir(D)&&x===D.op?S(D):d.push(D)}};return m(v,b)?(x=v.op,M(v),d):v.args}function y(v,b){if(!(!v.args||v.args.length===0)){for(var x=A(v),d=v.args.length,M=0;M<d;M++)y(v.args[M],b);if(d>2&&m(v,b)){for(var S=v.args.pop();v.args.length>0;)S=x([v.args.pop(),S]);v.args=S.args}}}function w(v,b){if(!(!v.args||v.args.length===0)){for(var x=A(v),d=v.args.length,M=0;M<d;M++)w(v.args[M],b);if(d>2&&m(v,b)){for(var S=v.args.shift();v.args.length>0;)S=x([S,v.args.shift()]);v.args=S.args}}}function A(v){return Ir(v)?function(b){try{return new i(v.op,v.fn,b,v.implicit)}catch(x){return console.error(x),[]}}:function(b){return new n(new t(v.name),b)}}return{createMakeNodeFunction:A,hasProperty:o,isCommutative:s,isAssociative:m,mergeContext:h,flatten:p,allChildren:g,unflattenr:y,unflattenl:w,defaultContext:l,realContext:u,positiveContext:f}}),d8="simplifyConstant",v8=["typed","config","mathWithTransform","matrix","?fraction","?bignumber","AccessorNode","ArrayNode","ConstantNode","FunctionNode","IndexNode","ObjectNode","OperatorNode","SymbolNode"],jm=P(d8,v8,e=>{var{typed:n,config:i,mathWithTransform:t,matrix:r,fraction:a,bignumber:c,AccessorNode:l,ArrayNode:u,ConstantNode:f,FunctionNode:o,IndexNode:s,ObjectNode:m,OperatorNode:h,SymbolNode:p}=e,{isCommutative:g,isAssociative:y,allChildren:w,createMakeNodeFunction:A}=es({FunctionNode:o,OperatorNode:h,SymbolNode:p});function v(O,B){return M(_(O,B))}function b(O){return yt(O)?O.valueOf():O instanceof Array?O.map(b):Ce(O)?r(b(O.valueOf())):O}function x(O,B,L){try{return t[O].apply(null,B)}catch{return B=B.map(b),T(t[O].apply(null,B),L)}}var d=n({Fraction:D,number:function(B){return B<0?N(new f(-B)):new f(B)},BigNumber:function(B){return B<0?N(new f(-B)):new f(B)},Complex:function(B){throw new Error("Cannot convert Complex number to Node")},string:function(B){return new f(B)},Matrix:function(B){return new u(B.valueOf().map(L=>d(L)))}});function M(O){return We(O)?O:d(O)}function S(O,B){var L=B&&B.exactFractions!==!1;if(L&&isFinite(O)&&a){var V=a(O),C=B&&typeof B.fractionsLimit=="number"?B.fractionsLimit:1/0;if(V.valueOf()===O&&V.n<C&&V.d<C)return V}return O}var T=n({"string, Object":function(B,L){if(i.number==="BigNumber")return c===void 0&&Ya(),c(B);if(i.number==="Fraction")return a===void 0&&km(),a(B);var V=parseFloat(B);return S(V,L)},"Fraction, Object":function(B,L){return B},"BigNumber, Object":function(B,L){return B},"number, Object":function(B,L){return S(B,L)},"Complex, Object":function(B,L){return B.im!==0?B:S(B.re,L)},"Matrix, Object":function(B,L){return r(S(B.valueOf()))},"Array, Object":function(B,L){return B.map(S)}});function N(O){return new h("-","unaryMinus",[O])}function D(O){var B,L=O.s*O.n;return L<0?B=new h("-","unaryMinus",[new f(-L)]):B=new f(L),O.d===1?B:new h("/","divide",[B,new f(O.d)])}function k(O,B,L){if(!wt(B))return new l(M(O),M(B));if(Kr(O)||Ce(O)){for(var V=Array.from(B.dimensions);V.length>0;)if(Ye(V[0])&&typeof V[0].value!="string"){var C=T(V.shift().value,L);Kr(O)?O=O.items[C-1]:(O=O.valueOf()[C-1],O instanceof Array&&(O=r(O)))}else if(V.length>1&&Ye(V[1])&&typeof V[1].value!="string"){var U=T(V[1].value,L),X=[],j=Kr(O)?O.items:O.valueOf();for(var W of j)if(Kr(W))X.push(W.items[U-1]);else if(Ce(O))X.push(W[U-1]);else break;if(X.length===j.length)Kr(O)?O=new u(X):O=r(X),V.splice(1,1);else break}else break;return V.length===B.dimensions.length?new l(M(O),B):V.length>0?(B=new s(V),new l(M(O),B)):O}if(Li(O)&&B.dimensions.length===1&&Ye(B.dimensions[0])){var Q=B.dimensions[0].value;return Q in O.properties?O.properties[Q]:new f}return new l(M(O),B)}function I(O,B,L,V){return B.reduce(function(C,U){if(!We(C)&&!We(U)){try{return x(O,[C,U],V)}catch{}C=d(C),U=d(U)}else We(C)?We(U)||(U=d(U)):C=d(C);return L([C,U])})}function _(O,B){switch(O.type){case"SymbolNode":return O;case"ConstantNode":switch(typeof O.value){case"number":return T(O.value,B);case"string":return O.value;default:if(!isNaN(O.value))return T(O.value,B)}return O;case"FunctionNode":if(t[O.name]&&t[O.name].rawArgs)return O;{var L=["add","multiply"];if(L.indexOf(O.name)===-1){var V=O.args.map(be=>_(be,B));if(!V.some(We))try{return x(O.name,V,B)}catch{}if(O.name==="size"&&V.length===1&&Kr(V[0])){for(var C=[],U=V[0];Kr(U);)C.push(U.items.length),U=U.items[0];return r(C)}return new o(O.name,V.map(M))}}case"OperatorNode":{var X=O.fn.toString(),j,W,Q=A(O);if(Ir(O)&&O.isUnary())j=[_(O.args[0],B)],We(j[0])?W=Q(j):W=x(X,j,B);else if(y(O,B.context))if(j=w(O,B.context),j=j.map(be=>_(be,B)),g(X,B.context)){for(var ne=[],re=[],ae=0;ae<j.length;ae++)We(j[ae])?re.push(j[ae]):ne.push(j[ae]);ne.length>1?(W=I(X,ne,Q,B),re.unshift(W),W=I(X,re,Q,B)):W=I(X,j,Q,B)}else W=I(X,j,Q,B);else j=O.args.map(be=>_(be,B)),W=I(X,j,Q,B);return W}case"ParenthesisNode":return _(O.content,B);case"AccessorNode":return k(_(O.object,B),_(O.index,B),B);case"ArrayNode":{var te=O.items.map(be=>_(be,B));return te.some(We)?new u(te.map(M)):r(te)}case"IndexNode":return new s(O.dimensions.map(be=>v(be,B)));case"ObjectNode":{var ue={};for(var ee in O.properties)ue[ee]=v(O.properties[ee],B);return new m(ue)}case"AssignmentNode":case"BlockNode":case"FunctionAssignmentNode":case"RangeNode":case"ConditionalNode":default:throw new Error("Unimplemented node type in simplifyConstant: ".concat(O.type))}}return v}),b8="simplify",y8=["config","typed","parse","add","subtract","multiply","divide","pow","isZero","equal","resolve","simplifyCore","?fraction","?bignumber","mathWithTransform","matrix","AccessorNode","ArrayNode","ConstantNode","FunctionNode","IndexNode","ObjectNode","OperatorNode","ParenthesisNode","SymbolNode"],x8=P(b8,y8,e=>{var{config:n,typed:i,parse:t,add:r,subtract:a,multiply:c,divide:l,pow:u,isZero:f,equal:o,resolve:s,simplifyCore:m,fraction:h,bignumber:p,mathWithTransform:g,matrix:y,AccessorNode:w,ArrayNode:A,ConstantNode:v,FunctionNode:b,IndexNode:x,ObjectNode:d,OperatorNode:M,ParenthesisNode:S,SymbolNode:T}=e,N=jm({typed:i,config:n,mathWithTransform:g,matrix:y,fraction:h,bignumber:p,AccessorNode:w,ArrayNode:A,ConstantNode:v,FunctionNode:b,IndexNode:x,ObjectNode:d,OperatorNode:M,SymbolNode:T}),{hasProperty:D,isCommutative:k,isAssociative:I,mergeContext:_,flatten:O,unflattenr:B,unflattenl:L,createMakeNodeFunction:V,defaultContext:C,realContext:U,positiveContext:X}=es({FunctionNode:b,OperatorNode:M,SymbolNode:T}),j=i("simplify",{string:function(R){return this(t(R),this.rules,wn(),{})},"string, Map | Object":function(R,Y){return this(t(R),this.rules,Y,{})},"string, Map | Object, Object":function(R,Y,z){return this(t(R),this.rules,Y,z)},"string, Array":function(R,Y){return this(t(R),Y,wn(),{})},"string, Array, Map | Object":function(R,Y,z){return this(t(R),Y,z,{})},"string, Array, Map | Object, Object":function(R,Y,z,F){return this(t(R),Y,z,F)},"Node, Map | Object":function(R,Y){return this(R,this.rules,Y,{})},"Node, Map | Object, Object":function(R,Y,z){return this(R,this.rules,Y,z)},Node:function(R){return this(R,this.rules,wn(),{})},"Node, Array":function(R,Y){return this(R,Y,wn(),{})},"Node, Array, Map | Object":function(R,Y,z){return this(R,Y,z,{})},"Node, Array, Object, Object":function(R,Y,z,F){return this(R,Y,Va(z),F)},"Node, Array, Map, Object":function(R,Y,z,F){var J=F.consoleDebug;Y=re(Y,F.context);var q=s(R,z);q=W(q);for(var oe={},le=q.toString({parenthesis:"all"});!oe[le];){oe[le]=!0,ae=0;var ve=le;J&&console.log("Working on: ",le);for(var he=0;he<Y.length;he++){var pe="";if(typeof Y[he]=="function"?(q=Y[he](q,F),J&&(pe=Y[he].name)):(O(q,F.context),q=ee(q,Y[he],F.context),J&&(pe="".concat(Y[he].l.toString()," -> ").concat(Y[he].r.toString()))),J){var Ae=q.toString({parenthesis:"all"});Ae!==ve&&(console.log("Applying",pe,"produced",Ae),ve=Ae)}L(q,F.context)}le=q.toString({parenthesis:"all"})}return q}});j.defaultContext=C,j.realContext=U,j.positiveContext=X;function W(K){return K.transform(function(R,Y,z){return Wt(R)?W(R.content):R})}var Q={true:!0,false:!0,e:!0,i:!0,Infinity:!0,LN2:!0,LN10:!0,LOG2E:!0,LOG10E:!0,NaN:!0,phi:!0,pi:!0,SQRT1_2:!0,SQRT2:!0,tau:!0};j.rules=[m,{l:"log(e)",r:"1"},{s:"n-n1 -> n+-n1",assuming:{subtract:{total:!0}}},{s:"n-n -> 0",assuming:{subtract:{total:!1}}},{s:"-(c*v) -> v * (-c)",assuming:{multiply:{commutative:!0},subtract:{total:!0}}},{s:"-(c*v) -> (-c) * v",assuming:{multiply:{commutative:!1},subtract:{total:!0}}},{s:"-(v*c) -> v * (-c)",assuming:{multiply:{commutative:!1},subtract:{total:!0}}},{l:"-(n1/n2)",r:"-n1/n2"},{l:"-v",r:"v * (-1)"},{l:"(n1 + n2)*(-1)",r:"n1*(-1) + n2*(-1)",repeat:!0},{l:"n/n1^n2",r:"n*n1^-n2"},{l:"n/n1",r:"n*n1^-1"},{s:"(n1*n2)^n3 -> n1^n3 * n2^n3",assuming:{multiply:{commutative:!0}}},{s:"(n1*n2)^(-1) -> n2^(-1) * n1^(-1)",assuming:{multiply:{commutative:!1}}},{s:"(n ^ n1) ^ n2 -> n ^ (n1 * n2)",assuming:{divide:{total:!0}}},{l:" v   * ( v   * n1 + n2)",r:"v^2       * n1 +  v   * n2"},{s:" v   * (v^n4 * n1 + n2)   ->  v^(1+n4)  * n1 +  v   * n2",assuming:{divide:{total:!0}}},{s:"v^n3 * ( v   * n1 + n2)   ->  v^(n3+1)  * n1 + v^n3 * n2",assuming:{divide:{total:!0}}},{s:"v^n3 * (v^n4 * n1 + n2)   ->  v^(n3+n4) * n1 + v^n3 * n2",assuming:{divide:{total:!0}}},{l:"n*n",r:"n^2"},{s:"n * n^n1 -> n^(n1+1)",assuming:{divide:{total:!0}}},{s:"n^n1 * n^n2 -> n^(n1+n2)",assuming:{divide:{total:!0}}},N,{s:"n+n -> 2*n",assuming:{add:{total:!0}}},{l:"n+-n",r:"0"},{l:"v*n + v",r:"v*(n+1)"},{l:"n3*n1 + n3*n2",r:"n3*(n1+n2)"},{l:"n3^(-n4)*n1 +   n3  * n2",r:"n3^(-n4)*(n1 + n3^(n4+1) *n2)"},{l:"n3^(-n4)*n1 + n3^n5 * n2",r:"n3^(-n4)*(n1 + n3^(n4+n5)*n2)"},{s:"n*v + v -> (n+1)*v",assuming:{multiply:{commutative:!1}}},{s:"n1*n3 + n2*n3 -> (n1+n2)*n3",assuming:{multiply:{commutative:!1}}},{s:"n1*n3^(-n4) + n2 * n3    -> (n1 + n2*n3^(n4 +  1))*n3^(-n4)",assuming:{multiply:{commutative:!1}}},{s:"n1*n3^(-n4) + n2 * n3^n5 -> (n1 + n2*n3^(n4 + n5))*n3^(-n4)",assuming:{multiply:{commutative:!1}}},{l:"n*c + c",r:"(n+1)*c"},{s:"c*n + c -> c*(n+1)",assuming:{multiply:{commutative:!1}}},N,{s:"(-n)*n1 -> -(n*n1)",assuming:{subtract:{total:!0}}},{s:"n1*(-n) -> -(n1*n)",assuming:{subtract:{total:!0},multiply:{commutative:!1}}},{s:"c+v -> v+c",assuming:{add:{commutative:!0}},imposeContext:{add:{commutative:!1}}},{s:"v*c -> c*v",assuming:{multiply:{commutative:!0}},imposeContext:{multiply:{commutative:!1}}},{l:"n+-n1",r:"n-n1"},{s:"n*(n1^-1) -> n/n1",assuming:{multiply:{commutative:!0}}},{s:"n*n1^-n2 -> n/n1^n2",assuming:{multiply:{commutative:!0}}},{s:"n^-1 -> 1/n",assuming:{multiply:{commutative:!0}}},{l:"n^1",r:"n"},{s:"n*(n1/n2) -> (n*n1)/n2",assuming:{multiply:{associative:!0}}},{s:"n-(n1+n2) -> n-n1-n2",assuming:{addition:{associative:!0,commutative:!0}}},{l:"1*n",r:"n",imposeContext:{multiply:{commutative:!0}}},{s:"n1/(n2/n3) -> (n1*n3)/n2",assuming:{multiply:{associative:!0}}},{l:"n1/(-n2)",r:"-n1/n2"}];function ne(K,R){var Y={};if(K.s){var z=K.s.split("->");if(z.length===2)Y.l=z[0],Y.r=z[1];else throw SyntaxError("Could not parse rule: "+K.s)}else Y.l=K.l,Y.r=K.r;Y.l=W(t(Y.l)),Y.r=W(t(Y.r));for(var F of["imposeContext","repeat","assuming"])F in K&&(Y[F]=K[F]);if(K.evaluate&&(Y.evaluate=t(K.evaluate)),I(Y.l,R)){var J=V(Y.l),q=te();Y.expanded={},Y.expanded.l=J([Y.l.clone(),q]),O(Y.expanded.l,R),B(Y.expanded.l,R),Y.expanded.r=J([Y.r,q])}return Y}function re(K,R){for(var Y=[],z=0;z<K.length;z++){var F=K[z],J=void 0,q=typeof F;switch(q){case"string":F={s:F};case"object":J=ne(F,R);break;case"function":J=F;break;default:throw TypeError("Unsupported type of rule: "+q)}Y.push(J)}return Y}var ae=0;function te(){return new T("_p"+ae++)}function ue(K,R,Y){var z=K;if(K)for(var F=0;F<K.length;++F){var J=ee(K[F],R,Y);J!==K[F]&&(z===K&&(z=K.slice()),z[F]=J)}return z}function ee(K,R,Y){if(R.assuming){for(var z in R.assuming)for(var F in R.assuming[z])if(D(z,F,Y)!==R.assuming[z][F])return K}var J=_(R.imposeContext,Y),q=K;if(q instanceof M||q instanceof b){var oe=ue(q.args,R,Y);oe!==q.args&&(q=q.clone(),q.args=oe)}else if(q instanceof S){if(q.content){var le=ee(q.content,R,Y);le!==q.content&&(q=new S(le))}}else if(q instanceof A){var ve=ue(q.items,R,Y);ve!==q.items&&(q=new A(ve))}else if(q instanceof w){var he=q.object;q.object&&(he=ee(q.object,R,Y));var pe=q.index;q.index&&(pe=ee(q.index,R,Y)),(he!==q.object||pe!==q.index)&&(q=new w(he,pe))}else if(q instanceof x){var Ae=ue(q.dimensions,R,Y);Ae!==q.dimensions&&(q=new x(Ae))}else if(q instanceof d){var Xe=!1,or={};for(var nr in q.properties)or[nr]=ee(q.properties[nr],R,Y),or[nr]!==q.properties[nr]&&(Xe=!0);Xe&&(q=new d(or))}var qr=R.r,$r=$(R.l,q,J)[0];if(!$r&&R.expanded&&(qr=R.expanded.r,$r=$(R.expanded.l,q,J)[0]),$r){var vn=q.implicit;q=qr.clone(),vn&&"implicit"in qr&&(q.implicit=!0),q=q.transform(function(Ge){return Ge.isSymbolNode&&Ne($r.placeholders,Ge.name)?$r.placeholders[Ge.name].clone():Ge})}return R.repeat&&q!==K&&(q=ee(q,R,Y)),q}function be(K,R){var Y=[],z,F,J=V(K);if(k(K,R))for(var q=0;q<K.args.length;q++)F=K.args.slice(0),F.splice(q,1),z=F.length===1?F[0]:J(F),Y.push(J([K.args[q],z]));else for(var oe=1;oe<K.args.length;oe++){var le=K.args[0];oe>1&&(le=J(K.args.slice(0,oe))),F=K.args.slice(oe),z=F.length===1?F[0]:J(F),Y.push(J([le,z]))}return Y}function we(K,R){var Y={placeholders:{}};if(!K.placeholders&&!R.placeholders)return Y;if(K.placeholders){if(!R.placeholders)return K}else return R;for(var z in K.placeholders)if(Ne(K.placeholders,z)&&(Y.placeholders[z]=K.placeholders[z],Ne(R.placeholders,z)&&!Z(K.placeholders[z],R.placeholders[z])))return null;for(var F in R.placeholders)Ne(R.placeholders,F)&&(Y.placeholders[F]=R.placeholders[F]);return Y}function me(K,R){var Y=[];if(K.length===0||R.length===0)return Y;for(var z,F=0;F<K.length;F++)for(var J=0;J<R.length;J++)z=we(K[F],R[J]),z&&Y.push(z);return Y}function ye(K){if(K.length===0)return K;for(var R=K.reduce(me),Y=[],z={},F=0;F<R.length;F++){var J=JSON.stringify(R[F]);z[J]||(z[J]=!0,Y.push(R[F]))}return Y}function $(K,R,Y,z){var F=[{placeholders:{}}];if(K instanceof M&&R instanceof M||K instanceof b&&R instanceof b){if(K instanceof M){if(K.op!==R.op||K.fn!==R.fn)return[]}else if(K instanceof b&&K.name!==R.name)return[];if(R.args.length===1&&K.args.length===1||!I(R,Y)&&R.args.length===K.args.length||z){for(var J=[],q=0;q<K.args.length;q++){var oe=$(K.args[q],R.args[q],Y);if(oe.length===0)break;J.push(oe)}if(J.length!==K.args.length){if(!k(R,Y)||K.args.length===1)return[];if(K.args.length>2)throw new Error("permuting >2 commutative non-associative rule arguments not yet implemented");var le=$(K.args[0],R.args[1],Y);if(le.length===0)return[];var ve=$(K.args[1],R.args[0],Y);if(ve.length===0)return[];J=[le,ve]}F=ye(J)}else if(R.args.length>=2&&K.args.length===2){for(var he=be(R,Y),pe=[],Ae=0;Ae<he.length;Ae++){var Xe=$(K,he[Ae],Y,!0);pe=pe.concat(Xe)}return pe}else{if(K.args.length>2)throw Error("Unexpected non-binary associative function: "+K.toString());return[]}}else if(K instanceof T){if(K.name.length===0)throw new Error("Symbol in rule has 0 length...!?");if(Q[K.name]){if(K.name!==R.name)return[]}else if(K.name[0]==="n"||K.name.substring(0,2)==="_p")F[0].placeholders[K.name]=R;else if(K.name[0]==="v")if(!Ye(R))F[0].placeholders[K.name]=R;else return[];else if(K.name[0]==="c")if(R instanceof v)F[0].placeholders[K.name]=R;else return[];else throw new Error("Invalid symbol in rule: "+K.name)}else if(K instanceof v){if(!o(K.value,R.value))return[]}else return[];return F}function Z(K,R){if(K instanceof v&&R instanceof v){if(!o(K.value,R.value))return!1}else if(K instanceof T&&R instanceof T){if(K.name!==R.name)return!1}else if(K instanceof M&&R instanceof M||K instanceof b&&R instanceof b){if(K instanceof M){if(K.op!==R.op||K.fn!==R.fn)return!1}else if(K instanceof b&&K.name!==R.name)return!1;if(K.args.length!==R.args.length)return!1;for(var Y=0;Y<K.args.length;Y++)if(!Z(K.args[Y],R.args[Y]))return!1}else return!1;return!0}return j}),w8="simplifyCore",A8=["equal","isZero","add","subtract","multiply","divide","pow","AccessorNode","ArrayNode","ConstantNode","FunctionNode","IndexNode","ObjectNode","OperatorNode","ParenthesisNode","SymbolNode"],N8=P(w8,A8,e=>{var{equal:n,isZero:i,add:t,subtract:r,multiply:a,divide:c,pow:l,AccessorNode:u,ArrayNode:f,ConstantNode:o,FunctionNode:s,IndexNode:m,ObjectNode:h,OperatorNode:p,ParenthesisNode:g,SymbolNode:y}=e,w=new o(0),A=new o(1),{hasProperty:v,isCommutative:b}=es({FunctionNode:s,OperatorNode:p,SymbolNode:y});function x(d,M){var S=M?M.context:void 0;if(v(d,"trivial",S)){if(Hn(d)&&d.args.length===1)return x(d.args[0],M);var T=!1,N=0;if(d.forEach(C=>{++N,N===1&&(T=x(C,M))}),N===1)return T}if(Ir(d)&&d.isUnary()){var D=x(d.args[0],M);if(d.op==="-"){if(Ir(D)){if(D.isUnary()&&D.op==="-")return D.args[0];if(D.isBinary()&&D.fn==="subtract")return new p("-","subtract",[D.args[1],D.args[0]])}return new p(d.op,d.fn,[D])}}else if(Ir(d)&&d.isBinary()){var k=x(d.args[0],M),I=x(d.args[1],M);if(d.op==="+"){if(Ye(k)){if(i(k.value))return I;if(Ye(I))return new o(t(k.value,I.value))}return Ye(I)&&i(I.value)?k:Ir(I)&&I.isUnary()&&I.op==="-"?new p("-","subtract",[k,I.args[0]]):new p(d.op,d.fn,I?[k,I]:[k])}else if(d.op==="-"){if(Ye(k)&&I){if(Ye(I))return new o(r(k.value,I.value));if(i(k.value))return new p("-","unaryMinus",[I])}if(d.fn==="subtract")return Ye(I)&&i(I.value)?k:Ir(I)&&I.isUnary()&&I.op==="-"?x(new p("+","add",[k,I.args[0]]),M):new p(d.op,d.fn,[k,I])}else if(d.op==="*"){if(Ye(k)){if(i(k.value))return w;if(n(k.value,1))return I;if(Ye(I))return new o(a(k.value,I.value))}if(Ye(I)){if(i(I.value))return w;if(n(I.value,1))return k;if(Ir(k)&&k.isBinary()&&k.op===d.op&&b(d,S)){var _=k.args[0];if(Ye(_)){var O=new o(a(_.value,I.value));return new p(d.op,d.fn,[O,k.args[1]],d.implicit)}}return b(d,S)?new p(d.op,d.fn,[I,k],d.implicit):new p(d.op,d.fn,[k,I],d.implicit)}return new p(d.op,d.fn,[k,I],d.implicit)}else if(d.op==="/"){if(Ye(k)){if(i(k.value))return w;if(Ye(I)&&(n(I.value,1)||n(I.value,2)||n(I.value,4)))return new o(c(k.value,I.value))}return new p(d.op,d.fn,[k,I])}else if(d.op==="^"&&Ye(I)){if(i(I.value))return A;if(n(I.value,1))return k;if(Ye(k))return new o(l(k.value,I.value));if(Ir(k)&&k.isBinary()&&k.op==="^"){var B=k.args[1];if(Ye(B))return new p(d.op,d.fn,[k.args[0],new o(a(B.value,I.value))])}}return new p(d.op,d.fn,[k,I])}else{if(Hn(d))return new s(x(d.fn),d.args.map(C=>x(C,M)));if(Kr(d))return new f(d.items.map(C=>x(C,M)));if(Gn(d))return new u(x(d.object,M),x(d.index,M));if(wt(d))return new m(d.dimensions.map(C=>x(C,M)));if(Li(d)){var L={};for(var V in d.properties)L[V]=x(d.properties[V],M);return new h(L)}}return d}return x}),S8="resolve",M8=["parse","ConstantNode","FunctionNode","OperatorNode","ParenthesisNode"],T8=P(S8,M8,e=>{var{parse:n,ConstantNode:i,FunctionNode:t,OperatorNode:r,ParenthesisNode:a}=e;function c(l,u){var f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:new Set;if(!u)return l;if(zi(u)||(u=Va(u)),vr(l)){if(f.has(l.name)){var o=Array.from(f).join(", ");throw new ReferenceError("recursive loop of variable definitions among {".concat(o,"}"))}var s=u.get(l.name);if(We(s)){var m=new Set(f);return m.add(l.name),c(s,u,m)}else return typeof s=="number"?n(String(s)):s!==void 0?new i(s):l}else if(Ir(l)){var h=l.args.map(function(g){return c(g,u,f)});return new r(l.op,l.fn,h,l.implicit)}else{if(Wt(l))return new a(c(l.content,u,f));if(Hn(l)){var p=l.args.map(function(g){return c(g,u,f)});return new t(l.name,p)}}return l.map(g=>c(g,u,f))}return c}),Tl="symbolicEqual",k8=["parse","simplify","typed","OperatorNode"],E8=P(Tl,k8,e=>{var{parse:n,simplify:i,typed:t,OperatorNode:r}=e;return t(Tl,{"string, string":function(c,l){return this(n(c),n(l),{})},"string, string, Object":function(c,l,u){return this(n(c),n(l),u)},"Node, string":function(c,l){return this(c,n(l),{})},"Node, string, Object":function(c,l,u){return this(c,n(l),u)},"string, Node":function(c,l){return this(n(c),l,{})},"string, Node, Object":function(c,l,u){return this(n(c),l,u)},"Node, Node":function(c,l){return this(c,l,{})},"Node, Node, Object":function(c,l,u){var f=new r("-","subtract",[c,l]),o=i(f,{},u);return Ye(o)&&!o.value}})}),C8="derivative",B8=["typed","config","parse","simplify","equal","isZero","numeric","ConstantNode","FunctionNode","OperatorNode","ParenthesisNode","SymbolNode"],L8=P(C8,B8,e=>{var{typed:n,config:i,parse:t,simplify:r,equal:a,isZero:c,numeric:l,ConstantNode:u,FunctionNode:f,OperatorNode:o,ParenthesisNode:s,SymbolNode:m}=e,h=n("derivative",{"Node, SymbolNode, Object":function(b,x,d){var M={};g(M,b,x.name);var S=y(b,M);return d.simplify?r(S):S},"Node, SymbolNode":function(b,x){return this(b,x,{simplify:!0})},"string, SymbolNode":function(b,x){return this(t(b),x)},"string, SymbolNode, Object":function(b,x,d){return this(t(b),x,d)},"string, string":function(b,x){return this(t(b),t(x))},"string, string, Object":function(b,x,d){return this(t(b),t(x),d)},"Node, string":function(b,x){return this(b,t(x))},"Node, string, Object":function(b,x,d){return this(b,t(x),d)}});h._simplify=!0,h.toTex=function(v){return p.apply(null,v.args)};var p=n("_derivTex",{"Node, SymbolNode":function(b,x){return Ye(b)&&je(b.value)==="string"?p(t(b.value).toString(),x.toString(),1):p(b.toString(),x.toString(),1)},"Node, ConstantNode":function(b,x){if(je(x.value)==="string")return p(b,t(x.value));throw new Error("The second parameter to 'derivative' is a non-string constant")},"Node, SymbolNode, ConstantNode":function(b,x,d){return p(b.toString(),x.name,d.value)},"string, string, number":function(b,x,d){var M;return d===1?M="{d\\over d"+x+"}":M="{d^{"+d+"}\\over d"+x+"^{"+d+"}}",M+"\\left[".concat(b,"\\right]")}}),g=n("constTag",{"Object, ConstantNode, string":function(b,x){return b[x]=!0,!0},"Object, SymbolNode, string":function(b,x,d){return x.name!==d?(b[x]=!0,!0):!1},"Object, ParenthesisNode, string":function(b,x,d){return g(b,x.content,d)},"Object, FunctionAssignmentNode, string":function(b,x,d){return x.params.indexOf(d)===-1?(b[x]=!0,!0):g(b,x.expr,d)},"Object, FunctionNode | OperatorNode, string":function(b,x,d){if(x.args.length>0){for(var M=g(b,x.args[0],d),S=1;S<x.args.length;++S)M=g(b,x.args[S],d)&&M;if(M)return b[x]=!0,!0}return!1}}),y=n("_derivative",{"ConstantNode, Object":function(b){return A(0)},"SymbolNode, Object":function(b,x){return x[b]!==void 0?A(0):A(1)},"ParenthesisNode, Object":function(b,x){return new s(y(b.content,x))},"FunctionAssignmentNode, Object":function(b,x){return x[b]!==void 0?A(0):y(b.expr,x)},"FunctionNode, Object":function(b,x){if(b.args.length!==1&&w(b),x[b]!==void 0)return A(0);var d=b.args[0],M,S=!1,T=!1,N;switch(b.name){case"cbrt":S=!0,N=new o("*","multiply",[A(3),new o("^","pow",[d,new o("/","divide",[A(2),A(3)])])]);break;case"sqrt":case"nthRoot":if(b.args.length===1)S=!0,N=new o("*","multiply",[A(2),new f("sqrt",[d])]);else if(b.args.length===2)return M=new o("/","divide",[A(1),b.args[1]]),x[M]=x[b.args[1]],y(new o("^","pow",[d,M]),x);break;case"log10":M=A(10);case"log":if(!M&&b.args.length===1)N=d.clone(),S=!0;else if(b.args.length===1&&M||b.args.length===2&&x[b.args[1]]!==void 0)N=new o("*","multiply",[d.clone(),new f("log",[M||b.args[1]])]),S=!0;else if(b.args.length===2)return y(new o("/","divide",[new f("log",[d]),new f("log",[b.args[1]])]),x);break;case"pow":return x[M]=x[b.args[1]],y(new o("^","pow",[d,b.args[1]]),x);case"exp":N=new f("exp",[d.clone()]);break;case"sin":N=new f("cos",[d.clone()]);break;case"cos":N=new o("-","unaryMinus",[new f("sin",[d.clone()])]);break;case"tan":N=new o("^","pow",[new f("sec",[d.clone()]),A(2)]);break;case"sec":N=new o("*","multiply",[b,new f("tan",[d.clone()])]);break;case"csc":T=!0,N=new o("*","multiply",[b,new f("cot",[d.clone()])]);break;case"cot":T=!0,N=new o("^","pow",[new f("csc",[d.clone()]),A(2)]);break;case"asin":S=!0,N=new f("sqrt",[new o("-","subtract",[A(1),new o("^","pow",[d.clone(),A(2)])])]);break;case"acos":S=!0,T=!0,N=new f("sqrt",[new o("-","subtract",[A(1),new o("^","pow",[d.clone(),A(2)])])]);break;case"atan":S=!0,N=new o("+","add",[new o("^","pow",[d.clone(),A(2)]),A(1)]);break;case"asec":S=!0,N=new o("*","multiply",[new f("abs",[d.clone()]),new f("sqrt",[new o("-","subtract",[new o("^","pow",[d.clone(),A(2)]),A(1)])])]);break;case"acsc":S=!0,T=!0,N=new o("*","multiply",[new f("abs",[d.clone()]),new f("sqrt",[new o("-","subtract",[new o("^","pow",[d.clone(),A(2)]),A(1)])])]);break;case"acot":S=!0,T=!0,N=new o("+","add",[new o("^","pow",[d.clone(),A(2)]),A(1)]);break;case"sinh":N=new f("cosh",[d.clone()]);break;case"cosh":N=new f("sinh",[d.clone()]);break;case"tanh":N=new o("^","pow",[new f("sech",[d.clone()]),A(2)]);break;case"sech":T=!0,N=new o("*","multiply",[b,new f("tanh",[d.clone()])]);break;case"csch":T=!0,N=new o("*","multiply",[b,new f("coth",[d.clone()])]);break;case"coth":T=!0,N=new o("^","pow",[new f("csch",[d.clone()]),A(2)]);break;case"asinh":S=!0,N=new f("sqrt",[new o("+","add",[new o("^","pow",[d.clone(),A(2)]),A(1)])]);break;case"acosh":S=!0,N=new f("sqrt",[new o("-","subtract",[new o("^","pow",[d.clone(),A(2)]),A(1)])]);break;case"atanh":S=!0,N=new o("-","subtract",[A(1),new o("^","pow",[d.clone(),A(2)])]);break;case"asech":S=!0,T=!0,N=new o("*","multiply",[d.clone(),new f("sqrt",[new o("-","subtract",[A(1),new o("^","pow",[d.clone(),A(2)])])])]);break;case"acsch":S=!0,T=!0,N=new o("*","multiply",[new f("abs",[d.clone()]),new f("sqrt",[new o("+","add",[new o("^","pow",[d.clone(),A(2)]),A(1)])])]);break;case"acoth":S=!0,T=!0,N=new o("-","subtract",[A(1),new o("^","pow",[d.clone(),A(2)])]);break;case"abs":N=new o("/","divide",[new f(new m("abs"),[d.clone()]),d.clone()]);break;case"gamma":default:throw new Error('Function "'+b.name+'" is not supported by derivative, or a wrong number of arguments is passed')}var D,k;S?(D="/",k="divide"):(D="*",k="multiply");var I=y(d,x);return T&&(I=new o("-","unaryMinus",[I])),new o(D,k,[I,N])},"OperatorNode, Object":function(b,x){if(x[b]!==void 0)return A(0);if(b.op==="+")return new o(b.op,b.fn,b.args.map(function(O){return y(O,x)}));if(b.op==="-"){if(b.isUnary())return new o(b.op,b.fn,[y(b.args[0],x)]);if(b.isBinary())return new o(b.op,b.fn,[y(b.args[0],x),y(b.args[1],x)])}if(b.op==="*"){var d=b.args.filter(function(O){return x[O]!==void 0});if(d.length>0){var M=b.args.filter(function(O){return x[O]===void 0}),S=M.length===1?M[0]:new o("*","multiply",M),T=d.concat(y(S,x));return new o("*","multiply",T)}return new o("+","add",b.args.map(function(O){return new o("*","multiply",b.args.map(function(B){return B===O?y(B,x):B.clone()}))}))}if(b.op==="/"&&b.isBinary()){var N=b.args[0],D=b.args[1];return x[D]!==void 0?new o("/","divide",[y(N,x),D]):x[N]!==void 0?new o("*","multiply",[new o("-","unaryMinus",[N]),new o("/","divide",[y(D,x),new o("^","pow",[D.clone(),A(2)])])]):new o("/","divide",[new o("-","subtract",[new o("*","multiply",[y(N,x),D.clone()]),new o("*","multiply",[N.clone(),y(D,x)])]),new o("^","pow",[D.clone(),A(2)])])}if(b.op==="^"&&b.isBinary()){var k=b.args[0],I=b.args[1];if(x[k]!==void 0)return Ye(k)&&(c(k.value)||a(k.value,1))?A(0):new o("*","multiply",[b,new o("*","multiply",[new f("log",[k.clone()]),y(I.clone(),x)])]);if(x[I]!==void 0){if(Ye(I)){if(c(I.value))return A(0);if(a(I.value,1))return y(k,x)}var _=new o("^","pow",[k.clone(),new o("-","subtract",[I,A(1)])]);return new o("*","multiply",[I.clone(),new o("*","multiply",[y(k,x),_])])}return new o("*","multiply",[new o("^","pow",[k.clone(),I.clone()]),new o("+","add",[new o("*","multiply",[y(k,x),new o("/","divide",[I.clone(),k.clone()])]),new o("*","multiply",[y(I,x),new f("log",[k.clone()])])])])}throw new Error('Operator "'+b.op+'" is not supported by derivative, or a wrong number of arguments is passed')}});function w(v){if(!((v.name==="log"||v.name==="nthRoot"||v.name==="pow")&&v.args.length===2)){for(var b=0;b<v.args.length;++b)v.args[b]=A(0);throw v.compile().evaluate(),new Error("Expected TypeError, but none found")}}function A(v,b){return new u(l(v,b||i.number))}return h}),kl="rationalize",D8=["config","typed","equal","isZero","add","subtract","multiply","divide","pow","parse","simplifyCore","simplify","?bignumber","?fraction","mathWithTransform","matrix","AccessorNode","ArrayNode","ConstantNode","FunctionNode","IndexNode","ObjectNode","OperatorNode","SymbolNode","ParenthesisNode"],I8=P(kl,D8,e=>{var{config:n,typed:i,equal:t,isZero:r,add:a,subtract:c,multiply:l,divide:u,pow:f,parse:o,simplifyCore:s,simplify:m,fraction:h,bignumber:p,mathWithTransform:g,matrix:y,AccessorNode:w,ArrayNode:A,ConstantNode:v,FunctionNode:b,IndexNode:x,ObjectNode:d,OperatorNode:M,SymbolNode:S,ParenthesisNode:T}=e,N=jm({typed:i,config:n,mathWithTransform:g,matrix:y,fraction:h,bignumber:p,AccessorNode:w,ArrayNode:A,ConstantNode:v,FunctionNode:b,IndexNode:x,ObjectNode:d,OperatorNode:M,SymbolNode:S});return i(kl,{string:function(B){return this(o(B),{},!1)},"string, boolean":function(B,L){return this(o(B),{},L)},"string, Object":function(B,L){return this(o(B),L,!1)},"string, Object, boolean":function(B,L,V){return this(o(B),L,V)},Node:function(B){return this(B,{},!1)},"Node, boolean":function(B,L){return this(B,{},L)},"Node, Object":function(B,L){return this(B,L,!1)},"Node, Object, boolean":function(B,L,V){var C=k(),U=D(B,L,!0,C.firstRules),X=U.variables.length,j={exactFractions:!1},W={exactFractions:!0};if(B=U.expression,X>=1){B=I(B);var Q,ne,re=!0,ae=!1;B=m(B,C.firstRules,{},j);for(var te;ne=re?C.distrDivRules:C.sucDivRules,B=m(B,ne,{},W),re=!re,te=B.toString(),te!==Q;)ae=!0,Q=te;ae&&(B=m(B,C.firstRulesAgain,{},j)),B=m(B,C.finalRules,{},j)}var ue=[],ee={};return B.type==="OperatorNode"&&B.isBinary()&&B.op==="/"?(X===1&&(B.args[0]=_(B.args[0],ue),B.args[1]=_(B.args[1])),V&&(ee.numerator=B.args[0],ee.denominator=B.args[1])):(X===1&&(B=_(B,ue)),V&&(ee.numerator=B,ee.denominator=null)),V?(ee.coefficients=ue,ee.variables=U.variables,ee.expression=B,ee):B}});function D(O,B,L,V){var C=[],U=m(O,V,B,{exactFractions:!1});L=!!L;var X="+-*"+(L?"/":"");W(U);var j={};return j.expression=U,j.variables=C,j;function W(Q){var ne=Q.type;if(ne==="FunctionNode")throw new Error("There is an unsolved function call");if(ne==="OperatorNode")if(Q.op==="^"){if(Q.args[1].type!=="ConstantNode"||!Se(parseFloat(Q.args[1].value)))throw new Error("There is a non-integer exponent");W(Q.args[0])}else{if(X.indexOf(Q.op)===-1)throw new Error("Operator "+Q.op+" invalid in polynomial expression");for(var re=0;re<Q.args.length;re++)W(Q.args[re])}else if(ne==="SymbolNode"){var ae=Q.name,te=C.indexOf(ae);te===-1&&C.push(ae)}else if(ne==="ParenthesisNode")W(Q.content);else if(ne!=="ConstantNode")throw new Error("type "+ne+" is not allowed in polynomial expression")}}function k(){var O=[s,{l:"n+n",r:"2*n"},{l:"n+-n",r:"0"},N,{l:"n*(n1^-1)",r:"n/n1"},{l:"n*n1^-n2",r:"n/n1^n2"},{l:"n1^-1",r:"1/n1"},{l:"n*(n1/n2)",r:"(n*n1)/n2"},{l:"1*n",r:"n"}],B=[{l:"(-n1)/(-n2)",r:"n1/n2"},{l:"(-n1)*(-n2)",r:"n1*n2"},{l:"n1--n2",r:"n1+n2"},{l:"n1-n2",r:"n1+(-n2)"},{l:"(n1+n2)*n3",r:"(n1*n3 + n2*n3)"},{l:"n1*(n2+n3)",r:"(n1*n2+n1*n3)"},{l:"c1*n + c2*n",r:"(c1+c2)*n"},{l:"c1*n + n",r:"(c1+1)*n"},{l:"c1*n - c2*n",r:"(c1-c2)*n"},{l:"c1*n - n",r:"(c1-1)*n"},{l:"v/c",r:"(1/c)*v"},{l:"v/-c",r:"-(1/c)*v"},{l:"-v*-c",r:"c*v"},{l:"-v*c",r:"-c*v"},{l:"v*-c",r:"-c*v"},{l:"v*c",r:"c*v"},{l:"-(-n1*n2)",r:"(n1*n2)"},{l:"-(n1*n2)",r:"(-n1*n2)"},{l:"-(-n1+n2)",r:"(n1-n2)"},{l:"-(n1+n2)",r:"(-n1-n2)"},{l:"(n1^n2)^n3",r:"(n1^(n2*n3))"},{l:"-(-n1/n2)",r:"(n1/n2)"},{l:"-(n1/n2)",r:"(-n1/n2)"}],L=[{l:"(n1/n2 + n3/n4)",r:"((n1*n4 + n3*n2)/(n2*n4))"},{l:"(n1/n2 + n3)",r:"((n1 + n3*n2)/n2)"},{l:"(n1 + n2/n3)",r:"((n1*n3 + n2)/n3)"}],V=[{l:"(n1/(n2/n3))",r:"((n1*n3)/n2)"},{l:"(n1/n2/n3)",r:"(n1/(n2*n3))"}],C={};return C.firstRules=O.concat(B,V),C.distrDivRules=L,C.sucDivRules=V,C.firstRulesAgain=O.concat(B),C.finalRules=[s,{l:"n*-n",r:"-n^2"},{l:"n*n",r:"n^2"},N,{l:"n*-n^n1",r:"-n^(n1+1)"},{l:"n*n^n1",r:"n^(n1+1)"},{l:"n^n1*-n^n2",r:"-n^(n1+n2)"},{l:"n^n1*n^n2",r:"n^(n1+n2)"},{l:"n^n1*-n",r:"-n^(n1+1)"},{l:"n^n1*n",r:"n^(n1+1)"},{l:"n^n1/-n",r:"-n^(n1-1)"},{l:"n^n1/n",r:"n^(n1-1)"},{l:"n/-n^n1",r:"-n^(1-n1)"},{l:"n/n^n1",r:"n^(1-n1)"},{l:"n^n1/-n^n2",r:"n^(n1-n2)"},{l:"n^n1/n^n2",r:"n^(n1-n2)"},{l:"n1+(-n2*n3)",r:"n1-n2*n3"},{l:"v*(-c)",r:"-c*v"},{l:"n1+-n2",r:"n1-n2"},{l:"v*c",r:"c*v"},{l:"(n1^n2)^n3",r:"(n1^(n2*n3))"}],C}function I(O,B,L){var V=O.type,C=arguments.length>1;if(V==="OperatorNode"&&O.isBinary()){var U=!1,X;if(O.op==="^"&&(O.args[0].type==="ParenthesisNode"||O.args[0].type==="OperatorNode")&&O.args[1].type==="ConstantNode"&&(X=parseFloat(O.args[1].value),U=X>=2&&Se(X)),U){if(X>2){var j=O.args[0],W=new M("^","pow",[O.args[0].cloneDeep(),new v(X-1)]);O=new M("*","multiply",[j,W])}else O=new M("*","multiply",[O.args[0],O.args[0].cloneDeep()]);C&&(L==="content"?B.content=O:B.args[L]=O)}}if(V==="ParenthesisNode")I(O.content,O,"content");else if(V!=="ConstantNode"&&V!=="SymbolNode")for(var Q=0;Q<O.args.length;Q++)I(O.args[Q],O,Q);if(!C)return O}function _(O,B){B===void 0&&(B=[]),B[0]=0;var L={};L.cte=1,L.oper="+",L.fire="";var V=0,C="";ae(O,null,L),V=B.length-1;for(var U=!0,X,j=V;j>=0;j--)if(B[j]!==0){var W=new v(U?B[j]:Math.abs(B[j])),Q=B[j]<0?"-":"+";if(j>0){var ne=new S(C);if(j>1){var re=new v(j);ne=new M("^","pow",[ne,re])}B[j]===-1&&U?W=new M("-","unaryMinus",[ne]):Math.abs(B[j])===1?W=ne:W=new M("*","multiply",[W,ne])}U?X=W:Q==="+"?X=new M("+","add",[X,W]):X=new M("-","subtract",[X,W]),U=!1}if(U)return new v(0);return X;function ae(te,ue,ee){var be=te.type;if(be==="FunctionNode")throw new Error("There is an unsolved function call");if(be==="OperatorNode"){if("+-*^".indexOf(te.op)===-1)throw new Error("Operator "+te.op+" invalid");if(ue!==null){if((te.fn==="unaryMinus"||te.fn==="pow")&&ue.fn!=="add"&&ue.fn!=="subtract"&&ue.fn!=="multiply")throw new Error("Invalid "+te.op+" placing");if((te.fn==="subtract"||te.fn==="add"||te.fn==="multiply")&&ue.fn!=="add"&&ue.fn!=="subtract")throw new Error("Invalid "+te.op+" placing");if((te.fn==="subtract"||te.fn==="add"||te.fn==="unaryMinus")&&ee.noFil!==0)throw new Error("Invalid "+te.op+" placing")}(te.op==="^"||te.op==="*")&&(ee.fire=te.op);for(var we=0;we<te.args.length;we++)te.fn==="unaryMinus"&&(ee.oper="-"),(te.op==="+"||te.fn==="subtract")&&(ee.fire="",ee.cte=1,ee.oper=we===0?"+":te.op),ee.noFil=we,ae(te.args[we],te,ee)}else if(be==="SymbolNode"){if(te.name!==C&&C!=="")throw new Error("There is more than one variable");if(C=te.name,ue===null){B[1]=1;return}if(ue.op==="^"&&ee.noFil!==0)throw new Error("In power the variable should be the first parameter");if(ue.op==="*"&&ee.noFil!==1)throw new Error("In multiply the variable should be the second parameter");(ee.fire===""||ee.fire==="*")&&(V<1&&(B[1]=0),B[1]+=ee.cte*(ee.oper==="+"?1:-1),V=Math.max(1,V))}else if(be==="ConstantNode"){var me=parseFloat(te.value);if(ue===null){B[0]=me;return}if(ue.op==="^"){if(ee.noFil!==1)throw new Error("Constant cannot be powered");if(!Se(me)||me<=0)throw new Error("Non-integer exponent is not allowed");for(var ye=V+1;ye<me;ye++)B[ye]=0;me>V&&(B[me]=0),B[me]+=ee.cte*(ee.oper==="+"?1:-1),V=Math.max(me,V);return}ee.cte=me,ee.fire===""&&(B[0]+=ee.cte*(ee.oper==="+"?1:-1))}else throw new Error("Type "+be+" is not allowed")}}}),O8="reviver",z8=["classes"],P8=P(O8,z8,e=>{var{classes:n}=e;return function(t,r){var a=n[r&&r.mathjs];return a&&typeof a.fromJSON=="function"?a.fromJSON(r):r}}),$8="replacer",_8=[],F8=P($8,_8,()=>function(n,i){return typeof i=="number"&&(!isFinite(i)||isNaN(i))?{mathjs:"number",value:String(i)}:i}),R8="10.5.3",q8=P("true",[],()=>!0),K8=P("false",[],()=>!1),U8=P("null",[],()=>null),V8=Fr("Infinity",["config","?BigNumber"],e=>{var{config:n,BigNumber:i}=e;return n.number==="BigNumber"?new i(1/0):1/0}),W8=Fr("NaN",["config","?BigNumber"],e=>{var{config:n,BigNumber:i}=e;return n.number==="BigNumber"?new i(NaN):NaN}),G8=Fr("pi",["config","?BigNumber"],e=>{var{config:n,BigNumber:i}=e;return n.number==="BigNumber"?Qa(i):W1}),H8=Fr("tau",["config","?BigNumber"],e=>{var{config:n,BigNumber:i}=e;return n.number==="BigNumber"?Zy(i):G1}),Z8=Fr("e",["config","?BigNumber"],e=>{var{config:n,BigNumber:i}=e;return n.number==="BigNumber"?Gy(i):H1}),X8=Fr("phi",["config","?BigNumber"],e=>{var{config:n,BigNumber:i}=e;return n.number==="BigNumber"?Hy(i):Z1}),Y8=Fr("LN2",["config","?BigNumber"],e=>{var{config:n,BigNumber:i}=e;return n.number==="BigNumber"?new i(2).ln():Math.LN2}),J8=Fr("LN10",["config","?BigNumber"],e=>{var{config:n,BigNumber:i}=e;return n.number==="BigNumber"?new i(10).ln():Math.LN10}),Q8=Fr("LOG2E",["config","?BigNumber"],e=>{var{config:n,BigNumber:i}=e;return n.number==="BigNumber"?new i(1).div(new i(2).ln()):Math.LOG2E}),j8=Fr("LOG10E",["config","?BigNumber"],e=>{var{config:n,BigNumber:i}=e;return n.number==="BigNumber"?new i(1).div(new i(10).ln()):Math.LOG10E}),eT=Fr("SQRT1_2",["config","?BigNumber"],e=>{var{config:n,BigNumber:i}=e;return n.number==="BigNumber"?new i("0.5").sqrt():Math.SQRT1_2}),rT=Fr("SQRT2",["config","?BigNumber"],e=>{var{config:n,BigNumber:i}=e;return n.number==="BigNumber"?new i(2).sqrt():Math.SQRT2}),nT=Fr("i",["Complex"],e=>{var{Complex:n}=e;return n.I}),tT=P("version",[],()=>R8);function Fr(e,n,i){return P(e,n,i,{recreateOnConfigChange:!0})}var iT=De("speedOfLight","299792458","m s^-1"),aT=De("gravitationConstant","6.67430e-11","m^3 kg^-1 s^-2"),sT=De("planckConstant","6.62607015e-34","J s"),oT=De("reducedPlanckConstant","1.0545718176461565e-34","J s"),uT=De("magneticConstant","1.25663706212e-6","N A^-2"),cT=De("electricConstant","8.8541878128e-12","F m^-1"),lT=De("vacuumImpedance","376.730313667","ohm"),fT=De("coulomb","8.987551792261171e9","N m^2 C^-2"),mT=De("elementaryCharge","1.602176634e-19","C"),hT=De("bohrMagneton","9.2740100783e-24","J T^-1"),pT=De("conductanceQuantum","7.748091729863649e-5","S"),gT=De("inverseConductanceQuantum","12906.403729652257","ohm"),dT=De("magneticFluxQuantum","2.0678338484619295e-15","Wb"),vT=De("nuclearMagneton","5.0507837461e-27","J T^-1"),bT=De("klitzing","25812.807459304513","ohm"),yT=De("bohrRadius","5.29177210903e-11","m"),xT=De("classicalElectronRadius","2.8179403262e-15","m"),wT=De("electronMass","9.1093837015e-31","kg"),AT=De("fermiCoupling","1.1663787e-5","GeV^-2"),NT=Vi("fineStructure",.0072973525693),ST=De("hartreeEnergy","4.3597447222071e-18","J"),MT=De("protonMass","1.67262192369e-27","kg"),TT=De("deuteronMass","3.3435830926e-27","kg"),kT=De("neutronMass","1.6749271613e-27","kg"),ET=De("quantumOfCirculation","3.6369475516e-4","m^2 s^-1"),CT=De("rydberg","10973731.568160","m^-1"),BT=De("thomsonCrossSection","6.6524587321e-29","m^2"),LT=Vi("weakMixingAngle",.2229),DT=Vi("efimovFactor",22.7),IT=De("atomicMass","1.66053906660e-27","kg"),OT=De("avogadro","6.02214076e23","mol^-1"),zT=De("boltzmann","1.380649e-23","J K^-1"),PT=De("faraday","96485.33212331001","C mol^-1"),$T=De("firstRadiation","3.7417718521927573e-16","W m^2"),_T=De("loschmidt","2.686780111798444e25","m^-3"),FT=De("gasConstant","8.31446261815324","J K^-1 mol^-1"),RT=De("molarPlanckConstant","3.990312712893431e-10","J s mol^-1"),qT=De("molarVolume","0.022413969545014137","m^3 mol^-1"),KT=Vi("sackurTetrode",-1.16487052358),UT=De("secondRadiation","0.014387768775039337","m K"),VT=De("stefanBoltzmann","5.67037441918443e-8","W m^-2 K^-4"),WT=De("wienDisplacement","2.897771955e-3","m K"),GT=De("molarMass","0.99999999965e-3","kg mol^-1"),HT=De("molarMassC12","11.9999999958e-3","kg mol^-1"),ZT=De("gravity","9.80665","m s^-2"),XT=De("planckLength","1.616255e-35","m"),YT=De("planckMass","2.176435e-8","kg"),JT=De("planckTime","5.391245e-44","s"),QT=De("planckCharge","1.87554603778e-18","C"),jT=De("planckTemperature","1.416785e+32","K");function De(e,n,i){var t=["config","Unit","BigNumber"];return P(e,t,r=>{var{config:a,Unit:c,BigNumber:l}=r,u=a.number==="BigNumber"?new l(n):parseFloat(n),f=new c(u,i);return f.fixPrefix=!0,f})}function Vi(e,n){var i=["config","BigNumber"];return P(e,i,t=>{var{config:r,BigNumber:a}=t;return r.number==="BigNumber"?new a(n):n})}var e7="apply",r7=["typed","isInteger"],n7=P(e7,r7,e=>{var{typed:n,isInteger:i}=e,t=wm({typed:n,isInteger:i});return n("apply",{"...any":function(a){var c=a[1];Fe(c)?a[1]=c-1:$e(c)&&(a[1]=c.minus(1));try{return t.apply(null,a)}catch(l){throw Br(l)}}})},{isTransformFunction:!0}),t7="column",i7=["typed","Index","matrix","range"],a7=P(t7,i7,e=>{var{typed:n,Index:i,matrix:t,range:r}=e,a=Mm({typed:n,Index:i,matrix:t,range:r});return n("column",{"...any":function(l){var u=l.length-1,f=l[u];Fe(f)&&(l[u]=f-1);try{return a.apply(null,l)}catch(o){throw Br(o)}}})},{isTransformFunction:!0});function rs(e,n,i){var t=e.filter(function(l){return vr(l)&&!(l.name in n)&&!i.has(l.name)})[0];if(!t)throw new Error('No undefined variable found in inline expression "'+e+'"');var r=t.name,a=zt(i),c=e.compile();return function(u){return a.set(r,u),c.evaluate(a)}}var s7="filter",o7=["typed"],u7=P(s7,o7,e=>{var{typed:n}=e;function i(r,a,c){var l,u;return r[0]&&(l=r[0].compile().evaluate(c)),r[1]&&(vr(r[1])||Vt(r[1])?u=r[1].compile().evaluate(c):u=rs(r[1],a,c)),t(l,u)}i.rawArgs=!0;var t=n("filter",{"Array, function":El,"Matrix, function":function(a,c){return a.create(El(a.toArray(),c))},"Array, RegExp":bi,"Matrix, RegExp":function(a,c){return a.create(bi(a.toArray(),c))}});return i},{isTransformFunction:!0});function El(e,n){var i=St(n);return uf(e,function(t,r,a){return i===1?n(t):i===2?n(t,[r+1]):n(t,[r+1],a)})}var c7="forEach",l7=["typed"],f7=P(c7,l7,e=>{var{typed:n}=e;function i(r,a,c){var l,u;return r[0]&&(l=r[0].compile().evaluate(c)),r[1]&&(vr(r[1])||Vt(r[1])?u=r[1].compile().evaluate(c):u=rs(r[1],a,c)),t(l,u)}i.rawArgs=!0;var t=n("forEach",{"Array | Matrix, function":function(a,c){var l=St(c),u=function f(o,s){Array.isArray(o)?Oi(o,function(m,h){f(m,s.concat(h+1))}):l===1?c(o):l===2?c(o,s):c(o,s,a)};u(a.valueOf(),[])}});return i},{isTransformFunction:!0}),m7="index",h7=["Index"],p7=P(m7,h7,e=>{var{Index:n}=e;return function(){for(var t=[],r=0,a=arguments.length;r<a;r++){var c=arguments[r];if(Bi(c))c.start--,c.end-=c.step>0?0:2;else if(c&&c.isSet===!0)c=c.map(function(u){return u-1});else if(Ze(c)||Ce(c))c=c.map(function(u){return u-1});else if(Fe(c))c--;else if($e(c))c=c.toNumber()-1;else if(typeof c!="string")throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");t[r]=c}var l=new n;return n.apply(l,t),l}},{isTransformFunction:!0}),g7="map",d7=["typed"],v7=P(g7,d7,e=>{var{typed:n}=e;function i(r,a,c){var l,u;return r[0]&&(l=r[0].compile().evaluate(c)),r[1]&&(vr(r[1])||Vt(r[1])?u=r[1].compile().evaluate(c):u=rs(r[1],a,c)),t(l,u)}i.rawArgs=!0;var t=n("map",{"Array, function":function(a,c){return Cl(a,c,a)},"Matrix, function":function(a,c){return a.create(Cl(a.valueOf(),c,a))}});return i},{isTransformFunction:!0});function Cl(e,n,i){var t=St(n);function r(a,c){return Array.isArray(a)?Tn(a,function(l,u){return r(l,c.concat(u+1))}):t===1?n(a):t===2?n(a,c):n(a,c,i)}return r(e,[])}function Jn(e){if(e.length===2&&xt(e[0])){e=e.slice();var n=e[1];Fe(n)?e[1]=n-1:$e(n)&&(e[1]=n.minus(1))}return e}var b7="max",y7=["typed","config","numeric","larger"],x7=P(b7,y7,e=>{var{typed:n,config:i,numeric:t,larger:r}=e,a=Dm({typed:n,config:i,numeric:t,larger:r});return n("max",{"...any":function(l){l=Jn(l);try{return a.apply(null,l)}catch(u){throw Br(u)}}})},{isTransformFunction:!0}),w7="mean",A7=["typed","add","divide"],N7=P(w7,A7,e=>{var{typed:n,add:i,divide:t}=e,r=Km({typed:n,add:i,divide:t});return n("mean",{"...any":function(c){c=Jn(c);try{return r.apply(null,c)}catch(l){throw Br(l)}}})},{isTransformFunction:!0}),S7="min",M7=["typed","config","numeric","smaller"],T7=P(S7,M7,e=>{var{typed:n,config:i,numeric:t,smaller:r}=e,a=Im({typed:n,config:i,numeric:t,smaller:r});return n("min",{"...any":function(l){l=Jn(l);try{return a.apply(null,l)}catch(u){throw Br(u)}}})},{isTransformFunction:!0}),k7="range",E7=["typed","config","?matrix","?bignumber","smaller","smallerEq","larger","largerEq"],C7=P(k7,E7,e=>{var{typed:n,config:i,matrix:t,bignumber:r,smaller:a,smallerEq:c,larger:l,largerEq:u}=e,f=Cm({typed:n,config:i,matrix:t,bignumber:r,smaller:a,smallerEq:c,larger:l,largerEq:u});return n("range",{"...any":function(s){var m=s.length-1,h=s[m];return typeof h!="boolean"&&s.push(!0),f.apply(null,s)}})},{isTransformFunction:!0}),B7="row",L7=["typed","Index","matrix","range"],D7=P(B7,L7,e=>{var{typed:n,Index:i,matrix:t,range:r}=e,a=Bm({typed:n,Index:i,matrix:t,range:r});return n("row",{"...any":function(l){var u=l.length-1,f=l[u];Fe(f)&&(l[u]=f-1);try{return a.apply(null,l)}catch(o){throw Br(o)}}})},{isTransformFunction:!0}),I7="subset",O7=["typed","matrix"],z7=P(I7,O7,e=>{var{typed:n,matrix:i}=e,t=Lm({typed:n,matrix:i});return n("subset",{"...any":function(a){try{return t.apply(null,a)}catch(c){throw Br(c)}}})},{isTransformFunction:!0}),P7="concat",$7=["typed","matrix","isInteger"],_7=P(P7,$7,e=>{var{typed:n,matrix:i,isInteger:t}=e,r=Nm({typed:n,matrix:i,isInteger:t});return n("concat",{"...any":function(c){var l=c.length-1,u=c[l];Fe(u)?c[l]=u-1:$e(u)&&(c[l]=u.minus(1));try{return r.apply(null,c)}catch(f){throw Br(f)}}})},{isTransformFunction:!0}),Bl="diff",F7=["typed","matrix","subtract","number","bignumber"],R7=P(Bl,F7,e=>{var{typed:n,matrix:i,subtract:t,number:r,bignumber:a}=e,c=Tm({typed:n,matrix:i,subtract:t,number:r,bignumber:a});return n(Bl,{"...any":function(u){u=Jn(u);try{return c.apply(null,u)}catch(f){throw Br(f)}}})},{isTransformFunction:!0}),q7="std",K7=["typed","sqrt","variance"],U7=P(q7,K7,e=>{var{typed:n,sqrt:i,variance:t}=e,r=Vm({typed:n,sqrt:i,variance:t});return n("std",{"...any":function(c){c=Jn(c);try{return r.apply(null,c)}catch(l){throw Br(l)}}})},{isTransformFunction:!0}),Ll="sum",V7=["typed","config","add","numeric"],W7=P(Ll,V7,e=>{var{typed:n,config:i,add:t,numeric:r}=e,a=Rm({typed:n,config:i,add:t,numeric:r});return n(Ll,{"...any":function(l){l=Jn(l);try{return a.apply(null,l)}catch(u){throw Br(u)}}})},{isTransformFunction:!0}),Dl="cumsum",G7=["typed","add","unaryPlus"],H7=P(Dl,G7,e=>{var{typed:n,add:i,unaryPlus:t}=e,r=qm({typed:n,add:i,unaryPlus:t});return n(Dl,{"...any":function(c){if(c.length===2&&xt(c[0])){var l=c[1];Fe(l)?c[1]=l-1:$e(l)&&(c[1]=l.minus(1))}try{return r.apply(null,c)}catch(u){throw Br(u)}}})},{isTransformFunction:!0}),Il="variance",Z7=["typed","add","subtract","multiply","divide","apply","isNaN"],X7=P(Il,Z7,e=>{var{typed:n,add:i,subtract:t,multiply:r,divide:a,apply:c,isNaN:l}=e,u=Um({typed:n,add:i,subtract:t,multiply:r,divide:a,apply:c,isNaN:l});return n(Il,{"...any":function(o){o=Jn(o);try{return u.apply(null,o)}catch(s){throw Br(s)}}})},{isTransformFunction:!0}),fe=N1({config:se}),tr=T1({}),Ol=Z8({BigNumber:fe,config:se}),Y7=K8({}),J7=NT({BigNumber:fe,config:se}),Qn=C1({}),Q7=nT({Complex:tr}),j7=V8({BigNumber:fe,config:se}),ek=J8({BigNumber:fe,config:se}),rk=j8({BigNumber:fe,config:se}),Wi=z1({}),nk=W8({BigNumber:fe,config:se}),tk=U8({}),ik=X8({BigNumber:fe,config:se}),ak=D1({}),eh=kg({}),sk=eT({BigNumber:fe,config:se}),ok=KT({BigNumber:fe,config:se}),uk=H8({BigNumber:fe,config:se}),ck=q8({}),lk=tT({}),Pe=_1({Matrix:Wi}),fk=DT({BigNumber:fe,config:se}),mk=Y8({BigNumber:fe,config:se}),zl=G8({BigNumber:fe,config:se}),hk=F8({}),pk=rT({BigNumber:fe,config:se}),G=Ng({BigNumber:fe,Complex:tr,DenseMatrix:Pe,Fraction:Qn}),ns=Xd({BigNumber:fe,config:se,typed:G}),gk=LT({BigNumber:fe,config:se}),Rr=Jd({typed:G}),dk=ax({Complex:tr,config:se,typed:G}),vk=cx({BigNumber:fe,typed:G}),bk=hx({BigNumber:fe,Complex:tr,config:se,typed:G}),pr=rv({typed:G}),yk=$0({typed:G}),xk=yx({BigNumber:fe,Complex:tr,config:se,typed:G}),wk=Sx({typed:G}),rh=kx({typed:G}),Ak=Lx({Complex:tr,config:se,typed:G}),En=Cd({BigNumber:fe,typed:G}),Nk=C0({typed:G}),Sk=Td({typed:G}),Mk=R1({typed:G}),Gi=B6({typed:G}),Hi=Dd({Complex:tr,typed:G}),Zt=F0({typed:G}),Tk=zx({typed:G}),kk=Fx({BigNumber:fe,typed:G}),Ek=qx({BigNumber:fe,typed:G}),Ck=pv({typed:G}),Ke=pd({config:se,typed:G}),Bk=e2({typed:G}),Lk=dv({typed:G}),Dk=bv({Complex:tr,typed:G}),Ik=ob({typed:G}),Ok=fb({typed:G}),Xt=c2({typed:G}),zk=pb({typed:G}),Pk=g2({format:Xt,typed:G}),nh=q0({typed:G}),Wr=K1({typed:G}),Tt=j1({typed:G}),Zi=ad({typed:G}),hn=od({typed:G}),$k=Q8({BigNumber:fe,config:se}),_k=P6({Complex:tr,typed:G}),Fk=Kv({Complex:tr,config:se,typed:G}),Rk=Vv({Complex:tr,config:se,typed:G}),th=xb({typed:G}),lr=jv({typed:G}),ih=W0({typed:G}),Kn=Ad({typed:G}),qk=h2({format:Xt,typed:G}),Kk=j6({config:se,typed:G}),Uk=v2({typed:G}),Vk=r8({config:se,typed:G}),ah=U0({typed:G}),Wk=Wx({BigNumber:fe,typed:G}),sh=a0({BigNumber:fe,Fraction:Qn,complex:Hi,typed:G}),ts=Xx({typed:G}),Cn=vd({Matrix:Wi,equalScalar:Ke,typed:G}),Gk=Wd({typed:G}),Hk=l0({typed:G}),Zk=Sd({typed:G}),Xk=jx({typed:G}),Yk=fd({typed:G}),Jk=ox({Complex:tr,config:se,typed:G}),Qk=gx({BigNumber:fe,typed:G}),is=wm({isInteger:Wr,typed:G}),jk=vx({BigNumber:fe,Complex:tr,config:se,typed:G}),eE=f2({format:Xt,typed:G}),rE=D6({typed:G}),as=Ix({typed:G}),nE=Ux({BigNumber:fe,typed:G}),Yt=cd({typed:G}),tE=w2({typed:G}),iE=t8({config:se,typed:G}),aE=Hx({BigNumber:fe,typed:G}),sE=Jx({typed:G}),oE=rx({SparseMatrix:Cn,typed:G}),Bn=u0({Complex:tr,config:se,typed:G}),uE=nw({typed:G}),Ln=Hd({typed:G}),cE=fx({BigNumber:fe,Complex:tr,config:se,typed:G}),lE=$x({BigNumber:fe,typed:G}),Jt=zd({Fraction:Qn,typed:G}),jn=rd({typed:G}),de=$d({DenseMatrix:Pe,Matrix:Wi,SparseMatrix:Cn,typed:G}),fE=Fd({isZero:hn,matrix:de,typed:G}),oh=Yv({DenseMatrix:Pe,equalScalar:Ke,matrix:de,typed:G}),mE=t0({BigNumber:fe,equalScalar:Ke,matrix:de,typed:G}),jr=S2({bignumber:En,fraction:Jt,number:Kn}),hE=H0({DenseMatrix:Pe,equalScalar:Ke,matrix:de,typed:G}),uh=o2({config:se,multiplyScalar:lr,numeric:jr,typed:G}),pE=Eb({isInteger:Wr,matrix:de,typed:G}),Mr=_b({matrix:de,config:se,typed:G}),Gr=vy({DenseMatrix:Pe,config:se,matrix:de,typed:G}),gE=Rb({matrix:de,typed:G}),Zr=Lm({matrix:de,typed:G}),sr=m0({DenseMatrix:Pe,addScalar:pr,equalScalar:Ke,matrix:de,typed:G,unaryMinus:Ln}),dE=y2({matrix:de,typed:G}),ss=Hb({matrix:de,typed:G}),ch=p0({BigNumber:fe,config:se,matrix:de,typed:G}),pn=Jb({BigNumber:fe,config:se,matrix:de,typed:G}),vE=iy({equalScalar:Ke,matrix:de,not:ih,typed:G,zeros:pn}),bE=k0({equalScalar:Ke,matrix:de,typed:G}),yE=z0({DenseMatrix:Pe,matrix:de,typed:G}),xE=tv({BigNumber:fe,Complex:tr,Fraction:Qn,config:se,isNegative:Tt,matrix:de,typed:G,unaryMinus:Ln}),kt=sy({BigNumber:fe,DenseMatrix:Pe,Fraction:Qn,config:se,equalScalar:Ke,matrix:de,typed:G}),lh=fy({matrix:de,typed:G}),os=Nm({isInteger:Wr,matrix:de,typed:G}),wE=j0({prod:uh,size:Mr,typed:G}),us=Xb({conj:Zt,transpose:ss,typed:G}),fh=tb({DenseMatrix:Pe,SparseMatrix:Cn,matrix:de,typed:G}),ur=T2({numeric:jr,typed:G}),cs=R2({DenseMatrix:Pe,divideScalar:ur,equalScalar:Ke,matrix:de,typed:G}),an=hy({DenseMatrix:Pe,equalScalar:Ke,matrix:de,typed:G}),Qt=cb({matrix:de,typed:G}),AE=Ov({BigNumber:fe,DenseMatrix:Pe,equalScalar:Ke,matrix:de,typed:G}),NE=td({isNumeric:jn,typed:G}),SE=Tw({abs:Rr,addScalar:pr,divideScalar:ur,isPositive:Zi,multiplyScalar:lr,smaller:Gr,sqrt:Bn,typed:G}),mh=Py({DenseMatrix:Pe,smaller:Gr}),Ar=Fy({ImmutableDenseMatrix:mh}),ME=bb({matrix:de,multiplyScalar:lr,typed:G}),Xi=Ny({DenseMatrix:Pe,config:se,matrix:de,typed:G}),TE=Q2({DenseMatrix:Pe,equalScalar:Ke,matrix:de,typed:G,zeros:pn}),hh=K2({DenseMatrix:Pe,divideScalar:ur,equalScalar:Ke,matrix:de,multiplyScalar:lr,subtract:sr,typed:G}),ph=Ud({flatten:Qt,matrix:de,size:Mr,typed:G}),kE=Im({config:se,numeric:jr,smaller:Gr,typed:G}),EE=a2({isNaN:Yt,isNumeric:jn,typed:G}),CE=P2({Complex:tr,config:se,divideScalar:ur,typed:G}),BE=Mb({BigNumber:fe,config:se,matrix:de,typed:G}),ls=Cy({compare:kt,isNaN:Yt,isNumeric:jn,typed:G}),LE=Lb({config:se,matrix:de}),DE=ey({DenseMatrix:Pe,equalScalar:Ke,matrix:de,typed:G,zeros:pn}),Yi=B2({BigNumber:fe,DenseMatrix:Pe,equalScalar:Ke,matrix:de,typed:G,zeros:pn}),fs=yy({DenseMatrix:Pe,config:se,matrix:de,typed:G}),IE=ky({DenseMatrix:Pe,config:se,equalScalar:Ke,matrix:de,typed:G}),ms=V2({DenseMatrix:Pe,divideScalar:ur,equalScalar:Ke,matrix:de,multiplyScalar:lr,subtract:sr,typed:G}),OE=X0({DenseMatrix:Pe,matrix:de,typed:G}),ar=Sw({DenseMatrix:Pe,SparseMatrix:Cn,addScalar:pr,equalScalar:Ke,matrix:de,typed:G}),zE=Cx({BigNumber:fe,DenseMatrix:Pe,equalScalar:Ke,matrix:de,typed:G}),PE=L0({DenseMatrix:Pe,equalScalar:Ke,matrix:de,typed:G}),$E=c8({addScalar:pr,combinations:Gi,divideScalar:ur,isInteger:Wr,isNegative:Tt,multiplyScalar:lr,typed:G}),gn=uy({compare:kt,typed:G}),_E=qm({add:ar,typed:G,unaryPlus:ns}),gh=My({equal:an,typed:G}),FE=Tm({matrix:de,number:Kn,subtract:sr,typed:G}),Ji=Bw({addScalar:pr,conj:Zt,multiplyScalar:lr,size:Mr,typed:G}),RE=gy({compareText:lh,isZero:hn,typed:G}),dh=Sv({DenseMatrix:Pe,config:se,equalScalar:Ke,matrix:de,round:Yi,typed:G,zeros:pn}),Et=db({BigNumber:fe,DenseMatrix:Pe,SparseMatrix:Cn,config:se,matrix:de,typed:G}),qE=d0({BigNumber:fe,add:ar,config:se,equal:an,isInteger:Wr,mod:oh,smaller:Gr,typed:G,xgcd:ch}),Hr=wy({DenseMatrix:Pe,config:se,matrix:de,typed:G}),hs=D2({Complex:tr,config:se,divideScalar:ur,typed:G}),KE=G2({DenseMatrix:Pe,divideScalar:ur,equalScalar:Ke,matrix:de,multiplyScalar:lr,subtract:sr,typed:G}),UE=qd({flatten:Qt,matrix:de,size:Mr,typed:G}),cr=r0({addScalar:pr,dot:Ji,equalScalar:Ke,matrix:de,multiplyScalar:lr,typed:G}),vh=JA({addScalar:pr,complex:Hi,conj:Zt,divideScalar:ur,equal:an,identity:Et,isZero:hn,matrix:de,multiplyScalar:lr,sign:sh,sqrt:Bn,subtract:sr,typed:G,unaryMinus:Ln,zeros:pn}),qt=Cm({bignumber:En,matrix:de,config:se,larger:Hr,largerEq:Xi,smaller:Gr,smallerEq:fs,typed:G}),VE=ny({DenseMatrix:Pe,equalScalar:Ke,matrix:de,typed:G,zeros:pn}),WE=Bm({Index:Ar,matrix:de,range:qt,typed:G}),GE=iw({DenseMatrix:Pe,Index:Ar,compareNatural:gn,size:Mr,subset:Zr,typed:G}),HE=uw({DenseMatrix:Pe,Index:Ar,compareNatural:gn,size:Mr,subset:Zr,typed:G}),ZE=mw({Index:Ar,compareNatural:gn,size:Mr,subset:Zr,typed:G}),XE=dw({Index:Ar,compareNatural:gn,size:Mr,subset:Zr,typed:G}),bh=wN({SparseMatrix:Cn,abs:Rr,add:ar,divideScalar:ur,larger:Hr,largerEq:Xi,multiply:cr,subtract:sr,transpose:ss,typed:G}),yh=Rm({add:ar,config:se,numeric:jr,typed:G}),YE=Iw({add:ar,matrix:de,typed:G}),xh=Z2({DenseMatrix:Pe,divideScalar:ur,equalScalar:Ke,matrix:de,multiplyScalar:lr,subtract:sr,typed:G}),JE=wx({Complex:tr,config:se,typed:G}),wh=mv({DenseMatrix:Pe,config:se,equalScalar:Ke,matrix:de,round:Yi,typed:G,zeros:pn}),Ah=Mm({Index:Ar,matrix:de,range:qt,typed:G}),QE=f8({addScalar:pr,combinations:Gi,isInteger:Wr,isNegative:Tt,isPositive:Zi,larger:Hr,typed:G}),jE=rb({matrix:de,multiply:cr,subtract:sr,typed:G}),Nh=X3({divideScalar:ur,isZero:hn,matrix:de,multiply:cr,subtract:sr,typed:G,unaryMinus:Ln}),eC=h6({abs:Rr,addScalar:pr,divideScalar:ur,multiplyScalar:lr,sqrt:Bn,subtract:sr,typed:G,unaryMinus:Ln}),rC=x0({equalScalar:Ke,matrix:de,multiplyScalar:lr,typed:G}),Sh=Ky({larger:Hr,smaller:Gr}),Mh=wv({Complex:tr,DenseMatrix:Pe,ceil:wh,equalScalar:Ke,floor:dh,matrix:de,typed:G,zeros:pn}),nC=zw({Index:Ar,typed:G}),et=J3({abs:Rr,addScalar:pr,det:Nh,divideScalar:ur,identity:Et,matrix:de,multiply:cr,typed:G,unaryMinus:Ln}),tC=Rv({equalScalar:Ke,matrix:de,typed:G}),iC=O2({Complex:tr,config:se,divideScalar:ur,log:hs,typed:G}),Th=Dm({config:se,larger:Hr,numeric:jr,typed:G}),aC=j3({Complex:tr,add:ar,ctranspose:us,deepEqual:gh,divideScalar:ur,dot:Ji,dotDivide:cs,equal:an,inv:et,matrix:de,multiply:cr,typed:G}),Dn=E2({Complex:tr,config:se,fraction:Jt,identity:Et,inv:et,matrix:de,multiply:cr,number:Kn,typed:G}),sC=k6({add:ar,compare:kt,multiply:cr,partitionSelect:ls,typed:G}),kh=sw({DenseMatrix:Pe,Index:Ar,compareNatural:gn,size:Mr,subset:Zr,typed:G}),oC=pw({Index:Ar,compareNatural:gn,size:Mr,subset:Zr,typed:G}),Eh=xw({Index:Ar,concat:os,setDifference:kh,size:Mr,subset:Zr,typed:G}),uC=Ly({compare:kt,compareNatural:gn,matrix:de,typed:G}),cC=u6({abs:Rr,add:ar,identity:Et,inv:et,max:Th,multiply:cr,size:Mr,sqrt:Bn,subtract:sr,typed:G}),Be=Jy({BigNumber:fe,Complex:tr,Fraction:Qn,abs:Rr,addScalar:pr,config:se,divideScalar:ur,equal:an,fix:Mh,format:Xt,isNumeric:jn,multiplyScalar:lr,number:Kn,pow:Dn,round:Yi,subtract:sr}),lC=lT({BigNumber:fe,Unit:Be,config:se}),fC=WT({BigNumber:fe,Unit:Be,config:se}),mC=IT({BigNumber:fe,Unit:Be,config:se}),hC=hT({BigNumber:fe,Unit:Be,config:se}),pC=zT({BigNumber:fe,Unit:Be,config:se}),gC=pT({BigNumber:fe,Unit:Be,config:se}),dC=tx({Unit:Be,typed:G}),vC=TT({BigNumber:fe,Unit:Be,config:se}),bC=_2({DenseMatrix:Pe,equalScalar:Ke,matrix:de,pow:Dn,typed:G}),yC=cT({BigNumber:fe,Unit:Be,config:se}),xC=mT({BigNumber:fe,Unit:Be,config:se}),wC=s6({abs:Rr,add:ar,identity:Et,inv:et,multiply:cr,typed:G}),AC=PT({BigNumber:fe,Unit:Be,config:se}),NC=$T({BigNumber:fe,Unit:Be,config:se}),Ch=O6({BigNumber:fe,Complex:tr,config:se,multiplyScalar:lr,pow:Dn,typed:G}),SC=aT({BigNumber:fe,Unit:Be,config:se}),MC=ST({BigNumber:fe,Unit:Be,config:se}),TC=d6({abs:Rr,add:ar,addScalar:pr,config:se,divideScalar:ur,equalScalar:Ke,flatten:Qt,isNumeric:jn,isZero:hn,matrix:de,multiply:cr,multiplyScalar:lr,smaller:Gr,subtract:sr,typed:G}),kC=bT({BigNumber:fe,Unit:Be,config:se}),EC=_T({BigNumber:fe,Unit:Be,config:se}),CC=uT({BigNumber:fe,Unit:Be,config:se}),BC=GT({BigNumber:fe,Unit:Be,config:se}),LC=RT({BigNumber:fe,Unit:Be,config:se}),DC=kT({BigNumber:fe,Unit:Be,config:se}),IC=vT({BigNumber:fe,Unit:Be,config:se}),OC=QT({BigNumber:fe,Unit:Be,config:se}),zC=XT({BigNumber:fe,Unit:Be,config:se}),PC=jT({BigNumber:fe,Unit:Be,config:se}),$C=MT({BigNumber:fe,Unit:Be,config:se}),_C=oT({BigNumber:fe,Unit:Be,config:se}),FC=CT({BigNumber:fe,Unit:Be,config:se}),Bh=lw({DenseMatrix:Pe,Index:Ar,compareNatural:gn,size:Mr,subset:Zr,typed:G}),RC=Aw({Index:Ar,concat:os,setIntersect:Bh,setSymDifference:Eh,size:Mr,subset:Zr,typed:G}),Lh=Wy({FibonacciHeap:Sh,addScalar:pr,equalScalar:Ke}),qC=VT({BigNumber:fe,Unit:Be,config:se}),KC=BT({BigNumber:fe,Unit:Be,config:se}),UC=OT({BigNumber:fe,Unit:Be,config:se}),VC=yT({BigNumber:fe,Unit:Be,config:se}),WC=fT({BigNumber:fe,Unit:Be,config:se}),en=f6({divideScalar:ur,equalScalar:Ke,inv:et,matrix:de,multiply:cr,typed:G}),GC=wT({BigNumber:fe,Unit:Be,config:se}),Qi=_6({gamma:Ch,typed:G}),HC=ZT({BigNumber:fe,Unit:Be,config:se}),ZC=gT({BigNumber:fe,Unit:Be,config:se}),Dh=XA({DenseMatrix:Pe,Spa:Lh,SparseMatrix:Cn,abs:Rr,addScalar:pr,divideScalar:ur,equalScalar:Ke,larger:Hr,matrix:de,multiplyScalar:lr,subtract:sr,typed:G,unaryMinus:Ln}),XC=dT({BigNumber:fe,Unit:Be,config:se}),YC=HT({BigNumber:fe,Unit:Be,config:se}),JC=K6({add:ar,divide:en,factorial:Qi,isInteger:Wr,isPositive:Zi,multiply:cr,typed:G}),QC=V6({factorial:Qi,typed:G}),jC=YT({BigNumber:fe,Unit:Be,config:se}),eB=ET({BigNumber:fe,Unit:Be,config:se}),rB=UT({BigNumber:fe,Unit:Be,config:se}),Ih=a8({bignumber:En,addScalar:pr,combinations:Gi,divideScalar:ur,factorial:Qi,isInteger:Wr,isNegative:Tt,larger:Hr,multiplyScalar:lr,number:Kn,pow:Dn,subtract:sr,typed:G}),nB=jy({Unit:Be,typed:G}),tB=o8({addScalar:pr,isInteger:Wr,isNegative:Tt,stirlingS2:Ih,typed:G}),Oh=i6({abs:Rr,add:ar,addScalar:pr,atan:rh,bignumber:En,column:Ah,complex:Hi,config:se,cos:as,diag:fh,divideScalar:ur,dot:Ji,equal:an,flatten:Qt,im:nh,inv:et,larger:Hr,matrix:de,matrixFromColumns:ph,multiply:cr,multiplyScalar:lr,number:Kn,qr:vh,re:ah,sin:ts,smaller:Gr,sqrt:Bn,subtract:sr,typed:G,usolve:ms,usolveAll:xh}),iB=AT({BigNumber:fe,Unit:Be,config:se}),aB=Km({add:ar,divide:en,typed:G}),sB=qT({BigNumber:fe,Unit:Be,config:se}),oB=sT({BigNumber:fe,Unit:Be,config:se}),uB=bw({compareNatural:gn,typed:G}),cB=iT({BigNumber:fe,Unit:Be,config:se}),ps=Um({add:ar,apply:is,divide:en,isNaN:Yt,multiply:cr,subtract:sr,typed:G}),lB=xT({BigNumber:fe,Unit:Be,config:se}),fB=NN({DenseMatrix:Pe,lsolve:hh,lup:Dh,matrix:de,slu:bh,typed:G,usolve:ms}),zh=w6({add:ar,compare:kt,divide:en,partitionSelect:ls,typed:G}),mB=FT({BigNumber:fe,Unit:Be,config:se}),hB=N6({abs:Rr,map:th,median:zh,subtract:sr,typed:G}),pB=Vm({sqrt:Bn,typed:G,variance:ps}),Ph=Ew({abs:Rr,add:ar,conj:Zt,ctranspose:us,eigs:Oh,equalScalar:Ke,larger:Hr,matrix:de,multiply:cr,pow:Dn,smaller:Gr,sqrt:Bn,typed:G}),$h=zb({BigNumber:fe,DenseMatrix:Pe,SparseMatrix:Cn,addScalar:pr,config:se,cos:as,matrix:de,multiplyScalar:lr,norm:Ph,sin:ts,typed:G,unaryMinus:Ln}),gB=R6({divide:en,dotDivide:cs,isNumeric:jn,log:hs,matrix:de,multiply:cr,sum:yh,typed:G}),dB=Ib({multiply:cr,rotationMatrix:$h,typed:G}),vB=JT({BigNumber:fe,Unit:Be,config:se}),Ct={},jt={},_h={},gs=CN({math:Ct}),Tr=_w({mathWithTransform:jt}),ei=bA({Node:Tr}),Un=wA({Node:Tr}),rt=SA({Node:Tr}),Fh=BA({Node:Tr}),ri=Vw({Node:Tr}),Rh=Jw({Node:Tr,ResultSet:eh}),qh=eA({Node:Tr}),nt=cA({Node:Tr}),Kh=kA({Node:Tr}),bB=P8({classes:_h}),yB=H3({Chain:gs,typed:G}),Uh=mA({Node:Tr,typed:G}),ni=qw({Node:Tr,subset:Zr}),Vh=Zw({matrix:de,Node:Tr,subset:Zr}),ti=gA({Node:Tr,size:Mr}),tt=IA({Unit:Be,Node:Tr,math:Ct}),it=PA({Node:Tr,SymbolNode:tt,math:Ct}),dn=_A({AccessorNode:ni,ArrayNode:ri,AssignmentNode:Vh,BlockNode:Rh,ConditionalNode:qh,ConstantNode:nt,FunctionAssignmentNode:Uh,FunctionNode:it,IndexNode:ti,ObjectNode:ei,OperatorNode:Un,ParenthesisNode:rt,RangeNode:Kh,RelationalNode:Fh,SymbolNode:tt,config:se,numeric:jr,typed:G}),Wh=T8({ConstantNode:nt,FunctionNode:it,OperatorNode:Un,ParenthesisNode:rt,parse:dn}),ds=N8({AccessorNode:ni,ArrayNode:ri,ConstantNode:nt,FunctionNode:it,IndexNode:ti,ObjectNode:ei,OperatorNode:Un,ParenthesisNode:rt,SymbolNode:tt,add:ar,divide:en,equal:an,isZero:hn,multiply:cr,pow:Dn,subtract:sr}),Gh=RA({parse:dn,typed:G}),Hh=TN({parse:dn}),xB=h8({parse:dn,typed:G}),Zh=KA({parse:dn,typed:G}),wB=W3({Help:Hh,mathWithTransform:jt,typed:G}),Xh=WA({evaluate:Zh}),ji=x8({bignumber:En,fraction:Jt,AccessorNode:ni,ArrayNode:ri,ConstantNode:nt,FunctionNode:it,IndexNode:ti,ObjectNode:ei,OperatorNode:Un,ParenthesisNode:rt,SymbolNode:tt,add:ar,config:se,divide:en,equal:an,isZero:hn,mathWithTransform:jt,matrix:de,multiply:cr,parse:dn,pow:Dn,resolve:Wh,simplifyCore:ds,subtract:sr,typed:G}),AB=HA({Parser:Xh,typed:G}),NB=I8({bignumber:En,fraction:Jt,AccessorNode:ni,ArrayNode:ri,ConstantNode:nt,FunctionNode:it,IndexNode:ti,ObjectNode:ei,OperatorNode:Un,ParenthesisNode:rt,SymbolNode:tt,add:ar,config:se,divide:en,equal:an,isZero:hn,mathWithTransform:jt,matrix:de,multiply:cr,parse:dn,pow:Dn,simplify:ji,simplifyCore:ds,subtract:sr,typed:G}),SB=L8({ConstantNode:nt,FunctionNode:it,OperatorNode:Un,ParenthesisNode:rt,SymbolNode:tt,config:se,equal:an,isZero:hn,numeric:jr,parse:dn,simplify:ji,typed:G}),MB=E8({OperatorNode:Un,parse:dn,simplify:ji,typed:G});wr(Ct,{e:Ol,false:Y7,fineStructure:J7,i:Q7,Infinity:j7,LN10:ek,LOG10E:rk,NaN:nk,null:tk,phi:ik,SQRT1_2:sk,sackurTetrode:ok,tau:uk,true:ck,E:Ol,version:lk,efimovFactor:fk,LN2:mk,pi:zl,replacer:hk,reviver:bB,SQRT2:pk,typed:G,unaryPlus:ns,PI:zl,weakMixingAngle:gk,abs:Rr,acos:dk,acot:vk,acsc:bk,addScalar:pr,arg:yk,asech:xk,asinh:wk,atan:rh,atanh:Ak,bignumber:En,bitNot:Nk,boolean:Sk,chain:yB,clone:Mk,combinations:Gi,complex:Hi,conj:Zt,cosh:Tk,coth:kk,csc:Ek,cube:Ck,equalScalar:Ke,erf:Bk,exp:Lk,expm1:Dk,filter:Ik,forEach:Ok,format:Xt,getMatrixDataType:zk,hex:Pk,im:nh,isInteger:Wr,isNegative:Tt,isPositive:Zi,isZero:hn,LOG2E:$k,lgamma:_k,log10:Fk,log2:Rk,map:th,multiplyScalar:lr,not:ih,number:Kn,oct:qk,pickRandom:Kk,print:Uk,random:Vk,re:ah,sec:Wk,sign:sh,sin:ts,splitUnit:Gk,square:Hk,string:Zk,tan:Xk,typeOf:Yk,acosh:Jk,acsch:Qk,apply:is,asec:jk,bin:eE,combinationsWithRep:rE,cos:as,csch:nE,isNaN:Yt,isPrime:tE,randomInt:iE,sech:aE,sinh:sE,sparse:oE,sqrt:Bn,tanh:uE,unaryMinus:Ln,acoth:cE,cot:lE,fraction:Jt,isNumeric:jn,matrix:de,matrixFromFunction:fE,mod:oh,nthRoot:mE,numeric:jr,or:hE,prod:uh,reshape:pE,size:Mr,smaller:Gr,squeeze:gE,subset:Zr,subtract:sr,to:dE,transpose:ss,xgcd:ch,zeros:pn,and:vE,bitAnd:bE,bitXor:yE,cbrt:xE,compare:kt,compareText:lh,concat:os,count:wE,ctranspose:us,diag:fh,divideScalar:ur,dotDivide:cs,equal:an,flatten:Qt,gcd:AE,hasNumericValue:NE,hypot:SE,kron:ME,largerEq:Xi,leftShift:TE,lsolve:hh,matrixFromColumns:ph,min:kE,mode:EE,nthRoots:CE,ones:BE,partitionSelect:ls,resize:LE,rightArithShift:DE,round:Yi,smallerEq:fs,unequal:IE,usolve:ms,xor:OE,add:ar,atan2:zE,bitOr:PE,catalan:$E,compareNatural:gn,cumsum:_E,deepEqual:gh,diff:FE,dot:Ji,equalText:RE,floor:dh,identity:Et,invmod:qE,larger:Hr,log:hs,lsolveAll:KE,matrixFromRows:UE,multiply:cr,qr:vh,range:qt,rightLogShift:VE,row:WE,setCartesian:GE,setDistinct:HE,setIsSubset:ZE,setPowerset:XE,slu:bh,sum:yh,trace:YE,usolveAll:xh,asin:JE,ceil:wh,column:Ah,composition:QE,cross:jE,det:Nh,distance:eC,dotMultiply:rC,fix:Mh,index:nC,inv:et,lcm:tC,log1p:iC,max:Th,pinv:aC,pow:Dn,quantileSeq:sC,setDifference:kh,setMultiplicity:oC,setSymDifference:Eh,sort:uC,sqrtm:cC,vacuumImpedance:lC,wienDisplacement:fC,atomicMass:mC,bohrMagneton:hC,boltzmann:pC,conductanceQuantum:gC,createUnit:dC,deuteronMass:vC,dotPow:bC,electricConstant:yC,elementaryCharge:xC,expm:wC,faraday:AC,firstRadiation:NC,gamma:Ch,gravitationConstant:SC,hartreeEnergy:MC,intersect:TC,klitzing:kC,loschmidt:EC,magneticConstant:CC,molarMass:BC,molarPlanckConstant:LC,neutronMass:DC,nuclearMagneton:IC,planckCharge:OC,planckLength:zC,planckTemperature:PC,protonMass:$C,reducedPlanckConstant:_C,rydberg:FC,setIntersect:Bh,setUnion:RC,stefanBoltzmann:qC,thomsonCrossSection:KC,avogadro:UC,bohrRadius:VC,coulomb:WC,divide:en,electronMass:GC,factorial:Qi,gravity:HC,inverseConductanceQuantum:ZC,lup:Dh,magneticFluxQuantum:XC,molarMassC12:YC,multinomial:JC,parse:dn,permutations:QC,planckMass:jC,quantumOfCirculation:eB,resolve:Wh,secondRadiation:rB,simplifyCore:ds,stirlingS2:Ih,unit:nB,bellNumbers:tB,compile:Gh,eigs:Oh,fermiCoupling:iB,leafCount:xB,mean:aB,molarVolume:sB,planckConstant:oB,setSize:uB,speedOfLight:cB,variance:ps,classicalElectronRadius:lB,evaluate:Zh,help:wB,lusolve:fB,median:zh,simplify:ji,gasConstant:mB,mad:hB,parser:AB,rationalize:NB,std:pB,derivative:SB,norm:Ph,rotationMatrix:$h,kldivergence:gB,rotate:dB,planckTime:vB,symbolicEqual:MB,config:se});wr(jt,Ct,{filter:u7({typed:G}),forEach:f7({typed:G}),map:v7({typed:G}),apply:n7({isInteger:Wr,typed:G}),diff:R7({bignumber:En,matrix:de,number:Kn,subtract:sr,typed:G}),index:p7({Index:Ar}),subset:z7({matrix:de,typed:G}),concat:_7({isInteger:Wr,matrix:de,typed:G}),max:x7({config:se,larger:Hr,numeric:jr,typed:G}),min:T7({config:se,numeric:jr,smaller:Gr,typed:G}),range:C7({bignumber:En,matrix:de,config:se,larger:Hr,largerEq:Xi,smaller:Gr,smallerEq:fs,typed:G}),row:D7({Index:Ar,matrix:de,range:qt,typed:G}),sum:W7({add:ar,config:se,numeric:jr,typed:G}),column:a7({Index:Ar,matrix:de,range:qt,typed:G}),mean:N7({add:ar,divide:en,typed:G}),variance:X7({add:ar,apply:is,divide:en,isNaN:Yt,multiply:cr,subtract:sr,typed:G}),std:U7({sqrt:Bn,typed:G,variance:ps}),cumsum:H7({add:ar,typed:G,unaryPlus:ns})});wr(_h,{BigNumber:fe,Chain:gs,Complex:tr,Fraction:Qn,Matrix:Wi,Node:Tr,ObjectNode:ei,OperatorNode:Un,ParenthesisNode:rt,Range:ak,RelationalNode:Fh,ResultSet:eh,ArrayNode:ri,BlockNode:Rh,ConditionalNode:qh,ConstantNode:nt,DenseMatrix:Pe,RangeNode:Kh,FunctionAssignmentNode:Uh,SparseMatrix:Cn,AccessorNode:ni,AssignmentNode:Vh,ImmutableDenseMatrix:mh,Index:Ar,IndexNode:ti,FibonacciHeap:Sh,Unit:Be,Spa:Lh,SymbolNode:tt,FunctionNode:it,Help:Hh,Parser:Xh});gs.createProxy(Ct);var Sn={},vs={},bs={},kr={},TB={},kB=Object.freeze(Object.defineProperty({__proto__:null,default:TB},Symbol.toStringTag,{value:"Module"})),EB=Vp(kB);Object.defineProperty(kr,"__esModule",{value:!0});kr.visitor=kr.filterUndefined=kr.delay=kr.waitAll=kr.makePromise=void 0;const CB=EB;function BB(e,n){return new Promise(i=>e(i)).catch(i=>{throw console.error("There was an error with the promise"),Error("There was an error with the promise")}).then(i=>i)}kr.makePromise=BB;function LB(e){return Pt(e,void 0)}kr.waitAll=LB;function Ei(e){if(Array.isArray(e))e.forEach(n=>Ei(n));else if(typeof e=="object"&&e["#visited"]){delete e["#visited"];for(const n of Object.keys(e))Ei(e[n])}}async function Pt(e,n){if(typeof n=="undefined"){const i=await Pt(e,0);return Ei(i),i}if((0,CB.isPromise)(e))return await Pt(await e,n+1);if(Array.isArray(e))return await Promise.all(e.map(t=>Pt(t,n+1)));if(typeof e=="object"){if(e["#visited"])return e;e["#visited"]=!0;for(const i of Object.keys(e)){const t=e[i];e[i]=await Pt(t,n+1)}return e}else return e}function DB(e){return new Promise(i=>{setTimeout(()=>{i()},e)})}kr.delay=DB;function IB(e){return e.filter(n=>typeof n!="undefined")}kr.filterUndefined=IB;async function OB(e,n){await i("#root",e,n),Ei(e);async function i(t,r,a){if(Array.isArray(r))await a(t,r),await Promise.all(r.map((c,l)=>i(`${t}[${l}]`,c,a)));else if(typeof r=="object"){if(r["#visited"])return;await a(t,r),r["#visited"]=!0,await Promise.all(Object.keys(r).map(async c=>{const l=r[c];await i(c,l,a)}))}else await a(t,r)}}kr.visitor=OB;Object.defineProperty(bs,"__esModule",{value:!0});const fi=kr;class zB{constructor(n){at(this,"r",{});at(this,"setter",{});at(this,"resolved",{});at(this,"keyTranslator");this.keyTranslator=n}getAll(){return(0,fi.filterUndefined)(Object.values(this.r))}getAllMissing(){return(0,fi.filterUndefined)(Object.keys(this.r).filter(n=>!Object.keys(this.resolved).includes(n)))}getType(n){const i=this.getKey(n),t=this.r[i];if(t)return t;{let r;const a=(0,fi.makePromise)(c=>{r=c},`get-depot ${i}`).catch(c=>{throw console.error(`Faild Promise ${c}`),Error(`Faild Promise ${c}`)});if(!r)throw Error("This should not happen f must always be set");return this.setter[i]=r,this.r[i]=a,a}}setType(n,i){const t=this.getKey(n);if(this.resolved[t])throw console.error(`Key ${t} already set...`),Error(`Key ${t} already set...`);this.resolved[t]=!0;let r=this.setter[t];if(!r){const a=(0,fi.makePromise)(c=>{r=c},`set-depot ${t}`).catch(c=>{throw console.error(`Faild Promise ${c}`),Error(`Faild Promise ${c}`)});this.setter[t]=r,this.r[t]=a}r(i)}getKey(n){return this.keyTranslator(n)}}bs.default=zB;var un={},ys={},xs={};(function(e){const n=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",i=n+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040",t="["+n+"]["+i+"]*",r=new RegExp("^"+t+"$"),a=function(l,u){const f=[];let o=u.exec(l);for(;o;){const s=[];s.startIndex=u.lastIndex-o[0].length;const m=o.length;for(let h=0;h<m;h++)s.push(o[h]);f.push(s),o=u.exec(l)}return f},c=function(l){const u=r.exec(l);return!(u===null||typeof u=="undefined")};e.isExist=function(l){return typeof l!="undefined"},e.isEmptyObject=function(l){return Object.keys(l).length===0},e.merge=function(l,u,f){if(u){const o=Object.keys(u),s=o.length;for(let m=0;m<s;m++)f==="strict"?l[o[m]]=[u[o[m]]]:l[o[m]]=u[o[m]]}},e.getValue=function(l){return e.isExist(l)?l:""},e.isName=c,e.getAllMatches=a,e.nameRegexp=t})(xs);const ws=xs,PB={allowBooleanAttributes:!1,unpairedTags:[]};ys.validate=function(e,n){n=Object.assign({},PB,n);const i=[];let t=!1,r=!1;e[0]==="\uFEFF"&&(e=e.substr(1));for(let a=0;a<e.length;a++)if(e[a]==="<"&&e[a+1]==="?"){if(a+=2,a=$l(e,a),a.err)return a}else if(e[a]==="<"){let c=a;if(a++,e[a]==="!"){a=_l(e,a);continue}else{let l=!1;e[a]==="/"&&(l=!0,a++);let u="";for(;a<e.length&&e[a]!==">"&&e[a]!==" "&&e[a]!=="	"&&e[a]!==`
`&&e[a]!=="\r";a++)u+=e[a];if(u=u.trim(),u[u.length-1]==="/"&&(u=u.substring(0,u.length-1),a--),!VB(u)){let s;return u.trim().length===0?s="Invalid space after '<'.":s="Tag '"+u+"' is an invalid name.",fr("InvalidTag",s,Dr(e,a))}const f=FB(e,a);if(f===!1)return fr("InvalidAttr","Attributes for '"+u+"' have open quote.",Dr(e,a));let o=f.value;if(a=f.index,o[o.length-1]==="/"){const s=a-o.length;o=o.substring(0,o.length-1);const m=Fl(o,n);if(m===!0)t=!0;else return fr(m.err.code,m.err.msg,Dr(e,s+m.err.line))}else if(l)if(f.tagClosed){if(o.trim().length>0)return fr("InvalidTag","Closing tag '"+u+"' can't have attributes or invalid starting.",Dr(e,c));{const s=i.pop();if(u!==s.tagName){let m=Dr(e,s.tagStartPos);return fr("InvalidTag","Expected closing tag '"+s.tagName+"' (opened in line "+m.line+", col "+m.col+") instead of closing tag '"+u+"'.",Dr(e,c))}i.length==0&&(r=!0)}}else return fr("InvalidTag","Closing tag '"+u+"' doesn't have proper closing.",Dr(e,a));else{const s=Fl(o,n);if(s!==!0)return fr(s.err.code,s.err.msg,Dr(e,a-o.length+s.err.line));if(r===!0)return fr("InvalidXml","Multiple possible root nodes found.",Dr(e,a));n.unpairedTags.indexOf(u)!==-1||i.push({tagName:u,tagStartPos:c}),t=!0}for(a++;a<e.length;a++)if(e[a]==="<")if(e[a+1]==="!"){a++,a=_l(e,a);continue}else if(e[a+1]==="?"){if(a=$l(e,++a),a.err)return a}else break;else if(e[a]==="&"){const s=KB(e,a);if(s==-1)return fr("InvalidChar","char '&' is not expected.",Dr(e,a));a=s}else if(r===!0&&!Pl(e[a]))return fr("InvalidXml","Extra text at the end",Dr(e,a));e[a]==="<"&&a--}}else{if(Pl(e[a]))continue;return fr("InvalidChar","char '"+e[a]+"' is not expected.",Dr(e,a))}if(t){if(i.length==1)return fr("InvalidTag","Unclosed tag '"+i[0].tagName+"'.",Dr(e,i[0].tagStartPos));if(i.length>0)return fr("InvalidXml","Invalid '"+JSON.stringify(i.map(a=>a.tagName),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1})}else return fr("InvalidXml","Start tag expected.",1);return!0};function Pl(e){return e===" "||e==="	"||e===`
`||e==="\r"}function $l(e,n){const i=n;for(;n<e.length;n++)if(e[n]=="?"||e[n]==" "){const t=e.substr(i,n-i);if(n>5&&t==="xml")return fr("InvalidXml","XML declaration allowed only at the start of the document.",Dr(e,n));if(e[n]=="?"&&e[n+1]==">"){n++;break}else continue}return n}function _l(e,n){if(e.length>n+5&&e[n+1]==="-"&&e[n+2]==="-"){for(n+=3;n<e.length;n++)if(e[n]==="-"&&e[n+1]==="-"&&e[n+2]===">"){n+=2;break}}else if(e.length>n+8&&e[n+1]==="D"&&e[n+2]==="O"&&e[n+3]==="C"&&e[n+4]==="T"&&e[n+5]==="Y"&&e[n+6]==="P"&&e[n+7]==="E"){let i=1;for(n+=8;n<e.length;n++)if(e[n]==="<")i++;else if(e[n]===">"&&(i--,i===0))break}else if(e.length>n+9&&e[n+1]==="["&&e[n+2]==="C"&&e[n+3]==="D"&&e[n+4]==="A"&&e[n+5]==="T"&&e[n+6]==="A"&&e[n+7]==="["){for(n+=8;n<e.length;n++)if(e[n]==="]"&&e[n+1]==="]"&&e[n+2]===">"){n+=2;break}}return n}const $B='"',_B="'";function FB(e,n){let i="",t="",r=!1;for(;n<e.length;n++){if(e[n]===$B||e[n]===_B)t===""?t=e[n]:t!==e[n]||(t="");else if(e[n]===">"&&t===""){r=!0;break}i+=e[n]}return t!==""?!1:{value:i,index:n,tagClosed:r}}const RB=new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`,"g");function Fl(e,n){const i=ws.getAllMatches(e,RB),t={};for(let r=0;r<i.length;r++){if(i[r][1].length===0)return fr("InvalidAttr","Attribute '"+i[r][2]+"' has no space in starting.",Dt(i[r]));if(i[r][3]!==void 0&&i[r][4]===void 0)return fr("InvalidAttr","Attribute '"+i[r][2]+"' is without value.",Dt(i[r]));if(i[r][3]===void 0&&!n.allowBooleanAttributes)return fr("InvalidAttr","boolean attribute '"+i[r][2]+"' is not allowed.",Dt(i[r]));const a=i[r][2];if(!UB(a))return fr("InvalidAttr","Attribute '"+a+"' is an invalid name.",Dt(i[r]));if(!t.hasOwnProperty(a))t[a]=1;else return fr("InvalidAttr","Attribute '"+a+"' is repeated.",Dt(i[r]))}return!0}function qB(e,n){let i=/\d/;for(e[n]==="x"&&(n++,i=/[\da-fA-F]/);n<e.length;n++){if(e[n]===";")return n;if(!e[n].match(i))break}return-1}function KB(e,n){if(n++,e[n]===";")return-1;if(e[n]==="#")return n++,qB(e,n);let i=0;for(;n<e.length;n++,i++)if(!(e[n].match(/\w/)&&i<20)){if(e[n]===";")break;return-1}return n}function fr(e,n,i){return{err:{code:e,msg:n,line:i.line||i,col:i.col}}}function UB(e){return ws.isName(e)}function VB(e){return ws.isName(e)}function Dr(e,n){const i=e.substring(0,n).split(/\r?\n/);return{line:i.length,col:i[i.length-1].length+1}}function Dt(e){return e.startIndex+e[1].length}var As={};const Yh={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0},tagValueProcessor:function(e,n){return n},attributeValueProcessor:function(e,n){return n},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1},WB=function(e){return Object.assign({},Yh,e)};As.buildOptions=WB;As.defaultOptions=Yh;class GB{constructor(n){this.tagname=n,this.child=[],this[":@"]={}}add(n,i){this.child.push({[n]:i})}addChild(n){n[":@"]&&Object.keys(n[":@"]).length>0?this.child.push({[n.tagname]:n.child,[":@"]:n[":@"]}):this.child.push({[n.tagname]:n.child})}}var HB=GB;function ZB(e,n){const i={};if(e[n+3]==="O"&&e[n+4]==="C"&&e[n+5]==="T"&&e[n+6]==="Y"&&e[n+7]==="P"&&e[n+8]==="E"){n=n+9;let t=1,r=!1,a=!1,c=!1,l="";for(;n<e.length;n++)if(e[n]==="<"){if(r&&e[n+1]==="!"&&e[n+2]==="E"&&e[n+3]==="N"&&e[n+4]==="T"&&e[n+5]==="I"&&e[n+6]==="T"&&e[n+7]==="Y")n+=7,a=!0;else if(r&&e[n+1]==="!"&&e[n+2]==="E"&&e[n+3]==="L"&&e[n+4]==="E"&&e[n+5]==="M"&&e[n+6]==="E"&&e[n+7]==="N"&&e[n+8]==="T")n+=8;else if(e[n+1]==="!"&&e[n+2]==="-"&&e[n+3]==="-")c=!0;else throw new Error("Invalid DOCTYPE");t++,l=""}else if(e[n]===">"){if(c)if(e[n-1]==="-"&&e[n-2]==="-")c=!1;else throw new Error("Invalid XML comment in DOCTYPE");else a&&(YB(l,i),a=!1);if(t--,t===0)break}else e[n]==="["?r=!0:l+=e[n];if(t!==0)throw new Error("Unclosed DOCTYPE")}else throw new Error("Invalid Tag instead of DOCTYPE");return{entities:i,i:n}}const XB=RegExp(`^\\s([a-zA-z0-0]+)[ 	](['"])([^&]+)\\2`);function YB(e,n){const i=XB.exec(e);i&&(n[i[1]]={regx:RegExp(`&${i[1]};`,"g"),val:i[3]})}var JB=ZB;const QB=/^[-+]?0x[a-fA-F0-9]+$/,jB=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt);!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);const e9={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};function r9(e,n={}){if(n=Object.assign({},e9,n),!e||typeof e!="string")return e;let i=e.trim();if(n.skipLike!==void 0&&n.skipLike.test(i))return e;if(n.hex&&QB.test(i))return Number.parseInt(i,16);{const t=jB.exec(i);if(t){const r=t[1],a=t[2];let c=n9(t[3]);const l=t[4]||t[6];if(!n.leadingZeros&&a.length>0&&r&&i[2]!==".")return e;if(!n.leadingZeros&&a.length>0&&!r&&i[1]!==".")return e;{const u=Number(i),f=""+u;return f.search(/[eE]/)!==-1||l?n.eNotation?u:e:i.indexOf(".")!==-1?f==="0"&&c===""||f===c||r&&f==="-"+c?u:e:a?c===f||r+c===f?u:e:i===f||i===r+f?u:e}}else return e}}function n9(e){return e&&e.indexOf(".")!==-1&&(e=e.replace(/0+$/,""),e==="."?e="0":e[0]==="."?e="0"+e:e[e.length-1]==="."&&(e=e.substr(0,e.length-1))),e}var t9=r9;const Ns=xs,It=HB,i9=JB,a9=t9;"<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g,Ns.nameRegexp);class s9{constructor(n){this.options=n,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={amp:{regex:/&(amp|#38|#x26);/g,val:"&"},apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"\xA2"},pound:{regex:/&(pound|#163);/g,val:"\xA3"},yen:{regex:/&(yen|#165);/g,val:"\xA5"},euro:{regex:/&(euro|#8364);/g,val:"\u20AC"},copyright:{regex:/&(copy|#169);/g,val:"\xA9"},reg:{regex:/&(reg|#174);/g,val:"\xAE"},inr:{regex:/&(inr|#8377);/g,val:"\u20B9"}},this.addExternalEntities=o9,this.parseXml=m9,this.parseTextData=u9,this.resolveNameSpace=c9,this.buildAttributesMap=f9,this.isItStopNode=g9,this.replaceEntitiesValue=h9,this.readStopNodeData=v9,this.saveTextToParentTag=p9}}function o9(e){const n=Object.keys(e);for(let i=0;i<n.length;i++){const t=n[i];this.lastEntities[t]={regex:new RegExp("&"+t+";","g"),val:e[t]}}}function u9(e,n,i,t,r,a,c){if(e!==void 0&&(this.options.trimValues&&!t&&(e=e.trim()),e.length>0)){c||(e=this.replaceEntitiesValue(e));const l=this.options.tagValueProcessor(n,e,i,r,a);return l==null?e:typeof l!=typeof e||l!==e?l:this.options.trimValues?Da(e,this.options.parseTagValue,this.options.numberParseOptions):e.trim()===e?Da(e,this.options.parseTagValue,this.options.numberParseOptions):e}}function c9(e){if(this.options.removeNSPrefix){const n=e.split(":"),i=e.charAt(0)==="/"?"/":"";if(n[0]==="xmlns")return"";n.length===2&&(e=i+n[1])}return e}const l9=new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`,"gm");function f9(e,n){if(!this.options.ignoreAttributes&&typeof e=="string"){const i=Ns.getAllMatches(e,l9),t=i.length,r={};for(let a=0;a<t;a++){const c=this.resolveNameSpace(i[a][1]);let l=i[a][4];const u=this.options.attributeNamePrefix+c;if(c.length)if(l!==void 0){this.options.trimValues&&(l=l.trim()),l=this.replaceEntitiesValue(l);const f=this.options.attributeValueProcessor(c,l,n);f==null?r[u]=l:typeof f!=typeof l||f!==l?r[u]=f:r[u]=Da(l,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(r[u]=!0)}if(!Object.keys(r).length)return;if(this.options.attributesGroupName){const a={};return a[this.options.attributesGroupName]=r,a}return r}}const m9=function(e){e=e.replace(/\r\n?/g,`
`);const n=new It("!xml");let i=n,t="",r="";for(let a=0;a<e.length;a++)if(e[a]==="<")if(e[a+1]==="/"){const l=pi(e,">",a,"Closing Tag is not closed.");let u=e.substring(a+2,l).trim();if(this.options.removeNSPrefix){const f=u.indexOf(":");f!==-1&&(u=u.substr(f+1))}i&&(t=this.saveTextToParentTag(t,i,r)),r=r.substr(0,r.lastIndexOf(".")),i=this.tagsNodeStack.pop(),t="",a=l}else if(e[a+1]==="?"){let l=La(e,a,!1,"?>");if(!l)throw new Error("Pi Tag is not closed.");if(t=this.saveTextToParentTag(t,i,r),!(this.options.ignoreDeclaration&&l.tagName==="?xml"||this.options.ignorePiTags)){const u=new It(l.tagName);u.add(this.options.textNodeName,""),l.tagName!==l.tagExp&&l.attrExpPresent&&(u[":@"]=this.buildAttributesMap(l.tagExp,r)),i.addChild(u)}a=l.closeIndex+1}else if(e.substr(a+1,3)==="!--"){const l=pi(e,"-->",a+4,"Comment is not closed.");if(this.options.commentPropName){const u=e.substring(a+4,l-2);t=this.saveTextToParentTag(t,i,r),i.add(this.options.commentPropName,[{[this.options.textNodeName]:u}])}a=l}else if(e.substr(a+1,2)==="!D"){const l=i9(e,a);this.docTypeEntities=l.entities,a=l.i}else if(e.substr(a+1,2)==="!["){const l=pi(e,"]]>",a,"CDATA is not closed.")-2,u=e.substring(a+9,l);if(t=this.saveTextToParentTag(t,i,r),this.options.cdataPropName)i.add(this.options.cdataPropName,[{[this.options.textNodeName]:u}]);else{let f=this.parseTextData(u,i.tagname,r,!0,!1,!0);f==null&&(f=""),i.add(this.options.textNodeName,f)}a=l+2}else{let l=La(e,a,this.options.removeNSPrefix),u=l.tagName,f=l.tagExp,o=l.attrExpPresent,s=l.closeIndex;i&&t&&i.tagname!=="!xml"&&(t=this.saveTextToParentTag(t,i,r,!1)),u!==n.tagname&&(r+=r?"."+u:u);const m=i;if(m&&this.options.unpairedTags.indexOf(m.tagname)!==-1&&(i=this.tagsNodeStack.pop()),this.isItStopNode(this.options.stopNodes,r,u)){let h="";if(f.length>0&&f.lastIndexOf("/")===f.length-1)a=l.closeIndex;else if(this.options.unpairedTags.indexOf(u)!==-1)a=l.closeIndex;else{const g=this.readStopNodeData(e,u,s+1);if(!g)throw new Error(`Unexpected end of ${u}`);a=g.i,h=g.tagContent}const p=new It(u);u!==f&&o&&(p[":@"]=this.buildAttributesMap(f,r)),h&&(h=this.parseTextData(h,u,r,!0,o,!0,!0)),r=r.substr(0,r.lastIndexOf(".")),p.add(this.options.textNodeName,h),i.addChild(p)}else{if(f.length>0&&f.lastIndexOf("/")===f.length-1){u[u.length-1]==="/"?(u=u.substr(0,u.length-1),f=u):f=f.substr(0,f.length-1);const h=new It(u);u!==f&&o&&(h[":@"]=this.buildAttributesMap(f,r)),r=r.substr(0,r.lastIndexOf(".")),i.addChild(h)}else{const h=new It(u);this.tagsNodeStack.push(i),u!==f&&o&&(h[":@"]=this.buildAttributesMap(f,r)),i.addChild(h),i=h}t="",a=s}}else t+=e[a];return n.child},h9=function(e){if(this.options.processEntities){for(let n in this.docTypeEntities){const i=this.docTypeEntities[n];e=e.replace(i.regx,i.val)}for(let n in this.lastEntities){const i=this.lastEntities[n];e=e.replace(i.regex,i.val)}if(this.options.htmlEntities)for(let n in this.htmlEntities){const i=this.htmlEntities[n];e=e.replace(i.regex,i.val)}}return e};function p9(e,n,i,t){return e&&(t===void 0&&(t=Object.keys(n.child).length===0),e=this.parseTextData(e,n.tagname,i,!1,n[":@"]?Object.keys(n[":@"]).length!==0:!1,t),e!==void 0&&e!==""&&n.add(this.options.textNodeName,e),e=""),e}function g9(e,n,i){const t="*."+i;for(const r in e){const a=e[r];if(t===a||n===a)return!0}return!1}function d9(e,n,i=">"){let t,r="";for(let a=n;a<e.length;a++){let c=e[a];if(t)c===t&&(t="");else if(c==='"'||c==="'")t=c;else if(c===i[0])if(i[1]){if(e[a+1]===i[1])return{data:r,index:a}}else return{data:r,index:a};else c==="	"&&(c=" ");r+=c}}function pi(e,n,i,t){const r=e.indexOf(n,i);if(r===-1)throw new Error(t);return r+n.length-1}function La(e,n,i,t=">"){const r=d9(e,n+1,t);if(!r)return;let a=r.data;const c=r.index,l=a.search(/\s/);let u=a,f=!0;if(l!==-1&&(u=a.substr(0,l).replace(/\s\s*$/,""),a=a.substr(l+1)),i){const o=u.indexOf(":");o!==-1&&(u=u.substr(o+1),f=u!==r.data.substr(o+1))}return{tagName:u,tagExp:a,closeIndex:c,attrExpPresent:f}}function v9(e,n,i){const t=i;let r=1;for(;i<e.length;i++)if(e[i]==="<")if(e[i+1]==="/"){const a=pi(e,">",i,`${n} is not closed`);if(e.substring(i+2,a).trim()===n&&(r--,r===0))return{tagContent:e.substring(t,i),i:a};i=a}else{const a=La(e,i,">");a&&((a&&a.tagName)===n&&r++,i=a.closeIndex)}}function Da(e,n,i){if(n&&typeof e=="string"){const t=e.trim();return t==="true"?!0:t==="false"?!1:a9(e,i)}else return Ns.isExist(e)?e:""}var b9=s9,Jh={};function y9(e,n){return Qh(e,n)}function Qh(e,n,i){let t;const r={};for(let a=0;a<e.length;a++){const c=e[a],l=x9(c);let u="";if(i===void 0?u=l:u=i+"."+l,l===n.textNodeName)t===void 0?t=c[l]:t+=""+c[l];else{if(l===void 0)continue;if(c[l]){let f=Qh(c[l],n,u);const o=A9(f,n);c[":@"]?w9(f,c[":@"],u,n):Object.keys(f).length===1&&f[n.textNodeName]!==void 0&&!n.alwaysCreateTextNode?f=f[n.textNodeName]:Object.keys(f).length===0&&(n.alwaysCreateTextNode?f[n.textNodeName]="":f=""),r[l]!==void 0&&r.hasOwnProperty(l)?(Array.isArray(r[l])||(r[l]=[r[l]]),r[l].push(f)):n.isArray(l,u,o)?r[l]=[f]:r[l]=f}}}return typeof t=="string"?t.length>0&&(r[n.textNodeName]=t):t!==void 0&&(r[n.textNodeName]=t),r}function x9(e){const n=Object.keys(e);for(let i=0;i<n.length;i++){const t=n[i];if(t!==":@")return t}}function w9(e,n,i,t){if(n){const r=Object.keys(n),a=r.length;for(let c=0;c<a;c++){const l=r[c];t.isArray(l,i+"."+l,!0,!0)?e[l]=[n[l]]:e[l]=n[l]}}}function A9(e,n){const i=Object.keys(e).length;return!!(i===0||i===1&&e[n.textNodeName])}Jh.prettify=y9;const{buildOptions:N9}=As,S9=b9,{prettify:M9}=Jh,T9=ys;class k9{constructor(n){this.externalEntities={},this.options=N9(n)}parse(n,i){if(typeof n!="string")if(n.toString)n=n.toString();else throw new Error("XML data is accepted in String or Bytes[] form.");if(i){i===!0&&(i={});const a=T9.validate(n,i);if(a!==!0)throw Error(`${a.err.msg}:${a.err.line}:${a.err.col}`)}const t=new S9(this.options);t.addExternalEntities(this.externalEntities);const r=t.parseXml(n);return this.options.preserveOrder||r===void 0?r:M9(r,this.options)}addEntity(n,i){if(i.indexOf("&")!==-1)throw new Error("Entity value can't have '&'");if(n.indexOf("&")!==-1||n.indexOf(";")!==-1)throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");this.externalEntities[n]=i}}var E9=k9;const C9=`
`;function B9(e,n){return jh(e,n,"",0)}function jh(e,n,i,t){let r="",a="";n.format&&n.indentBy.length>0&&(a=C9+""+n.indentBy.repeat(t));for(let c=0;c<e.length;c++){const l=e[c],u=L9(l);let f="";if(i.length===0?f=u:f=`${i}.${u}`,u===n.textNodeName){let h=l[u];D9(f,n)||(h=n.tagValueProcessor(u,h),h=ep(h,n)),r+=a+h;continue}else if(u===n.cdataPropName){r+=a+`<![CDATA[${l[u][0][n.textNodeName]}]]>`;continue}else if(u===n.commentPropName){r+=a+`<!--${l[u][0][n.textNodeName]}-->`;continue}else if(u[0]==="?"){const h=Rl(l[":@"],n),p=u==="?xml"?"":a;let g=l[u][0][n.textNodeName];g=g.length!==0?" "+g:"",r+=p+`<${u}${g}${h}?>`;continue}const o=Rl(l[":@"],n);let s=a+`<${u}${o}`,m=jh(l[u],n,f,t+1);n.unpairedTags.indexOf(u)!==-1?n.suppressUnpairedNode?r+=s+">":r+=s+"/>":(!m||m.length===0)&&n.suppressEmptyNode?r+=s+"/>":r+=s+`>${m}${a}</${u}>`}return r}function L9(e){const n=Object.keys(e);for(let i=0;i<n.length;i++){const t=n[i];if(t!==":@")return t}}function Rl(e,n){let i="";if(e&&!n.ignoreAttributes)for(let t in e){let r=n.attributeValueProcessor(t,e[t]);r=ep(r,n),r===!0&&n.suppressBooleanAttributes?i+=` ${t.substr(n.attributeNamePrefix.length)}`:i+=` ${t.substr(n.attributeNamePrefix.length)}="${r}"`}return i}function D9(e,n){e=e.substr(0,e.length-n.textNodeName.length-1);let i=e.substr(e.lastIndexOf(".")+1);for(let t in n.stopNodes)if(n.stopNodes[t]===e||n.stopNodes[t]==="*."+i)return!0;return!1}function ep(e,n){if(e&&e.length>0&&n.processEntities)for(let i=0;i<n.entities.length;i++){const t=n.entities[i];e=e.replace(t.regex,t.val)}return e}var I9=B9;const O9=I9,z9={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(e,n){return n},attributeValueProcessor:function(e,n){return n},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[]};function Ss(e){this.options=Object.assign({},z9,e),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=K9),this.processTextOrObjNode=$9,this.options.format?(this.indentate=q9,this.tagEndChar=`>
`,this.newLine=`
`):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine=""),this.options.suppressEmptyNode?(this.buildTextNode=R9,this.buildObjNode=_9):(this.buildTextNode=Kl,this.buildObjNode=ql),this.buildTextValNode=Kl,this.buildObjectNode=ql,this.replaceEntitiesValue=F9,this.buildAttrPairStr=P9}Ss.prototype.build=function(e){return this.options.preserveOrder?O9(e,this.options):(Array.isArray(e)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(e={[this.options.arrayNodeName]:e}),this.j2x(e,0).val)};Ss.prototype.j2x=function(e,n){let i="",t="";for(let r in e)if(typeof e[r]!="undefined")if(e[r]===null)r[0]==="?"?t+=this.indentate(n)+"<"+r+"?"+this.tagEndChar:t+=this.indentate(n)+"<"+r+"/"+this.tagEndChar;else if(e[r]instanceof Date)t+=this.buildTextNode(e[r],r,"",n);else if(typeof e[r]!="object"){const a=this.isAttribute(r);if(a)i+=this.buildAttrPairStr(a,""+e[r]);else if(r===this.options.textNodeName){let c=this.options.tagValueProcessor(r,""+e[r]);t+=this.replaceEntitiesValue(c)}else t+=this.buildTextNode(e[r],r,"",n)}else if(Array.isArray(e[r])){const a=e[r].length;for(let c=0;c<a;c++){const l=e[r][c];typeof l=="undefined"||(l===null?r[0]==="?"?t+=this.indentate(n)+"<"+r+"?"+this.tagEndChar:t+=this.indentate(n)+"<"+r+"/"+this.tagEndChar:typeof l=="object"?t+=this.processTextOrObjNode(l,r,n):t+=this.buildTextNode(l,r,"",n))}}else if(this.options.attributesGroupName&&r===this.options.attributesGroupName){const a=Object.keys(e[r]),c=a.length;for(let l=0;l<c;l++)i+=this.buildAttrPairStr(a[l],""+e[r][a[l]])}else t+=this.processTextOrObjNode(e[r],r,n);return{attrStr:i,val:t}};function P9(e,n){return n=this.options.attributeValueProcessor(e,""+n),n=this.replaceEntitiesValue(n),this.options.suppressBooleanAttributes&&n==="true"?" "+e:" "+e+'="'+n+'"'}function $9(e,n,i){const t=this.j2x(e,i+1);return e[this.options.textNodeName]!==void 0&&Object.keys(e).length===1?this.buildTextNode(e[this.options.textNodeName],n,t.attrStr,i):this.buildObjNode(t.val,n,t.attrStr,i)}function ql(e,n,i,t){let r="</"+n+this.tagEndChar,a="";return n[0]==="?"&&(a="?",r=""),i&&e.indexOf("<")===-1?this.indentate(t)+"<"+n+i+a+">"+e+r:this.options.commentPropName!==!1&&n===this.options.commentPropName&&a.length===0?this.indentate(t)+`<!--${e}-->`+this.newLine:this.indentate(t)+"<"+n+i+a+this.tagEndChar+e+this.indentate(t)+r}function _9(e,n,i,t){return e!==""?this.buildObjectNode(e,n,i,t):n[0]==="?"?this.indentate(t)+"<"+n+i+"?"+this.tagEndChar:this.indentate(t)+"<"+n+i+"/"+this.tagEndChar}function Kl(e,n,i,t){if(this.options.cdataPropName!==!1&&n===this.options.cdataPropName)return this.indentate(t)+`<![CDATA[${e}]]>`+this.newLine;if(this.options.commentPropName!==!1&&n===this.options.commentPropName)return this.indentate(t)+`<!--${e}-->`+this.newLine;{let r=this.options.tagValueProcessor(n,e);return r=this.replaceEntitiesValue(r),r===""&&this.options.unpairedTags.indexOf(n)!==-1?this.options.suppressUnpairedNode?this.indentate(t)+"<"+n+this.tagEndChar:this.indentate(t)+"<"+n+"/"+this.tagEndChar:this.indentate(t)+"<"+n+i+">"+r+"</"+n+this.tagEndChar}}function F9(e){if(e&&e.length>0&&this.options.processEntities)for(let n=0;n<this.options.entities.length;n++){const i=this.options.entities[n];e=e.replace(i.regex,i.val)}return e}function R9(e,n,i,t){return e===""&&this.options.unpairedTags.indexOf(n)!==-1?this.options.suppressUnpairedNode?this.indentate(t)+"<"+n+this.tagEndChar:this.indentate(t)+"<"+n+"/"+this.tagEndChar:e!==""?this.buildTextValNode(e,n,i,t):n[0]==="?"?this.indentate(t)+"<"+n+i+"?"+this.tagEndChar:this.indentate(t)+"<"+n+i+"/"+this.tagEndChar}function q9(e){return this.options.indentBy.repeat(e)}function K9(e){return e.startsWith(this.options.attributeNamePrefix)?e.substr(this.attrPrefixLen):!1}var U9=Ss;const V9=ys,W9=E9,G9=U9;var H9={XMLParser:W9,XMLValidator:V9,XMLBuilder:G9};Object.defineProperty(un,"__esModule",{value:!0});un.getTagname=un.writeXml=un.parseXml=void 0;const Z9=H9,X9=["byte","decimal","int","integer","long","negativeInteger","nonNegativeInteger","nonPositiveInteger","positiveInteger","short","unsignedLong","unsignedInt","unsignedShort","unsignedByte","ENTITIES","ENTITY","ID","IDREF","IDREFS","language","Name","NCName","NMTOKEN","NMTOKENS","normalizedString","QName","string","token","date","dateTime","duration","gDay","gMonth","gMonthDay","gYear","gYearMonth","time","anyURI","base64Binary","boolean","double","float","hexBinary","NOTATION","QName"];function Y9(e){const i=new Z9.XMLParser({allowBooleanAttributes:!0,ignoreAttributes:!1,attributeNamePrefix:"",ignoreDeclaration:!0,removeNSPrefix:!1,preserveOrder:!0}).parse(e);return np(i[0])}un.parseXml=Y9;const J9={pretty:!0,indent:2,quote:"'"};function Q9(e,n){n!=null||(n={});const i=Te(Te({},J9),n),t=rp(e,{},i,0);return n.pretty?j9(t):t}un.writeXml=Q9;function rp(e,n,i,t){const r=Object.fromEntries(Object.entries(e.scope).filter(([s,m])=>n[s]==null||n[s]!=m)),a=Te(Te({},n),r),c=e.name.namespace==a[""]?e.name.local:`${Object.entries(n).filter(([s,m])=>e.name.namespace==m)[0][0]}:${e.name.local}`,l=Object.entries(r).map(([s,m])=>s==""?`xmlns=${i.quote}${m}${i.quote}`:`xmlns:${s}=${i.quote}${m}${i.quote}`),u=Object.entries(e.attributes).map(([s,m])=>`${s}=${i.quote}${m}${i.quote}`),f=`${i.pretty?`
`:""}${Array.from({length:i.pretty?t:0},()=>" ").join("")}`,o=e.text!==void 0?e.text:e.children.map(s=>Array.from({length:i.pretty?i.indent:0},()=>" ").join("")+rp(s,a,i,t+i.indent)).join(f);return o?e.text!==void 0?`<${[c,...l,...u].join(" ")}>${o}</${c}>`:`<${[c,...l,...u].join(" ")}>${f}${o}${f}</${c}>`:`<${c} ${l} ${u} />`}function j9(e){var n=new DOMParser().parseFromString(e,"application/xml"),i=new DOMParser().parseFromString(['<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">','  <xsl:strip-space elements="*"/>','  <xsl:template match="para[content-style][not(text())]">','    <xsl:value-of select="normalize-space(.)"/>',"  </xsl:template>",'  <xsl:template match="node()|@*">','    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',"  </xsl:template>",'  <xsl:output indent="yes"/>',"</xsl:stylesheet>"].join(`
`),"application/xml"),t=new XSLTProcessor;t.importStylesheet(i);var r=t.transformToDocument(n),a=new XMLSerializer().serializeToString(r);return a}function np(e,n){var l;n||(n={});const i=Object.keys(e).filter(u=>u!==":@"&&u!=="#text");if(i.length==0)return console.log(`no key ${JSON.stringify(e,void 0,2)}`),{};const t=i[0],r=Te({},n);e.children=(l=e[t])!=null?l:[],delete e[t],e.children.length===1&&typeof e.children[0]["#text"]!="undefined"&&(e.text=e.children[0]["#text"],e.children=[]),typeof e["#text"]!="undefined"&&(e.text=["#text"],delete e["#text"]),e.text==null?e.text="":typeof e.text!="string"&&(e.text=e.text.toString());const c=e[":@"];if(c){c.xmlns&&(r[""]=c.xmlns),typeof r[""]=="undefined"&&(r[""]="");const u=Object.keys(c).filter(o=>o.startsWith("xmlns:")).map(o=>{const s=c[o];return{prefix:o.substring(6),ns:s}});for(const{prefix:o,ns:s}of u)r[o]=s;const f=Object.entries(c).filter(o=>o[0]!=="xmlns"&&!o[0].startsWith("xmlns:")).map(o=>({name:o[0],value:o[1]}));e.attributes=Object.fromEntries(f.map(o=>[o.name,o.value])),delete e[":@"]}else e.attributes={};e.name=tp(t,r,!1),e.scope=r;for(const u of e.children)np(u,r);return e}function tp(e,n,i=!0){var t;if(e.indexOf(":")!=-1){const r=e.indexOf(":"),a=e.substring(0,r),c=e.substring(r+1);if(!n[a])throw Error(`Prefix ${a} unknown on element {tagName}`);const l=n[a];return{local:c,namespace:l}}else return i&&Object.keys(X9).includes(e)?{local:e,namespace:""}:{local:e,namespace:(t=n?n[""]:void 0)!=null?t:""}}un.getTagname=tp;var ea={},Ia={exports:{}};(function(e,n){var i=function(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof t!="undefined")return t;throw new Error("unable to locate global object")},t=i();e.exports=n=t.fetch,t.fetch&&(n.default=t.fetch.bind(t)),n.Headers=t.Headers,n.Request=t.Request,n.Response=t.Response})(Ia,Ia.exports);var e5=zr&&zr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(ea,"__esModule",{value:!0});ea.downloadXsd=void 0;const r5=un,n5=e5(Ia.exports),t5=kr;async function i5(e){const n={};return await Oa(e,n),(0,t5.filterUndefined)(await Promise.all(Object.values(n)))}ea.downloadXsd=i5;async function Oa(e,n){console.info(`Download ${e}`);const i=await(0,n5.default)(e),t=(0,r5.parseXml)(await i.text());if(t.name.local!=="schema"||t.name.namespace!=="http://www.w3.org/2001/XMLSchema")throw console.error(t),Error("No Schema");n[t.attributes.targetNamespace]||(n[t.attributes.targetNamespace]=Promise.resolve(t));for(const r of t.children.filter(a=>a.name.local=="import"&&a.name.namespace=="http://www.w3.org/2001/XMLSchema")){if(n[r.attributes.namespace])continue;const a=r.attributes.namespace;if(r.attributes.schemaLocation){const c=e.lastIndexOf("/"),l=e.substring(0,c+1)+r.attributes.schemaLocation;n[a]=Oa(l,n)}else n[a]=Oa(a,n)}return t}var a5=zr&&zr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(vs,"__esModule",{value:!0});const Bt=a5(bs),cn=un,He=kr,s5=ea,Ul=new Bt.default(e=>e.local+"#"+e.namespace),Vl=new Bt.default(e=>e.local+"#"+e.namespace),Xr=new Bt.default(e=>e.local+"#"+e.namespace),Wl=new Bt.default(e=>e.local+"#"+e.namespace),Yr=new Bt.default(e=>e.local+"#"+e.namespace),gi=new Bt.default(e=>e.local+"#"+e.namespace),o5={byte:"number",decimal:"number",int:"number",integer:"number",long:"number",negativeInteger:"number",nonNegativeInteger:"number",nonPositiveInteger:"number",positiveInteger:"number",short:"number",unsignedLong:"number",unsignedInt:"number",unsignedShort:"number",unsignedByte:"number",ENTITIES:"string",ENTITY:"string",ID:"string",IDREF:"string",IDREFS:"string",language:"string",Name:"string",NCName:"string",NMTOKEN:"string",NMTOKENS:"string",normalizedString:"string",QName:"string",string:"string",token:"string",date:"date",dateTime:"date",duration:"date",gDay:"date",gMonth:"date",gMonthDay:"date",gYear:"date",gYearMonth:"date",time:"date",anyURI:"string",base64Binary:"byte[]",boolean:"boolean",double:"number",float:"number",hexBinary:"byte[]",NOTATION:"string"};function u5(e,n){Xr.setType({local:e,namespace:"http://www.w3.org/2001/XMLSchema"},{base:n,original:e,subType:"native",type:"simpleType"}),Yr.setType({local:e,namespace:"http://www.w3.org/2001/XMLSchema"},{base:n,original:e,subType:"native",type:"simpleType"})}Object.entries(o5).map(e=>u5(...e));async function ip(e){var r,a,c,l;if(typeof e=="string")return ip(await(0,s5.downloadXsd)(e));const n=[];for(const u of e){const f=u.attributes.targetNamespace;for(const o of u.children){const s=(l=(c=(a=(r=Ms(o,f,!0))!=null?r:Ts(o,f,!0))!=null?a:sp(o,f))!=null?c:ap(o,f,!0))!=null?l:ra(o,f);s!=null&&n.push(s)}}await(0,He.waitAll)(gi.getAll());const t=(await(0,He.waitAll)(n)).flatMap(u=>Array.isArray(u)?u:[u]);return t.forEach(u=>{u.name&&(u.name.root=!0)}),t.filter(u=>u.type=="element")}vs.default=ip;function ap(e,n,i){if(e.name.local==="element"&&e.name.namespace==="http://www.w3.org/2001/XMLSchema"){if(e.attributes.ref)return(0,He.makePromise)(async u=>{const f=await gi.getType((0,cn.getTagname)(e.attributes.ref,e.scope)),o=c5(e,f);u(o)},"Wrapping "+e.attributes.ref);const t=e.attributes.name;if(e.attributes.type){const u=Yr.getType((0,cn.getTagname)(e.attributes.type,e.scope)),f=(0,He.makePromise)(async o=>{const s={name:{local:t,namespace:n},content:await u,type:"element",occurence:Ci(e)};o(s)},`getElement-${t}- ${e.attributes.type}`).catch(o=>{throw console.error(`Faild Promise ${o}`),Error(`Faild Promise ${o}`)});return i&&gi.setType({local:e.attributes.name,namespace:n},f),f}const a=e.children.filter(u=>u.name.local!=="annotation"||u.name.namespace!=="http://www.w3.org/2001/XMLSchema")[0];let c;if(a){const u=sp(a,n),f=ra(a,n);c=u!=null?u:f}else c=void 0;const l={type:"element",name:{local:t,namespace:n},occurence:Ci(e),content:c};return i&&gi.setType({local:e.attributes.name,namespace:n},l),l}else return}function sp(e,n){if(e.name.local==="complexType"&&e.name.namespace==="http://www.w3.org/2001/XMLSchema"){let r=function(o){if(o.name.local==="element"&&o.name.namespace==="http://www.w3.org/2001/XMLSchema"){const s=ap(o,n,!1);if(s)return s;throw Error("faild to get element..")}else return a(o)},a=function(o){if(typeof o!="undefined")if(o.name.local==="choice"&&o.name.namespace==="http://www.w3.org/2001/XMLSchema"){const s=(0,He.filterUndefined)(o.children.map(h=>r(h)));return{type:"choise",content:s,occurence:Ci(o)}}else if(o.name.local==="sequence"&&o.name.namespace==="http://www.w3.org/2001/XMLSchema"){const s=(0,He.filterUndefined)(o.children.map(h=>r(h)));return{type:"sequence",content:s,occurence:{maxOccurance:o.attributes.maxOccurs==="unbounded"?"unbounded":typeof o.attributes.maxOccurs=="undefined"?1:parseInt(o.attributes.maxOccurs),minOccurance:typeof o.attributes.minOccurs=="undefined"?1:parseInt(o.attributes.minOccurs)}}}else if(o.name.local==="all"&&o.name.namespace==="http://www.w3.org/2001/XMLSchema"){const s=(0,He.filterUndefined)(o.children.map(h=>r(h)));return{type:"all",content:s,occurence:{maxOccurance:o.attributes.maxOccurs==="unbounded"?"unbounded":typeof o.attributes.maxOccurs=="undefined"?1:parseInt(o.attributes.maxOccurs),minOccurance:typeof o.attributes.minOccurs=="undefined"?1:parseInt(o.attributes.minOccurs)}}}else return},c=function(o){if(typeof o!="undefined")if(o.name.local==="simpleContent"&&o.name.namespace==="http://www.w3.org/2001/XMLSchema"){const s=o.children.filter(m=>m.name.local!=="annotation"||m.name.namespace!=="http://www.w3.org/2001/XMLSchema");if(s.length!==1)throw Error("SimpleContent is only supported with ONE extension or ONE restriction");if(s[0].name.local==="extension"&&o.name.namespace==="http://www.w3.org/2001/XMLSchema")return(0,He.makePromise)(async h=>{const p=Yr.getType((0,cn.getTagname)(s[0].attributes.base,o.scope)),g={base:await(0,He.waitAll)(p),type:"simpleContent",attributes:mi(s[0].children,n)};h(g)},"getSimpleContent").catch(h=>{throw console.error(`Faild Promise ${h}`),Error(`Faild Promise ${h}`)});if(s[0].name.local==="restriction"&&o.name.namespace==="http://www.w3.org/2001/XMLSchema")throw Error("simpleContent restriction not yet supported")}else return},l=function(o){if(typeof o!="undefined")if(o.name.local==="complexContent"&&o.name.namespace==="http://www.w3.org/2001/XMLSchema"){const s=o.children.filter(m=>m.name.local!=="annotation"||m.name.namespace!=="http://www.w3.org/2001/XMLSchema");if(s.length!==1)throw Error("ComplexContent is only supported with ONE extension or ONE restriction");if(s[0].name.local==="extension"&&o.name.namespace==="http://www.w3.org/2001/XMLSchema")return(0,He.makePromise)(async h=>{const p=Yr.getType((0,cn.getTagname)(s[0].attributes.base,o.scope)),g=s[0].children.filter(w=>w.name.local!=="annotation"&&w.name.local!=="attribute"&&w.name.local!=="attributeGroup"||w.name.namespace!=="http://www.w3.org/2001/XMLSchema")[0],y={base:await(0,He.waitAll)(p),type:"complexContent",content:await(0,He.waitAll)(a(g)),attributes:mi(s[0].children,n)};h(y)},"getComplexContent").catch(h=>{throw console.error(`Faild Promise ${h}`),Error(`Faild Promise ${h}`)});if(s[0].name.local==="restriction"&&o.name.namespace==="http://www.w3.org/2001/XMLSchema")throw Error("ComplexContent restriction not yet supported")}else return};const i=e.children.filter(o=>o.name.local!=="annotation"&&o.name.local!=="attribute"&&o.name.local!=="attributeGroup"||o.name.namespace!=="http://www.w3.org/2001/XMLSchema")[0];let t=e.children.filter(o=>(o.name.local==="attribute"||o.name.local==="attributeGroup")&&o.name.namespace=="http://www.w3.org/2001/XMLSchema");const u=c(i),f=l(i);if(u!=null?u:f){const o={type:"complexType",content:u!=null?u:f,attributes:mi(e.children,n)};return e.attributes.name&&(o.name={local:e.attributes.name,namespace:n},Wl.setType({local:e.attributes.name,namespace:n},o),Yr.setType({local:e.attributes.name,namespace:n},o)),o}else{const o={type:"complexType",content:a(i),attributes:mi(t,n)};return e.attributes.name&&(o.name={local:e.attributes.name,namespace:n},Wl.setType({local:e.attributes.name,namespace:n},o),Yr.setType({local:e.attributes.name,namespace:n},o)),o}}else return}function c5(e,n){if(typeof e.attributes.maxOccurs=="undefined"&&typeof e.attributes.minOccurs=="undefined")return n;const i=Ci(e);return{type:"element",content:n.content,occurence:i,name:{local:n.name.local,namespace:n.name.namespace}}}function Ci(e){return{maxOccurance:e.attributes.maxOccurs==="unbounded"?"unbounded":typeof e.attributes.maxOccurs=="undefined"?1:parseInt(e.attributes.maxOccurs),minOccurance:typeof e.attributes.minOccurs=="undefined"?1:parseInt(e.attributes.minOccurs)}}function ra(e,n){var i,t,r,a;if(e.name.local==="simpleType"&&e.name.namespace==="http://www.w3.org/2001/XMLSchema"){const c=e.children.filter(l=>l.name.local!=="annotation"||l.name.namespace!=="http://www.w3.org/2001/XMLSchema")[0];if(c.name.local==="list"&&c.name.namespace==="http://www.w3.org/2001/XMLSchema")throw Error("simpleType List is not yet implemented");if(c.name.local==="restriction"&&c.name.namespace==="http://www.w3.org/2001/XMLSchema"){const l=c.children.filter(u=>u.name.local!=="annotation"||u.name.namespace!=="http://www.w3.org/2001/XMLSchema");if(l.length==0){const u=(0,He.makePromise)(async f=>{const o={subSubType:"simple",subType:"restriction",type:"simpleType",baseType:await(0,He.waitAll)(Xr.getType((0,cn.getTagname)(c.attributes.base,e.scope)))};e.attributes.name&&(o.name={local:e.attributes.name,namespace:n}),f(o)},"getSimpleType-restriction-simple").catch(f=>{throw console.error(`Faild Promise ${f}`),Error(`Faild Promise ${f}`)});return e.attributes.name&&(Xr.setType({local:e.attributes.name,namespace:n},u),Yr.setType({local:e.attributes.name,namespace:n},u)),u}else if(l[0].name.local==="enumeration"&&l[0].name.namespace==="http://www.w3.org/2001/XMLSchema"){if(!l.every(f=>f.name.local==="enumeration"&&f.name.namespace==="http://www.w3.org/2001/XMLSchema"))throw Error(`Mixing enumeration with other restrictions is not supported... ${JSON.stringify(l,void 0," ")}`);const u=(0,He.makePromise)(async f=>{const o=l.map(m=>m.attributes.value),s={subSubType:"enumeration",subType:"restriction",type:"simpleType",baseType:await(0,He.waitAll)(Xr.getType((0,cn.getTagname)(c.attributes.base,e.scope))),values:o};e.attributes.name&&(s.name={local:e.attributes.name,namespace:n}),f(s)},"getSimpleType-restriction-enumeration").catch(f=>{throw console.error(`Faild Promise ${f}`),Error(`Faild Promise ${f}`)});return e.attributes.name&&(Xr.setType({local:e.attributes.name,namespace:n},u),Yr.setType({local:e.attributes.name,namespace:n},u)),u}else if(l[0].name.local==="pattern"&&l[0].name.namespace==="http://www.w3.org/2001/XMLSchema"){if(l.length>1)throw Error("When Pettern is used in restriction only one pattern is allowed and nothing else");const u={subSubType:"pattern",subType:"restriction",type:"simpleType",pattern:new RegExp(l[0].attributes.value)};return e.attributes.name&&(u.name={local:e.attributes.name,namespace:n},Xr.setType({local:e.attributes.name,namespace:n},u),Yr.setType({local:e.attributes.name,namespace:n},u)),u}else if((l[0].name.local==="maxExclusive"||l[0].name.local==="maxInclusive"||l[0].name.local==="minExclusive"||l[0].name.local==="minInclusive")&&l[0].name.namespace==="http://www.w3.org/2001/XMLSchema"){const u=(i=l.filter(p=>p.name.local==="minExclusive"&&p.name.namespace==="http://www.w3.org/2001/XMLSchema")[0])==null?void 0:i.attributes.value,f=(t=l.filter(p=>p.name.local==="maxExclusive"&&p.name.namespace==="http://www.w3.org/2001/XMLSchema")[0])==null?void 0:t.attributes.value,o=(r=l.filter(p=>p.name.local==="minInclusive"&&p.name.namespace==="http://www.w3.org/2001/XMLSchema")[0])==null?void 0:r.attributes.value,s=(a=l.filter(p=>p.name.local==="maxInclusive"&&p.name.namespace==="http://www.w3.org/2001/XMLSchema")[0])==null?void 0:a.attributes.value;let m=0;if(u&&m++,f&&m++,o&&m++,s&&m++,l.length!=m)throw Error("min max is not allowed with other elements.");const h={subSubType:"Number",subType:"restriction",type:"simpleType",minExclusive:u?parseInt(u):void 0,maxExclusive:f?parseInt(f):void 0,minInclusive:o?parseInt(o):void 0,maxInclusive:s?parseInt(s):void 0};return e.attributes.name&&(h.name={local:e.attributes.name,namespace:n},Xr.setType({local:e.attributes.name,namespace:n},h),Yr.setType({local:e.attributes.name,namespace:n},h)),h}else throw Error("Unknown simple Restriction")}else if(c.name.local==="union"&&c.name.namespace==="http://www.w3.org/2001/XMLSchema"){const l=(0,He.makePromise)(async u=>{const f=(0,He.filterUndefined)(c.children.map(h=>ra(h,n))),o=c.attributes.memberTypes,s=typeof o=="undefined"?f:f.concat(await Xr.getType((0,cn.getTagname)(o,e.scope))),m={type:"simpleType",subType:"union",unions:s};e.attributes.name&&(m.name={local:e.attributes.name,namespace:n}),u(m)},"simpletype");return e.attributes.name&&(Xr.setType({local:e.attributes.name,namespace:n},l),Yr.setType({local:e.attributes.name,namespace:n},l)),l}}else return}function Ms(e,n,i){var t;if(e.name.local==="attribute"&&e.name.namespace==="http://www.w3.org/2001/XMLSchema"){e.scope||console.error(`scope is undefined ${JSON.stringify(e,void 0," ")}`);const r={local:e.attributes.name,namespace:n};if(e.attributes.ref)return Ul.getType((0,cn.getTagname)(e.attributes.ref,e.scope));{const a=(t=e.attributes.use)!=null?t:"optional";if(a==="prohibited")return;let c=(0,He.makePromise)(async u=>{if(e.attributes.type){const s=(0,cn.getTagname)(e.attributes.type,e.scope),m=await(0,He.waitAll)(Xr.getType(s));u(m);return}const o=(await Promise.all(e.children.map(async s=>await ra(s,n)))).filter(s=>s)[0];if(o){u(await(0,He.waitAll)(o));return}u(await(0,He.waitAll)(Xr.getType({local:"string",namespace:"http://www.w3.org/2001/XMLSchema"})))},"getAttribute").catch(u=>{throw console.error(`Faild Promise ${u}`),Error(`Faild Promise ${u}`)});const l={default:e.attributes.default,name:r,type:"attribute",optional:a==="optional",simpleType:c};return i&&Ul.setType(r,l),l}}else return}function mi(e,n){return(0,He.makePromise)(async t=>{const r=await(0,He.waitAll)((0,He.filterUndefined)(e.map(c=>Ms(c,n,!1)))),a=(await(0,He.waitAll)((0,He.filterUndefined)(e.map(c=>Ts(c,n,!1))))).flatMap(c=>c);t(r.concat(a))},"getAttributes").catch(t=>{throw console.error(`Faild Promise ${t}`),Error(`Faild Promise ${t}`)})}function Ts(e,n,i){if(e.name.local==="attributeGroup"&&e.name.namespace==="http://www.w3.org/2001/XMLSchema"){if(e.attributes.ref)return Vl.getType((0,cn.getTagname)(e.attributes.ref,e.scope));{const t={local:e.attributes.name,namespace:n},r=(0,He.makePromise)(async a=>{const c=await(0,He.waitAll)((0,He.filterUndefined)(e.children.map(u=>Ms(u,n,!1)))),l=(await(0,He.waitAll)((0,He.filterUndefined)(e.children.map(u=>Ts(u,n,!1))))).flatMap(u=>u);a(c.concat(l))},"getAttributeGrupe").catch(a=>{throw console.error(`Faild Promise ${a}`),Error(`Faild Promise ${a}`)});return i&&Vl.setType(t,r),r}}else return}var na={};Object.defineProperty(na,"__esModule",{value:!0});na.generateTypes=void 0;const l5=kr;async function f5(e,n){let i=1;await(0,l5.visitor)(e,(r,a)=>{r=="name"&&a.local&&a.namespace&&(a.id=`\u03B9\u03B4${i++}\u03B5`)});const t={};for(const r of e)gr(r,!0,t,n!=null?n:a=>`${a.local}_\u2115${a.namespace.replaceAll(":","_\u03B1_").replaceAll("/","_\u03B9_").replaceAll(".","_\u03C3_").replaceAll("-","_\u03C4_")}`);return t["SubArray<T>"]=`
    {
        [Property in keyof T]-?: T[Property] extends Array<infer K>
        ? T[Property] | undefined
        : Array<T[Property]> | undefined;
    }
`,t}na.generateTypes=f5;function m5(e,n,i){const t=op(e);if(!n[t]&&(n[t]="X",e!==void 0)){const r=gr(e,!1,n,i);let a=`_${e.name.local}`,c=0;for(;n[a];)a=`_${e.name.local}`+ ++c;n[a]=t,e.name.root&&(n[i(e.name)]=t),n[t]=r}}function gr(e,n,i,t,r){if(typeof e=="undefined")return"{}";const a=e;if(a.name&&n)return i[a.name.id]||m5(a,i,t),"("+op(a)+(r&&e.type==="element"?`& {"#": "${e.name.local}"}`:"")+")";if(e.type==="attribute"){const c="("+gr(e.simpleType,!0,i,t)+")"+(e.optional&&e.default==null?" | undefined":"");return`{${e.name.local}: ${c}}`}else if(e.type==="element"){const c=e.occurence.maxOccurance==="unbounded"||e.occurence.maxOccurance>1?"[]":e.occurence.minOccurance===0?" | undefined":"",l="("+gr(e.content,!0,i,t)+")";let u=`_${e.name.local}`,f=0;for(;i[u];)u=`_${e.name.local}`+ ++f;return i[u]=l,`({ ${e.name.local}: ${u+c}}`+(r?`& {"#": "${e.name.local}"}`:"")+")"}else if(e.type==="simpleType"){if(e.subType==="native")return e.base;if(e.subType==="union")return e.unions.map(c=>gr(c,!0,i,t)).reduce((c,l)=>c===""?l:`${c} | ${l} `,"");if(e.subType==="list")throw Error("List is not yet supported");if(e.subType==="restriction"){if(e.subSubType==="enumeration")return e.values.map(c=>typeof c=="string"?`'${c}'`:c).reduce((c,l)=>c===""?l:`${c} | ${l} `,"");if(e.subSubType==="Number")return"number";if(e.subSubType==="pattern")return"string";if(e.subSubType==="simple")return gr(e.baseType,!0,i,t)}}else if(e.type==="complexType"){const c=gr(e.content,!0,i,t),l=e.attributes.map(u=>gr(u,!0,i,t)).reduce((u,f)=>u===""?f:`${u} & ${f}`,"");return l===""?c:c===""?l:`${c} & ${l}`}else if(e.type==="all"){if((e.occurence.maxOccurance==="unbounded"||e.occurence.maxOccurance>1)&&e.content.length>1)throw Error("Currently can`t handle more then one content in an all with occurance higher then 1");return e.content.map(c=>gr(c,!0,i,t)).reduce((c,l)=>c===""?l:`${c} & ${l}`,"")}else{if(e.type==="choise")return e.occurence.maxOccurance==="unbounded"||e.occurence.maxOccurance>1?"("+e.content.map(c=>gr(c,!0,i,t)).reduce((c,l)=>c===""?`SubArray<${l}>`:`${c} & SubArray<${l}>`,"")+")":e.content.map(c=>gr(c,!0,i,t,!0)).reduce((c,l)=>c===""?l:`${c} | ${l}`,"");if(e.type==="sequence"){if((e.occurence.maxOccurance==="unbounded"||e.occurence.maxOccurance>1)&&e.content.length>1)throw Error(`Currently can't handle more then one content in an sequence with occurance higher then 1 ${JSON.stringify([e.content.length,e.occurence])}`);return e.content.map(c=>gr(c,!0,i,t)).reduce((c,l)=>c===""?l:`${c} & ${l}`,"")}else{if(e.type==="simpleContent")return e.attributes.length==0?gr(e.base,!0,i,t):`{meta:${e.attributes.map(l=>gr(l,!0,i,t)).reduce((l,u)=>l===""?u:`${l} & ${u}`,"")}, value :${gr(e.base,!0,i,t)}}`;if(e.type==="complexContent")return e.attributes.map(l=>gr(l,!0,i,t)).concat(gr(e.base,!0,i,t),gr(e.content,!0,i,t)).reduce((l,u)=>l===""?u:`${l} & ${u}`,"")}}throw Error("Not supported type"+JSON.stringify(e))}function op(e){return e.name.id}var ta={};Object.defineProperty(ta,"__esModule",{value:!0});ta.Parser=void 0;const h5=un;class p5{constructor(n){at(this,"element");this.element=n}parse(n){return typeof n=="string"?this.parse((0,h5.parseXml)(n)):this.parseElement(n,this.element)}parseUnknown(n,i){if(i.type==="element")return this.parseElement(n,i);if(i.type==="simpleType")return this.parseSimpleType(n,i);if(i.type==="complexType")return this.parseComplexType(n,i)}parseElement(n,i){if(typeof n=="undefined"||n.name.local!==i.name.local||n.name.namespace!==i.name.namespace)return null;const t={};return t[i.name.local]=i.content?this.parseUnknown(n,i.content):{},t}parseChoiceType(n,i,t){const r=(a,c,l)=>{let u=null,f=l.index;for(let o=0;o<c.content.length;o++){const s=c.content[o];if(s.type==="element")if(s.occurence.maxOccurance==="unbounded"||s.occurence.maxOccurance>1){let m=0,h=null;for(;;){const g=this.parseElement(a.children[f],s);if(g===null||m>s.occurence.maxOccurance)break;if(h==null){const w=Object.keys(g)[0];h={},h[w]=[]}const y=Object.keys(g)[0];f++,m++,h[y]=[...h[y],g[y]]}if(h==null)continue;const p=Object.keys(h)[0];if(h[p].length<s.occurence.minOccurance)continue;u=Te(Te({},u),h);break}else{const m=this.parseElement(a.children[f],s);if(m===null)continue;f++;const h=Object.keys(m);if(h.length==1){const p=h[0];m["#"]=p}u=m;break}else if(s.type==="all"){const m={index:f},h=this.parseAllType(a,s,m);if(h===null)continue;f=m.index,u=h;break}else if(s.type==="choise"){const m={index:f},h=this.parseChoiceType(a,s,m);if(h===null)continue;f=m.index,u=h;break}else if(s.type==="sequence"){const m={index:f},h=this.parseSequenceType(a,s,m);if(h===null)continue;f=m.index,u=h;break}}return u!=null&&(l.index=f),u};if(i.occurence.maxOccurance==="unbounded"||i.occurence.maxOccurance>1){const a={};for(;;){const l=r(n,i,t);if(l!==null)for(const f of Object.keys(l))typeof a[f]=="undefined"&&(a[f]=[]),a[f].push(l[f]);const u=Object.values(a).map(f=>f.length).reduce((f,o)=>f+o,0);if(l===null||u===i.occurence.maxOccurance)break}const c=Object.entries(a).filter(([l])=>l!=="#").map(l=>l[1].length).reduce((l,u)=>l+u,0);return c<i.occurence.minOccurance||c>i.occurence.maxOccurance?null:a}else if(i.occurence.minOccurance===0){const a=r(n,i,t);return a===null?{}:a}else return r(n,i,t)}parseSequenceType(n,i,t){let r={},a=t.index;for(let c=0;c<i.content.length;c++){const l=i.content[c];if(l.type==="element")if(l.occurence.maxOccurance==="unbounded"||l.occurence.maxOccurance>1){let u=0,f=null;for(;;){const s=this.parseElement(n.children[a],l);if(s===null||u>l.occurence.maxOccurance)break;if(f==null){const h=Object.keys(s)[0];f={},f[h]=[]}const m=Object.keys(s)[0];a++,u++,f[m]=[...f[m],s[m]]}if(f==null){const s={};s[l.name.local]=[],r=Te(Te({},r),s);continue}const o=Object.keys(f)[0];if(f[o].length<l.occurence.minOccurance)continue;r=Te(Te({},r),f);continue}else{const u=this.parseElement(n.children[a],l);if(u===null){if(l.occurence.minOccurance==0)continue;return null}a++,r=Te(Te({},r),u)}else if(l.type==="all"){const u={index:a},f=this.parseAllType(n,l,u);if(f===null)return null;a=u.index,r=Te(Te({},r),f)}else if(l.type==="choise"){const u={index:a},f=this.parseChoiceType(n,l,u);if(f===null)return null;a=u.index,r=Te(Te({},r),f)}else if(l.type==="sequence"){const u={index:a},f=this.parseSequenceType(n,l,u);if(f===null)return null;a=u.index,r=Te(Te({},r),f)}}return t.index=a,r}parseAllType(n,i,t){let r={},a=t.index;for(let c=0;c<i.content.length;c++){const l=i.content[c];if(l.type==="element")if(l.occurence.maxOccurance==="unbounded"||l.occurence.maxOccurance>1){let u=0,f=null;for(;;){const s=this.parseElement(n.children[a],l);if(s===null||u>l.occurence.maxOccurance)break;if(f==null){const h=Object.keys(s)[0];f={},f[h]=[]}const m=Object.keys(s)[0];a++,u++,f[m]=[...f[m],s[m]]}if(f==null)continue;const o=Object.keys(f)[0];if(f[o].length<l.occurence.minOccurance)continue;r=Te(Te({},r),f);continue}else{const u=this.parseElement(n.children[a],l);if(u===null)return null;a++,r=Te(Te({},r),u)}else if(l.type==="all"){const u={index:a},f=this.parseAllType(n,l,u);if(f===null)return null;a=u.index,r=Te(Te({},r),f)}else if(l.type==="choise"){const u={index:a},f=this.parseChoiceType(n,l,u);if(f===null)return null;a=u.index,r=Te(Te({},r),f)}else if(l.type==="sequence"){const u={index:a},f=this.parseSequenceType(n,l,u);if(f===null)return null;a=u.index,r=Te(Te({},r),f)}}return t.index=a,r}parseComplexType(n,i){let t={};if(typeof i.content!="undefined"){if(i.content.type==="simpleContent")return this.parseSimpleContent(n,i.content);if(i.content.type==="complexContent")return this.parseComplexContent(n,i.content);if(i.content.type==="all"){const r=this.parseAllType(n,i.content,{index:0});if(r===null)return null;t=Te(Te({},r),t)}else if(i.content.type==="choise"){const r=this.parseChoiceType(n,i.content,{index:0});if(r===null)return null;t=Te(Te({},r),t)}else if(i.content.type==="sequence"){const r=this.parseSequenceType(n,i.content,{index:0});if(r===null)return null;t=Te(Te({},r),t)}}for(const r of i.attributes){const a=n.attributes[r.name.local];let c=typeof r.simpleType=="undefined"?a:this.parseSimpleType(a,r.simpleType);if(c===null){if(r.default!==void 0)c=r.default;else if(!r.optional)return console.log(`Missing required attribute ${JSON.stringify(r)}
	${JSON.stringify(n.attributes)}`),null}c!==null&&(t[r.name.local]=c)}return t}parseSimpleContent(n,i){const t=i.base.type==="simpleType"?this.parseSimpleType(n,i.base):this.parseComplexType(n,i.base);if(i.attributes.length==0)return t;{const r={};for(const a of i.attributes){const c=n.attributes[a.name.local];let l=typeof a.simpleType=="undefined"?c:this.parseSimpleType(c,a.simpleType);if(l===null){if(a.default!==void 0)l=a.default;else if(!a.optional)return console.log(`Missing required attribute ${JSON.stringify(a)}
	${JSON.stringify(n.attributes)}`),null}l!==null&&(r[a.name.local]=l)}return{meta:r,value:t}}}parseComplexContent(n,i){const t=i.base.type==="simpleType"?this.parseSimpleType(n,i.base):this.parseComplexType(n,i.base);let r={};if(i.content){if(i.content.type==="all"){const c=this.parseAllType(n,i.content,{index:0});if(c===null)return null;r=Te(Te({},c),r)}else if(i.content.type==="choise"){const c=this.parseChoiceType(n,i.content,{index:0});if(c===null)return null;r=Te(Te({},c),r)}else if(i.content.type==="sequence"){const c=this.parseSequenceType(n,i.content,{index:0});if(c===null)return null;r=Te(Te({},c),r)}}const a={};for(const c of i.attributes){const l=n.attributes[c.name.local];let u=typeof c.simpleType=="undefined"?l:this.parseSimpleType(l,c.simpleType);if(u===null){if(c.default!==void 0)u=c.default;else if(!c.optional)return console.log(`Missing required attribute ${JSON.stringify(c)}
	${JSON.stringify(n.attributes)}`),null}u!==null&&(a[c.name.local]=u)}return Te(Te(Te({},r),a),t)}parseSimpleType(n,i){if(typeof n=="undefined")return null;const t=typeof n=="string"?n:n.text;if(typeof t=="undefined")throw Error("should not hapen?"+JSON.stringify(n));if(i.subType==="list")throw Error("List is not implemented");if(i.subType==="native"){if(i.base)if(i.base==="boolean"){const r=Gl(t);return typeof r=="undefined"?null:r}else return i.base==="number"&&ga(t)?parseFloat(t):i.base==="string"?t:null}else if(i.subType==="restriction")if(i.subSubType==="Number"){if(!ga(t))return null;const r=parseFloat(t);return typeof i.maxInclusive!="undefined"&&r>i.maxInclusive||typeof i.maxExclusive!="undefined"&&r>=i.maxExclusive||typeof i.minExclusive!="undefined"&&r<=i.minExclusive||typeof i.minInclusive!="undefined"&&r<i.minInclusive?null:r}else if(i.subSubType==="enumeration"){const r=this.getTypeOfSimpleType(i.baseType);if(r==="boolean"){const a=Gl(t);return typeof a=="undefined"||!i.values.includes(a)?null:a}else if(r==="number"){if(!ga(t))return null;const a=parseFloat(t);return!i.values.includes(a)&&!i.values.includes(t)?null:a}else if(r==="string")return i.values.includes(t)?t:null}else{if(i.subSubType==="pattern")return i.pattern.test(t)?t:null;if(i.subSubType==="simple")return this.parseSimpleType(n,i.baseType)}else if(i.subType==="union"){for(let r=0;r<i.unions.length;r++){const a=i.unions[r],c=this.parseSimpleType(n,a);if(c!==null)return c}return null}throw Error("unsupported?")}getTypeOfSimpleType(n){if(n.subType==="list")throw Error("List is not implemented");if(n.subType==="native")return n.base;if(n.subType==="restriction"){if(n.subSubType==="Number")return"number";if(n.subSubType==="enumeration")return this.getTypeOfSimpleType(n.baseType);if(n.subSubType==="pattern")return"string";if(n.subSubType==="simple")return this.getTypeOfSimpleType(n.baseType)}else if(n.subType==="union"){for(let i=0;i<n.unions.length;i++){const t=[...new Set(n.unions.map(r=>this.getTypeOfSimpleType(r)))];if(t.length!==1)throw Error("Not support union with diferent types. yet...");return t[0]}throw Error("Not support union with no types. yet...")}throw Error("unsupported?")}}ta.Parser=p5;function Gl(e){if((e==null?void 0:e.toLocaleLowerCase())==="true"||(e==null?void 0:e.toLocaleLowerCase())==="false")return e.toLocaleLowerCase()==="true"}function ga(e){return typeof e!="string"?!1:!isNaN(e)&&!isNaN(parseFloat(e))}var g5=zr&&zr.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(Sn,"__esModule",{value:!0});Sn.toTsTypes=up=Sn.Parser=Sn.generateTypes=Sn.parseSchemas=void 0;const d5=g5(vs),v5=na,b5=ta;Sn.parseSchemas=d5.default;Sn.generateTypes=v5.generateTypes;var up=Sn.Parser=b5.Parser;function y5(e){return Object.entries(e).sort((n,i)=>n[0].localeCompare(i[0])).map(n=>` ${n[0].startsWith("\u03B9")?"":"export"} type ${n[0]} = ${n[1]}
`).reduce((n,i)=>n+`
`+i,`/* eslint-disable @typescript-eslint/ban-types */

`)}Sn.toTsTypes=y5;var x5=`<?xml version='1.0'?>
<!-- This file represents a fragment of a book store inventory database -->
<Daten Version='1' xmlns='https://nota-game.github.io/schema/vNext/nota.xsd' xmlns:nota='https://nota-game.github.io/schema/vNext/nota.xsd' xmlns:misc='https://nota-game.github.io/schema/vNext/misc.xsd' xmlns:lebewesen="https://nota-game.github.io/schema/vNext/lebewesen.xsd" xmlns:pfad="https://nota-game.github.io/schema/vNext/pfad.xsd" xmlns:talent="https://nota-game.github.io/schema/vNext/talent.xsd" xmlns:fertigkeit="https://nota-game.github.io/schema/vNext/fertigkeit.xsd" xmlns:besonderheit="https://nota-game.github.io/schema/vNext/besonderheit.xsd" xmlns:Belastung="https://nota-game.github.io/schema/vNext/kampf/aktionen.xsd" xmlns:ausstattung="https://nota-game.github.io/schema/vNext/kampf/ausstattung.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="https://nota-game.github.io/schema/vNext/nota.xsd ../../nota-schema/nota.xsd https://nota-game.github.io/schema/vNext/lebewesen.xsd ../../nota-schema/Lebewesen.xsd https://nota-game.github.io/schema/vNext/pfad.xsd ../../nota-schema/pfad.xsd https://nota-game.github.io/schema/vNext/talent.xsd ../../nota-schema/talent.xsd https://nota-game.github.io/schema/vNext/fertigkeit.xsd ../../nota-schema/fertigkeit.xsd https://nota-game.github.io/schema/vNext/besonderheit.xsd ../../nota-schema/besonderheit.xsd https://nota-game.github.io/schema/vNext/kampf/aktionen.xsd ../../nota-schema/kampf/aktionen.xsd https://nota-game.github.io/schema/vNext/kampf/ausstattung.xsd ../../nota-schema/kampf/ausstattung.xsd https://nota-game.github.io/schema/vNext/misc.xsd ../../nota-schema/misc.xsd">
  <!-- xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="https://nota-game.github.io/schema/vNext/nota.xsd https://nota-game.github.io/schema/vNext/nota.xsd https://nota-game.github.io/schema/vNext/misc.xsd https://nota-game.github.io/schema/vNext/misc.xsd https://nota-game.github.io/schema/vNext/wesen.xsd https://nota-game.github.io/schema/vNext/wesen.xsd https://nota-game.github.io/schema/vNext/pfad.xsd https://nota-game.github.io/schema/vNext/pfad.xsd https://nota-game.github.io/schema/vNext/profession.xsd https://nota-game.github.io/schema/vNext/profession.xsd https://nota-game.github.io/schema/vNext/talent.xsd https://nota-game.github.io/schema/vNext/talent.xsd https://nota-game.github.io/schema/vNext/fertigkeit.xsd https://nota-game.github.io/schema/vNext/fertigkeit.xsd https://nota-game.github.io/schema/vNext/besonderheit.xsd https://nota-game.github.io/schema/vNext/besonderheit.xsd https://nota-game.github.io/schema/vNext/kampf/aktionen.xsd https://nota-game.github.io/schema/vNext/kampf/aktionen.xsd https://nota-game.github.io/schema/vNext/kampf/ausstattung.xsd https://nota-game.github.io/schema/vNext/kampf/ausstattung.xsd" -->
  <!--<Pfade>
    <PfadAuswahl Id="G\xF6tter">
      <misc:Name>
        <misc:Lokalisirung Sprache="de"><![CDATA[G\xF6tter]]></misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de"><![CDATA[Der Gott dem der Charakter gewidmet ist.]]></misc:Lokalisirung>
      </misc:Beschreibung>
      <Pfad Id="Alsa">
        <misc:Name>
          <misc:Lokalisirung Sprache="de"><![CDATA[Alsa]]></misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de"><![CDATA[Der Charakter ist ein Diener des Gottes Alsa.]]></misc:Lokalisirung>
        </misc:Beschreibung>
        <Modifikationen>
          <Besonderheiten xmlns="https://nota-game.github.io/schema/vNext/lebewesen.xsd">
            <besonderheit:Besonderheit Id="Auserw\xE4hlter"/>
            <besonderheit:Besonderheit Id="Auserw\xE4hlter Alsas"/>
          </Besonderheiten>
        </Modifikationen>
      </Pfad>
    </PfadAuswahl>
  </Pfade>-->
  <KostenDefinitionen xmlns="https://nota-game.github.io/schema/vNext/misc.xsd">
    <KostenDefinition Id="GP">
      <misc:Name>
        <Lokalisirung Sprache="de">
        Generierungspunkte
      </Lokalisirung>
      </misc:Name>
      <Abk\xFCrzung>
        <Lokalisirung Sprache="de">
        GP
      </Lokalisirung>
      </Abk\xFCrzung>

      <misc:Beschreibung>
        <Lokalisirung Sprache="de">
        Ein abstraktes Ma\xDF zur generierung der Charaktere.
      </Lokalisirung>
      </misc:Beschreibung>
    </KostenDefinition>
    <misc:KostenDefinition Id="Eigenschaften">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Eigenschaftspunkte]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Abk\xFCrzung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[EiP]]>
        </misc:Lokalisirung>
      </misc:Abk\xFCrzung>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Die Anzahl an Punkte die in Eigenschaften gesteckt werden kann]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
    </misc:KostenDefinition>
    <KostenDefinition Id="EP" StandardKosten="true">
      <misc:Name>
        <Lokalisirung Sprache="de">
          Erfahrungspunkte
        </Lokalisirung>
      </misc:Name>
      <Abk\xFCrzung>
        <Lokalisirung Sprache="de">
          EP
        </Lokalisirung>
      </Abk\xFCrzung>

      <misc:Beschreibung>
        <Lokalisirung Sprache="de">
          Die Erfahrung die ein Charakter bereits gesammelt hat.
        </Lokalisirung>
      </misc:Beschreibung>
    </KostenDefinition>
    <misc:KostenDefinition Id="Kultur">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">Kulturpunkte</misc:Lokalisirung>
      </misc:Name>
      <misc:Abk\xFCrzung>
        <misc:Lokalisirung Sprache="de">KuP</misc:Lokalisirung>
      </misc:Abk\xFCrzung>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
            Das abstrakte ma\xDF in wie weit jemand aus einer Kultur lernen konte
          </misc:Lokalisirung>
      </misc:Beschreibung>
    </misc:KostenDefinition>
    <misc:KostenDefinition Id="Alter">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">Alterspunkte</misc:Lokalisirung>
      </misc:Name>
      <misc:Abk\xFCrzung>
        <misc:Lokalisirung Sprache="de">AlP</misc:Lokalisirung>
      </misc:Abk\xFCrzung>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
            Das ma\xDF in dem jemand gealtert ist, in erster linie kommen mit dem Alter zus\xE4tzliche komplikationen
          </misc:Lokalisirung>
      </misc:Beschreibung>
    </misc:KostenDefinition>
    <misc:TalentKostenFunktion KostenArt="EP" ResultType="differenz">
      ceil(KOMPLEXIT\xC4T_NUM * ((1689/80000)  LEVEL ^ 2 + (1888/2000)  LEVEL + (0)  ))
    </misc:TalentKostenFunktion>
  </KostenDefinitionen>
  <GenerierungsDaten MinimumVerbreitung="3">
    <misc:Kosten Id="GP" Wert="74" />
    <misc:Kosten Id="Eigenschaften" Wert="54" />
  </GenerierungsDaten>
  <Organismen xmlns="https://nota-game.github.io/schema/vNext/lebewesen.xsd">
    <EigenschaftsKosten>
      <Abschnitt von="1" bis="6">
        <misc:Kosten Id="GP" Wert="1" />
        <misc:Kosten Id="Eigenschaften" Wert="1" />
      </Abschnitt>
      <Abschnitt von="-1" bis="-2">
        <misc:Kosten Id="GP" Wert="-3" />
      </Abschnitt>
      <Abschnitt von="7" bis="7">
        <misc:Kosten Id="GP" Wert="5" />
      </Abschnitt>
      <Abschnitt von="8" bis="8">
        <misc:Kosten Id="GP" Wert="10" />
      </Abschnitt>
    </EigenschaftsKosten>
    <Gattung Id="Homo">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Homo]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Die Gattung der Menschen]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Eigenschaften>
        <Mut Durchschnitt="9" Start="13" />
        <Gl\xFCck Durchschnitt="9" Start="13" />
        <Klugheit Durchschnitt="9" Start="13" />
        <Intuition Durchschnitt="9" Start="13" />
        <Gewandtheit Durchschnitt="9" Start="13" />
        <Feinmotorik Durchschnitt="9" Start="13" />
        <Sympathie Durchschnitt="9" Start="13" />
        <Antipathie Durchschnitt="9" Start="13" />
        <St\xE4rke Durchschnitt="9" Start="13" />
        <Konstitution Durchschnitt="9" Start="13" />
        <Fokus Durchschnitt="9" Start="13" />
        <Einfluss Durchschnitt="9" Start="13" />
      </Eigenschaften>

      <!-- Gewicht / Gr\xF6\xDFe refernz
   https://www.rki.de/DE/Content/Gesundheitsmonitoring/Gesundheitsberichterstattung/GBEDownloadsB/KiGGS_Referenzperzentile.pdf?__blob=publicationFile -->
      <Art Id="Imp">
        <misc:Name>
          <misc:Lokalisirung Sprache="de" Geschlecht="M\xE4nlich">
            <![CDATA[Imp]]>
          </misc:Lokalisirung>
          <misc:Lokalisirung Sprache="de" Geschlecht="Weiblich">
            <![CDATA[Impa]]>
          </misc:Lokalisirung>
        </misc:Name>
        <Art>
          <misc:Lokalisirung Sprache="de" Geschlecht="M\xE4nlich">
            <![CDATA[Primus]]>
          </misc:Lokalisirung>
        </Art>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Imps geh\xF6ren zu den kleineren Arten der Gattung Mensch. Trotz ihrer geingen Gr\xF6\xDFe \xFCbersteigt ihre St\xE4rke oft die der andenen Arten.

Ihre Hautfarbe reicht von blass rosa bis zu Ash grau, wenn sie starker Sonnenstrahlung ausgestzt sind. Sie besitzen zwei H\xF6rner oberhalb der Schl\xE4fen etwas h\xF6her als der Haaransatz. Die H\xF6rer stehen etwas seitlich ab und erreichen beim erwachsenem ca. 5 bis 6 cm.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <lebewesen:Mods>
          <misc:Eigenschaften>
            <lebewesen:Kraft Mod='1.6' Type='multiplikativ' />

          </misc:Eigenschaften>
        </lebewesen:Mods>
        <Morphe>
          <Morph Id="Mann" Geschlecht="M\xE4nlich">
            <misc:Name>
              <misc:Lokalisirung Sprache="de">
                <![CDATA[Mann]]>
              </misc:Lokalisirung>
            </misc:Name>
            <misc:Beschreibung>
              <misc:Lokalisirung Sprache="de">
                <![CDATA[]]>
              </misc:Lokalisirung>
            </misc:Beschreibung>
            <StandardPfade>
              <pfad:Pfad Id="Alan" />
            </StandardPfade>
            <lebewesen:Entwiklung>
              <lebewesen:Reihe id="gr\xF6\xDFe" einheit="m">
                <misc:Name>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[Gr\xF6\xDFe]]>
                  </misc:Lokalisirung>
                </misc:Name>
                <lebewesen:Spalte Quantil="10">
                  <lebewesen:Wert>1</lebewesen:Wert>
                </lebewesen:Spalte>
              </lebewesen:Reihe>
            </lebewesen:Entwiklung>
            <Lebensabschnitte>
              <Lebensabschnitt Id="ImpM1" startAlter="12" endAlter="13" minGr\xF6\xDFe="1.41" maxGr\xF6\xDFe="1.56" minBMI="15" maxBMI="21">
                <Spielbar>
                  <misc:Kosten Id="Kultur" Wert="-75" />
                </Spielbar>
                <Name>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[Herranwchsender]]>
                  </misc:Lokalisirung>
                </Name>
                <lebewesen:Beschreibung>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[]]>
                  </misc:Lokalisirung>
                </lebewesen:Beschreibung>
                <Mods>
                  <misc:Eigenschaften>
                    <lebewesen:Gl\xFCck Mod='3' />
                    <lebewesen:Mut Mod='1' />
                  </misc:Eigenschaften>
                </Mods>
              </Lebensabschnitt>
              <Lebensabschnitt Id="ImpM2" startAlter="13" endAlter="14" minGr\xF6\xDFe="1.41" maxGr\xF6\xDFe="1.56" minBMI="15" maxBMI="21">
                <Spielbar>
                  <misc:Kosten Id="Kultur" Wert="-80" />
                </Spielbar>
                <Name>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[Herranwchsender]]>
                  </misc:Lokalisirung>
                </Name>
                <Beschreibung>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[]]>
                  </misc:Lokalisirung>
                </Beschreibung>
              </Lebensabschnitt>
              <Lebensabschnitt Id="M3" startAlter="14" endAlter="15" minGr\xF6\xDFe="1.41" maxGr\xF6\xDFe="1.56" minBMI="15" maxBMI="21">
                <Spielbar>
                  <misc:Kosten Id="Kultur" Wert="-90" />
                </Spielbar>
                <Name>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[Herranwchsender]]>
                  </misc:Lokalisirung>
                </Name>
                <Beschreibung>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[]]>
                  </misc:Lokalisirung>
                </Beschreibung>
              </Lebensabschnitt>
              <Lebensabschnitt Id="M4" startAlter="16" endAlter="18" minGr\xF6\xDFe="1.41" maxGr\xF6\xDFe="1.56" minBMI="15" maxBMI="21">
                <Spielbar>
                  <misc:Kosten Id="Kultur" Wert="-100" />
                </Spielbar>
                <Name>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[Junger Erwachsener]]>
                  </misc:Lokalisirung>
                </Name>
                <Beschreibung>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[]]>
                  </misc:Lokalisirung>
                </Beschreibung>
              </Lebensabschnitt>
              <Lebensabschnitt Id="M5" startAlter="18" endAlter="21" minGr\xF6\xDFe="1.41" maxGr\xF6\xDFe="1.56" minBMI="15" maxBMI="21">
                <Spielbar>
                  <misc:Kosten Id="Kultur" Wert="-100" />
                </Spielbar>
                <Name>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[Junger Erwachsener]]>
                  </misc:Lokalisirung>
                </Name>
                <Beschreibung>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[]]>
                  </misc:Lokalisirung>
                </Beschreibung>
              </Lebensabschnitt>
              <Lebensabschnitt Id="M6" startAlter="21" endAlter="25" minGr\xF6\xDFe="1.41" maxGr\xF6\xDFe="1.56" minBMI="15" maxBMI="21">
                <Spielbar>
                  <misc:Kosten Id="Kultur" Wert="-110" />
                </Spielbar>
                <Name>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[Junger Erwachsener]]>
                  </misc:Lokalisirung>
                </Name>
                <Beschreibung>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[]]>
                  </misc:Lokalisirung>
                </Beschreibung>
              </Lebensabschnitt>
              <Lebensabschnitt Id="M7" startAlter="25" endAlter="30" minGr\xF6\xDFe="1.41" maxGr\xF6\xDFe="1.56" minBMI="15" maxBMI="21">
                <Spielbar>
                  <misc:Kosten Id="Kultur" Wert="-120" />
                </Spielbar>
                <Name>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[Erwachsener]]>
                  </misc:Lokalisirung>
                </Name>
                <Beschreibung>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[]]>
                  </misc:Lokalisirung>
                </Beschreibung>
              </Lebensabschnitt>
              <Lebensabschnitt Id="M8" startAlter="30" endAlter="35" minGr\xF6\xDFe="1.41" maxGr\xF6\xDFe="1.56" minBMI="15" maxBMI="21">
                <Spielbar>
                  <misc:Kosten Id="Kultur" Wert="-120" />
                </Spielbar>
                <Name>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[Erwachsener]]>
                  </misc:Lokalisirung>
                </Name>
                <Beschreibung>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[]]>
                  </misc:Lokalisirung>
                </Beschreibung>
              </Lebensabschnitt>
              <Lebensabschnitt Id="M9" startAlter="35" endAlter="40" minGr\xF6\xDFe="1.41" maxGr\xF6\xDFe="1.56" minBMI="15" maxBMI="21">
                <Spielbar>
                  <misc:Kosten Id="Kultur" Wert="-120" />
                </Spielbar>
                <Name>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[Erwachsener]]>
                  </misc:Lokalisirung>
                </Name>
                <Beschreibung>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[]]>
                  </misc:Lokalisirung>
                </Beschreibung>
              </Lebensabschnitt>
            </Lebensabschnitte>
          </Morph>
          <Morph Id="Frau" Geschlecht="Weiblich">
            <misc:Name>
              <misc:Lokalisirung Sprache="de">
                <![CDATA[Frau]]>
              </misc:Lokalisirung>
            </misc:Name>
            <misc:Beschreibung>
              <misc:Lokalisirung Sprache="de">
                <![CDATA[]]>
              </misc:Lokalisirung>
            </misc:Beschreibung>
            <StandardPfade>
              <pfad:Pfad Id="Kirin" />
            </StandardPfade>
            <lebewesen:Entwiklung>
              <lebewesen:Reihe id="gr">
                <misc:Name>
                  <misc:Lokalisirung Sprache="de"></misc:Lokalisirung>
                </misc:Name>
                <lebewesen:Spalte Quantil="1">
                  <lebewesen:Wert>2</lebewesen:Wert>
                </lebewesen:Spalte>
              </lebewesen:Reihe>
            </lebewesen:Entwiklung>
            <Lebensabschnitte>
              <Lebensabschnitt Id="JugendlicherW1" startAlter="0" endAlter="3" minGr\xF6\xDFe="1.44" maxGr\xF6\xDFe="1.58" minBMI="16" maxBMI="21">
                <Spielbar>
                  <misc:Kosten Id="Kultur" Wert="-110" />
                </Spielbar>
                <Name>
                  <misc:Lokalisirung Sprache="de" Geschlecht="Weiblich">
                    <![CDATA[Jugendliche]]>
                  </misc:Lokalisirung>
                </Name>
                <Beschreibung>
                  <misc:Lokalisirung Sprache="de">
                    <![CDATA[]]>
                  </misc:Lokalisirung>
                </Beschreibung>
              </Lebensabschnitt>
            </Lebensabschnitte>
          </Morph>
        </Morphe>
      </Art>
    </Gattung>
  </Organismen>

  <Pfade Id="Kultur" xmlns="https://nota-game.github.io/schema/vNext/pfad.xsd">
    <misc:Name>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Kultur]]>
      </misc:Lokalisirung>
    </misc:Name>
    <misc:Beschreibung>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[W\xE4hle die Kultur des Charakters]]>
      </misc:Lokalisirung>
    </misc:Beschreibung>

    <Pfad Id="Alan">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Alan]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>

      <misc:Levels>
        <misc:Level Id="T"></misc:Level>
      </misc:Levels>
    </Pfad>

    <Pfad Id="Kirin">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Kirin]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <misc:Levels>
        <misc:Level Id="T"></misc:Level>
      </misc:Levels>
    </Pfad>
  </Pfade>

  <pfad:Pfade Id="Proffession">
    <misc:Name>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Proffession]]>
      </misc:Lokalisirung>
    </misc:Name>
    <misc:Beschreibung>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[W\xE4hle die Proffession]]>
      </misc:Lokalisirung>
    </misc:Beschreibung>
    <pfad:Pfad Id="Koch">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Koch]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>

      <misc:Levels>
        <misc:Level Id="Grundlagen">
          <misc:Kosten Id="GP" Wert="2" />
          <misc:Kosten Id="Kultur" Wert="10" />
          <misc:Talent Id="Kochen" EP="20" />
          <misc:Talent Id="Backen" EP="20" />
          <fertigkeit:Fertigkeit Id="Konditor" />
        </misc:Level>
        <misc:Level Id="Erweitert" WiederhoteNutzung="2">
          <misc:Kosten Id="Kultur" Wert="20" />
          <misc:Voraussetzung>
            <misc:LevelVoraussetzung>
              <misc:Level Id="Grundlagen" />
            </misc:LevelVoraussetzung>
          </misc:Voraussetzung>
          <misc:Talent Id="Kochen" EP="20" />
          <misc:Talent Id="Backen" EP="20" />
        </misc:Level>
        <misc:Level Id="Konditor" WiederhoteNutzung="1">
          <misc:Kosten Id="Kultur" Wert="20" />
          <misc:Voraussetzung>
            <misc:LevelVoraussetzung>
              <misc:And>
                <misc:Not>
                  <misc:Level Id="B\xE4cker" />
                </misc:Not>
                <misc:Level Id="Erweitert" mindestVorkommen="2" />
              </misc:And>
            </misc:LevelVoraussetzung>
          </misc:Voraussetzung>
          <misc:Talent Id="Kochen" EP="20" />
          <misc:Talent Id="Backen" EP="20" />
          <fertigkeit:Fertigkeit Id="Konditor" />
        </misc:Level>
        <misc:Level Id="B\xE4cker" WiederhoteNutzung="1">
          <misc:Kosten Id="Kultur" Wert="20" />
          <misc:Voraussetzung>
            <misc:LevelVoraussetzung>
              <misc:And>
                <misc:Not>
                  <misc:Level Id="Konditor" />
                </misc:Not>
                <misc:Level Id="Erweitert" />
              </misc:And>
            </misc:LevelVoraussetzung>
          </misc:Voraussetzung>
          <misc:Talent Id="Kochen" EP="20" />
          <misc:Talent Id="Backen" EP="20" />
          <fertigkeit:Fertigkeit Id="Konditor" />
        </misc:Level>
        <misc:Level Id="Meister">
          <misc:Kosten Id="Kultur" Wert="20" />
          <misc:Voraussetzung>
            <misc:LevelVoraussetzung>
              <misc:Or>
                <misc:Level Id="Konditor" />
                <misc:Level Id="B\xE4cker" />
              </misc:Or>
            </misc:LevelVoraussetzung>
          </misc:Voraussetzung>
          <misc:Talent Id="Kochen" EP="20" />
          <misc:Talent Id="Backen" EP="20" />
          <fertigkeit:Fertigkeit Id="Konditor" />
        </misc:Level>
      </misc:Levels>
    </pfad:Pfad>
    <pfad:Pfad Id="Soldat">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Soldat]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>

      <misc:Levels>
        <misc:Level Id="T" WiederhoteNutzung="2">
          <misc:Kosten Id="GP" Wert="1" />
          <misc:Talent Id="Schwerter" EP="30" />
        </misc:Level>
      </misc:Levels>
    </pfad:Pfad>
  </pfad:Pfade>

  <Pfade Id="G\xF6tter" xmlns="https://nota-game.github.io/schema/vNext/pfad.xsd">
    <misc:Name>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[G\xF6tter]]>
      </misc:Lokalisirung>
    </misc:Name>
    <misc:Beschreibung>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[W\xE4hle den Gott des Charakters]]>
      </misc:Lokalisirung>
    </misc:Beschreibung>
    <Pfad Id="Alsas">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Alsa]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Der Charakter ist ein Diener des Gottes Alsa.]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <misc:Levels>
        <misc:Level Id="T">
          <besonderheit:Besonderheit Id="Auserw\xE4hlter Alsas" />
        </misc:Level>
      </misc:Levels>
    </Pfad>
  </Pfade>

  <!--<Kulturen
    xmlns="https://nota-game.github.io/schema/vNext/kultur.xsd">
    <Kultur Id="Alan">
      <misc:Name>
        <misc:Lokalisirung Sprache="de"><![CDATA[Alan]]></misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de"><![CDATA[]]></misc:Lokalisirung>
      </misc:Beschreibung>
      <Professionen>
        <profession:Profession Id="B\xE4cker"/>
      </Professionen>
      <Levels xmlns="https://nota-game.github.io/schema/vNext/misc">
        <Level Id="2">
          <Bedingungen>
            <LevelVoraussetzung>
              <Level Id="2"/>
            </LevelVoraussetzung>
          </Bedingungen>
          <fertigkeit:Fertigkeit Id="Kulturkunde Alan"/>
        </Level>
      </Levels>
    </Kultur>
  </Kulturen>-->
  <!--<Professionen
    xmlns="https://nota-game.github.io/schema/vNext/profession.xsd">
    <Profession Id="B\xE4cker">
      <misc:Name>
        <misc:Lokalisirung Sprache="de"><![CDATA[B\xE4cker]]></misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de"><![CDATA[]]></misc:Lokalisirung>
      </misc:Beschreibung>
      <Levels xmlns="https://nota-game.github.io/schema/vNext/misc">
        <Level Id="Test3">
          <talent:Talent Id="Backen" Level="3"/>
          <talent:Talent Id="Backen" Level="2"/>
          <talent:Talent Id="Backen" Level="1"/>
        </Level>
        <Level Id="">
          <Bedingungen>
            <LevelVoraussetzung>
              <Level Id="Test3"/>
            </LevelVoraussetzung>
          </Bedingungen>
        </Level>
      </Levels>
    </Profession>
  </Professionen>-->
  <Talente xmlns="https://nota-game.github.io/schema/vNext/talent.xsd" KategorieId="Kampf">
    <talent:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Kampf]]>
      </misc:Lokalisirung>
    </talent:Kategorie>

    <Talent Id="Kampfgesp\xFCr" Komplexit\xE4t="D">
      <Probe>
        <Intuition />
        <Intuition />
        <Fokus />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Kampfgesp\xFCr]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Die f\xE4higkeit im Kampf immer den \xFCberblick zu halten.]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Ausweichen" Anzahl="5" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Stumpfe Hiebwaffen" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <St\xE4rke />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Stumpfe Hiebwaffen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Eine brachiale Waffe die ihre effiktivit\xE4t aus der Kraft des nutzers zieht.]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Einhand\xE4xte" Anzahl="2" />
        <Ableitung Id="Zweihandhiebwaffen" Anzahl="4" />
        <Ableitung Id="Zweihand\xE4xte" Anzahl="5" />
      </Ableitungen>
    </Talent>
    <Talent Id="Einhand\xE4xte" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <St\xE4rke />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Einhand\xE4xte]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Stumpfe Hiebwaffen" Anzahl="2" />
        <Ableitung Id="Zweihandhiebwaffen" Anzahl="4" />
        <Ableitung Id="Zweihand\xE4xte" Anzahl="5" />
      </Ableitungen>
    </Talent>
    <Talent Id="Zweihand\xE4xte" Komplexit\xE4t="B">
      <Probe>
        <St\xE4rke />
        <Mut />
        <Gewandtheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Zweihand\xE4xte]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Zweihandhiebwaffen" Anzahl="2" />
        <Ableitung Id="Stumpfe Hiebwaffen" Anzahl="5" />
        <Ableitung Id="Einhand\xE4xte" Anzahl="4" />

      </Ableitungen>
    </Talent>
    <Talent Id="St\xE4be" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[St\xE4be]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Stangenwaffen" Anzahl="3" />
      </Ableitungen>
    </Talent>


    <Talent Id="Fechtwaffen" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Fechtwaffen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Eine leichte und schnelle Waffe die vorallem auf pr\xE4zision statt kraft setzt.]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Schwerter" Anzahl="3" />
        <Ableitung Id="S\xE4bel" Anzahl="3" />
      </Ableitungen>
    </Talent>
    <Talent Id="Schwerter" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Schwerter]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Das Schwert ist eine einh\xE4ndig gef\xFChrte Hieb- und Stichwaffe mit gerader zweischneidiger Klinge. Im vergleich zum S\xE4bel kann es einfacher R\xFCstungen durschlagen.]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="S\xE4bel" Anzahl="2" />
        <Ableitung Id="Anderthalbh\xE4nder" Anzahl="3" />
      </Ableitungen>
    </Talent>
    <Talent Id="S\xE4bel" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[S\xE4bel]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Der S\xE4bel ist eine leichte Hieb- und Stichwaffe. Der klassische S\xE4bel war gekr\xFCmmt und nur einseitig geschliffen. Meist, mit Ausnahme der Spitze, nur einseitig Gekr\xFCmmt. Stark gekr\xFCmmte S\xE4bel k\xF6nnen aber auch unter Hiebwaffen fallen. Sie veursachen nomalerweise deutlich gr\xF6\xDFere Wunden als Schwerter]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Schwerter" Anzahl="2" />
        <Ableitung Id="Anderthalbh\xE4nder" Anzahl="3" />
      </Ableitungen>
    </Talent>
    <Talent Id="Anderthalbh\xE4nder" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Anderthalbh\xE4nder]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Der Anderthalbh\xE4nder bezeichnet eine Zwischenstufe zwischen dem einh\xE4ndigen und dem zweih\xE4ndigen Schwert.]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="S\xE4bel" Anzahl="2" />
        <Ableitung Id="Schwerter" Anzahl="3" />
        <Ableitung Id="Zweihandschwerter" Anzahl="3" />
      </Ableitungen>
    </Talent>

    <Talent Id="Zweihandschwerter" Komplexit\xE4t="B">
      <Probe>
        <St\xE4rke />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Zweihandschwerter]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Anderthalbh\xE4nder" Anzahl="3" />
        <Ableitung Id="Zweihandhiebwaffen" Anzahl="2" />
        <Ableitung Id="Zweihands\xE4bel" Anzahl="2" />
      </Ableitungen>
    </Talent>
    <Talent Id="Zweihandhiebwaffen" Komplexit\xE4t="B">
      <Probe>
        <St\xE4rke />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Zweihandhiebwaffen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Zweihandschwerter" Anzahl="2" />
        <Ableitung Id="Zweihands\xE4bel" Anzahl="2" />
      </Ableitungen>
    </Talent>
    <Talent Id="Zweihands\xE4bel" Komplexit\xE4t="B">
      <Probe>
        <St\xE4rke />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Zweihands\xE4bel]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Zweihandschwerter" Anzahl="2" />
        <Ableitung Id="Zweihandhiebwaffen" Anzahl="2" />
      </Ableitungen>
    </Talent>

    <Talent Id="Tonfas" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Tonfas]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Waffenlos" Anzahl="3" />
      </Ableitungen>
    </Talent>
    <Talent Id="B\xF6gen" Komplexit\xE4t="B">
      <Probe>
        <Fokus />
        <Pr\xE4zision />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[B\xF6gen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="7" />
        <Ableitung Id="Faustprojektielwaffen" Anzahl="7" />
        <Ableitung Id="Zweihandprojektielwaffen" Anzahl="7" />
      </Ableitungen>
    </Talent>
    <Talent Id="Faustprojektielwaffen" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Fokus />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Faustprojektielwaffen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Gewehre, Armbr\xFCste]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="B\xF6gen" Anzahl="3" />
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="7" />
        <Ableitung Id="Zweihandprojektielwaffen" Anzahl="3" />
      </Ableitungen>
    </Talent>
    <Talent Id="Zweihandprojektielwaffen" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Fokus />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Zweihandprojektielwaffen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Gewehre, Armbr\xFCste]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="B\xF6gen" Anzahl="3" />
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="7" />
        <Ableitung Id="Faustprojektielwaffen" Anzahl="2" />
      </Ableitungen>
    </Talent>
    <Talent Id="Schilde" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Schilde]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="4" />
      </Ableitungen>
    </Talent>
    <Talent Id="Ausweichen" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Ausweichen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="3" />
        <Ableitung Id="Tanzen" Anzahl="8" />
      </Ableitungen>
    </Talent>
    <Talent Id="Stangenwaffen" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Stangenwaffen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="St\xE4be" Anzahl="2" />
      </Ableitungen>
    </Talent>
    <Talent Id="Peitschen" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Peitschen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
      </Ableitungen>
    </Talent>
    <Talent Id="Dolche" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Dolche]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Waffenlos" Anzahl="2" />
        <Ableitung Id="Katare" Anzahl="2" />
      </Ableitungen>
    </Talent>
    <Talent Id="Flegel" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Flegel]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Stangenwaffen" Anzahl="3" />
      </Ableitungen>
    </Talent>
    <Talent Id="Waffenlos" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Waffenlos]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Dolche" Anzahl="3" />
        <Ableitung Id="Katare" Anzahl="3" />
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
      </Ableitungen>
    </Talent>
    <Talent Id="Chakrams" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Chakrams]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Das Chakram (von Sanskrit: \u091A\u0915\u094D\u0930, cakra n., Nom. Sg. cakram, dt.: \u201EKreis\u201C oder \u201ERad\u201C) ist eine Wurfwaffe, die in Indien benutzt wurde. Sie besteht aus einem flachen Metallring mit einem scharfen \xE4u\xDFeren Rand von 12 bis 30 cm Durchmesser.]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Wurfspeere" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <St\xE4rke />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Wurfspeere]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="7" />
        <Ableitung Id="B\xF6gen" Anzahl="3" />
        <Ableitung Id="Speerschleudern" Anzahl="2" />
      </Ableitungen>
    </Talent>
    <Talent Id="Wurf\xE4xte" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <St\xE4rke />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Wurf\xE4xte]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="7" />
        <Ableitung Id="Wurfspeere" Anzahl="4" />
        <Ableitung Id="Wurfmesser" Anzahl="4" />
      </Ableitungen>
    </Talent>
    <Talent Id="Wurfmesser" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <St\xE4rke />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Wurfmesser]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="7" />
        <Ableitung Id="Wurfspeere" Anzahl="4" />
        <Ableitung Id="Wurf\xE4xte" Anzahl="4" />
      </Ableitungen>
    </Talent>
    <Talent Id="Katare" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Katare]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Das Katar, auch Coutar, Katah, Koutah, Kutah, Kutar, Bundi Dolch oder Jemdhar genannt, ist ein indischer Faustdolch. Der Ursprung liegt bei den Rajputen, aber die Waffe ist im indischen Raum weit verbreitet]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Dolche" Anzahl="2" />
        <Ableitung Id="Waffenlos" Anzahl="2" />
      </Ableitungen>
    </Talent>
    <Talent Id="Wurfwaffen" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Wurfwaffen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[z.B. Stein]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Wurfmesser" Anzahl="3" />
        <Ableitung Id="Wurf\xE4xte" Anzahl="3" />
      </Ableitungen>
    </Talent>
    <Talent Id="Schleudern" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Fokus />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Schleudern]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Wurfwaffen" Anzahl="4" />
      </Ableitungen>
    </Talent>
    <Talent Id="Speerschleudern" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Fokus />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Speerschleudern]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Wurfspeere" Anzahl="2" />
      </Ableitungen>
    </Talent>
    <Talent Id="Nunchakus" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Fokus />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Nunchakus]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Dreigliederst\xE4be" Anzahl="4" />
      </Ableitungen>
    </Talent>
    <Talent Id="Dreigliederst\xE4be" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Fokus />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Dreigliederst\xE4be]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Nunchakus" Anzahl="3" />
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
      </Ableitungen>
    </Talent>
    <Talent Id="Kettenwaffen" Komplexit\xE4t="B">
      <Probe>
        <Fokus />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Kettenwaffen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[z.B. Suruchin, Manriki Gusari]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Flegel" Anzahl="3" />
        <Ableitung Id="Nunchakus" Anzahl="4" />
      </Ableitungen>
    </Talent>
    <Talent Id="Sensen" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Mut />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Sensen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Kampfgesp\xFCr" Anzahl="5" />
        <Ableitung Id="Zweihandhiebwaffen" Anzahl="4" />
        <Ableitung Id="St\xE4be" Anzahl="3" />
      </Ableitungen>
    </Talent>
  </Talente>
  <Talente xmlns="https://nota-game.github.io/schema/vNext/talent.xsd" KategorieId="K\xF6rper">
    <talent:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[K\xF6rper]]>
      </misc:Lokalisirung>
    </talent:Kategorie>

    <!--K\xF6rper BEGINN-->
    <Talent Id="Springen" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <St\xE4rke />
        <Gewandtheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Springen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Laufen" Anzahl="4" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Laufen" Komplexit\xE4t="B">
      <Probe>
        <Konstitution />
        <St\xE4rke />
        <Gewandtheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Laufen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Springen" Anzahl="8" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Beschatten" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Intuition />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Beschatten]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Wahrnehmung" Anzahl="4" />
        <talent:Ableitung Id="H\xF6ren" Anzahl="3" />
        <talent:Ableitung Id="Sehen" Anzahl="3" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Gewichtstemmen" Komplexit\xE4t="B">
      <Probe>
        <St\xE4rke />
        <St\xE4rke />
        <Gewandtheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Gewichtstemmen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Schwimmen" Komplexit\xE4t="B">
      <Probe>
        <Konstitution />
        <St\xE4rke />
        <Gewandtheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Schwimmen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="K\xF6rperbeherschung" Komplexit\xE4t="B">
      <Probe>
        <St\xE4rke />
        <Gewandtheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[K\xF6rperbeherschung]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Akrobatik" Anzahl="3" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Akrobatik" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <St\xE4rke />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Akrobatik]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Akrobatik" Anzahl="4" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Finger\xFCbungen" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Pr\xE4zision />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Finger\xFCbungen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Manschmal muss ein Charakter sehr prezise arbeit mit seinen Fingern durchf\xFChren. Seien es Taschenspieler Triks, wie das Hervorziehen einer M\xFCnze, oder den Bolzen m\xF6glichst z\xFCgig aus einer Felsspalte zu ziehen. In solchen F\xE4llen steht das Tallent Finger\xFCbungen zur verf\xFCgung.]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Klettern" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Klugheit />
        <Mut />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Klettern]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Finger\xFCbungen" Anzahl="5" />
        <talent:Ableitung Id="Akrobatik" Anzahl="3" />
        <talent:Ableitung Id="K\xF6rperbeherschung" Anzahl="3" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Schleichen" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Klugheit />
        <Mut />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Schleichen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="K\xF6rperbeherschung" Anzahl="3" />
        <talent:Ableitung Id="Wahrnehmung" Anzahl="4" />
        <talent:Ableitung Id="Sehen" Anzahl="5" />
        <talent:Ableitung Id="H\xF6ren" Anzahl="5" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Fliegen" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Intuition />
        <Gewandtheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Fliegen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="K\xF6rperbeherschung" Anzahl="3" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Gaukeleien" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Sympathie />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Gaukelein]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="K\xF6rperbeherschung" Anzahl="4" />
        <talent:Ableitung Id="Finger\xFCbungen" Anzahl="3" />
      </talent:Ableitungen>

    </Talent>

    <Talent Id="Reiten" Komplexit\xE4t="B">
      <Probe>
        <Sympathie />
        <Gewandtheit />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Reiten]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="K\xF6rperbeherschung" Anzahl="3" />
        <talent:Ableitung Id="Tierkunde" Anzahl="5" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Sich Verstecken" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Intuition />
        <Gewandtheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Sich Verstecken]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="K\xF6rperbeherschung" Anzahl="4" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Singen" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Sympathie />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Singen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="K\xF6rperbeherschung" Anzahl="7" />
        <talent:Ableitung Id="Stimmen Imitieren" Anzahl="7" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Skifahren" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Gewandtheit />
        <Konstitution />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Skifahren]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="K\xF6rperbeherschung" Anzahl="7" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Stimmen Imitieren" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Stimmen Imitieren]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="K\xF6rperbeherschung" Anzahl="7" />
        <talent:Ableitung Id="Singen" Anzahl="7" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Taschendiebstahl" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Intuition />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Taschendiebstahl]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Finger\xFCbungen" Anzahl="3" />
        <talent:Ableitung Id="Gaukeleien" Anzahl="5" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Zechen" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Konstitution />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Zechen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Entfesseln" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Gewandtheit />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Entfesseln]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="K\xF6rperbeherschung" Anzahl="3" />
        <talent:Ableitung Id="Fesseln" Anzahl="5" />
      </talent:Ableitungen>

    </Talent>
  </Talente>
  <Talente xmlns="https://nota-game.github.io/schema/vNext/talent.xsd" KategorieId="Geist">
    <talent:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Geistig]]>
      </misc:Lokalisirung>
    </talent:Kategorie>

    <!--Geist BEGINN-->
    <Talent Id="F\xE4hrtensuche" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <talent:Fokus />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[F\xE4hrtensuche]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Wahrnehmung" Anzahl="5" />
        <talent:Ableitung Id="Sehen" Anzahl="3" />
      </talent:Ableitungen>

    </Talent>

    <Talent Id="Orientierung" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Orientierung]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Selbstbeherchung" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Mut />
        <Klugheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Selbstbeherchung]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Wahrnehmung" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Intuition />
        <Klugheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Wahrnehmung]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Sehen" Anzahl="3" />
        <Ableitung Id="H\xF6ren" Anzahl="3" />
        <Ableitung Id="F\xFChlen" Anzahl="4" />
        <Ableitung Id="Richen und Schmeken" Anzahl="5" />
      </Ableitungen>
    </Talent>
    <Talent Id="Sehen" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Intuition />
        <Klugheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Sehen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Wahrnehmung" Anzahl="4" />
      </Ableitungen>
    </Talent>
    <Talent Id="H\xF6ren" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Intuition />
        <Klugheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[H\xF6ren]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Wahrnehmung" Anzahl="4" />
      </Ableitungen>
    </Talent>
    <Talent Id="Richen und Schmeken" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Intuition />
        <Klugheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Richen und Schmeken]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Wahrnehmung" Anzahl="6" />
      </Ableitungen>
    </Talent>
    <Talent Id="F\xFChlen" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Pr\xE4zision />
        <Klugheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[F\xFChlen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Wahrnehmung" Anzahl="5" />
      </Ableitungen>
    </Talent>
  </Talente>
  <Talente xmlns="https://nota-game.github.io/schema/vNext/talent.xsd" KategorieId="Gesellschaft">
    <talent:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Gesellschft]]>
      </misc:Lokalisirung>
    </talent:Kategorie>

    <!--Gesellschaft BEGINN-->
    <Talent Id="Menschenkentniss" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Antipathie />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Menschenkentniss]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Wahrnehmung" Anzahl="5" />
        <talent:Ableitung Id="Seelsorge" Anzahl="3" />
      </talent:Ableitungen>

    </Talent>
    <Talent Id="Verf\xFChren" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Intuition />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Verf\xFChren]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Wahrnehmung" Anzahl="5" />
        <talent:Ableitung Id="Menschenkentniss" Anzahl="3" />
      </talent:Ableitungen>

    </Talent>
    <Talent Id="L\xFCgen" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Klugheit />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[L\xFCgen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Menschenkentniss" Anzahl="3" />
        <talent:Ableitung Id="\xDCberreden" Anzahl="5" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="\xDCberreden" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Klugheit />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[\xDCberreden]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Menschenkentniss" Anzahl="3" />
        <talent:Ableitung Id="L\xFCgen" Anzahl="3" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Einsch\xFCchtern" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Intuition />
        <Antipathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Einsch\xFCchtern]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Menschenkentniss" Anzahl="5" />
        <talent:Ableitung Id="\xDCberreden" Anzahl="4" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Lehren" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Gesellschaft]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Menschenkentniss" Anzahl="4" />
        <talent:Ableitung Id="\xDCberreden" Anzahl="6" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Schauspielerei" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Klugheit />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Schauspielerei]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Menschenkentniss" Anzahl="4" />
        <talent:Ableitung Id="\xDCberreden" Anzahl="7" />
        <talent:Ableitung Id="L\xFCgen" Anzahl="7" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Schriftlicher Ausdruck" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Schriftlicher Ausdruck]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="1">
        <talent:Voraussetzung>
          <misc:Tag Id="Lesen/Schreiben" />
        </talent:Voraussetzung>
      </talent:Level>
    </Talent>
    <Talent Id="Etikette" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Etikette]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Seelsorge" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Sympathie />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Seelsorge]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="4">
        <talent:Voraussetzung>
          <talent:Talent Id="Menschenkentniss" Level="5" />
        </talent:Voraussetzung>
      </talent:Level>
      <talent:Level Wert="8">
        <talent:Voraussetzung>
          <talent:Talent Id="Menschenkentniss" Level="10" />
        </talent:Voraussetzung>
      </talent:Level>
      <talent:Ableitungen>
        <talent:Ableitung Id="Menschenkentniss" Anzahl="4" />
        <talent:Ableitung Id="\xDCberreden" Anzahl="7" />
      </talent:Ableitungen>
    </Talent>


    <Talent Id="Sich Verkleiden" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Sympathie />
        <Gewandtheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Sich Verkleiden]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Tanzen" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Gewandtheit />
        <Konstitution />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Tanzen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="K\xF6rperbeherschung" Anzahl="3" />
      </talent:Ableitungen>

    </Talent>
    <!--Wissen BEGINN-->
  </Talente>
  <Talente xmlns="https://nota-game.github.io/schema/vNext/talent.xsd" KategorieId="Wissen">
    <talent:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Wissen]]>
      </misc:Lokalisirung>
    </talent:Kategorie>

    <Talent Id="Gassenwissen" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Gassenwissen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Rechnen" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Rechnen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Sagen" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Mut />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Sagen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Astronomi" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Astronomi]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Geographie" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Geographie]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Gesteinskunde" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Klugheit />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Gesteinskunde]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Recherche" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Recherche]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Das finden von informationen in B\xFCchern und Bibliotheken.]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="1">
        <talent:Voraussetzung>
          <misc:Tag Id="Lesen/Schreiben" />
        </talent:Voraussetzung>
      </talent:Level>
    </Talent>
    <Talent Id="Buchf\xFChrung" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Buchf\xFChrung]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="1">
        <talent:Voraussetzung>
          <misc:And>
            <misc:Tag Id='Lesen/Schreiben'></misc:Tag>
            <talent:Talent Id="Rechnen" Level="4" />
          </misc:And>
        </talent:Voraussetzung>
      </talent:Level>
      <talent:Ableitungen>
        <talent:Ableitung Id="Recherche" Anzahl="8" />
        <talent:Ableitung Id="Rechnen" Anzahl="5" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Medizin" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Medizin]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="8">
        <talent:Voraussetzung>
          <talent:Talent Id="Anatomie" Level="1" />
        </talent:Voraussetzung>
      </talent:Level>
      <talent:Ableitungen>
        <talent:Ableitung Id="Anatomie" Anzahl="5" />
        <talent:Ableitung Id="Pflanzenkunde" Anzahl="8" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Tierkunde" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Tierkunde]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Pflanzenkunde" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Pflanzenkunde]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Medizin" Anzahl="5" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Kunst" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Gl\xFCck />
        <Mut />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Kunst]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Alchemischeswissen" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Klugheit />
        <Klugheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Alchemischeswissen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Pflanzenkunde" Anzahl="4" />
        <talent:Ableitung Id="Gesteinskunde" Anzahl="4" />
        <talent:Ableitung Id="H\xFCttenkunde" Anzahl="8" />
        <talent:Ableitung Id="Magiekunde" Anzahl="7" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Wettervorhersage" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Wettervorhersage]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>


    <Talent Id="Anatomie" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Klugheit />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Anatomie]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Baukunst" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Baukunst]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="5">
        <talent:Voraussetzung>
          <talent:Talent Id="Rechnen" Level="4" />
        </talent:Voraussetzung>
      </talent:Level>
      <talent:Level Wert="8">
        <talent:Voraussetzung>
          <fertigkeit:Fertigkeit Id="Geometrie" />
        </talent:Voraussetzung>
      </talent:Level>
    </Talent>

    <Talent Id="Geselchaftsspiele" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Geselchaftsspiele]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Kriegskunst" Anzahl="7" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Geschichtswissen" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Geschichtswissen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Religion" Anzahl="5" />
        <talent:Ableitung Id="Mystik" Anzahl="5" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Mystik" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Mystik]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Religion" Anzahl="3" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Religion" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Religion]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Mystik" Anzahl="3" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Heraldik" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Heraldik]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Staatskunst" Anzahl="5" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="H\xFCttenkunde" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Konstitution />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[H\xFCttenkunde]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Gesteinskunde" Anzahl="4" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Kriegskunst" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Klugheit />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Krigskunst]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Geselchaftsspiele" Anzahl="7" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Kryptographie" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Kryptographie]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="1">
        <talent:Voraussetzung>
          <misc:And>
            <fertigkeit:Fertigkeit Id="H\xF6here Mathematik" />
            <misc:Tag Id="Lesen/Schreiben" />
          </misc:And>
        </talent:Voraussetzung>
      </talent:Level>
      <talent:Level Wert="11">
        <talent:Voraussetzung>
          <fertigkeit:Fertigkeit Id="H\xF6here Mathematik" Stufe="2" />
        </talent:Voraussetzung>
      </talent:Level>
      <talent:Level Wert="15">
        <talent:Voraussetzung>
          <fertigkeit:Fertigkeit Id="Geometrie" Stufe="2" />
        </talent:Voraussetzung>
      </talent:Level>
    </Talent>

    <Talent Id="Magiekunde" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Magiekunde]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Mechanik" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Mechanik]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="5">
        <talent:Voraussetzung>
          <talent:Talent Id="Rechnen" Level="5" />
        </talent:Voraussetzung>
      </talent:Level>
      <talent:Level Wert="8">
        <talent:Voraussetzung>
          <fertigkeit:Fertigkeit Id="Geometrie" />
        </talent:Voraussetzung>
      </talent:Level>
      <talent:Level Wert="10">
        <talent:Voraussetzung>
          <fertigkeit:Fertigkeit Id="H\xF6here Mathematik" />
        </talent:Voraussetzung>
      </talent:Level>
      <talent:Level Wert="15">
        <talent:Voraussetzung>
          <fertigkeit:Fertigkeit Id="H\xF6here Mathematik" Stufe="2" />
        </talent:Voraussetzung>
      </talent:Level>
    </Talent>

    <Talent Id="Philosophie" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Philosophie]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Rechtskunde" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Rechtskunde]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Sch\xE4tzen" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Sch\xE4tzen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Sprachenkunde" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Sprachenkunde]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Staatskunst" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Staatskunst]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Sternkunde" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Sternenkunde]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Giftkunde" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Giftkunde]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Pflanzenkunde" Anzahl="5" />
        <talent:Ableitung Id="Alchemie" Anzahl="5" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Krankheitskunde" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Klugheit />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Krankheitskunde]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
  </Talente>
  <Talente xmlns="https://nota-game.github.io/schema/vNext/talent.xsd" KategorieId="Handwerk">
    <talent:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Handwerk]]>
      </misc:Lokalisirung>
    </talent:Kategorie>

    <!--Handwerk BEGINN-->
    <Talent Id="Alchemie" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Klugheit />
        <Intuition />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Alchemie]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="4">
        <talent:Voraussetzung>
          <talent:Talent Id="Alchemischeswissen" Level="1" />
        </talent:Voraussetzung>
      </talent:Level>
      <talent:Level Wert="8">
        <talent:Voraussetzung>
          <talent:Talent Id="Alchemischeswissen" Level="5" />
        </talent:Voraussetzung>
      </talent:Level>
    </Talent>
    <Talent Id="Backen" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Klugheit />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Backen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="5">
        <talent:Voraussetzung>
          <talent:Talent Id="Richen und Schmeken" Level="3" />
        </talent:Voraussetzung>
      </talent:Level>
      <Ableitungen>
        <Ableitung Id="Richen und Schmeken" Anzahl="8" />
        <Ableitung Id="Kochen" Anzahl="3" />
      </Ableitungen>
    </Talent>
    <Talent Id="Kochen" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Pr\xE4zision />
        <Klugheit />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Kochen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="5">
        <talent:Voraussetzung>
          <talent:Talent Id="Richen und Schmeken" Level="3" />
        </talent:Voraussetzung>
      </talent:Level>

      <Ableitungen>
        <Ableitung Id="Backen" Anzahl="3" />
      </Ableitungen>
    </Talent>

    <Talent Id="Abrichten" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Intuition />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Abrichten]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="4">
        <talent:Voraussetzung>
          <talent:Talent Id="Tierkunde" Level="5" />
        </talent:Voraussetzung>
      </talent:Level>
      <Ableitungen>
        <Ableitung Id="Tierkunde" Anzahl="3" />
      </Ableitungen>

    </Talent>

    <Talent Id="Ackerbau" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Pr\xE4zision />
        <Konstitution />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Ackerbau]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Pflanzenkunde" Anzahl="5" />
      </Ableitungen>

    </Talent>

    <Talent Id="Bergbau" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Konstitution />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Bergbau]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Gesteinskunde" Anzahl="5" />
      </Ableitungen>
    </Talent>

    <Talent Id="Bogenbau" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Botenbau]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Pfeilmacher" Anzahl="4" />
        <talent:Ableitung Id="Holzbearbeitung" Anzahl="2" />
      </Ableitungen>

    </Talent>

    <Talent Id="Pfeilmacher" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Pfeilmacher]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Bogenbau" Anzahl="4" />
        <talent:Ableitung Id="Holzbearbeitung" Anzahl="2" />
      </Ableitungen>
    </Talent>

    <Talent Id="Boote Fahren" Komplexit\xE4t="B">
      <Probe>
        <Gewandtheit />
        <Konstitution />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Boote Fahren]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Drucker" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Drucker]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Fahrzeuge Lenken" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Sympathie />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Fahrzeuge Lenken]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Falschspiel" Komplexit\xE4t="B">
      <Probe>
        <Mut />
        <Sympathie />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Fa\xF6schspiel]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Feinmechanik" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Feinmechanik]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Feuersteinbearbeitung" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Feuersteinbearbeitung]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Fleischer" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Fleicher]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Gerber" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <Konstitution />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Gerber]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="K\xFCrschner" Anzahl="2" />
      </Ableitungen>
    </Talent>

    <Talent Id="K\xFCrschner" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <Konstitution />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[K\xFCrschner]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <Ableitungen>
        <Ableitung Id="Gerber" Anzahl="2" />
      </Ableitungen>
    </Talent>

    <Talent Id="Glaskunst" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Pr\xE4zision />
        <Konstitution />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Glaskunst]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Schmieden" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Konstitution />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Schmieden]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Handel" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Sympathie />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Handel]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="5">
        <talent:Voraussetzung>
          <talent:Talent Id="Rechnen" Level="4" />
        </talent:Voraussetzung>
      </talent:Level>
      <talent:Ableitungen>
        <talent:Ableitung Id="Rechnen" Anzahl="5" />
        <talent:Ableitung Id="Menschenkentniss" Anzahl="8" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Hauswirtschaft" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Sympathie />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Hauswirtschaft]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>


    <Talent Id="Wundenversorgung" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Sympathie />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Wundversorgung]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Medizin" Anzahl="3" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Holzbearbeitung" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Holzbbearbeitung]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Instrumentenbauer" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Instrumentenbauer]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Kartographie" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Klugheit />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Kartographie]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Level Wert="3">
        <talent:Voraussetzung>
          <talent:Talent Id="Zeichnen" Level="3" />
        </talent:Voraussetzung>
      </talent:Level>
      <talent:Level Wert="10">
        <talent:Voraussetzung>
          <talent:Talent Id="Zeichnen" Level="5" />
        </talent:Voraussetzung>
      </talent:Level>
    </Talent>


    <Talent Id="Lederarbeiten" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Lederarbeiten]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Zeichnen" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Zeichnen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Kartographie" Anzahl="5" />
        <talent:Ableitung Id="Malen" Anzahl="2" />
      </talent:Ableitungen>

    </Talent>
    <Talent Id="Malen" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Intuition />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Malen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Kartographie" Anzahl="5" />
        <talent:Ableitung Id="Zeichnen" Anzahl="2" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Maurer" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Gewandtheit />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Maurer]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Metallguss" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Metallguss]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Musizieren" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Sympathie />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Musizieren]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Schl\xF6sser Knacken" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Pr\xE4zision />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Schl\xF6sser Knacken]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Finger\xFCbungen" Anzahl="5" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Schnaps brennen" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Schnaps brennen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Schneidern" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Schneidern]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Finger\xFCbungen" Anzahl="5" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Seefahrt" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Gewandtheit />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Seefahrt]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Orientierung" Anzahl="5" />
      </talent:Ableitungen>

    </Talent>

    <Talent Id="Seiler" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Pr\xE4zision />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Seiler]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Steinmetz" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Pr\xE4zision />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Steinmetz]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Juwelier" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Pr\xE4zision />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Juwelier]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Stellmacher" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Stellmacher]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Stoffe F\xE4rben" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Stoffe F\xE4rben]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="T\xE4towieren" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Pr\xE4zision />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[T\xE4towiren]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Zeichnen" Anzahl="3" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="T\xF6pfern" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <Pr\xE4zision />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[T\xF6pfern]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Viehzucht" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Intuition />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Viehzucht]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Tierkunde" Anzahl="5" />
      </talent:Ableitungen>
    </Talent>

    <Talent Id="Webkunst" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Pr\xE4zision />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Webkunst]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Winzer" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Winzer]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Zimmermann" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Zimmermann]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
      <talent:Ableitungen>
        <talent:Ableitung Id="Holzbearbeitung" Anzahl="3" />
      </talent:Ableitungen>
    </Talent>
    <Talent Id="Fallenstellen" Komplexit\xE4t="B">
      <Probe>
        <Klugheit />
        <Pr\xE4zision />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Fallenstellen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>

    <Talent Id="Fesseln" Komplexit\xE4t="B">
      <Probe>
        <Pr\xE4zision />
        <Gewandtheit />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Fesseln]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Fischen" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Pr\xE4zision />
        <St\xE4rke />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Fischen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
    <Talent Id="Wildnisleben" Komplexit\xE4t="B">
      <Probe>
        <Intuition />
        <Gewandtheit />
        <Konstitution />
      </Probe>
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Wildnissleben]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
      <Verbreitung Wert="7" />
    </Talent>
  </Talente>


  <!-- \u2160 \u2161 \u2162 \u2163 \u2164 \u2165 \u2166 \u2167 \u2168 \u2169 \u216A \u216B -->
  <Fertigkeiten xmlns="https://nota-game.github.io/schema/vNext/fertigkeit.xsd" KategorieId="Kulturele">
    <fertigkeit:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Kulturelle]]>
      </misc:Lokalisirung>
    </fertigkeit:Kategorie>

    <Fertigkeit Id="Kulturkunde Alan">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Kulturkunde Alan]]>
        </misc:Lokalisirung>
      </misc:Name>

      <fertigkeit:Stufe Kosten="10">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Die Weit verbreitesten informationen. Viele Vorurteile Positv wie negativ]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Verbreitung Wert="6">
          <misc:Pfad Id="Alan" Verbreitung="7" />
        </Verbreitung>
      </fertigkeit:Stufe>

      <fertigkeit:Stufe Kosten="35">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Tiefgehenderes wissen der Kultur. Das verhalten kann aber immernoch als aussenseiter wahrgenommen werden]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Verbreitung Wert="5">
          <misc:Pfad Id="Alan" Verbreitung="7" />
        </Verbreitung>
      </fertigkeit:Stufe>

      <fertigkeit:Stufe Kosten="55">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Ein Wissen der Kultlur und verhaltensregln der in diese Kultur geborenen.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Verbreitung Wert="4">
          <misc:Pfad Id="Alan" Verbreitung="7" />
        </Verbreitung>
      </fertigkeit:Stufe>

      <fertigkeit:Stufe Kosten="60">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Grundlagen und Hintergr\xFCnde der Kultur, alte br\xE4uche etc. Dinge die auch nicht jeder der Kultur angeh\xF6rige kennt.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Verbreitung Wert="2">
          <misc:Pfad Id="Alan" Verbreitung="4" />
        </Verbreitung>
      </fertigkeit:Stufe>

      <fertigkeit:Stufe Kosten="90">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Geheimes wissen welches nur wenige auserlesene kennen]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Verbreitung Wert="1">
          <misc:Pfad Id="Alan" Verbreitung="2" />
        </Verbreitung>
      </fertigkeit:Stufe>
    </Fertigkeit>
  </Fertigkeiten>
  <Fertigkeiten xmlns="https://nota-game.github.io/schema/vNext/fertigkeit.xsd" KategorieId="Schriften">
    <fertigkeit:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Schriften]]>
      </misc:Lokalisirung>
    </fertigkeit:Kategorie>

    <Fertigkeit Id="Arjuniche Zeichen">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Arjuniche Zeichen]]>
        </misc:Lokalisirung>
      </misc:Name>
      <fertigkeit:Stufe Kosten="100">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Die Schrift der Arjur]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Verbreitung Wert="7" />
        <fertigkeit:Mods>
          <misc:Tags>
            <misc:Tag Id="Lesen/Schreiben" />
          </misc:Tags>
        </fertigkeit:Mods>
      </fertigkeit:Stufe>
    </Fertigkeit>
  </Fertigkeiten>
  <Fertigkeiten xmlns="https://nota-game.github.io/schema/vNext/fertigkeit.xsd" KategorieId="Sprachen">
    <fertigkeit:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Schriften]]>
      </misc:Lokalisirung>
    </fertigkeit:Kategorie>

    <Fertigkeit Id="Arjunisch">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Arjunisch]]>
        </misc:Lokalisirung>
      </misc:Name>
      <fertigkeit:Stufe Kosten="5">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Arjunisch erkennen]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Verbreitung Wert="7" />
      </fertigkeit:Stufe>

      <fertigkeit:Stufe Kosten="10">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Einige Arjunisch W\xF6rter. Wie essen ja,nein, etc\u2026 ]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Verbreitung Wert="7" />
      </fertigkeit:Stufe>
      <fertigkeit:Stufe Kosten="35">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Gebrochenes Arjunisch]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Verbreitung Wert="7" />
      </fertigkeit:Stufe>
      <fertigkeit:Stufe Kosten="40">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Arjunisch mit Aktzent]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Verbreitung Wert="7" />
      </fertigkeit:Stufe>
      <fertigkeit:Stufe Kosten="60">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Arjunisch Aktzent frei]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Verbreitung Wert="7" />
      </fertigkeit:Stufe>
    </Fertigkeit>
  </Fertigkeiten>
  <Fertigkeiten xmlns="https://nota-game.github.io/schema/vNext/fertigkeit.xsd" KategorieId="Handwerk">
    <fertigkeit:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Handwerk]]>
      </misc:Lokalisirung>
    </fertigkeit:Kategorie>

    <fertigkeit:Fertigkeit Id="Konditor">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">Konditor</misc:Lokalisirung>
      </misc:Name>
      <fertigkeit:Stufe Kosten="30">

        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Die kunst S\xFC\xDFes zu erstellen]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <fertigkeit:Verbreitung Wert="4"></fertigkeit:Verbreitung>
      </fertigkeit:Stufe>
    </fertigkeit:Fertigkeit>
  </Fertigkeiten>
  <Fertigkeiten xmlns="https://nota-game.github.io/schema/vNext/fertigkeit.xsd" KategorieId="Wissen">
    <fertigkeit:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Wissen]]>
      </misc:Lokalisirung>
    </fertigkeit:Kategorie>

    <fertigkeit:Fertigkeit Id="H\xF6here Mathematik">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">H\xF6here Mathematik</misc:Lokalisirung>
      </misc:Name>
      <fertigkeit:Stufe Kosten="30">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Mathemati die \xFCber die Grundrechenarten hinausgeht Sowie die vewendung und umstellung einfacher Formeln]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <fertigkeit:Verbreitung Wert="4"></fertigkeit:Verbreitung>
        <fertigkeit:Voraussetzung>
          <talent:Talent Id="Rechnen" Level="6" />
        </fertigkeit:Voraussetzung>
      </fertigkeit:Stufe>
      <fertigkeit:Stufe Kosten="30">
        
        <misc:Name>
          <misc:Lokalisirung Sprache="de">Abstrakte Mathematik</misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Besch\xE4ftigung mit unendlichkeit Differentialgleichungen]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <fertigkeit:Verbreitung Wert="4"></fertigkeit:Verbreitung>
        <fertigkeit:Voraussetzung>
          <talent:Talent Id="Rechnen" Level="12" />
        </fertigkeit:Voraussetzung>
      </fertigkeit:Stufe>
    </fertigkeit:Fertigkeit>
    <fertigkeit:Fertigkeit Id="Geometrie">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">Geometrie</misc:Lokalisirung>
      </misc:Name>
      <fertigkeit:Stufe Kosten="30">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Besch\xE4ftigt sich mit Prakticher Geometrie]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <fertigkeit:Verbreitung Wert="4"></fertigkeit:Verbreitung>
        <fertigkeit:Voraussetzung>
          <talent:Talent Id="Rechnen" Level="8" />
        </fertigkeit:Voraussetzung>
      </fertigkeit:Stufe>
      <fertigkeit:Stufe Kosten="30">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Nicht euklidiche Geometrie und Multidimensionale R\xE4me.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <fertigkeit:Verbreitung Wert="4"></fertigkeit:Verbreitung>
        <fertigkeit:Voraussetzung>
          <talent:Talent Id="Rechnen" Level="12" />
        </fertigkeit:Voraussetzung>
      </fertigkeit:Stufe>
    </fertigkeit:Fertigkeit>
  </Fertigkeiten>
  <Fertigkeiten xmlns="https://nota-game.github.io/schema/vNext/fertigkeit.xsd" KategorieId="Kampfstiele">
    <fertigkeit:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Kampfstiele]]>
      </misc:Lokalisirung>
    </fertigkeit:Kategorie>
    <fertigkeit:Fertigkeit Id="Si am">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Si\u2018am]]>
        </misc:Lokalisirung>
      </misc:Name>
      <fertigkeit:Stufe Kosten="100">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Dieser Kampfstiel legt den Fokus auf die Abwehr mit einem Stark gepanzerten Arm, Der Schwertarm ist normalerweise hingegen ungesch\xFCtzt. Diesern Kampfstiel verwendt eine alternative Trefferzonen verteilung.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <fertigkeit:Verbreitung Wert="4" />
        <fertigkeit:Voraussetzung>
          <misc:And>
            <talent:Talent Id="Schwerter" Level="12"></talent:Talent>
            <talent:Talent Id="Schilde" Level="8"></talent:Talent>
          </misc:And>
        </fertigkeit:Voraussetzung>
      </fertigkeit:Stufe>
    </fertigkeit:Fertigkeit>
  </Fertigkeiten>
  <Fertigkeiten xmlns="https://nota-game.github.io/schema/vNext/fertigkeit.xsd" KategorieId="Kampf">
    <fertigkeit:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Handwerk]]>
      </misc:Lokalisirung>
    </fertigkeit:Kategorie>

    <fertigkeit:Fertigkeit Id="Leibw\xE4chter">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Leibw\xE4chter]]>
        </misc:Lokalisirung>
      </misc:Name>
      <fertigkeit:Stufe Kosten="100">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Kann die Taktik Sch\xFCtzen zu halbiertenKosten nutzen]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <fertigkeit:Verbreitung Wert="5"></fertigkeit:Verbreitung>
      </fertigkeit:Stufe>
    </fertigkeit:Fertigkeit>

    <fertigkeit:Fertigkeit Id="Kampfkontrolle">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Kampfkontrolle]]>
        </misc:Lokalisirung>
      </misc:Name>
      <fertigkeit:Stufe Kosten="100">
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Bei der bestimmung der Trefferzonen wird eine mehr bestimmt. Der Charakter kann eine ablegen die der Gegner nicht bestimmen kann.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <fertigkeit:Verbreitung Wert="4"></fertigkeit:Verbreitung>
        <fertigkeit:Voraussetzung>
          <talent:Talent Id="Kampfgesp\xFCr" Level="10" />
        </fertigkeit:Voraussetzung>
      </fertigkeit:Stufe>
    </fertigkeit:Fertigkeit>

    <fertigkeit:Fertigkeit Id="Schildkampf">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">Schildkampf</misc:Lokalisirung>
      </misc:Name>
      <fertigkeit:Stufe Kosten="30">

        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Die kunst Schildkampf]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <fertigkeit:Verbreitung Wert="4"></fertigkeit:Verbreitung>
      </fertigkeit:Stufe>
    </fertigkeit:Fertigkeit>
  </Fertigkeiten>
  <Besonderheiten xmlns="https://nota-game.github.io/schema/vNext/besonderheit.xsd" KategorieId="Gaben">
    <besonderheit:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Gaben]]>
      </misc:Lokalisirung>
    </besonderheit:Kategorie>

    <Besonderheit Id="Auserw\xE4hlter" Gebunden="true">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Auserw\xE4hlter]]>
        </misc:Lokalisirung>
      </misc:Name>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Der Charakter wurde von einem der G\xF6tter auserw\xE4hlt]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
      </besonderheit:Stufe>
    </Besonderheit>

    <Besonderheit Id="Auserw\xE4hlter Alsas" Gebunden="true">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Auserw\xE4hlter Alsas]]>
        </misc:Lokalisirung>
      </misc:Name>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Der Charakter wurde von einem der G\xF6tter auserw\xE4hlt]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
      </besonderheit:Stufe>
    </Besonderheit>


    <Besonderheit Id="Miasma Resistenz">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Miasma Resistenz]]>
        </misc:Lokalisirung>
      </misc:Name>
      <besonderheit:Stufe>

        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Der Charakter hat eine erh\xF6te Resistenz gegen das d\xE4monische Miasma]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Voraussetzung>
          <Besonderheit Id="Auserw\xE4hlter" />
        </Voraussetzung>
      </besonderheit:Stufe>
    </Besonderheit>

    <Besonderheit Id="Verbesserte Wundheilung">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Verbesserte Wundheilung]]>
        </misc:Lokalisirung>
      </misc:Name>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Die Wunden des Charakters heilen Schneller.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Voraussetzung>
          <Besonderheit Id="Auserw\xE4hlter" />
        </Voraussetzung>
      </besonderheit:Stufe>
    </Besonderheit>
  </Besonderheiten>
  <Besonderheiten xmlns="https://nota-game.github.io/schema/vNext/besonderheit.xsd" KategorieId="Nachteile">
    <besonderheit:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Nachteile]]>
      </misc:Lokalisirung>
    </besonderheit:Kategorie>

    <besonderheit:Besonderheit Id="Arm">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">Arm</misc:Lokalisirung>
      </misc:Name>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">Dem Charakter staht wenig Geld zur verf\xFCgung.</misc:Lokalisirung>
        </misc:Beschreibung>
        <misc:Kosten Id="GP" Wert="-2" />
        <besonderheit:Voraussetzung>
          <besonderheit:Not>
            <besonderheit:Besonderheit Id="Wohlhabend" />
          </besonderheit:Not>
        </besonderheit:Voraussetzung>
      </besonderheit:Stufe>
      <besonderheit:Stufe>
        <misc:Name>
          <misc:Lokalisirung Sprache="de">Mittellos</misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">Dem Charakter staht kein Geld zur verf\xFCgung.</misc:Lokalisirung>
        </misc:Beschreibung>
        <misc:Kosten Id="GP" Wert="-4" />
      </besonderheit:Stufe>
    </besonderheit:Besonderheit>

  </Besonderheiten>
  <Besonderheiten xmlns="https://nota-game.github.io/schema/vNext/besonderheit.xsd" KategorieId="Vorteile">
    <besonderheit:Kategorie>
      <misc:Lokalisirung Sprache="de">
        <![CDATA[Vorteil]]>
      </misc:Lokalisirung>
    </besonderheit:Kategorie>

    <besonderheit:Besonderheit Id="Unauff\xE4llig">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Unauff\xE4llig]]>
        </misc:Lokalisirung>
      </misc:Name>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Der Charakter bleibt niemanden lange im Ged\xE4chtniss solange er nicht ausgibig interagiert.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <misc:Kosten Id="GP" Wert="3" />
        <besonderheit:Voraussetzung>
          <besonderheit:Not>
            <besonderheit:Besonderheit Id="Auff\xE4llig" />
          </besonderheit:Not>
        </besonderheit:Voraussetzung>
      </besonderheit:Stufe>
    </besonderheit:Besonderheit>
    <besonderheit:Besonderheit Id="Gutes Geh\xF6r">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Gutes Geh\xF6r]]>
        </misc:Lokalisirung>
      </misc:Name>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Alle erschwernisse auf das talent H\xF6ren sind halbiet, auf das talent Wahrnehmung erleichtert um 2. Die Quarit\xE4t jeder Probe ist um eins erh\xF6t]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <misc:Kosten Id="GP" Wert="5" />
      </besonderheit:Stufe>
    </besonderheit:Besonderheit>
    <besonderheit:Besonderheit Id="Meermensch" Gebunden="true">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Meermensch]]>
        </misc:Lokalisirung>
      </misc:Name>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Die f\xE4higkeit der Meermenschn unter Wasser Kimen und eine Schwanzflosse zu bilden.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
      </besonderheit:Stufe>
    </besonderheit:Besonderheit>
    <besonderheit:Besonderheit Id="Gl\xFCckspilz">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Gl\xFCckspilz]]>
        </misc:Lokalisirung>
      </misc:Name>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Erhalte +3GlP]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <besonderheit:Mods>
          <misc:Eigenschaften>
            <lebewesen:Gl\xFCcksPunkte Mod='3' />
          </misc:Eigenschaften>
        </besonderheit:Mods>
      </besonderheit:Stufe>
    </besonderheit:Besonderheit>
    <besonderheit:Besonderheit Id="Gl\xFCcksritter">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Gl\xFCcksritter]]>
        </misc:Lokalisirung>
      </misc:Name>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Substituire 1 Eigenschaft mit GL]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
      </besonderheit:Stufe>
    </besonderheit:Besonderheit>
    <besonderheit:Besonderheit Id="Auff\xE4llig">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Auff\xE4llig]]>
        </misc:Lokalisirung>
      </misc:Name>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Der Charakter zieht auf nat\xFCrliche weise die Blicke auf sich. Dies kann hilfreich sein sich bei diskusionen geh\xF6r zu schaffen. Dies macht es aber nicht leichter jemanden zu \xFCberzeugen.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <misc:Kosten Id="GP" Wert="3" />
        <besonderheit:Voraussetzung>
          <besonderheit:Not>
            <besonderheit:Besonderheit Id="Unauff\xE4llig" />
          </besonderheit:Not>
        </besonderheit:Voraussetzung>
      </besonderheit:Stufe>
    </besonderheit:Besonderheit>

    <Besonderheit Id="Krankheitsresistenz">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Krankheitsresistenz]]>
        </misc:Lokalisirung>
      </misc:Name>
      <besonderheit:Stufe>

        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Der Charakter wird troz wiedriger Umst\xE4nde nicht so leicht Krank.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Voraussetzung>
          <Besonderheit Id="Auserw\xE4hlter" />
        </Voraussetzung>
      </besonderheit:Stufe>
    </Besonderheit>
    <besonderheit:Besonderheit Id="Wohlhabend">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">Wohlhabend</misc:Lokalisirung>
      </misc:Name>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">Dem Charakter staht etwas Geld zur verf\xFCgung.</misc:Lokalisirung>
        </misc:Beschreibung>
        <misc:Kosten Id="GP" Wert="2" />
      </besonderheit:Stufe>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">Dem Charakter staht einiges Geld zur verf\xFCgung.</misc:Lokalisirung>
        </misc:Beschreibung>
        <misc:Kosten Id="GP" Wert="2" />
      </besonderheit:Stufe>
      <besonderheit:Stufe>
        <misc:Name>
          <misc:Lokalisirung Sprache="de">Reich</misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">Dem Charakter staht eine betr\xE4chtige summe Geld zur verf\xFCgung.</misc:Lokalisirung>
        </misc:Beschreibung>
        <misc:Kosten Id="GP" Wert="4" />
      </besonderheit:Stufe>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">Der Charakter hat keine Geldsorgen.</misc:Lokalisirung>
        </misc:Beschreibung>
        <misc:Kosten Id="GP" Wert="5" />
      </besonderheit:Stufe>
    </besonderheit:Besonderheit>


    <Besonderheit Id="Beidh\xE4ndig">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Beidh\xE4ndig]]>
        </misc:Lokalisirung>
      </misc:Name>
      <besonderheit:SubKategorie>Kampf</besonderheit:SubKategorie>
      <besonderheit:Stufe>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Falls keine Taktik mit wert gr\xF6\xDFer 1 gespielt wurde, k\xF6nnen Taktiken im gesammtwert von 3 gespielt werden.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <misc:Kosten Id="GP" Wert="3" />
      </besonderheit:Stufe>
    </Besonderheit>
  </Besonderheiten>

  <Taktiken xmlns="https://nota-game.github.io/schema/vNext/kampf/aktionen.xsd">
    <Taktik Id="Angriff" Kosten="2" Belastung="1" Typ="Offensiv">
      <Beschreibung>
        <![CDATA[Ein standard angriff.]]>
      </Beschreibung>
    </Taktik>

    <Taktik Id="Leichter Angriff" Kosten="1" Belastung="0.5" Typ="Offensiv">
      <Beschreibung>
        <![CDATA[Ein leichter Angriff.]]>
      </Beschreibung>
      <Erfolg>
        <![CDATA[Wenn eine andere Offensive Taktik dieses Charakters mehr oder gleich viel Schaden am selben Ziel verursacht, wird der Schaden negiert.]]>
      </Erfolg>
      <Mod ModifierType="Malus">
        <ConcreteModValueType Type="Absolute" Value="5" />
      </Mod>
    </Taktik>

    <Taktik Id="Offensiver Angriff" Kosten="2" Belastung="1.5" Typ="Offensiv">
      <Beschreibung>
        <![CDATA[Ein Angriff der wenig raum f\xFCr Verteidigung l\xE4\xDFt.]]>
      </Beschreibung>
      <Mod ModifierType="Bonus">
        <ConcreteModValueType Type="Absolute" Value="5" />
      </Mod>
    </Taktik>

    <Taktik Id="Agressiver Angriff" Kosten="4" Belastung="2" Typ="Offensiv">
      <Beschreibung>
        <![CDATA[Ein Angriff der die Verteidigung ignoriert.]]>
      </Beschreibung>
      <Bedingung>
        <![CDATA[Keine Defensiven Taktiken.]]>
      </Bedingung>
      <Mod ModifierType="Bonus">
        <ConcreteModValueType Type="Percent" Value="100" />
      </Mod>
    </Taktik>

    <Taktik Id="Leichte Verteidigung" Kosten="1" Belastung="0.5" Typ="Defensiv">
      <Beschreibung>
        <![CDATA[Eine leichte Verteidigung.]]>
      </Beschreibung>
      <Mod ModifierType="Malus">
        <ConcreteModValueType Type="Absolute" Value="5" />
      </Mod>
    </Taktik>

    <Taktik Id="Verteidigung" Kosten="2" Belastung="1" Typ="Defensiv">
      <Beschreibung>
        <![CDATA[Eine Standard Verteidigung.]]>
      </Beschreibung>
    </Taktik>

    <Taktik Id="Starke Verteidigung" Kosten="3" Belastung="1.5" Typ="Defensiv">
      <Beschreibung>
        <![CDATA[Eine Schwer durchdringbare verteidigung.]]>
      </Beschreibung>
      <Mod ModifierType="Bonus">
        <ConcreteModValueType Type="Absolute" Value="5" />
      </Mod>
    </Taktik>

    <Taktik Id="Verteidigungshaltung" Kosten="3" Belastung="2" Typ="Defensiv">
      <Beschreibung>
        <![CDATA[Der Charakter konzentriert sich auf seine Verteidigung, auf kosten seiner Angriffe.]]>
      </Beschreibung>
      <Bedingung>
        <![CDATA[Keine offensiven Taktiken.]]>
      </Bedingung>
      <Mod ModifierType="Bonus">
        <ConcreteModValueType Type="Percent" Value="50" />
      </Mod>
    </Taktik>

    <Taktik Id="R\xFCckzug" Kosten="2" Belastung="2" Typ="Defensiv">
      <Beschreibung>
        <![CDATA[Ein gezielter R\xFCckzug bei dem sich der Charakter aus dem Nahkampf l\xF6\xDFt, ohne sich Preis zu geben]]>
      </Beschreibung>
      <Erfolg>
        <![CDATA[Der Charakter l\xF6\xDFt sich aus dem Nahkampf.]]>
      </Erfolg>
    </Taktik>

    <Taktik Id="Flucht" Kosten="3" Belastung="1" Typ="Neutral">
      <Beschreibung>
        <![CDATA[Der Charakter entfernt sich aus dem Nahkampf ohne sich um seine Deckung zu k\xFCmmern.]]>
      </Beschreibung>
      <GarantierterEffekt>
        <![CDATA[Der Charakter l\xF6\xDFt sich aus dem Nahkampf.]]>
      </GarantierterEffekt>
    </Taktik>

    <Taktik Id="Finte" Kosten="1" Belastung="1" Typ="Offensiv">
      <Beschreibung>
        <![CDATA[Der Charakter versucht mit dem Angriff den gegner eine Falle zu stellen und so st\xE4rker zu bedr\xE4ngen.]]>
      </Beschreibung>
      <SofortigerEffekt>
        <![CDATA[$x entspricht dem Bedr\xE4nungsmalus des Ziels]]>
      </SofortigerEffekt>
      <Erfolg>
        <![CDATA[Das Ziel wird writer bedr\xE4ngt anstelle das Schaden verursact wird.]]>
      </Erfolg>
      <Mod ModifierType="Malus">
        <VariableModValueType Value="X" />
      </Mod>
      <Eigenschaften>
        <Eigenschaft Id="Pr\xE4zise" />
      </Eigenschaften>

    </Taktik>

    <Taktik Id="Wuchtiger Angriff" Kosten="3" Belastung="1" Typ="Offensiv">
      <Beschreibung>
        <![CDATA[Setzt mehr Wucht in einen auszuf\xFChrenden Angriff.]]>
      </Beschreibung>
      <SofortigerEffekt>
        <![CDATA[$x ist  belibiger Wert bis zum doppelten Basiswuchtschaden der Waffe.]]>
      </SofortigerEffekt>
      <Erfolg>
        <![CDATA[Die Waffe Trift. Erh\xF6ht den Wuchtschaden der Waffe um $x.]]>
      </Erfolg>
      <Misserfolg>
        <![CDATA[Erhalte Positions Mali in h\xF6he von $x.]]>
      </Misserfolg>
      <Mod ModifierType="Malus">
        <MultiplyModValueType>
          <ConcreteModValueType Value="2" Type="Absolute" />
          <VariableModValueType Value="X" />
        </MultiplyModValueType>
      </Mod>
      <Eigenschaften>
        <Eigenschaft Id="Wuchtig" />
      </Eigenschaften>
    </Taktik>

    <Taktik Id="Todessto\xDF" Kosten="5" Belastung="2" Typ="Offensiv">
      <Beschreibung>
        <![CDATA[Der Charakter leitet einen Riskanten Angriff ein um den gegner einen Gef\xE4hrlichen Treffer zu versetzen.]]>
      </Beschreibung>
      <SofortigerEffekt>
        <![CDATA[$x ist ein belibiger Wert.]]>
      </SofortigerEffekt>
      <GarantierterEffekt>
        <![CDATA[Die Defenskiv Taktik des Ziels wird um $x reduziert.]]>
      </GarantierterEffekt>
      <Erfolg>
        <![CDATA[Wenn der Defensivtaktikwert des Ziels unter 0 sinkt, verursacht die Waffe Schaden.]]>
      </Erfolg>
      <Misserfolg>
        <![CDATA[Erhalte Positions Mali in h\xF6he von 3$x.]]>
      </Misserfolg>
      <Mod ModifierType="Malus">
        <MultiplyModValueType>
          <ConcreteModValueType Value="3" Type="Absolute" />
          <VariableModValueType Value="X" />
        </MultiplyModValueType>
      </Mod>
    </Taktik>

    <Taktik Id="Waffe Platzieren" Kosten="2" Belastung="2" Typ="Offensiv">
      <Beschreibung>
        <![CDATA[Eine Taktik an deren ende die Waffe an eine empfindliche stelle, wie beispielsweise Kehle, Plaziert wurde.]]>
      </Beschreibung>
      <Bedingung>
        <![CDATA[Pro Waffe kann nur eine Aktion Waffe Platzieren gew\xE4hlt werden.]]>
      </Bedingung>
      <SofortigerEffekt>
        <![CDATA[$x ist ein belibiger Wert.]]>
      </SofortigerEffekt>
      <Erfolg>
        <![CDATA[F\xFChrt das Ziel n\xE4chste Runde eine Offensive Taktik aus erh\xE4lt es den Schnittschaden der Waffe. Sollte die Taktik nur eine Defensive sein, so wird der Schaden nur erlitten falls diese ein Misserfolg ist.

Zus\xE4tzlich erh\xE4llt das Ziel n\xE4chste runde einen zus\xE4tzlichen Malus von $x auf alle Offensiven Taktiken und der Charakter einen Bonus von $x auf alle Defensiven Taktiken.

Ausserdem darf eine Waffe Plazieren Taktik die das selbe Ziel wie diese hat in der N\xE4chsten runde durch eine andere Taktik ausgetauscht werden, nachdem alle Aktionen bekannt gegeben wurden. Als Trefferzone kann die selebe Zone gew\xE4hlt werden die diese Aktion getroffen hat. In diesem Fall kann eine belibige Unterzone gew\xE4hlt werden.]]>
      </Erfolg>
      <Mod ModifierType="Malus">
        <AddModValueType>
          <VariableModValueType Value="X" />
          <ConcreteModValueType Type="Absolute" Value="5" />
        </AddModValueType>
      </Mod>
    </Taktik>

    <Taktik Id="Schutz" Kosten="3" Belastung="1" Typ="Defensiv">
      <Beschreibung>
        <![CDATA[Der Charakter \xFCbernimmt den Schutz eines anderen.]]>
      </Beschreibung>
      <Bedingung>
        <![CDATA[Das Ziel darf keine Offensive Taktik nutzen.]]>
      </Bedingung>
      <SofortigerEffekt>
        <![CDATA[Diese Taktik gillt als Defensive Aktion des zu sch\xFCtzenden Ziels und nicht f\xFCr den ausf\xFChrenden Charakter.]]>
      </SofortigerEffekt>
    </Taktik>

    <Taktik Id="Position" Kosten="2" Belastung="1" Typ="Defensiv">
      <Beschreibung>
        <![CDATA[Der Charakter versucht seine Position zu verbessern.]]>
      </Beschreibung>
      <SofortigerEffekt>
        <![CDATA[Diese Defensive Taktik f\xFChrt nicht zum Misserfolg einer gengerichen Offensiven Taktik und verhindert keinen Schaden.]]>
      </SofortigerEffekt>
      <Erfolg>
        <![CDATA[Der Charakter baut die h\xE4lfte seiner Stellenmali ab (aufgerundet).]]>
      </Erfolg>
      <Misserfolg>
        <![CDATA[Der Charakter baut ein virtel seiner Stellenmali ab (aufgerundet). W\xFCrde der Charakter diese runde Stellen Mali bekommen, entfellt der Effekt daf\xFCr wird der erhaltene Mali um die h\xE4lfte Reduziert.]]>
      </Misserfolg>
    </Taktik>

    <Taktik Id="Reden" Kosten="1" Belastung="0" Typ="Neutral">
      <Beschreibung>
        <![CDATA[Der Charakter kann am ende der Kampfrunde mehr sagen als er eigentlich d\xFCrfte. Er kann einen ungef\xE4hr 5 sekunden lange nachricht von sich geben.]]>
      </Beschreibung>
      <SofortigerEffekt>
        <![CDATA[Der Charakter erh\xE4lt einen Malus von 1 auf alle Aktionen. Wenn dies die einzige Aktion ist, werden die Kosten auf 0 reduziert.]]>
      </SofortigerEffekt>
    </Taktik>

    <Taktik Id="Zustechen" Kosten="2" Belastung="0.5" Typ="Unterst\xFCtzend">
      <Beschreibung>
        <![CDATA[Bei diesem Angriff nutzt der Charakter die Schneide seiner Waffe an einer \xE4u\xDFerst empfindlichen stelle, wie beispielsweise dem Hals. Oder Durscht\xF6\xDFt mit der Klinge den K\xF6rper des Gegners. Ein bevorzugter Angriff von meuchlern.]]>
      </Beschreibung>
      <Erfolg>
        <![CDATA[Der Wuchtschaden der Waffe wird auf 0 gesetzt (Wuchtschl\xE4ge funktionieren). Der Angriff erh\xE4lt die Eigenschaft T\xF6dlich.]]>
      </Erfolg>
      <Mod ModifierType="Malus">
        <ConcreteModValueType Type="Percent" Value="50" />
      </Mod>

    </Taktik>

    <Taktik Id="Gezielter Angriff" Kosten="1" Belastung="0" Typ="Unterst\xFCtzend">
      <Beschreibung>
        <![CDATA[Der K\xE4mpfer versucht ein bestimmtes K\xF6rperteil gezielt zu treffen.]]>
      </Beschreibung>
      <SofortigerEffekt>
        <![CDATA[$x ist ien belibiger Wert.]]>
      </SofortigerEffekt>
      <Erfolg>
        <![CDATA[Es werden $x mehr Trefferzonen bestimmt. W\xE4hle eine dieser.]]>
      </Erfolg>
      <Mod ModifierType="Malus">
        <MultiplyModValueType>
          <VariableModValueType Value="X" />
          <VariableModValueType Value="X" />
        </MultiplyModValueType>
      </Mod>
      <Eigenschaften>
        <Eigenschaft Id="Pr\xE4zise" />
      </Eigenschaften>
    </Taktik>

    <Taktik Id="Pr\xE4ziser Angriff" Kosten="1" Belastung="0" Typ="Unterst\xFCtzend">
      <Beschreibung>
        <![CDATA[Erlaubt dem Angreifer an der R\xFCstung des Gegners Vorbei zu stechen..]]>
      </Beschreibung>
      <Bedingung>
        <![CDATA[Nur mit Pr\xE4zisen Waffen m\xF6glich.]]>
      </Bedingung>
      <SofortigerEffekt>
        <![CDATA[$x ist ien belibiger Wert.]]>
      </SofortigerEffekt>
      <Erfolg>
        <![CDATA[Bei genauer bestimmung der Trefferzone (W10) kann $x zum Ergebniss Addiert oder Subtrahiert werden.]]>
      </Erfolg>
      <Mod ModifierType="Malus">
        <MultiplyModValueType>
          <ConcreteModValueType Type="Absolute" Value="2" />
          <VariableModValueType Value="X" />
        </MultiplyModValueType>
      </Mod>
      <Eigenschaften>
        <Eigenschaft Id="Pr\xE4zise" />
      </Eigenschaften>
    </Taktik>

    <Taktik Id="Erholen / Abwarten" Kosten="0" Belastung="1" Typ="Neutral">
      <Beschreibung>
        <![CDATA[Der Charakter erholt sich]]>
      </Beschreibung>
      <GarantierterEffekt>
        <![CDATA[Der Charakter regeneriert alle Ersch\xF6pfung, wenn dies seien einzigste Aktion ist. Andernfalls die H\xE4lfte.]]>
      </GarantierterEffekt>
    </Taktik>

    <Taktik Id="Zielen" Kosten="1" Belastung="2" Typ="Neutral">
      <Beschreibung>
        <![CDATA[Der Charakter bereitet einen gezielten Schuss vor.]]>
      </Beschreibung>
      <Bedingung>
        <![CDATA[Nur mit Fernkampfwaffe]]>
      </Bedingung>
      <SofortigerEffekt>
        <![CDATA[$x entspricht der Fernkampfmodifikation. (Siehe Tabelle)]]>
      </SofortigerEffekt>
      <Erfolg>
        <![CDATA[Der Charakter erh\xE4lt einen Bonus in H\xF6he der halben Punkte auf seine n\xE4chste Taktik falls diese das selbe Ziel hat und mit der selben Waffe erfolt.]]>
      </Erfolg>
      <Mod ModifierType="Malus">
        <MultiplyModValueType>
          <VariableModValueType Value="X" />
          <ConcreteModValueType Type="Percent" Value="50" />
        </MultiplyModValueType>
      </Mod>
    </Taktik>

    <Taktik Id="Gezielter Schuss" Kosten="1" Belastung="2" Typ="Offensiv">
      <Beschreibung>
        <![CDATA[Der Charakter f\xFChrt einen gezielten Schuss durch.]]>
      </Beschreibung>
      <SofortigerEffekt>
        <![CDATA[$x entspricht der Fernkampf modifikation.]]>
      </SofortigerEffekt>
      <Erfolg>
        <![CDATA[Der Charakter Trifft das Ziel einmal.]]>
      </Erfolg>
      <Mod ModifierType="Malus">
        <SubstractModValueType>
          <VariableModValueType Value="X" />
          <ConcreteModValueType Value="3" Type="Absolute" />
        </SubstractModValueType>
      </Mod>
    </Taktik>

    <!-- <Taktik Id="Steilshuss" Kosten="1" Belastung="2" Typ="Offensiv">
      <Beschreibung>Der Charakter f\xFChrt einen Balistischen Schuss durch. Dieses kann beispielsweise auch gegner hinter Dekung treffen. Durch die Balistische Flugbahn ist das geschoss jedoch l\xF6nger unterwegs.</Beschreibung>
      <SofortigerEffekt>Der Angriff erfolgt diese Kampfrunde, trifft sein Ziel aber erst n\xE4chste. Dabei ist das Problem weniger den Anvisierten Punkt zu treffe, als vorherzusehen wo sich der gegner zu diesem Zeitpunkt befinden wird.</SofortigerEffekt>
      <Mod ModifierType="Malus">
        <ConcreteModValueType Value="2" Type="Absolute"/>
      </Mod>
    </Taktik> -->

    <Taktik Id="Mehrfachschuss" Kosten="2" Belastung="2" Typ="Offensiv">
      <Beschreibung>
        <![CDATA[Schie\xDFt mit einer Distanzwaffe bis zur maximalen schussfrequenz.]]>
      </Beschreibung>
      <SofortigerEffekt>
        <![CDATA[$x entspricht der Fernkampfmodifikation.]]>
      </SofortigerEffekt>
      <Erfolg>
        <![CDATA[Der Charakter Trifft das Ziel entsprechend der Feuerrate.]]>
      </Erfolg>
      <Mod ModifierType="Malus">
        <VariableModValueType Value="X" />
      </Mod>
    </Taktik>

    <Taktik Kosten="3" Id="Ausweichen" Belastung="1" Typ="Defensiv">
      <Beschreibung>
        <![CDATA[In manschen situation ist es ratsam nicht mit der Waffe zu parieren, sondern dem Angriff aus dem Weg zughen.]]>
      </Beschreibung>
    </Taktik>

    <Taktik Kosten="4" Id="Flammenklinge" Belastung="2" Typ="Neutral">
      <Beschreibung>
        <![CDATA[H\xFCllt die Waffe in Flammen und erh\xF6t die Reichweite.]]>
      </Beschreibung>
      <Bedingung>
        <![CDATA[Charakter Feueradept]]>
      </Bedingung>
      <Erfolg>
        <![CDATA[Erh\xF6t die DK der Waffe n\xE4chste Runde um eins. F\xFCr je volle 3 Punkte h\xE4lt der Effekt 1 Runde l\xE4nger.]]>
      </Erfolg>
    </Taktik>

    <Taktik Kosten="9" Id="Flammenwand" Belastung="2" Typ="Neutral">
      <Beschreibung>
        <![CDATA[Erzeugt Flammenw\xE4nde.]]>
      </Beschreibung>
      <Bedingung>
        <![CDATA[Charakter Feueradept]]>
      </Bedingung>
      <Erfolg>
        <![CDATA[F\xFCr je 2 Punkte kann der Charakter einen Meter wand erzeugen startend vor ihm. Die Wand h\xE4lt 3 Runden.]]>
      </Erfolg>
    </Taktik>

    <Eigenschaften>
      <Eigenschaft Id="Pr\xE4zise">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Pr\xE4zise]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Eine Aktion die besonders Pr\xE4zises vorgehen verlangt.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
      </Eigenschaft>
      <Eigenschaft Id="Wuchtig">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Wuchtig]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Eine Aktoin bei der es auf Brachiale gewalt ankommt.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
      </Eigenschaft>
    </Eigenschaften>

  </Taktiken>

  <Ausstattung xmlns="https://nota-game.github.io/schema/vNext/kampf/ausstattung.xsd">
    <Waffen>
      <Nahkampfwaffe Id="Floret" Distanzklasse="2">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Floret]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schaden>
          <Schnitt Schaden="2" />
        </Schaden>
        <Eigenschaften>
          <Eigenschaft Id="Pr\xE4zise" />
        </Eigenschaften>
        <Talente>
          <ausstattung:Talent Id="Fechtwaffen" />
        </Talente>
      </Nahkampfwaffe>
      <Nahkampfwaffe Id="Rapier" Distanzklasse="2">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Rapier]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schaden>
          <Wucht Schaden="1" />
          <Schnitt Schaden="3" />
        </Schaden>
        <Eigenschaften>
          <Eigenschaft Id="Pr\xE4zise" />
        </Eigenschaften>
        <Talente>
          <ausstattung:Talent Id="Fechtwaffen" />
        </Talente>
      </Nahkampfwaffe>
      <Nahkampfwaffe Id="Schwert" Distanzklasse="2">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Schwert]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schaden>
          <Wucht Schaden="3" />
          <Schnitt Schaden="3" />
        </Schaden>
        <Talente>
          <ausstattung:Talent Id="Schwerter" />
        </Talente>
      </Nahkampfwaffe>
      <Nahkampfwaffe Id="Axt" Distanzklasse="2">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Axt]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schaden>
          <Wucht Schaden="5" />
          <Schnitt Schaden="4" />
        </Schaden>
        <Talente>
          <ausstattung:Talent Id="Einhand\xE4xte" />
        </Talente>
      </Nahkampfwaffe>
      <Nahkampfwaffe Id="Dolch" Distanzklasse="1">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Dolch]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schaden>
          <Schnitt Schaden="2" />
        </Schaden>
        <Talente>
          <ausstattung:Talent Id="Dolche" />
        </Talente>
      </Nahkampfwaffe>

      <Nahkampfwaffe Id="Speer" Distanzklasse="3">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Speer]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schaden>
          <Wucht Schaden="1" />
          <Schnitt Schaden="2" />
        </Schaden>
        <Talente>
          <ausstattung:Talent Id="Stangenwaffen" />
        </Talente>
      </Nahkampfwaffe>

      <Nahkampfwaffe Id="Harpune" Distanzklasse="3">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Harpune]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schaden>
          <Wucht Schaden="1" />
          <Schnitt Schaden="2" />
        </Schaden>
        <Eigenschaften>
          <Eigenschaft Id="Wiederharken" />
        </Eigenschaften>
        <Talente>
          <ausstattung:Talent Id="Stangenwaffen" />
        </Talente>
      </Nahkampfwaffe>

      <Nahkampfwaffe Id="Gleve" Distanzklasse="3">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Gleve]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schaden>
          <Wucht Schaden="2" />
          <Schnitt Schaden="2" />
        </Schaden>
        <Talente>
          <ausstattung:Talent Id="Stangenwaffen" />
        </Talente>
      </Nahkampfwaffe>


      <Nahkampfwaffe Id="Keule" Distanzklasse="2">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Keule]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schaden>
          <Wucht Schaden="3" />
        </Schaden>
        <Talente>
          <ausstattung:Talent Id="Stumpfe Hiebwaffen" />
        </Talente>
      </Nahkampfwaffe>

      <Nahkampfwaffe Id="Hammer" Distanzklasse="2">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Hammer]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schaden>
          <Wucht Schaden="6" />
        </Schaden>
        <Eigenschaften>
          <Eigenschaft Id="Wuchtig" />
        </Eigenschaften>
        <Talente>
          <ausstattung:Talent Id="Stumpfe Hiebwaffen" />
        </Talente>
      </Nahkampfwaffe>

      <Nahkampfwaffe Id="Anderthalbh\xE4nder" Distanzklasse="3">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Anderthalbh\xE4nder]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schaden>
          <Wucht Schaden="4" />
          <Schnitt Schaden="3" />
        </Schaden>
        <Talente>
          <ausstattung:Talent Id="Anderthalbh\xE4nder" />
        </Talente>
      </Nahkampfwaffe>

      <Fernkampfwaffe Id="Kompositbogen">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Kompositbogen]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schaden>
          <Wucht Schaden="2" />
          <Schnitt Schaden="2" />
        </Schaden>
        <Schusseigenschaften Magazingr\xF6\xDFe="1" Schussfrequenz="5" />
        <Reichweiten>
          <Reichweite Distanz="Nahkampf" Schadensreduktion="2" Modifikator="-10" />
          <Reichweite Distanz="10" Modifikator="0" />
          <Reichweite Distanz="20" Modifikator="-2" />
          <Reichweite Distanz="40" Modifikator="-4" />
          <Reichweite Distanz="80" Modifikator="-6" />
          <Reichweite Distanz="120" Modifikator="-8" />
          <Reichweite Distanz="160" Modifikator="-10" />
          <Reichweite Distanz="200" Modifikator="-14" />
          <Reichweite Distanz="400" Modifikator="-20" />
          <Reichweite Distanz="500" Modifikator="-25" />
        </Reichweiten>
        <Nachladezeit Wert="1" Einheit="S" />
        <Eigenschaften>
          <Eigenschaft Id="R\xFCstungsbrechend" />
          <Eigenschaft Id="T\xF6dlich" />
        </Eigenschaften>
      </Fernkampfwaffe>

    </Waffen>
    <R\xFCstungen>
      <R\xFCstung Id="Lederharnisch" Erschwernis="1">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Lederharnisch]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schutz>
          <Flexibilit\xE4t Wert="3" />
          <H\xE4rte Wert="3" />
        </Schutz>
        <Trefferzonen>
          <Brust>
            <Schutz Von="2" Bis="10" />
          </Brust>
          <H\xFCfte>
            <Schutz Von="1" Bis="9" />
          </H\xFCfte>
        </Trefferzonen>
      </R\xFCstung>

      <R\xFCstung Id="MetallHarnich" Erschwernis="1">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[MetallHarnich]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schutz>
          <Flexibilit\xE4t Wert="1" />
          <H\xE4rte Wert="6" />
        </Schutz>
        <Trefferzonen>
          <Brust>
            <Schutz Von="2" Bis="10" />
          </Brust>
          <H\xFCfte>
            <Schutz Von="1" Bis="9" />
          </H\xFCfte>
        </Trefferzonen>
      </R\xFCstung>

      <R\xFCstung Id="Kettenhemd" Erschwernis="1">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Kettenhemd]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schutz>
          <Flexibilit\xE4t Wert="2" />
          <H\xE4rte Wert="6" />
        </Schutz>
        <Trefferzonen>
          <Brust>
            <Schutz Von="2" Bis="10" />
          </Brust>
          <H\xFCfte>
            <Schutz Von="1" Bis="9" />
          </H\xFCfte>
        </Trefferzonen>
      </R\xFCstung>

      <R\xFCstung Id="Gambesong" Erschwernis="1">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Gambesong]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
        <Schutz>
          <Flexibilit\xE4t Wert="4" />
          <D\xE4mpfung Wert="4" />
        </Schutz>
        <Trefferzonen>
          <Brust>
            <Schutz Von="2" Bis="10" />
          </Brust>
          <H\xFCfte>
            <Schutz Von="1" Bis="9" />
          </H\xFCfte>
        </Trefferzonen>
      </R\xFCstung>


    </R\xFCstungen>
    <Eigenschaften>
      <Eigenschaft Id="Pr\xE4zise">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Pr\xE4zise]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Eine Waffe mit der Eigenschaft Pr\xE4zise ist in der Lage die R\xFCstung des Gegners zu umgehen. F\xFCr alle Pr\xE4zisen Man\xF6ver sind die Erschwernisse halbiert.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
      </Eigenschaft>
      <Eigenschaft Id="Wuchtig">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Wuchtig]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Wuchtige waffen erleichtern es sie mit brachialer gewallt einzusetzen. F\xFCr alle Aktionen mit der Eigenschaft Wuchtig ist die Erschwerniss halbiert.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
      </Eigenschaft>
      <Eigenschaft Id="Durchschalgend">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Durchschalgend]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Der Wuchtschaden wird f\xFCr die berechnungs des Schnittschadens verdoppelt.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
      </Eigenschaft>
      <Eigenschaft Id="R\xFCstungsbrechend">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[R\xFCstungsbrechend]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Der Wuchtschaden wird f\xFCr die berechnungs des Schnittschadens Verdreifacht.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
      </Eigenschaft>
      <Eigenschaft Id="T\xF6dlich">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[T\xF6dlich]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Schnittschaden der im bereich Kopf, Brust H\xFCfte verursacht wird, wird verdoppelt.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
      </Eigenschaft>
      <Eigenschaft Id="Wiederharken">
        <misc:Name>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Wiederharken]]>
          </misc:Lokalisirung>
        </misc:Name>
        <misc:Beschreibung>
          <misc:Lokalisirung Sprache="de">
            <![CDATA[Waffe kann sich im Opfer verfangen, und f\xFCgt beim entfernen 1 Blutungsschaden zu.]]>
          </misc:Lokalisirung>
        </misc:Beschreibung>
      </Eigenschaft>
    </Eigenschaften>
  </Ausstattung>
  <Tags xmlns="https://nota-game.github.io/schema/vNext/misc.xsd">
    <Tag Id="Lesen/Schreiben">
      <misc:Name>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Lesen und Schreiben]]>
        </misc:Lokalisirung>
      </misc:Name>
      <misc:Beschreibung>
        <misc:Lokalisirung Sprache="de">
          <![CDATA[Die f\xE4higkeit in mindestens einer Schrift Lesen und Schreiben zu k\xF6nnen.]]>
        </misc:Lokalisirung>
      </misc:Beschreibung>
    </Tag>
  </Tags>
</Daten>`,w5=[[1,[1,862,886,2036,2002,2040,25,42,107,186,2044,2048,2052,2056,2060,2064,2068,2072,834,1161,1172,2076,823,2080,858,1383,2084,1436,1457,1475,1467,1483,1579,2088]],[2,[[2,3],[4,5],[14,15],[19,20]]],[0,"type"],[0,"element"],[0,"name"],[2,[[6,7],[8,9],[10,11],[12,13]]],[0,"local"],[0,"Daten"],[0,"namespace"],[0,"https://nota-game.github.io/schema/vNext/nota.xsd"],[0,"root"],[0,!0],[0,"id"],[0,"\u03B9\u03B41\u03B5"],[0,"occurence"],[2,[[16,17],[18,17]]],[0,"maxOccurance"],[0,1],[0,"minOccurance"],[0,"content"],[2,[[2,21],[19,22],[64,2027]]],[0,"complexType"],[2,[[2,23],[19,24],[14,2026]]],[0,"sequence"],[1,[25,154,186,785,1033,1223,1283,1383,1579,2002]],[2,[[4,26],[19,30],[2,3],[14,153]]],[2,[[6,27],[8,28],[10,11],[12,29]]],[0,"KostenDefinitionen"],[0,"https://nota-game.github.io/schema/vNext/misc.xsd"],[0,"\u03B9\u03B47\u03B5"],[2,[[2,21],[19,31],[64,149],[4,150]]],[2,[[2,23],[19,32],[14,148]]],[1,[33,125]],[2,[[2,3],[4,34],[14,37],[19,39]]],[2,[[6,35],[8,28],[12,36]]],[0,"KostenDefinition"],[0,"\u03B9\u03B484\u03B5"],[2,[[16,38],[18,17]]],[0,"unbounded"],[2,[[2,21],[19,40],[64,113]]],[2,[[2,23],[19,41],[14,112]]],[1,[42,102,107]],[2,[[4,43],[19,46],[2,3],[14,101]]],[2,[[6,44],[8,28],[10,11],[12,45]]],[0,"Name"],[0,"\u03B9\u03B48\u03B5"],[2,[[2,21],[19,47],[64,97],[4,98]]],[2,[[2,23],[19,48],[14,96]]],[1,[49]],[2,[[2,3],[4,50],[14,53],[19,54]]],[2,[[6,51],[8,28],[12,52]]],[0,"Lokalisirung"],[0,"\u03B9\u03B487\u03B5"],[2,[[16,38],[18,17]]],[2,[[2,21],[19,55],[64,95]]],[2,[[56,57],[2,63],[64,65]]],[0,"base"],[2,[[56,58],[59,58],[60,61],[2,62]]],[0,"string"],[0,"original"],[0,"subType"],[0,"native"],[0,"simpleType"],[0,"simpleContent"],[0,"attributes"],[1,[66,77]],[2,[[67,68],[4,69],[2,72],[73,74],[62,75]]],[0,"default"],[-1],[2,[[6,70],[8,28],[12,71]]],[0,"Sprache"],[0,"\u03B9\u03B4134\u03B5"],[0,"attribute"],[0,"optional"],[0,!1],[2,[[56,58],[59,76],[60,61],[2,62]]],[0,"language"],[2,[[67,78],[4,79],[2,72],[73,11],[62,82]]],[0,"Unspezifiziert"],[2,[[6,80],[8,28],[12,81]]],[0,"Geschlecht"],[0,"\u03B9\u03B4135\u03B5"],[2,[[83,84],[60,85],[2,62],[86,87],[88,89],[4,93]]],[0,"subSubType"],[0,"enumeration"],[0,"restriction"],[0,"baseType"],[2,[[56,58],[59,58],[60,61],[2,62]]],[0,"values"],[1,[90,91,92,78]],[0,"Neutral"],[0,"M\xE4nnlich"],[0,"Weiblich"],[2,[[6,80],[8,28],[10,11],[12,94]]],[0,"\u03B9\u03B4166\u03B5"],[1,[]],[2,[[16,17],[18,17]]],[1,[]],[2,[[6,99],[8,28],[10,11],[12,100]]],[0,"Lokalisierungen"],[0,"\u03B9\u03B440\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,103],[19,46],[2,3],[14,106]]],[2,[[6,104],[8,28],[12,105]]],[0,"Abk\xFCrzung"],[0,"\u03B9\u03B4129\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,108],[19,46],[2,3],[14,111]]],[2,[[6,109],[8,28],[10,11],[12,110]]],[0,"Beschreibung"],[0,"\u03B9\u03B49\u03B5"],[2,[[16,17],[18,17]]],[2,[[16,17],[18,17]]],[1,[114,121]],[2,[[67,115],[4,116],[2,72],[73,11],[62,119]]],[0,"false"],[2,[[6,117],[8,28],[12,118]]],[0,"StandardKosten"],[0,"\u03B9\u03B4116\u03B5"],[2,[[56,120],[59,120],[60,61],[2,62]]],[0,"boolean"],[2,[[67,68],[4,122],[2,72],[73,74],[62,87]]],[2,[[6,123],[8,28],[10,11],[12,124]]],[0,"Id"],[0,"\u03B9\u03B475\u03B5"],[2,[[2,3],[4,126],[14,129],[19,130]]],[2,[[6,127],[8,28],[12,128]]],[0,"TalentKostenFunktion"],[0,"\u03B9\u03B485\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,131],[64,147]]],[2,[[56,57],[2,63],[64,132]]],[1,[133,139]],[2,[[67,68],[4,134],[2,72],[73,74],[62,137]]],[2,[[6,135],[8,28],[12,136]]],[0,"KostenArt"],[0,"\u03B9\u03B4130\u03B5"],[2,[[56,58],[59,138],[60,61],[2,62]]],[0,"token"],[2,[[67,68],[4,140],[2,72],[73,74],[62,143]]],[2,[[6,141],[8,28],[12,142]]],[0,"ResultType"],[0,"\u03B9\u03B4131\u03B5"],[2,[[83,84],[60,85],[2,62],[86,87],[88,144]]],[1,[145,146]],[0,"differenz"],[0,"total"],[1,[]],[2,[[16,17],[18,17]]],[1,[]],[2,[[6,151],[8,28],[10,11],[12,152]]],[0,"KostenDefinitions"],[0,"\u03B9\u03B438\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,155],[14,158],[19,159]]],[2,[[6,156],[8,9],[12,157]]],[0,"GenerierungsDaten"],[0,"\u03B9\u03B476\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,160],[64,179]]],[2,[[2,23],[19,161],[14,178]]],[1,[162]],[2,[[2,3],[19,163],[14,174],[4,175]]],[2,[[2,21],[19,68],[64,164],[4,172]]],[1,[165,121]],[2,[[67,68],[4,166],[2,72],[73,74],[62,169]]],[2,[[6,167],[8,28],[12,168]]],[0,"Wert"],[0,"\u03B9\u03B450\u03B5"],[2,[[56,170],[59,171],[60,61],[2,62]]],[0,"number"],[0,"float"],[2,[[6,35],[8,28],[10,11],[12,173]]],[0,"\u03B9\u03B437\u03B5"],[2,[[16,38],[18,17]]],[2,[[6,176],[8,28],[12,177]]],[0,"Kosten"],[0,"\u03B9\u03B4124\u03B5"],[2,[[16,17],[18,17]]],[1,[180]],[2,[[67,68],[4,181],[2,72],[73,74],[62,184]]],[2,[[6,182],[8,9],[12,183]]],[0,"MinimumVerbreitung"],[0,"\u03B9\u03B4113\u03B5"],[2,[[56,170],[59,185],[60,61],[2,62]]],[0,"int"],[2,[[2,3],[4,187],[14,191],[19,192]]],[2,[[6,188],[8,189],[10,11],[12,190]]],[0,"Organismen"],[0,"https://nota-game.github.io/schema/vNext/lebewesen.xsd"],[0,"\u03B9\u03B410\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,193],[64,784]]],[2,[[2,23],[19,194],[14,783]]],[1,[195,253]],[2,[[4,196],[19,199],[2,3],[14,252]]],[2,[[6,197],[8,189],[12,198]]],[0,"EigenschaftsKosten"],[0,"\u03B9\u03B488\u03B5"],[2,[[2,21],[19,200],[64,248],[4,249]]],[2,[[2,23],[19,201],[14,247]]],[1,[202]],[2,[[2,3],[4,203],[14,206],[19,207]]],[2,[[6,204],[8,189],[12,205]]],[0,"Abschnitt"],[0,"\u03B9\u03B4136\u03B5"],[2,[[16,38],[18,17]]],[2,[[2,21],[19,208],[64,215]]],[2,[[2,23],[19,209],[14,214]]],[1,[210]],[2,[[2,3],[19,163],[14,211],[4,212]]],[2,[[16,38],[18,17]]],[2,[[6,176],[8,28],[12,213]]],[0,"\u03B9\u03B4199\u03B5"],[2,[[16,17],[18,17]]],[1,[216,222,226]],[2,[[67,68],[4,217],[2,72],[73,74],[62,220]]],[2,[[6,218],[8,189],[12,219]]],[0,"von"],[0,"\u03B9\u03B4179\u03B5"],[2,[[56,170],[59,221],[60,61],[2,62]]],[0,"integer"],[2,[[67,68],[4,223],[2,72],[73,74],[62,220]]],[2,[[6,224],[8,189],[12,225]]],[0,"bis"],[0,"\u03B9\u03B4180\u03B5"],[2,[[67,68],[4,227],[2,72],[73,11],[62,230]]],[2,[[6,228],[8,189],[12,229]]],[0,"attribut"],[0,"\u03B9\u03B4181\u03B5"],[2,[[83,84],[60,85],[2,62],[86,87],[88,231],[4,244]]],[1,[232,233,234,235,236,237,238,239,240,241,242,243]],[0,"Mut"],[0,"Gl\xFCck"],[0,"Klugheit"],[0,"Intuition"],[0,"Gewandtheit"],[0,"Feinmotorik"],[0,"Sympathie"],[0,"Antipathie"],[0,"St\xE4rke"],[0,"Konstitution"],[0,"Fokus"],[0,"Einfluss"],[2,[[6,245],[8,28],[10,11],[12,246]]],[0,"Attribute"],[0,"\u03B9\u03B4200\u03B5"],[2,[[16,17],[18,17]]],[1,[]],[2,[[6,250],[8,189],[10,11],[12,251]]],[0,"Eigenschaftskosten"],[0,"\u03B9\u03B4107\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,254],[19,257],[2,3],[14,782]]],[2,[[6,255],[8,189],[12,256]]],[0,"Gattung"],[0,"\u03B9\u03B489\u03B5"],[2,[[2,21],[19,258],[64,778],[4,779]]],[2,[[2,23],[19,259],[14,777]]],[1,[42,107,260,265,339,504]],[2,[[4,261],[19,199],[2,3],[14,263]]],[2,[[6,197],[8,189],[12,262]]],[0,"\u03B9\u03B4137\u03B5"],[2,[[16,17],[18,264]]],[0,0],[2,[[4,266],[19,269],[2,3],[14,338]]],[2,[[6,267],[8,189],[12,268]]],[0,"Eigenschaften"],[0,"\u03B9\u03B4138\u03B5"],[2,[[2,21],[19,270],[64,334],[4,335]]],[2,[[2,23],[19,271],[14,333]]],[1,[272,289,293,297,301,305,309,313,317,321,325,329]],[2,[[4,273],[19,275],[2,3],[14,288]]],[2,[[6,232],[8,189],[12,274]]],[0,"\u03B9\u03B4201\u03B5"],[2,[[2,21],[19,68],[64,276],[4,285]]],[1,[277,281]],[2,[[67,68],[4,278],[2,72],[73,74],[62,184]]],[2,[[6,279],[8,189],[12,280]]],[0,"Durchschnitt"],[0,"\u03B9\u03B4309\u03B5"],[2,[[67,68],[4,282],[2,72],[73,74],[62,184]]],[2,[[6,283],[8,189],[12,284]]],[0,"Start"],[0,"\u03B9\u03B4310\u03B5"],[2,[[6,286],[8,189],[10,11],[12,287]]],[0,"EigenschaftsWert"],[0,"\u03B9\u03B4280\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,290],[19,275],[2,3],[14,292]]],[2,[[6,233],[8,189],[12,291]]],[0,"\u03B9\u03B4202\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,294],[19,275],[2,3],[14,296]]],[2,[[6,234],[8,189],[12,295]]],[0,"\u03B9\u03B4203\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,298],[19,275],[2,3],[14,300]]],[2,[[6,235],[8,189],[12,299]]],[0,"\u03B9\u03B4204\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,302],[19,275],[2,3],[14,304]]],[2,[[6,236],[8,189],[12,303]]],[0,"\u03B9\u03B4205\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,306],[19,275],[2,3],[14,308]]],[2,[[6,237],[8,189],[12,307]]],[0,"\u03B9\u03B4206\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,310],[19,275],[2,3],[14,312]]],[2,[[6,238],[8,189],[12,311]]],[0,"\u03B9\u03B4207\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,314],[19,275],[2,3],[14,316]]],[2,[[6,239],[8,189],[12,315]]],[0,"\u03B9\u03B4208\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,318],[19,275],[2,3],[14,320]]],[2,[[6,240],[8,189],[12,319]]],[0,"\u03B9\u03B4209\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,322],[19,275],[2,3],[14,324]]],[2,[[6,241],[8,189],[12,323]]],[0,"\u03B9\u03B4210\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,326],[19,275],[2,3],[14,328]]],[2,[[6,242],[8,189],[12,327]]],[0,"\u03B9\u03B4211\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,330],[19,275],[2,3],[14,332]]],[2,[[6,243],[8,189],[12,331]]],[0,"\u03B9\u03B4212\u03B5"],[2,[[16,17],[18,17]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[6,336],[8,189],[10,11],[12,337]]],[0,"StartEigenschaftswerte"],[0,"\u03B9\u03B4167\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,340],[19,343],[2,3],[14,503]]],[2,[[6,341],[8,189],[12,342]]],[0,"Mods"],[0,"\u03B9\u03B4139\u03B5"],[2,[[2,21],[19,344],[64,500],[4,501]]],[2,[[2,23],[19,345],[14,499]]],[1,[346,454,479]],[2,[[4,347],[19,349],[2,3],[14,453]]],[2,[[6,267],[8,28],[12,348]]],[0,"\u03B9\u03B4213\u03B5"],[2,[[2,21],[19,350],[64,449],[4,450]]],[2,[[2,351],[19,352],[14,448]]],[0,"choise"],[1,[353,374,378,382,386,390,394,398,402,406,410,414,418,423,428,433,438,443]],[2,[[4,354],[19,356],[2,3],[14,373]]],[2,[[6,232],[8,189],[12,355]]],[0,"\u03B9\u03B4320\u03B5"],[2,[[2,21],[19,68],[64,357],[4,370]]],[1,[358,362]],[2,[[67,68],[4,359],[2,72],[73,74],[62,169]]],[2,[[6,360],[8,189],[12,361]]],[0,"Mod"],[0,"\u03B9\u03B4449\u03B5"],[2,[[67,363],[4,364],[2,72],[73,11],[62,367]]],[0,"additiv"],[2,[[6,365],[8,189],[12,366]]],[0,"Type"],[0,"\u03B9\u03B4450\u03B5"],[2,[[83,84],[60,85],[2,62],[86,87],[88,368]]],[1,[363,369]],[0,"multiplikativ"],[2,[[6,371],[8,189],[10,11],[12,372]]],[0,"ModWert"],[0,"\u03B9\u03B4396\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,375],[19,356],[2,3],[14,377]]],[2,[[6,233],[8,189],[12,376]]],[0,"\u03B9\u03B4321\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,379],[19,356],[2,3],[14,381]]],[2,[[6,234],[8,189],[12,380]]],[0,"\u03B9\u03B4322\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,383],[19,356],[2,3],[14,385]]],[2,[[6,235],[8,189],[12,384]]],[0,"\u03B9\u03B4323\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,387],[19,356],[2,3],[14,389]]],[2,[[6,236],[8,189],[12,388]]],[0,"\u03B9\u03B4324\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,391],[19,356],[2,3],[14,393]]],[2,[[6,237],[8,189],[12,392]]],[0,"\u03B9\u03B4325\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,395],[19,356],[2,3],[14,397]]],[2,[[6,238],[8,189],[12,396]]],[0,"\u03B9\u03B4326\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,399],[19,356],[2,3],[14,401]]],[2,[[6,239],[8,189],[12,400]]],[0,"\u03B9\u03B4327\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,403],[19,356],[2,3],[14,405]]],[2,[[6,240],[8,189],[12,404]]],[0,"\u03B9\u03B4328\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,407],[19,356],[2,3],[14,409]]],[2,[[6,241],[8,189],[12,408]]],[0,"\u03B9\u03B4329\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,411],[19,356],[2,3],[14,413]]],[2,[[6,242],[8,189],[12,412]]],[0,"\u03B9\u03B4330\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,415],[19,356],[2,3],[14,417]]],[2,[[6,243],[8,189],[12,416]]],[0,"\u03B9\u03B4331\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,419],[19,356],[2,3],[14,422]]],[2,[[6,420],[8,189],[12,421]]],[0,"Kraft"],[0,"\u03B9\u03B4332\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,424],[19,356],[2,3],[14,427]]],[2,[[6,425],[8,189],[12,426]]],[0,"Geschwindigkeit"],[0,"\u03B9\u03B4333\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,429],[19,356],[2,3],[14,432]]],[2,[[6,430],[8,189],[12,431]]],[0,"Initiative"],[0,"\u03B9\u03B4334\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,434],[19,356],[2,3],[14,437]]],[2,[[6,435],[8,189],[12,436]]],[0,"Ausdauer"],[0,"\u03B9\u03B4335\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,439],[19,356],[2,3],[14,442]]],[2,[[6,440],[8,189],[12,441]]],[0,"Gl\xFCcksPunkte"],[0,"\u03B9\u03B4336\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,444],[19,356],[2,3],[14,447]]],[2,[[6,445],[8,189],[12,446]]],[0,"Gewicht"],[0,"\u03B9\u03B4337\u03B5"],[2,[[16,17],[18,17]]],[2,[[16,38],[18,17]]],[1,[]],[2,[[6,451],[8,189],[10,11],[12,452]]],[0,"EigenschaftsMods"],[0,"\u03B9\u03B4281\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,3],[4,455],[14,458],[19,459]]],[2,[[6,456],[8,28],[12,457]]],[0,"Besonderheiten"],[0,"\u03B9\u03B4214\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,21],[19,460],[64,478]]],[2,[[2,23],[19,461],[14,477]]],[1,[462]],[2,[[2,3],[19,463],[14,473],[4,474]]],[2,[[2,21],[19,68],[64,464]]],[1,[465,121]],[2,[[67,466],[4,467],[2,72],[73,11],[62,471]]],[0,"1"],[2,[[6,468],[8,469],[12,470]]],[0,"Stufe"],[0,"https://nota-game.github.io/schema/vNext/besonderheit.xsd"],[0,"\u03B9\u03B469\u03B5"],[2,[[56,170],[59,472],[60,61],[2,62]]],[0,"positiveInteger"],[2,[[16,38],[18,17]]],[2,[[6,475],[8,469],[12,476]]],[0,"Besonderheit"],[0,"\u03B9\u03B4338\u03B5"],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,3],[4,480],[14,483],[19,484]]],[2,[[6,481],[8,28],[12,482]]],[0,"Tags"],[0,"\u03B9\u03B4215\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,21],[19,485],[64,498]]],[2,[[2,23],[19,486],[14,497]]],[1,[487]],[2,[[2,3],[19,488],[14,493],[4,494]]],[2,[[2,21],[19,68],[64,489],[4,490]]],[1,[121]],[2,[[6,491],[8,28],[10,11],[12,492]]],[0,"NamedType"],[0,"\u03B9\u03B445\u03B5"],[2,[[16,38],[18,17]]],[2,[[6,495],[8,28],[12,496]]],[0,"Tag"],[0,"\u03B9\u03B4339\u03B5"],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,17],[18,17]]],[1,[]],[2,[[6,341],[8,28],[10,11],[12,502]]],[0,"\u03B9\u03B4168\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,505],[19,508],[2,3],[14,776]]],[2,[[6,506],[8,189],[12,507]]],[0,"Art"],[0,"\u03B9\u03B4140\u03B5"],[2,[[2,21],[19,509],[64,769],[4,773]]],[2,[[2,23],[19,510],[14,768]]],[1,[42,511,107,515,519,523,527,543]],[2,[[4,512],[19,46],[2,3],[14,514]]],[2,[[6,506],[8,189],[12,513]]],[0,"\u03B9\u03B4216\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,516],[19,199],[2,3],[14,518]]],[2,[[6,197],[8,189],[12,517]]],[0,"\u03B9\u03B4217\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,520],[19,269],[2,3],[14,522]]],[2,[[6,267],[8,189],[12,521]]],[0,"\u03B9\u03B4218\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,524],[19,343],[2,3],[14,526]]],[2,[[6,341],[8,189],[12,525]]],[0,"\u03B9\u03B4219\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,3],[19,528],[14,539],[4,540]]],[2,[[2,21],[19,529],[64,538]]],[2,[[2,23],[19,530],[14,537]]],[1,[531]],[2,[[2,3],[19,488],[14,532],[4,533]]],[2,[[16,38],[18,17]]],[2,[[6,534],[8,535],[12,536]]],[0,"Pfad"],[0,"https://nota-game.github.io/schema/vNext/pfad.xsd"],[0,"\u03B9\u03B490\u03B5"],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,17],[18,264]]],[2,[[6,541],[8,189],[12,542]]],[0,"StandardPfade"],[0,"\u03B9\u03B4220\u03B5"],[2,[[2,3],[4,544],[14,547],[19,548]]],[2,[[6,545],[8,189],[12,546]]],[0,"Morphe"],[0,"\u03B9\u03B4221\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,549],[64,767]]],[2,[[2,351],[19,550],[14,766]]],[1,[551]],[2,[[4,552],[19,555],[2,3],[14,765]]],[2,[[6,553],[8,189],[12,554]]],[0,"Morph"],[0,"\u03B9\u03B4340\u03B5"],[2,[[2,21],[19,556],[64,758],[4,762]]],[2,[[2,23],[19,557],[14,757]]],[1,[42,107,558,562,566,570,574,684]],[2,[[4,559],[19,199],[2,3],[14,561]]],[2,[[6,197],[8,189],[12,560]]],[0,"\u03B9\u03B4470\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,563],[19,269],[2,3],[14,565]]],[2,[[6,267],[8,189],[12,564]]],[0,"\u03B9\u03B4471\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,3],[19,528],[14,567],[4,568]]],[2,[[16,17],[18,264]]],[2,[[6,541],[8,189],[12,569]]],[0,"\u03B9\u03B4472\u03B5"],[2,[[4,571],[19,343],[2,3],[14,573]]],[2,[[6,341],[8,189],[12,572]]],[0,"\u03B9\u03B4473\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,3],[4,575],[14,578],[19,579]]],[2,[[6,576],[8,189],[12,577]]],[0,"Entwiklung"],[0,"\u03B9\u03B4474\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,580],[64,683]]],[2,[[2,351],[19,581],[14,682]]],[1,[582,645]],[2,[[2,3],[4,583],[14,586],[19,587]]],[2,[[6,584],[8,189],[12,585]]],[0,"Reihe"],[0,"\u03B9\u03B4506\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,588],[64,632]]],[2,[[2,23],[19,589],[14,631]]],[1,[590]],[2,[[2,23],[19,591],[14,630]]],[1,[42,592,596]],[2,[[2,3],[19,46],[14,593],[4,594]]],[2,[[16,17],[18,264]]],[2,[[6,109],[8,28],[12,595]]],[0,"\u03B9\u03B4527\u03B5"],[2,[[2,3],[4,597],[14,600],[19,601]]],[2,[[6,598],[8,189],[12,599]]],[0,"Spalte"],[0,"\u03B9\u03B4528\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,602],[64,618]]],[2,[[2,23],[19,603],[14,617]]],[1,[604,608,612]],[2,[[2,3],[19,163],[14,605],[4,606]]],[2,[[16,38],[18,264]]],[2,[[6,176],[8,28],[12,607]]],[0,"\u03B9\u03B4533\u03B5"],[2,[[4,609],[19,343],[2,3],[14,611]]],[2,[[6,341],[8,189],[12,610]]],[0,"\u03B9\u03B4534\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,613],[19,615],[2,3],[14,616]]],[2,[[6,167],[8,189],[12,614]]],[0,"\u03B9\u03B4535\u03B5"],[2,[[56,170],[59,185],[60,61],[2,62]]],[2,[[16,38],[18,17]]],[2,[[16,17],[18,17]]],[1,[619]],[2,[[67,68],[4,620],[2,72],[73,74],[62,623]]],[2,[[6,621],[8,189],[12,622]]],[0,"Quantil"],[0,"\u03B9\u03B4532\u03B5"],[2,[[83,624],[60,85],[2,62],[625,68],[626,68],[627,264],[628,629]]],[0,"Number"],[0,"minExclusive"],[0,"maxExclusive"],[0,"minInclusive"],[0,"maxInclusive"],[0,100],[2,[[16,17],[18,17]]],[2,[[16,17],[18,17]]],[1,[633,637,642]],[2,[[67,466],[4,634],[2,72],[73,11],[62,169]]],[2,[[6,635],[8,189],[12,636]]],[0,"step"],[0,"\u03B9\u03B4510\u03B5"],[2,[[67,638],[4,639],[2,72],[73,11],[62,87]]],[0,""],[2,[[6,640],[8,189],[12,641]]],[0,"einheit"],[0,"\u03B9\u03B4511\u03B5"],[2,[[67,68],[4,643],[2,72],[73,74],[62,87]]],[2,[[6,12],[8,189],[12,644]]],[0,"\u03B9\u03B4512\u03B5"],[2,[[2,3],[4,646],[14,649],[19,650]]],[2,[[6,647],[8,189],[12,648]]],[0,"Punkt"],[0,"\u03B9\u03B4507\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,651],[64,681]]],[2,[[2,23],[19,652],[14,680]]],[1,[42,653,657,661,665]],[2,[[2,3],[19,46],[14,654],[4,655]]],[2,[[16,17],[18,264]]],[2,[[6,109],[8,28],[12,656]]],[0,"\u03B9\u03B4519\u03B5"],[2,[[2,3],[19,163],[14,658],[4,659]]],[2,[[16,38],[18,264]]],[2,[[6,176],[8,28],[12,660]]],[0,"\u03B9\u03B4520\u03B5"],[2,[[4,662],[19,343],[2,3],[14,664]]],[2,[[6,341],[8,189],[12,663]]],[0,"\u03B9\u03B4521\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,3],[4,666],[14,669],[19,670]]],[2,[[6,667],[8,189],[12,668]]],[0,"Zeitpunkt"],[0,"\u03B9\u03B4522\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,68],[64,671]]],[1,[672,676]],[2,[[67,68],[4,673],[2,72],[73,11],[62,169]]],[2,[[6,674],[8,189],[12,675]]],[0,"alter"],[0,"\u03B9\u03B4529\u03B5"],[2,[[67,68],[4,677],[2,72],[73,74],[62,679]]],[2,[[6,621],[8,189],[12,678]]],[0,"\u03B9\u03B4530\u03B5"],[2,[[83,624],[60,85],[2,62],[625,68],[626,68],[627,264],[628,629]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,38],[18,17]]],[1,[]],[2,[[2,3],[4,685],[14,688],[19,689]]],[2,[[6,686],[8,189],[12,687]]],[0,"Lebensabschnitte"],[0,"\u03B9\u03B4475\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,690],[64,756]]],[2,[[2,23],[19,691],[14,755]]],[1,[692]],[2,[[4,693],[19,696],[2,3],[14,754]]],[2,[[6,694],[8,189],[12,695]]],[0,"Lebensabschnitt"],[0,"\u03B9\u03B4508\u03B5"],[2,[[2,21],[19,697],[64,726],[4,751]]],[2,[[2,23],[19,698],[14,725]]],[1,[699,713,717,721]],[2,[[2,3],[4,700],[14,703],[19,704]]],[2,[[6,701],[8,189],[12,702]]],[0,"Spielbar"],[0,"\u03B9\u03B4523\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,21],[19,705],[64,712]]],[2,[[2,23],[19,706],[14,711]]],[1,[707]],[2,[[2,3],[19,163],[14,708],[4,709]]],[2,[[16,38],[18,264]]],[2,[[6,176],[8,28],[12,710]]],[0,"\u03B9\u03B4531\u03B5"],[2,[[16,17],[18,17]]],[1,[]],[2,[[4,714],[19,46],[2,3],[14,716]]],[2,[[6,44],[8,189],[12,715]]],[0,"\u03B9\u03B4524\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,718],[19,46],[2,3],[14,720]]],[2,[[6,109],[8,189],[12,719]]],[0,"\u03B9\u03B4525\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,722],[19,343],[2,3],[14,724]]],[2,[[6,341],[8,189],[12,723]]],[0,"\u03B9\u03B4526\u03B5"],[2,[[16,17],[18,264]]],[2,[[16,17],[18,17]]],[1,[727,731,735,739,743,747,121]],[2,[[67,68],[4,728],[2,72],[73,74],[62,169]]],[2,[[6,729],[8,189],[12,730]]],[0,"startAlter"],[0,"\u03B9\u03B4513\u03B5"],[2,[[67,68],[4,732],[2,72],[73,74],[62,169]]],[2,[[6,733],[8,189],[12,734]]],[0,"endAlter"],[0,"\u03B9\u03B4514\u03B5"],[2,[[67,68],[4,736],[2,72],[73,74],[62,169]]],[2,[[6,737],[8,189],[12,738]]],[0,"minGr\xF6\xDFe"],[0,"\u03B9\u03B4515\u03B5"],[2,[[67,68],[4,740],[2,72],[73,74],[62,169]]],[2,[[6,741],[8,189],[12,742]]],[0,"minBMI"],[0,"\u03B9\u03B4516\u03B5"],[2,[[67,68],[4,744],[2,72],[73,74],[62,169]]],[2,[[6,745],[8,189],[12,746]]],[0,"maxGr\xF6\xDFe"],[0,"\u03B9\u03B4517\u03B5"],[2,[[67,68],[4,748],[2,72],[73,74],[62,169]]],[2,[[6,749],[8,189],[12,750]]],[0,"maxBMI"],[0,"\u03B9\u03B4518\u03B5"],[2,[[6,752],[8,189],[10,11],[12,753]]],[0,"LebensabschnittDefinition"],[0,"\u03B9\u03B4509\u03B5"],[2,[[16,38],[18,17]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,17],[18,17]]],[1,[759,121]],[2,[[67,78],[4,760],[2,72],[73,11],[62,82]]],[2,[[6,80],[8,189],[12,761]]],[0,"\u03B9\u03B4451\u03B5"],[2,[[6,763],[8,189],[10,11],[12,764]]],[0,"MorphDefinition"],[0,"\u03B9\u03B4397\u03B5"],[2,[[16,38],[18,17]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,17],[18,17]]],[1,[770]],[2,[[67,68],[4,771],[2,72],[73,74],[62,87]]],[2,[[6,123],[8,189],[12,772]]],[0,"\u03B9\u03B4182\u03B5"],[2,[[6,774],[8,189],[10,11],[12,775]]],[0,"ArtDefinition"],[0,"\u03B9\u03B4169\u03B5"],[2,[[16,38],[18,17]]],[2,[[16,17],[18,17]]],[1,[121]],[2,[[6,780],[8,189],[10,11],[12,781]]],[0,"GattungDefinition"],[0,"\u03B9\u03B4108\u03B5"],[2,[[16,38],[18,17]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,3],[19,786],[14,1029],[4,1030]]],[2,[[2,21],[19,787],[64,1025],[4,1026]]],[2,[[2,23],[19,788],[14,1024]]],[1,[42,107,789]],[2,[[4,790],[19,792],[2,3],[14,1023]]],[2,[[6,534],[8,535],[12,791]]],[0,"\u03B9\u03B491\u03B5"],[2,[[2,21],[19,793],[64,1019],[4,1020]]],[2,[[2,23],[19,794],[14,1018]]],[1,[42,107,795,886]],[2,[[4,796],[19,799],[2,3],[14,885]]],[2,[[6,797],[8,535],[12,798]]],[0,"Voraussetzung"],[0,"\u03B9\u03B4141\u03B5"],[2,[[2,21],[19,800],[64,881],[4,882]]],[2,[[2,351],[19,801],[14,880]]],[1,[802,872,876,823,834,858,862]],[2,[[4,803],[19,806],[2,3],[14,871]]],[2,[[6,804],[8,28],[12,805]]],[0,"Or"],[0,"\u03B9\u03B4249\u03B5"],[2,[[2,21],[19,807],[64,867],[4,868]]],[2,[[2,351],[19,808],[14,866]]],[1,[809,813,818,823,834,858,862]],[2,[[4,810],[19,806],[2,3],[14,812]]],[2,[[6,804],[8,28],[12,811]]],[0,"\u03B9\u03B4353\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,814],[19,806],[2,3],[14,817]]],[2,[[6,815],[8,28],[12,816]]],[0,"And"],[0,"\u03B9\u03B4354\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,819],[19,799],[2,3],[14,822]]],[2,[[6,820],[8,28],[12,821]]],[0,"Not"],[0,"\u03B9\u03B4355\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,824],[14,828],[19,829]]],[2,[[6,825],[8,826],[10,11],[12,827]]],[0,"Fertigkeit"],[0,"https://nota-game.github.io/schema/vNext/fertigkeit.xsd"],[0,"\u03B9\u03B423\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,68],[64,830]]],[1,[831,121]],[2,[[67,466],[4,832],[2,72],[73,11],[62,471]]],[2,[[6,468],[8,826],[12,833]]],[0,"\u03B9\u03B466\u03B5"],[2,[[2,3],[4,835],[14,839],[19,840]]],[2,[[6,836],[8,837],[10,11],[12,838]]],[0,"Talent"],[0,"https://nota-game.github.io/schema/vNext/talent.xsd"],[0,"\u03B9\u03B419\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,68],[64,841]]],[1,[842,854,121]],[2,[[67,843],[4,844],[2,72],[73,11],[62,847]]],[0,"Effektiv"],[2,[[6,845],[8,837],[12,846]]],[0,"LevelTyp"],[0,"\u03B9\u03B459\u03B5"],[2,[[83,84],[60,85],[2,62],[86,87],[88,848],[4,851]]],[1,[849,843,850]],[0,"Basis"],[0,"Unterst\xFCtzung"],[2,[[6,852],[8,837],[10,11],[12,853]]],[0,"LevelBedingungsTyp"],[0,"\u03B9\u03B494\u03B5"],[2,[[67,466],[4,855],[2,72],[73,11],[62,471]]],[2,[[6,856],[8,837],[12,857]]],[0,"Level"],[0,"\u03B9\u03B460\u03B5"],[2,[[2,3],[4,859],[14,861],[19,463]]],[2,[[6,475],[8,469],[10,11],[12,860]]],[0,"\u03B9\u03B425\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,863],[19,488],[2,3],[14,865]]],[2,[[6,495],[8,28],[10,11],[12,864]]],[0,"\u03B9\u03B42\u03B5"],[2,[[16,17],[18,17]]],[2,[[16,38],[18,17]]],[1,[]],[2,[[6,869],[8,28],[10,11],[12,870]]],[0,"BedingungsAuswahlen"],[0,"\u03B9\u03B4286\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,873],[19,806],[2,3],[14,875]]],[2,[[6,815],[8,28],[12,874]]],[0,"\u03B9\u03B4250\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,877],[19,799],[2,3],[14,879]]],[2,[[6,820],[8,28],[12,878]]],[0,"\u03B9\u03B4251\u03B5"],[2,[[16,17],[18,17]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[6,883],[8,28],[10,11],[12,884]]],[0,"BedingungsAuswahl"],[0,"\u03B9\u03B4173\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,3],[4,887],[14,890],[19,891]]],[2,[[6,888],[8,28],[10,11],[12,889]]],[0,"Levels"],[0,"\u03B9\u03B43\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,892],[64,1017]]],[2,[[2,23],[19,893],[14,1016]]],[1,[894]],[2,[[4,895],[19,897],[2,3],[14,1015]]],[2,[[6,856],[8,28],[12,896]]],[0,"\u03B9\u03B482\u03B5"],[2,[[2,21],[19,898],[64,1004],[4,1012]]],[2,[[2,23],[19,899],[14,1003]]],[1,[900,904,908,912,990]],[2,[[2,3],[19,163],[14,901],[4,902]]],[2,[[16,38],[18,264]]],[2,[[6,176],[8,28],[12,903]]],[0,"\u03B9\u03B4125\u03B5"],[2,[[2,3],[19,46],[14,905],[4,906]]],[2,[[16,17],[18,264]]],[2,[[6,44],[8,28],[12,907]]],[0,"\u03B9\u03B4126\u03B5"],[2,[[2,3],[19,46],[14,909],[4,910]]],[2,[[16,17],[18,264]]],[2,[[6,109],[8,28],[12,911]]],[0,"\u03B9\u03B4127\u03B5"],[2,[[2,3],[4,913],[14,915],[19,916]]],[2,[[6,797],[8,28],[12,914]]],[0,"\u03B9\u03B4128\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,21],[19,917],[64,989]]],[2,[[2,23],[19,918],[14,988]]],[1,[919,983]],[2,[[4,920],[19,923],[2,3],[14,982]]],[2,[[6,921],[8,28],[12,922]]],[0,"LevelVoraussetzung"],[0,"\u03B9\u03B4197\u03B5"],[2,[[2,21],[19,924],[64,978],[4,979]]],[2,[[2,351],[19,925],[14,977]]],[1,[926,960,964,968]],[2,[[4,927],[19,929],[2,3],[14,959]]],[2,[[6,804],[8,28],[12,928]]],[0,"\u03B9\u03B4316\u03B5"],[2,[[2,21],[19,930],[64,955],[4,956]]],[2,[[2,351],[19,931],[14,954]]],[1,[932,936,940,944]],[2,[[4,933],[19,929],[2,3],[14,935]]],[2,[[6,804],[8,28],[12,934]]],[0,"\u03B9\u03B4466\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,937],[19,929],[2,3],[14,939]]],[2,[[6,815],[8,28],[12,938]]],[0,"\u03B9\u03B4467\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,941],[19,923],[2,3],[14,943]]],[2,[[6,820],[8,28],[12,942]]],[0,"\u03B9\u03B4468\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,945],[14,947],[19,948]]],[2,[[6,856],[8,28],[12,946]]],[0,"\u03B9\u03B4469\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,68],[64,949]]],[1,[950,121]],[2,[[67,466],[4,951],[2,72],[73,11],[62,184]]],[2,[[6,952],[8,28],[12,953]]],[0,"mindestVorkommen"],[0,"\u03B9\u03B4491\u03B5"],[2,[[16,38],[18,17]]],[1,[]],[2,[[6,957],[8,28],[10,11],[12,958]]],[0,"LevelAuswahlen"],[0,"\u03B9\u03B4378\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,961],[19,929],[2,3],[14,963]]],[2,[[6,815],[8,28],[12,962]]],[0,"\u03B9\u03B4317\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,965],[19,923],[2,3],[14,967]]],[2,[[6,820],[8,28],[12,966]]],[0,"\u03B9\u03B4318\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,969],[14,971],[19,972]]],[2,[[6,856],[8,28],[12,970]]],[0,"\u03B9\u03B4319\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,68],[64,973]]],[1,[974,121]],[2,[[67,466],[4,975],[2,72],[73,11],[62,184]]],[2,[[6,952],[8,28],[12,976]]],[0,"\u03B9\u03B4414\u03B5"],[2,[[16,17],[18,17]]],[1,[]],[2,[[6,980],[8,28],[10,11],[12,981]]],[0,"LevelAuswahl"],[0,"\u03B9\u03B4267\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,984],[19,799],[2,3],[14,987]]],[2,[[6,985],[8,28],[12,986]]],[0,"Zus\xE4tzlich"],[0,"\u03B9\u03B4198\u03B5"],[2,[[16,17],[18,264]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,351],[19,991],[14,1002]]],[1,[823,992,858,862]],[2,[[2,3],[4,993],[14,995],[19,996]]],[2,[[6,836],[8,28],[12,994]]],[0,"\u03B9\u03B4178\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,68],[64,997]]],[1,[998,121]],[2,[[67,68],[4,999],[2,72],[73,74],[62,471]]],[2,[[6,1e3],[8,28],[12,1001]]],[0,"EP"],[0,"\u03B9\u03B4268\u03B5"],[2,[[16,38],[18,264]]],[2,[[16,17],[18,17]]],[1,[1005,1009]],[2,[[67,466],[4,1006],[2,72],[73,11],[62,184]]],[2,[[6,1007],[8,28],[12,1008]]],[0,"WiederhoteNutzung"],[0,"\u03B9\u03B4114\u03B5"],[2,[[67,68],[4,1010],[2,72],[73,74],[62,87]]],[2,[[6,123],[8,28],[12,1011]]],[0,"\u03B9\u03B4115\u03B5"],[2,[[6,1013],[8,28],[10,11],[12,1014]]],[0,"LevelDefinition"],[0,"\u03B9\u03B4105\u03B5"],[2,[[16,38],[18,17]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,17],[18,17]]],[1,[121]],[2,[[6,1021],[8,535],[10,11],[12,1022]]],[0,"PfadDefinition"],[0,"\u03B9\u03B4109\u03B5"],[2,[[16,38],[18,17]]],[2,[[16,17],[18,17]]],[1,[121]],[2,[[6,1027],[8,535],[10,11],[12,1028]]],[0,"PfadeDefinition"],[0,"\u03B9\u03B446\u03B5"],[2,[[16,38],[18,17]]],[2,[[6,1031],[8,535],[12,1032]]],[0,"Pfade"],[0,"\u03B9\u03B477\u03B5"],[2,[[2,3],[19,1034],[14,1219],[4,1220]]],[2,[[2,21],[19,1035],[64,1214]]],[2,[[2,23],[19,1036],[14,1213]]],[1,[1037,1042]],[2,[[4,1038],[19,46],[2,3],[14,1041]]],[2,[[6,1039],[8,837],[12,1040]]],[0,"Kategorie"],[0,"\u03B9\u03B492\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,1043],[19,1045],[2,3],[14,1212]]],[2,[[6,836],[8,837],[12,1044]]],[0,"\u03B9\u03B493\u03B5"],[2,[[2,21],[19,1046],[64,1196],[4,1209]]],[2,[[2,23],[19,1047],[14,1195]]],[1,[1048,42,107,1108,1132,1152]],[2,[[2,3],[4,1049],[14,1052],[19,1053]]],[2,[[6,1050],[8,837],[12,1051]]],[0,"Probe"],[0,"\u03B9\u03B4142\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1054],[64,1107]]],[2,[[2,351],[19,1055],[14,1105]]],[1,[1056,1060,1064,1068,1073,1077,1081,1085,1089,1093,1097,1101]],[2,[[2,3],[4,1057],[14,1059],[19,68]]],[2,[[6,240],[8,837],[12,1058]]],[0,"\u03B9\u03B4225\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,1061],[14,1063],[19,68]]],[2,[[6,241],[8,837],[12,1062]]],[0,"\u03B9\u03B4226\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,1065],[14,1067],[19,68]]],[2,[[6,236],[8,837],[12,1066]]],[0,"\u03B9\u03B4227\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,1069],[14,1072],[19,68]]],[2,[[6,1070],[8,837],[12,1071]]],[0,"Pr\xE4zision"],[0,"\u03B9\u03B4228\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,1074],[14,1076],[19,68]]],[2,[[6,239],[8,837],[12,1075]]],[0,"\u03B9\u03B4229\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,1078],[14,1080],[19,68]]],[2,[[6,238],[8,837],[12,1079]]],[0,"\u03B9\u03B4230\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,1082],[14,1084],[19,68]]],[2,[[6,234],[8,837],[12,1083]]],[0,"\u03B9\u03B4231\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,1086],[14,1088],[19,68]]],[2,[[6,235],[8,837],[12,1087]]],[0,"\u03B9\u03B4232\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,1090],[14,1092],[19,68]]],[2,[[6,242],[8,837],[12,1091]]],[0,"\u03B9\u03B4233\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,1094],[14,1096],[19,68]]],[2,[[6,243],[8,837],[12,1095]]],[0,"\u03B9\u03B4234\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,1098],[14,1100],[19,68]]],[2,[[6,232],[8,837],[12,1099]]],[0,"\u03B9\u03B4235\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,1102],[14,1104],[19,68]]],[2,[[6,233],[8,837],[12,1103]]],[0,"\u03B9\u03B4236\u03B5"],[2,[[16,17],[18,17]]],[2,[[16,1106],[18,1106]]],[0,3],[1,[]],[2,[[4,1109],[19,1112],[2,3],[14,1131]]],[2,[[6,1110],[8,837],[12,1111]]],[0,"Verbreitung"],[0,"\u03B9\u03B4143\u03B5"],[2,[[2,21],[19,1113],[64,1125],[4,1129]]],[2,[[2,23],[19,1114],[14,1124]]],[1,[1115]],[2,[[2,3],[4,1116],[14,1118],[19,1119]]],[2,[[6,534],[8,28],[12,1117]]],[0,"\u03B9\u03B4237\u03B5"],[2,[[16,38],[18,264]]],[2,[[2,21],[19,68],[64,1120]]],[1,[1121,121]],[2,[[67,68],[4,1122],[2,72],[73,74],[62,184]]],[2,[[6,1110],[8,28],[12,1123]]],[0,"\u03B9\u03B4311\u03B5"],[2,[[16,17],[18,17]]],[1,[1126]],[2,[[67,68],[4,1127],[2,72],[73,74],[62,471]]],[2,[[6,167],[8,28],[12,1128]]],[0,"\u03B9\u03B4183\u03B5"],[2,[[6,1110],[8,28],[10,11],[12,1130]]],[0,"\u03B9\u03B4171\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,1133],[14,1135],[19,1136]]],[2,[[6,856],[8,837],[12,1134]]],[0,"\u03B9\u03B4144\u03B5"],[2,[[16,38],[18,264]]],[2,[[2,21],[19,1137],[64,1148]]],[2,[[2,23],[19,1138],[14,1147]]],[1,[1139,1143]],[2,[[4,1140],[19,799],[2,3],[14,1142]]],[2,[[6,797],[8,837],[12,1141]]],[0,"\u03B9\u03B4238\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1144],[19,343],[2,3],[14,1146]]],[2,[[6,341],[8,837],[12,1145]]],[0,"\u03B9\u03B4239\u03B5"],[2,[[16,17],[18,264]]],[2,[[16,17],[18,17]]],[1,[1149]],[2,[[67,68],[4,1150],[2,72],[73,74],[62,471]]],[2,[[6,167],[8,837],[12,1151]]],[0,"\u03B9\u03B4184\u03B5"],[2,[[4,1153],[19,1156],[2,3],[14,1194]]],[2,[[6,1154],[8,837],[12,1155]]],[0,"Ableitungen"],[0,"\u03B9\u03B4145\u03B5"],[2,[[2,21],[19,1157],[64,1190],[4,1191]]],[2,[[2,23],[19,1158],[14,1189]]],[1,[1159]],[2,[[2,351],[19,1160],[14,1188]]],[1,[1161,1172]],[2,[[2,3],[4,1162],[14,1165],[19,1166]]],[2,[[6,1163],[8,837],[10,11],[12,1164]]],[0,"Ableitung"],[0,"\u03B9\u03B420\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,68],[64,1167]]],[1,[1168,121]],[2,[[67,68],[4,1169],[2,72],[73,74],[62,184]]],[2,[[6,1170],[8,837],[12,1171]]],[0,"Anzahl"],[0,"\u03B9\u03B462\u03B5"],[2,[[2,3],[4,1173],[14,1176],[19,1177]]],[2,[[6,1174],[8,837],[10,11],[12,1175]]],[0,"Max"],[0,"\u03B9\u03B421\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1178],[64,1184]]],[2,[[2,23],[19,1179],[14,1183]]],[1,[1180]],[2,[[2,351],[19,1181],[14,1182]]],[1,[1161,1172]],[2,[[16,38],[18,17]]],[2,[[16,17],[18,17]]],[1,[1185]],[2,[[67,466],[4,1186],[2,72],[73,11],[62,184]]],[2,[[6,1170],[8,837],[12,1187]]],[0,"\u03B9\u03B464\u03B5"],[2,[[16,38],[18,17]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[6,1192],[8,837],[10,11],[12,1193]]],[0,"AbleitungsAuswahl"],[0,"\u03B9\u03B4172\u03B5"],[2,[[16,17],[18,264]]],[2,[[16,17],[18,17]]],[1,[1197,1200]],[2,[[67,68],[4,1198],[2,72],[73,74],[62,87]]],[2,[[6,123],[8,837],[12,1199]]],[0,"\u03B9\u03B4117\u03B5"],[2,[[67,68],[4,1201],[2,72],[73,74],[62,1204]]],[2,[[6,1202],[8,837],[12,1203]]],[0,"Komplexit\xE4t"],[0,"\u03B9\u03B4118\u03B5"],[2,[[83,1205],[60,85],[2,62],[1205,1206],[4,1207]]],[0,"pattern"],[4,{source:"[A-Z]",flags:""}],[2,[[6,1202],[8,837],[10,11],[12,1208]]],[0,"\u03B9\u03B4146\u03B5"],[2,[[6,1210],[8,837],[10,11],[12,1211]]],[0,"TalentDefinition"],[0,"\u03B9\u03B4110\u03B5"],[2,[[16,38],[18,264]]],[2,[[16,17],[18,17]]],[1,[1215]],[2,[[67,68],[4,1216],[2,72],[73,74],[62,87]]],[2,[[6,1217],[8,837],[12,1218]]],[0,"KategorieId"],[0,"\u03B9\u03B458\u03B5"],[2,[[16,38],[18,17]]],[2,[[6,1221],[8,837],[12,1222]]],[0,"Talente"],[0,"\u03B9\u03B478\u03B5"],[2,[[2,3],[19,1224],[14,1279],[4,1280]]],[2,[[2,21],[19,1225],[64,1275]]],[2,[[2,23],[19,1226],[14,1274]]],[1,[1227,1231]],[2,[[4,1228],[19,46],[2,3],[14,1230]]],[2,[[6,1039],[8,826],[12,1229]]],[0,"\u03B9\u03B495\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,1232],[19,1234],[2,3],[14,1273]]],[2,[[6,825],[8,826],[12,1233]]],[0,"\u03B9\u03B496\u03B5"],[2,[[2,21],[19,1235],[64,1266],[4,1270]]],[2,[[2,23],[19,1236],[14,1265]]],[1,[42,1237]],[2,[[2,3],[4,1238],[14,1240],[19,1241]]],[2,[[6,468],[8,826],[12,1239]]],[0,"\u03B9\u03B4147\u03B5"],[2,[[16,38],[18,17]]],[2,[[2,21],[19,1242],[64,1261]]],[2,[[2,23],[19,1243],[14,1260]]],[1,[1244,107,1248,1252,1256]],[2,[[2,3],[19,46],[14,1245],[4,1246]]],[2,[[16,17],[18,264]]],[2,[[6,44],[8,28],[12,1247]]],[0,"\u03B9\u03B4240\u03B5"],[2,[[4,1249],[19,1112],[2,3],[14,1251]]],[2,[[6,1110],[8,826],[12,1250]]],[0,"\u03B9\u03B4241\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,1253],[19,343],[2,3],[14,1255]]],[2,[[6,341],[8,826],[12,1254]]],[0,"\u03B9\u03B4242\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1257],[19,799],[2,3],[14,1259]]],[2,[[6,797],[8,826],[12,1258]]],[0,"\u03B9\u03B4243\u03B5"],[2,[[16,17],[18,264]]],[2,[[16,17],[18,17]]],[1,[1262]],[2,[[67,68],[4,1263],[2,72],[73,74],[62,184]]],[2,[[6,176],[8,826],[12,1264]]],[0,"\u03B9\u03B4185\u03B5"],[2,[[16,17],[18,17]]],[1,[1267]],[2,[[67,68],[4,1268],[2,72],[73,74],[62,87]]],[2,[[6,123],[8,826],[12,1269]]],[0,"\u03B9\u03B4119\u03B5"],[2,[[6,1271],[8,826],[10,11],[12,1272]]],[0,"FertigkeitDefinition"],[0,"\u03B9\u03B4111\u03B5"],[2,[[16,38],[18,264]]],[2,[[16,17],[18,17]]],[1,[1276]],[2,[[67,68],[4,1277],[2,72],[73,74],[62,87]]],[2,[[6,1217],[8,826],[12,1278]]],[0,"\u03B9\u03B465\u03B5"],[2,[[16,38],[18,17]]],[2,[[6,1281],[8,826],[12,1282]]],[0,"Fertigkeiten"],[0,"\u03B9\u03B479\u03B5"],[2,[[2,3],[19,1284],[14,1380],[4,1381]]],[2,[[2,21],[19,1285],[64,1376]]],[2,[[2,23],[19,1286],[14,1375]]],[1,[1287,1291]],[2,[[4,1288],[19,46],[2,3],[14,1290]]],[2,[[6,1039],[8,469],[12,1289]]],[0,"\u03B9\u03B497\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,1292],[19,1294],[2,3],[14,1374]]],[2,[[6,475],[8,469],[12,1293]]],[0,"\u03B9\u03B498\u03B5"],[2,[[2,21],[19,1295],[64,1366],[4,1371]]],[2,[[2,23],[19,1296],[14,1365]]],[1,[42,1297,1302]],[2,[[4,1298],[19,57],[2,3],[14,1301]]],[2,[[6,1299],[8,469],[12,1300]]],[0,"SubKategorie"],[0,"\u03B9\u03B4148\u03B5"],[2,[[16,38],[18,264]]],[2,[[2,3],[4,1303],[14,1305],[19,1306]]],[2,[[6,468],[8,469],[12,1304]]],[0,"\u03B9\u03B4149\u03B5"],[2,[[16,38],[18,17]]],[2,[[2,21],[19,1307],[64,1364]]],[2,[[2,23],[19,1308],[14,1363]]],[1,[1309,107,1313,1317,1359]],[2,[[2,3],[19,46],[14,1310],[4,1311]]],[2,[[16,17],[18,264]]],[2,[[6,44],[8,28],[12,1312]]],[0,"\u03B9\u03B4244\u03B5"],[2,[[2,3],[19,163],[14,1314],[4,1315]]],[2,[[16,38],[18,264]]],[2,[[6,176],[8,28],[12,1316]]],[0,"\u03B9\u03B4245\u03B5"],[2,[[4,1318],[19,1320],[2,3],[14,1358]]],[2,[[6,797],[8,469],[12,1319]]],[0,"\u03B9\u03B4246\u03B5"],[2,[[2,21],[19,1321],[64,1355],[4,1356]]],[2,[[2,351],[19,1322],[14,1354]]],[1,[1323,1346,1350,858,862]],[2,[[4,1324],[19,1326],[2,3],[14,1345]]],[2,[[6,804],[8,469],[12,1325]]],[0,"\u03B9\u03B4347\u03B5"],[2,[[2,21],[19,1327],[64,1342],[4,1343]]],[2,[[2,351],[19,1328],[14,1341]]],[1,[1329,1333,1337,858,862]],[2,[[4,1330],[19,1326],[2,3],[14,1332]]],[2,[[6,804],[8,469],[12,1331]]],[0,"\u03B9\u03B4479\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,1334],[19,1326],[2,3],[14,1336]]],[2,[[6,815],[8,469],[12,1335]]],[0,"\u03B9\u03B4480\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,1338],[19,1320],[2,3],[14,1340]]],[2,[[6,820],[8,469],[12,1339]]],[0,"\u03B9\u03B4481\u03B5"],[2,[[16,17],[18,17]]],[2,[[16,38],[18,17]]],[1,[]],[2,[[6,869],[8,469],[10,11],[12,1344]]],[0,"\u03B9\u03B4399\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,1347],[19,1326],[2,3],[14,1349]]],[2,[[6,815],[8,469],[12,1348]]],[0,"\u03B9\u03B4348\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,1351],[19,1320],[2,3],[14,1353]]],[2,[[6,820],[8,469],[12,1352]]],[0,"\u03B9\u03B4349\u03B5"],[2,[[16,17],[18,17]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[6,883],[8,469],[10,11],[12,1357]]],[0,"\u03B9\u03B4284\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1360],[19,343],[2,3],[14,1362]]],[2,[[6,341],[8,469],[12,1361]]],[0,"\u03B9\u03B4247\u03B5"],[2,[[16,17],[18,264]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,17],[18,17]]],[1,[1367,121]],[2,[[67,115],[4,1368],[2,72],[73,11],[62,119]]],[2,[[6,1369],[8,469],[12,1370]]],[0,"Gebunden"],[0,"\u03B9\u03B4120\u03B5"],[2,[[6,1372],[8,469],[10,11],[12,1373]]],[0,"BesonderheitDefinition"],[0,"\u03B9\u03B4112\u03B5"],[2,[[16,38],[18,264]]],[2,[[16,17],[18,17]]],[1,[1377]],[2,[[67,68],[4,1378],[2,72],[73,74],[62,87]]],[2,[[6,1217],[8,469],[12,1379]]],[0,"\u03B9\u03B468\u03B5"],[2,[[16,38],[18,17]]],[2,[[6,456],[8,469],[12,1382]]],[0,"\u03B9\u03B480\u03B5"],[2,[[2,3],[4,1384],[14,1388],[19,1389]]],[2,[[6,1385],[8,1386],[10,11],[12,1387]]],[0,"Taktiken"],[0,"https://nota-game.github.io/schema/vNext/kampf/aktionen.xsd"],[0,"\u03B9\u03B426\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1390],[64,1578]]],[2,[[2,23],[19,1391],[14,1577]]],[1,[1392,1556]],[2,[[2,3],[4,1393],[14,1396],[19,1397]]],[2,[[6,1394],[8,1386],[12,1395]]],[0,"Taktik"],[0,"\u03B9\u03B499\u03B5"],[2,[[16,38],[18,264]]],[2,[[2,21],[19,1398],[64,1530]]],[2,[[2,23],[19,1399],[14,1529]]],[1,[1400,1404,1409,1414,1419,1424,1429,1509,1513]],[2,[[4,1401],[19,57],[2,3],[14,1403]]],[2,[[6,109],[8,1386],[12,1402]]],[0,"\u03B9\u03B4150\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,1405],[19,57],[2,3],[14,1408]]],[2,[[6,1406],[8,1386],[12,1407]]],[0,"Bedingung"],[0,"\u03B9\u03B4151\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1410],[19,57],[2,3],[14,1413]]],[2,[[6,1411],[8,1386],[12,1412]]],[0,"SofortigerEffekt"],[0,"\u03B9\u03B4152\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1415],[19,57],[2,3],[14,1418]]],[2,[[6,1416],[8,1386],[12,1417]]],[0,"GarantierterEffekt"],[0,"\u03B9\u03B4153\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1420],[19,57],[2,3],[14,1423]]],[2,[[6,1421],[8,1386],[12,1422]]],[0,"Erfolg"],[0,"\u03B9\u03B4154\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1425],[19,57],[2,3],[14,1428]]],[2,[[6,1426],[8,1386],[12,1427]]],[0,"Misserfolg"],[0,"\u03B9\u03B4155\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,3],[4,1430],[14,1432],[19,1433]]],[2,[[6,360],[8,1386],[12,1431]]],[0,"\u03B9\u03B4156\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,21],[19,1434],[64,1498]]],[2,[[2,351],[19,1435],[14,1497]]],[1,[1436,1457,1467,1475,1483]],[2,[[2,3],[4,1437],[14,1440],[19,1441]]],[2,[[6,1438],[8,1386],[10,11],[12,1439]]],[0,"ConcreteModValueType"],[0,"\u03B9\u03B428\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,68],[64,1442]]],[1,[1443,1447]],[2,[[67,68],[4,1444],[2,72],[73,74],[62,184]]],[2,[[6,1445],[8,1386],[12,1446]]],[0,"Value"],[0,"\u03B9\u03B472\u03B5"],[2,[[67,68],[4,1448],[2,72],[73,74],[62,1450]]],[2,[[6,365],[8,1386],[12,1449]]],[0,"\u03B9\u03B473\u03B5"],[2,[[83,84],[60,85],[2,62],[86,87],[88,1451],[4,1454]]],[1,[1452,1453]],[0,"Percent"],[0,"Absolute"],[2,[[6,1455],[8,1386],[10,11],[12,1456]]],[0,"ModType"],[0,"\u03B9\u03B4101\u03B5"],[2,[[2,3],[4,1458],[14,1461],[19,1462]]],[2,[[6,1459],[8,1386],[10,11],[12,1460]]],[0,"VariableModValueType"],[0,"\u03B9\u03B429\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,68],[64,1463]]],[1,[1464]],[2,[[67,68],[4,1465],[2,72],[73,11],[62,87]]],[2,[[6,1445],[8,1386],[12,1466]]],[0,"\u03B9\u03B474\u03B5"],[2,[[2,3],[4,1468],[14,1471],[19,1472]]],[2,[[6,1469],[8,1386],[10,11],[12,1470]]],[0,"SubstractModValueType"],[0,"\u03B9\u03B431\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1473],[64,1496]]],[2,[[2,351],[19,1474],[14,1495]]],[1,[1436,1457,1475,1467,1483]],[2,[[2,3],[4,1476],[14,1479],[19,1480]]],[2,[[6,1477],[8,1386],[10,11],[12,1478]]],[0,"AddModValueType"],[0,"\u03B9\u03B430\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1481],[64,1494]]],[2,[[2,351],[19,1482],[14,1493]]],[1,[1436,1457,1467,1475,1483]],[2,[[2,3],[4,1484],[14,1487],[19,1488]]],[2,[[6,1485],[8,1386],[10,11],[12,1486]]],[0,"MultiplyModValueType"],[0,"\u03B9\u03B432\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1489],[64,1492]]],[2,[[2,351],[19,1490],[14,1491]]],[1,[1436,1457,1467,1475,1483]],[2,[[16,38],[18,17]]],[1,[]],[2,[[16,38],[18,17]]],[1,[]],[2,[[16,38],[18,17]]],[1,[]],[2,[[16,17],[18,17]]],[1,[1499]],[2,[[67,68],[4,1500],[2,72],[73,74],[62,1503]]],[2,[[6,1501],[8,1386],[12,1502]]],[0,"ModifierType"],[0,"\u03B9\u03B4186\u03B5"],[2,[[83,84],[60,85],[2,62],[86,87],[88,1504],[4,1507]]],[1,[1505,1506]],[0,"Malus"],[0,"Bonus"],[2,[[6,1501],[8,1386],[10,11],[12,1508]]],[0,"\u03B9\u03B4248\u03B5"],[2,[[4,1510],[19,799],[2,3],[14,1512]]],[2,[[6,797],[8,1386],[12,1511]]],[0,"\u03B9\u03B4157\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,3],[4,1514],[14,1516],[19,1517]]],[2,[[6,267],[8,1386],[12,1515]]],[0,"\u03B9\u03B4158\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,21],[19,1518],[64,1528]]],[2,[[2,23],[19,1519],[14,1527]]],[1,[1520]],[2,[[2,3],[19,1521],[14,1523],[4,1524]]],[2,[[2,21],[19,68],[64,1522]]],[1,[121]],[2,[[16,38],[18,17]]],[2,[[6,1525],[8,1386],[12,1526]]],[0,"Eigenschaft"],[0,"\u03B9\u03B4252\u03B5"],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,17],[18,17]]],[1,[1531,1534,1544,121]],[2,[[67,68],[4,1532],[2,72],[73,74],[62,184]]],[2,[[6,176],[8,1386],[12,1533]]],[0,"\u03B9\u03B4121\u03B5"],[2,[[67,68],[4,1535],[2,72],[73,74],[62,1538]]],[2,[[6,1536],[8,1386],[12,1537]]],[0,"Belastung"],[0,"\u03B9\u03B4122\u03B5"],[2,[[83,84],[60,85],[2,62],[86,169],[88,1539]]],[1,[1540,1541,466,1542,1543]],[0,"0"],[0,"0.5"],[0,"1.5"],[0,"2"],[2,[[67,68],[4,1545],[2,72],[73,74],[62,1548]]],[2,[[6,1546],[8,1386],[12,1547]]],[0,"Typ"],[0,"\u03B9\u03B4123\u03B5"],[2,[[83,84],[60,85],[2,62],[86,87],[88,1549],[4,1553]]],[1,[1550,1551,1552,90]],[0,"Offensiv"],[0,"Defensiv"],[0,"Unterst\xFCtzend"],[2,[[6,1554],[8,1386],[10,11],[12,1555]]],[0,"ActionType"],[0,"\u03B9\u03B4159\u03B5"],[2,[[2,3],[4,1557],[14,1559],[19,1560]]],[2,[[6,267],[8,1386],[12,1558]]],[0,"\u03B9\u03B4100\u03B5"],[2,[[16,38],[18,264]]],[2,[[2,21],[19,1561],[64,1576]]],[2,[[2,23],[19,1562],[14,1575]]],[1,[1563]],[2,[[2,3],[4,1564],[14,1566],[19,1567]]],[2,[[6,1525],[8,1386],[12,1565]]],[0,"\u03B9\u03B4160\u03B5"],[2,[[16,38],[18,264]]],[2,[[2,21],[19,1568],[64,1571]]],[2,[[2,23],[19,1569],[14,1570]]],[1,[42,107]],[2,[[16,17],[18,17]]],[1,[1572]],[2,[[67,68],[4,1573],[2,72],[73,74],[62,87]]],[2,[[6,123],[8,1386],[12,1574]]],[0,"\u03B9\u03B4187\u03B5"],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,3],[4,1580],[14,1584],[19,1585]]],[2,[[6,1581],[8,1582],[10,11],[12,1583]]],[0,"Ausstattung"],[0,"https://nota-game.github.io/schema/vNext/kampf/ausstattung.xsd"],[0,"\u03B9\u03B433\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1586],[64,2001]]],[2,[[2,23],[19,1587],[14,2e3]]],[1,[1588,1831,1976]],[2,[[2,3],[4,1589],[14,1592],[19,1593]]],[2,[[6,1590],[8,1582],[12,1591]]],[0,"Waffen"],[0,"\u03B9\u03B4102\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1594],[64,1830]]],[2,[[2,23],[19,1595],[14,1829]]],[1,[1596,1687]],[2,[[4,1597],[19,1600],[2,3],[14,1686]]],[2,[[6,1598],[8,1582],[12,1599]]],[0,"Nahkampfwaffe"],[0,"\u03B9\u03B4161\u03B5"],[2,[[2,21],[19,1601],[64,1661],[4,1683]]],[2,[[2,23],[19,1602],[14,1660]]],[1,[42,107,1603,1630,1645]],[2,[[2,3],[4,1604],[14,1607],[19,1608]]],[2,[[6,1605],[8,1582],[12,1606]]],[0,"Schaden"],[0,"\u03B9\u03B4253\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1609],[64,1629]]],[2,[[2,23],[19,1610],[14,1628]]],[1,[1611,1623]],[2,[[4,1612],[19,1615],[2,3],[14,1622]]],[2,[[6,1613],[8,1582],[12,1614]]],[0,"Wucht"],[0,"\u03B9\u03B4356\u03B5"],[2,[[2,21],[19,68],[64,1616],[4,1620]]],[1,[1617]],[2,[[67,68],[4,1618],[2,72],[73,11],[62,471]]],[2,[[6,1605],[8,1582],[12,1619]]],[0,"\u03B9\u03B4455\u03B5"],[2,[[6,1605],[8,1582],[10,11],[12,1621]]],[0,"\u03B9\u03B4403\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1624],[19,1615],[2,3],[14,1627]]],[2,[[6,1625],[8,1582],[12,1626]]],[0,"Schnitt"],[0,"\u03B9\u03B4357\u03B5"],[2,[[16,17],[18,264]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,3],[4,1631],[14,1633],[19,1634]]],[2,[[6,267],[8,1582],[12,1632]]],[0,"\u03B9\u03B4254\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,21],[19,1635],[64,1644]]],[2,[[2,23],[19,1636],[14,1643]]],[1,[1637]],[2,[[2,3],[19,1638],[14,1640],[4,1641]]],[2,[[2,21],[19,68],[64,1639]]],[1,[121]],[2,[[16,38],[18,17]]],[2,[[6,1525],[8,1582],[12,1642]]],[0,"\u03B9\u03B4358\u03B5"],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,3],[4,1646],[14,1648],[19,1649]]],[2,[[6,1221],[8,1582],[12,1647]]],[0,"\u03B9\u03B4255\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,21],[19,1650],[64,1659]]],[2,[[2,23],[19,1651],[14,1658]]],[1,[1652]],[2,[[2,3],[4,1653],[14,1655],[19,1656]]],[2,[[6,836],[8,1582],[12,1654]]],[0,"\u03B9\u03B4359\u03B5"],[2,[[16,38],[18,17]]],[2,[[2,21],[19,68],[64,1657]]],[1,[121]],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,17],[18,17]]],[1,[1662,1671,1675,1679,121]],[2,[[67,1663],[4,1664],[2,72],[73,11],[62,1667]]],[0,"Offensiv|Defensiv"],[2,[[6,1665],[8,1582],[12,1666]]],[0,"WaffenTyp"],[0,"\u03B9\u03B4188\u03B5"],[2,[[83,84],[60,85],[2,62],[86,87],[88,1668],[4,1669]]],[1,[1550,1551,1663]],[2,[[6,1665],[8,1582],[10,11],[12,1670]]],[0,"\u03B9\u03B4263\u03B5"],[2,[[67,1540],[4,1672],[2,72],[73,11],[62,184]]],[2,[[6,1673],[8,1582],[12,1674]]],[0,"DefensivModifizierer"],[0,"\u03B9\u03B4189\u03B5"],[2,[[67,1540],[4,1676],[2,72],[73,11],[62,184]]],[2,[[6,1677],[8,1582],[12,1678]]],[0,"OffensivModifizierer"],[0,"\u03B9\u03B4190\u03B5"],[2,[[67,68],[4,1680],[2,72],[73,74],[62,184]]],[2,[[6,1681],[8,1582],[12,1682]]],[0,"Distanzklasse"],[0,"\u03B9\u03B4191\u03B5"],[2,[[6,1684],[8,1582],[10,11],[12,1685]]],[0,"NahkampfWaffenDefinition"],[0,"\u03B9\u03B4174\u03B5"],[2,[[16,38],[18,264]]],[2,[[4,1688],[19,1691],[2,3],[14,1828]]],[2,[[6,1689],[8,1582],[12,1690]]],[0,"Fernkampfwaffe"],[0,"\u03B9\u03B4162\u03B5"],[2,[[2,21],[19,1692],[64,1815],[4,1825]]],[2,[[2,23],[19,1693],[14,1814]]],[1,[42,107,1694,1711,1726,1765,1786,1799]],[2,[[2,3],[4,1695],[14,1697],[19,1698]]],[2,[[6,1605],[8,1582],[12,1696]]],[0,"\u03B9\u03B4257\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1699],[64,1710]]],[2,[[2,23],[19,1700],[14,1709]]],[1,[1701,1705]],[2,[[4,1702],[19,1615],[2,3],[14,1704]]],[2,[[6,1613],[8,1582],[12,1703]]],[0,"\u03B9\u03B4360\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1706],[19,1615],[2,3],[14,1708]]],[2,[[6,1625],[8,1582],[12,1707]]],[0,"\u03B9\u03B4361\u03B5"],[2,[[16,17],[18,264]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,3],[4,1712],[14,1715],[19,1716]]],[2,[[6,1713],[8,1582],[12,1714]]],[0,"Schusseigenschaften"],[0,"\u03B9\u03B4258\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,68],[64,1717]]],[1,[1718,1722]],[2,[[67,68],[4,1719],[2,72],[73,74],[62,471]]],[2,[[6,1720],[8,1582],[12,1721]]],[0,"Schussfrequenz"],[0,"\u03B9\u03B4312\u03B5"],[2,[[67,68],[4,1723],[2,72],[73,74],[62,471]]],[2,[[6,1724],[8,1582],[12,1725]]],[0,"Magazingr\xF6\xDFe"],[0,"\u03B9\u03B4313\u03B5"],[2,[[2,3],[4,1727],[14,1730],[19,1731]]],[2,[[6,1728],[8,1582],[12,1729]]],[0,"Reichweiten"],[0,"\u03B9\u03B4259\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1732],[64,1764]]],[2,[[2,23],[19,1733],[14,1763]]],[1,[1734]],[2,[[2,3],[4,1735],[14,1738],[19,1739]]],[2,[[6,1736],[8,1582],[12,1737]]],[0,"Reichweite"],[0,"\u03B9\u03B4362\u03B5"],[2,[[16,38],[18,17]]],[2,[[2,21],[19,68],[64,1740]]],[1,[1741,1755,1759]],[2,[[67,68],[4,1742],[2,72],[73,74],[62,1745]]],[2,[[6,1743],[8,1582],[12,1744]]],[0,"Distanz"],[0,"\u03B9\u03B4456\u03B5"],[2,[[2,62],[60,1746],[1747,1748],[4,1752]]],[0,"union"],[0,"unions"],[1,[1749,471]],[2,[[83,84],[60,85],[2,62],[86,87],[88,1750]]],[1,[1751]],[0,"Nahkampf"],[2,[[6,1753],[8,1582],[10,11],[12,1754]]],[0,"Schussreichweite"],[0,"\u03B9\u03B4482\u03B5"],[2,[[67,68],[4,1756],[2,72],[73,74],[62,184]]],[2,[[6,1757],[8,1582],[12,1758]]],[0,"Modifikator"],[0,"\u03B9\u03B4457\u03B5"],[2,[[67,68],[4,1760],[2,72],[73,11],[62,471]]],[2,[[6,1761],[8,1582],[12,1762]]],[0,"Schadensreduktion"],[0,"\u03B9\u03B4458\u03B5"],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,3],[4,1766],[14,1769],[19,1770]]],[2,[[6,1767],[8,1582],[12,1768]]],[0,"Nachladezeit"],[0,"\u03B9\u03B4260\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,68],[64,1771]]],[1,[1772,1775]],[2,[[67,68],[4,1773],[2,72],[73,74],[62,471]]],[2,[[6,167],[8,1582],[12,1774]]],[0,"\u03B9\u03B4314\u03B5"],[2,[[67,68],[4,1776],[2,72],[73,74],[62,1779]]],[2,[[6,1777],[8,1582],[12,1778]]],[0,"Einheit"],[0,"\u03B9\u03B4315\u03B5"],[2,[[83,84],[60,85],[2,62],[86,87],[88,1780],[4,1783]]],[1,[1781,1782]],[0,"KR"],[0,"S"],[2,[[6,1784],[8,1582],[10,11],[12,1785]]],[0,"Nachladeeinheit"],[0,"\u03B9\u03B4363\u03B5"],[2,[[2,3],[4,1787],[14,1789],[19,1790]]],[2,[[6,267],[8,1582],[12,1788]]],[0,"\u03B9\u03B4261\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,21],[19,1791],[64,1798]]],[2,[[2,23],[19,1792],[14,1797]]],[1,[1793]],[2,[[2,3],[19,1638],[14,1794],[4,1795]]],[2,[[16,38],[18,17]]],[2,[[6,1525],[8,1582],[12,1796]]],[0,"\u03B9\u03B4364\u03B5"],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,3],[4,1800],[14,1802],[19,1803]]],[2,[[6,1221],[8,1582],[12,1801]]],[0,"\u03B9\u03B4262\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,21],[19,1804],[64,1813]]],[2,[[2,23],[19,1805],[14,1812]]],[1,[1806]],[2,[[2,3],[4,1807],[14,1809],[19,1810]]],[2,[[6,836],[8,1582],[12,1808]]],[0,"\u03B9\u03B4365\u03B5"],[2,[[16,38],[18,17]]],[2,[[2,21],[19,68],[64,1811]]],[1,[121]],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,17],[18,17]]],[1,[1816,1819,1822,121]],[2,[[67,1663],[4,1817],[2,72],[73,11],[62,1667]]],[2,[[6,1665],[8,1582],[12,1818]]],[0,"\u03B9\u03B4192\u03B5"],[2,[[67,1540],[4,1820],[2,72],[73,11],[62,184]]],[2,[[6,1673],[8,1582],[12,1821]]],[0,"\u03B9\u03B4193\u03B5"],[2,[[67,1540],[4,1823],[2,72],[73,11],[62,184]]],[2,[[6,1677],[8,1582],[12,1824]]],[0,"\u03B9\u03B4194\u03B5"],[2,[[6,1826],[8,1582],[10,11],[12,1827]]],[0,"FernkampfwaffenDafinition"],[0,"\u03B9\u03B4175\u03B5"],[2,[[16,38],[18,264]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,3],[4,1832],[14,1835],[19,1836]]],[2,[[6,1833],[8,1582],[12,1834]]],[0,"R\xFCstungen"],[0,"\u03B9\u03B4103\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1837],[64,1975]]],[2,[[2,23],[19,1838],[14,1974]]],[1,[1839]],[2,[[4,1840],[19,1843],[2,3],[14,1973]]],[2,[[6,1841],[8,1582],[12,1842]]],[0,"R\xFCstung"],[0,"\u03B9\u03B4163\u03B5"],[2,[[2,21],[19,1844],[64,1965],[4,1970]]],[2,[[2,23],[19,1845],[14,1964]]],[1,[42,107,1846,1881,1951]],[2,[[2,3],[4,1847],[14,1850],[19,1851]]],[2,[[6,1848],[8,1582],[12,1849]]],[0,"Schutz"],[0,"\u03B9\u03B4264\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1852],[64,1880]]],[2,[[2,23],[19,1853],[14,1879]]],[1,[1854,1869,1874]],[2,[[4,1855],[19,1858],[2,3],[14,1868]]],[2,[[6,1856],[8,1582],[12,1857]]],[0,"Flexibilit\xE4t"],[0,"\u03B9\u03B4366\u03B5"],[2,[[2,21],[19,68],[64,1859],[4,1865]]],[1,[1860]],[2,[[67,68],[4,1861],[2,72],[73,11],[62,1863]]],[2,[[6,167],[8,1582],[12,1862]]],[0,"\u03B9\u03B4461\u03B5"],[2,[[56,170],[59,1864],[60,61],[2,62]]],[0,"nonNegativeInteger"],[2,[[6,1866],[8,1582],[10,11],[12,1867]]],[0,"R\xFCstwert"],[0,"\u03B9\u03B4406\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1870],[19,1858],[2,3],[14,1873]]],[2,[[6,1871],[8,1582],[12,1872]]],[0,"H\xE4rte"],[0,"\u03B9\u03B4367\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1875],[19,1858],[2,3],[14,1878]]],[2,[[6,1876],[8,1582],[12,1877]]],[0,"D\xE4mpfung"],[0,"\u03B9\u03B4368\u03B5"],[2,[[16,17],[18,264]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,3],[4,1882],[14,1885],[19,1886]]],[2,[[6,1883],[8,1582],[12,1884]]],[0,"Trefferzonen"],[0,"\u03B9\u03B4265\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1887],[64,1950]]],[2,[[2,23],[19,1888],[14,1949]]],[1,[1889,1919,1924,1929,1934,1939,1944]],[2,[[4,1890],[19,1893],[2,3],[14,1918]]],[2,[[6,1891],[8,1582],[12,1892]]],[0,"Kopf"],[0,"\u03B9\u03B4369\u03B5"],[2,[[2,21],[19,1894],[64,1914],[4,1915]]],[2,[[2,23],[19,1895],[14,1913]]],[1,[1896]],[2,[[2,3],[4,1897],[14,1899],[19,1900]]],[2,[[6,1848],[8,1582],[12,1898]]],[0,"\u03B9\u03B4489\u03B5"],[2,[[16,38],[18,17]]],[2,[[2,21],[19,68],[64,1901]]],[1,[1902,1908]],[2,[[67,68],[4,1903],[2,72],[73,74],[62,1906]]],[2,[[6,1904],[8,1582],[12,1905]]],[0,"Von"],[0,"\u03B9\u03B4504\u03B5"],[2,[[83,624],[60,85],[2,62],[625,68],[626,68],[627,17],[628,1907]]],[0,10],[2,[[67,68],[4,1909],[2,72],[73,74],[62,1912]]],[2,[[6,1910],[8,1582],[12,1911]]],[0,"Bis"],[0,"\u03B9\u03B4505\u03B5"],[2,[[83,624],[60,85],[2,62],[625,68],[626,68],[627,17],[628,1907]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[6,1916],[8,1582],[10,11],[12,1917]]],[0,"Schutzwert"],[0,"\u03B9\u03B4413\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1920],[19,1893],[2,3],[14,1923]]],[2,[[6,1921],[8,1582],[12,1922]]],[0,"Brust"],[0,"\u03B9\u03B4370\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1925],[19,1893],[2,3],[14,1928]]],[2,[[6,1926],[8,1582],[12,1927]]],[0,"H\xFCfte"],[0,"\u03B9\u03B4371\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1930],[19,1893],[2,3],[14,1933]]],[2,[[6,1931],[8,1582],[12,1932]]],[0,"LinkerArm"],[0,"\u03B9\u03B4372\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1935],[19,1893],[2,3],[14,1938]]],[2,[[6,1936],[8,1582],[12,1937]]],[0,"RechterArm"],[0,"\u03B9\u03B4373\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1940],[19,1893],[2,3],[14,1943]]],[2,[[6,1941],[8,1582],[12,1942]]],[0,"LinkesBein"],[0,"\u03B9\u03B4374\u03B5"],[2,[[16,17],[18,264]]],[2,[[4,1945],[19,1893],[2,3],[14,1948]]],[2,[[6,1946],[8,1582],[12,1947]]],[0,"RechtesBein"],[0,"\u03B9\u03B4375\u03B5"],[2,[[16,17],[18,264]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,3],[4,1952],[14,1954],[19,1955]]],[2,[[6,267],[8,1582],[12,1953]]],[0,"\u03B9\u03B4266\u03B5"],[2,[[16,17],[18,264]]],[2,[[2,21],[19,1956],[64,1963]]],[2,[[2,23],[19,1957],[14,1962]]],[1,[1958]],[2,[[2,3],[19,1638],[14,1959],[4,1960]]],[2,[[16,38],[18,17]]],[2,[[6,1525],[8,1582],[12,1961]]],[0,"\u03B9\u03B4376\u03B5"],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,17],[18,17]]],[1,[1966,121]],[2,[[67,68],[4,1967],[2,72],[73,74],[62,184]]],[2,[[6,1968],[8,1582],[12,1969]]],[0,"Erschwernis"],[0,"\u03B9\u03B4195\u03B5"],[2,[[6,1971],[8,1582],[10,11],[12,1972]]],[0,"R\xFCstungDefinition"],[0,"\u03B9\u03B4176\u03B5"],[2,[[16,38],[18,264]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,3],[4,1977],[14,1979],[19,1980]]],[2,[[6,267],[8,1582],[12,1978]]],[0,"\u03B9\u03B4104\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,1981],[64,1999]]],[2,[[2,23],[19,1982],[14,1998]]],[1,[1983]],[2,[[4,1984],[19,1986],[2,3],[14,1997]]],[2,[[6,1525],[8,1582],[12,1985]]],[0,"\u03B9\u03B4164\u03B5"],[2,[[2,21],[19,1987],[64,1990],[4,1994]]],[2,[[2,23],[19,1988],[14,1989]]],[1,[42,107]],[2,[[16,17],[18,17]]],[1,[1991]],[2,[[67,68],[4,1992],[2,72],[73,74],[62,87]]],[2,[[6,123],[8,1582],[12,1993]]],[0,"\u03B9\u03B4196\u03B5"],[2,[[6,1995],[8,1582],[10,11],[12,1996]]],[0,"Ausr\xFCstungEigengchaftDefinition"],[0,"\u03B9\u03B4177\u03B5"],[2,[[16,38],[18,264]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,17],[18,17]]],[1,[]],[2,[[2,3],[4,2003],[14,2005],[19,2006]]],[2,[[6,481],[8,28],[10,11],[12,2004]]],[0,"\u03B9\u03B45\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,21],[19,2007],[64,2025]]],[2,[[2,23],[19,2008],[14,2024]]],[1,[2009]],[2,[[4,2010],[19,2012],[2,3],[14,2023]]],[2,[[6,495],[8,28],[12,2011]]],[0,"\u03B9\u03B483\u03B5"],[2,[[2,21],[19,2013],[64,2019],[4,2020]]],[2,[[56,488],[2,2014],[19,2015],[64,2018]]],[0,"complexContent"],[2,[[2,23],[19,2016],[14,2017]]],[1,[42,107]],[2,[[16,17],[18,17]]],[1,[]],[1,[]],[2,[[6,2021],[8,28],[10,11],[12,2022]]],[0,"TagDefinition"],[0,"\u03B9\u03B4106\u03B5"],[2,[[16,38],[18,17]]],[2,[[16,17],[18,17]]],[1,[]],[2,[[16,17],[18,17]]],[1,[2028]],[2,[[67,68],[4,2029],[2,72],[73,74],[62,2032]]],[2,[[6,2030],[8,9],[12,2031]]],[0,"Version"],[0,"\u03B9\u03B447\u03B5"],[2,[[83,624],[60,85],[2,62],[625,68],[626,68],[627,17],[628,68],[4,2033]]],[2,[[6,2034],[8,28],[10,11],[12,2035]]],[0,"positiveInt"],[0,"\u03B9\u03B481\u03B5"],[2,[[4,2037],[19,488],[2,3],[14,2039]]],[2,[[6,856],[8,28],[10,11],[12,2038]]],[0,"\u03B9\u03B44\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,2041],[19,163],[2,3],[14,2043]]],[2,[[6,176],[8,28],[10,11],[12,2042]]],[0,"\u03B9\u03B46\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,2045],[19,488],[2,3],[14,2047]]],[2,[[6,255],[8,189],[10,11],[12,2046]]],[0,"\u03B9\u03B411\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,2049],[19,488],[2,3],[14,2051]]],[2,[[6,506],[8,189],[10,11],[12,2050]]],[0,"\u03B9\u03B412\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,2053],[19,488],[2,3],[14,2055]]],[2,[[6,553],[8,189],[10,11],[12,2054]]],[0,"\u03B9\u03B413\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,2057],[19,488],[2,3],[14,2059]]],[2,[[6,694],[8,189],[10,11],[12,2058]]],[0,"\u03B9\u03B414\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,2061],[14,2063],[19,528]]],[2,[[6,541],[8,189],[10,11],[12,2062]]],[0,"\u03B9\u03B415\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,2065],[19,488],[2,3],[14,2067]]],[2,[[6,534],[8,535],[10,11],[12,2066]]],[0,"\u03B9\u03B416\u03B5"],[2,[[16,17],[18,17]]],[2,[[4,2069],[19,786],[2,3],[14,2071]]],[2,[[6,1031],[8,535],[10,11],[12,2070]]],[0,"\u03B9\u03B417\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,2073],[14,2075],[19,1034]]],[2,[[6,1221],[8,837],[10,11],[12,2074]]],[0,"\u03B9\u03B418\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,2077],[14,2079],[19,1224]]],[2,[[6,1281],[8,826],[10,11],[12,2078]]],[0,"\u03B9\u03B422\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,2081],[14,2083],[19,1284]]],[2,[[6,456],[8,469],[10,11],[12,2082]]],[0,"\u03B9\u03B424\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,2085],[14,2087],[19,1521]]],[2,[[6,1525],[8,1386],[10,11],[12,2086]]],[0,"\u03B9\u03B427\u03B5"],[2,[[16,17],[18,17]]],[2,[[2,3],[4,2089],[14,2091],[19,1638]]],[2,[[6,1525],[8,1582],[10,11],[12,2090]]],[0,"\u03B9\u03B434\u03B5"],[2,[[16,17],[18,17]]]];const A5=-1,N5=0,S5=1,M5=2,T5=3,k5=4,E5=5,C5=6,B5=7,L5=8,Hl=typeof self=="object"?self:globalThis,D5=(e,n)=>{const i=(r,a)=>(e.set(a,r),r),t=r=>{if(e.has(r))return e.get(r);const[a,c]=n[r];switch(a){case N5:case A5:return i(c,r);case S5:{const l=i([],r);for(const u of c)l.push(t(u));return l}case M5:{const l=i({},r);for(const[u,f]of c)l[t(u)]=t(f);return l}case T5:return i(new Date(c),r);case k5:{const{source:l,flags:u}=c;return i(new RegExp(l,u),r)}case E5:{const l=i(new Map,r);for(const[u,f]of c)l.set(t(u),t(f));return l}case C5:{const l=i(new Set,r);for(const u of c)l.add(t(u));return l}case B5:{const{name:l,message:u}=c;return i(new Hl[l](u),r)}case L5:return i(BigInt(c),r);case"BigInt":return i(Object(BigInt(c)),r)}return i(new Hl[a](c),r)};return t},I5=e=>D5(new Map,e)(0),za=class{constructor(e,n){this.id=n,this.instance=e,window.localStorage.setItem("s"+n,JSON.stringify(e)),this.lebensabschnittLookup=Object.fromEntries(e.Daten.Organismen.Gattung.flatMap(t=>t.Art.flatMap(r=>r.Morphe.Morph.flatMap(a=>a.Lebensabschnitte.Lebensabschnitt.filter(c=>c.Spielbar).map(c=>{const l={l:c,m:a,a:r,g:t};return[c.Id,l]}))))),this.Ausr\u00FCstungsEigenschaftMap=e.Daten.Ausstattung.Eigenschaften.Eigenschaft.reduce((t,r)=>(t[r.Id]=r,t),{}),this.nahkampfMap=e.Daten.Ausstattung.Waffen.Nahkampfwaffe.reduce((t,r)=>(t[r.Id]=r,t),{}),this.fernkampfMap=e.Daten.Ausstattung.Waffen.Fernkampfwaffe.reduce((t,r)=>(t[r.Id]=r,t),{}),this.R\u00FCstungMap=e.Daten.Ausstattung.R\u00FCstungen.R\u00FCstung.reduce((t,r)=>(t[r.Id]=r,t),{}),this.StandardKosten=e.Daten.KostenDefinitionen.KostenDefinition.filter(t=>t.StandardKosten===!0)[0].Id,this.talentMap=e.Daten.Talente.flatMap(t=>t.Talent.map(r=>bn(Te({},r),{Kategorie:t.KategorieId}))).reduce((t,r)=>(t[r.Id]=r,t),{}),this.talentCategoryMap=e.Daten.Talente.map(t=>t.Talent.map(r=>bn(Te({},r),{Kategorie:t.KategorieId})).reduce((r,a)=>(r.t[a.Id]=a,r),{id:t.KategorieId,t:{}})).reduce((t,r)=>(t[r.id]=r.t,t),{}),this.tagMap=e.Daten.Tags.Tag.reduce((t,r)=>(t[r.Id]=r,t),{}),this.pfadMap=e.Daten.Pfade.flatMap(t=>t.Pfad.map(r=>bn(Te({},r),{Kategorie:t.Id}))).reduce((t,r)=>(t[r.Id]=r,t),{}),this.pfadCategoryMap=e.Daten.Pfade.map(t=>t.Pfad.map(r=>bn(Te({},r),{Kategorie:t.Id})).reduce((r,a)=>(r.t[a.Id]=a,r),{id:t.Id,t:{}})).reduce((t,r)=>(t[r.id]=r.t,t),{}),this.besonderheitenMap=e.Daten.Besonderheiten.flatMap(t=>t.Besonderheit.map(r=>bn(Te({},r),{Kategorie:t.KategorieId}))).reduce((t,r)=>(t[r.Id]=r,t),{}),this.besonderheitenCategoryMap=e.Daten.Besonderheiten.map(t=>t.Besonderheit.map(r=>bn(Te({},r),{Kategorie:t.KategorieId})).reduce((r,a)=>(r.t[a.Id]=a,r),{id:t.KategorieId,t:{}})).reduce((t,r)=>(t[r.id]=r.t,t),{}),this.fertigkeitenMap=e.Daten.Fertigkeiten.flatMap(t=>t.Fertigkeit.map(r=>bn(Te({},r),{Kategorie:t.KategorieId}))).reduce((t,r)=>(t[r.Id]=r,t),{}),this.fertigkeitenCategoryMap=e.Daten.Fertigkeiten.map(t=>t.Fertigkeit.map(r=>bn(Te({},r),{Kategorie:t.KategorieId})).reduce((r,a)=>(r.t[a.Id]=a,r),{id:t.KategorieId,t:{}})).reduce((t,r)=>(t[r.id]=r.t,t),{});const i=(()=>Te({f:(r,a)=>r==0||a==0?0:Gh(this.Instance.Daten.KostenDefinitionen.TalentKostenFunktion.value).evaluate({KOMPLEXIT\u00C4T:String.fromCharCode("a".charCodeAt(0)+a-1),KOMPLEXIT\u00C4T_NUM:a,LEVEL:r})},this.Instance.Daten.KostenDefinitionen.TalentKostenFunktion.meta))();this.talentCostTabel=[...Array.from({length:37},(t,r)=>{const a=Array.from({length:za.MAX_TALENT+1},(c,l)=>({Kosten:{Wert:i.f(l,r),Id:i.KostenArt,ResultType:i.ResultType}}));if(a[0].Kosten.ResultType=="differenz")for(let c=1;c<a.length;c++)a[c].Kosten.Wert+=a[c-1].Kosten.Wert;return[...a.map(c=>({Kosten:{Id:c.Kosten.Id,Wert:c.Kosten.Wert}}))]})]}static async init(e,n){const{notaData:i,digest:t}=n&&window.localStorage.getItem("s"+n)?{notaData:JSON.parse(window.localStorage.getItem("s"+n)),digest:n}:await r(e);return i?new za(i,t):void 0;async function r(a){const c=a?x5.replace(/http:\/\/nota.org\/schema\//g,"https://nota-game.github.io/schema/vNext/"):await(await fetch("https://nota-game.github.io/Content/vNext/data/nota.xml")).text(),u=I5(w5).filter(h=>h.name.local==="Daten")[0],o=new up(u).parse(c),s=new TextEncoder,m=Ep(new Uint8Array(await window.crypto.subtle.digest("SHA-256",s.encode(JSON.stringify(o)))));return{notaData:o,digest:m}}}get Instance(){if(!this.instance)throw Error("Not initilize");return this.instance}};let O5=za;O5.MAX_TALENT=130;export{O5 as D,P5 as d,Ep as e};
