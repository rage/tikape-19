---
path: '/osa-3/1-tietokannan-kuvaaminen'
title: 'Tietokannan kuvaamistekniikoita'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tiedät miten luokkakaavio kuvataan UML-kielellä ja tunnet menetelmiä tietokannan kuvaamiseen.

</text-box>


## UML-luokkakaavio


<% partial 'partials/material_heading' do %>
  Tiedon kuvaamisesta UML-kielellä
<% end %>

<p>
  Käytämme tällä kurssilla ensisijaisesti <a href="http://www.uml.org/" target="_blank" norel>UML</a>-kieltä rakenteellisen abstraktiotason kuvauskielenä. Käytämme <a href="https://fi.wikipedia.org/wiki/Luokkakaavio" target="_blank" norel>luokkakaavioita</a> käsitteiden ominaisuuksien ja yhteyksien mallintamiseen ja <a href="https://fi.wikipedia.org/wiki/Sekvenssikaavio" target="_blank" norel>sekvenssikaavioita</a> järjestelmien välisen kommunikoinnin mallintamiseen. Koko UML-spesifikaatio ei kuitenkaan ole tässä oleellinen -- luokkakaavioistakin esimerkiksi kooste- ja kompositiomerkintä ei ole tällä kurssilla tarpeen.
</p>


<figure>
  <img src="/img/opiskelija-ja-kurssisuoritus-luokkakaavio.png" />
  <figcaption>Luokkakaavio, jossa on luokat Opiskelija ja Kurssisuoritus. Opiskelijalla on monta (nollasta äärettömään kurssisuoritusta). Jokaiseen kurssisuoritukseen liittyy yksi opiskelija.</figcaption>
</figure>



<% partial 'partials/material_sub_heading' do %>
  Luokkien kuvaaminen luokkakaaviossa
<% end %>

<p>
  Luokkakaavion luominen lähtee luokan (käsitteen) määrittelystä. Luokkakaaviossa luokka piirretään laatikkona, jonka sisällä on luokan nimi. Alla on kuvattu luokka Opiskelija.
</p>

<figure>
  <img src="/img/luokkakaavio/opiskelija.png" alt="[Opiskelija]" />
  <figcaption>Luokka Opiskelija luokkakaaviossa. Yllä oleva luokkakaavio ei sisällä muita luokkia, eikä opiskelijalla ole attribuutteja.</figcaption>
</figure>

<p>
  Luokan määrittelyn jälkeen luokalle voidaan lisätä attribuutteja. Attribuutit lisätään luokkakaavioon luokan nimen alle. Alla olevassa esimerkissä jokaiseen Opiskelijaan liittyy opiskelijanumero, nimi ja syntymävuosi.
</p>

<figure>
  <img src="/img/luokkakaavio/opiskelija-attribuutit.png" alt="[Opiskelija|opiskelijanumero;nimi;syntymavuosi]" />
  <figcaption>Luokka Opiskelija luokkakaaviossa. Opiskelijalle on määritelty attribuutit opiskelijanumero, nimi ja syntymävuosi.</figcaption>
</figure>

<p>
  Luokkakaavioon voidaan merkitä myös muuttujien tyypit. Alla olevassa esimerkissä yllä olevaa luokkaa on muokattu siten, että opiskelijan attribuutteihin on lisätty myös niiden tyypit. Opiskelijanumero ja nimi ovat merkkijonoja, syntymävuosi on kokonaisluku. Attribuutin tyyppi merkitään attribuutin nimen jälkeen kaksoispisteellä erotettuna, esimerkiksi <code>nimi:String</code>.
</p>

<figure>
  <img src="/img/luokkakaavio/opiskelija-attribuutit-ja-tyypit.png" alt="[Opiskelija|opiskelijanumero:String;nimi:String;syntymavuosi:int]" />
  <figcaption>Luokka Opiskelija luokkakaaviossa. Opiskelijalle on määritelty attribuutit opiskelijanumero, nimi ja syntymävuosi. Attribuuteille on määritelty myös niiden tyypit.</figcaption>
</figure>


<p>
  Lisätään luokkakaavioon toinen luokka. Lisätään luokkakaavioon käsite Harrastus.
</p>


<figure>
  <img src="/img/luokkakaavio/harrastus.png" alt="[Opiskelija|opiskelijanumero:String;nimi:String;syntymavuosi:int]
						  [Harrastus]" />
  <figcaption>Luokkakaavio, joka sisältää luokat Opiskelija ja Harrastus. Opiskelijalle on määritelty attribuutit.</figcaption>
</figure>

<p>
  Lisätään harrastukselle seuraavaksi nimi-attribuutti. Sovitaan, että nimi on merkkijono.
</p>


<figure>
  <img src="/img/luokkakaavio/harrastus-nimi.png" alt="[Opiskelija|opiskelijanumero:String;nimi:String;syntymavuosi:int]
						       [Harrastus|nimi:String]" />
  <figcaption>Luokkakaavio, joka sisältää luokat Opiskelija ja Harrastus. Opiskelijalle ja harrastukselle on määritelty attribuutit.</figcaption>
</figure>

<p>
  Luokkakaaviossa on nyt sekä opiskelija että harrastus. Näillä ei ole tällä hetkellä kuitenkaan minkäänlaista yhteyttä. Tutustutaan seuraavaksi yhteyksien merkintään luokkakaavioon.
</p>


<% partial 'partials/material_sub_heading' do %>
  Yhteydet luokkakaaviossa
<% end %>


<p>
  Tutustutaan seuraavaksi yhteyksien luomiseen luokkakaaviossa. Yhteydet voidaan karkeasti ottaen jakaa kolmeen kategoriaan: monen suhde moneen, yhden suhde moneen ja yhden suhde yhteen.
</p>


<% partial 'partials/material_sub_sub_heading' do %>
  Monen suhde moneen
<% end %>

