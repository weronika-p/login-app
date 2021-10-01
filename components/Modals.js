import React from "react";
import { Modal, TouchableWithoutFeedback, View, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "./styles";
import TaskForm from "./AddTask";
import Filters from "./Filters";

const { accent, contrastAccent, tertiary } = Colors;

export default function Modals({ modalOpen, setModalOpen, typeModal }) {
    return(
        <Modal visible={modalOpen} animationType="slide">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: tertiary }}>
                <Ionicons
                    name="close"
                    size={24}
                    style={{ ...styles.modalToggle, ...styles.modalClose }}
                    onPress={() => setModalOpen(false)}
                />
                {typeModal === 'addTask'
                ? <TaskForm setModalOpen={setModalOpen} />
                : <Filters setModalOpen={setModalOpen}/>}
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalToggle: {
      margin: 50,
      backgroundColor: accent,
      padding: 10,
      borderRadius: 10,
      alignSelf: 'flex-end',
      color: contrastAccent,
    },
    modalClose: {
      marginTop: 20,
      marginBottom: 0,
      alignSelf: 'center',
      color: contrastAccent,
      backgroundColor: accent,
    },
  });