import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Button,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";

const TodoCard = ({ todo, onDelete, onEdit, onCompletion }) => {
  return (
    <Card
      sx={{
        bgcolor: todo.completed ? "	#0096FF" : "white",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {todo.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {todo.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => onCompletion(todo.id)}
          color={todo.completed ? "error" : "success"}
        >
          {todo.completed ? <Cancel /> : <CheckCircle />}
        </IconButton>
        <Typography variant="body2" >
            {todo.completed ? "Remove marked as completed" : 'Mark as completed'}
        </Typography>
        {!todo.completed && (
          <Button onClick={onEdit} startIcon={<Edit />} color="primary">
            {" "}
            Edit{" "}
          </Button>
        )}
        <IconButton onClick={() => onDelete(todo.id)} color="secondary">
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TodoCard;
