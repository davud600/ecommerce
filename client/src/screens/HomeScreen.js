import {useEffect, useReducer} from 'react'
import {Row, Col} from 'react-bootstrap'
import {Helmet} from 'react-helmet-async'
import {getError} from '../utils'
import axios from 'axios'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

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
        dispatch({type: 'FETCH_FAIL', payload: getError(err)})
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col sm={6} md={4} lg={3} className="mb-3" key={product.slug}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}{' '}
      </div>
    </div>
  )
}
