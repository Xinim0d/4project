import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

type Props = {
  onScan: (data: string) => void;
  onCancel?: () => void;
  showControls?: boolean;
  autoStart?: boolean;
};

const BarcodeScanner = ({ onScan, onCancel, showControls = true, autoStart = false }: Props) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isReadyToScan, setIsReadyToScan] = useState(autoStart); // control scanning, optionally start automatically

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned && isReadyToScan) {
      setScanned(true);
      setIsReadyToScan(false); // Disable scanning after each scan
      onScan(data);
      Alert.alert('Scanned!', `Bar code data: ${data}`, [
        { text: 'OK', onPress: () => setScanned(false) },
      ]);
    }
  };

  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text>Requesting for camera permission...</Text>
        <Button title="Cancel" onPress={onCancel} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text>No access to camera</Text>
        <Button title="Cancel" onPress={onCancel} />
        {permission.canAskAgain && (
          <Button title="Grant Permission" onPress={requestPermission} />
        )}
        {!permission.canAskAgain && (
          <Text style={{ marginTop: 10, color: 'red' }}>
            Leidimas atmestas. Suteikite leidimą programos nustatymuose.
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'ean8', 'code128'],
        }}
        onBarcodeScanned={scanned || !isReadyToScan ? undefined : handleBarCodeScanned} // Disable scanning unless ready
      />
      {showControls && (
        <View style={styles.buttonContainer}>
          <View style={styles.controlButton}>
            <Button title="Scan" onPress={() => setIsReadyToScan(true)} />
          </View>
          <View style={styles.controlButton}>
            <Button title="Cancel" onPress={onCancel} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  controlButton: {
    minWidth: 140,
    borderRadius: 24,
    overflow: 'hidden',
  },
});

export default BarcodeScanner;