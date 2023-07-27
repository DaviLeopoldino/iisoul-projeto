function alert_page(title,message,type){

    var icon;
    switch (type) {
        case 'success':
          icon = 'bi bi-emoji-wink';
          break;
        case 'danger':
            icon ='bi bi-emoji-frown';
            break;
        case 'info':
            icon ='bi bi-emoji-smile-upside-down';
          break;
        case 'warning':
            icon ='bi bi-emoji-neutral';
          break;
        
        
    }

    $.notify({
        // options
        icon: icon,
        title: '<strong>'+title+'</strong>',
        message: '<br>'+message,
        url: '',
        target: '_blank'
    },{
        // settings
        element: 'body',
        position: null,
        type: type,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1060,
        delay: 5000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        
    });

}