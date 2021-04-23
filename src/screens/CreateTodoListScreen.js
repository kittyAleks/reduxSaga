import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native'
import {Button, Container, Input, InputGroup} from "native-base";

import AntDesign from "react-native-vector-icons/AntDesign";

export const CreateTodoListScreen = ({navigation}) => {

    return (
        <Container style={[styles.container, {backgroundColor: 'white'}]}>
            {/*<View style={styles.inputGroupContainer}>*/}
            {/*    <InputGroup style={{marginTop: 6, marginBottom: 10}} borderType='regular'>*/}
            {/*        <Input*/}
            {/*            style={styles.inputStyle}*/}
            {/*            borderType='regular'*/}
            {/*            value={text}*/}
            {/*            autoCapitalize="none"*/}
            {/*            autoCorrect={false}*/}
            {/*            onChangeText={changeText}*/}
            {/*            placeholder='Create your task'/>*/}
            {/*    </InputGroup>*/}
            {/*</View>*/}

            <TouchableOpacity
                // onPress={() => {
                //     createTodoList()
                // }}
                style={{alignItems: 'center', alignSelf: 'center', position: 'absolute', bottom: 33}}>
                <AntDesign name='closecircle' color='black' size={56}/>
            </TouchableOpacity>

            {/*<View style={{paddingHorizontal: 20}}>*/}
            {/*    <Button block style={{*/}
            {/*        backgroundColor: '#00b7ad',*/}
            {/*        alignItems: 'center',*/}
            {/*        marginTop: 30*/}
            {/*    }}*/}
            {/*            onPress={(color) => handleAddTodo(text, color)}>*/}
            {/*        <Text allowFontScaling={false}*/}
            {/*              style={{*/}
            {/*                  lineHeight: 23,*/}
            {/*                  fontSize: 23,*/}
            {/*                  color: 'white'*/}
            {/*              }}>Add Todo*/}
            {/*        </Text>*/}
            {/*    </Button>*/}
            {/*</View>*/}
        </Container>
    )
}
// CreateTodoListScreen.navigationOptions = {
//     headerTitle: 'Devices Screen'
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f2e0'
    },
    inputGroupContainer: {
        paddingHorizontal: 10,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputStyle: {
        borderWidth: 1,
        paddingLeft: 10,
        paddingBottom: 5,
        borderRadius: 5,
        borderColor: '#c9c9c9',
        height: 40,
    },
});

