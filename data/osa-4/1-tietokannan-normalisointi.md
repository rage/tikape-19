---
path: '/osa-4/1-tietokannan-normalisointi'
title: 'Tietokannan normalisointi'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Osaat tehdä SQL-kielellä yhteenvetokyselyitä ja rajata yhteenvetokyselyiden tuloksia.

</text-box>


#
  Tietokannan normalisointi ja denormalisointi
<% end %>


  Tietokannan normalisointi on askeleittainen prosessi, mikä sisältää mahdollisten ongelmakohtien tunnistamisen ja niiden korjaamisen. Tietokannan normalisointiprosessin tuloksena tietokanta sisältää hyvin vähän toisteista tietoa. Tietokannan denormalisointi on käänteinen prosessi, missä tietokannassa sijaitsevan toisteisuuden määrä lisääntyy. Samalla tietokantakyselyiden tehokkuus tyypillisesti kasvaa.



  Tarkastellaan näitä kahta seuraavaksi.


##
  Tietokannan normalisointi
<% end %>


  Tietokannan normalisoinnin tavoite on vähentää tietokantatauluissa esiintyvää toisteista tietoa. Pääpiirteittäin tavoite on sama kuin käsiteanalyysissä: lopulta jokainen taulu liittyy vain tiettyyn käsitteeseen ja taulun attribuutit liittyvät vain kyseisen taulun esittämään käsitteeseen.



  Toisin kuin käsiteanalyysi, tietokannan normalisointi tehdään tyypillisesti olemassaolevalle tietokannalle tai sen suunnitelmalle. Tietokannan normalisoinnissa etsimme epäkohtia, jonka jälkeen näitä epäkohtia korjataan.



  Tietokannan normalisointi tapahtuu askeleittain normaalimuotojen avulla.



###
  Ensimmäinen normaalimuoto
<% end %>


  Tietokantataulu on ensimmäisessä normaalimuodossa, jos se täyttää seuraavat ehdot:


<ol>
  <li>
    Sarakkeen arvot eivät saa sisältää listoja.
  </li>
  <li>
    Taulun sarakkeet eivät muodosta toistuvia ryhmiä.
  </li>
  <li>
    Sarakkeen arvojen tulee olla saman tyyppisiä.
  </li>
  <li>
    Jokaisen sarakkeen nimen tulee olla tietokantataulussa uniikki.
  </li>
  <li>
    Sarakkeiden järjestyksen ei tule vaikuttaa tietokantataulun toimintaan.
  </li>
  <li>
    Tietokantataulussa ei saa olla kahta täsmälleen samanlaista riviä.
  </li>
  <li>
    Rivien järjestyksen ei tule vaikuttaa tietokantataulun toimintaan.
  </li>
</ol>


  Alla on esimerkki henkilöitä sisältävästä tietokantataulusta. Jokaiseen henkilöön liittyy tunnus (id), nimi sekä pilkuilla eroteltu lista puhelinnumeroita. Esimerkki rikkoo ensimmäistä normaalimuotoa, sillä puhelinnumerot sisältävät listoja.


<table class="table">
  <tr>
    <th colspan=3>Henkilo((pk) id, nimi, puhelinnumerot)</th>
  </tr>
  <tr>
    <th>
      <u>
	id
      </u>
    </th>
    <th>
      nimi
    </th>
    <th>
      puhelinnumerot
    </th>
  </tr>
  <tr>
    <td>
      1
    </td>
    <td>
      Larry
    </td>
    <td>
      555-1024, 555-2048
    </td>
  </tr>
  <tr>
    <td>
      2
    </td>
    <td>
      Moe
    </td>
    <td>
      555-0512, 555-0256, 555-0128
    </td>
  </tr>
  <tr>
    <td>
      3
    </td>
    <td>
      Curly
    </td>
    <td>
      555-0001, 555-0002, 555-0004
    </td>
  </tr>
