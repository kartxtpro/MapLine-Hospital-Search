import "react-native-gesture-handler";
import * as React from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import HelpScreen from "./screens/HelpScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MapLine">
        <Stack.Screen
          name="Health Centres Near You"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: "#CDE555",
            },
            headerTintColor: "#000000",
            headerRight: () => (
              <Button
                title="Help - FAQ"
                onPress={() =>
                  navigation.navigate("Frequently Asked Questions")
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="Frequently Asked Questions"
          component={HelpScreen}
          options={{
            headerStyle: {
              backgroundColor: "#CDE555",
            },
            headerTintColor: "#000000",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
