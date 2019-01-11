---
path: '/osa-1/2-tiedon-hakeminen-tietokannasta'
title: 'SQL-kieli ja tiedon hakeminen'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet tietokantakyselyiden muodostamiseen käytettävän SQL-kielen toimintaperiaatteet.
- Osaat hakea tietoa yhdestä tietokantataulusta.
- Osaat rajata ja järjestää kyselyiden tuloksia.
- Osaat hakea tietoa useammasta tietokantataulusta.

</text-box>


Tällä kurssilla keskitytään Structured Query Language -kieleen. Structured Query Language (jatkossa SQL) on 1980-luvulla standardoitu kieli tietokantakyselyiden tekemiseen. SQL-kielen avulla voidaan tiedon hakemisen lisäksi määritellä tallennettavan tiedon muoto, luoda ja muokata tietokantatauluja, lisätä tietoa tietokantatauluihin, ja muokata tietokantatauluissa olevaa tietoa. Merkittävä osa tällä hetkellä käytössä olevista tietokannanhallintajärjestelmistä tukee SQL-kielellä tehtyjen kyselyiden käyttämistä tietokannanhallintajärjestelmässä olevien tietokantojen ja tietokantataulujen käsittelyyn.


Vuosien mittaan SQL-kielestä on julkaistu useita versioita, joista viimeisin on vuodelta <a href="https://en.wikipedia.org/wiki/SQL:2016" target="_blank" norel>2016</a>. Tietokannanhallintajärjestelmät ja niiden eri versiot noudattavat SQL-kieltä vaihtelevasti. Yhtä tietokannanhallintajärjestelmää varten luodut kyselyt eivät ole aina suoraan siirrettävissä toiseen tietokannanhallintajärjestelmään. On siis syytä huomioida että tietokannanhallintajärjestelmästä toiseen siirryttäessä joudutaan usein tekemään SQL-kyselyihin (pieniä) muutoksia. Tyypillisimpiä tietotyyppejä, joiden käsittelytapa vaihtelee eri tietokannanhallintajärjestelmien välillä ovat päivämäärät. Vaikka tämä on hyvä tiedostaa, erot järjestelmien välillä ovat onneksi vähentyneet ajan myötä.


<text-box variant='hint' name='SQL-kyselyiden harjoittelu'>


Kurssi käyttää SQL-trainer -järjestelmää.

</text-box>


<text-box variant='hint' name='SQL-kyselyiden kirjoitusmuoto'>

SQL-kieli on "case insensitive", eli sillä, että onko kysely kirjoitettu isoilla vai pienillä kirjaimilla kei ole kyselyn suorituksen kannalta merkitystä. Voimme kirjoittaa komennon `SELECT` yhtä hyvin muodossa `select` tai `Select` -- sama pätee myös taulujen ja sarakkeiden nimille.


Noudatamme tällä kurssilla seuraavaa käytäntöä:


- Kaikki SQL-kielen komennot, kuten `SELECT`, `FROM` ja `WHERE`, kirjoitetaan isolla.
- Taulujen nimet kirjoitetaan isolla alkukirjaimella. Esimerkiksi `Henkilo` ja `Opiskelija`.
- Taulujen sarakkeet eli attribuutit kirjoitetaan pienellä. Esimerkiksi `nimi` ja `syntymavuosi`.
- Rivitys niin, että kosher..


</text-box>

##  Tietokantataulut ja avaimet

TODO: lyhyt kertaus edellisestä


###  Tiedon hakeminen yhdestä tietokantataulusta


Tiedon hakeminen tietokantataulusta onnistuu **SELECT**-lauseella. Avainsanaa `SELECT` seuraa haettavat sarakkeet, avainsana `FROM`, ja tietokantataulun nimi.


```sql
SELECT *sarake1*, *sarake2* FROM *TAULUN_NIMI*
```


Oletetaan, että käytössämme on seuraava tietokantataulu `Henkilo`.


| syntymavuosi     | nimi     |
| --               | ---      |
| 1997             | Pihla    |
| 1993             | Joni     |
| 1947             | Raymond  |
| 1923             | Edgar    |


Jokaisen tietokantataulussa olevan henkilön nimen hakeminen ja listaaminen onnistuu kyselyllä `SELECT nimi FROM Henkilo`.


```sql
SELECT nimi FROM Henkilo
```


Jos taas haluamme listata jokaisen tietokantatauluun Henkilo tallennetun henkilön nimen lisäksi syntymävuoden, kyselyn sarakkeisiin tulee lisätä (pilkulla erotettuna) haluttavan sarakkeen nimi, eli tässä tapauksessa `syntymavuosi`.


