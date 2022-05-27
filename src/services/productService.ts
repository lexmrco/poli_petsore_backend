import { AxiosStatic } from 'axios'
import { Product } from "@/domain/entity";
import { Observable } from "rxjs";
export class ProductService {
  axios: AxiosStatic
  baseUrl: string

  constructor (axios: AxiosStatic) {
    this.axios = axios
    // this.baseUrl = process.env.API_URL
    this.baseUrl = 'http://localhost:5000'
  }

  async getItems () {
    return this.axios.get(`${this.baseUrl}/products`)
  }
}
