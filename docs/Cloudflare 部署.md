# 哆啦的故事书 · Cloudflare 部署

## 云端运行
静态页面、Three.js 和图片由 Cloudflare Static Assets 提供，/api/status 与 /api/analyze 由 JavaScript Worker 处理。运行时不读取本地文件、Python 服务、Windows 配置或 localhost。首次打开与每次模型调用均可在电脑关机后工作。

## 配置
- 项目名：duola-storybook
- 域名：dorastory.ifelse.work
- 普通变量：DUOLA_BASE_URL、DUOLA_CLOUD_MODEL，默认百炼北京地址与 qwen3.8-flash。
- Secret：DUOLA_API_KEY。在 Cloudflare 控制台 Worker → Settings → Variables and Secrets 中选择 Secret 添加。不要把密钥填入普通变量、仓库、截图或聊天。
- vars 由 wrangler.jsonc 管理；如在控制台更改模型/地址，也需要同步该文件，避免下次部署覆盖。

## 命令（项目根目录）
```powershell
node scripts/build-cloud.mjs
node --test cloudflare/worker.test.mjs
node node_modules/wrangler/bin/wrangler.js login
node node_modules/wrangler/bin/wrangler.js whoami
node node_modules/wrangler/bin/wrangler.js deploy --dry-run
node node_modules/wrangler/bin/wrangler.js deploy
```
Windows UNC 工作目录使用上述直接 node 命令，避免 npm run 的 cmd 工作目录限制。Wrangler 是部署工具，不是网站运行依赖。

## 发布检查
访问 HTTPS 域名；/api/status 应显示 configured=true；真实模型回复应标注云端。若未配置或上游不可用，界面明确标注备用引导回复。

模型请求只发送文字、预设画面/卡片描述、近期课程词及最多六条对话，不上传录音或图片；不记录儿童文本或上游返回体到 Worker 日志。原始素材、文档、测试截图、Python、本地密钥均不进入静态发布目录。

接口限流为每个共享 IP 每分钟12次、全应用每个 Cloudflare 区域每分钟120次。这是匿名体验版的基础限流，会影响共享网络用户；Cloudflare Rate Limit 为区域近似计数，并非全局费用硬上限。公开访问规模扩大时再增加身份/挑战校验和百炼侧预算控制。

浏览器语音识别、朗读仍依赖体验设备和浏览器；云端部署本身不会让所有手机支持 Web Speech。收藏和对话仍只保存在当前页面内存，刷新会清空。此版本不创建 D1/R2 或收费资源。


## 已发布状态（2026-10-11）
- 正式地址：https://dorastory.ifelse.work
- Worker：duola-storybook
- 版本：225d3f9c-414e-43b9-96dd-46a266a3f8c7
- DUOLA_API_KEY 已通过标准输入写入 Cloudflare Secret，未进入仓库、构建产物或命令行参数。
- Wrangler 4.149.0；Windows CLI 本次使用系统现有的 HTTP 代理完成 OAuth 与部署，代理仅用于管理工具，不是网站运行依赖。
- Worker 单元测试7项通过；通过正式域名验证 HTTPS、真实百炼回复、提问保留当前轮与固定英语不变。
- 当前 Worker 运行时拒绝 fetch 的 redirect:error，使用 redirect:manual 并拒绝3xx响应，确保 Authorization 不被转发至其他主机；另保留全局 fetch 接收者绑定。
- 真实浏览器麦克风和中国各地网络仍需体验者实测；此处线上问答验证使用模拟识别文字。
