import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  MessageBox,
  StyledButton,
  ButtonText,
} from './styles';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from './styles';

const { grey, primary, contrastAccent } = Colors;

export default function FormLayout({ props, setShow, date, buttonText }) {
  return (
    <StyledFormArea style={{ width: '100%', paddingTop: 10 }}>
      <View>
        <LeftIcon>
          <FontAwesome5 name="tasks" size={30} color={primary} />
        </LeftIcon>
        <StyledInputLabel>Title of a task</StyledInputLabel>
        <StyledTextInput
          placeholder="eg. Study"
          placeholderTextColor={grey}
          onChangeText={props.handleChange('title')}
          onBlur={props.handleBlur('title')}
          value={props.values.title}
        />
        {props.touched.title && Boolean(props.errors.title) && <MessageBox>{props.errors.title}</MessageBox>}
      </View>
      <View>
        <LeftIcon>
          <MaterialIcons name="category" size={30} color={primary} />
        </LeftIcon>
        <StyledInputLabel>Category</StyledInputLabel>
        <StyledTextInput
          placeholder="eg. work"
          placeholderTextColor={grey}
          onChangeText={props.handleChange('category')}
          onBlur={props.handleBlur('category')}
          value={props.values.category}
        />
        {props.touched.category && Boolean(props.errors.category) && <MessageBox>{props.errors.category}</MessageBox>}
      </View>
      <View>
        <LeftIcon>
          <MaterialIcons name="priority-high" size={30} color={primary} />
        </LeftIcon>
        <StyledInputLabel>Priority (from 1 - 5)</StyledInputLabel>
        <StyledTextInput
          placeholder="eg. 1"
          placeholderTextColor={grey}
          onChangeText={props.handleChange('priority')}
          onBlur={props.handleBlur('priority')}
          value={props.values.priority.toString()}
          keyboardType="numeric"
        />
        {props.touched.priority && Boolean(props.errors.priority) && <MessageBox>{props.errors.priority}</MessageBox>}
      </View>
      <View>
        <LeftIcon>
          <Ionicons name="calendar" size={30} color={primary} />
        </LeftIcon>
        <StyledInputLabel>Due date</StyledInputLabel>
        <TouchableOpacity onPress={() => setShow(true)}>
          <StyledTextInput
            placeholder="DD - MM -YYYY"
            placeholderTextColor={grey}
            onChangeText={props.handleChange('endDate')}
            onBlur={props.handleBlur('endDate')}
            value={date.toLocaleString()}
            editable={false}
          />
        </TouchableOpacity>
        {props.touched.endDate && Boolean(props.errors.endDate) && <MessageBox>{props.errors.endDate}</MessageBox>}
      </View>
      {!props.isSubmitting && (
        <StyledButton onPress={props.handleSubmit}>
          <ButtonText>{buttonText}</ButtonText>
        </StyledButton>
      )}
      {props.isSubmitting && (
        <StyledButton disabled={true}>
          <ActivityIndicator size="large" color={contrastAccent} />
        </StyledButton>
      )}
    </StyledFormArea>
  );
}
