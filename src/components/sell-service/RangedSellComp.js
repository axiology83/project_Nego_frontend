import React from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../Constants'

function RangedSellComp({rangedSell}) {
const handleError = (event) => {
event.target.src = '/img/preview.png'
}


  return (
    <div style={{display: 'inline-block', width: '225px', height: '280px', padding: '12px'}}>
        <div className='imageBox-sm' style={{width: '225px', height: '225px'}}>
          <Link to={`/board/detail/${rangedSell.id}`}><img style={{width: '225px', height: '225px'}} src={`${API_URL}/sell-service/img/${rangedSell.id}`} onError={handleError}/></Link></div>
        <span style={{fontSize : "x-large"}}>{rangedSell.productName}</span><br/>
        <span style={{fontSize : "large"}}>{Intl.NumberFormat('en-US').format(rangedSell.price)}원</span><br/>
    </div>
  )
}

export default RangedSellComp