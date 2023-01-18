import {createCommand} from 'lexical';
import {KoenigDecoratorNode} from '../../KoenigDecoratorNode';
import {CodeBlockParser} from './CodeBlockParser';
import {renderCodeBlockNodeToDOM} from './CodeBlockRenderer';

export const CODE_BLOCK_COMMAND = createCommand();

export class CodeBlockNode extends KoenigDecoratorNode {
    __code;
    __language;
    __caption;

    static getType() {
        return 'codeblock';
    }

    static clone(node) {
        return new CodeBlockNode(node.__language, node.__code, node.__caption, node.__key);
    }

    // used by `@tryghost/url-utils` to transform URLs contained in the serialized JSON
    static get urlTransformMap() {
        return {
            src: 'url',
            caption: 'html'
        };
    }

    getDataset() {
        return {
            code: this.__code,
            language: this.__language,
            caption: this.__caption
        };
    }

    static importJSON(serializedNode) {
        const {code, language} = serializedNode;
        const node = new this({language, code});
        return node;
    }

    exportJSON() {
        return {
            type: 'codeblock',
            version: 1,
            code: this.__code,
            language: this.__language
        };
    }

    constructor(language, initCode, caption, key) {
        super(key);
        this.__language = language;
        this.__code = initCode;
        this.__caption = caption;
    }

    static importDOM() {
        const parser = new CodeBlockParser(this);
        return parser.DOMConversionMap;
    }

    exportDOM(options = {}) {
        const element = renderCodeBlockNodeToDOM(this, options);
        return {element};
    }

    /* c8 ignore start */
    createDOM() {
        return document.createElement('div');
    }

    updateDOM() {
        return false;
    }

    isInline() {
        return false;
    }
    /* c8 ignore stop */

    getCaption() {
        return this.__caption;
    }

    setCaption(caption) {
        const writable = this.getWritable();
        return writable.__caption = caption;
    }

    getCode() {
        const self = this.getLatest();
        return self.__code;
    }

    setCode(code) {
        const self = this.getWritable();
        self.__code = code;
    }

    getLanguage() {
        const self = this.getLatest();
        return self.__language;
    }

    setLanguage(language) {
        const self = this.getWritable();
        self.__language = language;
    }

    getTextContent() {
        const self = this.getLatest();
        return self.__code;
    }

    // should be overwritten
    /* c8 ignore next 3 */
    decorate() {
        return '';
    }

    hasEditMode() {
        return true;
    }
}

export function $createCodeBlockNode(language, initCode, caption) {
    return new CodeBlockNode(language, initCode, caption);
}

export function $isCodeBlockNode(node) {
    return node instanceof CodeBlockNode;
}