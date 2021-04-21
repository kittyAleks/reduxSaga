import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native'
import {Button, Container, Input, InputGroup} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";

import {HomeScreen} from "./HomeScreen";
import {createNewTodo} from "../store/reducers/TodoState";


export const CreateTodoListScreen = ({navigation}) => {
    const backgroundTodoColor = ['#f12323', '#ff7200', '#ffdd00', '#44ff00', '#00ffea', '#446bd6', '#ef72cb']

    const [text, setText] = useState('')
    const [color, setColor] = useState(backgroundTodoColor[0])

    const dispatch = useDispatch()

    const changeText = text => {
        setText(text);
    }

    const handleAddTodo = async (text) => {
        if (text.trim()) {
        const newTodo = {
            id: new Date().toJSON(),
            body: text,
            color: color,
            priority: uuidv4(),
        }
            dispatch(createNewTodo(newTodo))
            setText('')
            navigation.navigate('HomeScreen')
        } else {
            Alert.alert('Поле не может быть пустым')
        }
    };

    const renderColor = () => {
        return backgroundTodoColor.map(color => {
            return <TouchableOpacity key={color} style={[styles.backgroundColorSelect, {backgroundColor: color}]}
                onPress={() => {
                    setColor(color)
                }}>
            </TouchableOpacity>
        })
    }

    return (
        <Container style={styles.container}>
            <View style={styles.inputGroupContainer}>
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

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>{renderColor()}</View>

            <View style={{paddingHorizontal: 20}}>
                <Button block style={{
                    backgroundColor: '#00b7ad',
                    alignItems: 'center',
                    marginTop: 30
                }}
                    onPress={(color) => handleAddTodo(text, color)}>
                    <Text allowFontScaling={false}
                          style={{
                              lineHeight: 23,
                              fontSize: 23,
                              color: 'white'
                          }}>Add Todo
                    </Text>
                </Button>
            </View>
        </Container>
    )
}
CreateTodoListScreen.navigationOptions = {
    headerTitle: 'Devices Screen'
}

const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1,
        paddingLeft: 10,
        paddingBottom: 5,
        borderRadius: 5,
        borderColor: '#c9c9c9',
        height: 40,
    },
    container: {
        backgroundColor: 'white',
        paddingVertical: 30,
        flex: 1,
    },
    inputGroupContainer: {
        paddingHorizontal: 10,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundColorSelect: {
        width: 38,
        height: 38,
        borderRadius: 10,
        marginRight: 12,
        marginVertical: 20,
    }
});
