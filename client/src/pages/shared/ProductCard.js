import { List, Avatar, Button, Skeleton } from 'antd'

function ProductCard() {
  return(
   
    
    <List itemLayout="horizontal">
        <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} active>
              <List.Item.Meta
                avatar={
                  <Avatar />
                }
                title={<a href="https://ant.design">title</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
    </List>
  )
}

export default ProductCard
