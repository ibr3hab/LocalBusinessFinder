import React , {useState} from "react"
import { OutlinedInput , Button , FormControl , InputLabel , Select , MenuItem} from "@mui/material";


const SearchandFilterBar = ({onFilter , onSearch , clearSearch , clearFilter})=>{

    const [searchTerm , setSearchTerm] = useState('');
    const [category , setCategory] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleFilter = () => {
        onFilter(category);
        console.log('Filtering by category:', category);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <OutlinedInput
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                />
                <Button type="submit">Search</Button>
                <Button onClick={clearSearch}>Clear Se  arch</Button>
            </form>
            
            <FormControl>
                <InputLabel>Category</InputLabel>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                >
                    <MenuItem value="locality">locality</MenuItem>
                    <MenuItem value="lodging">lodging</MenuItem>
                    <MenuItem value="shopping_mall">Shopping mall</MenuItem>
                    <MenuItem value="gym">gym</MenuItem>
                </Select>
                <Button onClick={handleFilter}>Filter</Button>
                <Button onClick={clearFilter}>Clear Filter</Button>
            </FormControl>
        </div>
    );
};

export default SearchandFilterBar;
{/* <form onSubmit={handleFilter}>
            <OutlinedInput
            type="text"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            placeholder="Filter"/>
            <Button type="Filter">Filter</Button>
            <Button onClick={clearFilter}>Clear Search</Button>
        </form> */}