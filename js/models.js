
// --------------------------------------
// ARRAYS
    let users = []
    let categories = []
    let tags = []
    let books = []
    let comments = []
    let ratings = []
    let requests = []
    let wishlists = []
    let libraries = []
//


// --------------------------------------
// VARIABLES
    let userCurrent = sessionStorage.getItem("userCurrent")
    let userPermissions = sessionStorage.getItem("userPermissions")

    if (userCurrent == null || userPermissions == null) {
        userCurrent = -1
        userPermissions = -1
    }

    let categoryCurrent = 0
    let bookCurrent = 0
    let config = {
            requestDays: 1,
            fineValue: 2,
            fineMax: 20
    }
//


// --------------------------------------
// CLASS

    /* user */
    class User {
        constructor(userName, userEmail, userPassword, userPhoto, userPermissions, userStatus, fineValue, favourites) {
            this._id = User.getLastId() + 1
            this.userName = userName
            this.userEmail = userEmail
            this.userPassword = userPassword
            this.userPhoto = userPhoto
            this.userPermissions = userPermissions
            this.userStatus = userStatus
            this.fineValue = fineValue            
            this.favourites = favourites
            this._lastLogin = ""
        }
        
        // ID
        get id() {
            return this._id
        }

        // NAME
        get userName() {
            return this._userName
        }
        set userName(newUserName) {
            this._userName = newUserName
        }

        // EMAIL
        get userEmail() {
            return this._userEmail
        }
        set userEmail(newUserEmail) {
            this._userEmail = newUserEmail
        }

        // PASSWORD
        get userPassword() {
            return this._userPassword
        }
        set userPassword(newUserPassword) {
            this._userPassword = newUserPassword
        }

        // PHOTO
        get userPhoto() {
            return this._userPhoto
        }
        set userPhoto(newUserPhoto) {
            this._userPhoto = newUserPhoto
        }

        // PERMISSIONS
        get userPermissions() {
            return this._userPermissions
        }
        set userPermissions(newUserPermissions) {
            this._userPermissions = newUserPermissions
        }

        // STATUS
        get userStatus() {
            return this._userStatus
        }
        set userStatus(newUserStatus) {
            this._userStatus = newUserStatus
        }

        // FINE VALUE
        get fineValue() {
            return this._fineValue
        }
        set fineValue(newFineValue) {
            this._fineValue = newFineValue
        }

        // FAVOURITE CATEGORIES
        get favourites() {
            return this._favourites
        }
        set favourites(newFavourites) {
            this._favourites = newFavourites
        }

        // LAST LOG IN
        get lastLogin() {
            return this._lastLogIn
        }
        set lastLogin(newLastLogIn) {
            this._lastLogIn = newLastLogIn
        }

        // GET LAST ID
        static getLastId() {
            let lastId = 0

            if (users.length != 0) {
                lastId = users[users.length - 1].id
            }
            return lastId
        }

        // CALCULATE FINE VALUE
        static calculateFineValue(days) {
            let tempFineValue = 0
            
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == userCurrent) { 
                    if (days > config.requestDays) {
                        if (users[i].fineValue < config.fineMax) {
                            tempFineValue = users[i].fineValue + (days * config.fineValue)       
                            if (tempFineValue < config.fineMax) {
                                users[i].fineValue = tempFineValue
                            }
                            else {
                                users[i].fineValue = config.fineMax
                            }
                        }   
                        else {
                            users[i].fineValue = config.fineMax
                        }
                    }
                }
            }
        }

        // CALCULATE FINE VALUE BY REQUEST
        static calculateFineValueByRequest(days) {    
            let cont = 0
            
            for (let j = 0; j < users.length; j++) {
                if (users[j].id == userCurrent) {
                    for (let i = 0; i < days; i++) {
                        if (users[j].fineValue < config.fineMax) {
                            if (days > config.requestDays) {
                                cont = days * config.fineValue

                                if (cont < config.fineMax) {
                                    return cont
                                }
                                else {
                                    return config.fineMax
                                }
                            }
                        }
                        else {
                            return config.fineMax
                        }
                    }
                }
            }
        }

        // CONVERT PERMISSIONS VALUE
        static convertPermissions(permissions) {
            switch (permissions) {
                case 0:
                    return "Administrador"
                    break
                case 1:
                    return "Operador"
                    break
                case 2:
                    return "Standard"
                    break
            }
        }

        // CHECK USER FINE BY PERMISSIONS
        static checkFineByPermissions(permissions, fine) {
            if (permissions == 2) {
                return fine
            }
            else {
                return "---"
            }
        }

        // GET USER NAME BY ID
        static getUserNameById(id) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == id) {
                    return users[i].userName
                }                  
            }
        }

        // GET USER ID BY EMAIL
        static getUserIdByEmail(email) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].userEmail == email) {
                    return users[i].id
                }
            }
        }

        // GET FAVOURITES LENGTH ID BY EMAIL
        static getFavouritesLengthById(id) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == id) {
                    return users[i].favourites.length
                }
            }
        }

        // VIEW USER ICON BY ID
        static viewUserPhotoById(id) {
            for (let i = 0; i < users.length; i++) {
                if(users[i].id == id){
                    return users[i].userPhoto
                }
            }
        }

        // VIEW USER BY ID
        static viewUserById(id) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == id) {
                    viewUserName.value= users[i].userName
                    viewUserEmail.value = users[i].userEmail
                    viewUserPassword.value =  users[i].userPassword
                    viewUserFine.value =  users[i].fineValue
                    viewUserPermissions.value =  users[i].userPermissions
                    viewUserPhoto.setAttribute("src", users[i].userPhoto)
                }                  
            }
        }

        // EDIT USER PERMISSIONS BY ID
        static editUserPermissionsById(id) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == id) {
                    users[i].userPermissions = parseInt(viewUserPermissions.value)
                }
            }
        }

        // EDIT USER PHOTO BY ID
        static editUserPhotoById(id, photo) {
            for (let i = 0; i < users.length; i++) {
                if(users[i].id == id) {
                    users[i].userPhoto = photo
                }
            }
        }

        // EDIT USER PHOTO BY ID
        static editUserPasswordById(id, password) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == id) {
                    users[i].userPassword = password
                }
            }
        }

        // EDIT FAVOURITES BY ID
        static editFavouritesById(categories) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == userCurrent) {
                    users[i].favourites = categories
                }
            }
        }

        // ADD FAVOURITE CATEGORY BY ID
        static addFavouriteCategoryById(id) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == userCurrent && users[i].favourites.includes(id) == false) {
                    users[i].favourites.push(id)
                }
            }
        }

        // REMOVE FAVOURITE CATEGORY BY ID
        static removeFavouriteCategoryById(id) {
            let tempArray = []
            
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == userCurrent) {
                    tempArray = users[i].favourites
                }
            }

            for (let i = tempArray.length; i >= 0 ; i--) {
                if (tempArray[i] == id) {
                    tempArray.splice(i, 1)
                }
            }
            return tempArray
        }

        // REMOVE USER BY ID
        static removeUserById(id) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == id) {
                    users.splice(i, 1)
                }
            }
        }
    }

    /* category */
    class Category {
        constructor(name) {
            this._id = Category.getLastId() + 1
            this.name = name
        }

        // ID
        get id() {
            return this._id
        }
        
        // NAME
        get name() {
            return this._name
        }
        set name(newName) {
            this._name = newName      
        }
        
        // GET LAST ID
        static getLastId() {
            let lastId = 0

            if (categories.length > 0) {
                lastId = categories[categories.length - 1].id
            }
            return lastId
        }

        // GET CATEGORY NAME BY ID
        static getCategoryById(id) {
            for (let i = 0; i < categories.length; i++) {
                if(categories[i].id == id) {
                    return categories[i].name
                }                  
            }
        }

        // REMOVE CATEGORY BY ID
        static removeCategoryById(id) {
            for (let i = 0; i < categories.length; i++) {
                if(categories[i].id == id) {
                    categories.splice(i, 1)
                }                  
            }
        }
    }

    /* tag */
    class Tag {
        constructor(name) {
            this._id = Tag.getLastId() + 1
            this.name = name
        }

        // ID
        get id() {
            return this._id
        }
        
        // NAME
        get name() {
            return this._name
        }
        set name(newName) {
            this._name = newName      
        }
        
        // GET LAST ID
        static getLastId() {
            let lastId = 0

            if (tags.length > 0) {
                lastId = tags[tags.length - 1].id
            }

            return lastId
        }

        // GET TAG NAME BY ID
        static getTagById(id) {
            for (let i = 0; i < tags.length; i++) {
                if(tags[i].id == id) {
                    return tags[i].name
                }
            }
        }

        // GET TAG LIST BY ID
        static getTagsById(id) {
            let tempArray = []

            for (let i = 0; i < tags.length; i++) {
                if(tags[i].id == id) {
                    tempArray.push(tags[i].name)
                }
            }

            return tempArray
        }

        // REMOVE TAG FROM ID
        static removeTagById(id) {
            for (let i = 0; i < tags.length; i++) {
                if(tags[i].id == id) {
                    tags.splice(i, 1)
                }                  
            }
        }
    }

    /* book */
    class Book {
        constructor(bookTitle, bookAuthors, bookPublisher, bookYear, bookPages, bookCategory, bookTags, bookCondition, donorName, donationDate, bookCover, bookDescription, libraryId) {
            this._id = Book.getLastId() + 1
            this.bookTitle = bookTitle
            this.bookAuthors = bookAuthors
            this.bookPublisher = bookPublisher
            this.bookYear = bookYear
            this.bookPages = bookPages
            this.bookCategory = bookCategory
            this.bookTags = bookTags
            this.bookCondition = bookCondition
            this.donorName = donorName
            this.donationDate = donationDate
            this.bookCover = bookCover
            this.bookDescription = bookDescription
            this.libraryId = libraryId
        }

        // ID
        get id() {
            return this._id
        }

        // TITLE
        get bookTitle() {
            return this._bookTitle
        }
        set bookTitle(newBookTitle) {
            this._bookTitle = newBookTitle        
        }

        // AUTHORS
        get bookAuthors() {
            return this._bookAuthors
        }
        set bookAuthors(newBookAuthors) {
            this._bookAuthors = newBookAuthors        
        }

        // PUBLISHER
        get bookPublisher() {
            return this._bookPublisher
        }
        set bookPublisher(newBookPublisher) {
            this._bookPublisher = newBookPublisher        
        }

        // YEAR
        get bookYear() {
            return this._bookYear
        }
        set bookYear(newBookYear) {
            this._bookYear = newBookYear        
        }

        // PAGES
        get bookPages() {
            return this._bookPages
        }
        set bookPages(newBookPages) {
            this._bookPages = newBookPages        
        }

        // CATEGORY
        get bookCategory() {
            return this._bookCategory
        }
        set bookCategory(newBookCategory) {
            this._bookCategory = newBookCategory        
        }

        // TAGS
        get bookTags() {
            return this._bookTags
        }
        set bookTags(newBookTags) {
            this._bookTags = newBookTags
        }

        // CONDITION
        get bookCondition() {
            return this._bookCondition
        }
        set bookCondition(newBookCondition) {
            this._bookCondition = newBookCondition        
        }

        // DONOR NAME
        get donorName() {
            return this._donorName
        }
        set donorName(newDonorName) {
            this._donorName = newDonorName        
        }

        // DONATION DATE
        get donationDate() {
            return this._donationDate
        }
        set donationDate(newDonationDate) {
            this._donationDate = newDonationDate        
        }

        // COVER
        get bookCover() {
            return this._bookCover
        }
        set bookCover(newBookCover) {
            this._bookCover = newBookCover        
        }

        // DESCRIPTION
        get bookDescription() {
            return this._bookDescription
        }
        set bookDescription(newBookDescription) {
            this._bookDescription = newBookDescription        
        }

        // LIBRARY ID
        get libraryId() {
            return this._libraryId
        }
        set libraryId(newLibraryId) {
            this._libraryId = newLibraryId
        }

        // GET LAST ID
        static getLastId() {
            let lastId = 0

            if (books.length > 0) {
                lastId = books[books.length - 1].id
            }
            return lastId
        }

        // GET BOOK TITLE BY ID
        static getBookTitleById(id) {        
            for (let i = 0; i < books.length; i++) {
                if (books[i].id == id) {
                    return books[i].bookTitle
                }                  
            }
        }

        // GET BOOK AUTHORS BY ID
        static getBookAuthorsById(id) {
            for (let i = 0; i < books.length; i++) {
                if(books[i].id == id) {
                    return books[i].bookAuthors
                }
            }
        }

        // GET BOOK CATEGORY BY ID
        static getBookCategoryById(id) {
            for (let i = 0; i < books.length; i++) {
                if(books[i].id == id) {
                    return books[i].bookCategory
                }
            }
        }

        // GET BOOK TAG BY ID
        static getBookTagsById(id) {
            for (let i = 0; i < books.length; i++) {
                if(books[i].id == id) {
                    return books[i].bookTags
                }
            }
        }

        // GET BOOK LIBRARY BY ID
        static getBookLibraryById(id) {
            for (let i = 0; i < books.length; i++) {
                if(books[i].id == id) {
                    return books[i].libraryId
                }
            }
        }

        // GET BOOK COVER BY ID
        static getBookCoverById(id) {
            for (let i = 0; i < books.length; i++) {
                if(books[i].id == id) {
                    return books[i].bookCover
                }
            }
        }

        // GET BOOK TAGS BY CATEGORY
        static getBookTagsByCategory(id) {
            let tempArray = []

            for (let i = 0; i < books.length; i++) {
                if (books[i].bookCategory == id) {
                    tempArray.push(books[i].bookTags)
                }
            }
            tempArray = tempArray.reduce((a, b) => a.concat(b), [])

            let newArray = [...new Set(tempArray)]

            return newArray
        }
        
        // GET BOOK AUTHORS BY CATEGORY
        static getBookAuthorsByCategory(id) {
            let tempArray = []

            for (let i = 0; i < books.length; i++) {
                if (books[i].bookCategory == id) {
                    tempArray.push(books[i].bookAuthors)
                }
            }
            let newArray = [...new Set(tempArray)]

            return newArray
        }
        
        // GET BOOK LIBRARY BY CATEGORY
        static getBookLibraryByCategory(id) {
            let tempArray = []

            for (let i = 0; i < books.length; i++) {
                if (books[i].bookCategory == id) {
                    tempArray.push(books[i].libraryId)        
                }                  
            }
            let newArray = [...new Set(tempArray)]
            return newArray
        }

        // GET BOOKS BY FILTER
        static getBooksByFilter(tag, author, library, category) {
            let tempArray = []
            console.log("tag   " + tag)
            console.log("author   " + author)
            console.log("library   " + library)

            for (let i = 0; i < books.length; i++) {
                if ((books[i].bookTags.includes(parseInt(tag)) || books[i].bookAuthors.includes(author) || books[i].libraryId == library) && books[i].bookCategory == category) {
                    tempArray.push(books[i])
                }
            }
            return tempArray
        }

        // GET BOOKS BY TAG
        static getBooksByTag(tag, category) {
            let tempArray = []

            for (let i = 0; i < books.length; i++) {
                if (books[i].bookTags.includes(parseInt(tag)) && books[i].bookCategory == category) {
                    tempArray.push(books[i])
                }
            }
            return tempArray
        }

        // GET BOOKS BY Author
        static getBooksByAuthor(author, category) {
            let tempArray = []

            for (let i = 0; i < books.length; i++) {
                if (books[i].bookAuthors.includes(author) && books[i].bookCategory == category) {
                    tempArray.push(books[i])
                }
            }
            return tempArray
        }

        // GET BOOKS BY CITY
        /*static getBooksByCity(ids, category) {
            let tempArray = []

            for (let i = 0; i < books.length; i++) {
                if (books[i].bookCategory == category) {
                    for (let j = 0; j < ids.length; j++) {
                        if (books[i].libraryId == ids[j]) {
                            tempArray.push(books[i])
                        }
                    }
                }
            }
            return tempArray
        }*/

        // GET BOOKS BY LIBRARY ID
        static getBooksByLibrary(library, category) {
            let tempArray = []

            for (let i = 0; i < books.length; i++) {
                if (books[i].libraryId == library && books[i].bookCategory == category) {
                    tempArray.push(books[i])
                }
            }
            return tempArray
        }

        // GET BOOKS WITH SAME TITLE
        static getSimilarBooks(id) {
            let tempArray = []

            for (let i = 0; i < books.length; i++) {
                if (books[i].bookTitle == Book.getBookTitleById(id)) {
                    let tempBook = { 
                            id: books[i].id,
                            title: books[i].bookTitle,
                            library: books[i].libraryId
                    }                
                    tempArray.push(tempBook)
                }
            }
            return tempArray
        }

        // VIEW BOOK BY ID
        static viewBookById(id) {
            let tempTags = []

            for (let i = 0; i < books.length; i++) {
                if(books[i].id == id) {
                    viewBookTitle.value = books[i].bookTitle
                    viewBookAuthors.value = books[i].bookAuthors
                    viewBookPublisher.value = books[i].bookPublisher
                    viewBookYear.value = books[i].bookYear
                    viewBookPages.value = books[i].bookPages

                    // load de todas as categorias, tags e bibliotecas 
                    // passar a select as que estao no livro correspondente
                    /*
                    for (let i = 0; i < categories.length; i++) {
                        addCategoriesToModal()                        
                    }
    
                    for (let i = 0; i < tags.length; i++) {                        
                        addTagsToModal()                        
                    }*/
    
                    /*for (let i = 0; i < libraries.length; i++) {                        
                        viewBookCity.innerHTML = addCitiesToModal()*/
                        viewBookParish.innerHTML = addParishToModal(Library.getLibraryParishById(books[i].libraryId))
                    //}
/*
                    let a = Library.getLibraryCityById(books[i].libraryId)
                    let options = viewBookCity.options
                    let c

                    for (let j = 0; j < options.length; j++) {
                        console.log("a   " + a)

                        console.log($("#viewBookCity").val(a))
                        if (parseInt(options[i].value) == parseInt(a)) {
                            c = parseInt(options[i].index)
                        }
                    }

                    console.log("a   " + a)
                    console.log(options)
                    console.log("c   " + c)*/


                    viewBookCity.value = Library.getLibraryCityById(books[i].libraryId)
                    viewBookCity.selected = viewBookCity.value
                    viewBookParish.value = Library.getLibraryParishById(books[i].libraryId)
                    viewBookParish.selected = viewBookParish.value
                    viewBookCategory.selectedIndex = books[i].bookCategory
                    


/*
                    viewBookCity.selectedIndex = document.getElementById("viewBookCity").value = Library.getCityById(Library.getLibraryCityById(books[i].libraryId))
                    viewBookParish.selectedIndex = Library.getParishById(Library.getLibraryParishById(books[i].libraryId))
                    viewBookCategory.selectedIndex = books[i].bookCategory*/
                    
                    for (let j = 0; j < books[i].bookTags; j++) {
                        viewBookTags.selectedIndex = (books[i].bookTags)[j]
                    }    

                    viewBookCondition.value = books[i].bookCondition
                    viewBookDonor.value = books[i].bookDonor
                    viewBookDonate.value = books[i].bookDonation
                    viewBookCover.src = books[i].bookCover
                    viewBookDescription.value = books[i].bookDescription
                }                  
            }
        }
        
        // REMOVE BOOK BY ID
        static removeBookById(id) {
            for (let i = 0; i < books.length; i++) {
                if (books[i].id == id) {
                    books.splice(i, 1)
                }                  
            }
        }
        
        // REMOVE BOOK BY LIBRARY ID
        static removeBookByLibraryId(id) {
            for (let i = books.length - 1; i >= 0 ; i--) {
                if (books[i].libraryId == id) {
                    books.splice(i, 1)
                }
            }
        }

        // UPDATE DELIVERED BOOK LIBRARY ID
        static updateBookLibraryId(id, libraryId) {
            for (let i = 0; i < books.length; i++) {
                if (books[i].id == id) {
                    books[i].libraryId = libraryId
                }
            }
        }
    }

    /* comment */
    class Review {
        constructor(userId, bookId, comment) {
            this._id = Review.getLastId() + 1
            this.userId = userId
            this.bookId = bookId
            this.comment = comment
        }

        // ID
        get id() {
            return this._id
        }
        
        // USER ID
        get userId() {
            return this._userId
        }
        set userId(newUserId) {
            this._userId = newUserId      
        }
        
        // BOOK ID
        get bookId() {
            return this._bookId
        }
        set bookId(newBookId) {
            this._bookId = newBookId      
        }
        
        // COMMENT
        get comment() {
            return this._comment
        }
        set comment(newComment) {
            this._comment = newComment      
        }        
        
        // GET LAST ID
        static getLastId() {
            let lastId = 0

            if (comments.length > 0) {
                lastId = comments[comments.length - 1].id
            }
            
            return lastId
        }
    }

    /* ratings */
    class Rating {
        constructor(bookId, usersId, bookRatings) {
            this._id = Rating.getLastId() + 1
            this.bookId = bookId
            this.usersId = usersId
            this.bookRatings = bookRatings
        }

        // ID
        get id() {
            return this._id
        }
        
        // USER ID
        get userId() {
            return this._userId
        }
        set userId(newUserId) {
            this._userId = newUserId      
        }
        
        // BOOK ID
        get bookId() {
            return this._bookId
        }
        set bookId(newBookId) {
            this._bookId = newBookId      
        }
        
        // USER ID
        get usersId() {
            return this._usersId
        }
        set usersId(newUsersId) {
            this._usersId = newUsersId      
        }
        
        // RATING
        get bookRatings() {
            return this._bookRatings
        }
        set bookRatings(newBookRatings) {
            this._bookRatings = newBookRatings
        }        
        
        // GET LAST ID
        static getLastId() {
            let lastId = 0

            if (ratings.length > 0) {
                lastId = ratings[ratings.length - 1].id
            }            
            return lastId
        }

        // CALCULATE BOOK RATING
        static calculateRating(ratings) {
            let tempRating = 0

            if (ratings.length != 1) {
                tempRating = parseInt(ratings.reduce(function(a, b) { return a + b }))
                return (tempRating / (ratings.length - 1))
            }
            else {
                return 0
            }
        }

        // CALCULATE BOOK RATING BY BOOK ID
        static calculateRatingByBookId(id) {
            let tempRating = 0

            for (let i = 0; i < ratings.length; i++) {                
                if (ratings[i].bookId == id) {
                    if (ratings[i].bookRatings.length != 1) {
                        tempRating = parseInt(ratings[i].bookRatings.reduce(function(a, b) { return a + b }))
                        return tempRating / (ratings[i].bookRatings.length - 1)
                    }
                    else {
                        return 0
                    }
                }                
            }
        }

        // RATE BOOK BY ID
        static rateBookById(id) {
            for (let i = 0; i < ratings.length; i++) {
                if (ratings[i].bookId == id) {
                    ratings[i].bookRatings.push(parseInt(modalRatingInput.value))
                    ratings[i].usersId.push(parseInt(userCurrent))
                }
            }
        }
    }

    /* request */
    class Request {
        constructor(userId, bookId, requestDate, deliveryDate) {
            this._id = Request.getLastId() + 1
            this.userId = userId
            this.bookId = bookId
            this.requestDate = requestDate
            this.deliveryDate = deliveryDate
        }

        // ID
        get id() {
        return this._id
        }

        // USER ID
        get userId() {
            return this._userId
        }
        set userId(newUserId) {
            this._userId = newUserId
        } 

        // BOOK ID
        get bookId() {
            return this._bookId
        }
        set bookId(newBookId) {
            this._bookId = newBookId
        }

        // BOOK REQUEST DATE
        get requestDate() {
            return this._requestDate
        }
        set requestDate(newRequestDate) {
            this._requestDate = newRequestDate
        } 

        // BOOK DELIVERY DATE
        get deliveryDate() {
            return this._deliveryDate
        }
        set deliveryDate(newDeliveryDate) {
            this._deliveryDate = newDeliveryDate
        }

        // GET LAST ID
        static getLastId() {
            let lastId = 0

            if (requests.length != 0) {
                lastId = requests[requests.length - 1].id
            }

            return lastId
        }
        
        // GET BOOK ID BY ID
        static getBookById(id) {
            for (let i = 0; i < requests.length; i++) {
                if (requests[i].id == id) {
                    return requests[i].bookId
                }                  
            }
        }
        
        // UPDATE DELIVERY DATE BY REQUEST ID
        static receiveRequestBookById(id) {
            for (let i = 0; i < requests.length; i++) {
                if (requests[i].id == id && requests[i].userId == userCurrent) {
                    requests[i].deliveryDate = getCurrentDate()
                }
            }
        }

        // REMOVE REQUEST BY USER ID
        static removeRequestByUserId(id) {
            for (let i = requests.length - 1; i >= 0 ; i--) {
                if (requests[i].userId == id) {
                    requests.splice(i, 1)
                }
            }
        }

        // REMOVE REQUEST BY BOOK ID
        static removeRequestByBookId(id) {
            for (let i = requests.length - 1; i >= 0 ; i--) {
                if (requests[i].bookId == id) {
                    requests.splice(i, 1)
                }
            }
        }

        // CALCULATE TIME WITH BOOK
        static timeAcumulation(id) {
            let timeToDays = 0

            for (let i = 0; i < requests.length; i++) {
                if (requests[i].id == id) {
                    let time = Math.abs((new Date(requests[i].requestDate)).getTime() - (new Date(requests[i].deliveryDate)).getTime())
                    timeToDays = Math.ceil(time / (1000 * 3600 * 24))
                }
            }
            return timeToDays
        }
    }

    /* wishlists */
    class Wishlist {
        constructor(userId, categoryList, tagList, bookList, libraryList, notificationsCategories, notificationsTags, notificationsBooks, notificationsLibraries) {
            this._id = Wishlist.getLastId() + 1
            this.userId = userId
            this.categoryList = categoryList
            this.tagList = tagList
            this.bookList = bookList
            this.libraryList = libraryList
            this.notificationsCategories = notificationsCategories
            this.notificationsTags = notificationsTags
            this.notificationsBooks = notificationsBooks
            this.notificationsLibraries = notificationsLibraries
        }

        // ID
        get id() {
            return this._id
        }

        // USER ID
        get userId() {
            return this._userId
        }
        set userId(newUserId) {
            this._userId = newUserId       
        }

        // CATEGORY LIST
        get categoryList() {
            return this._categoryList
        }
        set categoryList(newCategoryList) {
            this._categoryList = newCategoryList
        }

        // TAG LIST
        get tagList() {
            return this._tagList
        }
        set tagList(newTagList) {
            this._tagList = newTagList
        }

        // BOOK LIST
        get bookList() {
            return this._bookList
        }
        set bookList(newBookList) {
            this._bookList = newBookList        
        }

        // LIBRARY LIST
        get libraryList() {
            return this._libraryList
        }
        set libraryList(newLibraryList) {
            this._libraryList = newLibraryList        
        }

        // BOOKS ID BY SELECT CATEGORIES
        get notificationsCategories() {
            return this._notificationsCategories
        }
        set notificationsCategories(newNotificationsCategories) {
            this._notificationsCategories = newNotificationsCategories
        }

        // BOOKS ID BY SELECT TAGS
        get notificationsTags() {
            return this._notificationsTags
        }
        set notificationsTags(newNotificationsTags) {
            this._notificationsTags = newNotificationsTags
        }

        // BOOKS ID BY SELECT BOOKS
        get notificationsBooks() {
            return this._notificationsBooks
        }
        set notificationsBooks(newNotificationsBooks) {
            this._notificationsBooks = newNotificationsBooks
        }

        // BOOKS ID BY SELECT LIBRARIES
        get notificationsLibraries() {
            return this._notificationsLibraries
        }
        set notificationsLibraries(newNotificationsLibraries) {
            this._notificationsLibraries = newNotificationsLibraries
        }

        // GET LAST ID
        static getLastId() {
            let lastId = 0

            if (wishlists.length > 0) {
                lastId = wishlists[wishlists.length - 1].id
            }
            
            return lastId
        }

        // GET CATEGORY LIST BY USER ID
        static getCategoriesByUserId(id) {
            let tempArray = []

            for (let i = 0; i < wishlists.length; i++) {
                if (wishlists[i].userId == id) {
                    tempArray = wishlists[i].categoryList
                }
            }
            return tempArray
        }

        // GET TAG LIST BY USER ID
        static getTagsByUserId(id) {
            let tempArray = []

            for (let i = 0; i < wishlists.length; i++) {
                if (wishlists[i].userId == id) {
                    tempArray = wishlists[i].tagList
                }
            }
            return tempArray
        }

        // GET LIBRARY LIST BY USER ID
        static getLibrariesByUserId(id) {
            let tempArray = []

            for (let i = 0; i < wishlists.length; i++) {
                if (wishlists[i].userId == id) {
                    tempArray = wishlists[i].libraryList
                }
            }
            return tempArray
        }

        // GET BOOK LIST BY CATEGORY AND USER ID
        static getBooksByCategoryUserId(id) {
            for (let i = 0; i < wishlists.length; i++) {
                if (wishlists[i].userId == id) {
                    return wishlists[i].notificationsCategories
                }
            }
            return []
        }

        // GET BOOK LIST BY TAG AND USER ID
        static getBooksByTagUserId(id) {
            for (let i = 0; i < wishlists.length; i++) {
                if (wishlists[i].userId == id) {
                    return wishlists[i].notificationsTags
                }
            }
            return []
        }

        // GET BOOK LIST BY USER ID
        static getBooksByUserId(id) {
            for (let i = 0; i < wishlists.length; i++) {
                if (wishlists[i].userId == id) {
                    return wishlists[i].notificationsBooks
                }
            }
            return []
        }

        // GET BOOK LIST BY LIBRARY AND USER ID
        static getBooksByLibraryUserId(id) {
            for (let i = 0; i < wishlists.length; i++) {
                if (wishlists[i].userId == id) {
                    return wishlists[i].notificationsLibraries
                }
            }
            return []
        }

        // REMOVE WISHLIST CATEGORY PREFERENCE BY USER ID
        static removePreferencesByCategoryId(id) {
            let tempArray = []
            
            for (let i = 0; i < wishlists.length; i++) {
                if (wishlists[i].userId == userCurrent) {
                    tempArray = wishlists[i].categoryList
                }
            }

            for (let i = tempArray.length; i >= 0 ; i--) {
                if (tempArray[i] == id) {
                    tempArray.splice(i, 1)
                }
            }
            return tempArray
        }

        // REMOVE WISHLIST TAG PREFERENCE BY USER ID
        static removePreferencesByTagId(id) {
            let tempArray = []
            
            for (let i = 0; i < wishlists.length; i++) {
                if (wishlists[i].userId == userCurrent) {
                    tempArray = wishlists[i].tagList
                }
            }

            for (let i = tempArray.length; i >= 0 ; i--) {
                if (tempArray[i] == id) {
                    tempArray.splice(i, 1)
                }
            }
            return tempArray
        }

        // REMOVE WISHLIST TAG PREFERENCE BY USER ID
        static removePreferencesByLibraryId(id) {
            let tempArray = []
            
            for (let i = 0; i < wishlists.length; i++) {
                if (wishlists[i].userId == userCurrent) {
                    tempArray = wishlists[i].libraryList
                }
            }

            for (let i = tempArray.length; i >= 0 ; i--) {
                if (tempArray[i] == id) {
                    tempArray.splice(i, 1)
                }
            }
            return tempArray
        }

        // REMOVE WISHLIST CATEGORY BY ID
        static removeWishlistCategoriesById(id) {
            for (let i = 0; i < wishlistCategories.length; i++) {
                if (wishlistCategories[i] == id) {
                    wishlistCategories.splice(i, 1)
                }
            }
        }

        // REMOVE WISHLIST TAG BY ID
        static removeWishlistTagsById(id) {
            for (let i = wishlistTags.length; i >= 0; i--) {
                if (wishlistTags[i] == id) {
                    wishlistTags.splice(i, 1)
                }
            }
        }

        // REMOVE WISHLIST BOOK BY ID
        static removeWishlistBooksById(id) {
            for (let i = wishlistBooks.length; i >= 0; i--) {
                if (wishlistBooks[i] == id) {
                    wishlistBooks.splice(i, 1)
                }
            }
        }

        // REMOVE WISHLIST LIBRARY BY ID
        static removeWishlistLibrariesById(id) {
            for (let i = wishlistLibraries.length; i >= 0; i--) {
                if (wishlistLibraries[i] == id) {
                    wishlistLibraries.splice(i, 1)
                }
            }
        }

        // EDIT WISHLIST TAGS BY USER ID
        static editWishlistCategoriesByUserId(id, categories) {
            for (let i = 0; i < wishlists.length; i++) {
                if (wishlists[i].userId == id) {
                    wishlists[i].notificationsCategories = categories
                }
            }
        }

        // EDIT WISHLIST TAGS BY USER ID
        static editWishlistTagsByUserId(id, tags) {
            for (let i = 0; i < wishlists.length; i++) {
                if(wishlists[i].userId == id) {
                    wishlists[i].notificationsTags = tags
                }
            }
        }

        // EDIT WISHLIST BOOKS BY USER ID
        static editWishlistBooksByUserId(id) {
            for (let i = 0; i < wishlists.length; i++) {     
                if (wishlists[i].userId == id) {
                    wishlists[i].notificationsBooks = wishlistBooks
                }
            }
        }

        // EDIT WISHLIST LIBRARIES BY USER ID
        static editWishlistLibrariesByUserId(id, libraries) {
            for (let i = 0; i < wishlists.length; i++) {
                if(wishlists[i].userId == id) {
                    wishlists[i].notificationsLibraries = libraries
                }
            }
        }
    }

    /* libraries */
    class Library {
        constructor(city, parish, address, latitude, longitude, bookCapacity) {
            this._id = Library.getLastId() + 1
            this.city = city
            this.parish = parish
            this.address = address
            this.latitude = latitude
            this.longitude = longitude
            this.bookCapacity = bookCapacity
        }

        // ID
        get id() {
            return this._id
        }
        
        // CITY
        get city() {
            return this._city
        }
        set city(newCity) {
            this._city = newCity        
        }

        // PARISH
        get parish() {
            return this._parish
        }
        set parish(newParish) {
            this._parish = newParish        
        }

        // ADDRESS
        get address() {
            return this._address
        }
        set address(newAddress) {
            this._address = newAddress      
        }

        // LATITUDE
        get latitude() {
            return this._latitude
        }
        set latitude(newLatitude) {
            this._latitude = newLatitude  
        }

        // LONGITUDE
        get longitude() {
            return this._longitude
        }
        set longitude(newLongitude) {
            this._longitude = newLongitude    
        }

        // BOOK CAPACITY
        get bookCapacity() {
            return this._bookCapacity
        }
        set bookCapacity(newBookCapacity) {
            this._bookCapacity = newBookCapacity        
        }
        
        // GET LAST ID
        static getLastId() {
            let lastId = 0

            if (libraries.length > 0) {
                lastId = libraries[libraries.length - 1].id
            }            
            return lastId
        }

        // GET LIBRARY PARISH BY ID
        static getLibraryParishById(id) {
            for (let i = 0; i < libraries.length; i++) {
                if (libraries[i].id == id) {
                    return libraries[i].parish
                }                  
            }
        }

        // GET LIBRARY CITY BY ID
        static getLibraryCityById(id) {
            for (let i = 0; i < libraries.length; i++) {
                if (libraries[i].id == id) {
                    return libraries[i].city
                }                  
            }
        }

        // GET LIBRARY ID BY CITY
        static getLibraryIdByCity(city) {
            let tempArray = []
            
            for (let i = 0; i < libraries.length; i++) {
                if(libraries[i].city == city) {
                    tempArray.push(libraries[i].id)
                }
            }

            return tempArray
        }

        // GET LIBRARY ID BY PARISH AND CITY
        static getLibraryIdByLocation(city, parish) {
            for (let i = 0; i < libraries.length; i++) {
                if(libraries[i].city == city && libraries[i].parish == parish) {
                    return libraries[i].id
                }
            }
        }

        // GET CITY NAME BY ID
        static getCityById(id) {
            for (let i = 0; i < libraries.length; i++) {
                for (let j = 0; j < portugal.length; j++) {
                    if (portugal[j].code == id) {
                        return portugal[j].name
                    }
                }                  
            }
        }

        // GET PARISH NAME BY ID
        static getParishById(id) {
            for (let i = 0; i < libraries.length; i++) {
                for (let j = 0; j < portugal.length; j++) {
                    if (portugal[j].code == id) {
                        return portugal[j].name
                    }
                }                  
            }
        }

        // VIEW LIBRARY FROM ID
        static viewLibraryById(id) {
            for (let i = 0; i < libraries.length; i++) {
                if (libraries[i].id == id) {
                    viewLibraryCity.value = Library.getCityById(libraries[i].city)
                    viewLibraryParish.value = Library.getParishById(libraries[i].parish)
                    viewLibraryAddress.value = libraries[i].address
                    viewLibraryLatitude.value =  libraries[i].latitude  
                    viewLibraryLongitude.value =  libraries[i].longitude
                    viewLibraryBookCapacity.value =  libraries[i].bookCapacity  
                }                  
            }
        }

        // EDIT LIBRARY FROM ID
        static editLibraryById(id) {
            for (let i = 0; i < libraries.length; i++) {
                if (libraries[i].id == id) {
                    libraries[i].address = viewLibraryAddress.value
                    libraries[i].bookCapacity = parseInt(viewLibraryBookCapacity.value)
                }                  
            }
        }

        // REMOVE LIBRARY FROM ID
        static removeLibraryById(id) {
            for (let i = 0; i < libraries.length; i++) {
                if (libraries[i].id == id) {
                    libraries.splice(i, 1)
                }
            }
        } 
    }
