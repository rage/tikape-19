---
path: '/osa-2/2-yhteenvetokyselyt'
title: 'Yhteenvetokyselyiden tekeminen'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Osaat tehdä SQL-kielellä yhteenvetokyselyitä ja rajata yhteenvetokyselyiden tuloksia.

</text-box>



<% partial 'partials/material_heading' do %>
  Yhteenvetokyselyt SQL-kielellä
<% end %>

<p>
  Harjoittelemamme SQL-kyselyt ovat tähän mennessä tuottaneet listauksia tietokantataulujen sisällöistä. Listauksia tuottavat kyselyt ovat erittäin hyödyllisiä, kun halutaan vastata esimerkiksi kysymyksiin kuten "Listaa kaikki opiskelijat, jotka ovat osallistuneet kurssille tietokantojen perusteet" tai "Listaa kaikki kurssit, joille annettu opiskelija on ilmoittautunut". Kysymykset kuten "Kuinka moni opiskelija on osallistunut kurssille tietokantojen perusteet" ovat kuitenkin vaatineet manuaalista työtä, sillä kyselyn tulosrivit on pitänyt laskea käsin tai jonkun toisen ohjelman avulla.
</p>

<p>
  SQL-kieli tarjoaa välineitä yhteenvetokyselyiden tekemiseen. Tällaisia kyselyitä ovat esimerkiksi juurikin yllä mainittu "kuinka moni" -- eli tulosrivien määrä -- sekä esimerkiksi erilaiset summa- ja keskiarvokyselyt. Käytännössä yhteenvetokyselyt tehdään SQL-kielen tarjoamien funktioiden avulla, jotka muuntavat tulosrivit toiseen muotoon. Alla on listattuna muutamia tyypillisimpiä funktioita, joita tietokantakyselyissä käytetään.
</p>

<table class="table">

  <tr>
    <th>
      Tavoite
    </th>
    <th>
      Funktio
    </th>
    <th>
      Esimerkki
    </th>
  </tr>

  <tr>
    <td>
      Rivien lukumäärän selvittäminen
    </td>
    <td>
      <code>COUNT</code>
    </td>
    <td>
      <% partial 'partials/sql_highlight' do %>
SELECT COUNT(*) FROM <em>Taulu</em>
      <% end %>
    </td>
  </tr>

  <tr>
    <td>
      Numeerisen sarakkeen keskiarvon laskeminen
    </td>
    <td>
      <code>AVG</code>
    </td>
    <td>
      <% partial 'partials/sql_highlight' do %>
SELECT AVG(<em>sarake</em>) FROM <em>Taulu</em>
      <% end %>
    </td>
  </tr>

  <tr>
    <td>
      Numeerisen sarakkeen summan laskeminen
    </td>
    <td>
      <code>SUM</code>
    </td>
    <td>
      <% partial 'partials/sql_highlight' do %>
SELECT SUM(<em>sarake</em>) FROM <em>Taulu</em>
      <% end %>
    </td>
  </tr>

  <tr>
    <td>
      Numeerisen sarakkeen minimiarvon selvittäminen
    </td>
    <td>
      <code>MIN</code>
    </td>
    <td>
      <% partial 'partials/sql_highlight' do %>
SELECT MIN(<em>sarake</em>) FROM <em>Taulu</em>
      <% end %>
    </td>
  </tr>

  <tr>
    <td>
      Numeerisen sarakkeen maksimiarvon selvittäminen
    </td>
    <td>
      <code>MAX</code>
    </td>
    <td>
      <% partial 'partials/sql_highlight' do %>
SELECT MAX(<em>sarake</em>) FROM <em>Taulu</em>
      <% end %>
    </td>
  </tr>

</table>


<p>
  Tarkastellaan näitä kyselyitä hieman tarkemmin. Oletetaan, että käytössämme on seuraava lentomatkoja kuvaava tietokantataulu.
</p>


