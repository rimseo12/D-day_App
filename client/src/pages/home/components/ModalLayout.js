import { Modal, Input, DatePicker, Form, Upload, Button } from 'antd'
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
  visible, 
  onCreate, 
  onCancel, 
  onUpload, 
  onModify }) => {
  const [form] = Form.useForm()
  const dateFormat = 'YYYY/MM/DD'
  //const newDateFormat = productExp? moment(productExp, dateFormat) : "Select date"
  
  return (
    <Modal
      visible={visible}
      title={title}
      okText={okText}
      cancelText={cancelText}
      onCreate={onCreate}
      onUpload={onUpload}
      onModify={onModify}
      onCancel={() => {
        onCancel()
        form.resetFields()
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            if(product_id){
              //console.log(values)
              onModify(values, product_id)  
            } else {
              onCreate(values)
              form.resetFields()
            }
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name='form_in_modal'
        initialValues={{
          name: productName,
          image_url: productImage,
        }}
      >
        <Form.Item
          name="name"
          label="name"
          rules={[
            {
              required: true,
              message: '상품명을 등록해주세요!'
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item name="image_url" label="image_url">
          {productImage && '기존 이미지:' && <img name="image_url" src={`uploads/${productImage}`} style={{ width: 100, height: 100 }} />}
          <Input onChange={onUpload} type="file" id="image_url" style={{ color: 'black' }} />
        </Form.Item>
        <Form.Item 
          name="expiration_date" 
          label="expiration_date"
          rules={[
            {
              required: true,
              message: '날짜를 선택해주세요!'
            },
          ]}
        > 
        {
          productExp? <DatePicker defaultValue={moment(productExp, dateFormat)}/> : <DatePicker/>
        }     
          
        </Form.Item>
      </Form>
    </Modal>

  )
}



export default CreateForm
