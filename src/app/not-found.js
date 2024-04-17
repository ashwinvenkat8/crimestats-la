import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="not-found">
            <div className="filler"></div>
            <h2>404 | Not Found</h2>
            <Link className="return-home" href="/">Return Home</Link>
            <div className="filler"></div>
        </div>
    )
}