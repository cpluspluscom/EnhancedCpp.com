chrome.storage.sync.get(defaultOptions,
	function(items) {
		for(var k in items)
		{
			if(!defaultOptions.hasOwnProperty(k))
				continue; // unknown option
			var numericDefault = parseInt(defaultOptions[k]);
			if(isNaN(numericDefault))
				continue; // shouldn't happen
			var numericItem = parseInt(items[k]);
			if(isNaN(numericItem))
				numericItem = numericDefault; // invalid stored option. load fallback.
			
			LoadOption(k,numericItem,(numericDefault>1)?1:0);
		}
		RunPageEdit();
});