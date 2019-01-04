---
path: '/osa-3/1-tiedon-abstraktiotasot'
title: 'Tiedon abstraktiotasot'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Osaat tehdä SQL-kielellä yhteenvetokyselyitä ja rajata yhteenvetokyselyiden tuloksia.

</text-box>



<% partial 'partials/material_heading' do %>
  Tiedon käsittelyn abstraktiot
<% end %>

<p>
  Tietokannanhallintajärjestelmistä ja tallennettavasta tiedosta puhuttaessa tietoa käsitellään eri abstraktiotasoilla. Tällä kurssilla esiintyvät käsitteellinen abstraktiotaso, rakenteellinen abstraktiotaso ja fyysinen abstraktiotaso.
</p>


<% partial 'partials/material_sub_heading' do %>
  Käsitteellinen abstraktiotaso
<% end %>


<p>
  <strong>Käsitteellinen abstraktiotaso</strong> (conceptual level) on kuvaus ongelma-alueesta ihmisten ymmärtämässä muodossa. Kuvaus voi esiintyä esimerkiksi tekstidokumentissa, puheessa, tai vaikkapa multimediaesityksessä.  Käsitteellisen abstraktiotason kuvauksen luomisen ja välittämisen esiehtona on oletus siitä, että kuvauksen käsitteisiin liittyy jonkinlainen ihmisen mielessä oleva ymmärrys (mentaalimalli).
</p>

<p>
  <strong>Käsite</strong> on ihmisen mielessä oleva idea jostakin abstraktista tai konkreettisesta asiasta. Käsitteelliseen kuvaukseen liittyy tieto siitä, miten asiat toimivat ja miten asiat liittyvät toisiinsa, mutta tämä tieto ei aina esiinny konkreettisesti "nähtävänä".
</p>

<p>
  Tarkastellaan konkreettisena esimerkkinä käsitteellisen abstraktiotason kuvauksesta seuraavaa pankin tallennustoiminnallisuuteen liittyvää lausetta: "<em>Tileillä on omistajia, joista jokainen yksilöidään henkilöturvatunnuksen avulla</em>".
</p>

<p>
  Kuvaus sisältää käsitteet <em>tili</em>, <em>omistaja</em> ja <em>henkilöturvatunnus</em>. Tämän lisäksi käsitteisiin liittyy suhteita, jotka osittain ilmenevät kuvaksesta ja osittain vaativat aihealueen ymmärrystä. Esimerkiksi tili ja omistaja ovat erillisiä käsitteitä ja niiden välinen yhteys kuvaa omistajuutta. Omistajan ja henkilöturvatunnuksen välinen yhteys on taas riippuvainen olemassaolosta -- Omistajan henkilöturvatunnusta ei ole olemassa ilman omistajaa. Omistajalla on henkilöturvatunnus.
</p>

<p>
  Tiedon käsittelyyn liittyy oleellisesti myös synonyymien tunnistaminen. Esimerkiksi käsite "omistaja" voidaan ajatella myös käsitteenä "henkilö", mikä voi tehdä kuvauksesta ymmärrettävämmän.
</p>

<p>
  Käsitteellinen abstraktiotaso ei ota kantaa siihen, miten tietoa tulee kuvata tai miten tieto konkreettisesti tallennetaan.
</p>


<% partial 'partials/material_sub_heading' do %>
  Rakenteellinen abstraktiotaso
<% end %>

<p>
  <strong>Rakenteellinen abstraktiotaso</strong> (logical level, structural level) on jotain sovittua loogista määritelmää noudattava kuvaus säilöttävän tiedon rakenteesta. Rakenteellisen abstraktiotason kuvaus on kaikkien käytettyä kuvaustyyppiä ymmärtävien henkilöiden ymmärrettävissä, mikä mahdollistaa muunmuassa kuvauksesta keskustelun.
</p>

<p>
  Rakenteellisen abstraktiotason kuvaus voi olla esimerkiksi taulukkolaskentaohjelmaan tehty kuvaus käsitteistä ja niiden ominaisuuksista, luokkakaavio, tietokantakaavio, tai SQL-kielellä tehdyt tietokantataulujen luomislauseet.
</p>

<p>
  Edeltävän esimerkin perusteella voisi taulukkolaskennassa puhua kahdesta välilehdestä: välilehti tili ja välilehti henkilö. Henkilön kuvaamiseen käytetty välilehti sisältäisi ainakin sarakkeen henkilötunnus, ja jokainen rivi vastaisi yhtä henkilöä. Vastaavasti välilehti tili sisältäisi tilin tietoja kuvaavat sarakkeet sekä tilikohtaisen henkilötunnuksen, mikä kuvaisi tilin omistajaa. Jokaista tiliä kohden taulukkolaskennassa olisi yksi rivi.
</p>

<p>
  Rakenteellinen abstraktiotaso ei ota kantaa siihen, miten tieto tulee konkreettisesti tallentaa. Rakenteellisen abstraktiotason kuvauksesta on myös mahdollista tehdä useita käsitteellisen abstraktiotason kuvauksia.
</p>


<% partial 'partials/material_sub_heading' do %>
  Fyysinen abstraktiotaso
<% end %>

<p>
  <strong>Fyysinen abstraktiotaso</strong> (physical level, internal level) kuvaa konkreettista tiedon tallentamistapaa esimerkiksi kiintolevylle. Tämä sisältää tiedon tallennettavan tiedon formaatista tai muodosta, tietokantaa kuvaavan tai kuvaavien tiedostojen sijainnista, käytettävistä tietorakenteista, tiedon varmuuskopioinnista, hajauttamisesta, ja niin edelleen. Fyysinen abstraktiotaso on tyypillisesti järjestelmäkohtainen ja riippuu myös ainakin osittain tallennettavan tiedon muodosta.
</p>

<% partial 'partials/hint', locals: { name: 'Abstraktio' } do %>

  <p>
    Käsite <strong>abstraktio</strong> esiintyi edellä useaan kertaan. Käsitteellä abstraktio tarkoitetaan tässä yksityiskohtien piilottamista mikä mahdollistaa kokonaisuuksien hallinnan. Jos tietokantoja käsiteltäisiin vain fyysisellä abstraktiotasolla, olisi tallennettavasta tiedosta keskustelu hyvin vaikeaa tai jopa mahdotonta tietokoneiden sisäisiä rakenteita heikommin ymmärtävien kanssa.
  </p>

  <p>
    Tämän kurssin puitteissa tietokantoja suunniteltaessa lähdetään käsitteellisen abstraktiotason kuvauksesta ja pyritään rakenteellisen abstraktiotason kuvaukseen.
  </p>

<% end %>

