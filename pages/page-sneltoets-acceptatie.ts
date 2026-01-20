import { type Locator, type Page } from '@playwright/test';

export class SneltoetsAcceptatie {
    readonly page: Page;
    readonly inputGewenstLeenbedrag: Locator;
    readonly inputWaarvanInBox3: Locator;
    readonly inputHypotheekrente: Locator;
    readonly inputGewensteLooptijd: Locator;
    readonly inputJaarlijksErfpactcanon: Locator;
    readonly dropdownEnergielabel: Locator;
    readonly dateGeboortedatum: Locator;
    readonly inputBrutoJaarinkomen: Locator;
    // aow datum Leeg
    // pension en/of aow staat op 0
    // lijfrente staat op 0
    readonly inputVerminderdInkomen: Locator;
    readonly inputVanafMaand: Locator;

    readonly radiobuttonSprakeVanMedeaanvrager: Locator;
    readonly dateMedeaanvragerGeboortedatum: Locator;
    readonly inputMedeaanvragerBrutoJaarinkomen: Locator;
    readonly inputMedeaanvragerVerminderdInkomen: Locator;
    readonly inputMedeaanvragerVanafMaand: Locator;

    readonly radiobuttonFinancieleVerplichtingen: Locator;
    readonly inputFinancieleVerplichtingenBedragMaandelijks: Locator;
    readonly inputFinancieleVerplichtingenAantalMaanden: Locator;
    readonly inputFinancieleVerplichtingenHoogteMaandelijkseAlimentatieplicht: Locator;
    readonly inputFinancieleVerplichtingenAantalMaandenAlimentatieplicht: Locator;

    readonly buttonBereken: Locator;
    readonly headerResultaat: Locator;
    readonly valueDatumToetsing: Locator;
    readonly valueIndicatieLening: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputGewenstLeenbedrag = page.getByRole('textbox', { name: 'Gewenst leenbedrag' })
        this.inputWaarvanInBox3 = page.getByRole('textbox', { name: 'Waarvan in box 3' })
        this.inputHypotheekrente = page.locator('label:has-text("Hypotheekrente") ~ div input');
        this.inputGewensteLooptijd = page.locator('label:has-text("Gewenste looptijd") ~ div input');
        this.inputJaarlijksErfpactcanon = page.getByRole('textbox', { name: 'Jaarlijks erfpachtcanon' })
        this.dropdownEnergielabel = page.getByLabel('Energielabel');
        this.dateGeboortedatum = page.getByRole('textbox', { name: 'Geboortedatum' })
        this.inputBrutoJaarinkomen = page.getByRole('textbox', { name: 'Bruto jaarinkomen' })
        this.inputVerminderdInkomen = page.getByRole('textbox', { name: 'Verminderd inkomen' })
        this.inputVanafMaand = page.getByRole('textbox', { name: 'Vanaf maand' })

        this.radiobuttonSprakeVanMedeaanvrager = page.getByRole('radiogroup', { name: 'Sprake van medeaanvrager' })
        this.dateMedeaanvragerGeboortedatum = page.getByTestId('391.InkomensToets.NhgInkToetsContent_201801.dataView3').getByRole('textbox', { name: 'Geboortedatum' });
        this.inputMedeaanvragerBrutoJaarinkomen = page.getByTestId('391.InkomensToets.NhgInkToetsContent_201801.dataView3').getByRole('textbox', { name: 'Bruto jaarinkomen' });
        this.inputMedeaanvragerVerminderdInkomen = page.getByTestId('391.InkomensToets.NhgInkToetsContent_201801.dataView3').getByRole('textbox', { name: 'Verminderd inkomen' });
        this.inputMedeaanvragerVanafMaand = page.getByTestId('391.InkomensToets.NhgInkToetsContent_201801.dataView3').getByRole('textbox', { name: 'Vanaf maand' });

        this.radiobuttonFinancieleVerplichtingen = page.getByRole('radiogroup', { name: 'Financiële verplichtingen?' })
        this.inputFinancieleVerplichtingenBedragMaandelijks = page.getByTestId('391.InkomensToets.NhgInkToetsContent_201801.container19').getByRole('textbox', { name: 'Bedrag maandelijks' });
        this.inputFinancieleVerplichtingenAantalMaanden = page.getByTestId('391.InkomensToets.NhgInkToetsContent_201801.container19').getByRole('textbox', { name: 'Aantal maanden' }).first();
        this.inputFinancieleVerplichtingenHoogteMaandelijkseAlimentatieplicht = page.getByTestId('391.InkomensToets.NhgInkToetsContent_201801.container19').getByRole('textbox', { name: 'Hoogte maandelijkse' });
        this.inputFinancieleVerplichtingenAantalMaandenAlimentatieplicht = page.getByTestId('391.InkomensToets.NhgInkToetsContent_201801.container19').getByRole('textbox', { name: 'Aantal maanden' }).nth(1);

        this.buttonBereken = page.getByRole('button', { name: 'Bereken' }).first(); // todo: fix the .first() workaround
        // Initialize the locator for the Resultaat header
        this.headerResultaat = page.locator('h4.mx-text.mx-name-text6');
        this.valueDatumToetsing =  page.locator('.mx-datepicker', {
            has: page.locator('label', { hasText: 'Datum toetsing' })
        }).locator('.form-control-static');
        this.valueIndicatieLening =  page.locator('.mx-textbox', {
            has: page.locator('label', { hasText: 'Indicatie lening' })
        }).locator('.form-control-static');
    }
    
    async visitPage() {
    await this.page.goto('https://mijn.nhg.nl/');
  }
}