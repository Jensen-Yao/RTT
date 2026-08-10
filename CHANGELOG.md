# Changelog

All notable changes to RTT are documented here. This project follows Semantic Versioning.

## [0.2.6] - 2026-08-10

### Changed

- Move the complete RTT source history to the private `Jensen-Yao/RTT-test` repository and rebuild the public `RTT` repository as a distribution-only home for compiled products, user documentation, model catalogs, and release downloads.
- Remove RTT source-code entry points from the product website, Web workspace, Android app, and Windows product metadata while preserving direct links to public downloads and third-party model projects.
- Let the Web workspace use OpenAI-compatible batch speech APIs with microphone, browser-tab, application-window, or shared system audio, and show the active ASR profile beside the audio-source controls.
- Simplify Android account and API pages so account details, remote API connections, capability routes, and local models each have one clear home.

### Fixed

- Keep Android back gestures inside the current navigation hierarchy and move the app to the background from the realtime-caption root instead of terminating the session abruptly.
- Move RTT-managed model package downloads to the source-free `models-v0.2.6` public release.

## [0.2.5] - 2026-08-10

### Fixed

- Fix the Windows main-window startup crash caused by a default two-way binding to the read-only translation output property; installer and portable builds now open normally.
- Write Windows startup failures to a local diagnostic file and show its location instead of exiting silently.
- Route Android system-back and edge-back gestures through the current account, API, provider, or settings hierarchy before allowing the app to exit.
- Keep translated subtitle timestamps stable and prevent text-only routes from being presented as format-preserving document APIs.

### Changed

- Add Web microphone-device selection plus browser-tab, application-window, and entire-computer shared-audio sources.
- Feed authorized shared audio directly into local Web Vosk and sherpa-onnx sessions without closing a stream still used by screen OCR.
- Explain when Browser Web Speech cannot consume shared audio and provide a direct action to choose another speech-recognition capability.
- Give Android secondary screens an explicit back button, a preserved navigation stack, and no duplicate bottom bar.
- Redesign the Web, Android, and Windows translation desk around Text, Documents, Subtitles, and Jobs workflows.
- Add PDF text extraction on Web and Windows, on-device PDF OCR on Android, and native DeepL document upload/status/download support for format-preserving PDF and Office results.
- Add visible document job stages, progress, result preview, download/open actions, and a shared document-translation job schema.
- Show the actual provider, route, selected model, and native-document support before a document job starts on Web, Android, and Windows.
- Let Windows users select a specific active playback device instead of always capturing the default output endpoint.
- Move API connections under Capabilities and privacy under Account so the primary navigation stays focused on translation tasks.
- Redesign the bilingual product homepage around real Web translator and Android product screens, with realtime captions and professional translation presented as equal product lines.

## [0.2.4] - 2026-08-08

### Added

- Add encrypted API credential synchronization across Web, Android, and Windows while keeping local model folders and translation content device-local.
- Add a developer administrator entry in the Web sidebar, top bar, and account center, with direct access to user, credential, and audit management.

### Changed

- Redesign the bilingual product homepage around current Web and Android product screenshots and clearer workspace entry points.
- Refresh administrator metadata from Supabase so newly granted roles appear without recreating the account.

### Fixed

- Prevent the Chinese authentication heading from stranding a single character on a separate line.
- Preserve the natural dimensions of Web and Android authentication preview images across desktop and mobile layouts.
- Require live Supabase user validation before opening the administrator console and continue denying administrator operations to ordinary accounts.

## [0.2.3] - 2026-08-08

### Added

- Add password-reset email and new-password flows to the Web account gate, with direct recovery links from Android and Windows.
- Add prominent sign-in, registration, and Web workspace entry points to the bilingual product homepage and navigation.

### Changed

- Synchronize display-name edits to Supabase user metadata on Web, Android, and Windows instead of changing only device-local settings.
- Let the product-site navigation recognize an existing Supabase session and link the signed-in user directly to the account center.
- Expand Supabase redirect allowlists for recovery query parameters on both custom domains, GitHub Pages, and local preview addresses.

### Fixed