```sql
SELECT nimi, syntymavuosi FROM Henkilo
```


SQL-kieli tarjoaa tuen matemattisten operaatioiden tekemiseen. Mikäli syntymävuosi on tallennettu numerona (palaamme tallennusmuotoon kun opimme luomaan tietokantatauluja!), kunkin henkilön iän saa selville erottamalla syntymävuoden nykyvuodesta.


```sql
SELECT nimi, 2019-syntymavuosi FROM Henkilo
```

Kyselyn tuottamassa vastauksessa käytetään oletuksena sarakkeen niminä kyselyssä annettuja sarakkeita. Sarakkeet voi halutessaan nimetä myös uudestaan -- tämä onnistuu sarakkeen nimen jälkeen annettavalla `AS`-operaatiolla. Esimerkiksi edellisen kyselyn tuloksessa sarakkeiden nimiksi tulee `henkilo` ja `ika` mikäli kysely on seuraava.

```sql
SELECT nimi AS henkilo, 2019-syntymavuosi AS ika FROM Henkilo
```


Sarakkeita ei ole aina pakko määritellä `SELECT`-kyselyssä. Mikäli kyselyssä halutaan listata kaikki sarakkeet, voidaan `SELECT`-komentoa seuraava sarakelistaus korvata tähtimerkillä `*`.


```sql
SELECT * FROM Henkilo
```


# TODO: linkki harjoittelujärjestelmään -- tee nyt BLA BLA tehtävät



###  Kyselyn tulosten rajaaminen


Tarkastellaan seuraavaksi kyselyn tulosten rajaamista. Kyselyn tulosten rajausta määrittevät ehdot lisätään kyselyssä määritellyn taulun (tai taulujen) jälkeen asetettavan avainsanan `WHERE` jälkeen. Rajausehdon sisältävän kyselyn muoto on seuraava `SELECT sarake FROM Taulu WHERE rajausehto`.

Esimerkiksi kaikki henkilöt, jotka ovat syntyneet ennen vuotta 1950, saa listattua seuraavalla lauseella.

```sql
SELECT * FROM Henkilo WHERE syntymavuosi < 1950
```


Vastaavasti, mikäli kyselyn tuloksena haluaa vain henkilöiden nimet, vaihdetaan kaikki sarakkeet valitsevan `*`-merkin paikalle sarake `nimi`.


```sql
SELECT nimi FROM Henkilo WHERE syntymavuosi < 1950
```


Mikäli sarakkeen arvot ovat merkkijonoja, kuten nimi, täsmällisessä haussa käytetään `=`-operaatiota ja osaa merkkijonosta etsivässä haussa `LIKE`-operaatiota. Merkkijonot tulee merkitä kyselyyn hipsuilla -- jotkut tietokannanhallintajärjestelmät odottavat yksittäisiä hipsuja `'` kun taas jotkut odottavat tuplahipsuja `"`. Esimerkeissä käytetään yksittäisiä hipsuja.

Kyselyllä `SELECT * FROM Henkilo WHERE nimi = 'Sylvi'` haetaan kaikki ne henkilöt, joiden nimi on Sylvi. Vastaavasti kysely `SELECT * FROM Henkilo WHERE nimi LIKE '%a%'` hakee kaikki henkilöt, joiden nimessä esiintyy `a`-kirjain, kysely `SELECT * FROM Henkilo WHERE nimi LIKE '%a'` hakee kaikki henkilöt, joiden nimi päättyy kirjaimeen `a`, ja kysely `SELECT * FROM Henkilo WHERE nimi LIKE 'abc%'` hakee ne henkilöt, joiden nimi alkaa merkkijonolla `abc` -- prosenttimerkki osana `LIKE`-operaatiota merkitsee siis opiskelijoiden rajauksen.


# TODO: linkki harjoittelujärjestelmään -- tee nyt BLA BLA tehtävät


###  Loogiset operaatiot


Rajausehtoihin voi lisätä loogisia operaatioita kyselyjen tulosten rajaamiseksi. Operaatio 'ja', eli kahden rajausehdon yhdistäminen, toimii avainsanalla `AND`. Esimerkiksi kysely `SELECT * FROM Henkilo WHERE nimi = 'Ted' AND syntymavuosi = 1920` listaa vain ne henkilöt, joiden nimi on 'Ted' ja joiden syntymävuosi on 1920.

