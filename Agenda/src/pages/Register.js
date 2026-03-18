import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { TextInput } from 'react-native-paper';
import nailIcon from '../assets/nail.png';
import { useState } from "react";

const Register = ({ navigation }) => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <View style={styles.container}>

            <Image
                source={nailIcon}
                style={styles.logo}
            />

            <TouchableOpacity style={styles.inputContainer}>
                <TextInput
                    label='Nome'
                    mode='flat'
                    value={user}
                    onChangeText={text => setUser(text)}
                    style={styles.input}
                    textColor="#d66fb9"
                    underlineColor="transparent"
                    theme={{ colors: { primary: '#d66fb9', placeholder: '#d66fb9' } }}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.inputContainer}>
                <TextInput
                    label='Email'
                    mode='flat'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    textColor="#d66fb9"
                    underlineColor="transparent"
                    theme={{ colors: { primary: '#d66fb9', placeholder: '#d66fb9' } }}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.inputContainer}>
                <TextInput
                    label='Senha'
                    mode='flat'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    textColor="#d66fb9"
                    underlineColor="transparent"
                    theme={{ colors: { primary: '#d66fb9', placeholder: '#d66fb9' } }}
                    secureTextEntry
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.inputContainer}>
                <TextInput
                    label='Confirmar senha'
                    mode='flat'
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    style={styles.input}
                    textColor="#d66fb9"
                    underlineColor="transparent"
                    theme={{ colors: { primary: '#d66fb9', placeholder: '#d66fb9' } }}
                    secureTextEntry
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmContainer}>
                <Text style={styles.confirm}>
                    Salvar
                </Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginQuestion}>Já possui conta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginButton}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f98ae3',
    },
    logo: {
        width: 200,
        height: 150,
        tintColor: '#fff',
        marginBottom: 50,
        resizeMode: 'contain',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    input: {
        fontSize: 16,
        backgroundColor: '#fff5fd',
        width: '70%',
        height: 45,
        borderRadius: 24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        textAlign: 'center'
    },
    confirmContainer: {
        width: '35%',
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    confirm: {
        fontSize: 16,
    },
    loginContainer: {
        flexDirection: 'row',
    },
    loginQuestion: {
        color: '#fff',
        opacity: 0.8,
    },
    loginButton: {
        color: '#000',
        opacity: 0.8,
    }
});

export default Register