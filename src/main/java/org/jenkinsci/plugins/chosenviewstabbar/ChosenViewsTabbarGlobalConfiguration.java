package org.jenkinsci.plugins.chosenviewstabbar;

import hudson.Extension;
import jenkins.model.GlobalConfiguration;
import net.sf.json.JSONObject;

import org.kohsuke.stapler.DataBoundConstructor;
import org.kohsuke.stapler.StaplerRequest;

@Extension
public class ChosenViewsTabbarGlobalConfiguration extends GlobalConfiguration {
    private static final String DEFAULT_VIEW_SHORTCUT = "F2";
	public static final Integer DEFAULT_RECENT_TABS = 5;
	protected Integer limitOfRecentViews;
	private String shortcutToFocusChosen;

    public ChosenViewsTabbarGlobalConfiguration() {
        this(DEFAULT_RECENT_TABS,DEFAULT_VIEW_SHORTCUT);
    }

    @DataBoundConstructor
    public ChosenViewsTabbarGlobalConfiguration(final Integer limitOfRecentViews, final  String shortcutToFocusChosen) {
        super();
        this.limitOfRecentViews = limitOfRecentViews;
		this.shortcutToFocusChosen = shortcutToFocusChosen;
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
        this.shortcutToFocusChosen = json.getString("shortcutToFocusChosen");
        save();
        return true;
    }

	public String getShortcutToFocusChosen() {
		return shortcutToFocusChosen;
	}

	public void setShortcutToFocusChosen(String shortcutToFocusChosen) {
		this.shortcutToFocusChosen = shortcutToFocusChosen;
	}
}
