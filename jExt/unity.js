//var id = getUrlParam("id");
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}
function addScript(url){
	document.write("<script language=javascript src="+url+"></script>");
}
function createScript(url){
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.setAttribute('src',url);
	document.getElementsByTagName('head')[0].appendChild(script);
}