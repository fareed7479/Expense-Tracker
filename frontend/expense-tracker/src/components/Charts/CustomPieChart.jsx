import React from 'react'
import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";


const CustomPieChart = ({
    data,
    label,
    totalAmount,
    colors,
    showTextAnchor
}) => {

    // Prepare legend data explicitly
    const legendData = data.map((entry, index) => ({
    value: entry.name,
    color: colors[index % colors.length],
  }));


  return (
    <ResponsiveContainer width="100%" height={380}>
        <PieChart>
            <Pie 
                data={data}
                dataKey = "amount"
                nameKey = "name"
                cx = "50%"
                cy = "50%"
                outerRadius={130}
                innerRadius={100}
                labelLine= {false}
            >
                {data.map((entry,index) => (
                    <Cell key={`cell-${index}`} fill={colors[index%colors.length]} />
                ) )}
            </Pie>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend content={(props) => <CustomLegend {...props} payload={legendData} />} />

            {showTextAnchor && (
          <text
            x="50%"
            y="50%"
            dy={-25}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#666"
            fontSize="14px"
          >
            {label}
          </text>
        )}
        {showTextAnchor && (
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#333"
            fontSize="24px"
            fontWeight="600"
          >
            {totalAmount}
          </text>
        )}
        </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart