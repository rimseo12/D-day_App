import { useState } from 'react'
import axios from 'axios'
import { Modal, Button, Input, Upload, message, DatePicker, Form} from 'antd'
import { AlertTwoTone, UploadOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import moment from 'moment'



const CreateForm = ({ product_id, productName, productImage, productExp, visible, onCreate, onCancel, onUpload, onModify}) => {
  const [form] = Form.useForm()
  const dateFormat = 'YYYY/MM/DD' 
    
    if(product_id){
      return(
        <Modal
        visible={visible}
        title="Modify"
        okText="Modify"
        cancelText="Cancel"
        onUpload={onUpload}
        onModify={onModify}
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields()
              onModify(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item
            name="name"
            label="name"
            rules={[
              {
                required: true,
                message: '상품명을 등록해주세요!',
              },
            ]}
          >
            <Input type="text" defaultValue={productName}/>
          </Form.Item>
          <Form.Item name="image_url" label="image_url">
              기존 이미지: <input type="text" defaultValue={productImage}/>
              <input  onChange={onUpload} type="file" name="image_url" style={{ color: 'black' }} />
          </Form.Item>
          <Form.Item name="expiration_date" label="expiration_date">
               <DatePicker defaultValue={moment(productExp, dateFormat)} format={dateFormat} />
          </Form.Item>
        </Form>
      </Modal>

      )
    } else {
    return (
      <Modal
        visible={visible}
        title="Add Product"
        okText="Create"
        cancelText="Cancel"
        onUpload={onUpload}
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields()
              onCreate(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item
            name="name"
            label="name"
            rules={[
              {
                required: true,
                message: '상품명을 등록해주세요!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="image_url" label="image_url">
              <input  onChange={onUpload} type="file" name="image_url" style={{ color: 'black' }} />
          </Form.Item>
          <Form.Item name="expiration_date" label="expiration_date">
              <DatePicker defaultValue={moment('2021/03/16', dateFormat)} format={dateFormat} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
  
  const ExampleModal = (props) => {
    const [visible, setVisible] = useState(false)
    const [ProductSingleInfo, setProductSingleInfo] = useState([])
    let Image = null
    const onUpload = (e) => { 
      if(e.target.id === "image_url"){
        handleUpload(e.target.files[0])
      }
    }
    const handleUpload = async (fileName) => {
      const formData = new FormData()
      formData.append("imageName", fileName) //name === route/index.js single()함수 파라미터
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      }
     
      const response = await axios.post("/upload", formData, config)
      if(response.status === 200){
        console.log(response) 
        console.log(response.data.data.filename)
        Image = response.data.data.filename
      }
      
    }
    //등록하기
    const onCreate = async(values) => {
      console.log('Received values of form: ', values, Image)
      await axios.post("/product/add", {
          name: values.name,
          image_url: Image,
          expiration_date: moment.utc(values.expiration_date)
      })
      alert("등록 완료")
      setVisible(false)
    }
    
    //수정하기
    const onModify = async(values) => {
      console.log('Received values of form: ', values, Image)
      await axios.put(`/products/${props.product_id}`, {
        name: values.name,
        image_url: Image,
        expiration_date: moment.utc(values.expiration_date)
      })
      alert("수정 완료")
      setVisible(false)
    }
    if(props.product_id) {
      return(
        <div>
          <Button
            type="primary"
            onClick={() =>{
              setVisible(true)
            }}
          >
            Modify
          </Button>
          <CreateForm
            visible={visible}
            product_id={props.product_id}
            productName={props.productName}
            productImage={props.productImage}
            productExp={props.productExp}
            onUpload={onUpload}
            onModify={onModify}
            onCancel={() => {
              setVisible(false)
            }}
          />
        </div>
      )
    } else {
      return (
        <div>
  
          <Button
            type="primary"
            onClick={() => {
              setVisible(true)
            }}
          >
            Add Product
          </Button>
          <CreateForm
            visible={visible}
            onUpload={onUpload}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false)
            }}
          />
        </div>
      )
    }
   
  }

export default ExampleModal