<table class="table">
  <tr>
    <th colspan="4">
      Lentomatka(yhtio, lahtopaikka, maaranpaa, pituus)
    </th>
  </tr>
  <tr>
    <th>
      Lentoyhtiö
    </th>
    <th>
      Lähtöpaikka
    </th>
    <th>
      Määränpää
    </th>
    <th>
      Lennon pituus (minuuttia)
    </th>
  </tr>
  <tr>
    <td>
      Air Berlin
    </td>
    <td>
      Helsinki
    </td>
    <td>
      Berliini
    </td>
    <td>
      205
    </td>
  </tr>
  <tr>
    <td>
      Finnair
    </td>
    <td>
      Helsinki
    </td>
    <td>
      Oulu
    </td>
    <td>
      70
    </td>
  </tr>
  <tr>
    <td>
      Finnair
    </td>
    <td>
      Helsinki
    </td>
    <td>
      Berliini
    </td>
    <td>
      200
    </td>
  </tr>
  <tr>
    <td>
      Finnair
    </td>
    <td>
      Helsinki
    </td>
    <td>
      Tukholma
    </td>
    <td>
      50
    </td>
  </tr>
  <tr>
    <td>
      Finnair
    </td>
    <td>
      Helsinki
    </td>
    <td>
      Mallorca
    </td>
    <td>
      230
    </td>
  </tr>
  <tr>
    <td>
      Norwegian
    </td>
    <td>
      Helsinki
    </td>
    <td>
      Mallorca
    </td>
    <td>
      240
    </td>
  </tr>
</table>

<p>
  Yhteenvetokyselyiden avulla saamme selville erilaisia tilastoja. Alla muutamia esimerkkejä:
</p>

<ul>
  <li>
    Kuinka monta matkaa tietokantataulussa Lentomatka on yhteensä?
    <% partial 'partials/sql_highlight' do %>
      SELECT COUNT(*) FROM Lentomatka
    <% end %>
  </li>

  <li>
    Kuinka monta lentoyhtiötä on tietokantataulussa lentomatka? (Huomaa avainsanan DISTINCT käyttö)
    <% partial 'partials/sql_highlight' do %>
      SELECT COUNT(DISTINCT yhtio) FROM Lentomatka
    <% end %>
  </li>

  <li>
    Kuinka monta lentoa taulussa on Helsingistä Mallorcalle?
    <% partial 'partials/sql_highlight' do %>
      SELECT COUNT(*) FROM Lentomatka
          WHERE lahtopaikka = 'Helsinki' AND maaranpaa = 'Mallorca'
    <% end %>
  </li>

  <li>
    Mikä on keskimääräinen Finnairin lennon pituus?
    <% partial 'partials/sql_highlight' do %>
      SELECT AVG(pituus) FROM Lentomatka
          WHERE yhtio = 'Finnair'
    <% end %>
  </li>

  <li>
    Mikä on lyhin matkan kesto Helsingistä Berliiniin?
    <% partial 'partials/sql_highlight' do %>
      SELECT MIN(pituus) FROM Lentomatka
          WHERE lahtopaikka = 'Helsinki' AND maaranpaa = 'Berliini'
    <% end %>
  </li>

</ul>

<p>
  Yllä olevat esimerkit tuottavat tulokseksi aina yhden luvun. Entä jos haluaisimme saada selville yhtiökohtaisia tietoja kuten vaikkapa jokaisen yhtiön lyhimmän lennon? Tarkastellaan tätä seuraavaksi.
</p>


