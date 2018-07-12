
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

    /* check rating valid */
    function checkRatingValid(bookId) {
        let strError = ""

        // compares if user already rated selected book
        for (let i = 0; i < ratings.length; i++) {
            if (ratings[i].bookId == bookId) {
                if (ratings[i].usersId.includes(parseInt(userCurrent))) {
                    strError = "Já pontuou este livro!"
                }
            }
        }

        if (strError == "") {
            Rating.rateBookById(bookId)
            localStorage.setItem("ratings", JSON.stringify(ratings))

            console.log("pontuado")
            
            $('#modalRating').modal('hide')
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
// RENDER TABLES

    /* previous requests */
    function renderTablePreviousRequests() {
        let strHtml = ""    
    
        for (let i = 0; i < requests.length; i++) {
            if (requests[i].userId == userCurrent && requests[i].deliveryDate != "") {
                for (let j = 0; j < books.length; j++) {
                    if (requests[i].bookId == books[j].id) {
                        strHtml += `<tr>
                                        <td>
                                            <img class='cover-small' src='${books[j].bookCover}'>
                                        </td>
                                        <td>
                                            <p><strong>${books[j].bookTitle}</strong></p>
                                            <p>${books[j].bookAuthors}</p>
                                        </td>
                                        <td>
                                            <a id='${requests[i].id}' class='view' data-toggle='modal' data-target='#modalViewRequestDetails'><i class="fa fa-book"></i></a>
                                            <a id='${requests[i].id}' class='rating' data-toggle='modal' data-target='#modalRating'><i class='fa fa-star'></i></a>
                                        </td>
                                    </tr>`
                    }
                }
            }
        }    
        strHtml += "</tbody>"
        tblRequestsHistory.innerHTML = strHtml
        
        /* modal with previous requested book details */
        let bookRequest = document.getElementsByClassName("view")

        for (let i = 0; i < bookRequest.length; i++) {
            bookRequest[i].addEventListener("click", function() {
                let requestId = bookRequest[i].getAttribute("id")
                modalRequestBookDetails.innerHTML = addPreviousRequestDetails(requestId)

                // opens rating modal from request details
               /* btnModalRating.addEventListener("click", function(event) {
                    $('#modalViewRequestDetails').modal('hide')
                    addBookInfoToRating(requestId)
                    
                    frmRatings.addEventListener("submit", function(event) {
                        let bookId = Request.getBookById(requestId)
                        
                        Book.rateBookById(bookId)                    
                        localStorage.setItem("books", JSON.stringify(books))
                        
                        $('#modalRating').modal('hide')
                    })
                    
                    event.preventDefault()
                })*/
            })
        }
        
        /* modal to rate previous requested book */
        let bookRating = document.getElementsByClassName("rating")

        for (let i = 0; i < bookRating.length; i++) {
            bookRating[i].addEventListener("click", function() {
                let requestId = bookRequest[i].getAttribute("id")
                let bookId = Request.getBookById(requestId)
                let s = 0

                console.log("requestId    " + requestId)
                console.log("bookId    " + bookId)

                addBookInfoToRating(requestId)

                // add rating to selected book request
                frmRatings.addEventListener("submit", function(event) {
                    s++
                    checkRatingValid(bookId)
                    console.log("s    " + s)
                    event.preventDefault()
                })

            })
        }
    }

    /* current requests */
    function renderTableCurrentRequests() {
        let strHtml = ""

        for (let i = 0; i < requests.length; i++) {
            if (requests[i].userId == userCurrent && requests[i].deliveryDate == "") {
                for (let j = 0; j < books.length; j++) {                    
                    if (requests[i].bookId == books[j].id) {
                        strHtml += `<tr>
                                        <a href='../index.html'>
                                        <td>
                                            <img class='cover-small' src='${books[j].bookCover}'>
                                        </td>
                                        <td>
                                            <p><strong>${books[j].bookTitle}</strong></p>
                                            <p>${books[j].bookAuthors}</p>
                                        </td>
                                        <td>
                                            <a id='${requests[i].id}' class='deliver' data-toggle='modal' data-target='#modalDeliverBook'><i class="fa fa-calendar-check"></i></a>
                                        </td>
                                        </a>
                                    </tr>`
                    }
                }
            }
        }    
        strHtml += "</tbody>"
        tblRequestsCurrent.innerHTML = strHtml
        
        /* modal with current requested book details and to deliver */
        let deliverBook = document.getElementsByClassName("deliver")

        for (let i = 0; i < deliverBook.length; i++) {
            deliverBook[i].addEventListener("click", function() {
                let requestId = deliverBook[i].getAttribute("id")
                modalDeliverDetails.innerHTML = addCurrentRequestDetails(requestId)

                frmDeliveries.addEventListener("submit", function(event) {
                    checkBookDeliveryValid(requestId)
                    event.preventDefault()
                })
            })
        }
    }
//


// ---------------------------------------
// MODAL
    
    /* add book details to modal: previous request */
    function addPreviousRequestDetails(id) {
        let strHtml = ""

        for (let i = 0; i < requests.length; i++) {
            if (requests[i].userId == userCurrent && requests[i].id == id) {
                strHtml += `<div class='form-group text-center'>
                                <img id='viewCover' class='img-fluid img-thumbnail' src='${Book.getBookCoverById(requests[i].bookId)}'>
                                <h4>${Book.getBookTitleById(requests[i].bookId)}</h4>
                                <h6>${Book.getBookAuthorsById(requests[i].bookId)}</h6>
                            </div>

                            <div class='table-responsive'>
                            <table class='table table-borderless table-sm' style='margin-top: 0px;'>
                                <tbody>
                                    <tr>
                                        <td><strong>Data de requisição:</strong> ${requests[i].requestDate}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Data de entrega:</strong> ${requests[i].deliveryDate}</td>
                                    </tr>
                                </tbody>
                            </table>`
            }
        }
        return strHtml
    }
    
    /* add book details to modal: current request */
    function addCurrentRequestDetails(id) {
        let strHtml = ""
        let checkFine = 0
        let today
        let requestDate

        for (let i = 0; i < requests.length; i++) {
            requestDate = requests[i].requestDate
            today = getCurrentDate()
            
        }

        let differenceDays = function(date1, date2) {
            dt1 = new Date(date1)
            dt2 = new Date(date2)
            return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24))
        }
        
        let delayedDays = differenceDays(requestDate, today)

        for (let i = 0; i < users.length; i++) {
            if (users[i].id == userCurrent) {
                checkFine = User.calculateFineValueByRequest(delayedDays)
            }            
        }

        for (let i = 0; i < requests.length; i++) {
            if (requests[i].userId == userCurrent && requests[i].id == id) {
                strHtml += `<div class='form-group text-center'>
                                <img id='viewCover' class='img-fluid img-thumbnail' src='${Book.getBookCoverById(requests[i].bookId)}'>
                                <h4>${Book.getBookTitleById(requests[i].bookId)}</h4>
                                <h6>${Book.getBookAuthorsById(requests[i].bookId)}</h6>
                            </div>

                            <div class='table-responsive'>
                                <table class='table table-borderless table-sm' style='margin-top: 0px;'>
                                    <tbody>
                                        <tr>
                                            <td><strong>Data de requisição:</strong> ${requests[i].requestDate}</td>
                                        </tr>
                                      <!--  <tr>
                                            <td><strong>Data de entrega prevista:</strong> </td>
                                        </tr>-->
                                        <tr>
                                            <td><strong>Dias em atraso: </strong> ${delayedDays}</td>
                                        </tr>
                                        <tr style='border-bottom: solid 1px #dee2e6;'>
                                            <td style='padding-bottom: 30px !important;'><strong>Valor da multa:</strong> ${checkFine} €</td>
                                        </tr>
                                        <tr>
                                            <td style='padding-top: 10px !important;'><h5>Entregar</h5></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>`
            }
        }
        return strHtml
    }

    /* add book details to modal: rating */
    function addBookInfoToRating(id) {
        let strHtml = ""
        
        for (let i = 0; i < requests.length; i++) {
            if (requests[i].userId == userCurrent && requests[i].id == id) {
                strHtml += `<div class='form-group text-center'>
                                <img id='viewCover' class='img-fluid img-thumbnail' src='${Book.getBookCoverById(requests[i].bookId)}'>
                                <h4>${Book.getBookTitleById(requests[i].bookId)}</h4>
                                <h6>${Book.getBookAuthorsById(requests[i].bookId)}</h6>
                            </div>`
            }
        }
        modalRatingBookDetails.innerHTML = strHtml
    }
