// use client
import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  IconButton,
  Stack,
  Heading,
  ChakraProvider
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Victor_Mono } from 'next/font/google';
const victor_mono = Victor_Mono({ subsets: ["latin"] });

const MonthlyDataTable = ({
  monthlyData,
  handleDeleteEntry,
  formatCurrency,
  setSelectedChartData,
  setShowChart,
}) => {
  return (
     <ChakraProvider>
    <Stack spacing={4} p={4} borderRadius="md" boxShadow="lg" bg="white" className='outline w-[80rem] h-[35rem] bg-amber-300 mt-3 ml-5' >
      <div className=' mb-4 text-2xl font-extrabold'>
        Summary of All Months
      </div>
      <Table variant="striped" colorScheme="yellow" borderWidth="1px" borderColor="gray.200">
        
        <Thead>
          <Tr fontFamily={victor_mono}>
            <Th textAlign="center" borderWidth="1px" borderColor="gray.200" fontFamily={victor_mono}>
             
              Month
              
              
            </Th>
            
            <Th textAlign="center" borderWidth="1px" borderColor="gray.200" fontFamily={victor_mono}>
              Description
            </Th>
            <Th textAlign="center" borderWidth="1px" borderColor="gray.200" fontFamily={victor_mono}>
              Income
            </Th>
            <Th textAlign="center" borderWidth="1px" borderColor="gray.200" fontFamily={victor_mono}>
              Expense
            </Th>
            <Th textAlign="center" borderWidth="1px" borderColor="gray.200" fontFamily={victor_mono}>
              Savings
            </Th>
            <Th textAlign="center" borderWidth="1px" borderColor="gray.200" fontFamily={victor_mono}>
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {monthlyData.map((data, index) => (
            <Tr key={index}>
              <Td textAlign="center" borderWidth="1px" borderColor="gray.200">
                {data.month}
              </Td>
              <Td textAlign="center" borderWidth="1px" borderColor="gray.200">
                {data.description}
              </Td>
              <Td textAlign="center" borderWidth="1px" borderColor="gray.200">
                {formatCurrency(data.income)}
              </Td>
              <Td textAlign="center" borderWidth="1px" borderColor="gray.200">
                {formatCurrency(data.expense)}
              </Td>
              <Td textAlign="center" borderWidth="1px" borderColor="gray.200">
                {formatCurrency(data.savings)}
              </Td>
              <Td textAlign="center" borderWidth="1px" borderColor="gray.200">
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => {
                    setSelectedChartData(data);
                    setShowChart(true);
                  }}
                >
                  Show Graph
                </Button>
                <IconButton
                  colorScheme="red"
                  size="sm"
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  onClick={() => handleDeleteEntry(index)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
     </ChakraProvider> 
  );
};

export default MonthlyDataTable;
