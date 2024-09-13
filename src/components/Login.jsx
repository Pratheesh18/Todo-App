import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { TextField , Button , Typography,Container,Box,Stack } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    email : yup.string().email('Invalid email').required('Email is required'),
    password : yup.string().min(6,'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const {register , handleSubmit , formState:{errors}} = useForm({resolver : yupResolver(schema)});


    const onSubmit = (data) => {
        const {email,password} = data;
        const storedUser = localStorage.getItem(`user_${email}`);

        if(storedUser){
            const userData = JSON.parse(storedUser);
            if(userData.password === password){
                login(email);
                navigate('/todo');
            }else{
                alert('Invalid password');
            }
        }else{
            alert('User not found');
        }
    };

    return(
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        <TextField fullWidth label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} variant="outlined" />
                        <TextField fullWidth label="Password" type="password" {...register('password')} helperText={errors.password?.message} variant="outlined" />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    )
};


export default Login;