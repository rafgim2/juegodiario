import fs from 'node:fs';
const template=fs.readFileSync('src/game.html','utf8');
const model=fs.readFileSync('src/questions.js','utf8');
for(const [date,title,subject,kind,footer] of [
 ['2026-09-21','⚡ Pulso Numérico','Matemáticas','math','Cálculo mental · Operaciones, fracciones, porcentajes y potencias.'],
 ['2026-09-18','✍️ Acento Relámpago','Castellano','words','Reglas contrastadas con el <a href="https://www.rae.es/dpd/tilde" target="_blank" rel="noopener">Diccionario panhispánico de dudas (RAE / ASALE)</a>. La pista indica la acentuación de la palabra buscada.']
]) {
 const values={TITLE:title,SUBJECT:subject,KIND:kind,FOOTER:footer,MODEL:model};
 const html=template.replace(/__(TITLE|SUBJECT|KIND|FOOTER|MODEL)__/g,(_,key)=>values[key]);
 fs.mkdirSync('games/'+date,{recursive:true});
 fs.writeFileSync('games/'+date+'/index.html',html);
}
