import {useState,useEffect,useContext,createContext} from 'react'


export const contexto = createContext()



export const ComponenteContexto = ({children}) => {

    const [global, setGlobal] = useState({name:"jhon"});



    return (
      <contexto.Provider value={{...global,setGlobal}} >
        {children}
      </contexto.Provider>
    )
  }
  