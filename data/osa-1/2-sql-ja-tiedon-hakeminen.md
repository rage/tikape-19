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


Tällä kurssilla keskitytään Structured Query Language -kieleen. Structured Query Language (jatkossa SQL) on 1980-luvulla standardoitu kieli tietokantakyselyiden tekemiseen. SQL-kielen avulla voidaan määritellä tallennettavan tiedon muoto, luoda ja muokata tietokantatauluja, lisätä tietoa tietokantatauluihin, muokata tietokantatauluissa olevaa tietoa sekä hakea tietoa tietokannoista. Merkittävä osa tällä hetkellä käytössä olevista tietokannanhallintajärjestelmistä mahdollistaa SQL-kielellä tehtyjen kyselyiden käyttämisen tietokannanhallintajärjestelmässä olevien tietokantojen ja tietokantataulujen käsittelyyn.


Vuosien mittaan standardista on julkaistu useita versioita, joista viimeisin on vuodelta <a href="https://en.wikipedia.org/wiki/SQL:2016" target="_blank" norel>2016</a>. Tietokannanhallintajärjestelmät ja niiden eri versiot noudattavat SQL-kielen standardeja vaihtelevasti. Yhtä tietokannanhallintajärjestelmää varten luodut kyselyt eivät ole aina suoraan siirrettävissä toiseen tietokannanhallintajärjestelmään. On siis syytä huomioida että tietokannanhallintajärjestelmästä toiseen siirryttäessä joudutaan usein myös tekemään SQL-kyselyihin (pieniä) muutoksia. Tyypillisimpiä tietotyyppejä, joiden käsittelytapa vaihtelee eri tietokannanhallintajärjestelmien välillä ovat päivämäärät.


Kurssin toisessa osassa tutustutaan yhden tietokantataulun käsittelyyn SQL-kielellä. Opettelemme luomaan tietokantataulun, lisäämään tietokantatauluun tietoa, hakemaan tietokantataulusta tietoa sekä päivittämään ja poistamaan tietokantataulussa olevaa tietoa.


Käytämme tässä osassa SQLite-nimistä tietokannanhallintajärjestelmää.


<% partial 'partials/hint', locals: { name: 'SQLiten lataaminen ja käyttöönotto' } do %>


SQLiten saa ladattua osoitteesta <a href="https://www.sqlite.org/download.html" target="_blank" norel>https://www.sqlite.org/download.html</a>. Kun olet tallentanut (ja asentanut) SQLiten, käynnistä käyttöjärjestelmässä terminaali, ja kirjoita komento <code>sqlite3 tietokanta.db</code>.



Kyseinen komento luo tietokanta.db-nimisen tiedoston, joka sisältää käsittelemäsi tietokannan, ja avaa yhteyden kyseiseen tietokantaan.



Suorittamalla kyselyn "SELECT 1" sqlite tulostaa arvon 1.


<% partial 'partials/sample_output' do %>
kayttaja@kone:~/kansio/$ sqlite3 tietokanta.db
SQLite version 3.11.0 2016-02-15 17:29:24
Enter ".help" for usage hints.
sqlite> SELECT 1;
1
sqlite>
<% end %>


Voit käyttää kyseistä tietokantaa esimerkkien testaamiseen.


<% end %>



<% partial 'partials/hint', locals: { name: 'SQLiten konfigurointi' } do %>


SQLite:n voi myös konfiguroida oman mieleseksi määrittelemällä <code>.sqliterc</code>-tiedoston kotihakemistoon. Tällöin samoja asetuksia ei tarvitse määritellä jokaisen käynnistyksen yhteydessä.



<code>.sqliterc</code>-pikaohje (macOS/Linux):


<ol>
<li>Siirry kotihakemistoosi: <code>cd ~</code> tai <code>cd $HOME</code>.</li>
<li>Luo tiedosto nimeltä <code>.sqliterc</code> (jos sitä ei jo ole olemassa): <code>touch .sqliterc</code>.</li>
<li>Avaa tiedosto mieleisellä tekstieditorilla, esim. <code>nano .sqliterc</code>.</li>
<li>Lisää haluamasi asetukset erillisille riveille, tallenna muutokset ja poistu tekstieditorista. Useimmat järjestelmät vaativat terminaalin uudelleen käynnistämistä (tai ainakin uuden session avaamista) niin että SQLite lukee <code>.sqliterc</code>:n.</li>
</ol>


