/*************                INSERTION SORT                ************/

async function insertionSort() {
    disableOtherThan("Insertion Sort");
    for(let i = 0;i < heights.length;i++) {
      let k = i - 1;
      let val = heights[i].magnitude;
      let axis = heights[i].y;
      while(k >= 0 && val < heights[k].magnitude) {
        setDifColorToStroke(heights[i].x, heights[i].y, "lime");
        setDifColorToStroke(heights[k].x, heights[k].y, "lime");
        await new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, speed);
        });
        heights[k + 1].y = heights[k].y;
        heights[k + 1].magnitude = heights[k].magnitude;
        k--;
        draw();
      }
      heights[k + 1].magnitude = val;
      heights[k + 1].y = axis;
      draw();
    }
    enableAll();
}

drawOnce();
draw();