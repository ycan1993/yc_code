$(function () {
  // 1,校验
  var form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码6-12，且不能空格"],
    //新旧不重复
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '原旧密码不能相同'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次新密码不一致'
      }
    }
  })
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        layui.layer.msg('修改密码成功')
        $('.layui-form')[0].reset()
      }
    })
  })
})