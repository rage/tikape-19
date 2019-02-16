---
path: '/osa-5/4-tietokannan-kasittely-spring'
title: 'Tietokannan käsittely sovelluskehyksen avulla'
hidden: false
---

Tietokantoja käsitellään tyypillisesti sovelluskehysten avulla. Tutustutaan seuraavaksi lyhyesti tietokantakyselyiden tekemiseen <a href="https://spring.io/" target="_blank">Spring-sovelluskehyksen</a> avulla. Käytämme esimerkeissä Spring-sovelluskehyksen luokkaa <a href="https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jdbc/core/JdbcTemplate.html" target="_blank">JdbcTemplate</a>, joka abstrahoi tietokantayhteyden muodostamisen sekä tietokantayhteyteen liittyvien resurssien vapauttamisen.

<br/>

Mikäli haluat luoda oman tietokantaa käyttävän Spring-projektin tyhjästä, osoitteessa <a href="https://spring.io/guides/gs/relational-data-access/" target="_blank">https://spring.io/guides/gs/relational-data-access/</a> oleva opas on hyvä lähtökohta.

<br/>


## Tietokantayhteyden määrittely

Tietokantayhteys määritellään Spring-projekteissa `application.properties`-tiedoston avulla. Tiedostoon määritellään osoite, tietokantayhteyden luomiseen käytettävä ajuri, käyttäjätunnus, salasana, sekä mahdollisesti muita lisäominaisuuksia. Tiedosto lisätään projektin kansioon `src/main/resources`.

Alla oleva sisältö tarjoaisi yhteyden projektin juuressa olevaan tietokantatiedostoon `tietokanta`.

<sample-output>

spring.datasource.url=jdbc:h2:./tietokanta
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

</sample-output>


## Ensimmäinen komentorivisovellus

Komentorivisovellus luodaan toteuttamalla Spring-sovelluskehyksen `CommandLineRunner`-rajapinta. Kaikki (tämän kurssin puitteissa käsiteltävät) Spring-sovellukset käynnistetään luokasta, jossa on annotaatio `@SpringBootApplication`.

Yksinkertainen komentorivisovellus näyttää seuraavalta.

```java
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NimetSpringSovellus implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(NimetSpringSovellus.class);
    }

    @Override
    public void run(String... args) throws Exception {
        // Komentorivisovelluksen toiminnallisuus
        System.out.println("Hei maailma!");
    }
}
```

Sovelluksen suorittaminen tulostaa viestin `Hei maailma!`.


## Sovelluskehyksen tarjoamien apuvälineiden käyttöönotto


Kun sovellus suoritetaan, Spring-sovelluskehys lataa käyttöönsä sovelluskehyksen tarjoamat apuvälineet. Voimme tuoda apuvälineitä käyttöön sovellukseemme `@Autowired`-annotaatiolla. Esimerkkiemme kannalta oleellisin apuväline on luokka `JdbcTemplate`, joka tarjoaa mahdollisuuden tietokantakyselyiden tekemiseen.

Alla olevassa esimerkissä sovelluksen käyttöön on tuotu `JdbcTemplate`-luokasta luotu olio. Spring luo olion puolestamme ja määrittelee siihen liittyvät asetukset antamamme `application.properties`-tiedoston perusteella.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class NimetSpringSovellus implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(NimetSpringSovellus.class);
    }

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        // Komentorivisovelluksen toiminnallisuus
        System.out.println("Hei maailma!");
    }
}
```


## Tietokantakyselyn suorittaminen

Oletetaan, että käytössämme on edellisestä luvusta tuttu tietokantataulu `Opiskelija`, jonka sisältö on seuraava.

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

Spring-sovelluskehyksen tarjoaman JdbcTemplate-luokan avulla opiskelijoiden nimien tulostaminen tapahtuu seuraavasti.

```java
// importit

