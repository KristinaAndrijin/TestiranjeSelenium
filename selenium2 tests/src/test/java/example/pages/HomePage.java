package example.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class HomePage {
    private WebDriver driver;

    private static String PAGE_URL="http://localhost:4200/edit";

    @FindBy(how = How.LINK_TEXT, using = "Apply as a Freelancer")
    private WebElement freelancerApplyButton;

    public HomePage(WebDriver driver){
        this.driver=driver;
        driver.get(PAGE_URL);

        PageFactory.initElements(driver, this);
    }

    public void clickOnEditButton() throws InterruptedException {
        java.util.List<WebElement> availabilityCards = driver.findElements(By.cssSelector(".card"));
//        for (WebElement card : availabilityCards) {
//            WebElement cardEditButton = card.findElement(By.cssSelector(".buttondiv button"));
//            cardEditButton.click();
//            Thread thread = new Thread();
//            thread.sleep(5000);
//            driver.navigate().back();
//        }
        WebElement card = availabilityCards.get(0);
        WebElement cardEditButton = card.findElement(By.cssSelector(".buttondiv button"));
        cardEditButton.click();
        EditFormPage editFormPage = new EditFormPage(driver);
        editFormPage.setForm();
//        driver.navigate().back();
//        (new WebDriverWait(driver, 10))
//                .until(ExpectedConditions.elementToBeClickable(freelancerApplyButton)).click();
    }
}
