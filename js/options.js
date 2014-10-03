var AllowQuoteButton=1;
var AllowCodeButton=1;
var AllowQuoteSpoilers=1;
var AllowCodeSpoilers=1;
var DefQuoteOpen=0;
var DefCodeOpen=1;
var DefQuoteSize="20px";
var DefQuoteExtSize="35px";
var DefCodeSize="20px";

function DefQuoteState(){return DefQuoteOpen?"shownicon":"hiddenicon";}
function DefCodeState(){return DefCodeOpen?"shownicon":"hiddenicon";}
function DefQuoteHeight(){return DefQuoteOpen?"auto":DefQuoteSize;}
function DefQuoteExtendedHeight(){return DefQuoteOpen?"auto":DefQuoteExtSize;}
function DefCodeHeight(){return DefCodeOpen?"auto":DefCodeSize;}
function DefQuoteClass(){return DefQuoteOpen?"ofshow":"ofhide";}
function DefCodeClass(){return DefCodeOpen?"ofshow":"ofhide";}

function QuoteButtonAllowed(){return AllowQuoteButton;}
function CodeButtonAllowed(){return AllowCodeButton;}
function QuoteSpoilerAllowed(){return AllowQuoteSpoilers;}
function CodeSpoilerAllowed(){return AllowCodeSpoilers;}
function IsQuoteOpenDefault(){return DefQuoteOpen;}
function IsCodeOpenDefault(){return DefCodeOpen;}
function ShortQuoteHeight(){return DefQuoteSize;}
function ShortQuoteExtendedHeight(){return DefQuoteExtSize;}
function ShortCodeHeight(){return DefCodeSize;}