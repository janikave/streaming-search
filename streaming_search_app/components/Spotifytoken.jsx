import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "@env";
import { encode as btoa } from "base-64";

export default async function SpotifyToken() {

    const clientId = SPOTIFY_CLIENT_ID;
    const clientSecret = SPOTIFY_CLIENT_SECRET;

    // Fetching token from the Spotify app created to use API
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
    });

    const data = await result.json();
    return data.access_token;

}