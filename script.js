filteredData.forEach(item => {
    const div = document.createElement('div');
    div.className = 'result-item';

    const character = document.createElement('span');
    character.className = 'character';
    character.textContent = item.character;

    const meaning = document.createElement('span');
    meaning.className = 'meaning';
    meaning.textContent = item.meaning;

    const tokens = document.createElement('span');
    tokens.className = 'tokens';
    tokens.textContent = `Tokens: ${item.tokens.join(', ')}`;

    const similar = document.createElement('span');
    similar.className = 'similar';
    similar.textContent = "Similar: ";

    item.similar.forEach(char => {
        const similarChar = document.createElement('span');
        similarChar.className = 'similar-character';
        similarChar.textContent = char;
        similar.appendChild(similarChar);
    });

    div.appendChild(character);
    div.appendChild(meaning);
    div.appendChild(tokens);
    div.appendChild(similar);

    results.appendChild(div);
});
