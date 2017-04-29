currentOptions = {};

////////////////////////////////////////////////////////////////////////////////

function LoadOption(key, item, pixelSize) {
	currentOptions[key] = pixelSize === 0 ? item : item + 'px';
}

////////////////////////////////////////////////////////////////////////////////

function DefQuoteState() {
	return (currentOptions['spl_qopen'] ? 'shown' : 'hidden') + 'icon';
}

function DefCodeState() {
	return (currentOptions['spl_copen'] ? 'shown' : 'hidden') + 'icon';
}

function DefOutpState() {
	return (currentOptions['spl_popen'] ? 'shown' : 'hidden') + 'icon';
}

////////////////////////////////////////////////////////////////////////////////

function DefQuoteHeight() {
	return currentOptions['spl_qopen'] ? 'auto' : currentOptions['spl_qsz'];
}

function DefQuoteExtendedHeight() {
	return currentOptions['spl_qopen'] ? 'auto' : currentOptions['spl_qxsz'];
}

function DefCodeHeight() {
	return currentOptions['spl_copen'] ? 'auto' : currentOptions['spl_csz'];
}

function DefOutpHeight() {
	return currentOptions['spl_popen'] ? 'auto' : currentOptions['spl_psz'];
}

////////////////////////////////////////////////////////////////////////////////

function DefQuoteClass() {
	return 'of' + (currentOptions['spl_qopen'] ? 'show' : 'hide');
}

function DefCodeClass() {
	return 'of' + (currentOptions['spl_copen'] ? 'show' : 'hide');
}

function DefOutpClass() {
	return 'of' + (currentOptions['spl_popen'] ? 'show' : 'hide');
}

////////////////////////////////////////////////////////////////////////////////

function QuoteButtonAllowed() {
	return currentOptions['allow_quote'];
}

function CodeButtonAllowed() {
	return currentOptions['allow_code'];
}

function QuoteSpoilerAllowed() {
	return currentOptions['splow_quote'];
}

function CodeSpoilerAllowed() {
	return currentOptions['splow_code'];
}

function OutputSpoilerAllowed() {
	return currentOptions['splow_outp'];
}

////////////////////////////////////////////////////////////////////////////////

function IsQuoteOpenDefault() {
	return currentOptions['spl_qopen'];
}

function IsCodeOpenDefault() {
	return currentOptions['spl_copen'];
}

function IsOutpOpenDefault() {
	return currentOptions['spl_popen'];
}

////////////////////////////////////////////////////////////////////////////////

function ShortQuoteHeight() {
	return currentOptions['spl_qsz'];
}

function ShortQuoteExtendedHeight() {
	return currentOptions['spl_qxsz'];
}

function ShortCodeHeight() {
	return currentOptions['spl_csz'];
}

function ShortOutpHeight() {
	return currentOptions['spl_psz'];
}
