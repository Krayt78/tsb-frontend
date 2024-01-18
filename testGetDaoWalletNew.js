async function fetchData() {
    try {
        const result = await fetch('https://52.91.207.235:3000/api/daoWallet/');
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function main() {
    const walletBalances = await fetchData();
    console.log(walletBalances);
}

main();