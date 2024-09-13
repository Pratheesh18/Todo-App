import { Card,CardContent,Typography,IconButton,CardActions,Button } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";


const TodoCard = ({todo,onDelete,onEdit}) => {
    return(
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {todo.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {todo.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={onEdit} startIcon={<Edit />} color="primary"> Edit </Button>
                <IconButton onClick={() => onDelete(todo.id)} color="secondary">
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>
    )
};

export default TodoCard;