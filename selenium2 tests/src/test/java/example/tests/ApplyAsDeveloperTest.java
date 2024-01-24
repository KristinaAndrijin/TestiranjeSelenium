package example.tests;

import example.pages.HomePage;
import org.testng.annotations.Test;


public class ApplyAsDeveloperTest extends TestBase {
    static final String PASSWORD = "password";

    @Test
    public void applyAsDeveloper() throws InterruptedException {
        HomePage home = new HomePage(driver);

        home.clickOnEditButton();
    }
}
