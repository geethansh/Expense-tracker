"use client";

import React, { useState, useEffect } from "react";
import MonthlyDataForm from "./MonthlyDataForm";
import MonthlyDataTable from "./MonthlyDataTable";
import FinancialGoal from "./FinancialGoal";
import {
  calculateGoalProgress,
  calculateTotals,
  formatCurrency,
} from "./calculateFunctions";
import { Typography, Button } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Victor_Mono } from "next/font/google";
import { Text } from "@chakra-ui/react";
import LogoutIcon from '@mui/icons-material/Logout';
import './interface.css'
import Router, { useRouter } from "next/navigation";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const victor_mono = Victor_Mono({ subsets: ["latin"] });

const ExpenseCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyDescription, setMonthlyDescription] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [chartData, setChartData] = useState(null);
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalProgress, setGoalProgress] = useState(0);
  const router=useRouter();
  const [showGoalCompletedMessage, setShowGoalCompletedMessage] =
    useState(false);

  const [showChart, setShowChart] = useState(false);
  const [selectedChartData, setSelectedChartData] = useState(null);

  useEffect(() => {
    const savedMonthlyData = localStorage.getItem("monthlyData");
    if (savedMonthlyData) {
      setMonthlyData(JSON.parse(savedMonthlyData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("monthlyData", JSON.stringify(monthlyData));
    calculateGoalProgress(monthlyData, goalAmount, setGoalProgress);
  }, [monthlyData]);

  useEffect(() => {
    calculateGoalProgress(monthlyData, goalAmount, setGoalProgress);
  }, [goalAmount]);

  useEffect(() => {
    if (goalProgress >= 100) {
      setShowGoalCompletedMessage(true);
    } else {
      setShowGoalCompletedMessage(false);
    }
  }, [goalProgress]);

  const handleLogOut=()=>{
    router.push('/')

  }

  const handleAddMonthlyData = () => {
    if (
      monthlyIncome &&
      monthlyExpense &&
      monthlyDescription &&
      selectedMonth
    ) {
      const newMonthlyData = {
        month: selectedMonth,
        income: parseFloat(monthlyIncome),
        expense: parseFloat(monthlyExpense),
        description: monthlyDescription,
        savings: parseFloat(monthlyIncome) - parseFloat(monthlyExpense),
      };
      setMonthlyData([...monthlyData, newMonthlyData]);

      setMonthlyIncome("");
      setMonthlyDescription("");
      setMonthlyExpense("");
      setSelectedMonth("");
    }
  };

  const handleDeleteEntry = (index) => {
    const updatedMonthlyData = monthlyData.filter((_, i) => i !== index);
    setMonthlyData(updatedMonthlyData);
  };

  useEffect(() => {
    if (selectedChartData) {
      const chartData = {
        labels: [selectedChartData.month],
        datasets: [
          {
            label: "Income",
            data: [selectedChartData.income],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Expense",
            data: [selectedChartData.expense],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Savings",
            data: [selectedChartData.savings],
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      };
      setChartData(chartData);
    }
  }, [selectedChartData]);

  const { totalIncome, totalExpenses, totalSavings } = calculateTotals(
    monthlyData,
    formatCurrency
  );

  const handleCloseGoalCompletedMessage = () => {
    setShowGoalCompletedMessage(false);
  };

  return (
    
    <div className=" bg-black min-h-svh">
      <header className='flex justify-between items-center px-4 py-2'>
            <div className="font-extrabold text-3xl md:text-5xl text-amber-300">
              SPENDWISE
            </div>
            <button onClick={handleLogOut} className=" bg-amber-300">
              <LogoutIcon/>
            </button>
              
            
      </header>
      <div className="flex flex-row bg-black">

        <MonthlyDataForm
          monthlyIncome={monthlyIncome}
          setMonthlyIncome={setMonthlyIncome}
          monthlyDescription={monthlyDescription}
          setMonthlyDescription={setMonthlyDescription}
          monthlyExpense={monthlyExpense}
          setMonthlyExpense={setMonthlyExpense}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          handleAddMonthlyData={handleAddMonthlyData}
        />
        <MonthlyDataTable
          monthlyData={monthlyData}
          handleDeleteEntry={handleDeleteEntry}
          formatCurrency={formatCurrency}
          setSelectedChartData={setSelectedChartData}
          setShowChart={setShowChart}
        />
      </div>
      <div className="  flex flex-row ml-3 ">
        <div className="flex-col outline h-[100%] w-[30%]  -mt-20 bg-amber-300 rounded-md ">
          <Text fontSize="xl" mb={4} fontFamily={victor_mono} align='center'>
            Total Income: {totalIncome}
          </Text>
          <Text fontSize="xl" mb={4} fontFamily={victor_mono} align='center'>
            Total Expenses: {totalExpenses}
          </Text>
          <Text fontSize="xl" mb={4} fontFamily={victor_mono} align='center'>
            Total Savings: {formatCurrency(totalSavings)}
          </Text>
        </div>
      
      <FinancialGoal
        goalName={goalName}
        setGoalName={setGoalName}
        goalAmount={goalAmount}
        setGoalAmount={setGoalAmount}
        goalProgress={goalProgress}
        showGoalCompletedMessage={showGoalCompletedMessage}
        handleCloseGoalCompletedMessage={handleCloseGoalCompletedMessage}
      />
      {showChart && chartData && (
        <div className=" w-[50%] h-[52%] mt-12 outline ml-[54rem] -mr-96 bg-amber-300 mb-20 rounded absolute">
          <Text fontSize="xl" mb={4} fontFamily={victor_mono}>
            {chartData.labels[0]} Chart
          </Text>
          <div className=" w-[50rem]">
          <Bar data={chartData} />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowChart(false)}
          >
            Close Chart
          </Button>
          </div>
        </div>
      )}
      </div>
      
      

      
      
    </div>
  );
};

export default ExpenseCalculator;
