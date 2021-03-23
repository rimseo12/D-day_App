import { endPoint } from './config'
import axios from 'axios'

export const getProducts = async() => {
  return await axios.get(endPoint)
}