---
path: '/osa-4/3-alikyselyt'
title: 'Alikyselyt'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tiedät että SQL-kyselyssä voi olla useampi SQL-kysely.
- Osaat kirjoittaa alikyselyitä.
- Ymmärrät että jokaisen tietokantakyselyn tulos on tietokantataulu.

</text-box>

Palataan hetkeksi takaisin tietokantakyselyiden maailmaan ja tutustutaan lyhyesti alikyselyihin. Oletetaan, että käytössämme on seuraavat taulut Opiskelija ja Kurssisuoritus.

- Opiskelija((pk) id, nimi, opiskelijanumero, syntymavuosi)
- Kurssisuoritus((fk) kurssi\_id -> Kurssi, (fk) opiskelija\_id -> Opiskelija, arvosana)
- Kurssi((pk) id, nimi)

Alikyselyt ovat nimensä mukaan kyselyn osana suoritettavia alikyselyitä, joiden tuloksia käytetään osana pääkyselyä.

Pohditaan kysymystä *Miten haen opiskelijat, jotka eivät ole vielä osallistuneet yhdellekään kurssille?*. Käytetään tähän ensin aiemmin tutuksi tullutta tapaa, eli `LEFT JOIN`-kyselyä. Yhdistetään opiskelijaa ja kurssisuoritusta kuvaavat taulut LEFT JOIN-kyselyllä siten, että myös opiskelijat, joilla ei ole suorituksia tulevat mukaan vastaukseen. Tämän jälkeen, jätetään vastaukseen vain ne rivit, joilla kurssisuoritukseen liittyvät tiedot ovat tyhjiä -- tämä onnistuu katsomalla mitä tahansa kurssisuoritus-taulun saraketta, ja tarkistamalla onko se tyhjä.


```sql
SELECT opiskelijanumero FROM Opiskelija
    LEFT JOIN Kurssisuoritus ON Opiskelija.id = Kurssisuoritus.opiskelija_id
    WHERE Kurssisuoritus.kurssi_id IS null;
```

Toinen vaihtoehto edellisen kyselyn toteuttamiseen on luoda kysely, joka hakee kaikki ne opiskelijat, jotka eivät ole kurssisuorituksia saaneiden opiskelijoiden joukossa. Tässä on oleellisesti kaksi kyselyä: (1) hae niiden opiskelijoiden tunnus, joilla on kurssisuoritus, ja (2) hae opiskelijat, jotka eivät ole edellisen kyselyn palauttamassa joukossa.

Ensimmäinen kysely on suoraviivainen.

```sql
SELECT opiskelija_id FROM Kurssisuoritus;
```

Toinenkin kysely on melko suoraviivainen -- avainsanalla NOT IN voidaan rajata joukkoa.

```sql
SELECT opiskelijanumero FROM Opiskelija
    WHERE id NOT IN (*ensimmainen kysely*);
```

Yhdessä kyselyt ovat siis muotoa:

```sql
SELECT opiskelijanumero FROM Opiskelija
    WHERE id NOT IN (
        SELECT opiskelija_id FROM Kurssisuoritus
    );
```

Käytännössä alikyselyt tuottavat kyselyn tuloksena taulun, josta pääkyselyssä tehtävä kysely tehdään. Ylläolevassa esimerkissä alikyselyn tuottamassa taulussa on vain yksi sarake, jossa on kurssisuorituksen saaneiden opiskelijoiden opiskelijanumerot.

Määreen `NOT IN`, joka tarkastaa että valitut arvot eivät ole alikyselyn tuottamassa taulussa, lisäksi käytössä on määre `IN`. Määreen `IN` avulla voidaan luoda ehto, jolla tarkastetaan, että valitut arvot ovat annetussa joukossa tai taulussa. Esimerkiksi alla haetaan kaikki kurssisuoritukset, joissa arvosana on kolme tai viisi.

```sql
SELECT * FROM Kurssisuoritus WHERE arvosana IN (3, 5);
```

