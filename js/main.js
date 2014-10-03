var defaultOptions =
{
	allow_quote:'1',
	allow_code:'0',
	splow_quote:'1',
	splow_code:'0',
	splow_outp:'1',
	spl_qopen:'0',
	spl_qsz:'20',
	spl_qxsz:'35',
	spl_copen:'1',
	spl_csz:'20',
	spl_popen:'0',
	spl_psz:'20'
};

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