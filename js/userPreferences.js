
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
// VALIDATION

    /* select item */
    function checkPreferenceValid() {        
        if (inputPreference.value != "") {
            switch (selectPreferences.value) {
                case "Categorias":
                    checkCategoryInputValid(Wishlist.getCategoriesByUserId(userCurrent))
                    break
                case "Tags":
                    checkTagInputValid(Wishlist.getTagsByUserId(userCurrent))
                    break
                case "Bibliotecas":
                    checkLibraryInputValid(Wishlist.getLibrariesByUserId(userCurrent))
                    break
            }
        }
        else {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Tem de seleccionar uma opção!',
                confirmButtonColor: '#ffd892',
                allowOutsideClick: false
            })
        }
    }
    
    /* input category */        
    function checkCategoryInputValid(tempCategories) {
        let strError = ""
        let tempIds = []

        // 1 verificar se o tempCategorias está vazio
            // se sim,
                // 1.1 verificar se o userCurrent tem alguma wishlist
                    // sem sim 



        if (tempCategories.length == 0) {
            for (let i = 0; i < wishlists.length; i++) {
                tempIds.push(wishlists[i].userId)
            }

            console.log(tempIds)

            console.log(tempIds.indexOf(userCurrent))

            if (tempIds.indexOf(userCurrent) != -1) {
                for (let i = 0; i < wishlists.length; i++) {
                    if (wishlists[i].userId == userCurrent) {
                        wishlists[i].categoryList.push(parseInt(inputPreference.value))
                        localStorage.setItem("wishlists", JSON.stringify(wishlists))
                    }
                }
            }
            else {
                let newWishlist = new Wishlist(parseInt(userCurrent),
                                                [parseInt(inputPreference.value)],
                                                [],
                                                [],
                                                [],
                                                [],
                                                [],
                                                [],
                                                [])
                saveWishlist(newWishlist)
            }    
        }
        else {
            if (tempCategories.indexOf(parseInt(inputPreference.value)) != -1) {
                strError = 'Já tem essa opção na sua wishlist!'
            }
            else {
                for (let i = 0; i < wishlists.length; i++) {
                    if (wishlists[i].userId == userCurrent) {
                        wishlists[i].categoryList.push(parseInt(inputPreference.value))
                        localStorage.setItem("wishlists", JSON.stringify(wishlists))
                    }
                }
            }
        }

        if (strError == "") {
            renderTableCategories()
            renderTableTags()
            renderTableLibraries()
        }
        else {
            swal({
                type: 'error',
                title: 'Ohoh...',
                text: strError,
                confirmButtonColor: '#ffd892',
                allowOutsideClick: false
            })
        }
    }
    
    /* input tag */        
    function checkTagInputValid(tempTags) {        
        let strError = ""
        let tempIds = []

        if (tempTags.length == 0) {
            for (let i = 0; i < wishlists.length; i++) {
                tempIds.push(wishlists[i].userId)
            }

            console.log(tempIds)

            console.log(tempIds.indexOf(userCurrent))
            if (tempIds.indexOf(userCurrent) != -1) {
                for (let i = 0; i < wishlists.length; i++) {
                    if (wishlists[i].userId == userCurrent) {
                        wishlists[i].tagList.push(parseInt(inputPreference.value))
                        localStorage.setItem("wishlists", JSON.stringify(wishlists))
                    }
                }
            }
            else {
                let newWishlist = new Wishlist(parseInt(userCurrent),
                                                [],
                                                [parseInt(inputPreference.value)],
                                                [],
                                                [],
                                                [],
                                                [],
                                                [],
                                                [])
                saveWishlist(newWishlist)
            }    
        }
        else {
            if (tempTags.indexOf(parseInt(inputPreference.value)) != -1) {
                strError = 'Já tem essa opção na sua wishlist!'
            }
            else {
                for (let i = 0; i < wishlists.length; i++) {
                    if (wishlists[i].userId == userCurrent) {
                        wishlists[i].tagList.push(parseInt(inputPreference.value))
                        localStorage.setItem("wishlists", JSON.stringify(wishlists))
                    }
                }
            }
        }

        if (strError == "") {
            renderTableCategories()
            renderTableTags()
            renderTableLibraries()
        }
        else {
            swal({
                type: 'error',
                title: 'Ohoh...',
                text: strError,
                confirmButtonColor: '#ffd892',
                allowOutsideClick: false
            })
        }
    }
    
    /* input library */        
    function checkLibraryInputValid(tempLibraries) {
        let strError = ""
        let tempIds = []

        if (tempLibraries.length == 0) {
            for (let i = 0; i < wishlists.length; i++) {
                tempIds.push(wishlists[i].userId)
            }

            if (tempIds.indexOf(userCurrent) == -1) {
                for (let i = 0; i < wishlists.length; i++) {
                    if (wishlists[i].userId == userCurrent) {
                        wishlists[i].libaryList.push(parseInt(inputPreference.value))
                        localStorage.setItem("wishlists", JSON.stringify(wishlists))
                    }
                }
            }
            else {
                let newWishlist = new Wishlist(parseInt(userCurrent),
                                                [],
                                                [],
                                                [],
                                                [parseInt(inputPreference.value)],
                                                [],
                                                [],
                                                [],
                                                [])
                saveWishlist(newWishlist)
            }    
        }
        else {
            if (tempLibraries.indexOf(parseInt(inputPreference.value)) != -1) {
                strError = 'Já tem essa opção na sua wishlist!'
            }
            else {
                for (let i = 0; i < wishlists.length; i++) {
                    if (wishlists[i].userId == userCurrent) {
                        wishlists[i].libaryList.push(parseInt(inputPreference.value))
                        localStorage.setItem("wishlists", JSON.stringify(wishlists))
                    }
                }
            }
        }

        if (strError == "") {
            renderTableCategories()
            renderTableTags()
            renderTableLibraries()
        }
        else {
            swal({
                type: 'error',
                title: 'Ohoh...',
                text: strError,
                confirmButtonColor: '#ffd892',
                allowOutsideClick: false
            })
        }
    }
