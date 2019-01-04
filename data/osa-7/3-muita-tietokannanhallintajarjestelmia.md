---
path: '/osa-7/3-muita-tietokannanhallintajarjestelmia'
title: 'Muita tietokannanhallintajärjestelmiä'
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet pinnallisesti muutamia NoSQL- ja NewSQL-tietokantoja.

</text-box>


<% partial 'partials/material_heading' do %>
  Jotain muuta kuin relaatiomallia noudattavat tietokannat
<% end %>

<p>
  Relaatiomalli ja SQL ovat hyvin ilmaisuvoimainen kombinaatio ja relaatiotietokannoilla pystytään ainakin teoriassa hoitamaan lähes kaikki mahdolliset tiedonhallintatarpeet. Relaatiotietokannat dominoivatkin yhä tietokantaskeneä. 2000-luvulla alkoi kuitenkin nousta esiin uudentyyppisiä tietokantaratkaisuja, joita kuvaamaan lanseerattiin vuonna 2009 termi <em>NoSQL</em>.
</p>


<% partial 'partials/material_sub_heading' do %>
  Syitä uusien tietokantaratkaisujen syntyyn
<% end %>

<p>
  Motivaatiota NoSQL-tietokantojen syntyyn oli muutamia. Ehkä tärkeimpänä tekijänä olivat massiivisen skaalan internetpalveluiden, esim. Amazonin ja Googlen käsittelemät tietomäärät, jotka edellyttävät tiedon hajautettua tallentamista ja käsittelyä. Relaatiomallia oli mahdotonta saada skaalautumaan palveluiden tarpeeseen ja yhtiöt kehittivät omia, aivan uudenlaisia tietokantaratkaisuja. Yhteistä näille oli se, että ne <em>skaalautuivat</em> hyvin, eli niiden suorituskyky oli mahdollista pitää riittävällä tasolla liittämällä tietokantaan uusia "koneita" kuormituksen kasvaessa, ja myös se, että toiminnallisuudeltaan ratkaisut olivat paljon rajoittuneempia kuin relaatiotietokannat.
</p>

<p>
  Useimmat uudet tietokantaratkaisut tarjoavat paljon suppeamman kyselykielen kuin SQL ja ne eivät tue ACID-ominaisuuksia takaavia transaktioita. Hyvin tavanomaista uusissa tietokannoissa on se, että ne eivät yritäkään tarjota samanlaista ajantasaisuutta kuin relaatiotietokannat, eli sen sijaan, että kaikki kannan käyttäjät näkisivät tietokannan tilan koko ajan samanlaisena (ACID:in C eli consistency), on käytössä <em>eventual consistency</em> -malli, jossa periaatteena on, että jokainen tietokantaan tehty muutos näkyy kaikille käyttäjille ennemmin tai myöhemmin, mutta ei välttämättä heti. Käytännössä jonkun aikaa tilanne voi olla se, että tietokannan eri käyttäjät näkevät tietokannan tilan hieman erilaisena. Jos ajatellaan monia internetpalveluita täydellinen konsistenssi ei ole kaikkien operaatioiden suhteen välttämätöntä. Ei esim. haittaa vaikka yksittäisen käyttäjän Facebook-päivitykset eivät ilmesty kaikille käyttäjille aivan samalla hetkellä.
</p>

<p>
  Toisena vahvana motivaationa uusien tietokantamallien kehittymiselle oli tarve joustavammille tavoille tallettaa erimuotoista dataa. Relaatiomalli nojaa vahvasti siihen että kannan skeema, eli taulut ja taulujen sarakkeet on ennalta määritelty. Jos syntyy usein tarve tallettaa uudenlaista dataa, esim. tauluihin tulee viikoittain uusia sarakkeita, tai jopa uudenlaisia tauluja, on relaatiomalli kankeahko. Toisaalta myös tarve tallettaa jokainen "asia" omaan tauluunsa tekee relaatiomallista kankean ja kyselyllisestikin raskaan tiettyihin käyttötarkoituksiin. Lääkkeenä näihin ongelmiin on syntynyt tietokantaratkaisuja, joissa datan skeema on huomattavasti löyhemmin määritelty kuin relaatiomallissa. Monissa uusissa tietokantatyypeissä data on tietokannan kannalta jopa täysin skeematonta, eli "tauluihin" voi tallettaa vapaamuotoista dataa, ja vastuu tiedon muodon oikeellisuudesta on siirretty täysin tietokannan käyttäjäjälle.
</p>


<% partial 'partials/material_sub_heading' do %>
  Erityyppiset NoSQL-tietokannat
<% end %>

<p>
  Kaikki relaatiotietokannat ovat enemmän tai vähemmän samanlaisia ja tarjoavat standardoidun tavan eli SQL:n tietojen kyselyyn, ylläpitoon sekä tietokantaskeemojen muokkaukseen. NoSQL-tietokantojen kohdalla tilanne on täysin erilainen, ne ovat tiedon organisaatiotavoiltaan hyvinkin erilaisia ja mitään SQL:ää vastaavaa standardoitua kyselykieltä ei ole, kaikilla NoSQL-tietokannoilla on oma tapansa kyselyjen muodostamiseen.
</p>

<p>
  NoSQL-tietokannat voidaan jakaa tiedon organisointitapansa perusteella neljään eri luokkaan:
</p>

