import './index.css'
import { Title } from './components/Title'
import { Transaction } from './components/transaction'
import Form from './components/Form'
import { useEffect, useState } from 'react'
import { DataContext } from './data/DataContext'
import ReportComponent from './components/ReportComponent'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {

  const [items, setItems] = useState([])
  const [reportIncome, setReportIncome] = useState(0)
  const [reportExpense, setReportExpense] = useState(0)
  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem]
    })
  }
  useEffect(() => {
    const amounts = items.map((item) => item.amount)
    const income = amounts.filter((element) => element > 0).reduce((total, element) => total += element, 0)
    const expense = amounts.filter((element) => element < 0).reduce((total, element) => total += element, 0) * -1
    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))
  }, [items])

  return (
    <DataContext.Provider value={{
      income: reportIncome,
      expense: reportExpense
    }}>
      <div className='container'>
        <Title />
        <Router>
          <div>
            <ul className='horizontal-menu'>
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path='/' element={<ReportComponent />} />
              <Route path='/insert' element={
                <>
                  <Form onAddItem={onAddNewItem} />
                  <Transaction items={items} />
                </>
            } />
            </Routes>
          </div>
        </Router>
      </div>
    </DataContext.Provider>
  )
}

export default App;
