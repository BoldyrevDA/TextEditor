$(() => {

    const editor = $('#editor');
    const controlls = $('#controlls');
    const container = $('#container');
    const modalForTable = $("#modalForTable");
    
    let clipboard = new Clipboard();
    let rangeControl = new RangeControl(editor);
    let jsonLoader = new JsonLoader();
    
    //загрузка контента из локального хранилища
    let text;
    if (text = localStorage.getItem("text")) {
        editor.html(text);
    }

    //сохранение контента в локальное хранилище
    window.onbeforeunload = function () {
        localStorage.setItem("text", editor.html());
    };

    //установка обработчиков событий
    $('#btnAddTable').click(addTable);
    $('#exportFile').click(jsonLoader.saveContent);
    $('#loadFile').change(jsonLoader.loadContent);

    controlls.on('click', (e) => {
        let targetId = e.target.id || e.target.parentElement.id;
        executeCommand(targetId);
    })
    

    function executeCommand(command) {
        switch (command) {
            case 'importFile':
                $('#loadFile').click();
                break;
            case 'print':
                window.print();
                break;
            case 'table':
                rangeControl.saveRange();
                modalForTable.modal('show');
                break;
            case 'picture':
                loadPicture.openModal();
                break;
            case 'paste':
                clipboard.paste();
                break;
            case 'pasteAsText':
                clipboard.pasteAsText();
                break;
            case 'additionControl':
                control.createNewControl();
                break;
            case 'cut':
                clipboard.cut();
                break;
            case 'copy':
                clipboard.copy();
                document.execCommand('copy');
                break;
            default:
                document.execCommand(command, null, null);
                break;
        }
    }
    

    function addTable() {
        let columnsEl = $('#columns');
        let linesEl = $('#lines');
        let columns = columnsEl.val() || 1;
        let lines = linesEl.val() || 1;

        let content = "<table><thead></thead><tbody>"
        for (i = 0; i < +lines; i++) {
            content += '<tr>';
            for (j = 0; j < +columns; j++) {
                content += '<td> </td>';
            }
            content += '</tr>';
        }
        content += "</tbody></table>"

        modalForTable.modal('hide');
        rangeControl.returnRange();
        document.execCommand('insertHtml', false, content);
        columnsEl.val('');
        linesEl.val('');
    }

})