Määreiden IN ja NOT IN lisäksi alikyselyissä voidaan käyttää määreitä EXISTS ja NOT EXISTS, joiden avulla voidaan rajata hakujoukkoa alikyselyssä olevan ehdon perusteella. Voimme esimerkiksi kirjoittaa aiemmin kirjoitetun kursseja suorittamattomia opiskelijoita etsivän kyselyn siten, että jokaisen Opiskelija-taulussa olevan opiskelijanumeron kohdalla tarkistetaan, että sitä ei löydy taulusta Kurssisuoritus.


```sql
SELECT opiskelijanumero FROM Opiskelija
    WHERE NOT EXISTS (
        SELECT opiskelija_id FROM Kurssisuoritus
            WHERE Kurssisuoritus.opiskelija_id = Opiskelija.id
    );
```

Edellä oleva kysely tarkistaa jokaisen Opiskelija-taulussa olevan opiskelijanumeron kohdalla ettei sitä löydy Kurssisuoritus-taulun opiskelija-sarakkeesta. Käytännössä -- jos tietokantamoottori ei optimoi kyselyä -- jokainen opiskelija-taulun rivi aiheuttaa uuden kyselyn kurssisuoritus-tauluun, mikä tekee kyselystä tehottoman.


## Kyselyn tulos on taulu

Jokainen SQL-kysely tuottaa tuloksena taulun. Taulussa voi olla tasan yksi sarake ja rivi, tai vaikkapa tuhansia rivejä ja kymmeniä sarakkeita. Silloinkin, kun suoritamme yksinkertaisen haun, kuten vaikkapa "Hae kaikki kurssilla 'Tietokantojen perusteet' olevat opiskelijat", on haun tuloksena taulu.

Kaikki tekemämme SQL-kyselyt ovat liittyneet tauluihin. Emmekö siis voisi tehdä kyselyjä myös vastauksiin? Vastaus on kyllä.

Esimerkiksi vanhimman (tai vanhimmat, jos tämä ei ole yksikäsitteistä) opiskelijan löytää -- muunmuassa -- etsimällä kaikista pienimmän mahdollisimman syntymävuoden (kyselyn tulos on taulu), jonka jälkeen vastaustaulussa olevaa tulosta verrataan kaikkien opiskelijoiden syntymävuosiin.


```sql
SELECT * FROM Opiskelija
    WHERE syntymavuosi
    IN (SELECT MIN(syntymavuosi) FROM Opiskelija);
```

Yllä, koska tuloksena on vain yksi arvo, vertailun voi toteuttaa myös yhtäsuuruusvertailuna. Tämä onnistuu seuraavasti.

```sql
SELECT * FROM Opiskelija
    WHERE syntymavuosi = (SELECT MIN(syntymavuosi) FROM Opiskelija);
```

Myös pienempi kuin ja suurempi kuin ehdot toimivat kyselyissä. Esimerkiksi keskimääräistä opiskelijaa vanhemmat opiskelijat löytyisivät seuraavasti.

```sql
SELECT * FROM Opiskelija
    WHERE syntymavuosi < (SELECT AVG(syntymavuosi) FROM Opiskelija);
```


Alikyselyitä voi käyttää myös osana poisto-, lisäys- ja päivityskyselyissä.


<sqltrainer-exercise name="Alikyselyiden harjoittelu">

Tee SQL-harjoittelujärjestelmän aiheesta "Nested queries" vähintään neljä harjoitustehtävää (nappi "START PRACTICE!") sekä luo aiheeseen yksi uusi tehtävä (nappi "CREATE NEW CONTENT!") . Voit kirjoittaa tehtävänannon englannin sijaan halutessasi myös suomeksi tai ruotsiksi.

Huom! Mikäli järjestelmän tarjoama harjoitustehtävä on sellainen, ettet pysty ratkaisemaan sitä annetun ohjeen perusteella, saat uuden tehtävän palaamalla harjoitussivulle ("Practice") ja valitsemalla aiheen harjoittelun uudestaan. Annathan palautetta myös ratkaisemistasi tehtävistä lomakkeen avulla -- tämä mahdollistaa tehtävien paremman suosittelun tulevaisuudessa.

</sqltrainer-exercise>
