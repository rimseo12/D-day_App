import { useEffect, useState, Fragment } from "react"
import { Input } from 'antd'
import  debounce from '../../../../util/debounce'


const SEARCH_STORAGE_KEY = 'keywords'
function LocalStorage() {
    //key는 상수로 따로 빼기 

    //keyWord는 input value 가져오기
    //빈값 유무 확인이랑 debounce 설정하기

    const [keyWord, setKeyWord] = useState(
      () => JSON.parse(window.localStorage.getItem(SEARCH_STORAGE_KEY)) 
    )

    useEffect(() => {
      window.localStorage.setItem(SEARCH_STORAGE_KEY, JSON.stringify(keyWord))
    },[keyWord, setKeyWord])
    
    const handleGetKeyWord = (e) => {
        debounce(() => {
            alert("tada"+ e.target.value)  
        },1000)
        

 
    }

    return(
        <Fragment>
            <Input.Search 
              size="large" 
              placeholder="Search here" 
              enterButton 
              style={{ marginBottom: 10 }}
              onKeyUp={handleGetKeyWord} 
            />
        </Fragment>
        
    )

}

export default LocalStorage
