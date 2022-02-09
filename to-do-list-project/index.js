function addItemToList() {
  console.log("Button was clicked, updating the list...");
  let myLocalStorage = window.localStorage;
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let currItem = [title, description];
  if (title.length == 0) {
    alert("Title cannot be empty, please try again");
    return;
  }
  if (myLocalStorage.getItem("myList") == null) {
    myLocalStorage.setItem("myList", JSON.stringify([currItem]));
  } else {
    let myList = myLocalStorage.getItem("myList");
    myList = JSON.parse(myList);
    myList.push(currItem);
    myLocalStorage.setItem("myList", JSON.stringify(myList));
  }
  document.location.reload();
}

function removeItemFromList(index) {
  let myList = JSON.parse(localStorage.getItem("myList"));
  myList.splice(index, 1);
  localStorage.setItem("myList", JSON.stringify(myList));
  showList();
}

function showList() {
  let myLocalStorage = window.localStorage;
  if (myLocalStorage.getItem("myList") != null) {
    let myList = myLocalStorage.getItem("myList");
    myList = JSON.parse(myList);
    let tableBody = document.getElementById("tableBody");
    let body = "";
    for (let index = 0; index < myList.length; index++) {
      body += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${myList[index][0]}</td>
            <td>${myList[index][1]}</td>
            <td><button class="btn btn-primary" id="deleteItem" onclick="removeItemFromList(${index})">
            Delete</button></td>
          </tr>`;
    }
    tableBody.innerHTML = body;
  }
}

function clearList() {
  if (confirm("Are you sure you want to clear the list?")) {
    localStorage.clear();
    document.location.reload();
  }
}

showList();

let buttonClick = document.getElementById("click");
buttonClick.addEventListener("click", addItemToList);

let clearButtonClick = document.getElementById("clear");
clearButtonClick.addEventListener("click", clearList);
