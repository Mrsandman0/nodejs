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
        // console.log(123)
    $('.layui-header .exit').on('click', function() {
        localStorage.removeItem("token");
        location.href = '../html/login.html';
    })
    $('.gadd').addClass('layui-this');
    $('.glist').on('click', function() {
        location.href = '../html/goodslist.html'
    })
    $('.gcategory').on('click', function() {
        location.href = '../html/goodsCategory.html';
    })
    $('.ulist').on('click', function() {
        location.href = '../html/userlist.html';
    })
    $('.uadd').on('click', function() {
        location.href = '../html/userAdd.html';
    })
    $('.olist').on('click', function() {
        location.href = '../html/orderlist.html';
    })

    let id = (location.search).slice(1).split('=')[1];

    //商品种类渲染
    $.ajax({
        type: 'get',
        url: '/goodsCategory',
        async: true,
        data: {
            check: 6
        },
        success: function(str) {
            console.log(str)
            if (str.code == 1) {
                let res = str.data.map(function(item) {
                    return `<option value = "${item.name}" > </option>`
                }).join('');
                $('#books').html(res);
                // console.log(res);
            }
        }
    })

    $.ajax({
        type: 'post',
        async: true,
        url: '/goodslist',
        data: {
            check: 2,
            id: id
        },
        success: function(str) {
            let res = str.data;
            $('.goodsname>input').val(res.name);
            $('.oldpic>input').val(res.oldprice);
            $('.newpic>input').val(res.newprice);
            $('.goodssort>input').val(res.catagory);
            $('.goodsnum>input').val(res.num);
            $('.goodsdescribe>textarea').val(res.msg);
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            console.log(XMLHttpRequest.status + ":" + XMLHttpRequest.statusText);
        }
    })

    var isok1 = true;
    $('.goodsname>input').on('blur', function() {
        let goodsname = $.trim($(this).val());
        if (!goodsname) {
            $(this).next().html('商品名称不能为空')
                .css('color', 'red');
            isok1 = false;
        } else {
            $(this).next().html('商品名称可用')
                .css('color', 'green');
            isok1 = true;
        }
    })
    var isok2 = true;
    $('.oldpic>input').on('blur', function() {
        let oldpic = $.trim($(this).val());
        if (!oldpic || isNaN(oldpic)) {
            $('.text').html('价格不能为空且只能为数字')
                .css('color', 'red');
            isok2 = false;
        } else {
            $('.text').html('格式正确')
                .css('color', 'green');
            isok2 = true;
        }
    })
    var isok3 = true;
    $('.newpic>input').on('blur', function() {
        let newpic = $.trim($(this).val());
        if (!newpic || isNaN(newpic)) {
            $('.text').html('价格不能为空且只能为数字')
                .css('color', 'red');
            isok3 = false;
        } else {
            $('.text').html('格式正确')
                .css('color', 'green');
            isok3 = true;
        }
    })

    var isok4 = true;
    $('.goodssort>input').on('blur', function() {
        let goodssort = $.trim($(this).val());
        if (!goodssort) {
            $('.category').html('商品分类不能为空')
                .css('color', 'red');
            isok4 = false;
        } else {
            $('.category').html('格式正确')
                .css('color', 'green');
            isok4 = true;
        }
    })
    var isok5 = true;
    $('.goodsnum>input').on('blur', function() {
        let goodsnum = $.trim($(this).val());
        if (!goodsnum || isNaN(goodsnum) || goodsnum % 1 !== 0 || goodsnum <= 0) {
            $(this).next().html('价格不能为空且只能为大于0的整数')
                .css('color', 'red');
            isok5 = false;

        } else {
            $(this).next().html('格式正确')
                .css('color', 'green');
            isok5 = true;
        }
    })




    $('.submit>a').on('click', function() {
        // console.log(123)
        if (isok1 && isok2 && isok3 && isok4 && isok5) {
            isok1 = false;
            let goodsname = $.trim($('.goodsname>input').val());
            let oldpic = $.trim($('.oldpic>input').val());
            let newpic = $.trim($('.newpic>input').val());
            let goodssort = $.trim($('.goodssort>input').val());
            let goodsnum = $.trim($('.goodsnum>input').val());
            let msg = $.trim($('.goodsdescribe>textarea').val());
            // console.log(goodsname, oldpic, newpic, goodssort, goodsnum, msg)
            $.ajax({
                type: 'get',
                url: '/goodsCategory',
                async: true,
                data: {
                    check: 7,
                    name: goodssort
                },
                success: function(str) {
                    console.log(str)
                    if (str.code == 1 || str.code == 2) {
                        $.ajax({
                            type: 'post',
                            async: true,
                            url: '/goodslist',
                            data: {
                                check: 1,
                                id: id,
                                goodsname: goodsname,
                                oldpic: oldpic,
                                newpic: newpic,
                                goodssort: goodssort,
                                goodsnum: goodsnum,
                                msg: msg
                            },
                            success: function(str) {
                                // console.log(str);
                                if (str.code == 1) {
                                    location.href = '../html/goodslist.html';
                                } else {
                                    alert('操作失败');
                                }
                            }
                        })
                    }
                }
            })

        }
    })

})