import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";

import { Colors } from "./constants/colors";
import ChooseTimeScreen from "./screens/ChooseTime";
import ManageLogScreen from "./screens/ManageLog";
import StopwatchScreen from "./screens/Stopwatch";
import TimerScreen from "./screens/Timer";
import AllLogsScreen from "./screens/AllLogs";
import LogsContextProvider from "./store/logs-context";
import IconButton from "./components/UI/IconButton";
import { AuthContext } from "./store/auth-context";
import AuthContextProvider from "./store/auth-context";
import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";

const Stack = createNativeStackNavigator();
// SplashScreen.preventAutoHideAsync();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.accent500 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <LogsContextProvider>
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
            headerLeft: ({ tintColor }) => (
              <IconButton
                icon="exit"
                size={24}
                color={tintColor}
                onPress={authCtx.logout}
              />
            ),
          })}
        />
        <Stack.Screen name="ChooseTime" component={ChooseTimeScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} options={{}} />
        <Stack.Screen name="Stopwatch" component={StopwatchScreen} />
        <Stack.Screen name="ManageLog" component={ManageLogScreen} />
      </Stack.Navigator>
    </LogsContextProvider>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated ? <AuthStack /> : null}
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : null}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
