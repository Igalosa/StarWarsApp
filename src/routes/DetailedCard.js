import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import {
  Card,
  Colors,
  Text,
  View,
} from "react-native-ui-lib";

export default function DetailedCard({ navigation, route }) {
  const { detailedData } = route.params;
  const [planet, setPlanet] = useState({});
  const [filmsList, setFilmsList] = useState([]);
  const [vehicles, setVehiclesList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //Завантажуємо дані з серверу
  const fetchData = async () => {
    try {
      const response = await axios.get(`${detailedData.homeworld}`);
      setPlanet(response.data);

      const fetchNames = async (urls, key) => {
        const responses = await Promise.all(urls.map((url) => axios.get(url)));
        return responses.map((response) => response.data[key]);
      };

      const filmsList = await fetchNames(detailedData.films, "title");
      const vehiclesList = await fetchNames(detailedData.vehicles, "name");

      setFilmsList(filmsList);
      setVehiclesList(vehiclesList);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 
  const detailsObj = {
    Name: "name",
    Birthday: "birth_year",
    Gender: "gender",
    "Eye color": "eye_color",
    "Skin color": "skin_color",
    Height: "height",
  };

  return (
    <View center marginT-20>
      {isLoaded ? (
        <>
          {Object.entries(detailsObj).map(([label, key]) => {
            return (
              <Card
                center
                borderRadius={12}
                width={"90%"}
                marginB-20
                padding-5
                backgroundColor={Colors.dark80}
                key={key}
              >
                <View row spread padding-5>
                  <View flex style={styles.ContainerStyle}>
                    <Text style={styles.itemDetailsText} flex>
                      {label}:
                    </Text>
                  </View>
                  <Text center flex style={styles.itemDetailsText}>
                    {detailedData[key]}
                  </Text>
                </View>
              </Card>
            );
          })}
          <Card
            center
            borderRadius={12}
            width={"90%"}
            marginB-20
            padding-5
            backgroundColor={Colors.dark80}
          >
            <View row spread padding-10>
              <View flex style={styles.ContainerStyle}>
                <Text style={styles.itemDetailsText}>Planet:</Text>
              </View>
              <Text center flex style={styles.itemDetailsText}>
                {planet.name}
              </Text>
            </View>
          </Card>
          <View flex-0 center width="100%">
            <Card
              center
              borderRadius={12}
              width={"90%"}
              marginB-20
              padding-5
              backgroundColor={Colors.dark80}
            >
              <Text center style={styles.itemDetailsText}>
                Films:
              </Text>
            </Card>
            <Card
              center
              borderRadius={12}
              width={"90%"}
              marginB-20
              padding-5
              backgroundColor={Colors.dark80}
            >
              {filmsList.map((title) => {
                return <Text key={title}>{title}</Text>;
              })}
            </Card>
            <Card
              center
              borderRadius={12}
              width={"90%"}
              marginB-20
              padding-5
              backgroundColor={Colors.dark80}
            >
              <Text center style={styles.itemDetailsText}>
                Vehicles:
              </Text>
            </Card>
            <Card
              center
              borderRadius={12}
              width={"90%"}
              marginB-20
              padding-5
              backgroundColor={Colors.dark80}
            >
              {vehicles.length === 0 ? (
                <Text>n/a</Text>
              ) : (
                vehicles.map((title, index) => <Text key={index}>{title}</Text>)
              )}
            </Card>
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  ContainerStyle: { borderRightWidth: 1 },

  itemDetailsText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
