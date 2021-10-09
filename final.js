var id = null;
// 紀錄球資訊
var num_of_ball = 0;
var move_route = new Array(); // 運動方向矩陣[第幾顆球][0下1上,0右1左]
var ball_pos_left = [];
var ball_pos_top = [];
//紀錄block 資訊
var num_of_block = 0;
var block_type = []; //0加長板子 1多一顆 2普通
var block_pos_left = [];
var block_pos_top = [];
//紀錄反彈板資訊
var plate_pos_left = 0;
var plate_pos_top = 0;
var plate_length = 100;
// 記錄道具資訊
var num_of_item = 0;
var item_pos_left = [];
var item_pos_top = [];
var item_type = [];

//函式 -- 初始化頁面
function initialize() {
    //畫打磚塊圖形
    var parent = document.getElementById("container");
    //畫反彈底座
    var div_plate = document.createElement("div");
    div_plate.setAttribute("class", "plate");
    div_plate.style.left = 380 + "px";
    div_plate.style.top = 780 + "px";
    div_plate.style.width = plate_length + "px";
    plate_pos_left = 380;
    plate_pos_top = 780;
    parent.appendChild(div_plate);
    //畫球
    DrawBall(400, 760);
    //畫磚塊
    for (i = 0; i < 800; i += 110) {
        for (j = 0; j < 400; j += 30) {
            var div_block = document.createElement("div");
            div_block.setAttribute("class", "block");
            div_block.style.left = i + "px";
            div_block.style.top = j + "px";
            block_pos_left[num_of_block] = i;
            block_pos_top[num_of_block] = j;
            // 設定特殊磚塊
            var sp = parseInt((Math.random() * 100) % 20);
            if (sp == 0) {
                div_block.style.backgroundColor = "purple";
                block_type[num_of_block] = 0;
            } else if (sp == 1) {
                div_block.style.backgroundColor = "orange";
                block_type[num_of_block] = 1;
            } else {
                div_block.style.backgroundColor = "blue";
                block_type[num_of_block] = 2;
            }
            parent.appendChild(div_block);
            num_of_block++;
        }
    }
}

window.onload = function() {
    initialize(); //每次重新整理舊初始化一次頁面，以產生不同特殊方塊位置
}

// 函式--球、道具移動
function move() {
    var elem_ball = document.getElementsByClassName("ball");
    var elem_item = document.getElementsByClassName("item");
    //球
    for (i = 0; i < num_of_ball; i++) {
        // 沿著路徑增加1px
        if (move_route[i][0] == 0) {
            ball_pos_top[i]++;
            elem_ball[i].style.top = ball_pos_top[i] + "px";
        } else if (move_route[i][0] == 1) {
            ball_pos_top[i]--;
            elem_ball[i].style.top = ball_pos_top[i] + "px";
        }
        if (move_route[i][1] == 0) {
            ball_pos_left[i]++;
            elem_ball[i].style.left = ball_pos_left[i] + "px";
        } else if (move_route[i][1] == 1) {
            ball_pos_left[i]--;
            elem_ball[i].style.left = ball_pos_left[i] + "px";
        }
    }
    //道具
    for (i = 0; i < num_of_item; i++) {
        //往下掉

        item_pos_top[i] += 0.5;
        elem_item[i].style.top = item_pos_top[i] + "px";
    }
}

