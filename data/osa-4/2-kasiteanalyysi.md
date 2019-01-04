---
path: '/osa-4/2-kasiteanalyysi'
title: 'Käsiteanalyysi'
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet käsiteanalyysin askeleet ja osaat luoda ongelma-alueen kuvauksesta luokkakaavion käsiteanalyysin askeleita noudattaen.

</text-box>

## Käsiteanalyysi

<% partial 'partials/material_heading' do %>
  Käsiteanalyysi
<% end %>

<p>
  Käsiteanalyysia (conceptual modeling, domain modeling) käytetään ongelma-alueen käsitteellistämiseen ja kielentämiseen, mikä edesauttaa ongelma-alueeseen liittyvää keskustelua sekä päätöksentekoa. Käsiteanalyysi tehdään iteratiivisesti esimerkiksi ongelma-alueen tekstuaalista kuvausta läpikäyden.
</p>

<p>
  Käsiteanalyysin tuloksena saadaan aikaan ongelma-aluetta kuvaava tietomalli, joka sisältää ongelma-alueen käsitteet ja niiden yhteydet sekä käsitteisiin liittyvät attribuutit selkeästi ja kuvaavasti nimettyinä. Käsiteanalyysin lopputuloksessa ei ole sellaisia käsitteitä tai attribuutteja, jotka ovat ongelma-aluetta varten rakennettavan järjestelmän tai ratkaisun kannalta epäoleellisia.
</p>

<p>
  Käsiteanalyysin lopputulos voi olla esimerkiksi luokkakaavio tai <a href="https://fi.wikipedia.org/wiki/ER-kaavio" target="_blank" norel>ER-kaavio</a>. Tällä kurssilla käsiteanalyysin lopputuloksena on luokkia, luokkien attribuutteja, sekä luokkien välisiä yhteyksiä, jotka kuvataan luokkakaaviossa.
</p>

<% partial 'partials/material_sub_heading' do %>
  Käsite ja käsitteiden väliset yhteydet
<% end %>

<p>
  Arkielämässä näkee useita saman tyyppisiä esineitä. Esimerkiksi suurin osa älypuhelimista on karkeasti ottaen saman mallisia -- jokainen puhelin on rakennettu tiettyä mallia noudattaen. Olio-ohjelmoinnin termejä noudattaen voimme sanoa, että omistamasi puhelin on Puhelin-luokasta tehty ilmentymä eli olio. Luokka on rakennuspiirrustus, jonka perusteella yksittäiset oliot luodaan.
</p>

<p>
  Käsitteet ovat samalla tavalla abstrakteja kuin luokat, eli käsitteestä voi olla useampia ilmentymiä. Käsitteistä luodut ilmentymät voidaan toisaalta myös erottaa toisistaan jollain tavalla, tai niille tulee olla vähintään mahdollista määritellä jonkinlainen yksilöivä tunnus.
</p>

<p>
  Käsitteiden välisillä yhteyksillä tarkoitetaan käsitteiden välisiä suhteita. Esimerkiksi puhelimella voi olla omistaja, ja toisaalta puhelimen omistaja voi opiskella jossain opinahjossa.
</p>

<p>
  Käsitteitä voidaan ajatella myös hetkellisen olemassaolon kautta. Hyvät käsitteet eivät tyypillisesti ole (pysyvästi) olemassaoloriippuvaisia. Esimerkiksi puhelimen olemassaolo ei ole riippuvainen omistajasta, ja puhelimen omistaja ei ole riippuvainen opinahjosta. Käsitteen olemassaolosta riippuvaiset asiat -- kuten esimerkiksi henkilön nimi -- ovat hyviä attribuuttiehdokkaita.
</p>


<% partial 'partials/material_sub_heading' do %>
  Käsiteanalyysin vaiheet
<% end %>

<p>
  Käsiteanalyysi koostuu viidestä vaiheesta, jotka ovat seuraavat:
</p>

