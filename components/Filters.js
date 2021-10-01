import React, { useContext, useState, useRef } from 'react';
import { View } from 'react-native';
import { ButtonText, ExtraView, StyledButton } from './styles';
import { AuthContext } from '../context/auth-context';

export default function Filters({ setModalOpen }) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const { listOfTasks, setFilteredList } = useContext(AuthContext);

  const handleFilteringList = (listOfTasks, selectedFilters) => {
    return listOfTasks.filter((task) => {
      return selectedFilters.some((filter) => filter === task.category);
    });
  };

  const applyFilters = () => {
    setModalOpen(false);
    setFilteredList(handleFilteringList(listOfTasks, selectedFilters));
  };

  const clearFilters = () => {
      setFilteredList([])
      setSelectedFilters([])
  }

  const selectButton = category => {
      setSelectedFilters(prevState => [...prevState, category])
  }

  const allCategories = listOfTasks.reduce((list, task) => {
    return [...list, task.category];
  }, []);

  const categories = [...new Set(allCategories)];

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
      <View>
        {categories.map((category, index) => {
          return (
            <StyledButton key={index} onPress={() => selectButton(category)}>
              <ButtonText>{category}</ButtonText>
            </StyledButton>
          );
        })}
      </View>
      <ExtraView style={{justifyContent: 'space-between'}}>
        <StyledButton onPress={() => applyFilters()}>
          <ButtonText>Apply filters</ButtonText>
        </StyledButton>
        <StyledButton onPress={() => clearFilters()}>
          <ButtonText>Clear filters</ButtonText>
        </StyledButton>
      </ExtraView>
    </View>
  );
}
