---
path: '/osa-2/1-tiedon-lisaaminen-ja-paivittaminen'
title: 'Tiedon lisääminen ja päivittäminen'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Osaat lisätä tietoa tietokantatauluun ja osaat päivittää tietokantataulun sisältöä
- TODO: osaa poistaa

</text-box>



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
