import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from './components/Searchbar';
import SearchResults from "./components/Searchresults";
import FetchSpotify from "./components/Fetchspotify";
import FetchDeezer from "./components/Fetchdeezer";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchBar} />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