//


// --------------------------------------
// VALIDATION

    /* book deliver */
    function checkBookDeliveryValid(requestId) {
        let libraryId = Library.getLibraryIdByLocation(modalDeliverCity.value, modalDeliverParish.value)
        let bookId = ""
        let strError = ""
        let requestDays = 0
        let count = 0

        for (let i = 0; i < requests.length; i++) {
            if (requests[i].id = requestId) {
                bookId = requests[i].bookId
            }
        }

    ///////

        /* check if library selected is full */        
        for (let i = 0; i < libraries.length; i++) {            
            for (let j = 0; j < books.length; j++) {
                if (modalDeliverParish.value == libraries[i].parish && books[j].libraryId == libraries[i].id) {
                    count++
                }
            }
        }

        for (let i = 0; i < libraries.length; i++) {
            if (modalDeliverParish.value == libraries[i].parish && count >= libraries[i].bookCapacity) {
                strError = 'Esta biblioteca está lotada./nPor favor selecione outra.'
            }
        }

    ///////

        if (strError == "") {           
            Request.receiveRequestBookById(requestId)
            requestDays = Request.timeAcumulation(requestId)
            Book.updateBookLibraryId(bookId, libraryId)
            User.calculateFineValue(requestDays)

            localStorage.setItem("requests", JSON.stringify(requests))
            localStorage.setItem("books", JSON.stringify(books))
            localStorage.setItem("users", JSON.stringify(users))

            $('#modalDeliverBook').modal('hide')

            renderTablePreviousRequests()
            renderTableCurrentRequests()
        }
        else {
            swal({
                type: 'error',
                title: 'Ohoh...',
                text: strError,
                showConfirmButton: true,
                confirmButtonColor: '#ffd892',
                allowOutsideClick: false
            })
        }
    }

