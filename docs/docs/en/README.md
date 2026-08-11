# RTT User Guide

RTT provides live source captions and Simplified Chinese translations on Android 10+ and Windows 10 version 2004+ x64. Android can use speech, on-device screen-subtitle OCR, or both at once. SenseVoice supports English, Japanese, and Korean, while cloud coverage depends on the selected model. Windows local mode currently focuses on English and Japanese. RTT is not a video player and does not provide subtitle-file editing or lip synchronization.

See [online account deployment](ONLINE_AUTH.md) for email verification, GitHub login, redirect URLs, and Supabase RLS. All clients require a valid Supabase session and do not provide device-local accounts.

## Installation

### Android

1. Download `RTT-<version>-android-universal.apk` and `SHA256SUMS.txt` from the same GitHub Release.
2. Verify the APK checksum, then allow your file manager to install unknown apps.
3. Grant notification, overlay, and microphone permissions. Internal playback mode also requests system capture consent.
4. The APK includes English Vosk, Japanese Vosk, the sherpa-onnx INT8 SenseVoice runtime package, Omnilingual CTC 300M INT8, and the English semantic-punctuation INT8 model. The SenseVoice package is a runnable conversion of upstream Hugging Face weights, not the original Transformers checkpoint. First launch prepares English recognition and punctuation offline; the other ASR packages can be enabled from Models without a network. ML Kit translation packs cannot be embedded, but the same screen can predownload them and confirm offline readiness.

Bundled models make the Android release APK about 767 MB because Omnilingual is included for immediate offline use. Optional Android model downloads are limited to 1 GB each; extracting multiple models and punctuation needs additional private storage, so keep at least 2 GB free when installing Qwen3-ASR or several language packs.

Android models live in RTT's private storage on the phone. They do not use the Windows C drive and are removed when the app is uninstalled.

### Windows

Download and verify either the installer or portable archive. An unsigned test build may trigger SmartScreen; verify its release source and SHA-256 before running `RTT.Windows.exe`.

This development checkout stores all models under `F:\RTT\models\downloads`. To force that location, set:

```powershell
$env:RTT_MODELS_ROOT = 'F:\RTT\models\downloads'
```

The model manager supports resumable downloads, exact byte-size and SHA-256 validation, replacement updates, and removal.

## Permissions and capture

Android offers `Speech`, `Screen subtitles`, and `Both` input modes. Internal playback uses `MediaProjection + AudioPlaybackCapture`; microphone mode uses the voice-recognition input. Screen mode downsamples projected frames, crops a configurable bottom region, and runs bundled ML Kit OCR on-device. Frames are never persisted or uploaded and are released after recognition.

Screen OCR targets videos that already display English, Japanese, or Korean source subtitles. Region height, scan interval, and one-to-three-frame stability can be configured. Stable duplicates are suppressed. Player controls, comments, and watermarks can interfere, while DRM or `FLAG_SECURE` content can produce a black frame and cannot be bypassed.

DRM media and apps that disable playback capture cannot be bypassed. RTT stops the session and reports that capture is unavailable.

Android protects call audio marked as `USAGE_VOICE_COMMUNICATION`. For voice chats, microphone mode can hear a remote participant played through the speakerphone, but not audio routed to headphones. RTT 0.1 translates the selected foreign language to Simplified Chinese only; it does not inject translated audio into the call uplink or provide bidirectional interpreting.

Windows uses WASAPI loopback on the default output device. After changing the default device, unplugging headphones, resuming from sleep, or closing the source process, restart the session if the meter stops moving. Process-specific capture remains experimental in the first release; default-device loopback is the reliable path.

## Recognition modes

- `Fast Vosk`: download and select small Chinese, English, Japanese, Korean, Spanish, French, German, or Russian models from the Models screen; streams partial source text with the lowest overhead.
- `Accurate SenseVoice`: recognizes VAD-sized segments and supports English, Japanese, Korean, or automatic language detection.
- `Omnilingual CTC 300M INT8`: optional offline extension for 1600+ languages. Its unpacked ONNX model is about 328 MB (the verified archive is about 238 MB) and remains below the Android per-model limit. It has no punctuation or language conditioning, so RTT uses Silero VAD, script heuristics, and rule-based segmentation. SenseVoice remains the recommended default for English/Japanese movie dialogue.
- `Cloud high accuracy`: uploads audio segments to a separately selected ASR provider. Fixed choices include English, Japanese, Korean, Spanish, French, and German; actual coverage depends on the provider model. DeepSeek remains available for text translation and can be combined with local Vosk/SenseVoice or another cloud ASR provider.

Every Android release verifies the bundled archives against fixed byte sizes, SHA-256 hashes, and required files. The SenseVoice archive is sourced from the sherpa-onnx ASR model release. Omnilingual is packaged from the Apache-2.0 Hugging Face repository `OpenVoiceOS/omnilingual-asr-ctc-300m-onnx`; its public `test_wavs/en.wav` clip was decoded with the INT8 graph during integration. The phone verifies archives again and extracts through a staging directory, so interruption cannot replace a working installation.

English boundaries combine VAD, semantic punctuation, and an approximately 0.8-second dynamic silence threshold. Languages without a validated punctuation model explicitly fall back to VAD/recognizer punctuation. Every mode locks a stable prefix, refreshes only the tail, and prefers a comma split after eight seconds. A short fallback timeout prevents an incomplete semantic boundary from waiting forever.

