var comic = $(".comics");
var error = $(".over");
var content = $(".content");
var dot = $(".flex-dot");
var dt = 0;
var speedplus = 3;

var one = document.getElementById('dot1');
var two = document.getElementById('dot2');
var three = document.getElementById('dot3');
var four = document.getElementById('dot4');
var five = document.getElementById('dot5');

var choice = $(".choice");
var isPhone = detectmob();
var choose = null, mouse = false, speed = 5000, cspeed = 1;
var startX = startY = endX = endY = 0;
var main = $("#main");
var end = $("#end");
var leftchoice = $("#correct");
var rightchoice = $("#wrong");
var story = document.querySelector("#main");
var over = document.querySelector("#end");
var correct = document.querySelector(".correct");
var wrong = document.querySelector(".wrong");

// 以下變數用於畫面自動捲動
var bAutoScrolling = false;
var ScrollingTime = 0; // 自動捲動的時間
var ScrollingID = 0;
var ElapsedTime = 0; // 自動捲動經過的時間   
var curDistance = 0; // 只要記錄 Y 軸移動的前一個位置
var ScrollingDir = -1; // 正往上，負往下
var halfPI = 1.5707963; // PI/2
var ScrollingDist = 30;  // 自動移動的單位時間的移動單位 30 Pixels
var MaxScrollingTime = 30;  // 自動捲動的最大秒數：單位是 3秒 * 1000(毫秒)/ 100(移動距離 100 pixels 為 1)
var MovingThreshold = 5;  // 最後一次滑動最大啟動自動捲動的像素值
//---------------------------
// 修正最後出現點點點的 BUG
var bShowDot = false;
var displayDotStep = 0;
var displayDotStart = 0;
var curBottomPos = 0;
var numDotOn = 0;
//---------------------------

getWidth();
mouseRead();
touchRead();
Getdot();

//設定寬度
function getWidth(event){
    var scaleimg = $(window).width()/148;  //148為原先選項的圖片寬度
    if(isPhone){
        var dWidth = $(window).width();
        comic.width(dWidth);
        content.width(dWidth);
        choice.width(dWidth);
        dot.width(dWidth);
    }
    else{
        comic.width("375px");
        content.width("375px");
        dot.width("375px");
    }
}

//偵測是否為手機
function detectmob() { 
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}

function Getdot(){
    dot1.style.display = 'none';
    dot2.style.display = 'none';
    dot3.style.display = 'none';
    dot4.style.display = 'none';
    dot5.style.display = 'none';
}

function Init(){
    choose = null;
    mouse = false;
    startX = startY = endX = endY = 0;
    comic.css("display","block");
    error.css("display","none");
    main.css("top",0);
    end.css("top",0);
    dt = 0;
    leftchoice.css("display","none");
    rightchoice.css("display","none");
    leftchoice.css("left","-0px");
    rightchoice.css("left","1px");
}

function nextStory(){

    document.location.href="ch01_15.html";
}

function gameOver(){
    choose = null;
    mouse = false;
    startX = startY = endX = endY = 0;
    comic.css("display","none");
    error.css("display","block");
    main.css("top",0);
    leftchoice.css("display","none");
    rightchoice.css("display","none");
    leftchoice.css("left","-0px");
    rightchoice.css("left","1px");
}