<ul>
  <li>avain-arvotietokantoihin (engl. key value databases),</li>
  <li>dokumenttitietokantoihin (engl. document databases),</li>
  <li>saraketietokantoihin (engl. columnar databases) ja</li>
  <li>verkkotietokantoihin (engl. graph databases)</li>
</ul>

<p>
  Tarkastellaan nyt erilaisia NoSQL-tietokantoja hieman tarkemmin.
</p>


<% partial 'partials/material_sub_sub_heading' do %>
  Avain-arvotietokannat, esim. Redis
<% end %>

<p>
  Avain-arvotietokannat tarjoavat erittäin rajoitetun tietomallin. Kantaan talletetaan <em>arvoja</em> sekä arvon yksilöiviä <em>avaimia</em>. Tietokannan suhteen talletettavilla arvoilla ei ole (yleensä) mitään skeemaa eli rakennetta. Sovellusten on tulkittava kantaan talletettavat arvot haluamallaan tavalla esim. tietyn tyyppisenä oliona. Koska tietokanta on täysin skeematon, eivät avain-arvotietokannat tue viitteitä kantaan talletettujen arvojen välillä, eli mitään relaatiotietokantojen liitosta vastaavaa käsitettä ei avain-arvotietokannoilla ole.
</p>

<p>
  Avain-arvotietokantojen tarjoamat kyselymahdollisuudet ovat erittäin rajoittuneet, yleensä on ainoastaan mahdollista hakea kannasta tiettyä avainta vastaava arvo.
</p>

<p>
  Tarkastellaan nyt <a href="http://redis.io/">Redisiä</a> joka on eräs suosituimmista avain-arvotietokannoista.
</p>

<p>
  Redisin perusoperaatiot ovat <code>set</code>, <code>get</code> ja <code>del</code> joiden avulla käsitellään merkkijonomuotoisena talletettavia arvoja.
</p>

<p>
  Seuraavassa esimerkissä käynnistetään Redis-konsoli, asetetaan arvo avaimille <em>arto, aino</em> ja <em>olli</em>. Haetaan kannasta muutamaa avainta vastaavia tietoja ja tuhotaan avaimeen <em>arto</em> liittyvä arvo.
</p>

<% partial 'partials/sample_output' do %>
melkki$ redis-cli
127.0.0.1:6379> set arto "olen arto 29 vuotta, yliopisto-opettaja"
OK
127.0.0.1:6379> set aino "olen aino 21 vuotta, pajaohjaaja"
OK
127.0.0.1:6379> set olli "olen olli 19 vuotta, fuksi"
OK
127.0.0.1:6379> get pekka
(nil)
127.0.0.1:6379> get arto
"olen arto 29 vuotta, yliopisto-opettaja"
127.0.0.1:6379> del arto
127.0.0.1:6379> get arto
(nil)
127.0.0.1:6379> get aino
"olen aino 21 vuotta, pajaohjaaja"
127.0.0.1:6379>
<% end %>

<p>
  Redis on siis erittäin yksinkertainen ja toimii oikeastaan hyvin samaan tapaan kuin Javan <code>HashMap</code> sillä erotuksella, että Redisiin ei voi helposti tallentaa normaaleja oliota, ja että Redisiin tallennetut arvot säilyvät vaikka ohjelma uudelleenkäynnistettäisiin.
</p>

<p>
  Redis tajoaa tuen myös arvoille jotka ovat lukuja, joukkoja tai hashejä eli itsessään avain-arvo-pareja.
</p>

<p>
  Mitä järkeä avain-arvotietokannoissa on? Ne vaikuttavat ominaisuuksiltaan erittäin rajoittuneilta ja relaatiotietokannoilla pystyy tekemään varmasti kaikki ne asiat, joihin avain-arvotietokannat pystyvät. Rajoituksistaan johtuen avain-arvotietokannat ovat kuitenkin suorituskyvyltään ja skaalautuvuudeltaan huomattavasti parempia kuin relaatiotietokanta, ja niiden avulla pystytään kuitenkin ratkaisemaan monia sovellusten käyttötarpeita.
</p>

<p>
  Viime aikoina on kuitenkin ollut nousussa trendi, jonka nimitys englanniksi on <a href="http://martinfowler.com/bliki/PolyglotPersistence.html">polyglot persistance</a>, joka tarkoittaa suurinpiirtein sitä, että sovelluksessa on useita erityyppisiä tietokantoja ja kuhunkin käyttötarkoitukseen käytetään tarkoituksenmukaisinta ratkaisua.
</p>

<p>
  Eräs hyvin yleinen käyttötarkoitus avain-arvotietokannoille on raskaiden operaatioiden tulosten väliaikainen talletus (engl. caching) mahdollisia uusia saman operaatioiden suorituksia varten.
</p>

<p>
  Tarkastellaan tästä estimerkkinä internetistä <a href="http://openweathermap.org/api">Open Weather API:sta</a> eri kaupunkien säätietoja hakevaa ohjelmaa. Ohjelma toiminta näyttää seuraavalta:
</p>

<% partial 'partials/sample_output' do %>
kaupunki: helsinki
few clouds, temperature 15.770000000000039 celcius
kaupunki: turku
Sky is Clear, temperature 16.0 celcius
kaupunki: vladivostok
scattered clouds, temperature 11.360000000000014 celcius
kaupunki:
<% end %>

