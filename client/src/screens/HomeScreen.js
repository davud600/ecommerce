import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default function HomeScreen() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/api/products')
      setProducts(res.data)
    }

    fetchData()
  }, [])
  console.log(products)

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info">
              <Link to={`/product/${product.slug}`}>
                <p> {product.name}</p>
              </Link>
              <p>
                <strong> {product.price}</strong>
              </p>
              <button>Add to cart</button>
            </div>
          </div>
        ))}{' '}
      </div>
    </div>
  )
}
