class RangeControl {

    constructor(editor) {
        this.editor = editor;
        this.range = null;
    }

    saveRange() {
        if (window.getSelection) {
            let selection = window.getSelection();
            if (selection.rangeCount > 0)
                this.range = (selection.getRangeAt(0));
            else {
                this.range = document.createRange();
                this.range.selectNodeContents(this.editor[0]);
            }
        }
    }
    
    returnRange() {
        this.editor.focus();
        if (window.getSelection && $.contains(this.editor[0], this.range.startContainer) && $.contains(this.editor[0], this.range.endContainer)) {
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(this.range);
        }
    }

}
