import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

const HistoryContainer = styled.div`
  padding: 18px;
  border: 0.0625rem solid #D7E2EB; 
  border-radius: 0.25rem;
`
const HeaderContainer = styled.div`
  overflow: hidden;
`
const Title = styled.span`
  float: left;
  font-weight: 400;
  color: #666;
`
const RemoveText = styled.span`
  float: right;
  color: #1890ff;
`

const ListContainer = styled.ul`
  margin: 10px 0;
`

//&는 자기 자신을 나타냄
//즉, 나 자신(li)들에서 마지막 요소 값을 제외한 값에 margin-bottom 속성 지정
const KeywordContainer = styled.li`
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const RemoveButton = styled.button`
  //float: right;
  margin-left: 10px;
  color: #0cde8b;
  border: 1px solid #0cde8b;
  padding: 3px 5px;
  border-radius: 15px;
`

const Keyword = styled.span`
  font-size: 18px;
  font-weight: 400;
`

function SearchHistory({ keywords, onQuickSearch, onRemoveKeyword, onClearKeywords }) {
  if (keywords.length === 0) {
    return <HistoryContainer>최근 검색된 기록이 없습니다.</HistoryContainer>
  }
  return (
    <HistoryContainer>
      <HeaderContainer>
        {/* <Title>최근 검색어</Title> */}
        <RemoveText onClick={onClearKeywords}>전체삭제</RemoveText>
      </HeaderContainer>
      <ListContainer>
        {keywords.map(({ id, text }) => {
          return (
            <KeywordContainer key={id}>
              <Keyword onClick={() => { onQuickSearch(text) }}><a href="#">{text}</a></Keyword>
              <RemoveButton
                onClick={() => {
                  onRemoveKeyword(id)
                }}
              >
                삭제
              </RemoveButton>
            </KeywordContainer>
          )
        })}
      </ListContainer>
    </HistoryContainer>
  )
}

export default SearchHistory