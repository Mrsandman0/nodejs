jQuery(function($) {
    $('.login_head>ul>li>.login_head_num').html(randomNum());
    $('.login_head>ul>li>.login_head_change').on('click', function() {
        $('.login_head>ul>li>.login_head_num').html(randomNum());
    })

    //登录
    $('.login_head ul>li:last a').on('click', () => {
        let username = $('.login_head ul>li:first input').val();
        let password = $('.login_head ul>li:eq(1) input').val();
        let code = $('.login_head ul>li:eq(2) input').val();
        let numCode = $('.login_head .login_head_num').html();
        if (code.toLowerCase() == numCode.toLowerCase()) {
            //登录加密
            $.ajax({
                type: 'post',
                async: 'ture',
                url: '/verify',
                data: {
                    'username': username,
                    'password': password
                },
                success: function(str) {
                    console.log(str);
                    if (str.code == 1) {
                        let token = str.data;

                        localStorage.setItem("token", token);
                        // let now = new Date();
                        // now.setDate(now.getDate() + 1);
                        // Cookie.set('token', token, { 'expires': now, 'path': '/' });
                        // console.log(Cookie.get('token'));
                        location.href = '../html/goodslist.html';
                    } else {
                        $('.login_head>ul>li:eq(3)>p').html('用户名或密码错误');
                    }

                }
            })

            // $.ajax({
            //     type: 'post',
            //     async: 'ture',
            //     url: '/login',
            //     data: {
            //         'username': username,
            //         'password': password
            //     },
            //     success: (data) => {
            //         // let data = JSON.parse(str);
            //         console.log(data);
            //         if (data.code == 1) {
            //             let now = new Date();
            //             now.setDate(now.getDate() + 7);
            //             Cookie.set('username', username, { 'expires': now, 'path': '/' }); //
            //             location.href = '../html/goodslist.html';
            //         }
            //     },
            //     error: (XMLHttpRequest, textStatus, errorThrown) => {
            //         console.log(XMLHttpRequest.status + ":" + XMLHttpRequest.statusText);
            //     }

            // })
        } else {
            $('.login_head>ul>li:eq(3)>p').html('您输入的验证码不一致');
        }

    })

    //随机数
    function randomNum() {
        var str1 = '';
        var str = '0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ';
        for (var i = 0; i < 4; i++) {
            str1 += str[parseInt(Math.random() * 62)];
        }
        return str1;
    }

});