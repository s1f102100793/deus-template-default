(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9208:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(4060)}])},4060:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return index_page}});var t=a(5893),i=a(8583),n=a(7294),l=a(9854);let GithubIcon=e=>(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:e.size,height:e.size,fill:e.fill,children:(0,t.jsx)("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})}),HumanIcon=e=>(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:e.size,height:e.size,fill:e.fill,children:(0,t.jsx)("path",{d:"M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"})});var c=a(5103);let r=(0,c.cn)(0),d=(0,c.cn)(e=>e(r)>0),useLoading=()=>{let[e,s]=(0,i.KO)(r),[a]=(0,i.KO)(d),c=(0,n.useCallback)(()=>s(e+1),[e,s]),u=(0,n.useCallback)(()=>s(e-1),[e,s]);return{loadingElm:(0,t.jsx)(l.g,{visible:a}),addLoading:c,removeLoading:u}};var u=a(4857),o=a(2509),h=a(6819);let loginWithGitHub=async()=>{let e=new u.GH;e.addScope("read:user"),await (0,u.rh)((0,o.l)(),e).catch(h.F)},logout=async()=>{await (0,o.l)().signOut()};var x=a(5293),g=a.n(x);let BasicHeader=e=>{let{loadingElm:s,addLoading:a,removeLoading:i}=useLoading(),login=async()=>{a(),await loginWithGitHub(),i()},onLogout=async()=>{confirm("Logout?")&&await logout()};return(0,t.jsxs)("div",{className:g().container,children:[(0,t.jsxs)("div",{className:g().main,children:[(0,t.jsx)("div",{className:g().title,children:"deus-template"}),null===e.user?(0,t.jsx)("div",{onClick:login,children:(0,t.jsxs)("div",{className:g().loginBtn,children:[(0,t.jsx)(GithubIcon,{size:18,fill:"#fff"}),(0,t.jsx)("span",{children:"Login with GitHub"})]})}):(0,t.jsxs)("div",{className:g().userBtn,onClick:onLogout,children:[void 0!==e.user.photoURL?(0,t.jsx)("img",{className:g().userIcon,src:e.user.photoURL,height:24,alt:e.user.displayName}):(0,t.jsx)(HumanIcon,{size:18,fill:"#555"}),(0,t.jsx)("span",{className:g().userName,children:e.user.displayName})]})]}),s]})};var p=a(3483),_=a(6221),m=a(8535),j=a.n(m),index_page=()=>{let[e]=(0,i.KO)(_.L),s=(0,n.useRef)(null),[a,c]=(0,n.useState)(),[r,d]=(0,n.useState)(""),[u,o]=(0,n.useState)(),fetchTasks=async()=>{let e=await p.x.public.tasks.$get().catch(h.F);null!==e&&c(e)},createTask=async e=>{e.preventDefault(),r&&s.current&&(await p.x.private.tasks.post({body:{label:r,image:u}}).catch(h.F),d(""),o(void 0),s.current.value="",await fetchTasks())},toggleDone=async e=>{await p.x.private.tasks.patch({body:{taskId:e.id,done:!e.done}}).catch(h.F),await fetchTasks()},deleteTask=async e=>{await p.x.private.tasks.delete({body:{taskId:e.id}}).catch(h.F),await fetchTasks()};return((0,n.useEffect)(()=>{fetchTasks()},[]),a)?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(BasicHeader,{user:e}),(0,t.jsx)("div",{className:j().container,children:null===e?(0,t.jsx)("ul",{className:j().tasks,children:a.map(e=>(0,t.jsx)("li",{children:(0,t.jsxs)("label",{children:[(0,t.jsx)("span",{children:e.label}),e.image&&(0,t.jsx)("img",{src:e.image.url,width:"100%"})]})},e.id))}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("form",{style:{textAlign:"center"},onSubmit:createTask,children:[(0,t.jsx)("input",{value:r,type:"text",onChange:e=>{d(e.target.value)}}),(0,t.jsx)("input",{type:"submit",value:"ADD"}),(0,t.jsx)("div",{children:(0,t.jsx)("input",{type:"file",ref:s,accept:".png,.jpg,.jpeg,.gif,.webp,.svg",onChange:e=>{var s;o(null===(s=e.target.files)||void 0===s?void 0:s[0])}})})]}),(0,t.jsx)("ul",{className:j().tasks,children:a.map(e=>(0,t.jsxs)("li",{children:[(0,t.jsxs)("label",{children:[(0,t.jsx)("input",{type:"checkbox",checked:e.done,onChange:()=>toggleDone(e)}),(0,t.jsx)("span",{children:e.label})]}),e.image&&(0,t.jsx)("img",{src:e.image.url,width:"100%"}),(0,t.jsx)("input",{type:"button",value:"DELETE",className:j().deleteBtn,onClick:()=>deleteTask(e)})]},e.id))})]})})]}):(0,t.jsx)(l.g,{visible:!0})}},5293:function(e){e.exports={container:"BasicHeader_container__ASIaK",main:"BasicHeader_main__Vqufr",title:"BasicHeader_title__YIFTt",userBtn:"BasicHeader_userBtn__wlK48",userIcon:"BasicHeader_userIcon__UecGa",userName:"BasicHeader_userName__KiR1h",loginBtn:"BasicHeader_loginBtn__Zy9wD"}},8535:function(e){e.exports={container:"index_container___q52_",tasks:"index_tasks__ExTXY",deleteBtn:"index_deleteBtn__wZo2L"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=9208)}),_N_E=e.O()}]);