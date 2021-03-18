import { useState } from 'react'
//import { Button, Form, Modal } from 'react-bootstrap'
//import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Button, Input, Upload, message, DatePicker, Form} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import moment from 'moment'

import axios from 'axios'


const CreateForm = ({ product_id, visible, onCreate, onCancel }) => {
    const [form] = Form.useForm()
    const dateFormat = 'YYYY/MM/DD'
    const fileUpload = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList)
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`)
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
          }
        },
      }

    if(product_id){
      return(
        <Modal
        visible={visible}
        title="Modify"
        //okText="Create"
        cancelText="Cancel"
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
            <Input type="text" defaultValue={product_id}/>
          </Form.Item>
          <Form.Item name="image_url" label="image_url">
            <Upload {...fileUpload}>
               <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="expiration_date" label="expiration_date">
               <DatePicker defaultValue={moment('2021/03/16', dateFormat)} format={dateFormat} />
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
            <Upload {...fileUpload}>
               <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
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
  
    const onCreate = async(values) => {
      await axios.post("/product/add", {
          name: values.name,
          expiration_date: moment.utc(values.expiration_date)
      })
      
      console.log('Received values of form: ', values)
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
            product_id={props.product_id}
            visible={visible}
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
