/*
	This is used to enable quotes in multi-page threads.
*/

function ExecuteAutoQuote()
{
	window.addEventListener("beforeunload", function() {
		var reply = document.getElementById('CH_reply').getElementsByTagName('textarea');
		if(reply[0] && reply[0].value.length !== 0) {
			localStorage.setItem('q_body', reply[0].value);
			localStorage.setItem('q_tid', ThreadID);
		}
	});
	
	if(document.getElementById('CH_reply')) {
		var q_body = localStorage.getItem('q_body');
		var q_tid = localStorage.getItem('q_tid');
		if (q_body && q_tid && ThreadID == q_tid) {
			var reply = document.getElementById('CH_reply').getElementsByTagName('a')[0].click();
			reply = document.getElementById('CH_reply').getElementsByTagName('textarea');
			reply[0].value = q_body;
			
			localStorage.removeItem('q_body');
			localStorage.removeItem('q_tid');
		}
	}
}
