---
path: '/osa-6/1-tietokannan-kaytto-ohjelmallisesti'
title: 'Tietokannan käyttö ohjelmallisesti'
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Osaat luoda tietokantaa käyttävän Java-kielisen sovelluksen.
- Osaat hyödyntää tietokannanhallintajärjestelmän tarjoamaa toimintaa osana sovellustasi. (ei vain haeta kaikkea ja käydä läpi paikallisesti)

</text-box>



<% partial 'partials/material_heading' do %>
  Johdatus tiedon käsittelyyn Java-ohjelmoijalle
<% end %>

<p>
  Java-ohjelmoijalle tietokantaan tallennetuilla käsitteillä ja niiden yhteyksillä on suorat vertauskuvat. Käsitteet ovat luokkia -- käsitteisiin liittyy ominaisuuksia eli attribuutteja (tai oliomuuttujia) -- ja käsitteiden yhteydet ovat viitteitä luokkien välillä.
</p>


<% partial 'partials/material_sub_heading' do %>
  Luokkakaavio Java-luokkina
<% end %>

<p>
  Tarkastellaan seuraavaa Opiskelijaa ja Kurssisuoritusta sekä näiden välistä yhteyttä kuvaavaa luokkakaaviota.
</p>

<figure>
  <img src="/img/opiskelija-ja-kurssisuoritus-luokkakaavio.png" />
  <figcaption>Luokkakaavio, jossa on luokat Opiskelija ja Kurssisuoritus. Opiskelijalla on monta (nollasta äärettömään kurssisuoritusta). Jokaiseen kurssisuoritukseen liittyy yksi opiskelija.</figcaption>
</figure>

<p>
  Määritellään ensin luokat Opiskelija ja Kurssisuoritus siten, että niillä ei ole vielä yhteyksiä merkittynä.
</p>

<% partial 'partials/code_highlight' do %>
  public class Opiskelija {
      String opiskelijanumero;
      String nimi;
      int syntymavuosi;
  }
<% end %>

<% partial 'partials/code_highlight' do %>
  public class Kurssisuoritus {
      String kurssi;
  }
<% end %>

<p>
  Lisätään seuraavaksi luokkien välille yhteys. Jokaiseen kurssisuoritukseen liittyy tasan yksi Opiskelija (kurssisuorituksen ja opiskelijan välisessä viivassa opiskelijan päädyssä on numero yksi). Lisätään siis luokkaan Kurssisuriotus viite Opiskelijaan.
</p>


<% partial 'partials/code_highlight' do %>
  public class Kurssisuoritus {
      Opiskelija opiskelija;
      String kurssi;
  }
<% end %>

<p>
  Yllä kuvattu luokka Kurssisuoritus määrittelee Kurssisuorituksen, jolla on kurssin nimi. Kurssisuoritukseen liittyy yksi opiskelija.
</p>

<p>
  Lisätään seuraavaksi yhteys opiskelijasta kurssisuoritukseen. Jokaiseen opiskelijaan voi liittyä nollasta äärettömään kurssisuoritusta (kurssisuorituksen ja opiskelijan välisessä viivassa kurssisuorituksen päädyssä on tähti). Lisätään siis luokkaan Opiskelija äärettömän määrän kurssisuorituksia mahdollistava viite eli lista.
</p>

<% partial 'partials/code_highlight' do %>
import java.util.List;

public class Opiskelija {
    List&lt;Kurssisuoritus&gt; kurssisuoritukset;
    String opiskelijanumero;
    String nimi;
    int syntymavuosi;
}
<% end %>


<p>
  Oleellista luokkakaavioiden ja lähdekoodin välisessä muunnoksessa on se, että luokkien väliset yhteydet eivät näy luokkakaaviossa, mutta luokat sisältävät yhteyksiä kuvaavat oliomuuttujat. Esimerkiksi yllä olevassa lähdekoodissa Kurssisuoritus sisältää tiedon opiskelijasta, mutta luokkakaaviossa opiskelija ei ole kurssisuorituksen oliomuuttuja.
</p>

