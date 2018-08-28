/*
GAME RULES:
- 二人のプレイヤーがいる
-交互にサイコロを振る
-サイコロはホールドボタンを押すまで何回でもサイコロを振れる
-ホールドボタンを押せば今まで出た数のサイコロの数の合計を獲得でき、相手のターンになる
-しかし、もしサイコロに1の目が出たら、ホールドするまで獲得したサイコロの目を失ってしまい、相手のターンになる
-先にサイコロの数を88獲得したプレイヤーが勝利する

- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 88 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying;
/*53-2,
グローバルスコープ内で定義されているので
他のスコープやほかの関数で使用することができます
アプリケーションを起動すると(init)
gamePlayingがtrueに設定されます
それを使ってゲームが実際にプレイされているときにのみ
このすべて (true)が起こるようにします
これは勝利者を獲得した後でゲームプレイ変数が
falseになるようにすれば
ゲームが終わった後にnewgameを押さないと
動かなくする
*/
/*53-3,
下のif(gamePlaying)文の中に
コードを入れたことによって
すべてifステートメントになり、
ゲームが実際にプレイされている場合にのみ発生します

falseを設定する
falseを適用させる最適の場所はどこだ
そこはプレイヤーがゲームに勝った場合にのみ
これが検出される
*/
init();
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    /*========================================================
    50-1,last Updating Scores and Chaging the Active player☟☟
    ==========================================================*/

    if (dice !== 1) {
      /*=====================================================
                   スコアを追加する
      ======================================================*/
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      /*=====================================================
                     Next Playerをする
      ====================================================*/
      nextPlayer();
    }
  }

});

/*===============================================================
51-1 lmplementing Our 'Hold' Funcion and DRY Principle
これまでのところサイコロを振ってここにスコアを追加することは
出来ますがここでポイントを保持しスコアを更新する方法は
ありません
ポイントを保持しスコアを更新する方法を実装していく
=======================================================-========
*/
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    /*===========================================================
                currentスコアをGLOBALスコアに加えます
    ===========================================================*/
    scores[activePlayer] += roundScore;
    /*
    51-2-1 ↑
    このラウンドで獲得したスコアを
    プレイヤーがすでに持っていたスコアに加算するだけです
    */
    /*=======================================================-
       ☟☟☟　UL(ユーザーインターフェース)を更新する必要があります
    =========================================================*/
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    /*51-2-3　↑↑↑↑
    holdを押しても次のプレイヤーに変わらない
    それを実装していく
    */

    /*
    51-2-2
    ここでULを更新したいのですが
    そのためにまずデータを書き込む必要があるかどうか
    知る必要があります
    アクティブな選手のスコアとユーザーインターフェースを
    選択しましたので今度はコンテンツを変更しましょう
    */
    /*==================================================================-
                        プレイヤーが勝ったかどうかを判定する
      ==================================================================*/
    if (scores[activePlayer] >= 88) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      //↑winnerを入れることでCSSのwinerのプロパティが付与される
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;

    } else {
      nextPlayer();
    }
  }
});




/*===============================================================
       51-3 function nexeYearという関数を作って
       そのなかにコードを入れる
=================================================================*/
/*51-3-1
パラメータをうけとらず結果を返さない関数を
元下のコードが書いてあったところに書いてすっきりさせる
*/
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  /*☆50-2,↑↑
  三項演算子 条件式　? Trueの処理 : Falseの処理　☟と意味同じ
  if(activePlayer === 0){
    activePlayer = 1;
  }else{
    activePlayer = 0;
  }
  roundScoreに0を代入する
  */
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  /*
  50-3,　↑↑↑
  classList種類
  a,contains('')
  →指定したクラスがclass要素に含まれるかどうかを判定します
  真偽値は(True or Falseになります)

  b,add,remove classList
  →→クラスを追加、あるいは削除をする

  c,toggle
  →→これは指定したクラスの有る無を切り替えるというものです
  すでにクラスがある場合は無くし
  まだない場合はクラスを追加します
  */
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none';
  /*
  50-last Updating Scores and Chaging the Active player
  プレイヤーがdice1を出したときに
  再びプレイヤーが変わるときにサイコロを隠すことです
  */

}

document.querySelector('.btn-new').addEventListener('click', init);
/*52-2
↑プレイヤーの得点をリセットすること
私たちがプレーしていた試合から、得点をゼロん戻す必要がある
↑の関数はもう定義しているものだから
簡略化したい

新しいゲームボタンを押したときだけでなく
最初にアプリケーションをロードするときにも
最初から正しく機能します
*/
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  /*↑
  53-1
  ここで宣言してもダメ
  globalなスコープの中にある必要があります
  そのすべてがグローバルスコープ内にある理由です
  */



  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = ' 0';
  document.getElementById('score-1').textContent = ' 0';
  document.getElementById('current-0').textContent = ' 0';
  document.getElementById('current-1').textContent = ' 0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');




}
/*54 (ルールを追加する)
1,2つのロールを連続して6回投げたときに、スコア全部を失う
2,HTMLに入力フィールドを追加して、プレイヤーが勝利スコアを
設定できるにゅりょくフィールドです
3,ゲームに二番目のダイスを追加すること
このシナリオでは1つだけが1つの場合、現在のスコアが失われます

*/



