---
path: '/osa-5/2-tietokantakyselyiden-tehokkuus'
title: 'Tietokantakyselyiden tehokkuuden tarkastelu'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet menetelmiä tietokantakyselyiden tehokkuuden tarkasteluun.

</text-box>


- kun tietokantakysely suoritetaan, tietokannanhallintajärjestelmä määrittelee ensin suunnitelman sille, miten tietoa haetaan (query plan) --> tapa voi vaikuttaa kyselyn suoritusnopeuteen merkittävästi (tästä pari esimerkkiä)

<% partial 'partials/material_heading' do %>
  Tietokantakyselyiden tehokkuudesta
<% end %>

<p>
  Tietokantaan tehtävä SQL-kielinen kysely voidaan suorittaa useammalla eri tavalla. Kyselyn suoritus voi käydä läpi tietokantataulun jokaisen rivin, se voi tarkastella vain rajattua osaa tietokantataulun riveistä, tai suoritus voi olla useamman taulun tapauksessa jonkinlainen yhdistelmä edellisiä. Kyselystrategia perustuu tietokannanhallintajärjestelmän sisäisen kyselynoptimoijan sekä tietokantatauluihin määriteltyjen ominaisuuksien kuten indeksien perusteella.
</p>


<% partial 'partials/material_sub_heading' do %>
  Tietokantakyselyn tarkastelu
<% end %>

<p>
  Tietokantakyselyiden suoritusstrategiaa voi tarkastella tietokannanhallintajärjestelmäkohtaisen apukyselyn avulla. SQLitessä kyselyn sisältöön pääsee kommennolla <code>EXPLAIN QUERY PLAN</code>, jota seuraa konkreettinen kysely. Suoritusstrategia sisältää tiedon läpikäytävistä tietokannoista sekä kyselyn muodosta. Kyselyn muoto on joko "SCAN" tai "SEARCH". Muoto SCAN käy koko tietokantataulun läpi ja SEARCH tarkastelee tietokantatauluun liittyvää indeksiä.
</p>

<p>
  Tarkastellaan tätä konkreettisen esimerkin kautta. Oletetaan, että käytössämme on tietokanta, jossa on seuraavat tietokantataulut.
</p>

<% partial 'partials/sql_highlight' do %>
  CREATE TABLE Asiakas (
      id integer PRIMARY KEY,
      nimi varchar(200),
      puhelinnumero varchar(20),
      katuosoite varchar(50),
      postinumero integer,
      postitoimipaikka varchar(20)
  );
<% end %>

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
  Jos haluamme listata asiakkaiden nimet ja puhelinnumerot, teemme kyselyn "SELECT nimi, puhelinnumero FROM Asiakas". Strategia on selvä -- käydään koko tietokantataulu läpi. Ensimmäisessä esimerkissä kytketään lisäksi SQLiten otsikot päälle ja vaihdetaan tulostusmuotoa kolumnimuotoon. Alla olevissa esimerkeissä on lisäksi käytetty .width -komentoa tulostuksen leveyden sovittamiseksi.
</p>

<% partial 'partials/sample_output' do %>
sqlite> .headers on
sqlite> .mode column
sqlite> EXPLAIN QUERY PLAN SELECT nimi, puhelinnumero FROM Asiakas;
selectid order from detail
-------- ----- ---- ------------------
0        0     0    SCAN TABLE Asiakas
<% end %>


<p>
  Vastaava strategia liittyy myös tietyn nimisen asiakkaan etsimiseen. Alla kuvatussa esimerkissä tarkastellaan kyselyä, missä etsitään Cobb-nimistä asiakasta.
</p>

<% partial 'partials/sample_output' do %>
  sqlite> EXPLAIN QUERY PLAN SELECT nimi, puhelinnumero
              FROM Asiakas WHERE nimi = 'Cobb';
  selectid order from  detail
  -------- ----- ----  ------------------
  0        0     0     SCAN TABLE Asiakas
<% end %>

<p>
  Myös Tilaus-taulun tietojen listaaminen vaatii koko tietokantataulun läpikäynnin. Alla listataan tilaukset, jotka on jo toimitettu.
</p>


<% partial 'partials/sample_output' do %>
  sqlite> EXPLAIN QUERY PLAN SELECT * FROM Tilaus
              WHERE toimitettu = 1;
  selectid order from detail
  -------- ----- ---- -----------------
  0        0     0    SCAN TABLE Tilaus
<% end %>

<p>
  Tarkastellaan seuraavaksi hieman monimutkaisempaa kyselyä, missä tulostetaan niiden asiakkaiden nimet, jotka ovat tehneet vähintään yhden tilauksen.
</p>


<% partial 'partials/sample_output' do %>
sqlite> EXPLAIN QUERY PLAN SELECT nimi, puhelinnumero
            FROM Asiakas JOIN Tilaus
                ON Asiakas.id = Tilaus.asiakas_id;
selectid order from detail
-------- ----- ---- --------------------------------------------------------
0        0     1    SCAN TABLE Tilaus
0        1     0    SEARCH TABLE Asiakas USING INTEGER PRIMARY KEY (rowid=?)
<% end %>

<p>
  Kysely onkin nyt erilainen. Kyselyssä käydään ensin läpi koko taulu Tilaus, jonka jälkeen etsitään tietokantataulusta Asiakas rivejä asiakas-taulun pääavaimen perusteella. Entä jos tietokantataulu Asiakas olisikin määritelty siten, että kenttä <code>id</code> ei olisi pääavain?
</p>

<% partial 'partials/sql_highlight' do %>
  CREATE TABLE Asiakas (
      id integer,
      nimi varchar(200),
      puhelinnumero varchar(20),
      katuosoite varchar(50),
      postinumero integer,
      postitoimipaikka varchar(20)
  );
<% end %>

<% partial 'partials/sample_output' do %>
sqlite> EXPLAIN QUERY PLAN SELECT nimi, puhelinnumero
            FROM Asiakas JOIN Tilaus
                ON Asiakas.id = Tilaus.asiakas_id;
selectid order from detail
-------- ----- ---- -----------------------------------------------------------------
0        0     0    SCAN TABLE Asiakas
0        1     1    SEARCH TABLE Tilaus USING AUTOMATIC COVERING INDEX (asiakas_id=?)
<% end %>

<p>
  Tietokannanhallintajärjestelmä vaihtaa läpikäytävien taulujen järjestystyä. Nyt kysely käy ensin läpi koko Asiakas-taulun, ja etsii tämän jälkeen Tilaus-taulusta tietoa automaattisesti luodun indeksin perusteella.
</p>


# TODO: muita menetelmiä?
