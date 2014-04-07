var RECENT_TAB_LIMIT = 5;
function ChosenTab(name) {
	this.tabName = name;
	this.viewDate = new Date();
}

function RecentChosenTabs() {
	if (typeof(Storage) == undefined) 
		return null;
	
	if (localStorage.chosenViewsTabbar_recentTabs==undefined)
		localStorage.chosenViewsTabbar_recentTabs = "";
	
	this.recent=[];
	var r = localStorage.chosenViewsTabbar_recentTabs.split(",")
	for (index=0; index < r.length; index++) {
		var viewName = r[index]
		if (typeof(viewName) == "string" && viewName.trim().length>0) {
			this.recent.push(viewName)
		}
		if (this.recent.length == RECENT_TAB_LIMIT)
			break;
	}
	
	this.remember = function(viewName) {
		if (this.recent.indexOf(viewName)!==-1) {
			this.recent.splice(this.recent.indexOf(viewName),1);
		}
		this.recent.push(viewName)
		if (this.recent.length > RECENT_TAB_LIMIT) {
			this.recent.splice(0,1);
		}
		
		localStorage.chosenViewsTabbar_recentTabs=this.recent.join()
	}
	
	this.getRecent = function() {
		return this.recent;
	}
}

var recentChosenTabs = new RecentChosenTabs();

function selectViewOnChange() {
	var selectViewCurrentView = document.getElementById('selectView');
	if (selectViewCurrentView != null) {
		var selectViewCurrentViewName = selectViewCurrentView.value;
		if (selectViewCurrentViewName != null) {
			if (selectViewCurrentViewName.length > 0) {
				recentChosenTabs.remember(selectViewCurrentViewName);
				window.location.href = rootURL + selectViewCurrentViewName;
			}
		}
	}
}

function goToView(viewUrl) {
	recentChosenTabs.remember(encodeURI(viewUrl))
	window.location.href = rootURL+viewUrl
}

function selectCurrentView(elementId) {
	var selectViewCurrentView = document.getElementById(elementId);
	if (selectViewCurrentView != null) {
		selectViewCurrentView.selected = true;
	}	
}

document.observe('dom:loaded', function(evt) {
	new Chosen($$("#selectView")[0]);
	$$("#selectView")[0].observe('change', selectViewOnChange);
	selectCurrentView(chosenViewsTabbar_currentViewName)
	
	if (recentChosenTabs.getRecent().length > 0) {
		for(index=0; index < recentChosenTabs.getRecent().length; index++) {
			var viewName = recentChosenTabs.getRecent()[index]
			viewUrl = viewName;
			viewName = decodeURI(viewName).replace("view/","").replace("/","")
			var activeClass="inactive";
			var link = "<a href=\"javascript:goToView('"+viewUrl+"')\">"+viewName+"</a>"
			if (viewName == chosenViewsTabbar_currentViewName) { 
				activeClass="active";
				link=viewName;
			}
			
			$$(".createNewView")[0].insert({after: "<td class='commonTab "+activeClass+"'>"+link+"</td>"});
		}
		$$(".createNewView")[0].insert({after: "<td class='gapTab'></td>"});
	}
});
