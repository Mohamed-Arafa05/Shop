import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }
    setError("");
    console.log("Creating account with", username, email, password);
    navigate("/login");
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
            Create Account
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {error && (
            <Typography color="red" className="text-red-500 text-center">
              {error}
            </Typography>
          )}
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            size="lg"
            className="text-white bg-gray-800 border-gray-700"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            size="lg"
            className="text-white bg-gray-800 border-gray-700"
          />
          <Input
            label="Password"
            size="lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-white bg-gray-800 border-gray-700"
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            type="submit"
            variant="gradient"
            fullWidth
            className="bg-white text-black font-bold"
            onClick={handleSignin}
          >
            Create
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center text-gray-300">
            Have an account?
            <Typography
              as={Link}
              to="/login"
              variant="small"
              color="white"
              className="ml-1 font-bold text-blue-400"
            >
              Login
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;