- Remove the remaining offline-account and PBKDF2 copy from the Web translation workspace.
- Keep password recovery inside the mandatory online-account model without reintroducing a device-local account path.

## [0.2.2] - 2026-08-08

### Added

- Add mandatory Supabase email/password and GitHub OAuth account gates to Web, Android, and Windows, with encrypted refresh-token storage on native clients.
- Add verified email delivery through the configured 163 SMTP sender and cross-client session restoration.

### Changed

- Make `/` the bilingual product homepage and `/app/` the authenticated Web workspace on both custom domains.
- Remove offline-account sign-in paths. Local API keys, model directories, audio, captions, and translated text remain device-local and are not uploaded with the account session.
- Route Android and Windows email confirmations back to the RTT Web workspace and replace the Windows OAuth callback listener with a loopback TCP listener that does not require a URL ACL.

### Fixed

- Build the GitHub Pages mirror at the `rtt.jenseny.cn` custom-domain root while keeping the Aliyun `rtt.jenseny.top` build at `/`.
- Keep the Windows account email read-only so the local UI cannot drift from the authenticated Supabase identity.

## [0.2.1] - 2026-08-07

### Added

- Add a usable Web/PWA translation workspace at the custom-domain root with live browser speech recognition, user-authorized screen OCR region selection, movable and scalable captions, text translation, and a file translation queue with result viewing and downloads.
- Add five independent Web capability-profile areas for ASR, translation, punctuation, OCR, and TTS, including named profiles, active-route summaries, API key visibility/copy controls, and browser-local persistence warnings.
- Add a shared 23-entry capability package catalog consumed by the Web model directory and validated against the shared schemas.

### Changed

- Move the product presentation pages to `/product/` and `/en/product/`; `/`, `/en/`, `/app/`, and `/en/app/` now open the actual Web workspace.
- Improve desktop and mobile navigation, capability tabs, profile selection, language swapping, sidebar behavior, runtime language switching, and accessible control labels.
- Let Android start validated imported Vosk ASR and Marian ONNX translation resources instead of limiting runtime lookup to built-in model directories.

### Fixed

- Keep screen-region controls hidden until a screen share actually enters selection mode.
- Normalize custom-domain and GitHub Pages base paths so product, model, service-worker, and localized links do not resolve to invalid hosts.
- Validate imported capability layouts and health before allowing an Android local profile to start.

## [0.2.0] - 2026-08-07

### Added

- Add the V2 capability-profile, capability-package, voice-descriptor, and voice-catalog schemas shared by Android, Windows, and the website.
- Add a bilingual `/models` directory generated from the shared model and voice manifests, including official sources, checksums where RTT manages a package, runtime requirements, licenses, and verification state.
- Add an Android capability-resource importer for folders, ONNX/GGUF files, ZIP archives, and `.rttpack` archives. Imports are copied with a 1 GB limit and archive-path validation; Android never executes code from imported resources.
- Add Windows target-language selection, installed system-voice selection, and bounded delivery-style presets for the active Windows system-speech profile.

### Changed

- Make every built-in Windows capability profile carry V2 source, runtime, package, model, target-language, and health metadata.
- Make OpenAI-compatible Windows translation use the selected target language instead of always requesting Simplified Chinese.
- Treat imported resources without a matching runtime as `NEEDS_RUNTIME` rather than presenting them as executable models.

### Known limitations

- Windows local-service, Piper, MeloTTS, CosyVoice, and remote TTS profiles are catalogued but are not yet runnable in the Windows client; selecting one reports that its runtime is required.
- Android currently runs validated Marian ONNX translation imports through its translation runtime. Other recognized capability imports remain explicit profile references until their runtime adapter is implemented.
- Windows artifacts are checksum-verified but not Authenticode-signed. Production custom-domain deployment still requires valid Aliyun, DNS, and TLS credentials.

## [0.1.6] - 2026-08-07

### Added

