const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");
const speedTracker = document.getElementById("speed");
const sizeTracker = document.getElementById("size");
let speed = 20;
let heights = [null];
let numberOfElements = 0;
let fixedX = 0;
let divisor = 12;
let printNumberOverBars = false;

// pen.textAlign = 'center';


if(screen.width < 800) {
  canvas.width = screen.width - 50;
  numberOfElements = Math.floor(canvas.width / divisor);
  fixedX = 10;
  canvas.height = 440;
  speed = 100;
}else {
  numberOfElements = Math.floor(canvas.width / divisor);
  fixedX = 10;
}

pen.lineWidth = fixedX;

/***********                Button Work                   **********/
const buttonCollection = document.querySelectorAll(".button");
const resetButton = document.querySelector("#resetButton");

function changeSizeOfBlocks() {
  let sizeValue = Number(sizeTracker.value);
  divisor = sizeValue * 4;
  fixedX = divisor - 2;
  numberOfElements = Math.floor(canvas.width / divisor);
  pen.lineWidth = fixedX;
  if(!document.querySelector("#Number").checked) {
    printNumberOverBars = false;
  }
  resetAll();
}

function changeSpeed() {
  let currentValue = speedTracker.value;
  if(currentValue !== 1) {
    speed = currentValue * 10;
  }else {
    speed = 1;
  }
}

/******************************************************************/

function printNumbers(color) {
  for(let i = 0;i < numberOfElements;i++) {
    let x = heights[i].x;
    let y = heights[i].y;
    let val = heights[i].magnitude;
    pen.save();
    pen.fillStyle = color;
    pen.translate(x,y);
    pen.rotate(-0.5*Math.PI);
    pen.fillText(val, 3, 4, 500);
    pen.restore();
  } 
}


function showNumbers(checkbox) {
  if(fixedX < 7) {
    alert("Bar size is way smaller to display number ! Please increase the bar size !");
    checkbox.checked = false;
    printNumbers("black");
    return;
  }
  if(!checkbox.checked) {
    printNumberOverBars = false;
    printNumbers("black");
    return;
  }
  printNumberOverBars = true;
  printNumbers("yellow");
}

function drawOnce() {
  heights = [null];
  for(let i = 0;i < numberOfElements;i++) {
    let xAxis = i * divisor;
    let val = Math.floor(Math.random() * 400) + 1;
    let yAxis = (canvas.height - val);
    let coordinates = {
      x : xAxis + (canvas.width % divisor) + 1,
      y : yAxis,
      magnitude : (canvas.height - yAxis)
    };
    heights[i] = coordinates;
  }
}

function draw() {
  pen.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0;i < numberOfElements;i++) {
    let x = heights[i].x;
    let y = heights[i].y;
    let val = heights[i].magnitude;

    pen.strokeStyle = "#6c1db5";

    pen.beginPath();
    pen.moveTo(x, canvas.height);
    pen.lineTo(x, y);
    pen.stroke();
    pen.closePath();
  }
  if(printNumberOverBars && fixedX >= 7) {
    printNumbers("yellow");
  }
}

function swap(pos1, pos2) {
  let temp = heights[pos1].magnitude;
  heights[pos1].magnitude= heights[pos2].magnitude;
  heights[pos2].magnitude = temp;
  temp = heights[pos1].y;
  heights[pos1].y= heights[pos2].y;
  heights[pos2].y = temp;
}

function setDifColorToStroke(x, y, color) {
  pen.strokeStyle = color;
  pen.beginPath();
  pen.moveTo(x, canvas.height);
  pen.lineTo(x, y);
  pen.stroke();
  pen.closePath();
}

function disableOtherThan(name) {
  buttonCollection.forEach((element) => {
    element.disabled = true;
  })
  resetButton.disabled = true;
  sizeTracker.disabled = true;
}

function enableAll() {
  buttonCollection.forEach((element) => {
    if(element.name != name) {
      element.disabled = false;
    }
  })
  resetButton.disabled = false;
  sizeTracker.disabled = false;
}

function resetAll() {
  drawOnce();
  draw();
}