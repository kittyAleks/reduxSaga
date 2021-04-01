import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropdownMenu from "react-native-dropdown-menu";

export const TodoRow = ({item, rowID, remove, complete, handler, dataArray}) => {
  return (
    <View style={{paddingHorizontal: 15}}>
      <View style={styles.viewContainer}
            key={rowID}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

          <TouchableOpacity onPress={complete}>
            <Text style={StyleSheet.flatten([styles.text, item.completed && styles.textCompleted])}>{item.text}</Text>
          </TouchableOpacity>

          <View style={{width: 120}}>
            <DropdownMenu
              bgColor={'#eeeeee'}
              tintColor={'#666666'}
              activityTintColor={'green'}
              handler={handler}
              data={dataArray}
            >
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
    paddingBottom: 100,
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
