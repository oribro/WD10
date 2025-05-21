import './ProductCard.css';

type ProductProps = {
    productName: string;
    productDescription: string;
    price: string;
};

export const ProductCard: React.FC<ProductProps> = ({ productName, productDescription, price }) => {
    return (
        <>
            <div className="product-card">
                <h3>{productName}</h3>
                <p>{productDescription}</p>
                <p>Price: {price}</p>
            </div>
        </>
    )
}