/*52-1
init関数を使うことで
最初の設定ということを分かり易くする

もうひとつやることは
-プレイヤーの名前を実際に元に戻すことです

init()を関数(function)で設定することで
addEventListnenerの第二引数にinitを入れることによって
initの中の初期化状態を
'btn-new'をイベントリスナーの第一引数にclickイベント
があるのでそこを押すとinit関数が適用されて
最初の初期化状態に戻る

*/









/*================================
//document.querySelector('#current-'  +  activePlayer).textContent =dice
//☆↑この場合、値を設定するのでそれはセッターであるといいます
//document.querySelector('#current-'  +  activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;
//☆↑この場合、価値がある?からゲッターだといいます

========================================*/



/*
この講義では基本的なゲーム変数を作成する方法
乱数を作成する不法
DOMを操作する方法
DOMから読み取る方法について学習します
*/
/*
1,
私たちはゲームで起こっている最も重要なことがらを追跡するために
まず2つの変数を作成する必要があります
おそらくもっとも重要なのは
各プレイヤーのスコアです
*/




/*
☆↑
1,最初のイベントタイプはイベントタイプです
2,このケースでは単にクリックします
3,さてaddEventListenerの最初の引数はイベントのタイプです
4,1番目の最初の引数はイベントのタイプで市
5,さて2番目の部分はイベントが発生するとすぐに呼び出される関数です
だから今は空にしておく
6,したがってボタンをクリックすると呼び出す関数があるとします
7,btn()←この関数をここで呼び出す関数として使用する場合は
ボタンをクリックするとすぐに関数の名前だけを括弧の演算子なしで
わたしたちはここでそれらを直接呼びたくないから
8,このボタン機能はコールバック機能と呼ばれます
9,引数として関数に渡す関数、この場合はEventListenerメソッドが
この関数を呼び出します
10,イベントリスナーによって呼び出される外部関数を必要
としない場合はどうでしょうか??
11,無名関数は単純に名前を持たない関数です

*/

//4-1 em要素をここでダイス周りで使用しましょう それを強調します
/*
4-2
イタリックな表示になった
textContentでやるとどうなるだろう
これを使うとHTMLではなくテキストのみを設定できるので
ここではテキストをすべて取ります
よって <em> + dice(diceの中身とemが表示される)+em
*/



/*4-3,
currentのidを取得することによって
curentの場所に値が表示される
説明するためにinnerHTMLを説明しただけだから
あとはコメントアウトする
*/


//2,これらを一つの変数にまとめましょう 配列を使用する


/*
3,
それではダイスについて考えてみましょう
ダイスを作成するには乱数を計算する必要があります
数学オブジェクトを使う
数学オブジェクトはJSの組み込みオブジェクトで
この種の計算を行うために非常に便利な
数学定数や関数のプロパティやメソッドを
多数備えています

ランダムと呼ばれる非常に便利なメソッドがあります
これは基本的に1と間の乱数を与えます
1と6の間の数字がほしい
3-1,
ですからまずやるべきことはこの値(random)に6を掛けることです
Math.random() * 6

3-2,
これらは小数であるためにここで問題が発生します
小数点を必要としません
整数が必要です
foorめそっとがありこれは
単純に数値の小数部分を排除します
Math.floor(4.6)

Math.floor(Math.random() * 6) + 1
↑サイコロ変数は定義されるたびに個の乱数をとります

*/

/*
4,次にDOM操作を行う
私たちが理論的な講義でいったように
わたしたちへのDOMへのアクセスを与える
オブジェクトはドキュメントオブジェクトですよね
いま私たちのWebページから要素を選択するために
使用できるメソッドがいくつかあります
最も有用なメソッドと私が常に使用する


メソッドはquerySelectorです
クエリーセレクターはCSSセレクタでHTML要素を指定することが
可能です
指定された要素1つみつけることで検索処理が終了します
なので取得できるオブジェクトは1つだけです

このメソッドを使ってしたいことは
Cureenって場所にダイスの価値を置くことです
HTMLでは左のPleyer 1の下の43のid score-0を使用する


この要素を変更したい場合は別のメソッドが必要です
これはテキストコンテンツメソッドです

activePlayerはこれは現在再生中のプレーヤーをつい益するためのものです
この変数を使用してここで値を読み込んだり保存したりしますが
この値がHTMLで使用されています

activePlayerを変更するとスコアは他のレイヤーに反映されます
activePlayerを1に設定しこれがどのように機能するかを
見てみましょう
そこでHTML要素のコンテンツを変更するだけでした


選択範囲の内容を変更するには
実際には2つの方法があります
1つはtextContent
↑プレーンテキストしか設定できないのでHTMLはありませｎ
しかし
選択された要素の中にいくつかのHTMLを入れたいなら
テキストコンテンツの代わりに内部のHTMLメソッドを
使わなければなりませｎ

var x のところ
今度は何も等しくなるように設定しません
なぜならこのid スコア0で要素の値や内容を読み取ってから
変数xに格納するだけだからです
だからすぐにコンソールを作る

*/


