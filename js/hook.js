// Important variables
var ThreadID = null;
var ThreadArchived = null;

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
		EnhanceWebsite();
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