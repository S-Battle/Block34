import React, {useState, useEffect} from  "react";



const AdvancedControls = ({name, restaurantList, customerList, selectedID, getList, reservationList, setReservationList, setList}) => {
     const [ inputValue, setInputValue ] = useState("");
     const [ dateInput, setDateInput ] = useState("");
     const [ numPartyInput, setNumPartyInput ] = useState(1);
     const [ restaurantOptionsArray, setRestaurantOptionsArray] = useState([]);     
     const [ customerOptionsArray, setCustomerOptionsArray] = useState([]);
     const [ restID, setRestID ] = useState("");
     const [ restList, setRestList ] = useState("");
     const [ custList, setCustList ] = useState(" ");
     const [ custID, setCustID ] = useState("");


        const createTempLists = async ()=>{
            
            let tempRestList = await restaurantList.map((rest, num)=>{                                                          
                return <option value={rest.name +" "+ rest.id} key={num}>{rest.name}</option> 
            })         
            setRestaurantOptionsArray(()=>{
                let starter = [<option key="start">SELECT A RESTAURANT</option>]
                return [starter,...tempRestList];
            })            
            let tempCustList = await customerList.map((customer, num)=>{
                return(<option value={customer.name + " " + customer.id}   key={num}>{customer.name}</option>)
            })
            setCustomerOptionsArray(()=>{
                let starter = [<option key="start">SELECT A CUSTOMER</option>]
                return [starter,...tempCustList];
            })
            
        }

        


        const getCustomerList = async()=>{
                const response = await fetch(`http://localhost:4444/api/customer`);
                const data = await response.json();        
                await setList(data, "customer")  
        };

        const getRestaurantList = async()=>{
                const response2 = await fetch(`http://localhost:4444/api/restaurant`);
                const data2 = await response2.json();        
                await setList(data2, "restaurant")            
        };

        useEffect(()=>{
            const establishLists = async ()=>{                 
                await getCustomerList();
                await getRestaurantList();
                await createTempLists();
            }
            console.log("OH, NO, DON't PRINT ")
            establishLists();
            
        },[])
        
        
        const handleAdd = async(e) => {
           
            const response = await fetch("http://localhost:4444/api/reservation",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    date: dateInput,
                    numParty: numPartyInput,
                    customerID: custID,
                    restaurantID: restID,
                })
                
            })
            const data = await response.json();
            console.log(data);
            await getList();

        };
        const handleModify = async () => {
            const response = await fetch("http://localhost:4444/api/reservation",{
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    id: selectedID,
                    date: dateInput,
                    numParty: numPartyInput,
                    customerID: custID,
                    restaurantID: restID,
                })
            })
            await getList()
        };
        const handleDelete = (e) => {
            deleteFunction(inputValue)
        };        


          return(
                             <>
                                <div className="basicControlsView">
                                    <h1>{name}</h1>
                                    <div className="basicControlsButtons">
                                    <button onClick={async (e)=>handleAdd(e)}>ADD</button>
                                    <button onClick={async (e)=>handleModify(e)}>MODIFY</button>
                                    <button onClick={async (e)=>handleDelete(e)}>DELETE</button>
                                    </div>
                                
                                <div className="advancedControlsInputs">
                                    <label htmlFor="date"><div>DATE</div> <div><input type="date" id="date" value={dateInput} onChange={ async(e)=>{
                                        let newValue = e.target.value 
                                        console.log(newValue)
                                        setDateInput(()=>newValue)
                                    }} />
                                    </div></label>
                                    <label htmlFor="numParty"><div>PARTY COUNT</div> <div><input min="1" type="number" id="numParty"  value={numPartyInput} onChange={ async(e)=>{
                                        let newValue = e.target.value 
                                        console.log(restaurantList)
                                        console.log(restID)
                                        setNumPartyInput(()=>newValue)
                                    }} />
                                    </div></label>
                                    <label htmlFor="custName"><div>CUSTOMER</div> <div><select id="custName" onClick={async()=>{ createTempLists()}} value={custList} onChange={ async(e)=>{
                                        let newValue = e.target.value 
                                        setCustID(newValue.slice(-36))
                                        setCustList(()=>newValue)
                                    }}>{customerOptionsArray}</select>
                                    </div></label>
                                    <label htmlFor="restName"><div>RESTAURANT</div> <div><select  id="restName" onClick={async()=>{ createTempLists()}} value={restList} onChange={ async(e)=>{                                        
                                        let newValue = e.target.value
                                        let newID = e.target.value                                                                         
                                        
                                        setRestID(newID.slice(-36))                           
                                        setRestList(newValue)
                                    }}>{restaurantOptionsArray}</select>
                                    </div></label>                                    
                                </div>
                                <div className="selectedInfo">
                                {/* <div><div>ID:</div>  {selectedID}</div> */}
                               {/* <div><div>NAME:</div> {selectedName}</div> */}
                               
                               <div>CUSTOMER ID:</div><div>{custID}</div>
                               <div>RESTAURANT ID:</div><div> {restID}</div>
                               
                               
                                </div>
                                
                             </div>
                             </>
          );

}



export default AdvancedControls;