<ol>
  <li><strong>Tunnista käsite-ehdokkaat</strong>. Käsite-ehdokkaat tunnistetaan etsimällä ongelma-alueen kuvauksesta oleellisia substantiiveja ja ilmiöitä. Tässä vaiheessa myös rajataan pois käsitteitä, jotka eivät ole oleellisia ongelma-alueen kannalta.</li>
  <li><strong>Tunnista käsitteiden väliset yhteydet</strong>. Yhteydet tunnistetaan etsimällä ongelma-alueen kuvauksesta verbejä, käsitteiden yhteyksiä sekä käsitteitä kuvaavia lausahduksia. </li>
  <li><strong>Tunnista ja määrittele osallistumisrajoitteet</strong>. Osallistumisrajoitteet tarkentavat lopputuloksena saatavaa tietomallia. Osallistumisrajoitteita saadaan selville ongelma-alueen kuvauksessa esiintyvien adjektiivien ja määreiden kautta.</li>
  <li><strong>Tunnista attribuutit ja lisää ne käsitteille</strong>. Tunnista käsitteisiin liittyvät tiedot eli attribuutit, joita halutaan tallentaa tietokantaan. Käsitteisiin liittyvät attribuutit tunnistaa muunmuassa olemassaoloriippuvaisista substantiiveista sekä käsitteiden yleisistä ominaisuuksista. Attribuutti saattaa olla joko yksittäinen arvo tai arvojoukko -- arvojoukot tunnistetaan tyypillisesti lukumäärien kuvauksista.</li>
  <li><strong>Yleistä ja eriytä käsitteitä</strong>. Tunnista käsitteistä yliluokkia ja aliluokkia. Näiden tunnistaminen tapahtuu esimerkiksi käsitteitä tarkastelemalla ja miettimällä "onko käsite toisen käsitteen erikoistapaus". </li>
</ol>

<p>
  Sovelletaan käsiteanalyysin askeleita seuraavaan Uimaseuraesimerkkiin.
</p>

<aside>

  <hr/>

  <p>
    <em>
      Uimaseuramme Loch Nessin hirviöt on tähän päivään asti käyttänyt paperia uimareidensa tulosten seuraamiseen ja ylläpitoon. Uimaseuraamme juuri liittynyt valmennuspäällikkö vaatii kirjanpidon nykyaikaistamista, ja haluaa että tulokset tallennetaan tietokoneelle.
    </em>
  </p>

  <p>
    <em>
      Valmennuspäällikkömme antoi minulle tehtäväksi välittää tietoa seurastamme, eli tässäpä sitä: Meillä on noin sata mies- ja naispuolista uimaria. Uimarit kilpailevat yleensä yhdessä lajissa, esimerkiksi selkäuinnissa, mutta jotkut uimarit kilpailevat useammassakin lajissa. Tuloksia kirjataan sekä kuukausittain järjestettävistä seuran sisäisistä "kuukauden vesihiisi"-kisoista, että jokaisesta seuran ulkopuolella järjestettävästä kilpailusta. Valmentajien tulee pystyä käyttämään tietokoneelle tallennettuja tietoja myös kotoa esimerkiksi internetin välityksellä.
    </em>
  </p>

  <hr/>

</aside>

<% partial 'partials/material_sub_sub_heading' do %>
  Tunnista käsite-ehdokaat
<% end %>

<p>
  Käsite-ehdokkaita tunnistaessa laaditaan luettelo ongelma-alueen oleellisista tietokohteista. Luettelon laatiminen alkaa substantiivien tunnistamisesta. Ensimmäisessä vaiheessa oleelliset käsite-ehdokkaat alleviivataan.
</p>


<aside>

  <hr/>

  <p>
    <em>
      <u>Uimaseuramme</u> Loch Nessin hirviöt on tähän päivään asti käyttänyt <u>paperia</u> <u>uimareidensa</u> <u>tulosten</u> seuraamiseen ja ylläpitoon. <u>Uimaseuraamme</u> juuri liittynyt <u>valmennuspäällikkö</u> vaatii <u>kirjanpidon</u> nykyaikaistamista, ja haluaa että <u>tulokset</u> tallennetaan <u>tietokoneelle</u>.
    </em>
  </p>

  <p>
    <em>
      <u>Valmennuspäällikkömme</u> antoi minulle tehtäväksi välittää tietoa <u>seurastamme</u>, eli tässäpä sitä: Meillä on noin sata <u>mies- ja naispuolista</u> <u>uimaria</u>. <u>Uimarit</u> kilpailevat yleensä yhdessä <u>lajissa</u>, esimerkiksi <u>selkäuinnissa</u>, mutta jotkut uimarit kilpailevat useammassakin <u>lajissa</u>. Tuloksia kirjataan sekä kuukausittain järjestettävistä seuran sisäisistä "kuukauden vesihiisi"-<u>kisoista</u>, että jokaisesta seuran ulkopuolella järjestettävästä <u>kilpailusta</u>. Valmentajien tulee pystyä käyttämään tietokoneelle tallennettuja tietoja myös kotoa esimerkiksi internetin välityksellä.
    </em>
  </p>

  <hr/>

