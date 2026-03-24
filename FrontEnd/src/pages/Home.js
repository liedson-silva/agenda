import { View, Text, StyleSheet, TouchableOpacity, Platform, SafeAreaView, StatusBar, ScrollView, ActivityIndicator } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosToastError from '../utils/AxiosToastError';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import formatDate from '../components/FormatDate';

const Home = ({ navigation }) => {
    const [itemActive, setItemActive] = useState('HOJE');
    const [period, setPeriod] = useState('(1 DIA)');
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showDate, setShowDate] = useState(true);
    const [userName, setUserName] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [loading, setLoading] = useState(false);

    const onChange = (event, selectedDate) => {
        setShowCalendar(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                const name = await AsyncStorage.getItem('savedUser');
                if (name) {
                    setUserName(name);
                }
            } catch (error) {
                console.log("Erro ao carregar nome:", error);
            }
        };
        getUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.multiRemove(['token', 'savedUser']);

            navigation.replace('Login');
        } catch (e) {
            console.log("Erro ao sair:", e);
        }
    };

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await Axios({
                ...SummaryApi.getAppointments,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                const data = response.data.data || [];
                setAppointments(data);

                const total = data.reduce((acc, curr) => {
                    return acc + (Number(curr.hand) || 0) + (Number(curr.foot) || 0);
                }, 0);
                setTotalEarnings(total);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, [itemActive, date]);

    const getFilteredAppointments = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDateStr = date.toLocaleDateString('sv-SE');

        return appointments.filter(item => {
            const appointmentDateStr = item.date.split('T')[0];
            const [year, month, day] = appointmentDateStr.split('-').map(Number);
            const appointmentDate = new Date(year, month - 1, day);

            if (itemActive === 'HOJE') {
                return appointmentDateStr === selectedDateStr;
            }

            if (itemActive === 'SEMANA') {
                const firstDayOfWeek = new Date(today);
                firstDayOfWeek.setDate(today.getDate() - today.getDay());

                const lastDayOfWeek = new Date(firstDayOfWeek);
                lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

                return appointmentDate >= firstDayOfWeek && appointmentDate <= lastDayOfWeek;
            }

            if (itemActive === 'MÊS') {
                return appointmentDate.getMonth() === today.getMonth() &&
                    appointmentDate.getFullYear() === today.getFullYear();
            }

            return true;
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.subContainer}>

                <View style={styles.header}>
                    <Text style={styles.name}>Olá, {userName}!</Text>
                    <TouchableOpacity style={styles.exitButton} onPress={handleLogout}>
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
                        <Text style={styles.statsValue}>
                            R$ {getFilteredAppointments().reduce((acc, curr) =>
                                acc + (Number(curr.hand) || 0) + (Number(curr.foot) || 0), 0
                            ).toFixed(2).replace('.', ',')}
                        </Text>
                    </View>

                    {showDate && (<>
                        {Platform.OS !== 'web' ? (
                            <TouchableOpacity style={styles.dateSelector} onPress={() => setShowCalendar(true)}>
                                <Text style={styles.dateText}>{date.toLocaleDateString('pt-BR')}</Text>
                                <FontAwesome6 name="magnifying-glass" style={styles.searchIcon} />
                            </TouchableOpacity>
                        ) : (
                            <input
                                type="date"
                                style={styles.dateSelector}
                                value={date.toISOString().split('T')[0]}
                                onChange={(e) => {
                                    const dateString = e.target.value;
                                    if (dateString) {
                                        const [year, month, day] = dateString.split('-').map(Number);
                                        setDate(new Date(year, month - 1, day));
                                    }
                                }}
                            />
                        )}
                    </>
                    )}

                    {showDate && (
                        <View style={styles.dayOfWeek}>
                            <Text style={styles.day}>{date.toLocaleDateString('pt-BR', { weekday: 'long' })}</Text>
                        </View>
                    )}

                </View>

                <View style={styles.contentContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#D4AF37" />
                    ) : getFilteredAppointments().length > 0 ? (
                        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                            {getFilteredAppointments().map((item) => (
                                <TouchableOpacity onPress={() => navigation.navigate("DetailsAppointment", { item })} key={item._id} style={styles.appointmentCard}>
                                    <View>
                                        <Text style={styles.clientName}>{item.client}</Text>
                                        <Text style={styles.serviceText}>
                                            {item.hand > 0 ? '• Mão ' : ''}{item.foot > 0 ? '• Pé' : ''} {item.busso > 0 ? '• B' : ''} {item.eyebrow > 0 ? '• S' : ''}
                                        </Text>
                                    </View>
                                    <View style={styles.hourBadge}>
                                        <Text style={styles.hourBadgeText}>{item.hour}</Text>
                                        <Text style={styles.dateBadgeText}>{formatDate(item.date)}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={{ alignItems: 'center' }}>
                            <FontAwesome6 name="calendar-xmark" style={styles.contentIcon} />
                            <Text style={styles.contentContainerTitle}>Nenhum agendamento!</Text>
                        </View>
                    )}

                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NewAppointment')}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {showCalendar && Platform.OS !== 'web' && (
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
        color: '#fff',
        padding: 12,
        borderRadius: 10,
        marginTop: 15,
        border: '1px solid #D4AF3733',
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
    appointmentCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        width: '100%',
        borderLeftWidth: 4,
        borderLeftColor: '#D4AF37'
    },
    clientName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    serviceText: {
        color: '#D4AF37',
        fontSize: 12
    },
    hourBadge: {
        backgroundColor: '#D4AF3722',
        padding: 5,
        borderRadius: 6
    },
    hourBadgeText: {
        color: '#D4AF37',
        fontWeight: 'bold'
    },
    dateBadgeText: {
        color: '#D4AF37',
        fontSize: 10,
        textAlign: 'center',
        opacity: 0.8
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
        elevation: 8
    },
    addButtonText: {
        color: '#1A1A1A',
        fontSize: 30,
        fontWeight: 'bold'
    },
})

export default Home