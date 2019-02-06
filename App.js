import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

const CalcApp = createStackNavigator({
  Home: {screen: HomeScreen},
  History: {screen: HistoryScreen}
});

export default class App extends React.Component {
  static navigationOptions = {title: 'Home',};
  
  constructor(props) {
    super(props);
    this.state = {noOne: '', noTwo: '', result: '', data: []}
  }
  
  calcPlus = (event) => {
    let res = Number(this.state.noOne) + Number(this.state.noTwo);
    this.setState({
      result: Number(this.state.noOne) + Number(this.state.noTwo),
      data: [...this.state.data, {key: this.state.noOne + ' + ' + this.state.noTwo + ' = ' + res}]
    })
  }

  calcMinus = (event) => {
    let res = Number(this.state.noOne) - Number(this.state.noTwo);
    this.setState({
      result: Number(this.state.noOne) - Number(this.state.noTwo),
      data: [...this.state.data, {key: this.state.noOne + ' - ' + this.state.noTwo + ' = ' + res}]
    })
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.flexTest}>
        <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
          keyboardType = 'numeric'
          onChangeText={(noOne) => this.setState({noOne})}
          value={this.state.noOne}
        />
        <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
          keyboardType = 'numeric'
          onChangeText={(noTwo) => this.setState({noTwo})}
          value={this.state.noTwo}
        />
        </View>
        <View style={styles.buttons}>
          <Button onPress={this.calcPlus} title="+"></Button>
          <Button onPress={this.calcMinus} title="-"></Button>
          <Button onPress={() => navigate('History')} title='HISTORY' />
        </View>
        <View style={styles.flexTest}>
          <Text>Result: {this.state.result}</Text>
        </View>
        <View style={styles.history}>
          <FlatList data={this.state.data} 
                    renderItem={({item}) => <Text>{item.key}</Text>}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200, 
  },
  buttons: {
    flex: 1,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  history: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexTest: {
    flex: 1,
  },
});
