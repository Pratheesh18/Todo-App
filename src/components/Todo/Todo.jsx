import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Container,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import AddTodo from "./AddTodo";
import TodoCard from "./TodoCard";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Todo = () => {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const savedTodos =
        JSON.parse(localStorage.getItem(`todos_${currentUser}`)) || [];
      setTodos(savedTodos);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && todos.length > 0) {
      localStorage.setItem(`todos_${currentUser}`, JSON.stringify(todos));
    }
  }, [todos, currentUser]);

  const saveTodo = (todo) => {
    try {
      if (editTodo) {
        setTodos(todos.map((item) => (item.id === editTodo.id ? todo : item)));
        toast.success('Todo updated successfully !',{position:'bottom-right'})
      } else {
        setTodos([...todos, { id: Date.now(), ...todo }]);
        toast.success('Todo added successfully !',{position:'bottom-right'})
      }
      setModalOpen(false);
      setEditTodo(null);
    } catch (error) {
      console.error('Error saving todo:', error);
      toast.error('Error saving todo',{position:'bottom-right'})
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success('Todo deleted successfully!',{position:'bottom-right'})
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setModalOpen(true);
  };

  const toggleCompletion = (id) => {
    setTodos(
        todos.map((todo) => todo.id === id ? {...todo,completed:!todo.completed} : todo)
    )
  }

  if (!currentUser) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box mt={5} display="flex" justifyContent="space-between"  textAlign="center" flexDirection={{xs:'column',sm:'row'}}>
        <Typography variant="h4" gutterBottom>
          {`${currentUser.name}'s Todo List`}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
          sx={{ mt: { xs: 2, sm: 0 } }}
        >
          Add Todo
        </Button>
      </Box>
      {todos.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No Todos
        </Typography>
      ) : (
        <Stack spacing={2} mt={4}>
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onEdit={() => handleEditTodo(todo)}
              onCompletion={toggleCompletion}
            />
          ))}
        </Stack>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <AddTodo onSave={saveTodo} editTodo={editTodo} />
        </Box>
      </Modal>
    </Container>
  );
};

export default Todo;
