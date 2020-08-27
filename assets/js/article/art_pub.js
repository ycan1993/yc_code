$(function () {
  var form = layui.form
  //获取文章分类
  initCate()
  // 初始化富文本编辑器
  initEditor()
  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  function initCate() {
    $.ajax({
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        // console.log(res);
        var htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        form.render()
      }

    })
  }
  // 点击选择封面
  $('#btnChooseImage').click(function () {
    $('#coverFile').click()
  })
  // 监听coverFile的change事件
  $('#coverFile').change(function (e) {
    var file = this.files[0] //file 为选择的文件
    // console.log(file);
    if (this.files.length == 0) {
      return
    }
    var newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
  // 设置状态
  var art_state = '已发布'
  $('#btnSave2').click(function () {
    art_state = '草稿'
  })
  // 表单注册提交事件
  $('#form-pub').on('submit', function (e) {
    e.preventDefault()
    var fd = new FormData(this)
    fd.append('state', art_state)
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append('cover_img', blob)
        // 发送请求，添加文章
        publishArticle(fd)

      })
  })
  // 发表文章
  function publishArticle(fd) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('恭喜，发布成功')
        // location.href = '/article/art_list.html'
        setTimeout(function () {
          window.parent.document.querySelector('#art_list').click()
        }, 2000)
      }
    })
  }
})