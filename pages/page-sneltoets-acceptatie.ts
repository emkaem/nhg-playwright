import { type Locator, type Page } from '@playwright/test';

// Define an interface for the form fields
interface SneltoetsFormFields {
    gewenstLeenbedrag?: string;
    waarvanInBox3?: string;
    hypotheekrente?: string;
    gewensteLooptijd?: string;
    jaarlijksErfpactcanon?: string;
    energielabel?: string;
    geboortedatum?: string;
    brutoJaarinkomen?: string;
    verminderdInkomen?: string;
    vanafMaand?: string;
    sprakeVanMedeaanvrager?: 'Ja' | 'Nee';
    medeaanvragerGeboortedatum?: string;
    medeaanvragerBrutoJaarinkomen?: string;
    medeaanvragerVerminderdInkomen?: string;
    medeaanvragerVanafMaand?: string;
    financieleVerplichtingen?: 'Ja' | 'Nee';
    financieleVerplichtingenBedragMaandelijks?: string;
    financieleVerplichtingenAantalMaanden?: string;
    financieleVerplichtingenHoogteMaandelijkseAlimentatieplicht?: string;
    financieleVerplichtingenAantalMaandenAlimentatieplicht?: string;
}

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

    // Update the function to use the interface
    async fillSneltoetsForm(fields: SneltoetsFormFields) {
        await this.inputGewenstLeenbedrag.fill(fields.gewenstLeenbedrag || '');
        await this.inputWaarvanInBox3.fill(fields.waarvanInBox3 || '');
        await this.inputHypotheekrente.fill(fields.hypotheekrente || '');
        await this.inputGewensteLooptijd.fill(fields.gewensteLooptijd || '');
        await this.inputJaarlijksErfpactcanon.fill(fields.jaarlijksErfpactcanon || '');
        if (fields.energielabel) {
            await this.dropdownEnergielabel.selectOption(fields.energielabel);
        }
        await this.dateGeboortedatum.fill(fields.geboortedatum || '');
        await this.inputBrutoJaarinkomen.fill(fields.brutoJaarinkomen || '');
        await this.inputVerminderdInkomen.fill(fields.verminderdInkomen || '');
        await this.inputVanafMaand.fill(fields.vanafMaand || '');

        if (fields.sprakeVanMedeaanvrager === 'Ja') {
            await this.radiobuttonSprakeVanMedeaanvrager.getByLabel('Ja').check();
            await this.dateMedeaanvragerGeboortedatum.fill(fields.medeaanvragerGeboortedatum || '');
            await this.inputMedeaanvragerBrutoJaarinkomen.fill(fields.medeaanvragerBrutoJaarinkomen || '');
            await this.inputMedeaanvragerVerminderdInkomen.fill(fields.medeaanvragerVerminderdInkomen || '');
            await this.inputMedeaanvragerVanafMaand.fill(fields.medeaanvragerVanafMaand || '');
        } else if (fields.sprakeVanMedeaanvrager === 'Nee') {
            await this.radiobuttonSprakeVanMedeaanvrager.getByLabel('Nee').check();
        }

        if (fields.financieleVerplichtingen === 'Ja') {
            await this.radiobuttonFinancieleVerplichtingen.getByLabel('Ja').check();
            await this.inputFinancieleVerplichtingenBedragMaandelijks.fill(fields.financieleVerplichtingenBedragMaandelijks || '');
            await this.inputFinancieleVerplichtingenAantalMaanden.fill(fields.financieleVerplichtingenAantalMaanden || '');
            await this.inputFinancieleVerplichtingenHoogteMaandelijkseAlimentatieplicht.fill(fields.financieleVerplichtingenHoogteMaandelijkseAlimentatieplicht || '');
            await this.inputFinancieleVerplichtingenAantalMaandenAlimentatieplicht.fill(fields.financieleVerplichtingenAantalMaandenAlimentatieplicht || '');
        } else if (fields.financieleVerplichtingen === 'Nee') {
            await this.radiobuttonFinancieleVerplichtingen.getByLabel('Nee').check();
        }
    }
}