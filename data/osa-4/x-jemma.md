---
path: '/osa-4/x-jemma'
title: 'Turhaa? sisältöä'
hidden: true
---


## Sarakkeen määrittely


Jokaisesta sarakkeesta kerrotaan sarakkeen nimi, sarakkeeseen tulevan tiedon tyyppi sekä tarvittaessa tietotyypille varattavan tilan koko. Jokaisella sarakkeella tulee olla nimi sekä tyyppi. Jos sarakkeen tyyppiä ei määritellä tietokantataulua luotaessa, jotkut tietokannanhallintajärjestelmät määrittelevät sen automaattisesti, toiset taas näyttävät virheilmoituksen.

Sarakkeen tiedot ovat muotoa *sarakkeen_nimi sarakkeen_tietotyyppi*. Esimerkiksi kokonaislukumuodossa tallennettava syntymävuosi määritellään seuraavasti.

```sql
syntymavuosi integer
```

Korkeintaan 200 merkkiä pitkä nimi määriteltäisiin taas seuraavasti.


```sql
nimi varchar(200)
```


Tietokantaan tallennettavalle tiedolle määsäilöttävä tieto voi olla montaa eri muotoa, esimerkiksi merkkijonoja, numeroita, binäärimuodossa olevia tiedostoja sekä päivämääriä. Tietokannan suunnittelijan tehtävänä on päättää kunkin sarakkeen tiedon tyyppi.





### Sarakkeen tietojen määrittely

Henkilön syntymävuoden ja nimen tallentamiseen tarkoitettu taulu määriteltäisiin seuraavasti. Alla on oletettu, että nimi ei ole koskaan yli 200 merkkiä pitkä.


```sql
CREATE TABLE Henkilo (
    syntymavuosi integer,
    nimi varchar(200)
)
```

Yllä luodun esimerkkitaulun sisältö voisi olla esimerkiksi seuraavanlainen.


| syntymävuosi  | nimi       |
| --            | --         |
| 1997          | Pihla      |
| 1993          | Joni       |
| 1986          | Lauri      |


###  Pää- ja viiteavaimet


## jotain muuta












sarakkeen määrittelyn perään rajoite `PRIMARY KEY`. Tämä tarkoittaa sitä, että sarakkeen arvon tulee olla on uniikki, ja että se ei saa koskaan olla tyhjä.

Luodaan tietokantataulut Asiakas ja RaakaAine siten, että niissä on määriteltynä pääavain.


```sql
CREATE TABLE Asiakas (
    id integer PRIMARY KEY,
    nimi varchar(200),
    puhelinnumero varchar(20),
    katuosoite varcar(50),
    postinumero integer,
    postitoimipaikka varchar(20)
);
```

```sql
CREATE TABLE RaakaAine (
    id integer PRIMARY KEY,
    nimi varchar(200)
);
```

Pääavaimen voi määritellä myös


<text-box variant='hint' name='Miten pääavain päätetään'>

Surrogate key vs. natural key -- https://www.databasejournal.com/features/mssql/article.php/3922066/SQL-Server-Natural-Key-Verses-Surrogate-Key.htm
Sama keskustelu jatkuu -- https://stackoverflow.com/questions/217945/can-i-have-multiple-primary-keys-in-a-single-table

</text-box>



### Viiteavaimen määrittely CREATE TABLE -lauseessa

Viiteavaimet ovat tietokantatauluissa sarakkeita, joissa olevat arvot viittaavat toisissa tauluissa oleviin pääavaimiin. Tietokantataulua määriteltäessä viiteavaimet listataan sarakkeiden määrittelyn jälkeen. Jokaisen viiteavaimen yhteydessä kerrotaan sekä luotavan taulun sarake -- eli sarake, joka on viiteavain -- että taulu ja sarake, johon viiteavaimella viitataan.

Viiteavaimen määrittely tapahtuu CREATE TABLE -lauseen loppuun asetettavan määreen `FOREIGN KEY(sarake) REFERENCES ViitattavaTaulu(viitattavaSarake)` avulla. Viiteavaimia voidaan määritellä useampia.

Oletetaan, että käytössämme on edellisessä alikuvussa määriteltytietokantataulu Asiakas. Nyt voimme luoda taulun Tilaus, jossa on viittaus tauluun Asiakas.


```sql
CREATE TABLE Tilaus (
    id integer PRIMARY KEY,
    asiakas_id integer,
    aika date,
    kuljetustapa varchar(40),
    vastaanotettu boolean,
    toimitettu boolean,
    FOREIGN KEY (asiakas_id) REFERENCES Asiakas(id)
);
```