Esimerkiksi seuraavat asetukset voivat olla hyödyllisiä <code>.sqliterc</code>-tiedostossa:


<ul>
<li><code>.mode column</code> – tulostaa kyselyn tuloksen sarakkeissa.</li>
<li><code>.headers on</code> – näyttää sarakkeiden otsikot.</li>
<li><code>.timer on</code> – tulostaa kyselyn tuloksen jälkeen kyselyyn kuluneen ajan.</li>
<li><code>.prompt "# "</code> – käyttää merkkijonoa <code># </code> rivin alussa normaalin <code>sqlite> </code> sijaan.</li>
</ul>


Tiedostoon voi myös lisätä <code>PRAGMA</code>-lauseita, kuten esimerkiksi <code>PRAGMA FOREIGN_KEYS = ON;</code>P jolloin SQLite tottelee viiteavainten rajoitteita.


<% end %>



<% partial 'partials/hint', locals: { name: 'SQL-kyselyiden muodosta'} do %>


SQL-kieli on "case insensitive", eli sillä, että onko kysely kirjoitettu isoilla vai pienillä kirjaimilla kei ole kyselyn suorituksen kannalta merkitystä. Voimme kirjoittaa komennon <code>SELECT</code> yhtä hyvin muodossa <code>select</code> tai <code>Select</code> -- sama pätee myös taulujen ja sarakkeiden nimille.



Noudatamme tällä kurssilla seuraavaa käytäntöä:


<ol>
<li>Kaikki SQL-kielen komennot, kuten <code>SELECT</code>, <code>FROM</code> ja <code>WHERE</code>, kirjoitetaan isolla.</li>
<li>Taulujen nimet kirjoitetaan isolla alkukirjaimella. Esimerkiksi <code>Henkilo</code> ja <code>Opiskelija</code>.</li>
<li>Taulujen sarakkeet eli attribuutit kirjoitetaan pienellä. Esimerkiksi <code>nimi</code> ja <code>syntymavuosi</code>.</li>
</ol>

<% end %>




<% partial 'partials/material_sub_heading' do %>
Tiedon hakeminen tietokantataulusta: SELECT
<% end %>


Tiedon hakeminen tietokantataulusta onnistuu **SELECT**-lauseella. Avainsanaa <code>SELECT</code> seuraa haettavat sarakkeet, tietokantataulun nimi sekä mahdollisesti rajausehto tai rajausehtoja.



Ilman rajausehtoa kyselyn rakenne on seuraava.


<% partial 'partials/sql_highlight' do %>
SELECT *sarake1*, *sarake2* FROM *TAULUN_NIMI*
<% end %>


Rajausehdon kanssa kyselyn rakenne on seuraava.

```sql
SELECT sarake FROM Taulu WHERE rajausehto
WHERE *rajausehto*
```



Oletetaan, että käytössämme on seuraava taulu, jonka nimi on Henkilo.


<table class="table">
<thead>
<tr>
<th>syntymavuosi</th>
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
<tr>
<td>1947</td>
<td>Raymond</td>
</tr>
<tr>
<td>1923</td>
<td>Edgar</td>
</tr>
</tbody>
</table>



Jos haluamme listata kaikki taulun henkilöt, kysely olisi muotoa.



<% partial 'partials/sql_highlight' do %>
SELECT syntymavuosi, nimi FROM Henkilo
<% end %>


Valinta henkilöihin, jotka ovat syntyneet ennen vuotta 1950 onnistuu seuraavasti.


<% partial 'partials/sql_highlight' do %>
SELECT syntymavuosi, nimi FROM Henkilo WHERE syntymavuosi &lt; 1950
<% end %>


<% partial 'partials/hint', locals: { name: 'Kaikki sarakkeet'} do %>


Hakukyselyn <code>SELECT</code>-komentoa seuraava sarakelistaus voidaan korvata tähtimerkillä * jos halutaan hakea kaikki tietokantataulun sarakkeet. Olettaen, että taulussa Henkilo on vain sarakkeet syntymavuosi ja nimi, kysely:


<% partial 'partials/sql_highlight' do %>
SELECT syntymavuosi, nimi FROM Henkilo WHERE syntymavuosi &lt; 1950
<% end %>


Voidaan korvata kyselyllä


