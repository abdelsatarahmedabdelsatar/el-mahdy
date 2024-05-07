import React from 'react';
import { Link } from 'react-router-dom';

const ProductLine = ({title,route}) => {
    return (
        <div className='mb-2 gx-0 d-flex justify-content-around'>
                <div>{title}</div>
                <div style={{width:'83%'}}><hr/></div>
                <div><Link to={route} style={{fontSize:'12px'}} className='btn btn-warning p-1 me-2 fw-bold'>عرض الكل</Link></div>
        </div>
    );
}

export default ProductLine;
