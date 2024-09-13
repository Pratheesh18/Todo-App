import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { useNavigate , Link } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const { name, email, password } = data;
    localStorage.setItem(
      `user_${email}`,
      JSON.stringify({ name, email, password })
    );
    toast.success('User Registered Successfully ',{position:'bottom-right'})
    navigate("/login");
};

    return (
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </Stack>
          </Box>
          <Typography align="center" mt={2}>
            Already Have an account ?
            <Link to="/login" style={{color:'blue',textDecoration:'none'}}> Login  </Link>
          </Typography>
        </Box>
      </Container>
    );
  };


export default Register;