//


// --------------------------------------
// NEW ITEMS

    /* users */
    let user01 = ""
    let user02 = ""
    let user03 = ""
    let user04 = ""
    let user05 = ""
    let user06 = ""
    let user07 = ""
    let user08 = ""
    
                        // userName, userEmail, userPassword, userPhoto, userPermissions, status, fineValue, favourites, last login
    if (!localStorage.users) {
        user01 = new User("Administrador", "admin@nomad.pt", 12345, "https://image.flaticon.com/icons/svg/270/270023.svg", 0, 1, 0, [], "2018-06-02")
        users.push(user01)
        user02 = new User("Operador", "operador@nomad.pt", 12345, "https://image.flaticon.com/icons/svg/183/183334.svg", 1, 1, 0, [], "2018-06-02")
        users.push(user02)
        user03 = new User("Samuel Nunes","samNune@hotmail.com", 12345, "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=350", 2, 1, 0, [2, 3], "2018-06-02")
        users.push(user03)
        user04 = new User("Fernando Mendes","oGordo@sapo.pt", 12345, "https://cdn.vidas.pt/images/2011-04/img_650x412$2011_04_17_18_09_00_49374.jpg", 2, 1, 6, [], "2018-06-02")
        users.push(user04)
        user05 = new User("Raquel Reis","raquelreis@nomad.pt", 12345, "https://pbs.twimg.com/profile_images/980917732077129729/jfdmbd45_400x400.jpg", 1, 1, 0, [], "2018-06-02")
        users.push(user05)
        user06 = new User("João Martins", "joaomartins@nomad.com", 12345, "https://3p1h6530guu23dls791jsg13-wpengine.netdna-ssl.com/wp-content/uploads/2017/03/nice-guys.jpeg", 1, 1, 0, [], "2018-06-02")
        users.push(user06)
        user07 = new User("Maria Gomes", "mariagomes@nomad.pt", 12345, "http://cdn.agensite.online/arquivos/83/conteudo/posts/169293.jpg", 1, 1, 0, [], "2018-06-02")
        users.push(user07)
        user08 = new User("Oscar Fernandes", "oscarfernandes@nomad.pt", 12345, "http://www.homemalpha.com.br/wp-content/uploads/2011/08/Homem-confiante.jpg", 1, 1, 0, [], "2018-06-02")
        users.push(user08)
    }

    /* categories */
    let category01 = ""
    let category02 = ""
    let category03 = ""
    let category04 = ""
    let category05 = ""
    let category06 = ""
    let category07 = ""
    let category08 = ""
    let category09 = ""
    let category10 = ""
    let category11 = ""
    let category12 = ""

                                // name
    if (!localStorage.categories) {
        category01 = new Category("literatura")
        categories.push(category01)
        category02 = new Category("línguas")
        categories.push(category02)
        category03 = new Category("viagens")
        categories.push(category03)
        category04 = new Category("ficção")
        categories.push(category04)
        category05 = new Category("banda desenhada")
        categories.push(category05)
        category06 = new Category("lazer")
        categories.push(category06)
        category07 = new Category("turismo")
        categories.push(category07)
        category08 = new Category("ensino")
        categories.push(category08)
        category09 = new Category("religião")
        categories.push(category09)
        category10 = new Category("saúde")
        categories.push(category10)
        category11 = new Category("dicionários")
        categories.push(category11)
        category12 = new Category("culinária")
        categories.push(category12)
    }

    /* tags */
    let tag01 = ""
    let tag02 = ""
    let tag03 = ""
    let tag04 = ""
    let tag05 = ""
    let tag06 = ""
    let tag07 = ""
    let tag08 = ""
    let tag09 = ""
    let tag10 = ""
    let tag11 = ""
    let tag12 = ""
    let tag13 = ""
    let tag14 = ""
    let tag15 = ""
    let tag16 = ""
    let tag17 = ""
    let tag18 = ""
    let tag19 = ""
    let tag20 = ""
    let tag21 = ""
    let tag22 = ""
    let tag23 = ""
    let tag24 = ""
    let tag25 = ""
    let tag26 = ""
    let tag27 = ""
    let tag28 = ""

                    // name
    if (!localStorage.tags) {
        tag01 = new Tag("romance")
        tags.push(tag01)
        tag02 = new Tag("fantasia")
        tags.push(tag02)
        tag03 = new Tag("pintura")
        tags.push(tag03)
        tag04 = new Tag("desenho")
        tags.push(tag04)
        tag05 = new Tag("infantil")
        tags.push(tag05)
        tag06 = new Tag("terror")
        tags.push(tag06)
        tag07 = new Tag("poesia")
        tags.push(tag07)
        tag08 = new Tag("aventura")
        tags.push(tag08)
        tag09 = new Tag("budismo")
        tags.push(tag09)
        tag10 = new Tag("cristianismo")
        tags.push(tag10)
        tag11 = new Tag("fábulas")
        tags.push(tag11)
        tag12 = new Tag("mitologias")
        tags.push(tag12)
        tag13 = new Tag("judaísmo")
        tags.push(tag13)
        tag14 = new Tag("alemão")
        tags.push(tag14)
        tag15 = new Tag("françês")
        tags.push(tag15)
        tag16 = new Tag("português")
        tags.push(tag16)
        tag17 = new Tag("psicologia")
        tags.push(tag17)
        tag18 = new Tag("educadores")
        tags.push(tag18)
        tag19 = new Tag("cartas")
        tags.push(tag19)
        tag20 = new Tag("atlas")
        tags.push(tag20)
        tag21 = new Tag("mapas")
        tags.push(tag21)
        tag22 = new Tag("património")
        tags.push(tag22)
        tag23 = new Tag("portugal")
        tags.push(tag23)
        tag24 = new Tag("humor")
        tags.push(tag24)
        tag25 = new Tag("dietas")
        tags.push(tag25)
        tag26 = new Tag("vida saudável")
        tags.push(tag26)
        tag27 = new Tag("puericultura")
        tags.push(tag27)
        tag28 = new Tag("juvenil")
        tags.push(tag28)
    }

    /* books */
    let book01 = ""
    let book02 = ""
    let book03 = ""
    let book04 = ""
    let book05 = ""
    let book06 = ""
    let book07 = ""
    let book08 = ""
    let book09 = ""
    let book10 = ""
    let book11 = ""
    let book12 = ""
    let book13 = ""
    let book14 = ""
    let book15 = ""
    let book16 = ""
    let book17 = ""
    let book18 = ""

                        // bookTitle, bookAuthors, bookPublisher, bookYear, bookPages, bookCategory, bookTags, bookCondition, donorName, donationDate, bookCover, bookDescription, libraryId
    if (!localStorage.books) {
        book01 = new Book("Cartas Reencontradas de Fernando Pessoa a Mário de Sá-Carneiro", ["Pedro Eiras"], "Assírio & Alvim", "2016", 160, 1, [19], "Fraco", "Ana", "2018-06-05", "https://img.wook.pt/images/cartas-reencontradas-de-fernando-pessoa-a-mario-de-sa-carneiro-pedro-eiras/MXwxNzQwNTExMXwxMzAzNDczNXwxNDYwOTM0MDAwMDAw/502x", "Ficção, realidade? Na abertura deste livro, Pedro Eiras explica como descobriu, no antigo Hôtel de Nice, em Paris, as cartas que Fernando Pessoa enviou a Mário de Sá-Carneiro entre Julho de 1915 e Abril de 1916. Estas cartas reencontradas deixam entrever o quotidiano de Pessoa, os seus projectos, entusiasmos e dúvidas, cem anos depois de Orpheu. Pedro Eiras nasceu em 1975. É Professor de Literatura Portuguesa na Faculdade de Letras da Universidade do Porto. Desde 2001, publicou diversas obras de ficção (Bach, A Cura, Os Três Desejos de Octávio C.), teatro (Bela Dona, Um Punhado de Terra, Uma Carta a Cassandra, Um Forte Cheiro a Maçã) e ensaio (Platão no Rolls-Royce, Os Ícones de Andrei, Tentações, Esquecer Fausto). Os seus livros têm sido publicados e as peças de teatro apresentadas em mais de dez países.", 2)
        books.push(book01)
        book02 = new Book("No Caderno da Tangerina", ["Rita Alfaiate"], "Escorpião Azul", "2017", 98, 1, [5, 28], "Aceitável", "Ana", "2018-05-07", "https://i1.wp.com/bandasdesenhadas.com/wp-content/uploads/2017/06/POSTER-tangerina.jpg?resize=714%2C1000", "Quando conheci a Tangerina, a minha nova colega de escola, fiquei feliz porque ela era diferente, e podia ser minha amiga. Mas a Tangerina era distante, havia algo que eu não compreendia. Ela tinha um caderno, um caderno estranho. Descobri que era nele que residia todo o seu mistério.", 1)
        books.push(book02)
        book03 = new Book("Southern Bastards - Vol. 3", ["Jason Aaron", "Jason Latour"], "G. Floy Studio", "2017", 160, 4, [1, 7], "Fraco", "Gonçalo", "2018-06-15", "https://imagecomics.com/uploads/releases/southernbastardsvol03_Digital-1.png", "Chegou a semana do Homecoming, o fim das férias e o maior jogo do ano para a equipa do Condado de Craw, os Runnin' Rebs. Mas o Coach Euless Boss tem muito mais inimigos do que os que vai enfrentar no campo de jogo. O xerife cujo passado negro o continua a assombrar. O misterioso caçador sempre pronto a fazer a sua justiça rural muito peculiar. O estranho rapaz em coma. A maquiavélica mulher do Mayor. Os cães selvagens. E há também Roberta Tubb, do Corpo de Fuzileiros dos Estados Unidos. A filha do homem que Euless Boss matou a sangue-frio. Todos estão a regressar a casa, como que atraídos por uma promessa de violência e vingança. Mas o Coach Boss não tem medo de sangrar. Nem de verter o sangue de outros, se isso for necessário para ganhar o jogo. Seis histórias. Seis grandessíssimos cabrões. Uma série <<frita à moda do Sul>>.", 2)
        books.push(book03)
        book04 = new Book("O Principezinho", ["Antoine de Saint-Exupéry"], "Porto: Porto Editora", "2017", 136, 1, [4, 14], "Aceitável", "Joana", "2018-06-02", "https://img.wook.pt/images/o-principezinho-antoine-de-saint-exupery/MXwxNjAzNTkyOXwxNTY2OTI5M3wxNTA1MTcwODAwMDAw/502x", "Uma história intemporal destinada a todas as crianças: as que ainda o são, as que já o foram um dia e as que nunca deixarão de o ser. Uma edição que, pela primeira vez em Portugal, fixa texto e ilustrações de acordo com a edição original de 1943.", 4)
        books.push(book04)
        book05 = new Book("Sete Minutos Depois da Meia-Noite", ["Patrick Ness"], "Editorial Presença", "2015", 216, 4, [5, 4], "Bom", "Bruno", "2018-03-05", "http://3.bp.blogspot.com/-VkTlgOzWN_I/VQS9zXXm5PI/AAAAAAAAAxo/FlT58W4EfAc/s1600/60990283_Sete_Minutos_Meia_Noite.jpg", "Passava pouco da meia-noite quando o monstro apareceu. Inspirado numa ideia original da escritora Siobhan Dowd, que morreu de cancro em 2007, Patrick Ness criou uma história de uma beleza tocante, que aborda verdades dolorosas com elegância e profundidade, sem nunca perder de vista a esperança no futuro. Fala-nos dos sentimentos de perda, medo e solidão e também da coragem e da compaixão necessárias para os ultrapassar. Fantasia e realidade misturam-se num livro de exceção, com ilustrações soberbas que complementam e expandem a beleza do texto.", 3)
        books.push(book05)
        book06 = new Book("Aquilo que os olhos vêem ou O Adamastor", ["Manuel António Pina"], "Angelus Novus", "2012", 56, 1, [1, 22, 7], "Bom", "Alexandra", "2017-06-05", "https://images.portoeditora.pt/getresourcesservlet/image?EBbDj3QnkSUjgBOkfaUbsKIiGhhTnv74wHCxfUMk1Ojv%2FP6U4Vl2IrY0I7VRGKGY&width=300", "A história é contada, em finais do primeiro quarte do séc. XVI, pelo físico e astrólogo Mestre João, que regressa, velho e doente, a Portugal, depois de muitos anos no Oriente, e que, à passagem do Cabo da Boa Esperança, recorda os acontecimentos de que fora, aí, testemunha muitos anos antes. A acção narrada por Mestre João passa-se no mar, em 1501, no interior de uma nau da frota de Pedro Álvares Cabral, que o mesmo Mestre João acompanhara na sua viagem, primeiro, ao Brasil e, depois, pela rota de Vasco da Gama à Índia. Regressando à Índia, a nau recolhera então na Angra de S. Brás, perto do Cabo da Boa Esperança, onde fazia aguada, um náufrago (Manuel) que contou uma história fantástica e terrível.", 2)
        books.push(book06)
        book07 = new Book("Odisseia de Homero", ["Frederico Lourenço"], "Claro Enigma", "2018", 688, 2, [6, 11], "Aceitável", "Alexandre", "2017-04-01", "https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=4238174&qld=90&l=430&a=-1", "A Odisseia não é apenas um dos grandes épicos da literatura grega; é também um dos pilares do cânone ocidental, um poema de rara e extraordinária beleza - e o livro que mais influência exerceu, ao longo dos tempos, no imaginário ocidental.", 3)
        books.push(book07)
        book08 = new Book("Livro do Desassossego", ["Fernando Pessoa"], "Assírio & Alvim", "2017", 480, 2, [15], "Bom", "Gustavo", "2017-02-07", "https://img.wook.pt/images/livro-do-desassossego-fernando-pessoa/MXwxMTIzNzI5MXwxNjEyODE1OHwxNTA4ODg2MDAwMDAw/502x", "O que temos aqui não é um livro mas a sua subversão e negação, o livro em potência, o livro em plena ruína, o livro-sonho, o livro-desespero, o anti-livro, além de qualquer literatura. O que temos nestas páginas é o génio de Pessoa no seu auge.", 4)
        books.push(book08)
        book09 = new Book("Os Lusíadas", ["Luís de Camões"], "Porto Editora", "2017", 288, 1, [6, 15, 22], "Bom", "Diogo", "2015-12-07", "https://img.wook.pt/images/os-lusiadas-luis-de-camoes/MXwyMTQ1MTU5fDE2NzcxMzYwfDE1MTEzOTUyMDAwMDA=/502x", "A ação central da obra é a viagem de Vasco da Gama para a Índia. Dela se serve o poeta para nos oferecer a visão épica de toda a História de Portugal até à sua época, ora sendo ele o narrador, ora transferindo essa tarefa para figuras da viagem. Para outras figuras - as míticas - transfere os discursos que projetam a ação no futuro em forma profética. O Poema interpreta os anseios dos humanistas numa linha de continuidade das epopeias clássicas, cantando o triunfo do Homem contra as forças da Natureza, e do Homem que <<deu novos mundos ao Mundo>>, iniciando assim um novo período da História.", 2)
        books.push(book09)
        book10 = new Book("Leite e Mel", ["Rupi Kaur"], "Lua de Papel", "2017", 208, 6, [6, 2], "Fraco", "Gabriela", "2016-02-07", "https://img.wook.pt/images/leite-e-mel-rupi-kaur/MXwxOTE3MzM5MHwxNDk1NzkyOHwxNTIwNDY3MjAwMDAw/502x", "Leite e Mel é um conjunto de poesias sobre o amor, a perda, o abuso infantil e, finalmente, a cura. Transporta os leitores para momentos difíceis da vida, mas leva-os a descobrir neles a doçura e a fragilidade da vida, porque a doçura está em todo o lado, se estivermos abertos a recebê-la. Leite e Mel é uma história de sobrevivência através da poesia. Para a autora, é o sangue, suor e lágrimas dos seus vinte e um anos.", 1)
        books.push(book10)
        book11 = new Book("Uma Pergunta Por Dia 365 Perguntas. 3 Anos. 2190 Respostas.", ["Potter Style"], "Editorial Presença", "2017", 372, 6, [1, 16, 15], "Aceitável", "Maria", "2016-12-07", "https://img.bertrand.pt/images/uma-pergunta-por-dia-potter-style/NDV8MjEwMjQ0MTN8MTY4ODU3ODZ8MTUwOTY2NzIwMDAwMA==/250x", "Um diário inovador concebido para que numa relação a dois se possa criar, de modo simples e acessível, uma espécie de cápsula do tempo correspondente a um período de três anos. Apresenta uma pergunta para cada dia do ano, com espaço suficiente para duas pessoas escreverem as suas respostas. Contém um número muito diversificado de perguntas, algumas das quais visam a relação entre as duas pessoas, e outras questionam sobre o que cada uma pensa da outra. Ao longo de três anos, ambos podem ver como as suas respostas se comparam, contrastam e mudam - ao mesmo tempo que obtêm uma lembrança duradoura da sua relação!", 4)
        books.push(book11)
        book12 = new Book("O Sol Também é Uma Estrela", ["Nicola Yoon"], "Editorial Presença", "2017", 352, 4, [1, 7, 4], "Fraco", "Leonor", "2018-02-17", "https://3.bp.blogspot.com/-VQoPa8wYjP4/WOGaaa0lT7I/AAAAAAAAUis/r2RFUCyuYIk1QER1oEQSJ0JrDisaNtBmwCPcB/s1600/131283645SZ.jpg", "A história de uma rapariga, um rapaz e o universo. Natasha: Sou uma rapariga que acredita na ciência e nos factos. Não acredito no destino. Ou nos sonhos que nunca se concretizam. Não sou de todo aquele tipo de rapariga que encontra um rapaz simpático numa rua nova-iorquina cheia de gente e se apaixona por ele. Não quando a minha família está a doze horas de ser deportada para a Jamaica. Apaixonar-me por ele não será a minha história. Daniel: Sou o bom filho, o bom estudante, correspondendo sempre às elevadas expectativas dos meus pais. Nunca fui o poeta. Ou o sonhador. Mas quando a vejo, esqueço tudo isso. Algo em Natasha faz-me pensar que o destino nos reserva, a ambos, alguma coisa muito mais extraordinária. O universo: Cada momento das nossas vidas conduziu-nos a este momento único. Há um milhão de futuros perante nós. Qual deles se tornará realidade?", 3)
        books.push(book12)
        book13 = new Book("O Complexo de Portnoy", ["Philip Roth"], "Dom Quixote", "2010", 272, 4, [1, 5], "Bom", "João", "2014-02-17", "https://http2.mlstatic.com/livro-complexo-de-portnoy-philip-roth-D_NQ_NP_14587-MLB222746262_8065-F.jpg", "Esta é a famosa confissão de Alexander Portnoy, impelido ao longo da vida por uma sexualidade insaciável, mas ao mesmo tempo refreado pela mão de ferro de uma infância inesquecível.", 2)
        books.push(book13)
        book14 = new Book("O Livro de Francisco Rodrigues. O Primeiro Atlas do Mundo Moderno", ["Francisco Rodrigues", "José Manuel Garcia"], "Editora da Universidade do Porto", "2008", 380, 7, [19, 20], "Aceitável", "Ricardo", "2015-02-17", "https://img.wook.pt/images/o-livro-de-francisco-rodrigues-francisco-rodrigues/MXwyMDM3NjN8Mjk3OTE2fDEzODM1MjMyMDAwMDA=/502x", "Trata-se do primeiro Atlas da História Moderna relativo ao sudeste asiático, datado de 1511-1515, da autoria do piloto e cartógrafo Francisco Rodrigues, conhecido como O Livro de Francisco Rodrigues. A obra está composta por uma introdução ao trabalho de Francisco Rodrigues, enquadrando-o do ponto de vista histórico e explicando o significado das imagens e a localização actual das ilhas do sudeste asiático. Segue-se o fac-simile integral da obra conservada na Biblioteca da Assembleia Nacional Francesa.", 3)
        books.push(book14)
        book15 = new Book("Praias Escondidas - Lisboa", ["Robert Butler", "Andy Mumford"], "Arte Plural Edições", "2018", 192, 7, [22, 21], "Bom", "João", "2018-05-17", "https://img.wook.pt/images/praias-escondidas---lisboa-robert-butler/MXwyMTUyMTI5N3wxNzM2ODUyOHwxNTI1NjQ3NjAwMDAw/502x", "Lisboa é uma das mais fascinantes e carismáticas capitais europeias, mas para lá das suas ruas sinuosas e dos seus esplêndidos miradouros, a apenas uma hora de carro em direção a oeste ou a sul, encontram-se das mais deslumbrantes praias da Europa. Mas atenção: apesar de esta região ter sido abençoada com belíssimos areais, perfeitos para banhos de sol, ir à praia pode ser bem mais do que isso, e em Praias Escondidas vai descobrir sugestões para as explorar de uma forma diferente. De passeios de caiaque a caminhadas com o seu cão e a snorkeling em águas cristalinas, encontrará aqui indicações sobre praias para todos os gostos, sejam areais <<selvagens>>, enseadas isoladas ou baías recônditas. E se o que gosta mesmo é de passar horas ao sol ou a dar belos mergulhos… bom, este livro também é para si! Com informação detalhada sobre 32 maravilhosas praias a oeste e a sul de Lisboa, listas de locais ideais para uma vasta gama de atividades e fantásticas fotografias, Praias Escondidas é o seu guia essencial para ficar a conhecer a fundo o nosso belíssimo litoral.", 1)
        books.push(book15)
        book16 = new Book("Lugares Abandonados de Portugal", ["Vanessa Fidalgo"], "A Esfera dos Livros", "2017", 240, 7, [21, 22], "Bom", "Joana", "2017-02-17", "https://img.wook.pt/images/lugares-abandonados-de-portugal-vanessa-fidalgo/MXwxOTc3NDM4N3wxNTYxMDUzNnwxNTAyNDA2MDAwMDAw/502x", "É impossível passar pela Quinta do Comandante, em Oliveira de Azeméis, e ficar indiferente ao edifício em avançado estado de degradação que ali se ergue. Atrás daquelas paredes em ruínas tanto se escondem histórias de amor como episódios trágicos com um final surpreendente. Numa certa noite, o comandante Batista de Carvalho juntou um grupo de amigos e familiares para uma festa. A meio do jantar levantou-se, dirigiu-se ao quarto, pegou num revólver e suicidou-se. Não é caso único nas tragédias que assolam os lugares abandonados de Portugal. A 10 de Julho de 1957, a GNR avançou sobre a população do Colmeal, em Figueira de Castelo Rodrigo. Houve mortos, feridos e no fim da luta,  ninguém ficou na aldeia para contar a história.", 4)
        books.push(book16)
        book17 = new Book("Parentalidade Nórdica", ["Sofie Münster"], "Editorial Presença", "2018", 192, 8, [26], "Fraco", "Jorge", "2018-02-17", "http://imagens.presenca.pt//products/Liv30990114_f.jpg", "Todos desejamos o melhor para os nossos filhos. Sonhamos com o seu sucesso, tanto na escola como na sua vida futura. No entanto, quando eles enfrentam dificuldades, é frequente não sabermos o que fazer para os ajudar. Desejamos que os nossos filhos ousem perseguir um objetivo, que se esforcem e se tornem melhores, mas o que fazer em situações como as seguintes? - Eles sentem-se inseguros ou contêm-se por medo de falharem. - Não conseguem concentrar-se e o telemóvel ou o computador são tentações irresistíveis. - Desistem imediatamente de uma tarefa se ela lhes parece aborrecida ou exige um pouco mais deles. - Desinteressam-se ou deixam-se levar pela desilusão quando não conseguem fazer algo à primeira tentativa.", 3)
        books.push(book17)
        book18 = new Book("À Descoberta do Seu Bebé", ["Margarida Lobo Antunes", "Andreia Vidal"], "Manuscrito Editora", "2018", 176, 8, [26], "Fraco", "Hugo", "2018-02-17", "https://img.wook.pt/images/a-descoberta-do-seu-bebe-margarida-lobo-antunes/MXwyMTMyNTU4OXwxNzIxMzQ3NHwxNTE1NDU2MDAwMDAw/502x", "Com a chegada de um bebé, os pais preocupam-se com a sua saúde, alimentação, numa espécie de corrida para alcançar o troféu de melhores pais! E muitas vezes, entre o cansaço do dia a dia, esquecem-se de que, sendo aquelas questões essenciais, há uma que fica para segundo plano e que é, sem dúvida, a mais importante de todas: tempo para estar com o seu bebé, para o gozar, para o descobrir, para brincar com ele.", 4)
        books.push(book18)
    }

    /* comments */
    let comment01 = ""
    let comment02 = ""
    let comment03 = ""
    let comment04 = ""
    let comment05 = ""
    let comment06 = ""
    let comment07 = ""
    let comment08 = ""
    let comment09 = ""
    let comment11 = ""
    let comment12 = ""

                        // userId, bookId, comment
    if (!localStorage.comments) {
        comment01 = new Review(3, 1, "É um livro bom! Recomendo.")
        comments.push(comment01)
        comment02 = new Review(2, 1, "Não presta!")
        comments.push(comment02)
        comment03 = new Review(3, 1, "Boa leitura e ótima história!")
        comments.push(comment03)
        comment04 = new Review(4, 2, "ESPETÁÁÁCULO!!!!!!")
        comments.push(comment04)
        comment05 = new Review(5, 2, "Leitura fantástica para crianças!")
        comments.push(comment05)
        comment06 = new Review(6, 5, "Livro fantástico, lê-se muito bem!")
        comments.push(comment06)
        comment07 = new Review(7, 3, "Não gostei")
        comments.push(comment07)
        comment08 = new Review(8, 2, "Não recomendo")
        comments.push(comment08)
        comment09 = new Review(3, 9, "Adoro!!")
        comments.push(comment09)
        comment10 = new Review(5, 3, "Não leiam!")
        comments.push(comment10)
        comment11 = new Review(6, 2, "Os meus filhos adoraram, embora seja um pouco sombrio!")
        comments.push(comment11)
        comment12 = new Review(7, 2, "A escritora tem uma mente meia atrofiada para escrever um livro destes!")
        comments.push(comment12)
    }

    /* ratings */
    let ratings01 = ""
    let ratings02 = ""
    let ratings03 = ""
    let ratings04 = ""
    let ratings05 = ""
    let ratings06 = ""
    let ratings07 = ""
    let ratings08 = ""
    let ratings09 = ""
    let ratings10 = ""
    let ratings11 = ""
    let ratings12 = ""
    let ratings13 = ""
    let ratings14 = ""
    let ratings15 = ""
    let ratings16 = ""
    let ratings17 = ""
    let ratings18 = ""

                        // bookId, usersId, bookRatings
    if (!localStorage.ratings) {
        ratings01 = new Rating(1, [3, 4], [0, 4, 5])
        ratings.push(ratings01)
        ratings02 = new Rating(2, [3], [0, 5])
        ratings.push(ratings02)
        ratings03 = new Rating(3, [3], [0, 4])
        ratings.push(ratings03)
        ratings04 = new Rating(4, [4], [0, 3, 4])
        ratings.push(ratings04)
        ratings05 = new Rating(5, [], [0])
        ratings.push(ratings05)
        ratings06 = new Rating(6, [], [0])
        ratings.push(ratings06)
        ratings07 = new Rating(7, [], [0])
        ratings.push(ratings07)
        ratings08 = new Rating(8, [], [0])
        ratings.push(ratings08)
        ratings09 = new Rating(9, [], [0])
        ratings.push(ratings09)
        ratings10 = new Rating(10, [], [0])
        ratings.push(ratings10)
        ratings11 = new Rating(11, [], [0])
        ratings.push(ratings11)
        ratings12 = new Rating(12, [], [0])
        ratings.push(ratings12)
        ratings13 = new Rating(13, [], [0])
        ratings.push(ratings13)
        ratings14 = new Rating(14, [], [0])
        ratings.push(ratings14)
        ratings15 = new Rating(15, [], [0])
        ratings.push(ratings15)
        ratings16 = new Rating(16, [], [0])
        ratings.push(ratings16)
        ratings17 = new Rating(17, [], [0])
        ratings.push(ratings17)
        ratings18 = new Rating(18, [], [0])
        ratings.push(ratings18)
    }

    /* requests */    
    let request01 = ""
    let request02 = ""
    let request03 = ""
    let request04 = ""
    let request05 = ""
    let request06 = ""
    let request07 = ""

                            // userId, bookId, requestDate, deliveryDate
    if (!localStorage.requests) {
        request01 = new Request(4 , 4, "2018-03-20" , "2018-06-15")
        requests.push(request01)
        request02 = new Request(3 , 5, "2018-05-04" , "2018-06-20")
        requests.push(request02)
        request03 = new Request(3 , 2, "2018-05-11" , "2018-07-25")
        requests.push(request03)
        request04 = new Request(3 , 1, "2018-05-11" , "2018-06-20")
        requests.push(request04)
        request05 = new Request(3 , 5, "2018-05-04" , "2018-06-20")
        requests.push(request05)
        request06= new Request(4 , 2, "2018-05-11" , "")
        requests.push(request06)
        request07 = new Request(3 , 8, "2018-05-11" , "")
        requests.push(request07)
    }  

    /* wishlists */
    let wishlist01 = ""
    let wishlist02 = ""
                            // userId, categoryList, tagList, bookList, libraryList, notificationsCategories, notificationsTags, notificationsBooks, notificationsLibraries
    if (!localStorage.wishlists) {
        wishlist01 = new Wishlist(3, [2, 3], [1, 3, 8], [1, 4, 6], [1, 2], [1], [2, 3], [1, 2], [1])
        wishlists.push(wishlist01)
        wishlist02 = new Wishlist(9, [4], [2, 3], [1], [2, 3], [2], [1, 3], [2, 5], [2])
        wishlists.push(wishlist02)
    }

    /* libraries */
    let library01 = ""
    let library02 = ""
    let library03 = ""
    let library04 = ""

                            // city, parish, address, latitude, longitude, bookCapacity
    if (!localStorage.libraries) {
        library01 = new Library(1316, 131604, "R. Dr. Américo Silva, 4480-186 Azurara", 41.346519, -8.736730, 20)
        libraries.push(library01)
        library02 = new Library(1316, 131628, "Ac. Particular, 4480-754 Vila do Conde", 41.351315, -8.747595, 50)
        libraries.push(library02)
        library03 = new Library(1313,131313, "Viela dos Lopes, 4490-039 Póvoa de Varzim", 41.405002, -8.777848, 10)
        libraries.push(library03)
        library04 = new Library(1308, 130812, "Av. Serpa Pinto, 4450-159 Matosinhos", 41.182515, -8.693039, 70)
        libraries.push(library04)
    }
