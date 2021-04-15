import React, {useState} from 'react'

import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native'
import {Button, Container, Input, InputGroup} from "native-base";
import {HomeScreen} from "./HomeScreen";
import {useDispatch, useSelector} from "react-redux";
import {addTodo} from "../store/action/todosActions";
import {v4 as uuidv4} from "uuid";

export const CreateTodoListScreen = ({navigation}) => {
    const backgroundTodoColor = ['#f12323', '#ff7200', '#ffdd00', '#44ff00', '#00ffea', '#446bd6', '#ef72cb']
    const [count, setCount] = useState(0)

    const [text, setText] = useState('')
    const [color, setColor] = useState(backgroundTodoColor[0])

    const dispatch = useDispatch()
    // const currentItem = useSelector(state => state.todos.allTodos)
    // console.log('WWWWW_currentItem', currentItem)

    const changeText = text => {
        setText(text);
    }
    const handleAddTodo = (text) => {
        if (text.trim()) {
            dispatch(addTodo(uuidv4(), text, color, count))
            setText('')
            // setCount(count + 1)
            navigation.navigate('HomeScreen')
        } else {
            Alert.alert('Поле не может быть пустым')
        }
    };

    const clearTodoList = () => {
        setCount(0)
    }

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
                <Text>{count}</Text>

                <Button onPress={() => {
                    clearTodoList()
                }}
                    style={{paddingHorizontal: 20, backgroundColor: '#00b7ad', borderRadius: 20}}>
                    <Text>Clear</Text>
                </Button>

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
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: 10,
        marginVertical: 20,
    }

});
