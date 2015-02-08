function RunPageEdit() {
	var isEditablePage = 0;
	do {
		// Can I reply? (aka Can I quote a post?)
		var canReply = +(document.querySelector('#CH_subscription > form > select').children.length > 2);
		var currentTopic = document.location.pathname;

		// Parse Topic ID
		{
			var occ = 0;
			var ctbegin = 0;
			var ctend = 0;
			for (var zix = 0; zix < currentTopic.length; zix++) {
				if (currentTopic[zix] === '/' || currentTopic[zix] === '\\') {
					occ++;
					if (occ === 3) {
						ctbegin = zix + 1;
					} else if (occ === 4) {
						ctend = zix;
						break;
					}
				}
			}

			if (ctbegin === 0 || ctend === 0) {
				break;
			}

			currentTopic = +currentTopic.substring(ctbegin, ctend);
			if (Number.isNaN(currentTopic)) {
				console.log('Could not parse topic ID.');
				break;
			}
		}

		var PostList = document.getElementById('CH_PostList');

		if (PostList) {
			var PostDivs = PostList.getElementsByTagName('div');
			for (var i = 0; i != PostDivs.length; i++) {
				if (PostDivs[i].id.indexOf('msg') === 0 /* is a message */ && !Number.isNaN(+PostDivs[i].id.substr(3)) /* has message id */) {
					// Find button span item
					var SpanList = PostDivs[i].getElementsByTagName('span');
					for (var y = 0; y < SpanList.length; y++) {
						var PostID = +SpanList[y].id.substr(6);
						if (SpanList[y].className === 'dbtn' /* right class name */ && SpanList[y].id.indexOf('CH_btn') === 0 /* id begins with CH_btn */ && !Number.isNaN(PostID)) {
							isEditablePage = 1;
							forEachPost_Buttons(SpanList[y], PostID, canReply); // Add required buttons
						}
					}
				}
			}
		}

		// Do quotes before everything
		var AllQuotes = document.getElementsByClassName('quote');
		for (var i = 0; i !== AllQuotes.length; i++) {
			isEditablePage = 1;

			var ItemType = +(AllQuotes[i].getElementsByClassName('qh').length !== 0) + 1;
			forEachItem(AllQuotes[i], ItemType, canReply); // quote -> 1, named quote -> 2
		}

		var AllCodes = document.getElementsByClassName('snippet');
		for (var i = 0; i != AllCodes.length; i++) {
			isEditablePage = 1;

			var ItemType = (AllCodes[i].getElementsByClassName('output').length !== 0) ? 3 : 0;
			forEachItem(AllCodes[i], ItemType, canReply); // code -> 0, output -> 3
		}

		var AllCodeBlocks = document.getElementsByClassName('btn trans_half');
		for (var i = 0; i != AllCodeBlocks.length; i++) {
			isEditablePage = 1;

			forEachItem(AllCodeBlocks[i], 4, canReply); // [compile with] box -> 4
		}

	} while(0);
	// The reason behind the do/while(0) is so I can break out of this if the page is not a topic's page.
	// This allows me to not having to add multiple nested ifs.

	if (isEditablePage !== 0) {
		AddHiddenForm([{ name: 'w', value: 'preview' }, { name: 'content', id: 'show_as_code_id' }], { id: 'run_show_as_code_id', path: '/forum/post.cgi', target: 'previewing', name: 'prevthread' });

		var js_common_code = (function getpostinternal(x) {
			var result = '';

			var Network = new XMLHttpRequest();
			Network.onreadystatechange = function() {
				if (Network.readyState === 4 && Network.status === 200) {
					result = Network.responseText;
				} else {
					result = 'error';
				}
			};
			Network.open('GET', 'http://www.cplusplus.com/forum/post.cgi?w=text&p=' + x, false);
			Network.send();

			return result;
		}).toString() + ';';

		var js_quote_code = 'for_Post.prototype.quote = ' + (function() {
			var result = getpostinternal(this.postid);
			if (result !== 'error') {
				var pages = document.querySelector('.C_pages');
				var on_last_page = pages ? !!pages.lastChild.title : true;

				var replier = this.el.innerHTML;
				var begin = replier.indexOf('<b>');
				var end = replier.indexOf('</b>');
				replier = (begin > 0 && end > 0) ? ('=' + replier.substring(begin + 3, end)) : '';

				if (on_last_page) {
					var reply = document.getElementById('CH_reply').getElementsByTagName('a');
					if (reply[0].href.indexOf('javascript:thread') === 0) {
						eval(reply[0].href.substr(11) + ';');
					}
					reply = document.getElementById('CH_reply').getElementsByTagName('textarea');

					reply[0].value = '[quote' + replier + ']' + result + '[/quote]';
				} else {
					localStorage.setItem('q_body', '[quote' + replier + ']' + result + '[/quote]');
					localStorage.setItem('q_tid', window.location.pathname.split('/').slice(3,4)[0]);
					window.location.href = pages.lastChild.href;
				}
			}
		}).toString() + ';';

		var js_codeize_code = 'for_Post.prototype.showascode = ' + (function() {
			var result = getpostinternal(this.postid);
			if (result !== 'error') {
				var codeshw = document.getElementById('show_as_code_id');
				var sendcode = document.getElementById('run_show_as_code_id');
				if (codeshw && sendcode) {
					codeshw.value = '[code]' + result + '[/code]';
					sendcode.submit();
				}
			}
		}).toString() + ';';

		RunJavascriptCode(js_common_code + js_quote_code + js_codeize_code);

		// Cpp.sh button does not work when code spoilers are enabled.
		// Sorry Twicker, I'll have to hide it.
		// The current workaround is to disable code spoilers...

		// if (CodeSpoilerAllowed())
		// {
		// 	var buttonHolders = document.getElementsByClassName('C_btnholder');
		// 	for (var i = 0; i != buttonHolders.length; i++)
		// 	{
		// 		// Contains the settings icon (used by cpp.sh button)
		// 		if (buttonHolders[i].getElementsByClassName('settings').length != 0)
		// 		{
		// 			buttonHolders[i].style.display = 'none';
		// 		}
		// 	}
		// }
	}
}
