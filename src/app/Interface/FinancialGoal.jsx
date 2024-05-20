import React from 'react';
import {
  Box,
  Text,
  Heading,
  Input,
  Progress,
  Flex,
  ChakraProvider
} from '@chakra-ui/react';
import { Victor_Mono } from 'next/font/google';
const victor_mono = Victor_Mono({ subsets: ["latin"] });

const FinancialGoal = ({
  goalName,
  setGoalName,
  goalAmount,
  setGoalAmount,
  goalProgress,
}) => {
  return (
    <ChakraProvider>
    <Box p={3} borderRadius="md" boxShadow="lg" bg="white" className='outline flex w-[50rem] flex-col items-center justify-center ml-1 mt-12 absolute bg-amber-100 h-[30rem]'>
      <Heading as="h2" size="xl" mb={4} textAlign="center" fontFamily={victor_mono}>
        Financial Goal
      </Heading>
      <Input
        variant="filled"
        mb={4}
        type="text"
        placeholder="Goal Name"
        value={goalName}
        onChange={(e) => setGoalName(e.target.value)}
        width={80}
      />
      <Input
        variant="filled"
        mb={4}
        type="number"
        placeholder="Goal Amount"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
        width={80}
      />
      <Flex alignItems="center" mb={4}>
        <Text flex="1" textAlign="left" className=' pr-48'>
          Goal Progress: {goalProgress.toFixed(2)}%
        </Text>
        <Text flex="1" textAlign="right" className='pl-36'>
          {goalProgress >= 100 ? 'Goal Achieved!' : 'In Progress...'}
        </Text>
      </Flex>
      <Progress
        size="lg"
        value={goalProgress}
        colorScheme={goalProgress >= 100 ? 'green' : 'blue'}
        width='45rem'
      />
    </Box>
    </ChakraProvider>
  );
};

export default FinancialGoal;
