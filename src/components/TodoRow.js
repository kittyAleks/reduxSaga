import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import moment from 'moment';

import {setPriorityTodo} from "../store/action/todosActions";

const guidelineBaseWidth = 375; // ширина экрана
const {width} = Dimensions.get('window')
export const scale = size => {
    Math.round(width / guidelineBaseWidth * size);
}

export const TodoRow = ({item, rowID, showHideModal, complete, openNewScreen}) => {
    const dispatch = useDispatch()
    const currentDate = moment(item.createdAt).format("D.MM.Y");

    const valueChange = (id, selectedValue) => {
        dispatch(setPriorityTodo(id, selectedValue))
    }

    return (
        <View style={styles.mainTodosWrapper}>
            <TouchableOpacity onPress={openNewScreen} style={[styles.todoWrapper, {backgroundColor: item.color}]}
                              key={rowID}>
                <View style={styles.todoTextWrapper}>
                    <View style={{
                        height: 100, paddingHorizontal: 8, marginTop: 8,
                    }} onPress={complete}>
                        <Text
                            numberOfLines={5}
                            ellipsizeMode="tail"
                            style={StyleSheet.flatten([styles.text,
                                item.completed && styles.textCompleted])}>
                            {item.body}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', paddingBottom: 8,
                        justifyContent: 'space-around'
                    }}>
                        <Text style={{
                            paddingRight: 53,
                            color: 'black',
                            opacity: 0.6,
                            marginLeft: 16
                        }}>{currentDate}</Text>
                        <TouchableOpacity>
                            <Ionicons
                                onPress={showHideModal}
                                style={{color: 'black', opacity: 0.6, marginRight: 8}}
                                name='ellipsis-horizontal-circle-sharp'
                                size={30}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*<View style={styles.pickerStyle}>*/}
                {/*    <Picker style={{height: 100}} itemStyle={{height: 120, color: 'white'}}*/}
                {/*        selectedValue={item.selectedValue}*/}
                {/*        onValueChange={(selectedValue) => valueChange(item.id, selectedValue)}>*/}
                {/*        {renderPicker}*/}
                {/*    </Picker>*/}
                {/*</View>*/}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainTodosWrapper: {
    },
    todoWrapper: {
        backgroundColor: '#e0d7d7',
        paddingHorizontal: scale(8),
        marginHorizontal: 4.5,
        marginVertical: 4.5,
        borderWidth: 1,
        borderColor: '#447e2f',
        borderRadius: 20,
        width: 167,
        height: 167,
    },
    todoTextWrapper: {
        flexDirection: 'column',
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    textCompleted: {
        textDecorationLine: 'line-through',
        color: '#e90606',
    },
    text: {
        fontSize: 14,
        color: 'black',
    },
    // pickerStyle: {
    //     paddingHorizontal: 10,
    //     marginTop: 10
    // }
});
