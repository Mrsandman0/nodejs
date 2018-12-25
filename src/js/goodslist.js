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
    });







})