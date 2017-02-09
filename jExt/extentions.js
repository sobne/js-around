/*
收集了常用的js函数和封装代码。
v1.0  2009.11.30
1 String 扩展
2 Number 扩展
3 Array  扩展
*/

//1 String 扩展
/**************
replaceAll：
替换字符串中的字符。
用法：
yourstring.replaceAll("要替换的字符", "替换成什么");
例子:
"cssrain".replaceAll("s", "a");
"   cs   sr   ai   n".replaceAll(" ", "");
**************/
String.prototype.replaceAll = function (AFindText,ARepText){
                raRegExp = new RegExp(AFindText,"g");
                return this.replace(raRegExp,ARepText);
}


/**************
 * 字符串前后空格处理。
 * 如果想替换中间的空格，请用replaceAll方法。
 * 用法：
 * "  cssrain   ".trim();
**************/
String.prototype.trim=function()
{
    return this.replace(/(^\s*)|(\s*$)/g,"");//将字符串前后空格,用空字符串替代。
}


/**************
* 计算字符串的真正长度
//String有个属性length，但是它不能区分英文字符，
//计算中文字符和全角字符。但是在数据存储的时候中文和全角都是用两个字节来存储的，
//所有需要额外处理一下。自己写了个函数，返回String正真的长度.
用法：
<input type="text" name="rain" id="rain" />
<input type="button" id="test" value="test" onclick="alert(  document.getElementById('rain').value.codeLength()  )"/>
**************/
String.prototype.codeLength=function(){
    var len=0;
    if(this==null||this.length==0)
        return 0;
    var str=this.trim();//去掉空格
    for(i=0;i<str.length;i++){
        if(str.charCodeAt(i)>0&&str.charCodeAt(i)<128)
            len++;
        else 
            len+=2;
    }
    return len;
} 
/**************
检测字符串是否是以某个字符开始
用法:if ("sobne".startWith("s")) return true;
**************/
String.prototype.startWith=function(str){
    if(str==null||str==""||this.length==0||str.length>this.length)
        return false;
    if(this.substr(0,str.length)==str)
        return true;
    else
        return false;
 return true;
}
/**************
检测字符串是否是以某个字符结束
用法:if ("sobne".endWith("e")) return true;
**************/
String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
}
////JS获取字符串的实际长度，用来代替 String的length属性
//String.prototype.length = function(){
//    return this.replace.(/[\u4e00-\u9fa5]+/g,"**").length;
//}



/**************
//编码HTML  和  解码Html。
//在评论的时候为了防止用户提交带有恶意的脚本，可以先过滤HTML标签，过滤掉双引号，单引号，符号&，符号<，符号
用法：
<input type="text" name="rain" id="rain" />
<input type="button" value="test" onclick=" document.getElementById('rain2').value= document.getElementById('rain').value.htmlEncode()  "/>
<input type="text" name="rain2" id="rain2" />
<input type="button" value="test" onclick=" document.getElementById('rain').value= document.getElementById('rain2').value.htmlDecode()  "/>
**************/

