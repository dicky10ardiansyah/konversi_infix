import React, {Component} from "react";

class App extends Component {
  constructor(props)
     {
       super(props);
       this.state ={
        expression:"",
         "prefix":"",
         "postfix":"",
       }
     }

      eventHandeler = (e) =>
     {
       this.setState({expression:e.target.value});
       console.log(this.state.expression);
     }

     foo = (e) =>
     {
       var current = this;
         var exp = this.state.expression;
         var postFix = "";
         e.preventDefault() ;

         class Stack
         {
           constructor()
           {
             this.data = [];
             this.top = 0;
           }
           push(element) {
                   this.data[this.top] = element;
                   this.top = this.top + 1;
                }
            pop() {
                     this.top = this.top -1;
                     return this.data.pop(); // removes the last element
                }
            isEmpty() {
                  return this.top === 0;
                }
            peek() {
                   return this.data[this.top -1 ];
                }
           length() {
                   return this.top;
                }



         }

         var s = new Stack();
         console.log(exp.length);
         console.log(s.length());
         var pre  = function(c)
         {
             if(c === '^')
             return 3;
             else if(c === '*' || c === '/')
             return 2;
             else if(c === '+' || c === '-')
             return 1;
             else
             return -1;
         }
         var alpha = function(char)
                {
                  return char.toLowerCase() !== char.toUpperCase()
                }

        var getPostFix = function(exp)
        {
          var postFix = "";
          for(var i =0; i<exp.length; i++)
          {
            var k = exp.charAt(i);
            if(alpha(k) === true)
            {
              postFix += k;
            }
            else if(k === '(') {
              s.push(k);
            }
            else if(k === ')')
            {
              while(!s.isEmpty() && s.peek() !== '(')
              {
                var ch = s.peek();
                postFix += ch;

                s.pop();
              }
              if(s.peek() === '(')
              {
                s.pop();
              }
            }
            else {
              while(!s.isEmpty() && pre(k) <= pre(s.peek()))
              {
                var ph = s.peek();
                postFix += ph;
                s.pop();
              }
              s.push(k);
            }

          }
          while(!s.isEmpty())
          {
            var po = s.peek();
            postFix += po;
            s.pop();
          }
          return postFix;

        }
         postFix = getPostFix(exp);
        // console.log(postFix);
        current.setState({postfix:postFix});

        // convert to prefix

        var revString = function(str)
        {
                    var newString = "";
              for (var i = str.length - 1; i >= 0; i--) {
                  newString += str[i];
              }
              return newString;
        }

        var currExp = revString(exp);
        //console.log(currExp);

        var newExp ="";
        for(var j =0 ; j<currExp.length; j++)
        {
          if(currExp.charAt(j) === '(')
          {
            newExp += ')';
          }
          else if(currExp.charAt(j) === ')')
          {
            newExp += '(';
          }
          else {

            newExp += currExp.charAt(j);
          }
        }



        //newExp = getPostFix(newExp);
        var currPreFix = getPostFix(newExp);

        var finalPreFix = revString(currPreFix);
        current.setState({prefix:finalPreFix});






     }

      render(){

        const mystyle =
        {
           textAlign : "center",
           marginTop: "70px",

           //width:"100%",


        }
        const myProj =
        {
          width : "60%",
          //height:"100%",
          padding:'30px',
          marginLeft:"300px",
          backgroundColor : "#219bd9",
        }
        const userInput =
        {
          fontSize : "24px",
          margin :"10px",
        }

        const foo =
        {
          position: "fixed",
          left: "0",
          bottom: "0",
          width: "100%",

          textAlign: "center",
        }


        return(
          <div style={mystyle}>
             <div style={myProj}>
             <h1>Aplikasi sederhana konversi infiks, PostFix, PreFix</h1>
             <small>Masukkan bilangan Infix kedalam kotak dibawah, contohnya: (a+b) </small><br/>
             <input className="form-control" style={userInput} type="text" id="expression" name="expression" value={this.state.expression} onChange={this.eventHandeler} placeholder="masukkan ekspresi Infix" />
             <button className="btn btn-outline-warning" style = {userInput} type="submit" onClick={this.foo} >Konversi</button>
             <p> Ekspresi PostFix : {this.state.postfix} </p>
             <p> Ekspresi PreFix : {this.state.prefix} </p>
             </div>

             <footer style={foo}>
               Made by Kamisato Ayaka
             </footer>

          </div>
        )
      }
}

export default App;
