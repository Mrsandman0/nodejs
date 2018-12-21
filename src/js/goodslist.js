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







})