<% partial 'partials/sql_highlight' do %>
SELECT * FROM Henkilo WHERE syntymavuosi &lt; 1950
<% end %>

<% end %>




Jos sarakkeen arvot ovat merkkijonoja, kuten nimi, voi hakuehdossa käyttää <code>LIKE</code>-operaatiota. Tämän avulla hakutuloksia voi rajata osittaisen merkkijonon avulla. Esimerkiksi kysely <code>SELECT * FROM Henkilo WHERE nimi LIKE '%a%'</code> hakee kaikki henkilöt, joiden nimessä esiintyy a-kirjain.




<% partial 'partials/hint', locals: { name: 'Loogiset operaatiot'} do %>


Rajausehtoihin voi lisätä loogisia operaatioita kyselyjen tulosten rajaamiseksi. Operaatio 'ja', eli kahden rajausehdon yhdistäminen, toimii avainsanalla <code>AND</code>. Esimerkiksi kysely <code>SELECT * FROM Henkilo WHERE nimi = 'Ted' AND syntymavuosi = 1920</code> listaa vain ne henkilöt, joiden nimi on 'Ted' ja joiden syntymävuosi on 1920.



Operaation 'tai' lisääminen on myös mahdollista. Esimerkiksi kysely <code>SELECT * FROM Henkilo WHERE nimi = 'Matti' OR nimi = 'Maija'</code> listaisi kaikki ne henkilöt, joiden nimi on Matti tai Maija.




Kyselyissä toimivat myös suurempi kuin <code>&gt;</code> ja pienempi kuin <code>&lt;</code> -operaatiot.




Ehtoja voi myös yhdistää, jonka lisäksi suluilla voi rajata suoritusjärjestystä. Tutki kyselyä  <code>SELECT * FROM Kurssisuoritus WHERE (kurssi = 'Ohjelmoinnin perusteet' OR kurssi = 'Ohjelmoinnin jatkokurssi') AND arvosana = 3</code> ja mieti mitä se tekee.



<% end %>

# TODO: Tulosten järjestäminen



- joinit
- select * from a join b on a.id = b.a_id



<% partial 'partials/material_heading' do %>
  Tiedon hakeminen kahdesta tai useammasta taulusta
<% end %>


<p>
  Kurssimateriaalin ensimmäisessä kahdessa osassa tutustuimme tietokannan suunnitteluun. Olemme luoneet käsiteanalyysin avulla luokkakaavion (tai käsitekaavion) ja tehneet käsitekaaviosta tietokantakaavion. Tutustuimme toisessa osassa myös SQL-kieleen, jonka tietokantakaaviosta luodaan konkreettinen tietokanta tietokannanhallintajärjestelmään. Olemme harjoitelleet myös hieman muunlaisia SQL-kyselyitä. Tutustutaan seuraavaksi tiedon hakemiseen useammasta taulusta.
</p>

<p>
  Tässä luvussa oletetaan, että tietokantataulu on seuraava:
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



<% partial 'partials/material_sub_heading' do %>
  Kahden tietokantataulun rivien yhdistäminen
<% end %>

<p>
  SQL-kielen SELECT-lauseen avainsanaa FROM seuraa taulu, josta tietoa haetaan. Esimerkiksi lause <code>SELECT * FROM Asiakas</code> tulostaa kaikki Asiakas-taulun rivit.
</p>

<p>
  Haun ei tarvitse rajoittua yhteen tauluun. Voimme määritellä haun kohteeksi useampia tauluja listaamalla ne FROM-avainsanan jälkeen pilkulla eroteltuna seuraavasti <code>SELECT * FROM Asiakas, Tilaus</code>. Lauseen tulos ei kuitenkaan ole tyypillisesti toivottu: <strong>jos emme kerro miten taulujen rivit yhdistetään, on lopputuloksessa kaikki ensimmäisen taulun rivit yhdistettynä kaikkiin toisen taulun riveihin</strong> -- esimerkiksi jokainen taulun Asiakas rivi yhdistettynä jokaiseen taulun Tilaus riviin.
</p>

<p>
  Tällaisen kyselyn tulostaulu listaa jokaiseen asiakkaaseen kytkettynä jokaisen tilauksen, jolloin tulostaulun riveistä ei voi päätellä kenelle mikäkin tilaus kuuluu.
