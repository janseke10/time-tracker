import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { msToTime } from "../../util/formatDuration";
import Input from "./Input";
import Button from "../UI/Button";
import { Colors } from "../../constants/colors";

function LogForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues && defaultValues.title ? defaultValues.title : "",
    },
    description: {
      value:
        defaultValues && defaultValues.description
          ? defaultValues.description
          : "",
    },
    duration: {
      value: defaultValues ? msToTime(defaultValues.duration) : "ERROR",
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const logData = {
      title: inputs.title.value,
      description: inputs.description.value,
      duration: defaultValues.duration,
    };

    onSubmit(logData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{inputs.duration.value}</Text>
      <Input
        label="Title"
        // style={styles.rowInput}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "title"),
          value: inputs.title.value,
          placeholder: "Title",
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
          placeholder: "Description",
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default LogForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 24,
    textAlign: "center",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: Colors.accent500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
