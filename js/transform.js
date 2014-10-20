// These could be edited in the Options page.
// When it gets built.

// Type:
//   0 -> Code
//   1 -> Quote
//   2 -> Named Quote
//   3 -> Output
function forEachItem(Item, Type, IsReplyable)
{
	if(Type==0 && CodeSpoilerAllowed())
	{
		var newdiv = document.createElement('div');
		newdiv.style.height = DefCodeHeight();
		newdiv.className = DefCodeClass();
		var newa = document.createElement('a');
		newa.className = 'codeButton noselect';
		var newspan = document.createElement('span');
		newspan.className = 'C_ico '+DefCodeState();
		newa.appendChild(newspan);
		newa.onclick = function(){ToggleDisplay(this.parentNode,newspan,ShortCodeHeight());return false;}
		newdiv.appendChild(newa);
		
		//codeonly
		var codespan = document.createElement('span');
		codespan.className='codeSpan';
		codespan.innerHTML='Code';
		newdiv.appendChild(codespan);
		//endcodeonly
		
		newdiv.appendChild(CloneItem(Item));
		Item.parentNode.replaceChild(newdiv,Item);
	}
	if(Type==1 && QuoteSpoilerAllowed())
	{
		var newdiv = document.createElement('div');
		newdiv.style.height = DefQuoteHeight();
		//Item.getElementsByClassName('qh').length != 0
		newdiv.className = DefQuoteClass();
		var newa = document.createElement('a');
		newa.className = 'noselect';
		var newspan = document.createElement('span');
		newspan.className = 'C_ico '+DefQuoteState();
		newa.appendChild(newspan);
		newa.onclick = function(){ToggleDisplay(this.parentNode,newspan,ShortQuoteHeight());return false;}
		newdiv.appendChild(newa);
		newdiv.appendChild(CloneItem(Item));
		Item.parentNode.replaceChild(newdiv,Item);
	}
	if(Type==2 && QuoteSpoilerAllowed())
	{
		var newdiv = document.createElement('div');
		newdiv.style.height = DefQuoteExtendedHeight();
		newdiv.className = DefQuoteClass();
		var newa = document.createElement('a');
		newa.className = 'noselect';
		var newspan = document.createElement('span');
		newspan.className = 'C_ico '+DefQuoteState();
		newa.appendChild(newspan);
		newa.onclick = function(){ToggleDisplay(this.parentNode,newspan,ShortQuoteExtendedHeight());return false;}
		newdiv.appendChild(newa);
		newdiv.appendChild(CloneItem(Item));
		Item.parentNode.replaceChild(newdiv,Item);
	}
	if(Type==3 && OutputSpoilerAllowed())
	{
		var newdiv = document.createElement('div');
		newdiv.style.height = DefOutpHeight();
		newdiv.className = DefOutpClass();
		var newa = document.createElement('a');
		newa.className = 'noselect';
		var newspan = document.createElement('span');
		newspan.className = 'C_ico '+DefOutpState();
		newa.appendChild(newspan);
		newa.onclick = function(){ToggleDisplay(this.parentNode,newspan,ShortOutpHeight());return false;}
		newdiv.appendChild(newa);
		
		//Outponly
		var Outpspan = document.createElement('span');
		Outpspan.className='codeSpan';
		Outpspan.innerHTML='Output';
		newdiv.appendChild(Outpspan);
		//endOutponly
		
		newdiv.appendChild(CloneItem(Item));
		Item.parentNode.replaceChild(newdiv,Item);
	}
	if(Type==4 && CompileAllowed())
	{
		Item.style.height = "32px";
		Item.style.whiteSpace = "nowrap";
		Item.onmouseout = function(){
			Item.style.width = "16px";
			Item.style.backgroundColor = "#FFF";
		}
		Item.onmouseover = function(){
			Item.style.width = "100px";
			Item.style.backgroundColor = "#FFD";
		}
		
		Item.firstChild.firstChild.style.backgroundImage = "url('http://cpp.sh/favicon.ico')";
		Item.firstChild.firstChild.style.backgroundSize = "16px";
		Item.firstChild.firstChild.className = "C_ico";
		
		var newa = document.createElement('a');
		newa.href = '#'; // set onclick
		newa.onclick = function()
		{
			var snippetElem = FindParent(newa,function(elem){
				return elem.className == "snippet";
			});
			if(snippetElem)
			{
				var srcElem = snippetElem.getElementsByClassName('source');
				if(srcElem.length)
				{
					var code = GetText(srcElem[0]);
					window.open('http://coliru.stacked-crooked.com/?src='+escape(code),'_blank');
				}
			}
			// Go upwards from Item, finding the "snippet" classnamed table.
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
		
		Item.appendChild(document.createElement('br'));
		Item.appendChild(newa);
	}
}
function forEachPost_Buttons(ButtonStorage, PostID, IsReplyable)
{
	var Result = '';
	if(CodeButtonAllowed())
	{
		Result += '<span><a href="javascript:post';
		Result += PostID;
		Result += '.showascode()" class="C_btn narrow" title="Show as Code"><b class="C_ico ascode"></b>Code-ize</a></span>';
	}
	if(QuoteButtonAllowed() && IsReplyable)
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
