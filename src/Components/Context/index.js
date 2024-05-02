import { useEffect, useRef } from "react";
import { createContext, useState } from "react";

const DataContext = createContext()


export const DataProvider = ({ children }) => {
    let existingCartItemsString = localStorage.getItem('CART_SESSION');
    let existingCartItems = existingCartItemsString ? JSON.parse(existingCartItemsString) : [];
    const [cartCount, setcartCount] = useState(0);
    const [cartsummary,setcartsummary]=useState('');
    const didMountRef=useRef(false)

    let carttotalData={
        totalmrp:0,
        quantity:0,
        discount:0,
        totalsellingprice:0,
        totalamount:0
    }

    existingCartItems.map((value,index)=>{
        carttotalData.totalmrp+=Number(value.product_price) * Number(value.quantity)
        // carttotalData.quantity+=value.quantity
        carttotalData.discount+=Number(value.product_discount) * Number(value.quantity)
        carttotalData.totalsellingprice+=Number(value.product_selling_price) * Number(value.quantity)
    })

    carttotalData.totalamount=Number(carttotalData.totalmrp) - Number(carttotalData.discount)
    
    const rerenderdata=()=>{
        setcartCount(existingCartItems.length)
        setcartsummary(carttotalData)
    }
    
    
    useEffect(() => {
        {
            rerenderdata();         
        }
    },[existingCartItemsString])

    return (
        <DataContext.Provider value={{ cartCount, setcartCount,cartsummary,setcartsummary,rerenderdata }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext; 