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


<moodle-exercise name="Moodle is fun">
  Tee blaa ja blaa
</moodle-exercise>

<sqltrainer-exercise name="DROP * FROM *;">
  Tee blaa ja blaa
</sqltrainer-exercise>




<% partial 'partials/material_sub_heading' do %>
  Tiedon lisääminen tietokantatauluun: INSERT INTO
<% end %>

<p>
  Tiedon lisääminen tietokantatauluun tapahtuu <strong>INSERT INTO</strong> -lauseella. Lausetta <code>INSERT INTO</code> seuraa kohdetaulun nimi, jonka jälkeen määritellään sarakkeet, joihin arvot asetetaan. Näitä seuraa vielä konreettiset arvot.
</p>


<% partial 'partials/sql_highlight' do %>
INSERT INTO <em>TAULUN_NIMI</em> (<em>sarake1</em>, <em>sarake2</em>, <em>sarake3</em>)
    VALUES (<em>'merkkijono hipsuissa'</em>,<em>'numero ei'</em>, 123)
<% end %>


<p>
  Oletetaan, että käytössämme on edellisessä aliluvussa luotu taulu Henkilo, jossa on sarakkeet syntymavuosi ja nimi. Uuden henkilon lisääminen tapahtuu seuraavasti.
</p>


<% partial 'partials/sql_highlight' do %>
INSERT INTO Henkilo (syntymavuosi, nimi)
    VALUES (1923, 'Edgar Frank Codd')
<% end %>

<p>
  Yllä olevassa esimerkissä tietokantatauluun Henkilo lisätään uusi rivi. Sarakkeeseen syntymävuosi tulee arvo 1923 ja sarakkeeseen nimi tulee merkkijono 'Edgar Frank Codd'.
</p>

<p>
  Vastaavasti vuonna 1947 syntyneen Raymond Boycen lisääminen tietokantatauluun Henkilo onnistuu seuraavasti.
</p>

<% partial 'partials/sql_highlight' do %>
INSERT INTO Henkilo (syntymavuosi, nimi)
    VALUES (1947, 'Raymond Boyce')
<% end %>



<% partial 'partials/material_sub_sub_heading' do %>
  Pää- ja viiteavaimet tietoa lisättäessä
<% end %>


<p>
  Tietyt tietokannanhallintajärjestelmät tarjoavat tuen automaattiselle pääavaimen arvojen luomiselle. Esimerkiksi SQLite luo automaattisesti kokonaislukutyyppiselle sarakkeelle arvoja, jos sarake on määritelty pääavaimeksi, ja ohjelmoija ei tauluun tietoa lisätessään arvoja erikseen määrittele. Vastaava toiminnallisuus löytyy myös useista muista tietokannanhallintajärjestelmistä -- tutustu esimerkiksi <a href="https://mariadb.com/kb/en/mariadb/auto_increment/" target="_blank">MariaDB:n dokumentaatioon asiasta</a>.
</p>

<p>
  Automaattista pääavaimen arvojen luomista hyödynnetään SQLitessä automaattisesti, jos INSERT-kyselyissä ei määritellä pääavaimelle arvoa. Seuraavilla lisäyskyselyillä tauluun RaakaAine lisättäviin riveihin lisätään automaattisesti lisättävät rivit yksilöivät pääavaimet.
</p>

<% partial 'partials/sql_highlight' do %>
  INSERT INTO RaakaAine (nimi) VALUES ('Banaani');
  INSERT INTO RaakaAine (nimi) VALUES ('Bataatti');
  INSERT INTO RaakaAine (nimi) VALUES ('Peruna');
  INSERT INTO RaakaAine (nimi) VALUES ('Porkkana');
<% end %>


<p>
  Tiedon lisääminen tauluun Tilaus tapahtuu INSERT INTO -lauseen avulla. Nyt, koska taulussa Tilaus on viiteavain, tulee viitattavan asiakkaan tunnus olla tiedossa ennalta. Jos oletamme, että tilauksen tehnyt asiakkaan pääavaimen arvo on 7, onnistuu tilauksen lisääminen tietokantaan seuraavasti.
</p>

