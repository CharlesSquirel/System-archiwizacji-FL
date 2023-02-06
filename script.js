const files = [
  { signature: "DAsadasdad", date: "01.01.2023", description: "Koncert symfoniczny", tags: "koncert symfoniczny, Mozart" },
  { signature: "DAsadasdad", date: "01.01.2023", description: "Koncert symfoniczny", tags: "koncert symfoniczny, Mozart" },
  { signature: "DAsadasdad", date: "01.01.2023", description: "Koncert symfoniczny", tags: "koncert symfoniczny, Mozart" },
  { signature: "DAsadasdad", date: "01.01.2023", description: "Koncert symfoniczny", tags: "koncert symfoniczny, Mozart" },
];

const list = document.querySelector(".list-container");
const renderBtn = document.querySelector(".btn-render");

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
  });
};

renderBtn.addEventListener("click", renderList);
