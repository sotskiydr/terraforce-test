import { Platform } from 'react-native';
export function iosOrAndroid() {
  return Platform.OS === 'ios';
}