<p>
  Jokaisen kaupungin kohdalla ohjelma hakee kaupungin säätiedot internetistä. Tiedon haku verkosta on kuitenkin hidas ja resurssien kulutuksen suhteen "kallis" operaatio (asialla voisi olla merkitystä jos ohjelmallamme olisi satoja tai tuhansia yhtäaikaisia käyttäjiä). Koska säätiedot pysyvät suunnilleen samana useiden minuuttien ajan, ohjelmaa voi optimoida siten, että kun käydään kerran hakemassa jonkun kaupungin säätiedot, talletetaan tieto joksikin aikaa Redisiin. Jos kaupungin säätä kysytään pian uudelleen, saadaan vastaus nopeasti ilman kallista internetoperaatiota. Noudatetaan siis näytettävien säätietojen suhteen eventual consistency -mallia.
</p>

<p>
  Seuraavassa sääpalvelun toteuttavan luokan <stron>WeatherService</strong> toteutus, joka hyödyntää <a href="https://github.com/xetorthio/jedis">Jedis</a>-kirjastoa Redis-operaatioiden tekemiseen:
</p>

<% partial 'partials/code_highlight' do %>
import redis.clients.jedis.Jedis;

public class WeatherService {
    private Jedis jedis;

    public WeatherService() {
        // luodaan yhteys paikallisen koneen Redisiin
        jedis = new Jedis("localhost");
    }

    public void weatherOf(String city) throws Exception {
        // kutsutaan metodia, joka hakee tiedot joko
        // Redisistä tai internetistä
        JsonElement weatherData = getDataFor(city);

        // haetaan vastauksen sisältä oikeat osat
        double temperature = getTemperatureFrom(weatherData);
        String desc = getDescriptionFrom(weatherData);

        System.out.println(desc + ", temperature "+temperature+ " celcius");
    }

    // metodi joka hakee tiedot joko Redisistä tai internetistä
    private JsonElement getDataFor(String city) throws Exception {
        // etsitään kaupungin city säätietoja Redisistä
        String weatherInfo = jedis.get(city);

        // jos ei löytyny
        if (weatherInfo==null) {
            // haetaan tiedot internetistä
            weatherInfo = readFromUrl("http://api.openweathermap.org/data/2.5/weather?q="+city);

            // ja talletetaan ne Redisiin
            jedis.set(city, weatherInfo);
            // määritellään tallennusajaksi 10 minuuttia eli 600 sekuntia
            jedis.expire(city, 600);
        }

        // palautetaan tuote oikein muotoiltuna
        return new JsonParser().parse(weatherInfo);
    }

    // apumetodeja...
}
<% end %>

<p>
  Palvelua käytetään seuraavasti:
</p>

<% partial 'partials/code_highlight' do %>
  WeatherService weather = new WeatherService();
  weather.weatherFor("Helsinki");
<% end %>

<p>
  Kun haemme ensimmäistä kertaa esim. Helsingin tietoja, etsitään niitä (metodissa <code>getDataFor</code>) ensin rediksestä:
</p>

<% partial 'partials/code_highlight' do %>
  // nyt city = "Helsinki"
  String weatherInfo = jedis.get(city);
<% end %>

<p>
  tiedot eivät löydy, joten metodi palauttaa <code>null</code>. Tämän takia mennään if-haaraan, jossa tiedot haetaan apumetodin avulla internetistä. Haetut tiedot talletetaan ensin Redisiin:
</p>

<% partial 'partials/code_highlight' do %>
  // nyt city="Helsinki" ja weatherInfo Helsingin sään 'raakadata'
  jedis.set(city, weatherInfo);
<% end %>

<p>
  talletetulle datalle asetetaan myös elinaika sekunteina:
</p>

<% partial 'partials/code_highlight' do %>
  jedis.expire(city, 600);
<% end %>

<p>
  tämän jälkeet data palautetaan kutsujalle.
</p>

<p>
  Jos Helsingin säätietoja haetaan 600 sekunnin sisällä uudelleen, löytyvät tiedot suoraan Redisistä. 600 sekunnin kuluttua hakuoperaatio <code>jedis.get('Helsinki')</code> palauttaa jälleen <code>null</code> ja tuore säätilanne haetaan internetistä.
</p>

<p>
  Ohjelman koodi kokonaisuudessan löytyy
  <a href="https://github.com/tietokantojen-perusteet/WeatherApp">GitHubista</a>
</p>

<p>
  <a href="http://db-engines.com/en/ranking/key-value+store">Lista</a> suosituimmista avain-arvotietokannoista.
</p>


<% partial 'partials/material_sub_sub_heading' do %>
  Dokumenttitietokannat, esim. MongoDB
<% end %>

<p>
  Dokumenttitietokantojen voi ajatella sijoittuvan jonnekin relaatiotietokantojen ja avain-arvotietokantojen puolen välin tienoille. Dokumenttikannat perustuvat avain-arvotietokantojen tapaan arvojen tallettamiseen avaimen perusteella. Arvot tai <em>dokumentit</em> kuten niitä dokumenttikantojen kontekstissa nimitetään voivat kuitenkin olla itsessään hyvin monimutkaisia oliota, jotka sisältävät kenttiä, joiden arvona voi olla joko normaaleja arvoja kuten lukuja ja merkkijonoja tai muita olioita. Toisin kuin avain-arvotietokannoissa, dokumenttikannat "näkevät" tietokantaan talletettujen dokumenttien sisään, ja mahdollistavat talletettujen dokumenttien sisällön suhteen tehdyt kyselyt.
</p>

