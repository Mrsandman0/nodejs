jQuery(function($) {
    let id = (location.search).slice(1).split('=')[1];
    console.log(id)
    $('.down a').on('click', function() {
        let name = $('.top input').val();
        let msg = $('.mid textarea').val();
        $.ajax({
            type: 'get',
            async: true,
            url: '/goodsCategory',
            data: {
                id: id,
                check: 4,
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