// use client
import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  ChakraProvider
} from '@chakra-ui/react';


const MonthlyDataForm = ({
  monthlyIncome,
  setMonthlyIncome,
  monthlyDescription,
  setMonthlyDescription,
  monthlyExpense,
  setMonthlyExpense,
  selectedMonth,
  setSelectedMonth,
  handleAddMonthlyData
}) => {
  return (
    <ChakraProvider>
    <Stack spacing={4} p={4} borderRadius="md" boxShadow="md" bg="white" className='outline mt-3 ml-3 mr-3 flex flex-col items-center justify-center w-[30%] h-[22%] bg-amber-300'>
      <div className=' mb-4 text-2xl font-extrabold'>
        Monthly Expense Calculator
      </div>
      <div>
      <FormControl id="monthlyIncome" isRequired >
        <FormLabel>Monthly Income</FormLabel>
        <Input
        width={52}
          type="number"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          focusBorderColor="blue.400"
        />
      </FormControl>
      <FormControl id="monthlyDescription" isRequired>
        <FormLabel>Monthly Description</FormLabel>
        <Input
          width={52}
          value={monthlyDescription}
          onChange={(e) => setMonthlyDescription(e.target.value)}
          focusBorderColor="blue.400"
        />
      </FormControl>
      <FormControl id="monthlyExpense" isRequired>
        <FormLabel>Monthly Expense</FormLabel>
        <Input
          width={52}
          type="number"
          value={monthlyExpense}
          onChange={(e) => setMonthlyExpense(e.target.value)}
          focusBorderColor="blue.400"
        />
      </FormControl>
      <FormControl id="selectedMonth" isRequired>
        <FormLabel>Select Month</FormLabel>
        <Input
          width={52}
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          focusBorderColor="blue.400"
        />
      </FormControl>
      </div>
      <Button
        colorScheme="blue"
        onClick={handleAddMonthlyData}
        isLoading={false}
        loadingText="Adding..."
        type="submit"
        width={20}
      >
        Add 
      </Button>
    </Stack>
    </ChakraProvider>
  );
};

export default MonthlyDataForm;
