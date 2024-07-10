let imgs = [];
let positions = [];
let speeds = [];
let xOffsets = [];
let xSpeeds = [];
let startAnimation = false;
let userTexts = [];
let numImages = 5; // 图片数量

let bgImage;
let poems = ["萱草葉如絲，微風吹不知。", "夜來花影動，香隨夢境深。", "春日嬌羞笑，綠葉輕舞蓮。", "晨曦照萱影，清香滿庭間。", "雨後新生意，青青萱草綠。"];
let lastPoemIndices = []; // 记录上一次显示的诗句索引

function preload() {
  // 预载图片和背景图片
  for (let i = 0; i < numImages; i++) {
    imgs[i] = loadImage(`myImage${i}.png`);
  }
  bgImage = loadImage('Bg.jpg'); // 加载背景图片
}

function setup() {
  createCanvas(800, 780);
  background(0);

  // 初始化图片位置和速度
  for (let i = 0; i < numImages; i++) {
    positions[i] = height;
    speeds[i] = random(3, 0.5);
    
    // 使图片的 x 位置集中在画布的中间区域
    let centerOffset = width / 4;
    xOffsets[i] = centerOffset + (i * (width / 2) / (numImages - 1));
    xSpeeds[i] = random(-1, 1);
    
    // 随机选择一句诗作为 userText
    chooseRandomPoem(i);
  }

  startAnimation = true;
}

function draw() {
  background(0);

  // 绘制背景图片并保持在左上角
  image(bgImage, 0, 0, width, height);

  if (startAnimation) {
    // 绘制和移动图片
    for (let i = 0; i < numImages; i++) {
      xOffsets[i] += xSpeeds[i];
      if (xOffsets[i] < 0 || xOffsets[i] > width) {
        xSpeeds[i] *= -0.5;
      }

      imageMode(CORNER);
      image(imgs[i], xOffsets[i], positions[i], imgs[i].width / 2, imgs[i].height / 2);

      // 绘制文字（直式）
      let textArray = userTexts[i].split('');
      for (let j = 0; j < textArray.length; j++) {
        fill(0);
        textSize(25);
        textAlign(CENTER, CENTER);
        text(textArray[j], xOffsets[i], positions[i] - imgs[i].height / 10 + j * 32);
      }

      // 更新图片位置
      positions[i] -= speeds[i];
      if (positions[i] < 0) {
        positions[i] = height;
      }
    }
  } else {
    // 显示提示文字
    fill(92, 92, 92);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('請吟一首詩', width / 2, height - 700);
  }
}

function chooseRandomPoem(index) {
  let poemIndex = floor(random(poems.length));
  while (lastPoemIndices.includes(poemIndex)) {
    poemIndex = floor(random(poems.length));
  }
  userTexts[index] = poems[poemIndex];
  lastPoemIndices[index] = poemIndex;
}
