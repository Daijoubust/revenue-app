import './index.css'
import { Title } from './components/Title'
import { Transaction } from './components/transaction'
import Form from './components/Form'
import { useEffect, useState } from 'react'
import { DataContext } from './data/DataContext'
import ReportComponent from './components/ReportComponent'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'

const App = () => {
  const initData = [
    { title: "ค่าเช่าบ้าน", amount: -8000 },
    { title: "เงินเดือน", amount: 30000 }
  ]

  const [items, setItems] = useState(initData)
  const [reportIncome, setReportIncome] = useState(0)
  const [reportExpense, setReportExpense] = useState(0)
  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem]
    })
  }
  useEffect(() => {
    const amounts = items.map(items => items.amount)
    const income = amounts.filter(element => element > 0).reduce((total, element) => total += element, 0)
    const expense = amounts.filter(element => element < 0).reduce((total, element) => total += element, 0)*-1
    setReportIncome(income)
    setReportExpense(expense)
  }, [items, reportIncome, reportExpense])
  //  Reducer State
  // const [showReport, setShowReport] = useState(true)
  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "SHOW":
  //       return setShowReport(true)
  //     case "HIDE":
  //       return setShowReport(false)
  //   }
  // }
  // const [result,dispatch] = useReducer(reducer, showReport)
  return (
    <DataContext.Provider value={{
      income: reportIncome,
      expense: reportExpense
    }}>
      <div className='container'>
        <Title />
        {/* {showReport && <ReportComponent/>} */}
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
              <Route path='/' element={<ReportComponent/>}></Route>
              <Route path='/insert'>
                {<>
                  <Form onAddItem={onAddNewItem} />
                  <Transaction items={items} />
                </>}</Route>
            </Routes>
          </div>
        </Router>
      </div>
      {/* <button className='test' onClick={() => dispatch({ type: "SHOW" })}>แสดง</button>
      <button className='test' onClick={() => dispatch({ type : "HIDE" })}>ซ่อน</button> */}
    </DataContext.Provider>
  )
}

export default App