---
path: '/osa-4/1-tietokannan-normalisointi'
title: 'Tietokannan normalisointi'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tiedät mitä normalisointi tarkoittaa ja mihin normalisointia käytetään.
- Tunnet ensimmäisen, toisen ja kolmannen normaalimuodon.
- Tiedät mitä funktionaalisella riippuvuudella tarkoitetaan.
- Osaat muuntaa annetun tietokantataulun kolmanteen normaalimuotoon.

</text-box>



Tietokannan normalisoinnin tavoitteena on vähentää tietokantatauluissa esiintyvää toisteista tietoa. Pääpiirteittäin tavoite on sama kuin käsiteanalyysissä -- lopulta jokainen taulu liittyy vain tiettyyn käsitteeseen ja taulun attribuutit liittyvät vain kyseisen taulun esittämään käsitteeseen.

Tietokannan normalisointi tehdään olemassaolevalle tietokannalle. Tietokannan normalisoinnissa etsimme tietokantatauluista tunnettuja epäkohtia, jonka jälkeen näitä epäkohtia korjataan.

Tunnettujen epäkohtien tunnistaminen tapahtuu askeleittain valmiita "säännöstöjä" eli normaalimuotoja seuraamalla.


## Ensimmäinen normaalimuoto

Tietokantataulu on ensimmäisessä normaalimuodossa mikäli se täyttää seuraavat ehdot:

1. Tietokantataulun sarakkeen arvot eivät sisällä listoja eli jokainen arvo on yksittäinen.
2. Taulun sarakkeet eivät saa muodostaa toistuvia ryhmiä.
3. Sarakkeen arvojen tulee olla saman tyyppisiä eli sarakkeessa ei saa olla eri tyyppisiä arvoja.
4. Jokaisen sarakkeen nimen tulee olla uniikki. Samassa tietokantataulussa ei saa olla kahta saman nimistä saraketta.
5. Sarakkeiden järjestyksen ei tule vaikuttaa tietokantataulun toimintaan.
6. Tietokantataulussa ei saa olla kahta täsmälleen samanlaista riviä.
7. Rivien järjestyksen ei tule vaikuttaa tietokantataulun toimintaan.


Tarkastellaan alla olevaa henkilöitä sisältävää tietokantataulua. Tietokantataulussa on jokaiselle henkilölle tunnus (id), nimi, sekä puhelinnumeroita.


| id  | nimi   | puhelinnumerot                |
| --  | --     | --                            |
| 1   | Larry  | 555-1024, 555-2048            |
| 2   | Moe    | 555-0512, 555-0256, 555-0128  |
| 3   | Curly  | 555-0001, 555-0002, 555-0004  |


Taulu rikkoo ehtoa 1. "Tietokantataulun sarakkeen arvot eivät sisällä listoja eli jokainen arvo on yksittäinen.". Sarakkeessa `puhelinnumerot` on useita puhelinnumeroita listana.

Ensimmäinen korjaus ylläolevaan tietokantatauluun on eritellä puhelinnumerot erillisiksi sarakkeikseen (tehty alla).

| id  | nimi   | puh1      | puh2      | puh3      |
| --  | --     | --        | --        | --        |
| 1   | Larry  | 555-1024  | 555-2048  |           |
| 2   | Moe    | 555-0512  | 555-0256  | 555-0128  |
| 3   | Curly  | 555-0001  | 555-0002  | 555-0004  |


Tämä ei kuitenkaan ole hyvä ratkaisu. Puhelinnumerojen hakeminen on tietokantataulusta monimutkaista, jonka lisäksi neljännen (tai viidennen, tai kuudennen, ...) puhelinnumeron lisääminen vaatisi tietokantataulun rakenteen muuttamista siten, että tauluun lisättäisiin uusia sarakkeita.

Yllä oleva ratkaisu, missä tietokantataulu sisältää kolme erillistä saraketta puhelinnumeroille rikkoo myös ensimmäisen normaalimuodon ehtoa 2. "Taulun sarakkeet eivät saa muodostaa toistuvia ryhmiä." sillä puhelinnumerot muodostavat toistuvan ryhmän.