<% partial 'partials/exercise', locals: { name: 'Yhteenvetokyselyt, osa 1' } do %>


  <p>
    Tehtäväpohjan kansiossa <code>db</code> tulee tiedosto nimeltä <code>Chinook_Sqlite.sqlite</code>. Käytimme samaa tiedostoa myös yhdessä osan 3 tehtävistä. Tietokannassa on seuraavat taulut:
  </p>

  <pre>
  sqlite&gt; .tables
  Album          	Employee       	InvoiceLine    	PlaylistTrack
  Artist         	Genre          	MediaType      Track
  Customer       	Invoice        	Playlist
  </pre>

  <p>
    Tietokanta kuvaa digitaalisen musiikin myyntipalvelua. Tietokannan relaatiokaavio löytyy osoitteesta <a href="https://github.com/lerocha/chinook-database/wiki/Chinook-Schema" target="_blank" norel>https://github.com/lerocha/chinook-database/wiki/Chinook-Schema</a>. Kirjoita SQLiten avulla kyselyt, joilla saa selville seuraavat tiedot.
  </p>


  <ul>
    <li>Kysely 1: Kuinka monta albumia (Album) tietokannassa on yhteensä?</li>
    <li>Kysely 2: Minkä on kaikkien tietokannassa olevien laskujen (Invoice) hinnan (total) keskiarvo?</li>
    <li>Kysely 3: Kuinka monta 'Blues', 'Jazz' tai 'Metal'-genren kappaletta tietokannassa on yhteensä?</li>
  </ul>

  <p>
    Kun olet saanut kyselyt toimimaan, kopioi ne tehtäväpohjassa olevan luokan Kyselyja metodeihin kysely1, kysely2 ja kysely3. Metodeihin tulee siis kopioida SQL-kieliset kyselyt, joilla em. kysymyksiin saa vastaukset, ei kyselyiden vastauksia.
  </p>


<% end %>

<% partial 'partials/material_sub_heading' do %>
  Tulosten ryhmittely
<% end %>


<p>
  Tulosten ryhmittely tietyn sarakkeen perusteella tapahtuu komennon <code>GROUP BY</code> perustella. Komento <code>GROUP BY</code> lisätään taulujen listauksen ja mahdollisten kyselyn rajausehtojen jälkeen. Komentoa <code>GROUP BY</code> seuraa sarake, jonka perusteella tulokset ryhmitellään. Jotta ryhmittelystä tulee mielekäs, asetetaan ryhmittelyn peruste tyypillisesti myös SELECT-komentoa seuraavaan sarakelistaukseen.
</p>

<% partial 'partials/sql_highlight' do %>
  SELECT <em>ryhmittelysarake</em>, <em>FUNKTIO</em>(<em>sarake</em>) FROM <em>Taulu</em>
      GROUP BY <em>ryhmittelysarake</em>
<% end %>


<p>
  Alla muutamia esimerkkejä:
</p>

<ul>

  <li>
    Kuinka monta matkaa kullakin lentoyhtiöllä on tarjolla?
    <% partial 'partials/sql_highlight' do %>
      SELECT yhtio, COUNT(*) FROM Lentomatka GROUP BY yhtio
    <% end %>
  </li>

  <li>
    Kuinka monta alle 100 minuutin pituista lentomatkaa eri kaupungeista lähtee?
    <% partial 'partials/sql_highlight' do %>
      SELECT lahtopaikka, COUNT(*) FROM Lentomatka
          WHERE pituus &lt; 100 GROUP BY lahtopaikka
    <% end %>
  </li>

  <li>
    Kuinka pitkiä kunkin lentoyhtiön matkat ovat keskimäärin?
    <% partial 'partials/sql_highlight' do %>
      SELECT yhtio, AVG(pituus) FROM Lentomatka GROUP BY yhtio
    <% end %>
  </li>

</ul>


<p>
  Taulujen yhdistäminen toimii kuten ennen. Valittavat taulut kerrotaan joko FROM -avainsanan jälkeen tai JOIN -avainsanan jälkeen, riippuen tavasta, jolla yhdistäminen tehdään. Ryhmittelykomento tulee mahdollisten WHERE-ehtojen jälkeen.
</p>

<p>
  Oletetaan seuraavat taulut Kurssi ja Kurssitehtävä.
</p>


<ul>
  <li>
    Kurssi((pk) id, nimi, opintopisteet)
  </li>
  <li>
    Kurssitehtava((pk) id, (fk) kurssi_id -&gt; Kurssi, tehtava)
  </li>
</ul>

