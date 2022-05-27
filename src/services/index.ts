import axios from 'axios'
import { ProductService } from './productService'

export default {
  productService: new ProductService(axios)
}