</table>


  Ensimmäinen korjaus ylläolevaan tietokantatauluun on eritellä puhelinnumerot erillisiksi sarakkeikseen (tehty alla). Tämä ei ole kovin hyvä ratkaisu -- koko tietokantataulun rakennetta tulee muuttaa mikäli jollain on esimerkiksi neljä tai viisi erillistä numeroa. Tämä myös rikkoo ensimmäistä normaalimuotoa, sillä puhelinnumero muodostaa toistuvan ryhmän.



<table class="table">
  <tr>
    <th colspan=5>Henkilo((pk) id, nimi, puhelinnumero1, puhelinnumero2, puhelinnumero3)</th>
  </tr>
  <tr>
    <th>
      <u>
	id
      </u>
    </th>
    <th>
      nimi
    </th>
    <th>
      puhelinnumero1
    </th>
    <th>
      puhelinnumero2
    </th>
    <th>
      puhelinnumero3
    </th>
  </tr>
  <tr>
    <td>
      1
    </td>
    <td>
      Larry
    </td>
    <td>
      555-1024
    </td>
    <td>
      555-2048
    </td>
    <td>
    </td>
  </tr>
  <tr>
    <td>
      2
    </td>
    <td>
      Moe
    </td>
    <td>
      555-0512
    </td>
    <td>
      555-0256
    </td>
    <td>
      555-0128
    </td>
  </tr>
  <tr>
    <td>
      3
    </td>
    <td>
      Curly
    </td>
    <td>
      555-0001
    </td>
    <td>
      555-0002
    </td>
    <td>
      555-0004
    </td>
  </tr>
</table>


  Sopivampi korjaus ongelmaan on muodostaa erillinen tietokantataulu puhelinnumeroille. Henkilön ja puhelinnumeron välillä on yhden suhden moneen -yhteys, eli yhteen henkilöön liittyy monta puhelinnumeroa, mutta jokainen puhelinnumero liittyy yhteen henkilöön.



<table class="table">
  <tr>
    <th colspan=2>Henkilo((pk) id, nimi)</th>
  </tr>
  <tr>
    <th>
      <u>
	id
      </u>
    </th>
    <th>
      nimi
    </th>
  </tr>
  <tr>
    <td>
      1
    </td>
    <td>
      Larry
    </td>
  </tr>
  <tr>
    <td>
      2
    </td>
    <td>
      Moe
    </td>
  </tr>
  <tr>
    <td>
      3
    </td>
    <td>
      Curly
    </td>
  </tr>
</table>


  &nbsp;


<table class="table">
  <tr>
    <th colspan=3>Puhelinnumero((pk) id, (fk) henkilo_id -&gt; Henkilo, puhelinnumero)</th>
  </tr>
  <tr>
    <th>
      <u>
	id
      </u>
    </th>
    <th>
      <u>
	henkilo_id
      </u>
    </th>
    <th>
      puhelinnumero
    </th>
  </tr>
  <tr>
    <td>
      1
    </td>
    <td>
      1
    </td>
    <td>
      555-1024
    </td>
  </tr>
  <tr>
    <td>
      2
    </td>
    <td>
      1
    </td>
    <td>
      555-2048
    </td>
  </tr>
  <tr>
    <td>
      3
    </td>
    <td>
      2
    </td>
    <td>
      555-0512
    </td>
  </tr>
  <tr>
    <td>
      4
    </td>
    <td>
      2
    </td>
    <td>
      555-0256
    </td>
  </tr>
  <tr>
    <td>
      ...
    </td>
    <td>
      ...
    </td>
    <td>
      ...
    </td>
  </tr>
</table>



###
  Funktionaalinen riippuvuus
