import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { TextInput } from 'react-native-paper';
import nailIcon from '../assets/nail.png';
import { useState } from "react";

const Register = ({ navigation }) => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >

            <View style={styles.header}>
                <Image source={nailIcon} style={styles.logo} />
                <Text style={styles.title}>Bem-vinda!</Text>
                <Text style={styles.subtitle}>Crie sua conta e organize seus atendimentos.</Text>
            </View>

            <TouchableOpacity style={styles.inputContainer}>
                <TextInput
                    label='Nome'
                    mode='flat'
                    value={user}
                    onChangeText={text => setUser(text)}
                    style={styles.input}
                    textColor="#fff"
                    underlineColor="transparent"
                    activeUnderlineColor="#D4AF37"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                    left={<TextInput.Icon icon="account-outline" color="#D4AF37" />}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.inputContainer}>
                <TextInput
                    label='Email'
                    mode='flat'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    textColor="#fff"
                    underlineColor="transparent"
                    activeUnderlineColor="#D4AF37"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                    left={<TextInput.Icon icon="account-outline" color="#D4AF37" />}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.inputContainer}>
                <TextInput
                    label='Senha'
                    mode='flat'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    textColor="#fff"
                    underlineColor="transparent"
                    activeUnderlineColor="#D4AF37"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                    left={<TextInput.Icon icon="lock-outline" color="#D4AF37" />}
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
                    textColor="#fff"
                    underlineColor="transparent"
                    activeUnderlineColor="#D4AF37"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                    left={<TextInput.Icon icon="account-outline" color="#D4AF37" />}
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

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 120,
        height: 120,
        tintColor: '#D4AF37',
        resizeMode: 'contain',
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
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#333',
    },
    confirmContainer: {
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
        marginBottom: 20,
    },
    confirm: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#252525',
    },
    loginContainer: {
        flexDirection: 'row',
    },
    loginQuestion: {
        color: '#fff',
        opacity: 0.8,
    },
    loginButton: {
        color: '#D4AF37',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#D4AF37',
        paddingBottom: 1,
        alignSelf: 'flex-start',
    }
});

export default Register