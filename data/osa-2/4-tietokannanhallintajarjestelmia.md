---
path: '/osa-2/4-tietokannanhallintajarjestelmia'
title: 'Muutamia tietokannanhallintajärjestelmiä'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tiedät erilaisia tietokannanhallintajärjestelmiä.
- Pystyt käyttämään jotain tietokannanhallintajärjestelmää omalla koneellasi.
- Osaat ladata tietokannan omalle koneellesi ja tarkastella sitä tietokannanhallintajärjestelmän avulla.

</text-box>

Tietokannat ja niiden käsittelyyn käytetyt tietokannanhallintajärjestelmät ovat merkittävä osa tietojenkäsittelytieteen historiaa. Ensimmäiset tietokoneohjelmat kehitettiin 1950-luvulla ja ensimmäiset tietokannanhallintajärjestelmät 1960-luvulta. Muutama vuosikymmen myöhemmin, näitä seurasi relaatiomalliin perustuvat ja SQL-kieltä hyödyntävät relaatiotietokannat, jotka ovat yhä oleellisessa osassa ohjelmistojärjestelmiä.

Tietokannanhallintajärjestelmiä on kehitetty vuosien aikana useita. Pelkästään osoitteessa <a href="https://en.wikipedia.org/wiki/Comparison_of_relational_database_management_systems" target="_blank">https://en.wikipedia.org/wiki/Comparison_of_relational_database_management_systems</a> oleva lista relaatiotietokantojen käsittelyyn tarkoitetuista tietokannanhallintajärjestelmistä sisältää kymmeniä järjestelmiä.

Tutustutaan seuraavaksi pikaisesti muutamaan tietokannanhallintajärjestelmään.


## SQLite

<a href="https://www.sqlite.org/index.html" target="_blank">SQLite</a> on yksi eniten käytetyistä tietokannanhallintajärjestelmistä. Sitä käytetään muunmuassa Android-sovelluksissa, Chrome-selaimessa sekä useissa käyttöjärjestelmissä kuten Windows 10:ssä.

SQLiten saa ladattua osoitteesta <a href="https://www.sqlite.org/download.html" target="_blank" norel>https://www.sqlite.org/download.html</a>. Osoite sisältää käyttöjärjestelmäkohtaisia paketteja sqliten asentamiseen. Linux-koneissa ja mac-koneissa sqlite on yleensä valmiiksi asennettuna.

Kun olet tallentanut (ja asentanut) SQLiten, on sen käyttöönotto suoraviivausta: sovellus käynnistyy kirjoittamalla terminaalissa komennon `sqlite3`. Mikäli SQLitellä haluaa avata tietokannan, voi tietokannan sisältävän tiedoston nimen antaa suoraan käynnistyskomennolle -- esim. `sqlite3 tietokanta.db`. Mikäli kyseistä tiedostoa ei löydy, luo SQLite uuden annetun nimisen tietokannan.

Kun käynnistät tietokannanhallintajärjestelmän, voit tehdä tietokannassa omia kokeilujasi. Tietokannan käynnistäminen näyttää esimerkiksi seuraavalta.

<sample-output>

kayttaja@kone:~/kansio/$ **sqlite3 tietokanta.db**
SQLite version 3.11.0 2016-02-15 17:29:24
Enter ".help" for usage hints.
sqlite> **SELECT 1;**
1
sqlite>

</sample-output>

Yllä annettu käsky `SELECT 1` tulostaa arvon 1. Sitä voi käyttää ensimmäisenä komentona tietokannan toiminnan tarkasteluun. Voit käyttää kyseistä tietokantaa esimerkkien testaamiseen. SQLitessä annettu komento `.help` tulostaa saatavilla olevat komennot sekä ohjeistuksen.

Yksinkertainen tietokannan luominen, tiedon lisääminen sekä tiedon hakeminen onnistuisi seuraavalla tavalla. Alla käytetään pääavaimen määrittelyssä SQLitelle spesifiä komentoa `AUTOINCREMENT`, joka luo pääavaimesta automaattisesti kasvavan. Määreen käyttö onnistuu vain mikäli sarake määritellään samalla pääavaimeksi. Tällöin pääavaimen arvoja ei tarvitse itse syöttää tauluun.

Alla oleva esimerkki esittelee joitakin SQLiten komentoja.


<sample-output>

