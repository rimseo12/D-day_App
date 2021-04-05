import { useEffect, useState, Fragment } from "react"
import { Input } from 'antd'
import debounce from '../../../util/debounce'
import SearchHistory from './SearchHistory'
import styled from 'styled-components'

const InputSearch = styled.div`
  .ant-input-group-wrapper {
    margin-bottom: 10px;
  }
`;

const SEARCH_STORAGE_KEY = 'keywords'
function Search({ onChangekeyWord }) {
  const [keyWords, setKeyWords] = useState(
    JSON.parse(localStorage.getItem(SEARCH_STORAGE_KEY)) || []
  )

  //검색에 변화가 일어날때만 렌더링
  useEffect(() => {
    localStorage.setItem(SEARCH_STORAGE_KEY, JSON.stringify(keyWords))
  }, [keyWords])

  const handleGetKeyword = (e) => {
    debounce(() => {
      //로컬 저장소에 검색어 누적 저장 
      //빈값은 저장하지 않기
      let currentKeyWord = e.target.value
      if (currentKeyWord.trim() !== "") {
        const newKeyWord = {
          id: Date.now(),
          text: currentKeyWord
        }
        console.log("검색값:", newKeyWord)
        setKeyWords([newKeyWord, ...keyWords])

        onChangekeyWord(currentKeyWord)
      } else {
        onChangekeyWord(currentKeyWord)
      }

    }, 1000)
  }

  const handleQuickSearch = (text) => {
    //console.log(text)
    onChangekeyWord(text)
  }

  //검색어 삭제
  const handleRemoveKeyword = (id) => {
    console.log(id)
    const nextKeyWord = keyWords.filter((thisKeyword) => {
      return thisKeyword.id != id
    })
    setKeyWords(nextKeyWord)
  }

  //검색어 전체 삭제
  const handleClearKeywords = () => {
    setKeyWords([])
  }

  return (
    <Fragment>
      <InputSearch>
        <Input.Search
          size="large"
          placeholder="Search here"
          enterButton
          onKeyUp={handleGetKeyword}
        />
      </InputSearch>

      <SearchHistory
        keywords={keyWords}
        onQuickSearch={handleQuickSearch}
        onRemoveKeyword={handleRemoveKeyword}
        onClearKeywords={handleClearKeywords}
      />
    </Fragment>

  )

}

export default Search