@SpringBootApplication
public class NimetSpringSovellus implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(NimetSpringSovellus.class);
    }

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        // Komentorivisovelluksen toiminnallisuus
        System.out.println("Hei maailma!");

        // Kyselyn suorittaminen ja tulosten listaaminen
        jdbcTemplate.query(
                "SELECT nimi FROM Opiskelija;",
                (rs, rowNum) -> rs.getString("nimi")
        ).forEach(System.out::println);
    }
}
```

Mikäli tietokantataulussa on yllä kuvatut kaksi riviä, ohjelman tulostus on seuraava:

<sample-output>

Hei maailma!
Joni
Pihla

</sample-output>

Tarkastellaan kyselyä hieman tarkemmin.

```java
jdbcTemplate.query(
    "SELECT nimi FROM Opiskelija;",
    (rs, rowNum) -> rs.getString("nimi")
).forEach(System.out::println);
```

Luokan `JdbcTemplate` metodi `query` saa parametrinaan SQL-kielisen lauseen sekä lambda-lausekkeen, joka kertoo mitä tulostaulun riveille tulee tehdä. Yllä SQL-kielinen lause on "SELECT nimi FROM Opiskelija", eli hae kaikki Opiskelija-taulussa olevat nimet.

Lambdalauseke `(rs, rowNum) -> rs.getString("nimi")` sisältää `rs`-nimisen `ResultSet`-olion ja kokonaislukutyyppisen `rowNum`-muuttujan. Kuten JDBC-harjoittelusta tiedämme, `ResultSet`-olio sisältää kyselyn tulokset, ja siltä voi kysyä sarakkeen arvoja. Muuttuja `rowNum` on Spring-sovelluskehyksen tarjoama lisätuki, joka kertoo kyseisen rivin. Lauseke muuntaa kunkin tulosrivin merkkijonoksi, joka sisältää rivillä olevan nimen.

Metodi `query` palauttaa listan, joka käytään lopulta `forEach`-metodilla läpi.

Kyselyn voisi toteuttaa myös seuraavalla tavalla.

```java
List<String> nimet = jdbcTemplate.query(
    "SELECT nimi FROM Opiskelija;",
    (rs, rowNum) -> rs.getString("nimi"));

nimet.forEach(System.out::println);
```


<programming-exercise name='Nimet Spring' tmcname='osa05-Osa05_03.NimetSpring'>

Tehtäväpohjassa on mukana H2-muotoinen tietokanta `henkilotietokanta`, joka sisältää tietoa henkilöistä. Jokaisella henkilöllä on `id` ja `nimi`. Tehtäväpohjaan on valmiiksi määritelty ohjelman tarvitsema `application.properties`-tiedosto sekä Spring-sovelluksen tekstikäyttöliittymäpohja.

Kirjoita ohjelma, joka hakee tietokannasta kaikki henkilöt, ja tulostaa heidän nimet.

Tehtäväpohjassa on lisäksi metodi `alustaTietokantaJaLuoNimia`. Metodin kutsuminen poistaa vanhan tietokannan ja luo uuden tietokannan vanhan tilalle. Tämä auttaa mikäli poistat tai muokkaat vahingossa olemassaolevaa tietokantaa.

Tehtävään liittyvät testit ovat vain tehtäväpalvelimella.

</programming-exercise>


### Parametrien lisääminen kyselyyn

Parametrien lisääminen kyselyyn on mahdollista edellisessä luvussa tutuksi tulleella tavalla. Suurin ero edelliseen on se, että aiemmin parametrit lisättiin yksi kerrallaan `PreparedStatement`-olion tarjoamilla metodeilla. JdbcTemplate-luokkaa käytettäessä parametrit lisätään kyselyn loppuun.

Alla olevassa esimerkissä kyselyyn lisätään rajausehto -- haluamme vain `Pihla`-nimisen opiskelijan tiedot.

```java
List<String> nimet = jdbcTemplate.query(
    "SELECT * FROM Opiskelija WHERE nimi = ?;",
    (rs, rowNum) -> rs.getString("nimi"),
    "Pihla");
```

Alla olevassa esimerkissä haetaan Opiskelija-taulusta henkilöitä, joiden syntymävuosi on pienempi kuin 2000 ja joiden pääaine on tietojenkässittelytiede.


```java
List<String> nimet = jdbcTemplate.query(
    "SELECT * FROM Opiskelija WHERE syntymävuosi  < ? AND pääaine = ?",
    (rs, rowNum) -> rs.getString("nimi"),
    2000, "Tietojenkäsittelytiede");
```

Kuten aiemmin, ohjelma voi toimia myös siten, että rajausehdot kysytään ohjelman käyttäjältä.


```java
Scanner lukija = new Scanner(System.in);
System.out.println("Minä vuonna syntyneet opiskelijat tulostetaan?");
int vuosi = Integer.parseInt(lukija.nextLine());

// ...
List<String> nimet = jdbcTemplate.query(
    "SELECT * FROM Opiskelija WHERE syntymävuosi = ?",
    (rs, rowNum) -> rs.getString("nimi"),
    vuosi);
// ...
```

### Tietoa muokkaavien kyselyiden tekeminen

Tietoa muokkaavat kyselyt -- kuten tiedon lisäämiskyselyt, muokkauskyselyt, tai tietokannan rakenteeseen vaikuttavat kyselyt -- suoritetaan `JdbcTemplate`-olion `update`-metodilla.

Alla olevassa esimerkissä luodaan tietokantatauluun `Opiskelija` uusi rivi. Uuden opiskelijan nimeksi tulee `Matti`, syntymävuodeksi `1973` ja pääaineeksi `Matematiikka`.

```java
// ...

jdbcTemplate.update("INSERT INTO Opiskelija (nimi, syntymävuosi, pääaine) VALUES (?, ?, ?)", "Matti", 1973, "Matematiikka");

