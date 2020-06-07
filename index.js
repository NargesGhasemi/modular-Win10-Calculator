+function (app) {

  const _element = app.elements;
  const _general = app.general;

  for (let i = 0; i < _element.memoryBtn.length; i++) {
    _element.memoryBtn[i].addEventListener("click", function (e) {
      switch (e.target.id) {
        case "MS":
          app.renderMemory('createM');
          break;
        case "M-":
          app.renderMemory("subtractM");
          break;
        case "M+":
          app.renderMemory("addM");
          break;
        case "MR":
          app.renderMemory("recallM");
          break;
        case "MC":
          app.renderMemory("clearM");
          break;
      }
    });
  }

  for (let i = 0; i < _element.numbers.length; i++) {
    _element.numbers[i].addEventListener("click", function () {
      app.renderCalc("clickNumber");
    });
  }

  for (let index = 0; index < _element.mainOperators.length; index++) {
    _element.mainOperators[index].addEventListener("click", function () {
      app.renderCalc("clickOperator");
    });
  }

  for (let index = 0; index < _element.operationOperators.length; index++) {
    _element.operationOperators[index].addEventListener("click", function () {
      const o_operator = _element.operationOperators[index].innerText;
      app.renderCalc("clickOperation", o_operator);
    });
  }

  _element.closeIcon.onclick = function () {
    try {
      window.close();
    } catch (error) {
      alert(error)
    }

  }

  _element.body.onresize = function () {
    if (window.outerWidth <= 600) return;
    _element.mainTable.style.display = "table";
    _element.mainMemory.style.display = "none";
    _element.mainHistory.style.display = "none";
  }

  _element.hamburgerIcon.onclick = function () {
    if (_element.mySidenav.style.width == "" || _element.mySidenav.style.width == "0px") {
      _element.mySidenav.style.width = "250px";
      _element.standardMenue.style.visibility = "hidden";
    }
    else {
      _element.mySidenav.style.width = "0";
      _element.standardMenue.style.visibility = "visible";
    }
  }

  _element.historyLink.onclick = function () {
    _element.historyPage.style.display = "none";
    _element.memoryPage.style.display = "inline-block";
    _element.memoryLink.classList.remove("active");
    _element.historyLink.classList.add("active");
  }

  _element.historyIcon.onclick = function () {
    _element.mainMemory.style.display = "none";
    switch (_element.mainTable.style.display) {
      case "table":
        _element.mainTable.style.display = "none";
        _element.mainHistory.style.display = "table";
        break;
      default:
        _element.mainHistory.style.display = "none";
        _element.mainTable.style.display = "table";
        break;
    }
  }

  _element.memoryStore.onclick = function () {
    _element.mainHistory.style.display = "none";
    switch (_element.mainTable.style.display) {
      case "table":
        _element.mainTable.style.display = "none";
        _element.mainMemory.style.display = "table";
        break;
      default:
        _element.mainMemory.style.display = "none";
        _element.mainTable.style.display = "table";
        break;
    }
  }

  _element.memoryLink.onclick = function () {
    _element.memoryPage.style.display = "none";
    _element.historyPage.style.display = "inline-block";
    _element.historyLink.classList.remove("active");
    _element.memoryLink.classList.add("active");
  }

  _element.equal.onclick = function () {
    app.renderCalc('calcResult');
    _general.lastClick == "equal"
  }

  _element.clearAll.onclick = function () {
    app.clearAllResult();
    _general.result = "0";
    _element.expretion.innerText = "";
    _element.result.innerText = "0";
  }

  _element.clear.onclick = function () {
    _general.realExpresion = _general.realExpresion.substring(0, _general.realExpresion.length - _general.txtResult.length);
    _general.txtResult = "0";
    _element.result.innerText = "0";
    if (_general.lastClick == "equal") {
      _element.expretion.innerText = "";
      app.clearAllResult();
    }
  }

  _element.percent.onclick = function () {
    if (_element.expretion.innerText == "") {
      _general.txtResult = 0;
    }
    else {
      _general.txtResult = parseFloat(_element.result.innerText) / 100;
    }
    _element.result.innerText = _general.txtResult;
  }

  _element.backSpace.onclick = function () {
    app.renderCalc("backSpace");
  }

  _element.plusmn.onclick = function () {
    app.renderCalc("plusmn");
  }

  _element.mathDecks.onclick = function () {
    app.renderCalc('mathDecks');
  }

  app.clearAllResult = function () {
    _general.txtResult = "";
    _general.txtExpresion = "";
    _general.realExpresion = "";
  }

  app.addHistory = function (historyList) {
    _element.history.innerHTML = "";
    _element.historyTableRow.innerHTML = "";
    for (let index = 0; index < historyList.length; index++) {
      _element.historyTableRow.appendChild(createHistoryItem(historyList[index]));
      _element.history.appendChild(createHistoryItem(historyList[index]));
    }
    _element.recycleHistory.style.display = "block";
    _element.recycleHistory1.style.display = "block";
  }

  app.addMemory = function (memoryList) {
    _element.memoryTableRow.innerHTML = "";
    _element.memory.innerHTML = "";
    for (let index = 0; index < memoryList.length; index++) {
      _element.memory.appendChild(createMemoryItem(memoryList[index]));
      _element.memoryTableRow.appendChild(createMemoryItem(memoryList[index]));
    }
    _element.recycleMemory.style.display = "block";
    _element.recycleMemory1.style.display = "block";
    _element.memoryStore.classList.remove("disabled");
    //enable memory button
    for (let index = 0; index < _element.memoryBtn.length; index++) {
      switch (_element.memoryBtn[index].id) {
        case "MC":
          _element.memoryBtn[index].classList.remove("disabled");
          break;
        case "MR":
          _element.memoryBtn[index].classList.remove("disabled");
        break;
      }
    }
  }

  app.createEmptyHistory = function () {
    _element.history.innerHTML = "There's no history yet";
    _element.historyTableRow.innerHTML = "There's no history yet";
    _element.recycleHistory.style.display = "none";
    _element.recycleHistory1.style.display = "none";
  }

  app.createEmptyMemory = function () {
    _element.memory.innerHTML = "There's nothing saved in memory";
    _element.memoryTableRow.innerHTML = "There's nothing saved in memory";
    _element.recycleMemory.style.display = "none";
    _element.recycleMemory1.style.display = "none";
    //disable memory button 
    _element.memoryStore.classList.remove("disabled");
    for (let index = 0; index < _element.memoryBtn.length; index++) {
      switch (_element.memoryBtn[index].id) {
        case "MC":
          _element.memoryBtn[index].classList.add("disabled");
          break;
        case "MR":
          _element.memoryBtn[index].classList.add("disabled");
          break;
      }
    }
  }

  function createMemoryItem(memoryListItem) {
    const mydiv = document.createElement("div");
    const rstdiv = document.createElement("div");
    rstdiv.classList.add("memoryRst");
    mydiv.classList.add("memoryItem");
    rstdiv.innerHTML = memoryListItem.result;
    mydiv.appendChild(rstdiv);
    mydiv.addEventListener('click', event => {
      _element.result.innerText = rstdiv.innerHTML;
    })
    return mydiv;
  }

  function createHistoryItem(historyListItem) {
    const mydiv = document.createElement("div");
    const expdiv = document.createElement("div");
    const rstdiv = document.createElement("div");
    expdiv.classList.add("historyExpre");
    rstdiv.classList.add("historyRst");
    mydiv.classList.add("historyItem");
    expdiv.innerHTML = historyListItem.expretion;
    rstdiv.innerHTML = historyListItem.result;
    mydiv.appendChild(expdiv);
    mydiv.appendChild(rstdiv);
    mydiv.addEventListener('click', event => {
      _element.expretion.innerText = expdiv.innerHTML;
      _element.result.innerText = rstdiv.innerHTML;
    })
    return mydiv;
  }

}(app);
