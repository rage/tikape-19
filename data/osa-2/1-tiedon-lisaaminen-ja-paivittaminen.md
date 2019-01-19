---
path: '/osa-2/1-tiedon-lisaaminen-ja-paivittaminen'
title: 'Tiedon lisääminen ja päivittäminen'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Osaat lisätä tietoa tietokantatauluun ja osaat päivittää tietokantataulun sisältöä
- Osaat lisätä tietokantaan tietoa ja osaat muokata tietokannassa olevaa tietoa.
- Osaat luoda ja poistaa tietokantatauluja.

</text-box>


TODO: alkuun selitystehtävä, missä pitää kertoa mitä kysely tekee.





##
  Tiedon lisääminen tietokantatauluun: INSERT INTO
<% end %>


  Tiedon lisääminen tietokantatauluun tapahtuu **INSERT INTO** -lauseella. Lausetta `INSERT INTO` seuraa kohdetaulun nimi, jonka jälkeen määritellään sarakkeet, joihin arvot asetetaan. Näitä seuraa vielä konreettiset arvot.



```sql
INSERT INTO *TAULUN_NIMI* (*sarake1*, *sarake2*, *sarake3*)
    VALUES (*'merkkijono hipsuissa'*,*'numero ei'*, 123)
<% end %>



  Oletetaan, että käytössämme on edellisessä aliluvussa luotu taulu Henkilo, jossa on sarakkeet syntymavuosi ja nimi. Uuden henkilon lisääminen tapahtuu seuraavasti.



```sql
INSERT INTO Henkilo (syntymavuosi, nimi)
    VALUES (1923, 'Edgar Frank Codd')
<% end %>


  Yllä olevassa esimerkissä tietokantatauluun Henkilo lisätään uusi rivi. Sarakkeeseen syntymävuosi tulee arvo 1923 ja sarakkeeseen nimi tulee merkkijono 'Edgar Frank Codd'.



  Vastaavasti vuonna 1947 syntyneen Raymond Boycen lisääminen tietokantatauluun Henkilo onnistuu seuraavasti.


```sql
INSERT INTO Henkilo (syntymavuosi, nimi)
    VALUES (1947, 'Raymond Boyce')
<% end %>


<sqltrainer-exercise name="TODO: tiedon lisaaminen tietokantaan">
  Tee blaa ja blaa
</sqltrainer-exercise>



###
  Pää- ja viiteavaimet tietoa lisättäessä
<% end %>



  Tietyt tietokannanhallintajärjestelmät tarjoavat tuen automaattiselle pääavaimen arvojen luomiselle. Esimerkiksi SQLite luo automaattisesti kokonaislukutyyppiselle sarakkeelle arvoja, jos sarake on määritelty pääavaimeksi, ja ohjelmoija ei tauluun tietoa lisätessään arvoja erikseen määrittele. Vastaava toiminnallisuus löytyy myös useista muista tietokannanhallintajärjestelmistä -- tutustu esimerkiksi <a href="https://mariadb.com/kb/en/mariadb/auto_increment/" target="_blank">MariaDB:n dokumentaatioon asiasta</a>.



  Automaattista pääavaimen arvojen luomista hyödynnetään SQLitessä automaattisesti, jos INSERT-kyselyissä ei määritellä pääavaimelle arvoa. Seuraavilla lisäyskyselyillä tauluun RaakaAine lisättäviin riveihin lisätään automaattisesti lisättävät rivit yksilöivät pääavaimet.


```sql
  INSERT INTO RaakaAine (nimi) VALUES ('Banaani');
  INSERT INTO RaakaAine (nimi) VALUES ('Bataatti');
  INSERT INTO RaakaAine (nimi) VALUES ('Peruna');
  INSERT INTO RaakaAine (nimi) VALUES ('Porkkana');
<% end %>



  Tiedon lisääminen tauluun Tilaus tapahtuu INSERT INTO -lauseen avulla. Nyt, koska taulussa Tilaus on viiteavain, tulee viitattavan asiakkaan tunnus olla tiedossa ennalta. Jos oletamme, että tilauksen tehnyt asiakkaan pääavaimen arvo on 7, onnistuu tilauksen lisääminen tietokantaan seuraavasti.


