async function fetchScores() {
  const response = await fetch('ScoreBoard.xlsx'); // The Excel file in the same folder
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });

  const firstSheet = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);

  showScores(data);
}

function showScores(data) {
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