//函式 -- 按下開始打磚塊
function Start() {
    //更改按鈕文字、功能
    var elem_button = document.getElementById("button");
    elem_button.innerHTML = "Pause";
    elem_button.removeAttribute("onclick");
    elem_button.setAttribute("onclick", 'Pause()');

    var elem_block = document.getElementsByClassName("block");
    var elem_plate = document.getElementsByClassName("plate");

    clearInterval(id);
    move(); //先讓球移動一格，以免產生BUG
    id = setInterval(touch, 5);
    // 監控鍵盤移動反彈板
    document.onkeydown = function(event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 37) {
            if (plate_pos_left > 0) {
                plate_pos_left -= 30;
                elem_plate[0].style.left = plate_pos_left + "px";
            }
        }
        if (e && e.keyCode == 39) {
            if (plate_pos_left < 780) {
                plate_pos_left += 30;
                elem_plate[0].style.left = plate_pos_left + "px";
            }
        }
    };

    //檢查有沒有碰到東西
    function touch() {
        //球
        for (n = 0; n < num_of_ball; n++) {
            //檢查有無碰到邊界ˇ
            if (ball_pos_left[n] == 860 || ball_pos_left[n] == 0) {
                move_route[n][1] = !move_route[n][1];
            }
            if (ball_pos_top[n] == 0) {
                move_route[n][0] = !move_route[n][0];
            }

            // 檢查有無碰到磚塊
            for (i = 0; i < num_of_block; i++) {
                if ((block_pos_top[i] + 20 == ball_pos_top[n]) && (ball_pos_left[n] >= block_pos_left[i]) && (ball_pos_left[n] < (block_pos_left[i] + 100))) {
                    // 檢查碰到哪種板子
                    if (block_type[i] == 0) {
                        DrawItem(block_pos_left[i] + 50, block_pos_top[i], 0);
                    } else if (block_type[i] == 1) {
                        DrawItem(block_pos_left[i] + 50, block_pos_top[i], 1);
                    }
                    // 消除磚塊
                    elem_block[i].style.width = 0 + "px";
                    elem_block[i].style.height = 0 + "px";
                    block_pos_left[i] = -100;
                    block_pos_top[i] = -100;
                    // 球反彈
                    move_route[n][0] = !move_route[n][0];
                }
            }
            //檢查有無碰到反彈板
            if ((plate_pos_top == (ball_pos_top[n] + 20)) && ((ball_pos_left[n] >= plate_pos_left) && (ball_pos_left[n] < (plate_pos_left + plate_length)))) {
                // 球反彈
                move_route[n][0] = !move_route[n][0];
            }

            //檢查有無碰到底
            if (ball_pos_top[n] == 780) {
                alert("Game Over");
                Stop();
            }
        }
        //道具
        var elem_plate = document.getElementsByClassName("plate");
        var elem_item = document.getElementsByClassName("item");
        for (n = 0; n < num_of_item; n++) {
            //檢查有無被板子接到
            if ((plate_pos_top == (item_pos_top[n] + 20)) && ((item_pos_left[n] >= plate_pos_left) && (item_pos_left[n] < (plate_pos_left + plate_length)))) {
                // 檢查為哪種道具
                if (item_type[n] == 0) {
                    plate_length += 50;
                    elem_plate[0].style.width = plate_length + "px";
                } else if (item_type[n] == 1) {
                    DrawBall(plate_pos_left + (plate_length / 2), 760);
                }
                // 消失
                elem_item[n].style.width = 0 + "px";
                elem_item[n].style.height = 0 + "px";
                item_pos_left[n] = -100;
                item_pos_top[n] = -100;
            }
            if (item_pos_top[n] == 780) {
                elem_item[n].style.width = 0 + "px";
                elem_item[n].style.height = 0 + "px";
                item_pos_left[n] = -100;
                item_pos_top[n] = -100;
            }
        }

        move();
    }
}

// 函式--遊戲停止
function Stop() {
    //重新整理畫面
    window.location.reload();
}

// 函式--暫停遊戲
function Pause() {
    clearInterval(id);
    var elem_button = document.getElementById("button");
    elem_button.innerHTML = "Press to Start";
    elem_button.removeAttribute("onclick");
    elem_button.setAttribute("onclick", 'Start()');
}

// 函式 -- 畫球
function DrawBall(pos_left, pos_top) {
    var parent = document.getElementById("container");
    var div_ball = document.createElement("div");
    div_ball.setAttribute("class", "ball");
    div_ball.style.left = pos_left + "px";
    div_ball.style.top = pos_top + "px";
    ball_pos_left[num_of_ball] = pos_left;
    ball_pos_top[num_of_ball] = pos_top;
    move_route[num_of_ball] = [1, 1]; //球初始方向為上,左
    parent.appendChild(div_ball);
    num_of_ball++;
}

//函式 -- 畫道具
function DrawItem(pos_left, pos_top, type) {
    var parent = document.getElementById("container");
    var div_item = document.createElement("div");
    div_item.setAttribute("class", "item");
    div_item.style.left = pos_left + "px";
    div_item.style.top = pos_top + "px";
    item_pos_left[num_of_item] = pos_left;
    item_pos_top[num_of_item] = pos_top;
    item_type[num_of_item] = type;
    parent.appendChild(div_item);
    num_of_item++;
}