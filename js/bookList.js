

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
// FILTER

    /* tags */
    function addTagsToFilter() {
        let strHtml = "<option value=''>...</option>"
        let tempIds = Book.getBookTagsByCategory(categoryCurrent)
        let tempTags = []
        let newTags = [...new Set(tempIds)]
        
        for (let i = 0; i < newTags.length; i++) {
            let tempTag = {
                            id: newTags[i],
                            name: Tag.getTagById(newTags[i])
            }

            tempTags.push(tempTag)            
        }

        let sortTags = [...tempTags].sort()

        sortTags.sort(function(a, b) {
            let txtA = a.name
            let txtB = b.name

            return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
        })
        
        for (let i = 0; i < sortTags.length; i++) {
            strHtml += `<option value='${sortTags[i].id}'>${convertFirstToUpperCase(sortTags[i].name)}</option>`
        }

        filterTag.innerHTML = strHtml
    }

    /* authors */
    function addAuthorsToFilter() {
        let strHtml = "<option value=''>...</option>"
        let tempAuthors = Book.getBookAuthorsByCategory(categoryCurrent)
        let sortAuthors = [...tempAuthors].sort()

        sortAuthors.sort(function(a, b) {
            let txtA = a.name
            let txtB = b.name

            return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
        })
        
        for (let i = 0; i < sortAuthors.length; i++) {
            strHtml += `<option value='${sortAuthors[i]}'>${sortAuthors[i]}</option>`
        }

        filterAuthor.innerHTML = strHtml
    }

    /* libraries */
    function addLibrariesCityToFilter() {
        let strHtml = "<option value=''>...</option>"
        let tempLibraries = Book.getBookLibraryByCategory(categoryCurrent)
        let tempCity = []
        
        for (let i = 0; i < tempLibraries.length; i++) {
            tempCity.push(Library.getLibraryCityById(tempLibraries[i]))
        }

        let newTempCity = [...new Set(tempCity)]

        for (let i = 0; i < newTempCity.length; i++) {
            strHtml += `<option value='${newTempCity[i]}'>${Library.getCityById(newTempCity[i])}</option>`
        }

        filterLibraryCity.innerHTML = strHtml
    }
    
    /* parishes */
    function addParishToFilter(inputCity) {
        let strHtml = "<option value=''>...</option>"
        
        for (let i = 0; i < libraries.length; i++) {
            if (libraries[i].city == inputCity) {
                strHtml += `<option value='${libraries[i].parish}'>${Library.getParishById(libraries[i].parish)}</option>`
            }
        }

        filterLibraryParish.innerHTML = strHtml
    }
//


// --------------------------------------
// SORT

    /* sort book by recent */
    function sortByDonationDateNew(sortBooks) {
        sortBooks.sort(function(a, b) {
            return new Date(b.donationDate) - new Date(a.donationDate)
        })

        return sortBooks
    }

    /* sort by title A-Z */
    function sortByTitleAZ(sortBooks) { 
        sortBooks.sort(function(a, b) {
            let txtA = a.bookTitle.toUpperCase()
            let txtB = b.bookTitle.toUpperCase()
            
            return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
        })
    
        return sortBooks
    }
    
    /* sort by title Z-A */
    function sortByTitleZA(sortBooks) { 
        sortBooks.sort(function(a, b) {
            let txtA = a.bookTitle.toUpperCase()
            let txtB = b.bookTitle.toUpperCase()
            
            return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
        })

        sortBooks.reverse()        
        return sortBooks
    }

    /* sort by highest rating */
    function sortByRatingHigher(sortBooks) {
        let tempBooks = sortBooks.slice(0)

        tempBooks.sort(function(a,b) {
            return Book.calculateRating(b.bookRatings) - Book.calculateRating(a.bookRatings)
        })

        return tempBooks
    }
    
    /* sort by lowest rating */
    function sortByRatingLowest(sortBooks) {
        let tempBooks = sortBooks.slice(0)

        tempBooks.sort(function(a,b) {
            return Book.calculateRating(b.bookRatings) - Book.calculateRating(a.bookRatings)
        })

        tempBooks.reverse()
        return tempBooks
    }
    
    /* sort book by old */
    function sortByDonationDateOld(sortBooks) {
        sortBooks.sort(function(a, b) {
            return new Date(b.donationDate) - new Date(a.donationDate)
        })

        sortBooks.reverse()
        return sortBooks
    }
//


