export const baseUrl = 'https://d-day-api.herokuapp.com'
export const endPoint = {
  products: `${baseUrl}/products`,
  product: `${baseUrl}/product`,
  upload: `${baseUrl}/upload`,
}
export const configForUploadImg = {
  headers: {
    'content-type': 'multipart/form-data',
  },
}
