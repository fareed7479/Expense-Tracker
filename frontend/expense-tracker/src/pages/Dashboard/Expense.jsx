import React, { useState , useEffect} from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import Modal from '../../components/Modal';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import DeleteAlret from '../../components/DeleteAlret';
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';


const Expense = () => {

  const [expenseData,setExpenseData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });


  const [openAddExpenseModal,setOpenAddExpenseModal] = useState(false)

    //Get All Expense Details
    const fetchExpenseDetails = async () => {

      if(loading) return;
  
      setLoading(true);
  
      try{
        const response = await axiosInstance.get(
          `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
        );
  
        if(response.data) {
          setExpenseData(response.data);
        }
      } catch (error) {
        console.log("Something went wrong.please try again",error);
      } finally {
        setLoading(false);
      }
    };
  
    //Handle Add Expense
    const handleAddExpense = async (expense) => {
      const {category,amount,date,icon} = expense;
  
      //Validation Checks
      if(!category.trim()) {
        toast.error("Category  is required.");
        return;
      }
  
      if(!amount || isNaN(amount) || Number(amount) <= 0) {
        toast.error("Amount should be a valid number greater than 0.");
        return;
      }
  
      if(!date) {
        toast.error("Date is required.");
        return;
      }
  
      try {
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
          category,
          amount,
          date,
          icon,
        });
  
        setOpenAddExpenseModal(false);
        toast.success("Expense added Succesfully!.");
        fetchExpenseDetails();
      } catch (error) {
        console.error(
          "Error adding Expense:",
          error.response?.data?.message || error.message
        );
      }
  
    };
  
    useEffect(()=>{
      fetchExpenseDetails();
    
      return () => {};
    },[])


  //Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert({show:false,data:null});
      toast.success("Income details deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
    }
  };

    //Handle download Expense details
  const handleDownloadExpenseDetails = async () => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType:"blob",
        }
      );

      //create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download","expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:",error);
      toast.error("Failed to download expense details.Please try again.");
    }
  };

  useUserAuth();
  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
            <div className=''>
              <ExpenseOverview 
                transactions = {expenseData}
                onAddExpense = {()=> setOpenAddExpenseModal(true)}
              />

              <ExpenseList 
                transactions ={expenseData}
                onDelete = {(id) => {
                  setOpenDeleteAlert({show:true,data:id});
                }}
                onDownload={handleDownloadExpenseDetails}
            />
            </div>
            <Modal 
              isOpen = {openAddExpenseModal}
              onClose={()=>setOpenAddExpenseModal(false)}
              title= "Add Expense"
            >
              <AddExpenseForm onAddExpense={handleAddExpense} />
            </Modal>


            <Modal 
              isOpen={openDeleteAlert.show}
              onClose={()=> setOpenDeleteAlert({show:false,data:null})}
              title="Delete Income"
            >
              <DeleteAlret 
                content="Are you sure! you want to delete"
                onDelete={() => deleteExpense(openDeleteAlert.data)}
              />
            </Modal>
            
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Expense