Operaation 'tai' lisääminen on myös mahdollista. Esimerkiksi kysely `SELECT * FROM Henkilo WHERE nimi = 'Matti' OR nimi = 'Maija'` listaisi kaikki ne henkilöt, joiden nimi on Matti tai Maija. Kyselyissä toimivat myös suurempi kuin `>` ja pienempi kuin `<` -operaatiot sekä niiden yhtäsuuruuden huomioon ottavat versiot `>=` ja `<=`.

Loogisia operaatioita voi lisätä kyselyyn käytännössä rajattomasti ja kyselyiden suoritusjärjestystä voi ohjata suluilla. Esimerkiksi kysely `SELECT * FROM Opintosuoritus WHERE (kurssi = 'Ohpe' OR kurssi = 'Ohja') AND arvosana = 3` hakisi kaikki ne opintosuoritukset, joissa kurssina on joko `Ohpe` tai `Ohja`, ja arvosanana on `3`.

Loogiset operaatiot ja sulut toimivat samalla tavalla kuin ohjelmointikursseilla. Sulut ovat täälläkin tärkeät -- esimerkiksi edellä kuvatun kyselyn tulos muuttuisi merkittävästi, mikäli se olisi kirjoitettu ilman sulkuja muodossa `SELECT * FROM Opintosuoritus WHERE kurssi = 'Ohpe' OR kurssi = 'Ohja' AND arvosana = 3`. Tämä kysely hakisi kaikki ne opintosuoritukset, joissa kurssi on `Ohpe`, sekä kaikki ne opintosuoritukset, joissa kurssi on `Ohja` ja arvosana on `3`.

# TODO: linkki harjoittelujärjestelmään -- tee nyt BLA BLA tehtävät



###  Tulosten järjestäminen

Tietokantakyselyn tulosten järjestäminen tapahtuu kyselyn loppuun lisättävällä `ORDER BY`-komennolla, jota seuraa sarakkeet, joiden mukaan tulokset järjestetään. Tulokset järjestetään oletuksena nousevaan järjestykseen luonnollista järjestystä noudattaen, eli "pienimmät arvot tulevat ensin".

Esimerkkitaulumme `Henkilo` tulostuisi kyselyn `SELECT syntymavuosi, nimi FROM Henkilo ORDER BY syntymavuosi` seurauksena siten, että tulokset olisi järjestetty syntymävuoden perusteella pienin ensin.

| syntymavuosi     | nimi     |
| --               | ---      |
| 1923             | Edgar    |
| 1947             | Raymond  |
| 1993             | Joni     |
| 1997             | Pihla    |

Kyselyn tulokset voi järjestää vastaavasti nimen perusteella. Kysely `SELECT syntymavuosi, nimi FROM Henkilo ORDER BY nimi` tuottaisi seuraavanlaisen tuloksen.

| syntymavuosi     | nimi     |
| --               | ---      |
| 1923             | Edgar    |
| 1993             | Joni     |
| 1997             | Pihla    |
| 1947             | Raymond  |

Tulosten järjestys voi olla joko oletuksena oleva nouseva (_ascending_ eli `ASC`) tai laskeva (_descending_ eli `DESC`). Mikäli järjestyksen haluaa määritellä, tulee se antaa sarakkeen (tai sarakkeiden) jälkeen. Esimerkiksi henkilöiden hakeminen nimien perusteella laskevaan järjestykseen järjestettynä onnistuisi kyselyllä  `SELECT syntymavuosi, nimi FROM Henkilo ORDER BY nimi DESC`. Tulos olisi tällöin seuraava.


| syntymavuosi     | nimi     |
| --               | ---      |
| 1947             | Raymond  |
| 1997             | Pihla    |
| 1993             | Joni     |
| 1923             | Edgar    |


# TODO: linkki harjoittelujärjestelmään -- tee nyt BLA BLA tehtävät



##  Tiedon hakeminen kahdesta tai useammasta taulusta


Olemme tähän mennessä käsitelleet tiedon hakemista yhdestä tietokantataulusta. Tutustutaan seuraavaksi tiedon hakemiseen useammasta taulusta sekä erityisesti tauluissa olevan tiedon yhdistämisestä.


Oletetaan, että käytössämme ovat seuraavat kaksi taulua Opiskelija ja Opintosuoritus, jotka kuvaavat opiskelijaa ja opintosuoritusta. Taulujen sarakkeissa olevat merkinnät `(pk)` ja `(fk)` merkkaavat pääavainta `(pk)` ja viiteavainta `(fk)`. Viiteavaimen tapauksessa on merkitty erikseen myös taulu, jonka pääavaimeen viiteavaimella viitataan.


