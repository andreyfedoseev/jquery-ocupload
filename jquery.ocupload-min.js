
(function($){$.fn.upload=function(options){options=$.extend({name:'file',enctype:'multipart/form-data',action:'',autoSubmit:true,onSubmit:function(){},onComplete:function(){},onSelect:function(){},params:{}},options);return new $.ocupload(this,options);};$.ocupload=function(element,options){var self=this;var id=new Date().getTime().toString().substr(8);var iframe=$("<iframe></iframe>",{id:"iframe"+id,name:"iframe"+id}).css({display:"none"});var form=$("<form></form>",{method:"post",enctype:options.enctype,action:options.action,target:"iframe"+id}).css({margin:0,padding:0});var element_cursor=element.css('cursor');var input=$("<input>",{name:options.name,"type":"file"}).css({position:'absolute',display:'block',cursor:element_cursor,opacity:0});element.wrap("<div></div>");form.append(input);element.after(form);element.after(iframe);var container=element.parent().css({position:'relative',height:element.outerHeight()+'px',width:element.outerWidth()+'px',overflow:'hidden',cursor:element_cursor,margin:0,padding:0});var input_height=input.outerHeight(element.outerHeight());var input_width=input.outerWidth(element.outerWidth());input.css({margin:"0",padding:"0",top:"0",left:"0"});container.mousemove(function(e){input.css({top:e.pageY-container.offset().top-(input_height/2)+'px',left:e.pageX-container.offset().left-input_width+30+'px'});});input.change(function(){self.onSelect();if(self.autoSubmit){self.submit();}});$.extend(this,{autoSubmit:true,onSubmit:options.onSubmit,onComplete:options.onComplete,onSelect:options.onSelect,filename:function(){return input.attr('value');},params:function(params){params=params?params:false;if(params){options.params=$.extend(options.params,params);}
else{return options.params;}},name:function(name){name=name?name:false;if(name){input.attr('name',value);}
else{return input.attr('name');}},action:function(action){action=action?action:false;if(action){form.attr('action',action);}
else{return form.attr('action');}},enctype:function(enctype){enctype=enctype?enctype:false;if(enctype){form.attr('enctype',enctype);}
else{return form.attr('enctype');}},set:function(obj,value){value=value?value:false;function option(action,value){switch(action){case'name':self.name(value);break;case'action':self.action(value);break;case'enctype':self.enctype(value);break;case'params':self.params(value);break;case'autoSubmit':self.autoSubmit=value;break;case'onSubmit':self.onSubmit=value;break;case'onComplete':self.onComplete=value;break;case'onSelect':self.onSelect=value;break;default:throw new Error('[jQuery.ocupload.set] \''+action+'\' is an invalid option.');}}
if(value){option(obj,value);}
else{$.each(obj,function(key,value){option(key,value);});}},submit:function(){this.onSubmit();$.each(options.params,function(key,value){form.append($('<input '+'type="hidden" '+'name="'+key+'" '+'value="'+value+'" '+'/>'));});form.submit();iframe.unbind().load(function(){var myFrame=document.getElementById(iframe.attr('name'));var response=$(myFrame.contentWindow.document.body).text();self.onComplete(response);});}});};})(jQuery);