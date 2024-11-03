import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   
    container: {
      flexGrow: 1, // Garante que o conteúdo ocupe todo o espaço disponível
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#F5F5F5',
      justifyContent: 'flex-start',  //deixar mais acima
  
    },
    logo: {
      width: 320, // Largura da imagem
      height: 220, // Altura da imagem
      marginBottom: 20,
      marginTop: -20,
    },
    title: {
      fontSize: 28, // Tamanho da fonte do título
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 1,
      color: '#333', // Cor do texto
    },
    form: {
      marginTop: 20, // Margem superior do formulário
    },
    inputContainer: {
      flexDirection: 'row', // Exibe o ícone e o campo de texto na mesma linha
      alignItems: 'center',
      backgroundColor: '#fff', // Fundo branco para o campo de entrada
      borderWidth: 1, // Borda fina ao redor do campo
      borderColor: '#ddd', // Cor da borda
      padding: 10,
      borderRadius: 5, // Borda arredondada
      marginBottom: 15, // Espaço entre os campos
    },
    input: {
      flex: 1, // O campo de texto ocupa o espaço restante
      paddingLeft: 10, // Espaçamento à esquerda do texto
      fontSize: 16,
    },
    errorText: {
      color: 'red', // Cor do texto de erro
      marginBottom: 10,
    },
    button: {
      width: '50%',
      height: 50,
      backgroundColor: '#49b3dd', // Cor de fundo do botão
      justifyContent: 'center', // Centraliza o texto verticalmente
      alignItems: 'center', // Centraliza o texto horizontalmente
      borderRadius: 8, // Bordas arredondadas
      marginBottom: 5,
      alignSelf: 'center', // Centraliza o botão horizontalmente
    },
    buttonText: {
      color: '#000000', // Cor do texto do botão
      fontSize: 18,
      fontWeight: 'bold',
    },
    loginLink: {
      color: '#1E90FF', // Cor do link para a tela de login
      textAlign: 'center',
      marginTop: 20,
      textDecorationLine: 'underline', // Sublinhado para destacar o link
  
    },
  });
 
  