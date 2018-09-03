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
		// $.ajax({
		// 	url: baseUrl + '/card/' + self.id,
		// 	method: 'PUT',
		// 	data: {
		// 		name: newCardName,
		// 		bootcamp_kanban_column_id: column.id //skąd wziąć id kolumny?
		// 	},
		// 	success: function (response) {
		// 		self.element.find('.card-description').text(newCardName);
		// 	}
		// });
	},

	changeCardPosition(newId) {
		console.log(this);
		console.log(newId);
	}
};