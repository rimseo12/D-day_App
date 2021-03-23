import { useState } from 'react'
import axios from 'axios'
import { Modal, Button, Input, Upload, message, DatePicker, Form } from 'antd'
import { AlertTwoTone, UploadOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import moment from 'moment'



const CreateForm = ({ 
  title,
  okText, 
  cancelText, 
  product_id, 
  productName, 
  productImage, 
  productExp,
  setVisibleForCreate, 
  visible, 
  onCreate, 
  onCancel, 
  onUpload, 
  onModify }) => {
  const [form] = Form.useForm()
  const dateFormat = 'YYYY/MM/DD'
  console.log(productName)

  return (
    <Modal
      visible={
        visible
      }
      title={title}
      okText={okText}
      cancelText={cancelText}
      onCreate={onCreate}
      onUpload={onUpload}
      onModify={onModify}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
            onModify(values, product_id)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
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
          <Input type="text" defaultValue={productName} />
        </Form.Item>
        <Form.Item name="image_url" label="image_url">
          기존 이미지: <input type="text" defaultValue={productImage} />
          <input onChange={onUpload} type="file" name="image_url" style={{ color: 'black' }} />
        </Form.Item>
        <Form.Item name="expiration_date" label="expiration_date">
          <DatePicker defaultValue={moment(productExp, dateFormat)} format={dateFormat} />
        </Form.Item>
      </Form>
    </Modal>

  )
}



export default CreateForm
