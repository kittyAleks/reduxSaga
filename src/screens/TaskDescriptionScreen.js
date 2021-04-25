import React, {useEffect, useState, useCallback} from 'react'
import {Alert, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Text, Button, InputGroup, Input} from 'native-base';
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";
import { useHeaderHeight } from '@react-navigation/stack';
import {createNewTodo} from "../store/reducers/TodoState";

export const TaskDescriptionScreen = ({navigation, route}) => {
    const {color} = route.params;
    const dispatch = useDispatch()
    const [text, setText] = useState('')
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
        if (text.trim()) {
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
            Alert.alert('Поле не может быть пустым')
        }
    };

    return (
        <Container style={[styles.container, {backgroundColor: color}]}>
            <View style={[styles.inputGroupContainer, {marginTop: headerHeight}]}>
                <InputGroup style={{marginTop: 6, marginBottom: 10}} borderType='regular'>
                    <Input
                        style={styles.inputStyle}
                        borderType='regular'
                        value={text}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={changeText}
                        placeholder='Create your task'/>
                </InputGroup>
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
    }
});
