import {useEffect, useReducer} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true}
    case 'FETCH_SUCCESS':
      return {...state, products: action.payload, loading: false}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

export default function HomeScreen() {
  const [{loading, error, products}, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'})
      try {
        const res = await axios.get('http://localhost:5000/api/products')
        dispatch({type: 'FETCH_SUCCESS', payload: res.data})
      } catch (err) {
        dispatch({type: 'FETCH_FAIL', payload: err.message})
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          products.map((product) => (
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
          ))
        )}{' '}
      </div>
    </div>
  )
}
