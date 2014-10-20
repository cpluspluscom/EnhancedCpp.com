// dev'ed by SGH. Ideas by LB. Uploading fee provided by BHXSpecter.
function FindParent(item,matchfunc)
{
	do {
		if(matchfunc(item))
			return item;
	} while(item = item.parentNode);
}
function GetText(b,c){if(typeof c==="undefined"){return b.textContent||b.innerText}else{if(b.textContent){b.textContent=c}else{b.innerText=c}}}
function CloneItem(item) // Clone and item and its childs' callbacks.
{                        // Used by Code spoilers.
	var cloned = item.cloneNode(false); // We clone the first node.
	// We lose the first node's callbacks. No way to save them reliably, but we don't need them.
	// The childs are shared to preserve callbacks.
	for(var i = 0; i < item.childNodes.length; ++i)
	{
		cloned.appendChild(item.childNodes[i]);
	}
	return cloned;
}
function ToggleDisplay( TargetDiv, DisplayIcon, ShortSize ) // Called by spoiler's <a>'s onclick handler
{
	if(TargetDiv.style.height == "auto") // Already expanded?
	{
		// Close
		TargetDiv.className = "ofhide"; //overflow:hidden
		TargetDiv.style.height = ShortSize;
		DisplayIcon.className = "C_ico hiddenicon";
	}
	else
	{
		// Open
		TargetDiv.className = "ofshow"; //overflow:display (required for cpp.sh icon)
		TargetDiv.style.height = "auto";
		DisplayIcon.className = "C_ico shownicon";
	}
}
function RunJavascriptCode(Script)  // Add a <script> element with "Script" as internal js code. Do not use exec.
{                                   // Some code does not work in any other way due to security limitations.
	var ScriptElement = document.createElement('script');
	ScriptElement.textContent = Script;
	document.documentElement.appendChild(ScriptElement);
}
/*
 * Inputs:
 *   Table, array-like, 0-indexed.
 * Each item must have:
 *   Property   Optional?
 *   name       No
 *   value      Yes
 *   id         Yes
 * FormInfo:
 *   Table item.
 * It must have:
 *   Property
 *   id
 *   path
 *   target
 *   name
 */
function AddHiddenForm(Inputs, FormInfo)
{
	var TargetForm = document.createElement('form');
	TargetForm.id = FormInfo.id;
	TargetForm.action = FormInfo.path;
	TargetForm.target = FormInfo.target;
	TargetForm.name = FormInfo.name;
	TargetForm.method = 'post';
	var currItem;
	for(var i = 0; currItem = Inputs[i]; ++i)
	{
		var FormInput = document.createElement('input');
		FormInput.type = 'hidden';
		FormInput.name = currItem.name;
		if(currItem.value)
			FormInput.value = currItem.value; // not required
		if(currItem.id)
			FormInput.id = currItem.id; // not required
		TargetForm.appendChild(FormInput);
	}
	document.documentElement.appendChild(TargetForm);
}