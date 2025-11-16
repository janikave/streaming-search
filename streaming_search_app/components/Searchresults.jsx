import { useState } from "react";
import { Text } from "react-native";

export default function SearchResults() {

    const [results, setResults] = useState([]);

    const fetchResults = () => {
        fetch(``)
        .then (response => {
            if (!response.ok) {
                throw new Error("Error in fetching data")
            }
            return response.json();
        })
        .then (data => {
            setResults(data.artist);
        })
        .catch(err => console.error("Could not fetch the data:"), err);
    }

    
}