---
path: '/osa-2/2-yhteenvetokyselyt'
title: 'Yhteenvetokyselyiden tekeminen'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Osaat tehdä SQL-kielellä yhteenvetokyselyitä ja rajata yhteenvetokyselyiden tuloksia.

</text-box>



#
  Yhteenvetokyselyt SQL-kielellä
<% end %>


  Harjoittelemamme SQL-kyselyt ovat tähän mennessä tuottaneet listauksia tietokantataulujen sisällöistä. Listauksia tuottavat kyselyt ovat erittäin hyödyllisiä, kun halutaan vastata esimerkiksi kysymyksiin kuten "Listaa kaikki opiskelijat, jotka ovat osallistuneet kurssille tietokantojen perusteet" tai "Listaa kaikki kurssit, joille annettu opiskelija on ilmoittautunut". Kysymykset kuten "Kuinka moni opiskelija on osallistunut kurssille tietokantojen perusteet" ovat kuitenkin vaatineet manuaalista työtä, sillä kyselyn tulosrivit on pitänyt laskea käsin tai jonkun toisen ohjelman avulla.



  SQL-kieli tarjoaa välineitä yhteenvetokyselyiden tekemiseen. Tällaisia kyselyitä ovat esimerkiksi juurikin yllä mainittu "kuinka moni" -- eli tulosrivien määrä -- sekä esimerkiksi erilaiset summa- ja keskiarvokyselyt. Käytännössä yhteenvetokyselyt tehdään SQL-kielen tarjoamien funktioiden avulla, jotka muuntavat tulosrivit toiseen muotoon. Alla on listattuna muutamia tyypillisimpiä funktioita, joita tietokantakyselyissä käytetään.


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
      `COUNT`
    </td>
    <td>
      ```sql
SELECT COUNT(*) FROM *Taulu*
      <% end %>
    </td>
  </tr>

  <tr>
    <td>
      Numeerisen sarakkeen keskiarvon laskeminen
    </td>
    <td>
      `AVG`
    </td>
    <td>
      ```sql
SELECT AVG(*sarake*) FROM *Taulu*
      <% end %>
    </td>
  </tr>

  <tr>
    <td>
      Numeerisen sarakkeen summan laskeminen
    </td>
    <td>
      `SUM`
    </td>
    <td>
      ```sql
SELECT SUM(*sarake*) FROM *Taulu*
      <% end %>
    </td>
  </tr>

  <tr>
    <td>
      Numeerisen sarakkeen minimiarvon selvittäminen
    </td>
    <td>
      `MIN`
    </td>
    <td>
      ```sql
SELECT MIN(*sarake*) FROM *Taulu*
      <% end %>
    </td>
  </tr>

  <tr>
    <td>
      Numeerisen sarakkeen maksimiarvon selvittäminen
    </td>
    <td>
      `MAX`
    </td>
    <td>
      ```sql
SELECT MAX(*sarake*) FROM *Taulu*
      <% end %>
    </td>
  </tr>

</table>



  Tarkastellaan näitä kyselyitä hieman tarkemmin. Oletetaan, että käytössämme on seuraava lentomatkoja kuvaava tietokantataulu.



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


  Yhteenvetokyselyiden avulla saamme selville erilaisia tilastoja. Alla muutamia esimerkkejä:


<ul>
  <li>
    Kuinka monta matkaa tietokantataulussa Lentomatka on yhteensä?
    ```sql
      SELECT COUNT(*) FROM Lentomatka
    <% end %>
  </li>

  <li>
    Kuinka monta lentoyhtiötä on tietokantataulussa lentomatka? (Huomaa avainsanan DISTINCT käyttö)
    ```sql
      SELECT COUNT(DISTINCT yhtio) FROM Lentomatka
    <% end %>
  </li>

  <li>
    Kuinka monta lentoa taulussa on Helsingistä Mallorcalle?
    ```sql
      SELECT COUNT(*) FROM Lentomatka
          WHERE lahtopaikka = 'Helsinki' AND maaranpaa = 'Mallorca'
    <% end %>
  </li>

  <li>
    Mikä on keskimääräinen Finnairin lennon pituus?
    ```sql
      SELECT AVG(pituus) FROM Lentomatka
          WHERE yhtio = 'Finnair'
    <% end %>
  </li>

  <li>
    Mikä on lyhin matkan kesto Helsingistä Berliiniin?
    ```sql
      SELECT MIN(pituus) FROM Lentomatka
          WHERE lahtopaikka = 'Helsinki' AND maaranpaa = 'Berliini'
    <% end %>
  </li>

