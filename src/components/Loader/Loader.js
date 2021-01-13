import React from 'react';
import './Loader.css';

export default function Loader(props) {
    const { text } = props;
    const displayText = text || 'Loading...';
    return (
        <div id="Loader">
            <div class="spinner-border mr-2" role="status">
                <span class="sr-only">{displayText}</span>
            </div>
            <span>{displayText}</span>
        </div>
    );
}