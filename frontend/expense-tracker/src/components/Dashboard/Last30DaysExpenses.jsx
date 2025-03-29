import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data) {
            const result = prepareExpenseBarChartData(data);
            setChartData(result);
        }
    }, [data]); // ✅ Use an array

    return (
        <div className='card col-span-1'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 60 days Expenses</h5>
            </div>
            <CustomBarChart data={chartData} />
        </div>
    );
};

export default Last30DaysExpenses;
