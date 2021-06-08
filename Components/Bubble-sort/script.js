/********               BUBBLE SORT                        ********/
async function bubbleSort() {
  let flag = 0;
  disableOtherThan("Bubble Sort");
  for(let i = 0;i < heights.length;i++) {
    for(let j = 0;j < heights.length - i - 1;j++) {
      let num1 = heights[j].magnitude;
      let num2 = heights[j + 1].magnitude;
      setDifColorToStroke(heights[j].x, heights[j].y, "lime");
      setDifColorToStroke(heights[j + 1].x, heights[j + 1].y, "lime");
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, speed);
      });

      if(num1 > num2) {
        swap(j, j + 1);
      }
      draw();
    }
    if(flag === 1) {
      break;
    }
  }
  draw();
  enableAll();
}

drawOnce();
draw();