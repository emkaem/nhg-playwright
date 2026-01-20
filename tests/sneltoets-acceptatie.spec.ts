import { test, expect } from '@playwright/test';
import { SneltoetsAcceptatie } from '../pages/page-sneltoets-acceptatie';

test.beforeEach(async ({ page }) => {
  const sneltoetsAcceptatie = new SneltoetsAcceptatie(page);
  await sneltoetsAcceptatie.visitPage();
});

test('happy flow filling in NHG Sneltoets with minimal input', async ({ page }) => {
    const sneltoetsAcceptatie = new SneltoetsAcceptatie(page);

    // Use the generic function to fill the form with specific values
    await sneltoetsAcceptatie.fillSneltoetsForm({
        gewenstLeenbedrag: '250000',
        waarvanInBox3: '5000',
        hypotheekrente: '3,5',
        gewensteLooptijd: '30',
        jaarlijksErfpactcanon: '1200',
        energielabel: 'B',
        geboortedatum: '13-01-1985',
        brutoJaarinkomen: '60000',
        verminderdInkomen: '0',
        vanafMaand: '1',
        sprakeVanMedeaanvrager: 'Nee',
        financieleVerplichtingen: 'Nee',
    });

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

test('happy flow filling in NHG Sneltoets with maximum input', async ({ page }) => {
    const sneltoetsAcceptatie = new SneltoetsAcceptatie(page);
    
    // Use the generic function to fill the form with specific values
    await sneltoetsAcceptatie.fillSneltoetsForm({
        gewenstLeenbedrag: '470000',
        waarvanInBox3: '25000',
        hypotheekrente: '23,5',
        gewensteLooptijd: '96',
        jaarlijksErfpactcanon: '100',
        energielabel: 'A++',
        geboortedatum: '13-06-1975',
        brutoJaarinkomen: '123000',
        verminderdInkomen: '1000',
        vanafMaand: '6',
        sprakeVanMedeaanvrager: 'Ja',
        medeaanvragerGeboortedatum: '20-12-1980',
        medeaanvragerBrutoJaarinkomen: '80000',
        medeaanvragerVerminderdInkomen: '500',
        medeaanvragerVanafMaand: '7',
        financieleVerplichtingen: 'Ja',
        financieleVerplichtingenBedragMaandelijks: '750',
        financieleVerplichtingenAantalMaanden: '12',
        financieleVerplichtingenHoogteMaandelijkseAlimentatieplicht: '345',
        financieleVerplichtingenAantalMaandenAlimentatieplicht: '24'
    });

    const responsePromise = page.waitForResponse(
        response => response.url().includes('/xas/')
    );    
    await sneltoetsAcceptatie.buttonBereken.click();

    const response =  await responsePromise;
    expect(response.status()).toBe(200);


    await expect(sneltoetsAcceptatie.headerResultaat).toBeVisible();

    await expect(sneltoetsAcceptatie.valueDatumToetsing).toHaveText('20-01-2026');
    await expect(sneltoetsAcceptatie.valueIndicatieLening).toHaveText('46.738');
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

