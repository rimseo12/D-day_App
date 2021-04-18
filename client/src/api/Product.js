import { endPoint, configForUploadImg } from './config'
import axios from 'axios'

export const getProducts = async () => {
  return await axios.get(endPoint.products)
}

export const uploadProductImage = async (formData) => {
  const res = await axios.post(endPoint.upload, formData, configForUploadImg)
  return res
}

export const postProduct = async (product_name, image, exp_date) => {
  return await axios.post(endPoint.products, {
    name: product_name,
    image_url: image,
    expiration_date: exp_date,
  })
}

export const modifyProduct = async (product_id, product_name, image, exp_date) => {
  return await axios.put(`${endPoint.products}/${product_id}`, {
    name: product_name,
    image_url: image,
    expiration_date: exp_date,
  })
}

export const deleteProduct = async (product_id) => {
  return await axios.put(`${endPoint.products}/${product_id}`, {
    status: 'inactive',
  })
}

export const deleteForever = async (products) => {
  for (let id of products) {
    await axios.delete(`${endPoint.products}/${id}`)
  }
}

export const deleteIndividual = async (product_id) => {
  return await axios.delete(`${endPoint.products}/${product_id}`)
}

export const moveToHome = async (products) => {
  for (let id of products) {
    await axios.put(`${endPoint.products}/${id}`, {
      status: 'active',
    })
  }
}
