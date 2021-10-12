
   
    const tsideAnime = document.querySelector('.tsideAnime')
    const tsideManga = document.querySelector('.tsideManga')
    const buttonSearch = document.querySelector('.button-search')
    const leWindowOverlay = document.querySelector('.leWindow-overlay');
    const leWindowDOM =  document.querySelector('.leWindow');                
    const leftHeaderBars = document.querySelector('.left-header-bars')    
    const closeLeWindow = document.querySelector('.close-leWindow')
    
    



    //Listeners para mostrar e fechar a janela de categorias 

    leftHeaderBars.addEventListener("click", e =>{
    
    
        leWindowOverlay.classList.add('transparentBcg')
        leWindowDOM.classList.add('showLeWindow')
    
    
    
    
    })
    
    
    closeLeWindow.addEventListener("click", e =>{
    
    
        leWindowOverlay.classList.remove('transparentBcg')
            
        leWindowDOM.classList.remove('showLeWindow')
    
    
    
    
    })

    /**/
    
    /*inicio do slider*/
    
    
    let squareImgs = [];
    let slider;
    let actualImg;
    let maxImg;    
    let timeChanges;
    let vtime;
    let vloadOverlay;


    
    function preLoad(){

        let s=1;

        for(let i=0; i<3; i++){
        squareImgs[i] = new Image();
        squareImgs[i].src="imgs/s"+s+".jpeg";
        s++;
    }


    }
    
    
    function loadImg(img){

        slider.style.backgroundImage="url('"+squareImgs[img].src+"')";
        


    }


    function startSlider(){
        preLoad();
        actualImg=0;
        maxImg=squareImgs.length-1;

        slider=document.getElementById("dvslider")
        vloadOverlay=document.getElementById("dvLoadOverlay")

        loadImg(actualImg);
        timeChanges=0;
        anima();
        
    }



    function change(dir){

        timeChanges=0;

        actualImg+=dir;
        if(actualImg > maxImg){

            actualImg=0;


        }else if(actualImg < 0){

            actualImg=maxImg;

        }

        loadImg(actualImg);


    }



    function anima(){

        timeChanges++;
        if(timeChanges >= 500){

            timeChanges=0;
            change(1);


        }

        vtime=timeChanges/5;
        vloadOverlay.style.width=vtime+"%";
        window.requestAnimationFrame(anima);



    }



    window.addEventListener("load", startSlider())

    /*fim do slider*/


    







    
    //Buscar os "top Animes" requisitados e manda como parâmetro para a função topAnimeTela
    const getTopAnime = async () =>{

        const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
        .then(res => res.json());

        let topAnime = temp.top.slice(0, 5);


        console.log("topAnime", topAnime)
        topAnimeTela(topAnime)


    }







    getTopAnime();






    //Ao receber os parâmetros, alocar cada parte do objeto e alocar nos elementos determinados
    function topAnimeTela(topAnime){

        let result='';

        topAnime.map(anime =>{
            result+= `            
            <div class="trending">            
            <img src=${anime.image_url} alt ="Anime Image"/>
            <a href=${anime.url}>${anime.title}</a>
            <p>número de episódios: ${anime.episodes}</p>
            <p>nota: ${anime.score}</p>
            <p>data de estreia: ${anime.start_date}</p>
            <a href=${anime.url}><button>ver mais+</button></a>
               
            </div>            
            `           

        })

        tsideAnime.innerHTML = result;
    }








    //Buscar os "top Mangás" e mandar como parâmetro para a função topMangaTela
        const getTopManga = async () =>{

        const temp1 = await fetch(`https://api.jikan.moe/v3/top/manga/1/bypopularity`) 
        .then(res => res.json());

        let topManga = temp1.top.slice(0, 5);

        topMangaTela(topManga);


    }


    getTopManga();



    
    //Ao receber os parâmetros, alocar cada parte do objeto e alocar nos elementos determinados
    function topMangaTela(topManga){


        let result='';

        topManga.map(manga =>{
            result+= `
            
            <div class="trending">            
            <img src=${manga.image_url} alt ="Manga Image"/>
            <a href=${manga.url}>${manga.title}</a>
            <p>Volumes: ${manga.volumes}</p>
            <p>nota: ${manga.score}</p>
            <p>data de estreia: ${manga.start_date}</p>
            <a href=${manga.url}><button>ver mais+</button></a>
               
            </div>

            `


        })

        tsideManga.innerHTML = result;


    }

