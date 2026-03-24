import Toast from 'react-native-toast-message';

const AxiosToastError = (error) => {
  const message = error?.response?.data?.message || "Erro de conexão. Verifique sua internet.";

  Toast.show({
    type: 'error',
    text1: 'Ops! Algo deu errado',
    text2: message,
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
  });
};

export default AxiosToastError;