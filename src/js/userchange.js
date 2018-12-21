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
            let res = str.data;
            console.log(res);
            $('.uname>input').val(res.name);
            $('.nickname>input').val(res.nickname);
            $('.psd>input').val(res.password);
            $('.num>input').val(res.phnum);
            $('.sex>select').val(res.male);
            $('.birthday>input').val(res.birthday);
            $('.email>input').val(res.email);
            $('.msg>textarea').val(res.msg);
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            console.log(XMLHttpRequest.status + ":" + XMLHttpRequest.statusText);
        }
    })



    var isok1 = true;
    $('.uname>input').on('blur', function() {
        // console.log(123)
        let name = $.trim($(this).val());
        if (!name) {
            $(this).next().html('用户名不能为空')
                .css('color', 'red');
            isok1 = false;
        } else {
            $(this).next().html('用户名可用')
                .css('color', 'green');
            isok1 = true;
        }
    })

    var isok2 = true;
    $('.nickname>input').on('blur', function() {
        // console.log(123)
        let nickname = $.trim($(this).val());
        if (!nickname) {
            $(this).next().html('昵称不能为空')
                .css('color', 'red');
            isok2 = false;
        } else {
            $(this).next().html('昵称可用')
                .css('color', 'green');
            isok2 = true;
        }
    })

    var isok3 = true;
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
            isok3 = false;
        }
    })

    var isok4 = true;
    $('.num>input').on('blur', function() {
        // console.log(123)
        let num = $.trim($(this).val());
        if (num && checkReg['tel'](num)) {
            $('.sex>span').html('电话号格式正确')
                .css('color', 'green');
            isok4 = true;
        } else {
            $('.sex>span').html('电话号格式不正确')
                .css('color', 'red');
            isok4 = false;
        }
    })

    var isok5 = true;
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
            isok5 = false;
        }
    })

    var isok6 = true;
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
            isok6 = false;
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
                    check: 3,
                    id: id,
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
                    console.log(str);
                }
            })
        }
    })




})