| (pk) Opiskelijanumero  | Nimi   | Pääaine                 |
| ---                    | ---    | ---                     |
| 9999999                | Pihla  | Tietojenkäsittelytiede  |
| 9999998                | Joni   | Tietojenkäsittelytiede  |
| 9999997                | Sylvi  | Matematiikka            |
| 1000002                | Matti  | Matematiikka            |


| (fk) Opiskelijanumero -> Opiskelija  | Kurssi     | Arvosana  |
| ---                                  | ---        | ---       |
| 9999999                              | Ohpe       | 5         |
| 9999999                              | Ohja       | 4         |
| 9999999                              | Tikape     | 5         |
| 9999998                              | Ohpe       | 2         |
| 9999998                              | Ohja       | 1         |
| 9999997                              | Ohpe       | 5         |
| 9999997                              | Ohja       | 5         |
| 9999997                              | JYM        | 5         |
| 1000002                              | JYM        | 4         |


Taulu Opiskelija sisältää opiskelijoita, joista on tallennettu opiskelijanumero, nimi ja pääaine. Opiskelijanumero on merkitty pääavaimeksi, eli opiskelijanumero on opiskelijakohtainen ja kukin opiskelijanumero saa esiintyä taulussa korkeintaan kerran. Taulu Opintosuoritus taas sisältää opintosuorituksia, joista on tallennettu opintosuorituksen tehneen opiskelijan opiskelijanumero, kurssi, sekä arvosana.


Tiedämme, että kaikkien opiskelijoiden tulostaminen onnistuu kyselyllä `SELECT * FROM Opiskelija` ja toisaalta kaikkien opintosuoritusten tulostaminen onnistuu kyselyllä `SELECT * FROM Opintosuoritus`. Entä tietojen yhdistäminen?

Kahden taulun yhdistäminen onnistuu liitoskyselyllä (`JOIN`). Liitoskysely muodostetaan hakemalla ensin yhden taulun tiedon `SELECT * FROM Opiskelija` ja liittämällä siihen toisen taulun tiedot `JOIN Opintosuoritus` pääavaimen ja viiteavaimen perusteella `ON Opiskelija.opiskelijanumero = Opintosuoritus.opiskelijanumero`. Kysely, joka listaa kaikki opiskelijat sekä jokaiseen opiskelijaan liittyvän opintosuorituksen näyttää kokonaisuudessaan seuraavalta.


```sql
SELECT * FROM Opiskelija
  JOIN Opintosuoritus
      ON Opiskelija.opiskelijanumero = Opintosuoritus.opiskelijanumero
```


Mikäli useamman taulun yhdistävässä kyselyssä haluaa vain tietyt sarakkeet, sarakkeet tulee nimetä. Esimerkiksi kysely, joka valitsee opiskelijan nimen, kurssin ja arvosanan, tehdään seuraavasti.


```sql
SELECT Opiskelija.nimi, Opintosuoritus.kurssi, Opintosuoritus.arvosana
  FROM Opiskelija
  JOIN Opintosuoritus
      ON Opiskelija.opiskelijanumero = Opintosuoritus.opiskelijanumero
```

Kyselyn voi kirjoittaa myös ilman taulun nimeä sarakkeissa mikäli pyydettävä sarakkeen nimi ei esiinny useammassa taulussa. Toinen vaihtoehto on antaa taululle erillinen nimi, jota käytetään kyselyssä. Tämä tapahtuu käyttämällä taulun nimen jälkeen `AS`-komentoa, jota seuraa uusi nimi.


```sql
SELECT o.nimi, os.kurssi, os.arvosana
  FROM Opiskelija AS o
  JOIN Opintosuoritus AS os
      ON Opiskelija.opiskelijanumero = Opintosuoritus.opiskelijanumero
```



Kyselyyn
TODO: termi liitoskysely
Mitä







### Laajempi esimerkki

Oletetaan, että käytössämme on seuraava ravintoloiden ruokia sekä tilauksia sisältävä tietokanta. Alla olevaan kuvaukseen on merkitty tietokantataulujen ja sarakkeiden lisäksi sarakkeiden tyypit -- esimerkiksi merkintä `id:Integer` tarkoittaa kokonaislukutyyppistä saraketta, jonka nimi on `id`, ja merkintä `postitoimipaikka:String` merkkijonomuotoista saraketta, jonka nimi on `postitoimipaikka`. Tietokantatauluihin on merkitty myös pää- ja viiteavaimet.

