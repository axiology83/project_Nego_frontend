import React from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../Constants'

function MySellComp({mySell}) {
const handleError = (event) => {
event.target.src = '/img/preview.png'
}


  return (
    <div style={{display: 'inline-flex', alignItems: 'center', width: '1080px', height: '160px', padding: '12px'}}>
    <div className='imageBox-sm' style={{width: '150px', height: '150px'}}>
        <Link to={`/board/detail/${mySell.id}`}><img style={{width: '150px', height: '150px'}} src={`${API_URL}/sell-service/img/${mySell.id}`} onError={handleError}/></Link>
    </div>
    <div style={{display: 'inline-block', marginLeft: '12px'}}>
        <span style={{fontSize : "x-large"}}>{mySell.productName}</span><br/>
        <span style={{fontSize : "large"}}>{Intl.NumberFormat('en-US').format(mySell.price)}원</span>
    </div>
</div>
  )
}

export default MySellComp