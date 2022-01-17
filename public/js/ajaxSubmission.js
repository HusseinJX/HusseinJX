function ajaxSubmit(e, form, data, callBackFunction) {
    if (form.valid()){
        e.preventDefault();
        var action = form.attr('action');
        // console.log(form2);
        $.ajax({
            type: 'POST', 
            url: action, 
            dataType: 'json',
            data: data,
            success: function(response){
                if (response.status){
                    toastr.success(response.notification);
                    if(form.attr('class') === 'ajaxDeleteForm'){
                        $('#alert-model').modal('toggle');
                    }else{
                        $('#alert-model').modal('hide');
                    }
                    callBackFunction();
                }else{
                    toastr.error(response.notification);
                }
            }
        });
    }else{
        toastr.error(response.notification);
    }
    $('#right-model').modal('hide');
}