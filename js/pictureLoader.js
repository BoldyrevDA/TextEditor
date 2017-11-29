;(function() {
    const modalForPicture = $("#modalForPicture");
     $('#insImage').change(loadImages);
    let rangeControl = new RangeControl($("#editor"));
    
    function openModal(){
        rangeControl.saveRange();
        modalForPicture.modal('show');
    }
    
     function loadImages(evt) {
        var file = evt.target.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            rangeControl.returnRange();
            document.execCommand('insertImage', null, e.target.result);
            modalForPicture.modal('hide');
            evt.target.value = "";
        };
        reader.readAsDataURL(file);
    }
    
    window.loadPicture = {openModal: openModal}
    
})();