//電腦指令
function mouseRead(){
    window.addEventListener('mousedown',function(event){
        event.preventDefault(); //防止預設觸控事件
        //----------- 自動捲動
        if (bAutoScrolling == true) { // 當手碰到螢幕時，如果再自動捲動狀態則結束自動捲動
            clearInterval(ScrollingID);
            ElapsedTime = 0;
            bAutoScrolling = false;
        }
        //----------- 自動捲動
    }, {passive: false});

    window.addEventListener('mousemove', function (event) {
        switch (choose) {
            //主軸故事
            case 'story':
                var pos = main.offset();
                // endX = event.screenX;
                endY = event.screenY;
                // var distanceX = (endX - startX);
                var distanceY = (endY - startY);
                if (mouse && startY != Math.abs(distanceY) && event.buttons == 1) {
                    if (distanceY < 0) {
                        main.offset({ top: pos.top + distanceY - speedplus });
                        // ----------  修正 dot 顯示的問題
                        displayDotStep = $(window).height() / (5*6); // 分成六等份
                        displayDotStart = (-main.height() + $(window).height()) - $(window).height() / 5;
                        curBottomPos = main.position().top + distanceY;

                        if (curBottomPos < displayDotStart) {
                            //console.log(curBottomPos);
                            // 根據 main.position().top + distanceY 所在的位置，設定不同 dot 的顯示狀態
                            bShowDot = true; // 顯示 dot
                            var t = Math.ceil((displayDotStart - curBottomPos) / displayDotStep);
                            if (numDotOn != t) // 只要目前顯示的跟所在位置應顯示的 dot 數目不同就更新
                            {
                                if (t != 6) {
                                    displayDots(t); numDotOn = t;
                                }
                                else {  // 轉換到下一章
                                    nextStory();
                                }
                            }
                        }
                        // --------------------------------------
                    }
                    else if(distanceY > 0){
                        if (main.position().top + distanceY < 0) {
                            main.offset({ top: pos.top + distanceY + speedplus });

                             // ----------  修正 dot 顯示的問題
                            displayDotStep = $(window).height() / (5 * 6); // 分成六等份
                            displayDotStart = (-main.height() + $(window).height()) - $(window).height() / 5;
                            curBottomPos = main.position().top + distanceY;

                            if (curBottomPos < displayDotStart) {
                                if (curBottomPos < displayDotStart) {
                                    // 根據 main.position().top + distanceY 所在的位置，設定不同 dot 的顯示狀態
                                    // 進入 dot 顯示狀態
                                    bShowDot = true;
                                    var t = Math.ceil((displayDotStart - curBottomPos) / displayDotStep);
                                    if (numDotOn != t) // 代表目前 Dot 顯示不足，操作者往下捲動
                                    {
                                        if (t != 6) {
                                            displayDots(t); numDotOn = t;
                                        }
                                        else {  // 轉換到下一章
                                            nextStory();
                                        }
                                    }
                                }
                            }
                            else {
                                if (bShowDot == true) {  // 檢查是否在 bShowDot 狀態
                                    dot1.style.display = 'none';
                                    dot2.style.display = 'none';
                                    dot3.style.display = 'none';
                                    dot4.style.display = 'none';
                                    dot5.style.display = 'none';
                                    dt = 0; bShowDot = false;
                                }
                            }
                            // --------------------------------------
                        }
                    }
                    startY = endY;
                    curDistance = distanceY;  // ----------- 自動捲動，紀錄這次的移動距離為
                }
                break;

            
        }
    });

    window.addEventListener('mouseup',function(event){
        choose = null;
        mouse = false;
        startX = startY = endX = endY = 0;
        // ----------- 自動捲動
        // 當手指離開時，將目前的移動距離，當成最後一次的移動距離
        // 根據正負方向與移動距離，計算自動撥放的時間長度
        // 負數往下，正數往上
        // 透過在指定的時間內呼叫 autoscrolling 函式，來實現自動滑動
        // 以 cos(時間) 值作為自動滑動的移動距離 
        //  
        var distance = Math.abs(curDistance);
        if (distance >= MovingThreshold) { // 移動超過 MovingThreshold 才自動捲動
            if (curDistance < 0) ScrollingDir = -1;
            else ScrollingDir = 1;
            bAutoScrolling = true;
            ScrollingTime = MaxScrollingTime * distance;
            ScrollingID = setInterval(autuScrolling, 16.66667, 16.66667);
        }
        // ----------- 自動捲動
    },false);

    story.addEventListener('mousedown',function(event){
        // event.preventDefault();
        mouse = true;
        startX = event.screenX;
        startY = event.screenY;
        choose = 'story';
    }, false);

    
}

