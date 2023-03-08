import { FlatList } from "react-native";

import LogItem from "./LogItem";

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
