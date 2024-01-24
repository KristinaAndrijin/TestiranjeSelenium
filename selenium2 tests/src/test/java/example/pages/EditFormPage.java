package example.pages;


import example.helper.Helper;
import org.openqa.selenium.*;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Date;

public class EditFormPage {

    private WebDriver driver;

    public EditFormPage(WebDriver driver){
        this.driver=driver;
//        driver.get(PAGE_URL);

        PageFactory.initElements(driver, this);

    }

    public void setForm() {
        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        WebDriverWait wait = new WebDriverWait(driver, 10); // 10 seconds timeout
        try {
            WebElement startDateField = driver.findElement(By.id("startDate"));
            startDateField.clear();
            startDateField.sendKeys("2023-01-01");
    //        jsExecutor.executeScript("arguments[0].value='2030-01-02';", startDateField);
    //        jsExecutor.executeScript("arguments[0].dispatchEvent(new Event('change'))", startDateField);
    //        wait.until(ExpectedConditions.attributeToBeNotEmpty(startDateField, "value"));

            WebElement endDateField = driver.findElement(By.id("endDate"));
//            endDateField.clear();
    //        jsExecutor.executeScript("arguments[0].value='2017-01-01';", endDateField);
    //        jsExecutor.executeScript("arguments[0].dispatchEvent(new Event('change'))", endDateField);
    //        wait.until(ExpectedConditions.attributeToBeNotEmpty(endDateField, "value"));
            endDateField.clear();
            endDateField.sendKeys("2023-01-10");


            WebElement deadlineField = driver.findElement(By.id("deadline"));
//            deadlineField.clear();
    //        jsExecutor.executeScript("arguments[0].value='2017-01-01';", deadlineField);
    //        jsExecutor.executeScript("arguments[0].dispatchEvent(new Event('change'))", deadlineField);
    //        wait.until(ExpectedConditions.attributeToBeNotEmpty(deadlineField, "value"));
            deadlineField.clear();
            deadlineField.sendKeys("2023-01-05");

            WebElement priceTypePerGuest = driver.findElement(By.xpath("//input[@value='perGuest']"));
            priceTypePerGuest.click();

            WebElement priceField = driver.findElement(By.id("price"));
            priceField.clear();
            priceField.sendKeys("500");
            jsExecutor.executeScript("arguments[0].dispatchEvent(new Event('change'))", priceField);
            wait.until(ExpectedConditions.visibilityOf(priceField));
            WebElement submitButton = driver.findElement(By.xpath("//button[contains(text(),'Edit information')]"));
            submitButton.click();

            wait.until(ExpectedConditions.alertIsPresent());

//            Helper.takeScreenshoot(driver, "alert " + new Date().getTime());
            Alert alert = driver.switchTo().alert();
            String alertText = alert.getText();
            System.out.println("Alert text: " + alertText);
            alert.accept();

            System.out.println("=======================================================");

            startDateField.clear();
            startDateField.sendKeys("2024-02-01");

            endDateField.clear();
            endDateField.sendKeys("2024-02-10");

            deadlineField.clear();
            deadlineField.sendKeys("2024-02-05");

            submitButton.click();

            wait.until(ExpectedConditions.alertIsPresent());

//            Helper.takeScreenshoot(driver, "alert " + new Date().getTime());
            alert = driver.switchTo().alert();
            alertText = alert.getText();
            System.out.println("Alert text: " + alertText);
            alert.accept();

            System.out.println("=======================================================");

            startDateField.clear();
            startDateField.sendKeys("2024-02-05");

            endDateField.clear();
            endDateField.sendKeys("2024-02-02");

            deadlineField.clear();
            deadlineField.sendKeys("2024-02-01");

            submitButton.click();

            wait.until(ExpectedConditions.alertIsPresent());

//            Helper.takeScreenshoot(driver, "alert " + new Date().getTime());
            alert = driver.switchTo().alert();
            alertText = alert.getText();
            System.out.println("Alert text: " + alertText);
            alert.accept();

            System.out.println("=======================================================");

            startDateField.clear();
            startDateField.sendKeys("2024-02-05");

            endDateField.clear();
            endDateField.sendKeys("2024-02-10");

            deadlineField.clear();
            deadlineField.sendKeys("2024-02-01");

            submitButton.click();

            Helper.takeScreenshoot(driver, "" + new Date().getTime());

//            wait.until(ExpectedConditions.alertIsPresent());

//            Helper.takeScreenshoot(driver, "alert " + new Date().getTime());
//            alert = driver.switchTo().alert();
//            alertText = alert.getText();
//            System.out.println("Alert text: " + alertText);
//            alert.accept();




        } catch (UnhandledAlertException e) {
            Helper.takeScreenshoot(driver, "alert catch " + new Date().getTime());
//            Alert alert = driver.switchTo().alert();
//            String alertText = alert.getText();
//            System.out.println("Alert text catch: " + alertText);
//            alert.accept();
        }

    }



}
