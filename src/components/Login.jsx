import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useNavigate , Link } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const { email, password } = data;
    const storedUser = localStorage.getItem(`user_${email}`);

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.password === password) {
        login(userData);
        toast.success("Login Successful", { position: "bottom-right" });
        navigate("/todo");
      } else {
        toast.error("Invalid Password", { position: "bottom-right" });
      }
    } else {
      toast.error("User not found !", { position: "bottom-right" });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
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
              type={showPassword ? "text" : "password"}
              {...register("password")}
              helperText={errors.password?.message}
              variant="outlined"
              InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Stack>
        </Box>
        <Typography align="center" mt={2}>
          Don't Have an account ?
          <Link to="/" style={{color:'blue',textDecoration:'none'}} > Register </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