</ul>


  Yllä olevat esimerkit tuottavat tulokseksi aina yhden luvun. Entä jos haluaisimme saada selville yhtiökohtaisia tietoja kuten vaikkapa jokaisen yhtiön lyhimmän lennon? Tarkastellaan tätä seuraavaksi.



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



<sqltrainer-exercise name="TODO: hei funktiot">
  Tee blaa ja blaa
</sqltrainer-exercise>


##
  Tulosten ryhmittely
<% end %>



  Tulosten ryhmittely tietyn sarakkeen perusteella tapahtuu komennon `GROUP BY` perustella. Komento `GROUP BY` lisätään taulujen listauksen ja mahdollisten kyselyn rajausehtojen jälkeen. Komentoa `GROUP BY` seuraa sarake, jonka perusteella tulokset ryhmitellään. Jotta ryhmittelystä tulee mielekäs, asetetaan ryhmittelyn peruste tyypillisesti myös SELECT-komentoa seuraavaan sarakelistaukseen.


```sql
  SELECT *ryhmittelysarake*, *FUNKTIO*(*sarake*) FROM *Taulu*
      GROUP BY *ryhmittelysarake*
<% end %>



  Alla muutamia esimerkkejä:


<ul>

  <li>
    Kuinka monta matkaa kullakin lentoyhtiöllä on tarjolla?
    ```sql
      SELECT yhtio, COUNT(*) FROM Lentomatka GROUP BY yhtio
    <% end %>
  </li>

  <li>
    Kuinka monta alle 100 minuutin pituista lentomatkaa eri kaupungeista lähtee?
    ```sql
      SELECT lahtopaikka, COUNT(*) FROM Lentomatka
          WHERE pituus &lt; 100 GROUP BY lahtopaikka
    <% end %>
  </li>

  <li>
    Kuinka pitkiä kunkin lentoyhtiön matkat ovat keskimäärin?
    ```sql
      SELECT yhtio, AVG(pituus) FROM Lentomatka GROUP BY yhtio
    <% end %>
  </li>

</ul>



  Taulujen yhdistäminen toimii kuten ennen. Valittavat taulut kerrotaan joko FROM -avainsanan jälkeen tai JOIN -avainsanan jälkeen, riippuen tavasta, jolla yhdistäminen tehdään. Ryhmittelykomento tulee mahdollisten WHERE-ehtojen jälkeen.



  Oletetaan seuraavat taulut Kurssi ja Kurssitehtävä.



<ul>
  <li>
    Kurssi((pk) id, nimi, opintopisteet)
  </li>
  <li>
    Kurssitehtava((pk) id, (fk) kurssi_id -&gt; Kurssi, tehtava)
  </li>
</ul>


  Kurssikohtaisten tehtävien lukumäärän laskeminen onnistuu seuraavasti. Avainsana AS muuntaa tuloksena saatavassa taulussa olevan sarakkeen nimen.


```sql
  SELECT Kurssi.nimi AS kurssi, COUNT(*) AS tehtäviä FROM Kurssi, Kurssitehtävä
      WHERE Kurssi.id = Kurssitehtava.kurssi_id
      GROUP BY Kurssi.nimi
<% end %>



  Edellä kuvatun kyselyn tuloksia tarkastellessa huomaamme, että tuloksissa ei ole yhtäkään tehtävätöntä kurssia. Tämä selittyy kyselyillämme -- olemme valinneet mukaan vain rivit, joilla hakuehdot täyttyvät. Kirjoitetaan edellinen kysely siten, että otamme huomioon kurssit vaikka niihin ei liittyisikään yhtäkään toisen taulun riviä -- käytämme siis `LEFT JOIN`-liitosoperaatiota.


```sql
  SELECT Kurssi.nimi AS kurssi, COUNT(Kurssitehtava.id) AS tehtäviä FROM Kurssi
      LEFT JOIN Kurssitehtävä ON Kurssi.id = Kurssitehtava.kurssi_id
      GROUP BY Kurssi.nimi
