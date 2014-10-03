// These could be edited in the Options page.
// When it gets built.
var AllowQuoteButton=1;
var AllowCodeizeButton=1;
var AllowQuoteSpoilers=1;
var AllowCodeSpoilers=1;
var IsEditablePage=0;

var DefQuoteOpen=1;
var DefCodeOpen=0;

var DefQuoteSize="20px";
var DefQuoteExtSize="35px";
var DefCodeSize="20px";

function DefQuoteState(){return DefQuoteOpen?"shownicon":"hiddenicon";}
function DefCodeState(){return DefCodeOpen?"shownicon":"hiddenicon";}
function DefQuoteHgt(sh){return DefQuoteOpen?"auto":sh;}
function DefCodeHgt(sh){return DefCodeOpen?"auto":sh;}
function DefQuoteClass(){return DefQuoteOpen?"ofshow":"ofhide";}
function DefCodeClass(){return DefCodeOpen?"ofshow":"ofhide";}

function childOf(c,p){while((c=c.parentNode)&&c!==p);return !!c}

function toggledisplay(target,icon,tinysize)
{
	if(target.style.height=="auto")
	{
		target.style.height=tinysize;
		target.className="ofhide";
		icon.className="C_ico hiddenicon";
	}
	else
	{
		target.style.height="auto";
		target.className="ofshow";
		icon.className="C_ico shownicon";
	}
}

function forEachItem(Item, IsCode, IsReplyable)
{
	if(IsCode && AllowCodeSpoilers)
	{
		var newdiv = document.createElement('div');
		newdiv.style.height = DefCodeHgt(DefCodeSize);
		newdiv.className = DefCodeClass();
		var newa = document.createElement('a');
		var newspan = document.createElement('span');
		newspan.className = 'C_ico '+DefCodeState();
		newa.appendChild(newspan);
		newa.onclick = function(){toggledisplay(this.parentNode,newspan,DefCodeSize);return false;}
		newdiv.appendChild(newa);
		
		//codeonly
		var codespan = document.createElement('span');
		codespan.className='codeSpan';
		codespan.innerHTML='Code';
		newdiv.appendChild(codespan);
		//endcodeonly
		
		newdiv.appendChild(Item.cloneNode(true));
		Item.parentNode.replaceChild(newdiv,Item);
	}
	if(!IsCode && AllowQuoteSpoilers)
	{
		var itemshortsize=DefQuoteSize;
		if(Item.getElementsByClassName('qh').length != 0)
			itemshortsize=DefQuoteExtSize;
			
		var newdiv = document.createElement('div');
		newdiv.style.height = DefQuoteHgt(itemshortsize);
		newdiv.className = DefQuoteClass();
		var newa = document.createElement('a');
		var newspan = document.createElement('span');
		newspan.className = 'C_ico '+DefQuoteState();
		newa.appendChild(newspan);
		newa.onclick = function(){toggledisplay(this.parentNode,newspan,DefQuoteSize);return false;}
		newdiv.appendChild(newa);
		newdiv.appendChild(Item.cloneNode(true));
		Item.parentNode.replaceChild(newdiv,Item);
	}
}
function forEachPost_Buttons(ButtonStorage, PostID, IsReplyable)
{
	var Result = '';
	if(AllowCodeizeButton)
	{
		Result += '<span><a href="javascript:post';
		Result += PostID;
		Result += '.showascode()" class="C_btn narrow" title="Show as Code"><b class="C_ico ascode"></b>Code-ize</a></span>';
	}
	if(AllowQuoteButton && IsReplyable)
	{
		Result += '<span><a href="javascript:post';
		Result += PostID;
		Result += '.quote()" class="C_btn narrow" title="Quote post"><b class="C_ico postreply"></b>Quote</a></span>';
	}
	if(Result != '')
	{
		Result += ButtonStorage.innerHTML,
		ButtonStorage.innerHTML = Result;
	}
}