Parempi korjaus ongelmaan on luoda erillinen tietokantataulu puhelinnumeroille. Luodaan tietokantataulut `Henkilo` ja `Puhelinnumero`. Henkilön ja puhelinnumeron välillä on yhden suhden moneen -yhteys, eli yhteen henkilöön liittyy monta puhelinnumeroa, mutta jokainen puhelinnumero liittyy yhteen henkilöön.

Taulussa Henkilo on nyt vain henkilön yksilöivä pääavain sekä henkilön nimi.

| id  | nimi   |
| --  | --     |
| 1   | Larry  |
| 2   | Moe    |
| 3   | Curly  |

Tauluun puhelinnumero lisätään rivin yksilöivä pääavain, viiteavain henkilöön, ja puhelinnumero. Periaatteessa puhelinnumerokin voisi olla taulun pääavain.

| id   | henkilo_id  | puhelinnumero  |
| --   | --          | --             |
| 1    | 1           | 555-1024       |
| 2    | 1           | 555-2048       |
| 3    | 2           | 555-0512       |
| 4    | 2           | 555-0256       |
| ...  | ...         | ...            |


**Huom!** Esimerkkimme ei tarkoita sitä, että puhelinnumero tulee *aina* eristää omaksi käsitteekseen. Päinvastoin, puhelinnumero on tyypillisesti hyvä attribuutti. Esimerkissämme henkilöllä kuitenkin voi olla monta puhelinnumeroa, jolloin muunnos tarvitaan -- ensimmäinen normaalimuoto vaatii käytännössä toistuvien sarakejoukkojen eristämisen omaksi taulukseen.

Ensimmäisen normaalimuodon ehdot 3.--7. pätevät, joten tietokantataulu Henkilo on ensimmäisessä normaalimuodossa. Koska teimme uuden taulun Puhelinnumero, tulee sekin normalisoida. Tässä tapauksessa myös taulu Puhelinnumero on ensimmäisessä normaalimuodossa.

<quiznator id="5c55dabe3972a91474103328"></quiznator>


### Funktionaalinen riippuvuus


Ensimmäisessä normaalimuodossa otetaan ensiaskeleet tietokannan rakenteen järkevöittämiseen. Muissa normaalimuodoissa käsite **funktionaalinen riippuvuus** sarakkeiden välillä on oleellinen.

Funktionaalisella riippuvuudella tarkoitetaan tilannetta, missä sarakkeen arvon perusteella voidaan selvittää (yksikäsitteinen) toisen sarakkeen arvo. Esimerkiksi sähköpostiosoitteella voidaan saada selville yksikäsitteinen sähköpostin vastaanottajan nimi.

Yleisemmin ottaen mikä tahansa sarake B on funktionaalisesti riippuvainen sarakkeesta A (A määrää funktionaalisesti B:n), jos sarakkeen A arvon perusteella voidaan yksikäsitteisesti selvittää sarakkeen B arvo. Tällöin kirjoitetaan `A -> B`, ja sanotaan, että "sarake B on funktionaalisesti riippuvainen sarakkeesta A".

**Huom!** A voi olla myös kokoelma sarakkeita!

*Esimerkiksi henkilön nimi on funktionaalisesti riippuvainen henkilötunnuksesta, sillä henkilötunnuksen perusteella voidaan yksikäsitteisesti selvittää nimi. Toisaalta, henkilötunnus ei ole funktionaalisesti riippuvainen henkilön nimestä, koska useammalla henkillä voi olla sama nimi.*

SQL-kielessä selvittäminen voi tapahtua kyselyllä `SELECT DISTINCT b FROM Taulu WHERE a=tiedetty_arvo`, missä avainsana DISTINCT palauttaa uniikit rivit. Jos attribuutti `b` on funktionaalisesti riippuva `a`:sta, tuottaa ylläoleva kysely joko yhden tai ei yhtään tulosriviä, mutta ei koskaan enempää. Tämän ehdon on oltava voimassa aina ja jokaiselle mahdolliselle sarakkeen `a` arvolle , ei vain hetkellisesti.

