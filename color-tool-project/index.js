const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");
const slider = document.getElementById("slider");
const sliderText = document.getElementById("sliderText");
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");

const isValidHex = (hex) => {
  if (!hex) return false;
  if (hex[0] === "#") hex = hex.slice(1);
  if (!(hex.length === 3 || hex.length === 6)) return false;
  for (const ch of hex) {
    let flag = ch >= "a" && ch <= "f";
    flag = flag | (ch >= "0" && ch <= "9");
    if (!flag) return false;
  }
  return true;
};

const reset = () => {
  slider.value = 0;
  sliderText.textContent = "0%";
  alteredColorText.textContent = "Altered Color";
  alteredColor.style.backgroundColor = "white";
  inputColor.style.backgroundColor = "white";
};

const setup = (color) => {
  slider.value = 0;
  sliderText.textContent = "0%";
  alteredColorText.textContent = "Altered Color";
  color = (color[0] === "#" ? "" : "#") + color;
  inputColor.style.backgroundColor = color;
  alteredColor.style.backgroundColor = color;
  alteredColorText.textContent = "Altered Color " + color;
};

function helper() {
  const color = hexInput.value.toLowerCase();
  if (isValidHex(color)) {
    setup(color);
  } else {
    reset();
  }
}

hexInput.addEventListener("input", helper);

toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("toggled");
  lightenText.classList.toggle("unselected");
  darkenText.classList.toggle("unselected");
  helper();
});

const hexToDecimal = (hex) => {
  if (hex.length === 1) {
    hex += hex;
  }
  return parseInt(hex, 16);
};

const convertHexToRGB = (hex) => {
  let len = 2;
  if (hex.length === 3) len = 1;
  const r = hexToDecimal(hex.substring(0, len));
  const g = hexToDecimal(hex.substring(len, 2 * len));
  const b = hexToDecimal(hex.substring(2 * len, 3 * len));
  return { r, g, b };
};

const convertRGBToHex = (r, g, b) => {
  let ans = "#";
  for (const color of [r, g, b]) {
    let hexValue = color.toString(16);
    if (hexValue.length === 1) hexValue = "0" + hexValue;
    ans += hexValue;
  }
  return ans;
};

const increaseWithin0To255 = (hex, amount) => {
  return Math.min(255, Math.max(0, hex + amount));
};

const alterColor = (hex, percentage) => {
  const { r, g, b } = convertHexToRGB(hex);
  const amount = Math.floor((percentage / 100) * 255);
  const newR = increaseWithin0To255(r, amount);
  const newG = increaseWithin0To255(g, amount);
  const newB = increaseWithin0To255(b, amount);
  return convertRGBToHex(newR, newG, newB);
};

slider.addEventListener("input", () => {
  let color = hexInput.value;
  if (!isValidHex(color)) return;
  if (color[0] === "#") color = color.slice(1);
  sliderText.textContent = `${slider.value}%`;
  const valueAddition = toggleBtn.classList.contains("toggled")
    ? -slider.value
    : slider.value;
  const alteredHex = alterColor(color, valueAddition);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`;
});
