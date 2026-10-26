const LOGO="18-VIEIRA-GAMES-PRETA.png";
const app=document.getElementById("app");
const EXP=["Competições de robótica","Brindes","Projetos maker","Outras atividades"];
const MSG="O Vieira Games é um projeto que transforma o universo dos jogos em uma experiência inesquecível de aprendizagem, criatividade e interação. E, através de jogos digitais, eletrônicos e analógicos, estimula o raciocínio lógico, o respeito às regras e o uso consciente da tecnologia.";
const REGRAS=["Evitar personagens ou elementos que façam referência à violência ou a comportamentos inadequados.","As fantasias devem ser adequadas ao ambiente escolar e à faixa etária dos estudantes.","Pedimos atenção aos acessórios que façam referência a armas ou objetos utilizados em combates.","Os acessórios devem permitir que os estudantes circulem e participem das atividades com conforto e segurança.","Não utilizar fantasias que apresentem mensagens, símbolos ou referências que possam ser ofensivas ou desrespeitosas."];
const S={
vem:{t:"Você pretende trazer seu(a) filho(a) para o Vieira Games?",type:"radio",o:[["sim","Sim"],["nao","Não"]]},
chance:{t:"Podemos contar com a presença do(a) seu(a) filho(a)?",type:"radio",msg:MSG,o:[["sim","Sim, mudei de ideia"],["nao","Não, tenho certeza"]]},
fantasia:{t:"Pretende trazê-lo(la) fantasiado(a)?",type:"radio",o:[["sim","Sim"],["nao","Não"]]},
espera:{t:"Quais atividades você espera encontrar para seu(a) filho(a)? (Pode marcar mais de uma.)",type:"multi",o:EXP,txt:"esperaTxt",lab:"Quer contar mais? (opcional)"},
apoio:{t:"A criança precisa de algum apoio ou adaptação para participar confortavelmente das atividades?",type:"radio",o:[["sim","Sim"],["nao","Não"]],fw:"sim",ff:[["necessidade","Qual apoio ou adaptação é necessário?","area"],["crianca","Nome da criança","inp"],["serie","Série","inp"]]}
};
const A={};
const reset=()=>{Object.assign(A,{vem:"",chance:"",fantasia:"",espera:[],esperaTxt:"",apoio:"",necessidade:"",crianca:"",serie:""})};reset();
const path=()=>{const p=["vem"];if(A.vem==="nao"){p.push("chance");if(A.chance==="sim")p.push("fantasia","espera","apoio")}else p.push("fantasia","espera","apoio");return p};
const attending=()=>A.vem==="sim"||(A.vem==="nao"&&A.chance==="sim");
const COL=["#2f9be0","#ffd21f","#e0352b"];
const fx=document.getElementById("fx");
for(let i=0;i<16;i++){const e=document.createElement("i"),s=8+Math.random()*14;e.style.cssText=`left:${Math.random()*100}%;width:${s}px;height:${s}px;background:${COL[i%3]};animation-duration:${10+Math.random()*14}s;animation-delay:-${Math.random()*20}s`;fx.appendChild(e)}
const h=(s,back)=>{app.innerHTML=s;if(back){const c=app.querySelector(".card");if(c)c.classList.add("back")}};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
function beep(f,d){try{const c=beep.c||(beep.c=new (window.AudioContext||window.webkitAudioContext)()),o=c.createOscillator(),g=c.createGain();o.type="square";o.frequency.value=f;g.gain.value=.04;o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+d)}catch(e){}}
function type(el,t){let i=0;el.textContent="";const iv=setInterval(()=>{el.textContent=t.slice(0,++i);if(i>=t.length)clearInterval(iv)},55)}
function menu(){last=0;document.body.classList.add("menu");startTetris();h(`<img class="logo" src="${LOGO}" alt="Logo Vieira Games" draggable="false"><h1 id="tt"></h1><p class="sub">Jogos criados na robótica e no maker, tecnologia, feira de brindes e muito mais.</p><div class="menu"><button class="btn start" id="go">Iniciar pesquisa</button></div>`);
type(document.getElementById("tt"),"PESQUISA PARA OS PAIS");
document.getElementById("go").onclick=()=>{beep(880,.12);transition()}}
const valid=k=>{const d=S[k];if(d.type==="multi")return A[k].length>0||A[d.txt].trim()!=="";if(!A[k])return false;if(d.fw&&A[k]===d.fw)return d.ff.every(x=>A[x[0]].trim()!=="");return true};
function pop(b){b.classList.remove("pop");void b.offsetWidth;b.classList.add("pop");beep(520,.06)}
let last=0;
function q(i){document.body.classList.remove("menu");stopTetris();const k=path()[i],d=S[k],back=i<last;last=i;
let body=`<h2>${d.t}</h2>`+(d.msg?`<div class="msg">${d.msg}</div>`:"");
body+=`<div class="opts">${d.o.map(x=>{const v=Array.isArray(x)?x[0]:x,l=Array.isArray(x)?x[1]:x,on=d.type==="multi"?A[k].includes(v):A[k]===v;return `<button class="opt ${d.type==="radio"?"rad":""} ${on?"on":""}" data-v="${esc(v)}">${l}</button>`}).join("")}</div>`;
if(d.type==="multi")body+=`<label>${d.lab}<textarea id="t" rows="3">${esc(A[d.txt])}</textarea></label>`;
if(d.fw)body+=`<div id="fl" class="${A[k]===d.fw?"":"hid"}">${d.ff.map(x=>`<label>${x[1]}${x[2]==="area"?`<textarea class="ff" data-k="${x[0]}" rows="3">${esc(A[x[0]])}</textarea>`:`<input class="ff" data-k="${x[0]}" maxlength="80" value="${esc(A[x[0]])}">`}</label>`).join("")}</div>`;
h(`<div class="prog"></div><div class="card"><div class="tag"></div>${body}<div class="nav"><button class="btn g" id="back">Voltar</button><button class="btn b" id="next"></button></div></div>`,back);
const pg=document.querySelector(".prog"),tg=document.querySelector(".tag"),nx=document.getElementById("next");
const refresh=()=>{const P=path();if(pg.children.length!==P.length)pg.innerHTML=P.map((_,j)=>`<i class="${j<=i?"on":""}"></i>`).join("");tg.textContent=`Pergunta ${i+1}/${P.length}`;nx.textContent=i===P.length-1?"Enviar":"Próxima";nx.disabled=!valid(k)};
refresh();
document.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const v=b.dataset.v;
if(d.type==="multi"){if(A[k].includes(v)){A[k]=A[k].filter(x=>x!==v);b.classList.remove("on","pop")}else{A[k].push(v);b.classList.add("on");pop(b)}}
else{A[k]=v;document.querySelectorAll(".opt").forEach(x=>x.classList.remove("on","pop"));b.classList.add("on");pop(b);
if(k==="vem")A.chance="";
if(d.fw){const fl=document.getElementById("fl");fl.classList.toggle("hid",v!==d.fw);if(v!==d.fw){d.ff.forEach(x=>A[x[0]]="");document.querySelectorAll(".ff").forEach(e=>e.value="")}else{const f0=document.querySelector(".ff");if(f0)f0.focus()}}}
refresh()});
const t=document.getElementById("t");if(t)t.oninput=()=>{A[d.txt]=t.value;refresh()};
document.querySelectorAll(".ff").forEach(el=>el.oninput=()=>{A[el.dataset.k]=el.value;refresh()});
document.getElementById("back").onclick=()=>{beep(300,.06);i===0?menu():q(i-1)};
nx.onclick=()=>{beep(760,.08);i===path().length-1?send():q(i+1)}}
const ENDPOINT="https://script.google.com/macros/s/AKfycbyk3Xe3FHpE_bkAB1iVya4vCG6C-7QGH5LR-16GukYiMrLpjCsG4-9XptUy_E6009WF/exec";
const ABA="Respostas Pais";
const HDR={vem:"Pretende trazer o(a) filho(a)?",chance:"Resposta após o aviso",fantasia:"Pretende trazê-lo(la) fantasiado(a)?",espera:"Atividades que espera encontrar",esperaTxt:"Detalhes das atividades",apoio:"Criança precisa de apoio ou adaptação?",necessidade:"Apoio ou adaptação necessário",crianca:"Nome da criança",serie:"Série"};
const KB="vg_pais_respostas",KP="vg_pais_pendentes";
const rd=k=>{try{return JSON.parse(localStorage.getItem(k)||"[]")}catch(e){return[]}};
const wr=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
function buildAnswers(){
const lab=(k,v)=>{const x=S[k].o.find(o=>o[0]===v);return x?x[1]:""};
const att=attending(),a={};
a[HDR.vem]=att?"Sim":"Não";
a[HDR.chance]=A.vem==="nao"?lab("chance",A.chance):"";
a[HDR.fantasia]=att?lab("fantasia",A.fantasia):"";
a[HDR.espera]=att?A.espera.slice():[];
a[HDR.esperaTxt]=att?A.esperaTxt.trim():"";
a[HDR.apoio]=att?lab("apoio",A.apoio):"";
const ap=att&&A.apoio==="sim";
a[HDR.necessidade]=ap?A.necessidade.trim():"";
a[HDR.crianca]=ap?A.crianca.trim():"";
a[HDR.serie]=ap?A.serie.trim():"";
return a}
let sending=false;
async function flush(){
if(sending||!/^https:/.test(ENDPOINT))return;sending=true;
let p=rd(KP);
while(p.length){
try{await fetch(ENDPOINT,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({sheet:ABA,answers:p[0]})});p.shift();wr(KP,p)}
catch(e){break}}
sending=false}
function send(){
const a=buildAnswers(),att=attending();
wr(KB,[...rd(KB),{...a,quando:new Date().toLocaleString("pt-BR")}]);
wr(KP,[...rd(KP),a]);
done(att);flush()}
function confetti(){for(let i=0;i<60;i++){const e=document.createElement("i");e.className="cf";const s=6+Math.random()*10;e.style.cssText=`left:${Math.random()*100}vw;width:${s}px;height:${s}px;background:${COL[i%3]};animation-duration:${2+Math.random()*2.5}s;animation-delay:${Math.random()*.8}s`;document.body.appendChild(e);setTimeout(()=>e.remove(),6000)}}
function done(att){last=0;reset();
const info=att?`<div class="info"><h3>INFORMAÇÕES IMPORTANTES</h3><h4>Regras para as fantasias</h4><ul>${REGRAS.map(r=>`<li>${r}</li>`).join("")}</ul></div>`:"";
h(`<img class="logo" src="${LOGO}" alt="Logo Vieira Games" draggable="false"><div class="card" style="margin-top:14px;text-align:center"><div class="ok">OK!</div><h2>Resposta enviada</h2><p>${att?"Te esperamos no Vieira Games!":"Obrigado pela sua resposta!"}</p>${info}<div class="menu"><button class="btn" id="m">Nova resposta</button></div></div>`);
document.getElementById("m").onclick=menu;
[523,659,784,1047].forEach((f,k)=>setTimeout(()=>beep(f,.12),k*110));
confetti()}
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
const TC=["#2f9be0","#ffd21f","#e0352b","#4cd44c","#e83e9c","#ff9f1c","#8e6bff"];
const SH=[[[0,0],[0,1],[0,2],[0,3]],[[0,0],[1,0],[1,1],[1,2]],[[0,2],[1,0],[1,1],[1,2]],[[0,0],[0,1],[1,0],[1,1]],[[0,1],[0,2],[1,0],[1,1]],[[0,1],[1,0],[1,1],[1,2]],[[0,0],[0,1],[1,1],[1,2]]];
const rotC=c=>{const r=c.map(([a,b])=>[b,-a]),m=Math.min(...r.map(x=>x[0])),n=Math.min(...r.map(x=>x[1]));return r.map(([a,b])=>[a-m,b-n])};
const T={on:false,raf:0};
function makeBoard(ctx,cell,rows,cols,ox,delay,gv){
let grid=Array.from({length:rows},()=>Array(cols).fill(0)),p=null,flash=null,drain=false,gA=0,hA=0,fA=0,dA=0,wait=delay;
const fits=(cs,r,c)=>cs.every(([a,b])=>{const y=r+a,x=c+b;return x>=0&&x<cols&&y<rows&&(y<0||!grid[y][x])});
function evalPlace(cs,c){let r=-3;if(!fits(cs,r,c))return null;while(fits(cs,r+1,c))r++;
const g=grid.map(x=>x.slice());let top=false;cs.forEach(([a,b])=>{if(r+a<0)top=true;else g[r+a][c+b]=1});if(top)return null;
let lines=0,holes=0,agg=0,bump=0,hs=[];
g.forEach(row=>{if(row.every(v=>v))lines++});
for(let x=0;x<cols;x++){let y=0;while(y<rows&&!g[y][x])y++;hs.push(rows-y);agg+=rows-y;for(let k=y+1;k<rows;k++)if(!g[k][x])holes++}
for(let x=1;x<cols;x++)bump+=Math.abs(hs[x]-hs[x-1]);
return lines*6-holes*5-agg*.35-bump*.25}
function spawn(){
const i=Math.floor(Math.random()*7);let cs=SH[i].map(x=>x.slice()),opts=[];
for(let k=0;k<4;k++){for(let c=0;c<cols;c++){const s=evalPlace(cs,c);if(s!==null)opts.push({s,cs,c})}cs=rotC(cs)}
if(!opts.length){drain=true;return}
opts.sort((a,b)=>b.s-a.s);const o=Math.random()<.3?opts[Math.min(opts.length-1,Math.floor(Math.random()*3))]:opts[0];
p={cs:o.cs,c:Math.floor(cols/2)-1,r:-2,tc:o.c,col:TC[i]};
if(!fits(p.cs,p.r,p.c)){drain=true;p=null}}
function lock(){p.cs.forEach(([a,b])=>{const y=p.r+a;if(y>=0)grid[y][p.c+b]=p.col});p=null;
const full=[];grid.forEach((row,y)=>{if(row.every(v=>v))full.push(y)});if(full.length){flash=full;fA=0}
const h=grid.findIndex(r=>r.some(v=>v));if(h>=0&&rows-h>rows*.6)drain=true}
function blk(x,y,col){ctx.fillStyle=col;ctx.fillRect(x,y,cell,cell);ctx.fillStyle="rgba(255,255,255,.35)";ctx.fillRect(x,y,cell,3);ctx.fillRect(x,y,3,cell);ctx.fillStyle="rgba(0,0,0,.3)";ctx.fillRect(x,y+cell-3,cell,3);ctx.fillRect(x+cell-3,y,3,cell);ctx.strokeStyle="#05091f";ctx.lineWidth=2;ctx.strokeRect(x+1,y+1,cell-2,cell-2)}
return{
update(dt){
if(wait>0){wait-=dt;return}
if(drain){dA+=dt;if(dA>70){dA=0;grid.pop();grid.unshift(Array(cols).fill(0));const h=grid.findIndex(r=>r.some(v=>v));if(h<0||rows-h<rows*.2)drain=false}}
else if(flash){fA+=dt;if(fA>260){flash.forEach(y=>{grid.splice(y,1);grid.unshift(Array(cols).fill(0))});flash=null}}
else if(!p)spawn();
else{hA+=dt;gA+=dt;
if(hA>85){hA=0;if(p.c!==p.tc){const d=p.tc>p.c?1:-1;if(fits(p.cs,p.r,p.c+d))p.c+=d}}
if(gA>gv){gA=0;if(fits(p.cs,p.r+1,p.c))p.r++;else lock()}}},
draw(){
ctx.strokeStyle="rgba(170,182,230,.18)";ctx.lineWidth=2;ctx.strokeRect(ox-1,0,cols*cell+2,rows*cell+2);
grid.forEach((row,y)=>row.forEach((v,x)=>{if(v)blk(ox+x*cell,y*cell,flash&&flash.includes(y)&&Math.floor(fA/65)%2===0?"#fff":v)}));
if(p)p.cs.forEach(([a,b])=>{if(p.r+a>=0)blk(ox+(p.c+b)*cell,(p.r+a)*cell,p.col)})}}}
function startTetris(){
if(RM)return;stopTetris();
const cv=document.getElementById("tc"),ctx=cv.getContext("2d");
cv.width=innerWidth;cv.height=innerHeight;
const narrow=innerWidth<700,cell=narrow?22:Math.round(Math.max(24,Math.min(32,innerWidth/45))),wc=narrow?7:9,rows=Math.ceil(innerHeight/cell);
const n=Math.min(5,Math.max(2,Math.floor(innerWidth/(cell*(wc+4))))),pitch=innerWidth/n;
const bs=[];for(let i=0;i<n;i++)bs.push(makeBoard(ctx,cell,rows,wc,Math.round(pitch*i+(pitch-wc*cell)/2),Math.random()*2500,120+Math.random()*100));
let last=performance.now();
function frame(t){if(!T.on)return;const dt=Math.min(100,t-last);last=t;
ctx.clearRect(0,0,cv.width,cv.height);bs.forEach(b=>{b.update(dt);b.draw()});
T.raf=requestAnimationFrame(frame)}
T.on=true;T.raf=requestAnimationFrame(frame)}
function stopTetris(){T.on=false;cancelAnimationFrame(T.raf);const cv=document.getElementById("tc");if(cv)cv.getContext("2d").clearRect(0,0,cv.width,cv.height)}
let rz;addEventListener("resize",()=>{clearTimeout(rz);rz=setTimeout(()=>{if(T.on)startTetris()},300)});
let going=false;
async function transition(){
if(going)return;going=true;
if(RM){document.body.classList.remove("menu");going=false;q(0);return}
const S=Math.round(Math.min(innerWidth,innerHeight)*.2),ov=document.createElement("div");ov.className="tr";
const pc=document.createElement("div");pc.className="pc3";
const sh=document.createElement("div");sh.className="sh3";sh.style.cssText=`left:${-1.5*S}px;top:${-S}px`;
[[0,1],[0,2],[1,0],[1,1]].forEach(([r,c])=>{const cu=document.createElement("div");cu.className="cu";cu.style.cssText=`width:${S}px;height:${S}px;transform:translate3d(${c*S}px,${r*S}px,0)`;
for(let f=1;f<=6;f++){const fe=document.createElement("i");fe.className="f"+f;fe.style.transform=["","translateZ("+S/2+"px)","rotateY(180deg) translateZ("+S/2+"px)","rotateY(90deg) translateZ("+S/2+"px)","rotateY(-90deg) translateZ("+S/2+"px)","rotateX(90deg) translateZ("+S/2+"px)","rotateX(-90deg) translateZ("+S/2+"px)"][f];cu.appendChild(fe)}
sh.appendChild(cu)});
pc.appendChild(sh);ov.appendChild(pc);document.body.appendChild(ov);
const D=1800;
const anim=pc.animate([
{transform:"translate3d(-45vw,-35vh,-3200px) rotateX(70deg) rotateY(-50deg) rotateZ(0deg)",offset:0},
{transform:"translate3d(-12vw,-5vh,-900px) rotateX(220deg) rotateY(110deg) rotateZ(100deg)",offset:.42},
{transform:"translate3d(0,0,780px) rotateX(340deg) rotateY(200deg) rotateZ(210deg)",offset:.7},
{transform:"translate3d(6vw,3vh,950px) rotateX(400deg) rotateY(250deg) rotateZ(260deg)",offset:.86},
{transform:"translate3d(10vw,6vh,1300px) rotateX(440deg) rotateY(290deg) rotateZ(300deg)",offset:1}
],{duration:D,easing:"cubic-bezier(.45,.05,.55,.95)",fill:"forwards"});
beep(180,.12);setTimeout(()=>beep(300,.12),D*.35);
setTimeout(()=>{beep(520,.14);document.body.classList.remove("menu");going=false;q(0)},D*.72);
await anim.finished;
ov.remove()}
flush();addEventListener("online",flush);
menu();