<p>
  Käytetään seuraavassa esimerkkinä ylivoimaisesti suosituimman dokumenttitietokannan <a href="https://www.mongodb.org/">MongoDB:n</a> merkintöjä.
</p>

<p>
  Dokumenttikannoissa käytetään tiedon loogisena esitysmuotona yleensä <a href="https://fi.wikipedia.org/wiki/JSON">JSON</a>:ia. Seuraavassa kurssia </em>Ohjelmoinnin perusteet</em> esittävä JSON-dokumentti:
</p>

<% partial 'partials/javascript_highlight' do %>
{
  "id": ObjectId("10"),
  "nimi": "Ohjelmoinnin perusteet",
  "laajuus": 5,
  "luennot": [ "Arto Vihavainen", "Matti Luukkainen" ]
}
<% end %>

<p>
  JSON-dokumentti koostuu avain-arvo-pareista. Avainta vastaava arvo merkitään kaksoispisteellä erotettuna avaimen yhteyteen.
</p>

<p>
  Kurssi-dokumentissa on siis neljä avain-arvo-paria. Voidaankin ajatella että kurssilla on neljä kenttää. Näistä kentistä erikoisasemassa on MongoDB:n dokumentille automaattisesti generoima avainkenttä <code>id</code> jonka arvo on tyypiltään <code>ObjectId</code>. Poikkeavaa relaatiotietokantoihin nähden on se, että kentän arvona voi olla taulukko.
</p>

<p>
  Seuraavassa on opiskelijaa kuvaava dokumentti:
</p>

<% partial 'partials/javascript_highlight' do %>
{
  "id" : ObjectId("59"),
  "nimi" : "Pekka Mikkola",
  "opiskelijanumero" : 14112345,
  "osoite" : {
                "katu" : "Tehtaankatu 10 B 1",
                "postinumero" : "00120",
                "postitoimipaikka" : "Helsinki"
             }
}
<% end %>

<p>
  Nyt kentän osoite arvona on <em>olio</em>, jolla on itsellään omat kenttänsä.
</p>

<p>
  Dokumenttitietokannassa dokumentit on lajiteltu <em>kokoelmiin</em> (engl. collection). Kokoelman merkitys on suunnilleen sama kuin taulun relaatiotietokannassa. Yhdessä kokoelmassa olevien dokumenttien ei kuitenkaa tarvitse olla kentiltään samanlaisia. Kenttiä voi olla vaihteleva määrä ja saman nimiset kentät voivat sisältää eri dokumenteilla eri tyyppisen arvon. Kokoelmille ei määritellä dokumenttikannoissa minkäänlaista skeemaa, eli on täysin sovellusten vastuulla, että kantaan talletetaan järkevää dataa, ja että kannasta luettava data tutkitaan oikein.
</p>

<p>
  Kuten edellä opiskelijan kohdalla näimme, on dokumenttikannoissa mahdollista sisällyttää olioita toistensa sisään. Tilanne olisi myös voitu mallintaa "relaatiomallin tapaan" siten, että osoitteita varten olisi oma kokoelmansa, ja yksittäinen osoite mallinnettaisiin omana dokumenttina:
</p>

<% partial 'partials/javascript_highlight' do %>
{
  "id" : ObjectId("123"),
  "katu" : "Tehtaankatu 10 B 1",
  "postinumero" : "00120",
  "postitoimipaikka" : "Helsinki"
}
<% end %>

<p>
  Opiskelijadokumentti sisältäisi nyt ainoastaan viitteen osoitedokumenttiin:
</p>

<% partial 'partials/javascript_highlight' do %>
{
  "id" : ObjectId("59"),
  "nimi" : "Pekka Mikkola",
  "opiskelijanumero" : 14112345,
  "osoite" : ObjectId("123")
  }
<% end %>

<p>
  Toisin kuin relaatiotietokantojen tapauksessa, dokumenttikannat <em>eivät tarjoa</em> tietokannan tasolla tapahtuvia <em>liitosoperaatiota</em>, ja edellisen esimerkin tapauksessa sovelluksen olisi itse huolehdittava siitä, että opiskelijaa haettaessa haetaan myös opiskelijan osoite tietokannasta.
</p>

<p>
  Vaikka operaatio ei olekaan dokumenttikannan tasolla tuettu, on olemassa monia kirjastoja (esim. Javalle <a href="https://mongodb.github.io/morphia/">Morphia</a>), jotka toteuttavat ohjelmallisen liitosoperaation siten, että sovellusohjelman ei tarvitse siitä huolehtia.
</p>

<p>
  Relaatiotietokannoissa kannan skeeman muodostaminen on sikäli helppoa, että normalisoituun ratkaisuun pyrittäessä useimmissa tilanteissa on olemassa noin yksi "järkevä" ratkaisu, joka toimii lähes yhtä hyvin riippumatta siitä miten kantaa käytetään.
</p>

<p>
  Dokumenttikantojen suhteen tilanne on toinen. Tarkastellaan esimerkiksi Kursseja ja Opiskelijoiden kurssisuorituksia. Relaatiotietokannassa tilanne olisi suoraviivainen, <em>Suoritus</em> olisi <em>Kurssin</em> ja <em>Opiskelijan</em> liitostaulu.
</p>

<p>
  Eräs mahdollisuus olisi tehdä täsmälleen sama ratkaisu dokumenttikannassa.
</p>

<p>
  Kokoelma Opiskelija:
</p>

