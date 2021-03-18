import './App.css'
import React, { Fragment, useState } from 'react'
import axios from 'axios'
import ExampleModal from './pages/home/components/shared/ModalLayout'
import ProductList from './pages/home/components/shared/ProductList'

function App() {
  const [ProductList, setProductList] = useState([])
  const handleClick = async() => {
      const ProductObject = await axios.get("/products")
      .then((res) => { 
        console.log(res.data)
        setProductList([res.data])
        //alert("불러오기"); 
      })
      //버그발견: 계속 호출해서 가져온다. 누적 값이 생긴다.
      //setProductList([...ProductList,...ProductObject])  
      
  }
  
  const [PhotoName, setPhotoName] = useState('')
  const handleChange = (e) => {
    
    setPhotoName(e.target.files[0])
    console.log("result"+e.target.files[0])
  }

  const handleUpload = async(e) => {
    console.log("processing...")
    const formData = new FormData()
    formData.append("image_url", PhotoName)

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }

    await axios.post("/upload", formData, config)
    .then((response) => {
    console.log(response);
    })
    .catch((error) => {
    console.log(error);
    }) 

  }

  const handleSubmit = async() => {
    await axios.post("/product/add", {
        name: document.querySelector("#PN").value,
        image_url:"1616045492054-kakaotalk_20210218_144526418.jpg", //파일명.확장자 
        expiration_date: document.querySelector("#ED").value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    console.log('Received values of form')
  }
  
  return (
    <div className="App">
      <header className="App-header">
       
        
        {/* <ExampleModal/> */}

        <form onSubmit={handleSubmit}>
          상품명:<input type="text" name="name" id="PN" style={{color:'black'}}/> <br/>

          파일 업로드:<input type="file" name="image_url" onChange={handleChange} style={{color:'black'}} />
          <button onClick={handleUpload}>업로드</button>
          <br/>

          유효기간:<input readOnly value="2021/03/18" name="expiration_date" id="ED" style={{color:'black'}}/> 
          <br/>
          <button type="submit" style={{color:"red"}}>생성</button>
        </form>
        
        <button onClick={handleClick}>
         리스트 불러오기!
        </button>
        {ProductList && ProductList.map((item, index) => (
          //item 정보를 불러오지 못함.
            <div key={index} id={index}>
              <b>{item.name}</b> <span>{item._id}</span> 
            <button onClick={async () => {
              const result = await axios.delete(`http://localhost:8080/products/${item._id}`); 
            }}>
              삭제
            </button>
            
            </div>
            
        ))}
        
      
        

        
        

      </header>
    </div>
  );
}

export default App;
