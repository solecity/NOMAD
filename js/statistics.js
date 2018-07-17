
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


// ---------------------------------------
// PERCENTAGE

    /* total books per max capacity of all libraries */
    function percentageBookCapacity() {
        let totalCapacity = 0
        let strHtml = ""

        for (let i = 0; i < libraries.length; i++) {
            totalCapacity += libraries[i].bookCapacity
        }

        let percentage = (books.length * 100) / totalCapacity

        strHtml += `<div class='col-md-12'>
                        <h6 class='inline col-md-6'>Capacidade de livros total</h6>
                        <p class='inline' style='float: right;'>${percentage}%</p>
                    </div>
                    <div class='progress'>
                        <div class='progress-bar progress-bar-blue' role='progressbar' aria-valuenow='${percentage}' aria-valuemin='0' aria-valuemax='100' style='width: ${percentage}%'></div>
                    </div>`

        barBookCapacity.innerHTML = strHtml
    }

    /* total books available */
    function percentageBooksAvailable() {
        let totalAvailable = books.length - requests.length
        let percentage =  Math.round((totalAvailable * 100) / books.length)
        let strHtml = ""

        strHtml += `<div class='col-md-12'>
                        <h6 class='inline col-md-6'>Livros Disponíveis</h6>
                        <p class='inline' style='float: right;'>${percentage}%</p>
                    </div>
                    <div class='progress'>
                        <div class='progress-bar progress-bar-blue' role='progressbar' aria-valuenow='${percentage}' aria-valuemin='0' aria-valuemax='100' style='width: ${percentage}%'></div>
                    </div>`

        barBooksAvailable.innerHTML = strHtml
    }
//


// ---------------------------------------
// COUNTER

    /* total users */
    function counterTotalUsers() {
        let totalUsers = 0
        let strHtml = ""

        for (let i = 0; i < users.length; i++) {
            if (users[i].userPermissions == 2) {
                totalUsers++
            }            
        }
        strHtml += `<h6>Utilizadores</h6>
                    <h3>${totalUsers}</h3>`

        counterUsers.innerHTML = strHtml
    }

    /* total books */
    function counterTotalBooks() {
        let totalBooks = 0
        let strHtml = ""

        for (let i = 0; i < books.length; i++) {
            totalBooks++                        
        }
        strHtml += `<h6>Livros</h6>
                    <h3>${totalBooks}</h3>`

        counterBooks.innerHTML = strHtml
    }

    /* total libraries */
    function counterTotalLibraries() {
        let totalLibraries = 0
        let strHtml = ""

        for (let i = 0; i < libraries.length; i++) {
            totalLibraries++                        
        }
        strHtml += `<h6>Bibliotecas</h6>
                    <h3>${totalLibraries}</h3>`

        counterLibraries.innerHTML = strHtml
    }

    /* total categories */
    function counterTotalCategories() {
        let totalCategories = 0
        let strHtml = ""

        for (let i = 0; i < categories.length; i++) {
            totalCategories++                        
        }
        strHtml += `<h6>Categorias</h6>
                    <h3>${totalCategories}</h3>`

        counterCategories.innerHTML = strHtml
    }

    /* total tags */
    function counterTotalTags() {
        let totalTags = 0
        let strHtml = ""

        for (let i = 0; i < tags.length; i++) {
            totalTags++                        
        }
        strHtml += `<h6>Tags</h6> <i class="fas fa-tag"></i>
                    <h3>${totalTags}</h3>`

        counterTags.innerHTML = strHtml
    }

    /* total requests */
    function counterTotalRequests() {
        let totalRequests = 0
        let strHtml = ""

        for (let i = 0; i < requests.length; i++) {
            totalRequests++                        
        }
        strHtml += `<h6>Requisições</h6>
                    <h3>${totalRequests}</h3>`

        counterRequests.innerHTML = strHtml
    }
//


// ---------------------------------------
// ---------------------------------------
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
    // USER HISTORY VARIABLES

        /* counters */
        let counterUsers = document.getElementById("counterUsers")
        let counterBooks = document.getElementById("counterBooks")
        let counterLibraries = document.getElementById("counterLibraries")
        let counterCategories = document.getElementById("counterCategories")
        let counterTags = document.getElementById("counterTags")
        let counterRequests = document.getElementById("counterRequests")

        /* bars */
        let barBookCapacity = document.getElementById("barBookCapacity")
        let barBookAvailable = document.getElementById("barBookAvailable")

        /* buttons */
        let btnSearch = document.getElementById("btnSearch")
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* counter */
        counterTotalUsers()
        counterTotalBooks()
        counterTotalLibraries()
        counterTotalCategories()
        counterTotalTags()
        counterTotalRequests()

        /* percentages */
        percentageBookCapacity()
        percentageBooksAvailable()
    //

    
    // --------------------------------------
    // BUTTONS

        /* search */
        btnSearch.addEventListener("click", function(event) {
            searchBooksByWord(inputSearch.value)
            inputSearch.value = ""

            event.preventDefault()
        })
    //
})