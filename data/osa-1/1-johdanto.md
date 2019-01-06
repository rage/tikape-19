---
path: '/osa-1/1-johdanto'
title: 'Johdanto tietokantoihin'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- TODO

- Tunnet termit tietokannanhallintajärjestelmä, relaatiotietokanta, tietokantataulu, pääavain ja viitevain.

</text-box>


Vain muutamia vuosikymmeniä sitten, internet oli vain harvojen hupi, digitaaliset palvelut olivat harvinaisia, ja lähes kenelläkään ei esimerkiksi ollut henkilökohtaista kännykkää. Pankkikortit, joita kännyköillä tai muilla laitteilla tapahtuvat maksut ovat hiljalleen korvaamassa, ovat nekin olleet käytössä vain muutamia vuosikymmeniä.


Olemme tietoisesti ja tiedostamattomasti kytköksissä lukemattomiin järjestelmiin. Kotien sähkön- ja vedenkulutusta seurataan elektronisesti, lehti- ja palvelutilaukset tehdään digitaalisiin järjestelmiin, säätiedot tulevat automaattisesti mobiililaitteeseen, suurin osa perinteisestä kirjeillä tehdystä kommunikaatiosta tapahtuu sähköpostitse tai pikaviestinten kautta, kaupat seuraavat varastosaldojen kehitystä automaattisesti ostosten perusteella, sairaaloilla on sähköiset potilasrekisterit, yritykset tarjoavat räätälöityjä palveluita digitaalisen käyttäytymisen perusteella, ja niin edelleen.


Lähes jokainen edellämainituista palveluista perustuu tavalla tai toisella tiedon keräämiseen. Sähkön- ja vedenkulutuksesta jää historia, jota käytetään laskutuksessa sekä kulutuksen ennustamisessa. Lehti- ja palvelitilaukset tallennetaan järjestelmiin, joiden kautta voidaan suositella vastaavia sopivia tuotteita. Sähköpostit ja pikaviestinviestit säilyvät tyypillisesti ainakin lähettäjällä ja vastaanottajalla, jonka lisäksi esimerkiksi pikaviestinpalveluita tarjoava operaattori voi tallentaa viestit omalle palvelimelleen mahdollista tulevaa käyttöä varten. Kauppojen varastosaldojen kehityksen perusteella voidaan optimoida sisäänostoa ja tätä kautta pienentää hävikkiä sekä toisaalta vähentää tavaroiden varastointiin menevää tilaa. Potilasrekisterit sisältävät mm. hoito- ja rokotehistorian, jolloin lääkärin on helpompi toimia yllättävissä tilanteissa.

## TODO: quiz, kuvaus jostain toiminnasta, kuinka monta järjestelmää (ja mitä järjestelmiä) on mukana


Näitä palveluita kehitetään myös jatkuvasti. Alla olevalla videolla on kuvattuna yhdysvaltalaisen ruokajätin Tescon toimintaa Etelä-Koreassa. Tesco muutti ruokatoimijoiden pelikenttää luomalla digitaalisia ostosmahdollisuuksia mm. kaupunkien metroasemille. Tuotteiden tilaaminen ja maksaminen tapahtuu kännykällä, ja tuotteet toimitetaan tilaajan kotiin.


<youtube id='hGKoW-ouQlY'></youtube>

_Digitalisaation ytimessä on kyky hallinnoida ja käsitellä suuria tietomääriä._

Tässä palveluiden siirtymisessä ja kehittymisessä sähköiseen muotoon on kyse **digitalisaatiosta**.  Digitalisaatio on tietoteknisten menetelmien ja sähköisessä muodossa olevan tiedon hyödyntämistä ja kehittämistä yksilöiden, yhteisöjen, yritysten ja yhteiskunnan toiminnan edesauttamiseksi. Tämä sisältää mm. tiedon perusteella tapahtuvaa liiketoimintamallien ja asiakaspalvelukokemusten kehittämistä, työn automatisointia ja virtaviivaistamista sekä uusien innovaatioiden luomista ja yrityksen toiminnan parantamista.


Vaikka moni palvelu kerää tietoa palveluiden käyttäjistä ja siirtää palveluitaan sähköiseen muotoon, ei käyttäjien tietojen kerääminen ole itseisarvo. Arvoa voi tuottaa käyttäjille sekä yritykselle myös muilla tavoilla. Alla olevalla videolla on esimerkki eräästä IKEAn tuotteesta: IKEA on digitoinut (eli siirtänyt sähköiseen muotoon) tuotteiden tietoja sekä tehnyt tuotteistaan kolmiulotteisia malleja, jolloin niiden tuonti osaksi sovelluksia on suoraviivaista. Alla kuvattu tuote tarjoaa käyttäjille mahdollisuuden tarkastella miltä IKEAn tuote näyttäisi kotona.


