import React, { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

function saveTextAsFile(data = [], filename) {
  const blob = new Blob([...data], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

//---------------------------Imperial to Metric-------------------------------------
function ImperialScreen() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const convertWeight = (value) => {
    return (value / 2.20462).toFixed(2); // Convert from lbs to kg
  };

  const convertHeight = (value) => {
    const [feet, inches] = value.split("'");
    const totalInches = Number(feet * 12) + Number(inches);
    const meters = (totalInches * 0.0254).toFixed(2); // Convert from ft & in to m
    return meters;
  };

  return (
    <View
      style={{
        margin: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Imperial to Metric</h2>
      <Text>
        <h3>Enter Weight in lbs</h3>
      </Text>
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} />
      <Text>{convertWeight(weight)} kilograms</Text>
      <br></br>
      <Text>
        <h3>Enter Height in ft ' in</h3>
      </Text>
      <TextInput style={styles.input} value={height} onChangeText={setHeight} />
      <Text>{convertHeight(height)} meters</Text>
      <br></br>
      <Button
        title="Save Data"
        onPress={() => {
          const convertedHeight = convertHeight(height);
          const convertedWeight = convertWeight(weight);
          saveTextAsFile(
            ["weight:", convertedWeight, "\nheight:", convertedHeight],
            "data"
          );
        }}
        style={styles.button}
      ></Button>
    </View>
  );
}

//---------------------------Metric to Imperial-------------------------------------
function MetricScreen() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const convertWeight = (value) => {
    return (value * 2.20462).toFixed(2); // Convert from kg to lbs
  };
  const convertHeight = (value) => {
    return (value / 0.0254).toFixed(2); //from ft & in to meters
  };
  return (
    <View
      style={{
        margin: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Metric to Imperial</h2>
      <Text>
        <h3>Enter Weight in kgs</h3>
      </Text>
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} />
      <Text>{convertWeight(weight)} lbs</Text>
      <br></br>
      <Text>
        <h3>Enter Height in meters</h3>
      </Text>
      <TextInput style={styles.input} value={height} onChangeText={setHeight} />
      <Text>{convertHeight(height)} inches</Text>
      <br></br>
      <Button
        title="Save Data"
        onPress={() => {
          const convertedHeight = convertHeight(height);
          const convertedWeight = convertWeight(weight);
          saveTextAsFile(
            ["weight:", convertedWeight, "\nheight:", convertedHeight],
            "data"
          );
        }}
        style={styles.button}
      ></Button>
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Imperial");

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator
          initialRouteName="Imperial"
          tabBarOptions={{
            activeTintColor: "#000",
            inactiveTintColor: "#ccc",
            labelStyle: styles.tabLabel,
            indicatorStyle: styles.tabIndicator,
            style: styles.tabBar,
          }}
          screenOptions={({ route }) => ({
            tabBarLabel: route.name,
          })}
          onTabPress={({ route }) => setActiveTab(route.name)}
        >
          <Tab.Screen name="Imperial" component={ImperialScreen} />
          <Tab.Screen name="Metric" component={MetricScreen} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#8af",
    padding: 8,
    margin: 10,
    width: 250,
  },
  button: {
    backgroundColor: "8af",
    width: 150,
  },
  container: {
    flex: 1,
    backgroundColor: "#3ef",
  },
  tabBar: {
    backgroundColor: "#fff",
    elevation: 0,
  },
  tabLabel: {
    fontWeight: "bold",
  },
  tabIndicator: {
    backgroundColor: "#8af",
  },
});
