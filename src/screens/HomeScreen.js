import React from 'react'
import {View, StyleSheet, FlatList} from 'react-native';
import {Container, Text, Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

import {TodoRow} from '../components/TodoRow';
import {completedTodo, removeTodo} from '../store/action/todosActions';
import {Picker} from "@react-native-community/picker";

export const HomeScreen = ({navigation, route}) => {
  const {color} = route.params;
  console.log('QQQ_route.params', route.params)

  const Item = Picker.Item;

  const dispatch = useDispatch()

  const getTodo = useSelector(state => state.todos.allTodos)

  const removeTodoItem = (id) => {
    dispatch(removeTodo(id))
  };

  const completeTodoItem = (id) => {
    dispatch(completedTodo(id))
  }
  const createTodoList = () => {
    navigation.navigate('CreateTodoListScreen')
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
      <View style={styles.todoListContainer}>
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
            colorTodo={color}
            item={item}/>
          }
        />
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
  },
  todoListContainer: {
    paddingHorizontal: 10,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }

});
// HomeScreen.navigationOptions = {
//   headerTitle: 'Home Screen'
// }
