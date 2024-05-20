"use client";
import React from 'react';
import { TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Input,InputGroup } from '@chakra-ui/react'
import { InputRightElement } from '@chakra-ui/react';
import Footer from '../footer/footer';

const SigninPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };
  
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedData = localStorage.getItem('signupFormData');
    const signUpData = storedData ? JSON.parse(storedData) : null;

    if (signUpData) {
      const hashedPassword = await hashPassword(password);
      if (email === signUpData.email && hashedPassword === signUpData.password) {
        setError('');
        
        router.push('Interface');
      } else {
        setError('Incorrect credentials');
      }
    } else {
      setError('User not found... Register');
    }
  }

  return (
    <ChakraProvider>
    <div className='min-h-screen bg-amber-300'>
    <header className='flex justify-between items-center px-4 py-2'>
            <div className="font-extrabold text-3xl md:text-5xl">
              SPENDWISE
            </div>
            </header>
      <form onSubmit={handleSubmit} className='flex items-center justify-center '>
        <div className='flex flex-col items-center h-[25rem] w-[30rem] outline mt-36 bg-white rounded-md'>
          <div className='text-5xl font-bold mt-10 mb-10'>Sign In</div>
          <div className='mt-4 outline rounded-md'>
            
            <Input
              id='email'
              label='Email'
              variant='filled'
              value={email}
              onChange={handleEmailChange}
              required
              size='lg'
              placeholder='Email ID'
            />
            
            
          </div>
          <div className='mt-4 outline rounded-md'>
          <InputGroup>
            <Input
              id='password'
              label='Password'
              variant='filled'
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder='Password'
              type={show ? 'text' : 'password'}
              size='lg'
            />
            <InputRightElement width='4.5rem'>
        <Button h='2rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
            </InputGroup>
          </div>
          <div className='mt-6 '>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Button type='submit' size='lg' color='black' colorScheme='green' variant='solid'>
              Sign In
            </Button>
          </div>
        </div>
      </form>
      <div className='-mt-60'>
      <Footer/>
      </div>
      
    </div>
    </ChakraProvider>
  )
}

export default SigninPage;
