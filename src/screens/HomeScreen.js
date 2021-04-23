import React, {useEffect, useState} from 'react'
import {View, StyleSheet, FlatList, Dimensions, TouchableOpacity, Alert} from 'react-native';
import {Container, Text, Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from "@react-native-community/picker";
import { useHeaderHeight } from '@react-navigation/stack';

import {TodoRow} from '../components/TodoRow';
import {clearTodoList, completedTodo} from '../store/action/todosActions';
import {clearAllTodos, createNewTodo, deleteTodo, fetchTodo} from "../store/reducers/TodoState";
import {CreateTodoListScreen} from "./CreateTodoListScreen";
import AntDesign from "react-native-vector-icons/AntDesign";

const {width} = Dimensions.get('screen');

export const HomeScreen = ({navigation}) => {
    const backgroundTodoColor = ['#FF8B66', '#FFD466', '#C566FF', '#669AFF', '#CEFF66'];
    const [color, setColor] = useState(backgroundTodoColor[0])
    const headerHeight = useHeaderHeight();

    const Item = Picker.Item;

    const dispatch = useDispatch()

    const getTodo = useSelector(state => state.todos.allTodos)

    const renderColor = () => {
        return backgroundTodoColor.map(color => {
            return <TouchableOpacity key={color} style={[styles.backgroundColorSelect, {backgroundColor: color}]}
                onPress={() => {
                 handleAddTodo(color)
                }}
            >
            </TouchableOpacity>
        })
    }
    const handleAddTodo = (color) => {
        setColor(color)
        navigation.navigate('TaskDescriptionScreen', {color})
    };
    const removeTodoItem = (id) => {
        dispatch(deleteTodo(id))
    };

    const completeTodoItem = (id) => {
        dispatch(completedTodo(id))
    }
    const createTodoList = () => {
        navigation.navigate('CreateTodoListScreen',)
    }
    const clearTodos = () => {
        dispatch(clearAllTodos())
    }
    const openNewScreen = (item) => {
        const {body} = item;
        console.log('navigation_body', body)

        navigation.navigate('TaskDescriptionScreen', {body})
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
            <View style={[styles.container, {backgroundColor: 'white'}]}>
                {/*<View style={styles.buttonContainer}>*/}
                {/*    <View>*/}
                {/*        <Button onPress={() => {*/}
                {/*            clearTodos()*/}
                {/*        }}*/}
                {/*            style={{backgroundColor: '#00b7ad', borderRadius: 50}}>*/}
                {/*            <Text>Clear</Text>*/}
                {/*        </Button>*/}
                {/*    </View>*/}
                {/*    <View>*/}
                {/*        <Button onPress={() => {*/}
                {/*            createTodoList()*/}
                {/*        }}*/}
                {/*            style={{backgroundColor: '#00b7ad', borderRadius: 50}}>*/}
                {/*            <Text>Create Todo</Text>*/}
                {/*        </Button>*/}
                {/*    </View>*/}
                {/*</View>*/}

                <View style={[styles.flatListContainer, {marginTop: headerHeight}]}>
                    <FlatList
                        data={getTodo}
                        keyExtractor={(item) => item.id}
                        numColumns={2}

                        renderItem={({item}) => <TodoRow
                            openNewScreen={() => openNewScreen(item)}
                            remove={() => removeTodoItem(item.id)}
                            complete={() => completeTodoItem(item.id)}
                            dataTodo={getTodo}
                            renderPicker={renderPickerOptions()}
                            item={item}/>
                        }
                    />
                </View>
                <View style={styles.colorContainer}>{renderColor()}</View>

                <TouchableOpacity
                    onPress={() => {
                        createTodoList()
                    }}
                    style={{alignItems: 'center', alignSelf: 'center', position: 'absolute', bottom: 33}}>
                    <AntDesign name='pluscircle' color='black' size={56}/>
                </TouchableOpacity>

            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListContainer: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginHorizontal: 56,
        borderRadius: 14,
        position: 'absolute',
        bottom: 106,
    },
    backgroundColorSelect: {
        width: 38,
        height: 38,
        borderRadius: 10,
        marginHorizontal: 6,
        marginVertical: 12,
    },
});
