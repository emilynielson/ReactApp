import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import './bootstrap-grid.css';

import $ from 'jquery'; 
import highlight from 'jquery-highlight';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.isBalanced = this.isBalanced.bind(this);
  }

  isBalanced() {
    var parensStr = document.getElementById('exampleFormControlTextarea1');
    var inputStr = parensStr.value
    
    var expression = inputStr.split('');
    var line = 1;
    var charDict = {};
    for (var i = 0; i < expression.length; i++){
      if(expression[i] === '\n'){
        charDict[i] ={'char':expression[i], 'line':line}
        line++;
      }else{
        charDict[i] ={'char':expression[i], 'line':line}
      }
    }
    
    if(!this.checkPairs(charDict, '(', ')')){
      var lineErrors = this.getLineErrors(charDict)
      return this.printToScreen(false, lineErrors)
    };
    if(!this.checkPairs(charDict, '[', ']')){
      var lineErrors = this.getLineErrors(charDict)
      return this.printToScreen(false, lineErrors)
    };
    if(!this.checkPairs(charDict, '{', '}')){
      var lineErrors = this.getLineErrors(charDict)
      return this.printToScreen(false, lineErrors)
    };
    return this.printToScreen(true, [0])
    
  }

  getLineErrors(charDict) {
    var lines = [];
    for(var i = 0; i < Object.keys(charDict).length; i++){
      if(charDict[i]['color'] === 'red'){
        lines.push(charDict[i]['line'])
      }
    }
    return lines;
  }

  checkPairs(charDict, openChar, closedChar){
    var openCount =0;
    var closedCount =0;
    var openedParas = [];
    for(var i = 0; i < Object.keys(charDict).length; i++) {
      if(charDict[i]['char'] === openChar ){
        openCount++;
        openedParas.push(i)
      }else if(charDict[i]['char'] === closedChar ){
        closedCount++;
        openedParas.pop();
      }
      if(closedCount > openCount){
        charDict[i]['color'] = 'red'
        return false;
      }else{
        charDict[i]['color'] = 'green'
      }
    }
    if(closedCount !== openCount){
      for(var i = 0; i < openedParas.length; i++){
        charDict[openedParas[i]]['color'] = 'red'
      }
        
      return false;
    }
    return true;
  }

  printToScreen(bool, lineErrors) {
    var parensStr = document.getElementById('exampleFormControlTextarea1');
    var inputStr = parensStr.value;
    var answer = document.getElementById('answer');
    if (bool) {
      answer.innerHTML = `<font color ='green'>Your code is balanced!</font>`;
    } else {
      answer.innerHTML = '<font color ="red">Your code is unbalanced, please check your code at: '
      for(var i = 0; i < lineErrors.length; i++){
        if(i === 0){
          answer.innerHTML = answer.innerHTML+'Line: '+ lineErrors[i].toString()
        }else{
          answer.innerHTML = answer.innerHTML+', Line: '+ lineErrors[i].toString()
        }
      }
      answer.innerHTML = answer.innerHTML+'</font>';
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Code Checker</h1>
        </header>
        <div class="container">
          <div class="row">
            <div class='col-md'>
              <div id="answer"></div>
            </div>
          </div>
          <div class="row">
            <div class='col-md'>
              <form>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1"></label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button onClick={this.isBalanced} type="button" class="btn btn-primary">Check Code</button>
              </form>
            </div>
          </div>
          <br></br>
          <div class="row">
            <div class='col-md'>
                <div id="codeReview"></div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
