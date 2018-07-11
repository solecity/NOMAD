



        /* filter */
        btnFilter.addEventListener("click", function(event) {
            let sortBooks = [...books].sort()
            let filterBooks = []
            let tempTags = [...new Set(Book.getBookTagsByCategory(categoryCurrent))]

            switch (filter) {
                case "Novidades":
                    sortByDonationDateNew(viewMode, sortBooks)
                    break
                case "Título A-Z":
                    sortByTitleAZ(viewMode, sortBooks)
                    break
                case "Título Z-A":
                    sortByTitleZA(viewMode, sortBooks)
                    break
                case "Maior pontuação":
                sortByRatingHigher(viewMode)
                    break
                case "Menor pontuação":
                sortByRatingLowest(viewMode)
                    break
                case "Mais antigo":
                sortByDonationDateOld(viewMode, sortBooks)
                    break
                default:                
                    swal({
                        type: 'error',
                        title: 'Ohoh...',
                        text: `Filtro inválido (${filter})!`,
                        confirmButtonColor: '#9fc490',
                        allowOutsideClick: false
                    })
                    break
            }

            for (let i = 0; i < books.length; i++) {
                if (filterTag.value != "") {
                    for (let j = 0; j < tempTags.length; j++) {
                        if (tempTags[i] == filterTag.value) {
                            filterBooks.push(books[i])
                        }
                    }
                }
                else {
                    if (books[i].bookCategory == categoryCurrent) {
                        filterBooks.push(books[i])
                    }
                }
            }
            
            let newFilterBooks = [...new Set(filterBooks)]

            addFilterBooksToCatalog(categoryCurrent, viewMode, newFilterBooks)

            event.preventDefault()
        })

        /* grid view */
        btnGrid.addEventListener("click", function () {
            viewMode = "grid"
            addBooksToCatalog(categoryCurrent, viewMode)
            getSelectBook()
        })

        /* list view */
        btnList.addEventListener("click", function () {
            viewMode = "list"
            addBooksToCatalog(categoryCurrent, viewMode)
            getSelectBook()
        })