import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BASE_URL = 'http://localhost:5001';

const getBooks = async () => {
    try {
        const response = await fetch(`${BASE_URL}/livros`);
        if (!response.ok) {
            throw new Error('Erro ao buscar livros');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        throw error;
    }
};


export default function EmprestarLivro() {
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [book, setBook] = useState(null);
    const [nome, setNome] = useState('');
    const [anoNascimento, setAnoNascimento] = useState('');
  

    const fetchBookById = async (bookId) => {
        try {
            const response = await getBooks();
            const foundBook = response.find((book) => book.id === parseInt(bookId));
            setBook(foundBook || null);
        } catch (error) {
            console.error('Erro ao buscar livro:', error);
        }
    };

    const emprestarLivro = async () => {
         try {
            if (!id) {
                alert('Por favor, insira um ID de livro válido.');
                return;
            }

            if (!nome || !anoNascimento) {
                alert('Por favor, insira seu nome e ano de nascimento.');
                return;
            }

            if (!book) {
                alert('Livro não encontrado.');
                return;
            }
          if (book.quantidade <= 0) {
        alert('Livro não disponível para empréstimo.');
        return;
      }

            const response = await fetch(`${BASE_URL}/livros/alugar/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    anoNascimento: anoNascimento,
                }),
            });


            const data = await response.json();

            if (!response.ok) {
             alert(data.mensagem || 'Erro ao emprestar livro!');
             return;
            }

            alert(data.mensagem || `Livro "${book.titulo}" emprestado com sucesso para ${nome}!`);
            setId('');
            setNome('');
            setAnoNascimento('');
            setBook(null);

        } catch (error) {
            console.error('Erro ao emprestar livro:', error);
            alert('Erro ao emprestar livro!');
        }
    };

    return (
        <View style={styles.body}>
            <View style={styles.menuemprestar}>
                <Text style={styles.title}>EMPRESTAR NOVO LIVRO</Text>

                <TextInput
                    style={styles.input}
                    placeholder="ID do Livro"
                    value={id}
                    onChangeText={(value) => {
                        setId(value);
                        fetchBookById(value);
                    }}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Nome do Usuário"
                    value={nome}
                    onChangeText={(value) => setNome(value)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Ano de Nascimento"
                    value={anoNascimento}
                    onChangeText={(value) => setAnoNascimento(value)}
                    keyboardType="numeric"
                />

                {book && (
                    <View style={styles.detalhes}>
                        <Text style={styles.bookText}>ID do Livro: {book.id}</Text>
                        <Text style={styles.bookText}>Título: {book.titulo}</Text>
                        <Text style={styles.bookText}>Autor: {book.autor}</Text>
                        <Text style={styles.bookText}>Ano: {book.ano}</Text>
                        <Text style={styles.bookText}>Quantidade disponível: {book.quantidade}</Text>
                    </View>
                )}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.blackButton} onPress={emprestarLivro}>
                        <Text style={styles.buttonText}>Emprestar livro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.blackButton} onPress={() => navigation.navigate('HomePage')}>
                        <Text style={styles.buttonText}>VOLTAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    menuemprestar: {
        height: 650,
        backgroundColor: 'white',
        padding: 30,
    },
    detalhes: {
        marginTop: 8,
        padding: 8,
        backgroundColor: '#1C1C1C',
        borderRadius: 4,
    },
    bookText: {
        fontSize: 14,
        color: '#FFFFFF',
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
    emprestadosContainer: {
        marginTop: 20,
        width: '100%',
        padding: 16,
    }
});