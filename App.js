import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage.js';
import VerLivros from './VerLivros.js';
import AdicionarLivro from './AdicionarLivro.js';
import EmprestarLivro from './EmprestarLivro.js';
import DevolverLivro from './DevolverLivro.js';
import Emprestados from './Emprestados.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="VerLivros" component={VerLivros} />
        <Stack.Screen name="AdicionarLivro" component={AdicionarLivro} />
        <Stack.Screen name="EmprestarLivro" component={EmprestarLivro} />
        <Stack.Screen name="DevolverLivro" component={DevolverLivro} />
        <Stack.Screen name="Emprestados" component={Emprestados} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
