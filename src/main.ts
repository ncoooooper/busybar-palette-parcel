import {desk} from "@shared/desk";
import {wrap,rect,label,type Frame} from "@shared/surface";
type Thread={code:string;hex:string;lab:number[]};type S={rgb:number[];ch:number;saved:number[]};
function lab(rgb:number[]){const c=rgb.map(n=>{const x=n/255;return x<=.04045?x/12.92:Math.pow((x+.055)/1.055,2.4);});
 const f=(n:number)=>n>216/24389?Math.cbrt(n):(24389*n/27+16)/116;
 const x=f((.4124564*c[0]+.3575761*c[1]+.1804375*c[2])/.95047),y=f(.2126729*c[0]+.7151522*c[1]+.072175*c[2]),z=f((.0193339*c[0]+.119192*c[1]+.9503041*c[2])/1.08883);
 return [116*y-16,500*(x-y),200*(y-z)];}
function parse(s:string){const out:Thread[]=[];for(const pair of s.split(",")){const [code,hex]=pair.trim().split("|");if(code&&/^[A-Fa-f0-9]{6}$/.test(hex||""))out.push({code,hex,lab:lab([0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)))});}return out;}
let threads=parse("OCH|BD8C49,MOS|678362,IND|48639B,ROS|BA7981,CRM|EEE2C1,INK|303B47");
desk<S>({name:"Palette Parcel",accent:"#B695F0",motion:{"motif":"trace","color":"#B695F0","shine":"#F8E8FF"},initial:()=>({rgb:[109,141,98],ch:0,saved:[109,141,98]}),configure:(_,v)=>{const t=parse(String(v.threads||""));if(t.length)threads=t;},
 render:s=>{const target=lab(s.rgb),distance=(t:Thread)=>Math.sqrt(t.lab.reduce((a,v,i)=>a+(v-target[i])**2,0));let best=threads[0];for(const t of threads)if(distance(t)<distance(best))best=t;
 const hex=s.rgb.map(v=>v.toString(16).padStart(2,"0")).join("").toUpperCase(),art:Frame=[rect("ref",0,0,20,16,"#"+hex+"FF"),rect("match",21,0,20,16,"#"+best.hex+"FF"),label("code",best.code,43,3,"#FFF2D7FF","front","tiny")];
 return {title:"Thread match",value:best.code,art,lines:["Reference #"+hex,"Thread "+best.code+" / #"+best.hex,"CIE76 distance "+distance(best).toFixed(1),"Edit "+"RGB"[s.ch]+": "+s.rgb[s.ch],"Wheel: adjust / Click: channel","Start: save / Hold OK: recall"]};},
 action:(s,k)=>{if(k==="ok")s.ch=wrap(s.ch+1,3);if(k==="up"||k==="down")s.rgb[s.ch]=Math.max(0,Math.min(255,s.rgb[s.ch]+(k==="up"?5:-5)));if(k==="start")s.saved=s.rgb.slice();if(k==="hold-ok")s.rgb=s.saved.slice();}});
