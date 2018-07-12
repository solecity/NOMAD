
// --------------------------------------
// LOAD
function addLoadEvent(func) {
    let oldonload = window.onload

    if (typeof window.onload != 'function') {
        window.onload = func
    } 
    else {
        window.onload = function() {
            if (oldonload) {
                oldonload()
            }
            func()
        }
    }
}


// --------------------------------------
// MAP

    /* initiate */
    function initMap() {
        map = new google.maps.Map(document.getElementById('inputMap'), {
            center: {
                lat: 41.3500040642546,
                lng: -8.748929042801365
            },
            zoom: 10
        })

        let infoWindow = new google.maps.InfoWindow({map: map})

        // Try HTML5 geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(userPosition, showError)
        }
        else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter())
        }
    }

    /* library marker */
    function addMarkerLibrary() {    
        let marker, count
        let locations = []
        let icon = {
                    url: "https://pbs.twimg.com/media/DfepSQJX0AE0OMI.png:large", // url
                    scaledSize: new google.maps.Size(28, 42), // scaled size
                    origin: new google.maps.Point(0,0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                    }

        // sets info inside marker window with setContent()
        let infowindow =  new google.maps.InfoWindow({})

        for (let i = 0; i < libraries.length; i++) {
            locations.push([libraries[i].parish, libraries[i].latitude, libraries[i].longitude])
        }

        console.log(locations)


        for (let i = 0; i < libraries.length; i++) {
            for (count = 0; count < locations.length; count++) {
                if (libraries[i].parish == locations[count][0]) {
                    marker = new google.maps.Marker({
                                            position: new google.maps.LatLng(locations[count][1], locations[count][2]),
                                            map: map,
                                            title: Library.getParishById(locations[count][0]),
                                            icon: icon
                    })

                    let librariesContent = `<div id="content">
                                                <h4>${Library.getParishById(locations[count][0])}</h4>
                                                <p>Morada: ${libraries[i].address}</p>
                                                <p>Coordenadas: ${libraries[i].latitude}, ${libraries[i].longitude}</p>
                                                <p>Capacidade de Livros: ${libraries[i].bookCapacity}</p>
                                            </div>`
                    
                    google.maps.event.addListener(marker, 'click', (function (marker, count) {
                        return function () {
                            infowindow.setContent(librariesContent)
                            infowindow.open(map, marker);
                        }
                    }) (marker, count))
                }
            }
        }
        
    }

    /* user position */
    function userPosition(position) {
        let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
        }

        let icon = {
            url: "https://pbs.twimg.com/media/Dfeow6rWkAAHaLi.png", // url
            scaledSize: new google.maps.Size(30, 40), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        }

        let infowindow =  new google.maps.InfoWindow({})
        
        /* show marker */
        let marker = new google.maps.Marker({
                                        position: pos,
                                        map: map,
                                        title: "Estás Aqui!",
                                        icon: icon
        })

        google.maps.event.addListener(marker, 'click', (function (marker) {
            return function () {
                infowindow.setContent("Estás Aqui!")
                infowindow.open(map, marker)
            }
        }) (marker))

        /* add library marker */
        addMarkerLibrary()
    }
//


// --------------------------------------
// ERROR

    /* location */
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos)
        infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.')
    }

    /* show */
    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.")
                break;
        }
    }
//


// --------------------------------------
// --------------------------------------
addLoadEvent(function() {

    // --------------------------------------
    // LOAD LOCAL STORAGE

        loadUsers()
        console.log(users)

        loadCategories()
        console.log(categories)

        loadTags()
        console.log(tags)

        loadBooks()
        console.log(books)

        loadComments()
        console.log(comments)

        loadRatings()
        console.log(ratings)

        loadRequests()
        console.log(requests)

        loadWishlists()
        console.log(wishlists)

        loadLibraries()
        console.log(libraries)

        loadConfig()
        console.log(config)    
    //
    
    
    // --------------------------------------
    // MAP VARIABLES

        /* forms */
        let frmDonate = document.getElementById("frmDonate")

        /* buttons */
        let btnClose = document.getElementById("btnClose")

        /* others */
        let count = 0
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* map */
        initMap()

        /* donate book modal */
        viewDonateStep(count)
        modalDonateCategories.innerHTML = addCategoriesToModal()
        modalDonateTags.innerHTML = addTagsToModal()
        modalDonateCity.innerHTML = addCitiesToModal()

        /* notifications */
        if (userPermissions == 2) {
            viewNotificationPanel()
        }

    //

    
    // --------------------------------------
    // FORMS

        /* donate book */
        frmDonate.addEventListener("submit", function(event){
            checkBookValid()

            if (checkBookValid() == true) {
                frmDonate.reset()
            }
            addRecentBooksToIndex()
            event.preventDefault()
        })

        /* cities donate */
        modalDonateCity.addEventListener("change", function(event) {
            modalDonateParish.innerHTML = addParishToModal(modalDonateCity.value)
            event.preventDefault()
        })

        /* donate cover */
        modalDonateCover.addEventListener("change", function(event) {
            viewInputCover()
            event.preventDefault()
        })
    //

    
    // --------------------------------------
    // BUTTONS

        /* modal donate next */
        btnNext.addEventListener("click", function(event){
            count += 1
            viewDonateStep(count)
            event.preventDefault()
        })

        /* modal donate previous */
        btnPrevious.addEventListener("click", function(event){
            count -= 1
            viewDonateStep(count)
            event.preventDefault()
        })

        /* modal donate close and reset */
        btnClose.addEventListener("click", function(event){
            frmDonate.reset()        
            count = 0
            viewDonateStep(count)
            event.preventDefault()
        })
    //
})