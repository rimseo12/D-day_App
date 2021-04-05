import { Modal, Input, DatePicker, Form } from 'antd'
import 'antd/dist/antd.css'
import moment from 'moment'
import styled from 'styled-components'

const ImgCustomize = styled.div`
  img {
    width: 100px;
    height: 100px;
  }
`;

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
  //const newDateFormat = moment(productExp).format(dateFormat)

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
            if (product_id) {
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
          expiration_date: moment(productExp)
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
          <Input />
        </Form.Item>
        <Form.Item
          name="image_url"
          label="image_url">
          {
            productImage && '기존 이미지:' &&
            <ImgCustomize><img name="image_url" src={`uploads/${productImage}`} /></ImgCustomize>
          }
          <Input onChange={onUpload} type="file" id="img_url" />
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
          <DatePicker format={dateFormat} />
          {/* {
            productExp ?
              <DatePicker
                format={dateFormat}
              />
              : <DatePicker />
          } */}

        </Form.Item>
      </Form>
    </Modal>

  )
}



export default CreateForm
