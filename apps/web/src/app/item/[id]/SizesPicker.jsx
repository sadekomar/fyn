"use client"
export function SizesPicker({ data }) {
    return <div>
        <p className='sizes-title'>Sizes and Colors</p>
        <div className='sizes-wrapper'>
            {data['sizes'].map((size, index) => (
                <label key={index} className={`size-badge ${(Object.values(size)[0]) ? 'size-badge-available' : ''}`}>
                    <input
                        type="radio"
                        name="size"
                        value={Object.keys(size)[0]}
                        disabled={!Object.values(size)[0]}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        // checked={selectedColor === Object.keys(size)[0]}
                        style={{ display: 'none' }} />
                    {Object.keys(size)}
                </label>
            ))}
        </div>
    </div>;
}
