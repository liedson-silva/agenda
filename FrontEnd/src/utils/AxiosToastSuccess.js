import Toast from 'react-native-toast-message';

const AxiosToastSuccess = (message) => {
  const successMessage = message || "Sucesso! Operação realizada com êxito.";
  
    Toast.show({
      type: 'success',
      text1: 'Sucesso!',
      text2: successMessage,
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
    });
};

export default AxiosToastSuccess;   