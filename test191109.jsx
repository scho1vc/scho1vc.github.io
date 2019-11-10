
for (var dt = 0; dt < 10; dt++){
    

var doc = app.activeDocument;
var frs = doc.textFrames;
//100mmをポイントで表現しました。
var mH = 85.0394;
var mW = 283.465;
var line35 = [];
var txtW = [];
var txtH = [];
var txtX = [];
var txtY = [];

//まず、35ptのテキストだけの配列を作る
for (var fr = 0; fr < frs.length; fr++) {
    if (Math.round(frs[fr].textRange.size) === 35) {
        line35.push(frs[fr]);
    }
}
    
/*
forを使って配列に4つのX座標、Y座標を入れる。
*/

for(var i = 0; i < line35.length; i++) {
    //4つのWidthを配列に格納
    txtW.push(line35[i].width);
    //4つのHeightを配列に格納
    txtH.push(line35[i].height);
    //4つのX座標を配列に格納
    txtX.push(line35[i].position[0]);
    //4つのY座標を配列に格納
    txtY.push(line35[i].position[1]);
    //alert('X座標:' + txtX[i] + ' Y座標:' + txtY[i] + ' 横幅:' + txtW[i] + ' 縦幅:' + txtH[i]);
    if(line35[i].width > mW) {
        //文字列のが箱の最大Width(mW)よりでかい時
        line35[i].width = mW;
        var afterx = txtX[i] + (txtW[i] - line35[i].width) / 2;
        //line35[i].position = [afterx, txtY[i]];
        var perc = line35[i].width / txtW[i];
        line35[i].height = txtH[i] * perc;
        var aftery = txtY[i] - (txtH[i] - line35[i].height) / 2;
        line35[i].position = [afterx, aftery];
        
        //でけたー！！これで、必要に応じて横幅、縦幅を狭めてってできるぞ！
    }
}

//全部の文字列が縮小とかできたら印刷します
app.doScript('とりあえずweb用保存', '初期設定アクション');

//印刷できたら、文字の座標とWidth、Heightを戻したげます
for(var i = 0; i < line35.length; i++) {
    line35[i].position = [txtX[i], txtY[i]];
    line35[i].width = txtW[i];
    line35[i].height = txtH[i];
}

//戻せたら、line35,txtX,txtY,txtW,txtHを空にして次のデータセットを送ります
line35.length = 0;
txtX = 0;
txtY = 0;
txtW = 0;
txtH = 0;
app.doScript('次のデータセットへ', '初期設定アクション');

}

/*

//選抜メンバーline35のそれぞれに以下の処理をする！
for (var i = 0; i < line35.length; i++) {
    if (mW / line35[i].textRange.length < 35) {
        line35[i].textRange.characterAttributes.size = mW / line35[i].textRenge.length;
    } else {
        line35[i].textRange.characterAttributes.size = 35;
    }
}
//長いやつはフォントサイズを小さく、そうじゃないやつも最大35ptのフォントサイズの状態。
//この状態なら印刷してOKなので...
app.doScript('印刷してデータセットを送る', '初期設定アクション');
//次も35ptの選抜をせねばならんので全員一旦35ptに戻したげる
//for (var i = 0; i < line35.length; i++) {
//    line35[i].textRange.characterAttributes.size = 35;
//}
*/