// --------------------------------------
// CATALOG

    /* sort catalog */
    function sortCatalog(sort, viewMode, catalog) {
        console.log(sort)
        console.log(catalog.length)

        switch (sort) {
            case "sortNew":
                addBooksToCatalog(viewMode, sortByDonationDateNew(catalog))
                break
            case "sortAZ":
                addBooksToCatalog(viewMode, sortByTitleAZ(catalog))
                break
            case "sortZA":
                addBooksToCatalog(viewMode, sortByTitleZA(catalog))
                break
            case "sortHighestRate":
                addBooksToCatalog(viewMode, sortByRatingHigher(catalog))
                break
            case "sortLowestRate":
                addBooksToCatalog(viewMode, sortByRatingLowest(catalog))
                break
            case "sortOld":
                addBooksToCatalog(viewMode, sortByDonationDateOld(catalog))
                break
            default:                
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Opção inválida!',
                    confirmButtonColor: '#ffd892',
                    allowOutsideClick: false
                })
                break
        }
    }

    /* fill catalog with books */
    function addBooksToCatalog(viewMode, catalog) {
        let strHtml = ""

        console.log(catalog.length)

        for (let i = 0; i < catalog.length; i++) {
            if (i == 0) {
                strHtml += "<div class='row new-row text-center' style='margin: auto;'>"
            }

            strHtml += `<div class='book col-md-2'>
                            <a id='${catalog[i].id}' href='bookSelect.html' class='book-page'>
                                <img src='${catalog[i].bookCover}' class='img-fluid' width='140'/>
                            </a>
                            <a id='${catalog[i].id}' href='bookSelect.html' class='book-page'>
                                <h5>${catalog[i].bookTitle}</h5>
                            </a>
                                <a id='${catalog[i].id}' href='bookSelect.html' class='book-page'>
                                    <p>${catalog[i].bookAuthors}</p>
                                </a>
                            <a id='${catalog[i].id}' href='bookSelect.html' class='book-page'>
                                ${convertRatingToStars(Book.calculateRating(catalog[i].bookRatings))}
                            </a>
                        </div>`

            if (i == catalog.length - 1) {
                strHtml += "</div>"
            }

            booksCatalog.innerHTML = strHtml
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
    // BOOK LIST VARIABLES

        /* session storage */
        categoryCurrent = sessionStorage.getItem("categoryCurrent", categoryCurrent)

        /* forms */
        let frmFilter = document.getElementById("frmFilter")
        let frmDonate = document.getElementById("frmDonate")
        let count = 0

        /* inputs */
        let filterTag = document.getElementById("filterTag")
        let filterAuthor = document.getElementById("filterAuthor")
        let filterLibraryCity = document.getElementById("filterLibraryCity")
        let filterLibraryParish = document.getElementById("filterLibraryParish")
        let selectSort = document.getElementById("selectSort")

        /* buttons */
        let btnClose = document.getElementById("btnClose")
        let btnList = document.getElementById("btnList")
        let btnGrid = document.getElementById("btnGrid")

        /* tables */
        let tblBooks = document.getElementById("tblBooks")

        /* catalog */
        let booksCatalog = document.getElementById("booksCatalog")
        let viewMode = "grid"
        let sort = "sortNew"
        let filterBooks = []
        let catalog = []

        for (let i = 0; i < books.length; i++) {            
            if (books[i].bookCategory == categoryCurrent) {
                catalog.push(books[i])
            }
        }
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

        /* catalog */
        addSelectCategoryToTitle(categoryCurrent)
        sortCatalog(sort, viewMode, catalog)
        getSelectBook()

        /* filter */
        addTagsToFilter()
        addAuthorsToFilter()
        addLibrariesCityToFilter()
    //

    // --------------------------------------
    // FORMS

        /* donate book */
        frmDonate.addEventListener("submit", function(event) {
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

        /* filter parish */
        filterLibraryCity.addEventListener("change", function(event) {
            addParishToFilter(filterLibraryCity.value)
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
        
        /* filter */
        frmFilter.addEventListener("submit", function(event) {
            if (filterTag.value != "") {
                filterBooks = Book.getBooksByTag(filterTag.value, categoryCurrent)
            }

            if (filterAuthor.value != "") {
                filterBooks.push(Book.getBooksByAuthor(filterAuthor.value, categoryCurrent))
            }

            /*
            if (filterLibraryCity.value != "") {
                filterBooks.push(Book.getBooksByCity(Library.getLibraryIdByCity(filterLibraryCity.value), categoryCurrent))
            }*/

            if (filterLibraryParish.value != "") {
                filterBooks = Book.getBooksByLibrary(Library.getLibraryIdByLocation(filterLibraryCity.value, filterLibraryParish.value), categoryCurrent)
            }

            console.log(filterBooks)
            
            sessionStorage.setItem("filterBooks", filterBooks)
            addBooksToCatalog(viewMode, filterBooks)

            event.preventDefault()
        })
        
        /* reset filter */
        frmFilter.addEventListener("reset", function(event) {
            filterTag.selectedIndex = 0
            filterAuthor.selectedIndex = 0
            filterLibraryCity.selectedIndex = 0
            filterLibraryParish.selectedIndex = 0

            sortCatalog("sortNew", viewMode, catalog)

            event.preventDefault()
        })

        /* sort book catalog */
        selectSort.addEventListener("change", function(event) {
            sortCatalog(selectSort.value, viewMode, catalog)
            event.preventDefault()
        })
    //
})