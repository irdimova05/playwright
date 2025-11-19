import { Page, Locator } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly home: Locator;
    readonly products: Locator;
    readonly cart: Locator;
    readonly signupLogin: Locator;
    readonly logout: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.home = page.getByRole('link', { name: ' Home' });
        this.products = page.getByRole('link', { name: ' Products' });
        this.cart = page.getByRole('link', { name: ' Cart' });
        this.signupLogin = page.getByRole('link', { name: ' Signup / Login' });
        this.logout = page.getByRole('link', { name: ' Logout' });
    }

    async navigateToHome() {
        await this.home.click();
    }

    async navigateToProducts() {
        await this.products.click();
    }

    async navigateToCart() {
        await this.cart.click();
    }

    async navigateToSignupLogin() {
        await this.signupLogin.click();
    }

    async logoutUser() {
        await this.logout.click();
    }
}
