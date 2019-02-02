---
path: '/osa-4/2-eheys-ja-tietokantatransaktiot'
title: 'Tietokannan eheys ja tietokantatransaktiot'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet käsitteen tietokannan eheys ja tietokantatransaktio.
- Tiedät milloin tietokantatransaktioita käytetään.
- Tiedät tietokannanhallintajärjestelmältä vaadittuja ominaisuuksia, joita tarvitaan tietokantatransaktioiden toimintaan.

</text-box>


Eheydellä viitataan tallennetun tiedon oikeellisuuteen. Tietokannanhallintajärjestelmä ylläpitää tietokannan eheyttä jatkuvasti. Esimerkiksi sarakkeen, joka on määritelty sisältämään vain numeerista tietoa, ei pitäisi sisältää tekstimuotoista tietoa. Vastaavasti viiteavainten tulee viitata aina olemassaolevaan tietoon.

Eheyden ylläpitämisen sekä kohta tutuksi tulevien tietokantatransaktioiden ymmärtämiseksi on hyvä tuntea tietokannan toimintaa sovellustasolla. Kurssin ensimmäisessä osassa tarkasteltiin tiedon käsittelyä tiedostoissa -- tietokanta käyttää kiintolevyä tiedon tallentamiseen, mutta rivien käsittely tapahtuu (keskus)muistissa. Kun riviä halutaan päivittää, se haetaan ensin kovalevyltä muistiin, päivitetään ja viedään takaisin levylle.

Keskusmuistin ongelma on se, että sen sisältö häviää esimerkiksi sähkökatkoksen sattuessa tai palvelimen kaatuessa. Havainnollistetaan ongelmallisuutta esimerkeillä:

- Annetaan kaikille yrityksen 1000000 kuukausipalkkaiselle työntekijälle 5% palkan korotus. `UPDATE Palkat SET kkpalkka = kkpalkka * 1,05` Mitä jos tietokantapalvelin kaatuu, kun vasta 10000 muutettua riviä on tallennettu levylle? 990000 vihaista työntekijää jää ilman palkankorotusta? Tarvitaan jokin keino varmistaa, että päivitys tehdään kokonaan tai ei lainkaan.
- Entä jos palkkojen maksuun liittyvä prosessi lukee palkkatietoja juuri samalla kun niitä ollaan päivittämässä? Lukuoperaatio voi lukea esimerkiksi vain tietyn toimipaikan työntekijöiden palkat - 100 riviä. Jos päivitys on yhtäaikaa kesken, voi käydä niin, että osaan luetuista riveistä on ehditty jo tehdä päivitys ja osaan ei. Nyt osa työntekijöistä saa syyskuun palkkansa korotettuna ja osa ei? Tarvitaan jokin keino hallita yhtäaikaisia prosesseja.


## Tietokantatransaktiot

Tietokantatransaktiot ratkaisevat edellä mainitut ongelmat. Ongelmat voidaan jakaa kahteen kategoriaan:

- Operaatioden keskeytymiset järjestelmän kaatuessa, häiriötilanteissa tai hallituissa keskeytyksissä
- Samanaikaset prosessit

Tietokantatransaktio sisältää yhden tai useamman tietokantaan kohdistuvan operaation, jotka suoritetaan (järjestyksessä) kokonaisuutena. Jos yksikin operaatio epäonnistuu, kaikki operaatiot perutaan, ja tietokanta palautetaan tilaan, missä se oli ennen transaktion aloitusta. Klassinen esimerkki tietokantatransaktiosta on tilisiirto, missä nostetaan rahaa yhdeltä tililtä, ja siirretään rahaa toiselle tilille. Jos tilisiirron suoritus ei onnistu -- esimerkiksi rahan lisääminen toiselle tilille epäonnistuu -- tulee myös rahan nostaminen toiselta tililtä perua.

