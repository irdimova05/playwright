import { Page, Locator } from '@playwright/test';

export class ConsentPage {
	readonly page: Page;
	readonly consentButton: Locator;
	readonly privacySettingsButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.consentButton = page.getByRole('button', { name: 'Consent' });
		this.privacySettingsButton = page.getByRole('button', { name: 'Privacy and cookie settings' });
	}

	async acceptConsent() {
		await this.consentButton.click();
	}
}
