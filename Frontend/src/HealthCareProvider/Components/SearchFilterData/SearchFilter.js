import React, { useEffect, useState } from 'react'

const SearchFilter = ({startLength, filterData}) => {

 const [isMax, setIsMax] = useState(startLength);
 const [items, setItems] = useState([])
 

const handleInputChange = (e) => {
//    console.log(e, "ekkkkk")
}

useEffect(() => {
   setItems(filterData)
   
})

  return (
   <>
     <div className="input-group input-group-sm input-group-inline">
            <span className="input-group-text pe-2">
                 <i className="bi bi-search"></i>
            </span>
         <input type="text" className="form-control" placeholder="Search" aria-label="Search" spellCheck={false}
         onChange={(e) => handleInputChange (e)}/>
    </div>
   </>
  )
}

export default SearchFilter