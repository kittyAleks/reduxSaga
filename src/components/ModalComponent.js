// import React, {useEffect, useState, useCallback} from 'react'
// import {Alert, View, StyleSheet, TouchableOpacity, Button, Modal, Dimensions} from 'react-native';
// import {Container, Text, InputGroup, Input} from 'native-base';
//
// const {width} = Dimensions.get('screen');
//
// export const ModalComponent = ({visible, setModalVisible, removeTask}) => {
//     console.log('WWW_visible', visible)
//     return (
//         <View style={styles.centeredView}>
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={visible}
//                 onRequestClose={setModalVisible}
//             >
//                 <View style={styles.centeredView}>
//                     <View style={[styles.modalView, {width: width}]}>
//                         <Text>Hello World!</Text>
//
//                         <Button
//                             onPress={removeTask}
//                             title='Удалить заметку'>
//                         </Button>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 600
//     },
//     modalView: {
//         // flexDirection: 'row',
//         marginLeft: 0,
//         backgroundColor: "white",
//         borderRadius: 20,
//         paddingVertical: 80,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     }
// })
