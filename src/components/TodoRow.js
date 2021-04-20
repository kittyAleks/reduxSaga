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
        <View style={styles.mainWrapper}>
            <View style={[styles.rowContainer, {backgroundColor: item.color}]}
                  key={rowID}>
                <View style={styles.todoRoWrapper}>
                    <TouchableOpacity onPress={complete}>
                        <Text
                            style={StyleSheet.flatten([styles.text, item.completed && styles.textCompleted])}>
                            {item.body}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons
                            onPress={remove}
                            style={{paddingLeft: 20}}
                            name='close-outline'
                            color='#b5b5b5'
                            size={25}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.pickerStyle}>
                    <Picker
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
    mainWrapper: {
        paddingHorizontal: 20,
    },
    rowContainer: {
        backgroundColor: '#e0d7d7',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#868b9b',
        borderRadius: 5,
    },
    todoRoWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textCompleted: {
        textDecorationLine: 'line-through',
        color: '#e90606',
    },
    text: {
        fontSize: 18,
        color: 'white',
        flexWrap: 'wrap'
    },
    pickerStyle: {
        flexDirection: 'column',
        paddingHorizontal: '30%',
    }
});