<% partial 'partials/exercise', locals: { name: 'Luokkakaaviosta luokiksi' } do %>

  <p>
    <strong>
      Huom! Päivitä TMC ennen tehtävien tekemisen aloittamista. TMC:n päivitys onnistuu valitsemalla TMC:ssä Help -> Check for Updates.
    </strong>
  </p>

  <p>
    Alla on kuvattuna erään kirjojen lainausjärjestelmän luokkakaavio. Luo tehtäväpohjaan luokkakaavion esittämät luokat ja lisää luokkiin tarvittavat oliomuuttujat.
  </p>

  <figure>
    <img src="/img/kirjastojarjestelma.png" alt="[Kirja|nimi:String;kirjoittaja:String;julkaisuvuosi:Integer]
						 [Hylly|sijainti:String]
						 [Nide|tunnus:Integer]
						 [Henkilo|nimi:String
						 [Laina|alku:LocalDate;loppu:LocalDate;palautettu:Boolean]
						 [Nide]*-1[Hylly]
						 [Kirja]1-*[Nide]
						 [Laina]*-1[Henkilo]
						 [Nide]1-*[Laina]"/>
  </figure>

  <p>
    Kun olet valmis, aja testit ja palauta tehtävä TMC:lle.
  </p>

<% end %>



<% partial 'partials/material_sub_heading' do %>
  Tiedon tallentaminen ja lataaminen
<% end %>

<p>
  Tiedon tallentaminen pysyväismuistiin tarkoittaa käytännössä tiedon tallentamista kiintolevylle tai vastaavalle medialle. Tietokoneen käyttöjärjestelmä tarjoaa kiintolevyn käsittelylle abstraktion tiedosto -- tiedosto on käytännössä yksi tai useampi rajattu alue, johon tietoa on kirjoitettu. Tiedon tallennusmuoto määräytyy tallennettavan tiedon perusteella ja vaikuttaa sekä tallennusoperaatioiden että lukuoperaatioiden toteuttamiseen. Suoraviivainen tapa tallentaa tietoa on säilöä jokaisen käsitteen (luokan) ilmentymät (oliot) käsitekohtaisiin tiedostoihin, missä rivi kuvaa aina yksittäistä käsitettä.
</p>

<p>
  Opiskelija- ja Kurssisuoritusoliot voidaan tallentaa tiedostoihin. Käytetään tiedostoja <code>opiskelija.data</code> ja <code>kurssisuoritus.data</code> -- tässä .data on itse keksimämme pääte.
</p>

<p>
  Opiskelijalistan tallentaminen tiedostoon onnistuu nyt esimerkiksi seuraavasti.
</p>

<% partial 'partials/code_highlight' do %>
  // oletetaan, että käytössä on lista opiskelijoita
  // List&lt;Opiskelija&gt; opiskelijat

  PrintWriter pw = new PrintWriter("opiskelija.data");
  opiskelijat.forEach(o -&gt; pw.println(o.opiskelijanumero + "\t" + o.nimi + "\t" + o.syntymavuosi));
  pw.flush();
  pw.close();
<% end %>

<p>
  Vastaavasti opiskelijoiden lataaminen onnistuu seuraavasti.
</p>

<% partial 'partials/code_highlight' do %>
  // oletetaan, että käytössä on tyhjä opiskelijalista
  // List&lt;Opiskelija&gt; opiskelijat

  Files.lines(Paths.get("opiskelija.data")).forEach(rivi -&gt; {
      String[] palat = rivi.split("\t");

      Opiskelija o = new Opiskelija();
      o.opiskelijanumero = palat[0];
      o.nimi = palat[1];
      o.syntymavuosi = Integer.parseInt(palat[2]);

      opiskelijat.add(o);
  });
<% end %>

<p>
  Opiskelijan kurssisuoritukset eivät tässä tallennu opiskelijaa kuvaavaan tiedostoon. Koska kurssisuoritus on erillinen -- vaikkakin opiskelijaan liittyvä -- käsite, tallennetaan kurssisuoritukset erilliseen tiedostoon. Miten sitten saamme selville jokaiseen opiskelijaan kuuluvat kurssisuoritukset? Kun tallennamme kurssisuorituksia, tallennamme jokaiseen kurssisuoritukseen tiedon opiskelijasta, johon kurssisuoritus kuuluu. Teemme samalla oletuksen, että opiskelijanumero yksilöi opiskelijan.
</p>

<% partial 'partials/code_highlight' do %>
  // oletetaan, että käytössä on lista kurssisuorituksia
  // List&lt;Kurssisuoritus&gt; kurssisuoritukset

  PrintWriter pw = new PrintWriter("kurssisuoritus.data");
  kurssisuoritukset.forEach(k -&gt; pw.println(k.opiskelija.opiskelijanumero + "\t" + k.kurssi));
  pw.flush();
  pw.close();
<% end %>

<p>
  Entä sitten kurssisuoritusten lataaminen? Kurssisuoritus-olio ei sisällä opiskelijanumeroa merkkijonona, joten kurssisuoritusten lataamisen yhteydessä tulee aiemmin ladatuista opiskelijoista aina etsiä opiskelijanumeroa vastaava olio.
</p>

<% partial 'partials/exercise', locals: { name: 'Kurssisuoritusten lukeminen' } do %>

  <p>
    Tehtäväpohjassa on ohjelmakoodi opiskelijoiden lukemiseen ja tallentamiseen sekä kurssisuoritusten tallentamiseen. Täydennä tehtäväpohjassa olevan luokan <code>Lukija</code> metodia <code>lueKurssisuoritukset</code> siten, että se lukee kurssisuoritukset sekä kurssisuorituksiin liittyvät opiskelijat. Älä muuta metodin parametrien tyyppejä tai palautettavan arvon tyyppiä.
  </p>


<% end %>


<% partial 'partials/material_sub_heading' do %>
  Rajattu tiedon käsittely
<% end %>

<p>
  Edellinen esimerkki on tyypillinen ohjelmoinnin perusteiden ja jatkokurssin tiedon käsittelyesimerkki.
</p>

<p>
  Esimerkissä on muutamia haasteita, sillä esimerkiksi pienten tietomäärien hakeminen isoista tiedostoista ei ole kovin tehokasta. Todellisuudessa suurten tietomäärien ohjelmallisessa käsittelyssä hyödynnetään käyttöjärjestelmän tarjoamaa mahdollisuutta tiedoston osien lukemiseen. Ohjelmointikielet kuten Java tarjoavat tähän myös abstraktion -- Javalla luokka <a href="https://docs.oracle.com/javase/8/docs/api/java/io/RandomAccessFile.html" target="_blank" norel">RandomAccessFile</a> tarjoaa lukumahdollisuuden vain osaan tiedoston sisällöistä.
</p>

<p>
  Edellä mainitun työvälineen avulla tiedostojen käsittely tapahtuu tavumuodossa. Jos tiedämme, että opiskelijan opiskelijanumeron pituus on 10 merkkiä, ja opiskelijanumero on tiedoston alussa, onnistuu lukeminen seuraavasti.
</p>

<% partial 'partials/code_highlight' do %>
// Avataan tiedosto 'opiskelija.data' lukemista varten
RandomAccessFile tiedosto = new RandomAccessFile("opiskelija.data", "r");

// Varataan 10 tavua tilaa muistista opiskelijanumeroa varten
byte[] opnro = new byte[10];

// luetaan opnro-taulukkoon tiedoston alusta taulukon kokoinen määrä sisältöä
tiedosto.read(opnro);

// luodaan opiskelijanumerosta merkkijono
String opiskelijanumero = new String(opnro);
<% end %>

<p>
  Vastaavasti, opiskelijanumeron vaihtaminen tiedoston tietyssä kohdassa onnistuu seuraavasti.
</p>

<% partial 'partials/code_highlight' do %>
// Avataan tiedosto 'opiskelija.data' lukemista ja kirjoittamista varten
RandomAccessFile tiedosto = new RandomAccessFile("opiskelija.data", "rwd");

// Oletetaan, että käytössämme on opiskelijanumero "0123456789"
String opiskelijanumero = "0123456789";

// Etsitään kohta, mihin opiskelijanumero halutaan kirjoittaa -- kirjoitetaan alkuun
tiedosto.seek(0);

// Kirjoitetaan opiskelijanumero tiedostoon tietyn opiskelijan kohdalle.
tiedosto.write(opiskelijanumero.getBytes());

// Nyt opiskelijanumero tiedostossa on muuttunut.
<% end %>


<p>
  Mitä hyötyä tästä on? Jos sovimme ennalta, että kunkin tiedostossa olevan kentän -- eli esimerkiksi opiskelijanumeron tai nimen -- pituus on ennalta määrätty, tiedämme ennalta opiskelijaolioiden sijainnit tiedostossa. Oletetaan, että opiskelijanumero on aina 10 merkkiä ja nimi 40 merkkiä. Tällöin uuden opiskelijan tiedot alkavat aina 50 merkin välein. Hyötynä tästä on muunmuassa se, että tällöin tietyn opiskelijan tietojen etsimisessä tiedostosta muistissa tulee olla korkeintaan vain 50 merkkiä -- alla esimerkki opiskelijan nimen etsimisestä tietyn opiskelijanumeron perusteella.
</p>

<% partial 'partials/code_highlight' do %>
// Avataan tiedosto 'opiskelija.data' lukemista ja kirjoittamista varten
RandomAccessFile tiedosto = new RandomAccessFile("opiskelija.data", "rwd");

// Oletetaan, että haemme opiskelijanumeroa "0123456789"
String haettava = "0123456789";

byte[] opiskelijanumero = new byte[10];

for (int indeksi = 0; indeksi &lt; tiedosto.length(); indeksi += 50) {
    // tälle ei käytännössä olisi tarvetta, sillä tiedoston kohta päivittyy
    tiedosto.seek(indeksi);

    // komento tiedosto.read lukee tiedostosta annetun tiedoston mittaisen määrän tietoa
    // tässä luettu määrä määräytyy opiskelijanumero-taulukon pituuden perusteella
    tiedosto.read(opiskelijanumero);

    // lukemisen jälkeen tiedoston käsittelykohta siirtyy eteenpäin 10 merkillä

    // tehokkuusnäkökulmasta tässäkin todennäköisesti oikeasti verrattaisiin
    // yksittäisiä merkkejä
    if(!haettava.equals(new String(opiskelijanumero))) {
        continue;
    }

    // koska tiedoston käsittelykohta on siirtynyt eteenpäin 10 merkillä
    // on seuraavaksi luettavana nimi
    byte[] nimi = new byte[40];
    tiedosto.read(nimi);
    System.out.println("Haetun opiskelijan nimi on " + new String(nimi).trim());

    break;
}
<% end %>

<p>
  Toisaalta, jos haluaisimme pitää kirjaa opiskelijoiden sijainneista, ja hyväksyä ajatus siitä, että opiskelijanumerot ovat jatkuvasti muistissa, voi opiskelijoiden sijainnit tallentaa hajautustaulukkoon.
</p>

<% partial 'partials/code_highlight' do %>
// Avataan tiedosto 'opiskelija.data' lukemista ja kirjoittamista varten
RandomAccessFile tiedosto = new RandomAccessFile("opiskelija.data", "rwd");

// Oletetaan, että käytössä on hajautustaulukko, jossa
// on tieto opiskelijanumerosta tiedoston indeksiin
Map&lt;String, Integer&gt; opiskelijoidenSijainnit = new HashMap&lt;&gt;();

// Oletetaan, että haemme opiskelijanumeroa "0123456789"
String haettava = "0123456789";

// nyt opiskelijan nimen saa helpohkosti -- olettaen, että opiskelija on olemassa ja että
// hajautustaulussa on opiskelijan tiedot aloittava indeksi

// siirrytään tiedostossa sopivaan kohtaan -- opiskelijan nimi tulee opiskelijanumeron jälkeen
tiedosto.seek(opiskelijoidenSijainnit.get(haettava) + 10);

// luetaan nimi
byte[] nimi = new byte[40];
tiedosto.read(nimi);
System.out.println("Haetun opiskelijan nimi on " + new String(nimi).trim());
<% end %>



<% partial 'partials/exercise', locals: { name: 'Tiedon muokkaaminen' } do %>

  <p>
    Alla on kuvattuna erään viestijärjestelmän luokkakaavio. Jokaisella viestillä on sekä vastaanottaja että lähettäjä, jonka lisäksi viestiin kuuluu viestin sisältö. Käyttäjästä tallennetaan järjestelmään käyttäjätunnus, salasana, nimi, osoite ja puhelinnumero.
  </p>


  <figure>
    <img src="/img/viestijarjestelma.png" alt="[Henkilo|kayttajatunnus:String;nimi:String;osoite:String;puhelinnumero:String]
					       [Viesti|sisalto:String]
					       [Henkilo]2-*[Viesti]"/>
  </figure>

  <p>
    Tarkastellaan henkilöiden tallentamista ja lukemista RandomAccessFile-tiedoston avulla.
  </p>

  <p>
    Oletetaan, että käyttäjätunnus on korkeintaan 8 merkkiä, salasana korkeintaan 8 merkkiä, nimi korkeintaan 30 merkkiä, osoite korkeintaan 30 merkkiä ja puhelinnumero korkeintaan 15 merkkiä. Tehtäväpohjassa on valmiina henkilöiden lukemis- ja kirjoitustoiminnallisuus.
  </p>

  <p>
    Kirjoita toiminnallisuus, joka mahdollistaa henkilöiden tietojen muokkaamisen. Toteuta luokan <code>Tallentaja</code> metodi <code>korvaaHenkilo</code> siten, että metodi korvaa parametrina annetulla käyttäjätunnuksella tunnistettavan henkilön tiedon parametrina saadulla Henkilo-oliolla. Älä muokkaa metodin parametreja tai metodin palautustyyppiä.
  </p>

  <p>
    Voit olettaa, että käyttäjä syöttää aina käyttäjätunnuksen, joka löytyy tiedostosta. Älä muokkaa muiden tiedostoon tallennettujen henkilöiden tietoja.
  </p>

<% end %>




<% partial 'partials/material_heading' do %>
  Tietokannan käsittely ohjelmallisesti
<% end %>

<p>
  Lähes jokainen ohjelmointikieli tarjoaa jonkinlaisen rajapinnan tietokantakyselyiden tekemiseen. Nämä rajapinnat suoraviivaistavat kyselyiden tekemistä tietokantoihin ja tietokannanhallintajärjestelmien käyttöönoottoa, sillä rajapintaa noudattamalla yhteydenotto tietokannantallintajärjestelmään on lähes samankaltaista käytetystä tietokannanhallintajärjestelmästä riippumatta.
</p>

<p>
  Java-kielessä tähän tehtävään on <a href="https://en.wikipedia.org/wiki/Java_Database_Connectivity" target="_blank" nodel>Java Database Connectivity</a> (JDBC) -rajapinta. JDBC tarjoaa tuen tietokantayhteyden luomiseen sekä kyselyiden suorittamiseen tietokantayhteyden yli. Jotta JDBCn avulla voidaan ottaa yhteys tietokantaan, tulee käytössä olla tietokannanhallintajärjestelmäkohtainen ajuri, jonka vastuulla on tietokantayhteyden luomiseen liittyvät yksityiskohdat sekä tietokannanhallintajärjestelmän sisäisten kyselytulosten muuntaminen JDBC-rajapinnan mukaiseen muotoon.
</p>


<% partial 'partials/hint', locals: { name: 'JDBC-ajurin noutaminen' } do %>

  <p>
    JDBC-ajurit ovat käytännössä Java-kielellä kirjoitettuja ohjelmia, joita tietokannanhallintajärjestelmän toteuttajat tarjoavat ohjelmoijien käyttöön. Kurssin toisessa osassa ajurit on lisätty valmiiksi tehtäväpohjien <code>lib</code>-kansioon, jonka lisäksi niiden käyttö on valmiiksi määritelty tehtäväpohjissa.
  </p>

  <p>
    Myöhemmissä osissa tutustumme kirjastojen käyttöönottoon ja hakemiseen <a href="https://maven.apache.org/" target="_blank" norel">Maven</a>-apuvälineen avulla.
  </p>

<% end %>



<% partial 'partials/material_sub_heading' do %>
  Ohjelmallinen tietokantakysely kokonaisuudessaan
<% end %>


<p>
  Oletetaan, että käytössämme on seuraava tietokantataulu Opiskelija:
</p>

<table class="table">
  <thead>
    <tr>
      <th>opiskelijanumero (integer)</th>
      <th>nimi (varchar)</th>
      <th>syntymävuosi (integer)</th>
      <th>pääaine (varchar)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>9999999</td>
      <td>Pihla</td>
      <td>1997</td>
      <td>Tietojenkäsittelytiede</td>
    </tr>
    <tr>
      <td>9999998</td>
      <td>Joni</td>
      <td>1993</td>
      <td>Tietojenkäsittelytiede</td>
    </tr>
    <tr>
      <td>...</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>


<p>
  JDBCn avulla kyselyn tekeminen tietokantatauluun tapahtuu seuraavasti -- olettaen, että käytössämme on sekä tietokanta, että tietokannan ajuri.
</p>


<% partial 'partials/code_highlight' do %>
  import java.sql.Connection;
  import java.sql.DriverManager;
  import java.sql.ResultSet;
  import java.sql.Statement;

  public class Main {
      public static void main(String[] args) throws Exception {
          // luodaan yhteys jdbc:n yli sqlite-tietokantaan nimeltä "tietokanta.db"
          Connection connection = DriverManager.getConnection("jdbc:sqlite:tietokanta.db");

          // luodaan kyely "SELECT * FROM Opiskelija", jolla haetaan
          // kaikki tiedot Opiskelija-taulusta
          PreparedStatement statement = connection.prepareStatement("SELECT * FROM Opiskelija");

          // suoritetaan kysely -- tuloksena resultSet-olio
          ResultSet resultSet = statement.executeQuery();

          // käydään tuloksena saadussa oliossa olevat rivit läpi -- next-komento hakee
          // aina seuraavan rivin, ja palauttaa true jos rivi löytyi
          while(resultSet.next()) {
              // haetaan nykyiseltä riviltä opiskelijanumero int-muodossa
              Integer opNro = resultSet.getInt("opiskelijanumero");
              // haetaan nykyiseltä riviltä nimi String-muodossa
              String nimi = resultSet.getString("nimi");
              // haetaan nykyiseltä riviltä syntymävuosi int-muodossa
              Integer syntVuosi = resultSet.getInt("syntymävuosi");
              // haetaan nykyiseltä riviltä pääaine String-muodossa
              String paaAine = resultSet.getString("pääaine");

              // tulostetaan tiedot
              System.out.println(opNro + "\t" + nimi + "\t" + syntVuosi + "\t" + paaAine);
          }

          // suljetaan lopulta yhteys tietokantaan
          connection.close();
      }
  }
<% end %>

<p>
  Ohjelman suoritus tuottaa (esimerkiksi) seuraavanlaisen tulostuksen:
</p>

<% partial 'partials/sample_output' do %>
  999999	Pihla	1997	Tietojenkäsittelytiede
  999998	Joni	1993	Tietojenkäsittelytiede
  999997	Anna	1991	Matematiikka
  999996	Krista	1990	Tietojenkäsittelytiede
  ...
<% end %>


<% partial 'partials/material_sub_heading' do %>
  Ohjelman rakentaminen osissa
<% end %>

<p>
  <em>Tässä oletetaan, että projektiin on lisätty tarvittava JDBC-ajuri.</em>
</p>

<p>
  Avaa projektiin liittyvä <em>Source Packages</em> ja valitse (tai tarvittaessa luo) sopiva pakkaus. Oletetaan tässä, että käytössä on pakkaus <code>tikape</code>. Valitse tämän jälkeen <em>New</em> -> <em>Java Class</em>, jonka jälkeen avautuu valikko, missä voit antaa luokalle nimen. Anna luokan nimeksi <code>Main</code>.
</p>

<p>
  Avaa tiedosto tuplaklikkaamalla sitä. Muokkaa tiedostoa vielä siten, että se on seuraavan näköinen:
</p>

<% partial 'partials/code_highlight' do %>
  package tikape;

  public class Main {

      public static void main(String[] args) throws Exception {

      }
  }
<% end %>



<% partial 'partials/material_sub_sub_heading' do %>
  Tietokantayhteyden luominen
<% end %>

<p>
  Lisää projektiin komento <code>import java.sql.*;</code>, joka hakee kaikki SQL-kyselyihin liittyvät Javan kirjastot.
</p>

<% partial 'partials/code_highlight' do %>
  package tikape;

  import java.sql.*;

  public class Main {

      public static void main(String[] args) throws Exception {

      }
  }
<% end %>

<p>
  Avataan seuraavaksi tietokantayhteys tietokantatiedostoon nimeltä <em>testi.db</em> ja tehdään kysely "SELECT 1", jolla pyydetään tietokantaa palauttamaan luku 1 -- käytämme tätä yhteyden testaamiseksi. Jos yhteyden luominen onnistuu, tulostetaan "Hei tietokantamaailma!", muulloin "Yhteyden muodostaminen epäonnistui".
</p>

<% partial 'partials/code_highlight' do %>
  package tikape;

  import java.sql.*;

  public class Main {

      public static void main(String[] args) throws Exception {
          Connection connection = DriverManager.getConnection("jdbc:sqlite:testi.db");

          PreparedStatement statement = connection.prepareStatement("SELECT 1");

          ResultSet resultSet = statement.executeQuery();

          if (resultSet.next()) {
              System.out.println("Hei tietokantamaailma!");
          } else {
              System.out.println("Yhteyden muodostaminen epäonnistui.");
          }
      }
  }
<% end %>

<% partial 'partials/sample_output' do %>
  Hei tietokantamaailma!
<% end %>

<p>
  Kun suoritamme ohjelman ensimmäistä kertaa valitsemalla <em>Run</em> -> <em>Run Project</em>, puuttuvan tietokannan paikalle luodaan tietokanta (ainakin SQLiteä käyttäessä). Projektin kansiossa on nyt tiedosto <code>testi.db</code>, joka on tietokantamme.
</p>


<figure>
  <img src="/img/viikko3/nb-testidb.png" alt="Kun ohjelma on suoritettu ensimmäistä kertaa, tiedosto testi.db luodaan projektiin."/>
  <figcaption>Tietokantatiedosto <em>testi.db</em> löytyy projektin kansiosta. Tiedostot löytyvät <em>Files</em>-välilehdeltä.</figcaption>
</figure>



<% partial 'partials/material_sub_sub_heading' do %>
  Tietokantakyselyiden tekeminen
<% end %>

<p>
  Osoitteessa <a href="https://materiaalit.github.io/tikape-k18/dbs/vuokraamo.db">vuokraamo.db</a> löytyy kuvitteellisen moottoripyörävuokraamon tietokanta. Lataa se edellä tehdyn projektin juureen ja kokeile kyselyn tekemistä kyseiseen tietokantaan.
</p>

<p>
  Tietokannassa on tietokantataulu <code>Pyora</code>, jolla on sarakkeet <code>rekisterinumero</code> ja <code>merkki</code>. Jokaisen pyörän rekisterinumeron ja merkin tulostaminen tapahtuu seuraavasti -- huomaa myös, että olemme vaihtaneet käytössä olevaa tietokantaa.
</p>

<% partial 'partials/code_highlight' do %>
  Connection connection = DriverManager.getConnection("jdbc:sqlite:vuokraamo.db");

  PreparedStatement stmt = connection.prepareStatement("SELECT * FROM Pyora");
  ResultSet rs = stmt.executeQuery();

  while (rs.next()) {
      String rekisterinumero = rs.getString("rekisterinumero");
      String merkki = rs.getString("merkki");

      System.out.println(rekisterinumero + " " + merkki);
  }

  stmt.close();
  rs.close();

  connection.close();
<% end %>

<p>
  Käydään ylläoleva ohjelmakoodi läpi askeleittain.
</p>

<ol>
  <li>
    <p>Luomme ensin JDBC-yhteyden tietokantaan <em>vuokraamo.db</em>.
      <% partial 'partials/code_highlight' do %>
Connection connection = DriverManager.getConnection("jdbc:sqlite:vuokraamo.db");
      <% end %>
    </p>
  </li>

  <li>
    <p>Kysely luodaan antamalla yhteydelle merkkijono, jossa on kysely. Yhteys palauttaa <em>PreparedStatement</em>-olion, jota käytetään kyselyn suorittamiseen ja tulosten pyytämiseen. Metodi <em>executeQuery</em> suorittaa SQL-kyselyn ja palauttaa tulokset sisältävän <em>ResultSet</em>-olion.

      <% partial 'partials/code_highlight' do %>
PreparedStatement statement = connection.prepareStatement("SELECT * FROM Pyora");
ResultSet resultSet = statement.executeQuery();
      <% end %>
    </p>
  </li>

  <li>
    <p>Tämän jälkeen ResultSet-oliossa olevat tulokset käydään läpi. Metodia next() kutsumalla siirrytään kyselyn palauttamissa tulosriveissä eteenpäin. Kultakin riviltä voi kysyä sarakeotsikon perusteella solun arvoa. Esimerkiksi kutsu getString("rekisterinumero") palauttaa kyseisellä rivillä olevan sarakkeen "rekisterinumero" arvon String-tyyppisenä.

      <% partial 'partials/code_highlight' do %>
while(resultSet.next()) {
    String rekisterinumero = rs.getString("rekisterinumero");
    String merkki = rs.getString("merkki");

    System.out.println(rekisterinumero + " " + merkki);
}
      <% end %>
    </p>
  </li>

  <li>
    <p>Kun kyselyn vastauksena saadut rivit on käyty läpi, eikä niitä enää tarvita, vapautetaan niihin liittyvät resurssit.

      <% partial 'partials/code_highlight' do %>
stmt.close();
rs.close();
      <% end %>
    </p>
  </li>


  <li>
    <p>Lopulta tietokantayhteys suljetaan.

      <% partial 'partials/code_highlight' do %>
connection.close();
      <% end %>
    </p>
  </li>
</ol>



<% partial 'partials/material_sub_sub_heading' do %>
  Parametrien lisääminen kyselyyn
<% end %>

<p>
  Kyselyihin halutaan usein antaa rajausehtoja. Ohjelmallisesti tämä tapahtuu lisäämällä kyselyä muodostaessa rajausehtoihin kohtia, joihin asetetaan arvot. Alla olevassa esimerkissä kyselyyn lisätään merkkijono.
</p>

<% partial 'partials/code_highlight' do %>
  PreparedStatement statement =
      connection.prepareStatement("SELECT * FROM Pyora WHERE merkki = ?");
  statement.setString(1, "Royal Enfield");

  ResultSet resultSet = statement.executeQuery();
<% end %>

<p>
  Kyselyiden paikat indeksoidaan kohdasta 1 alkaen. Alla olevassa esimerkissä haetaan Henkilo-taulusta henkilöitä, joiden syntymävuosi on 1952.
</p>

<% partial 'partials/code_highlight' do %>
  PreparedStatement statement =
      connection.prepareStatement("SELECT * FROM Henkilo WHERE syntymavuosi  = ?");
  statement.setInt(1, 1952);

  ResultSet resultSet = statement.executeQuery();
<% end %>

<p>
  Ohjelma voi toimia myös siten, että rajausehdot kysytään ohjelman käyttäjältä.
</p>


<% partial 'partials/code_highlight' do %>
  Scanner lukija = new Scanner(System.in);
  System.out.println("Minkä vuoden opiskelijat tulostetaan?");
  int vuosi = Integer.parseInt(lukija.nextLine());

  // ...

  PreparedStatement statement =
      connection.prepareStatement("SELECT * FROM Henkilo WHERE syntymavuosi  = ?");
  statement.setInt(1, vuosi);

  ResultSet resultSet = statement.executeQuery();

  // ...
<% end %>


<% partial 'partials/hint', locals: { name: 'PreparedStatement ja setterit' } do %>

  <p>
    Kun kyselyt luodaan tietokantayhteyteen liittyvän olion prepareStatement oliolla, kyselyihin merkitään kysymysmerkeillä ne kohdat, joihin käyttäjän syöttämiä arvoja voidaan lisätä. Kun ns. setterimetodilla -- esim setInt -- asetetaan parametrin arvo kyselyyn, Java tarkastaa (1) että arvo on varmasti halutun kaltainen ja (2) että arvossa ei ole esimerkiksi hipsuja, jolloin parametrina annetulla arvolla voisi vaikuttaa kyselyyn.
  </p>

<% end %>


<% partial 'partials/material_sub_sub_heading' do %>
  Päivityskyselyiden tekeminen
<% end %>

<p>
  Myös päivityskyselyiden kuten rivien lisäämisten ja rivien poistamisten tekeminen onnistuu ohjelmallisesti. Tällöin tuloksessa ei ole erillistä ResultSet-oliota, vaan luku, joka kertoo muuttuneiden rivien määrän. Allaoleva ohjelmakoodi lisää pyöriä sisältävään tietokantaan uuden pyörän.
</p>

<% partial 'partials/code_highlight' do %>
  Connection connection = DriverManager.getConnection("jdbc:sqlite:vuokraamo.db");

  PreparedStatement stmt =
      connection.prepareStatement("INSERT INTO Pyora (rekisterinumero, merkki) VALUES (?, ?)");
  stmt.setString(1, "RIP-34");
  stmt.setString(2, "Jopo");

  int changes = stmt.executeUpdate();

  System.out.println("Kyselyn vaikuttamia rivejä: " + changes);
  stmt.close();

  connection.close();
<% end %>



<% partial 'partials/material_sub_heading' do %>
  Oliot ja tietokantataulut
<% end %>

<p>
  Käsittelimme äskettäin tietokantakyselyiden tekemistä ohjelmallisesti. Tietokantakyselyiden tekeminen koostuu oleellisesti muutamasta osasta: (1) yhteyden muodostaminen tietokantaan, (2) kyselyn muodostaminen, (3) kyselyn suorittaminen, (4) vastausten läpikäynti, ja (5) resurssien vapauttaminen sekä yhteyden sulkeminen. Edellisessä osassa käsiteltiin Pyora-taulun sisältävää tietokantaa seuraavasti.
</p>


<% partial 'partials/code_highlight' do %>
  Connection connection = DriverManager.getConnection("jdbc:sqlite:vuokraamo.db");

  PreparedStatement stmt = connection.prepareStatement("SELECT * FROM Pyora");
  ResultSet rs = stmt.executeQuery();

  while (rs.next()) {
      String rekisterinumero = rs.getString("rekisterinumero");
      String merkki = rs.getString("merkki");

      System.out.println(rekisterinumero + " " + merkki);
  }

  stmt.close();
  rs.close();

  connection.close();
<% end %>


<p>
  Ohjelmoijan näkökulmasta on paljon mielekkäämpää jos tietoa pystyy käsittelemään olioiden avulla. Oletetaan, että käytössämme on luokka Asiakas sekä tietokantataulu Asiakas. Tietokantataulu on luotu seuraavalla CREATE TABLE -lauseella.
</p>

<% partial 'partials/sql_highlight' do %>
  CREATE TABLE Asiakas (
      id integer PRIMARY KEY,
      nimi varchar(200),
      puhelinnumero varchar(20),
      katuosoite varcar(50),
      postinumero integer,
      postitoimipaikka varchar(20)
  );
<% end %>

<p>
  Alla on taulua vastaava luokka.
</p>

<% partial 'partials/code_highlight' do %>
  public class Asiakas {
      Integer id;
      String nimi;
      String puhelinnumero;
      String katuosoite;
      Integer postinumero;
      String postitoimipaikka;

      public Asiakas(Integer id, String nimi, String puhelinnumero, String
              katuosoite, Integer postinumero, String postitoimipaikka) {
          this.id = id;
          this.nimi = nimi;
          this.puhelinnumero = puhelinnumero;
          this.katuosoite = katuosoite;
          this.postinumero = postinumero;
          this.postitoimipaikka = postitoimipaikka;
      }

      // muita metodeja ym

  }
<% end %>

<p>
  Hakiessamme tietoa tietokantataulusta Asiakas voimme muuntaa kyselyn tulokset Asiakas-olioiksi.
</p>

<% partial 'partials/code_highlight' do %>
  Connection connection = DriverManager.getConnection("jdbc:sqlite:<em>tietokanta.db</em>");

  PreparedStatement stmt = connection.prepareStatement("SELECT * FROM Asiakas");
  ResultSet rs = stmt.executeQuery();

  List&lt;Asiakas&gt; asiakkaat = new ArrayList&lt;&gt;();

  while (rs.next()) {
      Asiakas a = new Asiakas(rs.getInt("id"), rs.getString("nimi"),
          rs.getString("puhelinnumero"), rs.getString("katuosoite"),
          rs.getInt("postinumero"), rs.getString("postitoimipaikka"));

      asiakkaat.add(a);
  }

  stmt.close();
  rs.close();

  connection.close();

  // nyt asiakkaat listassa
<% end %>

<p>
  Myös uuden Asiakas-olion tallentaminen tietokantatauluun onnistuu.
</p>

<% partial 'partials/code_highlight' do %>
  Connection connection = DriverManager.getConnection("jdbc:sqlite:<em>tietokanta.db</em>");

  PreparedStatement stmt = connection.prepareStatement("INSERT INTO Asiakas"
      + " (nimi, puhelinnumero, katuosoite, postinumero, postitoimipaikka)"
      + " VALUES (?, ?, ?, ?, ?)");
  stmt.setString(1, asiakas.getNimi());
  stmt.setString(2, asiakas.getPuhelinnumero());
  stmt.setString(3, asiakas.getKatuosoite());
  stmt.setInt(4, asiakas.getPostinumero());
  stmt.setString(5, asiakas.getPostitoimipaikka());

  stmt.executeUpdate();
  stmt.close();


  // voimme halutessamme tehdä myös toisen kyselyn, jonka avulla saadaan selville
  // juuri tallennetun olion tunnus -- alla oletetaan, että asiakkaan voi
  // yksilöidä nimen ja puhelinnumeron perusteella
  stmt = connection.prepareStatement("SELECT * FROM Asiakas"
      + " WHERE nimi = ? AND puhelinnumero = ?");
  stmt.setString(1, asiakas.getNimi());
  stmt.setString(2, asiakas.getPuhelinnumero());

  ResultSet rs = stmt.executeQuery();
  rs.next(); // vain 1 tulos

  Asiakas a = new Asiakas(rs.getInt("id"), rs.getString("nimi"),
      rs.getString("puhelinnumero"), rs.getString("katuosoite"),
      rs.getInt("postinumero"), rs.getString("postitoimipaikka"));

  stmt.close();
  rs.close();

  connection.close();
<% end %>
