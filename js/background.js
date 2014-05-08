// アイコンクリック時のイベントを指定する
chrome.browserAction.onClicked.addListener(function () {
  // chrome.browserAction.setPopupに渡すパラメータを作成する
  var detail = {
    popup: 'popup.html'
  };
  // ポップアップを開く
  chrome.browserAction.setPopup(detail);
});