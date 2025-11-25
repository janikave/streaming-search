import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from './components/Searchbar';
import SearchResults from "./components/Searchresults";
import FetchSpotify from "./components/Fetchspotify";
import FetchDeezer from "./components/Fetchdeezer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchHistory from "./components/Searchhistory";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function IndexTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Search" component={SearchBar} />
      <Tab.Screen name="History" component={SearchHistory} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer style={styles.container}> 
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen name="Home" component={IndexTabs} options={{ headerShown: false }} />

        <Stack.Screen name="Results" component={SearchResults} />
        <Stack.Screen name="Spotify Results" component={FetchSpotify} />
        <Stack.Screen name="Deezer Results" component={FetchDeezer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36454f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