- Add verified Chinese, Korean, Spanish, French, German, and Russian Vosk downloads alongside the existing English and Japanese packages, with model-driven source-language selection.
- Add optional Qwen3-ASR 0.6B INT8 support for Android and Windows-class devices under the 1 GB Android package limit.
- Add a verified OPUS-MT English-to-Chinese INT8 Android translator with catalog-driven download, checksum validation, installation, and selection.
- Add language filtering to the Android model library and keep all installed compatible local ASR models selectable from the live-caption screen.

### Changed

- Split cloud routes, provider configuration, capability profiles, and settings/privacy into focused screens reached from the top-right menu.
- Rewrite the repository README as a user-facing product guide with the website, setup flow, supported models, technical pipeline, privacy behavior, and platform limits.
- Raise the Android per-model download limit from 500 MB to 1 GB and document verified versus candidate Hugging Face models on the bilingual site.
- Unify sherpa-onnx and Marian inference on ONNX Runtime 1.27.0 to avoid duplicate or incompatible Android native libraries.

### Fixed

- Validate local ASR source languages from the selected model manifest instead of assuming Vosk only supports English and Japanese.
- Show the selected local translation model in the active route summary and prevent an incompatible language/model pair from starting.

## [0.1.5] - 2026-08-07

### Added

- Add Hugging Face-verified Omnilingual CTC 300M INT8 as an optional 1600+ language offline recognizer on Android and Windows.
- Bundle four Android recognition packages, keep each ASR model below 500 MB, and expose upstream model links and limitations on the bilingual homepage.
- Add verified package promotion during release builds so Windows can ship the selected local model and clean CI can acquire the same archives.

### Changed

- Keep SenseVoiceSmall as the recommended English/Japanese movie-dialogue default; Omnilingual uses VAD, script heuristics, and rule segmentation because it has no punctuation or language conditioning.
- Clarify unpacked model size versus compressed archive size and document the actual CPU ONNX smoke test without overstating device accuracy or latency.

## [0.1.4] - 2026-08-06

### Added

- Bind every Android provider's base URL, protocol, selected translation/ASR models, discovered model cache, and encrypted credential to one explicit slot.
- Fetch and select model names from compatible upstream `/models` endpoints while retaining manual model entry and explicit ASR capability controls.
- Add SiliconFlow, Agnes AI, Moonshot, BigModel, Volcengine Ark, 302.AI, Together AI, xAI, Mistral, NVIDIA NIM, Cerebras, and SambaNova profiles.
- Add Android speech, screen-subtitle OCR, and combined input modes with configurable bottom crop, scan rate, and stability frames.
- Add an in-memory full-session page that preserves source text and late translations without replacing a newer overlay caption.

### Changed

- Remove the shared Alibaba workspace example URL; each API key now requires its own dedicated inference domain in the matching slot.
- Run Latin, Chinese, Japanese, and Korean screen OCR on-device and discard every captured frame after recognition.
- Reduce cloud translation prompt and output budgets and use tighter connection/read timeouts for subtitle-sized requests.

## [0.1.3] - 2026-08-06

### Added

- Show the exact ASR and translation provider, model, protocol, endpoint host, credential slot, saved state, and non-secret key fingerprint before a session starts.
- Add explicit credential deletion and provider/model-specific connection-test results; split Alibaba workspace OpenAI and Anthropic credentials into independent slots while migrating the legacy shared slot.
- Bundle the verified sherpa-onnx English online punctuation INT8 model and vocabulary so semantic punctuation does not depend on phone downloads.
- Add a two-sentence source-context buffer for cloud translation while requiring providers to translate only the current caption.

### Changed

- Combine VAD endpoints with semantic punctuation, an approximately 0.8-second dynamic silence threshold, stable-prefix locking, a dynamic subtitle tail, and comma-first splitting for speech longer than eight seconds.
- Use an explicit VAD/recognizer-punctuation fallback for Japanese, Korean, and other languages without a validated punctuation model instead of claiming semantic punctuation support.
- Raise SenseVoice's minimum silence to 0.8 seconds and maximum segment duration to 12 seconds; replace cloud fixed-frame RMS segmentation with an adaptive sample-duration gate.
- Send cloud translation only after a sentence boundary, reduce local partial-translation debounce, and prevent a late translation from replacing a newer visible caption.

### Fixed

