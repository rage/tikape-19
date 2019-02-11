---
path: '/osa-5/3-tietokannan-kasittely-jdbc'
title: 'Tietokannan käsittely ohjelmallisesti'
hidden: true
---

Lähes jokainen ohjelmointikieli tarjoaa jonkinlaisen rajapinnan tietokantakyselyiden tekemiseen. Nämä rajapinnat suoraviivaistavat tietokannanhallintajärjestelmien käyttöönoottoa ja kyselyiden tekemistä tietokantoihin. Etuna ohjelmointirajapinnoissa on tyypillisesti se, että rajapintaa noudattamalla yhteydenotto tietokannantallintajärjestelmään on lähes samankaltaista käytetystä tietokannanhallintajärjestelmästä riippumatta.

Java-kielessä tähän tehtävään on <a href="https://en.wikipedia.org/wiki/Java_Database_Connectivity" target="_blank" nodel>Java Database Connectivity</a> (JDBC) -rajapinta. JDBC tarjoaa tuen tietokantayhteyden luomiseen sekä kyselyiden suorittamiseen tietokantayhteyden yli.

Jotta JDBCn avulla voidaan ottaa yhteys tietokantaan, tulee käytössä olla tietokannanhallintajärjestelmäkohtainen ajuri, jonka vastuulla on tietokantayhteyden luomiseen liittyvät yksityiskohdat sekä tietokannanhallintajärjestelmän sisäisten kyselytulosten muuntaminen JDBC-rajapinnan mukaiseen muotoon.

Tutustutaan seuraavaksi tietokantayhteyden ja tietokantakyselyiden tekemiseen JDBC:tä käyttäen. Ohjelmointitehtävät tehdään TMC-järjestelmässä, jonka kautta ladattavissa tehtävissä tietokanta-ajuri on suoraan ladattuna.

Mikäli et ole käyttänyt TMC-järjestelmää, tutustu Ohjelmoinnin MOOCin materiaaleihin osoitteessa <a href="http://ohjelmointi-19.mooc.fi" target="_blank">http://ohjelmointi-19.mooc.fi</a>. TMC:n käyttöönottoa käsitellään materiaalissa osassa 1, kohdassa Tulostaminen ja lukeminen <a href="https://ohjelmointi-19.mooc.fi/osa-1/2-tulostaminen-ja-lukeminen" target="_blank">https://ohjelmointi-19.mooc.fi/osa-1/2-tulostaminen-ja-lukeminen</a>.

<br/>

Mikäli TMC:n käyttöönotossa on ongelmia, katsothan myös Ohjelmoinnin MOOCin usein kysytyt kysymykset: <a href="https://ohjelmointi-19.mooc.fi/usein-kysytyt-kysymykset" target="_blank">https://ohjelmointi-19.mooc.fi/usein-kysytyt-kysymykset</a>. Kurssimme Moodle-alueella sekä Telegramissa voi myös kysyä apua asiaan liittyvissä ongelmissa.

<br/>

Tietokantojen perusteet-kurssilla organisaatioksi tulee valita TMC:ssä "MOOC" ja kurssiksi "Tietokantojen perusteet, kevät 2019". TMC:n käyttäjätunnukset ovat samat kuin mitä käytät tässä materiaalissa.

Aloitetaan.

## JDBC-tietokantakysely kokonaisuudessaan

Oletetaan, että käytössämme on seuraava tietokantataulu `Opiskelija`:

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

JDBCn avulla kyselyn tekeminen tietokantatauluun tapahtuu seuraavasti -- olettaen, että käytössämme on sekä tietokanta, että tietokannan ajuri. Alla oletetaan lisäksi, että projektin juuressa on H2-tietokannanhallintajärjestelmän tietokanta, jonka sisällä on yllä kuvattu taulu `Opiskelija`.

