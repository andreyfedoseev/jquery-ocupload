/*
  One Click Upload - jQuery Plugin
 --------------------------------

 Copyright (c) 2008 Michael Mitchell - http://www.michaelmitchell.co.nz
 Copyright (c) 2011 Andrey Fedoseev <andrey.fedoseev@gmail.com> - http://andreyfedoseev.name

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 */
(function(a){a.fn.upload=function(b){b=a.extend({name:"file",enctype:"multipart/form-data",action:"",autoSubmit:true,onSubmit:function(){},onComplete:function(){},onSelect:function(){},params:{}},b);return new a.ocupload(this,b)};a.ocupload=function(h,l){var k=this;var c=new Date().getTime().toString().substr(8);var f=a("<iframe></iframe>",{id:"iframe"+c,name:"iframe"+c}).css({display:"none"});var d=a("<form></form>",{method:"post",enctype:l.enctype,action:l.action,target:"iframe"+c}).css({margin:0,padding:0});var e=h.css("cursor");var j=a("<input>",{name:l.name,type:"file"}).css({position:"absolute",display:"block",cursor:e,opacity:0});h.wrap("<div></div>");d.append(j);h.after(d);h.after(f);var b=h.parent().css({position:"relative",height:h.outerHeight()+"px",width:h.outerWidth()+"px",overflow:"hidden",cursor:e,margin:0,padding:0});var g=j.outerHeight(1);var i=j.outerWidth(1);b.mousemove(function(m){j.css({top:m.pageY-b.offset().top-(g/2)+"px",left:m.pageX-b.offset().left-i+30+"px"})});j.change(function(){k.onSelect();if(k.autoSubmit){k.submit()}});a.extend(this,{autoSubmit:true,onSubmit:l.onSubmit,onComplete:l.onComplete,onSelect:l.onSelect,filename:function(){return j.attr("value")},params:function(m){m=m?m:false;if(m){l.params=a.extend(l.params,m)}else{return l.params}},name:function(m){m=m?m:false;if(m){j.attr("name",value)}else{return j.attr("name")}},action:function(m){m=m?m:false;if(m){d.attr("action",m)}else{return d.attr("action")}},enctype:function(m){m=m?m:false;if(m){d.attr("enctype",m)}else{return d.attr("enctype")}},set:function(o,n){n=n?n:false;function m(q,p){switch(q){case"name":k.name(p);break;case"action":k.action(p);break;case"enctype":k.enctype(p);break;case"params":k.params(p);break;case"autoSubmit":k.autoSubmit=p;break;case"onSubmit":k.onSubmit=p;break;case"onComplete":k.onComplete=p;break;case"onSelect":k.onSelect=p;break;default:throw new Error("[jQuery.ocupload.set] '"+q+"' is an invalid option.")}}if(n){m(o,n)}else{a.each(o,function(p,q){m(p,q)})}},submit:function(){this.onSubmit();a.each(l.params,function(m,n){d.append(a('<input type="hidden" name="'+m+'" value="'+n+'" />'))});d.submit();f.unbind().load(function(){var n=document.getElementById(f.attr("name"));var m=a(n.contentWindow.document.body).text();k.onComplete(m)})}})}})(jQuery);