import React from 'react';
import { ListView, TextInput, TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import KeyboardEventListener from './utils/KeyboardEventListener';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

const styles = StyleSheet.create({
  button: {
     height: 45,
     alignSelf: 'stretch',
     backgroundColor: '#75A0D1',
     marginTop: 10,
     marginLeft: 10,
     marginRight: 10,
     alignItems: 'center',
     justifyContent: 'center',
  },
  chatBox: {
     height: 25,
     alignSelf: 'stretch',
     marginTop: 10,
     marginLeft: 10,
     marginRight: 10,
     marginBottom: 10,
     justifyContent: 'center',
     backgroundColor: '#F6F6F6',
  },
  chatText: {
    fontSize: 14,
    fontWeight: '400',
  },
  input: {
     borderWidth: 1,
     borderColor: '#D7D7D7',
     height: 50,
     marginLeft: 10,
     marginRight: 10,
     padding: 15,
     borderRadius: 3,
  },
  buttonText: {
     fontSize: 14,
     fontWeight: '600',
     color: '#FAFAFA',
  },
});

class HomeScreen extends React.Component {

  constructor() {
    super();
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    var initialMessages = [ { text: 'This is will messages will pop up.' }, { text: 'Hello! Welcome to the chatroom tutorial.' }];
    this.state = {
      dataSource: ds.cloneWithRows(initialMessages),
      containerStyle: {
         flex: 1,
         justifyContent: 'flex-end',
         paddingTop: 24,
         marginLeft: 10,
         backgroundColor: '#F7F7F7',
         paddingBottom: 10,
      },
    }
  }

  componentDidMount() {
    KeyboardEventListener.subscribe(({keyboardHeight}) => {
      this.setState({
        containerStyle: {
           flex: 1,
           justifyContent: 'flex-end',
           paddingTop: 24,
           marginLeft: 10,
           backgroundColor: '#F7F7F7',
           paddingBottom: 10 + keyboardHeight,
        },
      });
    })
  }

  onChange(text) {
    this.setState({
        message: text
    });
  }

  onAddPressed() {
    // to do
  }

  renderRowView(rowData) {
    return (
      <TouchableHighlight style={styles.chatBox} >
        <Text style={styles.chatText}>
          {rowData.text}
        </Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={this.state.containerStyle}>
        <ListView
          ref={ref => this.listView = ref}
          onContentSizeChange={() => {
          this.listView.scrollTo({y: 0})
          }}
          renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRowView.bind(this)}
        />
        <TextInput
          style={styles.input}
          onChangeText={this.onChange.bind(this)}
        />
        <TouchableHighlight
          onPress={this.onAddPressed.bind(this)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Send Message
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
