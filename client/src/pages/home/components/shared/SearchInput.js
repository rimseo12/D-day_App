import { useEffect, useState, Fragment } from "react"
import { Input } from 'antd'
import  debounce from '../../../../util/debounce'
import ProductList from "./ProductList"


const SEARCH_STORAGE_KEY = 'keywords'
function Search({ keyWord }) {
    //key는 상수로 따로 빼기 

    //keyWord는 input value 내보내기
    //빈값 유무 확인이랑 debounce 설정하기

    const [words, setWords] = useState([]) 
    
    useEffect(() => {
      //로컬에 값이 존재하면 불러오기
      if(window.localStorage.length !== 0){
        console.log("here~")
        //setWords(JSON.parse(window.localStorage.getItem(SEARCH_STORAGE_KEY)))
      }
    },[])
    
    const handleGetKeyWord = (e) => {
      debounce(() => {
        //로컬 저장소에 검색어 누적 저장 //JSON.stringify({ a: 'b' }) 객체로 저장하기
        window.localStorage.setItem(SEARCH_STORAGE_KEY, JSON.stringify({ keyword: e.target.value}))
        setWords(JSON.stringify(e.target.value))
        keyWord(e.target.value)
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
            {
              words &&
              // words.map((word) => (
              //   <li class="keyword-item">{word}</li>
              // ))
              <li class="keyword-item">{words}</li>
            }
        </Fragment>
        
    )

}

export default Search
