import { test, expect } from '@playwright/test';

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