<% partial 'partials/sql_highlight' do %>
  INSERT INTO Tilaus (asiakas_id, aika, kuljetustapa, vastaanotettu, toimitettu) VALUES (7, now(), 'nouto', false, false);
<% end %>

<p>
  Yllä käytetty kutsu <code>now()</code> hakee järjestelmän ajan ja asetttaa sen lisättävän rivin sarakkeen aika arvoksi.
</p>


<% partial 'partials/hint', locals: { name: 'Miten tiedän lisätyn rivin pääavaimen?' } do %>

  <p>
    Lisätyn rivin pääavaimen saa selville SQL-kyselyllä. Kun lisäämme uuden rivin, saa lisätyn rivin pääavaimen selville SELECT -lauseella, johon tutustumme kohta tarkemmin. Alla esimerkki RaakaAine-tauluun liittyen.
  </p>

  <% partial 'partials/sql_highlight' do %>
    INSERT INTO RaakaAine (nimi) VALUES ('Banaani');
    SELECT id FROM RaakaAine WHERE nimi = 'Banaani';
  <% end %>

  <p>
    Ensimmäinen lause lisää raaka-aineen, ja toisella selvitetään raaka-aineen tunnus.
  </p>

<% end %>






## TODO: UPDATE



<% partial 'partials/material_sub_heading' do %>
  Tiedon päivittäminen: UPDATE
<% end %>


<p>
  Tietokantataulussa olevan tiedon päivittäminen onnistuu <strong>UPDATE</strong>-lauseella. Komentoa <cude>UPDATE</cude> seuraa tietokantataulun nimi, avainsana <code>SET</code>, jota seuraa sarakekohtaiset uudet arvot. Lopuksi kyselyyn lisätään rajausehto, jonka perusteella rajataan muutettavia rivejä.
</p>


<% partial 'partials/sql_highlight' do %>
  UPDATE <em>TAULUN_NIMI</em>
      SET <em>sarake1='uusiarvo'</em>, <em>sarake2=1234</em>
      WHERE <em>sarake3='rajausarvo'</em>
<% end %>

<p>
  Esimerkiksi 'Joni'-nimisen henkilön nimen päivittäminen muotoon 'Joni S' onnistuu seuraavasti.
</p>


<% partial 'partials/sql_highlight' do %>
  UPDATE Henkilo
      SET nimi='Joni S'
      WHERE nimi='Joni'
<% end %>



## MYOS DELETE

<% partial 'partials/material_sub_heading' do %>
  Tiedon poistaminen tietokantataulusta: DELETE FROM
<% end %>

<p>
  Tiedon poistaminen tietokantataulusta onnistuu <strong>DELETE FROM</strong> -lauseella. Lauseeseen määritellään lisäksi tietokantataulu, mistä tietoa poistetaan, ja mahdollisesti ehtoja, jotka rajaavat poistettavia rivejä. Yksinkertaisimmillaan komennolla poistetaan kaikki rivit annetusta taulusta seuraavasti.
</p>

<% partial 'partials/sql_highlight' do %>
  DELETE FROM <em>TAULUN_NIMI</em>
<% end %>

<p>
  Poistettavien rivien rajaaminen tapahtuu WHERE-ehdolla, jota seuraa poistettavien arvojen rajaus. Esimerkiksi kaikki vuonna 1920 syntyneet henkilöt poistettaisiin tietokantataulusta Henkilo seuraavalla komennolla.
</p>


<% partial 'partials/sql_highlight' do %>
  DELETE FROM Henkilo WHERE syntymavuosi = 1920
<% end %>

<p>
  Poistoehtoon voi rakentaa loogisen lauseen, joka sisältää <code>AND</code> ja <code>OR</code> -määreitä. Näiden avulla poistorajausta voi tehdä laajemmin. Alla olevassa esimerkissä poistetaan henkilö (tai henkilöt), joiden syntymävuosi on 1947 ja joiden nimi on 'Raymond Boyce'.
</p>

<% partial 'partials/sql_highlight' do %>
  DELETE FROM Henkilo WHERE syntymavuosi = 1947 AND nimi = 'Raymond Boyce'