<% end %>



  Ensimmäisessä normaalimuodossa kyse on ensiaskeleista tietokannan rakenteen järkevöittämiseen. Muissa normaalimuodoissa käsite *funktionaalinen riippuvuus* sarakkeiden välillä on oleellinen.



  Sarake B on funktionaalisesti riippuvainen sarakkeesta A (A määrää funktionaalisesti B:n), jos sarakkeen A arvon perusteella voidaan yksikäsitteisesti selvittää sarakkeen B arvo. Tällöin kirjoitetaan `A -&gt; B`, ja sanotaan, että "sarake B on funktionaalisesti riippuvainen sarakkeesta A". Huom! A voi olla myös kokoelma sarakkeita!



  *
    Esimerkiksi henkilön nimi on funktionaalisesti riippuvainen henkilötunnuksesta, sillä henkilötunnuksen perusteella voidaan yksikäsitteisesti selvittää nimi. Toisaalta, henkilötunnus ei ole funktionaalisesti riippuvainen henkilön nimestä, koska useammalla henkillä voi olla sama nimi.
  *



  Selvittäminen voi tapahtua kyselyllä "SELECT DISTINCT b FROM Taulu WHERE a=tiedetty_arvo", missä avainsana DISTINCT palauttaa uniikit rivit. Jos attribuutti `b` on funktionaalisesti riippuva `a`:sta, tuottaa ylläoleva kysely joko yhden tai ei yhtään tulosriviä, mutta ei koskaan enempää. Tämän ehdon on oltava voimassa aina, ei vain hetkellisesti.



Esimerkki: `Henkilo( (pk) id, nimi, henkilötunnus)` -- mitkä arvot ovat funktionaalisesti riippuvaisia toisistaan?

<table class="table">

  <thead>
    <tr>
      <th>Henkilo</th>
      <th>A: id</th>
      <th>A: nimi</th>
      <th>A: henkilötunnus</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>B: id</td>
      <td>?</td>
      <td>?</td>
      <td>?</td>
    </tr>
    <tr>
      <td>B: nimi</td>
      <td>?</td>
      <td>?</td>
      <td>?</td>
    </tr>
    <tr>
      <td>B: henkilötunnus</td>
      <td>?</td>
      <td>?</td>
      <td>?</td>
    </tr>
  </tbody>
</table>

Sarakkeen perusteella voi aina määritellä itsensä. Esimerkiksi `id -&gt; id` on aina totta.

<table class="table">

  <thead>
    <tr>
      <th>Henkilo</th>
      <th>A: id</th>
      <th>A: nimi</th>
      <th>A: henkilötunnus</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>B: id</td>
      <td>kyllä</td>
      <td>?</td>
      <td>?</td>
    </tr>
    <tr>
      <td>B: nimi</td>
      <td>?</td>
      <td>kyllä</td>
      <td>?</td>
    </tr>
    <tr>
      <td>B: henkilötunnus</td>
      <td>?</td>
      <td>?</td>
      <td>kyllä</td>
    </tr>
  </tbody>
</table>

Voimmeko tunnistaa nimen perusteella henkilön yksilöivän tunnisteen? Useammalla henkilöllä voi olla sama nimi, joten tämä ei pidä paikkansa. Voimmeko tunnistaa henkilötunnuksen perusteella henkilön yksilöivän tunnisteen? Henkilötunnus on uniikki, joten oletetaan että kyllä (tämä pätee tosin vain Suomessa..).

<table class="table">

  <thead>
    <tr>
      <th>Henkilo</th>
      <th>A: id</th>
      <th>A: nimi</th>
      <th>A: henkilötunnus</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>B: id</td>
      <td>kyllä</td>
      <td>ei</td>
      <td>kyllä</td>
    </tr>
    <tr>
      <td>B: nimi</td>
      <td>?</td>
      <td>kyllä</td>
      <td>?</td>
    </tr>
    <tr>
      <td>B: henkilötunnus</td>
      <td>?</td>
      <td>?</td>
      <td>kyllä</td>
    </tr>
  </tbody>
</table>

Voiko yksilöivän avaimen perusteella tunnistaa henkilön nimen? Kyllä.

<table class="table">

  <thead>
    <tr>
      <th>Henkilo</th>
      <th>A: id</th>
      <th>A: nimi</th>
      <th>A: henkilötunnus</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>B: id</td>
      <td>kyllä</td>
      <td>ei</td>
      <td>kyllä</td>
    </tr>
    <tr>
      <td>B: nimi</td>
      <td>kyllä</td>
      <td>kyllä</td>
      <td>?</td>
    </tr>
    <tr>
      <td>B: henkilötunnus</td>
      <td>?</td>
      <td>?</td>
      <td>kyllä</td>
    </tr>
  </tbody>