- Asiakas((pk) id:Integer, nimi:String, puhelinnumero:String, katuosoite:String, postinumero:Integer, postitoimipaikka:String)
- Ravintola((pk) id:Integer, nimi:String, puhelinnumero:String, katuosoite:String, postinumero:Integer, postitoimipaikka:String)
- Annos((pk) id:Integer, (fk) ravintola_id -> Ravintola, nimi:String, koko:String, hinta:double)
- Tilaus((pk) id:Integer, (fk) asiakas_id -> Asiakas, aika:Date, kuljetustapa:String, vastaanotettu:Boolean, toimitettu:Boolean)
- RaakaAine((pk) id:Integer, nimi:String)
- AnnosRaakaAine((fk) annos_id - > Annos, (fk) raaka_aine_id -> RaakaAine)
- TilausAnnos((fk) tilaus_id - > Tilaus, (fk) annos_id -> Annos)


Kuvana tietokanta näyttää seuraavalta.

## TODO: kuva, mihin kyseinen kanta on piirretty

Oletetaan, että haluamme etsiä kaikki raaka-aineet, joita Leevi-niminen asiakas on saattanut syödä. Ensimmäinen askeleemme ongelman ratkaisuun on polun etsiminen taulusta Asiakas tauluun RaakaAine. Mikäli polkua ei löydy, ei tietoa pysty myöskään hakemaan.

TODO: miten polku etsitään -- lähde jommasta kummasta taulusta liikenteeseen ja seuraa viiteavaimia.

Aloitetaan polkua kuvaavan SQL-kyselyn rakentaminen. Aloitamme taulusta `Asiakas` ja etsimme polkua tauluun `RaakaAine`. Jotta pääsemme taulusta Asiakas tauluun RaakaAine, tulee meidän vierailla tauluissa `TilausAnnos`, `Annos` ja `AnnosRaakaAine`.

- Haemme aluksi asiakkaan nimeltä Leevi.

```sql
SELECT Asiakas.nimi AS asiakas
  FROM Asiakas
  WHERE Asiakas.nimi = 'Leevi';
```

- Kytketään tähän seuraavaksi kaikki Leevin tekemät tilaukset, jotka löytyvät taulusta Tilaus.

```sql
SELECT Asiakas.nimi AS asiakas
  FROM Asiakas
  JOIN Tilaus ON Asiakas.id = Tilaus.asiakas_id
  WHERE Asiakas.nimi = 'Leevi';
```

- Yhdistetään edelliseen kyselyyn taulu TilausAnnos.

```sql
SELECT Asiakas.nimi AS asiakas
  FROM Asiakas
  JOIN Tilaus ON Asiakas.id = Tilaus.asiakas_id
  JOIN TilausAnnos ON TilausAnnos.tilaus_id = Tilaus.id
  WHERE Asiakas.nimi = 'Leevi';
```

- Yhdistetään tähän taulu Annos.

```sql
SELECT Asiakas.nimi AS asiakas
  FROM Asiakas
  JOIN Tilaus ON Asiakas.id = Tilaus.asiakas_id
  JOIN TilausAnnos ON TilausAnnos.tilaus_id = Tilaus.id
  JOIN Annos ON Annos.id = TilausAnnos.annos_id
  WHERE Asiakas.nimi = 'Leevi';
```

- Yhdistetään tähän seuraavaksi taulu AnnosRaakaAine.

```sql
SELECT Asiakas.nimi AS asiakas
  FROM Asiakas
  JOIN Tilaus ON Asiakas.id = Tilaus.asiakas_id
  JOIN TilausAnnos ON TilausAnnos.tilaus_id = Tilaus.id
  JOIN Annos ON Annos.id = TilausAnnos.annos_id
  JOIN AnnosRaakaAine ON AnnosRaakaAine.annos_id = Annos.id
  WHERE Asiakas.nimi = 'Leevi';
```

- Olemme lähes perillä! Yhdistetään kyselyyn vielä taulu RaakaAine.

```sql
SELECT Asiakas.nimi AS asiakas
  FROM Asiakas
  JOIN Tilaus ON Asiakas.id = Tilaus.asiakas_id
  JOIN TilausAnnos ON TilausAnnos.tilaus_id = Tilaus.id
  JOIN Annos ON Annos.id = TilausAnnos.annos_id
  JOIN AnnosRaakaAine ON AnnosRaakaAine.annos_id = Annos.id
  JOIN RaakaAine ON RaakaAine.id = AnnosRaakaAine.raaka_aine_id
  WHERE Asiakas.nimi = 'Leevi';
```

- Kyselymme yhdistää taulut ja löytää Leevi-nimiseen asiakkaaseen liittyvät tiedot. Edellisestä kyselystä raaka-aineiden tulostaminen tosin puuttuu, joten tämä vielä osaksi kyselyä.


