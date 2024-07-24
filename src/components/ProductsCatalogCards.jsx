import React from 'react'
import { Card, Button, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom' 
// import PropTypes from 'prop-types';

const ProductsCatalogCards = ({productProp}) => {

    const { _id, name, description, price } = productProp;

  return (
    <>
      <Card style={{width: '20rem'}}>
          <Card.Body className='d-flex flex-column gap-2'>
              <Card.Title className=' text-primary fs-2 text-center'>{name}</Card.Title>
              <Card.Subtitle className='fs-4'>Description:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Text className=' fs-4 text-danger'>Php {price}</Card.Text>
              <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
          </Card.Body>
      </Card>
    </>
  )
}

export default ProductsCatalogCards
