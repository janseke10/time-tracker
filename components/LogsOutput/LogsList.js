import { Button, FlatList, StyleSheet } from "react-native";
// import Swipeable from "react-native-gesture-handler/Swipeable";

import LogItem from "./LogItem";

// const closeRow = (index) => {
//   if (prevOpenedRow && prevOpenedRow !== row[index]) {
//   }
// };

function renderLogItem(itemData) {
  return <LogItem {...itemData.item} />;
}

function LogsList({ logs }) {
  console.log("logs3 ", logs);
  return (
    <FlatList
      data={logs}
      renderItem={renderLogItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default LogsList;

const styles = StyleSheet.create({
  deleteButton: {
    alignContent: "center",
    justifyContent: "center",
    width: 90,
  },
});