```sql
SELECT Asiakas.nimi AS asiakas, RaakaAine.nimi AS raaka_aine
  FROM Asiakas
  JOIN Tilaus ON Asiakas.id = Tilaus.asiakas_id
  JOIN TilausAnnos ON TilausAnnos.tilaus_id = Tilaus.id
  JOIN Annos ON Annos.id = TilausAnnos.annos_id
  JOIN AnnosRaakaAine ON AnnosRaakaAine.annos_id = Annos.id
  JOIN RaakaAine ON RaakaAine.id = AnnosRaakaAine.raaka_aine_id
  WHERE Asiakas.nimi = 'Leevi';
```


TODO: kyselyssä raaka-aine voi esiintyä useampaan kertaan. miksi? no koska leevi on voinut tilata saman ruuan useampaan otteeseen.

--> DISTINCT


Huomaa, että jokaista askelta voi ja kannattaa testata tietokannanhallintajärjestelmän tarjoamassa konsolissa.






Useamman taulun yhdistäminen onnistuu samalla tavalla. Kaikki taulut, jotka haluamme lisätä kyselyyn, tulevat FROM-avainsanan jälkeen. Jos tauluja on useampi, on hyvä varmistaa, että kaikki taulut yhdistetään avainkenttien perusteella.



Kun yhdistämme useampia tauluja, päädymme helposti tilanteeseen, missä tuloksessa on myös useampia samannimisiä kenttiä. Esimerkiksi tilaustietokannassa taulut Asiakas, Ravintola, Annos ja RaakaAine kukin sisältää attribuutin nimi. Voimme määritellä taulun, mihin haettava kenttä liittyy, pisteoperaattorin avulla. Kyselyn `SELECT nimi FROM Asiakas` voi siis kirjoittaa myös muodossa `SELECT Asiakas.nimi FROM Asiakas`.



Voimme toisaalta myös nimetä kentän tulostusmuodon seuraavasti `SELECT Asiakas.nimi AS asiakas FROM Asiakas`. Edelläoleva kysely hakee Asiakas-taulusta asiakkaan nimen, mutta tulostaa nimet otsikolla 'asiakas'.



Alla oleva kysely listaa asiakkaan sekä kaikki asiakkaan tilauksissa olleet annokset. Jokainen annos tulee omalle rivilleen, joten saman nimisellä asiakkaalla voi olla listauksessa useita eri annoksia.



```sql
SELECT Asiakas.nimi AS asiakas, Annos.nimi AS annos
    FROM Asiakas, Tilaus, TilausAnnos, Annos
    WHERE Asiakas.id = Tilaus.asiakas_id
        AND TilausAnnos.tilaus_id = Tilaus.id
        AND Annos.id = TilausAnnos.annos_id;
```




Huomaa, että jokaista askelta voi ja kannattaa testata tietokannanhallintajärjestelmän tarjoamassa konsolissa.


<% partial 'partials/hint', locals: { name: 'DISTINCT valitsee vain uniikit rivit' } do %>


  Entä jos haluaisimme tietää vain ne henkilöt, joiden annoksessa on ollut paprikaa raaka-aineena? Tämä onnistuu edellistä kyselyä muokkaamalla näppärästi.


```sql
SELECT Asiakas.nimi AS asiakas
    FROM Asiakas, Tilaus, TilausAnnos, Annos, AnnosRaakaAine, RaakaAine
        WHERE RaakaAine.nimi = 'Paprika'
        AND Tilaus.asiakas_id = Asiakas.id
        AND TilausAnnos.tilaus_id = Tilaus.id
        AND Annos.id = TilausAnnos.annos_id
        AND AnnosRaakaAine.annos_id = Annos.id
        AND RaakaAine.id = AnnosRaakaAine.raaka_aine_id;
```


  <strong>Mutta!</strong> Jos henkilö on tehnyt useamman Paprikaa sisältäneen tilauksen -- tai yhteen tilaukseen liittyy useampi annos, jossa esiintyy Paprikaa -- on tulostuksessa jokaista Paprikaa sisältänyttä annosta kohden oma rivi. Tällöin henkilön nimi tulostuu kerran jokaista tulosriviä kohden.



  Jos tulostukseen haluaa vain uniikit rivit, tulee kyselyyn lisätä komento `DISTINCT`. Kun SELECT-lauseessa on komento DISTINCT, tulostuksen rivit ovat uniikkeja.