</p>

<p>
  Taulujen yhdistäminen tapahtuu kyselyä rajaavan <code>WHERE</code>-ehdon avulla siten, että taulun pääavainta verrataan siihen viittaavan taulun viiteavaimeen. Esimerkiksi, jos haluamme vain asiakkaat sekä asiakkaisiin liittyvät tilaukset, hyödynnämme Asiakas-taulun pääavainta id sekä Tilaus-taulussa olevaa Asiakas-taulun pääavaimeen viittaavaa viiteavainta asiakas_id. Käytännössä tämä tapahtuu ehdolla <code>WHERE Asiakas.id = Tilaus.asiakas_id</code>.
</p>

<p>
  Kokonaisuudessaan lause "Listaa jokaisen asiakkaan tekemät tilaukset" kirjoitetaan seuraavasti:
</p>

<% partial 'partials/sql_highlight' do %>
SELECT * FROM Asiakas, Tilaus WHERE Asiakas.id = Tilaus.asiakas_id
<% end %>


<% partial 'partials/material_sub_heading' do %>
  Tulosten nimeäminen
<% end %>

<p>
  Useamman taulun yhdistäminen onnistuu samalla tavalla. Kaikki taulut, jotka haluamme lisätä kyselyyn, tulevat FROM-avainsanan jälkeen. Jos tauluja on useampi, on hyvä varmistaa, että kaikki taulut yhdistetään avainkenttien perusteella.
</p>

<p>
  Kun yhdistämme useampia tauluja, päädymme helposti tilanteeseen, missä tuloksessa on myös useampia samannimisiä kenttiä. Esimerkiksi tilaustietokannassa taulut Asiakas, Ravintola, Annos ja RaakaAine kukin sisältää attribuutin nimi. Voimme määritellä taulun, mihin haettava kenttä liittyy, pisteoperaattorin avulla. Kyselyn <code>SELECT nimi FROM Asiakas</code> voi siis kirjoittaa myös muodossa <code>SELECT Asiakas.nimi FROM Asiakas</code>.
</p>

<p>
  Voimme toisaalta myös nimetä kentän tulostusmuodon seuraavasti <code>SELECT Asiakas.nimi AS asiakas FROM Asiakas</code>. Edelläoleva kysely hakee Asiakas-taulusta asiakkaan nimen, mutta tulostaa nimet otsikolla 'asiakas'.
</p>

<p>
  Alla oleva kysely listaa asiakkaan sekä kaikki asiakkaan tilauksissa olleet annokset. Jokainen annos tulee omalle rivilleen, joten saman nimisellä asiakkaalla voi olla listauksessa useita eri annoksia.
</p>


<% partial 'partials/sql_highlight' do %>
  SELECT Asiakas.nimi AS asiakas, Annos.nimi AS annos
      FROM Asiakas, Tilaus, TilausAnnos, Annos
      WHERE Asiakas.id = Tilaus.asiakas_id
          AND TilausAnnos.tilaus_id = Tilaus.id
          AND Annos.id = TilausAnnos.annos_id;
<% end %>



<% partial 'partials/material_sub_heading' do %>
  Taulujen yhdistämisestä WHERE-kyselyllä
<% end %>

<p>
  Jotta tietokantakysely tulostaa oleelliset rivit, on jokainen kyselyyn lisättävä taulu kytkettävä toisiinsa. Eräs hyödyllinen tapa taulujen yhdistämiseen tarvittujen kyselyjen hahmottamiseen on tietokantakaavion katsominen. Jos tavoitteena olisi esimerkiksi etsiä kaikki raaka-aineet, joita Leevi-niminen asiakas on saattanut syödä, ensimmäinen askel on etsiä polku taulusta <code>Asiakas</code> tauluun <code>RaakaAine</code>.
</p>

<p>
  Aloitamme taulusta <code>Asiakas</code> ja etsimme polkua tauluun <code>RaakaAine</code>. Jotta pääsemme taulusta Asiakas tauluun RaakaAine, tulee meidän vierailla tauluissa <code>TilausAnnos</code>, <code>Annos</code> ja <code>AnnosRaakaAine</code>.
</p>

<ol>
  <li>
    Haemme aluksi asiakkaan nimeltä Leevi.

    <% partial 'partials/sql_highlight' do %>
