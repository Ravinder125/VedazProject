import React from 'react'

// interface SearchProps {
//     className: string;
//     props: React.ComponentProps<"input">
// }

const Search = ({
    className = "",
    type,
    ...props
}: React.ComponentProps<"input">) => {

    return (
        <input
            type={type}
            className={`border p-2 rounded w-full ${className}`}
            // placeholder="Search by name"
            {...props}
        />
    )
}

export default Search