```sql
  SELECT DISTINCT Asiakas.nimi AS asiakas
      FROM Asiakas, Tilaus, TilausAnnos, Annos, AnnosRaakaAine, RaakaAine
          WHERE RaakaAine.nimi = 'Paprika'
          AND Tilaus.asiakas_id = Asiakas.id
          AND TilausAnnos.tilaus_id = Tilaus.id
          AND Annos.id = TilausAnnos.annos_id
          AND AnnosRaakaAine.annos_id = Annos.id
          AND RaakaAine.id = AnnosRaakaAine.raaka_aine_id;
```

```




<% partial 'partials/material_sub_heading' do %>
Taulujen yhdistämisestä JOIN-kyselyillä
```



Kyselyssä, missä taulujen rivit yhdistetään WHERE-ehdon ja avainten perusteella, valitaan näytettäväksi vain ne rivit, jotka täyttävät annetun ehdon. Entä jos haluaisimme nähdä myös ne kurssit, joita kukaan ei ole suorittanut? Tämä ei ole suoraviivaista WHERE-ehdon kautta rakennetun kyselyn avulla.



Vuonna 1992 julkaistu SQL-standardin versio toi mukanaan JOIN-kyselyt, joiden avulla edellä määritelty ongelma ratkeaa -- pienen harjoittelun kautta. Tutustutaan seuraavaksi aiemmin oppimaamme taulujen yhdistämistapaa tukeviin erityyppisiin JOIN-kyselyihin.



<% partial 'partials/material_sub_sub_heading' do %>
INNER JOIN
```


Edellä tutuksi tullut kysely `SELECT * FROM Asiakas, Tilaus WHERE Asiakas.id = Tilaus.asiakas_id` valitsee vastaukseen vain ne rivit, joiden kohdalla ehto <em>Asiakas.id = Tilaus.asiakas_id</em> pätee, eli missä Asiakkaan id-sarakkeen (pääavaimen) arvo on sama kuin Tilaus-taulun asiakas_id-sarakkeen (viiteavain).



Edellinen kysely voidaan kirjoittaa myös muodossa `SELECT * FROM Asiakas INNER JOIN Tilaus ON Asiakas.id = Tilaus.asiakas_id`.



Jos haluamme kyselyyn useampia tauluja, lisätään ne INNER JOIN -komennon avulla kyselyn jatkoksi. Esimerkiksi kaksi seuraavaa kyselyä ovat toiminnallisuudeltaan samankaltaiset.


```sql
SELECT Asiakas.nimi AS asiakas, Tilaus.aika AS tilausaika, Annos.nimi AS annos
  FROM Asiakas, Tilaus, TilausAnnos, Annos
  WHERE Asiakas.id = Tilaus.asiakas_id
      AND TilausAnnos.tilaus_id = Tilaus.id
      AND Annos.id = TilausAnnos.annos_id;
```

```sql
SELECT Asiakas.nimi AS asiakas, Tilaus.aika AS tilausaika, Annos.nimi AS annos
  FROM Asiakas
  INNER JOIN Tilaus ON Asiakas.id = Tilaus.asiakas_id
  INNER JOIN TilausAnnos ON TilausAnnos.tilaus_id = Tilaus.id
  INNER JOIN Annos ON Annos.id = TilausAnnos.annos_id
```



<% partial 'partials/material_sub_sub_heading' do %>
LEFT JOIN
```


Mikä tekee taulujen liitoksesta JOIN-kyselyn avulla WHERE-ehtoa monipuolisemman, on se, että JOIN-kyselyn avulla voidaan määritellä kyselyehtoa täyttämättömille riveille toiminnallisuutta. Avainsanalla `LEFT JOIN` voidaan määritellä kyselyn tulos sellaiseksi, että ehdon täyttävien rivien lisäksi vastaukseen sisällytetään kaikki FROM-avainsanaa seuraavan taulun rivit, joille liitosehto ei täyttynyt.



Allaoleva kysely listaa tilauksia tehneiden asiakkaiden lisäksi myös ne asiakkaat, joilla ei ole yhtäkään tilausta. Tällöin tilaukseen liittyvä vastauksen osa jää tyhjäksi.


```sql
SELECT Asiakas.nimi AS asiakas, Tilaus.aika AS tilausaika
  FROM Asiakas
  LEFT JOIN Tilaus ON Asiakas.id = Tilaus.asiakas_id
```


