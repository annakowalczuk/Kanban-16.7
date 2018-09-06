// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li data-id="' + self.id + '" class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');

		cardDeleteBtn.click(function () {
			self.removeCard();
		});

		cardDescription.click(function () {
			self.changeCardName();
		});

		console.log(card);
		card[0].addEventListener('eventChangeCardPosition', function(e){
			console.log(e);
			self.changeCardPosition(e.detail);
		});
		
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
		return card;
		
	}
}

Card.prototype = {
	removeCard: function () {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function () {
				self.element.remove();
			}
		});
	},

	changeCardName: function () {
		var newCardName = prompt('Enter a new card name');
		var self = this;
		if (newCardName) {
			var columnId = $(this.element).parent().data('id');
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					name: newCardName,
					bootcamp_kanban_column_id: columnId
				},
				success: function (response) {
					self.element.find('.card-description').text(newCardName);
				}
			});
		}
	},

	changeCardPosition(newId) {
		console.log(newId);
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				name: this.name,
				bootcamp_kanban_column_id: newId
			}
		});
	}
};