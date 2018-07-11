
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
// BOOK SELECT

    /* book info */
    function addSelectBookInfo(bookCurrent) {
        for (let i = 0; i < books.length; i++) {
            if (bookCurrent == books[i].id) {
                let categoryTitle = document.getElementById("categoryTitle")
                let tagsId = books[i].bookTags
                let arrayTags = []
                
                for (let j = 0; j < tagsId.length; j++) {
                    arrayTags.push(" " + convertFirstToUpperCase(Tag.getTagById(tagsId[j])))
                }
                
                categoryTitle.innerHTML += `<h1>${Category.getCategoryById(books[i].bookCategory).toUpperCase()}</h1>`

                if (books[i].bookRatings.length != 0) {
                    stars.innerHTML = convertRatingToStars(Book.calculateRating(books[i].bookRatings))
                }
                
                viewBookTitle.innerHTML = books[i].bookTitle
                viewCover.src = books[i].bookCover
                viewAuthors.innerHTML = books[i].bookAuthors
                viewPublisher.innerHTML = books[i].bookPublisher
                viewYear.innerHTML = books[i].bookYear
                viewDescription.innerHTML = books[i].bookDescription
                viewCategory.innerHTML = convertFirstToUpperCase(Category.getCategoryById(books[i].bookCategory))
                viewTags.innerHTML = arrayTags
                viewCondition.innerHTML = books[i].bookCondition
                viewPages.innerHTML = books[i].bookPages
            }
        }
    }

    /* block comments if user didn't request book */
    function blockCommentByUserId() {
        for (let i = 0; i < requests.length; i++) {
            if (userPermissions == 2) {
                if (requests[i].userId == userCurrent && requests[i].bookId == bookCurrent) {
                    $("#inputComment").removeAttr('readonly')
                }
            }
            else {
                $("#inputComment").removeAttr('readonly')
            }
        }
    }
//


// --------------------------------------
// VALIDATION

    /* new request */
    function checkRequestValid(bookSelect) {
        let strError = ""
        let count = 0

        /* count current request by current user */
        for (let i = 0; i < requests.length; i++) {
            if (requests[i].userId == userCurrent && requests[i].deliveryDate == "") {
                count++
            }
        }

        /* check if user doesn't have more than 2 requested books */
        if (count == 2) {
            strError = 'Já tem dois livros requisitados!'
        }
        
        /* check if current user doesn't have fines to pay */
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == userCurrent) {
                if (users[i].fineValue != 0) {
                    strError = 'Ainda tem multas por pagar!'
                }
            }
        }

        if (strError == "") {
            let newRequest = new Request(parseInt(userCurrent), parseInt(bookSelect), getCurrentDate(), "")
            saveRequest(newRequest)
            
            let arrayBooks = Book.getSimilarBooks(bookSelect)

            for (let i = 0; i < arrayBooks.length; i++) {      
                if (arrayBooks[i].id == bookSelect) {  
                    let tempRequest = document.getElementById(`btnRequest_${arrayBooks[i].id}`)
                    let tempText = document.getElementById(`requestUnavailable_${arrayBooks[i].id}`)
        
                    tempRequest.style.display = "none"
                    tempText.style.display = "block"
                }
            }

            swal({
                type: 'success',
                title: 'Reservado',
                text: `O livro "${Book.getBookTitleById(bookSelect)}" foi requisitado com sucesso!`,
                confirmButtonColor: '#FFD892',
                allowOutsideClick: false
            })
            
            blockCommentByUserId()
        }
        else {
            swal({
                type: 'error',
                title: 'Ohoh...',
                text: strError,
                confirmButtonColor: '#FFD892',
                allowOutsideClick: false
            })
        }
    }
//