<% end %>

<p>
  Pienempi kuin ja suurempi kuin -vertailuoperaatiot sekä erisuuri kuin vertailuoperaatiot ovat myös mahdollisia. Alla olevassa esimerkissä poistetaan kaikki henkilöt, joiden syntymävuosi on pienempi kuin 2000 ja joiden nimi ei ole 'Boyce-Codd'.
</p>

<% partial 'partials/sql_highlight' do %>
  DELETE FROM Henkilo WHERE syntymavuosi &lt; 2000 AND nimi != 'Boyce-Codd'
<% end %>



# yhteenveto

## tietokantataulujen luominen ja poistaminen


TODO: maininta ALTER TABLE -komennosta



<% partial 'partials/material_sub_sub_heading' do %>
  Tietotyypit
<% end %>

<p>
  Tietokantaan säilöttävä tieto voi olla montaa eri muotoa, esimerkiksi merkkijonoja, numeroita, binäärimuodossa olevia tiedostoja sekä päivämääriä. Tietokannan suunnittelijan tehtävänä on päättää kunkin sarakkeen tiedon tyyppi.
</p>

<p>
  Sarakkeen tiedon tyyppi määrää minkämuotoista tietoa sarakkeen arvoksi voi tallentaa. Käytännössä tietokantataulua luotaessa sarakkeen määrittelyssä annettavat tiedot kertovat tietokannanhallintajärjestelmälle siitä, että minkälaista tietoa sarakkeeseen voidaan lisätä, ja toisaalta samalla minkälaista tietoa sarakkeeseen ei voida lisätä. Sarakkeen tyyppi vaikuttaa myös asioihin, joita sarakkeen arvoilla voi tehdä -- esimerkiksi keskiarvon laskeminen merkkijonotyyppisiä arvoja sisältävästä sarakkeesta ei ole kovin järkevää.
</p>

<p>
  Tyypillisesti käytetyn tietotyypit ovat seuraavat:
</p>

<ul>
  <li><strong>varchar(n)</strong> korkeintaan <em>n</em> merkin pituinen merkkijono.</li>
  <li><strong>integer</strong> kokonaisluku</li>
  <li><strong>float</strong> liukuluku eli desimaaliluku</li>
  <li><strong>date</strong> päivämäärä, tallentaa vuoden, kuukauden ja päivän</li>
  <li><strong>timestamp</strong> aikaleima, tallentaa vuoden, kuukauden, päivän, tunnit, minuutit ja sekunnit -- mahdollisesti myös tarkempia arvoja</li>
</ul>

<% partial 'partials/hint', locals: { name: 'Lisää tietotyyppejä' } do %>

  <p>
    Eri tietokannanhallintajärjestelmät kuten <code>SQLite</code>, <code>MySQL</code> ja <code>PostgreSQL</code> tarjoavat hieman erilaisia tietotyyppejä ohjelmoijan käyttöön. Seuraavissa dokumenteissa kerrotaan näistä enemmän.
  </p>

  <ul>
    <li><a href="https://www.sqlite.org/datatype3.html" target="_blank" norel>https://www.sqlite.org/datatype3.html</a></li>
    <li><a href="http://www.postgresql.org/docs/9.4/static/datatype.html" target="_blank" norel>http://www.postgresql.org/docs/9.4/static/datatype.html</a></li>
    <li><a href="http://www.w3schools.com/sql/sql_datatypes.asp" target="_blank" norel>http://www.w3schools.com/sql/sql_datatypes.asp</a></li>
  </ul>

<% end %>


<% partial 'partials/material_sub_sub_heading' do %>
  Sarakkeen tietojen määrittely
<% end %>

<p>
  Jokaisesta sarakkeesta kerrotaan sarakkeen nimi, sarakkeeseen tulevan tiedon tyyppi sekä tarvittaessa tietotyypille varattavan tilan koko -- esimerkiksi merkkijonoja tallennettaessa kerrotaan tallennettavan merkkijonon maksimipituus. Jokaisella sarakkeella tulee olla nimi sekä tyyppi. Jos sarakkeen tyyppiä ei määritellä tietokantataulua luotaessa, jotkut tietokannanhallintajärjestelmät määrittelevät sen automaattisesti, toiset taas näyttävät virheilmoituksen.
