import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function VerLivros() {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5001/livros');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    fetchBooks();
  }, []);

  const Expand = (bookId) => {
    setExpandedBook(expandedBook === bookId ? null : bookId);
  };

  return (
    <View style={styles.body}>

      <View style={styles.homepage}>

        <Text style={styles.title}>VER LIVROS</Text>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {books.length > 0 ? (
            books.map((book) => (
              <View key={book.id} style={styles.bookItem}>
                <TouchableOpacity onPress={() => Expand(book.id)}>
                  <Text style={styles.bookButton}>
                     Livro - {book.titulo}
                  </Text>
                </TouchableOpacity>

                {expandedBook === book.id && (
                  <View style={styles.detalhes}>
                    <Text style={styles.bookText}>ID do livro: {book.id}</Text>
                    <Text style={styles.bookText}>Título: {book.titulo}</Text>
                    <Text style={styles.bookText}>Autor: {book.autor}</Text>
                    <Text style={styles.bookText}>Ano: {book.ano}</Text>
                    <Text style={styles.bookText}>
                      Quantidade disponível: {book.quantidade}
                    </Text>
                  </View>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.bookText2}>Não há livros para exibir.</Text>
          )}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.blackButton}
              onPress={() => navigation.navigate('HomePage')}
            >
              <Text style={styles.buttonText}>VOLTAR</Text>
            </TouchableOpacity>
          </View>
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

  homepage: {
    height: 650,
    backgroundColor: 'white',
    padding: 30,
  },

  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    height: 'auto',
    paddingBottom: 100,
  },

  // Modificação dos botões dos livros para ficarem mais arredondados
  bookItem: {
    backgroundColor: '#2F2F2F',
    padding: 12,
    marginVertical: 8,
    borderRadius: 20,  // Aumentando o borderRadius para maior arredondamento
  },
  bookButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E0E0E0',
    textAlign: 'center',
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
  bookText2: {
    fontSize: 16,
    color: '#E0E0E0',
  },

  // Diminuindo o tamanho do título
  titleContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },

  title: {
    backgroundColor: 'black',  // Fundo preto para o título
    color: 'white',  // Texto branco
    textAlign: 'center',
    fontSize: 18,  // Tamanho da fonte reduzido
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

  buttonContainer: {
    width: '100%',
    padding: 16,
  },
  button: {
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  blackButton: {
    backgroundColor: 'black',  // Fundo preto
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Texto branco no botão
    fontSize: 16,
    fontWeight: 'bold',
  },
});
