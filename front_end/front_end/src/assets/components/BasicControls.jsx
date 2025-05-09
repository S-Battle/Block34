import React, {useState} from  "react";



const BasicControls = ({ name, list, setList, selectedID, selectedName, addFunction, modifyFunction, deleteFunction }) => {
    const [inputValue, setInputValue ] = useState("");
    const [selectedItem, setSelectedItem ] = useState("");
    


    const handleAdd = (e) => {
        addFunction(inputValue);
    };
    const handleModify = (e) => {
        modifyFunction(inputValue)
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
                                
                                <div className="basicControlsInputs">
                                    <label htmlFor="inp"><div>NAME</div> <div><input id="inp" value={inputValue} onChange={ async(e)=>{
                                        let newValue = e.target.value 
                                        setInputValue(()=>newValue)
                                    }} />
                                    </div></label>
                                    
                                </div>
                                <div className="selectedInfo">
                                <div><div>ID:</div>  {selectedID}</div>
                               <div><div>NAME:</div> {selectedName}</div>
                                </div>
                                
                             </div>

                             </>
          );

}



export default BasicControls;