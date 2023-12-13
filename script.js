//automation stuff

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        this.books.push(newBook);
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title != title);

    }

}

const updateBookContainer = () => {
    bookshelf.innerHTML = "";
    for(let book of library.books) {
        createBookDisplay(book)
    }

}

const getBookInfo = () => {
    const title = document.querySelector("#bookTitle").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#isRead").checked;
    return new Book(title, author, pages, isRead);
}

const openBookPrompt = () => {
    submitForm.classList.add("active");
    submitForm.classList.remove("inactive");
    overlay.classList.add("active");

}

const resetForm = () => {
    document.querySelector("#bookTitle").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("#isRead").checked = false;

}

const closeBookPrompt = () => {
    submitForm.classList.add("inactive");
    submitForm.classList.remove("active");
    overlay.classList.remove("active");
    resetForm();
    updateBookContainer();

}

const addBook = (e) => {
    const newBook = getBookInfo();
    library.addBook(newBook);
    closeBookPrompt();
}

const changeStatus = (e) => {
    if(e.textContent == "Read") {
        e.textContent = "Unread";
        e.classList.remove("read");
        e.classList.add("unread");
    } else {
        e.textContent = "Read";
        e.classList.remove("unread");
        e.classList.add("read");
    }
}

const createBookDisplay = (book) => {
    let bookBox = document.createElement("div");
    let bookTitle = document.createElement("div");
    let bookAuthor = document.createElement("div");
    let bookPages = document.createElement("div");
    let readStatus = document.createElement("button");
    let removeBtn = document.createElement("button");

    bookBox.classList.add("bookBox")
    bookTitle.textContent = book.title;
    bookTitle.classList.add("italic");
    bookAuthor.textContent = `by ${book.author}`;
    if(book.pages <=1) {
        bookPages.textContent = `${book.pages} page`;
    } else bookPages.textContent = `${book.pages} pages`;
    if(book.isRead == false) {
        readStatus.classList.add("unread");
        readStatus.textContent = "Unread";
    } else { readStatus.classList.add("read");
             readStatus.textContent = "Read"}; 
        readStatus.addEventListener('click', () => {
            changeStatus(readStatus);
        })
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("removeBtn");
    removeBtn.addEventListener('click', () => {
        removeBook(removeBtn);
    })


    bookBox.appendChild(bookTitle);
    bookBox.appendChild(bookAuthor);
    bookBox.appendChild(bookPages);
    bookBox.appendChild(readStatus);
    bookBox.appendChild(removeBtn);
    bookshelf.appendChild(bookBox);
}

const removeBook = (e) => {
        let removeTitle = e.parentNode.firstChild.textContent;
        library.removeBook(removeTitle);
        updateBookContainer();
        
}

const addBookBtn = document.querySelector("#addBookBtn");
const createNewBook = document.querySelector("#createNewBook");
const cancelNewBook = document.querySelector("#cancelNewBook");
const bookshelf = document.querySelector(".booksContainer");
const submitForm = document.querySelector("#submissionForm");
const overlay = document.querySelector("#overlay");
const library = new Library();

//user-interface

addBookBtn.addEventListener('click', () => {
    openBookPrompt();
})

cancelNewBook.addEventListener('click', () => {
    closeBookPrompt();
})

overlay.addEventListener('click', () => { 
    closeBookPrompt();
})

createNewBook.addEventListener('click', () => {
    addBook();
})



