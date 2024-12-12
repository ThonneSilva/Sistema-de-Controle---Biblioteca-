import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const BASE_URL = 'http://localhost:5001';

const getEmprestados = async () => {
    try {
      const response = await fetch(`${BASE_URL}/livros/emprestados`);
      if (!response.ok) {
        const errorData = await response.json(); // Tentar obter detalhes do erro da API
        throw new Error(`Erro ao buscar livros emprestados: ${response.status} - ${JSON.stringify(errorData)}`);
      }
      const data = await response.json();
      console.log('Dados retornados pela API:', data); // Log para inspecionar os dados
      return data;
    } catch (error) {
      console.error('Erro ao buscar livros emprestados:', error);
      throw error;
    }
};

const VerEmprestados = () => {
   const navigation = useNavigation();
  const [livrosEmprestados, setLivrosEmprestados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEmprestados = async () => {
      setLoading(true);
      setError(null);
      try {
        const livros = await getEmprestados();
        setLivrosEmprestados(livros);
      } catch (error) {
          setError(error.message);
         console.error('Erro ao carregar livros emprestados', error);
      }finally {
          setLoading(false);
      }
    };

    fetchEmprestados();
  }, []);

   if (loading) {
        return <Text>Carregando livros emprestados...</Text>;
    }
      if (error) {
        return <Text>Erro ao carregar livros emprestados: {error}</Text>;
    }

  return (
       <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Livros Emprestados</Text>
        <ScrollView>
        {livrosEmprestados && livrosEmprestados.length === 0 ? (
            <Text style={styles.noBooks}>Nenhum livro emprestado no momento.</Text>
        ) : (
            livrosEmprestados.map((livro) => (
                <View key={livro.id} style={styles.bookContainer}>
                    <Text style={styles.bookText}>Título: {livro.titulo}</Text>
                    <Text style={styles.bookText}>Autor: {livro.autor}</Text>
                    <Text style={styles.bookText}>Quantidade Emprestada: {livro.quantidadeEmprestada}</Text>
                    <Text style={styles.bookText}>Usuários:</Text>
                    {livro.usuariosEmprestados && livro.usuariosEmprestados.length === 0 ? (
                        <Text style={styles.noUsers}>Nenhum usuário ainda.</Text>
                    ) : (
                       livro.usuariosEmprestados && livro.usuariosEmprestados.map((usuario, index) => (
                         <Text key={index} style={styles.userText}>
                           - {usuario.nome} ({usuario.anoNascimento})
                         </Text>
                       ))
                     )}
                </View>
            ))
        )}
    </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
   backButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 10
    },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  bookContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
    borderRadius: 5,
  },
  bookText: {
    fontSize: 16,
  },
  userText: {
    fontSize: 14,
    marginLeft: 10,
  },
  noBooks: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  noUsers: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 10,
  },
});
export default VerEmprestados;