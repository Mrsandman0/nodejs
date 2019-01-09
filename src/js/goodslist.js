$(function() {

    if (!Cookie.get('username')) {
        location.href = '../html/login.html';
    }
    $('.layui-header .exit').on('click', function() {
        console.log(1233)
        let now = new Date();
        now.setDate(now.getDate() - 1);
        Cookie.set('username', Cookie.get('username'), { 'expires': now, 'path': '/' }); //
        location.href = '../html/login.html';
    })
    $('.glist').addClass('layui-this');
    $('.gcategory').on('click', function() {
        location.href = '../html/goodsCategory.html'
    })
    $('.gadd').on('click', function() {
        location.href = '../html/goodsAdd.html';
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

    //搜索渲染
    $.ajax({
            type: 'get',
            url: '/goodsCategory',
            async: true,
            data: {
                check: 6
            },
            success: function(str) {
                if (str.code == 1) {
                    let res = str.data.map(function(item) {
                        return `<option value = "${item.name}" > </option>`
                    }).join('');
                    $('#cars').html(res);
                    // console.log(res);
                }
            }
        })
        // 数据渲染
    $.ajax({
        type: "get",
        url: "/goodslist",
        data: {
            check: 1,
            curr: 1,
            nums: 10
        },
        async: true,
        success: function(str) {
            list(str);
            //创建页数
            page = Math.ceil(str.count / 10);
            var li = '';
            for (var i = 0; i < page; i++) {
                li += `<li>${i+1}</li>`;
            }
            $('.title_down ul').html(li);
            $('.title_down ul>li:first').attr('class', 'li_active'); //给第一页添加高亮
            $('.title_down>span').html('共' + str.count + '条记录' + '1' + '/' + page + '页');
        }
    });



    var num = 1;
    var check = 1;
    var page = 1;
    //数字页数跳转
    $('.title_down ul').on('click', 'li', function() {
        num = $(this).html();
        let content = $('#myCar').val();
        let query = $('#dim').val();
        $('.title_down ul>li').removeClass('li_active');
        $('.title_down ul>li').eq($(this).index()).attr('class', 'li_active');
        $.ajax({
            type: "get",
            url: '/goodslist',
            async: true,
            data: {
                query: query,
                content: content,
                check: check,
                curr: num,
                nums: 10
            },
            success: function(str) {
                list(str);
                $('.title_down>span').html('共' + str.count + '条记录' + num + '/' + page + '页');
            }
        })
    })

    //文字下一页

    $('.title_down>div>.next').on('click', function() {
        // console.log(check)
        let query = $('#dim').val();
        let content = $('#myCar').val();
        num++;
        if (num > page) {
            num = page;
            return
        }
        $.ajax({
            type: "get",
            url: '/goodslist',
            async: true,
            data: {
                query: query,
                content: content,
                check: check,
                curr: num,
                nums: 10
            },
            success: function(str) {
                console.log(str);
                list(str);
                $('.title_down>span').html('共' + str.count + '条记录' + num + '/' + page + '页');
                $('.title_down ul>li').removeClass('li_active');
                $('.title_down ul>li').eq(num - 1).attr('class', 'li_active');
            }
        })

    })

    //文字上一页
    $('.title_down>div>.prev').on('click', function() {
        console.log(num)
        let content = $('#myCar').val();
        let query = $('#dim').val();
        num--;
        if (num < 1) {
            num = 1;
            return
        }

        $.ajax({
            type: "get",
            url: '/goodslist',
            async: true,
            data: {
                query: query,
                content: content,
                check: check,
                curr: num,
                nums: 10
            },
            success: function(str) {
                list(str);
                $('.title_down>span').html('共' + str.count + '条记录' + num + '/' + page + '页');
                $('.title_down ul>li').removeClass('li_active');
                $('.title_down ul>li').eq(num - 1).attr('class', 'li_active');
            }
        })

    })

    //搜索功能
    $('.box>.search').on('click', function() {
        num = 1;
        let content = $('#myCar').val();
        if (content) {
            check = 2;
            console.log(123)
            $.ajax({
                type: "get",
                url: '/goodslist',
                async: true,
                data: {
                    content: content,
                    check: check,
                    curr: num,
                    nums: 10
                },
                success: function(str) {
                    list(str);
                    page = Math.ceil(str.count / 10);
                    var li = '';
                    for (var i = 0; i < page; i++) {
                        li += `<li>${i+1}</li>`;
                    }
                    $('.title_down ul').html(li);
                    $('.title_down ul>li:first').attr('class', 'li_active'); //给第一页添加高亮
                    $('.title_down>span').html('共' + str.count + '条记录' + '1' + '/' + page + '页');
                }
            })
        }
    })


    //模糊查询
    $('.box>.query').on('click', function() {
        num = 1;
        let query = $('#dim').val();
        if (query) {
            check = 5;
            $.ajax({
                type: "get",
                url: '/goodslist',
                async: true,
                data: {
                    query: query,
                    check: check,
                    curr: num,
                    nums: 10
                },
                success: function(str) {
                    list(str);
                    page = Math.ceil(str.count / 10);
                    var li = '';
                    for (var i = 0; i < page; i++) {
                        li += `<li>${i+1}</li>`;
                    }
                    $('.title_down ul').html(li);
                    $('.title_down ul>li:first').attr('class', 'li_active'); //给第一页添加高亮
                    $('.title_down>span').html('共' + str.count + '条记录' + '1' + '/' + page + '页');
                }
            })
        }
    })


    //表格渲染封装
    function list(str) {
        let res = str.data.map(function(item) {
            return ` <tr style="height: 37px; text-align:center;">
                        <td><input type="checkbox"></td>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.catagory}</td>
                        <td>${item.oldprice}</td>
                        <td>${item.newprice}</td>
                        <td>${item.num}</td>
                        <td>${item.status}</td>
                        <td>${item.time}</td>
                        <td>
                            <i class="iconfont icon-caozuo change"></i>
                            <i class="iconfont icon-shanchu del"></i>
                        </td>
                    </tr>`
        }).join('');
        $('tbody').html(res);
    }

    //全选
    var isok = true;
    $('.layui-body table>thead input').on('click', function() {
        if (isok) {
            $(this).prop('checked', 'checked');
            $('.layui-body table>tbody input').prop('checked', 'checked');
        } else {
            $(this).removeAttr('checked', 'checked');
            $('.layui-body table>tbody input').removeAttr('checked', 'checked');
        }
        isok = !isok;
    })

    //删除单个
    $('tbody').on('click', '.del', function() {
        let id = $(this).parent().parent().children().eq(1).html();
        let really = confirm('您确定要删除这行数据吗?');
        if (really) {
            $(this).parent().parent().remove();
            $.ajax({
                type: 'get',
                url: '/goodslist',
                async: true,
                data: {
                    check: 4,
                    id: id
                },
                success: function(str) {}
            })
        }
    })


    //删除多条
    $('.box>span').eq(1).on('click', function() {
        let really = confirm('您确定要删除这行数据吗?');
        let arr = [];
        if (really) {
            for (var i = $('tbody>tr').size() - 1; i >= 0; i--) {
                if ($('tbody>tr').eq(i).find('input').prop('checked')) {
                    var id = $('tbody>tr').eq(i).children().eq(1).html();
                    arr.push(id);
                    $('tbody>tr').eq(i).remove();
                }
            }
            $.ajax({
                type: 'get',
                async: true,
                url: '/goodslist',
                data: {
                    check: 3,
                    arr: JSON.stringify(arr)
                },
                success: function(str) {
                    console.log(str);
                }
            })
        }
    })

    //修改
    $('tbody').on('click', '.change', function() {
        let id = $(this).parent().parent().children().eq(1).html();
        location.href = '../html/goodschange.html?id=' + id;
    })

    //添加
    $('.box>span').eq(0).on('click', function() {
        location.href = '../html/goodsAdd.html';
    })


})