SELECT Asiakas.nimi AS asiakas
    FROM Asiakas
    WHERE Asiakas.nimi = 'Leevi';
    <% end %>
  </li>


  <li>
    Kytketään tähän seuraavaksi kaikki Leevin tekemät tilaukset.

    <% partial 'partials/sql_highlight' do %>
SELECT Asiakas.nimi AS asiakas
    FROM Asiakas, Tilaus
    WHERE Asiakas.nimi = 'Leevi'
        AND Tilaus.asiakas_id = Asiakas.id;
    <% end %>
  </li>


  <li>
    Yhdistämme edelliseen kyselyyn taulun TilausAnnos.

    <% partial 'partials/sql_highlight' do %>
SELECT Asiakas.nimi AS asiakas
    FROM Asiakas, Tilaus, TilausAnnos
    WHERE Asiakas.nimi = 'Leevi'
        AND Tilaus.asiakas_id = Asiakas.id
        AND TilausAnnos.tilaus_id = Tilaus.id;
    <% end %>
  </li>


  <li>
    Yhdistämme edelliseen kyselyyn taulun Annos.

    <% partial 'partials/sql_highlight' do %>
SELECT Asiakas.nimi AS asiakas
    FROM Asiakas, Tilaus, TilausAnnos, Annos
    WHERE Asiakas.nimi = 'Leevi'
        AND Tilaus.asiakas_id = Asiakas.id
        AND TilausAnnos.tilaus_id = Tilaus.id
        AND Annos.id = TilausAnnos.annos_id;
    <% end %>
  </li>

  <li>
    Yhdistämme edelliseen kyselyyn taulun AnnosRaakaAine.

    <% partial 'partials/sql_highlight' do %>
SELECT Asiakas.nimi AS asiakas
    FROM Asiakas, Tilaus, TilausAnnos, Annos, AnnosRaakaAine
    WHERE Asiakas.nimi = 'Leevi'
        AND Tilaus.asiakas_id = Asiakas.id
        AND TilausAnnos.tilaus_id = Tilaus.id
        AND Annos.id = TilausAnnos.annos_id
        AND AnnosRaakaAine.annos_id = Annos.id;
    <% end %>
  </li>


  <li>
    Yhdistämme edelliseen kyselyyn taulun RaakaAine.

    <% partial 'partials/sql_highlight' do %>
SELECT Asiakas.nimi AS asiakas
    FROM Asiakas, Tilaus, TilausAnnos, Annos, AnnosRaakaAine, RaakaAine
    WHERE Asiakas.nimi = 'Leevi'
        AND Tilaus.asiakas_id = Asiakas.id
        AND TilausAnnos.tilaus_id = Tilaus.id
        AND Annos.id = TilausAnnos.annos_id
        AND AnnosRaakaAine.annos_id = Annos.id
        AND RaakaAine.id = AnnosRaakaAine.raaka_aine_id;
    <% end %>
  </li>


  <li>
    Lopulta lisäämme raaka-aineen nimien SELECT-komentoon.

    <% partial 'partials/sql_highlight' do %>
SELECT Asiakas.nimi AS asiakas, RaakaAine.nimi AS raaka_aine
    FROM Asiakas, Tilaus, TilausAnnos, Annos, AnnosRaakaAine, RaakaAine
    WHERE Asiakas.nimi = 'Leevi'
        AND Tilaus.asiakas_id = Asiakas.id
        AND TilausAnnos.tilaus_id = Tilaus.id
        AND Annos.id = TilausAnnos.annos_id
        AND AnnosRaakaAine.annos_id = Annos.id
        AND RaakaAine.id = AnnosRaakaAine.raaka_aine_id;
    <% end %>
  </li>

</ol>

<p>
  Huomaa, että jokaista askelta voi ja kannattaa testata tietokannanhallintajärjestelmän tarjoamassa konsolissa.
</p>

