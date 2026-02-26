import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

const API_URL = 'http://localhost:3000/api'

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/product`);
            const result = await res.json();

            setProducts([...products, ...result])
        } catch(err) {
            console.log(err);
        }
    };

    // const getProduct = async (id, cb) => {
    //     try {
    //         const res = await fetch(`${API_URL}/product/${id}`);
    //         const result = await res.json();

    //         cb(result);
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    const deleteProduct = async (id) => {
        try {
            const res = await fetch(`${API_URL}/product/${id}`, {
                method: 'DELETE'
            });
            
            if(!res.ok){
                const result = await res.json();
                throw new Error(result.message);
            }

            setProducts(products.filter(p => p._id != id));
            alert('Product succsesfully deleted!');
        } catch(err) {
            console.log(err);
        }
    };

    const addProduct = async (data) => {
        try {
            const res = await fetch(`${API_URL}/product`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            }

            setProducts([...products, result]);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <ProductContext.Provider value={{addProduct, products, deleteProduct}}>
            {children}
        </ProductContext.Provider>
    )
};