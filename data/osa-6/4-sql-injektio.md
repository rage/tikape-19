---
path: '/osa-6/4-sql-injektiot'
title: 'SQL-injektiot ja niiden estäminen'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet käsitteen SQL-injektio.
- Tiedät miten sovellukseen voidaan jättää SQL-injektiomahdollisuus.
- Tunnet menetelmiä SQL-injektioiden estämiseen.

</text-box>


Suurin osa olemassaolevista sovelluksista käyttää tietokannanhallintajärjestelmiä jollain tavalla: tietoa haetaan tietokannasta, tietokannassa olevaa tietoa muokataan, ja tietokantaan tallennetaan tietoa. Tyypillisesti sovelluksiin on myös käyttöliittymä, minkä kautta sovelluksen käyttäjät pääsevät vaikuttamaan kyselyiden sisältöön.

SQL-injektiolla tarkoitetaan epätoivotun ohjelmakoodin syöttämistä osaksi SQL-lausetta, jolloin SQL-lauseessa suoritetaan siihen alunperin kuulumatonta ohjelmakoodia. Alla oleva klassinen sarjakuvaesimerkki kuvaa tilannetta, missä lapsen nimeksi on annettu `"Robert'); DROP TABLE Students;--"`.


<figure>
  <img src="https://imgs.xkcd.com/comics/exploits_of_a_mom.png" alt="School: Hi, this is your son's school. We're having some computer trouble.
  Mom: Oh, dear -- Did he break something?
  School: In a way. Did you really name your son Robert'); DROP TABLE Students;--?
  Mom: Oh. Yes. Little Bobby Tables we call him.
  School: Well, we've lost this year's student records. I hope you're happy.
  Mom: And I hope you've learned to sanitize your database inputs."/>
  <figcaption>http://xkcd.com/327/ -- Exploits of a Mom. </figcaption>
</figure>

Tarkastellaan esimerkkiä. Oletetaan, että käytössämme on tietokantataulu `Students`, jossa on sarake `name`. Tällöin tiedon lisäämiseen käytettävä kysely on (esimerkiksi) seuraava.

```sql
INSERT INTO Students (name) VALUES ('Robert');
```

Mikäli kyselyyn syötetään suoraan sarjakuvassa annettu lapsen nimi, muodostuu kyselystä seuraavanlainen:


```sql
INSERT INTO Students (name) VALUES ('Robert'); DROP TABLE Students;--);
```

Kyselyssä tehdään siis kyselyt (1) lisää tietokantatauluun `Students` rivi, missä opiskelijan nimi on `Robert`, ja (2) poista tietokantataulu `Students`. Lopussa olevat kaksi viivaa aloittavat kommentin, jolloin `Students`-taulun poistamista seuraavat komennot jätetään huomiotta.


SQL-injektioiden tekeminen onnistuu jos ohjelmoija jättää tietokantaa käsitteleviin kyselyihin ns. käyttäjän mentävän aukon. Tämä onnistuu Javalla siten, että kyselyt luodaan niin, että kyselyihin lisättävät parametrit syötetään kyselyyn suoraan merkkijonona.

Tarkastellaan tätä kahden esimerkin kautta.


```java
Scanner lukija = new Scanner(System.in);
System.out.println("Minkä niminen opiskelija lisätään?");
String nimi = lukija.nextLine();

// ...
Connection connection = DriverManager.getConnection("jdbc:h2:./students", "sa", "");
PreparedStatement stmt = connection.prepareStatement("INSERT INTO Students (name) VALUES (?)");
statement.setString(1, nimi);

// ...

ResultSet rs = stmt.executeUpdate();
```

Kysely on turvallinen, sillä merkki asetetaan metodin setString avulla. Metodi `setString` varmistaa, ettei kyselyssä ole ylimääräistä sisältöä, ja että kyselyssä syötettävä merkkijono asetetaan vain sarakkeen `name` arvoksi.

