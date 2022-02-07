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