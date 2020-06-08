import React from 'react';
import Layout from 'components/Layout';
import { useTags } from 'useTags'

const ReportForm = () => {
    const { tags, setTags } = useTags()

    return (
        <Layout>
            {tags}
            <button onClick={() => { setTags([...tags, '1111']) }}>111</button>
            <hr></hr>
            <ul>
                {tags.map(tag => (
                    <li
                        key={tag}
                    >
                        {tag}
                    </li>
                ))}
            </ul>
            这是ReportForm组件
        </Layout>
    )
}

export default ReportForm