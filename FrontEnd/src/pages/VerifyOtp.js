import { Text, View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import nailIcon from '../assets/nail.png';
import { TextInput } from "react-native-paper";

const VerifyOtp = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={nailIcon} style={styles.logo} />
                <Text style={styles.title}>Bem-vinda!</Text>
                <Text style={styles.subtitle}>Formulário OTP</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    textColor="#fff"
                    underlineColor="transparent"
                    activeUnderlineColor="#D4AF37"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                />
                <TextInput
                    style={styles.input}
                    textColor="#fff"
                    underlineColor="transparent"
                    activeUnderlineColor="#D4AF37"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                />
                <TextInput
                    style={styles.input}
                    textColor="#fff"
                    underlineColor="transparent"
                    activeUnderlineColor="#D4AF37"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                />
                <TextInput
                    style={styles.input}
                    textColor="#fff"
                    underlineColor="transparent"
                    activeUnderlineColor="#D4AF37"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                />
                <TextInput
                    style={styles.input}
                    textColor="#fff"
                    underlineColor="transparent"
                    activeUnderlineColor="#D4AF37"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                />
                <TextInput
                    style={styles.input}
                    textColor="#fff"
                    underlineColor="transparent"
                    activeUnderlineColor="#D4AF37"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                />
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={styles.confirm}>Verificar</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginQuestion}>Voltar para o </Text>
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
        width: '15%',
        height: 55,
        backgroundColor: '#252525',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#333',
    },
    confirmButton: {
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
    confirm: {
        fontSize: 18,
        color: '#252525',
        fontWeight: 'bold',
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

export default VerifyOtp