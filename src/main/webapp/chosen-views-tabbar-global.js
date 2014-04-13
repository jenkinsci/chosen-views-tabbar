$$('#shortcutToFocusChosen')[0].observe('keydown', function(event) {
	this.value=getShortcutStringRepresentation(event);
	if (event.keyCode < 90 || event.keyCode > 123 || this.value.indexOf("+")==-1)
		event.preventDefault();
});
