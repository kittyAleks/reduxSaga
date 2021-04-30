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
import {Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from "@react-native-community/picker";
import {useHeaderHeight} from '@react-navigation/stack';
import AntDesign from "react-native-vector-icons/AntDesign";

import {TodoRow} from '../components/TodoRow';
import {completedTodo} from '../store/action/todosActions';
import {clearAllTodos} from "../services/clearAllTodos";
import {deleteTodo} from "../services/deleteTodo";
import {fetchTodo} from "../services/fetchTodo";
import {changeTodoColor} from "../services/changeTodoColor";

const {width, height} = Dimensions.get('screen');
const EDIT = 'EDIT';
const CREATE = 'CREATE';
const MODAL_MARGIN_TOP = height - 192;

export const HomeScreen = ({navigation}) => {
    const backgroundTodoColor = ['#f5a883', '#fde482', '#d69cf4', '#b3e1ee', '#96ca00'];
    const [color, setColor] = useState(backgroundTodoColor[0])
    const [isVisibleColorContainer, setIsVisibleColorContainer] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [name, setName] = useState('pluscircle')

    const headerHeight = useHeaderHeight();

    const Item = Picker.Item;

    const dispatch = useDispatch()

    const getTodo = useSelector(state => state.todos.allTodos)

    const renderColor = (option) => {
        return backgroundTodoColor.map(color => {
            return <TouchableOpacity key={color} style={[styles.backgroundColorSelect, {backgroundColor: color}]}
                onPress={() => {
                    switch (option) {
                        case EDIT: {
                            return changeColor(color, selectedItem)
                        }
                        case CREATE: {
                            return handleAddTodo(color)
                        }
                    }
                }}>
            </TouchableOpacity>
        })
    }
    const handleAddTodo = (color) => {
        setColor(color)
        navigation.navigate('TaskDescriptionScreen', {color})
        setIsVisibleColorContainer(false)
    };
    const changeColor = (color, selectedItem) => {
        dispatch(changeTodoColor(color, selectedItem))
        setModalVisible(false)
    }

    const removeTodoItem = (selectedItem) => {
        dispatch(deleteTodo(selectedItem))
        setModalVisible(!modalVisible);
    };

    const showHideModal = (selectedItem) => {
        setSelectedItem(selectedItem)
        setModalVisible(!modalVisible);
        setIsVisibleColorContainer(false)
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
        <View
            style={styles.container}>

            <View style={[styles.flatListContainer, {marginTop: headerHeight, paddingTop: 54/2}]}>
                <FlatList
                    data={getTodo}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({item}) => <TodoRow
                        openNewScreen={() => openNewScreen(item)}
                        complete={() => completeTodoItem(item.id)}
                        showHideModal={() => showHideModal(item.id)}
                        dataTodo={getTodo}
                        renderPicker={renderPickerOptions()}
                        item={item}/>
                    }
                />
            </View>

            {isVisibleColorContainer &&
            <View style={[styles.colorContainer, {marginHorizontal: width / 6.2}]}>{renderColor(CREATE)}</View>
            }
            <TouchableOpacity
                onPress={() => {
                    setIsVisibleColorContainer(!isVisibleColorContainer)
                }}
                style={{alignItems: 'center', alignSelf: 'center', position: 'absolute', bottom: 33}}>
                <AntDesign name={isVisibleColorContainer ? 'closecircle' : name} color='black' size={56}/>
            </TouchableOpacity>

            {modalVisible ?
                <View style={{position: 'absolute', width: width, height: height, backgroundColor: 'black', opacity: 0.5}}/> :
                null}

            <View style={[styles.centeredView, {marginTop: MODAL_MARGIN_TOP}]}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    selectedItem={selectedItem}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}>

                    <View style={[styles.centeredView, {marginTop: MODAL_MARGIN_TOP}]}>

                        <View style={[styles.modalView, {width: width}]}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}
                                style={{position: 'absolute', top: 12, right: 12, bottom: 8}}
                            >
                                <AntDesign name='closecircle' color='#E4E4E5' size={20}/>
                            </TouchableOpacity>

                            <View
                                style={[styles.modalColorContainer, {marginHorizontal: width / 7 + 4}]}>{renderColor(EDIT)}</View>

                            <Pressable onPress={() => removeTodoItem(selectedItem)}>
                                <Text style={styles.textStyle}>Удалить заметку</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    flatListContainer: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'rgba(158, 150, 150, 0.2)',
        paddingHorizontal: 6,
        borderRadius: 14,
        position: 'absolute',
        bottom: 106,
    },
    modalColorContainer: {
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
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
    },
    modalView: {
        height: 196,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 80,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }
});
