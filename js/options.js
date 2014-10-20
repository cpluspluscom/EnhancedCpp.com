var currentOptions = {};

function LoadOption(key,item,pixelsize){currentOptions[key] = (pixelsize==0)?(item):(''+item+'px');}

function DefQuoteState(){return currentOptions['spl_qopen']?"shownicon":"hiddenicon";}
function DefCodeState(){return currentOptions['spl_copen']?"shownicon":"hiddenicon";}
function DefOutpState(){return currentOptions['spl_popen']?"shownicon":"hiddenicon";}

function DefQuoteHeight(){return currentOptions['spl_qopen']?"auto":currentOptions['spl_qsz'];}
function DefQuoteExtendedHeight(){return currentOptions['spl_qopen']?"auto":currentOptions['spl_qxsz'];}
function DefCodeHeight(){return currentOptions['spl_copen']?"auto":currentOptions['spl_csz'];}
function DefOutpHeight(){return currentOptions['spl_popen']?"auto":currentOptions['spl_psz'];}

function DefQuoteClass(){return currentOptions['spl_qopen']?"ofshow":"ofhide";}
function DefCodeClass(){return currentOptions['spl_copen']?"ofshow":"ofhide";}
function DefOutpClass(){return currentOptions['spl_popen']?"ofshow":"ofhide";}

function QuoteButtonAllowed(){return currentOptions['allow_quote'];}
function CodeButtonAllowed(){return currentOptions['allow_code'];}
function QuoteSpoilerAllowed(){return currentOptions['splow_quote'];}
function CodeSpoilerAllowed(){return currentOptions['splow_code'];}
function OutputSpoilerAllowed(){return currentOptions['splow_outp'];}
function CompileAllowed(){return currentOptions['allow_cbox'];}

function IsQuoteOpenDefault(){return currentOptions['spl_qopen'];}
function IsCodeOpenDefault(){return currentOptions['spl_copen'];}
function IsOutpOpenDefault(){return currentOptions['spl_popen'];}

function ShortQuoteHeight(){return currentOptions['spl_qsz'];}
function ShortQuoteExtendedHeight(){return currentOptions['spl_qxsz'];}
function ShortCodeHeight(){return currentOptions['spl_csz'];}
function ShortOutpHeight(){return currentOptions['spl_psz'];}