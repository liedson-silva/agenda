import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import nailIcon from '../assets/nail.png';
import { FontAwesome6 } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosToastError from '../utils/AxiosToastError.js';

const Login = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!user || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: { name: user, password }
      });

      if (response.data.success) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('savedUser', response.data.data.name);
        await AsyncStorage.setItem('lastTypedUser', user);
        navigation.navigate('Home');
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.replace('Home');
      }
      const lastUser = await AsyncStorage.getItem('lastTypedUser');
      if (lastUser) {
        setUser(lastUser);
      }
    };
    checkLogin();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image source={nailIcon} style={styles.logo} />
        <Text style={styles.title}>Bem-vinda!</Text>
        <Text style={styles.subtitle}>Gerencie seus horários e clientes</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label='Usuário'
          mode='flat'
          value={user}
          onChangeText={text => setUser(text)}
          style={styles.input}
          textColor="#fff"
          activeUnderlineColor="#D4AF37"
          theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
          left={<TextInput.Icon icon="account-outline" color="#D4AF37" />}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Senha"
          mode="flat"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          style={styles.input}
          textColor="#fff"
          theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
          left={<TextInput.Icon icon="lock-outline" color="#D4AF37" />}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonContainer, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.button}>
          {loading ? 'Carregando...' : 'Entrar '}
          {!loading && <FontAwesome6 name="arrow-right" style={styles.arrow} />}
        </Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerQuestion}>Não possui conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.register}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    tintColor: '#D4AF37',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginTop: 10,
  },
  subtitle: {
    color: '#fff',
    opacity: 0.6,
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 55,
    backgroundColor: '#252525',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonContainer: {
    width: '90%',
    height: 55,
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    marginTop: 10,
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#252525',
  },
  arrow: {
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerQuestion: {
    color: '#fff',
    opacity: 0.8,
  },
  register: {
    color: '#D4AF37',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF37',
    paddingBottom: 1,
    alignSelf: 'flex-start',
  }
});

export default Login;