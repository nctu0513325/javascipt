var id = null;

window.onload = function() {
    //產生3~10的隨機亂數
    var num = (Math.random() * 10) % 8 + 3;
    num = parseInt(num);
    //畫球
    for (i = 0; i < num; i++) {

    }
}



function myMove() {
    var elem = document.getElementById("animate");
    var pos = 0;
    clearInterval(id);
    id = setInterval(frame, 5);

    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + "px";
            elem.style.left = pos + "px";
        }
    }
}