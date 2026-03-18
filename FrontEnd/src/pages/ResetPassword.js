import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"
import nailIcon from '../assets/nail.png';
import { TextInput } from "react-native-paper";
import { useState } from "react";

const ResetPassword = ({ navigation }) => {
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
                <Text style={styles.subtitle}>Resetar Senha</Text>
            </View>

            <TextInput
                label="Senha"
                mode="flat"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                style={styles.input}
                textColor="#fff"
                underlineColor="transparent"
                theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                left={<TextInput.Icon icon="lock-outline" color="#D4AF37" />}
            />

            <TextInput
                label="Confirmar senha"
                mode="flat"
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry
                style={styles.input}
                textColor="#fff"
                underlineColor="transparent"
                theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                left={<TextInput.Icon icon="lock-outline" color="#D4AF37" />}
            />

            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.button}>
                    Salvar
                </Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginQuestion}>Voltar para o </Text>
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
        backgroundColor: '#252525',
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
        tintColor: '#D4AF37'
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
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
        marginBottom: 20,
    },
    button: {
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
})

export default ResetPassword