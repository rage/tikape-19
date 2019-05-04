---
path: '/osa-2/3-yhteenvetokyselyt-ja-ryhmittely'
title: 'Yhteenvetokyselyiden tekeminen ja tulosten ryhmittely'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Osaat tehdä SQL-kielellä yhteenvetokyselyitä ja rajata yhteenvetokyselyiden tuloksia.
- Osaat ryhmitellä tietokantakyselyiden tuloksia sekä laskea yhteenvetoja ryhmistä.
- Osaat järjestää ja rajata yhteenvetokyselyiden tuloksia.

</text-box>


Tiedon hakemiseen käyttämämme SQL-kyselyt ovat tähän mennessä tuottaneet listauksia tietokantataulujen sisällöistä. Listauksia tuottavat kyselyt ovat erittäin hyödyllisiä, kun halutaan vastata esimerkiksi kysymyksiin kuten "Listaa kaikki opiskelijat, jotka ovat osallistuneet kurssille tietokantojen perusteet" tai "Listaa kaikki kurssit, joille annettu opiskelija on ilmoittautunut". Kysymykset kuten "Kuinka moni opiskelija on osallistunut kurssille tietokantojen perusteet" ovat kuitenkin vaatineet manuaalista työtä, sillä kyselyn tulosrivit on pitänyt laskea käsin.

SQL-kieli tarjoaa välineitä yhteenvetokyselyiden tekemiseen. Tällaisia kyselyitä ovat esimerkiksi juurikin yllä mainittu "kuinka moni" -- eli tulosrivien määrä -- sekä erilaiset summa- ja keskiarvokyselyt. Käytännössä yhteenvetokyselyt tehdään SQL-kielen tarjoamien funktioiden avulla. Alla on listattuna muutamia tyypillisimpiä funktioita, joita tietokantakyselyissä käytetään.



| Tavoite  | Funktio  | Esimerkki  |
| --       | --       | --         |
| Rivien lukumäärän selvittäminen  |  `COUNT`  | `SELECT COUNT(*) FROM Taulu`  |
| Sarakkeen lukujen summan laskeminen      | `SUM`  | `SELECT SUM(sarake) FROM Taulu`  |
| Sarakkeen lukujen keskiarvon laskeminen  | `AVG`  | `SELECT AVG(sarake) FROM Taulu`  |
| Sarakkeen lukujen keskihajonnan laskeminen  | `STDDEV`  | `SELECT STDDEV(sarake) FROM Taulu`  |
| Sarakkeen lukujen minimin selvittäminen  | `MIN`  | `SELECT MIN(sarake) FROM Taulu`  |
| Sarakkeen lukujen maksimin selvittäminen  | `MAX`  | `SELECT MAX(sarake) FROM Taulu`  |


Tarkastellaan näitä kyselyitä hieman tarkemmin. Oletetaan, että käytössämme on lentomatkoja kuvaava tietokantataulu `Lentomatka`, joka sisältää sarakkeet `yhtio`, `lahtopaikka`, `maaranpaa`, `pituus`. Pituus esitetään minuutteina.


| yhtio       | lahtopaikka  | maaranpaa  | pituus  |
| --          | --           | --         | --      |
| Air Berlin  | Helsinki     | Berliini   | 205     |
| Finnair     | Helsinki     | Oulu       | 70      |
| Finnair     | Helsinki     | Berliini   | 200     |
| Finnair     | Helsinki     | Tukholma   | 50      |
| Finnair     | Helsinki     | Mallorca   | 230     |
| Norwegian   | Helsinki     | Mallorca   | 240     |

Yhteenvetokyselyiden avulla saamme selville erilaisia tilastoja. Alla muutamia esimerkkejä:


- Kuinka monta matkaa tietokantataulussa `Lentomatka` on yhteensä?
```sql
SELECT COUNT(*) FROM Lentomatka;
```

- Kuinka monta lentoyhtiötä on tietokantataulussa lentomatka? (Huomaa avainsanan DISTINCT käyttö)
```sql
SELECT COUNT(DISTINCT yhtio) FROM Lentomatka;
```

- Kuinka monta lentoa taulussa on Helsingistä Mallorcalle?
```sql
SELECT COUNT(*) FROM Lentomatka
    WHERE lahtopaikka = 'Helsinki' AND maaranpaa = 'Mallorca';
```

- Mikä on keskimääräinen Finnairin lennon pituus?
```sql
SELECT AVG(pituus) FROM Lentomatka
    WHERE yhtio = 'Finnair';
```

- Mikä on lyhin matkan kesto Helsingistä Berliiniin?
```sql
SELECT MIN(pituus) FROM Lentomatka
    WHERE lahtopaikka = 'Helsinki' AND maaranpaa = 'Berliini';
```

