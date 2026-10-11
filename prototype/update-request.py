from pathlib import Path
p=Path('prototype/app.js');s=p.read_text(encoding='utf-8-sig')
s=s.replace("favorite:null,reply:'',recognition:''", "favorite:null,reply:'',recognition:'',transcript:'',transcriptSource:''")
s=s.replace("['把今天，说给家人听','今天的宝藏，<br><span>你最爱哪一个？</span>','翻一翻，再说一说。<br>每一张卡片，都是一个聊天的开头。','回顾真实经历，让表达自然发生','左右滑动翻卡，也可以点选最喜欢的发现。']", "['今天的发现，已经收好','今天遇见的，<br><span>都在这里了。</span>','收集到什么，就留下什么。<br>这些小发现，会自动走进今晚的故事。','实际发现，自动成为故事素材','只展示今天收集到的卡片，无需填写、补齐或选择。']")
a=s.index('if(S.act===5)h=');b=s.index('\nif(S.act===6)',a)
s=s[:a]+'''if(S.act===5)h=`<div class="album-title"><h2>今天的发现，已经收好</h2><small>今天 · ${S.got.length} 个发现</small></div><div class="album-grid" id="album">${S.got.map(x=>`<article class="album-card">${art(x.id)}<div class="english">${x.word}</div><p>${x.cn}</p></article>`).join('')||'<p>今天暂时没有收藏。散步本身，也是一段好时光。</p>'}</div><p>无需填写或补齐 · 今天的发现会自动放进绘本</p><button class="screen-action" data-action="next">翻开今天的故事书 ✦</button>`;'''+s[b:]
s=s.replace("if(S.act===5)return '今天的发现里，你最喜欢哪一张？';", "if(S.act===5)return `今天的 ${S.got.length} 个发现都收好啦。它们会一起走进今晚的故事。`;")
s=s.replace("'最喜欢哪一个',S.dark", "'今天的发现已收好',S.dark")
s=s.replace("$('screen').innerHTML=h;", "$('screen').innerHTML=h;updateTranscript();")
s=s.replace("function respond(kind,record=true){", "function respond(kind,record=true,spoken=null){")
s=s.replace("let reply=replies[S.turn];S.recognition=kind;", "let reply=replies[S.turn];S.transcript=spoken??(kind==='EN'?[d.word,d.answer,d.sentence][S.turn]:kind==='ZH'?[d.cn,d.zh,'我看到了'+d.cn][S.turn]:'');S.transcriptSource=spoken!==null?'语音识别':kind==='SILENT'?'暂时没有说话':'演示回应';S.recognition=spoken??kind;")
s=s.replace("S.reply='';if(S.act===0)", "S.reply='';if(S.act!==3){S.transcript='';S.transcriptSource='';}if(S.act===0)")
s=s.replace("S.playing=false;S.reply='';if(act===4)", "S.playing=false;S.reply='';S.transcript='';S.transcriptSource='';if(act===4)")
s=s.replace("speechRec.interimResults=false;", "speechRec.interimResults=true;")
s=s.replace("let text=e.results[0][0].transcript.toLowerCase();S.recognition=text;publish();if(act!==S.act||round!==S.turn)return;", "if(act!==S.act||round!==S.turn)return;let raw=Array.from(e.results).map(r=>r[0].transcript).join('');let text=raw.toLowerCase();S.recognition=raw;S.transcript=raw;S.transcriptSource='语音识别';updateTranscript();publish();if(!e.results[e.results.length-1].isFinal)return;")
s=s.replace("if(text.includes(word))respond('EN');", "if(text.includes(word))respond('EN',true,raw);")
s=s.replace("&&d.id==='dove')respond('ZH');", "&&d.id==='dove')respond('ZH',true,raw);")
s=s.replace("S.transcriptSource='语音识别';updateTranscript();", "S.transcriptSource='语音识别';updateTranscript();")
insert='''function updateTranscript(){const box=$('transcript');if(!box)return;box.hidden=![1,3,4].includes(S.act)||(!S.transcript&&!S.transcriptSource);if(box.hidden)return;box.querySelector('.transcript-picture').innerHTML=art(cur().id);box.querySelector('small').textContent=S.transcriptSource;box.querySelector('.transcript-text').textContent=S.transcript||'没关系，听 哆啦 说也可以。';}
'''
s=s.replace('function render(){',insert+'function render(){')
s=s.replace("document.body.className='operator-page';", "document.title='哆啦的故事书 · 操作员';document.body.className='operator-page';")
p.write_text(s,encoding='utf-8')
p=Path('prototype/index.html');s=p.read_text(encoding='utf-8-sig');s=s.replace('<title>哆啦 · 把小发现，变成大故事</title>','<title>哆啦的故事书</title>').replace('<strong>哆啦<span>公园探险</span></strong>','<strong class="story-brand">哆啦的故事书<span>和 哆啦 一起发现世界</span></strong>');s=s.replace('<footer class="caption">','<section id="transcript" class="speech-caption" aria-live="polite" aria-label="孩子说的话" hidden><div class="transcript-picture"></div><div><small></small><p class="transcript-text"></p></div></section><footer class="caption">');p.write_text(s,encoding='utf-8')
