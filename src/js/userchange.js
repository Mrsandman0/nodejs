jQuery(function($) {
    let id = (location.search).slice(1).split('=')[1];
    console.log(id)
    $.ajax({
        type: 'post',
        async: true,
        url: '/userlist',
        data: {
            check: 2,
            id: id
        },
        success: function(str) {
            console.log(str);
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            console.log(XMLHttpRequest.status + ":" + XMLHttpRequest.statusText);
        }
    })





})