<p>
  Kahden käsitteen välillä on monen suhde moneen (<code>N-N</code>) -yhteys, jos ensimmäisen käsitteen ilmentymään voi liittyä monta toisen käsitteen ilmentymää, ja toisen käsitteen ilmentymään voi liittyä monta ensimmäisen käsitteen ilmentymää.
</p>

<p>
  Tällainen suhde on esimerkiksi annoksen ja raaka-aineen välillä. Käytännössä yksittäinen annos -- esimerkiksi <em>Poronkäristys</em> -- voi sisältää montaa eri raaka-ainetta kuten <em>perunaa</em>, <em>puolukkaa</em> ja <em>poroa</em>. Toisaalta, yksittäinen raaka-aine kuten <em>peruna</em> voi sisältyä moneen eri annokseen.
</p>

<figure>
  <img src="/img/ravintola/annos-raaka_aine.png" alt="[Annos|nimi:String;koko:String;hinta:double]
						      [RaakaAine|nimi:String]
						      [Annos]*-*[RaakaAine]"/>
  <figcaption>
    Monen suhde moneen. Yllä annokseen voi liittyä montaa eri raaka-ainetta, ja yksi raaka-aine voi esiintyä useammassa eri annoksessa. Monen suhde moneen merkitään luokkakaavioon piirrettyyn viivaan kahdella tähdellä, missä viivan kummassakin päässä on tähti.
  </figcaption>
</figure>




<% partial 'partials/material_sub_sub_heading' do %>
  Yhden suhde moneen
<% end %>

<p>
  Kahden käsitteen välillä on yhden suhde moneen (<code>1-N</code>) -yhteys, jos ensimmäisen käsitteen ilmentymään voi liittyä monta toisen käsitteen ilmentymää, mutta yhteen toisen käsitteen ilmentymään voi liittyä vain yksi ensimmäisen käsitteen ilmentymä.
</p>


<p>
  Tällainen suhde on esimerkiksi asiakkaan ja tilauksen välillä. Käytännössä yksittäinen asiakas -- esimerkiksi <em>Anna Asiakas</em> -- voi tehdä monta tilausta, mutta jokainen tehty tilaus liittyy täsmälleen yhteen asiakkaaseen. Sama tilaus ei voi liittyä samaan aikaan <em>Anna Asiakkaaseen</em> sekä <em>Essi Esimerkkiin</em>.
</p>


<figure>
  <img src="/img/ravintola/asiakas-tilaus.png" alt="[Asiakas|nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
						    [Tilaus|aika:Date;kuljetustapa:String;vastaanotettu:Boolean;toimitettu:Boolean]
						    [Asiakas]1-*[Tilaus]"/>
  <figcaption>
    Yhden suhde moneen. Yllä yhteen asiakkaaseen voi liittyä monta tilausta, mutta yksi tilaus liittyy aina täsmälleen yhteen asiakkaaseen. Yhden suhde moneen merkitään luokkakaavioon piirrettyyn viivaan tähdellä ja numerolla 1. Tähti tulee yhteyden siihen päähän, joita voi olla monta, ja ykkönen siihen päähän, joita voi olla vain yksi.
  </figcaption>
</figure>


<p>
  Yhdestä moneen yhteystyyppi edellyttää sen käsitteen ilmentymän olemassaoloa, johon liittyy monta toisen käsitteen ilmentymää. Käytännössä  tilauksen luominen edellyttää tilaukseen liittyvän asiakkaan olemassaoloa. Toisin sanoen, tilausta ei voi luoda ilman, että sille olisi asiakas.
</p>


<% partial 'partials/material_sub_sub_heading' do %>
  Yhden suhde yhteen
<% end %>


<p>
  Kahden käsitteen välillä on yhden suhde yhteen (<code>1-1</code>) -yhteys, jos ensimmäisen käsitteen ilmentymään voi liittyä vain yksi toisen käsitteen ilmentymä, ja toisen käsitteen ilmentymään voi liittyä vain yksi ensimmäisen käsitteen ilmentymä.
</p>

<p>
  Eräs esimerkki tällaisesta yhteystyypistä voisi olla kuljettajien ja kuljetusvälineiden välinen -- ehkäpä hieman teennäinen -- yhteys. Yhdellä kuljettajalla voi olla käytössään vain yksi kuljetusväline, ja yksi kuljetusväline voi olla vain yhden kuljettajan käytössä. Vastaavan esimerkin voisi rakentaa myös lainaesineiden kautta -- esimerkiksi yhdellä opiskelijalla voi olla vain yksi laite lainassa ylläpidolta, ja ylläpito voi lainata tietyn laitteen vain yhdelle opiskelijalle.
</p>


<% partial 'partials/material_heading' do %>
  Luokkakaavio ja olioiden väliset yhteydet
<% end %>

<p>
  Tässä luvussa kerrataan hieman edellisen osan luokkakaavioihin liittyvää materiaalia. <strong>Luokkakaavio</strong> on kuvaus tarkasteltavan ongelman käsitteistä sekä käsitteiden välisistä yhteyksistä. Luokkakaavio voi sisältää myös käsitteisiin liittyvät attribuutit. Ohjelmistokehityksessä luokkakaavio kuvaa järjestelmän luokkarakennetta, eli mitä luokkia ohjelmassa on, minkälaisia luokat ovat ja miten luokat liittyvät toisiinsa.
</p>

<p>
  Alla on kuvattuna erään tilausjärjestelmän luokkakaavio. Tilausjärjestelmässä on asiakkaita, jotka voivat tehdä tilauksia. Tilauksiin liittyy joukko annoksia, joihin taas liittyy raaka-aineet sekä ravintola. Sama annos voi olla useammassa tilauksessa, ja useampi tilaus voi sisältää saman annoksen -- annos on toisaalta aina tietyn ravintolan tarjoama. Jokaisen annoksen kohdalla listataan annokseen kuuluvat raaka-aineet -- sama raaka-aine voi esiintyä useammassa annoksessa, ja yhdessä annoksessa voi olla useampia raaka-aineita.
