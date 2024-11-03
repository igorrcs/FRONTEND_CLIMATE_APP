import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/LoginStyle'; // Importando os estilos
import { RootStackParamList } from '../navigation/Navigations'; // Importe a lista de tipos de rotas, se aplicável

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false); // Estado para controlar a exibição da senha

  const handleLogin = () => {
    // Validação de campos vazios
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Validação de formato de email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    // Caso as validações sejam bem-sucedidas, navega para a tela bem-vindo
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../assets/logo3.webp')} style={styles.logo} />
        <Text style={styles.title}>Faça seu Login</Text>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // Mostra ou oculta o texto da senha
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              size={24}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="google" size={24} color="#EA4335" />
            <Text style={styles.socialButtonText}>Login com Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Icon name="facebook" size={24} color="#3b5998" />
            <Text style={styles.socialButtonText}>Login com Facebook</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>Primeiro Acesso? Clique Aqui</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
