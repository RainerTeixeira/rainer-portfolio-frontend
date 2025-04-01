import React from 'react';

// Interfaces para tipos
interface Subcategory {
    id: number;
    name: string;
    description: string;
}

interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
}

interface AsideProps {
    categories: Category[];
}

// Estilos constantes
const ASIDE_STYLES = {
    container: {
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        width: '250px',
    },
    link: {
        textDecoration: 'none',
        color: '#333',
    },
};

const Aside = ({ categories }: AsideProps) => {
    return (
        <aside style={ASIDE_STYLES.container}>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <a href="#" style={ASIDE_STYLES.link}>
                            {category.name}
                        </a>
                        <ul>
                            {category.subcategories.map((subcategory) => (
                                <li key={subcategory.id}>
                                    <a href="#" style={ASIDE_STYLES.link}>
                                        {subcategory.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Aside;
