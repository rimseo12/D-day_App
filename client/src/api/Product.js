import { endPoint, config } from './config'
import axios from 'axios'
import moment from 'moment'

export const getProducts = async() => {
  return await axios.get(endPoint)
}

export const uploadProductImage = async(formData) => {
  const res = await axios.post("/upload", formData, config)
  if(res.status === 200){
    return res.data.data.filename
  }
}

export const postProduct = async(values, image) => {
  return await axios.post("/product/add",{
    name: values.name,
    image_url: image,
    expiration_date: moment.utc(values.expiration_date)
  })
}

export const modifyProduct = async(values, product_id, image) => {
  return await axios.put(`/products/${product_id}`, {
    name: values.name,
    image_url: image,
    expiration_date: moment.utc(values.expiration_date)
  })
}

export const deleteProduct = async(product_id) => {
  return await axios.put(`/products/${product_id}`, {
    status: "inactive"
  })
}

export const deleteForever = async(product_id) => {
  return await axios.delete(`/products/${product_id}`)
}