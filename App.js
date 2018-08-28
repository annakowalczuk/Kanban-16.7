//ZMIENNE DO KOMUNIKACJI Z SERWEREM
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '3493',
  'X-Auth-Token': 'bcbcc08beee7a06e7ea89a44eb35e1d6'
};

//dodawanie nagłówków do kadego zapytania
$.ajaxSetup({
	headers: myHeaders
});

// funkcja odpytująca serwer o zasób tablicy
$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
      setupColumns(response.columns);
    }
});

function setupCards(col, cards) {
	cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.createCard(cardObj);
  	})
};

function setupColumns(columns) {
	columns.forEach(function (column) {
		var col = new Column(column.id, column.name);
		board.createColumn(col);
		setupCards(col, column.cards);
	});
};