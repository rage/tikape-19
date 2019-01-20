---
path: '/osa-2/2-tiedon-lisaaminen-muokkaaminen-ja-poistaminen'
title: 'Tiedon lisääminen, muokkaaminen ja poistaminen'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Osaat lisätä tietoa tietokantatauluun.
- Osaat poistaa tietoa tietokantataulusta.
- Osaat muokata tietokantataulussa olevaa tietoa

</text-box>


Tiedon lisääminen tietokantatauluun tapahtuu `INSERT INTO`-lauseella. Lausetta `INSERT INTO` seuraa kohdetaulun nimi, jonka jälkeen määritellään sulkujen sisällä sarakkeet, joihin arvot asetetaan. Näitä seuraa avainsana `VALUES`, jota seuraa suluissa konkreettiset tietokantatauluun lisättävät arvot.


```sql
INSERT INTO TAULUN_NIMI (sarake1, sarake2, sarake3)
    VALUES ('merkkijono hipsuissa', 'numero ei', 123);
```

Oletetaan, että käytössämme on taulu `Henkilo`, jossa on sarakkeet syntymavuosi (kokonaisluku) ja nimi (merkkijono). Uuden henkilon lisääminen tapahtuu seuraavasti.

```sql
INSERT INTO Henkilo (syntymavuosi, nimi)
    VALUES (1923, 'Edgar Frank Codd');
```

Yllä olevassa esimerkissä tietokantatauluun `Henkilo` lisätään uusi rivi. Uuden rivin sarakkeeseen syntymävuosi tulee arvo `1923` ja sarakkeeseen nimi tulee merkkijono `Edgar Frank Codd`.

Vastaavasti vuonna 1947 syntyneen Raymond Boycen lisääminen tietokantatauluun Henkilo onnistuu seuraavasti.


```sql
INSERT INTO Henkilo (syntymavuosi, nimi)
    VALUES (1947, 'Raymond Boyce');
```


<sqltrainer-exercise name="Tiedon lisääminen tietokantaan">

Tee SQL-harjoittelujärjestelmän aiheesta "Moar data!" vähintään kaksi harjoitustehtävää (nappi "START PRACTICE!") sekä luo aiheeseen yksi uusi tehtävä (nappi "CREATE NEW CONTENT!") . Voit kirjoittaa tehtävänannon englannin sijaan halutessasi myös suomeksi tai ruotsiksi.

</sqltrainer-exercise>



## Pää- ja viiteavaimet tietoa lisättäessä


Useat tietokannanhallintajärjestelmät tarjoavat tuen automaattiselle pääavaimen arvojen luomiselle. Mikäli tietokantataulu on määritelty tietokannanhallintajärjestelmän tarjoamalla mekanismilla siten, että taulun pääavaimen arvo luodaan automaattisesti, ei pääavaimen arvoja tarvitse syöttää erikseen.

Oletetaan, että käytössämme on taulu `RaakaAine`, jolla on pääavain `id` sekä sarake `nimi`. Oletetaan lisäksi, että pääavain on merkitty automaattisesti luotavaksi. Seuraavat lisäyskyselyt lisäävät tauluun `RaakaAine` tietoa -- jokaisen kutsun yhteydessä luodaan myös lisättävälle riville uniikki tunniste `id`.


```sql
INSERT INTO RaakaAine (nimi) VALUES ('Banaani');
INSERT INTO RaakaAine (nimi) VALUES ('Bataatti');
INSERT INTO RaakaAine (nimi) VALUES ('Peruna');
INSERT INTO RaakaAine (nimi) VALUES ('Porkkana');
```

Mikäli tietokantataulussa on yksi tai useampi viiteavain, tulee tiedon lisäyksen yhtedessä olla tieto viiteavaimen arvosta. Tarkastellaan seuraavaksi taulua `Tilaus`, jossa on viite tauluun `Asiakas`. Tiedon lisääminen tauluun `Tilaus` tapahtuu `INSERT INTO`-lauseen avulla. Koska taulussa `Tilaus` on viiteavain tauluun `Asiakas`, tulee viitattavan asiakkaan tunnus olla tiedossa lisäyksen yhteydessä -- alla olevassa esimerkissä oletetaan, että tilauksen tehneen asiakkaan pääavaimen arvo on `7`.