//


// --------------------------------------
// LOCAL STORAGE

    /* users */
    function loadUsers() {
        let tempArray = []

        if (localStorage.users) {
            tempArray = JSON.parse(localStorage.getItem("users"))
            
            for (let i = 0; i < tempArray.length; i++) {
                let newUser = new User(tempArray[i]._userName,
                                        tempArray[i]._userEmail,
                                        tempArray[i]._userPassword,
                                        tempArray[i]._userPhoto,
                                        tempArray[i]._userPermissions,
                                        tempArray[i]._userStatus,
                                        tempArray[i]._fineValue,
                                        tempArray[i]._favourites)
                users.push(newUser)
            }
        }
    }

    /* categories */
    function loadCategories() {
        let tempArray = []

        if (localStorage.categories) {
            tempArray = JSON.parse(localStorage.getItem("categories"))

            for (let i = 0; i < tempArray.length; i++) {
                let newCategory = new Category(tempArray[i]._name)
                categories.push(newCategory)
            }
        }
    }

    /* tags */
    function loadTags() {
        let tempArray = []

        if (localStorage.tags) {
            tempArray = JSON.parse(localStorage.getItem("tags"))

            for (let i = 0; i < tempArray.length; i++) {
                let newTag = new Tag(tempArray[i]._name)
                tags.push(newTag)
            }
        }
    }

    /* books */
    function loadBooks() {
        let tempArray = []

        if (localStorage.books) {
            tempArray = JSON.parse(localStorage.getItem("books"))
            
            for (let i = 0; i < tempArray.length; i++) {
                let newBook = new Book(tempArray[i]._bookTitle,
                                        tempArray[i]._bookAuthors,
                                        tempArray[i]._bookPublisher,
                                        tempArray[i]._bookYear,
                                        tempArray[i]._bookPages,
                                        tempArray[i]._bookCategory,
                                        tempArray[i]._bookTags,
                                        tempArray[i]._bookCondition,
                                        tempArray[i]._donorName,
                                        tempArray[i]._donationDate,
                                        tempArray[i]._bookCover,
                                        tempArray[i]._bookDescription,
                                        tempArray[i]._libraryId)
                books.push(newBook)
            }
        }
    }

    /* comments */
    function loadComments() {
        let tempArray = []

        if (localStorage.comments) {
            tempArray = JSON.parse(localStorage.getItem("comments"))

            for (let i = 0; i < tempArray.length; i++) {
                let newComment = new Review(tempArray[i]._userId,
                                            tempArray[i]._bookId,
                                            tempArray[i]._comment)
                comments.push(newComment)
            }
        }
    }

    /* ratings */
    function loadRatings() {
        let tempArray = []

        if (localStorage.ratings) {
            tempArray = JSON.parse(localStorage.getItem("ratings"))

            for (let i = 0; i < tempArray.length; i++) {
                let newRating = new Rating(tempArray[i]._bookId,
                                            tempArray[i]._usersId,
                                            tempArray[i]._bookRatings)
                ratings.push(newRating)
            }
        }
    }

    /* requests */
    function loadRequests() {
        let tempArray = []

        if (localStorage.requests) {
            tempArray = JSON.parse(localStorage.getItem("requests"))

            for (let i = 0; i < tempArray.length; i++) {
                let newRequest = new Request(tempArray[i]._userId,
                                                tempArray[i]._bookId,
                                                tempArray[i]._requestDate,
                                                tempArray[i]._deliveryDate)
                requests.push(newRequest)
            }
        }
    }

    /* wishlists */
    function loadWishlists() {
        let tempArray = []

        if (localStorage.wishlists) {
            tempArray = JSON.parse(localStorage.getItem("wishlists"))
            
            for (let i = 0; i < tempArray.length; i++) {
                let newWishlist = new Wishlist(tempArray[i]._userId,
                                                tempArray[i]._categoryList,
                                                tempArray[i]._tagList,
                                                tempArray[i]._bookList,
                                                tempArray[i]._libraryList,
                                                tempArray[i]._notificationsCategories,
                                                tempArray[i]._notificationsTags,
                                                tempArray[i]._notificationsBooks,
                                                tempArray[i]._notificationsLibraries)
                wishlists.push(newWishlist)
            }
        }
    }

    /* libraries */
    function loadLibraries() {
        let tempArray = []

        if (localStorage.libraries) {
            tempArray = JSON.parse(localStorage.getItem("libraries"))

            for (let i = 0; i < tempArray.length; i++) {
                let newLibrary = new Library(tempArray[i]._city,
                                                tempArray[i]._parish,
                                                tempArray[i]._address,
                                                tempArray[i]._latitude,
                                                tempArray[i]._longitude,
                                                tempArray[i]._bookCapacity)
                libraries.push(newLibrary)
            }
        }
    }

    /* config */
    function loadConfig() {
        if (localStorage.config) {
            config = JSON.parse(localStorage.getItem("config"))
        }
    }

    /* populate */ 
    function populateStorage() {
        localStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem("categories", JSON.stringify(categories))
        localStorage.setItem("tags", JSON.stringify(tags))
        localStorage.setItem("books", JSON.stringify(books))
        localStorage.setItem("comments", JSON.stringify(comments))
        localStorage.setItem("ratings", JSON.stringify(ratings))
        localStorage.setItem("requests", JSON.stringify(requests))
        localStorage.setItem("wishlists", JSON.stringify(wishlists))
        localStorage.setItem("libraries", JSON.stringify(libraries))
        localStorage.setItem("config", JSON.stringify(config))
    }