kayttaja@kone:~/kansio/$ **sqlite3 tietokanta.db**
SQLite version 3.11.0 2016-02-15 17:29:24
Enter ".help" for usage hints.
sqlite> **CREATE TABLE Henkilo (**
    **id INTEGER PRIMARY KEY AUTOINCREMENT,**
    **nimi VARCHAR(255)**
**);**
sqlite> **.tables**
Henkilo
sqlite> **SELECT * FROM Henkilo;**
sqlite> **INSERT INTO Henkilo (nimi) VALUES ('Charles Bachman');**
sqlite> **SELECT * FROM Henkilo;**
1|Charles Bachman
sqlite> **.headers on**
sqlite> **SELECT * FROM Henkilo;**
id|nimi
1|Charles Bachman
sqlite> **.exit**
kayttaja@kone:~/kansio/$ **sqlite3 tietokanta.db**
SQLite version 3.11.0 2016-02-15 17:29:24
Enter ".help" for usage hints.
sqlite> **SELECT * FROM Henkilo;**
1|Charles Bachman
sqlite> **.exit**
kayttaja@kone:~/kansio/$

</sample-output>


## H2


<a href="http://www.h2database.com/html/main.html" target="_blank">H2</a> on erityisesti Java-kielisissä ohjelmissa paljon käytetty tietokannanhallintajärjestelmä. Esimerkiksi tällä kurssilla käytettävä SQL-trainer tarkastaa SQL-kyselyt H2-tietokannanhallintajärjestelmää käyttäen. H2-tietokannanhallintajärjestelmän saa ladattua osoitteesta <a href="http://www.h2database.com/html/download.html" target="_blank">http://www.h2database.com/html/download.html</a>.

Alla olevassa esimerkissä käynnistämme H2-tietokannanhallintajärjestelmän konsolin komentoriviltä, ja avaamme (tai luomme) samassa kansiossa olevan tiedoston `tietokanta.db`. Kun H2 käynnistetään, se kysyy ensin tietokannan osoitetta -- alla `hdbc:h2:file:./tietokanta.db` eli luomme tiedoston `tietokanta.db`. Tämän jälkeen ohjelma kysyy ajuria, käyttäjätunnusta ja salasanaa. Kaikkien näiden kohdalla painetaan enteriä, eli käytetään oletusarvoja. Alla oletetaan, että tässä on ladattu **jar**-tiedosto, käyttäjällä on Java asennettuna koneelle, ja että tiedosto on käyttäjän kansiossa `kansio`.


<sample-output>

tunnus@kone:~/kansio$ **ls**
h2-1.4.197.jar
tunnus@kone:~/kansio$ **java -cp h2-1.4.197.jar org.h2.tools.Shell**

Welcome to H2 Shell 1.4.197 (2018-03-18)
Exit with Ctrl+C
[Enter]   jdbc:h2:mem:testdb
URL       **jdbc:h2:file:./tietokanta.db**
[Enter]   org.h2.Driver
Driver
[Enter]   sa
User
[Enter]   Hide
Password
Password
Connected
Commands are case insensitive; SQL statements end with ';'
help or ?      Display this help
list           Toggle result list / stack trace mode
maxwidth       Set maximum column width (default is 100)
autocommit     Enable or disable autocommit
history        Show the last 20 statements
quit or exit   Close the connection and exit

sql> **CREATE TABLE Henkilo (**
...> **id INTEGER PRIMARY KEY AUTO_INCREMENT,**
...> **nimi VARCHAR(255)**
...> **);**
(Update count: 0, 48 ms)
sql> **INSERT INTO Henkilo(nimi) VALUES ('Charles Bachman');**
(Update count: 1, 7 ms)
sql> **SELECT * FROM Henkilo;**
ID | NIMI
1  | Charles Bachman
(1 row, 21 ms)
sql> **exit**
Connection closed
tunnus@kone:~/kansio$ **ls**
h2-1.4.197.jar  tietokanta.db.mv.db  tietokanta.db.trace.db
tunnus@kone:~/kansio$

</sample-output>


Esimerkin suorituksen jälkeen kansioon on luotu kaksi tiedostoa `tietokanta.db.mv.db` sekä `tietokanta.db.trace.db`, jotka sisältävät tietokantaan liittyvän tietokantataulun sekä datan.

