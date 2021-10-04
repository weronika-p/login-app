import React, { useState, useRef, useContext, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { url } from '../constants/constants';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { SubTitle, StyledContainer } from '../components/styles';
import Card from '../components/Card';
import { Colors } from '../components/styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { LeftAction, RightAction } from '../components/SwipeActions';
import { deleteItem, deleteTask } from '../shared/sharedFunctions';
import { AuthContext } from '../context/auth-context';
import { useFocusEffect } from '@react-navigation/native';

const { contrastAccent } = Colors;

export default function DoneTasksList({ navigation }) {
  const [doneTasks, setDoneTasks] = useState([]);
  const [update, setUpdate] = useState(false);

  const swipeableRef = useRef(null);
  const context = useContext(AuthContext);

  useFocusEffect(useCallback(() => {
    const handleFinishedTasks = () => {
        const finishedTasks = context.listOfTasks.filter((task) => {
          return task.status === 'done';
        });
        finishedTasks && setDoneTasks(finishedTasks);
        setUpdate(false);
    }
    handleFinishedTasks()
  }, [update]));

  const changeStatusToActive = async (itemID) => {
    const id = itemID.toString();
    const path = `${url}task/${id}/status`;
    try {
      const response = await axios.patch(path, { status: 'active' });
      const { status } = response;
      if (status === 200) {
        setDoneTasks((prevState) => deleteItem(prevState, id));
        navigation.navigate('TasksList')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <StyledContainer>
        {doneTasks.length ? (
          <View style={{ flex: 1 }}>
            <FlatList
              data={doneTasks}
              renderItem={({ item }) => (
                <Swipeable
                  ref={swipeableRef}
                  renderLeftActions={LeftAction}
                  leftThreshold={80}
                  onSwipeableLeftOpen={() => changeStatusToActive(item._id)}
                  renderRightActions={RightAction}
                  rightThreshold={41}
                  onSwipeableRightOpen={() => deleteTask(item._id, context, new Date(item.endDate), setUpdate)}
                >
                  <TouchableOpacity>
                    <Card>
                      <SubTitle style={{ color: '#000', textDecorationLine: 'line-through' }}>
                        {item.title}
                      </SubTitle>
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
          <SubTitle style={{ marginTop: 20, textAlign: 'center' }}>
            There's no finished tasks so hurry up and finish one!
          </SubTitle>
        )}
      </StyledContainer>
    </>
  );
}