//


// --------------------------------------
// SAVE LOCAL STORAGE

    /* users */
    function saveUser(newUser) {
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
    }

    /* categories */
    function saveCategory(newCategory) {
        categories.push(newCategory)
        localStorage.setItem("categories", JSON.stringify(categories))
    }

    /* tags */
    function saveTag(newTag) {
        tags.push(newTag)       
        localStorage.setItem("tags", JSON.stringify(tags))
    }

    /* books */
    function saveBook(newBook){
        books.push(newBook)
        localStorage.setItem("books", JSON.stringify(books))
    }

    /* comments */
    function saveComment(newComment) {
        comments.push(newComment)
        localStorage.setItem("comments", JSON.stringify(comments))
    }

    /* ratings */
    function saveRating(newRating) {
        ratings.push(newRating)
        localStorage.setItem("ratings", JSON.stringify(ratings))
    }

    /* requests */
    function saveRequest(newRequest) {
        requests.push(newRequest)       
        localStorage.setItem("requests", JSON.stringify(requests))
    }

    /* wishlists */
    function saveWishlist(newWishlist){
        wishlists.push(newWishlist)
        localStorage.setItem("wishlists", JSON.stringify(wishlists))
    }

    /* libraries */
    function saveLibrary(newLibrary) {
        libraries.push(newLibrary)
        localStorage.setItem("libraries", JSON.stringify(libraries))
    }

    /* config */
    function saveConfig(newConfig) {
        localStorage.setItem("config", JSON.stringify(newConfig))
    }