</p>

<p>
  Sarakkeen tiedot ovat muotoa <em>sarakkeen_nimi sarakkeen_tietotyyppi</em>. Esimerkiksi syntymävuosi määritellään seuraavasti.
</p>

<% partial 'partials/sql_highlight' do %>
  syntymavuosi integer
<% end %>

<p>
  Korkeintaan 200 merkkiä pitkä nimi määriteltäisiin taas seuraavasti.
</p>

<% partial 'partials/sql_highlight' do %>
  nimi varchar(200)
<% end %>

<p>
  Henkilön syntymävuoden ja nimen tallentamiseen tarkoitettu taulu määriteltäisiin seuraavasti. Alla on oletettu, että nimi ei ole koskaan yli 200 merkkiä pitkä.
</p>

<% partial 'partials/sql_highlight' do %>
  CREATE TABLE Henkilo (
      syntymavuosi integer,
      nimi varchar(200)
  )
<% end %>

<p>
  Yllä luodun esimerkkitaulun sisältö voisi olla esimerkiksi seuraavanlainen.
</p>

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


<% partial 'partials/material_sub_heading' do %>
  Pää- ja viiteavaimet
<% end %>

<p>
  Edellisessä luvussa muunnettiin luokkakaavio relaatiokaavioksi kolmea askelta seuraamalla. Relaatiokaavio kuvaa tietokannan tauluja, ja taulut voidaan luoda SQL-kielisillä lauseilla. Relaatiokaavion voi kuvata tekstimuodossa seuraavasti.
</p>

<p>
  Taulu ((pk) paaavaimen_nimi: PaaavaimenTyyppi, (fk) viiteavaimen_nimi: ViitattuTaulu, sarake:SarakeTyyppi, sarake:SarakeTyyppi, ...)
</p>

<p>
  Tilausjärjestelmän relaatiokaavion voi kuvata tekstimuodossa seuraavasti.
</p>

<ul>
  <li>Asiakas((pk) id:Integer, nimi:String, puhelinnumero:String, katuosoite:String, postinumero:Integer, postitoimipaikka:String)</li>
  <li>Ravintola((pk) id:Integer, nimi:String, puhelinnumero:String, katuosoite:String, postinumero:Integer, postitoimipaikka:String)</li>
  <li>Annos((pk) id:Integer, (fk) ravintola_id -&gt; Ravintola, nimi:String, koko:String, hinta:double)</li>
  <li>Tilaus((pk) id:Integer, (fk) asiakas_id -&gt; Asiakas, aika:Date, kuljetustapa:String, vastaanotettu:Boolean, toimitettu:Boolean)</li>
  <li>RaakaAine((pk) id:Integer, nimi:String)</li>
  <li>AnnosRaakaAine((fk) annos_id - &gt; Annos, (fk) raaka_aine_id -&gt; RaakaAine)</li>
  <li>TilausAnnos((fk) tilaus_id - &gt; Tilaus, (fk) annos_id -&gt; Annos)</li>
</ul>


<p>
  Kun relaatiokaavion perusteella luodaan tietokantataulut, tulee taulut luoda järjestyksessä joka varmistaa viitattavien taulujen olemassaolon. Ensin luodaan taulut, joissa on vain pääavaimia (ei viiteavaimia), ja vasta sitten taulut, joissa on viiteavaimia. Eräs sopiva luontijärjestys edellisille tauluille on seuraava.
</p>


<ul>
  <li>Asiakas((pk) id:Integer, nimi:String, puhelinnumero:String, katuosoite:String, postinumero:Integer, postitoimipaikka:String)</li>
  <li>Ravintola((pk) id:Integer, nimi:String, puhelinnumero:String, katuosoite:String, postinumero:Integer, postitoimipaikka:String)</li>
  <li>RaakaAine((pk) id:Integer, nimi:String)</li>
  <li>Annos((pk) id:Integer, (fk) ravintola_id -&gt; Ravintola, nimi:String, koko:String, hinta:double)</li>
  <li>Tilaus((pk) id:Integer, (fk) asiakas_id -&gt; Asiakas, aika:Date, kuljetustapa:String, vastaanotettu:Boolean, toimitettu:Boolean)</li>
  <li>AnnosRaakaAine((fk) annos_id - &gt; Annos, (fk) raaka_aine_id -&gt; RaakaAine)</li>
  <li>TilausAnnos((fk) tilaus_id - &gt; Tilaus, (fk) annos_id -&gt; Annos)</li>
