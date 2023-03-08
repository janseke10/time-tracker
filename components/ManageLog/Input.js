import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function Input({ label, style, invalid, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      {/* <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text> */}
      <TextInput style={[inputStyles]} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.purple800,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "black",
    fontSize: 18,
    color: Colors.purple800,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "red",
  },
  invalidInput: {
    backgroundColor: "red",
  },
});
