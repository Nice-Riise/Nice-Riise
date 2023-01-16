
// sort top 10 cryptocoins from coin paprika // 
async function top10Token() {
    const response = await fetch('https://api.coinpaprika.com/v1/coins');
    const tokens = await response.json();
return tokens.filter(token => token.rank  >= 1 && token.rank <= 10).map(token => token.symbol);

}

