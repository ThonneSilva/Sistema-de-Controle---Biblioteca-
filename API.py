from flask import Flask, jsonify, request
from flask_cors import CORS

## Cors para não bugar a API 

app = Flask(__name__)
CORS(app)

## Lista de livros em formato de Lista 

livros = [
    {'id': 1, 'titulo': 'Dom Casmurro', 'autor': 'Machado de Assis', 'ano': '1899', 'quantidade': 2},
    {'id': 2, 'titulo': 'Memorias Postumas de Bras Cubas', 'autor': 'Machado de Assis', 'ano': '1881', 'quantidade': 3},
    {'id': 3, 'titulo': 'Grande Sertao: Veredas', 'autor': 'João Guimaes Rosa', 'ano': '1956', 'quantidade': 4},
    {'id': 5, 'titulo': 'O Cortiço', 'autor': 'Aluísio Azevedo', 'ano': '1890', 'quantidade': 4},
    {'id': 6, 'titulo': 'Iracema', 'autor': 'José de Alencar', 'ano': '1865', 'quantidade': 1},
    {'id': 7, 'titulo': 'Iracema', 'autor': 'José de Alencar', 'ano': '1865', 'quantidade': 1},
    {'id': 8, 'titulo': 'Macunaíma', 'autor': 'Mário de Andrade', 'ano': '1928', 'quantidade': 11},
    {'id': 9, 'titulo': 'Capitães da Areia', 'autor': 'Jorge Amado', 'ano': '1937', 'quantidade': 2},
    {'id': 10, 'titulo': 'Vidas Secas', 'autor': 'Graciliano Ramos', 'ano': '1938', 'quantidade': 9},
    {'id': 11, 'titulo': 'A Moreninha', 'autor': 'Joaquim Manuel de Macedo', 'ano': '1844', 'quantidade': 2},
    {'id': 12, 'titulo': 'O Tempo e o Vento', 'autor': 'Erico Verissimo', 'ano': '1949', 'quantidade': 1},
    {'id': 13, 'titulo': 'A Hora da Estrela', 'autor': 'Clarice Lispector', 'ano': '1977', 'quantidade': 1},
    {'id': 14, 'titulo': 'O Quinze', 'autor': 'Rachel de Queiroz', 'ano': '1930', 'quantidade': 1},
    {'id': 15, 'titulo': 'Menino do Engenho', 'autor': 'José Lins do Rego', 'ano': '1932', 'quantidade': 5},
    {'id': 16, 'titulo': 'Sagarana', 'autor': 'João Guimarães Rosa', 'ano': '1946', 'quantidade': 3},
    {'id': 17, 'titulo': 'Fogo Morto', 'autor': 'José Lins do Rego', 'ano': '1943', 'quantidade': 1},
]

# Rota para mostrar a lista de livros cadastrados
@app.route('/livros', methods=['GET'])
def obter_livros():
    return jsonify(livros)




# Rota para buscar o livro por ID
@app.route('/livros/<int:id>', methods=['GET'])
def consultar_livro_por_id(id):
    for livro in livros:
        if livro.get('id') == id:
            return jsonify(livro)
        




# Rota para editar um livro
@app.route('/livros/<int:id>', methods=['PUT'])
def editar_livro_no_id(id):
    livro_alterado = request.get_json()
    for indice, livro in enumerate(livros):
        if livro.get('id') == id:
            livros[indice].update(livro_alterado)
            return jsonify(livros[indice])
        





# Rota para adicionar um novo livro
@app.route('/adicionar-livro', methods=['POST'])
def incluir_livro():
    novo_livro = request.get_json()
    livros.append(novo_livro)
    return jsonify(novo_livro), 201



# Rota para excluir um livro
@app.route('/livros/<int:id>', methods=['DELETE'])
def excluir_livro(id):
    for indice, livro in enumerate(livros):
        if livro.get('id') == id:
            del livros[indice]
            return jsonify(livros)
        



# Rota para emprestar livros
@app.route('/livros/alugar/<int:id_livro>', methods=['POST'])
def alugar_livro(id_livro):
    livro = next((l for l in livros if l['id'] == id_livro), None)
    if not livro:
        return jsonify({'mensagem': 'Livro não encontrado.'}), 404
    
    if livro['quantidade'] <= 0:
        return jsonify({'mensagem': 'Livro não disponível para empréstimo.'}), 400
    
    # Recebe os dados do usuário
    nome_usuario = request.json.get('nome')
    ano_nascimento_usuario = request.json.get('anoNascimento')
    
    if not nome_usuario or not ano_nascimento_usuario:
        return jsonify({'mensagem': 'Nome e ano de nascimento do usuário são obrigatórios.'}), 400

    # Atualiza os dados do livro
    livro['quantidade'] -= 1
    livro.setdefault('quantidadeEmprestada', 0)
    livro['quantidadeEmprestada'] += 1

    # Adiciona o usuário à lista de emprestados
    if 'usuariosEmprestados' not in livro:
        livro['usuariosEmprestados'] = []
    
    livro['usuariosEmprestados'].append({
        'nome': nome_usuario,
        'anoNascimento': ano_nascimento_usuario
    })

    # Marca o livro como emprestado se ainda não estiver marcado
    livro.setdefault('Emprestado', True)

    return jsonify({
        'mensagem': 'Livro emprestado com sucesso.',
        'livro': {
            'id': livro['id'],
            'titulo': livro['titulo'],
            'quantidadeDisponivel': livro['quantidade'],
            'quantidadeEmprestada': livro['quantidadeEmprestada'],
            'usuariosEmprestados': livro['usuariosEmprestados']
        }
    }), 200






# Rota para devolver o Livro 
@app.route('/devolver-livro', methods=['PUT'])
def devolver_livro():
    data = request.get_json()
    print(data)  
    livro_id = data.get('livro_id')
    if not livro_id:
        return jsonify({'error': 'ID do livro é obrigatório'}), 400
    livro = next((l for l in livros if l['id'] == livro_id), None)
    if livro:
        livro['quantidadeEmprestada'] -= 1
        livro['quantidade'] += 1
        return jsonify({'message': 'Livro devolvido com sucesso!'}), 200
    else:
        return jsonify({'error': 'Livro não encontrado'}), 404





@app.route('/livros/emprestados', methods=['GET'])
def livros_emprestados():
    livros_emprestados = [
        {
            'id': livro['id'],
            'titulo': livro['titulo'],
            'autor': livro['autor'],
            'quantidadeEmprestada': livro.get('quantidadeEmprestada', 0),
            'usuariosEmprestados': livro.get('usuariosEmprestados', [])
        }
        for livro in livros if livro.get('quantidadeEmprestada', 0) > 0
    ]
    return jsonify(livros_emprestados), 200









#Finalização da API 

if __name__ == '__main__':
    app.run(debug=True, port=5001)
