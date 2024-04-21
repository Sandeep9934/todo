// TodoApp.js
import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import { Container, Typography } from "@material-ui/core";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editTask, setEditTask] = useState(null);

  const addTask = (taskText) => {
    setTasks([...tasks, { id: tasks.length + 1, text: taskText }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTaskText = (taskId, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleCloseModal = () => {
    setEditTask(null);
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Todo List
      </Typography>
      <TaskForm addTask={addTask} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        editTask={handleEditTask}
      />
      {editTask && (
        <Modal
          task={editTask}
          onSave={(newText) => editTaskText(editTask.id, newText)}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
}

export default TodoApp;
