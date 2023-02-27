import React, { useState } from 'react';
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
import { createPost } from '../ApiService';
import ErrorText from '../helpers/ErrorText';

const CreatePostSchema = Yup.object().shape({
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

export default function CreatePost() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { isError, isLoading, mutateAsync } = useMutation(createPost, {
    onSuccess: ({ data }) => {
      Toast.show({
        type: 'customSuccess',
        text1: 'Post has been created.',
        topOffset: 50,
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'customError',
        text1: 'Something went wrong, please try again later.',
        topOffset: 50,
      });
    },
  });

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Formik
      initialValues={{
        title: '',
        text: '',
        url: '',
        image: '',
      }}
      validationSchema={CreatePostSchema}
      onSubmit={(values) => {
        keyboardHide();
        mutateAsync(values);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        handleReset,
        touched,
      }) => (
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <View style={styles.container}>
            <KeyboardAvoidingView
              style={{ width: '100%', alignItems: 'center' }}
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
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={handleSubmit}
                style={styles.btn}
              >
                <Text style={styles.btnText}>Create post</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
}

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
    marginBottom: 20,
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
    width: 210,
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
