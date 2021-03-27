import { List, Avatar, Button, Skeleton } from 'antd'

function ProductCard() {
  return(
   
    
    <List itemLayout="horizontal">
        <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            
              <List.Item.Meta
                avatar={
                  <img src={'uploads/noImage.png'} style={{ height: 100 }} />
                }
                title={<a href="https://ant.design">title</a>}
                description="2021-03-26"
              />
            
          </List.Item>
    </List>
  )
}

export default ProductCard