String.prototype.htmlEncode=function(){
    return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&#34;").replace(/\'/g,"&#39;");
}
String.prototype.htmlDecode=function(){
    return this.replace(/\&amp\;/g, '\&').replace(/\&gt\;/g, '\>').replace(/\&lt\;/g, '\<').replace(/\&quot\;/g, '\'').replace(/\&\#39\;/g, '\'');
}




//2 Number 扩展
//除法函数，用来得到精确的除法结果 
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。 
//调用：accDiv(arg1,arg2) 
//返回值：arg1除以arg2的精确结果 
function accDiv(arg1,arg2){ 
    var t1=0,t2=0,r1,r2; 
    try{t1=arg1.toString().split(".")[1].length}catch(e){} 
    try{t2=arg2.toString().split(".")[1].length}catch(e){} 
    with(Math){ 
        r1=Number(arg1.toString().replace(".","")) 
        r2=Number(arg2.toString().replace(".","")) 
        return (r1/r2)*pow(10,t2-t1); 
    } 
} 
//给Number类型增加一个div方法
//用法： (37).div(3);
Number.prototype.div = function (arg){ 
    return accDiv(this, arg); 
} 

//乘法函数，用来得到精确的乘法结果 
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。 
//调用：accMul(arg1,arg2) 
//返回值：arg1乘以arg2的精确结果 
function accMul(arg1,arg2) 
{ 
    var m=0,s1=arg1.toString(),s2=arg2.toString(); 
    try{m+=s1.split(".")[1].length}catch(e){} 
    try{m+=s2.split(".")[1].length}catch(e){} 
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
} 
//给Number类型增加一个mul方法
//用法： (37).mul(3);
Number.prototype.mul = function (arg){ 
    return accMul(arg, this); 
} 

//加法函数，用来得到精确的加法结果 
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。 
//调用：accAdd(arg1,arg2) 
//返回值：arg1加上arg2的精确结果 
function accAdd(arg1,arg2){ 
    var r1,r2,m; 
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
    m=Math.pow(10,Math.max(r1,r2)) 
    return (arg1*m+arg2*m)/m 
} 
//给Number类型增加一个add方法
//用法： (37).add(3);
Number.prototype.add = function (arg){ 
    return accAdd(arg,this); 
}

//减法函数，用来得到精确的减法结果 
function Subtr(arg1,arg2){
     var r1,r2,m,n;
     try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
     try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
     m=Math.pow(10,Math.max(r1,r2));
     //last modify by deeka
     //动态控制精度长度
     n=(r1>=r2)?r1:r2;
     return ((arg1*m-arg2*m)/m).toFixed(n);
} 
//给Number类型增加一个sub方法
//用法：  (5.5).sub(37.5) 
Number.prototype.sub = function (arg){ 
    return Subtr(arg,this); 
}

//3 Array  扩展

//去掉数组中重复的元素
//用法：
//var arr=["abc",85,"abc",85,8,8,1,2,5,4,7,8];
//alert(  arr.strip()  );
Array.prototype.strip=function(){
	if(this.length<2) return [this[0]]||[];
	var arr=[];
	for(var i=0;i<this.length;i++){
		arr.push(this.splice(i--,1));
		for(var j=0;j<this.length;j++){
			if(this[j]==arr[arr.length-1]){
				this.splice(j--,1);
			}
		}
	}
	return arr;
}



//得到l-h下标的数组
//用法：
//var arr=["abc",85,"abc",85,8,8,1,2,5,4,7,8];
//alert( arr.limit(2,4) ); //输出  abc , 85 ,8  
Array.prototype.limit = function(l, h) {
    var _a = this; var ret = []; 
    l = l<0?0:l; h = h>_a.length?_a.length:h;
    for (var i=0; i<_a.length; i++) {
        if (i>=l && i<=h) ret[ret.length] = _a[i];
        if (i>h) break;
    }
    return ret;
}

//指定array是否包含指定的item
//array.exists( item ) 包含true;不包含false;
//用法：
//var array1  = [1,2,3,4,5,"a","b"];
//var b1  =  array1.exists("b") // 包含true;不包含false;//alert(b1)
function Array.prototype.exists( item )
{
	for( var i = 0 ; i < this.length ; i++ )
	{
		if( item == this[i] )
			return true;
	}
	return false;
}

//删除指定的item
//array.remove(item) 删除item
//用法：
//var array1  = [1,2,3,4,5,"a","b"];
//array1.remove("2");
//alert( array1[1] );
function Array.prototype.remove( item )
{
	for( var i = 0 ; i < this.length ; i++ )
	{
		if( item == this[i] )
			break;
	}
	if( i == this.length )
		return;
	for( var j = i ; j < this.length - 1 ; j++ )
	{
		this[ j ] = this[ j + 1 ];
	}
	this.length--;
}
