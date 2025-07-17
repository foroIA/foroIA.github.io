const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_cJUSUcwjb80qq-gnGjDX-u0ernEB5GNjDhKF5RyHvmL23m7DB7g0-IenizMSORKHwDt0fxj8DUnM/pubhtml';

function fetchScores() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showScores,
    simpleSheet: true
  });
}

function showScores(data) {
  // Calculate rank by total score
  data.forEach(d => d.Total = parseFloat(d.Total || 0));
  const sorted = [...data].sort((a, b) => a.Total - b.Total);
  sorted.forEach((row, i) => row.Rank = i + 1);

  const headers = Object.keys(data[0]).concat('Rank');

  const table = document.createElement('table');
  table.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>` +
                    data.map(row =>
                      `<tr>${headers.map(h => `<td>${row[h] || ''}</td>`).join('')}</tr>`
                    ).join('');
  document.getElementById('scoreboard').innerHTML = '';
  document.getElementById('scoreboard').appendChild(table);
}

window.addEventListener('DOMContentLoaded', fetchScores);
