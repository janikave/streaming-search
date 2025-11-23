import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FetchSpotify from "./Fetchspotify";
import FetchDeezer from "./Fetchdeezer";

export default function SearchResults({ route }) {

    const { query, spotifyCheck, deezerCheck, spotifyToken } = route.params;
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            >
            {spotifyCheck && (
                <Tab.Screen name="Spotify" component={FetchSpotify} initialParams={{ query: query, spotifyToken: spotifyToken}} />
            )}
            {deezerCheck && (
                <Tab.Screen name="Deezer" component={FetchDeezer} initialParams={{ query: query }} />
            )}
        </Tab.Navigator>
    );
}
