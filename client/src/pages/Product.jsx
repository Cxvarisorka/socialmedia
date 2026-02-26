import { Navigate, useParams } from "react-router"
import { useProduct } from "../context/ProductContext";

const Product = () => {
    const { id } = useParams();
    const { products } = useProduct();

    if(!id) {
        return <Navigate to={'/products'} />
    }

    const product = products.find(p => p._id == id);

    return (
        <div key={product._id}>
            <h3>{product.name}</h3>
            <img src={product.img} width={300} />
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>           
        </div>
    )
};

export default Product;