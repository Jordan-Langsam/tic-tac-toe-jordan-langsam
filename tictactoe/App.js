import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import StartButton from './Components/StartButton';

export default class App extends React.Component {
  constructor(){
    super();

    this.state = {
      //a zero means it is an empty space. A 1 will indicate a player's piece is there and a 2 will indicate a computer piece is there
      board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      userTurn: true,
      winner: '',
    }

    this.handlePress = this.handlePress.bind(this);
    this.indexForTouchPosition = this.indexForTouchPosition.bind(this);
    this.appropriateMoveForIndex = this.appropriateMoveForIndex.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
    this.rowCheck = this.rowCheck.bind(this);
    this.columnCheck = this.columnCheck.bind(this);
    this.diagonalCheck = this.diagonalCheck.bind(this);
    this.gameReset = this.gameReset.bind(this);
    this.computerMove = this.computerMove.bind(this);
  }

  handlePress(event){
    const { locationX, locationY} = event.nativeEvent;

    const rowIndexForLocation = this.indexForTouchPosition(locationX);
    const columnIndexForLocation = this.indexForTouchPosition(locationY);

    this.appropriateMoveForIndex(rowIndexForLocation, columnIndexForLocation);

    const didWin = this.checkForWin();

    if (didWin){
      const newWinner = (this.state.userTurn ? "user" : "computer");
      this.setState({
        winner: newWinner
      });
    } else {
      let newTurn = !this.state.userTurn;

      this.setState({
        userTurn: newTurn,
      });
    }
  }

  indexForTouchPosition (position){

    const boardDimension = 300;
    let location;

    if (position <= (100 / boardDimension)){
      location = 0;
    } else if (position >= (200 / boardDimension)){
      location = 1;
    } else {
      location = 2;
    }

    return location;
  }


  gameReset(){
    this.setState({
      board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      userTurn: true,
      winner: '',
    });
  }

  checkForWin(){
    if (this.rowCheck()){
      return true;
    } else if (this.columnCheck()){
      return true;
    } else if (this.diagonalCheck()){
      return true;
    }

    return false;
  }

  appropriateMoveForIndex(rowIndexForLocation, columnIndexForLocation){

    if (this.state.board[rowIndexForLocation][columnIndexForLocation] === 0){

      const userOrComp = (this.state.userTurn ? 1 : 2);

      let newBoardState = this.state.board;
      newBoardState[rowIndexForLocation][columnIndexForLocation] = userOrComp;

      this.setState({
        board: newBoardState,
      });
    }
  }

  rowCheck(){
    let board = this.state.board;
    let userCounter = 0;
    let computerCounter = 0;

    for (let column = 0; column <= 2; column++){
      for (let row = 0; row <= 2; row++){
        if (board[row][column] === 1){
          userCounter++;
        } else if (board[row][column]){
          computerCounter++;
        }

        if (userCounter === 3 || computerCounter === 3){
          return true;
        }
      }

      userCounter = 0;
      computerCounter = 0;
    }

    return false;
  }

  columnCheck(){
    let board = this.state.board;
    let userCounter = 0;
    let computerCounter = 0;

    for (let row = 0; row <= 2; row++){
      for (let column = 0; column <= 2; column++){
        if (board[row][column] === 1){
          userCounter++;
        } else if (board[row][column]){
          computerCounter++;
        }

        if (userCounter === 3 || computerCounter === 3){
          return true;
        }
      }

      userCounter = 0;
      computerCounter = 0;
    }

    return false;
  }

  diagonalCheck(){
    let board = this.state.board;
    let userCounter = 0;
    let computerCounter = 0;

    //top left to bottom right
    for (let row = 0; row <= 2; row++){
      if (board[row][row] === 1){
        userCounter++;
      } else if (board[row][row] === 2){
        computerCounter++;
      }
    }

    if (userCounter === 3 || computerCounter === 3){
      return true;
    }

    //bottom left to top right
    userCounter = 0;
    computerCounter = 0;
    for (let row = 2; row >= 0; row--){
      if (board[row][row] === 1){
        userCounter++;
      } else if (board[row][row] === 2){
        computerCounter++;
      }
    }

    return (userCounter === 3 || computerCounter === 3);
  }

  computerMove(){
    let board = this.state.board;

    for (let index = 0; index <= 2; index++){
      for (let index2 = 0; index2 <= 2; index2++){
        // if (board[index][index2])
          board.find(row => {
            return (row.find(number => {
              return (number === 0);
            }))

          })
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableWithoutFeedback onPress={event => this.handlePress(event)}></TouchableWithoutFeedback> */}

          <View style={styles.board}>
            <View style={styles.lineVertical}>
            </View>
            <View style={[styles.lineVertical, {transform: [{
          translateX: 200}, {
            translateY: -275
              }
            ]}
            ]}>
            </View>
        <View style={styles.lineHorizontal}>
        </View>
        <View style={[styles.lineHorizontal, {transform: [{
          translateY: -100
        }]}]}>
        </View>
        {/* </TouchableWithoutFeedback> */}
        </View>
        <StartButton reset={this.gameReset} />
        {this.state.winner !== ''} ?
        <Text>{this.state.winner}</Text> : null
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  board: {
    borderWidth: 3,
    height: 300,
    width: 300
  },
  lineVertical: {
    backgroundColor: "#000",
    height: 280,
    width: 3,
    transform: [{
      translateX: 100,
    }, {
      translateY: 5
    }]
  },
  lineHorizontal: {
    backgroundColor:"#000",
    height: 3,
    width: 280,
    transform: [{
      translateX: 5,
    }, {
      translateY: -200
    }]
  }
});
