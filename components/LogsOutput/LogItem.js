import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";
import { msToTime } from "../../util/formatDuration";

function LogItem({ id, title, description, date, duration }) {
  const formattedDate = new Date(date).toLocaleString();
  const formattedDuration = msToTime(duration);

  const navigation = useNavigation();

  function LogPressHandler() {
    navigation.navigate("ManageLog", {
      logId: id,
    });
  }

  return (
    <Pressable
      onPress={LogPressHandler}
      style={({ pressed }) => (pressed ? styles.pressed : null)}
    >
      <View style={styles.logItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{title}</Text>
          <Text style={styles.textBase}>{formattedDate}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{formattedDuration}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default LogItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  logItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.green200,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.purple800,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: "white",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.accent500,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: "white",
    fontWeight: "bold",
  },
});
