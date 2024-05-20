"use client";
import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  ChakraProvider,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import "./signup.css"; 
import Footer from "../footer/footer";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!emailPattern.test(value)) {
      setEmailError(
        "Please enter a valid email address (e.g., user@example.com)"
      );
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!passwordPattern.test(value)) {
      setPasswordError(
        "Must contain at least 8 characters, one letter and one number."
      );
    } else {
      setPasswordError("");
    }
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError("Password does not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password !== value) {
      setConfirmPasswordError("Password does not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedData = localStorage.getItem("signupFormData");
    const signUpData = storedData ? JSON.parse(storedData) : null;

    if (signUpData && signUpData.email === email) {
      setGeneralError("This email is already registered. Please sign in.");
      setSuccessMessage("");
    } else {
      if (!emailError && !passwordError && !confirmPasswordError) {
        const hashedPassword = await hashPassword(password);
        const formData = {
          email: email,
          password: hashedPassword,
        };
        localStorage.setItem("signupFormData", JSON.stringify(formData));
        setSuccessMessage("Registered Successfully...getting you in");
        setGeneralError("");
        setTimeout(() => {
          router.push("Interface");
        }, 2000);
      }
    }
  };

  return (
    <ChakraProvider>
      <div className="bg-amber-300 min-h-[100vh]">
      <header className='flex justify-between items-center px-4 py-2 header'>
            <div className="font-extrabold text-3xl md:text-5xl">
              SPENDWISE
            </div>
            </header>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className="responsive-bg "
      >
        <form onSubmit={handleSubmit}>
          <Box
            className="responsive-container outline "
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="lg"
          >
            <div className="responsive-title">
              Create Your Account
            </div>

            <FormControl id="Name" isRequired mb={3}>
              <FormLabel>Name</FormLabel>
              <div className="outline rounded-md">
                <Input type="text" focusBorderColor="red.300" placeholder="John Doe" />
              </div>
            </FormControl>
            <FormControl id="Phone" mb={3}>
              <FormLabel>Phone Number</FormLabel>
              <div className="outline rounded-md">
                <Input type="tel" focusBorderColor="red.300" placeholder="9999999999"/>
              </div>
            </FormControl>
            <FormControl id="email" isRequired mb={3} isInvalid={!!emailError}>
              <FormLabel>Email</FormLabel>
              <div className="outline rounded-md">
                <Input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  focusBorderColor="red.300"
                />
              </div>
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="password"
              isRequired
              mb={3}
              isInvalid={!!passwordError}
            >
              <FormLabel>Password</FormLabel>
              <div className="outline rounded-md">
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="********"
                  focusBorderColor="red.300"
                />
              </div>
              <FormErrorMessage>{passwordError}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="confirmPassword"
              isRequired
              mb={3}
              isInvalid={!!confirmPasswordError}
            >
              <FormLabel>Confirm Password</FormLabel>
              <div className="outline rounded-md">
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="********"
                  focusBorderColor="red.300"
                />
              </div>
              <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>
            </FormControl>
            {generalError && (
              <Alert status="error" mt={2} mb={4}>
                <AlertIcon />
                <AlertTitle mr={2}>Error</AlertTitle>
                <AlertDescription>{generalError}</AlertDescription>
              </Alert>
            )}
            {successMessage && (
              <Alert status="success" mt={2} mb={4}>
                <AlertIcon />
                <AlertTitle mr={2}>Success</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              size="lg"
              color="black"
              colorScheme="green"
              variant="solid"
              mt={4}
              isLoading={false}
              loadingText="Signing Up..."
            >
              Sign Up
            </Button>
          </Box>
          
        </form>
        
        
      </Box>
      
        <Footer/>

        
      </div>
      
      
      
    </ChakraProvider>
    
  );
};

export default SignupPage;
