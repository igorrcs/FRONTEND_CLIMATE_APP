import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/SignupStyle'; // Importando os estilos
import { RootStackParamList } from '../navigation/Navigations'; // Certifique-se de que este caminho está correto
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Definição do tipo de navegação
type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Signup'
>;

// Definição do esquema de validação usando Yup
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .required('Nome completo é obrigatório'),
  email: Yup.string()
    .email('Digite um email válido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'As senhas não correspondem')
    .required('A confirmação de senha é obrigatória'),
});

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/logo3.webp')} style={styles.logo} />
        <Text style={styles.title}>Crie sua conta</Text>

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            Alert.alert('Cadastro realizado com sucesso!', JSON.stringify(values, null, 2));
            navigation.navigate('Login');
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              
              <View style={styles.inputContainer}>
                <Icon name="user" type="font-awesome" size={24} color="#333" />
                <TextInput
                  style={styles.input}
                  placeholder="Nome Completo"
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                />
              </View>
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}

              <View style={styles.inputContainer}>
                <Icon name="envelope" type="font-awesome" size={24} color="#333" />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <View style={styles.inputContainer}>
                <Icon name="lock" type="font-awesome" size={24} color="#333" />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    name={showPassword ? 'eye' : 'eye-slash'}
                    type="font-awesome"
                    size={24}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <View style={styles.inputContainer}>
                <Icon name="lock" type="font-awesome" size={24} color="#333" />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar Senha"
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Icon
                    name={showConfirmPassword ? 'eye' : 'eye-slash'}
                    type="font-awesome"
                    size={24}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
