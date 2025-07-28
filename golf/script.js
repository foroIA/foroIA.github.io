//const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTod6BGiBA--DmvY8tktdr1FvG_NE6mEXdJDvUWGdqH8pkA_YqFa-Jy2BCmpj3DkCnjlxJ0lL_L9moT/pubhtml';

google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
  const query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/2PACX-1vTod6BGiBA--DmvY8tktdr1FvG_NE6mEXdJDvUWGdqH8pkA_YqFa-Jy2BCmpj3DkCnjlxJ0lL_L9moT/gviz/tq?sheet=Sheet1'
  );

  query.send(function(response) {
    if (response.isError()) {
      document.getElementById('scoreboard').innerText = 'Error loading data';
      console.error(response.getMessage());
      return;
    }

    const data = response.getDataTable();

    // Calculate rank based on Total column (assuming last column is Total)
    const totalIndex = data.getNumberOfColumns() - 1;
    const rows = [];
    for (let i = 0; i < data.getNumberOfRows(); i++) {
      rows.push([i, data.getValue(i, totalIndex)]);
    }
    rows.sort((a, b) => a[1] - b[1]);
    const rankMap = new Map(rows.map((r, i) => [r[0], i + 1]));

    // Add Rank column
    data.addColumn('number', 'Rank');
    for (let i = 0; i < data.getNumberOfRows(); i++) {
      data.setValue(i, data.getNumberOfColumns() - 1, rankMap.get(i));
    }

    const table = new google.visualization.Table(document.getElementById('scoreboard'));
    table.draw(data, {showRowNumber: false, width: '100%', height: 'auto'});
  });
}

// Auto refresh every 60 seconds
setInterval(drawTable, 60000);

