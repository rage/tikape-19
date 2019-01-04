---
path: '/osa-5/4-tietokantatransaktiot'
title: 'Tietokannan eheys ja tietokantatransaktiot'
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet käsitteen tietokannan eheys ja tietokantatransaktio. Tiedät milloin tietokantatransaktioita käytetään. Tiedät tietokannanhallintajärjestelmältä vaadittuja ominaisuuksia, joita tarvitaan tietokantatransaktioiden toimintaan.

</text-box>



<% partial 'partials/material_heading' do %>
  Tietokannan eheys ja transaktiot
<% end %>

<p>
  Eheydellä viitataan tallennetun tiedon oikeellisuuteen. Tietokannanhallintajärjestelmä ylläpitää tietokannan eheyttä jatkuvasti. Esimerkiksi sarakkeen, joka on määritelty sisältämään vain numeerista tietoa, ei pitäisi sisältää tekstimuotoista tietoa. Vastaavasti viiteavainten tulee viitata aina olemassaolevaan tietoon.
</p>

<p>
  Eheyden ylläpitämisen sekä kohta tutuksi tulevien tietokantatransaktioiden ymmärtämiseksi on hyvä tuntea tietokannan toimintaa sovellustasolla. Kurssin ensimmäisessä osassa tarkasteltiin tiedon käsittelyä tiedostoissa -- tietokanta käyttää kiintolevyä tiedon tallentamiseen, mutta rivien käsittely tapahtuu (keskus)muistissa. Kun riviä halutaan päivittää, se haetaan ensin kovalevyltä muistiin, päivitetään ja viedään takaisin levylle.
</p>

<p>
  Keskusmuistin ongelma on se, että sen sisältö häviää esimerkiksi sähkökatkoksen sattuessa tai palvelimen kaatuessa. Havainnollistetaan ongelmallisuutta esimerkeillä:
</p>

<ul>
  <li>Annetaan kaikille yrityksen 1000000 kuukausipalkkaiselle työntekijälle 5% palkan korotus. <code>UPDATE Palkat SET kkpalkka = kkpalkka * 1,05</code> Mitä jos tietokantapalvelin kaatuu, kun vasta 10000 muutettua riviä on tallennettu levylle? 990000 vihaista työntekijää jää ilman palkankorotusta? Tarvitaan jokin keino varmistaa, että päivitys tehdään kokonaan tai ei lainkaan.</li>
  <li>Entä jos palkkojen maksuun liittyvä prosessi lukee palkkatietoja juuri samalla kun niitä ollaan päivittämässä? Lukuoperaatio voi lukea esimerkiksi vain tietyn toimipaikan työntekijöiden palkat - 100 riviä. Jos päivitys on yhtäaikaa kesken, voi käydä niin, että osaan luetuista riveistä on ehditty jo tehdä päivitys ja osaan ei. Nyt osa työntekijöistä saa syyskuun palkkansa korotettuna ja osa ei? Tarvitaan jokin keino hallita yhtäaikaisia prosesseja.</li>
</ul>


<% partial 'partials/material_sub_heading' do %>
  Tietokantatransaktiot
<% end %>

<p>
  Tietokantatransaktiot ratkaisevat edellä mainitut ongelmat. Ongelmat voidaan jakaa kahteen kategoriaan:
</p>

<ul>
  <li>Operaatioden keskeytymiset järjestelmän kaatuessa, häiriötilanteissa tai hallituissa keskeytyksissä</li>
  <li>Samanaikaset prosessit</li>
</ul>

<p>
  Tietokantatransaktio sisältää yhden tai useamman tietokantaan kohdistuvan operaation, jotka suoritetaan (järjestyksessä) kokonaisuutena. Jos yksikin operaatio epäonnistuu, kaikki operaatiot perutaan, ja tietokanta palautetaan tilaan, missä se oli ennen transaktion aloitusta. Klassinen esimerkki tietokantatransaktiosta on tilisiirto, missä nostetaan rahaa yhdeltä tililtä, ja siirretään rahaa toiselle tilille. Jos tilisiirron suoritus ei onnistu -- esimerkiksi rahan lisääminen toiselle tilille epäonnistuu -- tulee myös rahan nostaminen toiselta tililtä perua.
</p>

<p>
  Jokainen tietokantakysely suoritetaan omassa transaktiossaan, mutta, käyttäjä voi myös määritellä useamman kyselyn saman transaktion sisälle. Transaktio aloitetaan komennolla <code>BEGIN TRANSACTION</code>, jota seuraa kyselyt, ja lopulta komento <code>COMMIT</code>. Oletetaan, että käytössämme on taulu <code>Tili(id, saldo)</code>.
