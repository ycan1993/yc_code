$(function () {
  $('#link_reg').on('click', function () {
    $('.login_box').hide()
    $('.reg_box').show()
  })
  $('#link_login').on('click', function () {
    $('.login_box').show()
    $('.reg_box').hide()
  })
})
//自定义验证规则
var form = layui.form
var layer = layui.layer
form.verify({
  pwd: [/^[\S]{6,16}$/, '密码必须6到16位，且不能出现空格'],
  repwd: function (value) {
    var pwd = $('.reg_box [name=password]').val()
    if (value !== pwd) {
      return '两次密码不一致'
    }
  }
})
//注册功能
$('#form_reg').on('submit', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'post',
    url: '/api/reguser',
    data: {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    },
    success: function (res) {
      // console.log(res)
      if (res.status != 1) {
        return layer.msg('用户名被占用，请更换其他用户名！');
      }
      layer.msg('注册成功，请登入')
      $('#link_login').click()
      $('#form_reg')[0].reset()
    }
  })
})
//登录功能
$('#form_login').submit(function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/api/login',
    data: $(this).serialize(),
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('恭喜，登入成功')
      localStorage.setItem('token', res.token)
      location.href = '/index.html'
    }
  })
})