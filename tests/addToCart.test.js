const fs = require('fs-extra');
const { test, expect, chromium } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const ProductsPage = require('../pages/productsPage');
const CartPage = require('../pages/cartPage');

test.describe('SauceDemo Add to Cart Test', () => {
    let browser, page, loginPage, productsPage, cartPage;

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: false, slowMo: 500 }); // Slow motion for better visibility
        page = await browser.newPage();
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
    });

    //Before Each Test: Open SauceDemo and Login
    test.beforeEach(async () => {
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        // Verifing successful login will land the user on Products page 
        const isProductsPageVisible = await productsPage.isProductsPageDisplayed();
        expect(isProductsPageVisible).toBeTruthy();
        console.log('Login successful → Landed on Products page');
    });

    //After Each Test: Logout
    test.afterEach(async () => {
        await cartPage.logout();
    });
    
    // After All Tests: Close Browser
    test.afterAll(async () => {
        console.log('Logged Out & Closed Browser');
        await browser.close();
    });

    // Test: Add to Cart Functionality
    test('Verify add to cart functionality', async () => {

        // Read the stored product details safely
        const filePath = 'productDetails.txt';
        const { productName } = await productsPage.getFirstProductDetails();

        if (fs.existsSync(filePath)) {
        const productData = fs.readFileSync(filePath, 'utf8');
        console.log('-----Stored Product Details-----');
        console.log(productData);
        console.log('--------------------------------');
        } else {
        console.error(`Error: ${filePath} not found! Skipping file read operation.`);
        }

        
        await productsPage.addToCart();
        await productsPage.navigateToCart();
        
        const isProductInCart = await cartPage.verifyProductInCart(productName);
        expect(isProductInCart).toBeTruthy();
        console.log('Added to Cart & Verified in Cart');
         
    });
});
