
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

    /* user */
    function checkUserValid(newUser) {
        let strError = ""
        let strTitle = ""

        if (inputPermissions.value == "") {
            strTitle = 'Oops...'
            strError = 'Existem campos por preencher'
        }

        for (let i = 0; i < users.length; i++) {
            if (users[i].userEmail == inputEmail.value) {
                strTitle = 'Ohoh...'
                strError = `O email "${inputEmail.value}" já está registado!`
            }
        }

        if (strError == "") {
            saveUser(newUser)
        }
        else {
            swal({
                type: 'error',
                title: strTitle,
                text: strError,
                confirmButtonColor: '#9fc490',
                allowOutsideClick: false
            })
        }
    }    
//


// --------------------------------------
// RENDER TABLES

    /* users */
    function renderTableUsers() {
        let strHtml = `<thead class='thead-dark'>
                            <tr>
                                <th class='w-5'>#</th>
                                <th class='w-20'>NOME</th>
                                <th class='w-30'>E-MAIL</th>
                                <th class='w-10'>PASSWORD</th>
                                <th class='w-3'>PERMISSÕES</th>
                                <th class='w-3'>ESTADO</th>
                                <th class='w-5'>MULTA</th>
                                <th class='w-2'></th>
                            </tr>
                        </thead><tbody>`

        for (let i = 0; i < users.length; i++) {
            strHtml += `<tr>
                            <td>${users[i].id}</td>
                            <td>${users[i].userName}</td>
                            <td>${users[i].userEmail}</td>
                            <td>${users[i].userPassword}</td>
                            <td>${User.convertPermissions(parseInt(users[i].userPermissions))}</td>
                            <td>${User.convertStatus(parseInt(users[i].userStatus))}</td>
                            <td>${User.checkFineByPermissions(users[i].userPermissions, users[i].fineValue)} €</td>
                            <td>
                                <a id=' ${users[i].id}' class='view mr-1' data-toggle='modal' data-target='#viewUserModal'><i class='fa fa-info-circle'></i></a>
                                <a id='${users[i].id}' class='remove'><i class='fa fa-times-circle'></i></a>
                            </td>
                        </tr>`  
        }
        strHtml += "</tbody>"
        tblUsers.innerHTML = strHtml
        
        /* get view links from table */
        let userView = document.getElementsByClassName("view")

        for (let i = 0; i < userView.length; i++) {
            userView[i].addEventListener("click", function(event) {
                let userId = userView[i].getAttribute("id")
                User.viewUserById(userId)
    
                /* block user */
                btnBlock.addEventListener("click", function(event) {            
                    swal({
                        type: 'warning',
                        title: `Tem a certeza que pretende bloquear o utilizador "${User.getUserNameById(userId)}"?`,
                        showCancelButton: true,
                        confirmButtonColor: '#9fc490',
                        cancelButtonColor: '#ba9378',
                        confirmButtonText: 'Sim',
                        cancelButtonText: 'Não',
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.value) {
                            swal({
                                type: 'success',
                                title: 'Bloqueado!',
                                text: `O utilizador "${User.getUserNameById(userId)}" foi bloqueado.`,
                                showConfirmButton: true,
                                confirmButtonColor: '#9fc490',
                                allowOutsideClick: false
                            })
                            
                            viewUserStatus.value = User.convertStatus(0)

                            User.editUserStatusById(userId)
                            localStorage.setItem("users", JSON.stringify(users))

                            renderTableUsers()
                        }
                    })
                    
                    event.preventDefault()
                })


                event.preventDefault()
            })        
        }

        /* get remove links from table */
        let userRemove = document.getElementsByClassName("remove")

        for (let i = 0; i < userRemove.length; i++) {
            userRemove[i].addEventListener("click", function(event) {
                let userId = userRemove[i].getAttribute("id")

                swal({
                    type: 'warning',
                    title: `Tem a certeza que pretende eliminar este utilizador "${User.getUserNameById(userId)}"?`,
                    showCancelButton: true,
                    confirmButtonColor: '#9fc490',
                    cancelButtonColor: '#ba9378',
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.value) {
                        swal({
                            type: 'success',
                            title: 'Eliminado!',
                            text: `O utilizador "${User.getUserNameById(userId)}" foi eliminado.`,
                            showConfirmButton: true,
                            confirmButtonColor: '#9fc490',
                            allowOutsideClick: false
                        })
                        
                        User.removeUserById(userId)
                        Request.removeRequestByUserId(userId)

                        localStorage.setItem("users", JSON.stringify(users))
                        localStorage.setItem("requests", JSON.stringify(requests))

                        renderTableUsers()
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
    // USER MANAGER VARIABLES

        /* forms */
        let frmUsers = document.getElementById("frmUsers")
        let frmViewUser = document.getElementById("frmViewUser")
        let count = 0

        /* inputs */
        let inputName = document.getElementById("inputName")
        let inputEmail = document.getElementById("inputEmail")
        let inputPassword = document.getElementById("inputPassword")
        let inputPhoto = document.getElementById("inputPhoto")
        let inputPermissions = document.getElementById("inputPermissions")

        /* modal */
        let viewUserName = document.getElementById("viewUserName")
        let viewUserEmail = document.getElementById("viewUserEmail")
        let viewUserPassword = document.getElementById("viewUserPassword")
        let viewUserPermissions = document.getElementById("viewUserPermissions")
        let viewUserStatus = document.getElementById("viewUserStatus")
        let viewUserFine = document.getElementById("viewUserFine")
        let viewUserPhoto = document.getElementById("viewUserPhoto")

        /* buttons */
        let btnEdit = document.getElementById("btnEdit")
        let btnBlock = document.getElementById("btnBlock")
        let btnClose = document.getElementById("btnClose")
        let btnSearch = document.getElementById("btnSearch")

        /* tables */
        let tblUsers = document.getElementById("tblUsers")
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* items disabled */
        viewUserPermissions.disabled = true

        /* tables */
        renderTableUsers()
    //
    

    // --------------------------------------
    // FORMS

        /* add user */
        frmUsers.addEventListener("submit", function(event) {
            let newUser = new User(inputName.value, inputEmail.value, inputPassword.value, inputPhoto.value, inputPermissions.value, 0)

            checkUserValid(newUser)
            renderTableUsers()
            
            frmUsers.reset()
            event.preventDefault()
        })

        /* edit user */
        frmViewUser.addEventListener("submit", function(event) {
            for (let i = 0; i < users.length; i++) {
                if(users[i].userEmail == viewUserEmail.value){
                    let tempId = User.getUserIdByEmail(viewUserEmail.value)
                    
                    User.editUserPermissionsById(tempId)
                    localStorage.setItem("users", JSON.stringify(users))

                    swal({
                        type: 'success',
                        title: 'Alterado!',
                        text: 'As informações foram alteradas com sucesso',
                        showConfirmButton: true,
                        confirmButtonColor: '#9fc490',
                        allowOutsideClick: false
                    })
                }
            }
            $('#viewUserModal').modal('hide')

            renderTableUsers()

            viewUserPermissions.disabled = true
            
            event.preventDefault()
        })
    //


    // --------------------------------------
    // BUTTONS
    
        /* edit user */
        btnEdit.addEventListener("click", function(event) {
            if (count == 0) {
                viewUserPermissions.disabled = false
                count = 1
            }
            else if (count == 1) {
                viewUserPermissions.disabled = true
                count = 0
            }
            event.preventDefault()
        })

        /* close modal */
        btnClose.addEventListener("click", function(event){
            renderTableUsers()
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