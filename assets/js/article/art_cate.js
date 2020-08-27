$(function () {

  initArtCateList()
  //获取列表
  function initArtCateList() {
    $.ajax({
      url: '/my/article/cates',
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        var htmlStr = template('tpl-art-cate', res)
        $('tbody').html(htmlStr)
      }
    })
  }
  var indexAdd = null
  $('#btnAdd').click(function () {
    indexAdd = layer.open({
      title: '添加文章分类',
      type: 1,
      content: $('#dialog-add').html(),
      area: ['500px', '260px']
    })
  })
  //代理类别确认添加
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        initArtCateList()
        layer.msg('恭喜，添加成功')
        layer.close(indexAdd)
      }
    })
  })
  //编辑点击事件
  $('tbody').on('click', '.btn-edit', function () {
    indexAdd = layer.open({
      title: '修改文章分类',
      type: 1,
      content: $('#dialog-edit').html(),
      area: ['500px', '260px']
    })
    Id = $(this).attr('data-id')
    $.ajax({
      url: '/my/article/cates/' + Id,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }

        layui.form.val('form_edit', res.data)
      }
    })

  })
  //代理 确认修改 点击事件 
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg("恭喜您，修改成功！")
        initArtCateList()
        layer.close(indexAdd)
      }
    })
  })
  //点击删除
  $('tbody').on('click', '.btn-delete', function () {
    var Id = $(this).attr('data-id')
    layer.confirm('确定删除?', {
      icon: 3,
      title: '提示'
    }, function (index) {
      //do something
      $.ajax({
        url: '/my/article/deletecate/' + Id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg('恭喜，删除成功')
          initArtCateList()
        }
      })
      layer.close(index);
    })
  })

})