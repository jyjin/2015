var BindEvent = function(eventName, selector, callback, parentsSelector) {
	if (3 < arguments.length) {
		$(selector, parentsSelector).off(eventName).on(eventName, callback);
		return;
	}

	$(document).off(eventName, selector).on(eventName, selector, callback);
}

var UnBindEvent = function(eventName, selector, callback, parentsSelector) {
	if (3 < arguments.length) {
		$(selector, parentsSelector).off(eventName)
		return;
	}

	$(document).off(eventName, selector)
}

var Menu = (function() {
	function Menu() {}

	Menu.prototype.bindEvent = function(first_argument) {
		BindEvent('click', '.item', function() {
			alert(this.innerText)
		},'ul')

		BindEvent('click', 'i', function(e) {
			alert(this.innerText)
			e.stopPropagation();
		},'ul')
	};

	Menu.prototype.init = function() {
		var html = '<li class="item"><i>ddd</i>aaaaaaaaa</li><li class="item">bbbbbbbbb</li><li class ="item">ccccccccc</li>';
		$('#menu').html(html);
	}

	return Menu

})()

$(function() {
	var menu = new Menu();
	menu.init();
	menu.bindEvent();

	$('.item').remove();

	menu.init();
	menu.bindEvent();
	menu.bindEvent();

})