- Honor a manually selected SenseVoice source language instead of overwriting it with an empty or inconsistent detector label.
- Normalize SenseVoice language tags before local translation and avoid carrying the previous sentence's translation into a new source segment.

## [0.1.2] - 2026-08-06

### Added

- Bundle the verified Vosk English, Vosk Japanese, and SenseVoice packages in the Android APK so all local recognition modes can be enabled without a network connection.
- Automatically prepare the default English Vosk model on first launch and prepare any other bundled model when a session starts.
- Add provider presets for Alibaba Cloud Model Studio workspace OpenAI Compatible and Anthropic endpoints, Anthropic, Groq, Gemini, and OpenRouter.
- Support Anthropic Messages-compatible text translation separately from OpenAI-compatible chat and transcription APIs.
- Expose Korean recognition through the bundled SenseVoice model and fixed Korean/Spanish/French/German language choices for compatible cloud recognition.
- Add persistent Android overlay controls for caption text scale, window width, background opacity, and source-caption visibility.
- Add an Android model-library section for predownloading or removing ML Kit translation packs before going offline.
- Add common cloud and ML Kit translation choices for Italian, Portuguese, Russian, Arabic, Hindi, Thai, Vietnamese, and Indonesian.

### Changed

- Install Android bundled models through a checksum-verified staging directory with rollback, cancellation cleanup, and no partially installed destination.
- Move model build downloads to `F:\RTT\models\source-cache\android-bundled` and mirror the repackaged Vosk archives in the RTT model Release for reliable CI and fallback downloads.
- Reject non-portable ZIP entry separators and repack all bundled models with Android-compatible paths.
- Replace the crowded provider segmented control with a compact menu and expose explicit text-only or text-and-speech capability controls for workspace/custom endpoints.
- Check the selected local ML Kit package before starting a session and explain exactly where to download it when it is missing.
- Keep the Android caption overlay within the visible display while dragging and add a one-tap caption-style reset.
- Expose persistent Windows caption font-size, opacity, and source-caption controls in the Captions tab.

## [0.1.1] - 2026-08-06

### Fixed

- Preserve the actual Android startup error instead of immediately replacing it with `已停止`.
- Keep the reflected SenseVoice runtime factory in R8 release builds; the 0.1.0 release removed it and could only start Vosk.
- Start SenseVoice with automatic language detection and create the matching ML Kit translator only after a language is detected.
- Save Android settings immediately so starting a session cannot race a recent mode change.
- Detect incomplete model installations and fail before requesting capture permissions.

### Added

- Android microphone capture for in-person speech and speakerphone voice chats.
- Android input-rate fallback and streaming conversion from 48/44.1 kHz to the 16 kHz ASR format.
- Independent cloud ASR and text-translation providers, including local ASR plus DeepSeek translation.
- Explicit text-only or text-and-speech capability selection for custom compatible providers.
- Actionable no-audio, permission, capture interruption, and provider capability states.

## [0.1.0] - 2026-08-06

### Added

- Android 10+ foreground capture service using MediaProjection and AudioPlaybackCapture.
- Draggable bilingual Android overlay, notification controls, Vosk, SenseVoice, ML Kit, cloud providers, and Chinese TTS modes.
- Windows x64 WASAPI loopback capture, bilingual always-on-top overlay, tray controls, Vosk, SenseVoice, Bergamot pivot translation, cloud providers, and Chinese TTS modes.
- Resumable model managers with exact size and SHA-256 validation.
- Shared caption, model, and provider JSON schemas.
- Apple-inspired Android, Windows, and bilingual Astro interfaces using the supplied RTT artwork.
- GitHub Actions for CI, Pages, signed Android releases, Windows installer and portable releases.
- Apache-2.0 licensing, third-party notices, bilingual user guides, and release checksums.

### Known limitations

- DRM-protected content and Android apps that disable AudioPlaybackCapture cannot be captured.
- Windows process-specific loopback is experimental; default-device loopback is the reliable first-release mode.
- Android background execution remains subject to vendor battery-management policies.
- Voice output is delayed translated speech, not a lip-synchronized replacement audio track.
