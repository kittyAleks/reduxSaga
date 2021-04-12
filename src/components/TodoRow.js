import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import {Picker} from "@react-native-community/picker";
import {setPriorityTodo} from "../store/action/todosActions";

export const TodoRow = ({item, rowID, remove, complete, renderPicker, colorTodo}) => {
  const {width} = Dimensions.get('window');
  const pickerWidth = width / 2;
  const dispatch = useDispatch()

  const valueChange = (id, selectedValue) => {
    dispatch(setPriorityTodo(id, selectedValue))
  }

  // const valueChange = useCallback((id, selectedValue) => {
  //   dispatch(setPriorityTodo(id, selectedValue))
  // },[dispatch])

  return (
    <View style={{paddingHorizontal: 15}}>
      <View style={[styles.viewContainer, {backgroundColor: colorTodo}]}
            key={rowID}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

          <TouchableOpacity onPress={complete}>
            <Text style={StyleSheet.flatten([styles.text, item.completed && styles.textCompleted])}>{item.text}</Text>
          </TouchableOpacity>

          <View style={{width: pickerWidth}}>
            <Picker
              selectedValue={item.selectedValue}
              onValueChange={(selectedValue) => valueChange(item.id, selectedValue)}>
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
    backgroundColor: '#e0d7d7',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#868b9b',
    borderRadius: 5,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#e90606',
  },
  text: {
    fontSize: 18,
  },

});
