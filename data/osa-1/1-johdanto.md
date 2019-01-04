---
path: '/osa-1/1-johdanto'
title: 'Johdanto'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- TODO

</text-box>

## Johdanto

Olemme tietoisesti ja tiedostamattomasti kytköksissä lukemattomiin järjestelmiin. Kodin sähkön- ja vedenkulutusta seurataan elektronisesti, lehti- ja palvelutilaukset tehdään digitaalisiin järjestelmiin, säätiedot tulevat automaattisesti mobiililaitteeseen, suurin osa perinteisestä kirjeillä tehdystä kommunikaatiosta tapahtuu sähköpostitse tai pikaviestinten kautta, kaupat seuraavat varastosaldojen kehitystä automaattisesti ostosten perusteella, sairaaloilla on sähköiset potilasrekisterit, yritykset tarjoavat räätälöityjä palveluita digitaalisen käyttäytymisen perusteella, ja niin edelleen. Toisaalta, vain muutamia vuosikymmeniä sitten, internet oli vain harvojen hupi, digitaaliset palvelut olivat harvinaisia, ja lähes kenelläkään ei esimerkiksi ollut henkilökohtaista kännykkää. Pankkikortit, joita kännyköillä tai muilla laitteilla tapahtuvat maksut ovat hiljalleen korvaamassa, ovat nekin olleet käytössä vain muutamia vuosikymmeniä.


Lähes jokainen edellämainituista palveluista perustuu tavalla tai toisella tiedon keräämiseen. Sähkön- ja vedenkulutuksesta jää historia, jota käytetään laskutuksessa sekä kulutuksen ennustamisessa. Lehti- ja palvelitilaukset tallennetaan järjestelmiin, joiden kautta voidaan suositella vastaavia sopivia tuotteita. Sähköpostit ja pikaviestinviestit säilyvät tyypillisesti ainakin lähettäjällä ja vastaanottajalla, jonka lisäksi esimerkiksi pikaviestinpalveluita tarjoava operaattori voi tallentaa viestit omalle palvelimelleen mahdollista tulevaa käyttöä varten. Kauppojen varastosaldojen kehityksen perusteella voidaan optimoida sisäänostoa ja tätä kautta pienentää hävikkiä sekä toisaalta vähentää tavaroiden varastointiin menevää tilaa. Potilasrekisterit sisältävät mm. hoito- ja rokotehistorian, jolloin lääkärin on helpompi toimia yllättävissä tilanteissa.

## TODO: quiz, kuvaus jostain toiminnasta, kuinka monta järjestelmää (ja mitä järjestelmiä) on mukana


Uusia palveluita kehitetään myös jatkuvasti. Alla olevalla videolla on kuvattuna yhdysvaltalaisen ruokajätin Tescon toimintaa Etelä-Koreassa. Tesco muutti ruokatoimijoiden pelikenttää luomalla digitaalisia ostosmahdollisuuksia mm. kaupunkien metroasemille. Tuotteiden tilaaminen ja maksaminen tapahtuu kännykällä, ja tuotteet toimitetaan tilaajan kotiin.


<youtube id='hGKoW-ouQlY'></youtube>


Tässä palveluiden siirtymisessä ja kehittymisessä sähköiseen muotoon on kyse **digitalisaatiosta**.  Digitalisaatio on tietoteknisten menetelmien ja sähköisessä muodossa olevan tiedon hyödyntämistä ja kehittämistä yksilöiden, yhteisöjen, yritysten ja yhteiskunnan toiminnan edesauttamiseksi. Tämä sisältää mm. tiedon perusteella tapahtuvaa liiketoimintamallien ja asiakaspalvelukokemusten kehittämistä, työn automatisointia ja virtaviivaistamista sekä uusien innovaatioiden luomista ja yrityksen toiminnan parantamista. Digitalisaation ytimessä on kyky hallinnoida ja käsitellä suuria tietomääriä.


Vaikka moni palvelu kerää tietoa palveluiden käyttäjistä ja siirtää palveluitaan sähköiseen muotoon, ei käyttäjien tietojen kerääminen ole itseisarvo. Arvoa voi tuottaa käyttäjille sekä yritykselle myös muilla tavoilla. Alla olevalla videolla on esimerkki eräästä IKEAn tuotteesta: IKEA on digitoinut (eli siirtänyt sähköiseen muotoon) tuotteiden tietoja sekä tehnyt tuotteistaan kolmiulotteisia malleja, jolloin niiden tuonti osaksi sovelluksia on suoraviivaista. Alla kuvattu tuote tarjoaa käyttäjille mahdollisuuden tarkastella miltä IKEAn tuote näyttäisi kotona.


