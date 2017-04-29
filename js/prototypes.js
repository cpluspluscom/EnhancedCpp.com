// This file defines additional post prototypes.

// Requirements
function GetInternalPostData(PostID, Callback)
{
	var Network = new XMLHttpRequest();
	Network.onreadystatechange = function() {
		if(Network.readyState === 4 && Network.status === 200) {
			Callback(Network.responseText);
		}
	};
	Network.open('GET', 'http://www.cplusplus.com/forum/post.cgi?w=text&p=' + PostID);
	Network.send();
}

// Prototypes
function QuotePrototype() {
	GetInternalPostData(this.postid, function(Result) {
		
		var Pages = document.querySelector('.C_pages');
		var OnLastPage = Pages ? (!pages.lastChild.href) : true;
		
		var Replier = this.el.innerHTML;
		var Begin = Replier.indexOf('<b>');
		var End = Replier.indexOf('</b>');
		Replier = (Begin > 0 && End > 0) ? ('=' + Replier.substring(Begin + 3, End)) : '';
		
		Result = Result.replace(/^\s+|\s+$/g, '').trim();
		var Text = '[quote' + Replier + ']' + Result + '[/quote]\n';
		
		if(OnLastPage) {
			var Reply = document.getElementById('CH_reply').getElementsByTagName('a');
			if(Reply[0].href.indexOf('javascript:thread') === 0) {
				eval(Reply[0].href.substr(11) + ';');
			}
			Reply = document.getElementById('CH_reply').getElementsByTagName('textarea');
			Reply[0].value = Reply[0].value + Text;
		}
		else {
			localStorage.setItem('q_body', Text);
			localStorage.setItem('q_tid', "%THREADID%");
			window.location.href = Pages.lastChild.href;
		}
	
	});
}

function ShowCodePrototype() {
	GetInternalPostData(this.postid, function(Result) {
		var CodeShow = document.getElementById('show_as_code_id');
		var SendCode = document.getElementById('run_show_as_code_id');
		if(CodeShow && SendCode) {
			Result = Result.replace(/^\s+|\s+$/g, '').trim();
			CodeShow.value = '[code]' + Result + '[/code]';
			SendCode.submit();
		}
	});
}

// Declarations
var GlobalRequirements = [
	{name: "GetInternalPostData", func: GetInternalPostData}
];

var PostPrototypes = [
	{name: "quote", func: QuotePrototype},
	{name: "showascode", func: ShowCodePrototype}
];

// Adds the declared requirements/prototypes
function AddPrototypes(ArgTable) {
	AddHiddenForm([{ name: 'w', value: 'preview' }, { name: 'content', id: 'show_as_code_id' }], { id: 'run_show_as_code_id', path: '/forum/post.cgi', target: 'previewing', name: 'prevthread' });
	
	var JavascriptCode = "";
	
	var Len = GlobalRequirements.length
	for(var i = 0; i !== Len; i++) {
		JavascriptCode = JavascriptCode + GlobalRequirements[i].name + "=" + GlobalRequirements[i].func.toString() + ";";
	}
	Len = PostPrototypes.length;
	for(var i = 0; i !== Len; i++) {
		JavascriptCode = JavascriptCode + "for_Post.prototype." + PostPrototypes[i].name + "=" + PostPrototypes[i].func.toString() + ";";
	}
	
	Len = ArgTable.length;
	for(var i = 0; i !== Len; i++) {
		JavascriptCode = JavascriptCode.replace(ArgTable[i].from, ArgTable[i].to);
	}
	AppendJavascript(JavascriptCode);
}