import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const root=resolve(import.meta.dirname,'..'),out=join(root,'dist');
await mkdir(out,{recursive:true});
for(const name of ['index.html','app.js','voice.js','style.css','scene.js']){
 let data=await readFile(join(root,'prototype',name),'utf8');
 data=data.replaceAll('本地演示回复','备用引导回复').replaceAll('本机服务端调用','云端服务调用').replaceAll('云端模型由本机服务端调用','云端模型由 Cloudflare 调用');
 if(/127\.0\.0\.1|localhost|LOCALAPPDATA/.test(data))throw Error(`Machine dependency in ${name}`);
 await writeFile(join(out,name),data);
}
for(const folder of ['assets','vendor']){
 await mkdir(join(out,folder),{recursive:true});
 for(const entry of await readdir(join(root,'prototype',folder),{withFileTypes:true})){
  if(entry.isFile()&&/\.(png|jpg|svg|js|txt)$/.test(entry.name)&&!entry.name.includes('Zone.Identifier'))await cp(join(root,'prototype',folder,entry.name),join(out,folder,entry.name));
 }
}
await writeFile(join(out,'_headers'),`/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: microphone=(self), camera=()\n  X-Frame-Options: SAMEORIGIN\n`);
console.log('Cloud assets built from explicit whitelist; no Python, credentials or machine configuration.');
