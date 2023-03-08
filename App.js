import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "./constants/colors";
import ChooseTimeScreen from "./screens/ChooseTime";
import ManageLogScreen from "./screens/ManageLog";
import StopwatchScreen from "./screens/Stopwatch";
import TimerScreen from "./screens/Timer";
import AllLogsScreen from "./screens/AllLogs";
import LogsContextProvider from "./store/logs-context";
import IconButton from "./components/UI/IconButton";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <LogsContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Colors.accent500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="AllLogs"
              component={AllLogsScreen}
              options={({ navigation }) => ({
                title: "All Logged Activities",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon="add"
                    size={24}
                    color={tintColor}
                    onPress={() => {
                      navigation.navigate("ChooseTime");
                    }}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="ChooseTime"
              component={ChooseTimeScreen}
              // options={{ headerShown: false }}
            />
            <Stack.Screen name="Timer" component={TimerScreen} options={{}} />
            <Stack.Screen name="Stopwatch" component={StopwatchScreen} />
            <Stack.Screen name="ManageLog" component={ManageLogScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </LogsContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
