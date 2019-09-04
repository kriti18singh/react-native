/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
//import View from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Button,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends React.Component<{}> {
  constructor() {
      super()
      this.state = {
        resultText : "",
        calculationText : ""
      }
      this.buttonPressed = this.buttonPressed.bind(this);
  }

  calculateResult() {
    const text = this.state.resultText;

    this.setState({
        calculationText : eval(text)
    })
  }

  isOp(text) {
    if(text == '+' || text == '-' || text == '/' || text == '*' || text == '.') {
      return true;
    }
    return false;
  }

  buttonPressed(text) {
    console.log("text is : " + text)
    let p = this.state.resultText
    if(text == '=') {
      if(this.isOp(p[p.length-1])) {
        return;
      }
      return this.calculateResult();
      //return;
    } else if(text === 'DEL') {
      console.log("second case")
      if(this.state.resultText == '') {
        return;
      }
      this.setState((prevState) => {
        return (
            {
              resultText : prevState.resultText.substring(0, prevState.resultText.length-1)
            }
          )
        })
        return;
    } else if (this.isOp(text)) {
      let t = this.state.resultText;
      let ch = t[t.length-1];
      if(t == '' || this.isOp(ch) ) {
        return;
      }
    }
    this.setState({
      resultText : this.state.resultText + text
    })
  }

  render() {
    let rows = []
    let nums = [ [1,2,3] ,[4,5,6],[7,8,9], ['.',0,'=']]
    for(let i = 0; i < 4; i++)  {
      let row=[]
      for(let j = 0; j < 3; j++) {
        row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
                    <Text style={styles.btnText}>{nums[i][j]}</Text>
                </TouchableOpacity>)
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>);
    }

    let opers = ['DEL', '+' , '-', '*', '/']
    let ops = []
    for(let i =0; i <5; i++) {
      ops.push(<TouchableOpacity key={opers[i]} onPress={() => this.buttonPressed(opers[i])} style={styles.btn}>
                  <Text style={[styles.btnText, styles.white]}>{opers[i]}</Text>
              </TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
          <View style={styles.result}>
              <Text style={styles.resultText}>{this.state.resultText}</Text>
          </View>
          <View style={styles.calculation}>
              <Text style={styles.calculationText}>{this.state.calculationText}</Text>
          </View>
          <View style={styles.buttons}>
              <View style={styles.numbers}>
                  {rows}
              </View>
              <View style={styles.operations}>
                      {ops}
              </View>
          </View>
      </View>
   )
 }
}

const styles = StyleSheet.create({
  container : {
    flex:1
  },
  row : {
    flexDirection : 'row',
    flex : 1,
    alignItems : 'center',
    justifyContent: 'space-around'
  },
  result : {
    flex:2,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems : 'flex-end'
  },
  btn : {
    flex : 1,
    alignItems : 'center',
    alignSelf : 'stretch',
    justifyContent: 'center'
  },
  resultText : {
    fontSize : 30,
    color : 'black'
  },
  calculationText : {
    fontSize : 18,
    color : 'black'
  },
  calculation: {
    flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems : 'flex-end'
  },
  buttons :  {
    flexDirection : 'row',
    flexGrow : 7
  },
  numbers : {
    flex: 3,
    backgroundColor: '#434343',

  },
  operations : {
    flex :1,
    backgroundColor: '#636363',
    justifyContent: 'space-around'
  },
  btnText : {
    fontSize : 25,
    color : 'white'
  },
  white : {
    color : 'white'
  }
});