Viiteavaimet ovat siis sarakkeita siinä missä muutkin sarakkeet, mutta niille määritellään erikseen tieto siitä, ette ne ovat viiteavaimia sekä tieto siitä, että mihin tauluun ja sarakkeeseen kukin viiteavain viittaa. Taulussa käytettävien viiteavainten määrä ei ole rajattu -- voi olla, että niitä ei ole yhtäkään, tai niitä voi olla useita.



<text-box variant='hint' name='Useampi arvo pääavaimena'>

Jokaisella taululla voi olla vain yksi määritelty pääavain. Joskus haluamme, että pääavain liittyy useampaan sarakkeeseen, jolloin sarakkeiden yhdistelmän tulee olla uniikki. Voimme esimerkiksi haluta rajoittaa annokseen määriteltäviä raaka-aineita siten, että kukin raaka-aine saa esiintyä kussakin annoksessa korkeintaan kerran. Tämä onnistuu määrittelemällä taululle AnnosRaakaAine pääavain, joka sisältää sekä annostunnuksen että raaka-aineen


```sql
CREATE TABLE AnnosRaakaAine (
    annos_id integer,
    raaka_aine_id integer,
    FOREIGN KEY (annos_id) REFERENCES Annos(id),
    FOREIGN KEY (raaka_aine_id) REFERENCES RaakaAine(id),
    PRIMARY KEY (annos_id, raaka_aine_id)
);
```

</text-box>

##





 alikuvussa määriteltytietokantataulu Asiakas. Nyt voimme luoda taulun Tilaus, jossa on viittaus tauluun Asiakas.


```sql
CREATE TABLE Tilaus (
    id integer PRIMARY KEY,
    asiakas_id integer,
    aika date,
    kuljetustapa varchar(40),
    vastaanotettu boolean,
    toimitettu boolean,
    FOREIGN KEY (asiakas_id) REFERENCES Asiakas(id)
);
```

Viiteavaimet ovat siis sarakkeita siinä missä muutkin sarakkeet, mutta niille määritellään erikseen tieto siitä, ette ne ovat viiteavaimia sekä tieto siitä, että mihin tauluun ja sarakkeeseen kukin viiteavain viittaa. Taulussa käytettävien viiteavainten määrä ei ole rajattu -- voi olla, että niitä ei ole yhtäkään, tai niitä voi olla useita.




<text-box variant='hint' name='Olemassaolevien tietokantataulujen listaaminen'>

Olemassaolevien tietokantataulujen listaamiseen ei ole yhtä kaikissa tietokannanhallintajärjestelmissä toimivaa tapaa. Osoitteessa <a href="http://onewebsql.com/blog/list-all-tables" target="_blank" norel>http://onewebsql.com/blog/list-all-tables</a> oleva sivu listaa muutamien tietokannanhallintajärjestelmien syntaksit tietokantataulujen listaamiseen.

TODO: myös sarakkeiden selvittäminen haastavaa: https://stackoverflow.com/questions/1580450/how-do-i-list-all-the-columns-in-a-table

</text-box>


TODO: maininta ALTER TABLE -komennosta


## Yhteenveto

<table class="table">

  <tr>
    <th>
      Operaatio
    </th>
    <th>
      Avainsana
    </th>
    <th>
      Esimerkki
    </th>
  </tr>

  <tr>
    <td>
      Tietokantataulun luominen
    </td>
    <td>
      CREATE
    </td>
    <td>
```sql
CREATE TABLE Opiskelija (
    opiskelijanumero integer,
    nimi varchar(60),
    sahkopostiosoite varchar(40)
)
```
    </td>
  </tr>

  <tr>
    <td>
      Tietokantataulun poistaminen
    </td>
    <td>
      DROP
    </td>
    <td>
```sql
DROP TABLE Opiskelija
```
    </td>
  </tr>

  <tr>
    <td>
      Tiedon lisääminen
    </td>
    <td>
      INSERT
    </td>
    <td>
```sql
INSERT INTO
    Opiskelija (opiskelijanumero, nimi, sahkopostiosoite)
    VALUES (1008286, 'Ari', 'posti@osoite.net');
```
    </td>
  </tr>

  <tr>
    <td>
      Tiedon hakeminen
    </td>
    <td>
      SELECT
    </td>
    <td>
```sql
SELECT nimi FROM Opiskelija;
```
    </td>
  </tr>

  <tr>
    <td>
      Tiedon päivittäminen
    </td>
    <td>
      UPDATE
    </td>
    <td>
```sql
UPDATE Opiskelija
    SET nimi='Ari V'
    WHERE opiskelijanumero=1008286;
```
    </td>
  </tr>

  <tr>
    <td>
      Tiedon (rivien) poistaminen
    </td>
    <td>
      DELETE
    </td>
    <td>
