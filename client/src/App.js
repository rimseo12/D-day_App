import './App.css'
import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Button } from 'antd'
import axios from 'axios'
import Home from './pages/home/components/Home'
import Trash from './pages/sub/components/TrashList'
import LeftMenu from './pages/menu/LeftMenu'
import ExampleModal from './pages/home/components/shared/ModalLayout'
import ProductList from './pages/home/components/shared/ProductList'
import { ConsoleSqlOutlined } from '@ant-design/icons'

function App() {
  const [ProductList, setProductList] = useState([])
  const handleClick = async () => {
    const ProductObject = await axios.get("/products")
    console.log(ProductObject.data)
    setProductList(ProductObject.data)
  }

  const [PhotoName, setPhotoName] = useState('')
  const handleChange = (e) => {

    setPhotoName(e.target.files[0])
    console.log("result" + JSON.stringify(e.target.files[0]))
  }

  const handleUpload = async (e) => {
    const formData = new FormData()
    formData.append("imageName", PhotoName) 
    
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }

    const response = await axios.post("/upload", formData, config)
    console.log(response)
    PhotoName(response)

  }

  const handleSubmit = async () => {
    await axios.post("/product/add", {
      name: document.querySelector("#PN").value,
      image_url: "1616045492054-kakaotalk_20210218_144526418.jpg", //파일명.확장자 
      expiration_date: document.querySelector("#ED").value
    })
    console.log('Received values of form')
  }

  return (
    <div className="App">
        <LeftMenu/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/trash" component={Trash}/>
        </Switch>
        
        

      <header className="App-header">

        <ExampleModal />
        ===========================================================================
        {/* <form onSubmit={handleSubmit}>
          상품명:<input type="text" name="name" id="PN" style={{ color: 'black' }} /> <br />

          파일 업로드:<input type="file" name="image_url" onChange={handleChange} style={{ color: 'black' }} />
          <button onClick={handleUpload}>업로드</button>
          <br />

          유효기간:<input readOnly value="2021/03/18" name="expiration_date" id="ED" style={{ color: 'black' }} />
          <br />
          <button type="submit" style={{ color: "red" }}>생성</button>
        </form> */}
        ===========================================================================
        <button onClick={handleClick}>
          리스트 불러오기!
        </button>
        {ProductList &&
          ProductList
            .filter((itme) => (itme.status === "active"))
            .map((item, index) => (
              <div key={index} id={index} style={{ display: 'inline-flex' }}>
                <b>{item.name}</b> <span>{item.image_url}</span> <span>{item.expiration_date}</span>
                <div style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                  <ExampleModal
                    product_id={item._id}
                    productName={item.name}
                    productImage={item.image_url}
                    productExp={item.expiration_date}
                  />
                  <Button type="primary" onClick={async () => {
                    console.log("dd")
                    //await axios.delete(`http://localhost:8080/products/${item._id}`); 
                    const res = await axios.put(`/products/${item._id}`, {
                      status: "inactive"
                    })
                  }}>
                    delete
                  </Button>

                </div>

              </div>
            ))}







      </header>
    </div>
  );
}

export default App;
