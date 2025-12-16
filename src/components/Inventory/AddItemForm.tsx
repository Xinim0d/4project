import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Modal, Text, TouchableOpacity } from 'react-native';
import { InventoryContext } from '../../context/InventoryContext';
import { AuthContext } from '../../context/AuthContext';
import BarcodeScanner from './BarcodeScanner';
import colors from '../../styles/colors';

const AddItemForm = () => {
    const inventory = useContext(InventoryContext);
    const { userName } = useContext(AuthContext);

    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemQuantity, setItemQuantity] = useState(1);
    const [scannedCode, setScannedCode] = useState('');
    const [scannerVisible, setScannerVisible] = useState(false);

    const handleSubmit = async () => {
        if (!scannedCode) {
            Alert.alert('Error', 'Please scan a barcode');
            return;
        }

        const existingItem = inventory?.items.find(item => item.code === scannedCode);

        if (existingItem) {
            // Jei yra, padidinam kiekį +1
            await inventory?.updateItem(existingItem.id, {
                quantity: existingItem.quantity + 1,
            });
            Alert.alert('Success', 'Item quantity increased by 1');
            setItemName('');
            setItemDescription('');
            setItemQuantity(1);
            setScannedCode('');
        } else {
            // Jei nėra, patikrinam ar visi duomenys įvesti
            if (!itemName || !itemDescription || !itemQuantity) {
                Alert.alert('Error', 'Please enter item name, description and quantity');
                return;
            }
            await inventory?.addItem({
                name: itemName,
                description: itemDescription,
                quantity: itemQuantity,
                code: scannedCode,
                dateAdded: new Date().toISOString(),
                employeeInfo: userName || 'Unknown',
            });
            Alert.alert('Success', 'Item added successfully');
            setItemName('');
            setItemDescription('');
            setItemQuantity(1);
            setScannedCode('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Item</Text>
            <TextInput
                style={styles.input}
                placeholder="Item Name"
                placeholderTextColor={colors.border}
                value={itemName}
                onChangeText={setItemName}
            />
            <TextInput
                style={styles.input}
                placeholder="Item Description"
                placeholderTextColor={colors.border}
                value={itemDescription}
                onChangeText={setItemDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Quantity"
                placeholderTextColor={colors.border}
                keyboardType="numeric"
                value={String(itemQuantity)}
                onChangeText={(text) => {
                    const num = Number(text);
                    if (!isNaN(num) && num > 0) {
                        setItemQuantity(num);
                    } else {
                        setItemQuantity(1);
                    }
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Scanned Barcode"
                placeholderTextColor={colors.border}
                value={scannedCode}
                editable={false}
            />
            <TouchableOpacity style={styles.button} onPress={() => setScannerVisible(true)}>
                <Text style={styles.buttonText}>Scan Barcode</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>

            <Modal visible={scannerVisible} animationType="slide">
                <BarcodeScanner
                    onScan={(data) => {
                        setScannedCode(data);
                        setScannerVisible(false);
                    }}
                    onCancel={() => setScannerVisible(false)}
                    showControls={true}
                    autoStart={false}
                />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 32,
        alignSelf: 'center',
    },
    input: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 14,
        marginBottom: 18,
        fontSize: 16,
        borderWidth: 1,
        borderColor: colors.border,
        color: colors.text,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
    },
    addButton: {
        backgroundColor: 'green',
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 16,
    },
});

export default AddItemForm;