</table>

Loput jäävät omatoimiseen harjoitteluun.


###
  Toinen normaalimuoto
<% end %>



  Tietokantataulu on toisessa normaalimuodossa jos (1) se on ensimmäisessä normaalimuodossa ja (2) tietokantataulun sarakkeet (poislukien avaimet) ovat *funktionaalisesti riippuvaisia* tietokantataulun (yhdellä sarakkeella määritellystä) pääavaimesta.



  Jos tietokantataulun pääavain on määritelty yhden sarakkeen avulla, ovat kaikki tietokantataulun sarakkeet automaattisesti funktionaalisesti riippuvaisia pääavaimesta. Käytännössä siis, jos taulu on ensimmäisessä normaalimuodossa ja sillä on yhden sarakkeen avulla määritelty pääavain, on se automaattisesti toisessa normaalimuodossa.



  Jos taas tietokantataulun pääavain on määritelty useamman sarakkeen avulla, tulee tietokantataulun jokaisen sarakkeen olla riippuvainen koko avaimesta, eli osittaista riippuvuutta pääavaimesta ei sallita. Tarkastellaan tilannetta, missä tietokantataulun pääavain on määritelty useamman sarakkeen kautta ja tällainen tilanne tapahtuu.



  Oletetaan seuraavat tietokantataulut, joissa pääavaimet on alleviivattu. Ensimmäisessä kahdessa tietokantataulussa pääavain on id, kolmannessa taulussa pääavain on määrätty kahden viiteavaimen yhdistelmänä.


<ul>
  <li>Asiakas ((pk) <u>id</u>, nimi)</li>
  <li>Kauppa ((pk) <u>id</u>, nimi, osoite)</li>
  <li>Ostos ((fk) <u>asiakas_id</u> -&gt; Asiakas, (fk) <u>kauppa_id</u> -&gt; Kauppa, hinta, kaupunki)</li>
</ul>


  Taulut Asiakas ja Kauppa ovat ensimmäisessä ja toisessa normaalimuodossa.



  Tarkastellaan taulua Ostos. Taulun Ostos sarake hinta kertoo ostoksen hinnan. Sarake kaupunki kertoo missä ostos tehtiin.




<table class="table">
  <tr>
    <th colspan=3>Ostos ((fk) <u>asiakas_id</u> -&gt; Asiakas, (fk) <u>kauppa_id</u> -&gt; Kauppa, hinta, kaupunki)</th>
  </tr>
  <tr>
    <th>
      <u>
	asiakas_id
      </u>
    </th>
    <th>
      <u>
	kauppa_id
      </u>
    </th>
    <th>
      hinta
    </th>
    <th>
      kaupunki
    </th>
  </tr>
  <tr>
    <td>
      1
    </td>
    <td>
      1
    </td>
    <td>
      14.90
    </td>
    <td>
      Helsinki
    </td>
  </tr>
  <tr>
    <td>
      1
    </td>
    <td>
      3
    </td>
    <td>
      15.20
    </td>
    <td>
      Vantaa
    </td>
  </tr>
  <tr>
    <td>
      2
    </td>
    <td>
      1
    </td>
    <td>
      8.40
    </td>
    <td>
      Helsinki
    </td>
  </tr>
  <tr>
    <td>
      3
    </td>
    <td>
      2
    </td>
    <td>
      19.20
    </td>
    <td>
      Espoo
    </td>
  </tr>
  <tr>
    <td>
      3
    </td>
    <td>
      3
    </td>
    <td>
      10.40
    </td>
    <td>
      Vantaa
    </td>
  </tr>
  <tr>
    <td>
      4
    </td>
    <td>
      1
    </td>
    <td>
      12.20
    </td>
    <td>
      Helsinki
    </td>
  </tr>
  <tr>
    <td>
      ...
    </td>
    <td>
      ...
    </td>
    <td>
      ...
    </td>
    <td>
      ...
    </td>
  </tr>
