import {useState,useEffect} from 'react';
import {TextField,Button,Paper,Box} from '@mui/material';


const AddTodo = ({onSave,editTodo}) => {
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
        <Box component={Paper} p={3} style={{width:'400px',margin:'100px auto'}}>
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