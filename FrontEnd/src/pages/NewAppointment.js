import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import { Checkbox, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewAppointment = ({ navigation }) => {
    const [time, setTime] = useState('');
    const [client, setClient] = useState('');
    const [details, setDetails] = useState('');
    const [checkedHand, setCheckedHand] = useState(false);
    const [checkedFoot, setCheckedFoot] = useState(false);
    const [priceHand, setPriceHand] = useState('');
    const [priceFoot, setPriceFoot] = useState('');
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

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

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >

            <View style={styles.backContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <FontAwesome6 name="arrow-left" style={styles.arrow} />
                    <Text style={styles.backText}>
                        ㅤVoltar
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>Olá, Jéssica</Text>
                <Text style={styles.subtitle}>Agende um novo horário para sua cliente</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    value={date.toLocaleDateString()}
                    onFocus={() => setShowCalendar(true)}
                    label="Data"
                    showSoftInputOnFocus={false}
                    mode="flat"
                    style={styles.input}
                    textColor="#fff"
                    underlineColor="transparent"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                    right={<TextInput.Icon icon="calendar" iconColor="#D4AF37" />}
                />
                <TextInput
                    label='Horário'
                    mode='flat'
                    value={time}
                    showSoftInputOnFocus={false}
                    onPressIn={() => setShowTimePicker(true)}
                    style={styles.input}
                    textColor="#fff"
                    underlineColor="transparent"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                    right={<TextInput.Icon icon="clock" iconColor="#D4AF37"/>}
                />
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    label='Cliente'
                    mode='flat'
                    value={client}
                    onChangeText={text => setClient(text)}
                    style={styles.input}
                    textColor="#fff"
                    underlineColor="transparent"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                />

                <TextInput
                    label='Detalhes'
                    mode='flat'
                    value={details}
                    onChangeText={text => setDetails(text)}
                    style={styles.input}
                    textColor="#fff"
                    underlineColor="transparent"
                    theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                />

                <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                        <Checkbox.Item
                            status={checkedHand ? 'checked' : 'unchecked'}
                            onPress={() => setCheckedHand(!checkedHand)}
                            color="#D4AF37"
                            uncheckedColor="#555"
                            labelStyle={styles.label}
                            mode="android"
                        />
                        <Text style={styles.checkboxText}>Mãos</Text>
                        <TextInput
                            label='R$'
                            value={priceHand}
                            onChangeText={text => setPriceHand(text)}
                            style={styles.inputPrice}
                            keyboardType="numeric"
                            textColor="#fff"
                            underlineColor="transparent"
                            theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                        />
                    </View>

                    <View style={styles.checkbox}>
                        <Checkbox.Item
                            status={checkedFoot ? 'checked' : 'unchecked'}
                            onPress={() => setCheckedFoot(!checkedFoot)}
                            color="#D4AF37"
                            uncheckedColor="#555"
                            labelStyle={styles.label}
                            mode="android"
                        />
                        <Text style={styles.checkboxText}>Pés</Text>
                        <TextInput
                            label='R$'
                            value={priceFoot}
                            onChangeText={text => setPriceFoot(text)}
                            style={styles.inputPrice}
                            keyboardType="numeric"
                            textColor="#fff"
                            underlineColor="transparent"
                            theme={{ colors: { primary: '#D4AF37', onSurfaceVariant: '#D4AF37' } }}
                        />
                    </View>
                </View>

            </View>

            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.button}>
                    Salvar
                </Text>
            </TouchableOpacity>

            {showCalendar && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={onChange}
                />
            )}

            {showTimePicker && (
                <DateTimePicker
                    value={date}
                    mode="time"
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onTimeChange}
                />
            )}

        </KeyboardAvoidingView>
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
        height: 30,
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
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#333',
    },
    formContainer: {
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    checkboxContainer: {
        width: '90%',
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
        borderRadius: 12,
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

export default NewAppointment