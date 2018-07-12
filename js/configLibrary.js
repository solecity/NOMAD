
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
//


// --------------------------------------
// COMBOBOX

    /* cities */
    function addCity() {
        let strHtml = "<option value=''>...</option>"
        let tempArray = []

        for (let i = 0; i < portugal.length; i++) {
            if (portugal[i].level == 2) {
                let tempCity = {
                            id: portugal[i].code,
                            name: portugal[i].name
                }

                tempArray.push(tempCity)
            }
        }

        tempArray.sort(function(a, b) {
            let txtA = a.name
            let txtB = b.name

            return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
        })

        for (let i = 0; i < tempArray.length; i++) {
            strHtml += `<option value='${tempArray[i].id}'>${tempArray[i].name}</option>`
        }
        
        inputCity.innerHTML = strHtml
    }

    /* parishes */
    function addParish(city) {
        let strHtml = "<option value=''>...</option>"

        for (let i = 0; i < portugal.length; i++) {
            if (portugal[i].level == 3) {
                let tempStr = (portugal[i].code).toString()

                if (tempStr.startsWith(city, 0)) {
                    strHtml += `<option value='${portugal[i].code}'>${portugal[i].name}</option>`
                }
            }
        }
        
        inputParish.innerHTML = strHtml
    }
//


// --------------------------------------
// VALIDATION

    /* library */
    function checkLibraryValid(newLibrary) {
        let strError = ""
        let strTitle = ""

        if (inputCity.value == "" || inputParish.value == "") {
            strTitle = 'Oops...'
            strError = 'Existem campos por preencher!'
        }

        for (let i = 0; i < libraries.length; i++) {
            if (libraries[i].city == inputCity.value && libraries[i].parish == inputParish.value) {
                strTitle = 'Ohoh...'
                strError = `A biblioteca "${inputCity.value}, ${inputParish.value}" já está registada!`
            }
        }

        if (strError == "") {
            saveLibrary(newLibrary)
        }
        else {
            swal({
                type: 'error',
                title: strTitle,
                text: strError,
                confirmButtonColor: '#9fc490',
                allowOutsideClick: false
            })
        }
    }
//


// --------------------------------------
// RENDER TABLES

    /* libraries */
    function renderTableLibraries() {
        let strHtml = `<thead class='thead-dark'>
                            <tr>
                                <th class='w-5'>Id</th>
                                <th class='w-20'>Cidade</th>
                                <th class='w-20'>Freguesia</th>
                                <th class='w-40'>Morada</th>
                                <th class='w-15'>Coordenadas</th>
                                <th class='w-10'>Capacidade de Livros</th>
                                <th class='w-2'></th>
                            </tr>
                        </thead>
                        <tbody>`
            
        for (let i = 0; i < libraries.length; i++) {
            strHtml += `<tr>
                            <td>${libraries[i].id}</td>
                            <td>${Library.getCityById(libraries[i].city)}</td>
                            <td>${Library.getParishById(libraries[i].parish)}</td>
                            <td>${libraries[i].address}</td>
                            <td><strong>Latitude:</strong> ${libraries[i].latitude}<br><strong>Longitude:</strong> ${libraries[i].longitude}</td>
                            <td>${libraries[i].bookCapacity}</td>
                            <td>
                                <a id='${libraries[i].id}' class='view mr-1' data-toggle='modal' data-target='#viewLibraryModal'><i class='fa fa-info-circle'></i></a>
                                <a id='${libraries[i].id}' class='remove'><i class='fa fa-times-circle'></i></a>
                            </td>
                        </tr>`
        }

        strHtml += "</tbody>"    
        tblLibraries.innerHTML = strHtml
        
        // VIEW LINK FROM TABLE
        let libraryView = document.getElementsByClassName("view")

        for (let i = 0; i < libraryView.length; i++) {
            libraryView[i].addEventListener("click", function() {
                let libraryId = libraryView[i].getAttribute("id")
                Library.viewLibraryById(libraryId)
            })        
        }

        // REMOVE LINK FROM TABLE
        let libraryRemove = document.getElementsByClassName("remove")

        for (let i = 0; i < libraryRemove.length; i++) {
            libraryRemove[i].addEventListener("click", function() {
                let libraryId = parseInt(libraryRemove[i].getAttribute("id"))

                swal({
                    title: `Tem a certeza que pretende eliminar a biblioteca de ${Library.getParishById(Library.getLibraryParishById(libraryId))}?`,
                    text: 'Não só removerá a bibliotecas como todos os livros associados.',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#9fc490',
                    cancelButtonColor: '#ba9378',
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.value) {
                        swal({
                            type: 'success',
                            title: 'Eliminada!',
                            text: `A biblioteca de ${Library.getParishById(Library.getLibraryParishById(libraryId))} foi eliminada.`,
                            showConfirmButton: true,
                            confirmButtonColor: '#9fc490',
                            allowOutsideClick: false
                        })
                        
                        Book.removeBookByLibraryId(libraryId)
                        Library.removeLibraryById(libraryId)
                        
                        localStorage.setItem("books", JSON.stringify(books))
                        localStorage.setItem("libraries", JSON.stringify(libraries))

                        renderTableLibraries()
                    }
                })
            })
        }
    }
