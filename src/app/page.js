'use client'
import { ChakraProvider } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import './globals.css'

import Footer from './footer/footer';

export default function Home() {
  const router = useRouter();

  return (
    <ChakraProvider>
      <main className='relative min-h-screen bg-gradient-to-br from-yellow-400 to-rose-100'>
        <div className='flex flex-col justify-between h-full w-full'>
          
          <header className='flex justify-between items-center px-4 py-2'>
            <div className="font-extrabold text-3xl md:text-5xl">
              SPENDWISE
            </div>
            <div className='flex space-x-4'>
              <Button colorScheme='whiteAlpha' variant='solid' color='black' onClick={() => router.push('signin')}>
                Sign in
              </Button>
              <Button variant="solid" colorScheme='blackAlpha' color='black' onClick={() => router.push('signup')}>
                Register
              </Button>
            </div>
          </header>

          
          <section className='flex flex-col items-center justify-center px-4 min-h-[80vh]'>
            <div className='text-4xl md:text-6xl text-center font-extrabold'>
              Master Your Money: Track Expenses with Ease!
            </div>
          </section>

          
          
        </div>
        <Footer />
      </main>
    </ChakraProvider>
  );
}
