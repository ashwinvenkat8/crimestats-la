'use client'

export default function GlobalError({ error, reset }) {
    console.groupCollapsed('GlobalError');
    console.error(error);
    console.groupEnd();

    return (
        <html lang="en">
            <body>
                <div className="global-error">
                    <div className="filler"></div>
                    <h2>500 | Something went wrong</h2>
                    <button className="try-again" onClick={() => reset()}>Try again</button>
                    <div className="filler"></div>
                </div>
            </body>
        </html>
    )
}