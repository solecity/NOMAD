
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

    /* parishes */
//


// --------------------------------------
// RENDER TABLES

    /* books */
    function renderTableBooks() {
        let strHtml = `<thead class='thead-midoffice'>
                            <tr>
                                <th class='w-5'>Id</th>
                                <th class='w-20'>Título</th>
                                <th class='w-10'>Categoria</th>
                                <th class='w-10'>Tags</th>
                                <th class='w-10'>Estado</th>
                                <th class='w-10'>Biblioteca</th>
                                <th class='w-2'></th>
                            </tr>
                        </thead>
                        <tbody>`
            
        for (let i = 0; i < books.length; i++) {
            let tagsId = books[i].bookTags
            let arrayTags = []
                
            for (let j = 0; j < tagsId.length; j++) {
                arrayTags.push(" " + Tag.getTagById(tagsId[j]))
            }
            
            strHtml += `<tr>
                            <td>${books[i].id}</td>
                            <td>${books[i].bookTitle}</td>
                            <td>${convertFirstToUpperCase(Category.getCategoryById(books[i].bookCategory))}</td>
                            <td>${arrayTags}</td>
                            <td>${books[i].bookCondition}</td>
                            <td>${books[i].libraryId}</td>
                            <td>
                                <a id='${books[i].id}' class='view mr-1' data-toggle='modal' data-target='#viewBookModal'><i class='fa fa-info-circle'></i></a>
                                <a id='${books[i].id}' class='remove'><i class='fa fa-times-circle'></i></a>
                            </td>
                        </tr>`
        }

        strHtml += "</tbody>"
        tblBooks.innerHTML = strHtml
        
        /* modal with book details */
        let bookView = document.getElementsByClassName("view")

        for (let i = 0; i < bookView.length; i++) {
            bookView[i].addEventListener("click", function() {
                let bookId = bookView[i].getAttribute("id")
                Book.viewBookById(bookId)
            })
        }

        /* remove book */
        let bookRemove = document.getElementsByClassName("remove")

        for (let i = 0; i < bookRemove.length; i++) {
            bookRemove[i].addEventListener("click", function(event) {
                let bookId = parseInt(bookRemove[i].getAttribute("id"))

                swal({
                    title: `Tem a certeza que pretende eliminar a livro "${Book.getBookTitleById(bookId)}"?`,
                    text: 'Não poderá reverter esta ação.',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#ffd892',
                    cancelButtonColor: '#ba9378',
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.value) {
                        swal({
                            type: 'success',
                            title: 'Eliminado!',
                            text: `O livro "${Book.getBookTitleById(bookId)}" foi eliminado.`,
                            showConfirmButton: true,
                            confirmButtonColor: '#ffd892'
                        })

                        Book.removeBookById(bookId)
                        Request.removeRequestByBookId(bookId)

                        localStorage.setItem("books", JSON.stringify(books))
                        localStorage.setItem("requests", JSON.stringify(requests))

                        renderTableBooks()
                    }
                })
                event.preventDefault()
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
    // LIBRARY MANAGER VARIABLES

        /* forms */
        let frmViewBooks = document.getElementById("frmViewBooks")

        /* modal */
        let viewBookTitle = document.getElementById("viewBookTitle")
        let viewBookAuthors = document.getElementById("viewBookAuthors")
        let viewBookPublisher = document.getElementById("viewBookPublisher")
        let viewBookYear = document.getElementById("viewBookYear")
        let viewBookPages = document.getElementById("viewBookPages")
        let viewBookCity = document.getElementById("viewBookCity")
        let viewBookParish = document.getElementById("viewBookParish")
        let viewBookCategory = document.getElementById("viewBookCategory")
        let viewBookTags = document.getElementById("viewBookTags")
        let viewBookCondition = document.getElementById("viewBookCondition")
        let viewBookDonor = document.getElementById("viewBookDonor")
        let viewBookDonate = document.getElementById("viewBookDonate")
        let viewBookCover = document.getElementById("viewBookCover")
        let viewBookDescription = document.getElementById("viewBookDescription")

        /* buttons */
        let btnEdit = document.getElementById("btnEdit")
        let btnClose = document.getElementById("btnClose")
        let count = 0
        
        /* tables */
        let tblBooks = document.getElementById("tblBooks")
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* donate book modal */
        modalDonateCategories.innerHTML = addCategoriesToModal()
        modalDonateTags.innerHTML = addTagsToModal()
        modalDonateCity.innerHTML = addCitiesToModal()

        /* view book modal */
        viewBookCategory.innerHTML = addCategoriesToModal()
        viewBookTags.innerHTML = addTagsToModal()
        viewBookCity.innerHTML = addCitiesToModal()

        /* items disabled */
        viewBookCity.disabled = true
        viewBookParish.disabled = true
        viewBookCategory.disabled = true
        viewBookTags.disabled = true
        viewBookCondition.disabled = true

        /* table */
        renderTableBooks()
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
    
        /* view book */
        frmViewBooks.addEventListener("submit", function(event) {
            for (let i = 0; i < books.length; i++) {
                /*if(books[i].id) {
                    //let tempId = 

                    Book.editBookById(tempId)

                    localStorage.setItem("books", JSON.stringify(books))
                }*/
            }
             
            $('#viewBookModal').modal('hide')

            renderTableBooks()
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
    
        /* edit user */
        btnEdit.addEventListener("click", function(event) {
            if (count == 0) {
                viewBookCity.disabled = false
                viewBookParish.disabled = false
                viewBookCategory.disabled = false
                viewBookTags.disabled = false
                viewBookCondition.disabled = false
                count = 1
            }
            else if (count == 1) {
                viewBookCity.disabled = true
                viewBookParish.disabled = true
                viewBookCategory.disabled = true
                viewBookTags.disabled = true
                viewBookCondition.disabled = true
                count = 0
            }
            event.preventDefault()
        })

        /* close modal */
        btnClose.addEventListener("click", function(event){
            renderTableBooks()
            event.preventDefault()
        })
    //
})