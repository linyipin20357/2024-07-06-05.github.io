let imgs = [];
let positions = [];
let speeds = [];
let xOffsets = [];
let xSpeeds = [];
let startAnimation = false;
let userText = '';
let numImages = 2; // 图片数量

let bgImage;
let say_something = "";

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
  }

  // 启动语音识别
  speechRecognition();
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
      let textArray = userText.split('');
      for (let j = 0; j < textArray.length; j++) {
        fill(0);
        textSize(65);
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

function startAnimationFunction() {
  // 开始动画
  if (say_something !== '') {
    userText = say_something;
    startAnimation = true;
  }
}

function speechRecognition() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("本浏览器不支持语音识别，请更换浏览器！（Chrome 25 版以上才支持语音识别）");
  } else {
    window._recognition = new webkitSpeechRecognition();
    window._recognition.continuous = true;
    window._recognition.interimResults = true;
    window._recognition.lang = "cmn-Hant-TW";
    window._recognition.onstart = function() {
      window._recognition.status = true;
      console.log("Start recognize...");
    };
    window._recognition.onend = function() {
      console.log("Stop recognize");
      if (window._recognition.status) 
        window._recognition.start();
    };
    window._recognition.onresult = function(event) {
      let result = {};
      result.resultLength = event.results.length - 1;
      result.resultTranscript = event.results[result.resultLength][0].transcript;
      say_something = "？？？";
      if (event.results[result.resultLength].isFinal === false) {
        say_something = result.resultTranscript;
      } else if (event.results[result.resultLength].isFinal === true) {
        say_something = result.resultTranscript;
        startAnimationFunction(); // 语音输入确认后开始动画
      }
      // 注释掉以下行以避免错误
      // document.getElementById("msg").innerHTML = say_something;
    };
    window._recognition.start();
  }
}