// --------------------------------------
// RENDER TABLES

    /* available books */
    function renderTableBooks(bookCurrent) {
        let arrayBooks = Book.getSimilarBooks(bookCurrent)

        let strHtml = `<thead>
                            <tr>
                                <th class='w-20'>CIDADE</th>
                                <th class='w-30'>FREGUESIA</th>
                                <th class='w-20'>ESTADO</th>
                                <th class='w-2 btn-center'>FILA DE ESPERA</th>
                            </tr>
                        </thead>
                        <tbody>`

        for (let i = 0; i < arrayBooks.length; i++) {
            if (userPermissions == 2) {
                strHtml += `<tr>
                                <td>${Library.getCityById(Library.getLibraryCityById(arrayBooks[i].library))}</td>
                                <td>${Library.getParishById(Library.getLibraryParishById(arrayBooks[i].library))}</td>
                                <td id='bookStatus_${arrayBooks[i].id}'>Disponível</td>
                                <td class='btn-center'>
                                    <a id='btnRequest_${arrayBooks[i].id}' class='request' href='#'>Requisitar</a>
                                    <a id='btnNotify_${arrayBooks[i].id}' class='notify' href='#'>Notificar</a>
                                    <p id='requestUnavailable_${arrayBooks[i].id}'>Livro já requisitado</p>
                                </td>
                            </tr>`
            }
            else {
                strHtml += `<tr>
                                <td>${Library.getCityById(Library.getLibraryCityById(arrayBooks[i].library))}</td>
                                <td>${Library.getParishById(Library.getLibraryParishById(arrayBooks[i].library))}</td>
                                <td id='bookStatus_${arrayBooks[i].id}'>Disponível</td>
                                <td class='btn-center'>
                                    <a id='btnRequest_${arrayBooks[i].id}'>Requisitar</a>
                                    <a id='btnNotify_${arrayBooks[i].id}'>Notificar</a>
                                    <p id='requestUnavailable_${arrayBooks[i].id}'>Livro já requisitado</p>
                                </td>
                            </tr>`
            }
        }

        strHtml += "</tbody>"
        tblBooks.innerHTML = strHtml

        for (let i = 0; i < requests.length; i++) {
            for (let j = 0; j < arrayBooks.length; j++) {
                let tempRequest = document.getElementById(`btnRequest_${arrayBooks[j].id}`)
                let tempNotify = document.getElementById(`btnNotify_${arrayBooks[j].id}`)
                let requestUnavailable = document.getElementById(`requestUnavailable_${arrayBooks[j].id}`)
                let bookStatus = document.getElementById(`bookStatus_${arrayBooks[j].id}`)

                if (requests[i].bookId == arrayBooks[j].id && requests[i].deliveryDate == "") {
                    if (requests[i].userId == userCurrent) {
                        tempRequest.style.display = "none"
                        tempNotify.style.display = "none"
                        requestUnavailable.style.display = "block"
                        bookStatus.innerHTML = "Indisponível"
                    }
                    else {
                        tempRequest.style.display = "none"
                        tempNotify.style.display = "block"
                        requestUnavailable.style.display = "none"
                        bookStatus.innerHTML = "Indisponível"
                    }
                }
                else {
                    tempRequest.style.display = "block"
                    tempNotify.style.display = "none"
                    requestUnavailable.style.display = "none"
                    bookStatus.innerHTML = "Disponível"
                }
            }
        }

        /* request link from table */
        let bookRequest = document.getElementsByClassName("request")

        for (let i = 0; i < bookRequest.length; i++) {
            bookRequest[i].addEventListener("click", function() {
                let requestId = bookRequest[i].getAttribute("id")
                                
                checkRequestValid(requestId.substring("btnRequest_".length))
            })
        }
    }
    
    /* comments */
    function renderTableComments(bookCurrent) {
        let strHtml = ""

        for (let i = 0; i < comments.length; i++) {
            if (comments[i].bookId == bookCurrent) {
                strHtml += `<tr>
                            <td class='comment-user-info'>
                                <img src='${User.viewUserPhotoById(comments[i].userId)}' class='img-fluid img-thumbnail rounded-circle'>
                                <p>${User.getUserNameById(comments[i].userId)}</p>
                            </td>
                            <td><p>${comments[i].comment}</p></td>
                            </tr>`
            }
        }

        strHtml += "</tbody>"
        tblMoreComments.innerHTML = strHtml
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

        loadRequests()
        console.log(requests)

        loadWishlists()
        console.log(wishlists)

        loadComments()
        console.log(comments)

        loadLibraries()
        console.log(libraries)

    //


    // --------------------------------------
    // BOOK SELECT VARIABLES

        /* session storage */
        bookCurrent = sessionStorage.getItem("bookCurrent", bookCurrent)

        /* forms */
        let frmDonate = document.getElementById("frmDonate")

        /* inputs */
        let viewBookTitle = document.getElementById("viewBookTitle")
        let viewCover = document.getElementById("viewCover")
        let viewScore = document.getElementById("viewScore")
        let viewAuthors = document.getElementById("viewAuthors")
        let viewPublisher = document.getElementById("viewPublisher")
        let viewYear = document.getElementById("viewYear")
        let viewDescription = document.getElementById("viewDescription")
        let viewCategory = document.getElementById("viewCategory")
        let viewTag = document.getElementById("viewTag")
        let viewCondition = document.getElementById("viewCondition")
        let viewPages = document.getElementById("viewPages")
        let inputComment = document.getElementById("inputComment")

        /* buttons */
        let btnClose = document.getElementById("btnClose")
        let btnAddComment = document.getElementById("btnAddComment")
        let btnCancelComment = document.getElementById("btnCancelComment")

        /* tables */
        let tblAddComment = document.getElementById("tblAddComment")
        let tblMoreComments = document.getElementById("tblMoreComments")
        let tblBooks = document.getElementById("tblBooks")

        /* others */
        let userIcon = document.getElementById("userIcon")
        let count = 0
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* donate book modal */
        viewDonateStep(count)
        modalDonateCategories.innerHTML = addCategoriesToModal()
        modalDonateTags.innerHTML = addTagsToModal()
        modalDonateCity.innerHTML = addCitiesToModal()

        /* user */
        userIcon.src = User.viewUserPhotoById(userCurrent)

        /* notifications */
        if (userPermissions == 2) {
            viewNotificationPanel()
        }

        /* tables */
        renderTableBooks(bookCurrent)
        renderTableComments(bookCurrent)

        /* book select */
        addSelectBookInfo(bookCurrent)
        blockCommentByUserId()
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

        /* add comment */
        btnAddComment.addEventListener("click", function(event){
            let newComment = new Review(userCurrent,
                                        bookCurrent,
                                        inputComment.value)

            saveComment(newComment)
            renderTableComments(bookCurrent)

            inputComment.value = ""

            event.preventDefault()
        })

        /* reset comment */
        btnCancelComment.addEventListener("click", function(event){
            inputComment.value = ""

            event.preventDefault()
        })
    //
})