</aside>

<p>
  Substantiiveja tarkastelemalla luotu lista on seuraavanlainen. Alla olevassa listassa käsite-ehdokkaat on muutettu yksikkömuotoon.
</p>

<ul>
  <li>Uimaseura</li>
  <li>Paperi</li>
  <li>Uimari</li>
  <li>Tulos</li>
  <li>Valmennuspäällikkö</li>
  <li>Kirjanpito</li>
  <li>Tietokone</li>
  <li>Seura</li>
  <li>Miesuimari</li>
  <li>Naisuimari</li>
  <li>Selkäuinti</li>
  <li>Laji</li>
  <li>Kilpailu</li>
</ul>

<p>
  Käsite-ehdokkaiden karsinta tapahtuu harkitsemalla jokaista ehdokasta erikseen ja miettimällä onko se oleellinen ongelma-alueen ratkaisun kannalta. Alla kuvattu eräs karsinta.
</p>


<ul>
  <li><s>Uimaseura</s> -- seuralle tehdään järjestelmää, voidaan jättää pois ainakin toistaiseksi.</li>
  <li><s>Paperi</s> -- tästä haluttiin päästä eroon, tulokset kirjattiin aiemmin paperille.</li>
  <li>Uimari</li>
  <li>Tulos</li>
  <li><s>Valmennuspäällikkö</s> -- valmennuspäällikkö haluaa uuden järjestelmän, mutta ei oleellinen käsite tietomallin kannalta.</li>
  <li><s>Kirjanpito</s> -- järjestelmä tulee sisältämään kirjanpidon, mutta kirjanpito ei käsite järjestelmässä.</li>
  <li><s>Tietokone</s> -- kts. edellinen</li>
  <li><s>Seura</s> -- kts. uimaseura.</li>
  <li><s>Miesuimari</s> -- Uimari on valittuna käsitteeksi, sukupuoli voi esim. olla uimarin attribuuttina.</li>
  <li><s>Naisuimari</s> -- kts. edellinen</li>
  <li><s>Selkäuinti</s> -- Laji on valittuna käsitteeksi.</li>
  <li>Laji</li>
  <li>Kilpailu</li>
</ul>

<p>
  Ehdokkaiden karsinnan jälkeen seuraavat käsitteet ovat jäljellä:
</p>

<ul>
  <li>Kilpailu</li>
  <li>Laji</li>
  <li>Uimari</li>
  <li>Tulos</li>
</ul>



<% partial 'partials/material_sub_sub_heading' do %>
  Tunnista käsitteiden väliset yhteydet
<% end %>

<p>
  Yhteydet tunnistetaan etsimällä tekstistä verbejä, käsitteiden yhteyksiä sekä käsitteitä kuvaavia lausahduksia. Tämän lisäksi aiempi aihealueen tietämys on tässä hyödyksi.
</p>

