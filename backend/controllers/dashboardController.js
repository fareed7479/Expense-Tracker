const Income = require("../models/Income");
const Expense = require("../models/Expense");
const {isValidObjectId,Types} = require("mongoose");

//Dashboard Data
exports.getDashboardData = async (req,res) =>{
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));


        //Fetch total income & expenses
        const totalIncome = await Income.aggregate([
            { $match : { userId: userObjectId } },
            { $group : { _id: null, total: {$sum: "$amount"} } },
        ]);

        console.log("totalIncome",{totalIncome,userId:isValidObjectId(userId)});


        const totalExpense = await Expense.aggregate([
            { $match : { userId: userObjectId } },
            { $group : { _id: null, total: {$sum: "$amount"} } },
        ]);

        console.log("totalExpense",{totalExpense,userId:isValidObjectId(userId)});


        //Get income transactions in the last 60 days 
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date:{ $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({date:-1});

        console.log("last60DaysIncomeTransactions",{last60DaysIncomeTransactions,userId:isValidObjectId(userId)});


        //get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum,transaction) => sum + transaction.amount,0
        );

        console.log("TotalincomeLast60Days",{incomeLast60Days,userId:isValidObjectId(userId)});


        //Get expense transactions in the last 60 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date:{ $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({date:-1});

        console.log("last30DaysExpenseTransactions",{last30DaysExpenseTransactions,userId:isValidObjectId(userId)});


        //Get total Expenses for last 30 days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum,transaction) => sum + transaction.amount,
            0
        );

        console.log("TotalexpenseLast30Days",{expenseLast30Days,userId:isValidObjectId(userId)});


        //Fetch last 5 transactions (income + expense)
        const lastTransactions = [
            ...(await Income.find({userId}).sort({date:-1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type:"income",
                })
            ),
            ...(await Expense.find({userId}).sort({date:-1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type:"expense",
                })
            ),
        ].sort((a,b) => b.date - a.date );//SOrt latest First

        //Final Response
        res.json({
            totalBalance : 
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses : {
                total : expenseLast30Days,
                transactions : last30DaysExpenseTransactions,
            },
            last60DaysIncome : {
                total : incomeLast60Days,
                transactions : last60DaysIncomeTransactions,
            },
            recentTransactions : lastTransactions,
        })

    }
    catch (err){
        // res.status(500).json({message:"Server Error"});
        console.log(err);
    }
}
