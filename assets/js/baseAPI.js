// http://ajax.frontend.itheima.net
var baseUrl = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (params) {
  params.url = baseUrl + params.url
  console.log(params.url);
})