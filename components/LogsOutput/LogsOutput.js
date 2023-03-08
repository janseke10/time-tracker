import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

import LogsList from "./LogsList";

function LogsOutput({ logs, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  console.log("logsss", logs);
  console.log(logs.length);
  if (logs.length > 0) {
    content = <LogsList logs={logs} />;
  }

  console.log("content", content);
  return <View>{content}</View>;
}

export default LogsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 0,
    backgroundColor: Colors.green200,
  },
  infoText: {
    color: Colors.accent500,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
