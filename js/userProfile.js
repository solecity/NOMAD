
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
// USER PROFILE

    /* user info */
    function addUserInfo() {
        for (let i = 0; i < users.length; i++) {
            if (userCurrent == users[i].id) {
                viewName.value = users[i].userName
                viewEmail.value = users[i].userEmail
                viewPassword.value = users[i].userPassword                
                viewFine.value = users[i].fineValue
                
                if (users[i].userPhoto != "") {
                    viewPhoto.src = users[i].userPhoto
                }
                else {
                    viewPhoto.src = "../images/profileIcon.png"
                }
            }
        }
    }

    /* edit user photo */
    function editUserPhoto(newPhoto) {
        for (let i = 0; i < users.length; i++) {
            User.editUserPhotoById(userCurrent, newPhoto)
            localStorage.setItem("users", JSON.stringify(users))
        }
        viewPhoto.src = newPhoto
    
        $('#modalChangePhoto').modal('hide')
    }

    /* edit user password */
    function editUserPassword(newPass, confirmPass) {
        let strError = ""
        let tempPass = parseInt(newPass)

        for (let i = 0; i < users.length; i++) {
            if (users[i].id == userCurrent) {
                if (newPass != confirmPass) {
                    strError = 'A password e a confirmação tem de ser iguais!'
                }
            }
        }

        if (strError == "") {          
            User.editUserPasswordById(userCurrent, tempPass)
            localStorage.setItem("users", JSON.stringify(users))

            viewPassword.value = newPass

            swal({
                type: 'success',
                title: `Password alterada`,
                text: 'A sua password foi alterada com sucesso!',
                confirmButtonColor: '#FFD892',
                allowOutsideClick: false                
            })

            $('#modalChangePassword').modal('hide')
        }
        else {
            console.log(strError)
            swal({
                type: 'error',
                title: 'Oops...',
                text: strError,
                confirmButtonColor: '#ffd892',
                allowOutsideClick: false
            })
        }
    }

    /* pay fine */
    function payPendentFine(){
        let strHtml = ""
    
        for (let i = 0; i < users.length; i++) {
            if (userCurrent == users[i].id) {
                strHtml = `<h6 class="inline">Valor da multa: </h6>
                            <p class="inline">${users[i].fineValue}€</p>`
            }
        }
        viewFineCurrent.innerHTML = strHtml

        frmFine.addEventListener("submit", function(event) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == userCurrent) {
                    if (users[i].fineValue > 0) {
                        if (viewFine.value >= viewFinePay.value) {
                            users[i].fineValue -= parseInt(viewFinePay.value)
                            viewFine.value = users[i].fineValue
                        }
                        else {
                            swal({
                                type: 'error',
                                title: 'Oops...',
                                text: 'Não pague um valor superior à sua multa!',
                                confirmButtonColor: '#ffd892',
                                allowOutsideClick: false                
                            })
                        }
                    }
                    else {
                        swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Já não tem multas por pagar!',
                            confirmButtonColor: '#ffd892',
                            allowOutsideClick: false                
                        })
                    }
                }
            }
            
            localStorage.setItem("users", JSON.stringify(users))            
            $('#modalViewFine').modal('hide')
            event.preventDefault()
        })
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
    // USER PROFILE VARIABLES

        /* forms */
        let frmProfile = document.getElementById("frmProfile")
        let frmPhoto = document.getElementById("frmPhoto")
        let frmPassword = document.getElementById("frmPassword")
        let frmFine = document.getElementById("frmFine")

        /* inputs */
        let viewPhoto = document.getElementById("viewPhoto")
        let viewName = document.getElementById("viewName")
        let viewEmail = document.getElementById("viewEmail")
        let viewPassword = document.getElementById("viewPassword")
        let viewFine = document.getElementById("viewFine")
        let changePhotoNewLink = document.getElementById("changePhotoNewLink")
        let changePasswordNew = document.getElementById("changePasswordNew")
        let changePasswordConfirm = document.getElementById("changePasswordConfirm")
        let viewFineCurrent = document.getElementById("viewFineCurrent")
        let viewFinePay = document.getElementById("viewFinePay")
    
        /* buttons */
        let btnViewFine = document.getElementById("btnViewFine")
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* user profile */
        addUserInfo()
        payPendentFine()

        /* notifications */
        if (userPermissions == 2) {
            viewNotificationPanel()
        }
    //


    // --------------------------------------
    // FORMS

        /* edit photo */
        frmPhoto.addEventListener("submit", function(event) {
            editUserPhoto(changePhotoNewLink.value)
            event.preventDefault()
        })
    
        /* edit password */
        frmPassword.addEventListener("submit", function(event) {            
            editUserPassword(changePasswordNew.value, changePasswordConfirm.value)
            event.preventDefault()
        })
    //
})