```sql
  INSERT INTO Tilaus (asiakas_id, aika, kuljetustapa, vastaanotettu, toimitettu) VALUES (7, now(), 'nouto', false, false);
<% end %>


  Yllä käytetty kutsu `now()` hakee järjestelmän ajan ja asetttaa sen lisättävän rivin sarakkeen aika arvoksi.



<% partial 'partials/hint', locals: { name: 'Miten tiedän lisätyn rivin pääavaimen?' } do %>


    Lisätyn rivin pääavaimen saa selville SQL-kyselyllä. Kun lisäämme uuden rivin, saa lisätyn rivin pääavaimen selville SELECT -lauseella, johon tutustumme kohta tarkemmin. Alla esimerkki RaakaAine-tauluun liittyen.


  ```sql
    INSERT INTO RaakaAine (nimi) VALUES ('Banaani');
    SELECT id FROM RaakaAine WHERE nimi = 'Banaani';
  <% end %>


    Ensimmäinen lause lisää raaka-aineen, ja toisella selvitetään raaka-aineen tunnus.


<% end %>






## TODO: UPDATE



##
  Tiedon päivittäminen: UPDATE
<% end %>



  Tietokantataulussa olevan tiedon päivittäminen onnistuu **UPDATE**-lauseella. Komentoa <cude>UPDATE</cude> seuraa tietokantataulun nimi, avainsana `SET`, jota seuraa sarakekohtaiset uudet arvot. Lopuksi kyselyyn lisätään rajausehto, jonka perusteella rajataan muutettavia rivejä.



```sql
  UPDATE *TAULUN_NIMI*
      SET *sarake1='uusiarvo'*, *sarake2=1234*
      WHERE *sarake3='rajausarvo'*
<% end %>


  Esimerkiksi 'Joni'-nimisen henkilön nimen päivittäminen muotoon 'Joni S' onnistuu seuraavasti.



```sql
  UPDATE Henkilo
      SET nimi='Joni S'
      WHERE nimi='Joni'
<% end %>



<sqltrainer-exercise name="TODO: tiedon päivittäminen">
  Tee blaa ja blaa
</sqltrainer-exercise>


## MYOS DELETE

##
  Tiedon poistaminen tietokantataulusta: DELETE FROM
<% end %>


  Tiedon poistaminen tietokantataulusta onnistuu **DELETE FROM** -lauseella. Lauseeseen määritellään lisäksi tietokantataulu, mistä tietoa poistetaan, ja mahdollisesti ehtoja, jotka rajaavat poistettavia rivejä. Yksinkertaisimmillaan komennolla poistetaan kaikki rivit annetusta taulusta seuraavasti.


```sql
  DELETE FROM *TAULUN_NIMI*
<% end %>


  Poistettavien rivien rajaaminen tapahtuu WHERE-ehdolla, jota seuraa poistettavien arvojen rajaus. Esimerkiksi kaikki vuonna 1920 syntyneet henkilöt poistettaisiin tietokantataulusta Henkilo seuraavalla komennolla.



```sql
  DELETE FROM Henkilo WHERE syntymavuosi = 1920
<% end %>


  Poistoehtoon voi rakentaa loogisen lauseen, joka sisältää `AND` ja `OR` -määreitä. Näiden avulla poistorajausta voi tehdä laajemmin. Alla olevassa esimerkissä poistetaan henkilö (tai henkilöt), joiden syntymävuosi on 1947 ja joiden nimi on 'Raymond Boyce'.


```sql
  DELETE FROM Henkilo WHERE syntymavuosi = 1947 AND nimi = 'Raymond Boyce'
<% end %>


  Pienempi kuin ja suurempi kuin -vertailuoperaatiot sekä erisuuri kuin vertailuoperaatiot ovat myös mahdollisia. Alla olevassa esimerkissä poistetaan kaikki henkilöt, joiden syntymävuosi on pienempi kuin 2000 ja joiden nimi ei ole 'Boyce-Codd'.


```sql
  DELETE FROM Henkilo WHERE syntymavuosi &lt; 2000 AND nimi != 'Boyce-Codd'
<% end %>




