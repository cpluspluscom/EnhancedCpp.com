// These could be edited in the Options page.
// When it gets built.

// Type:
//   0 -> Code
//   1 -> Quote
//   2 -> Named Quote
//   3 -> Output
function forEachItem(item, type, isReplyable) {
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
		//item.getElementsByClassName('qh').length != 0
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

	if (type === 4 && CompileAllowed()) {
		item.style.height = "32px";
		item.style.whiteSpace = "nowrap";
		item.onmouseout = function(){
			item.style.width = "16px";
			item.style.backgroundColor = "#FFF";
		}
		item.onmouseover = function(){
			item.style.width = "100px";
			item.style.backgroundColor = "#FFD";
		}

		item.firstChild.firstChild.style.backgroundImage = "url('http://cpp.sh/favicon.ico')";
		item.firstChild.firstChild.style.backgroundSize = "16px";
		item.firstChild.firstChild.className = "C_ico";

		var newa = document.createElement('a');
		newa.href = '#'; // set onclick
		newa.onclick = function() {
			var snippetElem = FindParent(newa, function(elem) { return elem.className == "snippet"; });
			if (snippetElem) {
				var srcElem = snippetElem.getElementsByClassName('source');
				if (srcElem.length > 0) {
					var code = GetText(srcElem[0]);
					window.open('http://coliru.stacked-crooked.com/?src=' + escape(code), '_blank');
				}
			}
			// Go upwards from item, finding the "snippet" classnamed table.
			// From the "snippet" classnamed table, find a "source" classnamed table.
			// Run dom.text(mysourceclassnamedelement)
			// Store it. It's the code we want to compile.

			// Open a coliru page as follows:
			//     window.open('http://coliru.stacked-crooked.com','_blank');
			// Execute:
			//     app.defaultCmd = "ourcode";
			//     app.resetCommand();
			// on it after the page has loaded.
			// NOTE: DO NOT USE document.onload ! COLIRU ALREADY USES IT!
			// We probably should use
			//     window.open().document.addEventListener('load',function(){...});
			// Inject the code via <script> tags, using the handle window.open() returns.
		};
		newa.title = "Open Coliru (in a new window)";
		newa.target = "_top";
		newa.innerHTML = "<span></span> Edit on Coliru";

		var newspan = newa.firstChild;
		newspan.style.backgroundImage = "url('http://coliru.stacked-crooked.com/favicon.ico')"
		newspan.style.backgroundSize = "16px";
		newspan.className = "C_ico";

		item.appendChild(document.createElement('br'));
		item.appendChild(newa);
	}
}

function forEachPost_Buttons(buttonStorage, postID, isReplyable) {
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
