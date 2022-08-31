import React from 'react';
import "./SearchStatistic.css";


const SearchStatistic = ({ setSearchField, searchField }: {
    setSearchField: React.Dispatch<React.SetStateAction<string>>
    searchField: string
}) => {
    return (
        <div className='search-statistic'>
            <input type="text" placeholder='Поиск' onChange={(e) => setSearchField(e.target.value)} value={searchField} />
        </div>
    )
}

export default SearchStatistic;