Tietokantataulun sarakkeiden välistä funktionaalista riippuvuutta voi tarkastella luomalla tietokantataulun sarakkeista sarake  `x` sarake -matriisin, missä kukin solu kertoo onko sarakepari riippuvainen toisistaan. Alla on kuvattuna tietokantataulu `Henkilo` , jolla on sarakkeet `id`, `nimi` ja `henkilotunnus`. Sarake `id` on pääavain. Tarkastellaan mitkä sarakkeen arvot ovat funktionaalisesti riippuvaisia toisistaan?


|                   | A: id  | A: nimi  | A:henkilotunnus  |
| --                | --     | --       | --               |
| B: id             | ?      | ?        | ?                |
| B: nimi           | ?      | ?        | ?                |
| B: henkilotunnus  | ?      | ?        | ?                |

Tarkastellaan lausetta "Sarake B on funktionaalisesti riippuvainen sarakkeesta A (A määrää funktionaalisesti B:n), jos sarakkeen A arvon perusteella voidaan yksikäsitteisesti selvittää sarakkeen B arvo.". Sarakkeen perusteella voi aina määritellä itsensä. Esimerkiksi `id -> id` on aina totta ja kysely `SELECT DISTINCT nimi FROM Henkilo WHERE nimi = 'esimerkki'` palauttaa aina korkeintaan yhden rivin.


|                   | A: id  | A: nimi  | A:henkilotunnus  |
| --                | --     | --       | --               |
| B: id             | kyllä  | ?        | ?                |
| B: nimi           | ?      | kyllä    | ?                |
| B: henkilotunnus  | ?      | ?        | kyllä            |


Voimmeko tunnistaa nimen perusteella henkilön yksilöivän tunnisteen? Useammalla henkilöllä voi olla sama nimi, joten tämä ei pidä paikkansa.


|                   | A: id  | A: nimi  | A:henkilotunnus  |
| --                | --     | --       | --               |
| B: id             | kyllä  | ei        | ?                |
| B: nimi           | ?      | kyllä    | ?                |
| B: henkilotunnus  | ?      | ?        | kyllä            |


Voimmeko tunnistaa henkilötunnuksen perusteella henkilön yksilöivän tunnisteen? Henkilötunnus on uniikki, joten oletetaan että kyllä (tämä pätee tosin vain Suomessa..).


|                   | A: id  | A: nimi  | A:henkilotunnus  |
| --                | --     | --       | --               |
| B: id             | kyllä  | ei       | kyllä            |
| B: nimi           | ?      | kyllä    | ?                |
| B: henkilotunnus  | ?      | ?        | kyllä            |


Voiko yksilöivän avaimen perusteella tunnistaa henkilön nimen? Kyllä.


|                   | A: id  | A: nimi  | A:henkilotunnus  |
| --                | --     | --       | --               |
| B: id             | kyllä  | ei       | kyllä            |
| B: nimi           | kyllä  | kyllä    | ?                |
| B: henkilotunnus  | ?      | ?        | kyllä            |


Yllä olevassa esimerkissä muutama vaihtoehdoista jää kysymysmerkeiksi. Ratkaiset nämä seuraavaksi.


<quiznator id="5c55d87f3972a91474103323"></quiznator>

<quiznator id="5c55d5fd14524713f95a16cd"></quiznator>


### Toinen normaalimuoto


Tietokantataulu on toisessa normaalimuodossa jos (1) se on ensimmäisessä normaalimuodossa ja (2) tietokantataulun sarakkeet (poislukien avaimet) ovat *funktionaalisesti riippuvaisia* tietokantataulun (yhdellä sarakkeella määritellystä) pääavaimesta.


Jos tietokantataulun pääavain on määritelty yhden sarakkeen avulla, ovat kaikki tietokantataulun sarakkeet automaattisesti funktionaalisesti riippuvaisia pääavaimesta. Käytännössä siis, jos taulu on ensimmäisessä normaalimuodossa ja sillä on yhden sarakkeen avulla määritelty pääavain, on se automaattisesti toisessa normaalimuodossa.


Jos taas tietokantataulun pääavain on määritelty useamman sarakkeen avulla, tulee tietokantataulun jokaisen sarakkeen olla riippuvainen koko avaimesta, eli osittaista riippuvuutta pääavaimesta ei sallita. Tarkastellaan tilannetta, missä tietokantataulun pääavain on määritelty useamman sarakkeen kautta ja tällainen tilanne tapahtuu.


