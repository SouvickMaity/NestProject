import React from 'react'
import {Link} from'react-router-dom';

function Footer(props) {
  return (
    <div className="footer">
         <p className='text-center mt-2'>
          <Link to="./About">About</Link>|
          <Link to="./Contact">Contact</Link>|
          <Link to="./Policy">Privacy Policy</Link>

         </p>
        
        
    </div>
  )
}

export default Footer