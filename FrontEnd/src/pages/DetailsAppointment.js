import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, Alert, } from "react-native"
import { FontAwesome6 } from '@expo/vector-icons';
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsAppointment = ({ navigation, route }) => {

    const [loading, setLoading] = useState(false);
    const { item } = route.params;

    const handleDelete = () => {
        Alert.alert(
            "Excluir Agendamento",
            `Tem certeza que deseja excluir o agendamento de ${item.client}?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir", style: "destructive", onPress: async () => {
                        setLoading(true);
                        try {
                            const token = await AsyncStorage.getItem('token');
                            const response = await Axios({
                                ...SummaryApi.deleteAppointment(item._id),
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })

                            if (response.data.success) {
                                Alert.alert("Sucesso", response.data.message);
                                navigation.navigate('Home');
                            }
                        } catch (error) {
                            AxiosToastError(error)
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    const handleEdit = async () => {
        navigation.navigate('EditAppointment', { item });
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Home')}>
                    <FontAwesome6 name="arrow-left" size={20} color="#D4AF37" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Detalhes</Text>

                <View style={styles.containerButtons}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
                        <FontAwesome6 name="pen-to-square" size={20} color="#D4AF37" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
                        <FontAwesome6 name="trash-can" size={20} color="#FF4444" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.infoGroup}>
                    <Text style={styles.label}>Cliente:</Text>
                    <Text style={styles.value}>{item.client}</Text>
                </View>
                <View style={styles.row}>
                    <View style={[styles.infoGroup, { flex: 1 }]}>
                        <Text style={styles.label}>Data:</Text>
                        <Text style={styles.value}>
                            {item.date.split('T')[0].split('-').reverse().join('/')}
                        </Text>
                    </View>
                    <View style={[styles.infoGroup, { flex: 1 }]}>
                        <Text style={styles.label}>Horário:</Text>
                        <Text style={styles.value}>{item.hour}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoGroup}>
                    <Text style={styles.label}>Serviços realizados:</Text>
                    {item.hand > 0 && (
                        <View style={styles.serviceRow}>
                            <Text style={styles.value}>• Mão</Text>
                            <Text style={styles.value}>R$ {item.hand.toFixed(2)}</Text>
                        </View>
                    )}
                    {item.foot > 0 && (
                        <View style={styles.serviceRow}>
                            <Text style={styles.value}>• Pé</Text>
                            <Text style={styles.value}>R$ {item.foot.toFixed(2)}</Text>
                        </View>
                    )}
                    {item.details && item.details.length > 0 && (
                        <View style={styles.infoGroup}>
                            <Text style={styles.label}>Observações:</Text>
                            <Text style={styles.value}>{item.details}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>TOTAL RECEBIDO</Text>
                    <Text style={styles.totalValue}>R$ {(item.hand + item.foot).toFixed(2)}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.finishButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.finishButtonText}>Concluir</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    headerTitle: {
        color: '#D4AF37',
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 10,
        backgroundColor: '#252525',
        borderRadius: 12,
    },
    containerButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        padding: 10,
        backgroundColor: '#252525',
        borderRadius: 12,
    },
    deleteButton: {
        padding: 10,
        backgroundColor: '#252525',
        borderRadius: 12,
    },
    card: {
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#1A1A1A',
        borderRadius: 15,
        padding: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    infoGroup: {
        gap: 5,
        marginBottom: 15,
    },
    label: {
        color: '#D4AF37',
        fontSize: 16,
    },
    value: {
        color: '#FFF',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        gap: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 15,
    },
    serviceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    totalContainer: {
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#D4AF3744',
        alignItems: 'center',
    },
    totalLabel: {
        color: '#D4AF37',
        marginBottom: 5,
    },
    totalValue: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
    },
    finishButton: {
        marginTop: 30,
        backgroundColor: '#D4AF37',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
        marginBottom: 5,
    },
    finishButtonText: {
        color: '#1A1A1A',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default DetailsAppointment