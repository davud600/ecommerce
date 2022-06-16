import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import axios from 'axios'
import Rating from './Rating'
import {Store} from '../Store'

export default function Product(props) {
  const {product} = props

  const {state, dispatch: ctxDispatch} = useContext(Store)
  const {
    cart: {cartItems},
  } = state

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const {data} = await axios.get(
      `http://localhost:5000/api/products/${item._id}`
    )

    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock!')
      return
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: {...item, quantity},
    })
  }

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img
          className="card-image-top"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title> {product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)} variant="primary">
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}