</table>


  Kun tarkastelemme taulua Ostos, huomaamme, että tietokantataulun sarake kaupunki on funktionaalisesti riippuvainen sarakkeesta kauppa_id. Koska sarake kauppa_id on osa tietokantataulun pääavaimesta, tämä rikkoo toista normaalimuotoa. Yksi ratkaisu ongelmaan on kaupungin siirtäminen tauluun Kauppa.



<ul>
  <li>Asiakas ((pk) <u>id</u>, nimi)</li>
  <li>Kauppa ((pk) <u>id</u>, nimi, osoite, kaupunki)</li>
  <li>Ostos ((fk) <u>asiakas_id</u> -&gt; Asiakas, (fk) <u>kauppa_id</u> -&gt; Kauppa, hinta)</li>
</ul>


  Nyt jokainen ylläolevista tietokantatauluista on ensimmäisessä ja toisessa normaalimuodossa.



<% partial 'partials/hint', locals: { name: 'Kandidaattiavain' } do %>


    Toisen normaalimuodon voi määritellä myös kandidaattiavain-käsitteen kautta. Tietokantataulun kandidaattiavaimet määritellään niiden tietokantataulun sarakkeiden joukkona, joiden avulla tietokantataulun rivit voidaan yksilöidä. Toisin sanoen, kandidaattiavainjoukko mahdollistaa tietokantatauuln rivin yksilöimisen.



    Tietokantataululle voidaan määritellä tyypillisesti useampia kandidaattiavaimia, mutta näistä valitaan vain yksi tietokantataulun pääavaimeksi. Tarkastellaan taulua Henkilö, joka sisältää sarakkeet syntymäaika, etunimi, sukunimi ja puhelinnumero.



    Kandidaattiavaimia etsitään sarakkeiden avulla muodostetusta joukkojen joukosta: {{syntymäaika}, {etunimi}, {sukunimi}, {puhelinnumero}, {syntymäaika, etunimi}, {syntymäaika, sukunimi}, {syntymäaika, puhelinnumero}, {etunimi, sukunimi}, {etunimi, puhelinnumero}, {syntymäaika, etunimi, sukunimi}, {syntymäaika, etunimi, puhelinnumero}, {syntymäaika, sukunimi, puhelinnumero}, {etunimi, sukunimi, puhelinnumero}, {syntymäaika, etunimi, sukunimi, puhelinnumero}}.



    Jokaista joukkoa tarkastellaan niiden sisältämien sarakkeiden arvojoukkojen kautta. Jos joukolle on mahdollista löytää useampia rivejä, joissa kandidaattiavainjoukon arvot ovat samat, hylätään kandidaattiavain. Esimerkiksi useammalla henkilöllä voi olla sama syntymäaika, useammalla henkilöllä voi olla sama etunimi, ja useammalla henkilöllä voi olla sama sukunimi, joten {syntymäaika}, {etunimi}, {sukunimi} eivät ole kandidaattiavaimia. Vastaavasti joukko {etunimi, sukunimi} ei voi olla kandidaattiavain, sillä useammalla henkilöllä voi olla sama etunimi ja sukunimi.



    Tätä prosessia jatkamalla tunnistetaan lopullinen kandidaattiavainten joukko. Edellisessä taulussa oikeastaan yksikään esitellyistä joukoista ei ole kandidaattiavainjoukko jos oletamme, että useammalla henkilöllä voi olla sama puhelinnumero.



    Kandidaattiavainten avulla määriteltynä taulu on toisessa normaalimuodossa jos ja vain jos se on ensimmäisessä normaalimuodossa ja jokainen taulun kandidaattiavaimeen kuulumaton sarake on riippuvainen koko kandidaattiavaimen joukosta, mutta ei yksittäisestä joukon jäsenestä (jos joukkoon kuuluu useampi sarake).


<% end %>