<sqltrainer-exercise name="TODO: tiedon päivittäminen">
  Tee blaa ja blaa
</sqltrainer-exercise>

# yhteenveto



## tietokantataulujen luominen ja poistaminen


TODO: maininta ALTER TABLE -komennosta



###
  Tietotyypit
<% end %>


  Tietokantaan säilöttävä tieto voi olla montaa eri muotoa, esimerkiksi merkkijonoja, numeroita, binäärimuodossa olevia tiedostoja sekä päivämääriä. Tietokannan suunnittelijan tehtävänä on päättää kunkin sarakkeen tiedon tyyppi.



  Sarakkeen tiedon tyyppi määrää minkämuotoista tietoa sarakkeen arvoksi voi tallentaa. Käytännössä tietokantataulua luotaessa sarakkeen määrittelyssä annettavat tiedot kertovat tietokannanhallintajärjestelmälle siitä, että minkälaista tietoa sarakkeeseen voidaan lisätä, ja toisaalta samalla minkälaista tietoa sarakkeeseen ei voida lisätä. Sarakkeen tyyppi vaikuttaa myös asioihin, joita sarakkeen arvoilla voi tehdä -- esimerkiksi keskiarvon laskeminen merkkijonotyyppisiä arvoja sisältävästä sarakkeesta ei ole kovin järkevää.



  Tyypillisesti käytetyn tietotyypit ovat seuraavat:


<ul>
  <li>**varchar(n)** korkeintaan *n* merkin pituinen merkkijono.</li>
  <li>**integer** kokonaisluku</li>
  <li>**float** liukuluku eli desimaaliluku</li>
  <li>**date** päivämäärä, tallentaa vuoden, kuukauden ja päivän</li>
  <li>**timestamp** aikaleima, tallentaa vuoden, kuukauden, päivän, tunnit, minuutit ja sekunnit -- mahdollisesti myös tarkempia arvoja</li>
</ul>

<% partial 'partials/hint', locals: { name: 'Lisää tietotyyppejä' } do %>


    Eri tietokannanhallintajärjestelmät kuten `SQLite`, `MySQL` ja `PostgreSQL` tarjoavat hieman erilaisia tietotyyppejä ohjelmoijan käyttöön. Seuraavissa dokumenteissa kerrotaan näistä enemmän.


  <ul>
    <li><a href="https://www.sqlite.org/datatype3.html" target="_blank" norel>https://www.sqlite.org/datatype3.html</a></li>
    <li><a href="http://www.postgresql.org/docs/9.4/static/datatype.html" target="_blank" norel>http://www.postgresql.org/docs/9.4/static/datatype.html</a></li>
    <li><a href="http://www.w3schools.com/sql/sql_datatypes.asp" target="_blank" norel>http://www.w3schools.com/sql/sql_datatypes.asp</a></li>
  </ul>

<% end %>


###
  Sarakkeen tietojen määrittely
<% end %>


  Jokaisesta sarakkeesta kerrotaan sarakkeen nimi, sarakkeeseen tulevan tiedon tyyppi sekä tarvittaessa tietotyypille varattavan tilan koko -- esimerkiksi merkkijonoja tallennettaessa kerrotaan tallennettavan merkkijonon maksimipituus. Jokaisella sarakkeella tulee olla nimi sekä tyyppi. Jos sarakkeen tyyppiä ei määritellä tietokantataulua luotaessa, jotkut tietokannanhallintajärjestelmät määrittelevät sen automaattisesti, toiset taas näyttävät virheilmoituksen.



  Sarakkeen tiedot ovat muotoa *sarakkeen_nimi sarakkeen_tietotyyppi*. Esimerkiksi syntymävuosi määritellään seuraavasti.


```sql
  syntymavuosi integer
<% end %>


  Korkeintaan 200 merkkiä pitkä nimi määriteltäisiin taas seuraavasti.


```sql
  nimi varchar(200)
<% end %>


  Henkilön syntymävuoden ja nimen tallentamiseen tarkoitettu taulu määriteltäisiin seuraavasti. Alla on oletettu, että nimi ei ole koskaan yli 200 merkkiä pitkä.