<% partial 'partials/javascript_highlight' do %>
[
  {
    "id": ObjectId("10"),
    "nimi" : "Lea Kutvonen",
    "opiskelijanumero" : 13457678
  },
  {
    "id": ObjectId("11"),
    "nimi" : "Pekka Mikkola",
    "opiskelijanumero" : 14012345
  }
]
<% end %>

<p>
  Kokoelma kurssi:
</p>

<% partial 'partials/javascript_highlight' do %>
[
  {
    "id": ObjectId("34"),
    "nimi" : "Ohjelmoinnin perusteet",
    "laajuus" : 5
  },
  {
    "id": ObjectId("35"),
    "nimi" : "Tietokone työvälineenä",
    "laajuus" : 1
  }
]
<% end %>

<p>
  Suoritus olisi nyt "liitostaulumainen" kokoelma:
</p>

<% partial 'partials/javascript_highlight' do %>
[
  {
    "id": 55
    "kurssi_id" : ObjectId("34"),
    "opiskelija_id" : ObjectId("10"),
    "arvosana" : 4
  },
  {
    "id": 56
    "kurssi_id" : ObjectId("35"),
    "opiskelija_id" : ObjectId("10"),
    "arvosana" : 5
  },
  {
    "id": 57
    "kurssi_id" : ObjectId("35"),
    "opiskelija_id" : ObjectId("11"),
    "arvosana" : 2
  }
]
<% end %>

<p>
  Vaihtoehtoja on kuitenkin myös muita. Käyttötapauksista riippuen saattaisi olla edullista tallettaa tieto suorituksista ("liitosdokumentin" id) myös kurssin ja opiskelijan yhteyteen:
</p>

<p>
  Kokoelma Opiskelija:
</p>

<% partial 'partials/javascript_highlight' do %>
[
  {
    "id": ObjectId("10")
    "nimi" : "Lea Kutvonen",
    "opiskelijanumero" : 13457678,
    "suoritukset" : [ ObjectId("55"), ObjectId("56") ]
  },
  {
    "id": ObjectId("11")
    "nimi" : "Pekka Mikkola",
    "opiskelijanumero" : 14012345,
    "suoritukset" : [ ObjectId("57") ]
  }
]
<% end %>

<p>
  Kokoelma kurssi:
</p>

<% partial 'partials/javascript_highlight' do %>
[
  {
    "id": ObjectId("34")
    "nimi" : "Ohjelmoinnin perusteet",
    "laajuus" : 5,
    "suorittajat" : [ObjectId("10")]
  },
  {
    "id": ObjectId("35")
    "nimi" : "Tietokone työvälineenä",
    "laajuus" : 1,
    "suorittajat" : [ObjectId("10"), ObjectId("11")]
  }
]
<% end %>

<p>
  Jossain tapauksessa paras ratkaisu olisi luopua liitoksena toimivista dokumenteista eli kokoelmasta suoritukset ja tallettaa suoritukset kokonaisuudessaan opiskelija-dokumentteihin:
</p>

<% partial 'partials/javascript_highlight' do %>
[
  {
    "id": ObjectId("10")
    "nimi" : "Lea Kutvonen",
    "opiskelijanumero" : 13457678,
    "suoritukset" : [
      {
        "id": 55
        "kurssi_id" : ObjectId("34"),
        "arvosana" : 4
      },
      {
        "id": 56
        "kurssi_id" : ObjectId("35"),
        "arvosana" : 5
      }
    ]
  },
  {
    "id": ObjectId("11")
    "nimi" : "Pekka Mikkola",
    "opiskelijanumero" : 14012345,
    "suoritukset" : [
      {
        "id": 57
        "kurssi_id" : ObjectId("35"),
        "arvosana" : 2
      }
    ]
  }
]
<% end %>

<p>
  Tämä ratkaisu vaikeuttaisi kurssin suorittajien selvittämistä, joten joissain käyttötapauksissa saattaisi olla edullista sisällyttää suoritukset <em>molempiin</em> opiskelijoihin ja kurssiin.
</p>

<p>
  Yhtä "oikeaa" vastausta miten sovelluksen data kannattaa mallintaa dokumenttikannan kokoelmiksi ja dokumenteiksi ei ole olemassa. Parhaaseen tapaan vaikuttaa suuresti se minkälainen käyttöprofiili rakennettavalla sovelluksella on: datamalli kannattaa valita siten, että se tekee yleisimpien operaatioiden suorituksen nopeaksi ja helpoksi.
</p>

<p>
  Kuten jo totesimme, dokumenttikannat eivät tue liitosoperaatioita, ja kyselyt kohdistuvat aina vain yhteen kokoelmaan. Dokumenttikannoilla ei ole mitään standardoitua kyselykieltä, jokaisen kannan kyselykieli on täysin omanlaisensa. Esim. MongoDB:n kyselykieli ei muistuta kovinkaan läheisesti SQLää.
</p>

<p>
  Dokumenttikannat eivät myöskään tue useamman kokoelman yhtäaikaista muuttamista transaktionaalisesti. Kaikki yhteen kokoelmaan suoritettavat tapahtumat tehdään kuitenkin aina transaktionaalisesti.
</p>

<p>
  Lisää MongoDB:stä ja sen käytöstä eri ohjelmointikielistä käsin löydät esim. osoitteesta <a href="https://docs.mongodb.org/manual/">https://docs.mongodb.org/manual/</a>
</p>
<p>
  <a href="http://db-engines.com/en/ranking/document+store">Lista suosituimmista</a> dokumenttitietokannoista.
