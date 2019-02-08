---
path: '/osa-5/2-tietokannan-denormalisointi'
title: 'Tietokannan denormalisointi'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tiedät mitä käsitteellä denormalisointi tarkoitetaan.
- Osaat perustella tilanteita, joissa tietokantataulun denormalisoinnista voi olla hyötyä.

</text-box>


Tietokannan normalisoinnin tavoitteena on tilanne, missä tietokantatauluissa ei ole toisteista tietoa. Normalisoinnin jälkeen tietokannassa on tyypillisesti useita tietokantatauluja, joista jokainen kuvaa jotain selkeää käsitettä. Tietokantataulujen väliset yhteydet tunnistetaan pää- ja viiteavainten avulla, ja taulujen attribuutit ovat selkeitä. Tietokannasta puuttuu toisteinen tieto, jonka myötä tallennettavan tiedon määrä on normalisoimatonta tietokantataulua pienempi.

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

Kyselyssä tulee siis liittää aina kahden tietokantataulun tiedot yhteen, jolloin tietoa myös -- riippuen tiedon konkreettisesta tallennusmuodosta -- voidaan joutua hakemaan eri paikoista.

Alkuperäisessä tietokantataulussa kysely olisi suoraviivaisempi.

```sql
SELECT katuosoite, postinumero, postitoimipaikka FROM Osoite;
```

Suoraviivaisuuden lisäksi kysely on myös tehokkaampi, koska siinä ei tarvitse yhdistää tietokantataulujen tietoja. Ongelmana on toki edellisessä osassa käsitellyt ongelmat -- mikäli vaikkapa postitoimipaikan nimi muuttuu, tulee tieto päivittää useammasta rivistä.

## Raportointijärjestelmä

Tarkastellaan esimerkkiä järjestelmästä, joka tallentaa verkkosivujen tapahtumia lokiin.

Alla on annettuna kaksi tietokantaa, toinen on normalisoitu ja toinen denormalisoitu. Kumpaakin käytetään järjestelmässä kävijöiden tekemien tapahtumien kirjaamiseen.

Alla olevassa versiossa käyttäjä ja sivu on eriytetty omaksi käsitteekseen, johon tapahtuma-taulu viittaa. Kun tapahtumaa luodaan, tulee tapahtuman lisäämisen yhteydessä hakea käyttäjän tunnus taulusta Kayttaja sekä osoitetta vastaavan sivun tunnus taulusta Sivu.

- Kayttaja ((pk) id, kayttajatunnus)
- Sivu ((pk) id, osoite)
- Tapahtuma ((pk) id, (fk) kayttaja\_id -&gt; Kayttaja, (fk) sivu\_id -&gt; Sivu, aika, operaatio, ip, laite)

Toinen vaihtoehto on tallentaa käyttäjätunnus ja sivun osoite sellaisenaan.

- Tapahtuma ((pk) id, kayttajatunnus, osoite, aika, operaatio, ip, laite)

Näistä kummassakin on hyvät ja huonot puolensa. Mikäli tapahtumia tulee merkittäviä määriä, on jälkimmäinen tehokkuuden kannalta ehdottomasti nopeampi.

Normalisointia ja denormalisointia ei ole kuitenkaan pakko ajatella toistensa poissulkevina vaihtoehtoina. Eräs vaihtoehto olisi kummankin lähestymistavan käyttäminen -- tällöin uudet tapahtumat lisättäisiin aina normalisoimattomaan tietokantatauluun, josta tapahtumat vietäisiin normalisoituun tietokantaan esimerkiksi kerran tunnissa.


## TODO: konkreettinen normalisointiesimerkki

Esimerkiksi raportointiin tarkoitettujen järjestelmien ei kannata todennäköisesti -- jos raportin luonti on hidas operaatio -- luoda samoja raportteja yhä uudelleen ja uudelleen, vaan voi olla mielekästä luoda erillinen tietokantataulu (tai muutama), jotka sisältävät raporteille oleelliset tiedot valmiiksi laskettuna.

Myös tietokannan (tai tietokantataulun) käyttötarkoitus vaikuttaa normalisoinnin tarpeeseen. Esimerkiksi sivukäyntien kirjaamiseen tarkoitettu logitusjärjestelmä toimii tehokkaammin jos sivukäyntien tallentamiseen tarkoitetut osat järjestelmästä on denormalisoitu. Tarkastellaan tätä seuraavan esimerkin kautta.
