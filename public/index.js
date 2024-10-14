import*as e from"react";import*as t from"react-dom";var n={d:(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},r={};n.d(r,{A:()=>R});const o=(c={useEffect:()=>e.useEffect,useMemo:()=>e.useMemo,useRef:()=>e.useRef,useState:()=>e.useState},l={},n.d(l,c),l);var c,l;const a=(e=>{var t={};return n.d(t,e),t})({flushSync:()=>t.flushSync});var u={d:(e,t)=>{for(var n in t)u.o(t,n)&&!u.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},s={};u.d(s,{f:()=>f,A:()=>O});const i=(p={useMemo:()=>o.useMemo,useRef:()=>o.useRef,useState:()=>o.useState},d={},u.d(d,p),d),f="/";var p,d;const y=(g={flushSync:()=>a.flushSync},b={},u.d(b,g),b);var g,b;function m(e,t,n,r){for(const o in e){const c=e[o];"object"==typeof c&&null!==c&&(e[o]=m(c,t,n,r))}return new Proxy(e,{get(e,t,r){const o=Reflect.get(e,t,r);return n&&n(e,t,r),o},set(e,n,r,o){const c=Reflect.set(e,n,r,o);return t&&t(e,n,r,o),c},deleteProperty(e,t){const n=Reflect.deleteProperty(e,t);return r&&r(e,t),n}})}function x({config:e=[]}){const[t]=function(){const[e,t]=(0,i.useState)(0);return[()=>{(0,y.flushSync)((()=>{t(e>99999?0:e=>e+1)}))}]}(),n=(0,i.useRef)(m(e.reduce(((e,t)=>({...e,[t.name]:void 0!==t.initialValue?t.initialValue:{}})),{}),t,(()=>{}),t)),[r,o]=(0,i.useState)({});function c(e,t=!1){void 0!==r[e]&&o((n=>({...n,[e]:t})))}const l=(0,i.useMemo)((()=>{const t={},n=e.reduce(((e,n)=>(0!==Object.keys(n.effects||{})?.length&&Object.keys(n.effects||{}).forEach((e=>{t[`${n.name}${f}${e}`]=!1})),{...e,[n.name]:n})),{})||{};return o(t),n}),[]),a=({type:e,payload:t},r)=>new Promise(((o,u)=>{const[s,i]=e.split(f),p=l[s],{reducers:d={},effects:y={}}=p||{};y[i]?o(((e,t,r,o,l)=>new Promise((u=>{const s=n.current[t];var i;u((i=(t,n,u)=>{e({call:t,setLoading:c.bind(null,r),Control:{return:n,error:u}},{store:s,dispatch:l||a},o)},new Promise(((e,t)=>{const n=[];let r=0;const o=(e,t)=>{const o=n[r];if(!o){const o={};throw n[r++]=o,e(t).then((e=>{o.status="fulfilled",o.value=e}),(e=>{o.status="rejected",o.error=e}))}if(r++,"fulfilled"===o.status)return o.value;if("rejected"===o.status)throw new Error(o.error)},c=()=>{try{i(o,e,t)}catch(e){if(!(e instanceof Promise))throw new Error(e);return e.then((()=>{r=0,c()})),{}}};c()}))))})))(y[i],s,e,t,r)):d[i]&&o(((e,t,r)=>new Promise((o=>{const c=n.current[t];o(e(c,{payload:r}))})))(d[i],s,t)),u("未找到对应的effect/reducer")}));return[n.current,a,function(e){return r[e]}]}const h="VARIABLES";function v(e){return`${h}${f}${e}`}function j(e){const t={name:h,initialValue:{},reducers:{},effects:{}},{variables:n={},reducers:r={},effects:o={}}=e;return Object.keys(n).forEach((e=>{const r=n[e];Object.defineProperty(t.initialValue,e,{value:r,configurable:!0,enumerable:!0,writable:!0}),Object.defineProperty(t.reducers,function(e){return`set${t=e,t.charAt(0).toUpperCase()+t.slice(1)}`;var t}(e),{configurable:!0,enumerable:!0,writable:!0,value:(t,n)=>{t[e]=n.payload}})})),Object.keys(r).forEach((e=>{Object.defineProperty(t.reducers,e,{configurable:!0,enumerable:!0,writable:!0,value:r[e]})})),Object.keys(o).forEach((e=>{Object.defineProperty(t.effects,e,{configurable:!0,enumerable:!0,writable:!0,value:o[e]})})),t}const O=function(e,...t){const n=(0,i.useMemo)((()=>"function"==typeof e?e(...t):e),[]),[r,o,c]=x({config:[j(n)]}),l=e=>o({type:v(e.type),payload:e.payload},l);return[r[h],l,e=>c(v(e))]};var w=s.A;function P(e,t){if(Object.is(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;const n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(let r=0;r<n.length;r++){const o=n[r];if(!Object.prototype.hasOwnProperty.call(t,o)||!Object.is(e[o],t[o]))return!1}return!0}const S=function(){let e=0;return()=>(e>99999?e=0:e+=1,e)}(),E=()=>{let e=null,t=null,n="";return{variables:{pollingLoading:!1,oldDependency:[],updateKey:S()},reducers:{polling(r,{payload:o}){!function(r,{params:o,pollingFn:c,interval:l}){e&&(clearTimeout(e),e=null,r.pollingLoading=!1),r.pollingLoading=!0;const a=function(){let e=(new Date).getTime(),t=performance&&performance.now&&1e3*performance.now()||0;return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(n){let r=16*Math.random();return e>0?(r=(e+r)%16|0,e=Math.floor(e/16)):(r=(t+r)%16|0,t=Math.floor(t/16)),("x"===n?r:3&r|8).toString(16)}))}();n=a;const u=()=>(t=c(o).finally((()=>{a!==n||!0===r.pollingLoading&&(r.pollingLoading=!1)})),t),s=function(){a===n&&(e=setTimeout((()=>{a===n&&u().then(s)}),l))};t&&t instanceof Promise?t.finally((()=>{u().then(s)})):u().then(s)}(r,o)},cancelPolling(){clearTimeout(e)}}}};function R({pollingFn:e,params:t={},interval:n=1e3}){const[r,c]=w(E);return function(e=()=>{},t=[]){const n=(0,o.useRef)([]);(0,o.useEffect)((()=>{(function(e,t){if(e?.length!==t?.length)return!1;for(let n=0;n<t?.length;n++)if(!P(t[n],e[n]))return!1;return!0})(n.current,t)||(n.current=t,e())}),t)}((()=>{c({type:"polling",payload:{params:t,pollingFn:e,interval:n}})}),[n,t,e,r.updateKey]),(0,o.useEffect)((()=>()=>{c({type:"cancelPolling"})}),[]),[r.pollingLoading,()=>{r.updateKey=S()}]}var M=r.A;export{M as default};