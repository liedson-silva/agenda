import { View, Text, StyleSheet, TouchableOpacity, Platform, SafeAreaView, StatusBar } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const Home = ({ navigation }) => {
    const [itemActive, setItemActive] = useState('HOJE');
    const [period, setPeriod] = useState('(1 DIA)');
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showDate, setShowDate] = useState(true);

    const onChange = (event, selectedDate) => {
        setShowCalendar(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.subContainer}>

                <View style={styles.header}>
                    <Text style={styles.name}>Olá, Jéssica!</Text>
                    <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.exitButtonText}>Sair</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.nav}>

                    <TouchableOpacity
                        style={[itemActive === 'HOJE' ? styles.navItemActive : styles.navItem]} onPress={() => { setItemActive('HOJE'); setPeriod('(1 DIA)'); setShowDate(true) }}>
                        <Text
                            style={[itemActive === 'HOJE' ? styles.navTextActive : styles.navText]}>HOJE
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[itemActive === 'SEMANA' ? styles.navItemActive : styles.navItem]} onPress={() => { setItemActive('SEMANA'); setPeriod('(7 DIAS)'); setShowDate(false) }}>
                        <Text
                            style={[itemActive === 'SEMANA' ? styles.navTextActive : styles.navText]}>SEMANA
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[itemActive === 'MÊS' ? styles.navItemActive : styles.navItem]} onPress={() => { setItemActive('MÊS'); setPeriod('(30 DIAS)'); setShowDate(false) }}>
                        <Text
                            style={[itemActive === 'MÊS' ? styles.navTextActive : styles.navText]}>MÊS
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[itemActive === 'TODOS' ? styles.navItemActive : styles.navItem]} onPress={() => { setItemActive('TODOS'); setPeriod('(TOTAL)'); setShowDate(false) }}>
                        <Text
                            style={[itemActive === 'TODOS' ? styles.navTextActive : styles.navText]}>TODOS
                        </Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsRow}>
                        <Text style={styles.statsLabel}>GANHOS {period}:</Text>
                        <Text style={styles.statsValue}>R$ 0,00</Text>
                    </View>

                    {showDate && (
                        <TouchableOpacity style={styles.dateSelector} onPress={() => setShowCalendar(true)}>
                            <Text style={styles.dateText}>{date.toLocaleDateString('pt-BR')}</Text>
                            <FontAwesome6 name="magnifying-glass" style={styles.searchIcon} />
                        </TouchableOpacity>
                    )}

                    {showDate && (
                        <View style={styles.dayOfWeek}>
                            <Text style={styles.day}>{date.toLocaleDateString('pt-BR', { weekday: 'long' })}</Text>
                        </View>
                    )}

                </View>

                <View style={styles.contentContainer}>
                    <FontAwesome6 name="calendar-xmark" style={styles.contentIcon} />
                    <Text style={styles.contentContainerTitle}>Nada agendado para esta data!</Text>

                    <View style={styles.instructions}>
                        <Text style={styles.instructionText}>
                            <Text style={styles.gold}>*</Text> Para adicionar um novo agendamento, toque no "+";
                        </Text>
                        <Text style={styles.instructionText}>
                            <Text style={styles.gold}>*</Text> Para detalhes sobre o agendamento, toque sobre ele;
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NewAppointment')}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {showCalendar && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onChange={onChange}
                    />
                )}

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    subContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 40 : 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomColor: '#D4AF37',
        borderBottomWidth: 1,
    },
    name: {
        color: '#D4AF37',
        fontSize: 22,
        fontWeight: 'bold',
    },
    exitButton: {
        backgroundColor: '#D4AF37',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
        marginBottom: 5,
    },
    exitButtonText: {
        color: '#1A1A1A',
        fontSize: 16,
        fontWeight: 'bold',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#1A1A1A',
        borderRadius: 15,
        padding: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#333',
    },
    navItemActive: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#D4AF37',
        borderRadius: 10,
    },
    navItem: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: 10,
    },
    navText: {
        color: '#fff',
        fontSize: 12,
        opacity: 0.6,
    },
    navTextActive: {
        color: '#1A1A1A',
        fontSize: 12,
        fontWeight: 'bold',
    },
    statsContainer: {
        width: '100%',
        backgroundColor: '#1A1A1A',
        borderColor: '#D4AF3733',
        borderWidth: 1,
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    statsLabel: {
        color: '#fff',
        fontSize: 16,
    },
    statsValue: {
        color: '#D4AF37',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#252525',
        padding: 12,
        borderRadius: 10,
        marginTop: 15,
    },
    dateText: {
        color: '#fff',
        fontSize: 16,
        marginRight: 10,
    },
    searchIcon: {
        color: '#D4AF37',
        fontSize: 18,
    },
    dayOfWeek: {
        marginTop: 10,
        alignItems: 'center',
    },
    day: {
        color: '#D4AF37',
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#212121',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#333',
        marginBottom: 30,
    },
    contentIcon: {
        color: '#D4AF37',
        fontSize: 40,
        marginBottom: 10,
        opacity: 0.5
    },
    contentContainerTitle: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
    },
    contentContainerText: {
        color: '#D4AF37',
        fontSize: 16,
        marginBottom: 10,
    },
    instructions: {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingTop: 20,
    },
    instructionText: {
        color: '#fff',
        fontSize: 13,
        opacity: 0.5,
        marginBottom: 8,
        lineHeight: 18,
    },
    gold: {
        color: '#D4AF37',
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#D4AF37',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    addButtonText: {
        color: '#1A1A1A',
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 30,
    },
})

export default Home