Tarkastellaan seuraavia tietokantatauluja `Asiakas`, `Kauppa` ja `Ostos`. Ensimmäisessä kahdessa tietokantataulussa pääavain on id. Oletetaan, että kolmannessa taulussa pääavain on määrätty kahden viiteavaimen yhdistelmänä.

- Asiakas ((pk) id, nimi)
- Kauppa ((pk) id, nimi, osoite)
- Ostos ((fk) asiakas\_id -&gt; Asiakas, (fk) kauppa\_id -&gt; Kauppa, hinta, kaupunki)

Taulut `Asiakas` ja `Kauppa` ovat ensimmäisessä ja toisessa normaalimuodossa.

Tarkastellaan seuraavaa taulua `Ostos`. Taulun `Ostos` sarake hinta kertoo ostoksen hinnan. Sarake kaupunki kertoo missä ostos tehtiin.

| asiakas_id  |	kauppa_id  | hinta  | kaupunki  |
| --          | --         | --     | --        |
| 1           | 1          | 14.90  | Helsinki  |
| 1           | 3          | 15.20  | Vantaa    |
| 2           | 1          | 8.40   | Helsinki  |
| 3           | 2          | 19.20  | Espoo     |
| 3           | 3          | 10.40  | Vantaa    |
| 4           | 1          | 12.20  | Helsinki  |
| ...         | ...        | ...    | ...       |


Kun tarkastelemme taulua `Ostos`, huomaamme, että tietokantataulun sarake kaupunki on funktionaalisesti riippuvainen sarakkeesta kauppa\_id. Koska sarake kauppa\_id on osa tietokantataulun pääavaimesta (oletamme, että pääavain muodostuu sarakkeista asiakas\_id ja kauppa\_id), tämä rikkoo toista normaalimuotoa.

Eräs mahdollinen ratkaisu ongelmaan on kaupungin siirtäminen tauluun `Kauppa`.

- Asiakas ((pk) id, nimi)
- Kauppa ((pk) id, nimi, osoite, kaupunki)
- Ostos ((fk) asiakas\_id -&gt; Asiakas, (fk) kauppa\_id -&gt; Kauppa, hinta)

Nyt jokainen ylläolevista tietokantatauluista on ensimmäisessä ja toisessa normaalimuodossa.


<quiznator id="5c55fd71017ffc13eddca4bd"></quiznator>


<text-box variant='hint' name='Kandidaattiavain'>

Toisen normaalimuodon voi määritellä myös kandidaattiavain-käsitteen kautta. Tietokantataulun kandidaattiavaimet määritellään niiden tietokantataulun sarakkeiden joukkona, joiden avulla tietokantataulun rivit voidaan yksilöidä. Toisin sanoen, kandidaattiavainjoukko mahdollistaa tietokantataulun rivin yksilöimisen.

Tietokantataululle voidaan määritellä tyypillisesti useampia kandidaattiavaimia, mutta näistä valitaan vain yksi tietokantataulun pääavaimeksi. Tarkastellaan taulua Henkilö, joka sisältää sarakkeet syntymäaika, etunimi, sukunimi ja puhelinnumero.

Kandidaattiavaimia etsitään sarakkeiden avulla muodostetusta joukkojen joukosta: {{syntymäaika}, {etunimi}, {sukunimi}, {puhelinnumero}, {syntymäaika, etunimi}, {syntymäaika, sukunimi}, {syntymäaika, puhelinnumero}, {etunimi, sukunimi}, {etunimi, puhelinnumero}, {syntymäaika, etunimi, sukunimi}, {syntymäaika, etunimi, puhelinnumero}, {syntymäaika, sukunimi, puhelinnumero}, {etunimi, sukunimi, puhelinnumero}, {syntymäaika, etunimi, sukunimi, puhelinnumero}}.

