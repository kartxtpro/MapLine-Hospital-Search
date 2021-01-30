import "react-native-gesture-handler";
import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView from "react-native-maps";

export default class HomeScreen extends React.Component {
  state = {
    location: null,
    res: [],
    len: null,
  };

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert("Unable to Detect Location");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    let where = (await Location.reverseGeocodeAsync(location.coords))[0];
    this.setState({ location, where });
  };

  getFromApi = async () => {
    try {
      let response = await fetch(
        "https://api.data.gov.in/resource/7d208ae4-5d65-47ec-8cb8-2a7a7ac89f8c?api-key=579b464db66ec23bdd000001bc69bf3dcbac46645466afc088fd8766&format=json&offset=0&limit=1050"
      );
      let responseJson = await response.json();
      let resp = [];
      for (let i = 0; i < responseJson.records.length; i++) {
        let s = [],
          w = responseJson.records[i].website.replace(/.*?:\/\//g, "");
        s[0] = parseFloat(responseJson.records[i]._googlemapcorridinate_lati);
        s[1] = parseFloat(responseJson.records[i]._googlemapcorridinate_longi);
        if (s[1] >= 0 && s[0] >= 0)
          resp.push({
            coords: s,
            name: responseJson.records[i].hospitalname,
            phone: responseJson.records[i].telephone.split(","),
            desc: responseJson.records[i].systems_of_medicine,
            pin: responseJson.records[i]._pincode,
            dist: responseJson.records[i].district,
            state: responseJson.records[i].state,
            web: w,
            email: responseJson.records[i].hospitalprimaryemailid,
          });
      }
      this.setState({ res: resp });
    } catch (error) {
      console.error(error);
    }
  };

  renderweb = () => {};

  componentDidMount() {
    this.getLocation();
    this.getFromApi();
  }

  render() {
    if (!this.state.location) {
      return <View />;
    } else if (this.state.location && this.state.res)
      return (
        <MapView
          style={styles.home}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922 / 0.2,
            longitudeDelta: 0.0421 / 0.2,
          }}
        >
          <MapView.Marker
            coordinate={this.state.location.coords}
            title="You Are Here"
            description={this.state.where.name}
            pinColor="#FFF333"
          />
          {this.state.res &&
            this.state.res.map((r, i) => (
              <MapView.Marker
                key={i}
                coordinate={{
                  latitude: r.coords[0],
                  longitude: r.coords[1],
                }}
              >
                <MapView.Callout>
                  <View style={styles.mapview}>
                    <Text style={{ fontWeight: "bold" }}>{r.name} </Text>
                    <Text>
                      {r.dist}, {r.state} - {r.pin}
                    </Text>
                    <Text> System of Medicine: {r.desc}</Text>
                    <Text>
                      Phone: {r.phone[0]} {r.phone[1]}{" "}
                    </Text>
                    <Text>Web: {r.web} </Text>
                    <Text>E Mail: {r.email} </Text>
                  </View>
                </MapView.Callout>
              </MapView.Marker>
            ))}
        </MapView>
      );
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
  mapview: {
    alignItems: "center",
  },
});
