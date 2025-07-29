google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
  const query = new google.visualization.Query(
  'https://docs.google.com/spreadsheets/d/1jUp2GF0G5-COu067ylz8MF3qa2FEF4Xn1s2wXE33kNo/gviz/tq?sheet=Sheet1'
    
  );

  query.send(function(response) {
    if (response.isError()) {
      document.getElementById('scoreboard').innerText = 'Error loading data';
      console.error(response.getMessage());
      return;
    }

    const data = response.getDataTable();
	// Get column index of "Total"
    const totalColIndex = data.getColumnIndex('Total');
    if (totalColIndex === -1) {
      document.getElementById('scoreboard').innerText = 'Total column not found';
      return;
    }

    // Convert to array for sorting
    const rows = [];
    for (let i = 0; i < data.getNumberOfRows(); i++) {
      const row = [];
      for (let j = 0; j < data.getNumberOfColumns(); j++) {
        row.push(data.getValue(i, j));
      }
      rows.push(row);
    }

    // Sort by total strokes ascending
    const sorted = [...rows].sort((a, b) => (a[totalColIndex] || 0) - (b[totalColIndex] || 0));

    // Assign ranks with tie support
    const ranks = [];
    let rank = 1;
    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i][totalColIndex] === sorted[i - 1][totalColIndex]) {
        ranks[i] = ranks[i - 1]; // tie
      } else {
        ranks[i] = rank;
      }
      rank++;
    }

    // Create new DataTable with Rank column added at front
    const newData = new google.visualization.DataTable();
    newData.addColumn('number', 'Rank');
    for (let i = 0; i < data.getNumberOfColumns(); i++) {
      newData.addColumn(data.getColumnType(i), data.getColumnLabel(i));
    }

    for (let i = 0; i < sorted.length; i++) {
      newData.addRow([ranks[i], ...sorted[i]]);
    }

    const table = new google.visualization.Table(document.getElementById('scoreboard'));
    table.draw(newData, {
      showRowNumber: false,
      width: '100%',
      height: 'auto'
    });
  });
}

// Auto refresh every 60 seconds
setInterval(drawTable, 60000);