/*
    function delayedDays(id){
        let delay
        let timeDifference

        let today = getCurrentDate()

        for (let i = 0; i < requests.length; i++) {
            if(requests[i].userId == userCurrent && requests[i].id == id){

                delay = today - requests[i].requestDate

                console.log("data de requisição: " + requests[i].requestDate)
                console.log(delay)
            }            
        }
        console.log("hoje: " + parseInt(today))



       // calculateFineValue()
    }*/
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

        /* forms */
        let frmViewRequestDetails = document.getElementById("frmViewRequestDetails")
        let frmRatings = document.getElementById("frmRatings")
        let frmDeliveries = document.getElementById("frmDeliveries")

        /* tables */
        let tblRequestsHistory = document.getElementById("tblRequestsHistory")
        let tblRequestsCurrent = document.getElementById("tblRequestsCurrent")

        /* inputs */
        let modalRequestBookDetails = document.getElementById("modalRequestBookDetails")
        let modalRatingBookDetails = document.getElementById("modalRatingBookDetails")
        let modalRatingInput = document.getElementById("modalRatingInput")
        let modalDeliverDetails = document.getElementById("modalDeliverDetails")
        let modalDeliverCity = document.getElementById("modalDeliverCity")
        let modalDeliverParish = document.getElementById("modalDeliverParish")
        
        /* buttons */
        let btnModalRating = document.getElementById("btnModalRating")
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* tables */
        renderTablePreviousRequests()
        renderTableCurrentRequests()

        /* user history */        
        modalDeliverCity.innerHTML = addCitiesToModal()
    //


    // --------------------------------------
    // FORMS

        /* add parish to modal: deliver */
        modalDeliverCity.addEventListener("change", function(event){
            modalDeliverParish.innerHTML = addParishToModal(modalDeliverCity.value)
            event.preventDefault()
        })
    //
})