google.load("feeds", "1");
function initialize() {
	var feed = new google.feeds.Feed("http://the-novembers.com/live/feed");
	feed.setNumEntries(10);

	feed.load(function(result) {
		if (!result.error) {
			var feedContent = document.getElementById("feed");
			var html = "";

			//現在の日付
			var current = new Date();
			var currentYear = current.getFullYear();
			var currentMonth = current.getMonth()+1;
			var currentDay = current.getDate();
			var currentDate = new Date(currentYear + "/" + currentMonth + "/" + currentDay);

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

				//曜日
				var week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
				week = week[entryDate.getDay()];

				//タイトル
				var title = entry.title.replace("）",")");
				title = title.split(")");
				title = title[1];

				//コンテンツ
				var content = entry.content.split('<p style="color:#000000">').join('<p>');

				if(entryDate >= currentDate){
					html += "<li><h2>" + year + "/" + month + "/" + day + "(" + week + ")<br>" + title + "</h2><div class='entry'>" + content + "</div></li>";
				}
			}

			feedContent.innerHTML = html;
		}
	});
}
google.setOnLoadCallback(initialize);