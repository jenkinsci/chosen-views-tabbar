package org.jenkinsci.plugins.chosenviewtabbar;

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
        @Override
        public String getDisplayName() {
            return "Chosen Views Tabbar";
        }
    }
}
