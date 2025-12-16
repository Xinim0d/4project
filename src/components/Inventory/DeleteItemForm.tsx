import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Modal, Text, TouchableOpacity } from 'react-native';
import { deleteItemFromInventory } from '../../services/firebase';
import BarcodeScanner from './BarcodeScanner';

const DeleteItemForm = () => {
    const [barcode, setBarcode] = useState('');
    const [scannerVisible, setScannerVisible] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [isWaitingForQuantity, setIsWaitingForQuantity] = useState(false);

    const handleDelete = async () => {
        if (!barcode) {
            Alert.alert('Error', 'Please scan a barcode first');
            return;
        }

        if (quantity <= 0) {
            Alert.alert('Error', 'Please enter a valid quantity to delete');
            return;
        }

        try {
            await deleteItemFromInventory(barcode);
            Alert.alert('Success', `Deleted item(s) with barcode ${barcode}`);
            setBarcode('');
            setQuantity(0);
            setIsWaitingForQuantity(false);
        } catch (error: any) {
            Alert.alert('Error', 'Failed to delete item');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Scanned Barcode"
                value={barcode}
                editable={false}
            />
            {isWaitingForQuantity && (
                <TextInput
                    style={styles.input}
                    placeholder="Quantity to delete"
                    keyboardType="numeric"
                    value={quantity > 0 ? String(quantity) : ''}
                    onChangeText={(text) => setQuantity(Number(text))}
                />
            )}
            {!isWaitingForQuantity && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setScannerVisible(true);
                    }}
                >
                    <Text style={styles.buttonText}>Open Scanner</Text>
                </TouchableOpacity>
            )}
            {isWaitingForQuantity && (
                <TouchableOpacity style={styles.button} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete Item</Text>
                </TouchableOpacity>
            )}

            
            <Modal
                visible={scannerVisible}
                animationType="slide"
                onRequestClose={() => setScannerVisible(false)}
            >
                <View style={styles.scannerContainer}>
                    <BarcodeScanner
                        onScan={(data) => {
                            setBarcode(data);
                            setIsWaitingForQuantity(true);
                            setScannerVisible(false);
                        }}
                        onCancel={() => setScannerVisible(false)}
                        showControls={true}
                        autoStart={false}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 28,
        paddingVertical: 14,
        paddingHorizontal: 28,
        alignItems: 'center',
        marginBottom: 10,
        minWidth: 220,
        alignSelf: 'center',
        elevation: 3,
    },
    cancelButton: {
        backgroundColor: 'gray',
        borderRadius: 28,
        paddingVertical: 14,
        paddingHorizontal: 28,
        alignItems: 'center',
        marginBottom: 10,
        minWidth: 220,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    scannerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#000', 
    },
});

export default DeleteItemForm;