//


// --------------------------------------
// NAV BAR

    /* options */
    let optHome = document.getElementById("optHome")
    let optSearch = document.getElementById("optSearch")
    let optCatalog = document.getElementById("optCatalog")
    let optMap = document.getElementById("optMap")
    let optUser = document.getElementById("optUser")
    let optLogin = document.getElementById("optLogin")
    let optRegister = document.getElementById("optRegister")
    let optProfile = document.getElementById("optProfile")
    let optPreferences = document.getElementById("optPreferences")
    let optRequest = document.getElementById("optRequests")
    let optLogout = document.getElementById("optLogout")
    let optAlerts = document.getElementById("optAlerts")
    let optDonate = document.getElementById("optDonate")
    let optConfig = document.getElementById("optConfig")
    let optConfigBooks = document.getElementById("optConfigBooks")
    let optConfigGeneral = document.getElementById("optConfigGeneral")
    let optConfigUsers = document.getElementById("optConfigUsers")
    let optConfigLibraries = document.getElementById("optConfigLibraries")
    let optStatistics = document.getElementById("optStatistics")

    /* initial load */
    optHome.style.display = "none"
    optSearch.style.display = "none"
    optCatalog.style.display = "none"
    optMap.style.display = "none"
    optUser.style.display = "none"
    optAlerts.style.display = "none"
    optConfig.style.display = "none"
    optDonate.style.display = "none"

    /* items visible */
    function navbarVisible() {
        if (userCurrent == -1) {
            optHome.style.display = "none"
            optSearch.style.display = "none"
            optCatalog.style.display = "none"
            optMap.style.display = "none"
            optUser.style.display = "block"
            optLogout.style.display = "none"
            optProfile.style.display = "none"
            optPreferences.style.display = "none"
            optHistory.style.display = "none"
            optAlerts.style.display = "none"
            optConfig.style.display = "none"
            optDonate.style.display = "none"
            userIconLogIn.src = "images/profile_s.png"
        }
        else {
            optHome.style.display = "block"
            optSearch.style.display = "block"
            optCatalog.style.display = "block"
            optMap.style.display = "block"
            optUser.style.display = "block"
            optLogin.style.display = "none"
            optRegister.style.display = "none"
            optProfile.style.display = "none"
            optPreferences.style.display = "none"
            optHistory.style.display = "none"
            optConfig.style.display = "none"
            optAlerts.style.display = "none"
            optDonate.style.display = "none"
            optLogout.style.display = "block"

            for (let i = 0; i < users.length; i++) {
                if (users[i].id == userCurrent && users[i].userPhoto != "") {
                    userIconLogIn.src = users[i].userPhoto
                }
            }

            if (userPermissions == 0) {
                optConfig.style.display = "block"
                optConfigBooks.style.display = "none"
                optConfigGeneral.style.display = "block"
                optConfigUsers.style.display = "block"
                optConfigLibraries.style.display = "block"
                optStatistics.style.display = "block"
            }
            else if (userPermissions == 1) {
                optDonate.style.display = "block"
                optConfig.style.display = "block"
                optConfigBooks.style.display = "block"
                optConfigGeneral.style.display = "none"
                optConfigUsers.style.display = "none"
                optConfigLibraries.style.display = "none"
                optStatistics.style.display = "none"
            }
            else if (userPermissions == 2) {
                optProfile.style.display = "block"
                optPreferences.style.display = "block"
                optHistory.style.display = "block"
                optAlerts.style.display = "block"
            }
        }
    }

    /* log out */  
    optLogout.addEventListener("click", function () {
        sessionStorage.setItem("userCurrent", -1)
        sessionStorage.setItem("userPermissions", -1)
        homePage()
    })

    /* return to homepage */
    function homePage() {
        // check which html page is open
        let pagePath = (window.location.pathname).substring((window.location.pathname).lastIndexOf('/') + 1)

        if (pagePath != "index.html") {
            window.location.href="../index.html"
        }
        else {
            window.location.href="index.html"
        }
    }
