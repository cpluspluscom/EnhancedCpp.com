do {
	
	if(!document.getElementsByClassName('postreply').length)
		break;
	
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
		break;
	
	var x = document.getElementById('CH_PostList');
	if(!x)
		break;
	var y = x.getElementsByTagName('div');
	if(!y.length)
		break;

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
					var newspancontent = '<span><a href="javascript:post';
					newspancontent += postid;
					newspancontent += '.quote()" class="C_btn narrow" title="Quote post"><b class="C_ico postreply"></b>Quote</a></span>';
					newspancontent += spanlist[ziy].innerHTML;
					spanlist[ziy].innerHTML = newspancontent;
				}
			}
		}
	}
	// http://www.cplusplus.com/forum/post.cgi?w=text&p= #ID
	// ---> Formatted text

	//var fcode = "";


	var code = "for_Post.prototype.quote = function(){var result = '';var Network = new XMLHttpRequest();Network.onreadystatechange = function(){if(Network.readyState == 4 && Network.status == 200){result = Network.responseText;}else result = 'error';}; Network.open('GET','http://www.cplusplus.com/forum/post.cgi\?w=text\&p=' + this.postid,false);Network.send();\
	var reply = document.getElementById('CH_reply');\
	reply = reply.getElementsByTagName('a');\
	if(result != 'error')\
	{\
		if(reply[0].href.indexOf('javascript:thread') == 0)\
		{\
			eval(reply[0].href.substr(11)+';');\
		}\
		reply = document.getElementById('CH_reply');\
		reply = reply.getElementsByTagName('textarea');\
		var replier = this.el.innerHTML;\
		var begin = replier.indexOf('<b>');\
		var end = replier.indexOf('</b>');\
		if(begin > 0 && end > 0)\
			replier = '=' + replier.substring(begin+3,end);\
		else\
			replier = '';\
		reply[0].value += '[quote';\
		reply[0].value += replier;\
		reply[0].value += ']'+result+'[/quote]';\
	}}";
	var s = document.createElement('script');
	s.textContent = code;
	document.documentElement.appendChild(s);

} while(0);