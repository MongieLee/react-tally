import React from 'react';
import Layout from 'components/Layout';
import { useTags } from 'useTags'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from 'components/Icon'
const TagsList = styled.ul`
    background:white;
    font-size:16px;
    li{
        margin:0 16px;
        border-bottom:1px solid grey;
        a{
            display:flex;
            align-items:center;
            padding:10px 0;
            justify-content:space-between;
        }
    }
`
const Center = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    padding:20px 0;
    align-items:center;

`
const Button = styled.button`
    font-size:18px;
    border-radius:5px;
    padding:8px 12px;
    background:#f60;
    color:white;
    border:none;
`

const ReportForm = () => {
    const { tags} = useTags()

    return (
        <Layout>
            <TagsList>
                {tags.map(tag => (
                    <li
                        key={tag.id}
                    >
                        <Link to={`/tags/${tag.id}`}>
                            {tag.name}
                            <Icon name='right' />
                        </Link>
                    </li>
                ))}
            </TagsList>
            <Center>
                <Button>添加标签</Button>
            </Center>
        </Layout>
    )
}

export default ReportForm