<p>
  Kurssikohtaisten tehtävien lukumäärän laskeminen onnistuu seuraavasti. Avainsana AS muuntaa tuloksena saatavassa taulussa olevan sarakkeen nimen.
</p>

<% partial 'partials/sql_highlight' do %>
  SELECT Kurssi.nimi AS kurssi, COUNT(*) AS tehtäviä FROM Kurssi, Kurssitehtävä
      WHERE Kurssi.id = Kurssitehtava.kurssi_id
      GROUP BY Kurssi.nimi
<% end %>


<p>
  Edellä kuvatun kyselyn tuloksia tarkastellessa huomaamme, että tuloksissa ei ole yhtäkään tehtävätöntä kurssia. Tämä selittyy kyselyillämme -- olemme valinneet mukaan vain rivit, joilla hakuehdot täyttyvät. Kirjoitetaan edellinen kysely siten, että otamme huomioon kurssit vaikka niihin ei liittyisikään yhtäkään toisen taulun riviä -- käytämme siis <code>LEFT JOIN</code>-liitosoperaatiota.
</p>

<% partial 'partials/sql_highlight' do %>
  SELECT Kurssi.nimi AS kurssi, COUNT(Kurssitehtava.id) AS tehtäviä FROM Kurssi
      LEFT JOIN Kurssitehtävä ON Kurssi.id = Kurssitehtava.kurssi_id
      GROUP BY Kurssi.nimi
<% end %>

<p>
  Edellä COUNT-funktiolle annetaan parametrina kurssitehtävän id. Jos funktiolle annetaan parametrina *, myös NULL-arvo -- eli tyhjä arvo -- lasketaan (ainakin joissain tietokannanhallintajärjestelmissä).
</p>


<% partial 'partials/material_sub_heading' do %>
  Ryhmittely useamman sarakkeen perusteella
<% end %>


<p>
  Komennolle <code>GROUP BY</code> voi antaa myös useampia sarakkeita, jolloin ryhmittely tapahtuu sarakeryhmittäin. Esimerkiksi ryhmittely <code>GROUP BY kurssi, arvosana</code> ryhmittelisi taulussa olevat rivit ensin kurssin perusteella, jonka jälkeen kurssikohtaiset ryhmät ryhmiteltäisiin vielä arvosanan perusteella. Tällöin jokaiselle kurssille tulisi erilliset arvosanaryhmät.
</p>

<p>
  Oletetaan edellä kuvatun taulun lisäksi taulut Kurssisuoritus ja Opiskelija:
</p>

<ul>
  <li>
    Kurssisuoritus((pk) id, (fk) kurssi_id -&gt; Kurssi, opiskelija_id -&gt; Opiskelija, arvosana, paivamaara)
  </li>
  <li>
    Opiskelija((pk) id, opiskelijanumero, nimi, syntymävuosi)
  </li>
</ul>

<p>
  Kurssikohtaiset arvosanaryhmät saa selville seuraavalla kyselyllä.
</p>


<% partial 'partials/sql_highlight' do %>
  SELECT Kurssi.nimi AS kurssi, Kurssisuoritus.arvosana AS arvosana, COUNT (*) AS lukumäärä
      FROM Kurssi, Kurssisuoritus
      WHERE Kurssi.id = Kurssisuoritus.kurssi_id
      GROUP BY Kurssi.nimi, Kurssisuoritus.arvosana
<% end %>



<% partial 'partials/material_sub_heading' do %>
  Tulosten järjestäminen
<% end %>

<p>
  Kyselyn tulokset voi järjestää komennolla <code>ORDER BY</code>, jota seuraa järjestettävät sarakkeet. Sarakkeelle voi antaa myös lisämääreen <code>ASC</code> (<em>ascending</em>), joka kertoo että tulokset tulee järjestää nousevaan järjestykseen, ja <code>DESC</code> (<em>descending</em>), joka kertoo että tulokset tulee järjestää laskevaan järjestykseen. Oletuksena järjestys on nouseva.
</p>