Jokainen tietokantakysely suoritetaan omassa transaktiossaan, mutta, käyttäjä voi myös määritellä useamman kyselyn saman transaktion sisälle. Transaktio aloitetaan komennolla `BEGIN TRANSACTION`, jota seuraa kyselyt, ja lopulta komento `COMMIT`. Oletetaan, että käytössämme on taulu `Tili(id, saldo)`.

```sql
CREATE TABLE Tili (
    id integer PRIMARY KEY,
    saldo NOT NULL
);
```

Tilisiirto kahden tilin välillä toteutetaan yhtenä transaktiona seuraavasti.


```sql
BEGIN TRANSACTION;
  UPDATE Tili SET saldo = saldo - 10 WHERE id = 1;
  UPDATE Tili SET saldo = saldo + 10 WHERE id = 2;
COMMIT;
```

Ylläolevassa transaktiossa suoritetaan kaksi kyselyä, mutta tietokannan näkökulmasta toiminto on *atominen*, eli sitä ei voi pilkkoa osiin. Komennon `COMMIT` yhteydessä muutokset joko tallennetaan kokonaisuudessaan tietokantaan, tai tietokantaan ei tehdä minkäänlaisia muutoksia.

Tietokantatransaktiota kirjoittaessa, ohjelmoija voi huomata tehneensä virheen. Tällöin suoritetaan komento `ROLLBACK`, joka peruu aloitetun transaktion aikana tehdyt muutokset. Suoritettua (`COMMIT`) tietokantatransaktiota ei voi perua.

Alla esimerkki kahdesta tietokantatransaktiosta. Ensimmäinen perutaan, sillä siinä yritettiin vahingossa siirtää rahaa väärälle tilille. Toinen suoritetaan. Kokonaisuudessaan allaolevan kyselyn lopputulos on se, että tililtä 1 on otettu 10 rahayksikköä, ja tilille 2 on lisätty 10 rahayksikköä.

```sql
BEGIN TRANSACTION;
  UPDATE Tili SET saldo = saldo - 10 WHERE id = 1;
  UPDATE Tili SET saldo = saldo + 10 WHERE id = 3;
ROLLBACK;

BEGIN TRANSACTION;
  UPDATE Tili SET saldo = saldo - 10 WHERE id = 1;
  UPDATE Tili SET saldo = saldo + 10 WHERE id = 2;
COMMIT;
```

Jokainen tietokantakysely -- myös "yhden rivin kyselyt" -- suoritetaan transaktion sisällä. Tietokannanhallintajärjestelmän vastuulla on vahtia, että transaktiot suoritetaan peräkkäin siten, että samaa tietoa ei voida käsitellä useammasta transaktiosta saman aikaan.


TODO: voiko näitä treenata SQL-trainerissa?


## Tietokantatransaktiot ja rajoitteet

Koska tietokannanhallintajärjestelmä näkee transaktioiden sisällä suoritettavat käskyt atomisina, eli yksittäisenä kokonaisuutena, voivat tietokantatauluun määritellyt rajoitteet olla hetkellisesti rikki, kunhan ne transaktion suorituksen jälkeen ovat kunnossa.

Esimerkiksi suomen kirjanpitosääntöjen mukaan jokaisessa yrityksessä tulee olla kaksinkertainen kirjanpito. Tässä jokaisen tilitapahtuman yhteydessä tulee merkitä sekä mistä raha on otettu (debit), että mihin raha on laitettu (credit). Tällaisessa järjestelmässä tulee olla (esimerkiksi) tietokantataulu `Kirjanpitotapahtuma`, johon muutokset merkitään.


```sql
CREATE TABLE Kirjanpitotapahtuma (
    id integer PRIMARY KEY,
    paivamaara date NOT NULL,
    kirjanpitotili integer NOT NULL,
    kuvaus text NOT NULL,
    debit integer NOT NULL,
    credit integer NOT NULL,
    FOREIGN KEY(kirjanpitotili) REFERENCES Tili(id),
    CONSTRAINT kirjaus_tasmaa CHECK (SUM(debit) = SUM(credit))
)
```