// ...
```

Ohjelma voisi sisältää myös Scanner-olion, joka kysyy em. parametreja käyttäjältä. Tällöin sovellus olisi -- esimerkiksi -- seuraava.

```java
// ...
Scanner lukija = new Scanner(System.in);
System.out.println("Minkä niminen opiskelija lisätään?");
String nimi = lukija.nextLine();
System.out.println("Milloin lisättävä opiskelija on syntynyt?");
int syntymavuosi = Integer.valueOf(lukija.nextLine());
System.out.println("Mikä on lisättävän opiskelijan pääaine?");
String aine = lukija.nextLine();


jdbcTemplate.update("INSERT INTO Opiskelija (nimi, syntymävuosi, pääaine) VALUES (?, ?, ?)", nimi, syntymavuosi, aine);

// ...
```


<programming-exercise name='Lisays Spring' tmcname='osa05-Osa05_04.LisaysSpring'>

Tehtäväpohjassa on mukana H2-muotoinen tietokanta `henkilotietokanta`, joka sisältää tietoa henkilöistä. Jokaisella henkilöllä on `id` ja `nimi`. Tehtäväpohjaan on valmiiksi määritelty ohjelman tarvitsema `application.properties`-tiedosto sekä Spring-sovelluksen tekstikäyttöliittymäpohja.

Kirjoita ohjelma, joka kysyy käyttäjältä uuden henkilön nimeä ja lisää henkilön tietokantaan.

Ohjelman odotettu toiminta on seuraava:

<sample-output>

Minkä niminen henkilö lisätään?
**Matti**
Lisätään Matti

</sample-output>

Nyt tietokantaan on lisätty henkilö, jonka nimi on Matti. Voit varmistaa henkilön lisäämisen avaamalla H2-tietokannanhallintajärjestelmän kurssin toisen osan kohdan "Muutamia tietokannanhallintajärjestelmiä" materiaalin esimerkkiä seuraamalla.

Tehtäväpohjassa on lisäksi metodi `alustaTietokantaJaLuoNimia`. Metodin kutsuminen poistaa vanhan tietokannan ja luo uuden tietokannan vanhan tilalle. Tämä auttaa mikäli poistat tai muokkaat vahingossa olemassaolevaa tietokantaa.

Tehtävässä ei ole testejä. Palauta tehtävä kun se toimii oikein.

</programming-exercise>


<programming-exercise name='Sanakirja (2 osaa)' tmcname='osa05-Osa05_05.Sanakirja'>

Tässä tehtävässä täydennät hieman laajempaan ohjelmaan tietokantatoiminnallisuutta. Ohjelma vastaa Ohjelmoinnin MOOCin kuudennen osan tehtävää "Sanakirja". Toisin kuin ohjelmointikurssilla, tässä tiedot tallennetaan tietokantaan.

Käytössäsi on valmiina tietokantataulu `Sanasto`, jossa on sarakkeet `id`, `sana` ja `kaannos`. Sovellukseen on määritelty Spring-sovelluskehyksen kannalta oleelliset konfiguraatiot.

Tehtävässä sinun tarvitsee vain muokata luokkaa `Sanakirja`. Tehtävän testit ovat tehtäväpalvelimella.

<h2>Lisääminen ja kääntäminen</h2>

Toteuta ensin luokkaan `Sanakirja` metodit `lisaa` ja `kaanna`. Metodien tulee toimia seuraavasti:

- Metodi `lisaa` saa parametrina sanan ja käännöksen. Metodin tulee lisätä sana ja käännös uudeksi riviksi tietokannan tauluun `Sanasto`.
- Metodi `kaanna` saa parametrinaan sanan. Metodin tulee palauttaa sanaan liittyvä käännös. Mikäli käännöstä ei löydy, metodin tulee palauttaa `null`-viite.

Ohjelmassa on tekstikäyttöliittymä, joka käynnistyy kun suoritat luokan `SanakirjaSovellus` main-metodin. Kuten aiemmin, voit myös tarkastella tietokantaa komentoriviltä.


<h2>Sanojen lukumäärä ja käännökset listana</h2>

Kun metodit `lisaa`ja `kaanna` toimivat, lisää seuraavaksi toiminnallisuus sanojen lukumäärän hakemiseen sekä kaannosten listana palauttamiseen. Nämä toteutetaan seuraaviin metodeihin:

- Metodi `sanojenLukumaara` on parametriton. Sen tulee palauttaa tietokannan taulussa `Sanasto` olevien sanojen lukumäärä.
- Metodi `kaannoksetListana` on myös parametriton. Sen tulee palauttaa tietokannassa olevat käännökset listana siten, että kukin listan alkio muodostaa merkkijonomuotoisen parin "sana = kaannos".

</programming-exercise>