Kyselystä saa suhteellisen helposti turvattoman. Seuraavassa esimerkissä on mahdollisuus SQL-injektioon.


```java
Scanner lukija = new Scanner(System.in);
System.out.println("Minkä niminen opiskelija lisätään?");
String nimi = lukija.nextLine();

// ...
Connection connection = DriverManager.getConnection("jdbc:h2:./students", "sa", "");
PreparedStatement stmt = connection.prepareStatement("INSERT INTO Students (name) VALUES ('" + nimi "')");

// ...

ResultSet rs = stmt.executeUpdate();
```

Kun käyttäjän syöttämä merkkijono lisätään suoraan osaksi kyselyä, voi käyttäjä yrittää syöttää muitakin SQL-lauseita komentoonsa. Yllä oleva esimerkki toimii joissakin tietokannanhallintajärjestelmissä -- joissakin tietokannanhallintajärjestelmissä taas tulee lisätä erillisiä parametreja yhteyden muodostamiseen.

Esimerkiksi `MySQL`-tietokannanhallintajärjestelmä sallii oletuksena vain yhden SQL-kyselyn suorittamisen yhdessä `executeUpdate`-kutsussa. Mikäli yllä olevan esimerkin haluaa toimimaan sielläkin, tulee yhteyden muodostamiseen lisätä vielä erillinen parametri `allowMultiQueries=true`, joka antaa luvan useamman kyselyn suorittamiseen.

```java
Scanner lukija = new Scanner(System.in);
System.out.println("Minkä niminen opiskelija lisätään?");
String nimi = lukija.nextLine();

// ...
Connection connection = DriverManager.getConnection("jdbc:mysql:tietokannan_osoite?allowMultiQueries=true", "sa", "");
PreparedStatement stmt = connection.prepareStatement("INSERT INTO Students (name) VALUES ('" + nimi "')");

// ...

ResultSet rs = stmt.executeUpdate();
```

Tietokantataulujen poistamisen lisäksi SQL-injektiot mahdollistavat kaikenlaisia muita ongelmia. Mikäli tietokantaa käyttävä verkkosivu ei tarkasta tietokannasta haettavaa tietoa ennen sen näyttämistä käyttäjälle, voi tietokantaan syötetty virheellinen tieto mahdollistaa esimerkiksi tietojen kalasteluun käytettävät hyökkäykset (näytetään esimerkiksi käyttäjätunnus-salasana -kenttä, jonka tiedot lähetetäänkin jollekin toiselle palvelimelle).

Yksinkertaisempia hyökkäyksiä ovat esimerkiksi ylimääräisten tietojen hakemiset -- mikäli kyselyyn saa syötetty vaikkapa merkkijono `OR 1=1`, näytetään tietokannasta paljon enemmän tietoja kuin alunperin on tarkoitettu. Esimerkiksi kysely


```sql
SELECT * FROM Students WHERE name = 'Rob' OR 1=1;
```

Näyttäisi kaikkien opiskelijoiden tiedot, sillä tarkastus `1=1` on aina totta.



<programming-exercise name='SQL-injektio' tmcname='osa06-Osa06_01.LuokkakaaviostaLuokiksi'>

Tehtäväpohjassa on sovellus, joka mahdollistaa huonekalujen lisäämisen, listaamisen ja poistamisen. Muokkaa sovellusta siten, että huonekalujen poistamisessa on SQL-injektiomahdollisuus. Tällä hetkellä huonekalun, jonka id on 3, poistaminen onnistuu POST-pyynnöllä sovelluksen polkuun `/delete/3`. SQL-injektion tulee muuntaa tilannetta siten, että esimerkiksi pyyntö osoitteeseen ``/delete/3%20OR%2042=42` poistaakin kaikki tietokannan rivit. Edellisessä esimerkissä `%20` on osoitteissa käytettävä välilyönnin merkki.

</programming-exercise>

