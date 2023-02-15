let btn = document.querySelector(".btn");
let name = document.querySelector(".name-input");
let email = document.querySelector(".email-input");
let phone = document.querySelector(".phone-input");
let img = document.querySelector(".img-input");

let list = document.querySelector(".task-list");

btn.addEventListener("click", () => {
  if (
    !name.value.trim() ||
    !email.value.trim() ||
    !phone.value.trim() ||
    !img.value.trim()
  ) {
    alert("зааполните поле");
    return; //?
  }
  let obj = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    img: img.value,
  };
  //?  ----> вызов функции и добавление в localStorage
  setItemToStorage(obj);
  createElement();
  name.value = "";
  email.value = "";
  phone.value = "";
  img.value = "";
});
function setItemToStorage(task) {
  if (!localStorage.getItem("tasks-data")) {
    localStorage.setItem("tasks-data", "[]");
  }

  let data = JSON.parse(localStorage.getItem("tasks-data"));
  data.push(task);

  localStorage.setItem("tasks-data", JSON.stringify(data));
}
if (!localStorage.getItem("tasks-data")) {
  localStorage.setItem("tasks-data", "[]");
}
createElement();

function createElement() {
  let newData = JSON.parse(localStorage.getItem("tasks-data"));
  console.log(newData);
  list.innerHTML = "";

  newData.forEach((item, index) => {
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    btnDelete.classList.add("delete-btn");
    btnEdit.classList.add("edit-btn");

    let card = document.createElement("div.card");
    card.innerHTML = `<div class='card-main'> <img src='${item.img}'</div> <div class='cards-info'><li>${item.name}</li> <li>${item.email}</li> <li>${item.phone}</li></div>`;
    btnDelete.innerText = "Detete";
    btnEdit.innerText = "Edit";

    console.log(btnDelete, btnEdit);
    btnDelete.addEventListener("click", () => {
      console.log("zxc");
      deleteElem(index);
      // createElement();
    });
    btnEdit.addEventListener("click", () => {
      console.log("zxc");

      editElement(index);
    });
    card.append(btnDelete);
    card.append(btnEdit);
    list.append(card);
  });
}

function deleteElem(index) {
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  data.splice(index, 1);
  localStorage.setItem("tasks-data", JSON.stringify(data));
  createElement();
}
//edit
let mainModal = document.querySelector(".main-modal");
let nameEdit = document.querySelector(".name-edit");
let emailEdit = document.querySelector(".email-edit");
let imgEdit = document.querySelector(".img-edit");
let phoneEdit = document.querySelector(".phone-edit");

let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");

function editElement(index) {
  mainModal.style.display = "block";

  let data = JSON.parse(localStorage.getItem("tasks-data"));

  nameEdit.value = data[index].name;
  emailEdit.value = data[index].email;
  imgEdit.value = data[index].img;
  phoneEdit.value = data[index].phone;

  nameEdit.setAttribute("id", index);
}
btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});

btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("tasks-data"));

  let index = nameEdit.id;

  if (!nameEdit.value.trim()) {
    alert("заполните поле!");
    return;
  }

  let editedTask = {
    name: nameEdit.value,
    email: emailEdit.value,
    phone: phoneEdit.value,
    img: imgEdit.value,
  };

  data.splice(index, 1, editedTask);

  localStorage.setItem("tasks-data", JSON.stringify(data));

  mainModal.style.display = "none";
  createElement();
});
