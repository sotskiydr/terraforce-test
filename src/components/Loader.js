import { StyleSheet, View, ActivityIndicator } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
