let localStorageMyLibrary = JSON.parse(localStorage.getItem("myLibrary")) || "NONE";
const myLibrary = [];
if (localStorageMyLibrary !== "NONE") {
    localStorageMyLibrary.forEach(book => {
        myLibrary.push(new Book(book.title, book.author, book.pages, book.read));
    });
};

function saveMyLibraryToLocalStorage() {
    localStorageMyLibrary = myLibrary;
    localStorage.setItem("myLibrary", JSON.stringify(localStorageMyLibrary));
}

function Book(title, author, pages, read) {
    // type checking
    if (typeof title === "string" && typeof author === "string" && typeof pages === "string" && typeof read === "boolean") {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    } else {
        throw new Error("Follow the datatypes for the book object: str, str, str, bool");
    }
};
Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function renderBooks() {
    document.querySelector(".user-books-grid").textContent = "";
    if (myLibrary.length === 0) {
        // a text if there are no books
        const userBooksGridNoBooksText = document.createElement("div");
        userBooksGridNoBooksText.classList.add("user-books-grid-no-books-text");
        userBooksGridNoBooksText.textContent = "Your library is empty";
        document.querySelector(".user-books-grid").appendChild(userBooksGridNoBooksText);

        return;
    };

    myLibrary.forEach(book => {
        const newBookCard = document.createElement("div");
        newBookCard.classList.add("user-book-card");
        // newBookCard child elements
        const userBookCardData = document.createElement("div");
        userBookCardData.classList.add("user-book-card-data");

        const userBookCardBookTitle = document.createElement("p");
        userBookCardBookTitle.classList.add("user-book-card-book-title");
        userBookCardBookTitle.textContent = book.title;
        userBookCardData.appendChild(userBookCardBookTitle);

        const userBookCardBookAuthor = document.createElement("p");
        userBookCardBookAuthor.classList.add("user-book-card-book-author");
        userBookCardBookAuthor.textContent = book.author;
        userBookCardData.appendChild(userBookCardBookAuthor);

        const userBookCardBookPages = document.createElement("p");
        userBookCardBookPages.classList.add("user-book-card-book-pages");
        userBookCardBookPages.textContent = book.pages;
        userBookCardData.appendChild(userBookCardBookPages);

        newBookCard.appendChild(userBookCardData);

        const userBookCardTogglereadBtn = document.createElement("button");

        userBookCardTogglereadBtn.classList.add("user-book-card-toggle-read-btn");
        if (book.read) {
            userBookCardTogglereadBtn.textContent = "Read";
        } else {
            userBookCardTogglereadBtn.classList.add("unread");
            userBookCardTogglereadBtn.textContent = "Unread";
        };
        userBookCardTogglereadBtn.addEventListener("click", function() {
            book.toggleRead();
            saveMyLibraryToLocalStorage();
            userBookCardTogglereadBtn.classList.toggle("unread");
            if (book.read) {
                userBookCardTogglereadBtn.textContent = "Read";
            } else {
                userBookCardTogglereadBtn.textContent = "Unread";
            }
        });
        newBookCard.appendChild(userBookCardTogglereadBtn);

        /* legacy
        newBookCard.innerHTML = `
            <div class="user-book-card-data">
                <p class="user-book-card-book-title">${book.title}</p>
                <p class="user-book-card-book-author">${book.author}</p>
                <p class="user-book-card-book-pages">${book.pages}</p>
            </div>
            ${function() {
                if (book.read) {
                    return `<button class="user-book-card-toggle-read-btn">Read</button>`;
                } else {
                    return `<button class="user-book-card-toggle-read-btn unread">Unread</button>`;
                };
            }()}
        `;
        */
        document.querySelector(".user-books-grid").appendChild(newBookCard);
    });
};

renderBooks();

document.getElementById("page-header-add-book-btn").addEventListener("click", function() {
    // create the form
    const formBackdrop = document.createElement("div");
    formBackdrop.classList.add("backdrop-full-page");

    const form = document.createElement("form");
    form.classList.add("add-book-form");
    formBackdrop.appendChild(form);

    const formInputBlock1 = document.createElement("div");
    formInputBlock1.classList.add("add-book-form-input-block");
    const formInputBlock1Label = document.createElement("label");
    formInputBlock1Label.classList.add("add-book-form-input-block-label");
    formInputBlock1Label.textContent = "TITLE";
    formInputBlock1.appendChild(formInputBlock1Label);
    const formInputBlock1Input = document.createElement("input");
    formInputBlock1Input.classList.add("add-book-form-input-block-input");
    formInputBlock1Input.required = true;
    formInputBlock1.appendChild(formInputBlock1Input);
    form.appendChild(formInputBlock1);

    
    const formInputBlock2 = document.createElement("div");
    formInputBlock2.classList.add("add-book-form-input-block");
    const formInputBlock2Label = document.createElement("label");
    formInputBlock2Label.classList.add("add-book-form-input-block-label");
    formInputBlock2Label.textContent = "AUTHOR";
    formInputBlock2.appendChild(formInputBlock2Label);
    const formInputBlock2Input = document.createElement("input");
    formInputBlock2Input.classList.add("add-book-form-input-block-input");
    formInputBlock2Input.required = true;
    formInputBlock2.appendChild(formInputBlock2Input);
    form.appendChild(formInputBlock2);

    const formInputBlock3 = document.createElement("div");
    formInputBlock3.classList.add("add-book-form-input-block");
    const formInputBlock3Label = document.createElement("label");
    formInputBlock3Label.classList.add("add-book-form-input-block-label");
    formInputBlock3Label.textContent = "PAGES";
    formInputBlock3.appendChild(formInputBlock3Label);
    const formInputBlock3Input = document.createElement("input");
    formInputBlock3Input.classList.add("add-book-form-input-block-input");
    formInputBlock3Input.required = true;
    formInputBlock3.appendChild(formInputBlock3Input);
    form.appendChild(formInputBlock3);

    const formBtnsBlock = document.createElement("div");
    formBtnsBlock.classList.add("add-book-form-btns-block");
    const formCancelBtn = document.createElement("button");
    formCancelBtn.classList.add("add-book-form-form-cancel-btn");
    formCancelBtn.textContent = "Cancel";
    formCancelBtn.setAttribute("type", "button");
    formBtnsBlock.appendChild(formCancelBtn);
    const formAddBtn = document.createElement("button");
    formAddBtn.classList.add("add-book-form-add-btn");
    formAddBtn.textContent = "Add";
    formAddBtn.setAttribute("type", "submit");
    formBtnsBlock.appendChild(formAddBtn);
    form.appendChild(formBtnsBlock);

    document.body.appendChild(formBackdrop);
    formInputBlock1Input.focus();
    // to let the user close the modal when clicked outside of the form
    formBackdrop.addEventListener("click", function(event) {
        if (event.target === formBackdrop) {
            formBackdrop.remove();
        };
    });
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (!formInputBlock3Input.value.includes(".") && Boolean(Number(formInputBlock3Input.value)) && Number(formInputBlock3Input.value) > 0) {
            // console.log(Number(formInputBlock3Input.value), Boolean(NaN));
            myLibrary.push(new Book(formInputBlock1Input.value, formInputBlock2Input.value, formInputBlock3Input.value, true));
            saveMyLibraryToLocalStorage();
            renderBooks();
            formBackdrop.remove();
        } else {
            alert("Only type integer page numbers, page numbers also cant be 0 nor lower!");
            formInputBlock3Input.value = "";
        };
    });

    formCancelBtn.addEventListener("click", function() {
        formBackdrop.remove();
    });
});