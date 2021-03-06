
$("#getInfo").on("click", function(e) {
		e.preventDefault();
		var valueSearched = $("#valueSearched").val();
		$.ajax({
			url: "http://api.giantbomb.com/search/",
			type: "get",
			data: {
				api_key: "be78ab7bb822bf90173073ba3336431b403e1ce5",
				query: valueSearched,
				format: "jsonp",
				json_callback: "gamer",
				resources: "game"
			},
			dataType: "jsonp"
		});
	});
	function gamer(data) {
		console.log(data)
		var listGames = data.results;
		var tplOption = "<li class='gamesLi'><a><%GAME-NAME%></a>	<button type='button' class='btn btn-primary' value=ID >Click for info</button>	</li>"
		var optionsGames = listGames
					.filter(game => game.resource_type == 'game' )
					.map( game => tplOption.replace('<%GAME-NAME%>', game.name).replace('ID', game.api_detail_url) )
		$("#listGames").html(optionsGames.join(''))
	}



	$("#listGames").on("click", "button", function(e) {
		var catchedValue = $(this).val()
		console.log(catchedValue)
		$.ajax({
			url: catchedValue,
			type: "get",
			data: {
				api_key: "be78ab7bb822bf90173073ba3336431b403e1ce5",
				format: "jsonp",
				json_callback: "infoGame"
			},
			dataType: "jsonp"
		});
	})
	function infoGame(data) {
		var listInfoGames = data.results;
		console.log(listInfoGames)
		$("#description").html('Description: ' + listInfoGames.deck)
		$("#title").html('Title: ' + listInfoGames.name)
		$("#releaseDate").html('Release Date: ' + listInfoGames.original_release_date)
		$("#genre").html('Platform: ' + listInfoGames.platforms[0].abbreviation)
		$("#platform").html('Genre: ' + listInfoGames.genres[0].name)
		$("#imgGame").attr("src", listInfoGames.image.small_url)
	}
