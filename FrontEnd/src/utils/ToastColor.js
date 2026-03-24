import { ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ 
        borderLeftColor: '#D4AF37', 
        backgroundColor: '#252525',
        height: 70,
        marginTop: 10
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D4AF37',
      }}
      text2Style={{
        fontSize: 13,
        color: '#FFFFFF',
      }}
    />
  ),
};