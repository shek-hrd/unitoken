document.addEventListener('DOMContentLoaded', async () => {
  const searchInput = document.getElementById('searchInput');
  const translationInput = document.getElementById('translationInput');
  const results = document.getElementById('results');

  // Load Unicode data
  let unicodeData = [];
  try {
    const response = await fetch('unicodeData.json');
    if (!response.ok) throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    unicodeData = await response.json();
  } catch (err) {
    console.error('Failed to load unicodeData.json', err);
    results.textContent = 'Failed to load data.';
    return;
  }

  // Unified input handler (keeps logic simple)
  function handleInput() {
    const q1 = (searchInput.value || '').toLowerCase();
    const q2 = (translationInput.value || '').toLowerCase();
    // If both fields used, prefer searchInput; otherwise use whichever has content
    const query = q1 || q2;
    displayResults(unicodeData, query);
  }

  searchInput.addEventListener('input', handleInput);
  translationInput.addEventListener('input', handleInput);

  function displayResults(data, query) {
    results.innerHTML = '';

    // If no query, optionally show nothing or all results; here we show nothing
    if (!query) return;

    // filteredData is local to this function — no stray global references
    const filteredData = (Array.isArray(data) ? data : []).filter(item => {
      const char = (item.character || '').toLowerCase();
      const meaning = (item.meaning || '').toLowerCase();
      const tokensMatch = Array.isArray(item.tokens) && item.tokens.some(t => (t || '').toLowerCase().includes(query));
      // include other fields as needed
      return char.includes(query) || meaning.includes(query) || tokensMatch;
    });

    if (filteredData.length === 0) {
      results.textContent = 'No results';
      return;
    }

    filteredData.forEach(item => {
      const div = document.createElement('div');
      div.className = 'result-item';

      const character = document.createElement('span');
      character.className = 'character';
      character.textContent = item.character || '';

      const meaning = document.createElement('span');
      meaning.className = 'meaning';
      meaning.textContent = item.meaning || '';

      const tokens = document.createElement('span');
      tokens.className = 'tokens';
      tokens.textContent = `Tokens: ${Array.isArray(item.tokens) ? item.tokens.join(', ') : ''}`;

      const similar = document.createElement('span');
      similar.className = 'similar';
      similar.textContent = 'Similar: ';
      if (Array.isArray(item.similar)) {
        item.similar.forEach((ch, i) => {
          const sc = document.createElement('span');
          sc.className = 'similar-character';
          sc.textContent = ch;
          similar.appendChild(sc);
          if (i < item.similar.length - 1) similar.appendChild(document.createTextNode(', '));
        });
      }

      // append in desired order
      div.append(character, meaning, tokens, similar);
      results.appendChild(div);
    });
  }
});
