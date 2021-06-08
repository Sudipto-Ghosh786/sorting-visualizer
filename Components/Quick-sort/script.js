
/*************                QUICK SORT                    ***********/

async function getPivot(start, end) {
    let el = heights[end].magnitude;
    let pos = start - 1;
    for(let i = start;i <= end - 1;i++) {

      setDifColorToStroke(heights[i].x, heights[i].y, "lime");
      setDifColorToStroke(heights[pos + 1].x, heights[pos + 1].y, "lime");

      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, speed);
      });

      if(heights[i].magnitude <= el) {
        pos++;
        swap(pos, i);
      }
      draw();
    }
    swap(pos + 1, end);
    return (pos + 1);
}

async function quickSort(start, end) {
  if(start < end) {
    let pos = await getPivot(start, end);
    await quickSort(start, pos - 1);
    await quickSort(pos + 1, end);
    draw();
  }
}

async function quickSortUtil() {
  disableOtherThan("Quick Sort");
  await quickSort(0, heights.length - 1);
  enableAll();
  draw();
}

drawOnce();
draw();