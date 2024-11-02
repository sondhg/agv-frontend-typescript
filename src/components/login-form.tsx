import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppDispatch } from "@/redux/store";
import { doLogin } from "@/redux/userSlice";
import { postLogin } from "@/services/apiServices";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleLogin = async () => {
    // Validate email
    if (!validateEmail(email)) {
      toast.error("Invalid email");
      emailRef.current?.classList.add("border-red-500");
      return;
    }

    if (!password) {
      toast.error("Password cannot be empty");
      passwordRef.current?.classList.add("border-red-500");
      return;
    }

    setIsLoading(true);

    try {
      const response = await postLogin(email.trim(), password);
      if (response && response.jwt) {
        dispatch(doLogin(response));
        navigate("/");
        toast.success("Login successful");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    ref: React.RefObject<HTMLInputElement>,
  ) => {
    setState(event.target.value);
    ref.current?.classList.remove("border-red-500");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter registered email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(event) => handleInputChange(event, setEmail, emailRef)}
              onKeyDown={handleKeyDown}
              onFocus={() =>
                emailRef.current?.classList.remove("border-red-500")
              }
              ref={emailRef}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                handleInputChange(event, setPassword, passwordRef)
              }
              onKeyDown={handleKeyDown}
              onFocus={() =>
                passwordRef.current?.classList.remove("border-red-500")
              }
              ref={passwordRef}
              required
            />
          </div>
          <Button
            type="button"
            onClick={handleLogin}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <NavLink to="/register" className="underline">
            Register
          </NavLink>
        </div>
        <div className="mt-4 text-center text-sm">
          Or go back to{" "}
          <NavLink to="/home" className="underline">
            Home page
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
}
