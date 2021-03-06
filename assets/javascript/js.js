$(document).ready(function () {
    //initial array of video games
    var videoGames = ["Skyrim", "Dark Souls", "Dark Souls 2", "Dark Souls 3", "Bloodborne", "The Witcher 3", "World of Warcraft", "Deus Ex", "God of War", "Shadow of the Colossus", "Morrowind", "FTL", "Half-Life 2"];
    // rendering the buttons
    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < videoGames.length; i++) {
            var a = $("<button>");
            a.addClass("videoGame-btn");
            a.attr("data-name", videoGames[i]);
            a.text(videoGames[i]);
            $("#buttons-view").append(a);
        }
    }
    $("#addVG").on("click", function (event) {
        event.preventDefault();
        var videoGame = $("#videoGame-input").val().trim();
        videoGames.push(videoGame);
        renderButtons();
    });
    $(document).on("click", ".videoGame-btn", function () {
        var videoGame = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + videoGame + "&api_key=Vflj615zpDEH41Qqr3XVVlGGVq7HSlzZ&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            var results = response.data
                for (i = 0; i < results.length; i++) {
                    var vgDiv = $("<div>");
                    var rating = results[i].rating;
                    var pOne = $('<p>').text('Rating: ' + rating);
                    vgDiv.append(pOne);
                    var animated = results[i].images.fixed_height_small.url;
                    var static = results[i].images.fixed_height_small_still.url;
                    var image = $("<img>");
                    image.attr("src", static);
                    image.addClass("gif");
                    image.attr("data-state", "still");
                    image.attr("data-still", static);
                    image.attr("data-animate", animated);
                    vgDiv.prepend(image);
                    $("#vG").prepend(vgDiv);
                }
                console.log(response);
        })        
    });
    renderButtons();
    $(document).on("click", ".gif", startStop);
    function startStop() {
        var state = $(this).attr("data-state");
        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("date-state", "still");
        }
    }
});




