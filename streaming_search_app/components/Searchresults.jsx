import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";

import FetchSpotify from "./Fetchspotify";
import FetchDeezer from "./Fetchdeezer";
import { Easing } from "react-native";

export default function SearchResults({ route }) {

    const { query, spotifyCheck, deezerCheck, spotifyToken } = route.params;
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{ 
                headerShown: false,
                animation: "shift" }}
            >
            {spotifyCheck && (
                <Tab.Screen
                    name="Spotify" 
                    component={FetchSpotify} 
                    initialParams={{ query: query, spotifyToken: spotifyToken}}
                    options={{ tabBarActiveTintColor: "#1DB954", transitionSpec: {animation: 'timing', config: {duration: 300, easing: Easing.inOut(Easing.ease),},}, }}
                    />
            )}
            {deezerCheck && (
                <Tab.Screen 
                    name="Deezer" 
                    component={FetchDeezer} 
                    initialParams={{ query: query }}
                    options={{ tabBarActiveTintColor: "#a238ff", transitionSpec: {animation: 'timing', config: {duration: 300, easing: Easing.inOut(Easing.ease),},}, }}
                    />
            )}
        </Tab.Navigator>
    );
}