</p>


<% partial 'partials/material_sub_sub_heading' do %>
  Saraketietokannat
<% end %>

<p>
  Relaatiomalli sopii suhteellisen hyvin tilanteisiin, joissa tietoa käsitellään lyhyin, pääasiassa taulun yksittäisiin riveihin kohdistuvin operaatioin (englanniksi tälläisestä tiedonkäsittelystä käytetään nimitystä <em>online transaction processing, OLTP</em>). Näin tapahtuu esimerkiksi pankin asiakastietokannassa kun asiakkaat tekevät saldokyselyjä, nostavat rahaa tai tekevät tilisiirtoja.
</p>

<p>
  Tietokantojen käyttö on aivan erilaista silloin kun tavoitteena on luoda raportteja tai analysoida dataa eri tavoin, esim. selvittää pankin asiakkaiden keskimääräinen saldo tietyllä aikavälillä. Tällöin kyselyt kohdistuvat lähes koko tauluun, mutta usein vain pieneen osaan taulun sarakkeissa (englanniksi tälläisestä tiedonkäsittelystä käytetään nimitystä <em>online analytical processing, OLAP</em>).
</p>

<p>
  Analyysitietokannoissa tilanne on usein se, että tieto ei ole normalisoidussa muodossa, yksittäiset taulut saattavat sisältää satojakin sarakkeita, mutta toisaalta läheskään kaikilla sarakkeilla ei ole kannassa arvoja. Näissä tilanteissa relaatiotietokantojen suorituskyky saattaa olla huono, ja <em>saraketietokannat</em> (engl. columnar databases) voivat tarjota huomattavasti paremman vaihtoehdon.
</p>

<p>
  Tarkastellaan tilannetta esimerkin kautta. Oletetaan, että analyysiin käytettyyn tietokantaan on talletettu firman työntekijöitä:
</p>

<pre>
EmpId Lastname  Firstname Sex Salary  YearsEmployed
10    Smith     Joe       M   40000   1
12    Jones     Mary      F   50000   6
11    Johnson   Cathy     F   44000   3
22    Jones     Bob       M   55000   9
</pre>

<p>
  Relaatiotietokannat tallettavat tiedon levylle <em>riveittäin</em>, eli taulu tallentuisi levylle seuraavasti:
</p>

<pre>
10;Smith;Joe;M;40000;1;12;Jones;Mary;F;50000;6;11;Johnson;Cathy;F;44000;3;...
</pre>

<p>Jos nyt haluttaisiin selvittää yrityksessä vähintään 5 vuotta työskennelleiden keskipalkka, tehtäisiin kysely
</p>

<% partial 'partials/sql_highlight' do %>
SELECT AVG(Salary)
  FROM Employees
  WHERE YearsEmployed &gt; 4
<% end %>

<p>
  Tässä olisi relaatiotietokannan tapauksessa luettava taulun <em>koko data</em> levyltä siitä huolimatta, että kysely ei tarvitse kuin pientä osaa taulun datasta. Jos taulussa olisi satoja sarakkeita (mikä on varsin tyypillistä analytiikkatietokannoissa), olisi kyselyn tekeminen erittäin hidasta johtuen juuri tarpeettoman raskaasta, kaiken datan hakevasta levyoperaatiosta.
</p>

<p>
  Saraketietokannoissa tiedot talletetaan sarakkeittain, karkeasti ottaen jokainen sarake tai usein yhdessä käytettyjen sarakkeiden ryhmä omaan tiedostoonsa. Edellinen tietokanta siis talletettaisiin kutakuinkin seuraavasti
</p>

<pre>
EmpId: 10;12;11;22

Lastname:Smith;Jones;Johnson;Jones

Firstname:Joe;Mary;Cathy;Bob

Sex:M;F;F;M

Salary:40000;50000;44000;55000

YearsEmployed:1;6;3;9
</pre>

<p>
  Tehtäessä sama kysely, riittäisi että levyltä luettaisiin ainoastaan kyselyn kannalta tarpeellisten sarakkeiden <em>Salary</em> ja <em>YearsEmployed</em> tieto. Jos sarakkeita olisi suuri määrä, ero riveittäin talletettuun tietokantaan olisi suorituskyvyn suhteen huomattava.
</p>

<p>
  Vanhemmman sukupolven saraketietokannoissa data on organisoitu relaatiotietokantojen tapaan tauluihin ja dataa hallitaan SQL:llä. Vanhemman polven saraketietokantoja ei välttämättä edes luokitella NoSQL-kannoiksi. Uudemman polven saraketietokannat taas noudattavat enemmän yhden tai muutaman ison tai "leveän" taulun skeematonta mallia. Tauluissa on sarakkeita erittäin suuri määrä, mutta läheskään kaikilla sarakkeilla ei ole arvoa. Näiden esikuvana on Googlen vuodesta 2004 asti kehittämä <a href="https://en.wikipedia.org/wiki/BigTable">BigTable</a>. Uuden polven ratkaisut mahdollistavat massiivisten datamäärien rinnakkaiskäsittelyn.
</p>

<p>
  <a href="http://db-engines.com/en/ranking/wide+column+store">Suosituimmat</a> uuden sukupolven saraketietokannat.
</p>


<% partial 'partials/material_sub_sub_heading' do %>
  Verkkotietokannat
<% end %>

