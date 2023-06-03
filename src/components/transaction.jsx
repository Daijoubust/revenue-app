import PropTypes from 'prop-types';
import { Item } from './Item'
import './transaction.css'

export const Transaction = (props) => {
    const { items } = props
    return (
    <div>
        <ul className='item-list'>
            {items.map((item,index) => (
                <Item className="item hover:ease-in-out duration-300" {...item} key={index} />
            ))}
            </ul>
    </div>
    );
}

Transaction.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired
        })
    ).isRequired
}