<% end %>


  Edellä COUNT-funktiolle annetaan parametrina kurssitehtävän id. Jos funktiolle annetaan parametrina *, myös NULL-arvo -- eli tyhjä arvo -- lasketaan (ainakin joissain tietokannanhallintajärjestelmissä).



<sqltrainer-exercise name="TODO: ryhmittely yksi sarake">
  Tee blaa ja blaa
</sqltrainer-exercise>


##
  Ryhmittely useamman sarakkeen perusteella
<% end %>



  Komennolle `GROUP BY` voi antaa myös useampia sarakkeita, jolloin ryhmittely tapahtuu sarakeryhmittäin. Esimerkiksi ryhmittely `GROUP BY kurssi, arvosana` ryhmittelisi taulussa olevat rivit ensin kurssin perusteella, jonka jälkeen kurssikohtaiset ryhmät ryhmiteltäisiin vielä arvosanan perusteella. Tällöin jokaiselle kurssille tulisi erilliset arvosanaryhmät.



  Oletetaan edellä kuvatun taulun lisäksi taulut Kurssisuoritus ja Opiskelija:


<ul>
  <li>
    Kurssisuoritus((pk) id, (fk) kurssi_id -&gt; Kurssi, opiskelija_id -&gt; Opiskelija, arvosana, paivamaara)
  </li>
  <li>
    Opiskelija((pk) id, opiskelijanumero, nimi, syntymävuosi)
  </li>
</ul>


  Kurssikohtaiset arvosanaryhmät saa selville seuraavalla kyselyllä.



```sql
  SELECT Kurssi.nimi AS kurssi, Kurssisuoritus.arvosana AS arvosana, COUNT (*) AS lukumäärä
      FROM Kurssi, Kurssisuoritus
      WHERE Kurssi.id = Kurssisuoritus.kurssi_id
      GROUP BY Kurssi.nimi, Kurssisuoritus.arvosana
<% end %>



<sqltrainer-exercise name="TODO: ryhmittely useampi sarake">
  Tee blaa ja blaa
</sqltrainer-exercise>


##
  Hakutulosten rajaaminen yhteenvetokyselyissä
<% end %>


  Yhteenvetokyselyissä laskettavat tulokset kuten summa, rivien lukumäärä ja keskiarvo muodostetaan vasta, kun kaikki kyselyn rivit on selvillä. Kyselyiden tuloksen rajaamiseen käytetty WHERE toimii siten, että se tarkastelee tuloksia riveittäin -- se ei osaa odottaa summan laskemisen lopputulosta.



  Jos yhteenvetokyselyn tuloksen perusteella halutaan rajata tuloksia, tulee käyttää `HAVING`-ehtoa. HAVING ehto tarkastetaan vasta, kun yhteenvetokyselyn tulokset ovat selvillä. Ehto HAVING lisätään ryhmittelykyselyn jälkeen esimerkiksi seuraavalla tavalla.


```sql
  SELECT Kurssi.nimi AS kurssi, AVG(Kurssisuoritus.arvosana) keskiarvo
      FROM Kurssi, Kurssisuoritus
      WHERE Kurssi.id = Kurssisuoritus.kurssi_id
      GROUP BY Kurssi.nimi
      HAVING keskiarvo &lt; 2
      ORDER BY Kurssi.nimi
<% end %>


  Yllä olevalla kyselyllä saadaan selville ne kurssit, joihin liittyvien kurssisuoritusten keskiarvo on alle 2.



  Kuten esimerkissä näkyy, samassa kyselyssä voi olla sekä `WHERE`-ehto että `HAVING`-ehto.



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

