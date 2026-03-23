import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateAppointment = ({ navigation, route }) => {
    const [time, setTime] = useState('');
    const [client, setClient] = useState('');
    const [details, setDetails] = useState('');
    const [priceHand, setPriceHand] = useState('');
    const [priceFoot, setPriceFoot] = useState('');
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const { item } = route.params;

    const onChange = (event, selectedDate) => {
        setShowCalendar(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const onTimeChange = (event, selectedDate) => {
        setShowTimePicker(false);
        if (selectedDate) {
            const hours = selectedDate.getHours().toString().padStart(2, '0');
            const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
            setTime(`${hours}:${minutes}`);
            setDate(selectedDate);
        }
    };

    useEffect(() => {
        const getUserName = async () => {
            try {
                const savedName = await AsyncStorage.getItem('savedUser');
                if (savedName) {
                    setUserName(savedName.charAt(0).toUpperCase() + savedName.slice(1));
                }
            } catch (error) {
                console.log("Erro ao carregar nome:", error);
            }
        };
        getUserName();
    }, []);

    useEffect(() => {
        if (item) {
            setClient(item.client);
            setDetails(item.details || '');
            setPriceHand(item.hand?.toString() || '');
            setPriceFoot(item.foot?.toString() || '');
            setTime(item.hour);
            const datePart = item.date.split('T')[0];
            const [year, month, day] = datePart.split('-').map(Number);
            setDate(new Date(year, month - 1, day));
        }
    }, [item]);

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const token = await AsyncStorage.getItem('token');
            const formatPrice = (value) => {
                if (!value) return 0;
                return parseFloat(value.toString().replace(',', '.'));
            };
            const response = await Axios({
                ...SummaryApi.updateAppointment(item._id),
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    date: date.toISOString().split('T')[0],
                    hour: time,
                    client: client,
                    details: details,
                    hand: formatPrice(priceHand),
                    foot: formatPrice(priceFoot),
                }
            });

            if (response.data.success) {
                Alert.alert("Sucesso", response.data.message);
                navigation.navigate('Home');
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setShowCalendar(false); setShowTimePicker(false) }} accessible={false}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >

                <View style={styles.backContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <FontAwesome6 name="arrow-left" style={styles.arrow} />
                        <Text style={styles.backText}>
                            ㅤVoltar
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.header}>
                    <Text style={styles.title}>Olá, {userName}</Text>
                    <Text style={styles.subtitle}>Edite o agendamento da {item.client}</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        value={date.toLocaleDateString('pt-BR')}
                        onFocus={() => setShowCalendar(true)}
                        label="Data *"
                        showSoftInputOnFocus={false}
                        mode="flat"
                        style={styles.input}
                        textColor="#fff"
                        theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                        right={<TextInput.Icon icon="calendar" iconColor="#D4AF37" />}
                    />

                    {showCalendar && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            onChange={onChange}
                        />
                    )}

                    <TextInput
                        label='Horário *'
                        mode='flat'
                        value={time}
                        showSoftInputOnFocus={false}
                        onPressIn={() => setShowTimePicker(true)}
                        style={styles.input}
                        textColor="#fff"
                        theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                        right={<TextInput.Icon icon="clock" iconColor="#D4AF37" />}
                    />
                </View>

                {showTimePicker && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onTimeChange}
                    />
                )}

                <View style={styles.formContainer}>
                    <TextInput
                        label='Cliente *'
                        mode='flat'
                        value={client}
                        onChangeText={text => setClient(text)}
                        style={styles.input}
                        textColor="#fff"
                        theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                    />

                    <TextInput
                        label='Detalhes'
                        mode='flat'
                        value={details}
                        onChangeText={text => setDetails(text)}
                        style={styles.input}
                        textColor="#fff"
                        theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                    />

                    <View style={styles.checkboxContainer}>
                        <View style={styles.checkbox}>
                            <Text style={styles.checkboxText}>Mão</Text>
                            <TextInput
                                label='R$'
                                value={priceHand}
                                onChangeText={text => setPriceHand(text)}
                                style={styles.inputPrice}
                                keyboardType="numeric"
                                textColor="#fff"
                                theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                            />
                        </View>

                        <View style={styles.checkbox}>
                            <Text style={styles.checkboxText}>Pé</Text>
                            <TextInput
                                label='R$'
                                value={priceFoot}
                                onChangeText={text => setPriceFoot(text)}
                                style={styles.inputPrice}
                                keyboardType="numeric"
                                textColor="#fff"
                                theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                            />
                        </View>
                    </View>

                </View>

                <TouchableOpacity
                    style={[styles.buttonContainer, loading && { opacity: 0.7 }]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={styles.button}>
                        {loading ? 'Carregando...' : 'Salvar '}
                        {!loading}
                    </Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    backContainer: {
        width: '100%',
        marginBottom: 15,
    },
    backButton: {
        width: '25%',
        height: 45,
        backgroundColor: '#D4AF37',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
        flexDirection: 'row',
    },
    backText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#252525',
    },
    arrow: {
        fontSize: 13,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
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
    searchIcon: {
        color: '#D4AF37',
        fontSize: 18,
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
    formContainer: {
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 20,
        width: '100%',
        alignItems: 'center',
    },
    checkboxContainer: {
        width: '50%',
        marginTop: 10,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    checkboxText: {
        color: '#D4AF37',
        fontSize: 16,
    },
    inputPrice: {
        width: 80,
        height: 40,
        backgroundColor: '#252525',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
        fontSize: 14,
        marginBottom: 10,
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
        marginTop: 20,
    },
    button: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#252525',
    },
})

export default UpdateAppointment