---
path: '/osa-5/2-tietokannan-denormalisointi'
title: 'Tietokannan denormalisointi'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tiedät mitä käsitteellä denormalisointi tarkoitetaan.
- Osaat perustella tilanteita, joissa tietokantataulun denormalisoinnista voi olla hyötyä.

</text-box>


Tietokannan normalisoinnin tavoitteena on tilanne, missä tietokantatauluissa ei ole toisteista tietoa. Normalisoinnin jälkeen tietokantataulujen väliset yhteydet tunnistetaan pää- ja viiteavainten avulla ja taulujen attribuutit ovat selkeitä. Tietokannasta puuttuu toisteinen tieto, jonka myötä tallennettavan tiedon määrä on normalisoimatonta tietokantataulua pienempi.

Yleisesti ottaen yllä kuvattu tilanne on hyvä, mutta absoluuttinen hyvyys liittyy paljolti myös käyttötarkoitukseen.

Edellisessä osassa käsittelimme seuraavaa tietokantataulun `Osoite` kolmanteen normaalimuotoon liittyvää esimerkkiä. Tietokantataulu on seuraava:

| id  | katuosoite           | postinumero  | postitoimipaikka  |
| --  | --                   | --           | --                |
| 1   | Työpajankatu 13      | 00580        | Helsinki          |
| 2   | Työpajankatu 2 R1 C  | 00580        | Helsinki          |
| 3   | Siltavuorenranta 18  | 00170        | Helsinki          |
| ... | ...                  | ...          | ...               |

Kolmanteen normaalimuotoon pääsemiseksi tietokantataulu tuli pilkkoa kahteen osaan, sillä postinumeron perusteella voi päätellä postitoimipaikan. Lopputuloksena oli kaksi tietokantataulua: `Osoite` ja `Postinumero`.

- Osoite((pk) id, katuosoite, (fk) postinumero -&gt; Postinumero)
- Postinumero((pk) postinumero, postitoimipaikka)

Oletetaan, että järjestelmä on käytössä organisaatiossa, missä kyselyissä tarvitaan usein koko osoitetta (myös postitoimipaikkaa). Kolmannessa normaalimuodossa olevilla tietokantatauluilla kysely on seuraavanlainen:

```sql
SELECT Osoite.katuosoite, Osoite.postinumero, Postitoimipaikka.postitoimipaikka
    FROM Osoite
    JOIN Postinumero ON Postinumero.postinumero = Osoite.postinumero;
```

Kyselyssä tulee siis liittää aina kahden tietokantataulun tiedot yhteen, jolloin tietoa -- riippuen tiedon konkreettisesta tallennusmuodosta -- voidaan joutua hakemaan eri paikoista.

Alkuperäisessä tietokantataulussa kysely olisi suoraviivaisempi.

```sql
SELECT katuosoite, postinumero, postitoimipaikka FROM Osoite;
```

Kysely on tehokkaampi, sillä siinä ei tarvitse yhdistää tietokantataulujen tietoja. Ongelmana on toki edellisessä osassa käsitellyt ongelmat -- mikäli vaikkapa postitoimipaikan nimi muuttuu, tulee tieto päivittää useammasta rivistä.


## Esimerkki: raportointijärjestelmä

Tarkastellaan esimerkkiä järjestelmästä, joka tallentaa verkkosivujen tapahtumia lokiin.

Alla on annettuna kaksi tietokantaa, toinen on normalisoitu ja toinen denormalisoitu. Kumpaakin käytetään järjestelmässä kävijöiden tekemien tapahtumien kirjaamiseen.

Alla olevassa versiossa käyttäjä ja sivu on eriytetty omaksi käsitteekseen, johon tapahtuma-taulu viittaa. Kun tapahtumaa luodaan, tulee tapahtuman lisäämisen yhteydessä hakea käyttäjän tunnus taulusta Kayttaja sekä osoitetta vastaavan sivun tunnus taulusta Sivu. Mikäli näitä ei ole, tulee ne luoda.