```sql
DELETE FROM Opiskelija
    WHERE opiskelijanumero=1008286;
```
    </td>
  </tr>

</table>





...
## Tietokannanhallintajärjestelmä omalle koneelle: SQLite

Joku lead-in


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



```




<% partial 'partials/exercise', locals: { name: 'Yhteenvetokyselyt, osa 2' } do %>


    Jatketaan edellisestä tehtävästä tutun tietokannan parissa..



    Tehtäväpohjan kansiossa `db` tulee tiedosto nimeltä `Chinook_Sqlite.sqlite`. Tietokannassa on seuraavat taulut:


  <pre>
  sqlite&gt; .tables
  Album          	Employee       	InvoiceLine    	PlaylistTrack
  Artist         	Genre          	MediaType      Track
  Customer       	Invoice        	Playlist
  </pre>


    Tietokanta kuvaa digitaalisen musiikin myyntipalvelua. Tietokannan relaatiokaavio löytyy osoitteesta <a href="https://github.com/lerocha/chinook-database/wiki/Chinook-Schema" target="_blank" norel>https://github.com/lerocha/chinook-database/wiki/Chinook-Schema</a>. Kirjoita SQLiten avulla kyselyt, joilla saa selville seuraavat tiedot.



  <ul>
    <li>Kysely 1: Kuinka monta kappaletta kuhunkin genreen liittyy? Tuloksessa tulee olla kaksi saraketta, joista toisen nimi on `genre` ja toisen nimi on `kappaleita`.</li>
    <li>Kysely 2: Kuinka monta kappaletta kustakin genrestä on ostettu? Voit olettaa, että kappale on ostettu jos lasku on olemassa. Tuloksessa tulee olla kaksi saraketta, joista toisen nimi on `genre` ja toisen nimi on `ostettuja`.</li>
    <li>Kysely 3: Kuinka monella levyllä kukin artisti esiintyy? Tuloksessa tulee olla kaksi saraketta, joista toisen nimi on `artisti` ja toisen nimi on `levyt`.</li>
  </ul>


    Kun olet saanut kyselyt toimimaan, kopioi ne tehtäväpohjassa olevan luokan Kyselyja metodeihin kysely1, kysely2 ja kysely3. Metodeihin tulee kopioida SQL-kieliset kyselyt, joilla em. kysymyksiin saa vastaukset, ei siis vastauksia.



    *
      Huom! Tehtävässä on tilanteita, missä yhteenvetokyselyn tuloksessa esiintyvä lukumäärä (esim. kappaleet, ostetut, levyt) voi olla 0.
    *


<% end %>


<sqltrainer-exercise name="TODO: ryhmittely useampi sarake having">
  Tee blaa ja blaa
</sqltrainer-exercise>




<% partial 'partials/exercise', locals: { name: 'Yhteenvetokyselyt, osa 1' } do %>



    Tehtäväpohjan kansiossa `db` tulee tiedosto nimeltä `Chinook_Sqlite.sqlite`. Käytimme samaa tiedostoa myös yhdessä osan 3 tehtävistä. Tietokannassa on seuraavat taulut:


  <pre>
  sqlite&gt; .tables
  Album          	Employee       	InvoiceLine    	PlaylistTrack
  Artist         	Genre          	MediaType      Track
  Customer       	Invoice        	Playlist
  </pre>


    Tietokanta kuvaa digitaalisen musiikin myyntipalvelua. Tietokannan relaatiokaavio löytyy osoitteesta <a href="https://github.com/lerocha/chinook-database/wiki/Chinook-Schema" target="_blank" norel>https://github.com/lerocha/chinook-database/wiki/Chinook-Schema</a>. Kirjoita SQLiten avulla kyselyt, joilla saa selville seuraavat tiedot.



  <ul>
    <li>Kysely 1: Kuinka monta albumia (Album) tietokannassa on yhteensä?</li>
    <li>Kysely 2: Minkä on kaikkien tietokannassa olevien laskujen (Invoice) hinnan (total) keskiarvo?</li>
    <li>Kysely 3: Kuinka monta 'Blues', 'Jazz' tai 'Metal'-genren kappaletta tietokannassa on yhteensä?</li>
  </ul>


    Kun olet saanut kyselyt toimimaan, kopioi ne tehtäväpohjassa olevan luokan Kyselyja metodeihin kysely1, kysely2 ja kysely3. Metodeihin tulee siis kopioida SQL-kieliset kyselyt, joilla em. kysymyksiin saa vastaukset, ei kyselyiden vastauksia.



<% end %>


