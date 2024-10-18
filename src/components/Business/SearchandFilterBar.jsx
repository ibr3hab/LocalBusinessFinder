import React , {useState} from "react"
import { OutlinedInput , Button } from "@mui/material";


const SearchandFilterBar = ({onFilter , onSearch})=>{

    const [searchTerm , setSearchTerm] = useState('');
    const [category , setCategory] = useState('');

    const handleSearch = (e)=>{
        e.preventDefault();
        onSearch(searchTerm);
    }

    const handleFilter = (e)=>{
        e.preventDefault();
        onFilter(category);
    }

    return(
        <div>
        <form onSubmit={handleSearch}>
            <OutlinedInput
            type="text"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder="Search"/>
            <Button type="submit">Search</Button>
        </form>
        <form onSubmit={handleFilter}>
            <OutlinedInput
            type="text"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            placeholder="Filter"/>
            <Button type="Filter">Filter</Button>
        </form>
        </div>
    )
}

export default SearchandFilterBar;