- Mikä on Finnairin lentojen pituuksien minimi, maksimi, keskiarvo ja keskihajonta?
```sql
SELECT MIN(pituus), MAX(pituus), AVG(pituus), STDDEV(pituus)
    FROM Lentomatka
    WHERE yhtio = 'Finnair';
```



<sqltrainer-exercise name="Yksinkertaisia yhteenvetokyselyitä">

Tee SQL-harjoittelujärjestelmän aiheesta "Fun with functions!" vähintään neljä harjoitustehtävää (nappi "START PRACTICE!") sekä luo aiheeseen yksi uusi tehtävä (nappi "CREATE NEW CONTENT!") . Voit kirjoittaa tehtävänannon englannin sijaan halutessasi myös suomeksi tai ruotsiksi.

Huom! Mikäli järjestelmän tarjoama harjoitustehtävä on sellainen, ettet pysty ratkaisemaan sitä annetun ohjeen perusteella, saat uuden tehtävän palaamalla harjoitussivulle ("Practice") ja valitsemalla aiheen harjoittelun uudestaan. Annathan palautetta myös ratkaisemistasi tehtävistä lomakkeen avulla -- tämä mahdollistaa tehtävien paremman suosittelun tulevaisuudessa.

</sqltrainer-exercise>



<text-box variant='hint' name='Desimaalit ja tietokannanhallintajärjestelmät'>

Kaikki tietokannanhallintajärjestelmät eivät automaattisesti tuota liukulukutyyppisiä tuloksia keskiarvoa laskettaessa. Joissain tapauksissa funktio `AVG` palauttaa tietokannanhallintajärjestelmän määrittelemän määrän desimaaleja -- tämä voi olla myös 0. Joissain tapauksissa se voi laskea keskiarvon funktion parametrina saaman muuttujien tyypin perusteella. Esimerkiksi SQL-Trainerissa käytetty H2-tietokannanhallintajärjestelmä palauttaa kokonaislukujen keskiarvona kokonaisluvun.

Eräs tapa ratkaista ongelma H2-tietokannanhallintajärjestelmässä on muuntaa luvut desimaaliluvuiksi. Tämä onnistuu seuraavalla tavalla.

```sql
SELECT AVG(CAST(pituus AS double)) FROM Lentomatka
    WHERE yhtio = 'Finnair';
```


- Osaat tehdä SQL-kielellä yhteenvetokyselyitä ja rajata yhteenvetokyselyiden tuloksia.
- Osaat ryhmitellä tietokantakyselyiden tuolksia sekä laskea yhteenvetoja ryhmistä.

</text-box>



## Kyselyn tulosten ryhmittely

Entä jos haluaisimme saada selville yhtiökohtaisia tietoja kuten vaikkapa jokaisen yhtiön lyhimmän lennon? Tarkastellaan tätä seuraavaksi.

Tulosten ryhmittely tapahtuu komennon `GROUP BY` avulla. Komento lisätään `SELECT`-kyselyyn taulujen listauksen ja mahdollisten rajausehtojen jälkeen. Komentoa `GROUP BY` seuraa sarake, jonka perusteella tulokset ryhmitellään. Jotta ryhmittelystä tulee mielekäs, näkyy ryhmittelyn peruste tyypillisesti myös `SELECT`-komentoa seuraavassa sarakelistauksessa.


```sql
SELECT ryhmittelysarake, FUNKTIO(laskettava) FROM Taulu
    GROUP BY ryhmittelysarake;
```

Jatketaan lentoyhtiöiden parissa. Alla esimerkkejä ryhmittelyn toiminnasta.

- Kuinka monta matkaa kullakin lentoyhtiöllä on tarjolla?
```sql
SELECT yhtio, COUNT(*) FROM Lentomatka GROUP BY yhtio;
```

- Kuinka monta alle 100 minuutin pituista lentomatkaa eri kaupungeista lähtee?
```sql
SELECT lahtopaikka, COUNT(*) FROM Lentomatka
    WHERE pituus < 100
    GROUP BY lahtopaikka;
```

- Kuinka pitkiä kunkin lentoyhtiön matkat ovat keskimäärin?
```sql
SELECT yhtio, AVG(pituus) FROM Lentomatka GROUP BY yhtio;
```

- Mikä on kunkin yhtiön tarjoamien matkojen pituuksien keskiarvo ja keskihajonta?
```sql
SELECT yhtio, AVG(pituus), STDDEV(pituus)
    FROM Lentomatka GROUP BY yhtio;
```


### Useampaa taulua käsittelevät yhteenvetokyselyt

