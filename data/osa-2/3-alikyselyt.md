---
path: '/osa-2/2-yhteenvetokyselyt'
title: 'Yhteenvetokyselyiden tekeminen'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Osaat tehdä SQL-kielellä yhteenvetokyselyitä ja rajata yhteenvetokyselyiden tuloksia.

</text-box>




##
  Alikyselyt
<% end %>


  Alikyselyt ovat nimensä mukaan kyselyn osana suoritettavia alikyselyitä, joiden tuloksia käytetään osana pääkyselyä. Pohditaan kysymystä *Miten haen opiskelijat, jotka eivät ole vielä osallistuneet yhdellekään kurssille?*, ja käytetään siihen ensin aiemmin tutuksi tullutta tapaa, eli LEFT JOIN -kyselyä. Yhdistetään opiskelijaa ja kurssisuoritusta kuvaavat taulut LEFT JOIN-kyselyllä siten, että myös opiskelijat, joilla ei ole suorituksia tulevat mukaan vastaukseen. Tämän jälkeen, jätetään vastaukseen vain ne rivit, joilla kurssisuoritukseen liittyvät tiedot ovat tyhjiä -- tämä onnistuu katsomalla mitä tahansa kurssisuoritus-taulun saraketta, ja tarkistamalla onko se tyhjä, eli *null*. Tämä onnistuu seuraavasti:


```sql
  SELECT opiskelijanumero FROM Opiskelija
      LEFT JOIN Kurssisuoritus
      ON Opiskelija.id = Kurssisuoritus.opiskelija_id
      WHERE Kurssisuoritus.kurssi_id IS null
<% end %>


  Toinen vaihtoehto edellisen kyselyn toteuttamiseen on luoda kysely, joka hakee kaikki ne opiskelijat, jotka eivät ole kurssisuorituksia saaneiden opiskelijoiden joukossa. Tässä on oleellisesti kaksi kyselyä: (1) hae niiden opiskelijoiden tunnus, joilla on kurssisuoritus, ja (2) hae opiskelijat, jotka eivät ole edellisen kyselyn palauttamassa joukossa.



  Ensimmäinen kysely on suoraviivainen.



```sql
  SELECT opiskelija_id FROM Kurssisuoritus
<% end %>


  Toinenkin kysely on melko suoraviivainen -- avainsanalla NOT IN voidaan rajata joukkoa.


```sql
  SELECT * FROM Opiskelija
      WHERE id NOT IN (*ensimmainen kysely*)
<% end %>


  Yhdessä kyselyt ovat siis muotoa:


```sql
  SELECT * FROM Opiskelija
      WHERE id NOT IN (
          SELECT opiskelija_id FROM Kurssisuoritus
      )
<% end %>


  Käytännössä alikyselyt tuottavat kyselyn tuloksena taulun, josta pääkyselyssä tehtävä kysely tehdään. Ylläolevassa esimerkissä alikyselyn tuottamassa taulussa on vain yksi sarake, jossa on kurssisuorituksen saaneiden opiskelijoiden opiskelijanumerot.



  Määreen `NOT IN`, joka tarkastaa että valitut arvot eivät ole alikyselyn tuottamassa taulussa, lisäksi käytössä on määre `IN`. Määreen `IN` avulla voidaan luoda ehto, jolla tarkastetaan, että valitut arvot ovat annetussa joukossa tai taulussa. Esimerkiksi alla haetaan kaikki kurssisuoritukset, joissa arvosana on kolme tai viisi.


```sql
  SELECT * FROM Kurssisuoritus WHERE arvosana IN (3, 5)
<% end %>


  Määreiden IN ja NOT IN lisäksi alikyselyissä voidaan käyttää määreitä EXISTS ja NOT EXISTS, joiden avulla voidaan rajata hakujoukkoa alikyselyssä olevan ehdon perusteella. Voimme esimerkiksi kirjoittaa aiemmin kirjoitetun kursseja suorittamattomia opiskelijoita etsivän kyselyn siten, että jokaisen Opiskelija-taulussa olevan opiskelijanumeron kohdalla tarkistetaan, että sitä ei löydy taulusta Kurssisuoritus.


```sql
  SELECT opiskelijanumero FROM Opiskelija
      WHERE NOT EXISTS (
          SELECT opiskelija_id FROM Kurssisuoritus
          WHERE Kurssisuoritus.opiskelija_id = Opiskelija.id
      )
<% end %>


  Edellä oleva kysely tarkistaa jokaisen Opiskelija-taulussa olevan opiskelijanumeron kohdalla ettei sitä löydy Kurssisuoritus-taulun opiskelija-sarakkeesta. Käytännössä -- jos tietokantamoottori ei optimoi kyselyä -- jokainen opiskelija-taulun rivi aiheuttaa uuden kyselyn kurssisuoritus-tauluun, mikä tekee kyselystä tehottoman.


<% partial 'partials/hint', locals: { name: 'Kyselyn tulos on taulu' } do %>


    Jokainen SQL-kysely tuottaa tuloksena taulun. Taulussa voi olla tasan yksi sarake ja rivi, tai vaikkapa tuhansia rivejä ja kymmeniä sarakkeita. Silloinkin, kun suoritamme yksinkertaisen haun, kuten vaikkapa "Hae kaikki kurssilla 'Tietokantojen perusteet' olevat opiskelijat", on haun tuloksena taulu.



    Kaikki tekemämme SQL-kyselyt ovat liittyneet tauluihin. Emmekö siis voisi tehdä kyselyjä myös vastauksiin? Vastaus on kyllä.



    Esimerkiksi vanhimman (tai vanhimmat, jos tämä ei ole yksikäsitteistä) opiskelijan löytää -- muunmuassa -- etsimällä kaikista pienimmän mahdollisimman syntymävuoden (kyselyn tulos on taulu), jonka jälkeen vastaustaulussa olevaa tulosta verrataan kaikkien opiskelijoiden syntymävuosiin.


  ```sql
    SELECT * FROM Opiskelija
        WHERE syntymävuosi
        IN (SELECT MIN(syntymavuosi) FROM Opiskelija)
  <% end %>

<% end %>



