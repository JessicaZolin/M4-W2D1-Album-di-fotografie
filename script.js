
document.querySelector("#btn-ricerca").addEventListener("click", () => {
    let query = document.querySelector("#input-ricerca").value

    //mostra h1 e sovrascrive con dati presi da input utente
    let titolo = document.querySelector("h1")
    titolo.classList.remove("d-none")
    titolo.innerHTML = ""
    titolo.innerHTML = `<h1>Fotografie per ${query}`

    // mostra carosello
    document.querySelector(".carousel").classList.remove("d-none")

    // fa fetch su pexel con input inserito da utente
    fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        headers: {
            Authorization: '0RWVWGZfN90aVUzIRemawzAQ4VG7hqw1y9juUBRVXgy70GLvJFwYt412' // my API Key
        }
    })
        .then((response) => {
            // Controlla se la risposta è valida
            if (!response.ok) {
                throw new Error(`Errore ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data => {
            console.log(data)
            stampaImmaginiCarosello(data)
            stampaImmaginiSimgole(data)
        }))
        .catch(error => { console.log(error); })


    // FUNZIONE PER STAMPARE LE IMMAGINI NEL CAROSELLO
    const stampaImmaginiCarosello = (data) => {
        // crea bottoni del carosello in base a quanti sono gli elementi dell'array che andiamo ad utilizzare.

        let carouselIndicators = document.querySelector(".carousel-indicators")
        carouselIndicators.innerHTML = data.photos.map((photo, index) => {
            return `<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}"
                        aria-current="true" aria-label="Slide ${1 + index}"></button>`
        }).join("") // per non far stampare le virgole dell'array in HTML



        // applica la classe activ solo al primo item
        const firstCarouselIndicator = document.querySelector(".carousel-indicators button")
        console.log(firstCarouselIndicator);

        if (firstCarouselIndicator) {
            firstCarouselIndicator.classList.add("active")
        }






        // crea i vari items del carosello con foto e fotografo

        let carouselInner = document.querySelector(".carousel-inner")
        carouselInner.innerHTML = data.photos.map(photo => {
            return `<div class="carousel-item">
                        <p class="d-flex justify-content-center mt-3"><b>Author</b>: ${photo.photographer}</p>
                        <img src="${photo.src.large}" class="d-block w-100 h-100 object-fit-contain" alt="...">
                    </div>`
        }).join("")



        // applica la classe activ solo al primo item
        const firstCarouselItem = document.querySelector(".carousel-item")
        console.log(firstCarouselItem);

        if (firstCarouselItem) {
            firstCarouselItem.classList.add("active")
        }

    }



    // FUNZIONE PER STAMPARE LE IMMAGINI SU CARD SINGOLE
    const stampaImmaginiSimgole = (data) => {
        let boxContenitore = document.querySelector("#contenitoreFotoSingole")
        console.log(boxContenitore);
        
        boxContenitore.innerHTML = data.photos.map(photo => {
            return `<div class="card" style="width: 22rem; height:25rem">
                        <img src="${photo.src.large}" class="card-img-top w-100 h-75 object-fit-contain" alt="...">
                        <div class="card-body">
                            <p class="card-text"><b>Author</b>: ${photo.photographer}</p>
                        </div>
                    </div>`
        }).join("")
    }


    // svuota input utente
    document.querySelector("#input-ricerca").value = ""
})