import React, { useState, useRef, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import { url } from '../constants/constants'
import { FlatList, View, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Animated } from 'react-native';
import { SubTitle, StyledContainer, WelcomeImage } from '../components/styles';
import Card from '../components/Card';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../components/styles';
import TaskForm from '../components/AddTask';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { LeftAction, RightAction } from '../components/SwipeActions';
import { deleteTask } from '../shared/sharedFunctions';
import * as Calendar from 'expo-calendar';
import { AuthContext } from '../context/auth-context';
import Frog from '../components/AnimatedFrog';

const { accent, contrastAccent, tertiary } = Colors
const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome5)

export default function TasksList({ navigation, route }) {
    const [listOfTasks, setListOfTasks] = useState([])
    const [message, setMessage] = useState('')
    const [isLoadingComplete, setIsLoadingComplete] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const path = `${url}task/list`
    const swipeableRef = useRef(null)
    const calendarContext = useContext(AuthContext)

    const closeSwipeable = () => {
        swipeableRef.current.close();
    }

    const getEventId = async (date) => {
        const events = await Calendar.getEventsAsync(['11'], date, date)
        const eventId = events[0].id
        console.log(events, eventId)
        return Calendar.openEventInCalendar(eventId)
    }

    async function fetchData() {
        try {
            const response = await axios.get(path, { params: {
                creator: route.params
            }})
            const { data, status } = response
            if(status === 200) {
                const fetchedTasks = data
                return setListOfTasks(fetchedTasks)
            }
        } catch (error) {
            return setMessage(error)
        }
    }

    if (!isLoadingComplete) {
        return (
            <AppLoading 
                startAsync={fetchData}
                onFinish={() => setIsLoadingComplete(true)}
                onError={console.warn}
            />
        )
        
    } else {
        return (
            <>
                <StatusBar style='dark' />
                <StyledContainer>
                    <Modal visible={modalOpen} animationType='slide'>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{flex: 1, backgroundColor: tertiary}}>
                                <Ionicons 
                                    name='close'
                                    size={24}
                                    style={{...styles.modalToggle, ...styles.modalClose}}
                                    onPress={() => setModalOpen(false)}
                                />
                                <TaskForm setModalOpen={setModalOpen} creator={route.params} setListOfTasks={setListOfTasks} />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    {listOfTasks.length > 0 
                        ? (
                            <View>
                                <FlatList
                                    data={listOfTasks}
                                    renderItem={({ item }) => (
                                        <Swipeable
                                            ref={swipeableRef}
                                            renderLeftActions={LeftAction}
                                            leftThreshold={80}
                                            onSwipeableLeftOpen={() => {
                                                navigation.navigate('EditTask', item)
                                                closeSwipeable()
                                            }}
                                            renderRightActions={RightAction}
                                            rightThreshold={41}
                                            onSwipeableRightOpen={() => deleteTask(item._id, setListOfTasks)}
                                        >
                                            <TouchableOpacity onPress={() => getEventId(new Date(item.endDate))}>
                                                <Card priority={item.priority}>
                                                    <SubTitle style={{color: contrastAccent}}>{item.title}</SubTitle>
                                                    {item.priority === 1 && <Frog />}
                                                </Card>
                                            </TouchableOpacity>
                                        </Swipeable>
                                    )}
                                    keyExtractor={item => {
                                        return item._id.toString()}
                                    }
                                />
                            </View>
                        )
                        : (
                            <>
                                <WelcomeImage source={require('./../assets/rest.png')} style={{marginTop: 10}} />
                                <SubTitle style={{marginTop: 20, textAlign: 'center'}}>You don't have any tasks :)</SubTitle>
                            </>
                        )
                    }
                    <Ionicons 
                        name='add'
                        size={24}
                        style={styles.modalToggle}
                        onPress={() => setModalOpen(true)}
                    />
                </StyledContainer>
            </>
        )
    }    
}

const styles = StyleSheet.create({
    modalToggle: {
        margin: 50,
        backgroundColor: accent,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'flex-end',
        color: contrastAccent
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
        alignSelf: 'center',
        color: contrastAccent,
        backgroundColor: accent
    }
})