
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
// CATALOG

    /* favourites */
    function addCategoriesFavourites() {
        let strHtml = "<h1>Favoritas</h1>"
        let tempIds = []
        let tempCategories = []

        // searchs the wishlist array for the current user category list
        for (let i = 0; i < wishlists.length; i++) {
            if (wishlists[i].userId == userCurrent) {
                tempIds = wishlists[i].categoryList
            }
        }

        
        if (tempIds.length != 0) {
            for (let i = 0; i < tempIds.length; i++) {
                let tempCategory = {
                                id: tempIds[i],
                                name: Category.getCategoryById(tempIds[i])
                }
                tempCategories.push(tempCategory)          
            }

            // sorts favourites alphabetically
            let sortFavourites = [...tempCategories].sort()

            sortFavourites.sort(function(a, b) {
                let txtA = a.name
                let txtB = b.name
                return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
            })

            for (let i = 0; i < sortFavourites.length; i++) {
                if (i == 0) {
                    strHtml += "<div class='row new-row text-center' style='margin: auto;'>"
                }                

                strHtml += `<div class='new-category rounded col-md-2'>
                                <a id='${sortFavourites[i].id}' href='#' class='remove category-favourite'><i class="fas fa-times"></i></a><br>
                                <a id='${sortFavourites[i].id}' href='bookList.html' class='category-filter'>
                                    <p>${convertFirstToUpperCase(sortFavourites[i].name)}</p>
                                </a>
                            </div>`

                if (i == sortFavourites.length - 1) {
                    if ((5 - sortFavourites.length) != 0) {
                        for (let j = 0; j < 5 - sortFavourites.length; j++) {
                            strHtml += "<div class='category-empty rounded col-md-2'></div>"
                        }
                    }
                    else {
                        strHtml += "</div>"
                    }
                }
                categoriesFavourites.innerHTML = strHtml                
        
                // removes selected category from favourites
                let favouriteRemove = document.getElementsByClassName("remove")

                for (let i = 0; i < favouriteRemove.length; i++) {
                    favouriteRemove[i].addEventListener("click", function() {
                        let categoryId = parseInt(favouriteRemove[i].getAttribute("id"))
                        let newCategories = Wishlist.removePreferencesByCategoryId(categoryId)

                        for (let i = 0; i < wishlists.length; i++) {
                            if (wishlists[i].userId == userCurrent) {
                                Wishlist.editWishlistCategoriesByUserId(userCurrent, newCategories)
                                localStorage.setItem("wishlists", JSON.stringify(wishlists))
                            }
                        }
                        
                        addCategoriesFavourites()
                    })
                }
            }
        }
        else {
            for (let i = 0; i < 5; i++) {
                if (i == 0) {
                    strHtml += "<div class='row new-row text-center' style='margin: auto;'>"
                }                

                strHtml += `<div class='category-empty rounded col-md-2'>
                            </div>`

                if (i == 5) {
                    strHtml += "</div>"
                }

                categoriesFavourites.innerHTML = strHtml
            }
        }

        // se clicar no botao guarda num array na local storage
        // associar array de favoritas ao user id
        // ao chegar a 5 pára
        // se na cruz remove a categoria dos favoritos
    }

    /* all */
    function addAllCategories() {
        let strHtml = "<h1>Todas</h1>"
        let sortCategories = [...categories].sort()

        // sorts categories alphabetically
        sortCategories.sort(function(a, b) {
            let txtA = a.name
            let txtB = b.name
            
            return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
        })

        for (let i = 0; i < sortCategories.length; i++) {
            if (i == 0) {
                strHtml += "<div class='row new-row text-center' style='margin: auto;'>"
            }

            strHtml += `<div class='new-category rounded col-md-2'>
                            <a id='${sortCategories[i].id}' href='#' class='category-favourite'><i class='fas fa-heart'></i></a><br>
                            <a id='${sortCategories[i].id}' href='bookList.html' class='category-filter'>
                                <p>${convertFirstToUpperCase(sortCategories[i].name)}</p>
                            </a>
                        </div>`

            if (i == sortCategories.length - 1) {
                strHtml += "</div>"   
            }

            categoriesAll.innerHTML = strHtml
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
    // CATEGORIES VARIABLES

        /* forms */
        let frmDonate = document.getElementById("frmDonate")
        let count = 0

        /* buttons */
        let optDonate = document.getElementById("optDonate")
        let btnClose = document.getElementById("btnClose")

        /* others */
        let categoryFilter = document.getElementsByClassName("category-filter")
        let categoriesFavourites = document.getElementById("categoriesFavourites")
        let categoriesAll = document.getElementById("categoriesAll")
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* donate book modal */
        modalDonateCategories.innerHTML = addCategoriesToModal()
        modalDonateTags.innerHTML = addTagsToModal()
        modalDonateCity.innerHTML = addCitiesToModal()

        /* notifications */
        if (userPermissions == 2) {
            viewNotificationPanel()
        }

        /* categories */
        addCategoriesFavourites()
        addAllCategories()
    //

    
    // --------------------------------------
    // FORMS

        /* donate book */
        frmDonate.addEventListener("submit", function(event){
            checkNewBookValid()
            frmDonate.reset()
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

        /* donate start */
        optDonate.addEventListener("click", function(event) {    
            count = 0
            viewDonateStep(count)
            frmDonate.reset()
        })

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

    // --------------------------------------
    // ON CLICK

        /* get select category */
        for (let i = 0; i < categoryFilter.length; i++) {
            categoryFilter[i].addEventListener("click", function() {
                sessionStorage.setItem("categoryCurrent", categoryFilter[i].getAttribute("id"))
            })
        }
    //
})