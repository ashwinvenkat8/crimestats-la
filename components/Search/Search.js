'use client'

import React from "react";

export default function Search() {
    const [query, setQuery] = React.useState(null);
    const possibleSearchTerms = "location, age, sex, descent, weapon, or incident...";

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const doSearch = async () => {
        console.groupCollapsed('TODO: Implement search functionality');
        console.log(`Query: ${query}`);
        console.groupEnd();
    }

    return (
        <div className="search">
            <input type="text" placeholder={`Search by ${possibleSearchTerms}`} onChange={handleChange} />
            <button onClick={doSearch}>Search</button>
        </div>
    );
}
