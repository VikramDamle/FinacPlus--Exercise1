const fs = require('fs-extra');

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.firstProduct = page.locator('.inventory_item_name').first();
        this.firstProductPrice = page.locator('.inventory_item_price').first();
        this.addToCartButton = page.locator('.btn_inventory').first();
        this.cartIcon = page.locator('.shopping_cart_link');
        this.inventoryContainer = '#inventory_container'; 
    }

    async isProductsPageDisplayed() {
        return await this.page.isVisible(this.inventoryContainer);
    }

    async getFirstProductDetails() {
        const productName = await this.firstProduct.textContent();
        const productPrice = await this.firstProductPrice.textContent();
        fs.writeFileSync('productDetails.txt', `Product: ${productName}\nPrice: ${productPrice}`);
        return { productName, productPrice };
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async navigateToCart() {
        await this.cartIcon.click();
    }
}

module.exports = ProductsPage;
 