# RTT 推荐模型

模型来源和运行包分开列出，页面中的 Hugging Face 链接指向上游项目；RTT 发布包会在 `models/catalog.json` 中固定版本、大小、SHA-256 和许可证。

| 模型 | RTT 用途 | 平台 | 说明 |
| --- | --- | --- | --- |
| [SenseVoiceSmall](https://huggingface.co/FunAudioLLM/SenseVoiceSmall) | 默认多语 ASR | Android / Windows | 适合已知英语、日语、韩语或自动检测；RTT 使用 sherpa-onnx 转换运行包。 |
| [Omnilingual CTC 300M INT8](https://huggingface.co/OpenVoiceOS/omnilingual-asr-ctc-300m-onnx) | 多语扩展 ASR | Android / Windows | 1600+ 语言，解压模型约 328 MB、验证过的压缩包约 238 MB；没有标点和语言约束，使用 VAD、脚本启发式和规则分句。 |
| [Qwen3-ASR-0.6B](https://huggingface.co/Qwen/Qwen3-ASR-0.6B) | 高准确率 ASR | Android / Windows | RTT 使用官方 sherpa-onnx INT8 包，约 879 MB，不内置 APK，可按需下载。 |
| [Vosk models](https://alphacephei.com/vosk/models) | 极速多语言 ASR | Android / Windows | RTT 已校验中文、英语、日语、韩语、西班牙语、法语、德语和俄语小模型，需手动选择源语言。 |
| [sherpa-onnx ASR models](https://github.com/k2-fsa/sherpa-onnx/releases/tag/asr-models) | 运行时和模型发布页 | Android / Windows | RTT 的 SenseVoice 和标点运行时依赖该项目。 |
| [OPUS-MT 英语到中文](https://huggingface.co/Helsinki-NLP/opus-mt-en-zh) | Android 本地翻译 | Android | RTT 使用经过量化和实测的 Marian ONNX INT8 包；其他语言继续使用 ML Kit，待对应 ONNX 包验证后加入。 |

| [Google Gemma 4](https://deepmind.google/models/gemma/gemma-4/) | 多语言模型候选 | Android / Windows | 官方参考链接。RTT 不将它标记为可直接运行包，因为当前 Android 版尚无 Gemma 推理适配器。 |
| [Tencent HY-MT](https://github.com/Tencent-Hunyuan/HY-MT) | 专用机器翻译候选 | Android / Windows | 通过官方页面和 Hugging Face 查找量化版。需要匹配的 llama.cpp 或 ONNX 运行时后才能在 RTT 中执行。 |
| [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate) | 翻译 API / 自建服务 | Android / Windows | 使用 RTT 的“翻译 API”页配置服务端，它不是设备端模型包。 |

## 导入自定义翻译模型

Android “模型”页可选择已下载的模型文件夹，并保存名称、源语言、说明和官方来源。文件会被复制到 RTT 的应用私有目录，导入上限为 1 GB。

只有包含 `encoder_model_quantized.onnx`、`decoder_model_quantized.onnx`、`tokenizer.json` 和 `vocab.json` 的 Marian ONNX 布局会被标记为“可直接使用”。其他文件夹会作为参考保留，不会误报为已可运行。

## 翻译 API

“翻译 API”页与“供应商配置”分开：前者专门处理 DeepL、百度翻译和 LibreTranslate，后者处理 OpenAI-compatible、Anthropic 和语音识别服务。百度翻译密钥按 `APPID|SECRET` 保存；DeepL 支持 Free 和 Pro 基础地址；LibreTranslate 可以在服务端允许时不使用密钥。

## 已做验证

Omnilingual INT8 包已下载到 `F:\RTT\models`，压缩包大小为 237,683,440 字节，SHA-256 为 `BD2577C3684B4C76824C61CE955EF0BB7B6F7A0695F2C5F88BEBA1B5CAB31DDD`。使用上游公开的 `test_wavs/en.wav`（重采样到 16 kHz）在 Windows CPU 上加载 RTT 包内 ONNX 图，贪心 CTC 输出为：

`ask not what your country can do for you ask what you can do for your country`

这只是烟雾测试，不代表电影场景的 WER、p50 延迟或所有语言准确率。短音频可能返回错误脚本；已知英语/日语电影对白优先使用 SenseVoice，Omnilingual 用于需要更广语言覆盖的场景。

Qwen3-ASR 0.6B INT8 使用 sherpa-onnx 1.13.4 在 Windows CPU 上完成日语 5.08 秒音频烟雾测试，解码耗时约 1.779 秒，输出为：

`抜群の運動神経を持ち合わせ、どんな要求にも応えてきた。`

OPUS-MT 英语到中文 INT8 使用 ONNX Runtime 完成真实推理测试，输入 `Good evening.`，输出 `晚上好。`。应用目录中的压缩包为 182,168,297 字节，SHA-256 为 `DC8A4324213C8D8438B73A2A2EB09B5884BB3F08E3B3BE0259D4C4491EDF662D`。

## TTS 语音包与音色

RTT 会优先枚举 Android、Windows 和浏览器已经安装的系统语音。软件中的“普通男声”“成熟御姐”“播音旁白”等是语速、音高和发声方式的预设，不会被表述为独立人物音色。

| 资源 | 适用方式 | 当前状态 |
| --- | --- | --- |
| [Piper Voices](https://huggingface.co/rhasspy/piper-voices) | 通过 sherpa-onnx TTS 运行时导入 ONNX 语音包 | 官方链接，待 RTT 运行时适配验证 |
| [MeloTTS Chinese](https://huggingface.co/myshell-ai/MeloTTS-Chinese) | Windows 本地服务 | 候选；需本地服务与授权核验 |
| [CosyVoice3](https://huggingface.co/FunAudioLLM/Fun-CosyVoice3-0.5B-2512) | Windows 本地服务 | 候选；需本地服务、硬件评估与音色授权核验 |

真人、公众人物或受保护角色的仿声音色不会进入 RTT 公共目录。用户自行导入时，应确认拥有本人授权、权利人授权或明确的公共领域许可。

## 通用资源导入

“模型”页可导入模型文件夹、`.onnx`、`.gguf`、`.zip` 或 `.rttpack`。Android 会把文件复制到应用私有目录，单次导入上限为 1 GB，并拒绝解压路径穿越。导入只验证文件布局，不会执行导入包中的代码。

- 已识别但没有匹配运行时的资源会标为“需要运行时”。
- 未识别资源会保留来源、许可证说明和用户备注，但标为“不可用”，不会假装可以推理。
- 可运行的 Android 翻译导入目前限于通过 Marian ONNX 布局验证的翻译模型；其他资源可先建立能力档案，待对应适配器完成后再启用。

完整的跨平台资源清单见 [RTT 模型目录](https://jensen-yao.github.io/RTT/models/)。
