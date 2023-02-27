import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreatePostPage from '../components/CreatePostPage';
import ReadPostPage from '../components/ReadPostPage';

const TabMenu = createBottomTabNavigator();

function TabNavigation() {
  return (
    <TabMenu.Navigator initialRouteName="Read">
      <TabMenu.Screen
        name="Create"
        component={CreatePostPage}
        options={{
          tabBarLabel: 'Create',
        }}
      />
      <TabMenu.Screen
        name="Read"
        component={ReadPostPage}
        options={{
          tabBarLabel: 'Read',
        }}
      />
    </TabMenu.Navigator>
  );
}

export default TabNavigation;