</p>

<% partial 'partials/sql_highlight' do %>
CREATE TABLE Tili (
    id integer PRIMARY KEY,
    saldo NOT NULL
);
<% end %>

<p>
  Tilisiirto kahden tilin välillä toteutetaan yhtenä transaktiona seuraavasti.
</p>

<% partial 'partials/sql_highlight' do %>
BEGIN TRANSACTION;
  UPDATE Tili SET saldo = saldo - 10 WHERE id = 1;
  UPDATE Tili SET saldo = saldo + 10 WHERE id = 2;
COMMIT;
<% end %>

<p>
  Ylläolevassa transaktiossa suoritetaan kaksi kyselyä, mutta tietokannan näkökulmasta toiminto on <em>atominen</em>, eli sitä ei voi pilkkoa osiin. Komennon <code>COMMIT</code> yhteydessä muutokset joko tallennetaan kokonaisuudessaan tietokantaan, tai tietokantaan ei tehdä minkäänlaisia muutoksia.
</p>

<p>
  Tietokantatransaktiota kirjoittaessa, ohjelmoija voi huomata tehneensä virheen. Tällöin suoritetaan komento <code>ROLLBACK</code>, joka peruu aloitetun transaktion aikana tehdyt muutokset. Suoritettua (<code>COMMIT</code>) tietokantatransaktiota ei voi perua.
</p>

<p>
  Alla esimerkki kahdesta tietokantatransaktiosta. Ensimmäinen perutaan, sillä siinä yritettiin vahingossa siirtää rahaa väärälle tilille. Toinen suoritetaan. Kokonaisuudessaan allaolevan kyselyn lopputulos on se, että tililtä 1 on otettu 10 rahayksikköä, ja tilille 2 on lisätty 10 rahayksikköä.
</p>

<% partial 'partials/sql_highlight' do %>
BEGIN TRANSACTION;
  UPDATE Tili SET saldo = saldo - 10 WHERE id = 1;
  UPDATE Tili SET saldo = saldo + 10 WHERE id = 3;
ROLLBACK;

BEGIN TRANSACTION;
  UPDATE Tili SET saldo = saldo - 10 WHERE id = 1;
  UPDATE Tili SET saldo = saldo + 10 WHERE id = 2;
COMMIT;
<% end %>

<p>
  Jokainen tietokantakysely -- myös "yhden rivin kyselyt" -- suoritetaan transaktion sisällä. Tietokannanhallintajärjestelmän vastuulla on vahtia, että transaktiot suoritetaan peräkkäin siten, että samaa tietoa ei voida käsitellä useammasta transaktiosta saman aikaan.
</p>


<% partial 'partials/material_sub_heading' do %>
  Tietokantatransaktiot ja rajoitteet
<% end %>

<p>
  Koska tietokannanhallintajärjestelmä näkee transaktioiden sisällä suoritettavat käskyt atomisina, eli yksittäisenä kokonaisuutena, voivat tietokantatauluun määritellyt rajoitteet olla hetkellisesti rikki, kunhan ne transaktion suorituksen jälkeen ovat kunnossa.
</p>

<p>
  Esimerkiksi suomen kirjanpitosääntöjen mukaan jokaisessa yrityksessä tulee olla kaksinkertainen kirjanpito. Tässä jokaisen tilitapahtuman yhteydessä tulee merkitä sekä mistä raha on otettu (debit), että mihin raha on laitettu (credit). Tällaisessa järjestelmässä tulee olla (esimerkiksi) tietokantataulu <code>Kirjanpitotapahtuma</code>, johon muutokset merkitään.
</p>

<% partial 'partials/sql_highlight' do %>
CREATE TABLE Kirjanpitotapahtuma
(
    id integer PRIMARY KEY,
    paivamaara date NOT NULL,
    kirjanpitotili integer NOT NULL,
    kuvaus text NOT NULL,
    debit integer NOT NULL,
    credit integer NOT NULL,
    FOREIGN KEY(kirjanpitotili) REFERENCES Tili(id),
    CONSTRAINT kirjaus_tasmaa CHECK (SUM(debit) = SUM(credit))
)
<% end %>

