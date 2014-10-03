// These could be edited in the Options page.
// When it gets built.

function forEachItem(Item, IsCode, IsReplyable)
{
	if(IsCode && CodeSpoilerAllowed())
	{
		var newdiv = document.createElement('div');
		newdiv.style.height = DefCodeHeight();
		newdiv.className = DefCodeClass();
		var newa = document.createElement('a');
		var newspan = document.createElement('span');
		newspan.className = 'C_ico '+DefCodeState();
		newa.appendChild(newspan);
		// Use a different var to be consistent with how the Quote spoiler works
		var targetShortSize = ShortCodeHeight();
		newa.onclick = function(){ToggleDisplay(this.parentNode,newspan,targetShortSize);return false;}
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
	if(!IsCode && QuoteSpoilerAllowed())
	{
		var newdiv = document.createElement('div');
		newdiv.style.height = (Item.getElementsByClassName('qh').length != 0) ?
			DefQuoteExtendedHeight() :
			DefQuoteHeight();
		newdiv.className = DefQuoteClass();
		var newa = document.createElement('a');
		var newspan = document.createElement('span');
		newspan.className = 'C_ico '+DefQuoteState();
		newa.appendChild(newspan);
		var targetShortSize = (Item.getElementsByClassName('qh').length != 0) ?
			ShortQuoteExtendedHeight() :
			ShortQuoteHeight();
		newa.onclick = function(){ToggleDisplay(this.parentNode,newspan,targetShortSize);return false;}
		newdiv.appendChild(newa);
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