```sql
INSERT INTO Tilaus (asiakas_id, kuljetustapa, vastaanotettu, toimitettu)
    VALUES (7, 'nouto', false, false);
```


<text-box variant='hint' name='Miten selvitän juuri lisätyn rivin pääavaimen?'>

Lisätyn rivin pääavaimen saa selville SQL-kyselyllä. Alla esimerkki RaakaAine-tauluun liittyen.

```sql
INSERT INTO RaakaAine (nimi) VALUES ('Banaani');
SELECT id FROM RaakaAine WHERE nimi = 'Banaani';
```

Ensimmäinen lause lisää raaka-aineen, ja toisella selvitetään raaka-aineen tunnus.

</text-box>


## Tiedon päivittäminen: UPDATE

Tietokantataulussa olevan tiedon päivittäminen onnistuu `UPDATE`-lauseella. Komentoa `UPDATE` seuraa tietokantataulun nimi, avainsana `SET`, jota seuraa sarakekohtaiset uudet arvot. Lopuksi kyselyyn lisätään rajausehto, jonka perusteella rajataan muutettavia rivejä.

```sql
UPDATE TAULUN_NIMI
    SET sarake1='uusiarvo', sarake2=1234
    WHERE sarake3='rajausarvo';
```

Esimerkiksi 'Joni'-nimisen henkilön nimen päivittäminen muotoon 'Joni S' onnistuu seuraavasti.

```sql
UPDATE Henkilo
    SET nimi='Joni S'
    WHERE nimi='Joni';
```

Yllä olevassa esimerkissä tulee esille pääavaimen tärkeys. Mikäli tietokantataulussa on useampi Joni-niminen henkilö, muuttaisi yllä oleva kysely kaikkien Joni-nimisten henkilöiden nimeksi Joni S.

Mikäli henkilön pääavain on tiedossa tai sen voi selvittää, kannattaa päivitys tehdä ehdottomasti pääavaimen avulla.


```sql
UPDATE Henkilo
    SET nimi='Joni S'
    WHERE id=6;
```



<sqltrainer-exercise name="Tiedon päivittäminen">

Tee SQL-harjoittelujärjestelmän aiheesta "Oops, this was not what I wanted to add!" vähintään kaksi harjoitustehtävää (nappi "START PRACTICE!") sekä luo aiheeseen yksi uusi tehtävä (nappi "CREATE NEW CONTENT!") . Voit kirjoittaa tehtävänannon englannin sijaan halutessasi myös suomeksi tai ruotsiksi.

</sqltrainer-exercise>



## Tiedon poistaminen tietokantataulusta: DELETE FROM

Tiedon poistaminen tietokantataulusta onnistuu `DELETE FROM`-lauseella. Lauseeseen määritellään tietokantataulu, mistä tietoa poistetaan, ja mahdollisesti ehtoja, jotka rajaavat poistettavia rivejä. Yksinkertaisimmillaan komennolla poistetaan kaikki rivit annetusta taulusta. Tämä tapahtuu seuraavasti.

```sql
DELETE FROM TAULUN_NIMI;
```

Poistettavien rivien rajaaminen tapahtuu `WHERE`-ehdolla, jota seuraa poistettavien arvojen rajaus. Esimerkiksi kaikki vuonna 1920 syntyneet henkilöt poistettaisiin tietokantataulusta `Henkilo` seuraavalla komennolla.

```sql
DELETE FROM Henkilo WHERE syntymavuosi = 1920;
```

Poistoehtoon voi rakentaa loogisen lauseen, joka sisältää `AND` ja `OR` -määreitä. Näiden avulla poistorajausta voi tehdä laajemmin. Alla olevassa esimerkissä poistetaan henkilö (tai henkilöt), joiden syntymävuosi on 1947 ja joiden nimi on 'Raymond Boyce'.

```sql
DELETE FROM Henkilo WHERE syntymavuosi = 1947 AND nimi = 'Raymond Boyce';
```

Pienempi kuin ja suurempi kuin -vertailuoperaatiot sekä erisuuri kuin vertailuoperaatiot ovat myös mahdollisia. Alla olevassa esimerkissä poistetaan kaikki henkilöt, joiden syntymävuosi on pienempi kuin 2000 ja joiden nimi ei ole 'Boyce-Codd'.

```sql
DELETE FROM Henkilo WHERE syntymavuosi < 2000 AND nimi != 'Boyce-Codd';
```

