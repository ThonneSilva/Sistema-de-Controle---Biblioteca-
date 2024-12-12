import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function HomePage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sistema - Biblioteca Érico Veríssimo</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('VerLivros')}
        >
          <FontAwesome5 name="book-open" size={24} color="#fff" />
          <Text style={styles.buttonText}>Livros Disponíveis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdicionarLivro')}
        >
          <MaterialCommunityIcons name="plus-circle-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Adicionar Livro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EmprestarLivro')}
        >
          <FontAwesome5 name="handshake" size={24} color="#fff" />
          <Text style={styles.buttonText}>Emprestar Livro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DevolverLivro')}
        >
          <MaterialCommunityIcons name="rotate-left" size={24} color="#fff" />
          <Text style={styles.buttonText}>Devolver Livro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Emprestados')}
        >
          <FontAwesome5 name="archive" size={24} color="#fff" />
          <Text style={styles.buttonText}>Ver Emprestados</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 60,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#333',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 22,
    marginVertical: 14,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    transform: [{ scale: 1 }],
    overflow: 'hidden',
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
    textAlign: 'left',
    marginLeft: 18,
    fontWeight: '500',
    letterSpacing: 0.8,
  },
});
