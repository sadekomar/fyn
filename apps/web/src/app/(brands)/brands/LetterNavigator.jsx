"use client"

export function LetterNavigator({ brands }) {
    let scrollToLetter = (letterClicked) => {
        let section = document.querySelector(`a[href='#${letterClicked}'`)
        console.log(section)
        section.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'start'
        });
    }

    return <div className="alpha-index-container">
        {Object.keys(brands).map((initialLetter, index) => (
            <p className="alpha-index" key={index} style={{ cursor: 'pointer' }} onClick={() => { scrollToLetter(initialLetter); }}>{initialLetter}</p>
        ))}
    </div>;
}