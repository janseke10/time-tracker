import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";

import { fetchLogs } from "../util/http";
import { LogsContext } from "../store/logs-context";
import LogsOutput from "../components/LogsOutput/LogsOutput";

function AllLogsScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  //   const [fetchedLogs, setFetchedLogs] = useState([]);

  const logsCtx = useContext(LogsContext);

  //   const logs = logsCtx.logs;
  //   console.log("logs!: ", logs);
  useEffect(() => {
    async function getLogs() {
      setIsFetching(true);
      try {
        const logs = await fetchLogs();
        logsCtx.setLogs(logs);
      } catch (error) {
        setError("Could not fetch logs!");
      }
      setIsFetching(false);
    }

    getLogs();
  }, []);

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
