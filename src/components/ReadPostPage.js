import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useState } from 'react';
import { customAlphabet } from 'nanoid/non-secure';
import { useQuery, useMutation } from 'react-query';
import { deletePost, getPosts } from '../ApiService';
import Loader from './Loader';
import ChangePost from './ChangePost';
import fontDefinition from '../helpers/fontDefinition';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

const Read = () => {
  const [currentItem, setCurrentItem] = useState(null);
  const {
    data,
    refetch,
    isLoading: isPostsLoading,
  } = useQuery(['getPosts'], getPosts);

  const { mutate: deleteItem, isLoading: isDeleting } = useMutation(
    deletePost,
    {
      onSuccess: () => {
        refetch();
        Toast.show({
          type: 'customSuccess',
          text1: 'Post has been deleted.',
          topOffset: 50,
        });
      },
    }
  );

  const onResetCurrentItem = () => setCurrentItem(null);

  if (currentItem?.id) {
    return <ChangePost item={currentItem} onClose={onResetCurrentItem} />;
  }

  if (isDeleting || isPostsLoading) {
    return <Loader />;
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isPostsLoading} onRefresh={refetch} />
      }
      data={data}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={nanoid()}
          style={{ ...styles.item, padding: 10 }}
          onPress={() => setCurrentItem(item)}
        >
          {item.image && (
            <Image source={{ uri: item.image }} width={350} height={350} />
          )}
          <Text style={styles.titleText}>Title: {item.title}</Text>
          <Text style={styles.text}>Text: {item.text}</Text>
          <TouchableOpacity
            onPress={() => deleteItem(item.id)}
            style={styles.btn}
          >
            <Text style={styles.btnText}>delete item</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Read;

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F7',
  },
  item: {
    overflow: 'hidden',
    padding: 0,
    width: 350,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 1,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
    width: 200,
    height: 30,
  },
  btnText: {
    fontFamily: fontDefinition(),
    fontSize: 18,
    color: '#fff',
  },
  titleText: {
    fontFamily: fontDefinition(),
    fontSize: 18,
    color: '#000',
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    fontFamily: fontDefinition(),
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
});