Jokaista joukkoa tarkastellaan niiden sisältämien sarakkeiden arvojoukkojen kautta. Jos joukolle on mahdollista löytää useampia rivejä, joissa kandidaattiavainjoukon arvot ovat samat, kandidaattiavain hylätään. Esimerkiksi useammalla henkilöllä voi olla sama syntymäaika, useammalla henkilöllä voi olla sama etunimi, ja useammalla henkilöllä voi olla sama sukunimi, joten {syntymäaika}, {etunimi}, {sukunimi} eivät ole kandidaattiavaimia. Vastaavasti joukko {etunimi, sukunimi} ei voi olla kandidaattiavain, sillä useammalla henkilöllä voi olla sama etunimi ja sukunimi.

Tätä prosessia jatkamalla tunnistetaan lopullinen kandidaattiavainten joukko. Edellisessä taulussa oikeastaan yksikään esitellyistä joukoista ei ole kandidaattiavainjoukko jos oletamme, että useammalla henkilöllä voi olla sama puhelinnumero.

Kandidaattiavainten avulla määriteltynä taulu on toisessa normaalimuodossa jos ja vain jos se on ensimmäisessä normaalimuodossa ja jokainen taulun kandidaattiavaimeen kuulumaton sarake on riippuvainen koko kandidaattiavaimen joukosta, mutta ei yksittäisestä joukon jäsenestä (jos joukkoon kuuluu useampi sarake).

</text-box>


### Kolmas normaalimuoto

Kolmanteen normaalimuotoon liittyy oleellisesti käsite transitiivinen riippuvuus.


<text-box variant='hint' name='Transitiivinen riippuvuus'>

Transitiivisella riippuvuudella tarkoitetaan sitä, että sarake A on funktionaalisesti riippuvainen sarakkeesta C jonkun toisen sarakkeen kautta. Sarake A on transitiivisesti riippuvainen sarakkeesta C, jos sarake A on funktionaalisesti riippuvainen sarakkeesta B ja sarake B on funktionaalisesti riippuvainen sarakkeesta C. Tässä A, B ja C voivat olla myös sarakejoukkoja.

</text-box>


Tietokantataulu on kolmannessa normaalimuodossa jos se on toisessa normaalimuodossa ja siinä olevat sarakkeet eivät ole transitiivisesti riippuvaisia taulun pääavaimesta.


Jos tietokantataulu rikkoo kolmannen normaalimuodon, eli tietokantataulusta tunnistetaan sarakkeita, jotka ovat transitiivisesti riippuvaisia pääavaimesta, eriytetään ne omaan tauluun taulukseen. Eräs klassinen esimerkki tällaisesta tilanteesta liittyy postinumeroon -- tarkastellaan seuraavaa taulua `Osoite`.

- Osoite((pk) id, katuosoite, postinumero, postitoimipaikka)

Oletetaan, että taulun sisältö on seuraava.

|	id  | katuosoite           | postinumero  | postitoimipaikka  |
| --  | --                   | --           | --                |
| 1   | Työpajankatu 13      | 00580        | Helsinki          |
| 2   | Työpajankatu 2 R1 C  | 00580        | Helsinki          |
| 3   | Siltavuorenranta 18  | 00170        | Helsinki          |
| ... | ...                  | ...          | ...               |


Yllä olevassa tietokantataulussa havaitaan funktionaalinen riippuvuus `postinumero -&gt postitoimipaikka`, eli postitoimipaikan saa selvitettyä postinumeron perusteella. Samalla kaikki sarakkeet ovat selvitettävissä taulun pääavaimen kautta, joten taulusta löytyy myös transitiivinen riippuvuus. Ratkaisu tähän on -- esimerkiksi -- erillinen taulu postinumeroille.

- Osoite((pk) id, katuosoite, (fk) postinumero -&gt; Postinumero)
- Postinumero((pk) postinumero, postitoimipaikka)


<text-box variant='hint' name='Muita normaalimuotoja'>

Ensimmäisen, toisen ja kolmannen normaalimuodon lisäksi tietokannan normalisointiin käytetään <a href="https://en.wikipedia.org/wiki/Boyce%E2%80%93Codd_normal_form" target="_blank" norel>Boyce-Codd -normaalimuotoa</a>, <a href="https://en.wikipedia.org/wiki/Fourth_normal_form" target="_blank" norel>Neljättä normaalimuotoa</a> ja <a href="https://en.wikipedia.org/wiki/Fifth_normal_form" target="_blank" norel">Viidettä normaalimuotoa</a>.