<p>
  Nyt yhden transaktion sisällä voi tehdä useamman kirjanpitotapahtuman, kunhan transaktion suorituksen yhteydessä kirjanpitotapahtumien debit- ja credit-sarakkeiden summa täsmää. Yllä tietokantataulun luomiskomentoon on lisätty rajoite (<code>CONSTRAINT</code>), jonka avulla tietokantatauluun voidaan lisätä sääntöjä, joiden tulee olla aina transaktion jälkeen voimassa.
</p>

<% partial 'partials/exercise', locals: { name: 'Tietokantatransaktio' } do %>

  <p>
    Netti on täynnä hyviä oppaita. Osoitteessa <a href="http://www.sqlitetutorial.net/sqlite-java/transaction/" target="_blank">http://www.sqlitetutorial.net/sqlite-java/transaction/</a> on eräs tällainen. Tutustu oppaaseen.
  </p>

  <p>
    Luo tehtäväpohjaan oppaan kuvaama tiedosto <code>test.db</code> sekä ohjelma, jossa lisäät tietokantaan useamman rivin saman transaktion sisällä.
  </p>

  <p>
    <em>
      Tässä tehtävässä ei ole testejä. Palauta tehtävä se toimii toivotulla tavalla.
    </em>
  </p>

<% end %>


<% partial 'partials/material_sub_heading' do %>
  Tietokannanhallintajärjestelmän ominaisuuksia
<% end %>


<p>
  <strong>ACID</strong> (<strong>A</strong>tomicity, <strong>C</strong>onsistency, <strong>I</strong>solation, <strong>D</strong>urability) on joukko tietokannanhallintajärjestelmän ominaisuuksia:
</p>

<ul>

  <li>Atomisuudella (<code>Atomicity</code>) varmistetaan, että tietokantatransaktio suoritetaan joko kokonaisuudessaan tai ei lainkaan. Jos tietokannanhallintajärjestelmään tehtävät transaktiot eivät olisi atomisia, voisi esimerkiksi päivityskyselyistä päätyä tietokantaan asti vain osa -- tilisiirtoesimerkissä vain rahan ottaminen yhdeltä tililtä, mutta ei sen lisäämistä toiselle.</li>

  <li>Eheydellä (<code>Consistency</code>) varmistetaan, että tietokantaan määritellyt rajoitteet, kuten viiteavaimet, pätevät jokaisen transaktion jälkeen. Jos tietokanta ei mahdollistaisi eheystarkistusta, voisi esimerkiksi kirjanpito olla virheellinen.</li>

  <li>Eristyvyydellä (<code>Isolation</code>) varmistetaan, että transaktio (A) ei voi lukea toisen transaktion (B) muokkaamaa tietoa ennenkuin toinen transaktio (B) on suoritettu loppuun. Tällä varmistetaan se, että jos transaktioita suoritetaan rinnakkaisesti, kumpikin näkee tietokannan eheässä tilassa.</li>

  <li>Pysyvyydellä (<code>Durability</code>) varmistetaan, että transaktion suorituksessa tapahtuvat muutokset ovat pysyviä. Kun käyttäjä lisää tietoa tietokantaan, tietokannanhallintajärjestelmän tulee varmistaa että tieto säilyy myös virhetilanteissa (jos transaktion suoritus onnistuu).</li>

</ul>

<p>
  Perinteiset tietokannanhallintajärjestelmät tarvitsevat atomisuuden ja pysyvyyden toteuttamiseen write-ahead-lokia (WAL). Se tarkoittaa sitä, että suoritettavaksi tuleva tietokantaoperaatio tallennetaan tekstimuotoisena lokina levylle ennen rivien varsinaista päivitystä. Tällöin operaatiot voidaan suorittaa uudelleen, jos tietokantapalvelin kaatuu ennen kuin muistissa päivitetyt rivit ehditään tallentaa levylle. Tämä nopeuttaa tietokannan toimintaa merkittävästi, sillä pitkien operaatioiden kirjoittamista levylle ei tarvitse odottaa ennen kuin sovellukselle voidaan vastata operaation onnistuneen. Eristyvyyden toteuttamiseen käytetään mm. erilaisia taulu- ja rivilukitusmekanismeja. Kurssilla <em>Transaktioiden hallinta</em> tutustutaan tarkemmin transaktioiden toimintaan.
</p>




<% partial 'partials/hint', locals: { name: 'BASE' } do %>

  <p>
    Tutustu myös Wikipedian artikkeliin <a href="https://en.wikipedia.org/wiki/Eventual_consistency" target="_blank">Eventual consistency</a>, mikä käsittelyy myös termiä BASE.
  </p>

<% end %>