</ul>




<% partial 'partials/material_sub_sub_heading' do %>
  Pääavaimen määrittely CREATE TABLE -lauseessa
<% end %>

<p>
  Pääavain on taulukohtainen tunniste, joka on uniikki jokaiselle taulun riville. Tämän lisäksi sen arvo ei saa olla tyhjä (<em>null</em>) millään rivillä. Pääavaimeksi valitaan joko olemassaoleva attribuutti (tällöin attribuutin tulee olla muuttumaton), tai sitä varten luodaan uusi attribuutti.
</p>

<p>
  Pääavain määritellään tietokantataulun luonnin yhteydessä lisäämällä sarakkeen tyypin perään rajoite <code>PRIMARY KEY</code>. Tämä tarkoittaa sitä, että rivin arvon tulee olla on uniikki, ja että se ei saa koskaan olla tyhjä. Luodaan tietokantataulut Asiakas ja RaakaAine siten, että niissä on määriteltynä pääavain.
</p>

<% partial 'partials/sql_highlight' do %>
  CREATE TABLE Asiakas (
      id integer PRIMARY KEY,
      nimi varchar(200),
      puhelinnumero varchar(20),
      katuosoite varcar(50),
      postinumero integer,
      postitoimipaikka varchar(20)
  )
<% end %>

<% partial 'partials/sql_highlight' do %>
  CREATE TABLE RaakaAine (
      id integer PRIMARY KEY,
      nimi varchar(200)
  )
<% end %>



<% partial 'partials/material_sub_sub_heading' do %>
  Viiteavaimen määrittely CREATE TABLE -lauseessa
<% end %>


<p>
  Viiteavaimet ovat tietokantatauluissa sarakkeita, joissa olevat arvot viittaavat toisissa tauluissa oleviin pääavaimiin. Tietokantataulua määriteltäessä viiteavaimet listataan sarakkeiden määrittelyn jälkeen. Jokaisen viiteavaimen yhteydessä kerrotaan sekä luotavan taulun sarake -- eli sarake, joka on viiteavain -- että taulu ja sarake, johon viiteavaimella viitataan.
</p>

<p>
  Viiteavaimen määrittely tapahtuu CREATE TABLE -lauseen loppuun asetettavan määreen <code>FOREIGN KEY(<em>sarake</em>) REFERENCES <em>ViitattavaTaulu(viitattavaSarake)</em></code> avulla. Viiteavaimia voidaan määritellä useampia.
</p>

<p>
  Oletetaan, että käytössämme on edellisessä alikuvussa määriteltytietokantataulu Asiakas. Nyt voimme luoda taulun Tilaus, jossa on viittaus tauluun Asiakas.
</p>

<% partial 'partials/sql_highlight' do %>
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

<p>
  Viiteavaimet ovat siis sarakkeita siinä missä muutkin sarakkeet, mutta niille määritellään erikseen tieto siitä, ette ne ovat viiteavaimia sekä tieto siitä, että mihin tauluun ja sarakkeeseen kukin viiteavain viittaa. Taulussa käytettävien viiteavainten määrä ei ole rajattu -- voi olla, että niitä ei ole yhtäkään, tai niitä voi olla useita.
</p>


<% partial 'partials/hint', locals: { name: 'SQLite ja viiteavaimet' } do %>

  <p>
    Toistaiseksi käytössämme olevan SQLiten versiossa viiteavaimiin liittyvät tarkistukset -- eli tietokannanhallintajärjestelmän tekemä varmistus viitattavan rivin olemassaolosta -- ovat oletuksena poissa päältä. Tarkastukset saadaan päälle seuraavalla komennolla.
  </p>

  <pre class="sh_sql">PRAGMA foreign_keys = ON;</pre>

