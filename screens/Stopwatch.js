import { Text, View, StyleSheet, Pressable } from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";
import { useState } from "react";
import { Colors } from "../constants/colors";

function StopwatchScreen({ route, navigation }) {
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  return (
    <View style={styles.sectionStyle}>
      <Stopwatch
        laps
        start={isStopwatchStart}
        //To start
        reset={resetStopwatch}
        //To reset
        options={options}
        //options for the styling
        getMsecs={(time) => {
          if (!isStopwatchStart) {
            setCurrentTime(time);
          }
        }}
        getTime={(time) => {
          console.log(time);
        }}
      />
      <Pressable
        onPress={() => {
          setIsStopwatchStart(!isStopwatchStart);
          setResetStopwatch(false);
        }}
      >
        <Text style={styles.buttonText}>
          {!isStopwatchStart ? "START" : "STOP"}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setIsStopwatchStart(false);
          setResetStopwatch(true);
        }}
      >
        <Text style={styles.buttonText}>RESET</Text>
      </Pressable>
      {!isStopwatchStart && currentTime > 0 ? (
        <Pressable
          onPress={() => {
            console.log("current time: ", currentTime);
            navigation.navigate("ManageLog", { timerDuration: currentTime });
          }}
        >
          <Text style={styles.buttonText}>Do you want to log this time?</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export default StopwatchScreen;

const styles = StyleSheet.create({
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});

const options = {
  container: {
    backgroundColor: Colors.accent500,
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#FFF",
    marginLeft: 7,
  },
};
