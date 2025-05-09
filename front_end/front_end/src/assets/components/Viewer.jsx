import React, {useState, useEffect} from  "react";



const Viewer = ({type, setList, list, selectedID, selectedName, setName, setID}) => {
    

    const handleClick = async (name, id)=>{
        console.log(name)
        console.log(id)
        await setName(name)
        await setID(id)
    }

    useEffect(()=>{
        const getList = async ()=>{
            const response = await fetch(`http://localhost:4444/api/${type}`);
            const data = await response.json();
            
            await setList(data, type)
            console.log(list)
        }
        getList();
    },[])

    const displayList = ()=>{

       list.map((thing, number) => {
            return  <div id={number}>
                    <h1>{thing}</h1>
                    {thing.name}
                    here
                    {thing.id}
                </div>            
        })
    }



          return(
                             <>
                             <div className="viewerView">                                
                               {list.map((name, number) =>{

                                return <div key={number} style={{border: "solid black 2px", borderRadius: "2rem", width: "80%", paddingLeft:"2rem", paddingRight:"2rem", height: "10rem"}} onClick={()=>{handleClick(name.name, name.id)}} >
                                        <div style={{}}><h2 style={{}}>NAME: {name.name}</h2></div>
                                        <div style={{}}><h2 style={{}}>ID: {name.id}</h2></div>                                       
                                        </div>})}
                                        
                            </div>
                             </>
          );

}



export default Viewer;