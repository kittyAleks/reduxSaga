import React, {useEffect} from 'react'
import {View, StyleSheet, FlatList} from 'react-native';
import {Container, Text, Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from "@react-native-community/picker";

import {TodoRow} from '../components/TodoRow';
import {clearTodoList, completedTodo, removeTodo} from '../store/action/todosActions';
import {deleteTodo, fetchTodo} from "../store/reducers/TodoState";

export const HomeScreen = ({navigation}) => {

    const Item = Picker.Item;

    const dispatch = useDispatch()

    const getTodo = useSelector(state => state.todos.allTodos)

    const removeTodoItem = (id) => {
        dispatch(deleteTodo(id))
    };

    const completeTodoItem = (id) => {
        dispatch(completedTodo(id))
    }
    const createTodoList = () => {
        navigation.navigate('CreateTodoListScreen', )
    }
    const clearTodos = () => {
        dispatch(clearTodoList())
    }

    useEffect(() => {
        dispatch(fetchTodo())
    }, [dispatch]);

    const renderPickerOptions = () => {
        let pickerItems = [];
        pickerItems.push(
            <Item key="1" label="Max" value="Max"/>,
            <Item key="2" label="Min" value="Min"/>,
            <Item key="3" label="Mid" value="Mid"/>
        );
        return pickerItems
    }

    return (
        <Container style={styles.container}>
            <View style={styles.todoListContainer}>
                <View>
                    <Button onPress={() => {
                        clearTodos()
                    }}
                        style={{backgroundColor: '#00b7ad', borderRadius: 50}}>
                        <Text>Clear</Text>
                    </Button>
                </View>
                <View>
                    <Button onPress={() => {
                        createTodoList()
                    }}
                        style={{backgroundColor: '#00b7ad', borderRadius: 50}}>
                        <Text>Create Todo</Text>
                    </Button>
                </View>
            </View>

            <View style={{flex: 1}}>
                <FlatList
                    data={getTodo}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <TodoRow
                        remove={() => removeTodoItem(item.id)}
                        complete={() => completeTodoItem(item.id)}
                        dataTodo={getTodo}
                        renderPicker={renderPickerOptions()}
                        item={item}/>
                    }
                />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        paddingVertical: 20,
        flex: 1,
    },
    todoListContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
    }

});