//


// --------------------------------------
// USER SETTINGS

    /* categories */
    function addCategoriesToInput() {
        let strHtml = "<option value=''>...</option>"    
        
        for (let i = 0; i < categories.length; i++) {
            strHtml += `<option value='${categories[i].id}'>${convertFirstToUpperCase(categories[i].name)}</option>`
        }
        inputPreference.innerHTML = strHtml
    }

    /* tags */
    function addTagsToInput() {
        let strHtml = "<option value=''>...</option>"    
        
        for (let i = 0; i < tags.length; i++) {
            strHtml += `<option value='${tags[i].id}'>${convertFirstToUpperCase(tags[i].name)}</option>`
        }
        inputPreference.innerHTML = strHtml
    }

    /* libraries */
    function addLibrariesToInput() {
        let strHtml = "<option value=''>...</option>"    
        
        for (let i = 0; i < libraries.length; i++) {
            strHtml += `<option value='${libraries[i].id}'>${Library.getCityById(libraries[i].city)}, ${Library.getParishById(libraries[i].parish)}</option>`
        }
        inputPreference.innerHTML = strHtml
    }
//


// --------------------------------------
// RENDER TABLES

    /* categories */
    function renderTableCategories() {
        let tempCategories = Wishlist.getCategoriesByUserId(userCurrent)
        let strHtml = `<thead>
                            <tr>
                                <th class='w-100'>Categorias</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>`

        for (let i = 0; i < tempCategories.length; i++) {
            strHtml += `<tr>
                            <td id='${tempCategories[i]}'>${convertFirstToUpperCase(Category.getCategoryById(tempCategories[i]))}</td>
                            <td>
                                <a id='${tempCategories[i]}' class='remove'>
                                    <i class='fa fa-times-circle'></i>
                                </a>
                            </td>
                        </tr>`
        }
        strHtml += "</tbody>"    
        tblCategories.innerHTML = strHtml
        
        /* remove select category preference */
        let categorieRemove = document.getElementsByClassName("remove")

        for (let i = 0; i < categorieRemove.length; i++) {
            categorieRemove[i].addEventListener("click", function() {
                let categoryId = parseInt(categorieRemove[i].getAttribute("id"))
                let newCategories = Wishlist.removeWishlistPreferencesByCategoryId(categoryId)

                for (let i = 0; i < wishlists.length; i++) {
                    if (wishlists[i].userId == userCurrent) {
                        Wishlist.editWishlistCategoriesByUserId(userCurrent, newCategories)
                        localStorage.setItem("wishlists", JSON.stringify(wishlists))
                    }
                }
                renderTableCategories()
            })
        }
    }

    /* tags */
    function renderTableTags() {
        let tempTags = Wishlist.getTagsByUserId(userCurrent)
        let strHtml = `<thead>
                            <tr>
                                <th class='w-100'>Tags</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>`

        for (let i = 0; i < tempTags.length; i++) {
            strHtml += `<tr>
                            <td id='${tempTags[i]}'>${convertFirstToUpperCase(Tag.getTagById(tempTags[i]))}</td>
                            <td>
                                <a id='${tempTags[i]}' class='remove'>
                                    <i class='fa fa-times-circle'></i>
                                </a>
                            </td>
                        </tr>`
        }
        strHtml += "</tbody>"
        tblTags.innerHTML = strHtml
        
        // REMOVE LINK FROM TABLE
        let tagRemove = document.getElementsByClassName("remove")

        for (let i = 0; i < tagRemove.length; i++) {
            tagRemove[i].addEventListener("click", function() {
                let tagId = parseInt(tagRemove[i].getAttribute("id"))
                let newTags = Wishlist.removeWishlistPreferencesByTagId(tagId)

                for (let i = 0; i < wishlists.length; i++) {
                    if(wishlists[i].userId == userCurrent){
                        Wishlist.editWishlistTagsByUserId(userCurrent, newTags)
                        localStorage.setItem("wishlists", JSON.stringify(wishlists))
                    }
                }
                renderTableTags()
            })
        }
    }

    /* libraries */
    function renderTableLibraries() {
        let tempLibraries = Wishlist.getLibrariesByUserId(userCurrent)
        let strHtml = `<thead>
                            <tr>
                                <th class='w-100' colspan='2'>Bibliotecas</th>
                                <th class='w-2'></th>
                            </tr>
                        </thead>
                        <tbody>`

        for (let i = 0; i < tempLibraries.length; i++) {
            strHtml += `<tr>
                            <td id='${tempLibraries[i]}'>${Library.getCityById(Library.getLibraryCityById(tempLibraries[i]))}</td>
                            <td id='${tempLibraries[i]}'>${Library.getParishById(Library.getLibraryParishById(tempLibraries[i]))}</td>
                            <td>
                                <a id='${tempLibraries[i]}' class='remove'>
                                    <i class='fa fa-times-circle'></i>
                                </a>
                            </td>
                        </tr>`
        }
        strHtml += "</tbody>"
        tblLibraries.innerHTML = strHtml
        
        /* remove library */
        let libraryRemove = document.getElementsByClassName("remove")

        for (let i = 0; i < libraryRemove.length; i++) {
            libraryRemove[i].addEventListener("click", function() {
                let libraryId = parseInt(libraryRemove[i].getAttribute("id"))
                let newLibraries = Wishlist.removeWishlistPreferencesByLibraryId(libraryId)

                for (let i = 0; i < wishlists.length; i++) {
                    if(wishlists[i].userId == userCurrent){
                        Wishlist.editWishlistLibrariesByUserId(userCurrent, newLibraries)
                        localStorage.setItem("wishlists", JSON.stringify(wishlists))
                    }
                }
                renderTableLibraries()
            })
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
    // USER PREFERENCES VARIABLES

        /* forms */
        let frmPreferences = document.getElementById("frmPreferences")

        /* combobox */
        let preferenceCategories = document.getElementById("preferenceCategories")
        let preferenceTags = document.getElementById("preferenceTags")
        let preferenceLibraries = document.getElementById("preferenceLibraries")

        /* input */
        let inputPreference = document.getElementById("inputPreference")

        /* tables */
        let tblCategories = document.getElementById("tblTags")
        let tblTags = document.getElementById("tblTags")
        let tblLibraries = document.getElementById("tblLibraries")
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* notifications */
        viewNotificationPanel()

        /* inputs */
        addCategoriesToInput()

        /* tables */
        renderTableCategories()
        renderTableTags()
        renderTableLibraries()
    //


    // --------------------------------------
    // FORMS
    
        /* preferences */
        frmPreferences.addEventListener("submit", function(event) {
            checkPreferenceValid()
            event.preventDefault()
        })

        /* categories */
        selectPreferences.addEventListener("change", function(event) {
            if (selectPreferences.value == "Categorias") {
                addCategoriesToInput()
                event.preventDefault()
            }
            else if (selectPreferences.value == "Tags") {
                addTagsToInput()
                event.preventDefault()
            }
            else {
                addLibrariesToInput()
                event.preventDefault()
            }
        })

        /* tags */
        preferenceTags.addEventListener("change", function(event) {
            addTagsToInput()
            event.preventDefault()
        })

        /* libraries */
        preferenceLibraries.addEventListener("change", function(event) {
            addLibrariesToInput()
            event.preventDefault()
        })
})