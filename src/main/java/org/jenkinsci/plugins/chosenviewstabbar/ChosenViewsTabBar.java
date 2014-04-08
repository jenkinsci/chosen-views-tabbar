package org.jenkinsci.plugins.chosenviewstabbar;

import javax.inject.Inject;

import hudson.Extension;
import hudson.views.ViewsTabBar;
import hudson.views.ViewsTabBarDescriptor;

import org.kohsuke.stapler.DataBoundConstructor;

public class ChosenViewsTabBar extends ViewsTabBar {
	@DataBoundConstructor
	public ChosenViewsTabBar() {
	}
	
	@Extension
    public static class DescriptorImpl extends ViewsTabBarDescriptor {
		@Inject
		private ChosenViewsTabbarGlobalConfiguration config;
		
        @Override
        public String getDisplayName() {
            return "Chosen Views Tabbar";
        }
        
        public ChosenViewsTabbarGlobalConfiguration getConfig() {
			return config;
		}
    }
	
	@Override
	public DescriptorImpl getDescriptor() {
		return (DescriptorImpl) super.getDescriptor();
	}
	
	
	public Integer getRecentChosenViewsCount() {
		if (getConfig() == null)
			return ChosenViewsTabbarGlobalConfiguration.DEFAULT_RECENT_TABS;
		return getConfig().getLimitOfRecentViews();
	}


	private ChosenViewsTabbarGlobalConfiguration getConfig() {
		return getDescriptor().getConfig();
	}
}
