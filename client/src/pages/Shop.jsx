import { useNavigate } from "react-router";
import { useProduct } from "../context/ProductContext"

const Shop = () => {
    const { products } = useProduct();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Catalog</h1>
            <div>
                {
                    products.map(product => {
                        return (
                            <div key={product._id}>
                                <h3>{product.name}</h3>
                                <img src={product.img} width={300} />
                                <button onClick={() => navigate(`/products/${product._id}`)}>See More</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Shop;