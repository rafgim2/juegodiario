import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const model=fs.readFileSync('src/questions.js','utf8');
const ctx=vm.createContext({});
vm.runInContext(model,ctx);
const bank=vm.runInContext('bank',ctx);
assert(bank.length>=100);
assert.equal(new Set(bank.map(x=>x.word)).size,bank.length);
for(const item of bank){ctx.item=item;const q=vm.runInContext('wordQuestion(item)',ctx);assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert(q.options.includes(q.a));assert(q.category);}
for(let n=0;n<10000;n++){
 const q=vm.runInContext('mathQuestion()',ctx);let expected;
 if(q.q.includes('%')){const [a,b]=q.q.match(/\d+/g).map(Number);expected=a*b/100;}
 else if(q.q.includes(' de ')){const [a,b,c]=q.q.match(/\d+/g).map(Number);expected=a*c/b;}
 else expected=vm.runInNewContext(q.q.replaceAll('×','*').replaceAll('÷','/').replaceAll('−','-').replaceAll('²','**2'));
 assert.equal(Number(q.a),expected);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.options.filter(v=>v===q.a).length,1);
}
for(const kind of ['words','math'])for(let i=0;i<100;i++){const d=vm.runInContext(`makeDeck('${kind}')`,ctx);assert.equal(d.length,12);assert.equal(new Set(d.map(q=>q.q)).size,12);}
// Minimal DOM stub exercises the real inline game state machine, not a rewritten model.
class Element{constructor(){this.children=[];this.style={};this.dataset={};this.value='';this.hidden=false;this.textContent='';this.classList={add(){}};}replaceChildren(){this.children=[];}append(x){this.children.push(x);}setAttribute(){}addEventListener(){}focus(){}}
for(const date of ['2026-09-18','2026-09-21']){
 const html=fs.readFileSync(`games/${date}/index.html`,'utf8');assert(!/__MODEL__|__TITLE__/.test(html));
 const nodes=new Map();let now=0;const intervals=new Map();let id=0;
 const document={getElementById(k){if(!nodes.has(k))nodes.set(k,new Element());return nodes.get(k);},createElement(){return new Element();},addEventListener(){}};
 const env=vm.createContext({document,window:{},performance:{now:()=>now},setInterval(fn){intervals.set(++id,fn);return id;},clearInterval(id){intervals.delete(id);},setTimeout(){return ++id;},clearTimeout(){},matchMedia:()=>({matches:true})});
 const run=s=>vm.runInContext(s,env);run(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
 run('start()');assert.equal(run('round'),1);assert.equal(intervals.size,1);
 run('answer(0,deck[0].options.indexOf(deck[0].a));answer(0,deck[0].options.indexOf(deck[0].a))');assert.equal(run('scores[0]'),1);assert.equal(run('state'),'playing');
 run('answer(1,deck[0].options.indexOf(deck[0].a))');assert.equal(run('scores[1]'),1);assert.equal(run('state'),'review');assert.equal(intervals.size,0);
 run('nextRound();pause()');assert.equal(run('state'),'paused');assert.equal(intervals.size,0);run('answer(0,0)');assert.equal(run('answered[0]'),false);
 now+=30000;run('resume()');assert.equal(run('state'),'playing');run('start()');assert.equal(run('round'),1);assert.equal(run('scores[0]+scores[1]'),0);assert.equal(intervals.size,1);
 now+=21000;for(const fn of [...intervals.values()])fn();assert.equal(run('state'),'review');assert.equal(run('scores[0]+scores[1]'),0);
 run('start()');for(let i=0;i<12;i++)run('answer(0,deck[round-1].options.indexOf(deck[round-1].a));answer(1,deck[round-1].options.indexOf(deck[round-1].a));nextRound()');
 assert.equal(run('state'),'ended');assert.equal(run('scores[0]'),12);assert.equal(run('scores[1]'),12);assert.equal(intervals.size,0);assert.equal(nodes.get('winner').textContent,'¡Victoria compartida!');
}
console.log(`OK: ${bank.length} palabras, 10.000 operaciones, 200 partidas sin repetición, respuestas simultáneas, doble toque, pausa, tiempo agotado, reinicio y final de ambos juegos.`);
