import { Page, Locator } from '@playwright/test';

export class LoginPage {
	readonly page: Page;
	readonly loginForm: Locator;
	readonly loginEmailInput: Locator;
	readonly loginPasswordInput: Locator;
	readonly loginButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.loginForm = page.locator('form', { hasText: 'Login' });
		this.loginEmailInput = page.locator('[data-qa="login-email"]');
		this.loginPasswordInput = page.locator('[data-qa="login-password"]');
		this.loginButton = page.getByRole('button', { name: 'Login' });
	}

	async login(email: string, password: string) {
		await this.loginEmailInput.fill(email);
		await this.loginPasswordInput.fill(password);
		await this.loginButton.click();
	}
}
