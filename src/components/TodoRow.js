import React, { useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropdownMenu from 'react-native-dropdown-menu';
import ViewNativeComponent from 'react-native/Libraries/Components/View/ViewNativeComponent';

let data = [["Max", "Min", "Mid"]]

export const TodoRow = ({item, rowID, remove, complete}, handler) => {
  const [dropText, setDropText] = useState('')

  console.log('WWW_TodoRow_data', data)
  return (
    <View style={{paddingHorizontal: 15}}>
      <View style={styles.viewContainer}
            key={rowID}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={complete}>
            <Text style={StyleSheet.flatten([styles.text, item.completed && styles.textCompleted])}>{item.text}</Text>
          </TouchableOpacity>

          <View style={{flex: 1}}>
            <View style={{height: 30, width: 50}} />
            <DropdownMenu
              bgColor={'#eeeeee'}
              tintColor={'#666666'}
              activityTintColor={'green'}
              // arrowImg={}
              // checkImage={}
              // optionTextStyle={{color: '#333333'}}
              // titleStyle={{color: '#333333'}}
              // maxHeight={300}
              maxWidth={50}
              handler={(selection, row) => setDropText({dropText})}
              data={data}
            >

              <View style={{flex: 1}}>
                <Text>
                  {dropText}
                </Text>
              </View>
            </DropdownMenu>
          </View>

          <TouchableOpacity>
            <Ionicons
              onPress={remove}
              style={{paddingLeft: 20}}
              name='close-outline'
              color='#b5b5b5'
              size={25}/>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#868b9b',
    borderRadius: 5,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#b1abab',
  },
  text: {
    fontSize: 18,
  },

});
