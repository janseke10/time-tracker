import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";

import { fetchLogsById } from "../util/http";
import { LogsContext } from "../store/logs-context";
import LogsOutput from "../components/LogsOutput/LogsOutput";
import { AuthContext } from "../store/auth-context";
import { getUserId } from "../util/auth";
import AppLoading from "expo-app-loading";
import IconButton from "../components/UI/IconButton";
import { exportLogs } from "../util/http";

function AllLogsScreen({ navigation, route }) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  async function handleExport() {
    await exportLogs();
  }
  // navigation.setOptions({
  //   headerRight: ({ tintColor }) => (
  //     <IconButton
  //       icon="save-outline"
  //       size={24}
  //       color={tintColor}
  //       onPress={handleExport}
  //     />
  //   ),
  // });

  const logsCtx = useContext(LogsContext);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const token = authCtx.token;
    async function getLogs() {
      setIsFetching(true);
      try {
        const id = await getUserId(token);
        const logs = await fetchLogsById(id);

        console.log("logs: ", logs);
        logsCtx.setLogs(logs);
      } catch (error) {
        setError("Could not fetch logs!");
      }
      setIsFetching(false);
    }

    getLogs();
  }, []);

  if (isFetching) {
    return <AppLoading />;
  }

  return (
    <View>
      <LogsOutput
        logs={logsCtx.logs}
        fallbackText="No registered logs found!"
      />
    </View>
  );
}

export default AllLogsScreen;