<youtube id='vDNzTasuYEw'></youtube>


Tällä kurssilla keskitytään suurien tietomäärien tallentamiseen keskittyneisiin palveluihin, joilla voi olla paljon yhtäaikaisia käyttäjiä. Keskiössä ovat erityisesti relaatiotietokannat. Puhekielessä termillä **tietokanta** tarkoitetaan yleisesti ottaen tiedon tallentamiseen tarkoitettua paikkaa, josta tietoa voi myös hakea. Esimerkiksi kirkonkirjat voidaan nähdä eräänlaisena sukujen historiaa dokumentoivana tietokantana, jonka kautta sukututkija pääsee käsiksi sukunsa historiaan. Vaikka tietokannat ovat digitalisaation myötä siirtymässä paperisesta muodosta sähköiseen muotoon, on niiden tavoite pysynyt pitkälti samana: *haluamme säilöä tietoa ja haluamme päästä tähän tietoon käsiksi*.


Tietokannat ovat kaikkialla oleva (*ubiikki*) ilmiö. Tämä kurssimateriaali sijaitsee tietokannassa, kurssitehtäviin liittyvät pisteet kirjataan tietokantaan ja kurssin suoritusmerkintä kirjataan tietokantaan. Kännykässäsi on todennäköisesti kymmeniä erilaisia tietokantoja; yhteystiedot, kalenteri, herätyskello, aikavyöhykkeet, karttapalvelut, suosikkiverkkosivut, ym, joiden lisäksi moni kännykkäsovellus hyödyntää yhtä tai useampaa tietokantaa. Tietokannat voivat olla paikallisia, eli ne voivat sijaita samalla koneella tietokantaa käyttävän ohjelmiston kanssa, esimerkiksi kännykässä, tai ne voivat sijaita erillisellä palvelimella, johon otetaan tarvittaessa yhteyttä. Loppukäyttäjän näkökulmasta tietokannan konkreettisella sijainnilla ei ole juurikaan merkitystä, sillä haetun tiedon näkee tyypillisesti käytössä olevan sovelluksen käyttöliittymän kautta.



<text-box variant='hint' name='Komento return lopettaa metodin suorituksen'>


Tässä kohtaa on hyvä hetki käydä tutustumassa muutamaan tietokantapalveluun. Osoitteessa <a href="http://hiski.genealogia.fi/hiski/" target="_blank" norel>http://hiski.genealogia.fi/hiski/</a> on Suomen Sukututkimusseuran ylläpitämä Historiakirjojen hakupalvelu. Käy sivulle, valitse kieli, etsi "Kaikista", ja valitse "Kastetut".


Minkälaisia tuloksia löydät omalla etunimelläsi? Entä, minkälaisia tuloksia löydät nimillä Matti ja Maija? Palvelu pyrkii muunmuassa sisällyttämään läheiset nimien muunnokset hakutuloksiin, sillä nimet muuttuvat ajan myötä.


</text-box>


## TODO: quiz, hae jotain hiskistä


### Tiedon tallentamiseen ja hakemiseen liittyviä haasteita


Tiedon tallentamisessa sekä tiedon hakemisessa on muutamia ydinkysymyksiä ja ongelmakohtia. Nämä ovat seuraavia.


* **Tietoturva**. Keillä on pääsy tietoon? Onko käyttäjillä erilaisia oikeuksia ja onko tiedon kirjoittaminen rajattu vain tietyille käyttäjäryhmille? Minne tieto tallennetaan fyysisesti -- onko sijainti Suomessa vai jossain muualla? Miten yhteys tietokantaan suojataan? ...

* **Suorituskyky**. Miten tiedon hakeminen toteutetaan tehokkaasti? Entä jos käyttäjiä on samanaikaisesti satoja tai tuhansia?

* **Eheys**. Miten säilyttää tiedon eheys, eli miten varmistaa, että tallennettu tietoa noudattaa (joitakin) annettuja sääntöjä? Miten varmistetaan, että tietyllä arvoalueella olevat arvot (esim. syntymävuosi) tallennetaan ja luetaan numerona? Miten kytköksissä olevaa tietoa tulee käsitellä -- jos henkilön äiti poistetaan tietokannasta, tuleeko myös henkilö poistaa? Miten varmistaa, että käyttäjä ei saa koskaan "vaillinaista" tietoa (esim. tiedon hakeminen kesken tiedon poistamisen)?

* **Pysyvyys**. Miten tiedon tallentaminen toteutetaan siten, että järjestelmän toimintavirheet (esim. sähkökatkos) eivät johda tiedon katoamiseen?


Tietokannanhallintajärjestelmät pyrkivät ratkaisemaan edelliset ongelmat.

