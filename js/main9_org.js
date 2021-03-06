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
    document.location.href="ch01_10.html";
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
    }, {passive: false});

    window.addEventListener('mousemove',function(event){
        switch(choose){
            //主軸故事
            case 'story':
                var pos = main.offset();
                // endX = event.screenX;
                endY = event.screenY;
                // var distanceX = (endX - startX);
                var disranceY = (endY - startY);
                if(mouse && startY != Math.abs(disranceY) && event.buttons == 1){
                    if(disranceY < 0){
                        main.offset({top:pos.top + disranceY-speedplus});
                        if(main.position().top + disranceY < (-main.height() + $(window).height())){
                            var dot = $(window).height()/25;
                            
                        }
                        if(main.position().top + disranceY < (-main.height() + $(window).height()) - $(window).height()/5){
                            console.log(dt);
                            dt++;
                            if(dt == 1){
                                dot1.style.display = 'block';
                            }
                            if(dt == 3){
                                dot2.style.display = 'block';
                            }
                            if(dt == 5){
                                dot3.style.display = 'block';
                            }
                            if(dt == 7){
                                dot4.style.display = 'block';
                            }
                            if(dt == 9){
                                dot5.style.display = 'block';
                            }
                            if(dt == 10){
                                nextStory();
                            }
                            
                        }
                    }
                    else if(disranceY > 0){
                        if(main.position().top + disranceY < 0){
                            main.offset({top:pos.top + disranceY+speedplus});
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
                var disranceY = (endY - startY);
                if(startY != Math.abs(disranceY)){
                    if(disranceY < 0){
                        if(disranceY < -20){
                            main.offset({top:pos.top + disranceY-20});
                        }
                        main.offset({top:pos.top + disranceY-speedplus});
                        if(main.position().top + disranceY < (-main.height() + $(window).height()) - $(window).height()/5){
                            console.log(dt);
                            dt++;
                            if(dt == 1){
                                dot1.style.display = 'block';
                            }
                            if(dt == 3){
                                dot2.style.display = 'block';
                            }
                            if(dt == 5){
                                dot3.style.display = 'block';
                            }
                            if(dt == 7){
                                dot4.style.display = 'block';
                            }
                            if(dt == 9){
                                dot5.style.display = 'block';
                            }
                            if(dt == 10){
                                nextStory();
                            }
                        }
                    }
                    else if(disranceY > 0){
                        if(main.position().top + disranceY < 0){
                            main.offset({top:pos.top + disranceY+speedplus});
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
        // event.preventDefault();
        var touch = event.targetTouches[0];
        startX = touch.screenX;
        startY = touch.screenY;
        choose = 'story';
    }, false);

    
}