package hooks;

import com.microsoft.playwright.*;

public class BrowserHooks {

    public static Playwright playwright;
    public static Browser browser;
    public static BrowserContext context;
    public static Page page;

    public static void startBrowser() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        context = browser.newContext();
        page = context.newPage();
    }

    public static void closeBrowser() {
        context.close();
        browser.close();
        playwright.close();
    }
}
