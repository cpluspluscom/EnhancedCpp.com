// dev'ed by SGH. Ideas by LB. Uploading fee provided by BHXSpecter.

function FindParent(item, matchFunc) {
	do {
		if (matchFunc(item)) {
			return item;
		}
	} while (item = item.parentNode);
}

function GetText(b, c) {
	if (c === undefined) {
		return b.textContent || b.innerText;
	} else if (b.textContent) {
		b.textContent = c;
	} else {
		b.innerText = c;
	}
}

// Clone and item and its childs' callbacks.
// Used by Code spoilers.
function CloneItem(item) {
	// We clone the first node.
	var cloned = item.cloneNode(false);

	// We lose the first node's callbacks. No way to save them reliably, but we don't need them.
	// The childs are shared to preserve callbacks.
	for (var i = 0; i < item.childNodes.length; i++) {
		cloned.appendChild(item.childNodes[i]);
	}

	return cloned;
}

function ToggleDisplay(targetDiv, displayIcon, shortSize) { // Called by spoiler's <a>'s onclick handler
	if (targetDiv.style.height == "auto") { // Already expanded?
		// Close
		targetDiv.className = "ofhide"; // overflow: hidden
		targetDiv.style.height = shortSize;
		displayIcon.className = "C_ico hiddenicon";
	} else {
		// Open
		targetDiv.className = "ofshow"; // overflow: display (required for cpp.sh icon)
		targetDiv.style.height = "auto";
		displayIcon.className = "C_ico shownicon";
	}
}

// Add a <script> element with "Script" as internal js code. Do not use exec.
// Some code does not work in any other way due to security limitations.
function RunJavascriptCode(script) {
	var scriptElement = document.createElement('script');
	scriptElement.textContent = script;
	document.documentElement.appendChild(scriptElement);
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
function AddHiddenForm(inputs, formInfo) {
	var TargetForm = document.createElement('form');
	TargetForm.id = formInfo.id;
	TargetForm.action = formInfo.path;
	TargetForm.target = formInfo.target;
	TargetForm.name = formInfo.name;
	TargetForm.method = 'post';

	var currItem;
	for(var i = 0; currItem = inputs[i]; i++) {
		var FormInput = document.createElement('input');
		FormInput.type = 'hidden';
		FormInput.name = currItem.name;
		FormInput.value = currItem.value || ''; // not required
		FormInput.id = currItem.id || ''; // not required
		TargetForm.appendChild(FormInput);
	}

	document.documentElement.appendChild(TargetForm);
}
