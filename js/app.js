$("#getInfo").on("click", function(e) {
		e.preventDefault();
		var valueSearched = $("#valueSearched").val();
		console.log()
		$.ajax({
			url: "http://api.giantbomb.com/search/",
			type: "get",
			data: {
				api_key: "be78ab7bb822bf90173073ba3336431b403e1ce5",
				query: valueSearched,
				field_list: "name, image",
				format: "jsonp",
				json_callback: "gamer"
			},
			dataType: "jsonp"
		});
	});
	function gamer(data) {
		var listGames = data.results;
		var tplOption = "<li><a href='#'><%GAME-NAME%></a></li>"
		var optionsGames = listGames
					.filter(game => game.resource_type == 'game' )
					.map( game => tplOption.replace('<%GAME-NAME%>', game.name) )
		$("#listGames").html(optionsGames.join(''))
	}