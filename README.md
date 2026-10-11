# 哆啦的故事书

儿童公园探索与双语故事书原型。代码位于 `prototype/`，设计素材位于 `design/`，需求文档位于 `docs/`。

## 本地启动

需要 Python 3.10 或更新版本：

```sh
cd prototype
python server.py
```

打开 http://127.0.0.1:4173/ 。详细操作和云端配置见 [运行说明](prototype/README.md)。

## 密钥与敏感信息

- API 密钥只在服务端使用，通过 `python configure_cloud.py` 输入，或由运行环境注入 `DUOLA_API_KEY`。
- 配置文件位于项目目录外；Windows 使用当前用户的 DPAPI 加密，其他系统限制文件访问权限。
- 不要把真实密钥写进源代码、网页、文档或 Git 远程 URL；`.gitignore` 已排除本地环境文件、凭据文件和提交压缩包。
- `.gitignore` 不会检测硬编码密钥，每次提交仍需检查暂存差异。若凭据曾被提交，应立即轮换凭据并处理 Git 历史。
- 语音文字会按云端配置发送给模型服务，勿将真实儿童录音、转写或其他个人信息放入仓库。
