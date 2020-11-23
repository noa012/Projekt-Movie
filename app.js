

const buttonelement=document.querySelector('#search');
const Inputelement=document.querySelector('#InputValue');
const Moviesearchable=document.querySelector('#movies-serchable');

const API_KEY='ddac2a9248a58d23cea75a9609c45bbc';
const url='https://api.themoviedb.org/3/search/movie?api_key=ddac2a9248a58d23cea75a9609c45bbc'
const image_url="https://image.tmdb.org/t/p/w500/"
const overviewurl=""


buttonelement.onclick=function(event){
    event.preventDefault();
    const value = Inputelement.value;
    const newUrl=url+'&query='+value;
    fetch(newUrl)
                .then((res)=>res.json())
                .then(renderSearchmovies)
                .catch((error)=>{
                    console.log.apply('Error: ',error);
                });
    Inputelement.value='';
}

function createMovieCointainer(movies){
    const movieelement=document.createElement('div');
    movieelement.setAttribute('class','movie');
    const movietemplate=`
    <section class="section">
    ${movieSelection(movies)}
    </section>
    <div class="content" class="content-display">
        <p id="content-close">X</p>
    </div>`
    ;
    movieelement.innerHTML=movietemplate;
    return movieelement;
}
function overviewselection(movies){
    return movies.map((movie)=>{
        if(movie.overview){
            return`<p>${movie.overview}</p>`
        }
    })
}

function movieSelection(movies){
    return movies.map((movie)=>{
       if(movie.poster_path){
        return `<img
             src=${image_url + movie.poster_path}
             data-movie-id=${movie.id}
             alt=${movie.overview}
        />`;
       }
    })
}

function renderSearchmovies(data){
    Moviesearchable.innerHTML='';
    const movies=data.results;
    const movieBlock = createMovieCointainer(movies);
    Moviesearchable.appendChild(movieBlock);
    console.log('Data:', data);
}


document.onclick=function(event){
    const target=event.target;
    if(target.tagName.toLowerCase()=='img'){
        const synopsis= target.alt;
        console.log('synopsis:',synopsis);
        const section=event.target.parentElement;
        const content=section.nextElementSibling;
        content.classList.add('content-display');
    }
    if(target.id=='content-close'){
        const content=target.parentElement;
        content.classList.remove('content-display')
    }
}

