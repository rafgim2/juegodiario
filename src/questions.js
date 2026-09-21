const pick=(a)=>a[Math.floor(Math.random()*a.length)];
const int=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){let j=int(0,i);[a[i],a[j]]=[a[j],a[i]];}return a;};
const groups=[
["Aguda terminada en vocal, n o s: lleva tilde.","balón camión canción avión león melón limón ratón tiburón salmón botón sillón cajón jamón algodón corazón pantalón cinturón buzón ciclón campeón jabalí colibrí café bebé sofá bambú menú champú compás autobús después también almacén andén volcán jardín delfín rubí maniquí"],
["Llana terminada en consonante distinta de n o s: lleva tilde.","árbol lápiz fácil difícil débil hábil útil inútil dócil frágil ágil fértil mármol azúcar césped ángel túnel cárcel cóndor cráter"],
["Esdrújula: siempre lleva tilde.","brújula pájaro teléfono murciélago océano matemáticas música máquina cámara pirámide triángulo círculo rectángulo bolígrafo semáforo helicóptero relámpago cáscara médico ejército estómago hígado oxígeno kilómetro centímetro plátano sábado miércoles sílaba gramática geográfico"],
["Llana terminada en vocal, n o s: no lleva tilde.","casa mesa ventana mochila zapato escuela libro cuaderno pelota planeta tortuga elefante jirafa conejo caballo gallina naranja manzana tomate ensalada"],
["Aguda terminada en consonante distinta de n o s: no lleva tilde.","reloj papel animal caracol motor calor color ciudad amistad libertad"]
];
const bank=groups.flatMap(([rule,words])=>words.split(" ").map(word=>({word,rule}))).filter((x,i,a)=>a.findIndex(y=>y.word===x.word)===i);
function wordQuestion(item){
 const plain=item.word.normalize('NFD').replace(/\u0301/g,'').normalize('NFC');
 const alternatives=new Set([plain]);
 for(let i=0;i<plain.length;i++){const k="aeiou".indexOf(plain[i]);if(k>=0)alternatives.add(plain.slice(0,i)+"áéíóú"[k]+plain.slice(i+1));}
 alternatives.delete(item.word);
 return {q:plain.toUpperCase(),a:item.word,category:item.rule.split(":")[0]+".",options:shuffle([item.word,...shuffle([...alternatives]).slice(0,2)]),explain:item.word+" · "+item.rule};
}
function mathQuestion(){
 let a=int(2,12),b=int(2,20),c=int(2,12),type=int(0,7),q,answer,explain;
 switch(type){
 case 0:q=a+" + "+b+" × "+c;answer=a+b*c;explain="Primero multiplica "+b+" × "+c+"; después suma "+a+".";break;
 case 1:q=(a*b)+" ÷ "+a+" + "+c;answer=b+c;explain="Primero divide; después suma.";break;
 case 2:q=a+" × "+b;answer=a*b;explain=a+" × "+b+" = "+answer;break;
 case 3:{const p=pick([10,20,25,50,75]),n=int(1,20)*20;q=p+" % de "+n;answer=p*n/100;explain=n+" × "+p+" ÷ 100 = "+answer;break;}
 case 4:{const d=pick([2,3,4,5,8]),n=int(2,20)*d;q="1/"+d+" de "+n;answer=n/d;explain="Divide "+n+" entre "+d+".";break;}
 case 5:q=a+"² + "+b;answer=a*a+b;explain=a+" × "+a+" + "+b+" = "+answer;break;
 case 6:q="("+a+" + "+b+") × "+c;answer=(a+b)*c;explain="Resuelve el paréntesis y multiplica por "+c+".";break;
 default:q=(a*b+c)+" − "+a+" × "+b;answer=c;explain="Primero multiplica, después resta.";break;
 }
 const values=new Set([answer]);while(values.size<4){const v=answer+pick([-1,1])*int(1,Math.max(4,Math.ceil(answer*.25)));if(v>=0)values.add(v);}
 return {q,a:String(answer),options:shuffle([...values].map(String)),explain};
}
function makeDeck(kind){
 if(kind==="words")return shuffle(bank).slice(0,12).map(wordQuestion);
 const used=new Set(),deck=[];while(deck.length<12){const x=mathQuestion();if(!used.has(x.q)){used.add(x.q);deck.push(x);}}return deck;
}
