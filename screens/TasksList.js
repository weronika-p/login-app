import React, { useState, useRef, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import { url } from '../constants/constants';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SubTitle, StyledContainer, WelcomeImage, ExtraView } from '../components/styles';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../components/styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { LeftAction, RightAction } from '../components/SwipeActions';
import { deleteTask, getEventId } from '../shared/sharedFunctions';
import * as Calendar from 'expo-calendar';
import { AuthContext } from '../context/auth-context';
import Frog from '../components/AnimatedFrog';
import Modals from '../components/Modals';

const { accent, contrastAccent } = Colors;

export default function TasksList({ navigation, route }) {
  const [message, setMessage] = useState('');
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [typeModal, setTypeModal] = useState('');

  const path = `${url}task/list`;
  const swipeableRef = useRef(null);
  const context = useContext(AuthContext);

  const closeSwipeable = (item) => {
    swipeableRef.current.close();
    navigation.navigate('EditTask', item);
  };

  const openEventInCalendar = async (date) => {
    const eventId = await getEventId(context, date);
    return Calendar.openEventInCalendar(eventId);
  };

  async function fetchData() {
    try {
      const response = await axios.get(path, {
        params: {
          creator: route.params,
        },
      });
      const { data, status } = response;
      if (status === 200) {
        const fetchedTasks = data;
        return context.updateTasks(fetchedTasks);
      }
    } catch (error) {
      return setMessage(error);
    }
  }

  if (!isLoadingComplete) {
    return <AppLoading startAsync={fetchData} onFinish={() => setIsLoadingComplete(true)} onError={console.warn} />;
  } else {
    return (
      <>
        <StatusBar style="dark" />
        <StyledContainer>
          {modalOpen && (
            <Modals
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              typeModal={typeModal}
            />
          )}
          {context.listOfTasks.length
          ? (
            <View style={{ flex: 1 }}>
              <FlatList
                data={context.filteredList.length ? context.filteredList : context.listOfTasks }
                renderItem={({ item }) => (
                  <Swipeable
                    ref={swipeableRef}
                    renderLeftActions={LeftAction}
                    leftThreshold={80}
                    onSwipeableLeftOpen={() => closeSwipeable(item)}
                    renderRightActions={RightAction}
                    rightThreshold={41}
                    onSwipeableRightOpen={() =>
                      deleteTask(item._id, context, new Date(item.endDate))
                    }
                  >
                    <TouchableOpacity onPress={() => openEventInCalendar(new Date(item.endDate))}>
                      <Card priority={item.priority}>
                        <SubTitle style={{ color: contrastAccent }}>{item.title}</SubTitle>
                        {item.priority === 1 && <Frog />}
                      </Card>
                    </TouchableOpacity>
                  </Swipeable>
                )}
                keyExtractor={(item) => {
                  return item._id.toString();
                }}
              />
            </View>
          ) : (
            <>
              <WelcomeImage source={require('./../assets/rest.png')} style={{ marginTop: 10 }} />
              <SubTitle style={{ marginTop: 20, textAlign: 'center' }}>You don't have any tasks :)</SubTitle>
            </>
          )}
          <ExtraView>
            <Ionicons
              name="filter"
              size={24}
              style={styles.modalToggle}
              onPress={() => {
                setTypeModal('filter');
                setModalOpen(true);
              }}
            />
            <Ionicons
              name="add"
              size={24}
              style={styles.modalToggle}
              onPress={() => {
                setTypeModal('addTask');
                setModalOpen(true);
              }}
            />
          </ExtraView>
        </StyledContainer>
      </>
    );
  }
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
});
