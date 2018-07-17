
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

    /* log in */
    function checkLoginValid(email, pass) {
        let status = 1

        for (let i = 0; i < users.length; i++) {        
            if (users[i].userEmail == email && users[i].userPassword == pass) {
                userCurrent = users[i].id
                userPermissions = users[i].userPermissions
                status = users[i].userStatus
                users[i].lastLogIn = getCurrentDate()
            }
        }

        if (userCurrent != -1) {
            if (status != 0) {
                $('#modalLogin').modal('hide')

                location.reload()
                navbarVisible()
                
                // saves in session storage the logged user and the permissions
                sessionStorage.setItem("userCurrent", userCurrent)
                sessionStorage.setItem("userPermissions", userPermissions)
                localStorage.setItem("users", JSON.stringify(users))
            }
            else {
                swal({
                    position: 'top',
                    type: 'error',
                    title: 'Ohoh...',
                    text: 'Parece que a sua conta está bloqueada! Por favor contacte a central para mais informações.',
                    confirmButtonColor: '#FFD892',
                    allowOutsideClick: false
                })
            }
        }
        else {
            swal({
                position: 'top',
                type: 'error',
                title: 'Oops...',
                text: 'Dados de autenticação inválidos!',
                confirmButtonColor: '#FFD892',
                allowOutsideClick: false
            })
        }
    }

    /* new user */
    function checkNewUserValid(newUser) {
        let strError = ""

        // compares if email is already registered
        for (let i = 0; i < users.length; i++) {
            if (users[i].userEmail == modalRegisterEmail.value) {
                strError = `O email "${modalRegisterEmail.value}" já está registado!`
            }
        }

        if (strError == "") {
            saveUser(newUser)

            swal({
                type: 'success',
                title: 'Parabéns!',
                text: 'O seu registo foi realizado com sucesso.',
                showConfirmButton: true,
                confirmButtonColor: '#9fc490',
                allowOutsideClick: false
            })

            $('#modalRegister').modal('hide')
        }
        else {
            swal({
                type: 'error',
                title: 'Ohoh...',
                text: strError,
                confirmButtonColor: '#9fc490',
                allowOutsideClick: false
            })
        }
    }
//


// --------------------------------------
// INDEX

    /* popular books */
    function addPopularBooks() {

        // prevents original array from new sorting
        let sortBooksRating = [...ratings].sort()
        let strHtml = "<h1 class='bottom'>DESTAQUES</h1>"
        
        // sort book by rating
        sortBooksRating.sort(function(a, b) {
            return Rating.calculateRating(b.bookRatings) - Rating.calculateRating(a.bookRatings)
        })

        // creates html for the popular books section
        for (let i = 0; i < sortBooksRating.length; i++) {
            if (i == 0) {
                strHtml += "<div class='row text-center'>"
            }

            if (userCurrent == -1) {
                if (i >= 0 & i <= 4) {
                    strHtml += `<div class='book col-md-2 text-center'>                                
                                    <h6 id="badgeNumbers">${i+1}</h6>
                                    <img src='${Book.getBookCoverById(sortBooksRating[i].bookId)}' class='img-fluid book-tippy' width='160'/>
                                    <h5>${Book.getBookTitleById(sortBooksRating[i].bookId)}</h5>
                                    <p>${Book.getBookAuthorsById(sortBooksRating[i].bookId)}</p>
                                    <div>${convertRatingToStars(Rating.calculateRating(sortBooksRating[i].bookRatings))}</div>
                                </div>`
                }
            }
            else {
                if (i >= 0 & i <= 4) {
                    strHtml += `<div class='book col-md-2 text-center'>
                                    <h6 id="badgeNumbers">${i+1}</h6>
                                    <a id='${sortBooksRating[i].bookId}' href='html/bookSelect.html' class='book-page'>
                                        <img src='${Book.getBookCoverById(sortBooksRating[i].bookId)}' class='img-fluid' width='160'/>
                                    </a>
                                    <a id='${sortBooksRating[i].bookId}' href='html/bookSelect.html' class='book-page'>
                                        <h5>${Book.getBookTitleById(sortBooksRating[i].bookId)}</h5>
                                    </a>
                                    <a id='${sortBooksRating[i].bookId}' href='html/bookSelect.html' class='book-page'>
                                        <p>${Book.getBookAuthorsById(sortBooksRating[i].bookId)}</p>
                                    </a>
                                    <a id='${sortBooksRating[i].bookId}' href='html/bookSelect.html' class='book-page'>
                                        ${convertRatingToStars(Rating.calculateRating(sortBooksRating[i].bookRatings))}
                                    </a>
                                </div>`
                }
            }

            if (i == 4) {
                strHtml += "</div>"
            }
            popularBooks.innerHTML = strHtml
        }
    }

    /* recent books */
    function addRecentBooks() {
        
        // prevents original array from new sorting
        let sortBooksRecent = [...books].sort()
        let strHtml = "<h1 class='bottom'>NOVIDADES</h1>"

        // sort book by donation date
        sortBooksRecent.sort(function(a, b) {
            return new Date(b.donationDate) - new Date(a.donationDate)
        })

        // creates html for the recent books section
        for (let i = 0; i < sortBooksRecent.length; i++) {
            if (i == 0) {
                strHtml += "<div class='row'>"
            }

            if (userCurrent == -1) {
                if (i >= 0 & i <= 4) {
                    strHtml += `<div class='book col-md-2 text-center'>
                                    <img src='${sortBooksRecent[i].bookCover}' class='img-fluid book-tippy' width='160'/>
                                    <h5>${sortBooksRecent[i].bookTitle}</h5>
                                    <p>${sortBooksRecent[i].bookAuthors}</p>
                                    <div>${convertRatingToStars(Rating.calculateRatingByBookId(sortBooksRecent[i].id))}</div>
                                </div>`
                }
            }
            else {
                if (i >= 0 & i <= 4) {
                    strHtml += `<div class='book col-md-2 text-center'>
                                    <a id='${sortBooksRecent[i].id}' href='html/bookSelect.html' class='book-page'>
                                        <img src='${sortBooksRecent[i].bookCover}' class='img-fluid' width='160'/>
                                    </a>
                                    <a id='${sortBooksRecent[i].id}' href='html/bookSelect.html' class='book-page'>
                                        <h5>${sortBooksRecent[i].bookTitle}</h5>
                                    </a>
                                    <a id='${sortBooksRecent[i].id}' href='html/bookSelect.html' class='book-page'>
                                        <p>${sortBooksRecent[i].bookAuthors}</p>
                                    </a>
                                    <a id='${sortBooksRecent[i].id}' href='html/bookSelect.html' class='book-page'>
                                        ${convertRatingToStars(Rating.calculateRatingByBookId(sortBooksRecent[i].id))}
                                    </a>
                                </div>`
                }
            }

            if (i == 4) {
                strHtml += "</div>"
            }
            recentBooks.innerHTML = strHtml
        }
    }
