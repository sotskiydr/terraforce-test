import { iosOrAndroid } from './iosOrAndroid';

const fontDefinition = () => {
  return iosOrAndroid() ? 'Helvetica' : 'sans-serif';
};

export default fontDefinition;
