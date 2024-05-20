export const calculateTotals = (monthlyData, formatCurrency) => {
    const totalIncome = monthlyData.reduce((sum, data) => sum + data.income, 0);
    const totalExpenses = monthlyData.reduce((sum, data) => sum + data.expense, 0);
    const totalSavings = monthlyData.reduce((sum, data) => sum + data.savings, 0);
  
    return {
      totalIncome: formatCurrency(totalIncome),
      totalExpenses: formatCurrency(totalExpenses),
      totalSavings: totalSavings,
    };
  };
  
  export const calculateGoalProgress = (monthlyData, goalAmount, setGoalProgress) => {
    const { totalSavings } = calculateTotals(monthlyData, (amount) => amount);
    if (goalAmount && parseFloat(goalAmount) > 0) {
      let progress = (totalSavings / parseFloat(goalAmount)) * 100;
      if (progress > 100) {
        progress = 100;
      }
      setGoalProgress(progress);
    } else {
      setGoalProgress(0);
    }
  };
  
  export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };
  