<% end %>


<% partial 'partials/hint', locals: { name: 'Useampi arvo pääavaimena' } do %>

  <p>
    Jokaisella taululla voi olla vain yksi määritelty pääavain. Joskus haluamme, että pääavain liittyy useampaan sarakkeeseen, jolloin sarakkeiden yhdistelmän tulee olla uniikki. Voimme esimerkiksi haluta rajoittaa annokseen määriteltäviä raaka-aineita siten, että kukin raaka-aine saa esiintyä kussakin annoksessa korkeintaan kerran. Tämä onnistuu määrittelemällä taululle AnnosRaakaAine pääavain, joka sisältää sekä annostunnuksen että raaka-aineen
  </p>

  <% partial 'partials/sql_highlight' do %>
    CREATE TABLE AnnosRaakaAine (
        annos_id integer,
        raaka_aine_id integer,
        FOREIGN KEY (annos_id) REFERENCES Annos(id),
        FOREIGN KEY (raaka_aine_id) REFERENCES RaakaAine(id),
        PRIMARY KEY (annos_id, raaka_aine_id)
    )
  <% end %>

<% end %>


<p>
  Tilausjärjestelmämme tietokannan CREATE TABLE -lauseet kokonaisuudessaan.
</p>

<% partial 'partials/sql_highlight' do %>
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




<% partial 'partials/material_sub_heading' do %>
  Tietokantataulun poistaminen: DROP TABLE
<% end %>

<p>
  Tietokantataulun poistaminen onnistuu <strong>DROP TABLE</strong> <em>TAULUN_NIMI</em> -lauseella, missä taulun nimi on poistettavan taulun nimi. Esimerkiksi edellä luodun Henkilo-taulun poistaminen onnistuisi seuraavasti.
</p>

<% partial 'partials/sql_highlight' do %>
DROP TABLE Henkilo
<% end %>

<p>
  Huomaathan, että tietokantataulun poistaminen poistaa myös kaiken tietokantataulussa olevan datan. Komennosta löytyy myös versio, joka poistaa tietokantataulun vain jos kyseinen taulu on olemassa.
</p>

<% partial 'partials/sql_highlight' do %>
  DROP TABLE IF EXISTS Henkilo
<% end %>


<% partial 'partials/hint', locals: { name: 'Olemassaolevien tietokantataulujen listaaminen' } do %>

  <p>
    Olemassaolevien tietokantataulujen listaamiseen ei ole yhtä kaikissa tietokannanhallintajärjestelmissä toimivaa tapaa. Osoitteessa <a href="http://onewebsql.com/blog/list-all-tables" target="_blank" norel>http://onewebsql.com/blog/list-all-tables</a> oleva sivu listaa muutamien tietokannanhallintajärjestelmien syntaksit tietokantataulujen listaamiseen.
  </p>

  <p>
    SQLiten tietokantataulut saadaan selville komennolla <code>SELECT * FROM sqlite_master</code>.
  </p>

  <% partial 'partials/sql_highlight' do %>
    SELECT * FROM sqlite_master
  <% end %>

<% end %>

<% partial 'partials/hint', locals: { name: 'Sarakkeiden tietotyypin selvittäminen' } do %>

  <p>
    Attribuutin -- tai sarakkeen -- tietotyypin kysymiseen <a href="http://stackoverflow.com/questions/13405572/sql-statement-to-get-column-type" target="_blank">ei myöskään ole yhtä tapaa</a>, vaan tapa liittyy käytettävään tietokannanhallintajärjestelmään. Käyttämässämme SQLite-versiossa sarakkeen tyypin saa selville kyselyllä <code>PRAGMA TABLE_INFO(<em>TAULUN_NIMI</em>)</code>, missä <em>TAULUN_NIMI</em> on tarkasteltavan taulun nimi.
  </p>

  <p>
    Esimerkiksi
  </p>

  <% partial 'partials/sql_highlight' do %>
    PRAGMA TABLE_INFO(Henkilo)
  <% end %>


<% end %>


