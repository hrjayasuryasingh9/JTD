import{M as j,G as f,j as s,C as d,a as x,b as m,k as C,c as h,N as g,O as p,B as c,Q as y,T as N,E as k,U as v,H as b,J as T}from"./index-DQTX3Df3.js";/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=j("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);function w({item:e}){const{product:{title:t,price:r,description:i,images:a},quantity:n}=e;console.log(a);const l=f();function u(){l(y({product:e.product,quantity:1}))}function o(){l(N(e.product.id))}return s.jsxs(d,{className:"grid grid-cols-[minmax(0,200px)_1fr] gap-2",children:[s.jsx("img",{className:"size-full object-contain aspect-square",src:a[0],alt:t}),s.jsxs("section",{children:[s.jsxs(x,{children:[s.jsx(m,{children:t}),s.jsx(C,{children:i})]}),s.jsx(h,{children:s.jsxs("p",{children:["Price: ₹",g(r)]})}),s.jsxs(p,{className:"flex gap-2 items-center",children:[n>1?s.jsx(c,{variant:"outline",onClick:o,children:"-"}):s.jsx(c,{variant:"outline",onClick:o,children:s.jsx(I,{className:"size-4"})}),s.jsx("p",{children:n}),s.jsx(c,{variant:"outline",onClick:u,children:"+"})]})]})]})}function S(){const{items:e}=k(a=>a.cart),t=v(e),r=b();function i(){r("/payment")}return s.jsxs("article",{className:"p-4 flex flex-col gap-4",children:[s.jsx("h1",{className:"text-xl",children:"Shopping Cart"}),s.jsxs("section",{className:"grid grid-cols-[2fr_1fr] gap-4",children:[s.jsx("section",{className:"grid grid-flow-row gap-4",children:e.map(a=>s.jsx(w,{item:a},a.product.id))}),s.jsx("section",{children:s.jsxs(d,{className:"h-full flex flex-col justify-between",children:[s.jsx(x,{children:s.jsx(m,{children:"Subtotal"})}),s.jsxs(h,{className:"flex gap-2 items-center",children:[t>1?s.jsxs("span",{className:"text-sm font-semibold",children:["(",t," items)"]}):s.jsxs("span",{className:"text-sm font-semibold",children:["(",t," item)"]}),s.jsxs("span",{children:["₹",T(e)]})]}),s.jsx(p,{children:s.jsx(c,{className:"w-full",onClick:i,children:"Buy"})})]})})]})]})}export{S as default};
