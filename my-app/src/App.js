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
    if (inputStr === null) { this.printToScreen(true, expressionDict); }
    var expression = inputStr.split('');
    var stack = [];
    var expressionDict ={};
    for (var i = 0; i < expression.length; i++) {
      if (this.isParanthesis(expression[i])) {
        if (this.isOpenParenthesis(expression[i])) {
          stack.push(i);
          expressionDict[i] = {'color': 'red', 'item': expression[i]}
        } else {
          if (stack.length === 0) {
            return this.printToScreen(false, expressionDict);
          }
          var topIndex = stack.pop(); // pop off the top element from stack
          var top = expression[topIndex]
          if (!this.matches(top, expression[i])) {
            expressionDict[i] = {'color': 'red', 'item': expression[i]}
            return this.printToScreen(false, expressionDict);
          }else{
            expressionDict[i] = {'color': 'green', 'item': expression[i]}
            expressionDict[topIndex] = {'color': 'green', 'item': expression[topIndex]}
          }
        }
      }else{
        expressionDict[i] = {'color': 'green', 'item': expression[i]}
      }
    }
    var returnValue = stack.length === 0 ? true : false;
    this.printToScreen(returnValue, expressionDict)
  }
  matches(topOfStack, closedParenthesis) {
    var tokens = [ ['{','}'] , ['[',']'] , ['(',')'] ];
    for (var k = 0; k < tokens.length; k++) {
      if (tokens[k][0] === topOfStack && 
          tokens[k][1] === closedParenthesis) {
        return true;
      }
    }
    return false;
  }
  
  isOpenParenthesis(parenthesisChar) {
    var tokens = [ ['{','}'] , ['[',']'] , ['(',')'] ];
    for (var j = 0; j < tokens.length; j++) {
      if (tokens[j][0] === parenthesisChar) {
        return true;
      }
    }
    return false;
  }
  
  isParanthesis(char) {
    var str = '{}[]()';
    if (str.indexOf(char) > -1) {
      return true;
    } else {
      return false;
    }
  }
  printToScreen(bool, expressionDict) {
    var parensStr = document.getElementById('exampleFormControlTextarea1');
    var inputStr = parensStr.value;
    var answer = document.getElementById('answer');
    if (bool) {
      answer.innerHTML = `Your code <div> ${inputStr} </div> is balanced!`;
    } else {
      answer.innerHTML = `Your code <div>`;
      for(var key in expressionDict){
        if(expressionDict[key]['color'] === 'red'){
          answer.innerHTML = answer.innerHTML + '<font color="red">'+expressionDict[key]['item']+'</font>';
        }else{
          answer.innerHTML = answer.innerHTML + expressionDict[key]['item'];
        }
      };
      answer.innerHTML = answer.innerHTML+'</div><div> is unbalanced, please check your code. </div>'
      
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
        </div>
      </div>
    );
  }
}

export default App;
