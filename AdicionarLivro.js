import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AdicionarLivros() {
  const navigation = useNavigation();

  const [id, setId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [quantidade, setQuantidade] = useState('');

  // Função para adicionar um livro
  const adicionarLivro = async () => {
    try {
      // Verifica se todos os campos foram preenchidos
      if (!id || !titulo || !autor || !ano || !quantidade) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      // Envia a requisição para adicionar o livro
      const response = await fetch('http://localhost:5001/adicionar-livro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: parseInt(id),  // Garante que o ID seja um número
          titulo,
          autor,
          ano: parseInt(ano), // Garante que o ano seja um número
          quantidade: parseInt(quantidade), // Garante que a quantidade seja um número
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert('Livro adicionado com sucesso!');
        setId('');
        setTitulo('');
        setAutor('');
        setAno('');
        setQuantidade('');
        navigation.navigate('VerLivros');  // Navega para a tela onde os livros são visualizados
      } else {
        const errorData = await response.json();
        alert('Erro ao adicionar livro. Tente novamente.');
      }
    } catch (error) {
      alert('Erro ao adicionar livro. Verifique sua conexão ou tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.title}>ADICIONAR LIVRO</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="ID do livro"
            value={id}
            onChangeText={setId}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Título do livro"
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={styles.input}
            placeholder="Autor do livro"
            value={autor}
            onChangeText={setAutor}
          />
          <TextInput
            style={styles.input}
            placeholder="Ano de publicação"
            value={ano}
            onChangeText={setAno}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade disponível"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={adicionarLivro}>
            <Text style={styles.buttonText}>ADICIONAR LIVRO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.buttonText}>VOLTAR</Text>
        </TouchableOpacity>
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
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    paddingBottom: 100,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#2F2F2F',
    color: '#E0E0E0',
    marginBottom: 12,
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    padding: 16,
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
