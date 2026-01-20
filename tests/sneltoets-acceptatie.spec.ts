import { test, expect } from '@playwright/test';
import { SneltoetsAcceptatie } from '../pages/page-sneltoets-acceptatie';

test.beforeEach(async ({ page }) => {
  const sneltoetsAcceptatie = new SneltoetsAcceptatie(page);
  await sneltoetsAcceptatie.visitPage();
});

test('happy flow filling in NHG Sneltoets', async ({ page }) => {
    // wait for the page to load completely
    await page.waitForLoadState('networkidle');
    const sneltoetsAcceptatie = new SneltoetsAcceptatie(page);
    await sneltoetsAcceptatie.inputGewenstLeenbedrag.fill('250000');
    await sneltoetsAcceptatie.inputWaarvanInBox3.fill('5000');
    await sneltoetsAcceptatie.inputHypotheekrente.fill('3,5');
    await sneltoetsAcceptatie.inputGewensteLooptijd.fill('30');
    await sneltoetsAcceptatie.inputJaarlijksErfpactcanon.fill('1200');
    await sneltoetsAcceptatie.dropdownEnergielabel.selectOption('B');
    await sneltoetsAcceptatie.dateGeboortedatum.fill('13-01-1985');
    await sneltoetsAcceptatie.inputBrutoJaarinkomen.fill('60000');
    await sneltoetsAcceptatie.inputVerminderdInkomen.fill('0');
    await sneltoetsAcceptatie.inputVanafMaand.fill('1');
    await sneltoetsAcceptatie.radiobuttonSprakeVanMedeaanvrager.getByLabel('Nee').check();
    await sneltoetsAcceptatie.radiobuttonFinancieleVerplichtingen.getByLabel('Nee').check();

    const responsePromise = page.waitForResponse(
        response => response.url().includes('/xas/')
    );    
    await sneltoetsAcceptatie.buttonBereken.click();

    const response =  await responsePromise;
    expect(response.status()).toBe(200);


    await expect(sneltoetsAcceptatie.headerResultaat).toBeVisible();

    await expect(sneltoetsAcceptatie.valueDatumToetsing).toHaveText('20-01-2026');
    await expect(sneltoetsAcceptatie.valueIndicatieLening).toHaveText('5.110');
});

/* test: Happy flow > restschuld "nee"
    - fill in the whole form
    - click on "Bereken
    - assert the result is displayed
    - assert form that is send with API 
    - if possible, modifiy a couple of field
    - assert another calculation is done"

    modifiers: 
        > first go to restschuld "ja" fill in the extra field and verify none of those are send with the api 
*/

/* test: Happy flow > restschuld "ja"
    - fill in the whole form
    - click on "Bereken"
    - assert the result is displayed
    - assert form that is send with API 
    - if possible, modifiy a couple of field
    - assert another calculation is done"
    
    modifiers
        > toggle back and forth between restschuld "ja" and "nee" and verify the correct fields are send with the API
*/

/* test: unhappy flow > restschuld "ja"
    - fill in the whole form wrongly
    - click on "Bereken"
    - assert the error messages displayed at the fields   

    modifiers:
        >leave required fields empty
        > use special characters and diacritics in the fields
*/

/* additional visual test verification for easy manual regression testing
    - snapshot of the form before filling in data
    - snapshot of the form after filling in data
    - snapshot of the result page
    - snapshot of the error messages
*/

/* links of "Kunnen wij je helpen" */

/* Energiebespaarbudget 
    - happy + url verification
    - empty
    - NAN
    - decimals
*/

