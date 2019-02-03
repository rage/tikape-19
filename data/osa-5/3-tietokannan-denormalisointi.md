---
path: '/osa-5/3-tietokannan-denormalisointi'
title: 'Tietokannan denormalisointi'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Denormalisointi

</text-box>


Tietokannan normalisoinnin tavoitteena on tilanne, missä tietokantatauluissa ei ole toisteista tietoa. Normalisoinnin jälkee tietokannassa on tyypillisesti useita tietokantatauluja, joista jokainen kuvaa jotain selkeää käsitettä. Tietokantataulujen väliset yhteydet tunnistetaan pää- ja viiteavainten avulla, ja taulujen attribuutit ovat selkeitä. Tietokannasta puuttuu toisteinen tieto.

Yleisesti ottaen yllä kuvattu tilanne on hyvä, mutta absoluuttinen hyvyys liittyy paljolti myös käyttötarkoitukseen. Esimerkiksi raportointiin tarkoitettujen järjestelmien ei kannata todennäköisesti -- jos raportin luonti on hidas operaatio -- luoda samoja raportteja yhä uudelleen ja uudelleen, vaan voi olla mielekästä luoda erillinen tietokantataulu (tai muutama), jotka sisältävät raporteille oleelliset tiedot valmiiksi laskettuna.

Myös tietokannan (tai tietokantataulun) käyttötarkoitus vaikuttaa normalisoinnin tarpeeseen. Esimerkiksi sivukäyntien kirjaamiseen tarkoitettu logitusjärjestelmä toimii tehokkaammin jos sivukäyntien tallentamiseen tarkoitetut osat järjestelmästä on denormalisoitu. Tarkastellaan tätä seuraavan esimerkin kautta.

Alla on annettuna kaksi tietokantaa, toinen on normalisoitu ja toinen denormalisoitu. Kumpaakin käytetään järjestelmässä kävijöiden tekemien tapahtumien kirjaamiseen.

Alla olevassa versiossa käyttäjä ja sivu on eriytetty omaksi käsitteekseen, johon tapahtuma-taulu viittaa. Kun tapahtumaa luodaan, tulee tapahtuman lisäämisen yhteydessä hakea käyttäjän tunnus taulusta Kayttaja sekä osoitetta vastaavan sivun tunnus taulusta Sivu.

- Kayttaja ((pk) id, kayttajatunnus)
- Sivu ((pk) id, osoite)
- Tapahtuma ((pk) id, (fk) kayttaja\_id -&gt; Kayttaja, (fk) sivu\_id -&gt; Sivu, aika, operaatio, ip, laite)

Toinen vaihtoehto on tallentaa käyttäjätunnus ja sivun osoite sellaisenaan.

- Tapahtuma ((pk) id, kayttajatunnus, osoite, aika, operaatio, ip, laite)
