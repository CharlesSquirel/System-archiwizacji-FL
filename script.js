const files = [
  { signature: "DAsadasdad", date: "01.01.2023", description: "Koncert symfoniczny", tags: "koncert symfoniczny, Mozart" },
  { signature: "DAsadasdad", date: "01.01.2023", description: "Koncert symfoniczny", tags: "koncert symfoniczny, Mozart" },
  { signature: "DAsadasdad", date: "01.01.2023", description: "Koncert symfoniczny", tags: "koncert symfoniczny, Mozart" },
  { signature: "DAsadasdad", date: "01.01.2023", description: "Koncert symfoniczny", tags: "koncert symfoniczny, Mozart" },
];

const list = document.querySelector(".list-container");
const renderBtn = document.querySelector(".btn-render");

// WALIDACJA
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

addBtn.disabled = true;

// Warunkowe odblokowanie przycisku dodaj
const checkReady = () => {
  addFormInputs.forEach(input => {
    let errorMessage = input.nextElementSibling;
    addBtn.disabled = input.value.length > 0 && errorMessage.style.display === "none" ? false : true;
  })
}
// puste pola
addFormInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    let errorMessage = input.nextElementSibling;
    if (input.value.length === 0) {
      errorMessage.textContent = "Pole nie może być puste!";
      errorMessage.style.display = "block";
    } 
    else if (input.className.includes("date") && /[a-z]/ig.test(dateInput.value)) {
      errorMessage.textContent = "Pole może zawierać tylko cyfry!";
      errorMessage.style.display = "block";
    }
    else if (input.className.includes("date") && (input.value.length !== 10 || input.value.match(/\./ig).length !== 2)) {
      errorMessage.textContent = "Pole musi być w formacie \"01.01.2023\"";
      errorMessage.style.fontSize = "13px"
      errorMessage.style.display = "block";
    }
    else {
      errorMessage.style.display = "none";
      checkReady();
    }
  });
});


// RENDEROWANIE LISTY Z FILES
// dynamiczne dodawanie klas i tekstu do buttonów
const addClassesBtns = (btn1, btn2) => {
  [btn1, btn2].forEach((btn) => {
    btn.textContent = btn === btn1 ? "Edytuj" : "Usuń";
    btn.classList.add("btn");
    btn.classList.add(btn.textContent.includes("Edytuj") ? "btn-edit" : "btn-delete");
  });
};

// główna funkcja renderująca
const renderList = () => {
  files.map((file) => {
    const appendRow = list.appendChild(document.createElement("tr"));
    appendRow.classList.add("verse-container");
    appendRow.appendChild(document.createElement("td")).textContent = file.signature;
    appendRow.appendChild(document.createElement("td")).textContent = file.date;
    appendRow.appendChild(document.createElement("td")).textContent = file.description;
    appendRow.appendChild(document.createElement("td")).textContent = file.tags;
    const appendActions = appendRow.appendChild(document.createElement("td"));
    const editBtn = appendActions.appendChild(document.createElement("button"));
    const deleteBtn = appendActions.appendChild(document.createElement("button"));
    addClassesBtns(editBtn, deleteBtn);
    renderBtn.disabled = true;
  });
};

renderBtn.addEventListener("click", renderList);
