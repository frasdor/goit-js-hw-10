import{i as r}from"./vendor-BbbuE1sJ.js";const m=document.querySelector(".form");m.addEventListener("submit",t=>{t.preventDefault();const s=Number(t.currentTarget.delay.value),i=t.currentTarget.state.value;new Promise((e,o)=>{setTimeout(()=>{i==="fulfilled"?e(s):o(s)},s)}).then(e=>{r.success({title:"Success",position:"topRight",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{r.error({title:"Error",position:"topRight",message:`❌ Rejected promise in ${e}ms`})})});
//# sourceMappingURL=02-snackbar-CVyprERM.js.map
