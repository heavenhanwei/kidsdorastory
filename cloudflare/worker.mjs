import catalogue from '../prototype/content.json' with {type:'json'};
import prompt from './prompt.mjs';
const items=new Map(catalogue.map(d=>[d.id,d])),allowed=new Set(catalogue.flatMap(d=>[d.word,d.answer]));
const questionText={dove:'你能找找它脖子上的白点吗？',flower:'你想找找哪几朵桂花挤在一起吗？',train:'你能找找排成一行的车窗吗？',bridge:'你想和大人从步道上看看桥下有什么吗？',tree:'你想比较一下树干和叶子的颜色吗？',grass:'你能找找哪片草叶更长吗？',lake:'你想和大人站在步道上找找水面的波纹吗？',duck:'你能找找鸭子身边的水纹吗？',snail:'你想蹲在旁边看看蜗牛壳上的花纹吗？'};
const json=(data,status=200,extra={})=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra}});
export function withQuestion(reply,item){reply=reply.trim().replaceAll('?','？');return reply.includes('？')?reply.split('？')[0]+'？':reply.split(/[。！!]/)[0]+'。'+questionText[item.id];}
export function contextFor(p){
 if(!p||typeof p!=='object'||Array.isArray(p)||typeof p.text!=='string'||!p.text.trim()||p.text.length>600||!items.has(p.item)||!Number.isInteger(p.turn??0)||(p.turn??0)<0||(p.turn??0)>2)throw Error('invalid-context');
 const item=items.get(p.item),turn=p.turn??0;
 const history=(Array.isArray(p.history)?p.history:[]).slice(-6).filter(h=>h&&['user','assistant'].includes(h.role)&&typeof h.content==='string').map(h=>({role:h.role,content:h.content.slice(0,300)}));
 const recent=[...new Set((Array.isArray(p.recentWords)?p.recentWords:[]).slice(-5).filter(w=>typeof w==='string'&&allowed.has(w)))];
 const cards=[...new Set((Array.isArray(p.cards)?p.cards:[]).slice(0,12).filter(id=>typeof id==='string'&&items.has(id)))];
 const act=Number.isInteger(p.scene?.act)&&p.scene.act>=0&&p.scene.act<=6?p.scene.act:3;
 const context={'最近实际用过的英语词':recent,'画面':{'阶段':['出门','发现','拍照','对话','得卡','回家','睡前'][act],'场景描述':'预设秋日公园示意画面：桂花树、草地、湖泊、小桥、远处轨道，哆啦兔子与小蜘蛛结伴探索；动物沿预设轨迹移动。这不是摄像头实时视觉识别，不可断言孩子已看到某个动作。','当前焦点描述':item.description},'当前卡片':{'名称':item.cn,'画面细节':item.description,'观察邀请':item.observe},'已收集卡片':cards.map(id=>({'名称':items.get(id).cn,'画面细节':items.get(id).description})),'物品':item.cn,'本轮':turn+1,'固定教学内容':[item.word,item.q,item.sentence][turn],'孩子说':p.text};
 return {item,turn,history,recent,context};
}
function fallback(text,item,turn){
 const question=/为什么|怎么|怎样|哪里|什么|会不会|是不是|吗|呢|[?？]|\b(why|how|what|where)\b/i.test(text),target=turn===1?item.answer:item.word;
 const matches=new RegExp('(^|[^a-z])'+target+'([^a-z]|$)','i').test(text)||text.includes(turn===1?item.zh:item.cn)||(item.id==='dove'&&text.includes('斑鸠'));
 const intent=question?'QUESTION':/不想|不要说|不说|害羞|不会|不知道/.test(text)?'CHAT':matches?'ANSWER':'CHAT';
 const reply=withQuestion(question?'这个问题哆啦还想和你一起确认。':'哆啦停下脚步，想和你一起看看眼前的细节。',item);
 return {reply,intent,advance:intent==='ANSWER',source:'local-demo'};
}
export async function analyze(p,env,upstream=(input,init)=>globalThis.fetch(input,init)){
 const {item,turn,history,recent,context}=contextFor(p),backup=fallback(p.text,item,turn);
 if(!env.DUOLA_API_KEY)return {...backup,reason:'not-configured'};
 let stage='configuration';
 try{
  const endpoint=new URL(env.DUOLA_BASE_URL||'https://dashscope.aliyuncs.com/compatible-mode/v1');
  if(endpoint.protocol!=='https:'||endpoint.username||endpoint.password||endpoint.search||endpoint.hash)throw Error('invalid-base');
  endpoint.pathname=endpoint.pathname.replace(/\/$/,'');if(!endpoint.pathname.endsWith('/chat/completions'))endpoint.pathname+='/chat/completions';
  stage='request';const response=await upstream(endpoint,{method:'POST',redirect:'manual',headers:{'Content-Type':'application/json','Authorization':'Bearer '+env.DUOLA_API_KEY},body:JSON.stringify({model:env.DUOLA_CLOUD_MODEL||'qwen3.8-flash',stream:false,messages:[{role:'system',content:prompt},...history,{role:'user',content:JSON.stringify(context)}],temperature:.35,max_tokens:250,response_format:{type:'json_object'},enable_thinking:false}),signal:AbortSignal.timeout(12000)});
  if(!response.ok)throw Error('upstream-http-'+response.status);
  stage='read';const raw=await readBounded(response,65536);stage='decode-response';const data=JSON.parse(raw),content=data.choices?.[0]?.message?.content;
  if(typeof content!=='string')throw Error('invalid-content');
  stage='decode-answer';const answer=JSON.parse(content.trim().replace(/^```(?:json)?\s*|\s*```$/g,''));
  if(!answer||typeof answer.reply!=='string'||!answer.reply.trim()||answer.reply.length>200||!/[\u4e00-\u9fff]/.test(answer.reply)||!['ANSWER','QUESTION','CHAT'].includes(answer.intent)||(answer.reply.match(/[A-Za-z]+/g)||[]).some(w=>!recent.includes(w.toLowerCase())))throw Error('invalid-reply');
  const intent=backup.intent==='QUESTION'?'QUESTION':backup.intent==='ANSWER'?'ANSWER':answer.intent;
  return {reply:withQuestion(answer.reply.replaceAll(env.DUOLA_API_KEY,'[已隐藏]'),item),intent,advance:intent==='ANSWER',source:'cloud-model'};
 }catch(error){const runtimeIssue=['redirect','Illegal invocation','AbortSignal','header','URL','not a function'].find(term=>String(error.message).includes(term));const safe=/^(upstream-http-\d{3}|invalid-content|invalid-reply|invalid-base|body-too-large|empty-body)$/.test(error.message)?error.message:error.name==='TimeoutError'?'upstream-timeout':(runtimeIssue?'runtime-'+runtimeIssue.replaceAll(' ','-'):'upstream-request-failed');return {...backup,reason:'model-unavailable',code:safe,stage,errorType:['TypeError','SyntaxError','TimeoutError'].includes(error.name)?error.name:'Error'}}
}
async function readBounded(message,max){
 const reader=message.body?.getReader();if(!reader)throw Error('empty-body');let size=0,parts=[];
 try{while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>max){await reader.cancel();throw Error('body-too-large')}parts.push(value)}}finally{reader.releaseLock()}
 const out=new Uint8Array(size);let offset=0;for(const part of parts){out.set(part,offset);offset+=part.byteLength}return new TextDecoder().decode(out);
}
export default {async fetch(request,env){
 const url=new URL(request.url);
 if(!url.pathname.startsWith('/api/'))return env.ASSETS.fetch(request);
 const origin=request.headers.get('Origin');if(origin&&origin!==url.origin)return json({error:'same-origin-required'},403);
 if(url.pathname==='/api/status'&&request.method==='GET')return json({mode:env.DUOLA_API_KEY?'cloud-model':'local-demo',configured:!!env.DUOLA_API_KEY});
 if(url.pathname!=='/api/analyze')return json({error:'not-found'},404);
 if(request.method!=='POST')return json({error:'method-not-allowed'},405,{Allow:'POST'});
 if(request.headers.get('Content-Type')?.split(';')[0]!=='application/json')return json({error:'json-required'},415);
 let p;try{p=JSON.parse(await readBounded(request,12000));contextFor(p)}catch{return json({error:'invalid-request'},400)}
 if(!env.API_RATE_LIMITER||!env.APP_RATE_LIMITER)return json({error:'rate-limit-not-configured'},503);
 // Anonymous demo: shared-IP protection plus an application-wide regional cap.
 // Cloudflare counters are per location and approximate, not a hard spending cap.
 const ip=request.headers.get('CF-Connecting-IP')||'anonymous';
 try{if(!(await env.API_RATE_LIMITER.limit({key:'duola:'+ip})).success||!(await env.APP_RATE_LIMITER.limit({key:'duola:all'})).success)return json({error:'rate-limited'},429,{'Retry-After':'60'})}catch{return json({error:'rate-limit-unavailable'},503)}
 return json(await analyze(p,env));
}};
