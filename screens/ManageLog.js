import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { useState, useContext, useLayoutEffect } from "react";

import { LogsContext } from "../store/logs-context";
import LogForm from "../components/ManageLog/LogForm";
import { deleteLog, updateLog, storeLog } from "../util/http";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import IconButton from "../components/UI/IconButton";
import { Colors } from "../constants/colors";
import { getUserId } from "../util/auth";
import { AuthContext } from "../store/auth-context";

function ManageLogScreen({ route, navigation }) {
  const [error, setError] = useState();
  const [isUpdating, setIsUpdating] = useState(false);

  const logsCtx = useContext(LogsContext);
  const authCtx = useContext(AuthContext);

  const duration = route.params.timerDuration;

  const editedLogId = route.params?.logId;
  const isEditing = !!editedLogId;

  const selectedLog = logsCtx.logs.find((log) => log.id === editedLogId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Log" : "Add New Log",
    });
  }, [navigation, isEditing]);

  async function deleteLogHandler() {
    setIsUpdating(true);
    try {
      await deleteLog(editedLogId);
      logsCtx.deleteLog(editedLogId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete the log!");
    }
    setIsUpdating(false);
  }

  // logObject should be added to database here!
  async function confirmHandler(logData) {
    setIsUpdating(true);
    const token = authCtx.token;
    const userId = await getUserId(token);
    try {
      if (isEditing) {
        await updateLog(editedLogId, {
          ...logData,
          date: selectedLog.date,
        });
        logsCtx.updateLog(editedLogId, {
          ...logData,
          id: editedLogId,
          date: selectedLog.date,
        });
      } else {
        const id = await storeLog({
          ...logData,
          date: Date.now(),
          userId: userId,
        });
        logsCtx.addLog({
          ...logData,
          id: id,
          date: Date.now(),
          userId: userId,
        });
      }
      navigation.navigate("AllLogs");
    } catch (error) {
      setError("Could not save data - please try again later");
      setIsUpdating(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  if (error && !isUpdating) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isUpdating) {
    return <LoadingOverlay />;
  }

  return (
    <ScrollView>
      <LogForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={isEditing ? selectedLog : { duration: duration }}
      />
      {isEditing ? (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={Colors.accent500}
            size={36}
            onPress={deleteLogHandler}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}

export default ManageLogScreen;

const styles = StyleSheet.create({
  titleInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  descriptionInput: {
    height: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
});
