/************               SELECTION SORT                   ****************/
async function selectionSort() {
  disableOtherThan("Selection Sort");
  for(let i = 0;i < heights.length;i++) {
    let minPos = i;
    let minValue = heights[i].magnitude;
    for(let j = i + 1;j < heights.length;j++) {
      setDifColorToStroke(heights[i].x, heights[i].y, "lime");
      setDifColorToStroke(heights[j].x, heights[j].y, "lime");
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, speed);
      });
      let value = heights[j].magnitude;
      if(value < minValue) {
        minPos = j;
        minValue = value;
      }
      draw();
    }
    console.log(minPos + " " + minValue);
    setDifColorToStroke(heights[minPos].x, heights[minPos].y, "red");
    setDifColorToStroke(heights[i].x, heights[i].y, "red");
    swap(i, minPos);
    draw();
  }
  enableAll();
}

drawOnce();
draw();