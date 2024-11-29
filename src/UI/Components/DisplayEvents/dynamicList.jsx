import React from 'react';

function DynamicList({ list, onAddItem, onInputChange, onDeleteItem }) {
    return (
        <div>
            {list.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => onInputChange(e.target.value, index)}
                        placeholder={`Category ${index + 1}`}
                        style={{ marginRight: '8px' }}
                    />
                    <button className="deleteIbutton" type="button" onClick={() => onDeleteItem(index)}>-</button>
                </div>
            ))}
            <button
                className="addIbutton"
                type="button"
                onClick={() => {
                    // Add a new category only if the last category is not empty
                    if (list[list.length - 1] !== '') {
                        onAddItem();
                    }
                }}
            >
                <svg height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                </svg>
            </button>
        </div>
    );
}

export default DynamicList;