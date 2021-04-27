import React, {useEffect, useState} from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Pressable,
    Modal,
    RefreshControl,
} from 'react-native';
import {Container, Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from "@react-native-community/picker";
import {useHeaderHeight} from '@react-navigation/stack';

import {TodoRow} from '../components/TodoRow';
import {clearTodoList, completedTodo} from '../store/action/todosActions';
import {clearAllTodos, createNewTodo, fetchTodo} from "../store/reducers/TodoState";
import {CreateTodoListScreen} from "./CreateTodoListScreen";
import AntDesign from "react-native-vector-icons/AntDesign";
import {ModalComponent} from "../components/ModalComponent";
import {deleteTodo} from "../services/deleteTodo";

const {width, height} = Dimensions.get('screen');
console.log('QQQ_height', height)

export const HomeScreen = ({navigation}) => {
    const backgroundTodoColor = ['#FF8B66', '#FFD466', '#C566FF', '#669AFF', '#CEFF66'];
    const [color, setColor] = useState(backgroundTodoColor[0])
    const [isVisibleColorContainer, setIsVisibleColorContainer] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [name, setName] = useState('pluscircle')
    const [refreshing, setRefreshing] = useState(false)


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
        setIsVisibleColorContainer(false)
    };
    const updateColorTodoItem = () => {

    }

    const removeTodoItem = (selectedItem) => {
        dispatch(deleteTodo(selectedItem))
        setModalVisible(!modalVisible);
    };

    const showHideModal = (selectedItem) => {
        setSelectedItem(selectedItem)
        setModalVisible(!modalVisible);
    }

    const completeTodoItem = (id) => {
        dispatch(completedTodo(id))
    }
    const clearTodos = () => {
        dispatch(clearAllTodos())
    }
    const openNewScreen = (item) => {
        const {body, color, id} = item;
        navigation.navigate('TaskDescriptionScreen', {id, body, color})
    }

    // useEffect(() => {
    //     dispatch(fetchTodo())
    // }, [dispatch]);

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
        <View
              style={[styles.container, modalVisible ? {backgroundColor: 'rgba(0,0,0,0.3)'} : 'white']}>
            {/*<View style={styles.buttonContainer}>*/}
            {/*    <View>*/}
            {/*        <Button onPress={() => {*/}
            {/*            clearTodos()*/}
            {/*        }}*/}
            {/*            style={{backgroundColor: '#00b7ad', borderRadius: 50}}>*/}
            {/*            <Text>Clear</Text>*/}
            {/*        </Button>*/}
            {/*    </View>*/}
            {/*</View>*/}

            <View style={[styles.flatListContainer, {marginTop: headerHeight}]}>
                <FlatList
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={refreshing}
                    //         onRefresh={onRefresh}
                    //     />
                    // }
                    data={getTodo}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({item}) => <TodoRow
                        openNewScreen={() => openNewScreen(item)}
                        // remove={() => removeTodoItem(item.id)}
                        complete={() => completeTodoItem(item.id)}
                        showHideModal={() => showHideModal(item.id)}
                        dataTodo={getTodo}
                        renderPicker={renderPickerOptions()}
                        item={item}/>
                    }
                />
            </View>
            {/*<Text> Создайте первую заметку </Text>*/}

            {isVisibleColorContainer &&
            <View style={styles.colorContainer}>{renderColor()}</View>
            }
            <TouchableOpacity
                onPress={() => {
                    setIsVisibleColorContainer(!isVisibleColorContainer)
                }}
                style={{alignItems: 'center', alignSelf: 'center', position: 'absolute', bottom: 33}}>
                <AntDesign name={isVisibleColorContainer ? 'closecircle' : name} color='black' size={56}/>
            </TouchableOpacity>

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    selectedItem={selectedItem}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}>

                    <View style={styles.centeredView}>

                        <View style={[styles.modalView, {width: width}]}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}
                                style={{position: 'absolute', top: 12, right: 12, bottom: 8}}
                            >
                                <AntDesign name='closecircle' color='#E4E4E5' size={20}/>
                            </TouchableOpacity>

                            <View style={styles.modalColorContainer}>{renderColor()}</View>

                            <Pressable onPress={() => removeTodoItem(selectedItem)}>
                                <Text style={styles.textStyle}>Удалить заметку</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>


            {/*<ModalComponent*/}
            {/*    visible={modalVisible}*/}
            {/*    setModalVisible={() => setModalVisible}*/}
            {/*    removeTask={() => removeTodoItem()}*/}
            {/*/>*/}

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
    modalColorContainer: {
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 56,
        position: 'absolute',
    },
    textStyle: {
        marginTop: 38,
        paddingBottom: 60,
        color: 'red'
    },
    backgroundColorSelect: {
        width: 38,
        height: 38,
        borderRadius: 10,
        marginHorizontal: 6,
        marginVertical: 12,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 600
    },
    modalView: {
        marginLeft: 0,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 80,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
});
