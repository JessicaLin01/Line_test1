var comic = $(".comics");
var error = $(".over");
var content = $(".content");
var dot = $(".flex-dot");
var isPhone = detectmob();
var choose = null, mouse = false, speed = 5000, cspeed = 1;
var startX = startY = endX = endY = 0;
var main = $("#main");
var story = document.querySelector("#main");

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
        event.preventDefault(); //防止預設觸控事件
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
                }
                break; 
        }
    });
    window.addEventListener('mouseup',function(event){
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
    },false);

    story.addEventListener('touchstart',function(event){
        var touch = event.targetTouches[0];
        startX = touch.screenX;
        startY = touch.screenY;
        choose = 'story';
    }, false);
}




//update
var Particle = function (x, y) {
    var pixels = [];
    this.sx = x; this.sy = y;
    this.cx = x; this.cy = y;
    this.dx = 0; this.dy = 0; // 手指頭目前點取的位置
    this.velocity = 2.25 + Math.random() * 2; // 分子移動的速度
    this.circlearound = false; // 進入繞圈圈模式
    this.isMoving = false;
    this.toFinger = false;
    this.arc = 0;    // 目前分子跟水平方向的弧度(0,1)
    this.speed = Math.round(Math.random() * 10) / 100;  // 旋轉的速度
    this.clock = Math.random() *0.5 ;  // 個別計時器的起始時間
    
    if (Math.random() >= 0.5) this.dir = 1; // 旋轉的方向
    else this.dir = -1;

    this.dist = 1000 + Math.random() * 30; // 每一個分子距離手指頭位置距離平方
    this.sqrtdist = Math.sqrt(this.dist); // 每一個分子距離手指頭位置距離平方

    this.touchDown = function (tdx, tdy) {
        this.dx = tdx; this.dy = tdy;
        this.toFinger = true;
    }
    this.touchUp = function () {
        this.toFinger = false;
        this.circlearound = false;
        // console.log("touchUp");
    }
    this.touchMove = function (tdx, tdy) {
        this.dx = tdx; this.dy = tdy;
    }
    this.updateData = function () {
        if (this.toFinger) { // 手指頭按下，分子向手指頭方向移動
            if (!this.circlearound) {
                var vx = this.dx - this.cx;
                var vy = this.dy - this.cy;
                if (Math.abs(vx) >= 0.01 || Math.abs(vy) >= 0.01) { // 兩者在一定的距離之外
                    var t = Math.sqrt(vx * vx + vy * vy);
                    vx = vx / t; vy = vy / t; // 單位的方向向量
                    var nx = this.dx - (this.cx + vx * 0.5 * this.velocity); // 新的位置與觸控點的 x 向量
                    var ny = this.dy - (this.cy + vy * 0.5 * this.velocity); // 新的位置與觸控點的 y 向量
                    this.cx = this.dx - nx;
                    this.cy = this.dy - ny;
                    if ((nx * nx + ny * ny) >= this.dist) { // 未達繞圈圈的距離,更新座標
                        this.circlearound = false;
                    }
                    else { // 進入繞圈圈狀態
                        // 計算目前所在的角度
                        this.arc = Math.acos(vy);
                        this.circlearound = true;
                    }
                }
            }
            else { // 進入繞圈圈狀態
                // 計算兩者距離是否還在繞圈圈的範圍內
                var vx = this.dx - this.cx;
                var vy = this.dy - this.cy;
                if ( (vx * vx + vy * vy) > (this.dist+5) ) { // 不再距離內
                    var t = Math.sqrt(vx * vx + vy * vy);
                    vx = vx / t; vy = vy / t; // 單位的方向向量
                    var nx = this.dx - (this.cx + vx * 0.5 * this.velocity); // 新的位置與觸控點的 x 向量
                    var ny = this.dy - (this.cy + vy * 0.5 * this.velocity); // 新的位置與觸控點的 y 向量
                    this.circlearound = false;
                }
                else { // 繞圈圈的距離內
                    this.arc = this.arc + this.dir*this.speed;
                    this.cx = this.dx + this.sqrtdist * Math.cos(this.arc);
                    this.cy = this.dy + this.sqrtdist * Math.sin(this.arc);
                }
            }
            this.isMoving = true; // 代表分子目前正在移動中
        }
        else { // 
            if (this.isMoving) { 
                // 代表分子之前是在移動中，現在要移動回原來的位置，當到達預設位置時，將 this.isMoving 設定為 false
                this.cx = this.cx + (this.sx - this.cx) * 0.025 *this.velocity;
                this.cy = this.cy + (this.sy - this.cy) * 0.025 * this.velocity;

                if (Math.abs(this.cx - this.sx) <= 0.1 && Math.abs(this.cy - this.sy) <= 0.1) {
                    this.isMoving = false;
                    this.cx = this.sx; this.cy = this.sy;
                }
            }
        }

        this.clock = this.clock + 0.0135;
        this.drawC();
    }
    this.drawC = function () {
        // 根據 this.clock 計算透明度的變化
        if (this.clock >= 3.1415) this.clock = this.clock - 3.1415;
        var opacity = Math.floor(64 + 191 * Math.abs(Math.sin(this.clock)));
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, 5, 0, 360, false);
        ctx.fillStyle = "#F8F9EC" + opacity.toString(16);
        ctx.fill();
        ctx.closePath();
    };
}