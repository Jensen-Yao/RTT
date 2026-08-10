# RTT 模型目录

这里保存 RTT 客户端使用的公开模型清单。模型权重不放进 Git 历史，已验证且允许分发的包会作为 [GitHub Release](https://github.com/Jensen-Yao/RTT/releases/tag/models-v0.2.6) 资产提供；其他模型只保留官方页面和官方下载入口。

- `catalog.json`：模型、语言、大小、许可证和校验信息
- `capability-catalog.json`：客户端能力档案与模型包映射
- `voice-catalog.json`：系统音色和可下载音色包目录

在客户端的“模型中心”中可按能力、语言和平台筛选，支持下载、校验、导入本地文件夹或绑定本地服务。所有 RTT 管理的模型缓存默认使用用户选择的模型盘，不写入系统盘。
