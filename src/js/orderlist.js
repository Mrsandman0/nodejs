    jQuery(function($) {
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
        $('.olist').addClass('layui-this');
        $('.gcategory').on('click', function() {
            location.href = '../html/goodsCategory.html'
        })
        $('.gadd').on('click', function() {
            location.href = '../html/goodsAdd.html';
        })
        $('.uadd').on('click', function() {
            location.href = '../html/userAdd.html';
        })
        $('.glist').on('click', function() {
            location.href = '../html/goodslist.html';
        })
        $('.ulist').on('click', function() {
            location.href = '../html/userlist.html';
        })



        $.ajax({
            type: 'get',
            async: true,
            url: '/orderlist',
            data: {
                check: 2
            },
            success: (str) => {
                console.log(str.data);
                let res = str.data.map((item) => {
                    return `<tr style="height: 37px; text-align:center;">
                                    <td><input type="checkbox"></td>
                                    <td>${item.id}</td>
                                    <td>${item.goodsname}</td>
                                    <td>${item.newprice}</td>
                                    <td>${item.num}</td>
                                    <td>${item.transportCosts}</td>
                                    <td>${item.goodstotal}</td>
                                    <td>${item.ordernum}</td>
                                    <td>${item.time}</td>
                                    <td><i class="iconfont icon-shanchu del"></i></td>
                                 </tr>`
                }).join('');
                $('.layui-body table tbody').html(res);

            }
        })



        //全选  全不选
        var isok = true;
        $('.layui-body table>thead input').on('click', function() {
            // console.log(isok)
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
            // console.log(this)
            let id = $(this).parent().parent().children().eq(1).html();
            // console.log(id)
            let really = confirm('您确定要删除这行数据吗?');
            if (really) {
                let check = 1;
                $(this).parent().parent().remove();
                $.ajax({
                    type: 'get',
                    url: '/orderlist',
                    async: true,
                    data: {
                        check: check,
                        id: id
                    },
                    success: function(str) {
                        console.log(str)
                        console.log(123)
                    }
                })
            }
        })

        //删除多条
        $('.delall a').on('click', function() {
            // console.log(123)
            let len = $('tbody>tr').size();
            // console.log(len)
            let arr = [];
            let really = confirm('您确定要删除这行数据吗?');
            if (really) {
                for (var i = 0; i < len; i++) {
                    console.log(123)
                    if ($('tbody>tr').eq(i).find('input').prop('checked')) {
                        // console.log(123)
                        var id = $('tbody>tr').eq(i).children().eq(1).html();
                        arr.push(id);
                        $('tbody>tr').eq(i).remove();
                    }
                }
                $.ajax({
                    type: 'get',
                    async: true,
                    url: '/orderlist',
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

        //根据id升序排列
        $('thead .idsort>i').eq(0).on('click', function() {
            console.log(123)
            $.ajax({
                type: 'get',
                async: true,
                url: '/orderlist',
                data: {
                    check: 4
                },
                success: function(str) {
                    console.log(str);
                    let res = str.data.map((item) => {
                        return `<tr style="height: 37px; text-align:center;">
                                    <td><input type="checkbox"></td>
                                    <td>${item.id}</td>
                                    <td>${item.goodsname}</td>
                                    <td>${item.newprice}</td>
                                    <td>${item.num}</td>
                                    <td>${item.transportCosts}</td>
                                    <td>${item.goodstotal}</td>
                                    <td>${item.ordernum}</td>
                                    <td>${item.time}</td>
                                    <td><i class="iconfont icon-shanchu del"></i></td>
                                 </tr>`
                    }).join('');
                    $('.layui-body table tbody').html(res);
                }
            })
        })

        //根据id降序排列
        $('thead .idsort>i').eq(1).on('click', function() {
            console.log(123)
            $.ajax({
                type: 'get',
                async: true,
                url: '/orderlist',
                data: {
                    check: 5
                },
                success: function(str) {
                    console.log(str);
                    let res = str.data.map((item) => {
                        return `<tr style="height: 37px; text-align:center;">
                                    <td><input type="checkbox"></td>
                                    <td>${item.id}</td>
                                    <td>${item.goodsname}</td>
                                    <td>${item.newprice}</td>
                                    <td>${item.num}</td>
                                    <td>${item.transportCosts}</td>
                                    <td>${item.goodstotal}</td>
                                    <td>${item.ordernum}</td>
                                    <td>${item.time}</td>
                                    <td><i class="iconfont icon-shanchu del"></i></td>
                                 </tr>`
                    }).join('');
                    $('.layui-body table tbody').html(res);
                }
            })
        })


    })