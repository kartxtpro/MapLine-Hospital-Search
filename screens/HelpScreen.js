import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Question } from "./Questions";

export default class HelpScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Question
            question="Q1: What is the purpose of this app?"
            reply="Ans: This app can mainly be used to view the nearby Health Centres around you in an emergency."
          />
          <Question
            question="Q2: The app becomes unresponsive initially. Why is that so?"
            reply="Ans: As the app is loading, please wait for 10 seconds(approx) for the app to load."
          />
          <Question
            question="Q3: I already have Google Maps installed in my phone. Why should I use this app?"
            reply="Ans: Our app solely focusses on Health Centres and so is more helpful when required."
          />
          <Question
            question="Q4: What does the Green and Red marker signify?"
            reply="Ans: Green Marker denotes your location & Red Marker denotes the Health Centres around you. "
          />
          <Question
            question="Q5: The app does not work if I disable GPS services. Why is that so?"
            reply="Ans: It is necessary because the map will be rendered based on your location."
          />
          <Question
            question="Q6: Why can't I see every Health Centre near me?"
            reply="Ans: Our data does not cover all the Health Centres in India. We will change our data provider if we can find a better one based on our needs."
          />
          <Question
            question="Q7: How accurate is the data provided by the app?"
            reply="Ans: The accuracy of our data depends upon data provided by data.gov.in"
          />
          <Question
            question="Q8: Which cities are covered by this app?"
            reply="Ans: Most of the major cities and many towns with sufficient number of Health Centres are covered."
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#FFD333",
    padding: 8,
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
    color: "black",
    backgroundColor: "white",
    borderRadius: 5,
    margin: 5,
  },
});