/*
5
さてこの講義で紹介したいことがもう1つある
これはqyerySelectorを使って要素のCSSを変更することもできます
私たちが今したいことは
ダイスを最初から隠しておくことです
ゲームを開くときにダイスを表せるようにすることです
displayプロパティをnoneに設定することでそれを
行います

*/
/*
next
ボタンをクリックするたびに
実際に値を表示することです
サイコロを表示して
*/

/*
===========================================================
#49 Events and Event Handling: Rolling The dice
==========================================================
/*
前に進む前にサイコロのボタンをコーディンぐして
DOMとDOMの操作
およびそのイベントに密接に関連する重要なトピックについて
お話ししましょう
*/


/*
1,イベントはウェブページ上で何かが起こったことを
Googleのコードに通知するために送信される
通知のようなものです

イベントはボタンをクリックしたり,ウィンドウのサイズを変更したり
スクロールダウンしたり、キーを押してりしてもトリガーされます
*/


/*
2,
イベントリスナーを使用してポップアップウィンドウを開いたり
アニメーションを表示したりするなど
これらすべてのイベントへの応答をコード化することができます

したがってイベントリスナーは基本的にそこに座って
特定のイベントが発生するのを待つ関数です

そのイベントはどのように処理されますか??

まず実行スタックについて覚えておく必要があります
これは実行スタックが空になるとすぐにイベントを処理または
処理できるというルールがあるためです
→つまりすべての関数が返されたことをいみします


さて実行スタック以外にも
JSエンジンにメッセージキュート呼ばれるものがあります
↑これはブラウザで発生するイベントが配置される場所です
↑そしてメッセージキュートは処理されるのを待っています
イベントリスナーは独自のコンテキストを取得し
スタックの最上位に置かれアクティブな実行コンテキストになります


つまりイベントの処理方法とイベントリスナーの仕組みです
*/



/*
3,
この講義では
-イベントハンドラの設定方法
-コールバック関数
-及び無名関数について説明します
-また要素をIDで選択するもう1つの方法及びHTMLイメージ要素で
イメージを変更する方法についても学習します
*/

/*
4,document.querySelector('.btn-roll')
.addEventListener('click',function(){
☟　やるべきステップ
1,ランダム変数を用意する
1-2,私たちは誰かがクリックするとすぐにこれを
必要とします
var dice = Math.floor(Math.random() * 6) + 1;


2,その次は結果を表示することです
2-1,表示スタイルをnoneにしたので
表示しなければいけない
2-3,だから最初にスタイルをブロックに戻すことをや る
2-4変数を作成し、選択肢を保存し必要に応じてこの変数を
使用することです
2-5サイコロを振れない
どうすればよいか??
→いらない変数を消す

2-6サイコロ回った
→次にやりたいことは
これらの値をゼロに設定することです
HTMLをどのように呼び出すか見ていきましょう
私たちが前にしたように
querySelectorはうまくいきましたが
ドキュメントを作成する別のメソッドを示す場合は
getElementByID,
3,スコアを更新する
*/

/*
==============================================================

50  Updating Scores and Changinhg the Active Player
この講義ではプロジェクトの構築とゲームロジックの開発を続けます

===============================================================
*/

/*
1,
この講義では3項演算子が何であるかを調べ,HTMLクラスの追加排除、
及び切り替え方法を学習します
*/


/*
==============================================================

51 lmplementing Our 'Hold' Function and the DRY Principle
この講義ではホールド機能を実装する予定です

===============================================================
*/
/*
youeselfの原則について話します
*/

/*51-2
まずはイベントリスナーを設定する
obj.addEventListener(イベントのタイプ,関数,オプション);
↑
ifの中の条件分岐はこう
→→→　ボタンを押すとそのラウンドで得た得点が現在の得点に加算され
その数がユーザーインターフェースに表示されます
これはDOM操作を実行することを意味し
そのあとプレイヤーがゲームに勝ったことを表示する
*/


/*51-last
--まだ問題がいくつかある
-それはボタンを押し続けるとダイスをロールすることができますが
-それは意味がありません
-あとはnewgameを押したときに反応するように実装していく
*/


/*======================================================================
              52Creaing a Game Initilization function
=========================================================================*/
/*
52-1,
NEW GAMEを押すと最初からゲームが始まるようにする
ボタンとイベントを使う
イベントリスナーを使う

*/


/*==============================================================================-
             53 Finishing Touches: State variables
===============================================================================*/
/*
53-1
この講義では状態変数が何であるかどのように使用するのか
なぜそれを使用するのかを学びます

この問題は勝者がいてもゲームを続けることができるという
問題です
状態変数とは何ですか????
状態変数は単にシステムの状態を伝えるだけなのです

何かを覚えておく必要があるときは状態変数が必要です
*/
