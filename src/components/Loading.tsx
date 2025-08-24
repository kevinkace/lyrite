// Loading.tsx
import React from 'react';
import css from './Loading.module.css';

interface LoadingProps {
    message?: string;
}

const Loading: React.FC<LoadingProps> = () => (
    <div className={css.container}>
        <div className={css.loader} />
    </div>
);

export default Loading;
