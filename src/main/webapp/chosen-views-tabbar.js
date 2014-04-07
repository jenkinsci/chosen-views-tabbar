document.observe('dom:loaded', function(evt) {
	new Chosen($$("#selectView")[0]);
	$$("#selectView")[0].observe('change', selectViewOnChange);
});