//


// --------------------------------------
// --------------------------------------
addLoadEvent(function() {

    // --------------------------------------
    // LOCAL STORAGE

        /* load */
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

        /* populate local storage */        
        if (window.localStorage.length != 0) {
            populateStorage()
        }
    //

    
    // --------------------------------------
    // INDEX VARIABLES

        /* forms */
        let frmLogin = document.getElementById("frmLogin")
        let frmRegister = document.getElementById("frmRegister")
        let frmDonate = document.getElementById("frmDonate")
        let count = 0

        /* inputs */
        let modalLoginEmail = document.getElementById("modalLoginEmail")
        let modalLoginPassword = document.getElementById("modalLoginPassword")
        let modalRegisterName = document.getElementById("modalRegisterName")
        let modalRegisterEmail = document.getElementById("modalRegisterEmail")
        let modalRegisterPassword = document.getElementById("modalRegisterPassword")
        let modalRegisterPhoto = document.getElementById("modalRegisterPhoto")

        /* buttons */
        let optDonate = document.getElementById("optDonate")
        let btnClose = document.getElementById("btnClose")
        let btnSearch = document.getElementById("btnSearch")

        /* index */
        let popularBooks = document.getElementById("popularBooks")
        let recentBooks = document.getElementById("recentBooks")
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

        /* index */
        addPopularBooks()
        addRecentBooks()
        getSelectBook()
    //


    // --------------------------------------
    // TIPPY
        
        // creates tooltip with log in for non logged users
        tooltipLogIn.innerHTML = `<p>Faz <strong>log in</strong> para veres mais!</p>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalLogin">Log In</button>`

        // changes characteristics of the tool tip
        tippy('.book-tippy', {
            interactive: true,
            position: top,
            arrow: true,
            trigger: 'mouseenter',
            html: '#tooltipLogIn',
            theme: 'custom rounded',
            size: 'large',
            animation: 'scale',
            distance: 15,
            inertia: true,
            duration: '[600, 300]'
        })

        // adapts tooltip to mobile
        const tip = tippy('[title]')

        tippy.browser.onUserInputChange = type => {
            const method = type === 'touch' ? 'disable' : 'enable'
            for (const tooltip of tip.tooltips) {
                tooltip[method]()
            }
        }
    //


    // --------------------------------------
    // FORMS
            
        /* log in */
        frmLogin.addEventListener("submit", function(event) {
            checkLoginValid(modalLoginEmail.value, modalLoginPassword.value)
            event.preventDefault()
        })
            
        /* register */
        frmRegister.addEventListener("submit", function(event) {
            let newUser = new User(modalRegisterName.value,
                                    modalRegisterEmail.value,
                                    modalRegisterPassword.value,
                                    modalRegisterPhoto.value,
                                    2,
                                    1,
                                    0)

            checkNewUserValid(newUser)

            if (checkNewUserValid(newUser) == true) {
                frmRegister.reset()
            }

            event.preventDefault()
        })

        /* donate book */
        frmDonate.addEventListener("submit", function(event) {
            checkNewBookValid()
            frmDonate.reset()
            
            addRecentBooks()
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

        /* donate next */
        btnNext.addEventListener("click", function(event){
            count += 1
            viewDonateStep(count)
            event.preventDefault()
        })

        /* donate previous */
        btnPrevious.addEventListener("click", function(event){
            count -= 1
            viewDonateStep(count)
            event.preventDefault()
        })

        /* donate close and reset */
        btnClose.addEventListener("click", function(event){
            frmDonate.reset()
            count = 0
            viewDonateStep(count)
            event.preventDefault()
        })

        /* search */
        btnSearch.addEventListener("click", function(event) {
            searchBooksByWord(inputSearch.value)
            inputSearch.value = ""

            event.preventDefault()
        })
    //
})