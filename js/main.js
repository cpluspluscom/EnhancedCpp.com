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

		LoadOption(k, numericItem, +(numericDefault > 1));
	}

	HookPostProperties();
	SetOptionsLoaded(true);
	ExecuteAutoQuote();
});