// http://ajax.frontend.itheima.net
var baseUrl = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (params) {
  if (params.url.indexOf('/my/') === 0) {
    params.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  params.url = baseUrl + params.url
  // console.log(params.url);
})