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
		
		this.remember = function(viewName) {
			this.forget(viewName);
			this.recent.push(viewName)
			if (this.recent.length > recentTabLimit) {
				this.recent.splice(0,1);
			}
			
			localStorage.chosenViewsTabbar_recentTabs=this.recent.join()
		}
		
		this.forget = function(viewName) {
			var viewIndex=this.recent.indexOf(viewName);
			if (viewIndex!==-1) 
				this.recent.splice(viewIndex,1);
		}
		
		this.isRecent = function (viewName) {
			return this.recent.indexOf(viewName) !== -1;
		}
		
		this.getRecent = function() {
			return this.recent;
		}
	}
	
	function selectViewOnChange() {
		var selectViewCurrentView = document.getElementById('selectView');
		if (selectViewCurrentView != null) {
			var selectViewUrl = selectViewCurrentView.value;
			if (selectViewUrl != null) {
				if (selectViewUrl.length > 0) 
					window.location.href = ROOT_URL + selectViewUrl;
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
	exports.goToView = function (viewName, viewUrl) {
		RECENT_CHOSEN_TABS.remember(viewName)
		window.location.href = ROOT_URL+viewUrl
	}
	
	exports.init = function (chosenViewsTabbar_limitOfRecentViews, chosenViewsTabbar_currentViewName, chosenViewsTabbar_currentViewUrl,rootUrl, allViews) 
	{
		ROOT_URL = rootUrl;
		
		document.observe('dom:loaded', function(evt) {
			RECENT_CHOSEN_TABS = new RecentChosenTabs(chosenViewsTabbar_limitOfRecentViews);
			new Chosen($$("#selectView")[0]);
			$$("#selectView")[0].observe('change', selectViewOnChange);
			
			var recent = RECENT_CHOSEN_TABS.getRecent().clone();
			for(index=0; index < recent.length; index++) {
				var viewName = recent[index];
				var viewExists = allViews[recent[index]] != null 
				if (!viewExists)
					RECENT_CHOSEN_TABS.forget(viewName);
			}
			RECENT_CHOSEN_TABS.remember(chosenViewsTabbar_currentViewName)
			
			var recentSorted = RECENT_CHOSEN_TABS.getRecent().clone().sort();
			for(index=0; index < recentSorted.length; index++) {
				var viewName = recentSorted[index]
				var viewUrl = allViews[viewName] 
				if (viewUrl == null) {
					continue;
				}
				var activeClass="inactive";
				var link = "<a href=\"javascript:ChosenViewsTabbarModule.goToView('"+viewName+"','"+viewUrl+"')\">"+viewName+"</a>"
				if (viewName == chosenViewsTabbar_currentViewName) { 
					activeClass="active";
					link=viewName;
				}
				
				$$(".dropDownTab")[0].insert({before: "<td class='commonTab "+activeClass+"'>"+link+"</td>"});
			}
		});
	}
	return exports;
}());