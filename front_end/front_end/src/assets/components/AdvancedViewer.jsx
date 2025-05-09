import React, {useState, useEffect} from  "react";



const AdvancedViewer = ({type, setList, list, selectedID, setSelectedID, getList, selectedName, setName, setID}) => {
    
    const [selectedDiv, setSelectedDiv] = useState(null);
    let slctDiv = [];
    let prntDivChil = [];
    const handleClick = async (id, e)=>{        
        //console.log(id)
        setSelectedID(()=>{
                return id;
        })




        slctDiv = await e.target.parentElement.parentElement;
        if (slctDiv.className == "goodClick"){
            prntDivChil = await e.target.parentElement.parentElement.parentElement.childNodes; 
            
            await prntDivChil.forEach((child, num) =>{
            child.style.backgroundColor = "white";
            child.style.color = "black";
            slctDiv.style.backgroundColor = "green";
            slctDiv.style.color = "white";
            }) 
        }
        else if (slctDiv.className == "openScope"){
            slctDiv = await e.target;
            prntDivChil = await e.target.parentElement.childNodes; 
            
            await prntDivChil.forEach((child, num) =>{
            child.style.backgroundColor = "white";
            child.style.color = "black";
            slctDiv.style.backgroundColor = "green";
            slctDiv.style.color = "white";
            }) 
        }

        console.log(slctDiv)
        // else if(slctDiv.className == "viewerView" ){
        //     slctDiv = await e.target.parentElement;
        //     prntDivChil = await e.target.parentElement.parentElement.childNodes;
        // }        
        // if(slctDiv.className == "openScope"){
        //     console.log("bad click")
        // }
        // else{console.log("good click")}
        // console.log(slctDiv)
        
        //  await slctDiv.forEach((div, num)=>{
        //     if(div.lastElementChild.innerText.slice(-36) == selectedID){
        //         console.log(div);
        //     }
        // })
        
    }
    
    useEffect(()=>{
        
        const asyncMaker = async()=>{
         await getList();
        } 
        asyncMaker();

    },[])

    useEffect(()=>{
        console.log("GOT HERE")
        slctDiv.forEach((div, num)=>{
            if(div.lastElementChild.innerText.slice(-36) == selectedID){
                
            }
        })
    }, [selectedID])


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

                                return <div className="goodClick" key={number} style={{alignContent:'center', border: "solid black 2px", borderRadius: "2rem", width: "80%", paddingLeft:"2rem", paddingRight:"2rem", minHeight: "15rem", backgroundColor: "white"}} onClick={(e)=>{handleClick(name.id, e)}} >
                                        <div style={{}}><h2 style={{margin: "0px"}}>NAME: {name.name}</h2></div>
                                        <div style={{}}><h2 style={{margin: "0px"}}>RESTAURANT: {name.restaurant}</h2></div>
                                        <div style={{}}><h2 style={{margin: "0px"}}>DATE: {name.date.slice(0,10)}</h2></div>
                                        <div style={{}}><h2 style={{margin: "0px"}}>PARTY COUNT: {name.party_count}</h2></div>
                                        <div style={{}}><h2 style={{margin: "0px"}}>ID: {name.id}</h2></div>                                       
                                        </div>})}
                                        
                            </div>
                             </>
          );

}

export default AdvancedViewer;