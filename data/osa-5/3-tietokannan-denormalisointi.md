---
path: '/osa-5/3-tietokannan-denormalisointi'
title: 'Tietokannan denormalisointi'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tiedät mitä indeksit ovat ja tiedät milloin tietokantatauluihin tulee määritellä indeksejä.

</text-box>



<% partial 'partials/material_sub_heading' do %>
  Tietokannan denormalisointi
<% end %>

<p>
  Tietokannan normalisointi johtaa tyypillisesti tilanteeseen, missä tietokannassa on useita tietokantatauluja, joista jokainen kuvaa jotain selkeää käsitettä. Tietokantataulujen väliset yhteydet tunnistetaan pää- ja viiteavainten avulla, ja taulujen attribuutit ovat selkeitä. Tietokannasta puuttuu toisteinen tieto.
</p>

<p>
  Yleisesti ottaen yllä kuvattu tilanne on hyvä, mutta absoluuttinen hyvyys liittyy paljolti myös käyttötarkoitukseen. Esimerkiksi raportointiin tarkoitettujen järjestelmien ei kannata todennäköisesti -- jos raportin luonti on hidas operaatio -- luoda samoja raportteja yhä uudelleen ja uudelleen, vaan voi olla mielekästä luoda erillinen tietokantataulu (tai muutama), jotka sisältävät raporteille oleelliset tiedot valmiiksi laskettuna.
</p>

<p>
  Myös tietokannan (tai tietokantataulun) käyttötarkoitus vaikuttaa normalisoinnin tarpeeseen. Esimerkiksi sivukäyntien kirjaamiseen tarkoitettu logitusjärjestelmä toimii tehokkaammin jos sivukäyntien tallentamiseen tarkoitetut osat järjestelmästä on denormalisoitu. Tarkastellaan tätä seuraavan esimerkin kautta.
</p>

<p>
  Alla on annettuna kaksi tietokantaa, toinen on normalisoitu ja toinen denormalisoitu. Kumpaakin käytetään järjestelmässä kävijöiden tekemien tapahtumien kirjaamiseen.
</p>

<p>
  Alla olevassa versiossa käyttäjä ja sivu on eriytetty omaksi käsitteekseen, johon tapahtuma-taulu viittaa. Kun tapahtumaa luodaan, tulee tapahtuman lisäämisen yhteydessä hakea käyttäjän tunnus taulusta Kayttaja sekä osoitetta vastaavan sivun tunnus taulusta Sivu.
</p>


<ul>
  <li>
    Kayttaja ((pk) id, kayttajatunnus)
  </li>
  <li>
    Sivu ((pk) id, osoite)
  </li>
  <li>
    Tapahtuma ((pk) id, (fk) kayttaja_id -&gt; Kayttaja, (fk) sivu_id -&gt; Sivu, aika, operaatio, ip, laite)
  </li>
</ul>

<p>
  Toinen vaihtoehto on tallentaa käyttäjätunnus ja sivun osoite sellaisenaan.
</p>

<ul>
  <li>
    Tapahtuma ((pk) id, kayttajatunnus, osoite, aika, operaatio, ip, laite)
  </li>
</ul>

