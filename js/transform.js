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
