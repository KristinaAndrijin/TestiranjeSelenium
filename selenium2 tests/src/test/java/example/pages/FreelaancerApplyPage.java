package example.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class FreelaancerApplyPage {

    private WebDriver driver;

    @FindBy(css = "div[role='button']")
    WebElement applyingAs;

    @FindBy(css = "ul[role='listbox']")
    WebElement roles;

    @FindBy(tagName = "h1")
    WebElement heading;

    @FindBy(name = "fullName")
    WebElement developerFullName;

    @FindBy(name = "email")
    WebElement developerEmail;

    @FindBy(name = "password")
    WebElement developerPassword;

    @FindBy(name = "passwordConfirmation")
    WebElement developerPasswordConfirmation;

    @FindBy(css = "button[type='button']")
    WebElement gotItButton;

    public FreelaancerApplyPage(WebDriver driver){
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public void clickOnApplyingAs() {
        applyingAs.click();
    }

    public void chooseRole(String role) {
        String locator = String.format(".//li//*[text() = '%s']", role);
        roles.findElement(By.xpath(locator)).click();
    }

    public void setDeveloperFullName (String fullname){
        developerFullName.clear();
        developerFullName.sendKeys(fullname);
    }

    public void setDeveloperEmail(String email){
        developerEmail.clear();
        developerEmail.sendKeys(email);
    }

    public void setDeveloperPassword(String password){
        developerPassword.clear();
        developerPassword.sendKeys(password);
    }

    public void  setDeveloperPasswordConfirmation(String passwordConfirmation){
        developerPasswordConfirmation.clear();
        developerPasswordConfirmation.sendKeys(passwordConfirmation);
    }

    public void clickOnGotItButton() {
        gotItButton.click();
        // wait to close
        (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.invisibilityOfElementLocated(By.xpath("//div[text()='By continuing to use this site you agree to our ']")));
    }

    public void scrollToBottom() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Scroll to the bottom of the page
        js.executeScript("window.scrollTo(0, document.body.scrollHeight)");

        // Wait until the scroll position reaches the bottom
        wait.until(webDriver -> {
            Number innerHeight = (Number) js.executeScript("return window.innerHeight;");
            Number scrollY = (Number) js.executeScript("return window.scrollY;");
            Number bodyScrollHeight = (Number) js.executeScript("return document.body.scrollHeight;");

            double innerHeightValue = innerHeight.doubleValue();
            double scrollYValue = scrollY.doubleValue();
            double bodyScrollHeightValue = bodyScrollHeight.doubleValue();

            System.out.println("Checking scroll position - Inner height: " + innerHeightValue + ", Scroll Y: " + scrollYValue + ", Body scroll height: " + bodyScrollHeightValue);

            double margin = 10.0; // Adjust as needed
            return (innerHeightValue + scrollYValue + margin) >= bodyScrollHeightValue;
        });
    }

    public boolean isPageOpened(){
        boolean isOpened = (new WebDriverWait(driver, 10))
                .until(ExpectedConditions.textToBePresentInElement(heading, "Apply to Join\n" +
                        "the World's Top Talent Network"));

        return isOpened;
    }
}