Yhteenvetokyselyt ovat lisätoiminnallisuus normaaleihin kyselyihin, joten taulujen yhdistäminen toimii myös yhteenvetokyselyissä -- ryhmittelykomento tulee mahdollisten WHERE-ehtojen jälkeen.

Oletetaan seuraavat taulut `Kurssi` ja `Kurssitehtava`.

```sql
CREATE TABLE Kurssi (
    id INTEGER,
    nimi VARCHAR(64),
    opintopisteet INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE Kurssitehtava (
    id INTEGER,
    kurssi_id INTEGER,
    tehtava VARCHAR(1024),
    PRIMARY KEY (id),
    FOREIGN KEY (kurssi_id) REFERENCES Kurssi (id)
);
```

Taulujen sisältö on seuraava. Ensin taulu `Kurssi`.

| id  | nimi    | opintopisteet  |
| --  | --      | --             |
| 1   | Ohpe    | 5              |
| 2   | Ohja    | 5              |
| 3   | Tikape  | 5              |
| 4   | OTM     | 5              |


Ja sitten taulu `Kurssitehtava`.


| id  | kurssi_id    | tehtava                                   |
| --  | --           | --                                        |
| 1   | 1            | Kirjoita ohjelmia uudelleen ja uudelleen  |
| 2   | 1            | Ja vielä vähän lisää                      |
| 3   | 1            | Ja kertaa toki myös käsitteistöä          |
| 4   | 2            | Jatka Ohpen hengessä                      |
| 5   | 2            | Ja huomaat että olet päässyt pitkälle     |
| 6   | 3            | Pohdi tiedon syvintä merkitystä           |


Kurssikohtaisten tehtävien lukumäärän laskeminen onnistuu seuraavasti. Avainsana AS muuntaa tuloksena saatavassa taulussa olevan sarakkeen nimen.


```sql
SELECT Kurssi.nimi AS kurssi, COUNT(*) AS tehtavia FROM Kurssi
    JOIN Kurssitehtava ON Kurssi.id = Kurssitehtava.kurssi_id
    GROUP BY Kurssi.nimi;
```


Kyselyn tulos on seuraava.


| kurssi    | tehtavia  |
| --        | --        |
| Ohpe      | 3         |
| Ohja      | 2         |
| Tikape    | 1         |


Tarkastellessamme kyselyn tuloksia huomaamme, että tuloksissa ei ole yhtäkään tehtävätöntä kurssia. Kurssi `OTM` puuttuu täysin listauksesta. Tämä selittyy kyselyllämme -- olemme valinneet mukaan vain rivit, joilla hakuehdot täyttyvät. Kirjoitetaan edellinen kysely siten, että otamme huomioon kurssit vaikka niihin ei liittyisikään yhtäkään toisen taulun riviä -- käytämme siis `LEFT JOIN`-kyselyä.


```sql
SELECT Kurssi.nimi AS kurssi, COUNT(Kurssitehtava.id) AS tehtavia FROM Kurssi
    LEFT JOIN Kurssitehtava ON Kurssi.id = Kurssitehtava.kurssi_id
    GROUP BY Kurssi.nimi
```


Kyselyn tulos on seuraava.


| kurssi    | tehtavia  |
| --        | --        |
| Ohpe      | 3         |
| Ohja      | 2         |
| Tikape    | 1         |
| OTM       | 0         |


Edellä `COUNT`-funktiolle annetaan parametrina kurssitehtävän id. Jos funktiolle annetaan parametrina `*`, myös `null`-arvo -- eli tyhjä -- lasketaan arvoksi(ainakin joissain tietokannanhallintajärjestelmissä).



<sqltrainer-exercise name="Tiedon ryhmittelyä sisältäviä yhteenvetokyselyjä">

Tee SQL-harjoittelujärjestelmän aiheesta "Group by ..." vähintään neljä harjoitustehtävää (nappi "START PRACTICE!") sekä luo aiheeseen yksi uusi tehtävä (nappi "CREATE NEW CONTENT!") . Voit kirjoittaa tehtävänannon englannin sijaan halutessasi myös suomeksi tai ruotsiksi.

Huom! Mikäli järjestelmän tarjoama harjoitustehtävä on sellainen, ettet pysty ratkaisemaan sitä annetun ohjeen perusteella, saat uuden tehtävän palaamalla harjoitussivulle ("Practice") ja valitsemalla aiheen harjoittelun uudestaan. Annathan palautetta myös ratkaisemistasi tehtävistä lomakkeen avulla -- tämä mahdollistaa tehtävien paremman suosittelun tulevaisuudessa.

</sqltrainer-exercise>


###  Ryhmittely useamman sarakkeen perusteella

