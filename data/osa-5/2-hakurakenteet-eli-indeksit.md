---
path: '/osa-5/2-hakurakenteet-eli-indeksit'
title: 'Hakurakenteet eli indeksit'
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tiedät mitä indeksit ovat ja tiedät milloin tietokantatauluihin tulee määritellä indeksejä.

</text-box>


<% partial 'partials/material_sub_heading' do %>
  Indeksit eli hakua nopeuttavat tietorakenteet
<% end %>

<p>
  Indeksit ovat tietokantatauluista erillisiä yhden tai useamman sarakkeen tiedoista koostuvia tietorakenteita, jotka viittaavat tietokantataulun riveihin. Indeksirakenteita on useita erilaisia, mm. hajautustaulut ja puurakenteet. Indeksien tavoite on käytännössä -- tietokantojen yhteydessä -- tietokantakyselyiden nopeuttaminen.
</p>

<p>
  <em>
    Indeksiä voi ajatella perinteikkään kirjaston korttiluettelona. Kirjaston tiskille mentäessä ja tiettyä kirjaa kysyttäessä, kirjastovirkailija käy läpi kirjan nimen perusteella aakkostettuja kortteja. Koska nimet ovat aakkosjärjestyksessä, jokaista korttia ei tarvitse tarkastella tiettyä kirjaa etsittäessä. Kortissa on tieto kirjan konkreettisesta paikasta kirjastossa -- kun kortti löytyy, kirjan voi hakea. Jos kirjan nimen sijaan kirjaa etsitään kirjoittajan perusteella, tulee käyttää toista korttipakkaa, joka sisältää kirjoittajien nimet sekä mahdollisesti myös tiedon kirjojen nimistä. Jos kirjaa etsitään sisällön perusteella joudutaan huonolla tuurilla käymään jokainen fyysinen kirjaston kirja läpi.
  </em>
</p>

<p>
  Pohditaan tilannetta, missä miljardi riviä sisältävän taulun tiettyyn sarakkeeseen on määritelty indeksi. Oletetaan, että indeksi sisältää arvot järjestettynä. Tällöin, tiettyä arvoa haettaessa, voimme aloittaa keskimmäisestä arvosta -- jos haettava arvo on pienempi, tutkitaan "vasemmalla" olevaa puolikasta. Jos taas haettava arvo on suurempi, tutkitaan "oikealla" olevaa puolikasta. Alueen rajaaminen jatkuu niin pitkään, kunnes haettava arvo löytyy, tai rajaus päätyy tilanteeseen, missä tutkittavia arvoja ei enää ole. Tämä menetelmä -- <em>puolitushaku</em> tai <em>binäärihaku</em> lienee tuttu ohjelmointikursseilta.
</p>

<p>
  Jos rivejä on yhteensä miljardi, voidaan ne jakaa kahteen osaan noin log<sub>2</sub> 1 000 000 000 kertaa, eli noin 30 kertaa. Jos oletamme, että arvoa ei löydy taulusta, tulee yhteensä tarkastella siis noin 30 riviä miljardin sijaan.
</p>

<p>
  Indeksin määrittely tietokantataulun sarakkeelle tapahtuu tietokantataulun luomisen jälkeen komennolla <code>CREATE INDEX</code>, jota seuraa uuden indeksin nimi, avainsana <code>ON</code>, sekä taulu ja taulun sarakkeet, joille indeksi luodaan. Tietokannanhallintajärjestelmä luo tietokantataulun pääavaimelle ja viiteavaimille indeksit tyypillisesti automaattisesti.
</p>

<p>
  Oletetaan, että sovelluksessamme asiakkaita haetaan usein nimen perusteella. Luodaan edellä kuvattuun Asiakas-taulun sarakkeelle nimi indeksi.
</p>

<% partial 'partials/sample_output' do %>
  sqlite> CREATE INDEX idx_asiakas_nimi ON Asiakas (nimi);
<% end %>

<p>
  Tarkastellaan aiemmin tehtyä Cobb-nimisen henkilön hakua uudelleen.
</p>

<% partial 'partials/sample_output' do %>
  sqlite> EXPLAIN QUERY PLAN SELECT nimi, puhelinnumero FROM Asiakas
              WHERE nimi = 'Cobb';
  selectid order from detail
  -------- ----- ---- ----------------------------------------------------------
  0        0     0    SEARCH TABLE Asiakas USING INDEX idx_asiakas_nimi (nimi=?)
<% end %>

<p>
  Strategia muuttuu edellisestä. Aiemmin tietokannanhallintajärjestelmän strategia on ollut koko tietokantataulun Asiakas läpikäynti, nyt tietoa haetaan indeksistä. Jos käytössä oleva indeksi olisi esimerkiksi hajautustaulu, tapahtuisi haku vakioajassa -- eli "tarkasteluja" tehtäisiin "yksi" riippumatta tietomäärästä -- <em>tietorakenteisiin, niihin tehtäviin hakuihin sekä niiden tehokkuuksiin tutustutaan tarkemmin kurssilla tietorakenteet ja algoritmit.</em>
</p>

<p>
  Taulut ja sarakkeet, joihin indeksejä kannattaa harkita, liittyvät paljon suoritettuihin (ja hitaahkoihin) tietokantakyselyihin. Ensimmäiset askeleet liittyvät (1) tietokantataulujen pää- ja viiteavainten indeksien luomiseen, (2) hakuehtoihin liittyvien sarakkeiden indeksien luomiseen sekä (3) järjestysehtoihin liittyvien sarakkeiden indeksien lumiseen. Alla on kuvattuna eräs suoraviivainen prosessi tietokantataulun indeksien päättämiselle: lähtökohtana on kysely.
</p>

<figure>
  <img src="/img/indeksit-saanto.png" alt="alku=>start: Alku
				    join=>condition: Käsitelläänkö
				    useampia
				    tauluja?
				    where=>condition: Kyselyssä
				    rajausehtoja?
				    loppu=>end: Loppu
				    avaimet=>operation: Luo taulujen pääavaimille
				    ja viiteavaimille indeksit
				    rajaus=>operation: Luo indeksit rajausehdossa
				    esiintyville sarakkeille.
				    jarjestys=>condition: Järjestetäänkö
				    tuloksia?
				    jarj=>operation: Luo indeksit
				    järjestettäville sarakkeille.
				    alku->join
				    join(yes,right)->avaimet->where
				    join(no)->where
				    where(yes,right)->rajaus->jarjestys
				    where(no)->jarjestys
				    jarjestys(no)->loppu
				    jarjestys(yes,right)->jarj->loppu" />
</figure>


<p>
  Indeksin luominen tietokantataululle luo tietorakenteen, jota käytetään tiedon hakemiseen. Jokaista indeksiä tulee päivittää myös tietokantaa muokkaavien operaatioiden yhteydessä, jotta indeksin tiedot ovat ajan tasalla. Käytännössä liiallinen indeksien luominen saattaa myös hidastaa sovelluksen toimintaa.
</p>

