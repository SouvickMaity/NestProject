import React from 'react'
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';


const Dashboard = () => {
  const[auth]=useAuth();
  return (
    <Layout>
       <div class="container-fluid">
     <div className='row'>
      <div className='col-md-3'>
        <UserMenu/>
      </div>
      <div className='col-md-9'>
        <h3>{auth?.user?.name}</h3>
      </div>
     </div>   
     </div>
    </Layout>
  )
}

export default Dashboard; 