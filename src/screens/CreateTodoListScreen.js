import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Container} from "native-base";

import AntDesign from "react-native-vector-icons/AntDesign";

export const CreateTodoListScreen = () => {

    return (
        <Container style={[styles.container, {backgroundColor: 'white'}]}>
            <TouchableOpacity
                // onPress={() => {
                //     createTodoList()
                // }}
                style={{alignItems: 'center', alignSelf: 'center', position: 'absolute', bottom: 33}}>
                <AntDesign name='closecircle' color='green' size={56}/>
            </TouchableOpacity>
        </Container>
    )
}

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
});

