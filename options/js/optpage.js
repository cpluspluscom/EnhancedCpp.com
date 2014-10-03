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

function Save() {
	var localOptions = {};
	for(var k in defaultOptions)
	{
		if(!defaultOptions.hasOwnProperty(k))
			continue; // trashy stuff
		var numericDefault = parseInt(defaultOptions[k]);
		if(isNaN(numericDefault))
			continue; // trashy stuff #2
		var numericItem;
		if(numericDefault > 1)
			numericItem = document.getElementById(k).value;
		else
			numericItem = document.getElementById(k).checked?1:0;
		localOptions[k]=numericItem;
	}
	chrome.storage.sync.set(localOptions,
	function() {
		var targetStatus = document.getElementById('status');
		targetStatus.textContent = 'Options Saved.'
		setTimeout(function(){targetStatus.textContent='';},1500);
	});
}
function Load() {
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
			
			if(numericDefault > 1)
				document.getElementById(k).value = numericItem;
			else
				document.getElementById(k).checked = (numericItem != 0)?1:0;
		}
	});
}
document.addEventListener('DOMContentLoaded', Load);
document.getElementById('save').addEventListener('click',Save);