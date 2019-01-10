jQuery(function($) {
    let token = localStorage.getItem("token");
    $.ajax({
        type: 'post',
        headers: {
            'token': token,
        },
        url: '/verify/check',
        async: true,
        success: function(str) {
            console.log(str.states);
            if (!str.states) {
                location.href = '../html/login.html';
            }
        }
    })
    $('.layui-header .exit').on('click', function() {
        localStorage.removeItem("token");
        location.href = '../html/login.html';
    })

    $('.down a').on('click', function() {
        let name = $('.top input').val();
        let msg = $('.mid textarea').val();
        $.ajax({
            type: 'get',
            async: true,
            url: '/goodsCategory',
            data: {
                check: 5,
                name: name,
                msg: msg
            },
            success: function(str) {
                if (str.code == 1) {
                    location.href = '../html/goodsCategory.html';
                }
            }
        })
    })
})