async function fetchData() {
    try {
        const response = await fetch('https://52.91.207.235:3000/');
        const data = await response.text();
        console.log(data); // Output: Hello World
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchData();
