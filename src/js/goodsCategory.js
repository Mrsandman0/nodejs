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
      $('.layui-header .exit').on('click', function() {
          localStorage.removeItem("token");
          location.href = '../html/login.html';
      })
      $('.gcategory').addClass('layui-this');
      $('.glist').on('click', function() {
          location.href = '../html/goodslist.html'
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


      $.ajax({
              type: 'get',
              async: true,
              url: '/goodsCategory',
              data: {
                  check: 2
              },
              success: (str) => {
                  let res = str.data.map((item) => {
                      return `<tr style="height: 37px; text-align:center;">
                                    <td><input type="checkbox"></td>
                                    <td>${item.id}</td>
                                    <td>${item.name}</td>
                                    <td>${item.time}</td>
                                    <td>
                                        <i class="iconfont icon-caozuo change"></i>
                                        <i class="iconfont icon-shanchu del"></i>
                                    </td>
                                </tr>`
                  }).join('');
                  $('tbody').html(res);
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
          let id = $(this).parent().parent().children().eq(1).html();
          let really = confirm('您确定要删除这行数据吗?');
          if (really) {
              let check = 1;
              $(this).parent().parent().remove();
              $.ajax({
                  type: 'get',
                  url: '/goodsCategory',
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
      $('.box>span').eq(1).on('click', function() {
          let really = confirm('您确定要删除这行数据吗?');
          let arr = [];
          if (really) {
              for (var i = $('tbody>tr').size() - 1; i >= 0; i++) {
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
                  url: '/goodsCategory',
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
          location.href = '../html/categorychange.html?id=' + id;
      })

      //添加
      $('.box>span').eq(0).on('click', function() {
          location.href = '../html/categoryadd.html';
      })











  })