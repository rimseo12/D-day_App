import './App.css'
import React, { Fragment, useState } from 'react'
import axios from 'axios'
import ExampleModal from './pages/home/components/shared/ModalLayout'
import ProductList from './pages/home/components/shared/ProductList'

function App() {
  const [ProductList, setProductList] = useState([])
  const handleClick = async() => {
    try {
      const res = await axios.get("/products")
      
      if(res){
        console.log("결과:"+ JSON.stringify(res.data))

        setProductList([...ProductList, JSON.stringify(...res.data)])
      } else {
        throw new Error(`뭔가 잘못 되었습니다! status code: ${res.status}`)
      }
    } catch (error) {
      throw new Error(`서버 통신 중 에러 발생: ${error.message}`)
    }
  }
  const handleDelete = async(product_id) => {
    try {
      const res = await axios.delete(`/products?product_id=${product_id}`)
      if(res){
        console.log("성공")
        setProductList([])
      } else {
        throw new Error(`status code: ${res.status}`)
      }
    } catch (error) {
      throw new Error(`서버 통신 중 에러 발생: ${error.message}`)
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
       
        
        <ExampleModal/>
        <button onClick={handleClick}>
     
         리스트 불러오기!
        </button>
        {ProductList && ProductList.map((item, index) => (
            <div key={index}>
              {item} 
            <button onClick={async () => {
              const result = await axios.delete(`http://localhost:8080/products/${item._id}`);
              console.log(result);
            }}>삭제</button>
            </div>
            
        ))}

        
        

      </header>
    </div>
  );
}

export default App;