//


// --------------------------------------
// NOTIFICATIONS

    /* panel */
    let accordion = document.getElementsByClassName("accordion")
    let panelBooks = document.getElementById("panelBooks")
    let panelTags = document.getElementById("panelTags")
    let panelLibraries = document.getElementById("panelLibraries")

    /* badges */
    let badgeCategories = document.getElementById("badgeCategories")
    let badgeTags = document.getElementById("badgeTags")
    let badgeBooks = document.getElementById("badgeBooks")
    let badgeLibraries = document.getElementById("badgeLibraries")

    /* wishlist values */
    let wishlistCategories
    let wishlistTags
    let wishlistBooks
    let wishlistLibraries

    /* items visible */
    function viewNotificationPanel() {
        //wishlistCategories = Wishlist.getBooksByCategoryUserId(userCurrent)
        //wishlistTags = Wishlist.getBooksByTagUserId(userCurrent)
        //wishlistBooks = Wishlist.getBooksByUserId(userCurrent)
        //wishlistLibraries = Wishlist.getBooksByLibraryUserId(userCurrent)

        /* accordion notifications */
        for (let i = 0; i < accordion.length; i++) {
            accordion[i].addEventListener("click", function(event) {
                this.classList.toggle("active")

                let panel = this.nextElementSibling

                if (panel.style.display === "block") {
                    panel.style.display = "none"
                }
                else {
                    panel.style.display = "block"
                }

                event.stopPropagation()
            })
        }
/*
        for (let i = 0; i < wishlists.length; i++) {
            if (wishlists[i].userId == userCurrent) {
                addNotificationsCategories()
                addNotificationsTags()
                addNotificationsBooks()
                addNotificationsLibraries()
            }
        }*/
    }

    /* fill books notifications by categories */
    function addNotificationsCategories() {
        let strCategories = ""

        for (let i = 0; i < wishlistCategories.length; i++) {
            let tempCategories = Book.getBookCategoryById(wishlistCategories[i])

            strCategories += `<tr>
                                <td>
                                    <a href=${bookSelect()}><img id='${wishlistCategories[i]}' class='cover-small book-page' src='${Book.getBookCoverById(wishlistCategories[i])}'></a>
                                </td>
                                <td>
                                    <a href=${bookSelect()} id='${wishlistCategories[i]}' class='book-page'>
                                        <h6>Novo livro adicionado</strong></h6>
                                        <p>${Book.getBookTitleById(wishlistCategories[i])}</p>
                                        <p><strong>Categoria: ${convertFirstToUpperCase(Category.getCategoryById(tempCategories))}</strong></p>
                                    </a>
                                </td>
                                <td><a id='${wishlistCategories[i]}' class='remove'><i class='fa fa-times-circle'></i></a></td>
                            </tr>`
        }

        panelCategories.innerHTML = strCategories
        badgeCategories.innerHTML = wishlistCategories.length

        /* remove notification by category */
        let removeNotification = document.getElementsByClassName("remove")

        for (let i = 0; i < removeNotification.length; i++) {
            removeNotification[i].addEventListener("click", function() {
                let notificationId = removeNotification[i].getAttribute("id")

                Wishlist.removeWishlistCategoriesById(notificationId)
                Wishlist.editWishlistCategoriesByUserId(userCurrent)

                localStorage.setItem("wishlists", JSON.stringify(wishlists))
                location.reload()
            })
        }
    }

    /* fill books notifications by tags */
    function addNotificationsTags() {
        let strTags = ""

        for (let i = 0; i < wishlistTags.length; i++) {
            let tempTags = Book.getBookTagsById(wishlistTags[i])

            strTags += `<tr>
                            <td>
                                <a href=${bookSelect()}><img id='${wishlistTags[i]}' class='cover-small book-page' src='${Book.getBookCoverById(tempTags[i])}'></a>
                            </td>
                            <td>
                                <a href=${bookSelect()} id='${wishlistTags[i]}' class='book-page'>
                                    <h6>Novo livro adicionado</strong></h6>
                                    <p>${Book.getBookTitleById(wishlistTags[i])}</p>
                                    <p><strong>Tags: ${Tag.getTagById(tempTags)}</strong></p>
                                </a>
                            </td>
                            <td><a id='${wishlistTags[i]}' class='remove'><i class='fa fa-times-circle'></i></a></td>
                        </tr>`
        }

        panelTags.innerHTML = strTags
        badgeTags.innerHTML = wishlistTags.length

        /* remove notification by category */
        let removeNotification = document.getElementsByClassName("remove")

        for (let i = 0; i < removeNotification.length; i++) {
            removeNotification[i].addEventListener("click", function() {
                let notificationId = removeNotification[i].getAttribute("id")

                Wishlist.removeWishlistTagsById(notificationId)
                Wishlist.editWishlistTagsByUserId(userCurrent)

                localStorage.setItem("wishlists", JSON.stringify(wishlists))
                location.reload()
            })
        }
    }

    /* fill books notifications */
    function addNotificationsBooks() {
        let strBooks = ""

        for (let i = 0; i < wishlistBooks.length; i++) {
            strBooks += `<tr>
                            <td>
                                <a href=${bookSelect()}><img id='${wishlistBooks[i]}' class='cover-small book-page' src='${Book.getBookCoverById(wishlistBooks[i])}'></a>
                            </td>
                            <td>
                                <a href=${bookSelect()} id='${wishlistBooks[i]}' class='book-page'>
                                    <h6>Novo livro adicionado</strong></h6>
                                    <p>${Book.getBookTitleById(wishlistBooks[i])}</p>
                                </a>Tags
                            </td>
                            <td><a id='${wishlistBooks[i]}' class='remove'><i class='fa fa-times-circle'></i></a></td>
                        </tr>`
        }

        panelBooks.innerHTML = strBooks
        badgeBooks.innerHTML = wishlistBooks.length

        /* remove notification by category */
        let removeNotification = document.getElementsByClassName("remove")

        for (let i = 0; i < removeNotification.length; i++) {
            removeNotification[i].addEventListener("click", function() {
                let notificationId = removeNotification[i].getAttribute("id")

                Wishlist.removeWishlistBooksById(notificationId)
                Wishlist.editWishlistBooksByUserId(userCurrent)

                localStorage.setItem("wishlists", JSON.stringify(wishlists))
                location.reload()
            })
        }
    }

    /* fill books notifications by libraries */
    function addNotificationsLibraries() {
        let strLibraries = ""

        for (let i = 0; i < wishlistLibraries.length; i++) {
            let tempLibraries = Book.getBookLibraryById(wishlistLibraries[i])
            
            strLibraries += `<tr>
                                <td>
                                    <a href=${bookSelect()}><img id='${wishlistLibraries[i]}' class='cover-small book-page' src='${Book.getBookCoverById(wishlistLibraries[i])}'></a>
                                </td>
                                <td>
                                    <a href=${bookSelect()} id='${wishlistLibraries[i]}' class='book-page'>
                                        <h6>Novo livro adicionado</strong></h6>
                                        <p>${Book.getBookTitleById(wishlistLibraries[i])}</p>
                                        <p><strong>Biblioteca: ${Library.getCityById((Library.getLibraryCityById(tempLibraries)))}, ${Library.getParishById((Library.getLibraryParishById(tempLibraries)))}</strong></p>
                                    </a>
                                </td>
                                <td><a id='${wishlistLibraries[i]}' class='remove'><i class='fa fa-times-circle'></i></a></td>
                            </tr>`
        }

        panelLibraries.innerHTML = strLibraries
        badgeLibraries.innerHTML = wishlistLibraries.length

        /* remove notification by category */
        let removeNotification = document.getElementsByClassName("remove")

        for (let i = 0; i < removeNotification.length; i++) {
            removeNotification[i].addEventListener("click", function() {
                let notificationId = removeNotification[i].getAttribute("id")

                Wishlist.removeWishlistLibrariesById(notificationId)
                Wishlist.editWishlistLibrariesByUserId(userCurrent)

                localStorage.setItem("wishlists", JSON.stringify(wishlists))
                location.reload()
            })
        }
    }

    /* go to selected book */
    function bookSelect() {
        // checks which html page is open
        let pagePath = (window.location.pathname).substring((window.location.pathname).lastIndexOf('/') + 1)
        let tempPath = ""

        if (pagePath != "index.html") {
            tempPath = "bookSelect.html"
        }
        else {
            tempPath = "html/bookSelect.html"
        }

        return tempPath
    }