- Kayttaja ((pk) id, kayttajatunnus)
- Sivu ((pk) id, osoite)
- Tapahtuma ((pk) id, (fk) kayttaja\_id -&gt; Kayttaja, (fk) sivu\_id -&gt; Sivu, aika, operaatio, ip, laite)

Toinen vaihtoehto on tallentaa käyttäjätunnus ja sivun osoite sellaisenaan.

- Tapahtuma ((pk) id, kayttajatunnus, osoite, aika, operaatio, ip, laite)

Näistä kummassakin on hyvät ja huonot puolensa. Mikäli tapahtumia tulee merkittäviä määriä, on jälkimmäinen tehokkuuden kannalta ehdottomasti parempi.


## Tietokannan normalisointi on askel tietokannan denormalisointiin


Tietokannan denormalisoinnilla _ei_ tarkoiteta tilannetta, missä tietokannan normalisointi jätetään tekemättä. Päinvastoin, tietokannan normalisointi on erittäin tärkeä osa tietokannan suunnittelu- ja toteutustyötä, sillä sen avulla vältetään turha tiedon toisteisuus. Tietokannan denormalisointi tehdään aina tietokannan käyttöä tarkastelemalla ja tietokannan tehokkuutta optimoiden -- siinä missä tietokannan normalisoinnissa pyritään poistamaan toisteinen tieto, tietokannan denormalisoinnissa lisätään harkitusti toisteisuutta ja sitä kautta tehostetaan tietokantakyselyiden toimintaa.

Tietokannan denormalisointiin liittyy sekä hyötyjä että haittoja. Denormalisoidun tiedon hakeminen on tyypillisesti nopeampaa sillä liitoskyselyitä tarvitaan vähemmän, jonka lisäksi kyselyt ovat tyypillisesti yksinkertaisempia ja sen takia virheiden riski on pienempi. Denormalisoidussa tietokannassa toisaalta joudutaan tekemään lisätyötä tietoa lisättäessä ja päivitettäessä sillä tietoa joudutaan mahdollisesti lisäämään useampaan paikkaan. Tämän lisäksi tietokanta voi olla epäintuitiivinen uusille ohjelman käyttäjille ja se vaatii paremman dokumentaation, jonka lisäksi denormalisoitu tietokanta vie luonnollisesti lisää levytilaa kuin normalisoitu tietokanta.

Käytännössä sovelluksissa etsitään aina kultaista keskitietä, mikä tuo sovelluksen käyttäjälle mahdollisimman hyvän -- ja nopean -- käyttökokemuksen. Tämä tarkoittaa normalisoinnin ja dernomalisoinnin lisäksi sitä, että sovelluksen eri tehtävissä voidaan käyttää erilaisia tietokannanhallintajärjestelmiä. Tutustumme muihin tietokannanhallintajärjestelmiin kurssin viimeisessä osassa.


## Denormalisointi: miksi ja milloin?

Tietokannan denormalisoinnin ensimmäinen askel on tietokannan tehokkuuden tarkastelu. Mikäli tietokanta toimii tarpeeksi tehokkaasti, ei tietokantaa kannata denormalisoida. Toisaalta, mikäli tietokanta on hidas joissakin (usein käytetyissä) kyselyissä, kannattaa tietokannan denormalisointia harkita.

Denormalisoinnista on lisäksi hyötyä esimerkiksi usein tarvittavien tietojen ennakkoon tallentamisessa (tietokantatauluun voidaan laskea ajoittain vaikkapa joku usein kysytty keskiarvoluku), raporttien nopeassa hakemisessa (tietokantatauluun voidaan laskea raportit valmiiksi, jolloin niitä ei tarvitse luoda tarvittaessa), ja historiatietojen tallentamisessa (tiedot voivat muuttua ajan myötä, mutta vanhakin tieto voi oll tärkeää).

<quiznator id="5c604e18c41ed4148d96d192"></quiznator>



