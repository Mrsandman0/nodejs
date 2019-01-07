$(function() {

    if (!Cookie.get('username')) {
        location.href = '../html/login.html';
    }
    console.log(123)
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

    //数据渲染
    var check = 1;
    $.ajax({
        type: "get",
        url: "/goodslist",
        data: {
            check: check,
            curr: 1,
            nums: 10
        },
        async: true,
        success: function(str) {
            console.log(str)
                // let res = str.data.map(function(item) {
                //     return ` <tr style="height: 37px; text-align:center;">
                //                 <td><input type="checkbox"></td>
                //                 <td>${item.id}</td>
                //                 <td>${item.name}</td>
                //                 <td>${item.catagory}</td>
                //                 <td>${item.oldprice}</td>
                //                 <td>${item.newprice}</td>
                //                 <td>${item.num}</td>
                //                 <td>${item.status}</td>
                //                 <td>${item.time}</td>
                //                 <td>
                //                     <i class="iconfont icon-caozuo"></i>
                //                     <i class="iconfont icon-shanchu"></i>
                //                 </td>
                //             </tr>`
                // }).join('');
                // $('tbody').html(res);
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
    $('.title_down ul').on('click', 'li', function() {
        num = $(this).html();
        $('.title_down ul>li').removeClass('li_active');
        $('.title_down ul>li').eq($(this).index()).attr('class', 'li_active');
        $.ajax({
            type: "get",
            url: '/goodslist',
            async: true,
            data: {
                check: 1,
                curr: num,
                nums: 10
            },
            success: function(str) {
                // let res = str.data.map(function(item) {
                //     return ` <tr style="height: 37px; text-align:center;">
                //                 <td><input type="checkbox"></td>
                //                 <td>${item.id}</td>
                //                 <td>${item.name}</td>
                //                 <td>${item.catagory}</td>
                //                 <td>${item.oldprice}</td>
                //                 <td>${item.newprice}</td>
                //                 <td>${item.num}</td>
                //                 <td>${item.status}</td>
                //                 <td>${item.time}</td>
                //                 <td>
                //                     <i class="iconfont icon-caozuo"></i>
                //                     <i class="iconfont icon-shanchu"></i>
                //                 </td>
                //             </tr>`
                // }).join('');
                // $('tbody').html(res);
                list(str);
                $('.title_down>span').html('共' + str.count + '条记录' + num + '/' + page + '页');
            }
        })
    })

    //文字下一页
    var page = 1;
    $('.title_down>div>.next').on('click', function() {
        // console.log(123)
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
                check: 1,
                curr: num,
                nums: 10
            },
            success: function(str) {
                // let res = str.data.map(function(item) {
                //     return ` <tr style="height: 37px; text-align:center;">
                //                 <td><input type="checkbox"></td>
                //                 <td>${item.id}</td>
                //                 <td>${item.name}</td>
                //                 <td>${item.catagory}</td>
                //                 <td>${item.oldprice}</td>
                //                 <td>${item.newprice}</td>
                //                 <td>${item.num}</td>
                //                 <td>${item.status}</td>
                //                 <td>${item.time}</td>
                //                 <td>
                //                     <i class="iconfont icon-caozuo"></i>
                //                     <i class="iconfont icon-shanchu"></i>
                //                 </td>
                //             </tr>`
                // }).join('');
                // $('tbody').html(res);
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
                check: 1,
                curr: num,
                nums: 10
            },
            success: function(str) {
                // let res = str.data.map(function(item) {
                //     return ` <tr style="height: 37px; text-align:center;">
                //                 <td><input type="checkbox"></td>
                //                 <td>${item.id}</td>
                //                 <td>${item.name}</td>
                //                 <td>${item.catagory}</td>
                //                 <td>${item.oldprice}</td>
                //                 <td>${item.newprice}</td>
                //                 <td>${item.num}</td>
                //                 <td>${item.status}</td>
                //                 <td>${item.time}</td>
                //                 <td>
                //                     <i class="iconfont icon-caozuo"></i>
                //                     <i class="iconfont icon-shanchu"></i>
                //                 </td>
                //             </tr>`
                // }).join('');
                // $('tbody').html(res);
                list(str);
                $('.title_down>span').html('共' + str.count + '条记录' + num + '/' + page + '页');
                $('.title_down ul>li').removeClass('li_active');
                $('.title_down ul>li').eq(num - 1).attr('class', 'li_active');
            }
        })

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
                            <i class="iconfont icon-caozuo"></i>
                            <i class="iconfont icon-shanchu"></i>
                        </td>
                    </tr>`
        }).join('');
        $('tbody').html(res);
    }





})