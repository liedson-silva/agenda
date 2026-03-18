import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import nailIcon from '../assets/nail.png';
import { FontAwesome6 } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

const Login = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={nailIcon}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <TextInput
          label='Usuário'
          mode='flat'
          value={user}
          onChangeText={text => setUser(text)}
          style={styles.input}
          textColor="#b3559a"
          underlineColor="transparent"
          theme={{ colors: { primary: '#b3559a', placeholder: '#b3559a' } }}
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
          textColor="#b3559a"
          underlineColor="transparent"
          theme={{ colors: { primary: '#b3559a', placeholder: '#b3559a' } }}
        />
      </View>

      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgot}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.button}>
          Entrarㅤ
          <FontAwesome6 name="arrow-right" style={styles.arrow} />
        </Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerQuestion}>Não possui conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.register}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f98ae3',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 50,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  input: {
    width: '70%',
    height: 50,
    backgroundColor: '#fff5fd',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderRadius: 24,
    textAlign: 'center'
  },
  forgotContainer: {
    width: '70%',
    alignItems: 'flex-end',
    marginBottom: 50,
    marginTop: -15,
  },
  forgot: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  buttonContainer: {
    width: '70%',
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
  },
  registerQuestion: {
    color: '#fff',
    opacity: 0.8,
  },
  register: {
    color: '#000',
    opacity: 0.8,
  }
});

export default Login;