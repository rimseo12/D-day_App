import { Modal, Input, DatePicker, Form } from 'antd'
import 'antd/dist/antd.css'
import moment from 'moment'
import styled from 'styled-components'

const ImgCustomize = styled.div`
  img {
    width: 100px;
    height: 100px;
  }
`
function CreateForm({ title, okText, cancelText, productDetail, visible, onCreate, onCancel, onUpload,onModify }) { 
  const [form] = Form.useForm()
  const dateFormat = 'YYYY/MM/DD'
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
            if (productDetail) {
              onModify(values, productDetail._id)
            } else {
              onCreate(values)
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
        name="form_in_modal"
        initialValues={
          productDetail
          ? {
                name: productDetail.name,
                image_url: productDetail.image_url,
                expiration_date: moment(productDetail.expiration_date),
            } 
          : {}
        }
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: '상품명을 등록해주세요!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="image_url" label="Image">
          {productDetail && productDetail.image_url &&
           <ImgCustomize> <img name="image_url" src={`uploads/${productDetail.image_url}`} /> </ImgCustomize>
          }
          <Input onChange={onUpload} type="file" id="img_url" />
        </Form.Item>
        <Form.Item
          name="expiration_date"
          label="Expiration date"
          rules={[
            {
              required: true,
              message: '날짜를 선택해주세요!',
            },
          ]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default CreateForm
