// This is used to define some basic functions.

// Find a parent. Stops when matchFunc returns true.
function FindParent(item, matchFunc) {
	do {
		if (matchFunc(item) === true) {
			return item;
		}
	} while (item = item.parentNode);
}

// Clone and item and its childs' callbacks. Used by Code spoilers.
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

// Called by spoiler's <a>'s onclick handler
function ToggleDisplay(targetDiv, displayIcon, shortSize) {
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

// Run javascript with eval
function RunJavascript(script) {
	eval(script)
}

// Append javascript to the document
function AppendJavascript(script) {
	var scriptElement = document.createElement('script');
	scriptElement.textContent = script;
	document.documentElement.appendChild(scriptElement);
}

/*
 * Parameter 'inputs':
 *   Array
 *
 * Each item must have:
 *  _____________________
 * | Property | Optional |
 * |__________|__________|
 * |  name    | No       |
 * |  value   | Yes      |
 * |  id      | Yes      |
 * |__________|__________|
 *
 * Parameter 'formInfo':
 *   Table
 *
 * It must have:
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
