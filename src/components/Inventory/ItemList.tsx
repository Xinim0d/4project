import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, Modal, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { InventoryContext } from '../../context/InventoryContext';
import * as Animatable from 'react-native-animatable';
import colors from '../../styles/colors';
import BarcodeScanner from './BarcodeScanner';

const ItemList = ({ navigation }: { navigation?: any }) => {
  const inventory = useContext(InventoryContext);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  if (!inventory) return <Text>Loading...</Text>;
  if (!inventory.items || inventory.items.length === 0) return <Text>No items found</Text>;

  const handleDeleteScan = (barcode: string) => {
    if (selectedItem && barcode === selectedItem.code) {
      if (selectedItem.quantity > 1) {
        Alert.alert(
          'Ką norite daryti?',
          `Prekės kiekis: ${selectedItem.quantity}`,
          [
            {
              text: 'Sumažinti kiekį (-1)',
              onPress: async () => {
                await inventory.updateItem(selectedItem.id, {
                  quantity: selectedItem.quantity - 1,
                });
                setDeleteModalVisible(false);
                setSelectedItem(null);
              }
            },
            {
              text: 'Ištrinti visą prekę',
              style: 'destructive',
              onPress: async () => {
                await inventory.deleteItem(selectedItem.id);
                setDeleteModalVisible(false);
                setSelectedItem(null);
              }
            },
            {
              text: 'Atšaukti',
              style: 'cancel',
            }
          ]
        );
      } else {
        inventory.deleteItem(selectedItem.id);
        setDeleteModalVisible(false);
        setSelectedItem(null);
      }
    } else {
      Alert.alert(
        'Neteisingas barkodas',
        'Nuskenuokite teisingą barkodą, kuris priskirtas šiai prekei.'
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={inventory.items}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <Animatable.View animation="fadeInUp" delay={index * 80} style={styles.card}>
            <Text style={styles.name}>{item.name} <Text style={styles.quantity}>({item.quantity})</Text></Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.code}>Barcode: {item.code}</Text>
            <Text style={styles.meta}>Added: {item.dateAdded ? new Date(item.dateAdded).toLocaleDateString() : '-'}</Text>
            <Text style={styles.meta}>By: {item.employeeInfo || '-'}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => navigation && navigation.navigate('EditItemForm', { item })}
              >
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => {
                  setSelectedItem(item);
                  setDeleteModalVisible(true);
                }}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        )}
      />
      <Modal visible={deleteModalVisible} animationType="slide">
        <BarcodeScanner
          onScan={(data) => {
            if (selectedItem && data === selectedItem.code) {
              handleDeleteScan(data);
            } else {
              Alert.alert('Error', 'Scanned barcode does not match the selected item.');
            }
          }}
          onCancel={() => {
            setDeleteModalVisible(false);
            setSelectedItem(null);
          }}
          showControls={true}
          autoStart={false}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  actions: { flexDirection: 'row', marginTop: 10 },
  editBtn: {
    backgroundColor: colors.secondary,
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: colors.accent,
    padding: 8,
    borderRadius: 6,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
});

export default ItemList;