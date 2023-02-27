import fontDefinition from '../helpers/fontDefinition';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import { customAlphabet } from 'nanoid/non-secure';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

const ErrorText = ({ errors = [] }) => {
  const defineErrorType = () => {
    return Array.isArray(errors);
  };

  return defineErrorType() ? (
    <>
      {errors.map((el) => {
        return (
          <Text key={nanoid()} style={styles.text}>
            {el}
          </Text>
        );
      })}
    </>
  ) : (
    <Text style={styles.text}>{errors}</Text>
  );
};

export default ErrorText;

ErrorText.propTypes = {
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'red',
    fontFamily: fontDefinition(),
  },
});
