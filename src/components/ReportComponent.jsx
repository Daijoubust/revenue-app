import { DataContext}  from "../data/DataContext"
import { useContext } from "react"
import './reportcomponent.css'

const ReportComponent = () => {
    const { income,expense } = useContext(DataContext);
    return (
        <div>
            <div className="header-container">
                <h4>ยอดคงเหลือ (บาท)</h4>
                <h1>฿{(income - expense).toFixed(2)}</h1>
            </div>
            <div className="report-container">
                <div>
                    <h4>ยอดรายรับ</h4>
                    <p className="report plus">฿{income}</p>
                </div>
                <div>
                    <h4>ยอดรายจ่าย</h4>
                    <p className="report minus">฿{expense}</p>
                </div>
            </div>
        </div>
    )
}

export default ReportComponent