Oletetaan edellä kuvattujen taulujen lisäksi taulut `Kurssisuoritus` ja `Opiskelija`. Taulut on määritelty seuraavasti.

```sql
CREATE TABLE Opiskelija (
    id INTEGER,
    opiskelijanumero INTEGER,
    nimi VARCHAR(64),
    syntymavuosi INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE Kurssisuoritus (
    id INTEGER,
    kurssi_id INTEGER,
    opiskelija_id INTEGER,
    arvosana INTEGER,
    paivamaara DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (kurssi_id) REFERENCES Kurssi(id),
    FOREIGN KEY (opiskelija_id) REFERENCES Opiskelija(id)
);
```

Komennolle `GROUP BY` voi antaa useampia sarakkeita, jolloin ryhmittely tapahtuu sarakeryhmittäin. Esimerkiksi ryhmittely `GROUP BY kurssi, arvosana` -- mikäli tällaiset sarakkeet olisi olemassa -- ryhmittelisi taulussa olevat rivit ensin kurssin perusteella, jonka jälkeen kurssikohtaiset ryhmät ryhmiteltäisiin vielä arvosanan perusteella. Tällöin jokaiselle kurssille tulisi erilliset arvosanaryhmät.

Kurssikohtaiset arvosanaryhmät saa selville seuraavalla kyselyllä.


```sql
SELECT Kurssi.nimi AS kurssi, Kurssisuoritus.arvosana AS arvosana, COUNT(*) AS lukumaara
    FROM Kurssi
    JOIN Kurssisuoritus ON Kurssi.id = Kurssisuoritus.kurssi_id
    GROUP BY Kurssi.nimi, Kurssisuoritus.arvosana;
```


### Hakutulosten rajaaminen yhteenvetokyselyissä

Yhteenvetokyselyissä laskettavat tulokset kuten summa, rivien lukumäärä ja keskiarvo muodostetaan vasta, kun kaikki kyselyn rivit on selvillä. Kyselyiden tuloksen rajaamiseen käytetty `WHERE` toimii siten, että se tarkastelee tuloksia riveittäin -- se ei osaa odottaa summan laskemisen lopputulosta.

Mikäli yhteenvetokyselyn tuloksen perusteella halutaan rajata tuloksia, tulee käyttää `HAVING`-käskyä. Käskyn `HAVING` kuvaama ehto tarkastetaan vasta sitten, kun yhteenvetokyselyn tulokset ovat selvillä. Ehto `HAVING` lisätään ryhmittelykyselyn jälkeen esimerkiksi seuraavalla tavalla.


```sql
SELECT Kurssi.nimi AS kurssi, AVG(Kurssisuoritus.arvosana) AS keskiarvo
    FROM Kurssi
    JOIN Kurssisuoritus ON Kurssi.id = Kurssisuoritus.kurssi_id
    GROUP BY Kurssi.nimi
    HAVING keskiarvo < 2;
```

Yllä olevalla kyselyllä saadaan selville ne kurssit, joihin liittyvien kurssisuoritusten keskiarvo on alle 2.


### Hakutulosten järjestäminen


Yhteenvetokyselyn tulosten järjestäminen tapahtuu samalla tavalla kuin aiemmin. Järjestyskäsky tulee kyselyn loppuun -- alla kurssit järjestetään niiden keskiarvon perusteella.

```sql
SELECT Kurssi.nimi AS kurssi, AVG(Kurssisuoritus.arvosana) AS keskiarvo
    FROM Kurssi
    JOIN Kurssisuoritus ON Kurssi.id = Kurssisuoritus.kurssi_id
    GROUP BY Kurssi.nimi
    HAVING keskiarvo < 2
    ORDER BY keskiarvo;
```


<sqltrainer-exercise name="Lisää yhteenvetokyselyjä">

Tee SQL-harjoittelujärjestelmän aiheesta "Aggregate queries revisited" vähintään neljä harjoitustehtävää (nappi "START PRACTICE!") sekä luo aiheeseen yksi uusi tehtävä (nappi "CREATE NEW CONTENT!") . Voit kirjoittaa tehtävänannon englannin sijaan halutessasi myös suomeksi tai ruotsiksi.

Huom! Mikäli järjestelmän tarjoama harjoitustehtävä on sellainen, ettet pysty ratkaisemaan sitä annetun ohjeen perusteella, saat uuden tehtävän palaamalla harjoitussivulle ("Practice") ja valitsemalla aiheen harjoittelun uudestaan. Annathan palautetta myös ratkaisemistasi tehtävistä lomakkeen avulla -- tämä mahdollistaa tehtävien paremman suosittelun tulevaisuudessa.

</sqltrainer-exercise>
