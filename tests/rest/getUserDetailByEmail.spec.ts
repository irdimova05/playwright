import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/register_page';
import { ConsentPage } from '../../pages/consent_page';
import { Header } from '../../pages/header';
import { uniqueEmail } from '../../utils/email';

let registeredEmail: string;


test.describe('Get User Detail By Email', () => {

    test.beforeAll(async ({ browser }) => {
  // create a fresh context+page to perform UI registration as precondition
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('/');

  const consent = new ConsentPage(page);
  const register = new RegisterPage(page);
  const header = new Header(page);

  registeredEmail = uniqueEmail();

  await consent.acceptConsent();
  await header.navigateToSignupLogin();
  await register.startSignup('test', registeredEmail);
  await register.chooseTitle('Mr.');
  await register.setPassword('test123');
  await register.setDob('9', '7', '2005');
  await register.fillPersonalNames('test', 'test');
  await register.fillCompany('');
  await register.fillAddress('address 1');
  await register.fillState('state');
  await register.fillCityZip('city');
  await register.fillZipcode('1222');
  await register.fillMobile('0123456789');
  await register.createAccount();
  await register.continueAfterCreate();
  await header.logoutUser();

  await context.close();
});

  test('should return user details for a valid email', async ({ request }) => {
    const email = registeredEmail;

    const response = await request.get(`/api/getUserDetailByEmail`, {
      params: { email },
      headers: { 'Accept': 'application/json' },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('user');
    const user = body.user;

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email', email);

    console.log('User detail response:', user);
  });

  test('should return error or empty detail for non-existing email', async ({ request }) => {
    const invalidEmail = `doesnotexist_${Date.now()}@example.com`;

    const response = await request.get(`/api/getUserDetailByEmail`, {
      params: { email: invalidEmail },
      headers: { 'Accept': 'application/json' }
    });

    expect(response.status()).toBe(404);
  });

  test('missing parameter should return error', async ({ request }) => {
    const response = await request.get(`/api/getUserDetailByEmail`, {
      // no params
        headers: { 'Accept': 'application/json' }

    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty('message');
    expect(body.message).toMatch("Bad request, email parameter is missing in GET request.");
    });

});