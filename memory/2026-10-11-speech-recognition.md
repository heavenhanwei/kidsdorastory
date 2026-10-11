# 语音识别延迟丢字
症状：用户反馈显示正在听但没有文字。
已复现根因：release 在 1800ms 后将空结果当成无语音并 abort；模拟服务在2500ms返回结果时，请求数为0。修复为最多等待8000ms，并等待 onstart 才显示正在倾听；显示网络、权限、设备等具体错误。
验证：verify-speech-delay.cjs 修复前 requests=0、修复后 requests=1且展示原始文字；verify-assistant.cjs 通过。
限制：无法通过当前工具连接用户实际浏览器，真实麦克风及浏览器识别服务还需用户试说；不把模拟识别测试等同于真实声学验证。
状态：DONE_WITH_CONCERNS。
