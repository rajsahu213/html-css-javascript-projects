let count = 0;
let countEl = document.getElementById("count-el");
let firstSave = true;

function increment() {
  count++;
  countEl.textContent = count;
}

function decrement() {
  if (count > 0) {
    count--;
    countEl.textContent = count;
  }
}

function clearCount() {
  if (confirm("Are you sure you want to clear?")) {
    count = 0;
    countEl.textContent = count;
  }
}

function saveCount() {
  let previousEntries = document.getElementById("previous-entries");
  let text = (firstSave ? "" : " - ") + count;
  firstSave = false;
  previousEntries.textContent += text;
}
