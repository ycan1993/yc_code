$(function () {
  getUserInfo()
  //退出
  $('#btnLogout').on('click', function () {
    var layer = layui.layer
    layer.confirm('是否确定退出?', {
      icon: 3,
      title: '提示'
    }, function (index) {
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index);
    });
  })
})
//获取信息
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      renderAvatar(res.data)
    },
    complete: function (res) {
      // console.log(res.responseJSON);
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        localStorage.removeItem('token')
        location.href = '/login.html'
      }
    }
  })
}
//渲染头像
function renderAvatar(user) {
  var name = user.nickname || user.username
  $('.welcome').html('欢迎&nbsp;&nbsp;&nbsp;' + name)
  //用户头像
  if (user.user_pic !== null) {
    //有头像
    $('.layui-nav-img').show().attr('src', user.user_pic)
    $('.user_avatar').hide()
  } else {
    //没头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.user_avatar').show().html(first)
  }
}