H2-tietokannanhallintajärjestelmän voi käynnistää myös web-konsolina, jolloin samat tiedot tulevat näkyviin selaimeen. Tämä onnistuu helposti, olettaen että järjestelmässä ei ole palomuuria tai muuta vastaavaa, joka estäisi käynnistyksen.


<sample-output>

tunnus@kone:~/kansio$ **java -jar h2-1.4.197.jar**
Opening in existing browser session.

</sample-output>


Mikäli aukeavaan konsoliin syöttää osoitteeksi (jdbc URL) aiemmin konsoliesimerkissä antamamme ja luomamme osoitteen `jdbc:h2:file:./tietokanta.db`, pääsemme käsittelemään edellä luomaamme tietokantaa.



## Muita järjestelmiä


Muita erittäin yleisessä käytössä olevia tietokannanhallintajärjestelmiä ovat muunmuassa <a href="https://www.mysql.com/" target="_blank">MySQL</a>, <a href="https://mariadb.org/" target="_blank">MariaDB</a> ja <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>. Kuten edellä, missä SQLiten automaattinen pääavaimen arvon kasvattaminen tapahtuu avainsanalla `AUTOINCREMENT` ja H2-tietokannassa samaan tarvitaan avainsana `AUTO_INCREMENT`, myös MySQL, MariaDB ja PostgreSQL poikkeavat toisistaan hieman.

Emme syvenny tähän näihin järjestelmiin tällä kurssilla.


## Tietokannan käyttöönotto


Seuraavat kyselytehtävät olettavat, että otat haltuusi joko SQLite-tietokannanhallintajärjestelmän, H2-tietokannanhallintajärjestelmän tai jonkun muun tietokannanhallintajärjestelmän. Kyselytehtävät käyttävät <a href="https://github.com/lerocha/chinook-database" target="_blank">Chinook</a>-tietokantaa, jonka rakenne on seuraava:


<figure>
  <img src="../img/chinook-schema.png" alt="Chinook-tietokannan skeema."/>
  &nbsp;
  <figcaption></figcaption>
</figure>

Olemme luoneet Chinook-tietokannan käyttöönottoa varten seuraavat kolme tiedostoa:

- SQLiteen ladattavan tietokantatiedoston. Voit ladata SQLiteä varten valmistellun tietokantatiedoston <a href="../db/chinook_sqlite.db" target="_blank">tästä linkistä</a>. SQLiten käynnistyskomento -- mikäli käyttäjä on samassa kansiossa kuin tietokantatiedosto -- on `sqlite3 chinook_sqlite.db`. Komento `sqlite3` voi poiketa käyttöjärjestelmien välillä.

- H2-tietokannanhallintajärjestelmää varten ladattavan tietokantatiedoston. Voit ladata H2-tietokannanhallintajärjestelmää varten valmistellun tietokantatiedoston <a href="../db/chinook_h2.db.mv.db" target="_blank">tästä linkistä.</a> Tietokantatiedosto on H2-tietokannanhallintajärjestelmässä muotoa `chinook_h2.db` ja sen osoite -- mikäli käynnistyksessä käytetään samaa polkua kuin missä H2 on -- on `jdbc:h2:file:./chinook_h2.db`.

- Tietokannan luomiseen sekä tiedon lisäämiseen tietokantaan tarvittavat SQL-kieliset komennot, jotka voi ajaa johonkin muuhun tietokannanhallintajärjestelmään. SQL-kieliset komennot löytyvät löytyvät <a href="../db/chinook.sql" target="_blank">tämän linkin takaa</a>.


Seuraavat kyselyt olettavat, että tuot Chinook-tietokannan omalle koneellesi ja käynnistät sen jollain edellä kuvatusta tietokannanhallintajärjestelmästä. Mikäli koneellasi ei ole oikeuksia ohjelmien asentamiseen, valitse tietokannaksi H2 -- olettaen, että olet käynyt Ohjelmoinnin MOOCin sekä asentanut siinä tarvittavan Javan.

Kurssin <a href="https://tkt-lapio.github.io/" target="_blank">Tietokone Työvälineenä</a> materiaalista saattaa olla tässä myös hyötyä.


<quiznator id="5c4575b6ddb6b814af31f7af"></quiznator>


<quiznator id="5c44949cfd9fd71425c60201"></quiznator>


<quiznator id="5c4495bac41ed4148d968a89"></quiznator>


<quiznator id="5c44976c3972a914741004a0"></quiznator>

