import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const HomeScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome!</Text>
    <TouchableOpacity
      style={styles.actionButton}
      onPress={() => navigation.navigate('Login')}
    >
      <Text style={styles.actionButtonText}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: colors.secondary }]}
      onPress={() => navigation.navigate('Register')}
    >
      <Text style={styles.actionButtonText}>Register</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 48,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 48,
    alignItems: 'center',
    marginBottom: 20,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default HomeScreen;