import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/users?email=${email}&password=${password}`);

      if (res.data.length > 0) {
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong, try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <Card className="w-96 bg-black shadow-lg border border-gray-700">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center bg-gray-800 border-b border-gray-700"
        >
          <Typography variant="h3" color="white" className="font-bold">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {error && <Typography color="red" className="text-red-500 text-center">{error}</Typography>}
          <Input
            label="Email"
            size="lg"
            className="text-white bg-gray-800 border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            size="lg"
            type="password"
            className="text-white bg-gray-800 border-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" className="text-white" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth className="bg-white text-black font-bold" onClick={handleLogin}>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center text-gray-300">
            Don&apos;t have an account?
            <Typography
              as={Link}
              to="/signup"
              variant="small"
              color="white"
              className="ml-1 font-bold text-blue-400"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
