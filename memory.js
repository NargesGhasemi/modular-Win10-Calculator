+function (app) {

    var _element = app.elements,
        memoryItems = [],
        _process = {
            'createM': createNewMemory,
            'subtractM': subtractMemory,
            'addM': addMemory,
            'recallM': recallMemory,
            'clearM': clearMemory,
            };

    app.renderMemory = function (type,value) {
        var render = _process[type];
        if (!render) return;
        render(value);
    }

    function createMemory(value) {
        if (!memoryItems.length) {
            app.createEmptyMemory();
        } else {
            app.addMemory(memoryItems, value);
        }
    }

    function createNewMemory() {
        const newItem = {
            id: memoryItems.length > 0 ? memoryItems[memoryItems.length - 1].id + 1 : 1,
            result: _element.result.innerText
        }
        memoryItems.push(newItem);
        createMemory(_element.memory);
    }

    function subtractMemory() {
        memoryItems.pop(memoryItems[memoryItems.length - 1]);
        createMemory();
    }

    function addMemory() {
        const newItem = {
            id: memoryItems.length > 0 ? memoryItems[memoryItems.length - 1].id + 1 : 1,
            result: eval(_element.result.innerText) + eval( memoryItems[memoryItems.length - 1].result)
        }
        memoryItems.push(newItem);
        createMemory(_element.memory);
    }

    function recallMemory() {
         _element.result.innerText = memoryItems[memoryItems.length - 1].result;
         _general.txtResult = _element.result.innerText ;
    }

    function clearMemory() {
        memoryItems = [];
        app.createEmptyMemory();
    }

    _element.recycleMemory.parentNode.onclick = function () {
        memoryItems = [];
        createMemory(_element.memory);
    }

}(app);
