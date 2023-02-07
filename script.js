// BAZA DANYCH
const files = [
  { signature: "DAsadasdad", date: "01.01.2023", description: "Koncert symfoniczny", tags: "koncert symfoniczny, Mozart" },
  { signature: "sadasdasd", date: "02.01.2023", description: "Koncert kameralny", tags: "koncert symfoniczny, Mozart" },
  { signature: "asdasdasd", date: "03.01.2023", description: "Recital fortepianowy", tags: "koncert symfoniczny, Mozart" },
  { signature: "asdasdasd", date: "04.01.2023", description: "Koncert symfoniczny", tags: "koncert symfoniczny, Mozart" },
];

// DOM

const list = document.querySelector(".list-container");
const renderBtn = document.querySelector(".btn-render");
const addBtn = document.querySelector(".btn-add");
const signatureInput = document.querySelector(".signature");
const errorSignature = document.querySelector(".error-signature");
const dateInput = document.querySelector(".date");
const errorDate = document.querySelector(".error-date");
const descriptionInput = document.querySelector(".description");
const errorDescription = document.querySelector(".error-description");
const tagsInput = document.querySelector(".tags");
const errorTags = document.querySelector(".error-tags");
const addFormInputs = document.querySelectorAll(".add-form input");
const isSubmittedMessage = document.querySelector(".submitted-message-box");
const table = document.querySelector(".list-container");
let deleteBtns = document.querySelectorAll(".btn-delete");

// 1. WALIDACJA
addBtn.disabled = true;

// A) Warunkowe odblokowanie przycisku dodaj
const checkReady = () => {
  addFormInputs.forEach((input) => {
    let errorMessage = input.nextElementSibling;
    addBtn.disabled = input.value.length > 0 && errorMessage.style.display === "none" ? false : true;
  });
};
// B) puste pola
addFormInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    let errorMessage = input.nextElementSibling;
    if (input.value.length === 0) {
      errorMessage.textContent = "Pole nie może być puste!";
      errorMessage.style.display = "block";
    } else if (input.className.includes("date") && /[a-z]/gi.test(dateInput.value)) {
      errorMessage.textContent = "Pole może zawierać tylko cyfry!";
      errorMessage.style.display = "block";
    } else if (input.className.includes("date") && (input.value.length !== 10 || input.value.match(/\./gi).length !== 2)) {
      errorMessage.textContent = 'Pole musi być w formacie "01.01.2023"';
      errorMessage.style.fontSize = "13px";
      errorMessage.style.display = "block";
    } else {
      errorMessage.style.display = "none";
      checkReady();
    }
  });
});

// C) OKIENKO POMYŚLNEGO DODANIA DO BAZY
addBtn.addEventListener("click", () => {
  isSubmittedMessage.style.opacity = "1";
  setTimeout(() => {
    isSubmittedMessage.style.opacity = "0";
  }, 10000);
});

// 2. RENDEROWANIE LISTY Z FILES
// A) dynamiczne dodawanie klas i tekstu do buttonów
const addClassesBtns = (btn1, btn2) => {
  [btn1, btn2].forEach((btn) => {
    btn.textContent = btn === btn1 ? "Edytuj" : "Usuń";
    btn.classList.add("btn");
    btn.classList.add(btn.textContent.includes("Edytuj") ? "btn-edit" : "btn-delete");
  });
};

// B) Usuwanie wpisów przycik usuń
function setDeleteBtns() {
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let currentBtn = e.target;
      if (currentBtn) {
        const parentToRemove = document.querySelectorAll(".verse-container");
        parentToRemove.forEach((element) => {
          element.contains(btn) ? table.removeChild(element) : element;
        });
      }
    });
  });
}

// C) główna funkcja renderująca listę
const renderList = () => {
  files.map((file) => {
    const appendRow = list.appendChild(document.createElement("tr"));
    appendRow.classList.add("verse-container");
    for (let property in file) {
      appendRow.appendChild(document.createElement("td")).textContent = file[property];
    }
    const appendActions = appendRow.appendChild(document.createElement("td"));
    const editBtn = appendActions.appendChild(document.createElement("button"));
    const deleteBtn = appendActions.appendChild(document.createElement("button"));
    addClassesBtns(editBtn, deleteBtn);
    renderBtn.disabled = true;
    deleteBtns = document.querySelectorAll(".btn-delete");
    setDeleteBtns();
  });
};

// D) OBSŁUGA PRZYCISKU RENDEROWANIA
renderBtn.addEventListener("click", renderList);
