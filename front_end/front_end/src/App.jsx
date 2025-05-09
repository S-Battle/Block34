import { useState, useEffect } from 'react'
import './App.css'
import {Link, Route, Routes } from 'react-router';
import RestaurantsPage from './pages/RestaurantsPage';
import CustomersPage from './pages/CustomersPage';
import ReservationsPage from './pages/ReservationsPage';
import HomePage from './pages/HomePage';

function App() {
  const [count, setCount] = useState(0)
  const [reservationList, setReservationList ] = useState([]);
  const [customerList, setCustomerList ] = useState([]);
  const [restaurantList, setRestaurantList ] = useState([]);

  const setList = async (list, typeList)=>{
    console.log(typeList)
    console.log("this is the list: ", list)
    if (typeList === "customer"){
      console.log("list is customer")      
      setCustomerList(()=> {
        return [...list]
      })
    }    
    if (typeList === "restaurant"){
      console.log("list is restaurant")      
      setRestaurantList(()=> {
        return [...list]
      })
    } 
    if (typeList === "reservation"){
      console.log("list is reservation")
      setReservationList(()=>{
        return [...list]
      })
    }   
  }

  return (
    <>
    <nav>
      <Link to="/" ><div style={{marginLeft: "2rem"}}>Home</div></Link>
      <Link to="/customers" >Customers</Link>
      <Link to="/restaurants" >Restaurants</Link>
      <Link to="/reservations" >Reservations</Link>
    </nav>

    <Routes>
      <Route path="/customers" element={<CustomersPage
      list = {customerList}
      setList = {setList}
      
      />} />
      <Route path="/restaurants" element={ < RestaurantsPage
      list = {restaurantList}
      setList = {setRestaurantList}
      />} />
      <Route path='/reservations' element={<ReservationsPage 
      customerList={customerList}
      restaurantList={restaurantList}
      reservationList={reservationList}
      setReservationList={setReservationList}
      setList={setList}
      
      />} />
      <Route path='/' element={<HomePage />} />
    </Routes>
    </>
  )
}

export default App