Tietokanta käyttää tiedostoja  `tietokanta.mv.db` sekä `tietokanta.trace.db`. Tarkempaa kurssimme kannalta epäoleellista tietoa näistä tiedostoista löytyy <a href="http://www.h2database.com/html/main.html" target="_blank">H2-tietokannanhallintajärjestelmän sivuilta</a>.

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Main {
    public static void main(String[] args) throws Exception {
        // luodaan yhteys jdbc:n yli h2-tietokantaan nimeltä "tietokanta"
        // käyttäjätunnuksena on "sa" ja salasanana tyhjä
        Connection connection = DriverManager.getConnection("jdbc:h2:./tietokanta", "sa", "");

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
```

Ohjelman suoritus tuottaa (esimerkiksi) seuraavanlaisen tulostuksen:

<sample-output>

999999	Pihla	1997	Tietojenkäsittelytiede
999998	Joni	1993	Tietojenkäsittelytiede
999997	Anna	1991	Matematiikka
999996	Krista	1990	Tietojenkäsittelytiede
...

</sample-output>


## Ohjelman rakentaminen osissa

Tarkastellaan seuraavaksi yllä kuvatun ohjelman rakentamista osissa. Oletuksena on, että olet luonut ohjelmointiympäristöön uuden projektin, ja että käytössäsi on H2-tietokannanhallintajärjestelmän ajuri.

Avaa projektiin liittyvä *Source Packages* ja valitse (tai tarvittaessa luo) sopiva pakkaus. Oletetaan tässä, että käytössä on pakkaus `tikape`. Valitse tämän jälkeen *New* -> *Java Class*, jonka jälkeen avautuu valikko, missä voit antaa luokalle nimen. Anna luokan nimeksi `Main`.

Avaa tiedosto tuplaklikkaamalla sitä. Muokkaa tiedostoa vielä siten, että se on seuraavan näköinen:

```java
package tikape;

public class Main {

    public static void main(String[] args) throws Exception {

    }
}
```

### Tietokantayhteyden luominen

Lisää projektiin komento `import java.sql.*;`, joka hakee kaikki SQL-kyselyihin liittyvät Javan kirjastot.

```java
package tikape;

import java.sql.*;

public class Main {

    public static void main(String[] args) throws Exception {

    }
}
```

Avataan seuraavaksi tietokantayhteys tietokantatiedostoon nimeltä *testi* ja tehdään kysely "SELECT 1", jolla pyydetään tietokantaa palauttamaan luku 1 -- käytämme tätä yhteyden testaamiseksi. Jos yhteyden luominen onnistuu, tulostetaan "Hei tietokantamaailma!", muulloin "Yhteyden muodostaminen epäonnistui".

```java
package tikape;

import java.sql.*;

public class Main {

    public static void main(String[] args) throws Exception {
        Connection connection = DriverManager.getConnection("jdbc:h2:./testi", "sa", "");

        PreparedStatement statement = connection.prepareStatement("SELECT 1");

        ResultSet resultSet = statement.executeQuery();

        if (resultSet.next()) {
            System.out.println("Hei tietokantamaailma!");
        } else {
            System.out.println("Yhteyden muodostaminen epäonnistui.");
        }
    }
}
```

<sample-output>

Hei tietokantamaailma!

</sample-output>


Kun suoritamme ohjelman ensimmäistä kertaa valitsemalla *Run* -> *Run Project*, puuttuvan tietokannan paikalle luodaan tietokanta (ainakin H2-tietokannanhallintajärjestelmää käytettäessä). Projektin kansiossa on nyt tietokantatiedosto, joka sisältää tietokantamme.


### Tietokantakyselyiden tekeminen

Tietokannassa on tietokantataulu `Opiskelija`, jolla on sarakkeet `nimi` ja `pääaine`. Jokaisen opiskelijan nimen ja pääaineen tulostaminen tapahtuu seuraavalla tavalla.

```java
Connection connection = DriverManager.getConnection("jdbc:h2:./testi", "sa", "");

// myös "SELECT * FROM Opiskelija" olisi mahdollinen
PreparedStatement stmt = connection.prepareStatement("SELECT nimi, pääaine FROM Opiskelija");
ResultSet rs = stmt.executeQuery();

while (rs.next()) {
    String nimi = rs.getString("nimi");
    String aine = rs.getString("pääaine");

    System.out.println(nimi + " " + aine);
}

stmt.close();
rs.close();

connection.close();
```

Käydään ylläoleva ohjelmakoodi läpi askeleittain.

1. Luomme ensin JDBC-yhteyden tietokantaan *testi*.
```java
Connection connection = DriverManager.getConnection("jdbc:h2:./testi", "sa", "");
```
2. Kysely valmistellaan yhteyden metodilla `prepareStatement`, jolle annetaan parametrina kysely merkkijonona. Yhteys palauttaa `PreparedStatement`-olion, jota käytetään kyselyn suorittamiseen ja tulosten pyytämiseen. Metodi `executeQuery` suorittaa SQL-kyselyn ja palauttaa tulokset sisältävän `ResultSet`-olion.
```java
PreparedStatement statement = connection.prepareStatement("SELECT nimi, pääaine FROM Opiskelija");
ResultSet resultSet = statement.executeQuery();
```
3. Tämän jälkeen `ResultSet`-oliossa olevat tulokset käydään läpi. Metodia `next()` kutsumalla siirrytään kyselyn palauttamissa tulosriveissä eteenpäin. Kultakin riviltä voi kysyä sarakeotsikon perusteella solun arvoa. Esimerkiksi kutsu `getString("nimi")` palauttaa kyseisellä rivillä olevan sarakkeen "nimi" arvon String-tyyppisenä.
```java
while(resultSet.next()) {
    String nimi = rs.getString("nimi");
    String aine = rs.getString("pääaine");

    System.out.println(nimi + " " + aine);
}
```
4. Kun kyselyn vastauksena saadut rivit on käyty läpi, eikä niitä enää tarvita, vapautetaan niihin liittyvät resurssit.
```java
stmt.close();
rs.close();
```
5. Lopulta tietokantayhteys suljetaan.
```java
connection.close();
```


### Parametrien lisääminen kyselyyn

Kyselyihin halutaan usein antaa rajausehtoja. Ohjelmallisesti tämä tapahtuu lisäämällä kyselyä muodostaessa rajausehtoihin kohtia, joihin asetetaan arvot. Alla olevassa esimerkissä kyselyyn lisätään rajausehto -- haluamme vain `Pihla`-nimisen opiskelijan tiedot.

```java
PreparedStatement statement =
    connection.prepareStatement("SELECT * FROM Opiskelija WHERE nimi = ?");
statement.setString(1, "Pihla");

ResultSet resultSet = statement.executeQuery();
```

Kyselyiden paikat indeksoidaan kohdasta 1 alkaen. Alla olevassa esimerkissä haetaan Opiskelija-taulusta henkilöitä, joiden syntymävuosi on pienempi kuin 2000 ja joiden pääaine on tietojenkäsittelytiede.


```java
PreparedStatement statement =
    connection.prepareStatement("SELECT * FROM Opiskelija WHERE syntymävuosi  < ? AND pääaine = ?");
statement.setInt(1, 2000);
statement.String(2, "Tietojenkäsittelytiede");

ResultSet resultSet = statement.executeQuery();
```

Ohjelma voi toimia myös siten, että rajausehdot kysytään ohjelman käyttäjältä.


```java
Scanner lukija = new Scanner(System.in);
System.out.println("Minä vuonna syntyneet opiskelijat tulostetaan?");
int vuosi = Integer.parseInt(lukija.nextLine());

// ...

PreparedStatement statement =
    connection.prepareStatement("SELECT * FROM Opiskelija WHERE syntymävuosi  = ?");
statement.setInt(1, vuosi);

ResultSet resultSet = statement.executeQuery();

// ...
```

<text-box variant='hint' name='PreparedStatement ja setterit'>

Kun kyselyt luodaan tietokantayhteyteen liittyvän olion prepareStatement oliolla, kyselyihin merkitään kysymysmerkeillä ne kohdat, joihin käyttäjän syöttämiä arvoja voidaan lisätä. Kun ns. setterimetodilla -- esim setInt -- asetetaan parametrin arvo kyselyyn, Java tarkastaa (1) että arvo on varmasti halutun kaltainen ja (2) että arvossa ei ole esimerkiksi hipsuja, jolloin parametrina annetulla arvolla voisi vaikuttaa kyselyyn.

</text-box>


<programming-exercise name='Nimet JDBC' tmcname='osa05-Osa05_01.NimetJdbc'>

Tehtäväpohjassa on mukana H2-muotoinen tietokanta `henkilotietokanta`, joka sisältää tietoa henkilöistä. Jokaisella henkilöllä on `id` ja `nimi`.

Kirjoita ohjelma, joka hakee tietokannasta kaikki henkilöt, ja tulostaa heidän nimet.

Tehtäväpohjassa on lisäksi metodi `alustaTietokantaJaLuoNimia`. Metodin kutsuminen poistaa vanhan tietokannan ja luo uuden tietokannan vanhan tilalle. Tämä auttaa mikäli poistat tai muokkaat vahingossa olemassaolevaa tietokantaa.

Tehtävään liittyvät testit ovat vain tehtäväpalvelimella.

</programming-exercise>



### Tietoa muokkaavien kyselyiden tekeminen

Tietoa muokkaavat kyselyt -- kuten tiedon lisäämiskyselyt, muokkauskyselyt, tai tietokannan rakenteeseen vaikuttavat kyselyt -- suoritetaan `PreparedStatement`-olion `executeUpdate`-metodilla.

Alla olevassa esimerkissä luodaan tietokantatauluun `Opiskelija` uusi rivi. Uuden opiskelijan nimeksi tulee `Matti`, syntymävuodeksi `1973` ja pääaineeksi `Matematiikka`.

```java
// ...

PreparedStatement statement =
    connection.prepareStatement("INSERT INTO Opiskelija (nimi, syntymavuosi, pääaine) VALUES (?, ?, ?)");
statement.setString(1, "Matti");
statement.setInt(2, 1973);
statement.setString(3, "Matematiikka");

statement.executeUpdate();

// ...
```



<programming-exercise name='Lisays JDBC' tmcname='osa05-Osa05_02.LisaysJdbc'>

Tehtäväpohjassa on mukana H2-muotoinen tietokanta `henkilotietokanta`, joka sisältää tietoa henkilöistä. Jokaisella henkilöllä on `id` ja `nimi`.

Kirjoita ohjelma, joka kysyy käyttäjältä uuden henkilön nimeä ja lisää henkilön tietokantaan.

Ohjelman odotettu toiminta on seuraava:

<sample-output>

Minkä niminen henkilö lisätään?
**Matti**
Lisätään Matti

</sample-output>

Nyt tietokantaan on lisätty henkilö, jonka nimi on Matti. Voit varmistaa henkilön lisäämisen avaamalla H2-tietokannanhallintajärjestelmän kurssin toisen osan kohdan "Muutamia tietokannanhallintajärjestelmiä" materiaalin esimerkkiä seuraamalla.

Tehtäväpohjassa on lisäksi metodi `alustaTietokantaJaLuoNimia`. Metodin kutsuminen poistaa vanhan tietokannan ja luo uuden tietokannan vanhan tilalle. Tämä auttaa mikäli poistat tai muokkaat vahingossa olemassaolevaa tietokantaa.

Tehtävään liittyvät testit ovat vain tehtäväpalvelimella.

</programming-exercise>