```sql
  CREATE TABLE Henkilo (
      syntymavuosi integer,
      nimi varchar(200)
  )
<% end %>


  Yllä luodun esimerkkitaulun sisältö voisi olla esimerkiksi seuraavanlainen.


<table class="table">
  <thead>
    <tr>
      <th>syntymävuosi</th>
      <th>nimi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1997</td>
      <td>Pihla</td>
    </tr>
    <tr>
      <td>1993</td>
      <td>Joni</td>
    </tr>
  </tbody>
</table>


##
  Pää- ja viiteavaimet
<% end %>


  Edellisessä luvussa muunnettiin luokkakaavio relaatiokaavioksi kolmea askelta seuraamalla. Relaatiokaavio kuvaa tietokannan tauluja, ja taulut voidaan luoda SQL-kielisillä lauseilla. Relaatiokaavion voi kuvata tekstimuodossa seuraavasti.



  Taulu ((pk) paaavaimen_nimi: PaaavaimenTyyppi, (fk) viiteavaimen_nimi: ViitattuTaulu, sarake:SarakeTyyppi, sarake:SarakeTyyppi, ...)



  Tilausjärjestelmän relaatiokaavion voi kuvata tekstimuodossa seuraavasti.


<ul>
  <li>Asiakas((pk) id:Integer, nimi:String, puhelinnumero:String, katuosoite:String, postinumero:Integer, postitoimipaikka:String)</li>
  <li>Ravintola((pk) id:Integer, nimi:String, puhelinnumero:String, katuosoite:String, postinumero:Integer, postitoimipaikka:String)</li>
  <li>Annos((pk) id:Integer, (fk) ravintola_id -&gt; Ravintola, nimi:String, koko:String, hinta:double)</li>
  <li>Tilaus((pk) id:Integer, (fk) asiakas_id -&gt; Asiakas, aika:Date, kuljetustapa:String, vastaanotettu:Boolean, toimitettu:Boolean)</li>
  <li>RaakaAine((pk) id:Integer, nimi:String)</li>
  <li>AnnosRaakaAine((fk) annos_id - &gt; Annos, (fk) raaka_aine_id -&gt; RaakaAine)</li>
  <li>TilausAnnos((fk) tilaus_id - &gt; Tilaus, (fk) annos_id -&gt; Annos)</li>
</ul>



  Kun relaatiokaavion perusteella luodaan tietokantataulut, tulee taulut luoda järjestyksessä joka varmistaa viitattavien taulujen olemassaolon. Ensin luodaan taulut, joissa on vain pääavaimia (ei viiteavaimia), ja vasta sitten taulut, joissa on viiteavaimia. Eräs sopiva luontijärjestys edellisille tauluille on seuraava.



<ul>
  <li>Asiakas((pk) id:Integer, nimi:String, puhelinnumero:String, katuosoite:String, postinumero:Integer, postitoimipaikka:String)</li>
  <li>Ravintola((pk) id:Integer, nimi:String, puhelinnumero:String, katuosoite:String, postinumero:Integer, postitoimipaikka:String)</li>
  <li>RaakaAine((pk) id:Integer, nimi:String)</li>
  <li>Annos((pk) id:Integer, (fk) ravintola_id -&gt; Ravintola, nimi:String, koko:String, hinta:double)</li>
  <li>Tilaus((pk) id:Integer, (fk) asiakas_id -&gt; Asiakas, aika:Date, kuljetustapa:String, vastaanotettu:Boolean, toimitettu:Boolean)</li>
  <li>AnnosRaakaAine((fk) annos_id - &gt; Annos, (fk) raaka_aine_id -&gt; RaakaAine)</li>
  <li>TilausAnnos((fk) tilaus_id - &gt; Tilaus, (fk) annos_id -&gt; Annos)</li>
</ul>




###
  Pääavaimen määrittely CREATE TABLE -lauseessa
<% end %>


  Pääavain on taulukohtainen tunniste, joka on uniikki jokaiselle taulun riville. Tämän lisäksi sen arvo ei saa olla tyhjä (*null*) millään rivillä. Pääavaimeksi valitaan joko olemassaoleva attribuutti (tällöin attribuutin tulee olla muuttumaton), tai sitä varten luodaan uusi attribuutti.



  Pääavain määritellään tietokantataulun luonnin yhteydessä lisäämällä sarakkeen tyypin perään rajoite `PRIMARY KEY`. Tämä tarkoittaa sitä, että rivin arvon tulee olla on uniikki, ja että se ei saa koskaan olla tyhjä. Luodaan tietokantataulut Asiakas ja RaakaAine siten, että niissä on määriteltynä pääavain.


```sql
  CREATE TABLE Asiakas (
      id integer PRIMARY KEY,
      nimi varchar(200),
      puhelinnumero varchar(20),
      katuosoite varcar(50),
      postinumero integer,
      postitoimipaikka varchar(20)
  )
