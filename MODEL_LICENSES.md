# RTT model and voice licenses

Generated for RTT v0.3.0. RTT itself is licensed under Apache-2.0. Model, voice, runtime, and service assets retain their upstream licenses.

| ID | Capability | Engine/provider | License | Redistribution | Official source | RTT status |
| --- | --- | --- | --- | --- | --- | --- |
| bergamot-en-zh | translation | bergamot | MPL-2.0 | Official link or user import only | [Official page](https://github.com/mozilla/bergamot-translator) | VERIFIED |
| bergamot-ja-en | translation | bergamot | MPL-2.0 | Official link or user import only | [Official page](https://github.com/mozilla/bergamot-translator) | VERIFIED |
| cosyvoice3-0.5b | TTS | cosyvoice-local-service | Apache-2.0; verify model card and voice rights | Official link or user import only | [Official page](https://github.com/FunAudioLLM/CosyVoice) | CANDIDATE |
| marian-en-zh-int8 | translation | marian-onnx | Apache-2.0 | Official link or user import only | [Official page](https://huggingface.co/Helsinki-NLP/opus-mt-en-zh) | CANDIDATE |
| melotts-chinese | TTS | melotts-local-service | MIT | Official link or user import only | [Official page](https://github.com/myshell-ai/MeloTTS) | CANDIDATE |
| mlkit-ocr | OCR | mlkit-text-recognition | Google ML Kit terms | Official link or user import only | [Official page](https://developers.google.com/ml-kit/vision/text-recognition/v2) | CANDIDATE |
| mlkit-translation | TRANSLATION | mlkit-translation | Google ML Kit terms | Official link or user import only | [Official page](https://developers.google.com/ml-kit/language/translation) | CANDIDATE |
| omnilingual-300m-int8 | asr | sherpa-onnx-omnilingual-ctc | Apache-2.0 | Official link or user import only | [Official page](https://huggingface.co/OpenVoiceOS/omnilingual-asr-ctc-300m-onnx) | CANDIDATE |
| piper-zh-huayan | TTS | sherpa-onnx-tts | Verify upstream model card before redistribution | Official link or user import only | [Official page](https://huggingface.co/rhasspy/piper-voices) | LINK_ONLY |
| punctuation-en | punctuation | sherpa-onnx-online-punctuation | Apache-2.0 | Official link or user import only | [Official page](https://github.com/k2-fsa/sherpa-onnx/releases/tag/punctuation-models) | CANDIDATE |
| qwen3-asr-0.6b-int8 | asr | sherpa-onnx-qwen3-asr | Apache-2.0 | Official link or user import only | [Official page](https://github.com/k2-fsa/sherpa-onnx/releases/tag/asr-models) | CANDIDATE |
| rules-segmentation | PUNCTUATION | rtt-rules | Apache-2.0 | Allowed by manifest | [Official page](https://rtt.jenseny.top/models/) | VERIFIED |
| sensevoice | asr | sensevoice | MIT | Official link or user import only | [Official page](https://github.com/k2-fsa/sherpa-onnx/releases/tag/asr-models) | CANDIDATE |
| system-voices | TTS | system-tts | Platform dependent | Official link or user import only | [Official page](https://developer.android.com/reference/android/speech/tts/Voice) | VERIFIED |
| tesseract-web-ocr | OCR | tesseract.js | Apache-2.0 | Official link or user import only | [Official page](https://github.com/naptha/tesseract.js) | LINK_ONLY |
| vosk-de-small | asr | vosk | Apache-2.0 | Official link or user import only | [Official page](https://alphacephei.com/vosk/models) | CANDIDATE |
| vosk-en | asr | vosk | Apache-2.0 | Official link or user import only | [Official page](https://alphacephei.com/vosk/models) | CANDIDATE |
| vosk-es-small | asr | vosk | Apache-2.0 | Official link or user import only | [Official page](https://alphacephei.com/vosk/models) | CANDIDATE |
| vosk-fr-small | asr | vosk | Apache-2.0 | Official link or user import only | [Official page](https://alphacephei.com/vosk/models) | CANDIDATE |
| vosk-ja | asr | vosk | Apache-2.0 | Official link or user import only | [Official page](https://alphacephei.com/vosk/models) | CANDIDATE |
| vosk-ko-small | asr | vosk | Apache-2.0 | Official link or user import only | [Official page](https://alphacephei.com/vosk/models) | CANDIDATE |
| vosk-ru-small | asr | vosk | Apache-2.0 | Official link or user import only | [Official page](https://alphacephei.com/vosk/models) | CANDIDATE |
| vosk-zh-small | asr | vosk | Apache-2.0 | Official link or user import only | [Official page](https://alphacephei.com/vosk/models) | CANDIDATE |

## Distribution policy

- RTT mirrors or bundles an asset only when the manifest records a reviewed license and redistribution permission.
- Entries without redistribution permission remain official links or user-import instructions.
- A `VERIFIED` label is platform-specific and requires real inference on that platform.
- Voice-cloning or real-person voices require the user to confirm a lawful authorization source.
