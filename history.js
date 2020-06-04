+function (app) {

    var _element = app.elements,
        historyItems = [],
        _process = {
            'createH': createNewHistory,
            };

    app.renderHistory = function (type) {
        var render = _process[type];
        if (!render) return;
        render();
    }

    function createHistory() {
        if (!historyItems.length) {
            app.createEmptyHistory();
        } else {
            app.addHistory(historyItems);
        }
    }

    function createNewHistory() {
        const newItem = {
            id: historyItems.length > 0 ? historyItems[historyItems.length - 1].id + 1 : 1,
            expretion: _element.expretion.innerText,
            result: _element.result.innerText
        }
        historyItems.push(newItem);
        createHistory();
    }

    _element.recycleHistory.parentNode.onclick = function () {
        historyItems = [];
        createHistory();
    }

}(app);