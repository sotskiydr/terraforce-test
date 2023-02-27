import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { View, Text } from 'react-native';
import fontDefinition from '../helpers/fontDefinition';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#fff',
        backgroundColor: '#fff',
      }}
      contentContainerStyle={{ paddingHorizontal: 15, flexDirection: 'row' }}
      text1Style={{
        width: 30,
      }}
      text2Style={{
        fontSize: 18,
        fontWeight: '600',
        fontFamily: fontDefinition(),
        color: '#168710',
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
        fontFamily: fontDefinition(),
      }}
      text2Style={{
        fontSize: 15,
        fontFamily: fontDefinition(),
      }}
    />
  ),
  customSuccess: ({ text1, props }) => (
    <View
      style={{
        height: 60,
        width: '80%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 7 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      }}
    >
      <Text
        style={{
          color: '#168710',
          fontFamily: fontDefinition(),
          fontSize: 18,
          fontWeight: '600',
        }}
      >
        {text1}
      </Text>
    </View>
  ),
  customError: ({ text1, props }) => (
    <View
      style={{
        height: 60,
        width: '80%',
        backgroundColor: '#e74c3c',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 7 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontFamily: fontDefinition(),
          fontSize: 17,
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        {text1}
      </Text>
    </View>
  ),
};