//手機指令
function touchRead(){
    window.addEventListener('touchmove',function(event){
        event.preventDefault(); //防止預設觸控事件
        //----------- 自動捲動
        if (bAutoScrolling == true) { // 當手碰到螢幕時，如果再自動捲動狀態則結束自動捲動
            clearInterval(ScrollingID);
            ElapsedTime = 0;
            bAutoScrolling = false;
        }
        //----------- 自動捲動
    }, {passive: false});

    window.addEventListener('touchmove',function(event){
        var touch = event.targetTouches[0];
        switch(choose){
            //主軸故事
            case 'story':
                var pos = main.offset();
                // endX = touch.screenX;
                endY = touch.screenY;
                // var distanceX = (endX - startX);
                var distanceY = (endY - startY);
                if(startY != Math.abs(distanceY)){
                    if(distanceY < 0){
                        if(distanceY < -20){
                            main.offset({top:pos.top + distanceY-20});
                        }
                        main.offset({ top: pos.top + distanceY - speedplus });
                        // ----------  修正 dot 顯示的問題
                        displayDotStep = $(window).height() / (5 * 6); // 分成六等份
                        displayDotStart = (-main.height() + $(window).height()) - $(window).height() / 5;
                        curBottomPos = main.position().top + distanceY;

                        if (curBottomPos < displayDotStart) {
                            //console.log(curBottomPos);
                            // 根據 main.position().top + distanceY 所在的位置，設定不同 dot 的顯示狀態
                            bShowDot = true; // 顯示 dot
                            var t = Math.ceil((displayDotStart - curBottomPos) / displayDotStep);
                            if (numDotOn != t) // 只要目前顯示的跟所在位置應顯示的 dot 數目不同就更新
                            {
                                if (t != 6) {
                                    displayDots(t); numDotOn = t;
                                }
                                else {  // 轉換到下一章
                                    nextStory();
                                }
                            }
                        }
                        // --------------------------------------
                    }
                    else if(distanceY > 0){
                        if( main.position().top + distanceY < 0 ){
                            main.offset({ top: pos.top + distanceY + speedplus });
                            // ----------  修正 dot 顯示的問題
                            displayDotStep = $(window).height() / (5 * 6); // 分成六等份
                            displayDotStart = (-main.height() + $(window).height()) - $(window).height() / 5;
                            curBottomPos = main.position().top + distanceY;

                            if (curBottomPos < displayDotStart) {
                                if (curBottomPos < displayDotStart) {
                                    // 根據 main.position().top + distanceY 所在的位置，設定不同 dot 的顯示狀態
                                    // 進入 dot 顯示狀態
                                    bShowDot = true;
                                    var t = Math.ceil((displayDotStart - curBottomPos) / displayDotStep);
                                    if (numDotOn != t) // 代表目前 Dot 顯示不足，操作者往下捲動
                                    {
                                        if (t != 6) {
                                            displayDots(t); numDotOn = t;
                                        }
                                        else {  // 轉換到下一章
                                            nextStory();
                                        }
                                    }
                                }
                            }
                            else {
                                if (bShowDot == true) {  // 檢查是否在 bShowDot 狀態
                                    dot1.style.display = 'none';
                                    dot2.style.display = 'none';
                                    dot3.style.display = 'none';
                                    dot4.style.display = 'none';
                                    dot5.style.display = 'none';
                                    dt = 0; bShowDot = false;
                                }
                            }
                            // --------------------------------------
                        }
                    }
                    startY = endY;
                    curDistance = distanceY;  // ----------- 自動捲動，紀錄這次的移動距離為
                }
                break;
        }
    });

    window.addEventListener('touchend',function(event){
        switch(choose){
            //主軸故事
            case 'story':
                choose = null;
                startX = startY = endX = endY = 0;
                // ----------- 自動捲動
                // 當手指離開時，將目前的移動距離，當成最後一次的移動距離
                // 根據正負方向與移動距離，計算自動撥放的時間長度
                // 負數往下，正數往上
                // 透過在指定的時間內呼叫 autoscrolling 函式，來實現自動滑動
                // 以 cos(時間) 值作為自動滑動的移動距離 
                //  
                var distance = Math.abs(curDistance);
                if (distance >= MovingThreshold) { // 移動超過三個 pixel 才自動捲動
                    if (curDistance < 0) ScrollingDir = -1;
                    else ScrollingDir = 1;
                    bAutoScrolling = true;
                    ScrollingTime = MaxScrollingTime * distance; // 1.5 (sec) * 1000 *  distance / 100;
                    ScrollingID = setInterval(autuScrolling, 16.66667, 16.66667);
                }
                // ----------- 自動捲動
                break;
        }
    },false);

    story.addEventListener('touchstart',function(event){
        // event.preventDefault();
        var touch = event.targetTouches[0];
        startX = touch.screenX;
        startY = touch.screenY;
        choose = 'story';
    }, false);
}

function displayDots(ndot) {
    switch (ndot) {
        case 1:
            dot1.style.display = 'block' ;
            dot2.style.display = 'none';
            dot3.style.display = 'none';
            dot4.style.display = 'none';
            dot5.style.display = 'none';
            break;
        case 2:
            dot1.style.display = 'block';
            dot2.style.display = 'block';
            dot3.style.display = 'none';
            dot4.style.display = 'none';
            dot5.style.display = 'none';
            break;
        case 3:
            dot1.style.display = 'block';
            dot2.style.display = 'block';
            dot3.style.display = 'block';
            dot4.style.display = 'none';
            dot5.style.display = 'none';
            break;
        case 4:
            dot1.style.display = 'block';
            dot2.style.display = 'block';
            dot3.style.display = 'block';
            dot4.style.display = 'block';
            dot5.style.display = 'none';
            break;
        case 5:
            dot1.style.display = 'block';
            dot2.style.display = 'block';
            dot3.style.display = 'block';
            dot4.style.display = 'block';
            dot5.style.display = 'block';
            break;
    }
}

// 自動捲動控制
function autuScrolling(dTime) {
    var pos = main.offset();
    ElapsedTime = ElapsedTime + dTime;  // ElapsedTime 目前的總經過時間
    if (ElapsedTime >= ScrollingTime) { // 自動捲動結束
        clearInterval(ScrollingID);
        ElapsedTime = 0;
        bAutoScrolling = false;
    }
    else { // 自動捲動
        var cosValue = Math.cos(halfPI * ElapsedTime / ScrollingTime);
        var distY = ScrollingDir * cosValue * cosValue * cosValue * ScrollingDist; // 以 5 像素為單位
        //console.log(distY);
        if (ScrollingDir == -1) {
            if (main.position().top + distY > (-main.height() + $(window).height())) {
                main.offset({ top: pos.top + distY });
            }
        }
        else {
            if (main.position().top + distY < 0) {
                main.offset({ top: pos.top + distY });
            }
        }
    }
}