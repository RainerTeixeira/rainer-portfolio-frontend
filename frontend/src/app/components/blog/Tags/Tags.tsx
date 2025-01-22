import React from 'react';

const Tags = () => {
    const tags = ['React', 'Next.js', 'JavaScript', 'Node.js'];

    return (
        <div>
            <h3>Tags:</h3>
            <ul>
                {tags.map((tag, index) => (
                    <li key={index}><button>{tag}</button></li>
                ))}
            </ul>
        </div>
    );
};

export default Tags;
