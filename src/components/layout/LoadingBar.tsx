"use client";

import React from 'react';
import css from './LoadingBar.module.css';
import { useLayout } from '@/contexts/LayoutContext';

export default function LoadingBar() {
    const { isLoading } = useLayout();

    if (!isLoading) return null;

    return <div className={css.container}>
        <div className={css.loadingBar} />
    </div>;
}