<% end %>

```sql
  CREATE TABLE RaakaAine (
      id integer PRIMARY KEY,
      nimi varchar(200)
  )
<% end %>



###
  Viiteavaimen määrittely CREATE TABLE -lauseessa
<% end %>



  Viiteavaimet ovat tietokantatauluissa sarakkeita, joissa olevat arvot viittaavat toisissa tauluissa oleviin pääavaimiin. Tietokantataulua määriteltäessä viiteavaimet listataan sarakkeiden määrittelyn jälkeen. Jokaisen viiteavaimen yhteydessä kerrotaan sekä luotavan taulun sarake -- eli sarake, joka on viiteavain -- että taulu ja sarake, johon viiteavaimella viitataan.



  Viiteavaimen määrittely tapahtuu CREATE TABLE -lauseen loppuun asetettavan määreen `FOREIGN KEY(*sarake*) REFERENCES *ViitattavaTaulu(viitattavaSarake)*` avulla. Viiteavaimia voidaan määritellä useampia.



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
<% end %>


  Viiteavaimet ovat siis sarakkeita siinä missä muutkin sarakkeet, mutta niille määritellään erikseen tieto siitä, ette ne ovat viiteavaimia sekä tieto siitä, että mihin tauluun ja sarakkeeseen kukin viiteavain viittaa. Taulussa käytettävien viiteavainten määrä ei ole rajattu -- voi olla, että niitä ei ole yhtäkään, tai niitä voi olla useita.



<% partial 'partials/hint', locals: { name: 'SQLite ja viiteavaimet' } do %>


    Toistaiseksi käytössämme olevan SQLiten versiossa viiteavaimiin liittyvät tarkistukset -- eli tietokannanhallintajärjestelmän tekemä varmistus viitattavan rivin olemassaolosta -- ovat oletuksena poissa päältä. Tarkastukset saadaan päälle seuraavalla komennolla.


  <pre class="sh_sql">PRAGMA foreign_keys = ON;</pre>

<% end %>


<% partial 'partials/hint', locals: { name: 'Useampi arvo pääavaimena' } do %>


    Jokaisella taululla voi olla vain yksi määritelty pääavain. Joskus haluamme, että pääavain liittyy useampaan sarakkeeseen, jolloin sarakkeiden yhdistelmän tulee olla uniikki. Voimme esimerkiksi haluta rajoittaa annokseen määriteltäviä raaka-aineita siten, että kukin raaka-aine saa esiintyä kussakin annoksessa korkeintaan kerran. Tämä onnistuu määrittelemällä taululle AnnosRaakaAine pääavain, joka sisältää sekä annostunnuksen että raaka-aineen


  ```sql
    CREATE TABLE AnnosRaakaAine (
        annos_id integer,
        raaka_aine_id integer,
        FOREIGN KEY (annos_id) REFERENCES Annos(id),
        FOREIGN KEY (raaka_aine_id) REFERENCES RaakaAine(id),
        PRIMARY KEY (annos_id, raaka_aine_id)
    )
  <% end %>

<% end %>



  Tilausjärjestelmämme tietokannan CREATE TABLE -lauseet kokonaisuudessaan.