<p>
  Relaatiotietokannat ja esittelemämme NoSQL-kantatyypit keskittyvät <em>dataentiteettien</em> esittämiseen. Relaatiotietokannat esittävät entiteetit taulujen riveinä, esim. Henkilö-taulussa jokainen ihminen esitettään omana rivinään. Yhteydet ja suhteet eri entiteettien välillä esitetään epäsuorasti vierasavaimien ja liitostaulujen avulla. Itse yhteys, esim. <em>missä henkilö Arto on töissä</em> saadaan selville vasta kyselyn aikana tapahtuvan liitosoperaation avulla.
</p>

<p>
  Joissain tilanteissa entiteettien suhteiden selvittäminen relaatiotietokannassa saattaa olla erittäin hankalaa. Oletetaan, että meillä on Henkilöitä kuvaava taulu:
</p>

<% partial 'partials/sql_highlight' do %>
CREATE TABLE Henkilo (
  id integer not null PRIMARY KEY,
  nimi string not null
)
<% end %>

<p>
  sekä taulu, joka liittää vanhemmat ja lapset toisiinsa:
</p>

<% partial 'partials/sql_highlight' do %>
CREATE TABLE Vanhemmuus (
  id integer not null PRIMARY KEY,
  lapsi_id integer,
  vanhempi_id integer,
  FOREIGN KEY (lapsi_id) references Henkilo(id),
  FOREIGN KEY (vanhempi_id) references Henkilo(id)
)
<% end %>

<p>
  Jos nyt haluaisimme selvittää henkilön "Arto" kaikki sukulaiset, huomaamme, että kyselyn tekeminen SQL:llä olisi erittäin hankalaa.
</p>

<p>
  Tilanne mutkistuisi entisestään jos haluaisimme kuvata myös muunlaisia suhteita, esim. henkilöiden työsuhteita firmoihin, jäsenyyksiä yhdistyksiin, ystävyyttä, omistussuhteita erilaisiin asioihin sekä asioista tykkäämisiä ja vihaamisia. Yksi vaikeuttava tekijä olisi se, että kaikki erilaiset suhteet pitäisi mallintaa omina liitostauluinaan. Jos ohjelmassa käytettävät suhdetyypit lisääntyisivät, tulisi tietokantaskeemaan lisätä koko ajan uusia erityyppisiä liitostauluja. Myös kyselyt muuttuisivat koko ajan hankallimmaksi ja vaatisivat yhä monimutkaisempia, raskaita liitosoperaatioita. Esim. seuraavien asioiden selvittäminen olisi SQL:llä melko työlästä:
</p>

<ul>
  <li>Arton kaikkien esivanhempien työpaikat</li>
  <li>Kirjat joista Arton esivanhemmat pitivät</li>
  <li>Arton ystävistä ja ystävien ystävistä, ja näiden ystävistä jne kaikki ne, jotka ovat opiskelleet samassa paikassa kun Arto</li>
</ul>

<p>
  Ratkaisun tämänkaltaisiin tilanteisiin tuovat <em>verkkotietokannat</em>, jotka mallintavat eksplisiittisesti sekä entiteetit eli esim. henkilöt ja niiden ominaisuudet että entiteettien väliset suhteet kuten sukulaisuuden henkilöiden välillä. Kuten nimestä voi päätellä, on verkkotietokannan pohjalla olevana tietorakenteena verkko (engl. <em>graph</em>), joka koostuu entiteettejä kuvaavista <em>solmuista</em> (engl. <em>node</em>) ja niiden välisiä suhteita kuvaavista <em>kaarista</em> (engl. <em>edge</em>). Sekä solmuilla, että kaarilla voi olla attribuutteja. Verkko, joka kuvaa yllä olevan esimerkin mallintamista verkkotietokannan solmuiksi ja kaariksi:
</p>

<figure>
  <img src="/img/viikko7/verkkokanta.png" alt="Verkkotietokanta">
</figure>

<p>
  Verkkotietokannat tarjoavat kyselykielen, jonka avulla on helppo "navigoida" verkossa. Toisin kuin relaatiotietokannoissa, jotka edellyttävät yhteyden muodostamiseen laskennallisesti kallista join-operaatiota, yhteyksien navigointi verkkotietokannassa on nopeaa. Verkkotietokannoille ei ole olemassa yhtä vakiintunutta kyselykieltä. On kuitenkin tiettyjä kyselykieliä, kuten tämän hetken suosituimman verkkotietokannan <a href="http://neo4j.com">Neo4J:n</a> käyttämä
  <a href="http://neo4j.com/developer/cypher-query-language/">Cypher</a>, joita jotkut muutkin verkkotietokannat tukevat.
</p>

<p>
  Seuraavassa muutama esimerkki ylläolevaan verkkotietokantaan kohdistetuista Cypherillä tehdyistä kyselyistä. Haetaan ensin Arton vanhemmat
</p>

<pre>
MATCH ({ name:"Arto" }) -[:CHILD_OF]-> (parent)
RETURN parent
</pre>

<p>
  MATCH-määre hakee ensin solmun, jonka nimenä on <em>Arto</em> ja sen jälkeen seurataan kaarta <em>:CHILD_OF</em> pitkin solmun vanhempiin, jotka kysely palauttaa. Kysely siis palauttaa ne solmut <em>parent</em> joille pätee ehto: solmuun johtaa kaari </em>CHILD_OF</em> sellaisesta solmusta johon liittyy attribuutti <em>nimi</em>, jonka arvo on <em>Arto</em>.
</p>

