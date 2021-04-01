import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import {store} from './src/store';

import {RootStackScreen} from './src/navigation/RootStackScreen';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen/>
      </NavigationContainer>
    </Provider>
  );
};

// Переписать экшен криейторы таким образом, чтобы данные хранились в свойстве payload;
// Сделать поддержку приоритетов задач
// Вынести селекторы в отделбную папку, в отдельную функцию
