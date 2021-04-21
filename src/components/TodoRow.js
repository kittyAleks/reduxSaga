import React, {useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {Picker} from "@react-native-community/picker";

import {setPriorityTodo} from "../store/action/todosActions";

export const TodoRow = ({item, rowID, remove, complete, renderPicker}) => {
    const dispatch = useDispatch()

    const valueChange = (id, selectedValue) => {
        dispatch(setPriorityTodo(id, selectedValue))
    }

    return (
        <View style={styles.mainTodosWrapper}>
            <View style={[styles.todoWrapper, {backgroundColor: item.color}]}
                  key={rowID}>
                <View style={styles.todoTextIconWrapper}>
                    <TouchableOpacity onPress={complete}>
                        <Text
                            style={StyleSheet.flatten([styles.text, item.completed && styles.textCompleted])}>
                            {item.body}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons
                            onPress={remove}
                            // style={{color: 'red'}}
                            name='close-outline'
                            color='#b5b5b5'
                            size={25}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.pickerStyle}>
                    <Picker style={{height: 100}} itemStyle={{height: 120, color: 'white'}}
                        selectedValue={item.selectedValue}
                        onValueChange={(selectedValue) => valueChange(item.id, selectedValue)}>
                        {renderPicker}
                    </Picker>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainTodosWrapper: {
        paddingHorizontal: 10,
    },
    todoWrapper: {
        backgroundColor: '#e0d7d7',
        paddingHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#868b9b',
        borderRadius: 20,
        width: 167,
        height: 167,

    },
    todoTextIconWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5
    },
    textCompleted: {
        textDecorationLine: 'line-through',
        color: '#e90606',
    },
    text: {
        fontSize: 14,
        color: 'white',
    },
    pickerStyle: {
        paddingHorizontal: 10,
        marginTop: 10
    }
});