<% partial 'partials/hint', locals: { name: 'DISTINCT valitsee vain uniikit rivit' } do %>

  <p>
    Entä jos haluaisimme tietää vain ne henkilöt, joiden annoksessa on ollut paprikaa raaka-aineena? Tämä onnistuu edellistä kyselyä muokkaamalla näppärästi.
  </p>

  <% partial 'partials/sql_highlight' do %>
  SELECT Asiakas.nimi AS asiakas
      FROM Asiakas, Tilaus, TilausAnnos, Annos, AnnosRaakaAine, RaakaAine
          WHERE RaakaAine.nimi = 'Paprika'
          AND Tilaus.asiakas_id = Asiakas.id
          AND TilausAnnos.tilaus_id = Tilaus.id
          AND Annos.id = TilausAnnos.annos_id
          AND AnnosRaakaAine.annos_id = Annos.id
          AND RaakaAine.id = AnnosRaakaAine.raaka_aine_id;
  <% end %>

  <p>
    <strong>Mutta!</strong> Jos henkilö on tehnyt useamman Paprikaa sisältäneen tilauksen -- tai yhteen tilaukseen liittyy useampi annos, jossa esiintyy Paprikaa -- on tulostuksessa jokaista Paprikaa sisältänyttä annosta kohden oma rivi. Tällöin henkilön nimi tulostuu kerran jokaista tulosriviä kohden.
  </p>

  <p>
    Jos tulostukseen haluaa vain uniikit rivit, tulee kyselyyn lisätä komento <code>DISTINCT</code>. Kun SELECT-lauseessa on komento DISTINCT, tulostuksen rivit ovat uniikkeja.
  </p>


  <% partial 'partials/sql_highlight' do %>
    SELECT DISTINCT Asiakas.nimi AS asiakas
        FROM Asiakas, Tilaus, TilausAnnos, Annos, AnnosRaakaAine, RaakaAine
            WHERE RaakaAine.nimi = 'Paprika'
            AND Tilaus.asiakas_id = Asiakas.id
            AND TilausAnnos.tilaus_id = Tilaus.id
            AND Annos.id = TilausAnnos.annos_id
            AND AnnosRaakaAine.annos_id = Annos.id
            AND RaakaAine.id = AnnosRaakaAine.raaka_aine_id;
  <% end %>

<% end %>




<% partial 'partials/material_sub_heading' do %>
  Taulujen yhdistämisestä JOIN-kyselyillä
<% end %>


<p>
  Kyselyssä, missä taulujen rivit yhdistetään WHERE-ehdon ja avainten perusteella, valitaan näytettäväksi vain ne rivit, jotka täyttävät annetun ehdon. Entä jos haluaisimme nähdä myös ne kurssit, joita kukaan ei ole suorittanut? Tämä ei ole suoraviivaista WHERE-ehdon kautta rakennetun kyselyn avulla.
</p>

<p>
  Vuonna 1992 julkaistu SQL-standardin versio toi mukanaan JOIN-kyselyt, joiden avulla edellä määritelty ongelma ratkeaa -- pienen harjoittelun kautta. Tutustutaan seuraavaksi aiemmin oppimaamme taulujen yhdistämistapaa tukeviin erityyppisiin JOIN-kyselyihin.
</p>


<% partial 'partials/material_sub_sub_heading' do %>
  INNER JOIN
<% end %>

<p>
  Edellä tutuksi tullut kysely <code>SELECT * FROM Asiakas, Tilaus WHERE Asiakas.id = Tilaus.asiakas_id</code> valitsee vastaukseen vain ne rivit, joiden kohdalla ehto <em>Asiakas.id = Tilaus.asiakas_id</em> pätee, eli missä Asiakkaan id-sarakkeen (pääavaimen) arvo on sama kuin Tilaus-taulun asiakas_id-sarakkeen (viiteavain).
</p>

<p>
  Edellinen kysely voidaan kirjoittaa myös muodossa <code>SELECT * FROM Asiakas INNER JOIN Tilaus ON Asiakas.id = Tilaus.asiakas_id</code>.
</p>

<p>
  Jos haluamme kyselyyn useampia tauluja, lisätään ne INNER JOIN -komennon avulla kyselyn jatkoksi. Esimerkiksi kaksi seuraavaa kyselyä ovat toiminnallisuudeltaan samankaltaiset.
</p>

<% partial 'partials/sql_highlight' do %>
SELECT Asiakas.nimi AS asiakas, Tilaus.aika AS tilausaika, Annos.nimi AS annos
    FROM Asiakas, Tilaus, TilausAnnos, Annos
    WHERE Asiakas.id = Tilaus.asiakas_id
        AND TilausAnnos.tilaus_id = Tilaus.id
        AND Annos.id = TilausAnnos.annos_id;
<% end %>

