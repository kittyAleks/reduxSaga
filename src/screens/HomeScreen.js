import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Alert, FlatList, TextInput} from 'react-native';
import {Container, InputGroup, Input, Text, Button as NBButton} from 'native-base';
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from 'react-redux';

import {TodoRow} from '../components/TodoRow';
import {addTodo, completedTodo, removeTodo} from '../store/action/todosActions';
import {Picker} from "@react-native-community/picker";

export const HomeScreen = () => {
  const [text, setText] = useState('')
  const Item = Picker.Item;

  const dispatch = useDispatch()

  const getTodo = useSelector(state => state.todos.allTodos)

  const changeText = text => {
    setText(text);
  }

  const handleAddTodo = () => {
    if(text.trim()) {
      dispatch(addTodo(uuidv4(), text))
      setText('')
    } else {
      Alert.alert('Поле не может быть пустым')
    }
  };

  const removeTodoItem = (id) => {
    dispatch(removeTodo(id))
  };

  const completeTodoItem = (id) => {
    dispatch(completedTodo(id))
  }

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
      <View style={{
        paddingHorizontal: 10,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',

      }}>
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

      <View style={{paddingHorizontal: 20}}>
        <NBButton block style={{
          backgroundColor: '#00b7ad',
          alignItems: 'center',
          marginTop: 30
        }}
          onPress={() => handleAddTodo(text)}
        >
          <Text allowFontScaling={false}
            style={{
              lineHeight: 23,
              fontSize: 23,
              color: 'white'
            }}>Add Todo
          </Text>
        </NBButton>
      </View>
    </Container>
  )
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
    paddingVertical: 20,
    flex: 1,
  }

});
// HomeScreen.navigationOptions = {
//   headerTitle: 'Home Screen'
// }
