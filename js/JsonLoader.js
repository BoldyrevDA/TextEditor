class JsonLoader {

    constructor() {}
    
    loadContent(evt) {
        var file = evt.target.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            try {
                let jsonData = JSON.parse(e.target.result);
                $("#editor").focus();
                document.execCommand("selectAll");
                document.execCommand("insertHtml", false, jsonData.content);
            } catch (e) {
                swal ( "" , "Файл должен быть формата json и содержать content" , "error" );
            }
            evt.target.value = "";
        };

        reader.onerror = function (event) {
            console.error("Файл не может быть прочитан! Код: " + event.target.error.code);
        }
        reader.readAsText(file);
    }
    
    saveContent() {
        let content = $("#editor").html();
        let jsonData = {
            "content": content
        };
        let file = new File([JSON.stringify(jsonData)], {
            'type': 'json'
        });
        this.href = window.URL.createObjectURL(file);
        this.download = 'savedContent.json';
    }
    
    
}