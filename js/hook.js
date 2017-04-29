var allScripts = document.getElementsByTagName('script');

var ThreadID = null;
var ThreadArchived = null;

function EditPage()
{
	if(ThreadID === null)
		return;
	
	// Get the starting conditions...
	var canReply = (ThreadArchived === 0);
	
	// Add buttons
	var PostList = document.getElementById('CH_PostList');
	if(PostList) {
		var PostDivs = PostList.getElementsByTagName('div');
		var PostDivsLen = PostDivs.length;
		for(var i = 0; i !== PostDivsLen; i++)
		{
			var div = PostDivs[i];
			
			if(div.id.indexOf('msg') === 0 /* It's a message */ &&
				!Number.isNaN(+div.id.substr(3)) /* Has a message ID */)
			{
				var SpanList = div.getElementsByTagName('span');
				var SpanListLen = SpanList.length;
				for(var y = 0; y !== SpanListLen; y++)
				{
					var span = SpanList[y];
					var PostID = +span.id.substr(6);
					if(span.className === 'dbtn' /* right class name */ &&
						span.id.indexOf('CH_btn') === 0 /* id begins with CH_btn */ &&
						!Number.isNaN(PostID))
					{
						// Add "Show as Code" and "Quote".
						CreateButtons(span, PostID, canReply);
					}
				}
			}
		}
	}
	
	
	// Create spoiler tags
	// Quotes
	var AllQuotes = document.getElementsByClassName('quote');
	for (var i = 0; i !== AllQuotes.length; i++) {
		isEditablePage = 1;

		var ItemType = +(AllQuotes[i].getElementsByClassName('qh').length !== 0) + 1;
		CreateSpoiler(AllQuotes[i], ItemType, canReply); // quote -> 1, named quote -> 2
	}

	// Code and Output
	var AllCodes = document.getElementsByClassName('snippet');
	for (var i = 0; i != AllCodes.length; i++) {
		isEditablePage = 1;

		var ItemType = (AllCodes[i].getElementsByClassName('output').length !== 0) ? 3 : 0;
		CreateSpoiler(AllCodes[i], ItemType, canReply); // code -> 0, output -> 3
	}
}

// Validation
var HasEdited = false;
var HasLoadedProperties = false;
var HasLoadedOptions = false;

function CheckRun()
{
	if(HasLoadedOptions === true &&
		HasLoadedProperties === true &&
		HasEdited === false)
	{
		HasEdited = true;
		EditPage();
	}
}
function SetOptionsLoaded(val)
{
	HasLoadedOptions = !!val;
	CheckRun();
}
function SetPropertiesLoaded(val)
{
	HasLoadedProperties = !!val;
	CheckRun();
}

// Hook the topic's properties.
// Looks neat, doesn't it?
function SetPostProperties(threadid, threadarchived, threadauthor, threadsolved, elidPosts, elidSubscription, elidReply, elidInsNew, elidAuthor, httpthreads, httpposts, httpbookmark, accesspost, accessreport, accessfilter, accesstrusted, accessmod, accessbookmark)
{
	ThreadID = threadid;
	ThreadArchived = threadarchived;
	SetPropertiesLoaded(true);
	AddPrototypes([{from: "%THREADID%",to: ThreadID}]);
}

function HookPostProperties()
{
	var scripts = document.getElementsByTagName('script');
	var scriptsLen = scripts.length;
	for(var i = 0; i !== scriptsLen; i++)
	{
		var scriptText = scripts[i].text;
		if(scriptText.indexOf("for_PostList") >= 0) {
			scriptText = scriptText.replace("for_PostList", "SetPostProperties");
			scriptText = scriptText.replace("new", "");
			RunJavascript(scriptText);
		}
	}
}