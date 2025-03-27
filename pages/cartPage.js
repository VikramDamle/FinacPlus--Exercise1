class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItem = page.locator('.cart_item'); // Correct locator for cart items
        this.menuButton = page.locator('#react-burger-menu-btn'); // Menu button locator
        this.logoutButton = page.locator('[data-test="logout-sidebar-link"]'); // Logout button locator
        this.cartItemName = '.cart_item .inventory_item_name';
    }


    async verifyProductInCart(productName) {
        const cartItems = await this.page.$$(this.cartItemName);
        for (let item of cartItems) {
            const name = await item.textContent();
            if (name.trim() === productName.trim()) {
                return true;
            }
        }
        return false;
    }

    async logout() {
        await this.menuButton.click();
        await this.page.waitForSelector('[data-test="logout-sidebar-link"]');
        //await this.page.waitForSelector(this.logoutButton, { state: 'visible' });
        await this.logoutButton.click();
    }

}

module.exports = CartPage;