<br/>

Tämän kurssin puitteissa ensimmäiset kolme normaalimuotoa riittävät suunnitteluun.

</text-box>



<moodle-exercise name="Tiedon normalisointi">

Tämä tehtävä palautetaan kurssin Moodle-järjestelmään. Vastaus tulee palauttaa yhtenä PDF-muotoisena tiedostona.

Oleta, että käytössäsi on seuraavanlainen tietokantataulu, joka kuvaa erään kalastuskilpailun käyttämää tietokantaa. Kyllä, heillä on tasan yksi tietokantataulu.

- Saalis ((pk) id, kilpailun_tunnus, kilpailupaikka, kilpailupäivä, kalastajatunnus, kalastajan_nimi, kalalaji, kalastajan_syntymävuosi, kalastajan_saaliin_kokonaispaino, kalojen_kappalemäärä_kalastajan_saaliissa, kalastajan_sijoitus_kisassa)

Vastaa ensin seuraaviin kysymyksiin:

1. Mitä käytännössä tarkoittaa jos sarake kalalaji on funktionaalisesti riippuvainen sarakkeesta kilpailun_tunnus?
2. Mitkä sarakkeet ovat funktionaalisesti riippuvaisia sarakkeesta kilpailun_tunnus?
3. Minkälainen funktionaalinen riippuvuus taulussa tulee löytyä, jotta voisit ilmaista säännön "kalastaja voi osallistua vain yhteen kilpailuun samana päivänä". (Huom! riippuvuudet voivat liittyä myös useampiin sarakkeisiin)

Normalisoi tämän jälkeen tietokantataulu ensin ensimmäiseen normaalimuotoon, sitten toiseen normaalimuotoon ja lopulta kolmanteen normaalimuotoon. Kirjoita jokaisen normaalimuodon yhteydessä tietokantataulun tai tietokantataulujen muoto sekä perustelut tehtyyn muutokseen.


</moodle-exercise>



### Toistuvaan tietoon liittyviä ongelmia

Tietokannan normalisoinnin tavoitteena on tilanne, missä tietokannassa ei ole toisteista tietoa. Normalisointi johtaa yleisesti ottaen parempaan tietokannan rakenteeseen, missä tiedon lisääminen, poistaminen ja päivittäminen on mahdollista ilman suurempia ongelmia.

Tutustutaan tilanteeseen, missä tietokantataulua ei ole (täysin) normalisoitu. Tarkastellaan seuraavaa tietokantataulua sekä siihen liittyviä ongelmia.


| id    | nimi           | osasto  | jarjesto    |
| --    | --             | --      | --          |
| 1     | Jaska          | TT      | Moodi       |
| 2     | Tellu          | MAT     | Matrix      |
| 2     | Tellu          | MAT     | Limes       |
| 3     | Salli          | FYS     | Resonanssi  |
| 3     | Salli          | FYS     | Geysir      |


Ongelmia on yleisesti liittyen kolmenlaisia: päivitysongelmia, poisto-ongelmia ja lisäysongelmia.

Esimerkki päivitysongelmasta: Mikäli Sallilla on merkittynä tietokantaan väärä osasto, tulee Sallin osasto muuttaa (vähintään) kahdelta eri riviltä tai tietokannassa oleva tieto on epäjohdonmukaista.

Esimerkki poisto-ongelmasta: Yllä ainejärjestöt ja osastot sijaitsevat samassa tietokantataulussa henkilöiden kanssa. Mikäli haluaisimme poistaa ainejärjestön Moodi, johtaisi tämä myös henkilön Jaskan poistamiseen. Samalla katoaisi tieto osastosta TT.

Esimerkki lisäysongelmasta: Oletetaan, että saraketta `jarjesto` ei saa jättää tyhjäksi. Mikäli tietokantaan yritetään lisätä henkilö ilman järjestöä, lisääminen ei onnistu.


<quiznator id="5c5606f099236814c5bb905c"></quiznator>
