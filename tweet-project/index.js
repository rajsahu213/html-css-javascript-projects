const submitBtn = document.querySelector("#submit");
const oldBgColor = window.getComputedStyle(submitBtn).backgroundColor;
const newBgColor = "rgb(185, 227, 247)";
const usernameInput = document.querySelector("#username");
const tweetInput = document.querySelector("#tweet");
const tweetList = document.querySelector("#tweet-list");

submitBtn.addEventListener("mouseover", (event) => {
  submitBtn.style.backgroundColor = newBgColor;
});

submitBtn.addEventListener("mouseout", (event) => {
  submitBtn.style.backgroundColor = oldBgColor;
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const username = usernameInput.value;
  const tweet = tweetInput.value;
  if (username.length === 0 || tweet.length === 0) {
    return;
  }
  tweetList.append(makeTweetElement(username, tweet));
  usernameInput.value = "";
  tweetInput.value = "";
});

function makeTweetElement(username, tweet) {
  const div = document.createElement("div");
  div.classList.add("tweet");
  const h3 = document.createElement("h3");
  h3.innerText = username;
  const p = document.createElement("p");
  p.innerText = tweet;
  const innerDiv = document.createElement("div");
  innerDiv.classList.add("icon-box");
  innerDiv.innerHTML = `<i class="fas fa-trash-alt icon trash-icon"></i>`;
  innerDiv.addEventListener("click", () => {
    div.remove();
  });
  innerDiv.style.display = "none";
  div.append(h3, p, innerDiv);
  div.addEventListener("mouseover", (event) => {
    div.lastElementChild.style.display = "block";
  });

  div.addEventListener("mouseout", (event) => {
    div.lastElementChild.style.display = "none";
  });
  return div;
}
