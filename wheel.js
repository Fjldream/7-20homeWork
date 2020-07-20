/*无缝轮播图
    windows 要放入轮播图的容器或者是窗口 //选择器
    opts  json格式  要实现轮播图的各种选项
          img        Array   包含轮播图图片的地址
          links      Array   指的是图片链接的地址
          imgColor   Array   图片的颜色用于全屏显示的颜色拼接
          imgSize    Array   [,] 第一个参数代表宽度,第二个参数代表高度
          btnColor   String  按钮的颜色
          btnActive  String  获得焦点的按钮的颜色
          btnWidth   Number  按钮大小的宽度
          btnHeight  Number  按钮功能的高度
          btnMargin  Number  按钮之间的间距
          btnPos     Array   第一个参数代表的是x方向上的位置  第二个参数代表y方向上的位置

    runOpts json格式 动画的各种选项
          time       Number  轮播的间隔时间  单位   /秒
          runStyle   String  字符串有三种便利的方法"in"-Tween.Quad.easeIn "out"-Tween.Quad.easeOut "linear"-Tween.Linear
                             或者直接输入函数的名字
            如下：Linear：无缓动效果(匀速运动)；
			Quad：二次方的缓动；
			Cubic：三次方的缓动
			Quartic：四次方的缓动；
			Quintic：五次方的缓动；
			Sinusoidal：正弦曲线的缓动；
			Exponential：指数曲线的缓动；
			Circular：圆形曲线的缓动；
			Elastic：指数衰减的正弦曲线缓动；
			Back：超过范围的三次方缓动）；
			Bounce：指数衰减的反弹缓动。
			Tween.Circular.easeIn

			每个效果都分三个缓动方式（方法），分别是：
			easeIn：从0开始加速的运动；
			easeOut：减速到0的运动；
			easeInOut：前半段从0开始加速，后半段减速到0的运动。
*/
/*
    示例：
    wheel(".window", {
            imgs: ["img/1.jpg", "img/2.jpg", "img/3.jpg"],
            links: ["http://baidu.com", "http://sxeku.com", "http://baidu.com"],
            imgColor: ["rgb(232,232,232)", "rgb(247,75,28)", "rgb(243,78,19)"],
            imgSize: [1130, 500],
            btnColor: "cadetblue",
            btnActive: "rgb(4, 51, 53)",
            btnWidth: 100,
            btnHeight: 10,
            btnMargin: 20,
            btnPos: ["center", "10"]
        }, {
            time: 3,
            runStyle: "linear"
        })
*/
function wheel(wins, opts, runOpts) {
    //参数的初始化
    var wins = document.querySelector(wins);
    if (!(wins && wins.nodeType == 1)) {
        console.error("窗口元素no find!")
        rturn;
    }
    //图片最后加一个轮播图
    opts.imgs.push(opts.imgs[0]);
    //图片链接添加一个
    opts.links.push(opts.links[0]);
    //图片背景颜色添加一个
    opts.imgColor.push(opts.imgColor[0]);
    // 轮播图个数加一 
    var imgLength = opts.imgs.length;
    if (imgLength == 0) {
        console.error("没有传入相应的轮播内容!");
        return;
    }
    console.log("imgLength:" + imgLength);
    //初始化图片大小判断 
    var imgSize = opts.imgSize;
    if (!(imgSize instanceof Array)) {
        console.error("请传入合法的尺寸类型")
    }
    if (imgSize.length == 0) {
        imgSize[0] = document.documentElement.clientWidth;
        imgSize[1] = 400;
    }
    if (imgSize.length == 1) {
        imgSize.push(500);
    }

    if (imgSize.some(function (val) {
            return val == 0;
        })) {
        for (var i = 0; i < 2; i++) {
            if (imgSize[i] == 0) {
                imgSize[i] = 500;
            }
        }
    }
    console.log("imgSize   [" + imgSize + "]");
    // 初始化按钮
    var btnColor = opts.btnColor || "green";
    var btnActive = opts.btnActive || "red";
    var btnPos = opts.btnPos || ["center", "20"];
    var btnWidth = opts.btnWidth || 50;
    var btnMargin = opts.btnMargin || 20;
    var btnHeight = opts.btnHeight || 10;
    var tim = runOpts.time || 5;
    var time = tim * 1000;
    var runStyle = null;
    var eachTime = runOpts.eachTime * 1000 || 500;
    console.log("time :" + time);
    if (runOpts.runStyle == "linear" || runOpts.runStyle) {
        runStyle = Tween.Linear
    }
    if (runOpts.runStyle == "in") {
        runStyle = Tween.Quad.easeIn
    }
    if (runOpts.runStyle == "out") {
        runStyle = Tween.Quad.easeOut
    }
    if (runOpts.runStyle != "linear" && runOpts.runStyle != "in" && runOpts.runStyle != "out") {
        runStyle = runOpts.runStyle
    }
    console.log(runStyle);
    console.log(time);
    // 创建html结构和样式
    // 1.wins容器窗口的样式
    wins.style.cssText = "width:100%;height:" + imgSize[1] + "px;overflow:hidden;position:relative;border:1px solid red;";
    // 2. 添加容器
    var box = document.createElement("div");
    box.style.cssText = "width:" + imgLength * 100 + "%;height:100%;";
    wins.appendChild(box);
    // 创建每一个轮播图
    for (var i = 0; i < imgLength; i++) {
        var divList = document.createElement("div");
        divList.style.cssText = `float:left;
        width:${100 / imgLength}%;
        height:100%;
        
        background:${opts.imgColor[i]}`; //${变量}
        box.appendChild(divList); //
        //图片底下的链接
        var link = document.createElement("a");
        link.href = opts.links[i];
        link.style.cssText = "width:" + imgSize[0] + "px;height:" + imgSize[1] + "px;display:block;margin:auto;background:url(" + opts.imgs[i] + ") no-repeat 0 0";
        divList.appendChild(link); //

    }
    // //创建按钮 可以改
    console.log(btnWidth + btnMargin);
    var btnWidthNum = (btnWidth + btnMargin) * (imgLength - 1);
    console.log(btnWidthNum);
    var btnBox = document.createElement("div");
    btnBox.style.cssText = "width:" + btnWidthNum + "px;height:" + btnHeight + "px;position:absolute;left:0;right:0;margin:auto;bottom:" + btnPos[1] + "px;";
    var btns = [];
    //for循环创建按钮
    for (var i = 0; i < imgLength - 1; i++) {
        var bgcolor = "";
        if (i == 0) {
            bgcolor = btnActive;
        } else {
            bgcolor = btnColor;
        }
        //第一个是选中状态的
        console.log(bgcolor);
        var btn = document.createElement("div");
        btn.style.cssText = "width:" + btnWidth + "px;height:" + btnHeight + "px;background:" + bgcolor + ";float:left;margin:0 " + btnMargin / 2 + "px;cursor:pointer;"
        btnBox.appendChild(btn);
        btns.push(btn);
    }
    wins.appendChild(btnBox);
    //进行图片轮播
    //获得轮播的移动长度
    var winW = parseInt(getComputedStyle(wins, null).width);
    var num = 0;
    //运动函数
    function move() {
        //每次轮播加一次
        num++
        //运动到最后一张的处
        if (num > btns.length - 1) {
            animate(box, {
                "margin-left": -num * winW
            }, eachTime, runStyle, function () {
                box.style.marginLeft = 0;
            });
            //位置回拨到第一张
            num = 0; //js特性 单线程异步机制语言
            // 用js单线程实现多线程 
        } else {
            animate(box, {
                "margin-left": -num * winW
            }, eachTime, runStyle);
        }
        //轮播按钮的变化
        for (var i = 0; i < btns.length; i++) {
            btns[i].style.backgroundColor = btnColor;
        }
        btns[num].style.backgroundColor = btnActive;

    }
    //
    var t = setInterval(move, time);

    for (let i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
            num = i;
            animate(box, {
                "margin-left": -num * winW
            }, eachTime, runStyle);
            for (var j = 0; j < btns.length; j++) {
                btns[j].style.backgroundColor = btnColor;
            }
            btns[num].style.backgroundColor = btnActive;
        }
    }

    //鼠标的移入 时间里面最复杂的一个事件
    wins.onmouseover = function () {
        clearInterval(t);
    }
    wins.onmouseout = function () {
        t = setInterval(move, time);
    }
}