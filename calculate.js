+ function (app) {
  const _element = app.elements;
  const _general = app.general;
  var _process = {
    'calcResult': calculationLastResult,
    'clickNumber': clickNumberFunction,
    'clickOperator': clickOperatorFunction,
    'clickOperation': clickOperationFunction,
  };


  app.renderCalc = function (type, operation) {
    const render = _process[type];
    if (!render) return;
    render(operation);
  }

  function clickNumberFunction() {
    if (_general.lastClick == "Operators" || _general.lastClick == "operation")
      _general.txtResult = "";

    const number = event.target.innerText;
    if (_general.txtResult == "0" || _general.txtResult == "") {
      _general.txtResult = number;
    }
    else {
      _general.txtResult += number;
    }
    _element.result.innerText = _general.txtResult;
    createRealExpresion(number, "num");
    _general.lastClick = "number";
  }

  function clickOperatorFunction() {
    const m_operator = event.target.innerText;
    if (_general.txtResult != "0" && _general.txtResult != "" && _general.lastClick == "number") {
      _general.txtExpresion += _general.txtResult + m_operator;
      _general.txtResult = "";
    }
    else if (_general.txtResult == "" && _general.lastClick == "Operators") {
      _general.txtExpresion = _general.txtExpresion.substr(0, _general.txtExpresion.length - 1) + m_operator;
    }
    else if (_general.txtExpresion != "" && _general.lastClick == "operation") {
      _general.txtExpresion += m_operator;
    }
    else if (_general.lastClick == "equal") {
      _general.txtExpresion = _general.result + m_operator;
      _general.realExpresion = _general.result;
    }
    _element.expretion.innerText = _general.txtExpresion;
    if (_general.txtExpresion != "") {
      createRealExpresion(m_operator, "mainoper")
      calculateResult("mainoper");
    }
    _general.lastClick = "Operators";
  }

  function clickOperationFunction(o_operator) {
    if (_general.lastClick == "equal") {
      _general.txtResult = _general.result;
    }
    var outExpresion = "";
    if (_general.txtResult != "0" && _general.txtResult != "") {
      if (_general.lastClick == "operation") {
        outExpresion = doOperetion(o_operator, _general.txtExpresion);
        _general.txtExpresion = outExpresion;
      }
      else {
        outExpresion = doOperetion(o_operator, _general.txtResult);
        _general.txtExpresion += outExpresion;
      }
      createRealExpresion(_general.result, "oper");

      _general.txtResult = _general.result;
      _element.expretion.innerText = _general.txtExpresion;
      _element.result.innerText = _general.result;
    }
    _general.lastClick = "operation";
  }

  function calculateResult(lastinput) {
    if (lastinput == "mainoper")
      _general.result = parseFloat(eval(_general.realExpresion.substring(0, _general.realExpresion.length - 1)));
    else
      _general.result = parseFloat(eval(_general.realExpresion));

    _element.result.innerText = _general.result;
  }

  function createRealExpresion(input, type) {
    switch (type) {
      case "num":
        _general.realExpresion += input;
        break;
      case "mainoper":
        _general.realExpresion = "(" + _general.realExpresion + ")";
        if (input == "×")
          _general.realExpresion += "*";
        else if (input == "÷")
          _general.realExpresion += "/";
        else
          _general.realExpresion += input;
        break;
      case "oper":
        _general.realExpresion = "(" + _general.realExpresion.substring(0, _general.realExpresion.length - _general.txtResult.length) + input + ")";
        break;
      default:
        _general.realExpresion;
        break;
    }
  }

  function doOperetion(o_operator, expresion) {
    var txtExpresion = "";
    switch (o_operator) {
      case "√":
        if (checkNegetiveNumber(_general.txtResult)) {
          _general.result = "Invalid Input";
          return;
        }
        else {
          txtExpresion = o_operator + "(" + expresion + ")";
          _general.result = Math.sqrt(_general.txtResult);
        }
        break;
      case "x2":
        txtExpresion = "sqr(" + expresion + ")";
        _general.result = Math.pow(_general.txtResult, 2);
        break;
      case "x3":
        txtExpresion = "cube(" + expresion + ")";
        _general.result = Math.pow(_general.txtResult, 3);
        break;
      case "1/x":
        txtExpresion = "1/(" + expresion + ")";
        _general.result = 1 / _general.txtResult;
        break;
      default:
        expresion;
        break;
    }
    return txtExpresion;
  }

  function checkNegetiveNumber(number) {
    const sign = number.toString().substr(0, 1);
    return sign == "-" ? true : false;
  }

  function calculationLastResult() {
    if (_general.lastClick != "equal") {
      switch (_general.lastClick) {
        case "operation":
          _general.txtExpresion = _general.txtExpresion + " =";
          break;
        case "Operators":
          _general.txtExpresion = _general.txtExpresion + _element.result.innerText + " =";
          _general.realExpresion = "(" + _general.realExpresion + _element.result.innerText + ")"
          break;
        case "number":
          _general.txtExpresion = _general.txtExpresion + _element.result.innerText + " =";
          break;
      }
      if (_general.realExpresion == "") return;
      _element.expretion.innerText = _general.txtExpresion;
      try {
        _general.result = parseFloat(eval(_general.realExpresion));

      } catch (error) {
        _general.result = 0;
      }
      _element.result.innerText = _general.result;
    }
    app.renderHistory("createH");
    app.clearAllResult();
    _general.lastClick = "equal"
  }

  _element.plusmn.onclick = function () {
    if (_general.txtResult == "0" || _general.txtResult == "") return;
    _general.txtResult = checkNegetiveNumber(_general.txtResult) ? _general.txtResult.substring(1, _general.txtResult.length) : "-" + _general.txtResult;
    _element.result.innerText = _general.txtResult;
    _general.lastClick = "plusmn";
  }

  _element.mathDecks.onclick = function () {
    _general.lastClick = "mathDecks";
    _general.txtResult = _general.txtResult.indexOf('.') === -1 ? _general.txtResult + "." : _general.txtResult;
    _element.result.innerText = _general.txtResult;
    createRealExpresion(".", "num");
    _general.lastClick = "number";
  }

  _element.backSpace.onclick = function () {
    if (_general.lastClick == "operation" || _general.lastClick == "Operators") return;
    _general.txtResult = _general.txtResult.toString().substring(0, _general.txtResult.length - 1);
    if (_general.txtResult == "")
      _general.txtResult = 0;
    _general.lastClick = "backSpace";
    _element.result.innerText = _general.txtResult;
  }

}(app);