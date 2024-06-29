const myLibrary = [new Book("The Blue Asteroid", "Qwinx Maoqwertou", "451", false)];

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
    
});