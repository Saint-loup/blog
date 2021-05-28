/* eslint-disable @typescript-eslint/ban-ts-comment */
const { mdjsProcess } = require('@mdjs/core');
const visit = require('unist-util-visit');
const { init, parse } = require('es-module-lexer');



/** @typedef {import('@mdjs/core').MdjsProcessPlugin} MdjsProcessPlugin */
/** @typedef {import('../types/code').EleventPluginMdjsUnified} EleventPluginMdjsUnified */
/** @typedef {import('../types/code').NodeChildren} NodeChildren */
/** @typedef {import('../types/code').NodeElement} NodeElement */
/** @typedef {import('unist').Node} Node */


/**
 * @param {string} source
 * @param {string} inputPath
 */
async function processImports(source, inputPath) {
	if (!inputPath.endsWith('index.md')) {
		if (source !== '' && source.includes('import')) {
			let newSource = '';
			let lastPos = 0;
			await init;
			const [imports] = parse(source);
			for (const importObj of imports) {
				newSource += source.substring(lastPos, importObj.s);
				const importSrc = source.substring(importObj.s, importObj.e);

				if (importSrc.startsWith('./')) {
					newSource += '.' + importSrc;
				} else if (importSrc.startsWith("'./")) {
					newSource += "'." + importSrc.substring(1);
				} else if (importSrc.startsWith('../')) {
					newSource += '../' + importSrc;
				} else if (importSrc.startsWith("'../")) {
					newSource += "'../" + importSrc.substring(1);
				} else {
					newSource += importSrc;
				}
				lastPos = importObj.e;
			}
			newSource += source.substring(lastPos, source.length);
			return newSource;
		}
	}
	return source;
}

/**
 * @param {EleventPluginMdjsUnified} pluginOptions
 */
function eleventyUnified(pluginOptions) {
	/**
	 * @param {string} mdjs
	 * @param {*} eleventySettings
	 */
	async function render(mdjs, eleventySettings) {
		/** @type {function[]} */
		let userSetupUnifiedPlugins = [];
		if (pluginOptions.setupUnifiedPlugins) {
			if (typeof pluginOptions.setupUnifiedPlugins === 'function') {
				userSetupUnifiedPlugins = [pluginOptions.setupUnifiedPlugins];
			}
			if (Array.isArray(pluginOptions.setupUnifiedPlugins)) {
				userSetupUnifiedPlugins = pluginOptions.setupUnifiedPlugins;
			}
		}

		// @ts-ignore
		const result = await mdjsProcess(mdjs);

		result.jsCode = await processImports(result.jsCode, eleventySettings.page.inputPath);

		return result;
	}
	return {
		set: () => {
			// do nothing
		},
		render,
	};
}

/**
 * @param {*} eleventyConfig
 * @param {EleventPluginMdjsUnified} [pluginOptions]
 */
function configFunction(eleventyConfig) {
	eleventyConfig.setLibrary('md', eleventyUnified());
}

const eleventPluginMdjsUnified = {
	initArguments: {},
	configFunction,
};

module.exports = eleventPluginMdjsUnified;
