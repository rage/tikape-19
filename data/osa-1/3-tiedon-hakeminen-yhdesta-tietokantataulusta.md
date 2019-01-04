---
path: '/osa-1/3-tiedon-hakeminen-yhdesta-tietokantataulusta'
title: 'Tiedon hakeminen yhdestä tietokantataulusta'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- oppimistavoitteet

</text-box>


##  Structured Query Language (SQL)


Kun tietokantoja käytetään osana jokapäiväistä työtä, ei oletus jokaisen tietokantaa käyttävän tulee osata ohjelmoida" ole kovin mielekäs. Tämä käytännössä vaatisi jokaiselta ohjelmointiosaamista sekä ymmärrystä tallennetusta tiedosta ja tiedon fyysisestä esitysmuodosta. Tiedon fyysinen esitysmuoto vaihtelee tallennettavan tiedon mukaan, joten tiedon käsittelyyn tarvitaan parempi ratkaisu. Tätä ongelmaa ja työläyttä ratkaisemaan on luotu useampia korkeamman abstraktiotason esitystapoja, joita käytetään tietokannassa olevan tiedon hakemiseen ja tiedon muokkaamiseen.


Tällä kurssilla keskitytään Structured Query Language (**SQL**) -kieleen. Structured Query Language (jatkossa SQL) on 1980-luvulla standardoitu kieli tietokantakyselyiden tekemiseen. SQL-kielen avulla voidaan määritellä tallennettavan tiedon muoto, luoda ja muokata tietokantatauluja, lisätä tietoa tietokantatauluihin, muokata tietokantatauluissa olevaa tietoa sekä hakea tietoa tietokannoista. Merkittävä osa tällä hetkellä käytössä olevista tietokannanhallintajärjestelmistä mahdollistaa SQL-kielellä tehtyjen kyselyiden käyttämisen tietokannanhallintajärjestelmässä olevien tietokantojen ja tietokantataulujen käsittelyyn. Voidaan ajatella, että SQL-kielellä tehdyt kyselyt ovat kuvattu *rakenteellisella abstraktiotasolla*, eli SQL-kieltä käytettäessä tiedon lopulliseen esitysmuotoon kiintolevyllä ei oteta kantaa.


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

