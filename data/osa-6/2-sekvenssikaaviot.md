---
path: '/osa-6/2-sekvenssikaaviot'
title: 'Sekvenssikaaviot'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet sekvenssikaaviot ja osaat kuvata sovelluksesi toimintaa sekvenssikaavioiden avulla.

</text-box>


<% partial 'partials/material_heading' do %>
  Sekvenssikaaviot
<% end %>

<p>
  Sekvenssikaaviot ovat järjestelmien (ja olioiden) vuorovaikutuksen visualisointiin käytettävä menetelmä. Sekvenssikaaviossa järjestelmät kuvataan pystysuorina viivoina ja järjestelmien väliset kutsut vaakasuorina viivoina. Aika kulkee ylhäältä alas. Järjestelmät kuvataan laatikoina sekvenssikaavion ylälaidassa, joista pystysuorat viivat lähtevät. Järjestelmien kutsuihin merkitään oleellinen kuvaustieto, esimerkiksi olioiden yhteydessä metodin nimi tai korkeammalla tasolla järjestelmän toimintaa kuvattavaessa haluttu toiminto. Kutsun palauttama tieto piirretään palaavana katkoviivana.
</p>

<p>
  Alla on kuvattuna tilanne, missä käyttäjä haluaa hakea palvelimelta kaikki opiskelijat (vastaa edellisen luvun lopussa olevan sovellusken tarjoamaa toiminnallisuutta.
</p>

<figure>
  <img src="/img/sekvenssikaavio.png" alt="Selaimen, palvelimen sekä tietokannan välistä kommunikaatiota kuvaava sekvenssikaavio."/>
  <figcaption>Käyttäjä tekee selaimella pyynnön palvelimelle menemällä osoitteeseen "/opiskelijat". Palvelimella oleva koodi tekee ensin pyynnön tietokantaan, missä haetaan kaikki tietokannassa olevat opiskelijat. Tämän jälkeen palvelin antaa opiskelijalistan sekä html-sivun nimen Thymeleafille, joka luo sivusta HTML-sivun. Lopulta luotu HTML-sivu palautetaan käyttäjälle.</figcaption>
</figure>

