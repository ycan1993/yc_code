$(function () {
  var laypage = layui.laypage
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  // 初始化表格列表
  initTable()
  // 初始化分类列表
  initCate()
  //定义时间过滤器
  template.defaults.imports.dateFormat = function (dtStr) {
    var dt = new Date(dtStr)
    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())
    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }
  // 补0
  function padZero(num) {
    return num > 9 ? num : '0' + num
  }
  // 初始化表格列表
  function initTable() {
    $.ajax({
      url: '/my/article/list',
      data: q,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
        //表格渲染完成再渲染分页
        renderPage(res.total)
      }
    })
  }
  // 初始化分类列表
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
        layui.form.render()
      }
    })
  }
  // 分页???
  function renderPage(total) {
    // alert(total);
    laypage.render({
      elem: 'pageBox',
      count: total,
      limit: q.pagesize,
      curr: q.pagenum,
      limits: [2, 3, 5, 10],
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      jump: function (obj, first) {
        //  如果调用laypage.render函数触发jump回调，first为true，如果通过选项按钮切换，触发回调，first为undefined
        // console.log(first);
        // console.log(obj.curr);
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        if (!first) {

          initTable()
        }
      }
    })
  }
  //表单注册帅选事件
  $('#form-search').submit(function (e) {
    e.preventDefault()
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    q.cate_id = cate_id
    q.state = state
    initTable()
  })
  // 代理删除点击事件
  $('tbody').on('click', '.btn-delete', function () {
    var Id = $(this).attr('data-id')
    layer.confirm('确定删除?', {
      icon: 3,
      title: '提示'
    }, function (index) {
      $.ajax({
        url: '/my/article/delete/' + Id,
        success: function (res) {
          if (res.status !== 0) {
            return layui.layer.msg(res.message)
          }
          layui.layer.msg(res.message)
          if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--
          initTable()
        }
      })
      layer.close(index);
    })

  })
})