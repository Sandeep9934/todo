// App.jsx
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  // Your Firebase config here
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2)
  }
}));

const App = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchTasks(user.uid);
      } else {
        setUser(null);
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTasks = async (userId) => {
    const snapshot = await db
      .collection("tasks")
      .where("userId", "==", userId)
      .get();
    const fetchedTasks = [];
    snapshot.forEach((doc) => {
      const task = doc.data();
      task.id = doc.id;
      fetchedTasks.push(task);
    });
    setTasks(fetchedTasks);
  };

  const addTask = async () => {
    if (!user || !newTask.trim()) return;
    const newTaskObj = { id: "", title: newTask };
    const docRef = await db
      .collection("tasks")
      .add({ ...newTaskObj, userId: user.uid });
    newTaskObj.id = docRef.id;
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const deleteTask = async (taskId) => {
    if (!user) return;
    await db.collection("tasks").doc(taskId).delete();
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className={classes.root}>
      {user ? (
        <>
          <Typography variant="h4">Todo List</Typography>
          <TextField
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            label="New Task"
            variant="outlined"
            margin="normal"
          />
          <Button onClick={addTask} variant="contained" color="primary">
            Add Task
          </Button>
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id}>
                <ListItemText primary={task.title} />
                <Button onClick={() => deleteTask(task.id)}>Delete</Button>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Button
          onClick={() =>
            firebase
              .auth()
              .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          }
        >
          Sign in with Google
        </Button>
      )}
    </div>
  );
};

export default App;
