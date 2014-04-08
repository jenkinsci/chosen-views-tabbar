var ChosenViewsTabbarModule = (function () {
	var ROOT_URL = null;
	var RECENT_CHOSEN_TABS = null;
	
	function ChosenTab(name) {
		this.tabName = name;
		this.viewDate = new Date();
	}
	
	function RecentChosenTabs(recentTabLimit) {
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
			if (this.recent.length == recentTabLimit)
				break;
		}
		this.recent.sort();
		
		this.remember = function(viewName) {
			if (this.recent.indexOf(viewName)!==-1) {
				this.recent.splice(this.recent.indexOf(viewName),1);
			}
			this.recent.push(viewName)
			if (this.recent.length > recentTabLimit) {
				this.recent.splice(0,1);
			}
			
			localStorage.chosenViewsTabbar_recentTabs=this.recent.join()
		}
		
		this.getRecent = function() {
			return this.recent;
		}
	}
	
	function selectViewOnChange() {
		var selectViewCurrentView = document.getElementById('selectView');
		if (selectViewCurrentView != null) {
			var selectViewCurrentViewName = selectViewCurrentView.value;
			if (selectViewCurrentViewName != null) {
				if (selectViewCurrentViewName.length > 0) {
					RECENT_CHOSEN_TABS.remember(selectViewCurrentViewName);
					window.location.href = ROOT_URL + selectViewCurrentViewName;
				}
			}
		}
	}
	
	function selectCurrentView(elementId) {
		var selectViewCurrentView = document.getElementById(elementId);
		if (selectViewCurrentView != null) {
			selectViewCurrentView.selected = true;
		}	
	}
	
	var exports = new Object();
	exports.goToView = function (viewUrl) {
		RECENT_CHOSEN_TABS.remember(encodeURI(viewUrl))
		window.location.href = ROOT_URL+viewUrl
	}
	
	exports.init = function (chosenViewsTabbar_limitOfRecentViews, chosenViewsTabbar_currentViewName, rootUrl) 
	{
		ROOT_URL = rootUrl;
		
		document.observe('dom:loaded', function(evt) {
			RECENT_CHOSEN_TABS = new RecentChosenTabs(chosenViewsTabbar_limitOfRecentViews);
			new Chosen($$("#selectView")[0]);
			$$("#selectView")[0].observe('change', selectViewOnChange);
			
			if (RECENT_CHOSEN_TABS.getRecent().length > 0) {
				for(index=0; index < RECENT_CHOSEN_TABS.getRecent().length; index++) {
					var viewName = RECENT_CHOSEN_TABS.getRecent()[index]
					viewUrl = viewName;
					viewName = decodeURI(viewName).replace("view/","").replace("/","")
					var activeClass="inactive";
					var link = "<a href=\"javascript:ChosenViewsTabbarModule.goToView('"+viewUrl+"')\">"+viewName+"</a>"
					if (viewName == chosenViewsTabbar_currentViewName) { 
						activeClass="active";
						link=viewName;
					}
					
					$$(".dropDownTab")[0].insert({before: "<td class='commonTab "+activeClass+"'>"+link+"</td>"});
				}	
			}
		});
	}
	return exports;
}());