<p>
  Komento <code>ORDER BY</code> tulee kyselyn loppuun. Edellisen kurssiarvosanatilaston tulokset saisi kurssin nimen perusteella järjestykseen seuraavasti.
</p>


<% partial 'partials/sql_highlight' do %>
  SELECT Kurssi.nimi AS kurssi, Kurssisuoritus.arvosana AS arvosana, COUNT (*) AS lukumäärä
      FROM Kurssi, Kurssisuoritus
      WHERE Kurssi.id = Kurssisuoritus.kurssi_id
      GROUP BY Kurssi.nimi, Kurssisuoritus.arvosana
      ORDER BY Kurssi.nimi
<% end %>



<% partial 'partials/material_sub_heading' do %>
  Hakutulosten rajaaminen yhteenvetokyselyissä
<% end %>

<p>
  Yhteenvetokyselyissä laskettavat tulokset kuten summa, rivien lukumäärä ja keskiarvo muodostetaan vasta, kun kaikki kyselyn rivit on selvillä. Kyselyiden tuloksen rajaamiseen käytetty WHERE toimii siten, että se tarkastelee tuloksia riveittäin -- se ei osaa odottaa summan laskemisen lopputulosta.
</p>

<p>
  Jos yhteenvetokyselyn tuloksen perusteella halutaan rajata tuloksia, tulee käyttää <code>HAVING</code>-ehtoa. HAVING ehto tarkastetaan vasta, kun yhteenvetokyselyn tulokset ovat selvillä. Ehto HAVING lisätään ryhmittelykyselyn jälkeen esimerkiksi seuraavalla tavalla.
</p>

<% partial 'partials/sql_highlight' do %>
  SELECT Kurssi.nimi AS kurssi, AVG(Kurssisuoritus.arvosana) keskiarvo
      FROM Kurssi, Kurssisuoritus
      WHERE Kurssi.id = Kurssisuoritus.kurssi_id
      GROUP BY Kurssi.nimi
      HAVING keskiarvo &lt; 2
      ORDER BY Kurssi.nimi
<% end %>

<p>
  Yllä olevalla kyselyllä saadaan selville ne kurssit, joihin liittyvien kurssisuoritusten keskiarvo on alle 2.
</p>

<p>
  Kuten esimerkissä näkyy, samassa kyselyssä voi olla sekä <code>WHERE</code>-ehto että <code>HAVING</code>-ehto.
</p>


<% partial 'partials/exercise', locals: { name: 'Yhteenvetokyselyt, osa 2' } do %>

  <p>
    Jatketaan edellisestä tehtävästä tutun tietokannan parissa..
  </p>

  <p>
    Tehtäväpohjan kansiossa <code>db</code> tulee tiedosto nimeltä <code>Chinook_Sqlite.sqlite</code>. Tietokannassa on seuraavat taulut:
  </p>

  <pre>
  sqlite&gt; .tables
  Album          	Employee       	InvoiceLine    	PlaylistTrack
  Artist         	Genre          	MediaType      Track
  Customer       	Invoice        	Playlist
  </pre>

  <p>
    Tietokanta kuvaa digitaalisen musiikin myyntipalvelua. Tietokannan relaatiokaavio löytyy osoitteesta <a href="https://github.com/lerocha/chinook-database/wiki/Chinook-Schema" target="_blank" norel>https://github.com/lerocha/chinook-database/wiki/Chinook-Schema</a>. Kirjoita SQLiten avulla kyselyt, joilla saa selville seuraavat tiedot.
  </p>


  <ul>
    <li>Kysely 1: Kuinka monta kappaletta kuhunkin genreen liittyy? Tuloksessa tulee olla kaksi saraketta, joista toisen nimi on <code>genre</code> ja toisen nimi on <code>kappaleita</code>.</li>
    <li>Kysely 2: Kuinka monta kappaletta kustakin genrestä on ostettu? Voit olettaa, että kappale on ostettu jos lasku on olemassa. Tuloksessa tulee olla kaksi saraketta, joista toisen nimi on <code>genre</code> ja toisen nimi on <code>ostettuja</code>.</li>
    <li>Kysely 3: Kuinka monella levyllä kukin artisti esiintyy? Tuloksessa tulee olla kaksi saraketta, joista toisen nimi on <code>artisti</code> ja toisen nimi on <code>levyt</code>.</li>
  </ul>

  <p>
    Kun olet saanut kyselyt toimimaan, kopioi ne tehtäväpohjassa olevan luokan Kyselyja metodeihin kysely1, kysely2 ja kysely3. Metodeihin tulee kopioida SQL-kieliset kyselyt, joilla em. kysymyksiin saa vastaukset, ei siis vastauksia.
  </p>

  <p>
    <em>
      Huom! Tehtävässä on tilanteita, missä yhteenvetokyselyn tuloksessa esiintyvä lukumäärä (esim. kappaleet, ostetut, levyt) voi olla 0.
    </em>
  </p>