<p>
  Kirjat joista Arton esivanhemmat pitävät:
</p>

<pre>
MATCH ({ name:"Arto" }) -[:CHILD_OF*1..]-> (relative) -[:LIKES]-> (book:Book)
RETURN book
</pre>

<p>
  Nyt kysely palauttaa sellaiset solmut <em>book</em> joille pätee:
</p>

<ul>
  <li> solmun tyyppi on Book</li>
  <li>
    solmuun on <em>:LIKES-tyyppinen</em> kaari jostain solmusta johon päästään Artosta yhtä tai useampaa <em>:CHILD_OF</em> kaarta pitkin kulkemalla
  </li>
</ul>

<p>
  Arton ystävistä ja ystävien ystävistä, ja näiden ystävistä jne kaikki ne, jotka ovat opiskelleet samassa paikassa kun Arto:
</p>

<pre>
MATCH (arto: { name:"Arto" }) -[:FRIENDS_WITH*1..]-> (friend) -[:STUDIED_IN]-> (school)
WHERE arto -[:STUDIED_IN]-> (school)
RETURN friend
</pre>

<p>
  Vielä yksi esimerkki. Miten löytäisimme lyhimmän ystävien ketjun,</em> joka yhdistää Arton ja Barack Obaman?
</p>

<pre>
MATCH (arto: { name:"Arto" }) (barack:{ name:"Barack Obama" })
p = shortestPath( (arto) -[:FRIEND*1..]-> (barack) )

RETURN p
</pre>

<p>
  Eli ensin etsitään solmut joiden nimenä on Arto ja Barack, ja sen jälkeen Neo4J:n valmis funktio <em>shortestPath</em> etsii lyhimmän polun solmujen välillä. Tämä kysely olisi todennäköisesti mahdoton tehdä SQL:llä tai ainakin äärimmäisen vaikea muotoilla ja todella hidas suorittaa. Verkkotietokannat sopivatkin erittäin hyvin muutamiin sellasiiin käyttöskenaarioihin, joissa muut tietokantatyypit ovat lähes käyttökelvottomia. Verkkotietokantojen käyttö onkin yleistynyt esim. sosiaalisen median sovelluksissa ja suosittelujärjestelmissä.
</p>

<p>
  <a href="http://db-engines.com/en/ranking/graph+dbms">Suosituimmat</a> verkkotietokannat.
</p>


<% partial 'partials/material_sub_heading' do %>
  NOSQL ja NewSQL
<% end %>

<p>
  NoSQL-tietokannat löivät läpi suuren kohun saattamina ja erityisesti startupeissa oli muodikasta ottaa käyttöön helpommin suurille käyttäjämäärille skaalautuvia NoSQL-kantoja kuten MongoDB. Pikkuhiljaa kohu on laantunut, ja enenevissä määrin ollaan menossa jo aiemmin mainittuun <a href="http://martinfowler.com/bliki/PolyglotPersistence.html">polyglot persistancen</a> nimellä kulkevaan suuntaan, eli valitaan oikea työkalu kuhunkin käyttötarkoitukseen, ja erittäin tyypillistä onkin että jo hieman suuremmissa sovelluksissa on käytössä dokumentti-, avain-arvo- ja relaatiotietokanta.
</p>

<p>
  Uusimpana kehityssuuntana on ollut myös se, että vanhat relaatiotietokannat ovat ottaneet vaikutteita muista tietokantatyypeistä. Esim. tämän hetken suosituin Open Source -relaatiotietokanta PostgeSQL sisältää paljon <a href="http://www.postgresql.org/docs/9.4/static/datatype-json.html">dokumenttitietokantoja vastaavaa toiminnallisuutta</a>. Kehitystä on tapahtunut myös toiseen suuntaan, jotkut dokumenttitietokannat ovat mahdollistaneet <a href="https://azure.microsoft.com/en-us/documentation/articles/documentdb-sql-query/">SQL:n käytön kyselykielenä.</a>
</p>

<p>
  Kahtiajaon hieman liudennuttua termin NoSQL sijaan onkin alettu puhua <em>Not Only SQL</em> -tietokannoista, ja termi on muokkautunut muotoon <em>NOSQL</em>. Päätään nostaa esille myös vielä melko epämääräisesti määritelty termi <em><a href="http://www.dbta.com/Columns/DBA-Corner/What-Is-a-NewSQL-Database-System-104489.aspx">NewSQL</a></em>. Wikipedian mukaan NewSQL:llä tarkoittaa seuraavaa:
</p>

<blockquote>

  <p>
    NewSQL is a class of modern relational database management systems that seek to provide the same scalable performance of NoSQL systems for online transaction processing (OLTP) read-write workloads while still maintaining the ACID guarantees of a traditional database system.
  </p>

  <p>
    Although NewSQL systems vary greatly in their internal architectures, the two distinguishing features common amongst them is that they all support the relational data model and use SQL as their primary interface.
  </p>

</blockquote>

<p>
  Eräs melko paljon huomiota saanut NewSQL-tietokanta on vuonna 2015 Applen ostama FoundationDB, joka sisäiseltä organisoinniltaan on avain-arvotietokanta ja tarjoaa perinteistä relaatiotietokantaa skaalautuvamman ratkaisun, mutta tarjoaa kyselykieleksi (myös) SQL:n ja ACID-ominaisuudet takaavat transaktiot eli käyttäytyy sovellusohjelmien kannalta kuten normaali relaatiotietokanta.
</p>

