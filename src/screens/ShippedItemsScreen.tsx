import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { InventoryContext } from '../context/InventoryContext';
import { AuthContext } from '../context/AuthContext';
import { db } from '../services/firebase';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import * as Animatable from 'react-native-animatable';
import colors from '../styles/colors';

const ShippedItemsScreen = () => {
  const inventory = useContext(InventoryContext);
  const { userName } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [shippedItems, setShippedItems] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'shippedProducts'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setShippedItems(items);
    });
    return () => unsub();
  }, []);

  const handleShip = async (item: any) => {
    try {
      const docRef = await addDoc(collection(db, 'shippedProducts'), {
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        code: item.code,
        dateAdded: item.dateAdded,
        employeeInfo: item.employeeInfo,
        shippedDate: new Date().toISOString(),
        shippedBy: userName || 'Unknown',
      });

      if (inventory && item.id) {
        await inventory.deleteItem(item.id);
      }

      Alert.alert('Success', 'Item moved to shipped items');
      setModalVisible(false);
    } catch (error: any) {
      console.error('Failed to ship item', error);
      Alert.alert('Error', 'Failed to ship item. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.actionButtonText}>Ship Item</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Shipped Items</Text>
      <FlatList
        data={shippedItems}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <Animatable.View animation="fadeInUp" delay={index * 80} style={styles.card}>
            <Text style={styles.name}>{item.name} <Text style={styles.quantity}>({item.quantity})</Text></Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.code}>Barcode: {item.code}</Text>
            <Text style={styles.meta}>Shipped: {item.shippedDate ? new Date(item.shippedDate).toLocaleDateString() : '-'}</Text>
            <Text style={styles.meta}>By: {item.shippedBy || '-'}</Text>
          </Animatable.View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Select Item to Ship</Text>
          <FlatList
            data={inventory?.items || []}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.selectCard}
                onPress={() => handleShip(item)}
              >
                <Text style={styles.name}>{item.name} <Text style={styles.quantity}>({item.quantity})</Text></Text>
                <Text style={styles.code}>Barcode: {item.code}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.accent, marginTop: 16 }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.actionButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  quantity: { fontSize: 16, color: colors.primary },
  desc: { fontSize: 14, color: '#636e72', marginVertical: 4 },
  code: { fontSize: 13, color: '#b2bec3' },
  meta: { fontSize: 12, color: '#636e72' },
  modal: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
  selectCard: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ShippedItemsScreen;