<% end %>


## alikyselyt, minne?


<% partial 'partials/material_sub_heading' do %>
  Alikyselyt
<% end %>

<p>
  Alikyselyt ovat nimensä mukaan kyselyn osana suoritettavia alikyselyitä, joiden tuloksia käytetään osana pääkyselyä. Pohditaan kysymystä <em>Miten haen opiskelijat, jotka eivät ole vielä osallistuneet yhdellekään kurssille?</em>, ja käytetään siihen ensin aiemmin tutuksi tullutta tapaa, eli LEFT JOIN -kyselyä. Yhdistetään opiskelijaa ja kurssisuoritusta kuvaavat taulut LEFT JOIN-kyselyllä siten, että myös opiskelijat, joilla ei ole suorituksia tulevat mukaan vastaukseen. Tämän jälkeen, jätetään vastaukseen vain ne rivit, joilla kurssisuoritukseen liittyvät tiedot ovat tyhjiä -- tämä onnistuu katsomalla mitä tahansa kurssisuoritus-taulun saraketta, ja tarkistamalla onko se tyhjä, eli <em>null</em>. Tämä onnistuu seuraavasti:
</p>

<% partial 'partials/sql_highlight' do %>
  SELECT opiskelijanumero FROM Opiskelija
      LEFT JOIN Kurssisuoritus
      ON Opiskelija.id = Kurssisuoritus.opiskelija_id
      WHERE Kurssisuoritus.kurssi_id IS null
<% end %>

<p>
  Toinen vaihtoehto edellisen kyselyn toteuttamiseen on luoda kysely, joka hakee kaikki ne opiskelijat, jotka eivät ole kurssisuorituksia saaneiden opiskelijoiden joukossa. Tässä on oleellisesti kaksi kyselyä: (1) hae niiden opiskelijoiden tunnus, joilla on kurssisuoritus, ja (2) hae opiskelijat, jotka eivät ole edellisen kyselyn palauttamassa joukossa.
</p>

<p>
  Ensimmäinen kysely on suoraviivainen.
</p>


<% partial 'partials/sql_highlight' do %>
  SELECT opiskelija_id FROM Kurssisuoritus
<% end %>

<p>
  Toinenkin kysely on melko suoraviivainen -- avainsanalla NOT IN voidaan rajata joukkoa.
</p>

<% partial 'partials/sql_highlight' do %>
  SELECT * FROM Opiskelija
      WHERE id NOT IN (<em>ensimmainen kysely</em>)
<% end %>

<p>
  Yhdessä kyselyt ovat siis muotoa:
</p>

<% partial 'partials/sql_highlight' do %>
  SELECT * FROM Opiskelija
      WHERE id NOT IN (
          SELECT opiskelija_id FROM Kurssisuoritus
      )
<% end %>

<p>
  Käytännössä alikyselyt tuottavat kyselyn tuloksena taulun, josta pääkyselyssä tehtävä kysely tehdään. Ylläolevassa esimerkissä alikyselyn tuottamassa taulussa on vain yksi sarake, jossa on kurssisuorituksen saaneiden opiskelijoiden opiskelijanumerot.
