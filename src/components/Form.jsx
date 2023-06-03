import { useEffect, useState } from 'react';
import './form.css'

const Form = (props) => {
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [formValid, setFormValid] = useState(false)

    const inputTitle = (e) => {
        setTitle(e.target.value);
    }

    const inputAmount = (e) => {
        setAmount(e.target.value);
    }

    const saveItem = (e) => {
        e.preventDefault()
        const itemData = {
            title: title,
            amount: Number(amount)
        }
        // eslint-disable-next-line react/prop-types
        props.onAddItem(itemData)
        setTitle('')
        setAmount(0)
    }

    useEffect(() => {
        const checkData = title.trim().length > 0 && amount !== 0
        if (checkData) {
            setFormValid(true)
        }
    }, [title,amount])

    return (
        <div>
            <form onSubmit={saveItem}>
                <div className="form-control">
                    <label>ชื่อรายการ</label>
                    <input
                        type="text" placeholder="ระบุชื่อรายการของคุณ"
                        onChange={inputTitle}
                        />
                </div>
                <div className="form-control">
                    <label>จำนวนเงิน</label>
                    <input
                        type="number"
                        placeholder="(+ รายรับ, - รายจ่าย)"
                        onChange={inputAmount}
                        />
                </div>
                <div>
                    <button className={`btn ${formValid ? "btnright" : "btnwrong"}`} type="submit" disabled={!formValid}>เพิ่มข้อมูล</button>
                </div>
            </form>
        </div>
    )
}

export default Form