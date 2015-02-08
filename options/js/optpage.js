var g_lastTimer;
function RearmTimer() {
	if (g_lastTimer) {
		window.clearTimeout(g_lastTimer);
	}

	var targetStatus = document.getElementById('status');
	targetStatus.style.height = "14px";

	g_lastTimer = setTimeout(function() {
		targetStatus.style.height = "0px";
	}, 1500);
}

function Save() {
	var localOptions = {};
	for (var k in defaultOptions) {
		if (!defaultOptions.hasOwnProperty(k)) {
			continue; // trashy stuff
		}

		var numericDefault = +defaultOptions[k];
		if (Number.isNaN(numericDefault)) {
			continue; // trashy stuff #2
		}

		var numericItem;
		if (numericDefault > 1) {
			numericItem = +document.getElementById(k).value;
		} else {
			numericItem = document.getElementById(k).checked ? 1 : 0;
		}

		localOptions[k] = numericItem;
	}

	chrome.storage.sync.set(localOptions, function() {
		document.getElementById('status').innerText = "Options Saved.";
		RearmTimer();
	});
}

function Load() {
	chrome.storage.sync.get(defaultOptions, function(items) {
		for (var k in items) {
			if (!defaultOptions.hasOwnProperty(k)) {
				continue; // unknown option
			}

			var numericDefault = +defaultOptions[k];
			if (Number.isNaN(numericDefault)) {
				continue; // shouldn't happen
			}

			var numericItem = +items[k];
			if (Number.isNaN(numericItem)) {
				numericItem = numericDefault; // invalid stored option. load fallback.
			}

			if (numericDefault > 1) {
				document.getElementById(k).value = numericItem;
			} else {
				document.getElementById(k).checked = +(numericItem !== 0);
			}
		}
	});
}

for (var k in defaultOptions) {
	if (!defaultOptions.hasOwnProperty(k)) {
		continue;
	}

	var elem = document.getElementById(k);
	if (elem) {
		elem.onclick = Save;
	}
}

document.addEventListener('DOMContentLoaded', Load);

document.getElementById('do_report').onclick = function(){
	document.getElementById('status').innerText = "I think you are a funny guy.";
	RearmTimer();
	return false;
};
