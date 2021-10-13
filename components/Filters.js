import React, { useContext } from 'react';
import { View } from 'react-native';
import { ButtonText, ExtraView, FilterButton, StyledButton } from './styles';
import { AuthContext } from '../context/auth-context';

export default function Filters({ setModalOpen }) {
  const { listOfTasks, setFilteredList, selectedFilters, setSelectedFilters } = useContext(AuthContext);

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
    setFilteredList([]);
    setSelectedFilters([]);
  };

  const selectButton = (category) => {
    if (selectedFilters.some((filter) => filter === category)) {
      setSelectedFilters((prevState) =>
        [...prevState].filter((prev) => {
          prev !== category;
        }),
      );
    } else {
      setSelectedFilters((prevState) => [...prevState, category]);
    }
  };

  const allCategories = listOfTasks.reduce((list, task) => {
    return [...list, task.category];
  }, []);

  const categories = [...new Set(allCategories)];

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
      <View>
        {categories.map((category, index) => {
          return (
            <FilterButton
              key={index}
              selected={selectedFilters.some((filter) => filter === category)}
              onPress={() => selectButton(category)}
            >
              <ButtonText>{category}</ButtonText>
            </FilterButton>
          );
        })}
      </View>
      <ExtraView style={{ justifyContent: 'space-between' }}>
        <StyledButton onPress={() => clearFilters()}>
          <ButtonText>Clear filters</ButtonText>
        </StyledButton>
        <StyledButton onPress={() => applyFilters()}>
          <ButtonText>Apply filters</ButtonText>
        </StyledButton>
      </ExtraView>
    </View>
  );
}
