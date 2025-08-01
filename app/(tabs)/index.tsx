import React, { useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState('');

  const calculateBMI = () => {
    Keyboard.dismiss();

    if (!weight || !height) {
      Alert.alert('Erro', 'Por favor, preencha peso e altura');
      return;
    }

    const weightNum = parseFloat(weight.replace(',', '.'));
    const heightNum = parseFloat(height.replace(',', '.'));

    if (isNaN(weightNum)) {
      Alert.alert('Erro', 'Peso inválido');
      return;
    }

    if (isNaN(heightNum) || heightNum <= 0) {
      Alert.alert('Erro', 'Altura inválida');
      return;
    }

    const bmi = weightNum / (heightNum * heightNum);

    let classification = '';
    if (bmi < 18.5) classification = 'Abaixo do peso';
    else if (bmi < 24.9) classification = 'Peso normal';
    else if (bmi < 29.9) classification = 'Sobrepeso';
    else if (bmi < 34.9) classification = 'Obesidade grau I';
    else if (bmi < 39.9) classification = 'Obesidade grau II';
    else classification = 'Obesidade grau III';

    setResult(`Seu IMC é ${bmi.toFixed(2)} (${classification})`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Peso (kg):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 70.5"
          keyboardType="decimal-pad"
          value={weight}
          onChangeText={setWeight}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Altura (m):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 1.75"
          keyboardType="decimal-pad"
          value={height}
          onChangeText={setHeight}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>

      {result ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#2e7d32',
  },
});