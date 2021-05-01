var id = null;
var n = 0; // 球個數
var move_route = []; // 運動方向矩陣
var pos_left = []; //左右位置矩陣
var pos_top = []; //上下位置矩陣

//網頁載入時產生球
window.onload = function() {
    //產生3~10的隨機亂數
    var num = parseInt((Math.random() * 10) % 8 + 3);
    n = num;
    //畫球
    for (i = 0; i < num; i++) {
        DrawBall("container", i);
    }
}

// 函式--畫球
function DrawBall(Class_Name, k) {
    var parent = document.getElementById(Class_Name);　　　　
    var div = document.createElement("div");　　　　 //新增 div 　　
    div.setAttribute("class", "animate"); //設定 div 屬性
    //隨機設定球的初始位置
    var in_top = parseInt((Math.random() * 1000) % 751);
    var in_left = parseInt((Math.random() * 1000) % 751);
    div.style.left = in_left + "px";
    div.style.top = in_top + "px";
    pos_top[k] = in_top;
    pos_left[k] = in_left;　　　
    parent.appendChild(div);
}

function myMove() {
    var elem = document.getElementsByClassName("animate");
    clearInterval(id);
    id = setInterval(frame, 5);

    // 利用陣列紀錄運動方向 前者紀錄左右後者記錄上下 (0為下、右 1為上、左)
    for (i = 0; i < n; i++) {
        //隨機設定運動初始方向
        var move_left = parseInt((Math.random() * 10) % 2)
        var move_top = parseInt((Math.random() * 10) % 2)
        move_route[i] = [move_left, move_top];
    }

    function frame() {
        for (i = 0; i < n; i++) {
            //檢查是否碰到邊界，碰到則反彈
            if (pos_left[i] == 750) {
                move_route[i][0] = 1;
            }
            if (pos_left[i] == 0) {
                move_route[i][0] = 0;
            }
            if (pos_top[i] == 750) {
                move_route[i][1] = 1;
            }
            if (pos_top[i] == 0) {
                move_route[i][1] = 0;
            }
            // 檢查路徑並沿著路徑增加1px
            if (move_route[i][0] == 0) {
                pos_left[i]++;
                elem[i].style.left = pos_left[i] + "px";
            } else {
                pos_left[i]--;
                elem[i].style.left = pos_left[i] + "px";
            }
            if (move_route[i][1] == 0) {
                pos_top[i]++;
                elem[i].style.top = pos_top[i] + "px";
            } else {
                pos_top[i]--;
                elem[i].style.top = pos_top[i] + "px";
            }
        }
    }
}