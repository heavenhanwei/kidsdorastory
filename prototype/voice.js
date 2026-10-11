/* Server-mediated conversation layer. Fixed DATA and English lesson lines are never modified. */
(()=>{
if(op)return;
let generation=0,controller=null,settleTimer=null,maxTimer=null,advanceTimer=null,utteranceEnded=false,accepted=false,latest='',sessionContext=null,conversation=[],recentWords=[];
const statusLabels={starting:'正在打开麦克风…',listening:'正在听你说话…',transcribing:'正在整理你说的话…',thinking:'哆啦正在想一想…',replying:'哆啦说…',ready:'想到了什么？按住说给哆啦听',error:'再试一次，或用下一步继续'};
function valid(token){return token===generation&&sessionContext&&S.act===sessionContext.act&&S.turn===sessionContext.turn&&S.item===sessionContext.item}
function paint(){
 const status=S.voiceStatus||'idle';const portrait=$('screen').querySelector('.assistant-portrait'),mood=['listening','thinking'].includes(status)?'curious':S.act===4?'happy':'neutral';if(portrait&&portrait.dataset.mood!==mood)portrait.outerHTML=duola(S.act===3?'listening':'');$('autoplay').textContent=S.auto?'Ⅱ 暂停演示':'▷ 自动演示';
 $('voice-state').textContent=statusLabels[status]||$('voice-state').textContent;
 if(status!=='idle')$('speaker').textContent=status==='listening'?'哆啦正在倾听':status==='thinking'?'哆啦正在想一想':'哆啦陪你发现';
 document.querySelectorAll('[data-action="listen"]').forEach(b=>{b.classList.toggle('is-listening',status==='listening');b.disabled=['thinking','transcribing'].includes(status);b.textContent=status==='starting'?'◌ 正在打开麦克风…':status==='listening'?'● 正在听 · 松开发送':status==='thinking'?'◌ 哆啦想一想…':status==='transcribing'?'◌ 正在识别…':'♩ 按住说话';b.setAttribute('aria-pressed',String(status==='listening'))});
 const box=$('transcript'),reply=box?.querySelector('.model-conversation');
 if(box&&[1,2,3,4].includes(S.act)&&(S.transcript||['starting','listening','thinking','transcribing'].includes(status)||S.modelReply)){box.hidden=false;box.querySelector('.transcript-picture').innerHTML=art(cur().id);box.querySelector('small').textContent=S.transcriptSource||'你说的话';box.querySelector('.transcript-text').textContent=S.transcript||statusLabels[status]||'';}
 if(reply){reply.hidden=!S.modelReply&&!['thinking','transcribing'].includes(status);reply.querySelector('.model-source').textContent=S.modelSource==='cloud-model'?'哆啦 · 云端回复':S.modelSource==='local-model'?'哆啦 · 本机模型':S.modelSource==='local-demo'?'哆啦 · 本地演示回复': '哆啦';reply.querySelector('.model-reply').textContent=S.modelReply||statusLabels[status]||'';}
 if($('screen').querySelector('.response')&&S.modelReply)$('screen').querySelector('.response').textContent=S.modelReply;
 $('next').disabled=S.collecting||['thinking','transcribing'].includes(status); // Operator and keyboard may still take over.
 publish();
}
let lastAct=S.act,lastItem=S.item;const originalRender=render;
render=function(){if(S.item!==lastItem||(S.act!==lastAct&&!(lastAct===3&&S.act===4))){S.modelReply='';S.modelSource='';S.voiceStatus='idle';}lastAct=S.act;lastItem=S.item;if(S.act===3){const word=S.turn===1?cur().answer:cur().word;recentWords=recentWords.filter(w=>w!==word).concat(word).slice(-5);}originalRender();paint()};
function cancel(){generation++;controller?.abort();controller=null;clearTimeout(settleTimer);clearTimeout(maxTimer);clearTimeout(advanceTimer);S.voiceStatus='idle';accepted=true;}
function detachRecognizer(){clearTimeout(recognitionTimer);clearTimeout(maxTimer);clearTimeout(settleTimer);if(speechRec){speechRec.onstart=null;speechRec.onaudiostart=null;speechRec.onresult=null;speechRec.onend=null;speechRec.onerror=null;try{speechRec.abort()}catch{}speechRec=null}}
stopListening=detachRecognizer;
function start(){
 if(![1,2,3,4].includes(S.act)||S.awaitingCard||S.collecting)return;
 if(['starting','listening','thinking','transcribing'].includes(S.voiceStatus))return;
 const R=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!R){S.voiceStatus='error';paint();toast('此浏览器不支持语音识别，请用操作员回应继续。');return}
 clearTimeout(timer);S.auto=false;stopAudio(); // Stop TTS before microphone opens.
 const token=++generation;sessionContext={act:S.act,turn:S.turn,item:S.item};accepted=false;utteranceEnded=false;latest='';
 S.transcript='';S.transcriptSource='语音识别';S.modelReply='';S.modelSource='';S.voiceStatus='starting';S.recognitionError='';paint();
 try{
 const rec=new R();speechRec=rec;rec.lang='zh-CN';rec.interimResults=true;rec.continuous=false;rec.onstart=()=>{if(valid(token)&&!accepted&&S.voiceStatus==='starting'){S.voiceStatus='listening';paint();}};rec.onaudiostart=()=>{S.microphoneStarted=true;};
 rec.onresult=e=>{if(!valid(token)||accepted)return;latest=Array.from(e.results).map(r=>r[0].transcript).join('').trim().slice(0,600);S.transcript=latest;S.recognition=latest;updateTranscript();paint();if(e.results[e.results.length-1].isFinal)submit(latest,token);};
 rec.onend=()=>{if(!valid(token)||accepted)return;utteranceEnded=true;S.voiceStatus='transcribing';paint();clearTimeout(settleTimer);settleTimer=setTimeout(()=>{if(valid(token)&&!accepted){if(latest)submit(latest,token);else noSpeech(token)}},8000)};
 rec.onerror=e=>{if(!valid(token)||accepted||e.error==='aborted')return;S.recognitionError=e.error||'unknown';if(e.error==='no-speech'){noSpeech(token);return}accepted=true;detachRecognizer();S.voiceStatus='error';const messages={'not-allowed':'麦克风权限没有开启，请大人允许这个页面使用麦克风。','service-not-allowed':'当前浏览器没有开放语音识别服务，可以用 Chrome 或 Edge 打开本页再试。','audio-capture':'没有收到麦克风声音，请检查输入设备是否选对、是否被静音。','network':'浏览器语音识别服务连接失败，声音还没有变成文字，请检查网络或用 Chrome、Edge 重试。','language-not-supported':'当前浏览器的识别服务不支持中文，请换用 Chrome 或 Edge。'};S.modelReply=messages[e.error]||'语音识别没有完成，请松开后再试一次。';S.modelSource='';S.transcriptSource='语音识别未完成';paint();toast(S.modelReply)};
 rec.start();maxTimer=setTimeout(release,12000);
 }catch{detachRecognizer();S.voiceStatus='error';paint();toast('无法打开麦克风，请重试或使用操作员回应。')}
}
function release(){if(!speechRec||accepted||!['starting','listening','transcribing'].includes(S.voiceStatus))return;S.voiceStatus='transcribing';paint();try{speechRec.stop()}catch{}clearTimeout(maxTimer);clearTimeout(settleTimer);const token=generation;settleTimer=setTimeout(()=>{if(valid(token)&&!accepted){if(latest)submit(latest,token);else noSpeech(token)}},8000)}
function noSpeech(token){if(!valid(token)||accepted)return;accepted=true;detachRecognizer();S.voiceStatus='ready';S.transcriptSource='未收到识别文字';S.modelReply='这次没有收到识别文字，请按住按钮，等显示正在听后说话，再松开。';S.modelSource='local-demo';paint();say(S.modelReply);}
function fallback(text){let d=cur(),question=/为什么|怎么|什么|哪里|吗|呢|[?？]|\b(why|how|what|where)\b/i.test(text),word=S.turn===1?d.answer:d.word;let match=new RegExp('(^|[^a-z])'+word+'([^a-z]|$)','i').test(text)||text.includes(S.turn===1?d.zh:d.cn)||d.id==='dove'&&text.includes('斑鸠');return {reply:question?'这个问题值得一起找一找。我们先仔细观察，再请身边的大人一起确认。':match?'哆啦停下脚步，想和你一起看看更多细节。':'哆啦仔细看看画面，你还注意到了什么？',advance:!question&&match,intent:question?'QUESTION':match?'ANSWER':'CHAT',source:'local-demo'};}
async function submit(text,token){
 if(!valid(token)||accepted||!text)return;accepted=true;detachRecognizer();S.transcript=text;S.recognition=text;S.voiceStatus='thinking';paint();controller=new AbortController();const requestController=controller;const abortTimer=setTimeout(()=>requestController.abort(),15000);let result;
 try{const response=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text,item:cur().id,turn:S.turn,history:conversation.slice(-6),recentWords,scene:{act:S.act,view:window.forceFlat?"illustration":"3d"},cards:S.got.map(d=>d.id),currentCard:{id:cur().id,description:cur().description}}),signal:controller.signal});if(!response.ok)throw Error('analysis unavailable');result=await response.json();if(typeof result.reply!=='string'||result.reply.length>200||!['cloud-model','local-model','local-demo'].includes(result.source)||!['ANSWER','QUESTION','CHAT'].includes(result.intent))throw Error('invalid reply');}
 catch{result=fallback(text);result.reply=result.reply.split(/[。？]/)[0]+'。你想和哆啦一起'+cur().observe+'吗？'}finally{clearTimeout(abortTimer)}
 if(!valid(token))return;controller=null;S.modelReply=result.reply;S.modelSource=result.source;S.reply=result.reply;S.voiceStatus='replying';conversation.push({role:'user',content:text},{role:'assistant',content:result.reply});conversation=conversation.slice(-6);paint();
 say(result.reply,()=>{if(!valid(token))return;S.voiceStatus='ready';paint();if(result.advance===true&&result.intent==='ANSWER'&&sessionContext.act===3&&!S.awaitingCard){advanceTimer=setTimeout(()=>{if(!valid(token))return;saveHistory();S.turn++;if(S.turn===3){S.turn=2;S.awaitingCard=true;}S.voiceStatus='ready';render();say(line());},900)}else if(sessionContext.act===1&&/哆啦|多啦|duola|dora|兔兔|快看/.test(text)){advanceTimer=setTimeout(()=>{if(valid(token))next()},900)}});
}
function bind(button){button.style.touchAction='none';button.onpointerdown=e=>{if(e.button!==undefined&&e.button!==0)return;e.preventDefault();button.setPointerCapture?.(e.pointerId);start()};button.onpointerup=e=>{e.preventDefault();release()};button.onpointercancel=release;button.onlostpointercapture=release;button.onkeydown=e=>{if((e.code==='Space'||e.code==='Enter')&&!e.repeat){e.preventDefault();start()}};button.onkeyup=e=>{if(e.code==='Space'||e.code==='Enter'){e.preventDefault();release()}};}
listen=start;
const originalReset=reset;reset=function(){conversation=[];recentWords=[];originalReset();S.modelReply='';S.modelSource='';S.voiceStatus='idle';paint()};
window.DuolaVoice={bind,cancel,start,release,submit:text=>{clearTimeout(timer);stopAudio();const token=++generation;sessionContext={act:S.act,turn:S.turn,item:S.item};accepted=false;return submit(text,token)}};
// Use wrappers for already-bound controls, too.
$('reset').onclick=reset;window.DuolaDemo.reset=reset;
render();
fetch('/api/status').then(r=>r.ok?r.json():null).then(data=>{if(data){S.modelMode=data.mode;publish()}}).catch(()=>{});
})();

