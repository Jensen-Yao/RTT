//#region src/asr.js
function freeConfig$1(config, Module) {
	if ("buffer" in config) Module._free(config.buffer);
	if ("config" in config) freeConfig$1(config.config, Module);
	if ("transducer" in config) freeConfig$1(config.transducer, Module);
	if ("paraformer" in config) freeConfig$1(config.paraformer, Module);
	if ("zipformer2Ctc" in config) freeConfig$1(config.zipformer2Ctc, Module);
	if ("feat" in config) freeConfig$1(config.feat, Module);
	if ("model" in config) freeConfig$1(config.model, Module);
	if ("nemoCtc" in config) freeConfig$1(config.nemoCtc, Module);
	if ("toneCtc" in config) freeConfig$1(config.toneCtc, Module);
	if ("whisper" in config) freeConfig$1(config.whisper, Module);
	if ("fireRedAsr" in config) freeConfig$1(config.fireRedAsr, Module);
	if ("dolphin" in config) freeConfig$1(config.dolphin, Module);
	if ("zipformerCtc" in config) freeConfig$1(config.zipformerCtc, Module);
	if ("wenetCtc" in config) freeConfig$1(config.wenetCtc, Module);
	if ("omnilingual" in config) freeConfig$1(config.omnilingual, Module);
	if ("medasr" in config) freeConfig$1(config.medasr, Module);
	if ("fireRedAsrCtc" in config) freeConfig$1(config.fireRedAsrCtc, Module);
	if ("funasrNano" in config) freeConfig$1(config.funasrNano, Module);
	if ("moonshine" in config) freeConfig$1(config.moonshine, Module);
	if ("tdnn" in config) freeConfig$1(config.tdnn, Module);
	if ("senseVoice" in config) freeConfig$1(config.senseVoice, Module);
	if ("canary" in config) freeConfig$1(config.canary, Module);
	if ("lm" in config) freeConfig$1(config.lm, Module);
	if ("ctcFstDecoder" in config) freeConfig$1(config.ctcFstDecoder, Module);
	if ("hr" in config) freeConfig$1(config.hr, Module);
	Module._free(config.ptr);
}
function initSherpaOnnxFeatureConfig(config, Module) {
	const len = 8;
	const ptr = Module._malloc(len);
	Module.setValue(ptr, config.sampleRate || 16e3, "i32");
	Module.setValue(ptr + 4, config.featureDim || 80, "i32");
	return {
		ptr,
		len
	};
}
function initSherpaOnnxHomophoneReplacerConfig(config, Module) {
	const len = 12;
	const ptr = Module._malloc(len);
	const dictDir = "";
	const dictDirLen = Module.lengthBytesUTF8(dictDir) + 1;
	const lexiconLen = Module.lengthBytesUTF8(config.lexicon || "") + 1;
	const ruleFstsLen = Module.lengthBytesUTF8(config.ruleFsts || "") + 1;
	const bufferLen = dictDirLen + lexiconLen + ruleFstsLen;
	const buffer = Module._malloc(bufferLen);
	let offset = 0;
	Module.stringToUTF8(dictDir, buffer + offset, dictDirLen);
	offset += dictDirLen;
	Module.stringToUTF8(config.lexicon || "", buffer + offset, lexiconLen);
	offset += lexiconLen;
	Module.stringToUTF8(config.ruleFsts || "", buffer + offset, ruleFstsLen);
	offset += ruleFstsLen;
	Module.setValue(ptr, buffer, "i8*");
	Module.setValue(ptr + 4, buffer + dictDirLen, "i8*");
	Module.setValue(ptr + 8, buffer + dictDirLen + lexiconLen, "i8*");
	return {
		ptr,
		len,
		buffer
	};
}
function initSherpaOnnxOfflineTransducerModelConfig(config, Module) {
	const encoderLen = Module.lengthBytesUTF8(config.encoder || "") + 1;
	const decoderLen = Module.lengthBytesUTF8(config.decoder || "") + 1;
	const joinerLen = Module.lengthBytesUTF8(config.joiner || "") + 1;
	const n = encoderLen + decoderLen + joinerLen;
	const buffer = Module._malloc(n);
	const len = 12;
	const ptr = Module._malloc(len);
	let offset = 0;
	Module.stringToUTF8(config.encoder || "", buffer + offset, encoderLen);
	offset += encoderLen;
	Module.stringToUTF8(config.decoder || "", buffer + offset, decoderLen);
	offset += decoderLen;
	Module.stringToUTF8(config.joiner || "", buffer + offset, joinerLen);
	offset = 0;
	Module.setValue(ptr, buffer + offset, "i8*");
	offset += encoderLen;
	Module.setValue(ptr + 4, buffer + offset, "i8*");
	offset += decoderLen;
	Module.setValue(ptr + 8, buffer + offset, "i8*");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineParaformerModelConfig(config, Module) {
	const n = Module.lengthBytesUTF8(config.model || "") + 1;
	const buffer = Module._malloc(n);
	const len = 4;
	const ptr = Module._malloc(len);
	Module.stringToUTF8(config.model || "", buffer, n);
	Module.setValue(ptr, buffer, "i8*");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineNemoEncDecCtcModelConfig(config, Module) {
	const n = Module.lengthBytesUTF8(config.model || "") + 1;
	const buffer = Module._malloc(n);
	const len = 4;
	const ptr = Module._malloc(len);
	Module.stringToUTF8(config.model || "", buffer, n);
	Module.setValue(ptr, buffer, "i8*");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineDolphinModelConfig(config, Module) {
	const n = Module.lengthBytesUTF8(config.model || "") + 1;
	const buffer = Module._malloc(n);
	const len = 4;
	const ptr = Module._malloc(len);
	Module.stringToUTF8(config.model || "", buffer, n);
	Module.setValue(ptr, buffer, "i8*");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineZipformerCtcModelConfig(config, Module) {
	const n = Module.lengthBytesUTF8(config.model || "") + 1;
	const buffer = Module._malloc(n);
	const len = 4;
	const ptr = Module._malloc(len);
	Module.stringToUTF8(config.model || "", buffer, n);
	Module.setValue(ptr, buffer, "i8*");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineWenetCtcModelConfig(config, Module) {
	const n = Module.lengthBytesUTF8(config.model || "") + 1;
	const buffer = Module._malloc(n);
	const len = 4;
	const ptr = Module._malloc(len);
	Module.stringToUTF8(config.model || "", buffer, n);
	Module.setValue(ptr, buffer, "i8*");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineOmnilingualAsrCtcModelConfig(config, Module) {
	const n = Module.lengthBytesUTF8(config.model || "") + 1;
	const buffer = Module._malloc(n);
	const len = 4;
	const ptr = Module._malloc(len);
	Module.stringToUTF8(config.model || "", buffer, n);
	Module.setValue(ptr, buffer, "i8*");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineMedAsrCtcModelConfig(config, Module) {
	const n = Module.lengthBytesUTF8(config.model || "") + 1;
	const buffer = Module._malloc(n);
	const len = 4;
	const ptr = Module._malloc(len);
	Module.stringToUTF8(config.model || "", buffer, n);
	Module.setValue(ptr, buffer, "i8*");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineFireRedAsrCtcModelConfig(config, Module) {
	const n = Module.lengthBytesUTF8(config.model || "") + 1;
	const buffer = Module._malloc(n);
	const len = 4;
	const ptr = Module._malloc(len);
	Module.stringToUTF8(config.model || "", buffer, n);
	Module.setValue(ptr, buffer, "i8*");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineFunAsrNanoModelConfig(config, Module) {
	const encoderAdaptorLen = Module.lengthBytesUTF8(config.encoderAdaptor || "") + 1;
	const llmLen = Module.lengthBytesUTF8(config.llm || "") + 1;
	const embeddingLen = Module.lengthBytesUTF8(config.embedding || "") + 1;
	const tokenizerLen = Module.lengthBytesUTF8(config.tokenizer || "") + 1;
	const systemPromptLen = Module.lengthBytesUTF8(config.systemPrompt || "You are a helpful assistant.") + 1;
	const userPromptLen = Module.lengthBytesUTF8(config.userPrompt || "语音转写：") + 1;
	const languageLen = Module.lengthBytesUTF8(config.language || "") + 1;
	const hotwordsLen = Module.lengthBytesUTF8(config.hotwords || "") + 1;
	const n = encoderAdaptorLen + llmLen + embeddingLen + tokenizerLen + systemPromptLen + userPromptLen + languageLen + hotwordsLen;
	const buffer = Module._malloc(n);
	const len = 52;
	const ptr = Module._malloc(len);
	let offset = 0;
	Module.stringToUTF8(config.encoderAdaptor || "", buffer + offset, encoderAdaptorLen);
	offset += encoderAdaptorLen;
	Module.stringToUTF8(config.llm || "", buffer + offset, llmLen);
	offset += llmLen;
	Module.stringToUTF8(config.embedding || "", buffer + offset, embeddingLen);
	offset += embeddingLen;
	Module.stringToUTF8(config.tokenizer || "", buffer + offset, tokenizerLen);
	offset += tokenizerLen;
	Module.stringToUTF8(config.systemPrompt || "You are a helpful assistant.", buffer + offset, systemPromptLen);
	offset += systemPromptLen;
	Module.stringToUTF8(config.userPrompt || "语音转写：", buffer + offset, userPromptLen);
	offset += userPromptLen;
	Module.stringToUTF8(config.language || "", buffer + offset, languageLen);
	offset += languageLen;
	Module.stringToUTF8(config.hotwords || "", buffer + offset, hotwordsLen);
	offset += hotwordsLen;
	offset = 0;
	Module.setValue(ptr + 0, buffer + offset, "i8*");
	offset += encoderAdaptorLen;
	Module.setValue(ptr + 4, buffer + offset, "i8*");
	offset += llmLen;
	Module.setValue(ptr + 8, buffer + offset, "i8*");
	offset += embeddingLen;
	Module.setValue(ptr + 12, buffer + offset, "i8*");
	offset += tokenizerLen;
	Module.setValue(ptr + 16, buffer + offset, "i8*");
	offset += systemPromptLen;
	Module.setValue(ptr + 20, buffer + offset, "i8*");
	offset += userPromptLen;
	Module.setValue(ptr + 24, config.maxNewTokens || 512, "i32");
	Module.setValue(ptr + 28, config.temperature || 1e-6, "float");
	Module.setValue(ptr + 32, config.topP || .8, "float");
	Module.setValue(ptr + 36, config.seed || 42, "i32");
	Module.setValue(ptr + 40, buffer + offset, "i8*");
	offset += languageLen;
	Module.setValue(ptr + 44, config.itn || 0, "i32");
	Module.setValue(ptr + 48, buffer + offset, "i8*");
	offset += hotwordsLen;
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineWhisperModelConfig(config, Module) {
	const encoderLen = Module.lengthBytesUTF8(config.encoder || "") + 1;
	const decoderLen = Module.lengthBytesUTF8(config.decoder || "") + 1;
	const languageLen = Module.lengthBytesUTF8(config.language || "") + 1;
	const taskLen = Module.lengthBytesUTF8(config.task || "") + 1;
	const n = encoderLen + decoderLen + languageLen + taskLen;
	const buffer = Module._malloc(n);
	const len = 28;
	const ptr = Module._malloc(len);
	let offset = 0;
	Module.stringToUTF8(config.encoder || "", buffer + offset, encoderLen);
	offset += encoderLen;
	Module.stringToUTF8(config.decoder || "", buffer + offset, decoderLen);
	offset += decoderLen;
	Module.stringToUTF8(config.language || "", buffer + offset, languageLen);
	offset += languageLen;
	Module.stringToUTF8(config.task || "", buffer + offset, taskLen);
	offset = 0;
	Module.setValue(ptr, buffer + offset, "i8*");
	offset += encoderLen;
	Module.setValue(ptr + 4, buffer + offset, "i8*");
	offset += decoderLen;
	Module.setValue(ptr + 8, buffer + offset, "i8*");
	offset += languageLen;
	Module.setValue(ptr + 12, buffer + offset, "i8*");
	offset += taskLen;
	Module.setValue(ptr + 16, config.tailPaddings || 2e3, "i32");
	Module.setValue(ptr + 20, config.enableTokenTimestamps || 0, "i32");
	Module.setValue(ptr + 24, config.enableSegmentTimestamps || 0, "i32");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineCanaryModelConfig(config, Module) {
	const encoderLen = Module.lengthBytesUTF8(config.encoder || "") + 1;
	const decoderLen = Module.lengthBytesUTF8(config.decoder || "") + 1;
	const srcLangLen = Module.lengthBytesUTF8(config.srcLang || "") + 1;
	const tgtLangLen = Module.lengthBytesUTF8(config.tgtLang || "") + 1;
	const n = encoderLen + decoderLen + srcLangLen + tgtLangLen;
	const buffer = Module._malloc(n);
	const len = 20;
	const ptr = Module._malloc(len);
	let offset = 0;
	Module.stringToUTF8(config.encoder || "", buffer + offset, encoderLen);
	offset += encoderLen;
	Module.stringToUTF8(config.decoder || "", buffer + offset, decoderLen);
	offset += decoderLen;
	Module.stringToUTF8(config.srcLang || "", buffer + offset, srcLangLen);
	offset += srcLangLen;
	Module.stringToUTF8(config.tgtLang || "", buffer + offset, tgtLangLen);
	offset += tgtLangLen;
	offset = 0;
	Module.setValue(ptr, buffer + offset, "i8*");
	offset += encoderLen;
	Module.setValue(ptr + 4, buffer + offset, "i8*");
	offset += decoderLen;
	Module.setValue(ptr + 8, buffer + offset, "i8*");
	offset += srcLangLen;
	Module.setValue(ptr + 12, buffer + offset, "i8*");
	offset += tgtLangLen;
	Module.setValue(ptr + 16, config.usePnc ?? 1, "i32");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineMoonshineModelConfig(config, Module) {
	const preprocessorLen = Module.lengthBytesUTF8(config.preprocessor || "") + 1;
	const encoderLen = Module.lengthBytesUTF8(config.encoder || "") + 1;
	const uncachedDecoderLen = Module.lengthBytesUTF8(config.uncachedDecoder || "") + 1;
	const cachedDecoderLen = Module.lengthBytesUTF8(config.cachedDecoder || "") + 1;
	const mergedDecoderLen = Module.lengthBytesUTF8(config.mergedDecoder || "") + 1;
	const n = preprocessorLen + encoderLen + uncachedDecoderLen + cachedDecoderLen + mergedDecoderLen;
	const buffer = Module._malloc(n);
	const len = 20;
	const ptr = Module._malloc(len);
	let offset = 0;
	Module.stringToUTF8(config.preprocessor || "", buffer + offset, preprocessorLen);
	offset += preprocessorLen;
	Module.stringToUTF8(config.encoder || "", buffer + offset, encoderLen);
	offset += encoderLen;
	Module.stringToUTF8(config.uncachedDecoder || "", buffer + offset, uncachedDecoderLen);
	offset += uncachedDecoderLen;
	Module.stringToUTF8(config.cachedDecoder || "", buffer + offset, cachedDecoderLen);
	offset += cachedDecoderLen;
	Module.stringToUTF8(config.mergedDecoder || "", buffer + offset, mergedDecoderLen);
	offset += mergedDecoderLen;
	offset = 0;
	Module.setValue(ptr, buffer + offset, "i8*");
	offset += preprocessorLen;
	Module.setValue(ptr + 4, buffer + offset, "i8*");
	offset += encoderLen;
	Module.setValue(ptr + 8, buffer + offset, "i8*");
	offset += uncachedDecoderLen;
	Module.setValue(ptr + 12, buffer + offset, "i8*");
	offset += cachedDecoderLen;
	Module.setValue(ptr + 16, buffer + offset, "i8*");
	offset += mergedDecoderLen;
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineFireRedAsrModelConfig(config, Module) {
	const encoderLen = Module.lengthBytesUTF8(config.encoder || "") + 1;
	const decoderLen = Module.lengthBytesUTF8(config.decoder || "") + 1;
	const n = encoderLen + decoderLen;
	const buffer = Module._malloc(n);
	const len = 8;
	const ptr = Module._malloc(len);
	let offset = 0;
	Module.stringToUTF8(config.encoder || "", buffer + offset, encoderLen);
	offset += encoderLen;
	Module.stringToUTF8(config.decoder || "", buffer + offset, decoderLen);
	offset += decoderLen;
	offset = 0;
	Module.setValue(ptr, buffer + offset, "i8*");
	offset += encoderLen;
	Module.setValue(ptr + 4, buffer + offset, "i8*");
	offset += decoderLen;
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineTdnnModelConfig(config, Module) {
	const n = Module.lengthBytesUTF8(config.model || "") + 1;
	const buffer = Module._malloc(n);
	const len = 4;
	const ptr = Module._malloc(len);
	Module.stringToUTF8(config.model || "", buffer, n);
	Module.setValue(ptr, buffer, "i8*");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineSenseVoiceModelConfig(config, Module) {
	const modelLen = Module.lengthBytesUTF8(config.model || "") + 1;
	const languageLen = Module.lengthBytesUTF8(config.language || "") + 1;
	const n = modelLen + languageLen;
	const buffer = Module._malloc(n);
	const len = 12;
	const ptr = Module._malloc(len);
	let offset = 0;
	Module.stringToUTF8(config.model || "", buffer + offset, modelLen);
	offset += modelLen;
	Module.stringToUTF8(config.language || "", buffer + offset, languageLen);
	offset += languageLen;
	offset = 0;
	Module.setValue(ptr, buffer + offset, "i8*");
	offset += modelLen;
	Module.setValue(ptr + 4, buffer + offset, "i8*");
	offset += languageLen;
	Module.setValue(ptr + 8, config.useInverseTextNormalization ?? 0, "i32");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineLMConfig(config, Module) {
	const n = Module.lengthBytesUTF8(config.model || "") + 1;
	const buffer = Module._malloc(n);
	const len = 8;
	const ptr = Module._malloc(len);
	Module.stringToUTF8(config.model || "", buffer, n);
	Module.setValue(ptr, buffer, "i8*");
	Module.setValue(ptr + 4, config.scale || 1, "float");
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxOfflineModelConfig(config, Module) {
	if (!("transducer" in config)) config.transducer = {
		encoder: "",
		decoder: "",
		joiner: ""
	};
	if (!("paraformer" in config)) config.paraformer = { model: "" };
	if (!("nemoCtc" in config)) config.nemoCtc = { model: "" };
	if (!("dolphin" in config)) config.dolphin = { model: "" };
	if (!("zipformerCtc" in config)) config.zipformerCtc = { model: "" };
	if (!("wenetCtc" in config)) config.wenetCtc = { model: "" };
	if (!("omnilingual" in config)) config.omnilingual = { model: "" };
	if (!("medasr" in config)) config.medasr = { model: "" };
	if (!("fireRedAsrCtc" in config)) config.fireRedAsrCtc = { model: "" };
	if (!("funasrNano" in config)) config.funasrNano = {
		encoderAdaptor: "",
		llm: "",
		embedding: "",
		tokenizer: "",
		systemPrompt: "You are a helpful assistant.",
		userPrompt: "语音转写：",
		maxNewTokens: 512,
		temperature: 1e-6,
		topP: .8,
		seed: 42,
		language: "",
		itn: 0,
		hotwords: ""
	};
	if (!("whisper" in config)) config.whisper = {
		encoder: "",
		decoder: "",
		language: "",
		task: "",
		tailPaddings: -1,
		enableTokenTimestamps: 0,
		enableSegmentTimestamps: 0
	};
	if (!("moonshine" in config)) config.moonshine = {
		preprocessor: "",
		encoder: "",
		uncachedDecoder: "",
		cachedDecoder: "",
		mergedDecoder: ""
	};
	if (!("fireRedAsr" in config)) config.fireRedAsr = {
		encoder: "",
		decoder: ""
	};
	if (!("tdnn" in config)) config.tdnn = { model: "" };
	if (!("senseVoice" in config)) config.senseVoice = {
		model: "",
		language: "",
		useInverseTextNormalization: 0
	};
	if (!("canary" in config)) config.canary = {
		encoder: "",
		decoder: "",
		srcLang: "",
		tgtLang: "",
		usePnc: 1
	};
	const transducer = initSherpaOnnxOfflineTransducerModelConfig(config.transducer, Module);
	const paraformer = initSherpaOnnxOfflineParaformerModelConfig(config.paraformer, Module);
	const nemoCtc = initSherpaOnnxOfflineNemoEncDecCtcModelConfig(config.nemoCtc, Module);
	const whisper = initSherpaOnnxOfflineWhisperModelConfig(config.whisper, Module);
	const tdnn = initSherpaOnnxOfflineTdnnModelConfig(config.tdnn, Module);
	const senseVoice = initSherpaOnnxOfflineSenseVoiceModelConfig(config.senseVoice, Module);
	const moonshine = initSherpaOnnxOfflineMoonshineModelConfig(config.moonshine, Module);
	const fireRedAsr = initSherpaOnnxOfflineFireRedAsrModelConfig(config.fireRedAsr, Module);
	const dolphin = initSherpaOnnxOfflineDolphinModelConfig(config.dolphin, Module);
	const zipformerCtc = initSherpaOnnxOfflineZipformerCtcModelConfig(config.zipformerCtc, Module);
	const canary = initSherpaOnnxOfflineCanaryModelConfig(config.canary, Module);
	const wenetCtc = initSherpaOnnxOfflineWenetCtcModelConfig(config.wenetCtc, Module);
	const omnilingual = initSherpaOnnxOfflineOmnilingualAsrCtcModelConfig(config.omnilingual, Module);
	const medasr = initSherpaOnnxOfflineMedAsrCtcModelConfig(config.medasr, Module);
	const funasrNano = initSherpaOnnxOfflineFunAsrNanoModelConfig(config.funasrNano, Module);
	const fireRedAsrCtc = initSherpaOnnxOfflineFireRedAsrCtcModelConfig(config.fireRedAsrCtc, Module);
	const len = transducer.len + paraformer.len + nemoCtc.len + whisper.len + tdnn.len + 32 + senseVoice.len + moonshine.len + fireRedAsr.len + dolphin.len + zipformerCtc.len + canary.len + wenetCtc.len + omnilingual.len + medasr.len + funasrNano.len + fireRedAsrCtc.len;
	const ptr = Module._malloc(len);
	let offset = 0;
	Module._CopyHeap(transducer.ptr, transducer.len, ptr + offset);
	offset += transducer.len;
	Module._CopyHeap(paraformer.ptr, paraformer.len, ptr + offset);
	offset += paraformer.len;
	Module._CopyHeap(nemoCtc.ptr, nemoCtc.len, ptr + offset);
	offset += nemoCtc.len;
	Module._CopyHeap(whisper.ptr, whisper.len, ptr + offset);
	offset += whisper.len;
	Module._CopyHeap(tdnn.ptr, tdnn.len, ptr + offset);
	offset += tdnn.len;
	const tokensLen = Module.lengthBytesUTF8(config.tokens || "") + 1;
	const providerLen = Module.lengthBytesUTF8(config.provider || "cpu") + 1;
	const modelTypeLen = Module.lengthBytesUTF8(config.modelType || "") + 1;
	const modelingUnitLen = Module.lengthBytesUTF8(config.modelingUnit || "") + 1;
	const bpeVocabLen = Module.lengthBytesUTF8(config.bpeVocab || "") + 1;
	const teleSpeechCtcLen = Module.lengthBytesUTF8(config.teleSpeechCtc || "") + 1;
	const bufferLen = tokensLen + providerLen + modelTypeLen + modelingUnitLen + bpeVocabLen + teleSpeechCtcLen;
	const buffer = Module._malloc(bufferLen);
	offset = 0;
	Module.stringToUTF8(config.tokens, buffer, tokensLen);
	offset += tokensLen;
	Module.stringToUTF8(config.provider || "cpu", buffer + offset, providerLen);
	offset += providerLen;
	Module.stringToUTF8(config.modelType || "", buffer + offset, modelTypeLen);
	offset += modelTypeLen;
	Module.stringToUTF8(config.modelingUnit || "", buffer + offset, modelingUnitLen);
	offset += modelingUnitLen;
	Module.stringToUTF8(config.bpeVocab || "", buffer + offset, bpeVocabLen);
	offset += bpeVocabLen;
	Module.stringToUTF8(config.teleSpeechCtc || "", buffer + offset, teleSpeechCtcLen);
	offset += teleSpeechCtcLen;
	offset = transducer.len + paraformer.len + nemoCtc.len + whisper.len + tdnn.len;
	Module.setValue(ptr + offset, buffer, "i8*");
	offset += 4;
	Module.setValue(ptr + offset, config.numThreads || 1, "i32");
	offset += 4;
	Module.setValue(ptr + offset, config.debug ?? 1, "i32");
	offset += 4;
	Module.setValue(ptr + offset, buffer + tokensLen, "i8*");
	offset += 4;
	Module.setValue(ptr + offset, buffer + tokensLen + providerLen, "i8*");
	offset += 4;
	Module.setValue(ptr + offset, buffer + tokensLen + providerLen + modelTypeLen, "i8*");
	offset += 4;
	Module.setValue(ptr + offset, buffer + tokensLen + providerLen + modelTypeLen + modelingUnitLen, "i8*");
	offset += 4;
	Module.setValue(ptr + offset, buffer + tokensLen + providerLen + modelTypeLen + modelingUnitLen + bpeVocabLen, "i8*");
	offset += 4;
	Module._CopyHeap(senseVoice.ptr, senseVoice.len, ptr + offset);
	offset += senseVoice.len;
	Module._CopyHeap(moonshine.ptr, moonshine.len, ptr + offset);
	offset += moonshine.len;
	Module._CopyHeap(fireRedAsr.ptr, fireRedAsr.len, ptr + offset);
	offset += fireRedAsr.len;
	Module._CopyHeap(dolphin.ptr, dolphin.len, ptr + offset);
	offset += dolphin.len;
	Module._CopyHeap(zipformerCtc.ptr, zipformerCtc.len, ptr + offset);
	offset += zipformerCtc.len;
	Module._CopyHeap(canary.ptr, canary.len, ptr + offset);
	offset += canary.len;
	Module._CopyHeap(wenetCtc.ptr, wenetCtc.len, ptr + offset);
	offset += wenetCtc.len;
	Module._CopyHeap(omnilingual.ptr, omnilingual.len, ptr + offset);
	offset += omnilingual.len;
	Module._CopyHeap(medasr.ptr, medasr.len, ptr + offset);
	offset += medasr.len;
	Module._CopyHeap(funasrNano.ptr, funasrNano.len, ptr + offset);
	offset += funasrNano.len;
	Module._CopyHeap(fireRedAsrCtc.ptr, fireRedAsrCtc.len, ptr + offset);
	offset += fireRedAsrCtc.len;
	return {
		buffer,
		ptr,
		len,
		transducer,
		paraformer,
		nemoCtc,
		whisper,
		tdnn,
		senseVoice,
		moonshine,
		fireRedAsr,
		dolphin,
		zipformerCtc,
		canary,
		wenetCtc,
		omnilingual,
		medasr,
		funasrNano,
		fireRedAsrCtc
	};
}
function initSherpaOnnxOfflineRecognizerConfig(config, Module) {
	if (!("featConfig" in config)) config.featConfig = {
		sampleRate: 16e3,
		featureDim: 80
	};
	if (!("lmConfig" in config)) config.lmConfig = {
		model: "",
		scale: 1
	};
	if (!("hr" in config)) config.hr = {
		lexicon: "",
		ruleFsts: ""
	};
	const feat = initSherpaOnnxFeatureConfig(config.featConfig, Module);
	const model = initSherpaOnnxOfflineModelConfig(config.modelConfig, Module);
	const lm = initSherpaOnnxOfflineLMConfig(config.lmConfig, Module);
	const hr = initSherpaOnnxHomophoneReplacerConfig(config.hr, Module);
	const len = feat.len + model.len + lm.len + 28 + hr.len;
	const ptr = Module._malloc(len);
	let offset = 0;
	Module._CopyHeap(feat.ptr, feat.len, ptr + offset);
	offset += feat.len;
	Module._CopyHeap(model.ptr, model.len, ptr + offset);
	offset += model.len;
	Module._CopyHeap(lm.ptr, lm.len, ptr + offset);
	offset += lm.len;
	const decodingMethodLen = Module.lengthBytesUTF8(config.decodingMethod || "greedy_search") + 1;
	const hotwordsFileLen = Module.lengthBytesUTF8(config.hotwordsFile || "") + 1;
	const ruleFstsLen = Module.lengthBytesUTF8(config.ruleFsts || "") + 1;
	const ruleFarsLen = Module.lengthBytesUTF8(config.ruleFars || "") + 1;
	const bufferLen = decodingMethodLen + hotwordsFileLen + ruleFstsLen + ruleFarsLen;
	const buffer = Module._malloc(bufferLen);
	offset = 0;
	Module.stringToUTF8(config.decodingMethod || "greedy_search", buffer, decodingMethodLen);
	offset += decodingMethodLen;
	Module.stringToUTF8(config.hotwordsFile || "", buffer + offset, hotwordsFileLen);
	offset += hotwordsFileLen;
	Module.stringToUTF8(config.ruleFsts || "", buffer + offset, ruleFstsLen);
	offset += ruleFstsLen;
	Module.stringToUTF8(config.ruleFars || "", buffer + offset, ruleFarsLen);
	offset += ruleFarsLen;
	offset = feat.len + model.len + lm.len;
	Module.setValue(ptr + offset, buffer, "i8*");
	offset += 4;
	Module.setValue(ptr + offset, config.maxActivePaths || 4, "i32");
	offset += 4;
	Module.setValue(ptr + offset, buffer + decodingMethodLen, "i8*");
	offset += 4;
	Module.setValue(ptr + offset, config.hotwordsScore || 1.5, "float");
	offset += 4;
	Module.setValue(ptr + offset, buffer + decodingMethodLen + hotwordsFileLen, "i8*");
	offset += 4;
	Module.setValue(ptr + offset, buffer + decodingMethodLen + hotwordsFileLen + ruleFstsLen, "i8*");
	offset += 4;
	Module.setValue(ptr + offset, config.blankPenalty || 0, "float");
	offset += 4;
	Module._CopyHeap(hr.ptr, hr.len, ptr + offset);
	offset += hr.len;
	return {
		buffer,
		ptr,
		len,
		feat,
		model,
		lm,
		hr
	};
}
var OfflineStream = class {
	constructor(handle, Module) {
		this.handle = handle;
		this.Module = Module;
	}
	free() {
		if (this.handle) {
			this.Module._SherpaOnnxDestroyOfflineStream(this.handle);
			this.handle = null;
		}
	}
	/**
	* @param sampleRate {Number}
	* @param samples {Float32Array} Containing samples in the range [-1, 1]
	*/
	acceptWaveform(sampleRate, samples) {
		const pointer = this.Module._malloc(samples.length * samples.BYTES_PER_ELEMENT);
		this.Module.HEAPF32.set(samples, pointer / samples.BYTES_PER_ELEMENT);
		this.Module._SherpaOnnxAcceptWaveformOffline(this.handle, sampleRate, pointer, samples.length);
		this.Module._free(pointer);
	}
};
var OfflineRecognizer = class {
	constructor(configObj, Module) {
		this.config = configObj;
		const config = initSherpaOnnxOfflineRecognizerConfig(configObj, Module);
		const handle = Module._SherpaOnnxCreateOfflineRecognizer(config.ptr);
		freeConfig$1(config, Module);
		this.handle = handle;
		this.Module = Module;
	}
	setConfig(configObj) {
		const config = initSherpaOnnxOfflineRecognizerConfig(configObj, this.Module);
		this.Module._SherpaOnnxOfflineRecognizerSetConfig(this.handle, config.ptr);
		freeConfig$1(config, this.Module);
	}
	free() {
		this.Module._SherpaOnnxDestroyOfflineRecognizer(this.handle);
		this.handle = 0;
	}
	createStream() {
		return new OfflineStream(this.Module._SherpaOnnxCreateOfflineStream(this.handle), this.Module);
	}
	decode(stream) {
		this.Module._SherpaOnnxDecodeOfflineStream(this.handle, stream.handle);
	}
	getResult(stream) {
		const r = this.Module._SherpaOnnxGetOfflineStreamResultAsJson(stream.handle);
		const jsonStr = this.Module.UTF8ToString(r);
		const ans = JSON.parse(jsonStr);
		this.Module._SherpaOnnxDestroyOfflineStreamResultJson(r);
		return ans;
	}
};

//#endregion
//#region src/vad.js
function freeConfig(config, Module) {
	if ("buffer" in config) Module._free(config.buffer);
	if ("sileroVad" in config) freeConfig(config.sileroVad, Module);
	if ("tenVad" in config) freeConfig(config.tenVad, Module);
	Module._free(config.ptr);
}
function initSherpaOnnxSileroVadModelConfig(config, Module) {
	const modelLen = Module.lengthBytesUTF8(config.model || "") + 1;
	const n = modelLen;
	const buffer = Module._malloc(n);
	const len = 24;
	const ptr = Module._malloc(len);
	Module.stringToUTF8(config.model || "", buffer, modelLen);
	let offset = 0;
	Module.setValue(ptr, buffer, "i8*");
	offset += 4;
	Module.setValue(ptr + offset, config.threshold || .5, "float");
	offset += 4;
	Module.setValue(ptr + offset, config.minSilenceDuration || .5, "float");
	offset += 4;
	Module.setValue(ptr + offset, config.minSpeechDuration || .25, "float");
	offset += 4;
	Module.setValue(ptr + offset, config.windowSize || 512, "i32");
	offset += 4;
	Module.setValue(ptr + offset, config.maxSpeechDuration || 20, "float");
	offset += 4;
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxTenVadModelConfig(config, Module) {
	const modelLen = Module.lengthBytesUTF8(config.model || "") + 1;
	const n = modelLen;
	const buffer = Module._malloc(n);
	const len = 24;
	const ptr = Module._malloc(len);
	Module.stringToUTF8(config.model || "", buffer, modelLen);
	let offset = 0;
	Module.setValue(ptr, buffer, "i8*");
	offset += 4;
	Module.setValue(ptr + offset, config.threshold || .5, "float");
	offset += 4;
	Module.setValue(ptr + offset, config.minSilenceDuration || .5, "float");
	offset += 4;
	Module.setValue(ptr + offset, config.minSpeechDuration || .25, "float");
	offset += 4;
	Module.setValue(ptr + offset, config.windowSize || 256, "i32");
	offset += 4;
	Module.setValue(ptr + offset, config.maxSpeechDuration || 20, "float");
	offset += 4;
	return {
		buffer,
		ptr,
		len
	};
}
function initSherpaOnnxVadModelConfig(config, Module) {
	if (!("sileroVad" in config)) config.sileroVad = {
		model: "",
		threshold: .5,
		minSilenceDuration: .5,
		minSpeechDuration: .25,
		windowSize: 512,
		maxSpeechDuration: 20
	};
	if (!("tenVad" in config)) config.tenVad = {
		model: "",
		threshold: .5,
		minSilenceDuration: .5,
		minSpeechDuration: .25,
		windowSize: 256,
		maxSpeechDuration: 20
	};
	const sileroVad = initSherpaOnnxSileroVadModelConfig(config.sileroVad, Module);
	const tenVad = initSherpaOnnxTenVadModelConfig(config.tenVad, Module);
	const len = sileroVad.len + 16 + tenVad.len;
	const ptr = Module._malloc(len);
	const providerLen = Module.lengthBytesUTF8(config.provider || "cpu") + 1;
	const buffer = Module._malloc(providerLen);
	Module.stringToUTF8(config.provider || "cpu", buffer, providerLen);
	let offset = 0;
	Module._CopyHeap(sileroVad.ptr, sileroVad.len, ptr + offset);
	offset += sileroVad.len;
	Module.setValue(ptr + offset, config.sampleRate || 16e3, "i32");
	offset += 4;
	Module.setValue(ptr + offset, config.numThreads || 1, "i32");
	offset += 4;
	Module.setValue(ptr + offset, buffer, "i8*");
	offset += 4;
	Module.setValue(ptr + offset, config.debug || 0, "i32");
	offset += 4;
	Module._CopyHeap(tenVad.ptr, tenVad.len, ptr + offset);
	offset += tenVad.len;
	return {
		buffer,
		ptr,
		len,
		sileroVad,
		tenVad
	};
}
function createVad(Module, myConfig) {
	let config = {
		sileroVad: {
			model: "./silero_vad.onnx",
			threshold: .5,
			minSilenceDuration: .5,
			minSpeechDuration: .25,
			maxSpeechDuration: 20,
			windowSize: 512
		},
		tenVad: {
			model: "",
			threshold: .5,
			minSilenceDuration: .5,
			minSpeechDuration: .25,
			maxSpeechDuration: 20,
			windowSize: 256
		},
		sampleRate: 16e3,
		numThreads: 1,
		provider: "cpu",
		debug: 1,
		bufferSizeInSeconds: 30
	};
	if (myConfig) config = myConfig;
	return new Vad(config, Module);
}
var CircularBuffer = class {
	constructor(capacity, Module) {
		this.handle = Module._SherpaOnnxCreateCircularBuffer(capacity);
		this.Module = Module;
	}
	free() {
		this.Module._SherpaOnnxDestroyCircularBuffer(this.handle);
		this.handle = 0;
	}
	/**
	* @param samples {Float32Array}
	*/
	push(samples) {
		const pointer = this.Module._malloc(samples.length * samples.BYTES_PER_ELEMENT);
		this.Module.HEAPF32.set(samples, pointer / samples.BYTES_PER_ELEMENT);
		this.Module._SherpaOnnxCircularBufferPush(this.handle, pointer, samples.length);
		this.Module._free(pointer);
	}
	get(startIndex, n) {
		const p = this.Module._SherpaOnnxCircularBufferGet(this.handle, startIndex, n);
		const samplesPtr = p / 4;
		const samples = new Float32Array(n);
		for (let i = 0; i < n; i++) samples[i] = this.Module.HEAPF32[samplesPtr + i];
		this.Module._SherpaOnnxCircularBufferFree(p);
		return samples;
	}
	pop(n) {
		this.Module._SherpaOnnxCircularBufferPop(this.handle, n);
	}
	size() {
		return this.Module._SherpaOnnxCircularBufferSize(this.handle);
	}
	head() {
		return this.Module._SherpaOnnxCircularBufferHead(this.handle);
	}
	reset() {
		this.Module._SherpaOnnxCircularBufferReset(this.handle);
	}
};
var Vad = class {
	constructor(configObj, Module) {
		this.config = configObj;
		const config = initSherpaOnnxVadModelConfig(configObj, Module);
		const handle = Module._SherpaOnnxCreateVoiceActivityDetector(config.ptr, configObj.bufferSizeInSeconds || 30);
		freeConfig(config, Module);
		this.handle = handle;
		this.Module = Module;
	}
	free() {
		this.Module._SherpaOnnxDestroyVoiceActivityDetector(this.handle);
		this.handle = 0;
	}
	acceptWaveform(samples) {
		const pointer = this.Module._malloc(samples.length * samples.BYTES_PER_ELEMENT);
		this.Module.HEAPF32.set(samples, pointer / samples.BYTES_PER_ELEMENT);
		this.Module._SherpaOnnxVoiceActivityDetectorAcceptWaveform(this.handle, pointer, samples.length);
		this.Module._free(pointer);
	}
	isEmpty() {
		return this.Module._SherpaOnnxVoiceActivityDetectorEmpty(this.handle) == 1;
	}
	isDetected() {
		return this.Module._SherpaOnnxVoiceActivityDetectorDetected(this.handle) == 1;
	}
	pop() {
		this.Module._SherpaOnnxVoiceActivityDetectorPop(this.handle);
	}
	clear() {
		this.Module._SherpaOnnxVoiceActivityDetectorClear(this.handle);
	}
	front() {
		const h = this.Module._SherpaOnnxVoiceActivityDetectorFront(this.handle);
		const start = this.Module.HEAP32[h / 4];
		const samplesPtr = this.Module.HEAP32[h / 4 + 1] / 4;
		const numSamples = this.Module.HEAP32[h / 4 + 2];
		const samples = new Float32Array(numSamples);
		for (let i = 0; i < numSamples; i++) samples[i] = this.Module.HEAPF32[samplesPtr + i];
		this.Module._SherpaOnnxDestroySpeechSegment(h);
		return {
			samples,
			start
		};
	}
	reset() {
		this.Module._SherpaOnnxVoiceActivityDetectorReset(this.handle);
	}
	flush() {
		this.Module._SherpaOnnxVoiceActivityDetectorFlush(this.handle);
	}
};

//#endregion
//#region src/index.ts
async function initVADASRModule() {
	const prebuiltVADASRModule = await import("./vad-asr-B8h_kDdl.js");
	const init = prebuiltVADASRModule.default ?? prebuiltVADASRModule;
	const wasmUrl = new URL("./prebuilt/vad-asr.wasm", import.meta.url).toString();
	return await init({ locateFile: () => wasmUrl });
}

//#endregion
export { CircularBuffer, OfflineRecognizer, createVad, initVADASRModule };