<aside>

  <hr/>

  <p>
    <em>
      Uimaseuramme Loch Nessin hirviöt on tähän päivään asti käyttänyt paperia uimareidensa tulosten seuraamiseen ja ylläpitoon. Uimaseuraamme juuri liittynyt valmennuspäällikkö vaatii kirjanpidon nykyaikaistamista, ja haluaa että tulokset tallennetaan tietokoneelle.
    </em>
  </p>

  <p>
    <em>
      Valmennuspäällikkömme antoi minulle tehtäväksi välittää tietoa seurastamme, eli tässäpä sitä: <u>Meillä on noin sata mies- ja naispuolista uimaria</u>. <u>Uimarit kilpailevat yleensä yhdessä lajissa</u>, esimerkiksi selkäuinnissa, mutta <u>jotkut uimarit kilpailevat useammassakin lajissa</u>. <u>Tuloksia kirjataan sekä kuukausittain järjestettävistä seuran sisäisistä "kuukauden vesihiisi"-kisoista, että jokaisesta seuran ulkopuolella järjestettävästä kilpailusta</u>. Valmentajien tulee pystyä käyttämään tietokoneelle tallennettuja tietoja myös kotoa esimerkiksi internetin välityksellä.
    </em>
  </p>

  <hr/>

</aside>

<p>
  Edellä tarkastellusta kuvauksesta nousee esille seuraavat tekstit:
</p>

<ul>
  <li>
    Meillä on noin sata mies- ja naispuolista uimaria
  </li>
  <li>
    Uimarit kilpailevat yleensä yhdessä lajissa
  </li>
  <li>
    jotkut uimarit kilpailevat useammassakin lajissa
  </li>
  <li>
    Tuloksia kirjataan sekä kuukausittain järjestettävistä seuran sisäisistä "kuukauden vesihiisi"-kisoista, että jokaisesta seuran ulkopuolella järjestettävästä kilpailusta
  </li>
</ul>

<p>
  Teksteistä voidaan päätellä seuraavat yhteydet:
</p>

<ul>
  <li>
    Meillä on noin sata mies- ja naispuolista uimaria: seuraan liittyy uimareita. Poistimme aiemmin käsitteen seura, joten tämä yhteys ei ole relevantti.
  </li>
  <li>
    Uimarit kilpailevat yleensä yhdessä lajissa: uimariin liittyy laji, uimariin liittyy kilpailu, kilpailuun liittyy laji.
  </li>
  <li>
    jotkut uimarit kilpailevat useammassakin lajissa: (sama kuin yllä).
  </li>
  <li>
    Tuloksia kirjataan sekä kuukausittain järjestettävistä seuran sisäisistä "kuukauden vesihiisi"-kisoista, että jokaisesta seuran ulkopuolella järjestettävästä kilpailusta: tulos liittyy kilpailuun.
  </li>
</ul>

<p>
  <em>
    Aiempi tieto aihealueeseen liittyen antaa olettaa, että tulokseen liittyy kilpailun lisäksi myös laji ja uimari.
  </em>
</p>

<p>
  Esille nousee siis seuraavat yhteydet:
</p>

<ul>
  <li>
    Uimariin liittyy laji
  </li>
  <li>
    Uimariin liittyy kilpailu
  </li>
  <li>
    Kilpailuun liittyy laji
  </li>
  <li>
    Tulokseen liittyy kilpailu
  </li>
  <li>
    Tulokseen liittyy laji
  </li>
  <li>
    Tulokseen liittyy uimari
  </li>
</ul>


<figure>
  <img src="/img/viikko3/uimari-kasitteet.png" alt="[Uimari]-[Laji]
						    [Laji]-[Kilpailu]
						    [Kilpailu]-[Uimari]
						    [Tulos]-[Uimari]
						    [Tulos]-[Laji]
						    [Tulos]-[Kilpailu]"/>
  <p>&nbsp;</p>
  <figcaption>Kun käsitteet on tunnistettu, hahmotellaan niiden välisiä yhteyksiä. Yllä on kuvattuna eräs mahdollisuus ongelma-alueen käsitteiden yhteyksiksi.</figcaption>
</figure>


<% partial 'partials/material_sub_sub_heading' do %>
  Tunnista ja määrittele osallistumisrajoitteet
<% end %>

<p>
  Osallistumisrajoitteilla tarkoitetaan lukumäärällisiä rajoitteita käsitteiden välillä. Osallistumisrajoitteet merkitään luokkakaavioon käsitteitä yhdistävien viivojen päätyihin. Osallistumisrajoitteita saadaan selville ongelma-alueen kuvauksessa esiintyvien adjektiivien ja määreiden kautta, jonka lisäksi aihealueeseen liittyvä tietämyksestä on hyötyä.
</p>

