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
		
		newdiv.appendChild(Item.cloneNode(true));
		Item.parentNode.replaceChild(newdiv,Item);
	}
	if(Type==1 && QuoteSpoilerAllowed())
	{
		var newdiv = document.createElement('div');
		newdiv.style.height = DefQuoteHeight();
		//Item.getElementsByClassName('qh').length != 0
		newdiv.className = DefQuoteClass();
		var newa = document.createElement('a');
		var newspan = document.createElement('span');
		newspan.className = 'C_ico '+DefQuoteState();
		newa.appendChild(newspan);
		newa.onclick = function(){ToggleDisplay(this.parentNode,newspan,ShortQuoteHeight());return false;}
		newdiv.appendChild(newa);
		newdiv.appendChild(Item.cloneNode(true));
		Item.parentNode.replaceChild(newdiv,Item);
	}
	if(Type==2 && QuoteSpoilerAllowed())
	{
		var newdiv = document.createElement('div');
		newdiv.style.height = DefQuoteExtendedHeight();
		newdiv.className = DefQuoteClass();
		var newa = document.createElement('a');
		var newspan = document.createElement('span');
		newspan.className = 'C_ico '+DefQuoteState();
		newa.appendChild(newspan);
		newa.onclick = function(){ToggleDisplay(this.parentNode,newspan,ShortQuoteExtendedHeight());return false;}
		newdiv.appendChild(newa);
		newdiv.appendChild(Item.cloneNode(true));
		Item.parentNode.replaceChild(newdiv,Item);
	}
	if(Type==3 && OutputSpoilerAllowed())
	{
		var newdiv = document.createElement('div');
		newdiv.style.height = DefOutpHeight();
		newdiv.className = DefOutpClass();
		var newa = document.createElement('a');
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
		
		newdiv.appendChild(Item.cloneNode(true));
		Item.parentNode.replaceChild(newdiv,Item);
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
