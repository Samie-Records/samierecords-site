// 1. DATA: This is your "Source of Truth." 
// Add every product you want to be searchable here.
const productDatabase = [
    // { title: "AfroBeats Packs - Guitar Loop Packs", img: "Pictures/p1.png" },
    // { title: "Afro Essentials - Drum Loops", img: "Pictures/p2.png" },
    { title: "AfroBeats Packs - Ultimate Bundle Vol 1", img: "Pictures/p3.jpg" },
    { title: "Afro Essentials - Vocals Bundle", img: "Pictures/p4.jpg" },
    { title: "Afro Essentials - Sample Packs", img: "Pictures/p5.jpg" },
    { title: "Blue Hour", img: "Pictures/Albulm-Cover1.jpg" },
];

// 2. Function to handle the search redirect + "Not Found" check
function performSearch() {
    const searchInput = document.getElementById('mainSearchInput');
    const queryValue = searchInput.value.trim();
    const queryLow = queryValue.toLowerCase();

    if (queryLow) {
        // Check if the query matches ANY title in our database
        const exists = productDatabase.some(product => 
            product.title.toLowerCase().includes(queryLow)
        );

        if (exists) {
            // Product exists! Go to the results page
            window.location.href = `results.html?search=${encodeURIComponent(queryValue)}`;
        } else {
            // Product doesn't exist! 
            // We stop the redirect and inform the user.
            alert(`Sorry, we don't have "${queryValue}" in our store yet.`);
            
            // Clean up the UI
            document.getElementById('searchSuggestions').style.display = 'none';
        }
    }
}

// 3. Trigger search on clicking the icon
const searchIcon = document.getElementById('searchIconBtn');
if(searchIcon) {
    searchIcon.addEventListener('click', performSearch);
}

const mainInput = document.getElementById('mainSearchInput');
const suggestionsBox = document.getElementById('searchSuggestions');

// 4. Listen for typing to show the Live Dropdown
mainInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    suggestionsBox.innerHTML = ''; 

    if (query.length > 0) {
        // Filter matches from the database array
        const matches = productDatabase.filter(p => 
            p.title.toLowerCase().includes(query)
        );
        
        if (matches.length > 0) {
            matches.slice(0, 10).forEach(product => {
                const div = document.createElement('div');
                div.classList.add('suggestion-item');
                
                const regex = new RegExp(`(${query})`, 'gi');
                const highlightedTitle = product.title.replace(regex, '<strong>$1</strong>');

                div.innerHTML = `
                    <img src="${product.img}" alt="${product.title}">
                    <span class="suggestion-text">${highlightedTitle}</span>
                `;

                div.onclick = () => {
                    mainInput.value = product.title;
                    suggestionsBox.style.display = 'none';
                    performSearch(); 
                };

                suggestionsBox.appendChild(div);
            });
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.style.display = 'none';
        }
    } else {
        suggestionsBox.style.display = 'none';
    }
});

// 5. Trigger search on pressing "Enter" key
mainInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// 6. Hide dropdown if user clicks outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
        suggestionsBox.style.display = 'none';
    }
});