const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTod6BGiBA--DmvY8tktdr1FvG_NE6mEXdJDvUWGdqH8pkA_YqFa-Jy2BCmpj3DkCnjlxJ0lL_L9moT/pubhtml';

async function fetchExcel() {
  const response = await fetch(excelFileUrl);
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

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

window.addEventListener('DOMContentLoaded', fetchExcel);
