;(function() {
    const modalForAddCtrl = $("#modalForAddCtrl");
    $('#btnAddCtrl').click(addNewControl);
    
    function Control() {
        let iconEl = $('#iconCtrl');
        let actionEl = $('#actionCtrl');
        let titleEl = $('#titleCtrl');

        this.icon = iconEl.val();
        this.action = new Function(actionEl.val());
        this.title = titleEl.val();

        iconEl.val('');
        actionEl.val('');
        titleEl.val('');
    }
    
    function createNewControl(){
        modalForAddCtrl.modal('show');
    }
    
    function addNewControl(){
        let control = new Control();
        addControl(control);
    }

    function addControl(control) {
        if (!control.icon) {
            swal ( "Ой" , "Вы забыли ввести иконку" , "error" )
            return;
        }
        let $newControl = $("<button type='button' class='btn btn-outline-dark'></button>");

        $newControl.attr("title", control.title);
        $newControl.click(control.action);
        $newControl.html("<i class='fa fa-" + control.icon + "'></i>");

        $('.panel-btns').append($newControl);
        modalForAddCtrl.modal('hide');
    }
    
    window.control = {
        addControl: addControl,
        createNewControl: createNewControl
    }
})();