<youtube id='vDNzTasuYEw'></youtube>


**Tietokantojen perusteet** -kurssilla keskitytään tiedon ymmärtämiseen sekä sen tallentamiseen ja hakemiseen. Keskiössä ovat erityisesti relaatiotietokannat. Puhekielessä termillä **tietokanta** tarkoitetaan yleisesti ottaen tiedon tallentamiseen tarkoitettua paikkaa, josta tietoa voi myös hakea. Esimerkiksi kirkonkirjat voidaan nähdä eräänlaisena sukujen historiaa dokumentoivana tietokantana, jonka kautta sukututkija pääsee käsiksi sukunsa historiaan. Vaikka tietokannat ovat digitalisaation myötä siirtymässä paperisesta muodosta sähköiseen muotoon, on niiden tavoite pysynyt pitkälti samana:

> *Haluamme säilöä tietoa ja haluamme päästä tähän tietoon käsiksi*.

Tietokannat ovat kaikkialla oleva -- ubiikki -- ilmiö. Tämä kurssimateriaali sijaitsee tietokannassa, kurssitehtäviin liittyvät pisteet kirjataan tietokantaan ja kurssin suoritusmerkintä kirjataan tietokantaan. Kännykässäsi on todennäköisesti kymmeniä erilaisia tietokantoja; yhteystiedot, kalenteri, herätyskello, aikavyöhykkeet, karttapalvelut, suosikkiverkkosivut, ym.

Tietokannat voivat olla paikallisia, eli ne voivat sijaita samalla koneella tietokantaa käyttävän ohjelmiston kanssa, esimerkiksi kännykässä, tai ne voivat sijaita erillisellä palvelimella, johon otetaan tarvittaessa yhteyttä. Loppukäyttäjän näkökulmasta tietokannan konkreettisella sijainnilla ei ole juurikaan merkitystä, sillä haetun tiedon näkee tyypillisesti käytössä olevan sovelluksen käyttöliittymän kautta.



## Esimerkki tietokannasta: Hiski


Tässä kohtaa on hyvä hetki käydä tutustumassa muutamaan tietokantapalveluun. Osoitteessa <a href="http://hiski.genealogia.fi/hiski/" target="_blank" norel>http://hiski.genealogia.fi/hiski/</a> on Suomen Sukututkimusseuran ylläpitämä Historiakirjojen hakupalvelu. Käy sivulle, valitse kieli, etsi "Kaikista", ja valitse "Kastetut".


Minkälaisia tuloksia löydät omalla etunimelläsi? Entä, minkälaisia tuloksia löydät nimillä Matti ja Maija? Palvelu pyrkii muunmuassa sisällyttämään läheiset nimien muunnokset hakutuloksiin, sillä nimet muuttuvat ajan myötä.



## TODO: quiz, hae jotain hiskistä


### Tiedon tallentamiseen ja hakemiseen liittyviä haasteita


Tiedon tallentamisessa sekä tiedon hakemisessa on muutamia ydinkysymyksiä ja ongelmakohtia. Nämä ovat seuraavia.


* **Tietoturva**. Keillä on pääsy tietoon? Onko käyttäjillä erilaisia oikeuksia ja onko tiedon kirjoittaminen rajattu vain tietyille käyttäjäryhmille? Minne tieto tallennetaan fyysisesti -- onko sijainti Suomessa vai jossain muualla? Miten yhteys tietokantaan suojataan? ...

* **Suorituskyky**. Miten tiedon hakeminen toteutetaan tehokkaasti? Entä jos käyttäjiä on samanaikaisesti satoja tai tuhansia?

* **Eheys**. Miten säilyttää tiedon eheys, eli miten varmistaa, että tallennettu tietoa noudattaa (joitakin) annettuja sääntöjä? Miten varmistetaan, että tietyllä arvoalueella olevat arvot (esim. syntymävuosi) tallennetaan ja luetaan numerona? Miten kytköksissä olevaa tietoa tulee käsitellä -- jos henkilön äiti poistetaan tietokannasta, tuleeko myös henkilö poistaa? Miten varmistaa, että käyttäjä ei saa koskaan "vaillinaista" tietoa (esim. tiedon hakeminen kesken tiedon poistamisen)?

* **Pysyvyys**. Miten tiedon tallentaminen toteutetaan siten, että järjestelmän toimintavirheet (esim. sähkökatkos) eivät johda tiedon katoamiseen?


Tietokannanhallintajärjestelmät pyrkivät ratkaisemaan edelliset ongelmat.



### Tietokannanhallintajärjestelmä


