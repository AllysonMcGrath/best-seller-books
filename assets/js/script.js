var titleList = JSON.parse(localStorage.getItem("titles")) || [];



$("#search-button").on("click", function() {
    var searchTerm = document.querySelector("#search-term").value.trim();
    var nytApiUrl = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?title=" + searchTerm + "&api-key=amzFBwUa2DisEG27fTuW0uiskiCAISXs";
    console.log(searchTerm)
    fetch(nytApiUrl)
    .then(function(response) {
        return response.json();
    })

    .then(function(response) {
        console.log(response);

        for (var i=0; i < response.results.length; i++) {
            var resultsEl = document.querySelector("#results")
            var title = response.results[i].title;
            var author = response.results[i].author;
            var resultsButton = document.createElement("button");

            resultsButton.innerText = title + " by " + author;
            resultsButton.className = "result-button";
            resultsButton.id = title;
            resultsEl.appendChild(resultsButton);
            console.log("done");
        }
    })
});


function clearDescription() {
    $("#description").empty();
}

$("#results").on("click", ".result-button", function(){
    var title = $(this).attr("id");
    var googleBooksApiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + title + "&key=AIzaSyBxQDJyQc1Px2U4kjvYMthf3AGzE3im904";

    titleList.push(title);
    localStorage.setItem("title", JSON.stringify(titleList));

    clearDescription();
    
    fetch(googleBooksApiUrl)
        .then(function(response) {
            return response.json();
        })

        .then(function(response) {
            console.log(response);
            var descriptionEl = document.querySelector("#description")
            var description = response.items[0].volumeInfo.description;
            var descriptionParagraph = document.createElement("p");
            var pageTitle = document.createElement("h2");
            var titleAuthor = response.items[0].volumeInfo.title + " by " + response.items[0].volumeInfo.authors;

            pageTitle.innerText = titleAuthor;
            descriptionEl.appendChild(pageTitle);
            descriptionParagraph.innerText = description;
            descriptionEl.appendChild(descriptionParagraph);
        })
});