/****************                 MERGE SORT                    **************/
async function merge(start, mid, end) {
  let i = start;
  let j = mid + 1;
  let temp = [null];
  let pos = 0;
  while(i <= mid && j <= end) {

    setDifColorToStroke(heights[i].x, heights[i].y, "lime");
    setDifColorToStroke(heights[j].x, heights[j].y, "lime");
    if(heights[i].magnitude < heights[j].magnitude) {
      temp[pos] = {first: heights[i].magnitude, second: heights[i].y};
      i++;
    }else{
      temp[pos] = {first: heights[j].magnitude, second: heights[j].y};
      j++;
    }
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
        draw();
      }, speed);
    })
    pos++;
  }

  while(i <= mid) {
    temp[pos] = {first: heights[i].magnitude, second: heights[i].y};
    i++;
    pos++;
  }

  while(j <= end) {
    temp[pos] = {first: heights[j].magnitude, second: heights[j].y};
    j++;
    pos++;
  }

  for(let k = start;k <= end;k++) {
    heights[k].magnitude = temp[k - start].first;
    heights[k].y = temp[k - start].second;
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
        draw();
      }, speed);
    })
  }

  draw();
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function mergeSort(start, end) {
  if(start < end){
    let val = (start + end) / 2;
    let mid = Math.floor(val);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
  }else{
    return;
  }
}

async function mergeSortUtil() {

  disableOtherThan("Merge Sort");
  await mergeSort(0, heights.length - 1);
  enableAll();
}
drawOnce();
draw();