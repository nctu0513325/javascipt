var one, two, three, four, five, six = new Array();  //定義數字陣列

one = [1]; two = [2]; three = [3]; four = [4]; five = [5]; six = [6];                                       //初始化數字陣列
Gen_num(one); Gen_num(two); Gen_num(three); Gen_num(four); Gen_num(five); Gen_num(six);                     //產生卡片數字
Show_table(one); Show_table(two); Show_table(three); Show_table(four); Show_table(five); Show_table(six);   //製作卡片

//函數--產生卡片陣列
function Gen_num( number ){
    var set = 6 - number[0];
    var y = new Array();

    for(var i = 1; i <= 64; i++){
        var x = i.toString(2,6);        //將數字轉為二進位
        y = [0, 0, 0, 0, 0, 0];         //建立6位元bit陣列
    
        for(j = 0; j<x.length; j++){
            y[5-j] = x[x.length - 1 - j];       //將轉換完的2bit字串存入y中
        }
        
        //將相應bit為1的數字存入卡片陣列
        if( y[set] == 0){
            continue;
        }else{
            number.push(i);
        }
    }    
}

// 函數---製作數字卡片表格
function Show_table( number ){
    document.write("<table border='1'"); 
    document.write("<tr>");
    document.write("<td align = 'center' colspan = '8'> card number "+ number[0] +
                    "<input type = 'checkbox' name = 'card' value = " + number[0] + "/> </td>");  //第一列顯示第幾張卡片
    document.write("</tr>");
    //利用for迴圈產生剩下的數字
    for(var i = 1; i<number.length; i++){
        document.write("<tr>");
        for(var k = 0; k < 8; k++){
            document.write("<td>" + number[i]+"</td>");
            i++;
        }
        document.write("</tr>");
        i--;
    }   
}
//函式---按下確定鈕
function Btn_Click(){
    
    var btn = document.getElementsByName("card"); //設定一變數取得name為card的元素
    var guess = 0;                                //初始化所猜的值

    for(var i = 0; i<btn.length; i++){

        //如果第i個按鈕有勾選，則加上2的i次方
        if(btn[i].checked){
            guess += Math.pow(2,i);
        }
    }
    
    alert("你心中的數字為: " + guess);
}