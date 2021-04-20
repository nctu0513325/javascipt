$(document).ready(function() {

    //  讓 #list-div 的寬度自動根據 .list-name 的數量而變
    $("#list-div").css("width", $(".list-name").length * 100)
        //  一進入畫面時收合選單
    $(".list-item").slideUp(0);

    for (i = 0; i < $(".list-name").length; i++) {
        //  點選按扭時收合或展開選單
        $(".list-name:eq(" + i + ")").on("mouseover", {
            id: i
        }, function(e) {
            n = e.data.id
            $(".list-item:eq(" + n + ")").slideToggle()
            $(".list-item:not(:eq(" + n + "))").slideUp()
            $(".list-name:eq(" + n + ")").text(newtext[n])
        })
        $(".list-name:eq(" + i + ")").on("mouseleave", {
            id: i
        }, function(e) {
            n = e.data.id
            $(".list-name:eq(" + n + ")").text(oldtext[n])
            $(".list-item").stop();
        })
    }
})