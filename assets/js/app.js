$(document).ready(function () {

    //Initial array of sports
    var queries = ["swimming", "running", "cycling", "soccer"];

    //Initial click event listener to dynamically add buttons
    $(document.body).on("click", '.sport-btn', function (event) {
        event.preventDefault();

        //Grabbing and storing the data-sport property value from the button
        var sport = $(this).attr("data-sport");
        console.log(sport)

        //Query URL using the sport name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=UaCvbJz15Pp7EUqC2ShzjvztCOgVMVu4&limit=10";

        //Perform AJAX request with queryURL
        $.ajax({
            url: queryURL,
            method: "GET"

            //Then after data comes back from the request    
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);

            //Div to hold the sport
            var sportDiv = $("<div class='sport'>");
            //Storing the rating data
            var ratingInfo = response.rating;
            //Create an elememt t0 display the rating info
            var r = $("<p>").text("Rating: " + ratingInfo);
            //Displaying the rating
            sportDiv.append(r);

            //Retrieving URL for the sport
            var imgURL = response.gif;
            //Element to hold the image
            var image = $("<img>").attr("src", imgURL);
            //Appending the image
            sportDiv.append(image);

            //Prepending lates sport before all others
            $("#sports-view").prepend(sportDiv);
        });
    });

    //Set up the push to the DOM of the initial array and displaying future input requests
    function queriesButtons() {

        //Deleting sports prior to adding new ones to prevent repeat buttons
        $("#buttons-view").empty();

        //Looping through the queries array to add new input requests
        for (var i = 0; i < queries.length; i++) {

            //Dynamically creating the first button from the queries array values
            var btn1 = $("<button>");
            btn1.addClass("btn btn-primary sport-btn");
            btn1.attr("data-sport", queries[i]);
            btn1.text(queries[i]);

            //Create the next button to append after the first button is created
            var btn2 = $("<button>")
            btn2.addClass('sport-btn');
            btn2.attr("data-sport", queries[i]);
            btn2.text(queries[i]);
            $("#buttons-view").append(btn1);
        }
    }

    //Calling the sports array handler function to display initial buttons
    queriesButtons();


    //Set up a function to animate still gif images
    $(".gif").on("click", function animateGifs() {
        let state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).data("animate"))
        } else {
            $(this).attr("src", $(this).attr("animate"));
            $(this).attr("data-state", "still");
        }
    });

    //Setting the click event listener to get the user input from the form field
    $("#add-sport").on("click", function (event) {

        //Preventing the page to refresh after every click
        event.preventDefault();
        var sport = $("#sport-input").val().trim();

        //Pushing the input request to the queries array
        queries.push(sport);
        queriesButtons();
    });

});