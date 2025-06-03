"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Avatar,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Paper elevation={4} sx={{ padding: 4, width: "100%", borderRadius: 3 }}>
        <Box textAlign="center" mb={3}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main, mx: "auto", mb: 1 }}>
            <LockIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            ERP Invoice System Login
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your credentials to continue
          </Typography>
        </Box>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontWeight: "bold", fontSize: "1rem" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