//


// --------------------------------------
// MODAL

    /* categories */
    function addCategoriesToModal() {
        let strHtml = "<option value=''>...</option>"    

        for (let i = 0; i < categories.length; i++) {
            strHtml += `<option value='${categories[i].id}'>${convertFirstToUpperCase(categories[i].name)}</option>`             
        }
        return strHtml
    }

    /* tags */
    function addTagsToModal() {
        let strHtml = ""    

        for (let i = 0; i < tags.length; i++) {
            strHtml += `<option value='${tags[i].id}'>${convertFirstToUpperCase(tags[i].name)}</option>`
        }
        return strHtml
    }

    /* cities */
    function addCitiesToModal() {
        let strHtml = "<option value=''>...</option>"
        let tempCity = []

        for (let i = 0; i < libraries.length; i++) {
            tempCity.push(libraries[i].city)
        }

        tempCity.sort()

        let newArray = [...new Set(tempCity)]

        for (let i = 0; i < newArray.length; i++) {
            strHtml += `<option value='${newArray[i]}'>${Library.getCityById(newArray[i])}</option>`
        }
        return strHtml
    }

    /* parishes */
    function addParishToModal(inputCity) {
        let strHtml = "<option value=''>...</option>"    

        for (let i = 0; i < libraries.length; i++) {
            if (libraries[i].city == inputCity) {
                strHtml += `<option value='${libraries[i].parish}'>${Library.getParishById(libraries[i].parish)}</option>`
            }
        }
        return strHtml
    }
