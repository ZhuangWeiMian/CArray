function CArray() {
    this.dataStore = [];
    this.pos = 0;
    this.setData = setData;
    this.length = parseInt(arguments[0]);
    this.gaps = [3, 1];
}

function setData() {
    for (var i = 0; i < this.length; i++) {
        var item = Math.floor(Math.random() * (this.length + 1));
        this.dataStore.push(item);
    }
}
CArray.prototype.swap = function (arr, index1, index2) {
    var item = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = item;
}
CArray.prototype.toString = function () {
    var str = '';
    for (var i = 0; i < this.length; i++) {
        if (i % 10 == 9) {
            str += this.dataStore[i] + ' ' + '\n';
        } else {
            str += this.dataStore[i] + ' ';
        }
    }
    return str;
}
CArray.prototype.bubbleSort = function () {
    for (var j = 1; j < this.length; j++)
        for (var i = 0; i < this.length - j; i++) {
            if (this.dataStore[i] > this.dataStore[i + 1]) this.swap(this.dataStore, i, i + 1);
        }
}
CArray.prototype.selectionSort = function () {
    for (var j = 0; j < this.length - 1; j++) {
        var min = j;
        for (var i = j + 1; i < this.length; i++) {
            if (this.dataStore[min] > this.dataStore[i]) {
                min = i;
            }
        }
        this.swap(this.dataStore, j, min);
    }
}
CArray.prototype.setGaps = function (arr) {
    this.gaps = arr;
}

// 跑到前面，只跟在他前面的数进行对比
// 比如第一个就是只跟第0个比较，第n就是跟前面n-1个数比较，不跟在他后面的数比较
CArray.prototype.insertionSort = function () {
    var temp, inner;
    for (var outer = 1; outer < this.length; outer++) {
        temp = this.dataStore[outer];
        inner = outer;
        while (inner > 0 && (this.dataStore[inner - 1] >= temp)) {
            this.dataStore[inner] = this.dataStore[inner - 1];
            --inner;
        }
        this.dataStore[inner] = temp;
    }
}
CArray.prototype.shellSort = function () {
    for (var g = 0; g < this.gaps.length; g++) {
        for (var i = this.gaps[g]; i < this.dataStore.length; ++i) {
            // 假设间距为3， 则第三个与第0个做比较，
            // 比较第6个与第3个，若第6个小于第3个则交换位置，再与第0个做比较
            // 若第9个小于第6个，则9， 6交换位置，之后重复进行第二步操作
            while (i >= this.gaps[g] && this.dataStore[i - this.gaps[g]] > this.dataStore[i]) {
                this.swap(this.dataStore, i, i - this.gaps[g]);
                i -= this.gaps[g];
            }
        }

    }
}

CArray.prototype.shellSort1 = function () {
    var N = this.dataStore.length;
    var h = 1;
    while (h < N / 3) {
        h = 3 * h + 1;
    }
    while (h >= 1) {
        for (var i = h; i < this.dataStore.length; i++) {
            while (i >= h && this.dataStore[i - h] > this.dataStore[i]) {
                this.swap(this.dataStore, i, i - h);
                i -= h;
            }
        }
        h = (h - 1) / 3;
    }
}

CArray.prototype.mergeSort = function () {
    var step = 1;
    // 每次两组两组的合并
    while (step < this.length) {
        var left = 0;
        var right = step;
        while (right + step < this.length) {
            this.mergeArrays(this.dataStore, left, left + step, right, right + step);
            left = right + step;
            right = left + step;
        }
        if (right < this.length) {
            this.mergeArrays(this.dataStore, left, left + step, right, this.length);
        }
        step *= 2;
    }
}
CArray.prototype.mergeArrays = function (arr, leftStart, leftStop, rightStart, rightStop) {
    var leftArr = [];
    var rightArr = [];
    for(var k = leftStart; k < leftStop; k++) {
        leftArr.push(arr[k]);
    }

    for(var j = rightStart; j < rightStop; j++) {
        rightArr.push(arr[j]);
    }
    // 进入两个无穷大，即在永远不会超过数组 leftArr 和 rightArr的长度
    leftArr.push(Infinity);
    rightArr.push(Infinity);
    var m = 0;
    var n = 0;
    for (var k = leftStart; k < rightStop; k++) {
        if (leftArr[m] > rightArr[n]) {
            arr[k] = rightArr[n];
            n++;
        } else {
            arr[k] = leftArr[m];
            m++;
        }
    }
}

// // 未排序
// [1, 3, 2, 5, 9, 10, 20]
// // 创建只有一个元素的数组，inf作为占位，区分左元素和右元素
// [1, inf], [3, inf], [2, inf], [5, inf], [9, inf], [10, inf], [10, inf], [20, inf]
// // 两个两个合并，inf也合并
// [1, 3, inf], [2, 5, inf], [9, 10, inf], [10, 20, inf]
// [1, 2, 3, 5, inf], [9, 10, 10, 20, inf]
// [1, 2, 3, 5, 9, 10, 10, 20]

function quickSort() {
    var arr = arguments[0];
    if(arr.length == 0) {
        return [];
    }
    var middle = arr[0];
    var greater = [];
    var lesser = [];
    for(var i = 1; i < arr.length; i++) {
        if(arr[i] < middle) {
            lesser.push(arr[i]);
        } else {
            greater.push(arr[i]);
        }
    }
    return quickSort(lesser).concat(middle, quickSort(greater));
}

var a = new CArray(10);
a.setData();
console.log(a.toString());
a.dataStore = quickSort.call(a, a.dataStore);
console.log(a.toString());

