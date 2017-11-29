class Clipboard {

    constructor() {
        this.buffer = null;
    }

    copy() {
        let tmpRange = document.getSelection().getRangeAt(0);
        if (!tmpRange.collapsed) {
            let tmpDiv = document.createElement('div');
            tmpDiv.append(tmpRange.cloneContents());

            this.fixRangeCopy(tmpDiv, tmpRange.startContainer, tmpRange.endContainer);
            this.buffer = tmpDiv;
        }
    }

    cut() {
        this.copy();
        document.execCommand('insertHtml', false, '');
    }

    fixRangeCopy(el, startEl, endEl) {
        let startTag = startEl.parentElement.localName;
        let endTag = endEl.parentElement.localName;
        if (startTag == 'div' || endTag == 'div') {
            return;
        }
        if (startTag == endTag && startTag != el.firstChild.localName) {
            el.innerHTML = '<' + startTag + '>' + el.innerHTML + '</' + startTag + '>';
        }
        this.fixRangeCopy(el, startEl.parentElement, endEl.parentElement);
        this.fixRangeCopy(el, startEl, endEl.parentElement);
        this.fixRangeCopy(el, startEl.parentElement, endEl);
    }

    paste() {
        if (this.buffer != null)
            document.execCommand('insertHtml', false, this.buffer.innerHTML);
    }

    pasteAsText() {
        if (this.buffer != null)
            document.execCommand('insertHtml', false, this.buffer.innerText);
    }

}