Every partial result carries a revision. A newer revision cancels the older translation, and an out-of-order response cannot overwrite current captions. Cloud translation receives the prior two source sentences for disambiguation while being instructed to translate only the current sentence.

## Translation and providers

Android local translation can use 14 ML Kit language packs or the verified OPUS-MT English-to-Chinese INT8 model. Windows uses Bergamot `en-zh`; Japanese is translated through the `ja-en -> en-zh` pivot chain. Once local models are installed, local mode does not silently contact cloud services.

ASR and translation providers are selected independently, so combinations such as `SenseVoice + DeepSeek` and `DashScope ASR + DeepSeek` are supported. Custom compatible endpoints declare whether they are text-only or text-and-speech. RTT validates models, provider capabilities, and the corresponding credentials before requesting capture permissions.

Built-in profiles cover OpenAI, translation-only DeepSeek, DashScope, Alibaba dedicated-domain OpenAI Compatible and Anthropic slots, SiliconFlow, Agnes AI, Moonshot, BigModel, Volcengine Ark, 302.AI, Anthropic, Groq, Gemini, OpenRouter, Together AI, xAI, Mistral, NVIDIA NIM, Cerebras, SambaNova, and custom endpoints. Alibaba no longer carries a shared example URL: the key-specific inference domain must be entered in the same slot as its key and models.

Each provider slot binds its base URL, protocol, translation model, optional ASR model, and encrypted key. `Fetch upstream models` calls that slot's model-list endpoint and provides a searchable selection while preserving manual entry. Because model-list responses do not reliably describe audio modality, configurable endpoints still require an explicit text-only or text-and-speech choice.

Android shows the ASR and translation provider, model, protocol, endpoint host, credential slot, saved state, and a non-reversible six-character key fingerprint on both the provider screen and active route summary. Save, delete, and test operations name the exact slot they affect. Keys retain an Android Keystore or Windows Credential Locker copy and synchronize to the signed-in Supabase account as AES-256-GCM ciphertext; they are never written to settings, logs, or screenshots. Android persists secret-free pending operations while offline and retries them after the session and network recover.

## Caption display

Before starting an Android session, the overlay can be configured for text scale (80%–150%), width (60%–100%), background opacity (60%–100%), and source-caption visibility. With screen OCR enabled, the overlay starts at the top and cannot be dragged into the OCR crop, preventing it from covering source subtitles or recognizing its own text. Windows exposes font size, opacity, and source-caption visibility on the Captions tab; its overlay can also be dragged or resized directly. These settings persist for future sessions. Narrow overlays wrap text instead of shrinking long words into unreadable type.

Android's Full session tab keeps up to 300 in-memory segments with source text, translation, origin, and processing state. A cloud translation that returns after the next caption updates its original row instead of replacing the current overlay. The list remains visible after stopping and is erased on a new session or explicit Clear; it is not written to a file.

## Chinese voice output

Voice output can be off, mixed over the source, or played while requesting source-audio ducking. If ducking is unavailable, RTT reports the fallback and mixes the voice instead. RTT uses a local `zh-CN` system voice when available. This is delayed translated speech, not a lip-synchronized movie track. Stale speech is discarded beyond two queued lines or six seconds.

## Android background operation

`CaptionService` is a foreground service started through `startForegroundService`. Internal playback sessions declare `mediaProjection`; microphone sessions declare `microphone`. It owns capture, recognition, translation, TTS, and the overlay, so closing the Activity does not stop an active session. Android requires its persistent low-priority notification; the notification's Stop action sends `ACTION_STOP`.

The service stops when MediaProjection is revoked. Vendor power management can still terminate it. Excluding RTT from battery optimization may help, but cannot guarantee permanent residency. After a phone reboot, the user must open RTT and grant MediaProjection again; Android does not permit silent renewal.

## Privacy and limitations

RTT collects no telemetry. Diagnostics are off by default and must not contain audio, caption text, or API keys. Local mode uploads nothing. Cloud mode identifies the selected provider before content is sent.

DRM playback, apps that prohibit capture, vendor overlay restrictions, and unavailable audio-ducking APIs are platform boundaries rather than conditions RTT can bypass.

## Troubleshooting

`No audio level`: confirm the source is audible on the current output device. On Android, verify that the source app permits playback capture.

`Unable to start`: RTT now keeps the actionable startup reason instead of replacing it with a generic stopped state. Follow the prompt to correct the model, provider capability, credential, or permission.

`Model validation failed`: on Android, remove and re-enable the bundled model; interrupted staging directories are never treated as installed. Windows downloads remain resumable through `.part` files. Use only packages listed in `models/catalog.json`.

`Local translation unavailable`: on Android, download the matching entry under Models → Local translation models and confirm its offline-ready state. RTT checks this before starting so a missing pack is reported before capture begins. Windows Japanese requires both `bergamot-ja-en` and `bergamot-en-zh`.

`Overlay missing`: grant the display-over-other-apps permission. Some protected full-screen players intentionally cover third-party overlays.

## Verifying releases

```powershell
(Get-FileHash .\RTT-0.2.0-windows-x64-portable.zip -Algorithm SHA256).Hash.ToLowerInvariant()
(Get-FileHash .\RTT-0.2.0-android-universal.apk -Algorithm SHA256).Hash.ToLowerInvariant()
```

The values must match `SHA256SUMS.txt` from the same release. Model packages must also match their byte size, SHA-256, and license in `models/catalog.json`.
