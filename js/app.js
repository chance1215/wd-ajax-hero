(function() {
 'use strict';

 const movies = [];

 const renderMovies = function(arr) {
   $('#listings').empty();

   for (const movie of arr) {
     const $col = $('<div>').addClass('col s6');
     const $card = $('<div>').addClass('card hoverable');
     const $content = $('<div>').addClass('card-content center');
     const $title = $('<h6>').addClass('card-title truncate');

     $title.attr({
       'data-position': 'top',
       'data-tooltip': movie.Title
     });

     $title.tooltip({ delay: 50 }).text(movie.Title);

     const $poster = $('<img>').addClass('poster');

     $poster.attr({
       src: movie.Poster,
       alt: `${movie.Poster} Poster`
     });

     $content.append($title, $poster);
     $card.append($content);

     const $action = $('<div>').addClass('card-action center');
     const $plot = $('<a>');

     $plot.addClass('waves-effect waves-light btn modal-trigger');
     $plot.attr('href', `#${movie.imdbID}`);
     $plot.text('Plot Synopsis');

     $action.append($plot);
     $card.append($action);

     const $modal = $('<div>').addClass('modal').attr('id', movie.imdbID);
     const $modalContent = $('<div>').addClass('modal-content');
     const $modalHeader = $('<h4>').text(movie.Title);
     const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
     const $modalText = $('<p>').text(`Synopsis of ${movie.Plot}`);

     $modalContent.append($modalHeader, $movieYear, $modalText);
     $modal.append($modalContent);

     $col.append($card, $modal);

     $('#listings').append($col);

     $('.modal-trigger').leanModal();
   }
 };

  // ADD YOUR CODE HERE
  let inputTitle = document.querySelector('button');
  let text = document.querySelector('input');

  inputTitle.addEventListener('click',function(event){
    event.preventDefault()
    axios.get(`http://www.omdbapi.com/?s=${text.value}&apikey=3843d8d1`)
      .then(function(response){
        renderMovies(response.data.Search)

    });
  });

})();
