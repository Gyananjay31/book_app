let circle = document.querySelector("#circle");
let container = document.querySelector("#toggle-container");
let bodyTag = document.querySelector("body");
let toggled = false;

container.addEventListener("click", () => {
  if (!toggled) {
    bodyTag.classList.add("bg-color-black");
    circle.classList.add("dark-mode");
    toggled = true;
  } else {
    bodyTag.classList.remove("bg-color-black");
    circle.classList.remove("dark-mode");
    toggled = false;
  }
});


const userList = document.querySelector(".sidebar-categories");

creatCategory();

async function creatCategory() {
  const response = await fetch(
    "https://books-backend.p.goit.global/books/category-list"
  );
  const result = await response.json();
  const fragment = document.createDocumentFragment();
  result.forEach((obj) => {
    const li = document.createElement("li");
    li.classList.add("category-item");
    li.dataset.id = `${obj.list_name}`;
    li.innerText = obj.list_name;
    fragment.appendChild(li);
  });
  document.querySelector(".sidebar-categories").append(fragment);
}

userList.addEventListener("click", (e) => {
  if (e.target.classList.contains("category-item")) {
    openCategory(e);
  }
  e.target.addEventListener("click", filteredBooks(e.target.dataset.id));
});

function openCategory(e) {
  document
    .querySelectorAll(".category-item")
    .forEach((item) => item.classList.remove("active"));

  e.target.classList.add("active");

}


const logoContainer = document.querySelector(".logoContainer");
const swipBtn = document.querySelector(".swiper-btn-next");
const swipIcon = document.querySelector(".swiper-btn-next i");

let currentIndex = 0;
const visibleItems = 6; 
const logoItems = document.querySelectorAll(".logo-item");
const totalItems = logoItems.length;
const itemHeight = logoItems[0].offsetHeight + 24; 

swipBtn.addEventListener("click", () => {
  const maxScrollIndex = totalItems - visibleItems;

  if (currentIndex < maxScrollIndex) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  logoContainer.scrollTo({
    top: currentIndex * itemHeight,
    behavior: "smooth",
  });

  if (currentIndex === maxScrollIndex) {
    swipIcon.classList.remove("fa-chevron-down");
    swipIcon.classList.add("fa-chevron-up");
  } else {
    swipIcon.classList.remove("fa-chevron-up");
    swipIcon.classList.add("fa-chevron-down");
  }
});

const mainDiv = document.querySelector(".main");

getBook();

async function getBook() {
    try {
        const response = await fetch("https://books-backend.p.goit.global/books/top-books");

        if (!response.ok) {
            throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        displayBooks(result, "all-category");
    } catch (error) {
        console.error("Error fetching books:", error);
        displayErrorMessage("Failed to load books. Please try again later.");
    }
}

function displayErrorMessage(message) {
    mainDiv.innerHTML = `<p class="error-message">${message}</p>`;
}

function showDetails(obj) {
    document.getElementById("popup-image").src = obj.book_image;
    document.getElementById("popup-title").innerText = obj.title;
    document.getElementById("popup-author").innerText = "by " + obj.author;
    
    document.getElementById("popup-description").innerText = obj.description ? obj.description : "No description available.";

    document.getElementById("amazon-link").href = obj.buy_links.find(link => link.name === "Amazon")?.url || "#";
    document.getElementById("apple-link").href = obj.buy_links.find(link => link.name === "Apple Books")?.url || "#";
    document.getElementById("barnes-link").href = obj.buy_links.find(link => link.name === "Barnes and Noble")?.url || "#";

    document.querySelector(".popup").style.display = "flex";
}

document.querySelector(".popup-content .close-btn").addEventListener("click", () => {
    document.querySelector(".popup").style.display = "none";
});

document.querySelector(".popup").addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) {
        document.querySelector(".popup").style.display = "none";
    }
});



