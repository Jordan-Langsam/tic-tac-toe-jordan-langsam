import React from 'react';
import { Button } from 'react-native';

class StartButton extends React.Component {
    constructor(props){
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(){
        console.log('test');
    }

    render(){
        return (
        <Button
        title="Start Game"
        color="#841584"
        onPress={this.handlePress} />
        );
    }
}

export default StartButton;
