import React, {useEffect, useState, useCallback} from 'react'
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Container, Text} from 'native-base';
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {useHeaderHeight} from '@react-navigation/stack';

import {createNewTodo} from "../services/createNewTodo";
import {editTodoItem} from "../services/editTodoItem";

export const TaskDescriptionScreen = ({navigation, route}) => {
    const {id, body, color} = route.params;

    const dispatch = useDispatch()
    const [text, setText] = useState(body)
    const headerHeight = useHeaderHeight();

    const onDone = useCallback(() => addNewTodo(text, color), [text, color]);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <TouchableOpacity onPress={onDone} style={{paddingRight: 11}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>Готово</Text>
                </TouchableOpacity>,
        });
    }, [onDone]);

    const changeText = useCallback((text) => {
        setText(text);
    }, [setText]);
    // TODO: обернуть с useCallback
    const addNewTodo = (text, color) => {
        if (text.trim() && !id) {
        const newTodo = {
            id: uuidv4(),
            body: text,
            color: color,
            priority: uuidv4(),
            createdAt: (+new Date())
        }
        dispatch(createNewTodo(newTodo))
        setText('')
        navigation.navigate('HomeScreen', {color, text})
        } else {
            updateTodo(text)
        }
    };

    const updateTodo = (text) => {
        const updateItem = {
            id,
            body: text,
        }
        dispatch(editTodoItem(updateItem))
        navigation.navigate('HomeScreen')
    }

    return (
        <Container style={[styles.container, {backgroundColor: color}]}>
            <View style={{marginTop: headerHeight, paddingHorizontal: 16}}>
                <TextInput
                    style={styles.inputStyle}
                    multiline
                    selectionColor='black'
                    autoFocus={!text}
                    autoCorrect={false}
                    maxLength={80}
                    numberOfLines={4}
                    placeholder='Создайте заметку'
                    onChangeText={changeText}
                    value={text}
                />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    inputStyle: {
        fontSize: 18,
        paddingVertical: 5,
        borderColor: '#c9c9c9',
    },
});
