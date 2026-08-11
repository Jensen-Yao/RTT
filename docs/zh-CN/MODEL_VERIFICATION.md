# RTT 模型安装与验证记录

以下记录来自 `scripts/download-install-verify-models.ps1 -RunWindowsInference`。模型归档和运行数据都位于 `F:\RTT\models`，不会写入系统盘。

| 模型 | 安装结果 | Windows 实际推理 |
| --- | --- | --- |
| Vosk 英语小模型 | SHA-256、大小、目录布局通过 | 通过 |
| Vosk 日语小模型 | SHA-256、大小、目录布局通过 | 通过 |
| Vosk 中文小模型 | 官方包已下载；SHA-256、大小、目录布局通过 | 通过 |
| SenseVoiceSmall INT8 | SHA-256、大小、目录布局通过 | 通过 |
| Omnilingual CTC 300M INT8 | SHA-256、大小、目录布局通过 | 通过 |
| Bergamot 英语→中文 | SHA-256、大小、目录布局通过 | 通过 |
| Bergamot 日语→英语 | SHA-256、大小、目录布局通过 | 通过（与英→中组合） |
| Marian 英语→中文 INT8 | SHA-256、目录布局通过 | 尚未接入 Windows Marian 原生运行时 |

“通过”表示 RTT 已用真实运行时处理测试音频或文本，不只是检查文件是否存在。Marian 当前只允许作为已安装模型导入，直到 Windows 原生运行时接入前不会标记为可用翻译能力。

详细机器报告写入 `artifacts/model-install-verification.json`。重新执行脚本会复用已校验归档；断点下载失败时会保留 `.part` 文件，下一次可继续。
