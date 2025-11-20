import {test, expect} from '@playwright/test';
import { RegisterPage } from '../../pages/register_page';
import { ConsentPage } from '../../pages/consent_page';
import { LoginPage } from '../../pages/login_page';
import { Header } from '../../pages/header';
import { uniqueEmail } from '../../utils/email'; // <- moved here

test.beforeEach(async ({page}) => {
  await page.goto('/');
});

test('Successful register', async ({page}) => {

  const consent = new ConsentPage(page);
  const register = new RegisterPage(page);
  const login = new LoginPage(page);
  const header = new Header(page);

  const email = uniqueEmail();

  await consent.acceptConsent();
  await expect(consent.privacySettingsButton).toBeVisible();

  await header.navigateToSignupLogin();
  await expect(page).toHaveURL("/login");

  await register.startSignup('test', email);

  await register.chooseTitle("Mr.");
  await register.setPassword('test123');
  await register.setDob('9', '7', '2005');

  await register.fillPersonalNames('test', 'test');
  await register.fillCompany(''); // optional
  await register.fillAddress('address 1, 2, something to test');
  await register.fillState('test');
  await register.fillCityZip('test');
  await register.fillZipcode('1222');
  await register.fillMobile('021541524');

  await register.createAccount();

  await register.continueAfterCreate();
  await expect(register.logoutLink).toBeVisible();

  await header.logoutUser();
  await expect(page).toHaveURL("/login");

  await login.login(email, 'test123');
  await expect(register.logoutLink).toBeVisible();
});

test('Unique email validation', async ({page}) => {
  const consent = new ConsentPage(page);
  const register = new RegisterPage(page);
  const header = new Header(page); 

  const email = uniqueEmail();

  // create account with unique email
  await consent.acceptConsent();
  await header.navigateToSignupLogin();
  await register.startSignup("test", email);
  await register.chooseTitle("Mr.");
  await register.setPassword('test123');
  await register.setDob('9', '7', '2005');
  await register.fillPersonalNames('dup', 'user');
  await register.fillAddress('addr');
  await register.fillState('st');
  await register.fillCityZip('city');
  await register.fillZipcode('0000');
  await register.fillMobile('00000000');
  await register.createAccount();
  await register.continueAfterCreate();
  await header.logoutUser();

  await header.navigateToSignupLogin();
  await register.startSignup("test", email);
  // expect the duplicate-email message to be visible
  await expect(register.emailExistsError).toBeVisible();
});
