import { Text, View, StyleSheet, Pressable } from "react-native";

import { useState } from "react";
import { Timer } from "react-native-stopwatch-timer";
import { Colors } from "../constants/colors";

function TimerScreen({ navigation, route }) {
  console.log("params: ", route.params);
  const timerDuration = route.params.timerDuration;
  const [isTimerStart, setIsTimerStart] = useState(false);
  //   const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);

  function endTimerHandler() {
    navigation.navigate("ManageLog", { timerDuration: timerDuration });
  }
  return (
    <View style={styles.sectionStyle}>
      <Timer
        totalDuration={timerDuration}
        //Time Duration
        start={isTimerStart}
        //To start
        reset={resetTimer}
        //To reset
        options={options}
        //options for the styling
        handleFinish={endTimerHandler}
        //can call a function On finish of the time
        // getTime={(time) => {
        //   console.log(time);
        // }}
      />
      <Pressable
        onPress={() => {
          setIsTimerStart(!isTimerStart);
          setResetTimer(false);
        }}
      >
        <Text style={styles.buttonText}>
          {!isTimerStart ? "START" : "STOP"}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setIsTimerStart(false);
          setResetTimer(true);
        }}
      >
        <Text style={styles.buttonText}>RESET</Text>
      </Pressable>
    </View>
  );
}

export default TimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
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
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  numbersContainer: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  numberInput: {
    height: 25,
    width: 25,
    fontSize: 32,
    borderBottomColor: "#fffff",
    borderBottomWidth: 2,
    color: "#fffff",
    marginVertical: 0,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 8,
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
