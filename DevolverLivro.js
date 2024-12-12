import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BASE_URL = 'http://localhost:5001';

export default function DevolverLivro() {
    const navigation = useNavigation();
    const [livroId, setLivroId] = useState('');

    const handleDevolver = async () => {
        if (!livroId) {
            Alert.alert('Erro', 'Por favor, insira o ID do livro');
            return;
        }

        try {
             const response = await fetch(`${BASE_URL}/devolver-livro`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    livro_id: parseInt(livroId),
                }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Sucesso', data.message);
                setLivroId('');
            } else {
                Alert.alert('Erro', data.error || 'Erro ao devolver livro');
            }
        } catch (error) {
            console.error('Erro ao devolver livro:', error);
            Alert.alert('Erro', 'Erro ao conectar com o servidor');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>DEVOLVER LIVRO</Text>

            <TextInput
                style={styles.input}
                placeholder="ID do Livro"
                value={livroId}
                onChangeText={setLivroId}
                keyboardType="numeric"
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.blackButton} onPress={handleDevolver}>
                    <Text style={styles.buttonText}>Devolver Livro</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blackButton} onPress={() => navigation.navigate('HomePage')}>
                    <Text style={styles.buttonText}>VOLTAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    input: {
        padding: 5,
        borderColor: 'white',
        backgroundColor: 'lightgrey',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 8,
        color: 'black',
        borderRadius: 4,
        width: '80%',
    },
    buttonContainer: {
        width: '100%',
        padding: 16,
        gap: 10,
    },
    blackButton: {
        backgroundColor: 'black',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});