Nyt yhden transaktion sisällä voi tehdä useamman kirjanpitotapahtuman, kunhan transaktion suorituksen yhteydessä kirjanpitotapahtumien debit- ja credit-sarakkeiden summa täsmää. Yllä tietokantataulun luomiskomentoon on lisätty rajoite (`CONSTRAINT`), jonka avulla tietokantatauluun voidaan lisätä sääntöjä, joiden tulee olla aina transaktion jälkeen voimassa.



<text-box variant='hint' name='Oppimistavoitteet'>

Netti on täynnä hyviä oppaita. Osoitteessa <a href="http://www.sqlitetutorial.net/sqlite-java/transaction/" target="_blank">http://www.sqlitetutorial.net/sqlite-java/transaction/</a> on eräs tällainen. Tutustu oppaaseen.

</text-box>


## Tietokannanhallintajärjestelmän ominaisuuksia

**ACID** (**A**tomicity, **C**onsistency, **I**solation, **D**urability) on joukko tietokannanhallintajärjestelmän ominaisuuksia:


- Atomisuudella (`Atomicity`) varmistetaan, että tietokantatransaktio suoritetaan joko kokonaisuudessaan tai ei lainkaan. Jos tietokannanhallintajärjestelmään tehtävät transaktiot eivät olisi atomisia, voisi esimerkiksi päivityskyselyistä päätyä tietokantaan asti vain osa -- tilisiirtoesimerkissä vain rahan ottaminen yhdeltä tililtä, mutta ei sen lisäämistä toiselle.

- Eheydellä (`Consistency`) varmistetaan, että tietokantaan määritellyt rajoitteet, kuten viiteavaimet, pätevät jokaisen transaktion jälkeen. Jos tietokanta ei mahdollistaisi eheystarkistusta, voisi esimerkiksi kirjanpito olla virheellinen.

- Eristyvyydellä (`Isolation`) varmistetaan, että transaktio (A) ei voi lukea toisen transaktion (B) muokkaamaa tietoa ennenkuin toinen transaktio (B) on suoritettu loppuun. Tällä varmistetaan se, että jos transaktioita suoritetaan rinnakkaisesti, kumpikin näkee tietokannan eheässä tilassa.

- Pysyvyydellä (`Durability`) varmistetaan, että transaktion suorituksessa tapahtuvat muutokset ovat pysyviä. Kun käyttäjä lisää tietoa tietokantaan, tietokannanhallintajärjestelmän tulee varmistaa että tieto säilyy myös virhetilanteissa (jos transaktion suoritus onnistuu).


Perinteiset tietokannanhallintajärjestelmät tarvitsevat atomisuuden ja pysyvyyden toteuttamiseen write-ahead-lokia (WAL). Write-ahead-loki on tietokannanhallintajärjestelmään toteutettu toiminnallisuus, missä suoritettavaksi tuleva tietokantaoperaatio tallennetaan tekstimuotoisena lokina levylle ennen tietokantaoperaation varsinaista suoritusta (sekä siihen mahdollisesti liittyvää tietokantarivien rivien varsinaista päivitystä). Tällöin operaatiot voidaan suorittaa uudelleen, jos tietokantapalvelin kaatuu ennen kuin operaatio on suoritettu loppuun ja niihin liittyvät muutokset tallennettu levylle.

Tämä nopeuttaa tietokannan toimintaa merkittävästi, sillä pitkien operaatioiden kirjoittamista levylle ei tarvitse odottaa ennen kuin sovellukselle voidaan vastata operaation onnistuneen. Eristyvyyden toteuttamiseen käytetään mm. erilaisia taulu- ja rivilukitusmekanismeja. Kurssilla *Transaktioiden hallinta* tutustutaan tarkemmin transaktioiden toimintaan.
