; (function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const genresPanel = document.querySelector('#genres')
  const displayMovie = document.querySelector('#displayMovie')
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  //display genres
  let htmlContent = ''
  for (let i in genres) {
    htmlContent +=
      `<a class="list-group-item list-group-item-action font-weight-normal"  data-toggle="list" href="#" data-id="${i}"> ${genres[i]}</a>`
  }
  genresPanel.innerHTML = htmlContent

  //get API data
  axios.get(INDEX_URL)
    .then(function (response) {
      // handle success
      data.push(...response.data.results)
      console.log(response.data.results)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

  function makeGenres(item) {
    let genresContent = ''
    for (let i in genres) {
      if (item.genres.includes(Number(i))) {
        genresContent +=
          `<span class="badge badge-light ml-1 text-muted font-weight-light">${genres[i]}</span>`
      }
    }
    return genresContent
  }
  //display movie-list with genres
  function displayMovieGenre(e) {
    let htmlContent = ''
    data.forEach(item => {
      if (item.genres.includes(Number(e.target.dataset.id))) {
        htmlContent += `
         <div class= "col-md-3">
           <div class="card mb-2">
           <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
            <h6 class="card-title">${item.title}</h6>
            ${makeGenres(item)}<!--分類電影 -->
            </div>
           </div>
          </div>
        `
      }
    })
    if (!htmlContent) {
      htmlContent = `<h3>Not found</h3>`
    }
    displayMovie.innerHTML = htmlContent
  }
  //////////////////////////////
  genresPanel.addEventListener('click', displayMovieGenre)


})()