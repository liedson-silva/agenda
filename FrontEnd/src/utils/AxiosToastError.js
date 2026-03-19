import { Alert } from 'react-native';

const AxiosToastError = (error) => {
    const errorMessage = error?.response?.data?.message || "Ocorreu um erro inesperado. Verifique sua conexão.";

    Alert.alert("Ops! Algo deu errado", errorMessage);
};

export default AxiosToastError;