import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ConfirmBox = ({ visible, onClose, onConfirm, title, message }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.confirmText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#252525',
        width: '90%',
        borderRadius: 15,
        padding: 20,
        borderWidth: 1,
        borderColor: '#333'
    },
    title: {
        color: '#D4AF37',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    message: {
        color: '#FFF',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15
    },
    cancelButton: {
        padding: 10
    },
    cancelText: {
        color: '#FFF',
        opacity: 0.6
    },
    confirmButton: {
        backgroundColor: '#FF4444',
        padding: 10,
        borderRadius: 8
    },
    confirmText: {
        color: '#FFF',
        fontWeight: 'bold'
    }
});

export default ConfirmBox;