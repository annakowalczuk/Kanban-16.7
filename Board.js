var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column')
    .click(function() {
        var columnName = prompt('Enter a column name');
        $.ajax({
    		url: baseUrl + '/column',
    		method: 'POST',
    		data: {
            	name: columnName
    		},
    		success: function(response){
    			var column = new Column(response.id, columnName);
    			board.createColumn(column);
          	}
        });
});
	
function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
			placeholder: 'card-placeholder',
			receive: function( event, ui ) {
				var columnId = $(event.target).data('id');
				var card = $(ui.item)[0];

				// var card = new Card($(uiTemp).data('id'), $(uiTemp).find('.card-description').text());
				// card.changeCardPosition(columnId);
				card.dispatchEvent(new CustomEvent('eventChangeCardPosition', {detail: columnId}));
			}
    }).disableSelection();
  }