function displayBooks(books, data_id) {
  mainDiv.innerHTML = "";
  const fragment = document.createDocumentFragment();
  if (data_id === "all-category") {
    const h1 = document.createElement("h1");
    h1.classList.add("heading");
    h1.innerText = "Best Sellers Books";
    applyClassOnLastWord(h1);
    fragment.append(h1);

    books.forEach((book) => {
      const parentDiv = document.createElement("div");
      parentDiv.classList.add("parent-books-btn");

      const h2 = document.createElement("h2");
      h2.innerText = book.list_name;

      const booksDiv = document.createElement("div");
      booksDiv.classList.add("books");

      book.books.forEach((obj) => {
        const book = document.createElement("div");
        book.classList.add("book");
        const bookImage = document.createElement("div");
        bookImage.classList.add("book-image");
        const image = document.createElement("img");
        image.src = obj.book_image;
        bookImage.append(image);

        const name_writerDiv = document.createElement("div");
        name_writerDiv.classList.add("name-writer");

        const bookName = document.createElement("h4");
        const authorName = document.createElement("p");
        bookName.innerText = obj.title;
        authorName.innerText = obj.author;

        name_writerDiv.append(bookName, authorName);
        book.append(bookImage, name_writerDiv);
        
        booksDiv.append(book);

        book.addEventListener("click", () => showDetails(obj));
      });

      const btnDiv = document.createElement("div");
      btnDiv.classList.add("seeMoreParent");
      const showMore = document.createElement("button");
      showMore.innerText = "SEE MORE";
      showMore.addEventListener("click", () => filteredBooks(book.list_name));


      btnDiv.append(showMore);

      parentDiv.append(h2, booksDiv, btnDiv);
      fragment.append(parentDiv);
    });

    mainDiv.append(fragment);
  }else{
    const h1 = document.createElement("h1");
    h1.classList.add("heading");
    h1.innerText = data_id;
    applyClassOnLastWord(h1);
    fragment.append(h1);
    const booksDiv = document.createElement("div");
    booksDiv.classList.add("books");
    books.forEach((obj) => {
        const book = document.createElement("div");
        book.classList.add("book");
        const bookImage = document.createElement("div");
        bookImage.classList.add("book-image");
        const image = document.createElement("img");
        image.src = obj.book_image;
        bookImage.append(image);
        const name_writerDiv = document.createElement("div");
        name_writerDiv.classList.add("name-writer");

        const bookName = document.createElement("h4");
        const authorName = document.createElement("p");
        bookName.innerText = obj.title;
        authorName.innerText = obj.author;

        name_writerDiv.append(bookName, authorName);
        book.append(bookImage, name_writerDiv);
        booksDiv.append(book);

        book.addEventListener("click", () => showDetails(obj));
      });
      fragment.append(h1, booksDiv);
      mainDiv.append(fragment);
  }
}

function applyClassOnLastWord(heading) {
  let words = heading.innerText.trim().split(" ");
  if (words.length > 1) {
    words[words.length - 1] = `<span class="highlight">${
      words[words.length - 1]
    }</span>`; 
    heading.innerHTML = words.join(" "); 
  }
}

async function filteredBooks(categoryName) {
    try {
        if (categoryName === "all-category") {
            await getBook(); 
            return;
        }

        const response = await fetch(`https://books-backend.p.goit.global/books/category?category=${categoryName}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch books for category "${categoryName}": ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        displayBooks(data, categoryName);
    } catch (error) {
        console.error("Error fetching category books:", error);
        displayErrorMessage(`Failed to load books for "${categoryName}". Please try again later.`);
    }
}


const authPopup = document.getElementById("authPopup");
const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");
const successMessage = document.getElementById("successMessage");
const signupButton = document.querySelector(".sign-up button");
const sidebarButton = document.querySelector(".sidebar button"); 
const closeButtons = document.querySelectorAll(".close-btn");

function toggleAuthForms() {
    if (signupForm.style.display === "none") {
        signupForm.style.display = "block";
        signinForm.style.display = "none";
    } else {
        signupForm.style.display = "none";
        signinForm.style.display = "block";
    }
}

function showMessage(message, type) {
    successMessage.textContent = message;
    
    successMessage.classList.remove("success", "error");
    
    if (type === "success") {
        successMessage.classList.add("success");
    } else {
        successMessage.classList.add("error");
    }

    successMessage.style.display = "block";

    setTimeout(() => {
        successMessage.style.display = "none";
    }, 2000);
}

signupButton.addEventListener("click", () => {
    authPopup.style.display = "flex";
});

sidebarButton.addEventListener("click", () => {
  authPopup.style.display = "flex";
});

closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        authPopup.style.display = "none";
    });
});

function signup() {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!name || !email || !password) {
        showMessage("All fields are required!", "error");
        return;
    }

    if (localStorage.getItem(email)) {
        showMessage("User already exists! Try logging in.", "error");
        return;
    }

    localStorage.setItem(email, JSON.stringify({ name, password }));
    showMessage("Signup Successful! Please log in.", "success");
    toggleAuthForms();
}

function signin() {
    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value.trim();

    if (!email || !password) {
        showMessage("All fields are required!", "error");
        return;
    }

    const userData = localStorage.getItem(email);

    if (!userData) {
        showMessage("User not found! Please sign up.", "error");
        return;
    }

    const user = JSON.parse(userData);
    
    if (user.password !== password) {
        showMessage("Incorrect password!", "error");
        return;
    }

    localStorage.setItem("loggedInUser", user.name);
    
    showMessage(`Welcome, ${user.name}!`, "success");

    updateUI();
    closeAuthPopup();
}

function updateUI() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        document.querySelector(".sign-up").innerHTML = `
            <span class="user-name">${loggedInUser}</span>
            <button class="logout-btn">Logout</button>
        `;
        
        document.querySelector(".logout-btn").addEventListener("click", logout);
    }
}

function closeAuthPopup() {
    authPopup.style.display = "none";
}

function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}

document.addEventListener("DOMContentLoaded", updateUI);
