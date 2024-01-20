document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav');

    menuIcon.addEventListener('click', function () {
        nav.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const loggedInAdmin = localStorage.getItem('loggedInAdmin');
    const loggedInUser = localStorage.getItem('loggedInUser');

    const allowedPaths = [
        '/beranda.html', '/pengaturan.html', '/rak%20buku.html', '/pinjam.html',
        '/pembayaran.html', '/riwayat.html', '/tentang%20kami.html',
        '/donasi.html', '/rak%20buku.html#koleksi', '/rak%20buku.html#buku',
        '/rak%20buku.html#e_buku', '/rak%20buku.html#favorit', '/register.html' // Include 'beranda%20dev.html' for admin access
    ];

    const defaultRedirect = '/index.html';

    if (!loggedInAdmin && !loggedInUser) {
        // Redirect to the login page if no user is logged in
        if (window.location.pathname !== defaultRedirect) {
            window.location.href = defaultRedirect;
        }
    
    }
});

const admins = [
    { username: 'dilun', password: 'dilun' },
    // Add more admins as needed
];

const users = [
    { username: 'codef', password: 'codef' },
    // Add more users as needed
];


function login(role) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const targetArray = role === 'admin' ? admins : users;
    const loggedInUser = targetArray.find(u => u.username === username && u.password === password);

    if (loggedInUser) {
        localStorage.setItem(`loggedIn${role.charAt(0).toUpperCase() + role.slice(1)}`, JSON.stringify(loggedInUser));
        if (window.location.pathname !== (role === 'admin' ? '/beranda%20dev.html' : '/beranda.html')) {
            window.location.href = role === 'admin' ? '/beranda%20dev.html' : '/beranda.html'; // Redirect to different pages for admin and regular users after successful login
        }
    } else {
        alert("Username atau password salah");
    }
}


// Logout function
function logout() {
    const loggedInAdmin = localStorage.getItem('loggedInAdmin');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInAdmin) {
        // Clear the logged-in admin from localStorage
        localStorage.removeItem('loggedInAdmin');
    } else if (loggedInUser) {
        // Clear the logged-in user from localStorage
        localStorage.removeItem('loggedInUser');
    }

    // Redirect to the login page
    window.location.href = 'index.html';
}



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
        width: 400,
        height: 400
    });

    // Add a download button
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download QR Code';
    downloadButton.addEventListener('click', () => {
        // Create a temporary canvas element
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Draw the QR code on the canvas
        const qrCodeImage = qrcodeElement.querySelector('img');
        context.drawImage(qrCodeImage, 0, 0);

        // Convert the canvas content to a data URL
        const dataURL = canvas.toDataURL('image/png');

        // Create a temporary link element
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'qrcode.png';

        // Simulate a click on the link to trigger the download
        downloadLink.click();
    });

    // Append the download button to the page
    qrcodeElement.appendChild(downloadButton);
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