<% partial 'partials/material_sub_sub_heading' do %>
Liitostyypit lyhyesti
```


Kyselyn JOIN-tyypin voi muotoilla usealla eri tavalla:


<ul>
-
  `INNER JOIN` -- palauta vain ne rivit, joihin valintaehto kohdistuu.

-
  `LEFT JOIN` -- palauta kaikki FROM-komentoa seuraavan taulun rivit, ja liitä niihin LEFT JOIN-komentoa seuraavan taulun rivit niiltä kohdin, kuin se on ON-liitosehdossa määritellyn ehdon mukaan mahdollista

-
  `RIGHT JOIN` -- palauta kaikki RIGHT JOIN-komentoa seuraavan taulun rivit, ja liitä niihin FROM-komentoa seuraavan taulun rivit niiltä kohdin, kuin se on ON-liitosehdossa määritellyn ehdon mukaan mahdollista

-
  `FULL JOIN` -- palauta kaikki FROM-komentoa seuraavan taulun rivit sekä kaikki FULL JOIN-komentoa seuraavan taulun rivit, ja liitä ne toisiinsa niiltä kohdin, kuin se on ON-liitosehdossa määritellyn ehdon mukaan mahdollista

</ul>


<em>
  Valitettavasti SQLite ei tue RIGHT JOIN ja FULL JOIN -tyyppisiä kyselyitä.
</em>



<% partial 'partials/hint', locals: { name: 'Visuaalinen opas JOIN-kyselyihin' } do %>


  C.L. Moffatt on kirjoittanut hyvän yhteenvedon erilaisista JOIN-tyypeistä. Tutustu yhteenvetoon osoitteessa <a href="http://www.codeproject.com/Articles/33052/Visual-Representation-of-SQL-Joins" target="_blank">http://www.codeproject.com/Articles/33052/Visual-Representation-of-SQL-Joins</a>.


<figure>
  <img src="/img/viikko3/moffatt-visual_joins.png"/>
  &nbsp;
  <figcaption>Yhteenveto erilaisista JOIN-kyselyistä ja niiden merkityksistä joukkojen kautta visualisoituna.</figcaption>
</figure>

```



## Tietokannanhallintajärjestelmä omalle koneelle: SQLite

Joku lead-in

SQLiten saa ladattua osoitteesta <a href="https://www.sqlite.org/download.html" target="_blank" norel>https://www.sqlite.org/download.html</a>. Kun olet tallentanut (ja asentanut) SQLiten, käynnistä käyttöjärjestelmässä terminaali, ja kirjoita komento `sqlite3 tietokanta.db`.

Kyseinen komento luo tietokanta.db-nimisen tiedoston, joka sisältää käsittelemäsi tietokannan, ja avaa yhteyden kyseiseen tietokantaan.

Suorittamalla kyselyn "SELECT 1" sqlite tulostaa arvon 1.


<sample-output>
kayttaja@kone:~/kansio/$ sqlite3 tietokanta.db
SQLite version 3.11.0 2016-02-15 17:29:24
Enter ".help" for usage hints.
sqlite> SELECT 1;
1
sqlite>
</sample-output>


Voit käyttää kyseistä tietokantaa esimerkkien testaamiseen.


```



<% partial 'partials/hint', locals: { name: 'SQLiten konfigurointi' } do %>


SQLite:n voi myös konfiguroida oman mieleseksi määrittelemällä `.sqliterc`-tiedoston kotihakemistoon. Tällöin samoja asetuksia ei tarvitse määritellä jokaisen käynnistyksen yhteydessä.



`.sqliterc`-pikaohje (macOS/Linux):


<ol>
- Siirry kotihakemistoosi: `cd ~` tai `cd $HOME`.
- Luo tiedosto nimeltä `.sqliterc` (jos sitä ei jo ole olemassa): `touch .sqliterc`.
- Avaa tiedosto mieleisellä tekstieditorilla, esim. `nano .sqliterc`.
- Lisää haluamasi asetukset erillisille riveille, tallenna muutokset ja poistu tekstieditorista. Useimmat järjestelmät vaativat terminaalin uudelleen käynnistämistä (tai ainakin uuden session avaamista) niin että SQLite lukee `.sqliterc`:n.
</ol>


Esimerkiksi seuraavat asetukset voivat olla hyödyllisiä `.sqliterc`-tiedostossa:


<ul>
- `.mode column` – tulostaa kyselyn tuloksen sarakkeissa.
- `.headers on` – näyttää sarakkeiden otsikot.
- `.timer on` – tulostaa kyselyn tuloksen jälkeen kyselyyn kuluneen ajan.
- `.prompt "# "` – käyttää merkkijonoa `# ` rivin alussa normaalin `sqlite> ` sijaan.
</ul>


Tiedostoon voi myös lisätä `PRAGMA`-lauseita, kuten esimerkiksi `PRAGMA FOREIGN_KEYS = ON;` jolloin SQLite tottelee viiteavainten rajoitteita.


```

