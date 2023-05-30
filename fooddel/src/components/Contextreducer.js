import React, { createContext, useContext, useReducer } from 'react'

const Cartstatecontext = createContext();
const Cartdispatchcontext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

            case "UPDATE":
                let arr=[...state]
                console.log(arr);
                arr.find((a,idx)=>{
                  console.log(a,action);
                  if(a.id===action.id)
                  {
                      console.log('updated',action, a);
                      arr[idx]={...a, qty:(parseInt(action.qty)+a.qty), price:(action.price+a.price)} // a is the array jo abhi tk cart m prda tha and action contains the updated object's details
                  }
              })
                return arr

        
        default:
            console.log("error")
    }
}

export const Cartprovider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []);

    return (
        <Cartdispatchcontext.Provider value={dispatch}>
            <Cartstatecontext.Provider value={state}>
                {children}
            </Cartstatecontext.Provider>
        </Cartdispatchcontext.Provider>

    )
}

export const Usecart = () => useContext(Cartstatecontext);
export const Usedispatch = () => useContext(Cartdispatchcontext);