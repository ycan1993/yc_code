$(function () {
  var form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度为1-6之间'
      }
    }
  })
  initUserInfo()
  var layer = layui.layer;

  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // console.log(res.data);
        form.val('formUserInfo', res.data)
      }
    })
  }
  //重置
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    // $('.layui-form')[0].reset()
    initUserInfo()
  })
  //修改用户信息
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('修改信息成功')
        window.parent.getUserInfo()
      }
    })
  })
})