**Tietokannahallintajärjestelmä** on sovellus, jonka kautta käyttäjä voi luoda ja ylläpitää tietokantoja. Tietokannanhallintajärjestelmän vastuulla on tietokantaan kohdistuvien haku-, muokkaus- ja lisäystoimintojen lisäksi käyttöoikeuksien valvominen. Tietokannanhallintajärjestelmän vastuulla on myös tiedon eheyteen liittyvien sääntöjen noudattamisen valvonta. Tietokannassa voi olla esimerkiksi sääntö "Opiskelijan syntymävuoden tulee sisältää neljä numeroa", jolloin uusien opiskelijoiden lisääminen ilman oikein määriteltyä syntymävuotta ei onnistu. Vastaavia sääntöjä voidaan lisätä muunmuassa varausjärjestelmiin, esimerkiksi lentokoneiden paikkavarausjärjestelmissä halutaan varmistaa, että jokaisella istuimella on korkeintaan yksi varaus. Tietokannanhallintajärjestelmän vastuulla on myös varmistaa, ettei tietoa tuhoudu, vaikka tietokantaa käyttävä järjestelmä hajoaisi -- erilaiset varmuuskopiotoiminnallisuudet ovat tyypillisiä.


Edellisten lisäksi tietokannanhallintajärjestelmät tarjoavat välineitä tiedon hakemiseen liittyvien toimintojen tehokkuuden tarkastelemiseen. Vaikka esimerkiksi opintojen seurantaan liittyvä järjestelmä sisältäisi tiedot kaikista Helsingin yliopiston opiskelijoista (n. 35000) sekä kaikista kurssisuorituksista (rutkasti), tulisi tietokantaan tehtävien kyselyjen toimia nopeasti. Edellä mainittu tietomäärä on esimerkiksi Amazon-verkkokaupan mittakaavassa hyvin pieni.


Yksittäinen sovellus voi myös käyttää useampaa tietokantaa, jotka sijaitsevat eri tietokannanhallintajärjestelmissä. Tyypillinen esimerkki tällaisesta sovelluksesta on analytiikkapalvelu, joka yhdistää eri palveluiden tallentamaa tietoa yhteenvetoraporttien luomiseksi. Yksittäisessä tietokannanhallintajärjestelmässä voi toisaalta sijaita useampia erilaisiin sovelluksiin ja käyttötarkoituksiin liittyviä tietokantoja, joita jokaista käyttää eri käyttäjät tai eri yritys.


TODO: kuva, missä tietokannanhallintajärjestelmä sekä sovellus.

### Tietokanta


**Tietokanta** on kokoelma tiettyyn aihepiiriin liittyviä säilytettäviä tietoja. Tietokannan luominen liittyy jonkinlaisen organisaation, yrityksen tai muun yhteisön tarpeeseen säilöä ja hakea tietoa. Esimerkiksi, yliopisto haluaa pitää kirjaa opiskelijoistaan ja heidän opintomenestystään, hotelli haluaa pitää kirjaa hotellin huoneiden varauksista ja kauppaketju haluaa pitää kirjaa asiakkaistaan ja asiakkaiden ostoksista.


Tallennettava tieto liittyy tyypillisesti johonkin tavoitteeseen. Yliopisto haluaa seurata opintojen etenemistä muunmuassa valtionhallinnolle raportointia varten, huoneiden varaustilannetta seuraava hotelli haluaa tietää milloin huoneita on paljon tarjolla ja milloin huoneet ovat lopussa. Kauppaketjun ensisijaisena tavoitteena lienee asiakkaiden ostosten seuranta myynnin optimoimiseksi.


Tietokantojen rakennetta ja jäsentelyä suunniteltaessa ongelmaa lähestytään tunnistamalla ongelma-alueen oleelliset **käsitteet**. Käsitteitä tarkastelemalla tunnistetaan mikä osa tiedosta on epäoleellista ja mikä osa tulee säilöä. Käsitteiden tunnistamisen yhteydessä selvitetään käsitteiden ominaisuuksia sekä niiden **yhteyksiä**. Esimerkiksi opiskelijan opintomenestyksen seurannassa oleellisia ovat ainakin käsitteet *Opiskelija* ja *Kurssisuoritus*, joilla on yhteys: opiskelijalla on kurssisuorituksia.


TODO: kuva, missä tietokannanhallintajärjestelmä sekä sovellus. Tietokannanhallintajärjestelmän sisällä on tietokantoja.


### Tietokantataulu

TODO: kuva, missä tietokannanhallintajärjestelmä sekä sovellus. Tietokannanhallintajärjestelmän sisällä on tietokantoja. Tietokannan sisällä on tietoa: useita tauluja.


### Pääavain


TODO: kuva, missä tietokannanhallintajärjestelmä sekä sovellus. Tietokannanhallintajärjestelmän sisällä on tietokantoja. Tietokannan sisällä on tietoa: useita tauluja. Jokaisella taulull

### Viiteavain



