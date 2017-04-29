/*
	This is used to enable quotes in multi-page threads.
*/

function ExecuteAutoQuote()
{
	var q_body = localStorage.getItem('q_body');
	var q_tid = localStorage.getItem('q_tid');
	if (q_body && q_tid && window.location.pathname.indexOf(q_tid) !== -1 && document.getElementById('CH_reply')) {
		var reply = document.getElementById('CH_reply').getElementsByTagName('a')[0].click();
		reply = document.getElementById('CH_reply').getElementsByTagName('textarea');

		reply[0].value = q_body;
	}
	localStorage.removeItem('q_body');
	localStorage.removeItem('q_tid');
}