<% partial 'partials/sql_highlight' do %>
SELECT Asiakas.nimi AS asiakas, Tilaus.aika AS tilausaika, Annos.nimi AS annos
    FROM Asiakas
    INNER JOIN Tilaus ON Asiakas.id = Tilaus.asiakas_id
    INNER JOIN TilausAnnos ON TilausAnnos.tilaus_id = Tilaus.id
    INNER JOIN Annos ON Annos.id = TilausAnnos.annos_id
<% end %>

<p>
  Kyselyn <em>INNER JOIN</em> avulla voimme siis tehdä kutakuinkin saman työn kuin aiemman WHERE-ehdon avulla, eli valita mukaan vain ne rivit, joiden kohdalla ehto pätee.
</p>


<% partial 'partials/material_sub_sub_heading' do %>
  LEFT JOIN
<% end %>

<p>
  Mikä tekee taulujen liitoksesta JOIN-kyselyn avulla WHERE-ehtoa monipuolisemman, on se, että JOIN-kyselyn avulla voidaan määritellä kyselyehtoa täyttämättömille riveille toiminnallisuutta. Avainsanalla <code>LEFT JOIN</code> voidaan määritellä kyselyn tulos sellaiseksi, että ehdon täyttävien rivien lisäksi vastaukseen sisällytetään kaikki FROM-avainsanaa seuraavan taulun rivit, joille liitosehto ei täyttynyt.
</p>

<p>
  Allaoleva kysely listaa tilauksia tehneiden asiakkaiden lisäksi myös ne asiakkaat, joilla ei ole yhtäkään tilausta. Tällöin tilaukseen liittyvä vastauksen osa jää tyhjäksi.
</p>

<% partial 'partials/sql_highlight' do %>
SELECT Asiakas.nimi AS asiakas, Tilaus.aika AS tilausaika
    FROM Asiakas
    LEFT JOIN Tilaus ON Asiakas.id = Tilaus.asiakas_id
<% end %>


<% partial 'partials/material_sub_sub_heading' do %>
  Liitostyypit lyhyesti
<% end %>

<p>
  Kyselyn JOIN-tyypin voi muotoilla usealla eri tavalla:
</p>

<ul>
  <li>
    <code>INNER JOIN</code> -- palauta vain ne rivit, joihin valintaehto kohdistuu.
  </li>
  <li>
    <code>LEFT JOIN</code> -- palauta kaikki FROM-komentoa seuraavan taulun rivit, ja liitä niihin LEFT JOIN-komentoa seuraavan taulun rivit niiltä kohdin, kuin se on ON-liitosehdossa määritellyn ehdon mukaan mahdollista
  </li>
  <li>
    <code>RIGHT JOIN</code> -- palauta kaikki RIGHT JOIN-komentoa seuraavan taulun rivit, ja liitä niihin FROM-komentoa seuraavan taulun rivit niiltä kohdin, kuin se on ON-liitosehdossa määritellyn ehdon mukaan mahdollista
  </li>
  <li>
    <code>FULL JOIN</code> -- palauta kaikki FROM-komentoa seuraavan taulun rivit sekä kaikki FULL JOIN-komentoa seuraavan taulun rivit, ja liitä ne toisiinsa niiltä kohdin, kuin se on ON-liitosehdossa määritellyn ehdon mukaan mahdollista
  </li>
</ul>

<p>
  <em>
    Valitettavasti SQLite ei tue RIGHT JOIN ja FULL JOIN -tyyppisiä kyselyitä.
  </em>
</p>


<% partial 'partials/hint', locals: { name: 'Visuaalinen opas JOIN-kyselyihin' } do %>

  <p>
    C.L. Moffatt on kirjoittanut hyvän yhteenvedon erilaisista JOIN-tyypeistä. Tutustu yhteenvetoon osoitteessa <a href="http://www.codeproject.com/Articles/33052/Visual-Representation-of-SQL-Joins" target="_blank">http://www.codeproject.com/Articles/33052/Visual-Representation-of-SQL-Joins</a>.
  </p>

  <figure>
    <img src="/img/viikko3/moffatt-visual_joins.png"/>
    <p>&nbsp;</p>
    <figcaption>Yhteenveto erilaisista JOIN-kyselyistä ja niiden merkityksistä joukkojen kautta visualisoituna.</figcaption>
  </figure>

<% end %>