//


// --------------------------------------
// DONATE BOOK

    /* inputs */
    let modalDonateTitle = document.getElementById("modalDonateTitle")
    let modalDonateAuthors = document.getElementById("modalDonateAuthors")
    let modalDonatePublisher = document.getElementById("modalDonatePublisher")
    let modalDonateYear = document.getElementById("modalDonateYear")
    let modalDonatePages = document.getElementById("modalDonatePages")
    let modalDonateCity = document.getElementById("modalDonateCity")
    let modalDonateParish = document.getElementById("modalDonateParish")
    let modalDonateCategories = document.getElementById("modalDonateCategories")
    let modalDonateTags = document.getElementById("modalDonateTags")
    let modalDonateCondition = document.getElementById("modalDonateCondition")
    let modalDonateDonor = document.getElementById("modalDonateDonor")
    let modalDonateDate = document.getElementById("modalDonateDate")
    let modalDonateCover = document.getElementById("modalDonateCover")
    let modalDonateDescription = document.getElementById("modalDonateDescription")
    let modalViewCover = document.getElementById("modalViewCover")

    /* steps */
    let donateStep1 = document.getElementById("donateStep1")
    let donateStep2 = document.getElementById("donateStep2")
    let donateStep3 = document.getElementById("donateStep3")

    /* buttons */
    let btnNext = document.getElementById("btnNext")
    let btnPrevious = document.getElementById("btnPrevious")
    let btnSubmit = document.getElementById("btnSubmit")
    
    /* items visible */
    function viewDonateStep(count) {
        let step1 = document.getElementById("step1")
        let step2 = document.getElementById("step2")
        let step3 = document.getElementById("step3")

        if (count == 0) {
            donateStep1.style.display = "block"
            donateStep2.style.display = "none"
            donateStep3.style.display = "none"
            btnNext.style.display = "block"
            btnPrevious.style.display = "none"
            btnSubmit.style.display = "none"
            
            step1.className = step1.className.replace(/(?:^|\s)far(?!\S)/, "fas")
            step2.className = step2.className.replace(/(?:^|\s)fas(?!\S)/, "far")
            step3.className = step3.className.replace(/(?:^|\s)fas(?!\S)/, "far")
        }
        else if (count == 1) {
            donateStep1.style.display = "none"
            donateStep2.style.display = "block"
            donateStep3.style.display = "none"
            btnNext.style.display = "block"
            btnPrevious.style.display = "block"
            btnSubmit.style.display = "none"
            
            step1.className = step1.className.replace(/(?:^|\s)fas(?!\S)/, "far")
            step2.className = step2.className.replace(/(?:^|\s)far(?!\S)/, "fas")
            step3.className = step3.className.replace(/(?:^|\s)fas(?!\S)/, "far")
        }
        else if (count == 2) {
            donateStep1.style.display = "none"
            donateStep2.style.display = "none"
            donateStep3.style.display = "block"
            btnNext.style.display = "none"
            btnPrevious.style.display = "block"
            btnSubmit.style.display = "block"
            
            step1.className = step1.className.replace(/(?:^|\s)fas(?!\S)/, "far")
            step2.className = step2.className.replace(/(?:^|\s)fas(?!\S)/, "far")
            step3.className = step3.className.replace(/(?:^|\s)far(?!\S)/, "fas")
        }
    }

    /* view cover */
    function viewInputCover() {
        modalViewCover.src = modalDonateCover.value
    }

    /* set new notification */                                  // ??????????????????????????????????????
    function injectNotification(category, tags, book, library) {

        // add new book notification to user wishlists by categories
        for (let j = 0; j < category.length; j++) {
            for (let i = 0; i < wishlists.length; i++) {
                let tempCategory = parseInt(category)
                let tempArray = wishlists[i].categoryList

                if (tempArray.includes(tempCategory)) {
                    wishlists[i].notificationsCategories.push(book)
                }
            }
        }

        // add new book notification to user wishlists by tags
        for (let j = 0; j < tags.length; j++) {
            for (let i = 0; i < wishlists.length; i++) {                
                let tempTags = parseInt(tags)
                let tempArray = wishlists[i].tagList
                
                if (tempArray.includes(tempTags)) {
                    wishlists[i].notificationsTags.push(book)
                }
            }
        }

        // add new book notification to user wishlists by library
        for (let j = 0; j < library.length; j++) {
            for (let i = 0; i < wishlists.length; i++) {                
                let tempLibrary = parseInt(library)
                let tempArray = wishlists[i].libraryList
                
                if (tempArray.includes(tempLibrary)) {
                    wishlists[i].notificationsLibraries.push(book)
                }
            }
        }
    }
//


// --------------------------------------
// VALIDATION

    /* new book */
    function checkNewBookValid() {
        let arrayTags = []
        let strError = ""

        for (let i = 0; i < modalDonateTags.options.length; i++) {
            if (modalDonateTags.options[i].selected) {
                arrayTags.push(parseInt(modalDonateTags.options[i].value))
            }
        }

        if (modalDonateTitle.value == "" || modalDonateAuthors.value == "" || modalDonatePublisher.value == "" || modalDonateYear.value == "" || modalDonatePages.value == 0 || 
        modalDonateParish.value == "" || modalDonateCategories.value == "" || arrayTags.length == 0 || modalDonateCondition.value == "" || modalDonateDate.value == "" ||
        modalDonateCover.value == "" || modalDonateDescription.value == "") {        
            strError = 'Existem campos por preencher!'
        }
        else if (modalDonateYear.value > getCurrentYear()) {
            strError = "O ano de lançamento não pode ser superior ao atual!"
        }
        else if (modalDonateDate.value > getCurrentDate()) {
            strError = "A data de doação não pode ser superior à atual!"
        }

        if (strError == "") {
            arrayAuthors = (modalDonateAuthors.value).split(",")

            let newBook = new Book(modalDonateTitle.value, 
                                    arrayAuthors,
                                    modalDonatePublisher.value,
                                    modalDonateYear.value,
                                    modalDonatePages.value,
                                    modalDonateCategories.value,
                                    arrayTags,
                                    modalDonateCondition.value,
                                    modalDonateDonor.value,
                                    modalDonateDate.value,
                                    modalDonateCover.value,
                                    modalDonateDescription.value,
                                    [0],
                                    Library.getLibraryIdByLocation(modalDonateCity.value, modalDonateParish.value))
            
            saveBook(newBook)
            //injectNotification(modalDonateCategories.value, arrayTags, newBook.id, modalDonateParish.value)

            swal({
                type: 'success',
                title: 'Registado!',
                text: `O livro "${modalDonateTitle.value}" foi registado com sucesso.`,
                showConfirmButton: true,
                confirmButtonColor: '#9fc490',
                allowOutsideClick: false
            })

            $('#modalDonate').modal('hide')
        }
        else {
            swal({
                type: 'error',
                title: 'Oops...',
                text: strError,
                confirmButtonColor: '#9fc490',
                allowOutsideClick: false
            })
        }
    }
//


// --------------------------------------
// CATALOG

    /* link for book page */
    let bookPage = document.getElementsByClassName("book-page")

    /* select category to title */
    function addSelectCategoryToTitle(id) {
        let categoryTitle = document.getElementById("categoryTitle")
        let tempCategory = Category.getCategoryById(id)  // gets category name

        categoryTitle.innerHTML += `<h1 id='${id}'>${tempCategory.toUpperCase()}</h1>`
    }

    /* select book */
    function getSelectBook() {
        for (let i = 0; i < bookPage.length; i++) {
            bookPage[i].addEventListener("click", function() {
                sessionStorage.setItem("bookCurrent", bookPage[i].getAttribute("id"))
            })
        }
    }
//


// --------------------------------------
// CONVERT

    /* rating to stars */
    function convertRatingToStars(averageRating) {
        let tempRating = Math.round(averageRating)
        let strHtml = ""

        if (tempRating > 0) {
            for (let i = 0; i < 5; i++) {
                if (tempRating > i) {
                    strHtml += "<span><i class='fa fa-star checked'></i></span>"
                }
                else {
                    strHtml += "<span><i class='fa fa-star'></i></span>"
                }
            }
        }        
        return strHtml
    }

    /* first letter to upper case */
    function convertFirstToUpperCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
//


// --------------------------------------
// GET CURRENT DATE

    /* full date */
    function getCurrentDate() {
        let currentDate = new Date()
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        if (day < 10) {
            day = '0' + day
        } 

        if (month < 10) {
            month = '0' + month
        }

        return year + '-' + month + '-' + day
    }

    /* year */
    function getCurrentYear() {
        return new Date().getFullYear()
    }
//