var IsEditablePage = 0;
do {
	// Can I Reply? (aka Can I Quote A Post?)
	var CanReply = (document.getElementsByClassName('postreply').length != 0)?1:0;
	
	var CurrentTopic = document.location.pathname;
	
	// Parse Topic ID
	{
		var occ = 0;
		var ctbegin = 0;
		var ctend = 0;
		for(var zix = 0; zix < CurrentTopic.length; zix++)
		{
			if(CurrentTopic[zix] == '/'
				|| CurrentTopic[zix] == '\\')
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
		CurrentTopic = CurrentTopic.substring(ctbegin,ctend);
		CurrentTopic = parseInt(CurrentTopic);
		if(isNaN(CurrentTopic))
		{
			console.log("Could not parse topic ID.");
			break;
		}
	}
	
	var PostList = document.getElementById('CH_PostList');
	
	if(PostList)
	{
		var PostDivs = PostList.getElementsByTagName('div');
		for(var i = 0; i != PostDivs.length; ++i)
		{
			if(
				(PostDivs[i].id.indexOf('msg')==0) // is a message
				&& (!isNaN(parseInt(PostDivs[i].id.substr(3),10)))) // has message id
			{
				// Find button span item
				var SpanList = PostDivs[i].getElementsByTagName('span');
				for(var y = 0; y < SpanList.length; ++y)
				{
					var PostID = parseInt(SpanList[y].id.substr(6));
					if( (SpanList[y].className == 'dbtn') // right class name
					&& (SpanList[y].id.indexOf('CH_btn')==0) // id begins with CH_btn
					&& (!isNaN(PostID)))
					{
						IsEditablePage = 1;
						forEachPost_Buttons(SpanList[y],PostID,CanReply); // Add required buttons
					}
				}
			}
		}
	}
	
	// Do quotes before everything
	var AllQuotes = document.getElementsByClassName('quote');
	for(var i = 0; i != AllQuotes.length; ++i)
	{
		IsEditablePage = 1;
		
		var ItemType = (AllQuotes[i].getElementsByClassName('qh').length != 0)?2:1;
		forEachItem(AllQuotes[i],ItemType,CanReply); // quote -> 1, named quote -> 2
	}
	
	var AllCodes = document.getElementsByClassName('snippet');
	for(var i = 0; i != AllCodes.length; ++i)
	{
		IsEditablePage = 1;
		
		var ItemType = (AllCodes[i].getElementsByClassName('output').length != 0)?3:0;
		forEachItem(AllCodes[i],ItemType,CanReply); // code -> 0, output -> 3
	}
	
} while(0);
// The reason behind the do/while(0) is so I can break out of this if the page is not a topic's page.
// This allows me to not having to add multiple nested ifs.

if(IsEditablePage != 0)
{
	var inputs = [];
	inputs[0] = [];
	inputs[1] = [];
	inputs[0].name = 'w';
	inputs[0].value = 'preview';
	inputs[1].name = 'content';
	inputs[1].id = 'show_as_code_id';
	var forminfo = [];
	forminfo.id = 'run_show_as_code_id';
	forminfo.path = '/forum/post.cgi';
	forminfo.target = 'previewing';
	forminfo.name = 'prevthread';
	AddHiddenForm(inputs,forminfo);
	
	var js_common_code = 'function getpostinternal(x){var result="";var Network=new XMLHttpRequest();Network.onreadystatechange=function(){if(Network.readyState==4&&Network.status==200){result=Network.responseText;}else result="error";};Network.open("GET","http://www.cplusplus.com/forum/post.cgi\?w=text\&p="+x,false);Network.send();return result;}';
	var js_quote_code = 'for_Post.prototype.quote = function(){var result=getpostinternal(this.postid);if(result!="error"){var reply=document.getElementById("CH_reply").getElementsByTagName("a");if(reply[0].href.indexOf("javascript:thread")==0){eval(reply[0].href.substr(11)+";")}reply=document.getElementById("CH_reply").getElementsByTagName("textarea");var replier=this.el.innerHTML;var begin=replier.indexOf("<b>");var end=replier.indexOf("</b>");if(begin>0&&end>0)replier="="+replier.substring(begin+3,end);else replier="";reply[0].value="[quote";reply[0].value+=replier;reply[0].value+="]"+result+"[/quote]";}};';
	var js_codeize_code = 'for_Post.prototype.showascode = function(){var result=getpostinternal(this.postid);if(result!="error"){var codeshw=document.getElementById("show_as_code_id");var sendcode=document.getElementById("run_show_as_code_id");if(codeshw&&sendcode){codeshw.value="[code]"+result+"[/code]";sendcode.submit();}}};';
	RunJavascriptCode(js_common_code + js_quote_code + js_codeize_code);
}