<p>
  Edellisessä askeleessa tunnistetuista yhteyksistä saadaan selville seuraavat tiedot: uimari voi osallistua yhteen tai useampaan lajiin, eli uimariin voi liittyä monta lajia. Toisaalta, yhtä lajia voi harrastaa useampi uimari. Kilpailussa voi olla monta lajia, ja lajia voidaan todennäköisesti uida monessa kilpailussa. Kilpailussa voi olla monta uimaria, ja uimari voi uida useammassa kilpailussa. Yksittäiseen tulokseen taas liittyy yksi uimari, yksi laji, ja yksi kilpailu -- mutta, yhteen uimariin voi liittyä monta tulosta, yhteen lajiin voi liittyä monta tulosta, ja yhteen kilpailuun voi liittyä monta tulosta.
</p>

<p>
  Ehdotus käsitekaavioksi osallistumisrajoitteiden kanssa on seuraavanlainen:
</p>

<figure>
  <img src="/img/viikko3/uimari-kasitteet-rajoitteilla.png" alt="[Uimari]*-*[Laji]
								 [Laji]*-*[Kilpailu]
								 [Kilpailu]*-*[Uimari]
								 [Tulos]*-1[Uimari]
								 [Tulos]*-1[Laji]
								 [Tulos]*-1[Kilpailu]"/>
  <p>&nbsp;</p>
  <figcaption>Kun käsitteiden väliset yhteydet on tunnistettu, lisätään yhteyksiin osallistumisrajoitteet. Yllä pohdittu erästä mahdollisuutta osallistumisrajoitteiksi.</figcaption>
</figure>




<% partial 'partials/material_sub_sub_heading' do %>
  Tunnista attribuutit ja lisää ne käsitteille
<% end %>

<p>
  Käsitteisiin liittyvät attribuutit tunnistaa muunmuassa olemassaoloriippuvaisista substantiiveista sekä käsitteiden yleisistä ominaisuuksista. Attribuutti saattaa olla joko yksittäinen arvo tai arvojoukko -- arvojoukot tunnistetaan tyypillisesti lukumäärien kuvauksista. Samalla kuitenkin halutaan tallentaa vain ne attribuutit (ja käsitteet), jotka ovat ongelma-alueen kannalta oleellisua.
</p>

<p>
  Ongelma-alueen kuvauksesta tiedämme, että kilpailuilla on paikka (esim. "paikalliset kilpailut", "seuran ulkopuoliset kilpailut") ja nimi (esim. "kuukauden vesihiisi"), jonka lisäksi nimestä voi päätellä, että kilpailuun liittyy aika. Vastaavasti uimareihin liittyy todennäköisesti nimi ja syntymäaika, vaikkei kuvauksessa kumpaakaan suoraan pyydetä. Nimen perusteella on helppo tarkastaa kenestä on kyse, ja syntymäaika auttaa seuraamaan tuloskehitystä. Tulokseen tarvitaan jonkinlainen tieto tuloksesta -- uimakisoissa kyseessä on tarkka aika, ja laji kerrotaan tässä nimenä.
</p>

<figure>
  <img src="/img/viikko3/uimari-kasitteet-rajoitteilla-ja-attribuuteilla.png" alt="[Uimari|nimi:String;syntymäaika:Date]
										   [Laji|nimi:String]
										   [Kilpailu|nimi:String;paikka:String;aika:Date]
										   [Tulos|millisekuntia:Double]
										   [Uimari]*-*[Laji]
										   [Laji]*-*[Kilpailu]
										   [Kilpailu]*-*[Uimari]
										   [Tulos]*-1[Uimari]
										   [Tulos]*-1[Laji]
										   [Tulos]*-1[Kilpailu]"/>
  <p>&nbsp;</p>
  <figcaption>Kun käsitteiden väliset yhteydet ja osallistumisrajoitteet on tunnistettu, lisätään käsitteille attribuutit.</figcaption>
</figure>



<% partial 'partials/material_sub_sub_heading' do %>
  Yleistä ja eriytä käsitteitä
<% end %>

