import { Page, Locator } from '@playwright/test';

export class RegisterPage {
	readonly page: Page;

	readonly websiteForPracticeLink: Locator;

	readonly signupForm: Locator;
	readonly signupName: Locator;
	readonly signupEmail: Locator;
	readonly signupButton: Locator;
    readonly signupPageTitle: Locator;

	// account creation form
	readonly titleMrsRadio: Locator;
    readonly titleMrRadio: Locator;
	readonly passwordInput: Locator;
	readonly daysSelect: Locator;
	readonly monthsSelect: Locator;
	readonly yearsSelect: Locator;

	readonly firstNameInput: Locator;
	readonly lastNameInput: Locator;
	readonly companyInput: Locator;
	readonly addressInput: Locator;
	readonly stateInput: Locator;
	readonly cityZipInput: Locator;
	readonly zipcodeInput: Locator;
	readonly mobileInput: Locator;
	readonly createAccountButton: Locator;
    readonly accountCreatedText: Locator;
	readonly automationExerciseWebsiteLink: Locator;
	readonly continueLink: Locator;
	readonly logoutLink: Locator;

	readonly emailExistsError: Locator; 

	constructor(page: Page) {
		this.page = page;

		this.signupPageTitle = page.getByRole('link', { name: 'Enter Account Information' });
		this.websiteForPracticeLink = page.getByRole('link', { name: 'Website for practice' });

		this.signupForm = page.locator('form', { hasText: 'Signup' });
		this.signupName = this.signupForm.getByRole('textbox', { name: 'Name' });
		this.signupEmail = this.signupForm.getByPlaceholder('Email Address');
		this.signupButton = page.getByRole('button', { name: 'Signup' });

		this.titleMrsRadio = page.getByRole('radio', { name: 'Mrs.' });
        this.titleMrRadio = page.getByRole('radio', { name: 'Mr.' });
		this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
		this.daysSelect = page.locator('#days');
		this.monthsSelect = page.locator('#months');
		this.yearsSelect = page.locator('#years');

		this.firstNameInput = page.getByRole('textbox', { name: 'First name *' });
		this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
		this.companyInput = page.getByRole('textbox', { name: 'Company', exact: true });
		this.addressInput = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
		this.stateInput = page.getByRole('textbox', { name: 'State *' });
		this.cityZipInput = page.getByRole('textbox', { name: 'City * Zipcode *' });
		this.zipcodeInput = page.locator('#zipcode');
		this.mobileInput = page.getByRole('textbox', { name: 'Mobile Number *' });
		this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
        this.accountCreatedText = page.getByText('Account Created!');
		this.automationExerciseWebsiteLink = page.getByRole('link', { name: 'Automation Exercise website' });
		this.continueLink = page.getByRole('link', { name: 'Continue' });
		this.logoutLink = page.getByRole('link', { name: ' Logout' });

		this.emailExistsError = page.getByText('Email Address already exist!');
	}

	async startSignup(name: string, email: string) {
		await this.signupName.fill(name);
		await this.signupEmail.fill(email);
		await this.signupButton.click();
	}

	async chooseTitle(radioButton: string) {
		if (radioButton === 'Mrs.') {
            await this.titleMrsRadio.check();
        } else if (radioButton === 'Mr.') {
            await this.titleMrRadio.check();
        }
	}
	async setPassword(password: string) {
		await this.passwordInput.fill(password);
	}
	async setDob(day: string, month: string, year: string) {
		await this.daysSelect.selectOption(day);
		await this.monthsSelect.selectOption(month);
		await this.yearsSelect.selectOption(year);
	}
	async fillPersonalNames(first: string, last: string) {
		await this.firstNameInput.fill(first);
		await this.lastNameInput.fill(last);
	}
	async fillCompany(company: string) {
		await this.companyInput.fill(company);
	}
	async fillAddress(address: string) {
		await this.addressInput.fill(address);
	}
	async fillState(state: string) {
		await this.stateInput.fill(state);
	}
	async fillCityZip(cityZip: string) {
		await this.cityZipInput.fill(cityZip);
	}
	async fillZipcode(zip: string) {
		await this.zipcodeInput.fill(zip);
	}
	async fillMobile(mobile: string) {
		await this.mobileInput.fill(mobile);
	}
	async createAccount() {
		await this.createAccountButton.click();
	}
	async continueAfterCreate() {
		await this.continueLink.click();
	}
	async isEmailAlreadyUsedVisible() {
		return await this.emailExistsError.isVisible();
	}
}