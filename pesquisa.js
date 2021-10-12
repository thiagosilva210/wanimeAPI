const resultSearchE = document.querySelector('.result-searchE')
const leWindowOverlay = document.querySelector('.leWindow-overlay');
const leWindowDOM =  document.querySelector('.leWindow');
const closeLeWindow = document.querySelector('.close-leWindow')
const leftHeaderBars = document.querySelector('.left-header-bars')
    
   
    
    leftHeaderBars.addEventListener("click", e =>{
    
    
        leWindowOverlay.classList.add('transparentBcg')
        leWindowDOM.classList.add('showLeWindow')
    
    
    
    
    })




    closeLeWindow.addEventListener("click", e =>{


    leWindowOverlay.classList.remove('transparentBcg')
        
    leWindowDOM.classList.remove('showLeWindow')

    })









    
    const fetchAnime = async (query) =>{

    const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=15`)
    .then(res => res.json());



    let searchedAnimes = temp.results;


     let result='';

     searchedAnimes.map(anime =>{
         result+= `
         
         <div class="anime-item">
        
         <img src=${anime.image_url} alt ="Anime Image"/>
         
         <a href=${anime.url}>
         <p> ${anime.title}</p>
         </a>
         
         <p>número de episódios: ${anime.episodes}</p>
         <p>nota: ${anime.score}</p>         
         <a href=${anime.url}><button>ver mais+</button></a>


         </div>
         
         `         

     })

     resultSearchE.innerHTML = result;


}








let GET = {};
let query = window.location.search.substring(1).split("&");


for (let i = 0, max = query.length; i < max; i++){
  
    if (query[i] === "")
        continue;

    let param = query[i].split("=");

    let searchs = param[1].split("+").join(" ")

   GET[decodeURIComponent(searchs)] = decodeURIComponent(searchs || "");


   fetchAnime(searchs); 

   
}


