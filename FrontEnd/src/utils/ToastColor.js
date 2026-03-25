import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ 
        borderLeftColor: '#6cff4b',
        backgroundColor: '#252525',
        height: 70,
        width: '90%',
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6cff4b',
      }}
      text2Style={{
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{ 
        borderLeftColor: '#FF4444',
        backgroundColor: '#252525', 
        height: 70,
        width: '90%',
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF4444',
      }}
      text2Style={{
        fontSize: 14,
        color: '#FFFFFF',
      }}
    />
  ),
};