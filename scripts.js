const myLibrary = [];

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