do {
	var CanReply = 1;
	if(!document.getElementsByClassName('postreply').length)
		CanReply = 0;
	
	var currenttopic = document.location.pathname;
	var occ = 0;
	var ctbegin = 0;
	var ctend = 0;
	for(var zix = 0; zix < currenttopic.length; zix++)
	{
		if(currenttopic[zix] == '/'
			|| currenttopic[zix] == '\\')
		{
			occ++;
			if(occ == 3)
			{
				ctbegin = zix+1;
			}
			else if(occ == 4)
			{
				ctend = zix;
				break;
			}
		}
	}
	if(ctbegin == 0 || ctend == 0)
		break;
	currenttopic = currenttopic.substring(ctbegin,ctend);
	currenttopic = parseInt(currenttopic);
	if(isNaN(currenttopic))
	{
		console.log("Could not parse topic ID.");
		break;
	}
	
	var x = document.getElementById('CH_PostList');
	if(x) {
		var y = x.getElementsByTagName('div');
		if(y.length)
		{
			var spanlist;
			var postlist = [];
			var currItem;
			for(var zix = 0; currItem = y[zix]; zix++)
			{
				if((currItem.id.indexOf('msg') == 0) &&
					(!isNaN(parseInt(currItem.id.substr(3),10))))
				{
					spanlist = currItem.getElementsByTagName('span');
					for(var ziy = 0; ziy < spanlist.length; ziy++)
					{
						if((spanlist[ziy].className == 'dbtn') &&
							(spanlist[ziy].id.indexOf('CH_btn') == 0) &&
							(!isNaN(parseInt(spanlist[ziy].id.substr(6))))
							)
						{
							var postid = parseInt(spanlist[ziy].id.substr(6));
							if(isNaN(postid))
								continue;
							IsEditablePage=1;
							forEachPost_Buttons(spanlist[ziy],postid,CanReply);
						}
					}
				}
			}
		}
		else
		{
			console.log("No posts in topic.");
		}
	}
	else
	{
		console.log("No postlist in topic.");
	}
	x = document.getElementsByClassName('quote');
	if(x) {
		var currItem;
		for(var zix=0; currItem=x[zix]; zix++)
		{
			forEachItem(currItem,0,CanReply);
			IsEditablePage=1;
		}
	}
	else
	{
		console.log("No quotes in this topic.");
	}
	x = document.getElementsByClassName('snippet');
	if(x) {
		var currItem;
		for(var zix=0; currItem=x[zix]; zix++)
		{
			forEachItem(currItem,1,CanReply);
			IsEditablePage=1;
		}
	}
	else
	{
		console.log("No sources in this topic.");
	}
} while(0);

if(IsEditablePage != 0)
{
	var formpreview = document.createElement('form');
	var forminput_w = document.createElement('input');
	var forminput_content = document.createElement('input');

	forminput_w.type = 'hidden';
	forminput_w.name = 'w';
	forminput_w.value = 'preview';

	forminput_content.type = 'hidden';
	forminput_content.name = 'content';
	forminput_content.id = 'show_as_code_id';

	formpreview.appendChild(forminput_w);
	formpreview.appendChild(forminput_content);
	formpreview.id = 'run_show_as_code_id';
	formpreview.action = '/forum/post.cgi';
	formpreview.target = 'previewing';
	formpreview.method = 'post';
	formpreview.name = 'prevthread';
	document.documentElement.appendChild(formpreview);

	// http://www.cplusplus.com/forum/post.cgi?w=text&p= #ID
	// ---> Formatted text
	var js_common_code = 'function getpostinternal(x){var result="";var Network=new XMLHttpRequest();Network.onreadystatechange=function(){if(Network.readyState==4&&Network.status==200){result=Network.responseText;}else result="error";};Network.open("GET","http://www.cplusplus.com/forum/post.cgi\?w=text\&p="+x,false);Network.send();return result;}';
	var js_quote_code = 'for_Post.prototype.quote = function(){var result=getpostinternal(this.postid);if(result!="error"){var reply=document.getElementById("CH_reply").getElementsByTagName("a");if(reply[0].href.indexOf("javascript:thread")==0){eval(reply[0].href.substr(11)+";")}reply=document.getElementById("CH_reply").getElementsByTagName("textarea");var replier=this.el.innerHTML;var begin=replier.indexOf("<b>");var end=replier.indexOf("</b>");if(begin>0&&end>0)replier="="+replier.substring(begin+3,end);else replier="";reply[0].value="[quote";reply[0].value+=replier;reply[0].value+="]"+result+"[/quote]";}};';
	var js_codeize_code = 'for_Post.prototype.showascode = function(){var result=getpostinternal(this.postid);if(result!="error"){var codeshw=document.getElementById("show_as_code_id");var sendcode=document.getElementById("run_show_as_code_id");if(codeshw&&sendcode){codeshw.value="[code]"+result+"[/code]";sendcode.submit();}}};';
	var s = document.createElement('script');
	s.textContent = js_common_code + js_quote_code + js_codeize_code;
	document.documentElement.appendChild(s);
}

// dev'ed by SGH. Ideas by LB. Uploading fee provided by BHXSpecter.