var data = (function() {
	var queryString = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");

	for (var i = 0; i < vars.length; i++){
		var pair = vars[i].split("=");
		if (queryString[pair[0]] === undefined) {
			queryString[pair[0]] = pair[1];
		} else if (typeof queryString[pair[0]] === "string") {
			queryString[pair[0]] = [queryString[pair[0]], pair[1]];
		} else {
			queryString[pair[0]].push(pair[1]);
		}
	}

	return queryString;
})();

if (data.src) {
	localStorage.setItem('src', unescape(data.src));
} else {
	localStorage.removeItem('src');
}
