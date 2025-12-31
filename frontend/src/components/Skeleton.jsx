import React from 'react';
import '../index.css';

const Skeleton = ({ type = 'text', height, width, style, className = '' }) => {
    const customStyle = {
        height,
        width,
        ...style,
    };

    const classes = `skeleton skeleton-${type} ${className}`;

    if (type === 'card') {
        return (
            <div className={`skeleton-card-wrapper ${className}`} style={style}>
                <div className="skeleton skeleton-image" style={{ height: '280px' }}></div>
                <div className="skeleton-content">
                    <div className="skeleton skeleton-text" style={{ width: '40%', height: '12px', marginBottom: '8px' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '90%', height: '20px', marginBottom: '12px' }}></div>
                    <div className="skeleton-meta" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                        <div className="skeleton skeleton-text" style={{ width: '30%', height: '16px' }}></div>
                        <div className="skeleton skeleton-text" style={{ width: '25%', height: '20px' }}></div>
                    </div>
                    <div className="skeleton skeleton-button" style={{ height: '36px', marginTop: '16px', borderRadius: '8px' }}></div>
                </div>
            </div>
        );
    }

    return <div className={classes} style={customStyle}></div>;
};

export default Skeleton;
