import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlConfig } from '../../config';
import './SearchPage.css';

function SearchPage() {

    // Task 1: Define state variables
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [ageRange, setAgeRange] = useState(10);
    const [searchResults, setSearchResults] = useState([]);

    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    const navigate = useNavigate();

    // Fetch all products when the page loads
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = `${urlConfig.backendUrl}/api/gifts`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error; ${response.status}`);
                }

                const data = await response.json();
                setSearchResults(data);

            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);

    // Task 2: Fetch search results based on user inputs
    const handleSearch = async () => {
        try {
            const params = new URLSearchParams();

            if (searchQuery.trim()) {
                params.append('name', searchQuery.trim());
            }

            if (category) {
                params.append('category', category);
            }

            if (condition) {
                params.append('condition', condition);
            }

            if (ageRange) {
                params.append('age_years', ageRange);
            }

            const url =
                `${urlConfig.backendUrl}/api/search?${params.toString()}`;

            console.log('Search URL:', url);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error; ${response.status}`);
            }

            const data = await response.json();
            setSearchResults(data);

        } catch (error) {
            console.log('Search error: ' + error.message);
            setSearchResults([]);
        }
    };

    // Task 6: Navigate to details page
    const goToDetailsPage = (productId) => {
        navigate(`/details/${productId}`);
    };

    return (
        <div className="container mt-5 search-page">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="filter-section mb-3 p-3 border rounded">

                        <h5>Filters</h5>

                        <div className="d-flex flex-column">

                            {/* Task 3: Category dropdown */}
                            <label
                                htmlFor="category"
                                className="form-label"
                            >
                                Category
                            </label>

                            <select
                                id="category"
                                className="form-select mb-3"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">
                                    All Categories
                                </option>

                                {categories.map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                ))}

                            </select>

                            {/* Task 3: Condition dropdown */}
                            <label
                                htmlFor="condition"
                                className="form-label"
                            >
                                Condition
                            </label>

                            <select
                                id="condition"
                                className="form-select mb-3"
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                            >
                                <option value="">
                                    All Conditions
                                </option>

                                {conditions.map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                ))}

                            </select>

                            {/* Task 4: Age range slider */}
                            <label
                                htmlFor="ageRange"
                                className="form-label"
                            >
                                Maximum Age: {ageRange} years
                            </label>

                            <input
                                id="ageRange"
                                type="range"
                                className="form-range"
                                min="1"
                                max="10"
                                value={ageRange}
                                onChange={(e) =>
                                    setAgeRange(e.target.value)
                                }
                            />

                        </div>
                    </div>
{/* Task 7 & 8: Search input and button */}
<div className="search-controls">
    <input
        type="text"
        className="form-control search-input"
        placeholder="Search gifts by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />

    <button
        className="btn search-button"
        onClick={handleSearch}
    >
        Search
    </button>
</div>

                    {/* Task 5: Display search results */}
                    <div className="search-results">

                        {searchResults.length > 0 ? (

                            searchResults.map((gift) => (

                                <div
                                    key={gift.id}
                                    className="card mb-3"
                                >
                                    {gift.image && (
                                        <img
                                            src={gift.image}
                                            className="card-img-top"
                                            alt={gift.name}
                                        />
                                    )}

                                    <div className="card-body">

                                        <h5 className="card-title">
                                            {gift.name}
                                        </h5>

                                        <p className="card-text">
                                            <strong>Category:</strong>{' '}
                                            {gift.category}
                                        </p>

                                        <p className="card-text">
                                            <strong>Condition:</strong>{' '}
                                            {gift.condition}
                                        </p>

                                        <p className="card-text">
                                            <strong>Age:</strong>{' '}
                                            {gift.age_years} years
                                        </p>

                                        <button
                                            className="btn btn-primary"
                                            onClick={() =>
                                                goToDetailsPage(gift.id)
                                            }
                                        >
                                            View Details
                                        </button>

                                    </div>
                                </div>

                            ))

                        ) : (

                            <div
    className="no-products-alert"
    role="alert"
>
    No products found.
</div>

                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}

export default SearchPage;