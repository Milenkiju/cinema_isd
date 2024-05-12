import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from './src/screens/Home/index';
import Details from './src/screens/Details';
import Tickets from './src/screens/Tickets';
import MyTickets from './src/screens/MyTickets';
import TicketProvider from './src/context/TicketContext';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { API_LINK } from './src/Data/API_Data';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Tickets" component={Tickets} />
    </Stack.Navigator>
  );
}

function MyTicketsNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="MyTickets" component={MyTickets} />
    </Stack.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#151518',
          borderTopColor: '#4f4f54',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigation}
        options={{
          tabBarLabel: 'Головна',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyTicketsTab"
        component={MyTicketsNavigation}
        options={{
          tabBarLabel: 'Мої квитки',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="ticket" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_LINK);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TicketProvider>
      <NavigationContainer>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <BottomTabs />
        )}
      </NavigationContainer>
    </TicketProvider>
  );
}
