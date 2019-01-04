---
path: '/osa-1/2-tietokannanhallintajarjestelma'
title: 'Tietokannanhallintajärjestelmä, tietokanta ja tietokantataulu'
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet termit tietokannanhallintajärjestelmä, relaatiotietokanta, tietokantataulu, pääavain ja viitevain.

</text-box>

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



