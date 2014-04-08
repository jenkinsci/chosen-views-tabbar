package org.jenkinsci.plugins.chosenviewstabbar;

import hudson.Extension;
import jenkins.model.GlobalConfiguration;
import net.sf.json.JSONObject;

import org.kohsuke.stapler.DataBoundConstructor;
import org.kohsuke.stapler.StaplerRequest;

@Extension
public class ChosenViewsTabbarGlobalConfiguration extends GlobalConfiguration {
    public static final Integer DEFAULT_RECENT_TABS = 5;
	protected Integer limitOfRecentViews;

    public ChosenViewsTabbarGlobalConfiguration() {
        this(DEFAULT_RECENT_TABS);
    }

    @DataBoundConstructor
    public ChosenViewsTabbarGlobalConfiguration(final Integer limitOfRecentViews) {
        super();
        this.limitOfRecentViews = limitOfRecentViews;
    }

	public Integer getLimitOfRecentViews() {
		return limitOfRecentViews;
	}
	
	@Override
    public String getDisplayName() {
        return "Chosen ViewsTabBar Configuration";
    }
	
    @Override
    public boolean configure(final StaplerRequest request, final JSONObject json)
            throws FormException {
        this.limitOfRecentViews = json.getInt("limitOfRecentViews");
        save();
        return true;
    }
}
