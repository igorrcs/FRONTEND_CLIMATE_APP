import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 320,
    height: 220,
    marginBottom: 30,
    marginTop: -20, // Valor negativo para mover a logo mais para cima
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    width: '50%',
    height: 50,
    backgroundColor: '#49b3dd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  socialLoginContainer: {
    width: '100%',
    marginTop: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 10,
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
