// Example of React Native Timer and Stopwatch
// https://aboutreact.com/react-native-timer-stopwatch/

// import React in our code
import React, { useState, useRef } from "react";

// import all the components we are going to use
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";

function ChooseTimeScreen({ navigation, route }) {
  const [firstHourValue, setFirstHourValue] = useState("0");
  const [secondHourValue, setSecondHourValue] = useState("0");
  const [firstMinuteValue, setFirstMinuteValue] = useState("0");
  const [secondMinuteValue, setSecondMinuteValue] = useState("0");
  const [firstSecondValue, setFirstSecondValue] = useState("0");
  const [secondSecondValue, setSecondSecondValue] = useState("0");

  const firstHourRef = useRef();
  const secondHourRef = useRef();
  const firstMinuteRef = useRef();
  const secondMinuteRef = useRef();
  const firstSecondRef = useRef();
  const secondSecondRef = useRef();

  const inputs = [
    {
      ref: firstHourRef,
      value: firstHourValue,
      set: setFirstHourValue,
      next: secondHourRef,
    },
    {
      ref: secondHourRef,
      value: secondHourValue,
      set: setSecondHourValue,
      next: firstMinuteRef,
    },
    {
      ref: firstMinuteRef,
      value: firstMinuteValue,
      set: setFirstMinuteValue,
      next: secondMinuteRef,
    },
    {
      ref: secondMinuteRef,
      value: secondMinuteValue,
      set: setSecondMinuteValue,
      next: firstSecondRef,
    },
    {
      ref: firstSecondRef,
      value: firstSecondValue,
      set: setFirstSecondValue,
      next: secondSecondRef,
    },
    {
      ref: secondSecondRef,
      value: secondSecondValue,
      set: setSecondSecondValue,
      next: null,
    },
  ];

  const handleInputChange = (index, number) => {
    inputs[index].set(number);
    if (index === 2 || index === 4) {
      if (number > 5) {
        inputs[index].set("5");
      }
    }
    if (number === "" && index > 0) {
      inputs[index - 1].ref.current.focus();
    } else if (number === "" && index === 0) {
      inputs[index].ref.current.focus();
    } else if (inputs[index].next) {
      inputs[index].next.current.focus();
    }
  };

  function startTimerHandler() {
    let hh = firstHourValue + secondHourValue;
    let mm = firstMinuteValue + secondMinuteValue;
    let ss = firstSecondValue + secondSecondValue;
    const totalMilliseconds = hh * 3600000 + mm * 60000 + ss * 1000;

    console.log(totalMilliseconds);

    navigation.navigate("Timer", { timerDuration: totalMilliseconds });
  }

  function startStopwatchHandler() {
    console.log("start stopwatch");
    navigation.navigate("Stopwatch");
  }

  return (
    <ScrollView>
      <View style={styles.sectionStyle}>
        <Text style={styles.title}>Set a timer or start the stopwatch!</Text>
        <OutlinedButton
          onPress={startStopwatchHandler}
          icon="stopwatch-outline"
        >
          Start Stopwatch
        </OutlinedButton>
        <View style={styles.numbersContainer}>
          {inputs.map((input, index) => (
            <React.Fragment key={index}>
              <View style={styles.inputContainer}>
                {index === 0 ? <Text>h</Text> : null}
                {index === 1 ? <Text>h</Text> : null}
                {index === 2 ? <Text>m</Text> : null}
                {index === 3 ? <Text>m</Text> : null}
                {index === 4 ? <Text>s</Text> : null}
                {index === 5 ? <Text>s</Text> : null}

                <TextInput
                  key={index}
                  style={styles.numberInput}
                  maxLength={1}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus={index === 0}
                  selectTextOnFocus
                  onChangeText={(number) => handleInputChange(index, number)}
                  value={input.value}
                  ref={input.ref}
                />
              </View>
              {index === 1 || index === 3 ? <Text>:</Text> : null}
            </React.Fragment>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <OutlinedButton onPress={startTimerHandler} icon="timer-outline">
            Start Timer
          </OutlinedButton>
          {/* <Button onPress={startTimerHandler} title="Start Timer" /> */}
        </View>
      </View>
    </ScrollView>
  );
}

export default ChooseTimeScreen;

const styles = StyleSheet.create({
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
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  numbersContainer: {
    // width: "80%",
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  numberInput: {
    height: 25,
    width: 25,
    fontSize: 16,
    borderBottomColor: "#fffff",
    borderBottomWidth: 2,
    color: "#fffff",
    marginVertical: 0,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 4,
  },
  buttonContainer: {
    marginVertical: 20,
  },
});
