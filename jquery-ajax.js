$(document).ready(() => {



    //let filter = $("input:radio[name ='filter-options']:checked").val();
    $("input:radio[name ='filter-options']").click( () => { 
        if ($("input:radio[name ='filter-options']:checked").val() == "movyear"){
            $("#yearInput").show();
        }
        else{
            $("#yearInput").hide();
        }
    })
    
    $('#btnSearch').on('click', function (event) {
        event.preventDefault();
        if ($("input:radio[name ='filter-options']:checked").val() != undefined) {
            if ($("input:radio[name ='filter-options']:checked").val() == "movname") {
                getDataByMovieName($("#user-input").val())
            }

            else if ($("input:radio[name ='filter-options']:checked").val() == "imdbID") {
                getDataByImdbID($("#user-input").val())
            }
            else if ($("input:radio[name ='filter-options']:checked").val() == "movyear") {
                console.log("value is: " + $("#user-input").val() + " " + $("#yearInput").val() );
                getDataByMovieYear( $("#user-input").val() , $("#yearInput").val() )
            }
        } else {
            alert("Please select a filter")
        }
        console.log("value is: " + $("#user-input").val());


    })
})

let getDataByMovieName = (input) => {

    console.log("making request")
    // tt3896198
    $.ajax({

        type: 'GET',                 // request type GET, POST, PUT
        dataType: 'json',           // requesting datatype
        url: `http://www.omdbapi.com/?s=${input}&apikey=9d377467`,     // URL for getting data

        success: (resp) => { // in case of success response

            if (resp.Response === "True") {
                console.log(resp)
                $("#main-movie-results").empty();
                resp.Search.forEach(function (movie) {

                    if (movie.Poster != "N/A") {
                        let tempCard = ` <div class="card border-dark mb-3 " style="width: 15rem;">
                <img class="card-img-top" src="${movie.Poster}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title text-dark">${movie.Title}</h5>    
                    <p class="card-text">
                        <small class="text-muted">${movie.Year}</small>
                    </p>
                    <p class="card-text">Book tickets for this movie here.</p>
                    <button class="btn btn-outline-success bg-dark btn-block">Book tickets</button>
                </div>
            </div> `

                        $("#main-movie-results").append(tempCard);
                    } else {
                        let tempCard = ` <div class="card border-dark mb-3 " style="width: 15rem;">
                <img class="card-img-top" src="movie-reel.jpg" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title text-dark">${movie.Title}</h5>    
                    <p class="card-text">
                        <small class="text-muted">${movie.Year}</small>
                    </p>
                    <p class="card-text">Book tickets for this movie here.</p>
                    <button class="btn btn-outline-success bg-dark btn-block">Book tickets</button>
                </div>
            </div> `

                        $("#main-movie-results").append(tempCard);
                    }
                })
            }

        },
        error: (resp) => {      // in case of error response
            console.log(resp)
            alert("error " + resp.statusText)

        },

        beforeSend: () => {     // while request is processing.

            $.LoadingOverlay("show");
        },
        complete: () => {
            // setTimeout(function(){
            //     $.LoadingOverlay("hide");
            // }, 2000);
            $.LoadingOverlay("hide");
        },


    }) // end of AJAX request

}


// Get movie details by IMDb ID
let getDataByImdbID = (input) => {

    console.log("making request")
    // tt3896198
    $.ajax({

        type: 'GET',                 // request type GET, POST, PUT
        dataType: 'json',           // requesting datatype
        url: `http://www.omdbapi.com/?i=${input}&apikey=9d377467`,     // URL of getting data

        success: (resp) => { // in case of success response

            if (resp.Response === "True") {
                console.log(resp)
                $("#main-movie-results").empty();
                if (resp.Poster != "N/A") {
                    let tempCard = ` <div class="card border-dark mb-3 " style="width: 15rem;">
                    <img class="card-img-top" src="${resp.Poster}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title text-dark">${resp.Title}</h5>    
                        <p class="card-text">
                            <small class="text-muted">${resp.Year}</small>
                        </p>
                        <p class="card-text">${resp.Plot}</p>
                        <button class="btn btn-outline-success bg-dark btn-block">Book tickets</button>
                    </div>
                </div> `

                    $("#main-movie-results").append(tempCard);
                } else{
                    let tempCard = ` <div class="card border-dark mb-3 " style="width: 15rem;">
                    <img class="card-img-top" src="movie-reel.jpg" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title text-dark">${resp.Title}</h5>    
                        <p class="card-text">
                            <small class="text-muted">${resp.Year}</small>
                        </p>
                        <p class="card-text">${resp.Plot}</p>
                        <button class="btn btn-outline-success bg-dark btn-block">Book tickets</button>
                    </div>
                </div> `

                    $("#main-movie-results").append(tempCard);
                }

            }

        },
        error: (resp) => { // in case of error response
            console.log(resp)
            alert("error " + resp.statusText)

        },

        beforeSend: () => { // while request is processing.

            $.LoadingOverlay("show");
        },

        complete: () => {

            // what you want to do while request is completed
            $.LoadingOverlay("hide");

        },

    }) // end of AJAX request

}


// Get movie details by Movie Year
let getDataByMovieYear = (movName, movyear) => {

    console.log("making request")

    $.ajax({

        type: 'GET',                 // request type GET, POST, PUT
        dataType: 'json',           // requesting datatype
        url: `http://www.omdbapi.com/?t=${movName}&y=${movyear}&apikey=9d377467`,     // URL of getting data

        success: (resp) => { // in case of success response

            if (resp.Response === "True") {

                console.log(resp)
                $("#main-movie-results").empty();
                // for (movie in resp) {
                    // resp.forEach(function (movie) {
                        if (resp.Poster != "N/A") {
                    let tempCard = ` <div class="card border-dark mb-3 " style="width: 15rem;">
                <img class="card-img-top" src="${resp.Poster}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title text-dark">${resp.Title}</h5>    
                    <p class="card-text">
                        <small class="text-muted">${resp.Year}</small>
                    </p>
                    <p class="card-text">${resp.Plot}</p>
                    <button class="btn btn-outline-success bg-dark btn-block">Book tickets</button>
                </div>
            </div> `

                    $("#main-movie-results").append(tempCard);
                        } else{
                            let tempCard = ` <div class="card border-dark mb-3 " style="width: 15rem;">
                <img class="card-img-top" src="movie-reel.jpg" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title text-dark">${resp.Title}</h5>    
                    <p class="card-text">
                        <small class="text-muted">${resp.Year}</small>
                    </p>
                    <p class="card-text">${resp.Plot}</p>
                    <button class="btn btn-outline-success bg-dark btn-block">Book tickets</button>
                </div>
            </div> `

                    $("#main-movie-results").append(tempCard);
                        }
                //}
            }
        },

        error: (resp) => { // in case of error response
            console.log(resp)
            alert("error " + resp.statusText)

        },

        beforeSend: () => { // while request is processing.

            // you can use loader here.

            $.LoadingOverlay("show");

        },
        complete: () => {
            // what you want to do while request is completed
            $.LoadingOverlay("hide");
        },

    }) // end of AJAX request

}




