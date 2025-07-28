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
    const table = new google.visualization.Table(document.getElementById('scoreboard'));
    table.draw(data, {showRowNumber: false, width: '100%', height: 'auto'});
  });
}

// Auto refresh every 60 seconds
setInterval(drawTable, 60000);
