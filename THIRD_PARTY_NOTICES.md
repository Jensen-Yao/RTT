# Third-party notices

RTT is licensed under Apache-2.0. The following third-party software and
downloadable models retain their own licenses. Version locks in the Gradle,
NuGet, and npm lock files are the authoritative dependency inventory.

## Application runtimes

| Component | Version | Use | License | Source |
| --- | --- | --- | --- | --- |
| Kotlin | 2.2.21 | Android language/runtime | Apache-2.0 | https://github.com/JetBrains/kotlin |
| AndroidX Core / Activity / Lifecycle | 1.17.0 / 1.12.3 / 2.9.4 | Android application framework | Apache-2.0 | https://github.com/androidx/androidx |
| Jetpack Compose and Material 3 | BOM 2026.06.01 | Android user interface | Apache-2.0 | https://github.com/androidx/androidx |
| kotlinx.coroutines | 1.11.0 | Android concurrency | Apache-2.0 | https://github.com/Kotlin/kotlinx.coroutines |
| Vosk Android | 0.3.75 | Streaming speech recognition | Apache-2.0 | https://github.com/alphacep/vosk-api |
| sherpa-onnx Android | 1.13.4 | SenseVoice inference and VAD | Apache-2.0 | https://github.com/k2-fsa/sherpa-onnx |
| ONNX Runtime Android | 1.27.0 | Marian local translation inference | MIT | https://github.com/microsoft/onnxruntime |
| Apache Commons Compress | 1.28.0 | Verified `tar.bz2` model extraction | Apache-2.0 | https://commons.apache.org/proper/commons-compress/ |
| ML Kit Translation | 17.0.3 | Android on-device translation | Google APIs Terms / ML Kit terms | https://developers.google.com/ml-kit/terms |
| ML Kit Text Recognition | 16.0.1 | Android on-device Latin, Chinese, Japanese, and Korean OCR | Google APIs Terms / ML Kit terms | https://developers.google.com/ml-kit/terms |
| .NET runtime | 10.0 | Windows application runtime | MIT | https://github.com/dotnet/runtime |
| Vosk .NET | 0.3.38 | Streaming speech recognition | Apache-2.0 | https://github.com/alphacep/vosk-api |
| BergamotTranslatorSharp | 0.5.1 | Windows local translation | MPL-2.0 | https://github.com/Freeesia/BergamotTranslatorSharp |
| NAudio | 2.2.1 | WASAPI audio capture and playback | MIT | https://github.com/naudio/NAudio |
| sherpa-onnx .NET and win-x64 runtime | 1.13.4 | SenseVoice inference and VAD | Apache-2.0 | https://github.com/k2-fsa/sherpa-onnx |
| System.Speech | 10.0.0 | Windows TTS fallback | MIT | https://github.com/dotnet/runtime |

## Website and build tools

| Component | Version | Use | License | Source |
| --- | --- | --- | --- | --- |
| Astro | 7.1.6 | Static product site | MIT | https://github.com/withastro/astro |
| Lucide Astro | 1.28.0 | Website icons | ISC | https://github.com/lucide-icons/lucide |
| TypeScript | 5.9.2 | Website type checking | Apache-2.0 | https://github.com/microsoft/TypeScript |
| Ajv / ajv-formats | 8.20.0 / 3.0.1 | JSON Schema validation | MIT | https://github.com/ajv-validator/ajv |
| emnapi core / runtime | 1.11.3 | Cross-platform Astro compiler WASM support | MIT | https://github.com/toyobayashi/emnapi |
| xUnit.net | 2.9.3 | Windows tests | Apache-2.0 | https://github.com/xunit/xunit |
| Inno Setup and Chinese Simplified messages | 6.7.3 / 6.5.0+ | Windows installer build | Inno Setup license | https://github.com/jrsoftware/issrc |

The complete transitive website dependency list, including package versions,
integrity hashes, and declared licenses, is recorded in `site/package-lock.json`.

## Downloadable models

| Model | Version | License | Source |
| --- | --- | --- | --- |
| Vosk small English (US) | 0.15 | Apache-2.0 | https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip |
| Vosk small Japanese | 0.22 | Apache-2.0 | https://alphacephei.com/vosk/models/vosk-model-small-ja-0.22.zip |
| Vosk small Chinese | 0.22 | Apache-2.0 | https://alphacephei.com/vosk/models/vosk-model-small-cn-0.22.zip |
| Vosk small Korean | 0.22 | Apache-2.0 | https://alphacephei.com/vosk/models/vosk-model-small-ko-0.22.zip |
| Vosk small Spanish | 0.42 | Apache-2.0 | https://alphacephei.com/vosk/models/vosk-model-small-es-0.42.zip |
| Vosk small French | 0.22 | Apache-2.0 | https://alphacephei.com/vosk/models/vosk-model-small-fr-0.22.zip |
| Vosk small German | 0.15 | Apache-2.0 | https://alphacephei.com/vosk/models/vosk-model-small-de-0.15.zip |
| Vosk small Russian | 0.22 | Apache-2.0 | https://alphacephei.com/vosk/models/vosk-model-small-ru-0.22.zip |
| sherpa-onnx SenseVoice int8 | 2025-09-09 | MIT | https://github.com/k2-fsa/sherpa-onnx/releases/tag/asr-models |
| Omnilingual CTC 300M INT8 | 2026-08 package | Apache-2.0 | https://huggingface.co/OpenVoiceOS/omnilingual-asr-ctc-300m-onnx |
| Qwen3-ASR 0.6B INT8 | 2026-03-25 | Apache-2.0 | https://huggingface.co/Qwen/Qwen3-ASR-0.6B |
| sherpa-onnx online punctuation English int8 | 2024-08-06 | Apache-2.0 | https://github.com/k2-fsa/sherpa-onnx/releases/tag/punctuation-models |
| OPUS-MT English to Chinese INT8 | 2026-08 package | Apache-2.0 | https://huggingface.co/Helsinki-NLP/opus-mt-en-zh |
| Mozilla Firefox Translations en-zh | registry release | MPL-2.0 | https://storage.googleapis.com/moz-fx-translations-data--303e-prod-translations-data/db/models.json |
| Mozilla Firefox Translations ja-en | registry desktop release | MPL-2.0 | https://storage.googleapis.com/moz-fx-translations-data--303e-prod-translations-data/db/models.json |

Android release APKs bundle the Vosk English, Vosk Japanese, SenseVoice, and
Omnilingual archives plus the English online-punctuation INT8 model for offline enablement.
Windows model packages remain separate. RTT
verifies the exact byte size and SHA-256 checksum declared in
`models/catalog.json` before extraction.

## Hosted services

OpenAI, DeepSeek, Alibaba Cloud DashScope/Model Studio, SiliconFlow, Agnes AI,
Moonshot, BigModel, Volcengine Ark, 302.AI, Anthropic, Groq, Gemini, OpenRouter,
Together AI, xAI, Mistral, NVIDIA NIM, Cerebras, SambaNova, and custom compatible providers are optional network
services. Their SDK code is not bundled. Use of those endpoints is governed by
the selected provider's terms and privacy policy.
