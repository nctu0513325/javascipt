var msg="\n透過 rule 物件和 cssRule 物件獲取樣式資訊\n\n";
msg+="瀏覽器類型 : ";
//獲取文檔中指定樣式表的樣式資訊
function GetInfo()
{
  //根據用戶端瀏覽器資訊確定腳本的走向
  //若瀏覽器為NN,則轉向 GetWindowNN()
  if(navigator.appName=="Netscape")
    GetWindowNN();
  //若瀏覽器為IE,則轉向 GetWindowIE()
  else if(navigator.appName=="Microsoft Internet Explorer")
    GetWindowIE();
  //否則,輸出警告資訊
  else
    alert("對不起,當前瀏覽器類型不支援!");
}
//如果用戶端瀏覽器為NN,則觸發此函數
// chrome bug: cssRules null when stylesheets loaded from local disk
// so do not run this sample with Chrome
function GetWindowNN()
{
  var myStyleSheets = document.styleSheets;
  var myLength = myStyleSheets.length;
  msg += " Netscape Navigator\n\n";
  msg += "樣式表數目 : " + myLength + "\n\n";
  //遍歷 styleSheets 物件陣列
  for(i=0;i<myLength;i++)
  {
    var tempcssRules = myStyleSheets[i].cssRules;
    var tempcssRulesLength = tempcssRules.length;
    msg+="樣式表  "+(i+1)+"  :\n";  
    msg+="        length : "+tempcssRulesLength+"\n";
    //遍歷cssRules物件陣列
    for(j=0;j<tempcssRulesLength;j++)
    {
       var tempcssRule=tempcssRules[j];
       msg+="　　第 "+(j+1)+" 個樣式規則選擇器 : "+tempcssRule.selectorText+"\n";
       msg+="　　　　全部文字 : "+tempcssRule.cssText+"\n";
    }
    msg+="\n";
 }
  alert(msg);
}
//如果用戶端瀏覽器為IE,則觸發此函數
function GetWindowIE()
{
  var myStyleSheets=document.styleSheets;
  var myLength=myStyleSheets.length;
  msg+=" Microsoft Internet Explorer\n\n";
  msg+="樣式表數目 : "+myLength+"\n\n";  
  //遍歷styleSheets物件陣列
  for(i=0;i<myLength;i++)
  {
    var tempRules=myStyleSheets[i].rules;
    var tempRulesLength=tempRules.length;
    msg+="樣式表  "+(i+1)+"  :\n";
    msg+="　　readOnly : "+tempRules[0].readOnly+"\n";  
    msg+="　　length : "+tempRulesLength+"\n";
    //遍歷rules物件陣列
    for(j=0;j<tempRulesLength;j++)
    {
       var tempRule=tempRules[j];
       msg+="　　第 "+(j+1)+" 個樣式規則選擇器 : "+tempRule.selectorText+" \n";
    }
    msg+="\n";
  }
  alert(msg);
}
