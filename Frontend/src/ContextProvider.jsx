import React ,{createContext, useContext} from 'react'


let Context = createContext({})

export default function ContextProvider(props) {

    
  return (
    <Context.Provider value={{}}>{props.children}</Context.Provider>
  )
}

export let useContextProvider = () => useContext(Context)
