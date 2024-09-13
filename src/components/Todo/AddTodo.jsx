import {useState,useEffect} from 'react';
import {TextField,Button,Paper,Box, IconButton, Typography} from '@mui/material';
import { toast } from 'react-toastify';
import Close from '@mui/icons-material/Close';


const AddTodo = ({onSave,editTodo , onClose}) => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');


    useEffect(() => {
        if(editTodo){
            setTitle(editTodo.title);
            setDescription(editTodo.description);
        }
    },[editTodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title && description){
            onSave({id:editTodo?.id || Date.now(),title,description});
            setTitle('');
            setDescription('');
        }
    };

    return (
        <Box component={Paper} p={3} style={{width:'400px',margin:'100px auto',position:'relative'}}>
            <IconButton onClick={onClose} style={{position:'absolute',top:8,right:8}}>
                <Close />
            </IconButton>
            <Typography variant='h5' align='center' gutterBottom>
                {editTodo ? 'Edit Todo' : 'Add Todo'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} variant='outlined' margin='normal' />
                <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} variant='outlined' margin='normal' />
                <Button type='submit' variant='contained' color='primary' fullWidth>
                    {editTodo ? 'Update Todo' : 'Add Todo'}
                </Button>
            </form>
        </Box>
    )
};

export default AddTodo;