```sql
  CREATE TABLE Asiakas (
      id integer PRIMARY KEY,
      nimi varchar(200),
      puhelinnumero varchar(20),
      katuosoite varcar(50),
      postinumero integer,
      postitoimipaikka varchar(20)
  );

  CREATE TABLE Ravintola (
      id integer PRIMARY KEY,
      nimi varchar(200),
      puhelinnumero varchar(20),
      katuosoite varcar(50),
      postinumero integer,
      postitoimipaikka varchar(20)
  );

  CREATE TABLE RaakaAine (
      id integer PRIMARY KEY,
      nimi varchar(200)
  );

  CREATE TABLE Annos (
      id integer PRIMARY KEY,
      ravintola_id integer,
      nimi varchar(200),
      koko varchar(30),
      hinta double,
      FOREIGN KEY (ravintola_id) REFERENCES Ravintola(id)
  );

  CREATE TABLE Tilaus (
      id integer PRIMARY KEY,
      asiakas_id integer,
      aika date,
      kuljetustapa varchar(40),
      vastaanotettu boolean,
      toimitettu boolean,
      FOREIGN KEY (asiakas_id) REFERENCES Asiakas(id)
  );

  CREATE TABLE AnnosRaakaAine (
      annos_id integer,
      raaka_aine_id integer,
      FOREIGN KEY (annos_id) REFERENCES Annos(id),
      FOREIGN KEY (raaka_aine_id) REFERENCES RaakaAine(id)
  );

  CREATE TABLE TilausAnnos (
      tilaus_id integer,
      annos_id integer,
      FOREIGN KEY (tilaus_id) REFERENCES Tilaus(id),
      FOREIGN KEY (annos_id) REFERENCES Annos(id)
  );
<% end %>




##
  Tietokantataulun poistaminen: DROP TABLE
<% end %>


  Tietokantataulun poistaminen onnistuu **DROP TABLE** *TAULUN_NIMI* -lauseella, missä taulun nimi on poistettavan taulun nimi. Esimerkiksi edellä luodun Henkilo-taulun poistaminen onnistuisi seuraavasti.


```sql
DROP TABLE Henkilo
<% end %>


  Huomaathan, että tietokantataulun poistaminen poistaa myös kaiken tietokantataulussa olevan datan. Komennosta löytyy myös versio, joka poistaa tietokantataulun vain jos kyseinen taulu on olemassa.


```sql
  DROP TABLE IF EXISTS Henkilo
<% end %>


<% partial 'partials/hint', locals: { name: 'Olemassaolevien tietokantataulujen listaaminen' } do %>


    Olemassaolevien tietokantataulujen listaamiseen ei ole yhtä kaikissa tietokannanhallintajärjestelmissä toimivaa tapaa. Osoitteessa <a href="http://onewebsql.com/blog/list-all-tables" target="_blank" norel>http://onewebsql.com/blog/list-all-tables</a> oleva sivu listaa muutamien tietokannanhallintajärjestelmien syntaksit tietokantataulujen listaamiseen.



    SQLiten tietokantataulut saadaan selville komennolla `SELECT * FROM sqlite_master`.


  ```sql
    SELECT * FROM sqlite_master
  <% end %>

<% end %>

<% partial 'partials/hint', locals: { name: 'Sarakkeiden tietotyypin selvittäminen' } do %>


    Attribuutin -- tai sarakkeen -- tietotyypin kysymiseen <a href="http://stackoverflow.com/questions/13405572/sql-statement-to-get-column-type" target="_blank">ei myöskään ole yhtä tapaa</a>, vaan tapa liittyy käytettävään tietokannanhallintajärjestelmään. Käyttämässämme SQLite-versiossa sarakkeen tyypin saa selville kyselyllä `PRAGMA TABLE_INFO(*TAULUN_NIMI*)`, missä *TAULUN_NIMI* on tarkasteltavan taulun nimi.



    Esimerkiksi


  ```sql
    PRAGMA TABLE_INFO(Henkilo)
  <% end %>


<% end %>




##
  Yhteenveto
<% end %>

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
      <% end %>
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
      <% end %>
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
      <% end %>
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
SELECT nimi FROM Opiskelija
      <% end %>
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
    WHERE opiskelijanumero=1008286
      <% end %>
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
    WHERE opiskelijanumero=1008286
      <% end %>
    </td>
  </tr>

</table>



<sqltrainer-exercise name="TODO: tietokanta tyhjasta">
  Tee blaa ja blaa
</sqltrainer-exercise>

