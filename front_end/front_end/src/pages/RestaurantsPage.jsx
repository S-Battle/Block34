import React, {useState} from  "react";
import BasicControls from "../assets/components/BasicControls";
import Viewer from "../assets/components/Viewer";



const RestaurantsPage = ({list, setList}) => {
const [selectedID, setSelectedID] = useState("");
const [selectedName, setSelectedName] = useState("");

const regenerateList = async ()=>{
    const getList = async ()=>{
        const response = await fetch(`http://localhost:4444/api/restaurant`);
        const data = await response.json();        
        await setList(data, "customer")
        console.log(list)    
    }
    getList();
}



const addFunction = async (inputValue)=>{
    console.log(inputValue);
    const getList = async ()=>{
        if(inputValue == ""){

            console.log("NO");
            window.alert("Please enter the name in the \"NAME\" field")
            return ;
        }
        const data = {"name": inputValue};
        console.log(data)
        const response = await fetch(`http://localhost:4444/api/restaurant/add/${inputValue}`,{
            method:"POST",
            header: {"Content-Type" : "application/json"},            
        });        
    }
    await getList(); 
    await regenerateList();   
};
const modifyFunction = async (inputValue)=>{
    console.log(inputValue)
    if(inputValue == ""){
        console.log("NO");
        window.alert("Please enter the name of the restaurant in the \"NAME\" field")
        return ;
    }
    if(selectedID == ""){
        console.log("NO");
        window.alert("Please select a customer to modify.")
        return ;
    }
    const response = await fetch(`http://localhost:4444/api/restaurant/modify/${inputValue}/${selectedID}`,{
        method:"PUT",
        header: {"Content-Type" : "application/json"},
    })
    await regenerateList();

}
const deleteFunction = async()=>{
    if(selectedID == ""){
        console.log("NO");
        window.alert("Please select a restaurant to delete.")
        return ;
    }
    console.log(selectedID);
    const response = await fetch(`http://localhost:4444/api/restaurant/delete/${selectedID}`,{
        method:"DELETE",
        header: {"Content-Type" : "application/json"},
    })
    await regenerateList();
}

const setID = (id) => {
    setSelectedID(()=>{
        return id;
    })
};
const setName = (name) => {
    setSelectedName(()=>{
        return name;
    })
};











          return(
                             <>
                                
                                <div className="openScope">
                                <BasicControls 
                                name="RESTAURANTS"
                                list={list}
                                setList={setList} 
                                selectedID={selectedID}
                                selectedName={selectedName}
                                addFunction={addFunction}
                                modifyFunction={modifyFunction}
                                deleteFunction={deleteFunction}                               
                                />
                                <Viewer 
                                type="restaurant"
                                setList = {setList}
                                list={list}
                                selectedID={selectedID}
                                selectedName={selectedName}
                                setID={setID}
                                setName={setName} 
                                /> 
                                </div>
                             </>
          );

}



export default RestaurantsPage;