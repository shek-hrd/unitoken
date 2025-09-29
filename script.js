document.addEventListener('DOMContentLoaded', async () => {
const searchInput = document.getElementById('searchInput');
const translationInput = document.getElementById('translationInput');
const results = document.getElementById('results');
const response = await fetch('unicodeData.json');
const unicodeData = await response.json();
searchInput.addEventListener('input', () => {
const query = searchInput.value.toLowerCase();
displayResults(unicodeData, query);});
translationInput.addEventListener('input', () => {
const query = translationInput.value.toLowerCase();
displayResults(unicodeData, query);});
function displayResults(data, query) {
results.innerHTML = '';
const filteredData = data.filter(item =>
item.character.toLowerCase().includes(query) ||
item.meaning.toLowerCase().includes(query) ||
item.tokens.some(token => token.includes(query))
);
filteredData.forEach(item => {
const div = document.createElement('div');
div.className = 'result-item';
div.innerHTML = `
<span class="character">${item.character}</span>
<span class="meaning">${item.meaning}</span>
<span class="tokens">Tokens: ${item.tokens.join(', ')}</span>
<span class="similar">Similar: ${item.similar.map(char => `<span class="similar-character">${char}</span>`).join(', ')}</span>
`;
results.appendChild(div);
});}});