//


// --------------------------------------
// COORDINATES

    /* address */
    function getCoordinates(tempLat, tempLng, address) {
        geocoder = new google.maps.Geocoder()

        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    tempLat.value = results[0].geometry.location.lat();
                    tempLng.value = results[0].geometry.location.lng();
                }
            })
        }
    }


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
    // LIBRARY MANAGER VARIABLES

        /* forms */
        let frmLibraries = document.getElementById("frmLibraries")
        let frmViewLibrary = document.getElementById("frmViewLibrary")

        /* inputs */
        let inputCity = document.getElementById("inputCity")
        let inputParish = document.getElementById("inputParish")
        let inputAddress = document.getElementById("inputAddress")
        let inputLatitude = document.getElementById("inputLatitude")
        let inputLongitude = document.getElementById("inputLongitude")
        let inputBookCapacity = document.getElementById("inputBookCapacity")

        /* modal */
        let viewLibraryCity = document.getElementById("viewLibraryCity")
        let viewLibraryParish = document.getElementById("viewLibraryParish")
        let viewLibraryAddress = document.getElementById("viewLibraryAddress")
        let viewLibraryLatitude = document.getElementById("viewLibraryLatitude")
        let viewLibraryLongitude = document.getElementById("viewLibraryLongitude")
        let viewLibraryBookCapacity = document.getElementById("viewLibraryBookCapacity")

        /* buttons */
        let btnEdit = document.getElementById("btnEdit")
        let btnClose = document.getElementById("btnClose")
        let count = 0
        
        /* tables */
        let tblLibraries = document.getElementById("tblLibraries")
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* items disabled */
        viewLibraryAddress.readOnly = true
        viewLibraryBookCapacity.readOnly = true

        /* tables */
        renderTableLibraries()

        /* combobox */
        addCity()
    //


    // --------------------------------------
    // INPUTS


        /* fill parish according to city select */
        inputCity.addEventListener("change", function(event) {
            addParish(inputCity.value)
            event.preventDefault()
        })

        /* fill coordinates according to input adress */
        inputAddress.addEventListener("change", function(event) {
            getCoordinates(inputLatitude, inputLongitude, inputAddress.value)
            event.preventDefault()
        })

        /* fill coordinates according to new adress */
        viewLibraryAddress.addEventListener("change", function(event) {
            getCoordinates(viewLibraryLatitude, viewLibraryLongitude, viewLibraryAddress.value)
            event.preventDefault()
        })
    //


    // --------------------------------------
    // FORMS
    
        /* add library */
        frmLibraries.addEventListener("submit", function(event) {
            let newLibrary = new Library(parseInt(inputCity.value),
                                            parseInt(inputParish.value),
                                            inputAddress.value,
                                            parseFloat(inputLatitude.value),
                                            parseFloat(inputLongitude.value),
                                            parseInt(inputBookCapacity.value))

            checkLibraryValid(newLibrary)
            renderTableLibraries()

            frmLibraries.reset()        
            event.preventDefault()
        })

        /* view library */
        frmViewLibrary.addEventListener("submit", function(event) {
            for (let i = 0; i < libraries.length; i++) {
                if (Library.getCityById(libraries[i].city) == viewLibraryCity.value && Library.getParishById(libraries[i].parish) == viewLibraryParish.value) {
                    let tempId = Library.getLibraryIdByLocation(libraries[i].city, libraries[i].parish)

                    Library.editLibraryById(tempId)
                    localStorage.setItem("libraries", JSON.stringify(libraries))

                    swal({
                        type: 'success',
                        title: 'Alterado!',
                        text: 'As informações foram alteradas com sucesso',
                        showConfirmButton: true,
                        confirmButtonColor: '#9fc490',
                        allowOutsideClick: false
                    })
                }
            }
            $('#viewLibraryModal').modal('hide')            

            renderTableLibraries()

            viewLibraryAddress.readOnly = true
            viewLibraryBookCapacity.readOnly = true

            event.preventDefault()
        })
    //


    // --------------------------------------
    // BUTTONS
    
        /* edit user */
        btnEdit.addEventListener("click", function(event) {
            if (count == 0) {
                viewLibraryAddress.readOnly = false
                viewLibraryBookCapacity.readOnly = false
                count = 1
            }
            else if (count == 1) {
                viewLibraryAddress.readOnly = true
                viewLibraryBookCapacity.readOnly = true
                count = 0
            }
            event.preventDefault()
        })

        /* close modal */
        btnClose.addEventListener("click", function(event){
            renderTableLibraries()
            event.preventDefault()
        })
    //
})