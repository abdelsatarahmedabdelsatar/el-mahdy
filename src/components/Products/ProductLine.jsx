import React from 'react';
import { Link } from 'react-router-dom';

const ProductLine = ({title,route}) => {
    return (
        <div className='mb-2 py-3 gx-0 m-3 d-flex justify-content-around'  style={{fontSize:'13px'}}>
                <div className='bg-warning p-2 rounded-3 shadow-sm'>{title}</div>
                <div style={{width:'83%'}}><hr/></div>
                <div className='d-flex align-items-center'><Link to={route} className = "p-1 border border-1 border-dark text-decoration-none text-dark rounded-2">عرض الكل</Link></div>
        </div>
    );
}

export default ProductLine;
