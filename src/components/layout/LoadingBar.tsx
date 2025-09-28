"use client";

import React from 'react';

import { useLayout } from '@/contexts/LayoutContext';

import css from './LoadingBar.module.css';

export default function LoadingBar() {
    const { isLoading } = useLayout();

    if (!isLoading) return null;

    return <div className={css.container}>
        <div className={css.loadingBar} />
    </div>;
}