###
  Kolmas normaalimuoto
<% end %>


  Kolmanteen normaalimuotoon liittyy oleellisesti käsite transitiivinen riippuvuus.



<% partial 'partials/hint', locals: { name: 'Transitiivinen riippuvuus' } do %>


    Transitiivisella riippuvuudella tarkoitetaan sitä, että sarake A on funktionaalisesti riippuvainen sarakkeesta C jonkun toisen sarakkeen kautta. Sarake A on transitiivisesti riippuvainen sarakkeesta C, jos sarake A on funktionaalisesti riippuvainen sarakkeesta B ja sarake B on funktionaalisesti riippuvainen sarakkeesta C. Tässä A, B ja C voivat olla myös sarakejoukkoja.


<% end %>


  Tietokantataulu on kolmannessa normaalimuodossa jos se on toisessa normaalimuodossa ja siinä olevat sarakkeet eivät ole transitiivisesti riippuvaisia taulun pääavaimesta.




  Jos tietokantataulu rikkoo kolmannen normaalimuodon, eli tietokantataulusta tunnistetaan sarakkeita, jotka ovat transitiivisesti riippuvaisia pääavaimesta, eriytetään ne omaksi taulukseen. Eräs klassinen esimerkki tällaisesta tilanteesta liittyy postinumeroon -- tarkastellaan seuraavaa taulua Osoite.



<table class="table">
  <tr>
    <th colspan=4>Osoite((pk) <u>id</u>, katuosoite, postinumero, postitoimipaikka)</th>
  </tr>
  <tr>
    <th>
      <u>
	id
      </u>
    </th>
    <th>
      katuosoite
    </th>
    <th>
      postinumero
    </th>
    <th>
      postitoimipaikka
    </th>
  </tr>
  <tr>
    <td>
      1
    </td>
    <td>
      Työpajankatu 13
    </td>
    <td>
      00580
    </td>
    <td>
      Helsinki
    </td>
  </tr>
  <tr>
    <td>
      2
    </td>
    <td>
      Työpajankatu 2 R1 C
    </td>
    <td>
      00580
    </td>
    <td>
      Helsinki
    </td>
  </tr>
  <tr>
    <td>
      3
    </td>
    <td>
      Siltavuorenranta 18
    </td>
    <td>
      00170
    </td>
    <td>
      Helsinki
    </td>
  </tr>
  <tr>
    <td>
      ...
    </td>
    <td>
      ...
    </td>
    <td>
      ...
    </td>
    <td>
      ...
    </td>
  </tr>
</table>



  Yllä olevassa tietokantataulussa havaitaan funktionaalinen riippuvuus `postinumero -&gt postitoimipaikka`, eli postitoimipaikan saa selvitettyä postinumeron perusteella. Samalla kaikki sarakkeet ovat selvitettävissä taulun pääavaimen kautta, joten taulusta löytyy myös transitiivinen riippuvuus. Ratkaisu tähän on -- esimerkiksi -- luoda erillinen taulu postinumeroille.


<ul>
  <li>Osoite((pk) <u>id</u>, katuosoite, postinumero)</li>
  <li>Postinumero((pk) <u>postinumero</u>, postitoimipaikka)</li>
</ul>



<% partial 'partials/hint', locals: { name: 'Muita normaalimuotoja' } do %>


    Ensimmäisen, toisen ja kolmannen normaalimuodon lisäksi tietokannan normalisointiin käytetään <a href="https://en.wikipedia.org/wiki/Boyce%E2%80%93Codd_normal_form" target="_blank" norel>Boyce-Codd -normaalimuotoa</a>, <a href="https://en.wikipedia.org/wiki/Fourth_normal_form" target="_blank" norel>Neljättä normaalimuotoa</a> ja <a href="https://en.wikipedia.org/wiki/Fifth_normal_form" target="_blank" norel">Viidettä normaalimuotoa</a>.



    Tämän kurssin puitteissa ensimmäiset kolme normaalimuotoa riittävät suunnitteluun.


<% end %>

