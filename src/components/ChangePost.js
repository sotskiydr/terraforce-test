import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import fontDefinition from '../helpers/fontDefinition';
import { iosOrAndroid } from '../helpers/iosOrAndroid';
import Loader from './Loader';
import { updatePost } from '../ApiService';
import ErrorText from '../helpers/ErrorText';

const ChangePostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(30, 'Maximum 30 symbols')
    .required('title is required'),
  text: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(100, 'Maximum 100 symbols')
    .required('text is required'),
  url: Yup.string().min(5, 'Minimum 5 symbols').required('Url is required'),
  image: Yup.string()
    .min(10, 'Minimum 10 symbols')
    .required('Image is required'),
});

export default function ChangePost({ item, onClose }) {
  const navigation = useNavigation();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { isError, isLoading, mutateAsync } = useMutation(updatePost, {
    onSuccess: () => {
      Toast.show({
        type: 'customSuccess',
        text1: 'Post has been updated.',
        topOffset: 50,
      });
      onClose();
    },
    onError: (error) => {
      Toast.show({
        type: 'customError',
        text1: 'Something went wrong, please try again later.',
        topOffset: 50,
      });
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: item?.id ? `Post id: ${item?.id}` : 'Read',
    });
  }, [item?.id]);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  if (!item?.id) {
    return (
      <View>
        <Text>You need to select a post on the Read page</Text>
      </View>
    );
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Formik
      initialValues={{
        title: item?.title || '',
        text: item?.text || '',
        url: item?.url || '',
        image: item?.image || '',
      }}
      validationSchema={ChangePostSchema}
      onSubmit={(values) => {
        keyboardHide();
        mutateAsync({ id: item?.id, values });
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <View style={styles.container}>
            <KeyboardAvoidingView
              style={{ alignItems: 'center', width: '100%' }}
              behavior={iosOrAndroid() ? 'padding' : 'height'}
            >
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter title"
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  placeholderTextColor={'rgba(0, 0, 0, 0.7)'}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter text"
                  onChangeText={handleChange('text')}
                  onBlur={handleBlur('text')}
                  value={values.text}
                  placeholderTextColor={'rgba(0, 0, 0, 0.7)'}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter url"
                  onChangeText={handleChange('url')}
                  onBlur={handleBlur('url')}
                  value={values.url}
                  placeholderTextColor={'rgba(0, 0, 0, 0.7)'}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter image link"
                  onChangeText={handleChange('image')}
                  onBlur={handleBlur('image')}
                  value={values.image}
                  placeholderTextColor={'rgba(0, 0, 0, 0.7)'}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View style={styles.errorContainer}>
                {isError && <ErrorText errors={isError} />}
                {touched.title && errors.title && (
                  <ErrorText errors={errors.title} />
                )}
                {touched.text && errors.text && (
                  <ErrorText errors={errors.text} />
                )}
                {touched.image && errors.image && (
                  <ErrorText errors={errors.image} />
                )}
                {touched.url && errors.url && <ErrorText errors={errors.url} />}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.3}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnText}>Change post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.btn, marginLeft: 50 }}
                  activeOpacity={0.3}
                  onPress={() => {
                    navigation.setOptions({ title: 'Read' });
                    onClose();
                  }}
                >
                  <Text style={styles.btnText}>Back</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
}

ChangePost.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textContainer: {
    marginBottom: 30,
  },
  title: {
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 52,
    color: 'color: rgba(0, 0, 0, 0.87)',
    fontFamily: fontDefinition(),
  },
  text: {
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 26,
    color: '#828282',
    width: 180,
    fontFamily: fontDefinition(),
  },
  inputBox: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: 50,
    justifyContent: 'center',
    paddingEnd: 50,
    paddingStart: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 7 },
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    height: '100%',
    paddingVertical: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 22,
    color: 'rgba(0, 0, 0, 0.7)',
    fontFamily: fontDefinition(),
  },
  forgotPasswordText: {
    textAlign: 'center',
    color: '#007AFF',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 25,
    fontFamily: fontDefinition(),
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    width: 150,
    height: 40,
    borderColor: '#000',
    borderWidth: 2,
  },
  btnText: {
    fontFamily: fontDefinition(),
    fontSize: 20,
    color: '#000',
  },
});
