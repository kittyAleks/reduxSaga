import React, {useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {Picker} from "@react-native-community/picker";

import {setPriorityTodo} from "../store/action/todosActions";
import AntDesign from "react-native-vector-icons/AntDesign";

const guidelineBaseWidth = 375; // ширина экрана
// const width = Dimensions.get('window').width
const {width} = Dimensions.get('window')
console.log('AAAA_width', width)
export const scale = size => {
    console.log('AAAA_size', Math.round(width / guidelineBaseWidth * size))
    Math.round(width / guidelineBaseWidth * size);
}


// const {width} = Dimensions.get('screen')
// console.log('AAA_width', width)
export const TodoRow = ({item, rowID, remove, complete, renderPicker, openNewScreen}) => {
    const dispatch = useDispatch()

    const valueChange = (id, selectedValue) => {
        dispatch(setPriorityTodo(id, selectedValue))
    }

    return (
        <View style={styles.mainTodosWrapper}>
            <TouchableOpacity onPress={openNewScreen} style={[styles.todoWrapper, {backgroundColor: item.color}]}
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
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainTodosWrapper: {
        // marginHorizontal: 9
    },
    todoWrapper: {
        backgroundColor: '#e0d7d7',
        paddingHorizontal: scale(10),
        marginHorizontal: 4.5,
        marginVertical: 4.5,
        borderWidth: 1,
        borderColor: '#447e2f',
        borderRadius: 20,
        width: 167,
        height: 167,
    },
    todoTextIconWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,

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
