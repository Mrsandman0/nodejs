jQuery(function($) {
    var isok1 = false;
    $('.uname>input').on('blur', function() {
        // console.log(123)
        let name = $.trim($(this).val());
        if (!name) {
            $(this).next().html('用户名不能为空')
                .css('color', 'red');
        } else {
            $(this).next().html('用户名可用')
                .css('color', 'green');
            isok1 = true;
        }
    })

    var isok2 = false;
    $('.nickname>input').on('blur', function() {
        // console.log(123)
        let nickname = $.trim($(this).val());
        if (!nickname) {
            $(this).next().html('昵称不能为空')
                .css('color', 'red');
        } else {
            $(this).next().html('昵称可用')
                .css('color', 'green');
            isok2 = true;
        }
    })

    var isok3 = false;
    $('.psd>input').on('blur', function() {
        // console.log(123)
        let psd = $.trim($(this).val());
        if (psd && checkReg.psweasy(psd)) {
            $(this).next().html('密码格式正确')
                .css('color', 'green');
            isok3 = true;
        } else {
            $(this).next().html('密码格式不正确')
                .css('color', 'red');
        }
    })

    var isok4 = false;
    $('.num>input').on('blur', function() {
        // console.log(123)
        let num = $.trim($(this).val());
        if (num && checkReg['tel'](num)) {
            $.ajax({
                type: 'get',
                url: '/userlist',
                async: true,
                data: {
                    check: 4,
                    num: num
                },
                success: function(str) {
                    if (str.code == 1) {
                        $('.sex>span').html('电话号码可用')
                            .css('color', 'green');
                        isok4 = true;
                    } else {
                        $('.sex>span').html('电话号码已被占用')
                            .css('color', 'red');
                    }

                }
            })

        } else {
            $('.sex>span').html('电话号格式不正确')
                .css('color', 'red');
        }
    })

    var isok5 = false;
    $('.birthday>input').on('blur', function() {
        // console.log(123)
        let birthday = $.trim($(this).val());
        if (birthday && checkReg['birth'](birthday)) {
            $(this).next().html('生日格式正确')
                .css('color', 'green');
            isok5 = true;
        } else {
            $(this).next().html('生日格格式不正确')
                .css('color', 'red');
        }
    })

    var isok6 = false;
    $('.email>input').on('blur', function() {
        // console.log(123)
        let email = $.trim($(this).val());
        if (email && checkReg['email'](email)) {
            $(this).next().html('邮箱格式正确')
                .css('color', 'green');
            isok6 = true;
        } else {
            $(this).next().html('邮箱格式不正确')
                .css('color', 'red');
        }
    })

    $('.sub').on('click', function() {
        if (isok1 && isok2 && isok3 && isok4 && isok5 && isok6) {
            let name = $.trim($('.uname>input').val());
            let nickname = $.trim($('.nickname>input').val());
            let password = $.trim($('.psd>input').val());
            let num = $.trim($('.num>input').val());
            let sex = $.trim($('.sex>select').val());
            let birthday = $.trim($('.birthday>input').val());
            let email = $.trim($('.email>input').val());
            let msg = $.trim($('.msg>textarea').val());
            $.ajax({
                type: 'post',
                async: true,
                url: '/userlist',
                data: {
                    check: 1,
                    name: name,
                    nickname: nickname,
                    password: password,
                    num: num,
                    sex: sex,
                    birthday: birthday,
                    email: email,
                    msg: msg
                },
                success: function(str) {
                    console.log(str)
                    isok1 = false;
                    location.href = '../html/userlist.html';
                }
            })
        }
    })







})