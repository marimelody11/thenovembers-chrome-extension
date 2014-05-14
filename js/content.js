google.load("feeds", "1");
function initialize() {

	var feed = new google.feeds.Feed("http://the-novembers.com/live/feed"+"?"+(new Date()).getTime());
	feed.setNumEntries(10);

	feed.load(function(result) {
		if (!result.error) {
			var container = document.getElementById("feed");
			var html = "";
			for (var i = 0; i < result.feed.entries.length; i++) {
				var entry = result.feed.entries[i];

				//タイトルから日付を抽出
				var split = entry.title.split("/");
				var year = "20" + split[0];
				var month = split[1];
				var day = split[2];
				day = day.substr(0,2);
				day = day.match(/\d+/);
				day = day[0];
				var entryDate = new Date(year + "/" + month + "/" + day);

				//現在の日付
				var current = new Date();
				var currentYear = current.getFullYear();
				var currentMonth = current.getMonth()+1;
				var currentDay = current.getDate();
				var currentDate = new Date(currentYear + "/" + currentMonth + "/" + currentDay);

				//曜日
				var week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
				week = week[entryDate.getDay()];

				//タイトル
				var title = entry.title.replace("）",")");
				title = title.split(")");
				title = title[1];

				if(entryDate >= currentDate){
					html = "<h2>" + year + "/" + month + "/" + day + "(" + week + ")<br><a href='" + entry.link + "'>" + title + "</a></h2><div class='entry'>" + entry.content + "</div>";
					container.innerHTML = html;
					$("h2,.entry").not("eq(0)").hide();
				}
			}
			document.write(html);
		}
	});
}
google.setOnLoadCallback(initialize);