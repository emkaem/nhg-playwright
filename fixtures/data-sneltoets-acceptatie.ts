import { SneltoetsFormFields } from '../pages/page-sneltoets-acceptatie';

export const sneltoetsMinimalInput: SneltoetsFormFields = {
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
};

export const sneltoetsMaximumInput: SneltoetsFormFields = {
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
    financieleVerplichtingenAantalMaandenAlimentatieplicht: '24',
};