</p>

<figure>
  <img src="/img/ravintola/luokkakaavio.png" alt="[Asiakas|nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
						  [Ravintola|nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
						  [Annos|nimi:String;koko:String;hinta:double]
						  [Tilaus|aika:Date;kuljetustapa:String;vastaanotettu:Boolean;toimitettu:Boolean]
						  [RaakaAine|nimi:String]

						  [Asiakas]1-*[Tilaus]
						  [Tilaus]*-*[Annos]
						  [Annos]*-*[RaakaAine]
						  [Ravintola]1-*[Annos]"/>
  <figcaption>
    Tilausjärjestelmän luokkakaavio
  </figcaption>
</figure>

<p>
  Jokaisen luokkakaaviossa olevan käsitteen kohdalle on merkitty käsitteeseen kuuluvat attribuutit sekä niiden tietotyypit. Esimerkiksi asiakkaalla on nimi, puhelinnumero, katuosoite, postinumero sekä postitoimipaikka. Edellisistä postinumero tallennetaan numerona, muut tallennetaan merkkijonona. Tilaukseen liittyy aika, kuljetustapa, tieto tilauksen vastaanottamisesta sekä tieto tilauksen toimittamisesta. Aika tallennetaan Date-tyyppisenä tietona, kuljetustapa on merkkijono (esim. "kuljetus" tai "nouto"), ja tieto tilauksen vastaanottamisesta sekä toimittamisesta on tallennettu totuusavoisena muuttujana.
</p>

<p>
  Tarkastellaan yllä olevassa luokkakaaviossa olevia yhteystyyppejä eli käsitteiden välisiä suhteita hieman tarkemmin.
</p>



<% partial 'partials/material_sub_heading' do %>
  Yhden suhde moneen
<% end %>

<p>
  Kahden käsitteen välillä on yhden suhde moneen (<code>1-N</code>) -yhteys, jos ensimmäisen käsitteen ilmentymään voi liittyä monta toisen käsitteen ilmentymää, mutta yhteen toisen käsitteen ilmentymään voi liittyä vain yksi ensimmäisen käsitteen ilmentymä.
</p>


<p>
  Yllä olevassa esimerkissä tällainen suhde on esimerkiksi asiakkaan ja tilauksen välillä. Käytännössä yksittäinen asiakas -- esimerkiksi <em>Anna Asiakas</em> -- voi tehdä monta tilausta, mutta jokainen tehty tilaus liittyy täsmälleen yhteen asiakkaaseen. Sama tilaus ei voi liittyä samaan aikaan <em>Anna Asiakkaaseen</em> sekä <em>Essi Esimerkkiin</em>.
</p>


<figure>
  <img src="/img/ravintola/asiakas-tilaus.png" alt="[Asiakas|nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
						    [Tilaus|aika:Date;kuljetustapa:String;vastaanotettu:Boolean;toimitettu:Boolean]
						    [Asiakas]1-*[Tilaus]"/>
  <figcaption>
    Yhden suhde moneen. Yllä yhteen asiakkaaseen voi liittyä monta tilausta, mutta yksi tilaus liittyy aina täsmälleen yhteen asiakkaaseen. Yhden suhde moneen merkitään luokkakaavioon piirrettyyn viivaan tähdellä ja numerolla 1. Tähti tulee yhteyden siihen päähän, joita voi olla monta, ja ykkönen siihen päähän, joita voi olla vain yksi.
  </figcaption>
</figure>


<p>
  Yhdestä moneen yhteystyyppi edellyttää sen käsitteen ilmentymän olemassaoloa, johon liittyy monta toisen käsitteen ilmentymää. Käytännössä  tilauksen luominen edellyttää tilaukseen liittyvän asiakkaan olemassaoloa. Toisin sanoen, tilausta ei voi luoda ilman, että sille olisi asiakas.
</p>

<p>
  Java-lähdekoodina luokka asiakas kuvattaisiin (esimerkiksi) seuraavasti.
</p>

<% partial 'partials/code_highlight' do %>
  public class Asiakas {
      String nimi;
      String puhelinnumero;
      String katuosoite;
      Integer postinumero;
      String postitoimipaikka;

      List&lt;Tilaus&gt; tilaukset;

      public Asiakas(String nimi, String puh, String katu, Integer postiNro, String paikka) {
          this.nimi = nimi;
          this.puhelinnumero = puh;
          this.katuosoite = katu;
          this.postinumero = postiNro;
          this.postitoimipaikka = paikka;
          this.tilaukset = new ArrayList&lt;&gt;();
      }
  }
<% end %>

<p>
  Luokalla olisi lisäksi tarvittavat importit sekä metodeja mm. tilausten lisäämiseen.
</p>

<p>
  Vastaavasti luokka tilaus kuvattaisiin lähdekoodina (esimerkiksi) seuraavasti. Alla tilaukseen on lisätty alkuperäisessä laajemmassa luokkakaaviossa näkyneet tuotteet.
</p>

<% partial 'partials/code_highlight' do %>
  public class Tilaus {
      Asiakas asiakas;
      Date aika;
      String kuljetustapa;
      Boolean vastaanotettu;
      Boolean toimitettu;

      List&lt;Annos&gt; annokset;

      public Tilaus(Asiakas asiakas, String kuljetustapa) {
          this.asiakas = asiakas;
          this.kuljetustapa = kuljetustapa;
          this.aika = new Date();
          this.vastaanotettu = false;
          this.toimitettu = false;
      }
  }
<% end %>

<p>
  Luokalla olisi -- taas -- lisäksi tarvittavat importit sekä metodeja tilauksen tilan muokkaamiseen. Jonkun vastuulla olisi esimerkiksi merkitä tilaus vastaanotetuksi kun tilauksen tekeminen aloitetaan, jonka lisäksi tilauksen toimituksen (tai noudon) yhteydessä tilaus tulisi merkitä toimitetuksi.
</p>

<p>
  Yleisemmin ottaen voi todeta, että jos käsitteen ilmentymään liittyy monta toista käsitettä, merkitään se Java-luokassa listalla tai muulla tietorakenteella. Jos käsitteen ilmentymään liittyy taas vain yksi toinen käsite, merkitään se Java-luokassa yksittäisenä muuttujana joka viittaa toiseen luokkaan (käsitteeseen).
</p>


<% partial 'partials/material_sub_heading' do %>
  Monen suhde moneen
<% end %>

<p>
  Kahden käsitteen välillä on monen suhde moneen (<code>N-N</code>) -yhteys, jos ensimmäisen käsitteen ilmentymään voi liittyä monta toisen käsitteen ilmentymää, ja toisen käsitteen ilmentymään voi liittyä monta ensimmäisen käsitteen ilmentymää.
</p>

<p>
  Yllä olevassa esimerkissä tällainen suhde on esimerkiksi annoksen ja raaka-aineen välillä. Käytännössä yksittäinen annos -- esimerkiksi <em>Poronkäristys</em> -- voi sisältää montaa eri raaka-ainetta kuten <em>perunaa</em>, <em>puolukkaa</em> ja <em>poroa</em>. Toisaalta, yksittäinen raaka-aine kuten <em>peruna</em> voi sisältyä moneen eri annokseen.
</p>



<figure>
  <img src="/img/ravintola/annos-raaka_aine.png" alt="[Annos|nimi:String;koko:String;hinta:double]
						      [RaakaAine|nimi:String]
						      [Annos]*-*[RaakaAine]"/>
  <figcaption>
    Monen suhde moneen. Yllä annokseen voi liittyä montaa eri raaka-ainetta, ja yksi raaka-aine voi esiintyä useammassa eri annoksessa. Monen suhde moneen merkitään luokkakaavioon piirrettyyn viivaan kahdella tähdellä, missä viivan kummassakin päässä on tähti.
  </figcaption>
</figure>






<% partial 'partials/hint', locals: { name: 'Yhden suhde yhteen' } do %>

  <p>
    Yhteystyyppien yhden suhde moneen ja monen suhde moneen lisäksi on myös yhteystyyppi yhden suhde yhteen. Kahden käsitteen välillä on yhden suhde yhteen (<code>1-1</code>) -yhteys, jos ensimmäisen käsitteen ilmentymään voi liittyä vain yksi toisen käsitteen ilmentymä, ja toisen käsitteen ilmentymään voi liittyä vain yksi ensimmäisen käsitteen ilmentymä.
  </p>

  <p>
    Edellisessä tilausjärjestelmän luokkakaaviossa tätä yhteystyyppiä ei näkynyt. Eräs esimerkki tällaisesta yhteystyypistä voisi olla kuljettajien ja kuljetusvälineiden välinen -- ehkäpä hieman teennäinen -- yhteys. Yhdellä kuljettajalla voi olla käytössään vain yksi kuljetusväline, ja yksi kuljetusväline voi olla vain yhden kuljettajan käytössä. Vastaavan esimerkin voisi rakentaa myös lainaesineiden kautta -- esimerkiksi yhdellä opiskelijalla voi olla vain yksi laite lainassa ylläpidolta, ja ylläpito voi lainata tietyn laitteen vain yhdelle opiskelijalle.
  </p>

<% end %>



<% partial 'partials/material_sub_heading' do %>
  Yhteysrajoitteet ja oliot
<% end %>

<p>
  Tarkastellaan edellä kuvattuja yhteystyyppejä yhdestä moneen ja monesta moneen olioiden näkökulmasta. <strong>oliokaavio</strong>na. Oliokaavioita käytetään ohjelmien tilan muutosten tarkasteluun ohjelman suorituksen aikana. Keskiössä ovat ohjelman käsittelemät oliot, olioiden muuttujien arvot sekä viitteet olioiden välillä. Valmiit kokoelmaluokat (esim. ArrayList) sivuutetaan siten, että viitteet piirretään olioiden välille.
</p>

<p>
  Oletetaan, että käytössämme on edellä kuvatut luokat <code>Annos</code> ja <code>RaakaAine</code>.
</p>

<% partial 'partials/code_highlight' do %>
  RaakaAine kk = new RaakaAine("Kesäkurpitsa");
  RaakaAine jl = new RaakaAine("Jauheliha");
  RaakaAine juusto = new RaakaAine("Emmentaljuusto");

  Annos vuoka = new Annos("Jauheliha-kesäkurpitsavuoka", "iso", 3);
  Annos paistos = new Annos("Jauheliha-kesäkurpitsapaistos", "sopiva", 4);

  vuoka.lisaaRaakaAineet(kk, jl, juusto);
  paistos.lisaaRaakaAine(kk, jl, juusto);
<% end %>

<p>
  Ohjelman tila suorituksen lopussa piirretään oliokaaviona seuraavasti. Jokainen olio merkitään omana laatikkonaan, mikä sisältää sekä olion nimen ja tyypin että oliomuuttujat. Oliomuuttujien arvot merkitään myös oliokaavioon. Alla olevasta oliokaaviosta näkee, että annoksen ja raaka-aineen välillä on monesta moneen yhteys -- annoksella voi olla monta raaka-ainetta ja raaka-aine voi liittyä useampaan annokseen.
</p>

<figure>
  <img src="/img/oliokaavio-1.png" alt="[kk:RaakaAine|nimi=Kesäkurpitsa], [jl:RaakaAine|nimi=Jauheliha], [juusto:RaakaAine|nimi=Emmentaljuusto], [vuoka:Annos|nimi=Jauheliha-kesäkurpitsavuoka;koko=iso;hinta=3], [paistos:Annos|nimi=Jauheliha-kesäkurpitsapaistos;koko=sopiva;hinta=4], [vuoka:annos]-[kk:RaakaAine], [vuoka:annos]-[jl:RaakaAine], [vuoka:annos]-[juusto:RaakaAine], [paistos:annos]-[kk:RaakaAine], [paistos:annos]-[jl:RaakaAine], [paistos:annos]-[juusto:RaakaAine]"/>
  <figcaption>
    <p>
      Edellä kuvatun raaka-aineita ja annoksia käsittelevän ohjelman tila suorituksen lopussa.
  </figcaption>
</figure>

<p>
  Tarkastellaan seuraavaksi Asiakkaan ja Tilauksen välistä yhteyttä oliokaaviona. Oletetaan, että oliokaaviona piirretään alla kuvatun ohjelman lopputilanne.
</p>

<% partial 'partials/code_highlight' do %>
  Asiakas kusti = new Asiakas("Kusti", "...", "...", 33100, "Tampere");
  Asiakas pukki = new Asiakas("JP", "...", "...", 99999, "Korvatunturi");

  Tilaus t1 = new Tilaus(kusti, "polkupyörä");
  Tilaus t2 = new Tilaus(pukki, "helikopteri");
  Tilaus t3 = new Tilaus(pukki, "helikopteri");

  t1.vastaanotettu = true;
  t3.vastaanotettu = true;
<% end %>

<figure>
  <img src="/img/oliokaavio-2.png" alt="[kusti:Asiakas|nimi=Kusti;puhelinnumero=...;katuosoite=...;postinumero=33100;postitoimipaikka=Tampere]
					[pukki:Asiakas|nimi=JP;puhelinnumero=...;katuosoite=...;postinumero=99999;postitoimipaikka=Korvatunturi]
					[t1:Tilaus|aika=1516562032;kuljetustapa=polkupyörä;vastaanotettu=true;toimitettu=false]
					[t2:Tilaus|aika=1516563032;kuljetustapa=helikopteri;vastaanotettu=false;toimitettu=false]
					[t3:Tilaus|aika=1516564032;kuljetustapa=helikopteri;vastaanotettu=true;toimitettu=false]
					[kusti:Asiakas]-[t1:Tilaus]
					[pukki:Asiakas]-[t2:Tilaus]
					[pukki:Asiakas]-[t3:Tilaus]"/>
  <figcaption>
    <p>
      Edellä kuvatun asiakkaiden ja tilausten yhteyksiä käsittelevän ohjelman tila suorituksen lopussa.
  </figcaption>
</figure>

<p>
  Yllä olevaa oliokaaviota tarkasteltaessa huomaamme, ettei jokaiseen tilaukseen liittyy vain yksi asiakas, mutta asiakkaalla voi olla useampia tilauksia.
</p>


<% partial 'partials/hint', locals: { name: 'Miten oliokaaviot liittyvät tietokantoihin?' } do %>

  <p>
    Oliokaavioiden avulla näytetään ohjelman suorituksen aikainen olioiden tila, joka kertoo olioiden muuttujien arvoista. Tietokannanhallintajärjestelmien tehtävänä on tallentaa ja ylläpitää tietoa -- esimerkiksi olioiden tilaa. Ymmärtämällä miten olioiden tila voidaan esittää, löydämme ehkäpä selkeän kytköksen tietokantojen sisältämän tiedon esittämiselle.
  </p>

<% end %>




## ER-kaavio (ainakin osittain) - CHENin notaatio


## Tietokantakaavio


## Luokkakaaviosta tietokantakaavioksi


<% partial 'partials/material_heading' do %>
  Luokkakaaviosta relaatiokaavioksi (eli tietokantakaavioksi)
<% end %>

<p>
  <strong>Tietokantakaavio</strong> (myös relaatiokaavio) on kuvaus tietokantatauluista sekä tietokantatauluihin liittyvistä tiedoista. Relaatiokaavion perusteella luodaan tietokantataulujen luomiseen tarvittavat kyselyt. Tutustutaan ensin termiin <em>relaatio</em> ja harjoitellaan sen jälkeen luokkakaavion muuntamista relaatiokaavioksi.
</p>

<% partial 'partials/material_sub_heading' do %>
  Relaatiomalli
<% end %>

<p>
  Relaatiomallin perusajatus on tallennettavan tiedon jakaminen käsitteisiin sekä käsitteiden välisiin yhteyksiin. Jokaista käsitettä vastaa relaatiotietokannassa taulu, ja jokaiselle käsitteen ominaisuudelle eli attribuutille on taulussa oma sarake. Jokainen taulun rivi vastaa yhtä käsitteen ilmentymää, ja tietokantatauluja määriteltäessä taululle määritellään tyypillisesti myös <em>avain</em>, jonka perusteella kukin rivi -- eli käsitteen ilmentymä -- voidaan yksilöidä.
</p>

<p>
  Relaatiomallille on myös hieman formaalimpi määritelmä, johon tutustutaan seuraavaksi. Noudatamme tässä Edgar Coddin vuonna 1970 julkaistun artikkelin <a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.98.5286&rep=rep1&type=pdf" target="_blank" norel>"A Relational Model of Data for Large Shared Data Banks"</a> esitysasua.
</p>

<% partial 'partials/material_sub_sub_heading' do %>
  Relaatio
<% end %>

<p>
  Olkoon <em>S<sub>1</sub>, S<sub>2</sub>, ..., S<sub>n</sub></em> arvojoukkoja, joiden sisältämät arvot eivät ole välttämättä täysin erillisiä. Relaatio <em>R</em> on joukko <em>n</em> alkion kokoisia monikkoja. Jokaisen relaatiossa R olevan monikon ensimmäisen arvon tulee kuulua joukkoon <em>S<sub>1</sub></em>, toisen arvon kuulua joukkoon <em>S<sub>2</sub></em> jne.
</p>

<p>
  Relaatio <em>R</em> on siis osajoukko joukkojen <em>S<sub>1</sub>, S<sub>2</sub>, ..., S<sub>n</sub></em> välisestä karteesisesta tulosta <em>S<sub>1</sub> &#10799; S<sub>2</sub> &#10799; ... &#10799; S<sub>n</sub></em>.
</p>

<p>
  Relaatio esitetään tyypillisesti taulukkona, jolla on seuraavat ominaisuudet:
</p>

<ul>
  <li>Jokainen taulukon rivi kuvaa yhtä relaation R monikkoa.</li>
  <li>Taulukon rivien järjestyksellä ei ole väliä.</li>
  <li>Jokainen taulukon rivi on erilainen.</li>
  <li>Sarakkeiden järjestyksellä kuvataan relaation arvojoukkoja; ensimmäisen sarakkeen arvot tulevat arvojoukosta S<sub>1</sub>, toisen sarakkeen arvojoukosta S<sub>2</sub> jne..</li>
  <li>Jokaiselle sarakkeelle annetaan nimi, joka kuvaa kunkin arvojoukon mahdollisia arvoja.</li>
</ul>

<% partial 'partials/material_sub_sub_heading' do %>
  Pääavain, viittaaminen ja viiteavain
<% end %>

<p>
  Jokaisella relaatiolla on tyypillisesti yksi arvojoukko tai arvojoukkojen yhdistelmä, joiden arvojen perusteella voidaan yksilöidä relaation monikko (eli taulukon rivi). Tällaista arvojoukkoa tai arvojoukkojen yhdistelmää kutsutaan <em>pääavaimeksi</em>. Oleellinen ominaisuus relaatioissa on myös saman tai toisen relaation arvoihin <em>viittaaminen</em>. Tämä tapahtuu <em>viiteavaimen</em> avulla. Relaatiossa R oleva arvojoukko tai arvojoukkojen yhdistelmä, joka ei ole relaation R pääavain, mutta sisältää jonkun relaation pääavaimia, on viiteavain.
</p>


<% partial 'partials/material_sub_sub_heading' do %>
  Joukko-operaatiot ja kyselyt
<% end %>

<p>
  Relaatiot ovat joukkoja, joten niitä voi käsitellä joukko-opin operaatioiden avulla. Tällä kurssilla näihin ei syvennytä tarkemmin, mutta teemasta kiinnostuneiden kannattanee lukea klassikkoteos <a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.98.5286&rep=rep1&type=pdf" target="_blank">"A Relational Model of Data for Large Shared Data Banks"</a>.
</p>



<% partial 'partials/material_sub_heading' do %>
  Muunnos luokkakaaviosta relaatiokaavioksi
<% end %>

<p>
  Muunnos luokkakaaviosta relaatiokaavioksi tapahtuu seuraavia askeleita noudattaen:
</p>

<ul>
  <li>
    Askel 1: määrittele jokaiselle luokkakaavion käsitteelle käsitteen ilmentymän yksilöivä pääavain.
  </li>
  <li>
    Askel 2: monen suhden moneen -yhteyksien käsittely lisäämällä yhteyteen liitostaulu, mikä muuntaa yhteydet yhden suhde moneen -muotoisiksi
  </li>
  <li>
    Askel 3: yhden suhde moneen -yhteyksien käsittely lisäämällä "moneen"-yhteyden päädyssä olevaan tauluun viiteavain
  </li>
</ul>

<p>
  Tarkastellaan edellä kuvattuja askeleita ja muunnetaan aiemmin käsitelty tilausjärjestelmän luokkakaavio tietokantakaavioksi.
</p>


<figure>
  <img src="/img/ravintola/luokkakaavio.png" alt="[Asiakas|nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
						  [Ravintola|nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
						  [Annos|nimi:String;koko:String;hinta:double]
						  [Tilaus|aika:Date;kuljetustapa:String;vastaanotettu:Boolean;toimitettu:Boolean]
						  [RaakaAine|nimi:String]

						  [Asiakas]1-*[Tilaus]
						  [Tilaus]*-*[Annos]
						  [Annos]*-*[RaakaAine]
						  [Ravintola]1-*[Annos]"/>
  <figcaption>
    Tietokantakaavioksi muunnettava tilausjärjestelmän luokkakaavio.
  </figcaption>
</figure>


<% partial 'partials/material_sub_sub_heading' do %>
  Käsitteen yksilöivän pääavaimen määrittely
<% end %>

<p>
  Ensimmäisessä askeleessa määrittelemme jokaiselle käsitteelle pääavaimen (primary key). <strong>Pääavain</strong> yksilöi käsitteen ilmentymän. Pääavaimella on muutamia ominaisuuksia: sen täytyy olla uniikki (sama arvo ei saa esiintyä samassa taulussa useampaan kertaan) ja se ei saa olla tyhjä. Pääavaimeksi valitaan (nykyään) tyypillisesti juokseva numero. Käytössämme olevissa relaatiokaaviossa pääavain merkitään merkinnällä (pk).
</p>

<p>
  Alla tilausjärjestelmän luokkakaavioon on merkitty pääavaimet.
</p>


<figure>
  <img src="/img/ravintola/luokkakaavio-paaavaimilla.png" alt="[Asiakas|(pk) id:Integer; nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
							       [Ravintola|(pk) id:Integer;nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
							       [Annos|(pk) id:Integer;nimi:String;koko:String;hinta:double]
							       [Tilaus|(pk) id:Integer;aika:Date;kuljetustapa:String;vastaanotettu:Boolean;toimitettu:Boolean]
							       [RaakaAine|(pk) id:Integer;nimi:String]

							       [Asiakas]1-*[Tilaus]
							       [Tilaus]*-*[Annos]
							       [Annos]*-*[RaakaAine]
							       [Ravintola]1-*[Annos]"/>
  <figcaption>
    Tilausjärjestelmän luokkakaavion muunnos relaatiokaavioksi, askel 1. Ensimmäisessä askeleessa jokaiseen käsitteeseen määritellään pääavain, jonka perusteella kukin käsitteen ilmentymä voidaan yksilöidä. Tässä käytetään numeerista tunnusta, eli esimerkiksi uutta asiakasta luodessa asiakkaan tunnus on numero, joka ei ole vielä yhdenkään muun asiakkaan käytössä (numerot merkitään tyypillisesti juoksevasti 1...n).
  </figcaption>
</figure>


<% partial 'partials/material_sub_sub_heading' do %>
  Monen suhde moneen -yhteyksien käsittely
<% end %>

<p>
  Askeleessa kaksi käsitellään monen suhde moneen -yhteydet.
</p>

<p>
  Monen suhde moneen -yhteydet muunnetaan yhden suhde moneen -tyyppisiksi lisäämällä monen suhde moneen -yhteyksille niin kutsuttu liitostaulu. Liitostaulun avulla saadaan selville mikä käsitteen ilmentymä liittyy mihinkin toisen käsitteen ilmentymään.
</p>

<p>
  Käytännössä muunnos tapahtuu seuraavasti. Alla olevassa kuvassa on monen suhde moneen -yhteys käsitteiden Annos ja Raaka-aine välillä. Käsitteille annos ja raaka-aine on jo määritelty pääavaimet.
</p>

<figure>
  <img src="/img/ravintola/annos-raaka_aine-paaavaimilla.png" alt="[Annos|(pk) id:Integer;nimi:String;koko:String;hinta:double]
								   [RaakaAine|(pk) id:Integer;nimi:String]
								   [Annos]*-*[RaakaAine]"/>
  <figcaption>
    Monen suhde moneen -yhteys annoksen ja raaka-aineen välillä. Käsitteille annos ja raaka-aine on määritelty pääavaimet askeleessa yksi.
  </figcaption>
</figure>

<p>
  Luodaan käsitteiden välille liitostaulu AnnosRaakaAine. Liitostaulusta AnnosRaakaAine on yhden suhde moneen -yhteys käsitteisiin Annos ja Raaka-aine. Käytännössä yksi AnnosRaakaAine-käsitteen ilmentymä yksilöi aina yksittäisen annos - raaka-aine -parin.
</p>


<figure>
  <img src="/img/ravintola/annos-raaka_aine-paaavaimilla-liitostaulu.png" alt="[Annos|(pk) id:Integer;nimi:String;koko:String;hinta:double]
									       [RaakaAine|(pk) id:Integer;nimi:String]
									       [AnnosRaakaAine]
									       [Annos]1-*[AnnosRaakaAine]
									       [AnnosRaakaAine]*-1[RaakaAine]"/>
  <figcaption>
    Monen suhde moneen -yhteys annoksen ja raaka-aineen välillä muunnettu liitostaulun avulla kahdeksi yhden suhde moneen -yhteydeksi. Taulu (tai käsite) AnnosRaakaAine pitää kirjaa kuhunkin annokseen liittyvistä raaka-aineista.
  </figcaption>
</figure>



<p>
  Jokainen monesta moneen suhde käsitellään yksitellen. Kun kaikki monen suhde moneen -yhteydet on käsitelty, kaavio on seuraavanlainen.
</p>



<figure>
  <img src="/img/ravintola/luokkakaavio-paaavaimilla-monesta-moneen-poistettu.png" alt="[Asiakas|(pk) id:Integer;nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
											[Ravintola|(pk) id:Integer;nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
											[Annos|(pk) id:Integer;nimi:String;koko:String;hinta:double]
											[Tilaus|(pk) id:Integer;aika:Date;kuljetustapa:String;vastaanotettu:Boolean;toimitettu:Boolean]
											[RaakaAine|(pk) id:Integer;nimi:String]
											[AnnosRaakaAine]
											[TilausAnnos]

											[Asiakas]1-*[Tilaus]
											[Tilaus]1-*[TilausAnnos]
											[TilausAnnos]*-1[Annos]
											[Annos]1-*[AnnosRaakaAine]
											[AnnosRaakaAine]*-1[RaakaAine]
											[Ravintola]1-*[Annos]"/>
  <figcaption>
    Tilausjärjestelmän muunnos relaatiokaavioksi, askel 2. Toisessa askeleessa jokainen monesta moneen -yhteys on pilkottu osiin lisäämällä yhteyteen liitostaulu. Liitostaulut yhdistävät monesta moneen -yhteyden käsitteet yhdestä moneen -yhteydellä.
  </figcaption>
</figure>







<% partial 'partials/material_sub_sub_heading' do %>
  Yhden suhde moneen -yhteyksien käsittely
<% end %>

<p>
  Yhden suhde moneen -yhteydet käsitellään lisäämällä yhteyden tähdellä merkittyyn käsitteeseen <em>viiteavain</em>, joka viittaa käsitteeseen, joka on merkitty yhteydessä ykkösellä. <strong>Viiteavain</strong> viittaa toisen käsitteen pääavaimeen. Viiteavain siis yksilöi (toisen) käsitteen ilmentymän, johon nykyinen käsite viittaa. Käytössämme olevissa relaatiokaaviossa viiteavain merkitään merkinnällä (fk), jonka lisäksi viiteavaimen nimi ja tyyppi kertoo minkä käsitteen pääavaimeen viiteavain viittaa.
</p>




<figure>
  <img src="/img/ravintola/asiakas-tilaus-paaavaimilla.png" alt="[Asiakas|(pk) id:Integer;nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
								 [Tilaus|(pk) id:Integer;aika:Date;kuljetustapa:String;vastaanotettu:Boolean;toimitettu:Boolean]
								 [Asiakas]1-*[Tilaus]"/>
  <figcaption>
    Yhden suhde moneen. Yllä yhteen asiakkaaseen voi liittyä monta tilausta, mutta yksi tilaus liittyy aina täsmälleen yhteen asiakkaaseen.
  </figcaption>
</figure>


<p>
  Yllä oleva yhden suhde moneen yhteys käsitellään lisäämällä Tilaus-käsitteeseen viiteavain, joka viittaa asiakkaaseen. Tämän viiteavaimen perusteella jokaisesta tilauksesta saa selville tilaukseen liittyvän asiakkaan.
</p>



<figure>
  <img src="/img/ravintola/asiakas-tilaus-paaavaimilla-ja-viiteavaimilla.png" alt="[Asiakas|(pk) id:Integer;nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
										   [Tilaus|(pk) id:Integer;(fk) asiakas_id:Asiakas;aika:Date;kuljetustapa:String;vastaanotettu:Boolean;toimitettu:Boolean]
										   [Asiakas]1-*[Tilaus]"/>
  <figcaption>
    Yhden suhde moneen. Yllä yhteen asiakkaaseen voi liittyä monta tilausta, mutta yksi tilaus liittyy aina täsmälleen yhteen asiakkaaseen.
  </figcaption>
</figure>


<p>
  Jokainen yhdestä moneen suhde käsitellään yksitellen. Kun kaikki yhdestä moneen -yhteydet on käsitelty, kaavio on seuraavanlainen.
</p>



<figure>
  <img src="/img/ravintola/luokkakaavio-paaavaimilla-ja-viiteavaimilla.png" alt="[Asiakas|(pk) id:Integer;nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
										 [Ravintola|(pk) id:Integer;nimi:String;puhelinnumero:String;katuosoite:String;postinumero:Integer;postitoimipaikka:String]
										 [Annos|(pk) id:Integer;(fk) ravintola_id:Ravintola;nimi:String;koko:String;hinta:double]
										 [Tilaus|(pk) id:Integer;(fk) asiakas_id:Asiakas;aika:Date;kuljetustapa:String;vastaanotettu:Boolean;toimitettu:Boolean]

        						 [RaakaAine|(pk) id:Integer;nimi:String]
										 [AnnosRaakaAine|(fk) annos_id:Annos;(fk) raaka_aine_id:RaakaAine]
										 [TilausAnnos|(fk) tilaus_id:Tilaus;(fk) annos_id:Annos]

										 [Asiakas]1-*[Tilaus]
										 [Tilaus]1-*[TilausAnnos]
										 [TilausAnnos]*-1[Annos]
										 [Annos]1-*[AnnosRaakaAine]
										 [AnnosRaakaAine]*-1[RaakaAine]
										 [Ravintola]1-*[Annos]"/>
  <figcaption>
    Tilausjärjestelmän muunnos relaatiokaavioksi, askel 3. Kolmannessa askeleessa jokaiseen yhdestä moneen -yhteyteen on lisätty viiteavain. Viiteavain lisätään päätyyn, jossa on yhteyden tähti.
  </figcaption>
</figure>


<p>
  Edellä kuvatun tietokantakaavion voi kuvata myös tekstimuodossa seuraavasti. Pääavaimet merkitään etuliitteellä <code>(pk)</code>, jonka lisäksi niille kerrotaan tyyppi. Viiteavaimet merkitään etuliitteellä <code>(fk)</code>, jonka lisäksi niihin merkitään viitatun tietokantakaavion nimi, esim <code>(fk) tilaus_id -&gt; Tilaus</code>.
</p>

<ul>
  <li>Asiakas((pk) id:Integer, nimi:String, puhelinnumero:String, katuosoite:String, postinumero:Integer, postitoimipaikka:String)</li>
  <li>Ravintola((pk) id:Integer, nimi:String, puhelinnumero:String, katuosoite:String, postinumero:Integer, postitoimipaikka:String)</li>
  <li>Annos((pk) id:Integer, (fk) ravintola_id -&gt; Ravintola, nimi:String, koko:String, hinta:double)</li>
  <li>Tilaus((pk) id:Integer, (fk) asiakas_id -&gt; Asiakas, aika:Date, kuljetustapa:String, vastaanotettu:Boolean, toimitettu:Boolean)</li>
  <li>RaakaAine((pk) id:Integer, nimi:String)</li>
  <li>AnnosRaakaAine((fk) annos_id - &gt; Annos, (fk) raaka_aine_id -&gt; RaakaAine)</li>
  <li>TilausAnnos((fk) tilaus_id - &gt; Tilaus, (fk) annos_id -&gt; Annos)</li>
</ul>


<% partial 'partials/hint', locals: { name: 'Menikö oikein?' } do %>

  <p>
    Luokkakaavion muunnos relaatiokaavioksi tapahtuu kolmen askeleen kautta. Voit tarkastella relaatiokaavion toimivuutta poistamalla kaikki yhteyksiä kuvaavat viivat.
  </p>

  <p>
    Piirrä tämän jälkeen viivat takaisin viiteavainten perusteella. Viiteavaimen sisältävän käsitteen päätyyn päätyyn tulee aina tähti ja viivan toiseen päätyyn numero 1. Jos viiteavaimia seuraamalla tapahtunut piirtäminen tuottaa saman kaavion kuin mikä askelia seuraamalla saatu lopputulos oli, on kaavio melko suurella todennäköisyydellä kunnossa.
  </p>

<% end %>





<% partial 'partials/hint', locals: { name: 'Perintä ja luokkakaaviosta tietokantakaavioksi' } do %>

  <p>
    Perintä käsitellään tietokantakaaviossa yhden suhde yhteen -tyyppisenä yhteytenä. Kun perintänä merkittyä yhteyttä muunnetaan tietokantakaavioksi, lisätään perivään käsitteeseen viiteavain, joka viittaa perittävään käsitteeseen. Edellinen opiskelija-henkilö -esimerkki muuntuu seuraavanlaiseksi tietokantakaavioksi.
  </p>


  <figure>
    <img src="/img/opiskelija-perii-henkilon-tietokantakaavio.png" alt="[Henkilo|(pk) id: Integer; nimi:String;syntymäaika:Date;email:String], [Opiskelija|(pk) id: Integer; (fk) henkilo_id: Henkilo; opiskelijanumero:String], [Henkilo]-[Opiskelija]"/>
    <p>&nbsp;</p>
  </figure>

<% end %>
