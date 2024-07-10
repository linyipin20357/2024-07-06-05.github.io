let imgs = [];
let positions = [];
let speeds = [];
let xOffsets = [];
let xSpeeds = [];
let startAnimation = false;
let userText = "";
let numImages = 5; // 图片数量

let bgImage;
let poems = [
  "萱草葉如絲，微風吹不知",
  "夜來花影動，香隨夢境深",
  "春日嬌羞笑，綠葉輕舞蓮",
  "晨曦照萱影，清香滿庭間",
  "雨後新生意，青青萱草綠"
];
let lastPoemIndex = -1; // 记录上一次显示的诗句索引

function preload() {
  // 预载图片和背景图片
  for (let i = 0; i < numImages; i++) {
    imgs[i] = loadImage(`myImage${i}.png`);日
