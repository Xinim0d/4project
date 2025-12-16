import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ItemDetailsScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item Details</Text>
      <Text style={styles.detail}>Name: Example Item</Text>
      <Text style={styles.detail}>Quantity: 10</Text>
      <Button title="Back to Inventory" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detail: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default ItemDetailsScreen;