<p>
  Tunnista käsitteistä yliluokkia ja aliluokkia. Näiden tunnistaminen tapahtuu esimerkiksi käsitteitä tarkastelemalla ja miettimällä "onko käsite toisen käsitteen erikoistapaus". Vastaavasti toistuvat attribuutit saattavat antaa ilmi yli- ja aliluokkia.
</p>

<p>
  Yli- ja aliluokkien etsintä kannattaa tehdä matriisina, missä jokaista käsitettä verrataan jokaiseen muuhun käsitteeseen. Käymällä läpi käsitteemme, huomaamme, ettei niissä ole yli- tai aliluokille tarvetta.
</p>


<table class="table">
  <tr>
    <th>
      -
    </th>
    <th>
      Kilpailu
    </th>
    <th>
      Laji
    </th>
    <th>
      Tulos
    </th>
    <th>
      Uimari
    </th>
  </tr>
  <tr>
    <th>
      Kilpailu
    </th>
    <td>
      -
    </td>
    <td>
      Kilpailu ei ole lajin erikoistapaus.
    </td>
    <td>
      Kilpailu ei ole tuloksen erikoistapaus.
    </td>
    <td>
      Kilpailu ei ole uimarin erikoistapaus.
    </td>
  </tr>
  <tr>
    <th>
      Laji
    </th>
    <td>
      Laji ei ole kilpailun erikoistapaus.
    </td>
    <td>
      -
    </td>
    <td>
      Laji ei ole tuloksen erikoistapaus.
    </td>
    <td>
      Laji ei ole uimarin erikoistapaus.
    </td>
  </tr>
  <tr>
    <th>
      Tulos
    </th>
    <td>
      Tulos ei ole kilpailun erikoistapaus.
    </td>
    <td>
      Tulos ei ole lajin erikoistapaus.
    </td>
    <td>
      -
    </td>
    <td>
      Tulos ei ole uimarin erikoistapaus.
    </td>
  </tr>
  <tr>
    <th>
      Uimari
    </th>
    <td>
      Uimari ei ole kilpailun erikoistapaus.
    </td>
    <td>
      Uimari ei ole lajin erikoistapaus.
    </td>
    <td>
      Uimari ei ole tuloksen erikoistapaus.
    </td>
    <td>
      -
    </td>
  </tr>
</table>

<p>
  Luokkakaaviota ei siis tarvitse tässä tapauksessa muuttaa.
</p>

<p>
  Tarkastellaan vielä tilannetta, missä luokkakaaviosta löytyy tapaus, missä toinen käsite on toisen käsitteen erikoistapaus. Oletetaan, että käytössämme ovat käsitteet Henkilö ja Opiskelija. Henkilöllä on nimi, syntymäaika ja sähköpostiosoite. Opiskelijalla on nimi, syntymäaika, sähköpostiosoite ja opiskelijanumero.
</p>


<figure>
  <img src="/img/viikko3/henkilo-ja-opiskelija.png" alt="[Henkilo|nimi:String;syntymäaika:Date;email:String]
							 [Opiskelija|nimi:String;syntymäaika:Date;email:String;opiskelijanumero:String]"/>
  <p>&nbsp;</p>
  <figcaption>Henkilö ja opiskelija luokkakaaviossa.</figcaption>
</figure>

<p>
  Huomaamme, että opiskelija on henkilön erikoistapaus. Opiskelijalla on muuten samat ominaisuudet kuin henkilöllä, mutta sillä on lisäksi opiskelijanumero. Voimme luoda tämän perusteella luokkakaavion, missä opiskelija perii henkilön. Tämä merkitään seuraavasti.
</p>

<figure>
  <img src="/img/viikko3/henkilo-ja-opiskelija-perinta.png" alt="[Henkilo|nimi:String;syntymäaika:Date;email:String]
								 [Opiskelija|opiskelijanumero:String]
								 [Henkilo]^-[Opiskelija]"/>
  <p>&nbsp;</p>
  <figcaption>Henkilö ja opiskelija luokkakaaviossa. Opiskelija perii henkilön, eli opiskelijalla on kaikki henkilön attribuutit, jonka lisäksi opiskelijalla on myös omat attribuuttinsa.</figcaption>
</figure>




## käsiteanalyysin tuloksesta tietokannaksi
