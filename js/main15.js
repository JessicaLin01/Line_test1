var comic = $(".comics");
var error = $(".over");
var content = $(".content");
var dot = $(".flex-dot");
var isPhone = detectmob();
var choose = null, mouse = false, speed = 5000, cspeed = 1;
var startX = startY = endX = endY = 0;
var main = $("#main");
var story = document.querySelector("#main");

// 以下變數用於畫面自動捲動
var bAutoScrolling = false;
var ScrollingTime = 0;
var ScrollingID = 0;
var ElapsedTime = 0;
var curDistance = 0; // 只要記錄 Y 軸移動的前一個位置
var ScrollingDir = -1; // 正往上，負往下
var halfPI = 1.5707963;
var ScrollingDist = 20;  // 自動移動的單位時間的移動單位
//---------------------------

getWidth();
mouseRead();
touchRead();

//設定寬度
function getWidth(event){
    var scaleimg = $(window).width()/148;  //148為原先選項的圖片寬度
    if(isPhone){
        var dWidth = $(window).width();
        comic.width(dWidth);
        content.width(dWidth);
    }
    else{
        comic.width("375px");
        content.width("375px");
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

//電腦指令
function mouseRead(){
    window.addEventListener('mousedown',function(event){
        event.preventDefault(); // 防止預設觸控事件
        //----------- 自動捲動
        if (bAutoScrolling == true) { // 當手碰到螢幕時，如果再自動捲動狀態則結束自動捲動
            clearInterval(ScrollingID);
            ElapsedTime = 0;
            bAutoScrolling = false;
        }
        //----------- 自動捲動
    }, {passive: false});

    window.addEventListener('mousemove',function(event){
        switch(choose){
            //主軸故事
            case 'story':
                var pos = main.offset();
                endY = event.screenY;              
                var disranceY = (endY - startY);              
                if(mouse && startY != Math.abs(disranceY) && event.buttons == 1){
                    if(disranceY < 0){
                        if(main.position().top + disranceY > (-main.height() + $(window).height())){
                            main.offset({top:pos.top + disranceY});
                        }
                    }
                    else if(disranceY > 0){
                        if(main.position().top + disranceY < 0){
                            main.offset({top:pos.top + disranceY});
                        }
                    }
                    startY = endY;
                    curDistance = disranceY;  // ----------- 自動捲動，紀錄這次的移動距離為
                }
                break; 
        }
    });
    window.addEventListener('mouseup', function (event) {
        choose = null;
        mouse = false;
        startX = startY = endX = endY = 0;
        switch(choose){
            //主軸故事
            case 'story':
                choose = null;
                mouse = false;
                startX = startY = endX = endY = 0;
                break;
        }
        // ----------- 自動捲動
        // 當手指離開時，將目前的移動距離，當成最後一次的移動距離
        // 根據正負方向與移動距離，計算自動撥放的時間長度
        // 負數往下，正數往上
        // 透過在指定的時間內呼叫 autoscrolling 函式，來實現自動滑動
        // 以 cos(時間) 值作為自動滑動的移動距離 
        //  
        var distance = Math.abs(curDistance);
        if (distance >= 3) { // 移動超過三個 pixel 才自動捲動
            if (curDistance < 0) ScrollingDir = -1;
            else ScrollingDir = 1;
            bAutoScrolling = true;
            ScrollingTime = 15 * distance; // 1.5 (sec) * 1000 *  distance / 100;
            ScrollingID = setInterval(autuScrolling, 16.66667, 16.66667);
        }
        // ----------- 自動捲動
    },false);
    story.addEventListener('mousedown',function(event){
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
                endY = touch.screenY;
                var disranceY = (endY - startY);
                if(startY != Math.abs(disranceY)){
                    if(disranceY < 0){
                        if(main.position().top + disranceY > (-main.height() + $(window).height())){
                            main.offset({top:pos.top + disranceY});
                        }
                    }
                    else if(disranceY > 0){
                        if(main.position().top + disranceY < 0){
                            main.offset({top:pos.top + disranceY});
                        }
                    }
                    startY = endY;
                    curDistance = disranceY;  // ----------- 自動捲動，紀錄這次的移動距離為
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
                break;
        }
        // ----------- 自動捲動
        // 當手指離開時，將目前的移動距離，當成最後一次的移動距離
        // 根據正負方向與移動距離，計算自動撥放的時間長度
        // 負數往下，正數往上
        // 透過在指定的時間內呼叫 autoscrolling 函式，來實現自動滑動
        // 以 cos(時間) 值作為自動滑動的移動距離 
        //  
        var distance = Math.abs(curDistance);
        if (distance >= 3) { // 移動超過三個 pixel 才自動捲動
            if (curDistance < 0) ScrollingDir = -1;
            else ScrollingDir = 1;
            bAutoScrolling = true;
            ScrollingTime = 15 * distance; // 1.5 (sec) * 1000 *  distance / 100;
            ScrollingID = setInterval(autuScrolling, 16.66667, 16.66667);
        }
        // ----------- 自動捲動
    },false);

    story.addEventListener('touchstart',function(event){
        var touch = event.targetTouches[0];
        startX = touch.screenX;
        startY = touch.screenY;
        choose = 'story';
    }, false);
}

// 自動捲動控制

function autuScrolling(dt) {
    var pos = main.offset();
    ElapsedTime = ElapsedTime + dt;  // ElapsedTime 目前的總經過時間
    if (ElapsedTime >= ScrollingTime) { // 自動捲動結束
        clearInterval(ScrollingID);
        ElapsedTime = 0;
        bAutoScrolling = false;
    }
    else { // 自動捲動
        var distY = ScrollingDir * Math.cos(halfPI * ElapsedTime / ScrollingTime) * ScrollingDist; // 以 5 像素為單位
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