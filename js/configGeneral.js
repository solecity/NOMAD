
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
// VALIDATION

    /* category */
    function checkCategoryValid(newCategory) {
        let strError = ""

        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name == inputCategory.value) {
                strError = `A categoria "${inputCategory.value}" já está registada!`
            }
        }

        if (strError == "") {
            saveCategory(newCategory)
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

    /* tag */
    function checkTagValid(newTag) {
        let strError = ""

        for (let i = 0; i < tags.length; i++) {
            if (tags[i].name == inputTag.value) {
                strError = `A tag "${inputTag.value}" já está registada!`
            }
        }

        if (strError == "") {
            saveTag(newTag)
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
// RENDER TABLES

    /* categories */
    function renderTableCategories() {
        let strHtml = `<thead class='thead-dark'><tr>
                        <th class='w-5'>Id</th>
                        <th class='w-100'>Categoria</th>
                        <th></th>
                        </tr>
                        </thead><tbody>`

        for (let i = 0; i < categories.length; i++) {
            strHtml += `<tr>
                            <td>${categories[i].id}</td>
                            <td>${convertFirstToUpperCase(categories[i].name)}</td>
                            <td><a id='${categories[i].id}' class='remove'><i class='fa fa-times-circle'></i></a></td>
                        </tr>`
        }

        strHtml += "</tbody>"
        tblCategories.innerHTML = strHtml

        /* remove category */
        let removeCategory = document.getElementsByClassName("remove")

        for (let i = 0; i < removeCategory.length; i++) {
            removeCategory[i].addEventListener("click", function() {
                let categoryId = removeCategory[i].getAttribute("id")

                swal({
                    type: 'warning',
                    title: `Tem a certeza que pretende eliminar esta categoria "${Category.getCategoryById(categoryId)}"?`,
                    text: 'Todos os livros associados irão ser eliminados.',
                    showCancelButton: true,
                    confirmButtonColor: '#9fc490',
                    cancelButtonColor: '#ba9378',
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.value) {
                        swal({
                            type: 'success',
                            title: 'Eliminada!',
                            text: `A categoria "${Category.getCategoryById(categoryId)}" foi eliminada.`,
                            showConfirmButton: true,
                            confirmButtonColor: '#9fc490',
                            allowOutsideClick: false
                        })

                        Category.removeCategoryById(categoryId)
                        localStorage.setItem("categories", JSON.stringify(categories))

                        renderTableCategories()
                    }
                })
            })
        }
    }

    /* tags */
    function renderTableTags() {
        // HEADER
        let strHtml = `<thead class='thead-dark'><tr>
                        <th class='w-5'>Id</th>
                        <th class='w-100'>Tag</th>
                        <th></th>
                        </tr>
                        </thead><tbody>`

        for (let i = 0; i < tags.length; i++) {
            strHtml += `<tr>
                        <td>${tags[i].id}</td>
                        <td>${convertFirstToUpperCase(tags[i].name)}</td>
                        <td><a id='${tags[i].id}' class='remove'><i class='fa fa-times-circle'></i></a></td>
                        </tr>`
        }

        strHtml += "</tbody>"
        tblTags.innerHTML = strHtml

        // BUTTON REMOVE
        let removeTag = document.getElementsByClassName("remove")

        for (let i = 0; i < removeTag.length; i++) {
            removeTag[i].addEventListener("click", function() {
                let tagId = removeTag[i].getAttribute("id")

                swal({
                    type: 'warning',
                    title: `Tem a certeza que pretende eliminar esta tag "${Tag.getTagById(tagId)}"?`,
                    showCancelButton: true,
                    confirmButtonColor: '#9fc490',
                    cancelButtonColor: '#ba9378',
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.value) {
                        swal({
                            type: 'success',
                            title: 'Eliminada!',
                            text: `A tag "${Tag.getTagById(tagId)}" foi eliminada.`,
                            showConfirmButton: true,
                            confirmButtonColor: '#9fc490',
                            allowOutsideClick: false
                        })

                        Tag.removeTagById(tagId)
                        localStorage.setItem("tags", JSON.stringify(tags))

                        renderTableTags()
                    }
                })
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
    // CONFIG MANAGER VARIABLES

        /* forms */
        let frmCategories = document.getElementById("frmCategories")
        let frmTags = document.getElementById("frmTags")
        let frmConfig = document.getElementById("frmConfig")
        
        /* inputs */
        let inputCategory = document.getElementById("inputCategory")
        let inputTag = document.getElementById("inputTag")
        let inputRequestFineValue = document.getElementById("inputRequestFineValue")
        let inputRequestDays = document.getElementById("inputRequestDays")
        let inputRequestFineMax = document.getElementById("inputRequestFineMax")

        /* buttons */
        let btnCategory = document.getElementById("btnCategory")
        let btnTag = document.getElementById("btnTag")
        let btnConfig = document.getElementById("btnConfig")

        /* tables */
        let tblCategories = document.getElementById("tblCategories")
        let tblTags = document.getElementById("tblTags")
    //


    // --------------------------------------
    // ON LOAD
        navbarVisible()
    //


    // --------------------------------------
    // LOAD TABLES
        renderTableCategories()
    //


    // --------------------------------------
    // ITEMS VISIBLE ON LOAD
        frmTags.style.display = "none"
        frmConfig.style.display = "none"
    //


    // --------------------------------------
    // FORMS

        /* categories */
        frmCategories.addEventListener("submit", function(event) {
            let newCategory = new Category((inputCategory.value).toLowerCase())

            checkCategoryValid(newCategory)
            renderTableCategories()

            frmCategories.reset()
            event.preventDefault()
        })

        /* tags */
        frmTags.addEventListener("submit", function(event) {
            let newTag = new Tag((inputTag.value).toLowerCase())

            checkTagValid(newTag)
            renderTableTags()

            frmTags.reset()
            event.preventDefault()
        })

        /* config */
        frmConfig.addEventListener("submit", function(event) {
            let tempConfig = {
                        id: 1,
                        requestDays: inputRequestDays.value,
                        fineValue: inputRequestFineValue.value,
                        fineMax: inputRequestFineMax.value
            }

            saveConfig(tempConfig)
            event.preventDefault()
        })
    //

    
    // --------------------------------------
    // TABS

        /* categories */
        btnCategory.addEventListener("click", function () {
            renderTableCategories()

            frmCategories.style.display = "block"
            frmTags.style.display = "none"
            frmConfig.style.display = "none"
            tblCategories.style.display = "block"
            tblTags.style.display = "none"
        })

        /* tags */
        btnTag.addEventListener("click", function () {
            renderTableTags()

            frmCategories.style.display = "none"
            frmTags.style.display = "block"
            frmConfig.style.display = "none"
            tblCategories.style.display = "none"
            tblTags.style.display = "block"
        })

        /* config */
        btnConfig.addEventListener("click", function () {
            loadConfig()

            inputRequestDays.value = config.requestDays
            inputRequestFineValue.value = config.fineValue
            inputRequestFineMax.value = config.fineMax

            frmCategories.style.display = "none"
            frmTags.style.display = "none"
            frmConfig.style.display = "block"
            tblCategories.style.display = "none"
            tblTags.style.display = "none"
        })
    //
})