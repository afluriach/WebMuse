webMuse.controller('PlayView', function($scope){
	loadInstrumentsList();
	addPlayViewMouseListeners();
	onResize();
    attachElementCallbacks();
});
