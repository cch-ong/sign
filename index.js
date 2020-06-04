'use strict'

const canvas = document.getElementById('can');
const ctx = canvas.getContext('2d');
let start_x, start_y;
const pathArr = []; // 存储path每一条路径的数组
let pathIndex = 0; // 标记当前路径的索引
let pointNum = 0; // 记录每一条路径的点的个数
let color; // 画笔颜色
let padding = 15;

canvas.addEventListener('mousedown', function (e) {
    [start_x, start_y] = [e.offsetX, e.offsetY];
    let path = new Path2D();
    pathArr.push(path);
    let [r, g, b] = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
    color = `rgb(${r}, ${g}, ${b})`;
    canvas.onmousemove = function (e2) {
        drawing(e2, path);
        pointNum += 1;
    };
})

document.body.addEventListener('mouseup', function () {
    if (canvas.onmousemove) {
        canvas.onmousemove = null;
        pathIndex += 1;
        pointNum = 0;
    }
})

document.body.addEventListener('mousemove', function (e) {
    if (e.offsetX < padding || e.offsetY < padding || e.offsetX > this.offsetWidth - padding || e.offsetY > this.offsetHeight - padding) {
        if (canvas.onmousemove) {
            canvas.onmousemove = null;
            pathIndex += 1;
            pointNum = 0;
        }
    }
})

function drawing (e, path) {
    let [endX, endY] = [e.offsetX, e.offsetY];
    if (pointNum === 0) {
        path.moveTo(start_x, start_y);
    } else {
        path.lineTo(endX, endY);
    }
    ctx.strokeStyle = color;
    ctx.stroke(pathArr[pathIndex]);
}
