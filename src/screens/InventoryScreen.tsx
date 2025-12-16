import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ItemList from '../components/Inventory/ItemList';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../services/firebase';
import colors from '../styles/colors';

const InventoryScreen = ({ navigation }: any) => {
  const { userName } = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signOut();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {userName && <Text style={styles.welcome}>Welcome, {userName}!</Text>}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Inventory</Text>
      <ItemList navigation={navigation} />
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('AddItemForm')}
      >
        <Text style={styles.actionButtonText}>Add Item</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: colors.secondary }]}
        onPress={() => navigation.navigate('ShippedItemsScreen')}
      >
        <Text style={styles.actionButtonText}>Go to Shipped Items</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.accent,
    borderRadius: 24,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InventoryScreen;