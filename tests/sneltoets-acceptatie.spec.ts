import { test, expect } from '@playwright/test';
import { SneltoetsAcceptatie } from '../pages/page-sneltoets-acceptatie';
import { sneltoetsMinimalInput, sneltoetsMaximumInput } from '../fixtures/data-sneltoets-acceptatie';
import { format } from 'date-fns';

const today = new Date();
const dateToday = format(today, 'dd-MM-yyyy');

test.beforeEach(async ({ page }) => {
  const sneltoetsAcceptatie = new SneltoetsAcceptatie(page);
  await sneltoetsAcceptatie.visitPage();
});

test('happy flow filling in NHG Sneltoets with minimal input', async ({ page }) => {
  const sneltoetsAcceptatie = new SneltoetsAcceptatie(page);

  await sneltoetsAcceptatie.fillSneltoetsForm(sneltoetsMinimalInput);
  await sneltoetsAcceptatie.clickSneltoetsBerekenButton();

  await expect(sneltoetsAcceptatie.headerResultaat).toBeVisible();
  await expect(sneltoetsAcceptatie.valueDatumToetsing).toHaveText(dateToday);
  await expect(sneltoetsAcceptatie.valueIndicatieLening).toHaveText('5.110');
  await expect(page).toHaveScreenshot('sneltoets-minimal-input-desktop.png');
});

test('happy flow filling in NHG Sneltoets with maximum input', async ({ page }) => {
  const sneltoetsAcceptatie = new SneltoetsAcceptatie(page);

  await sneltoetsAcceptatie.fillSneltoetsForm(sneltoetsMaximumInput);
  await sneltoetsAcceptatie.clickSneltoetsBerekenButton();

  await expect(sneltoetsAcceptatie.headerResultaat).toBeVisible();
  await expect(sneltoetsAcceptatie.valueDatumToetsing).toHaveText(dateToday);
  await expect(sneltoetsAcceptatie.valueIndicatieLening).toHaveText('46.738');
  await expect(page).toHaveScreenshot('sneltoets-maximum-input-desktop.png');
});

test('Sneltoets with restschuld "nee" and empty all fields', async ({ page }) => {
  const sneltoetsAcceptatie = new SneltoetsAcceptatie(page);

  await sneltoetsAcceptatie.clearSneltoetsForm({
    sprakeVanMedeaanvrager: 'Ja',
    financieleVerplichtingen: 'Ja',
  });
  await sneltoetsAcceptatie.clickSneltoetsBerekenButton();

  // assert "Resultaat" header is not visible nor the other fields
  await expect(sneltoetsAcceptatie.headerResultaat).not.toBeAttached();
  await expect(sneltoetsAcceptatie.valueDatumToetsing).not.toBeAttached();
  await expect(sneltoetsAcceptatie.valueIndicatieLening).not.toBeAttached();

  // assert error messages are displayed
  await expect(sneltoetsAcceptatie.inputGewenstLeenbedragError).toBeVisible();
  await expect(sneltoetsAcceptatie.inputJaarlijksErfpactcanonError).toBeVisible();
  await expect(sneltoetsAcceptatie.inputBrutoJaarinkomenError).toBeVisible();
  await expect(sneltoetsAcceptatie.inputMedeaanvragerBrutoJaarinkomenError).toBeVisible();
  await expect(page).toHaveScreenshot('sneltoets-empty-fields-input-desktop.png');
});

test('Sneltoets data retention in the fields when switching between "restschuld nee > ja"', async ({ page }) => {
  const sneltoetsAcceptatie = new SneltoetsAcceptatie(page);
});

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
