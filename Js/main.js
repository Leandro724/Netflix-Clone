// API Key 
let api_key = "f110971f3f6f544c662786cea77ca1a5";
let img_url = "https://image.tmdb.org/t/p/w500";
let genres_list_http = "https://api.themoviedb.org/3/genre/movie/list?";
let movie_genres_http = "https://api.themoviedb.org/3/discover/movie?";
let main = document.querySelectorAll('#main');

// Fetch Method 

    // Fetching Genres List
    fetch(genres_list_http + new URLSearchParams({
        api_key:api_key
    }))
    .then(response =>{
      if (!response.ok){
          throw Error("False API");
      }
      return response.json();
    })
    .then( data =>{
        // console.log(data.genres);
        data.genres.forEach(item => {
            fetchMoviesListByGenres(item.id, item.name);
        });
    })

       // Fetching Movie Genres List
    const fetchMoviesListByGenres = (id,genres) => {
        fetch(movie_genres_http + new URLSearchParams({
            api_key:api_key,
            with_genres:id,
            page: Math.floor(Math.random() *3)+1
        }))
        .then(response =>{
        if (!response.ok){
            throw Error("False API");
        }
        return response.json();
        })
        .then( data =>{
            console.log(data);
        
        makeCategoryElement(`${genres}_movies`, data.results)
        }).catch(error => console.log(error));

        // Generating the Images on the Html
                const makeImages = (id, data) =>{
                        const movieRow = document.getElementById(id);

                        data.forEach((item, i) => {
                            if(item.backdrop_path == null){
                                item.backdrop_path = item.poster_path;
                                if(item.backdrop_path == null){
                                    return;
                                }
                            }
                            movieRow.innerHTML += `
                            <img src="${img_url}${item.backdrop_path}" alt="" class="row_poster"/>
                            `
                        })
                    }
        // Generating the Movie Title on the Html
        const makeCategoryElement = (category,data) =>{
            // console.log(data);
            main[0].innerHTML += `
            <div class="row">
                <h2>${category.split("_").join(" ")}</h2>
                <div class="row_posters" id="${category}">
                    
                </div>
            </div>
            `;
            makeImages(category,data);

        }
        }

        // Nav Bar Functionality
        const nav = document.querySelector('.nav');
        window.addEventListener('scroll', ()=>{
            
            if(window.scrollY >=100){
                nav.classList.add('nav_black')
            
            }else{
                nav.classList.remove('nav_black')
            }
        });

