import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginForm from './src/components/Auth/LoginForm';
import RegisterForm from './src/components/Auth/RegisterForm';
import InventoryScreen from './src/screens/InventoryScreen';
import ItemDetailsScreen from './src/screens/ItemDetailsScreen';
import { AuthProvider } from './src/context/AuthContext';
import { InventoryProvider } from './src/context/InventoryContext';
import AddItemForm from './src/components/Inventory/AddItemForm';
import EditItemForm from './src/components/Inventory/EditItemForm';
import ShippedItemsScreen from './src/screens/ShippedItemsScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <AuthProvider>
            <InventoryProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Login" component={LoginForm} />
                        <Stack.Screen name="Register" component={RegisterForm} />
                        <Stack.Screen
                            name="Inventory"
                            component={InventoryScreen}
                            options={{ headerLeft: () => null}}
                        />
                        <Stack.Screen name="AddItemForm" component={AddItemForm} />
                        <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
                        <Stack.Screen name="EditItemForm" component={EditItemForm} />
                        <Stack.Screen name="ShippedItemsScreen" component={ShippedItemsScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </InventoryProvider>
        </AuthProvider>
    );
};

export default App;