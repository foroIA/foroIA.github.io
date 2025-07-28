google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
  const query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTod6BGiBA--DmvY8tktdr1FvG_NE6mEXdJDvUWGdqH8pkA_YqFa-Jy2BCmpj3DkCnjlxJ0lL_L9moT/pubhtml'
  );

  query.send(function(response) {
    if (response.isError()) {
      document.getElementById('scoreboard').innerText = 'Error loading data';
      console.error(response.getMessage());
      return;
    }

    const data = response.getDataTable();
    const table = new google.visualization.Table(document.getElementById('scoreboard'));
    table.draw(data, {showRowNumber: false, width: '100%', height: 'auto'});
  });
}

// Auto refresh every 60 seconds
setInterval(drawTable, 60000);
