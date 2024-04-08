import { SearchOutlined } from '@mui/icons-material'
import React from 'react'
import { styled } from 'styled-components'

const SearchBar = () => {
    return (
        <Container>
            <SearchBarContainer>
                <SearchOutlined />
                <input
                placeholder='Search with Prompt or name.....'
                    style={{
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        color:'inherit',
                        fontSize:"20px",
                        background: 'transparent',
                    }}
                />
            </SearchBarContainer>
        </Container>
    )
}

const SearchBarContainer = styled.div`
    display: flex;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.text_secondary + '90'}; /* Changed from ${({ theme }) => theme.text_secondary+90}; */
    color: ${({ theme }) => theme.text_primary + '90'}; /* Changed from ${({ theme }) => theme.text_primary+90}; */
    border-radius: 8px;
    padding: 12px 26px;
    cursor: pointer;
    gap: 6px;
    align-items: center;
`

const Container = styled.div``

export default SearchBar
