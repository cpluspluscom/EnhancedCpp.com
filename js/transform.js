// Create Spoilers to every block
//   0 -> Code
//   1 -> Quote
//   2 -> Named Quote
//   3 -> Output
function CreateSpoiler(item, type, isReplyable) {
	if (type === 0 && CodeSpoilerAllowed()) {
		var newdiv = document.createElement('div');
		newdiv.style.height = DefCodeHeight();
		newdiv.className = DefCodeClass();

		var newa = document.createElement('a');
		newa.className = 'codeButton noselect';

		var newspan = document.createElement('span');
		newspan.className = 'C_ico ' + DefCodeState();
		newa.appendChild(newspan);
		newa.onclick = function() {
			ToggleDisplay(this.parentNode,newspan,ShortCodeHeight());
			return false;
		}
		newdiv.appendChild(newa);

		// code only
		var codespan = document.createElement('span');
		codespan.className = 'codeSpan';
		codespan.innerHTML = 'Code';
		newdiv.appendChild(codespan);
		// end code only

		newdiv.appendChild(CloneItem(item));
		item.parentNode.replaceChild(newdiv,item);
	}

	if (type === 1 && QuoteSpoilerAllowed()) {
		var newdiv = document.createElement('div');
		newdiv.style.height = DefQuoteHeight();
		newdiv.className = DefQuoteClass();

		var newa = document.createElement('a');
		newa.className = 'noselect';

		var newspan = document.createElement('span');
		newspan.className = 'C_ico '+DefQuoteState();
		newa.appendChild(newspan);

		newa.onclick = function() {
			ToggleDisplay(this.parentNode,newspan,ShortQuoteHeight());
			return false;
		}
		newdiv.appendChild(newa);

		newdiv.appendChild(CloneItem(item));
		item.parentNode.replaceChild(newdiv,item);
	}

	if (type === 2 && QuoteSpoilerAllowed()) {
		var newdiv = document.createElement('div');
		newdiv.style.height = DefQuoteExtendedHeight();
		newdiv.className = DefQuoteClass();

		var newa = document.createElement('a');
		newa.className = 'noselect';

		var newspan = document.createElement('span');
		newspan.className = 'C_ico '+DefQuoteState();

		newa.appendChild(newspan);
		newa.onclick = function(){
			ToggleDisplay(this.parentNode, newspan, ShortQuoteExtendedHeight());
			return false;
		}
		newdiv.appendChild(newa);

		newdiv.appendChild(CloneItem(item));
		item.parentNode.replaceChild(newdiv,item);
	}

	if (type === 3 && OutputSpoilerAllowed()) {
		var newdiv = document.createElement('div');
		newdiv.style.height = DefOutpHeight();
		newdiv.className = DefOutpClass();

		var newa = document.createElement('a');
		newa.className = 'noselect';

		var newspan = document.createElement('span');
		newspan.className = 'C_ico '+DefOutpState();
		newa.appendChild(newspan);

		newa.onclick = function(){
			ToggleDisplay(this.parentNode,newspan,ShortOutpHeight());
			return false;
		}
		newdiv.appendChild(newa);

		// outp only
		var outpspan = document.createElement('span');
		outpspan.className='codeSpan';
		outpspan.innerHTML='Output';
		newdiv.appendChild(outpspan);
		// end outp only

		newdiv.appendChild(CloneItem(item));

		item.parentNode.replaceChild(newdiv, item);
	}
}

// Add buttons to each post
function CreateButtons(buttonStorage, postID, isReplyable) {
	var result = '';
	if (CodeButtonAllowed()) {
		result += '<span><a href="javascript:post';
		result += postID;
		result += '.showascode()" class="C_btn narrow" title="Show as Code"><b class="C_ico ascode"></b>Code-ize</a></span>';
	}

	if (QuoteButtonAllowed() && isReplyable) {
		result += '<span><a href="javascript:post';
		result += postID;
		result += '.quote()" class="C_btn narrow" title="Quote post"><b class="C_ico postreply"></b>Quote</a></span>';
	}

	if (result !== '') {
		result += buttonStorage.innerHTML,
		buttonStorage.innerHTML = result;
	}
}

// Start editing the page
function EditPage()
{
	if(ThreadID === null)
		return;
	
	// Get the starting conditions...
	var canReply = (ThreadArchived === 0);
	
	// Add buttons
	var PostList = document.getElementById('CH_PostList');
	if(PostList) {
		var PostDivs = PostList.getElementsByTagName('div');
		var PostDivsLen = PostDivs.length;
		for(var i = 0; i !== PostDivsLen; i++)
		{
			var div = PostDivs[i];
			
			if(div.id.indexOf('msg') === 0 /* It's a message */ &&
				!Number.isNaN(+div.id.substr(3)) /* Has a message ID */)
			{
				var SpanList = div.getElementsByTagName('span');
				var SpanListLen = SpanList.length;
				for(var y = 0; y !== SpanListLen; y++)
				{
					var span = SpanList[y];
					var PostID = +span.id.substr(6);
					if(span.className === 'dbtn' /* right class name */ &&
						span.id.indexOf('CH_btn') === 0 /* id begins with CH_btn */ &&
						!Number.isNaN(PostID))
					{
						// Add "Show as Code" and "Quote".
						CreateButtons(span, PostID, canReply);
					}
				}
			}
		}
	}
	
	
	// Create spoiler tags
	// Quotes
	var AllQuotes = document.getElementsByClassName('quote');
	for (var i = 0; i !== AllQuotes.length; i++) {
		isEditablePage = 1;

		var ItemType = +(AllQuotes[i].getElementsByClassName('qh').length !== 0) + 1;
		CreateSpoiler(AllQuotes[i], ItemType, canReply); // quote -> 1, named quote -> 2
	}

	// Code and Output
	var AllCodes = document.getElementsByClassName('snippet');
	for (var i = 0; i != AllCodes.length; i++) {
		isEditablePage = 1;

		var ItemType = (AllCodes[i].getElementsByClassName('output').length !== 0) ? 3 : 0;
		CreateSpoiler(AllCodes[i], ItemType, canReply); // code -> 0, output -> 3
	}
}
