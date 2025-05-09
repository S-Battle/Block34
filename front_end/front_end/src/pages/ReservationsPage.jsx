import React, { useState} from  "react";
import AdvancedControls from "../assets/components/AdvancedControls";
import AdvancedViewer from "../assets/components/AdvancedViewer";



const ReservationsPage = ({customerList, restaurantList, reservationList, setReservationList, setList}) => {

    const [selectedID, setSelectedID] = useState("");


    const getList = async ()=>{
            const response = await fetch(`http://localhost:4444/api/reservation`);
            const data = await response.json();            
            await setList(data, 'reservation')
            console.log(data)
        }
    


          return(
                             <>
                             <div className="openScope">
                                <AdvancedControls 
                                name="RESERVATIONS"
                                customerList={customerList}
                                restaurantList={restaurantList}
                                reservationList={reservationList}
                                setReservationList={setReservationList}
                                setList={setList}
                                selectedID={selectedID}
                                setSelectedID={setSelectedID}
                                getList={getList}
                                />
                                <AdvancedViewer 
                                type="reservation"
                                setList={setReservationList}
                                list={reservationList}
                                selectedID={selectedID}
                                setSelectedID={setSelectedID}
                                getList={getList}
                                />
                                </div>
                             </>
          );

}



export default ReservationsPage;