</p>

<p>
  Määreen <code>NOT IN</code>, joka tarkastaa että valitut arvot eivät ole alikyselyn tuottamassa taulussa, lisäksi käytössä on määre <code>IN</code>. Määreen <code>IN</code> avulla voidaan luoda ehto, jolla tarkastetaan, että valitut arvot ovat annetussa joukossa tai taulussa. Esimerkiksi alla haetaan kaikki kurssisuoritukset, joissa arvosana on kolme tai viisi.
</p>

<% partial 'partials/sql_highlight' do %>
  SELECT * FROM Kurssisuoritus WHERE arvosana IN (3, 5)
<% end %>

<p>
  Määreiden IN ja NOT IN lisäksi alikyselyissä voidaan käyttää määreitä EXISTS ja NOT EXISTS, joiden avulla voidaan rajata hakujoukkoa alikyselyssä olevan ehdon perusteella. Voimme esimerkiksi kirjoittaa aiemmin kirjoitetun kursseja suorittamattomia opiskelijoita etsivän kyselyn siten, että jokaisen Opiskelija-taulussa olevan opiskelijanumeron kohdalla tarkistetaan, että sitä ei löydy taulusta Kurssisuoritus.
</p>

<% partial 'partials/sql_highlight' do %>
  SELECT opiskelijanumero FROM Opiskelija
      WHERE NOT EXISTS (
          SELECT opiskelija_id FROM Kurssisuoritus
          WHERE Kurssisuoritus.opiskelija_id = Opiskelija.id
      )
<% end %>

<p>
  Edellä oleva kysely tarkistaa jokaisen Opiskelija-taulussa olevan opiskelijanumeron kohdalla ettei sitä löydy Kurssisuoritus-taulun opiskelija-sarakkeesta. Käytännössä -- jos tietokantamoottori ei optimoi kyselyä -- jokainen opiskelija-taulun rivi aiheuttaa uuden kyselyn kurssisuoritus-tauluun, mikä tekee kyselystä tehottoman.
</p>

<% partial 'partials/hint', locals: { name: 'Kyselyn tulos on taulu' } do %>

  <p>
    Jokainen SQL-kysely tuottaa tuloksena taulun. Taulussa voi olla tasan yksi sarake ja rivi, tai vaikkapa tuhansia rivejä ja kymmeniä sarakkeita. Silloinkin, kun suoritamme yksinkertaisen haun, kuten vaikkapa "Hae kaikki kurssilla 'Tietokantojen perusteet' olevat opiskelijat", on haun tuloksena taulu.
  </p>

  <p>
    Kaikki tekemämme SQL-kyselyt ovat liittyneet tauluihin. Emmekö siis voisi tehdä kyselyjä myös vastauksiin? Vastaus on kyllä.
  </p>

  <p>
    Esimerkiksi vanhimman (tai vanhimmat, jos tämä ei ole yksikäsitteistä) opiskelijan löytää -- muunmuassa -- etsimällä kaikista pienimmän mahdollisimman syntymävuoden (kyselyn tulos on taulu), jonka jälkeen vastaustaulussa olevaa tulosta verrataan kaikkien opiskelijoiden syntymävuosiin.
  </p>

  <% partial 'partials/sql_highlight' do %>
    SELECT * FROM Opiskelija
        WHERE syntymävuosi
        IN (SELECT MIN(syntymavuosi) FROM Opiskelija)
  <% end %>

<% end %>





<% partial 'partials/material_sub_heading' do %>
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
      <% partial 'partials/sql_highlight' do %>
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
      <% partial 'partials/sql_highlight' do %>
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
      <% partial 'partials/sql_highlight' do %>
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
      <% partial 'partials/sql_highlight' do %>
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
      <% partial 'partials/sql_highlight' do %>
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
      <% partial 'partials/sql_highlight' do %>
DELETE FROM Opiskelija
    WHERE opiskelijanumero=1008286
      <% end %>
    </td>
  </tr>

</table>

