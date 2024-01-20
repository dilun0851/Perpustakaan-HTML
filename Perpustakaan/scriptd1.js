document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav');

    menuIcon.addEventListener('click', function () {
        nav.classList.toggle('active');
    });
});

function borrowBook() {
    const bookTitle = document.getElementById('bookTitle').value;
    const borrowerName = document.getElementById('borrowerName').value;
    const Tanggalpinjam = document.getElementById('Tanggalpinjam').value;
    const Tanggalkembali = document.getElementById('Tanggalkembali').value;

    if (!bookTitle || !borrowerName || !Tanggalpinjam || !Tanggalkembali) {
        alert('Mohon masukkan judul buku dan nama peminjam.');
        return;
    }

    const borrowedBooksElement = document.getElementById('borrowedBooks');

    // Display the borrowed book information
    const bookInfo = document.createElement('p');
    bookInfo.textContent = `Judul Buku: ${bookTitle} | Peminjam: ${borrowerName} | Tanggal Pinjam: ${Tanggalpinjam} | Tanggal Pengembalian Buku: ${Tanggalkembali}`;
    borrowedBooksElement.appendChild(bookInfo);

    // Save the borrowed book information to localStorage
    saveBorrowedBook({ title: bookTitle, borrower: borrowerName, pinjam: Tanggalpinjam, kembali: Tanggalkembali });

    // Clear the input fields
    document.getElementById('bookTitle').value = '';
    document.getElementById('borrowerName').value = '';
    document.getElementById('Tanggalpinjam').value = '';
    document.getElementById('Tanggalkembali').value = '';
}

function saveBorrowedBook(book) {
    // Retrieve existing borrowed books from localStorage
    const existingBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

    // Add the new borrowed book to the array
    existingBooks.push(book);

    // Save the updated array back to localStorage
    localStorage.setItem('borrowedBooks', JSON.stringify(existingBooks));
}

function displayBorrowedBooks() {
    // Retrieve borrowed books from localStorage
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

    const borrowedBooksElement = document.getElementById('borrowedBooks');

    // Display the borrowed books in the history
    borrowedBooks.forEach(book => {
        const bookInfo = document.createElement('p');
        bookInfo.textContent = `Judul Buku: ${book.title} | Peminjam: ${book.borrower} | Tanggal Pinjam: ${book.pinjam} | Tanggal Pengembalian Buku: ${book.kembali}`;
        borrowedBooksElement.appendChild(bookInfo);
    });
}

// Display existing borrowed books when the page loads
//displayBorrowedBooks();

function generateQRCode(book) {
    // Get the element where the QR code will be displayed
    const qrcodeElement = document.getElementById('qrcode');

    // Clear any existing QR code
    qrcodeElement.innerHTML = '';

    // Display book information and ID as QR code
    const qrcode = new QRCode(qrcodeElement, {
        text: `Judul Buku: ${book.title} | Peminjam: ${book.borrower} | Tanggal Pinjam: ${book.pinjam} | Tanggal Pengembalian Buku: ${book.kembali}`,
        width: 200,
        height: 200
    });
}

// RESET
function borrowBook() {
    const bookTitle = document.getElementById('bookTitle').value;
    const borrowerName = document.getElementById('borrowerName').value;
    const Tanggalpinjam = document.getElementById('Tanggalpinjam').value;
    const Tanggalkembali = document.getElementById('Tanggalkembali').value;

    if (!bookTitle || !borrowerName) {
        alert('Mohon masukkan judul buku dan nama peminjam.');
        return;
    }

    const borrowedBooksElement = document.getElementById('borrowedBooks');

    // Display the borrowed book information
    const bookInfo = document.createElement('p');
    bookInfo.textContent = `Judul Buku: ${bookTitle} | Peminjam: ${borrowerName} | Tanggal Pinjam: ${Tanggalpinjam} | Tanggal Pengembalian Buku: ${Tanggalkembali}`;

    // Generate QR code for the borrowed book
    const qrCodeButton = document.createElement('button');
    qrCodeButton.textContent = 'QR Code';
    qrCodeButton.addEventListener('click', () => {
        generateQRCode({ title: bookTitle, borrower: borrowerName, pinjam: Tanggalpinjam, kembali: Tanggalkembali });
    });

    // Add a button to remove this specific borrowed book
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Hapus';
    removeButton.addEventListener('click', () => {
        removeBorrowedBook({ title: bookTitle, borrower: borrowerName, pinjam: Tanggalpinjam, kembali: Tanggalkembali });
        borrowedBooksElement.removeChild(bookInfo);
    });

    bookInfo.appendChild(qrCodeButton);
    bookInfo.appendChild(removeButton);

    borrowedBooksElement.appendChild(bookInfo);

    // Save the borrowed book information to localStorage
    saveBorrowedBook({ title: bookTitle, borrower: borrowerName, pinjam: Tanggalpinjam, kembali: Tanggalkembali });

    // Clear the input fields
    document.getElementById('bookTitle').value = '';
    document.getElementById('borrowerName').value = '';
    document.getElementById('Tanggalpinjam').value = '';
    document.getElementById('Tanggalkembali').value = '';
}

function removeBorrowedBook(book) {
    // Retrieve existing borrowed books from localStorage
    const existingBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

    // Remove the specific borrowed book from the array
    const updatedBooks = existingBooks.filter(b => b.title !== book.title || b.borrower !== book.borrower || b.pinjam !== book.pinjam || b.kembali !== book.kembali);

    // Save the updated array back to localStorage
    localStorage.setItem('borrowedBooks', JSON.stringify(updatedBooks));
}


function resetBorrowedBooks() {
    // Clear the borrowed books in localStorage
    localStorage.removeItem('borrowedBooks');

    // Clear the displayed borrowed books on the page
    document.getElementById('borrowedBooks').innerHTML = '';
}

// Display existing borrowed books when the page loads
displayBorrowedBooks();



