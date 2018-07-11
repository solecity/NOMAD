
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
    function addCategoriesFavourites(favouritesLength) {
        let strHtml = "<h1>Favoritas</h1>"
        let tempIds = []
        let tempCategories = []

        // searchs the user array for the current user favourite categories
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == userCurrent) {
                tempIds = users[i].favourites
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

            // fils categories catalog with favourites
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
                        let newCategories = User.removeFavouriteCategoryById(categoryId)
                        favouritesLength = User.getFavouritesLengthById(userCurrent)

                        User.editFavouritesById(newCategories)
                        localStorage.setItem("users", JSON.stringify(users))
                        //addCategoriesFavourites(favouritesLength)
                        location.reload()

                        if (favouritesLength < 5) {
                            $(".add").attr("href", "#")
                            addAllCategories(favouritesLength)
                        }
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
    }

    /* all */
    function addAllCategories(favouritesLength) {
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
                            <a id='${sortCategories[i].id}' href='#' class='add category-favourite'><i class='fas fa-heart'></i></a><br>
                            <a id='${sortCategories[i].id}' href='bookList.html' class='category-filter'>
                                <p>${convertFirstToUpperCase(sortCategories[i].name)}</p>
                            </a>
                        </div>`

            if (i == sortCategories.length - 1) {
                strHtml += "</div>"   
            }

            categoriesAll.innerHTML = strHtml
        
            // adds selected category to favourites
            let favouriteAdd = document.getElementsByClassName("add")

            for (let i = 0; i < favouriteAdd.length; i++) {
                favouriteAdd[i].addEventListener("click", function() {
                    let categoryId = parseInt(favouriteAdd[i].getAttribute("id"))
                    favouritesLength = User.getFavouritesLengthById(userCurrent)

                    if (favouritesLength < 5) {
                        User.addFavouriteCategoryById(categoryId)
                        localStorage.setItem("users", JSON.stringify(users))
                        //addCategoriesFavourites(favouritesLength)
                        location.reload()
                    }

                    if (favouritesLength > 4) {
                        $(".add").removeAttr("href")
                    }
                })
            }
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
        let favouritesLength = User.getFavouritesLengthById(userCurrent)
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
        addCategoriesFavourites(favouritesLength)
        addAllCategories(favouritesLength)

        if (favouritesLength > 4) {
            $(".add").removeAttr("href")
        }
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