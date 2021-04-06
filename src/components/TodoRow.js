import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import {Picker} from "@react-native-community/picker";
import {setPriorityTodo} from "../store/action/todosActions";

export const TodoRow = ({item, rowID, remove, complete, renderPicker}) => {

  const dispatch = useDispatch()

  const valueChange = (id, elem) => {
    dispatch(setPriorityTodo(id, elem))
  }

  return (
    <View style={{paddingHorizontal: 15}}>
      <View style={styles.viewContainer}
            key={rowID}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

          <TouchableOpacity onPress={complete}>
            <Text style={StyleSheet.flatten([styles.text, item.completed && styles.textCompleted])}>{item.text}</Text>
          </TouchableOpacity>

          <View style={{width: 130}}>
            <Picker
              testID="basic-picker"
              selectedValue={item.elem}
              onValueChange={(elem) => valueChange(item.id, elem)}
              // onValueChange={onValueChange}
              accessibilityLabel="Priority">
              {renderPicker}
            </Picker>
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
    paddingVertical: 5,
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
