---
path: '/osa-7/1-data-access-object'
title: 'Data Access Object -suunnittelumalli'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet Data Access Object (DAO) -suunnittelumallin.
- n + 1 -ongelma?
</text-box>

##
  DAO-suunnittelumalli
<% end %>


  Tähän astisissa simerkeissä tietokantakyselytoiminnallisuus ja muu toiminnallisuudesta on ollut samassa luokassa, mikä johtaa helposti sekavaan koodiin.



  Tietokantasovelluksia toteuttaessa on hyvin tyypillistä abstrahoida konkreettinen tiedon hakemis- ja tallennustoiminnallisuus siten, että ohjelmoijan ei tarvitse nähdä sitä jatkuvasti.


<% partial 'partials/hint', locals: { name: 'Data Access Object (DAO)' } do %>


    Wikipedia:
    *
      In computer software, a data access object (DAO) is an object that provides an abstract interface to some type of database or other persistence mechanism. By mapping application calls to the persistence layer, DAO provide some specific data operations without exposing details of the database. This isolation supports the Single responsibility principle. It separates what data accesses the application needs, in terms of domain-specific objects and data types (the public interface of the DAO), from how these needs can be satisfied with a specific DBMS, database schema, etc. (the implementation of the DAO).
    *



    *
      Although this design pattern is equally applicable to the following: (1- most programming languages; 2- most types of software with persistence needs; and 3- most types of databases) it is traditionally associated with Java EE applications and with relational databases (accessed via the JDBC API because of its origin in Sun Microsystems' best practice guidelines "Core J2EE Patterns" for that platform).
    *

<% end %>


  Hahmotellaan hakemiseen ja poistamiseen liittyvää rajapintaa, joka tarjoaa metodit `findOne`, `findAll`, `saveOrUpdate` ja `delete`, eli toiminnallisuudet hakemiseen, tallentamiseen ja poistamiseen. Tehdään rajapinnasta *geneerinen*, eli toteuttava luokka määrittelee palautettavien olioiden tyypin sekä avaimen.


```java
import java.sql.*;
import java.util.*;

public interface Dao&lt;T, K&gt; {
    T findOne(K key) throws SQLException;
    List&lt;T&gt; findAll() throws SQLException;
    T saveOrUpdate(T object) throws SQLException;
    void delete(K key) throws SQLException;
}
<% end %>


  Metodi findOne hakee tietyllä avaimella haettavan olion, jonka tyyppi voi olla mikä tahansa, ja metodi saveOrUpdate joko tallentaa olion tai päivittää tietokannassa olevaa oliota riippuen siitä, onko olion id-kentässä arvoa. Alustava hahmotelma konkreettisesta asiakkaiden käsittelyyn tarkoitetusta `AsiakasDao`-luokasta on seuraavanlainen.


```java
import java.util.*;
import java.sql.*;

public class AsiakasDao implements Dao&lt;Asiakas, Integer&gt; {

    @Override
    public Asiakas findOne(Integer key) throws SQLException {
        // ei toteutettu
        return null;
    }

    @Override
    public List&lt;Asiakas&gt; findAll() throws SQLException {
	// ei toteutettu
	return null;
    }

    @Override
    public Asiakas saveOrUpdate(Asiakas object) throws SQLException {
        // ei toteutettu
        return null;
    }

    @Override
    public void delete(Integer key) throws SQLException {
        // ei toteutettu
    }
}
<% end %>


  Käytännössä tyyppiparametrit annetaan rajapinnan toteuttamisesta kertovan avainsanan `implements`-yhteyteen. Ylläolevassa esimerkissä haettavan olion tyyppi on `Asiakas`, ja sen pääavain on tyyppiä `Integer`.



  Luodaan tietokanta-abstraktio, jolta voidaan pyytää tietokantayhteyttä tarvittaessa.


```java
  import java.sql.*;

  public class Database {

      private String databaseAddress;

      public Database(String databaseAddress) throws ClassNotFoundException {
          this.databaseAddress = databaseAddress;
      }

      public Connection getConnection() throws SQLException {
          return DriverManager.getConnection(databaseAddress);
      }
  }
<% end %>


  Jatketaan luokan `AsiakasDao` toteuttamista. Lisätään luokkaan tietokannan käyttö tietokanta-abstraktion avulla sekä asiakkaan poistaminen avaimen perusteella


```java
import java.util.*;
import java.sql.*;

public class AsiakasDao implements Dao&lt;Asiakas, Integer&gt; {

    private Database database;

    public AsiakasDao(Database database) {
        this.database = database;
    }

    @Override
    public Asiakas findOne(Integer key) throws SQLException {
        // ei toteutettu
        return null;
    }

    @Override
    public List&lt;Asiakas&gt; findAll() throws SQLException {
	// ei toteutettu
	return null;
    }

    @Override
    public Asiakas saveOrUpdate(Asiakas object) throws SQLException {
        // ei toteutettu
        return null;
    }

    @Override
    public void delete(Integer key) throws SQLException {
        Connection conn = database.getConnection();
        PreparedStatement stmt = conn.prepareStatement("DELETE FROM Asiakas WHERE id = ?");

        stmt.setInt(1, key);
        stmt.executeUpdate();

        stmt.close();
        conn.close();
    }
}
<% end %>


  Vastaavasti yksittäisen asiakkaan noutaminen onnistuisi findOne-metodilla.


```java
import java.util.*;
import java.sql.*;

public class AsiakasDao implements Dao&lt;Asiakas, Integer&gt; {

    private Database database;

    public AsiakasDao(Database database) {
        this.database = database;
    }

    @Override
    public Asiakas findOne(Integer key) throws SQLException {
        Connection conn = database.getConnection();
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Asiakas WHERE id = ?");
        stmt.setInt(1, key);

        ResultSet rs = stmt.executeQuery();
        boolean hasOne = rs.next();
        if (!hasOne) {
            return null;
        }

        Asiakas a = new Asiakas(rs.getInt("id"), rs.getString("nimi"),
            rs.getString("puhelinnumero"), rs.getString("katuosoite"),
            rs.getInt("postinumero"), rs.getString("postitoimipaikka"));

        stmt.close();
        rs.close();

        conn.close();

        return a;
    }

    @Override
    public List&lt;Asiakas&gt; findAll() throws SQLException {
	// ei toteutettu
	return null;
    }

    @Override
    public Asiakas saveOrUpdate(Asiakas object) throws SQLException {
        // ei toteutettu
        return null;
    }

    @Override
    public void delete(Integer key) throws SQLException {
        Collection conn = database.getConnection();
        PreparedStatement stmt = conn.prepareStatement("DELETE FROM Asiakas WHERE id = ?");

        stmt.setInt(1, key);
        stmt.executeUpdate();

        stmt.close();
        conn.close();
    }
}
<% end %>


  Ja niin edelleen. Nyt asiakkaiden muokkaaminen on DAO-rajapintaa käyttävän ohjelman näkökulmasta hieman helpompaa.


```java
  Database database = new Database("jdbc:sqlite:kanta.db");
  AsiakasDao asiakkaat = new AsiakasDao(database);

  Scanner lukija = new Scanner(System.in);

  System.out.println("Millä tunnuksella asiakasta haetaan?");
  int tunnus = Integer.parseInt(lukija.nextLine());

  Asiakas a = asiakkaat.findOne(tunnus);

  System.out.println("Asiakas: " + a);
<% end %>



##
  Viitteet olioiden välillä
<% end %>


  Edellisessä esimerkissä käsittelimme yksittäistä oliota, josta ei ole viitteitä muihin käsitteisiin. Hahmotellaan seuraavaksi Tilaus-käsitteen käsittelyä ohjelmallisesti. Luodaan ensin Tilausta kuvaava luokka ja toteutetaan tämän jälkeen tilausten tallennuksesta ja käsittelystä vastaava DAO-luokka.



```java
  public class Tilaus {
      Integer id;
      Asiakas asiakas;
      Date aika;
      String kuljetustapa;
      Boolean vastaanotettu;
      Boolean toimitettu;

      // konstruktorit sekä getterit ja setterit

  }
<% end %>


  Toteutetaan tilausten käsittelyyn tarkoitettu DAO-luokka siten, että se saa konstruktorissaan sekä viitteen tietokanta-olioon että viitteen asiakkaiden hakemiseen tarkoitettuun Dao-rajapintaan.


```java
import java.util.*;
import java.sql.*;

public class TilausDao implements Dao&lt;Tilaus, Integer&gt; {


    private Database database;
    private Dao&lt;Asiakas, Integer&gt; asiakasDao;

    public TilausDao(Database database, Dao&lt;Asiakas, Integer&gt; asiakasDao) {
        this.database = database;
        this.asiakasDao = asiakasDao;
    }

    @Override
    public Tilaus findOne(Integer key) throws SQLException {
        Connection connection = database.getConnection();
        PreparedStatement stmt = connection.prepareStatement("SELECT * FROM Tilaus WHERE id = ?");
        stmt.setObject(1, key);

        ResultSet rs = stmt.executeQuery();
        boolean hasOne = rs.next();
        if (!hasOne) {
            return null;
        }

        Asiakas asiakas = asiakasDao.findOne(rs.getInt("asiakas_id"));

        Tilaus t = new Tilaus(key, asiakas,
            rs.getDate("aika"), rs.getString("kuljetustapa"),
            rs.getBoolean("vastaanotettu"), rs.getBoolean("toimitettu"));


        rs.close();
        stmt.close();
        connection.close();

        return t;
    }

    @Override
    public List&lt;Tilaus&gt; findAll() throws SQLException {
	// ei toteutettu
	return null;
    }


    @Override
    public Tilaus saveOrUpdate(Tilaus object) throws SQLException {
	// ei toteutettu
	return null;
    }

    @Override
    public void delete(Integer key) throws SQLException {
        // ei toteutettu
    }
}
<% end %>


  Nyt yksittäisen tilauksen hakemisen yhteydessä palautetaan sekä tilaus, että siihen liittyvä asiakas. Rajapintaa käyttävän toteutuksen näkökulmasta tietokannan käyttäminen toimii seuraavasti:



```java
Database database = new Database("jdbc:sqlite:kanta.db");
AsiakasDao asiakkaat = new AsiakasDao(database);
TilausDao tilaukset = new TilausDao(database, asiakkaat);

Tilaus t = tilaukset.findOne(4);
System.out.println("Tilauksen teki: " + t.getAsiakas().getNimi());
<% end %>



<% partial 'partials/hint', locals: { name: 'Mitä tietokannasta pitäisi noutaa?' } do %>


    Kun jatkamme edellistä esimerkkiä, pitäisikö annosta haettaessa hakea aina siihen liittyvä ravintola? Entä pitääkö tilausta haettaessa oikeasti hakea myös tilaukseen liittyvä asiakas?



    Hyvä kysymys. Kun tietokantataulujen välisten yhteyksien perusteella tehdään uusia kyselyitä tietokantaan, olemassa on oleellisesti kaksi vaihtoehtoa sekä niiden seuraukset: (1) haetaan liikaa tietoa, jolloin hakemisoperaatioon menee turhaan aikaa, tai (2) haetaan liian vähän tietoa, jolloin tieto tulee hakea myöhemmin.



    Yksi tapa ratkaista ongelma on toimia siten, että tietoa haetaan vain silloin kun sitä tarvitaan. Tällöin esimerkiksi vasta Tilaus-olioon mahdollisesti liittyvää `getAsiakas`-metodia kutsuttaessa asiakkaaseen liittyvät tiedot haettaisiin tietokannasta -- getAsiakas-metodi tekisi siis tietokantahaun. Tämäkään ei kuitenkaan ratkaise tilannetta, sillä jos tavoitteenamme olisi vaikkapa tulostaa kaikki tilaukset ja niihin liittyvät asiakkaat -- edellisellä lähestymistavalla kaksi tietokantakyselyä -- saattaisi toteutus lopulta tehdä jokaisen tilauksen ja asiakkaan kohdalla oman erillisen tietokantahaun.



    Tähän ei ole suoraviivaista ratkaisua. Tyypillisesti Dao-rajapinnan määrittelemille metodeille kerrotaan, tuleeko haettaviin olioihin liittyvät viitteet hakea erikseen.


<% end %>



###
  Toisteisuuden vähentäminen samankaltaisista domain-luokista
<% end %>


  Tarkastellaan ensin kategoriaa kuvaavan luokan luomista. Sekä kategorialla, tehtävällä että käyttäjällä on tunnus ja nimi. Luodaan abstrakti yliluokka `AbstractNamedObject`, joka sisältää nimen ja tunnuksen sekä niihin liittyvät getterit.


```java
  package tikape.tasks.domain;

  public abstract class AbstractNamedObject {

      private Integer id;
      private String name;

      public AbstractNamedObject(Integer id, String name) {
          this.id = id;
          this.name = name;
      }

      public Integer getId() {
          return id;
      }

      public String getName() {
          return name;
      }
  }
<% end %>


  Nyt luokat kategoria, tehtävä ja käyttäjä voi toteuttaa perimällä luokan AbstractNamedObject. Alla kategoriaa kuvaava luokka.


```java
  package tikape.tasks.domain;

  public class Category extends AbstractNamedObject {

      public Category(Integer id, String name) {
          super(id, name);
      }
  }
<% end %>


  Käyttäjien ja tehtävien kuvaamiseen käytettävät luokat muutetaan vastaavaan muotoon.



###
  Toisteisuuden vähentäminen samankaltaisista DAO-luokista
<% end %>


  Toteutetaan seuraavaksi kategorioiden käsittelyyn tarvittava tietokanta-abstraktio `CategoryDao`. Tämäkin luokka olisi vahvasti copy-pastea edellisistä luokista.



  Toteutetaan ensin luokka `AbstractNamedObjectDao`, joka toteuttaa rajapinnan Dao. Luokka kapseloi niiden tietokantataulujen käsittelyyn liittyvää toiminnallisuutta, joissa on id ja nimi. Toteutus tehdään niin, että abstrakti luokka saa konstruktorin parametrina tietokannan lisäksi käsiteltävän tietokantataulun nimen, jota voi käyttää kyselyiden muodostamisessa.


```java
  protected Database database;
  protected String tableName;

  public AbstractNamedObjectDao(Database database, String tableName) {
      this.database = database;
      this.tableName = tableName;
  }
<% end %>


  Tehdään luokasta sellainen, että sen voi toteuttaa vain niille luokille, jotka perivät luokan `AbstractNamedObject`. Luokan "otsake" on tällöin seuraavaa muotoa:


```java
  public abstract class AbstractNamedObjectDao&lt;T extends AbstractNamedObject&gt;
          implements Dao&lt;T, Integer&gt; {
<% end %>


  Luokka käsittelee geneeristä tyyppiä olevia olioita, joilla on id ja nimi. Tarvitsemme tavan olioiden luomiseen tietokannalta saaduista riveistä. Luodaan abstraktille luokalle abstrakti metodi `createFromRow`, joka palauttaa geneeristä tyyppiä olevan olion, ja joka saa parametrinaan resultSet-olion. Jokaisen luokan, joka perii luokan `AbstractNamedObject` tulee periä ja toteuttaa tämä metodi.


```java
  public abstract T createFromRow(ResultSet resultSet) throws SQLException;
<% end %>


  Voimme nyt tehdä muista luokan metodeista yleiskäyttöisiä. Metodi findAll kysyy tietoa tietokantataulusta, jonka perivä luokka määrittelee. Kun tietokantakyselyn tuloksia käydään läpi, konkreettisten tulosten luomiseen käytetään luokkakohtaista metodia `createFromRow`. Metodin `findAll` rakenne on seuraavanlainen.


```java
  @Override
  public List&lt;T&gt; findAll() throws SQLException {
      List&lt;T&gt; tasks = new ArrayList&lt;&gt;();

      try (Connection conn = database.getConnection();
          ResultSet result = conn.prepareStatement("SELECT id, name FROM " + tableName).executeQuery()) {

          while (result.next()) {
              tasks.add(createFromRow(result));
          }
      }

      return tasks;
  }
<% end %>


  Koko luokan AbstractNamedObjectDao toteutus on seuraava.


```java
  package tikape.tasks.dao;

  import java.sql.Connection;
  import java.sql.PreparedStatement;
  import java.sql.ResultSet;
  import java.sql.SQLException;
  import java.util.ArrayList;
  import java.util.List;
  import tikape.tasks.database.Database;
  import tikape.tasks.domain.AbstractNamedObject;

  public abstract class AbstractNamedObjectDao&lt;T extends AbstractNamedObject&gt;
          implements Dao&lt;T, Integer&gt; {

      protected Database database;
      protected String tableName;

      public AbstractNamedObjectDao(Database database, String tableName) {
          this.database = database;
          this.tableName = tableName;
      }

      @Override
      public T findOne(Integer key) throws SQLException {
          try (Connection conn = database.getConnection()) {
              PreparedStatement stmt = conn.prepareStatement("SELECT id, name FROM " + tableName + " WHERE id = ?");
              stmt.setInt(1, key);

              try (ResultSet rs = stmt.executeQuery()) {
                  rs.next();
                  return createFromRow(rs);
              }

          } catch (SQLException e) {
              System.err.println("Error when looking for a row in " + tableName + " with id " + key);
              e.printStackTrace();
              return null;
          }
      }

      @Override
      public List&lt;T&gt; findAll() throws SQLException {
          List&lt;T&gt; tasks = new ArrayList&lt;&gt;();

          try (Connection conn = database.getConnection();
              ResultSet result = conn.prepareStatement("SELECT id, name FROM " + tableName).executeQuery()) {

              while (result.next()) {
                  tasks.add(createFromRow(result));
              }
          }

          return tasks;
      }

      @Override
      public T saveOrUpdate(T object) throws SQLException {
          // simply support saving -- disallow saving if task with
          // same name exists
          T byName = findByName(object.getName());

          if (byName != null) {
              return byName;
          }

          try (Connection conn = database.getConnection()) {
              PreparedStatement stmt = conn.prepareStatement("INSERT INTO " + tableName + " (name) VALUES (?)");
              stmt.setString(1, object.getName());
              stmt.executeUpdate();
          }

          return findByName(object.getName());
      }

      private T findByName(String name) throws SQLException {
          try (Connection conn = database.getConnection()) {
              PreparedStatement stmt = conn.prepareStatement("SELECT id, name FROM " + tableName + " WHERE name = ?");
              stmt.setString(1, name);

              try (ResultSet result = stmt.executeQuery()) {
                  if (!result.next()) {
                      return null;
                  }

                  return createFromRow(result);
              }
          }
      }

      @Override
      public void delete(Integer key) throws SQLException {
          throw new UnsupportedOperationException("Not supported yet.");
      }

      public abstract T createFromRow(ResultSet resultSet) throws SQLException;
  }
<% end %>


  Nyt omien Dao-luokkiemme toteutukset ovat hieman suoraviivaisempia. Alla on kuvattuna luokka liittyvä tietokanta-abstraktio `CategoryDao`.


```java
  package tikape.tasks.dao;

  import java.sql.ResultSet;
  import java.sql.SQLException;
  import tikape.tasks.database.Database;
  import tikape.tasks.domain.Category;

  public class CategoryDao extends AbstractNamedObjectDao&lt;Category&gt; {

      public CategoryDao(Database database, String tableName) {
          super(database, tableName);
      }

      @Override
      public Category createFromRow(ResultSet resultSet) throws SQLException {
          return new Category(resultSet.getInt("id"), resultSet.getString("name"));
      }
  }
<% end %>


  Esimerkin jatkaminen jätetään omalle vastuulle. Seuraavana olisi näkymän kopiointi sekä TaskApplication-luokan muokkaaminen siten, että sovelluksessa pääsee käsiksi kategorioihin.




## esim: välimuisti daon avulla?

##
  Välimuistit sovelluksissa
<% end %>


  Kun tietokantaa käytetään osana annettua sovellusta (esimerkiksi web-sovellusta), sovelluksen vastuulla on tietokantakyselyiden tekeminen tietokannanhallintajärjestelmään. Jos sovellus on ainoa tietokannan käyttäjä (tietokantaa ei muokata muista järjestelmistä), ja jos merkittävä osa kyselyistä on toistuvia hakukyselyjä, voi sovellukseen rakentaa tietokannan toimintaa abstrahoiva välimuisti.



  Välimuistissa on käytännössä kyse käsiteltävän tiedon tuomisesta lähemmäksi käyttäjää. Tietokantaa käyttävien sovellusten tapauksessa usein haettava tieto tuodaan sovelluksen muistiin, jolloin sovelluksen ei tarvitse hakea tietoa erikseen tietokannasta. Välimuisti tyhjennetään aina tietokannan päivityksen yhteydessä, jolloin käyttäjälle päätyvä tieto on aina ajan tasalla.



  Yksinkertaisimmillaan välimuistitoteutus voi olla olemassaolevan Dao-toteutuksen kapselointi erilliseen Dao-toteutukseen. Oletetaan, että käytössämme on kolmannelta viikolta tuttu vaillinainen AsiakasDao-toteutus. Välimuistillisen toteutuksen luominen on melko suoraviivaista -- alla toteutuksessa muistetaan vain yksittäiset asiakkaat.




```java
  import java.util.*;
  import java.sql.*;

  public class CachedAsiakasDao extends AsiakasDao implements Dao&lt;Asiakas, Integer&gt; {

      private HashMap&lt;Integer, Asiakas&gt; asiakkaatAvaimilla;

      public CachedAsiakasDao(Database database) {
          super(database);
          this.asiakkaatAvaimilla = new HashMap&lt;&gt;();
      }

      @Override
      public Asiakas findOne(Integer key) throws SQLException {
          if (!asiakkaatAvaimilla.containsKey(key)) {
              Asiakas asiakas = super.findOne(key);
              asiakkaatAvaimilla.put(key, asiakas);
          }

          return asiakkaatAvaimilla.get(key);
      }

      @Override
      public Asiakas saveOrUpdate(Asiakas object) throws SQLException {
          Asiakas asiakas = super.saveOrUpdate(object);
          asiakkaatAvaimilla.put(asiakas.getId(), asiakas);
          return asiakas;
      }

      @Override
      public void delete(Integer key) throws SQLException {
          this.asiakkaatAvaimilla.removeKey(key);
          return super.delete(key);
      }
  }
<% end %>


  Jos asiakkaiden tietohin liittyvistä tietokantakyselyistä 99% on hakuoperaatioita, on merkittävässä osassa tapauksia tieto valmiiksi sovelluksen käytössä, jolloin tietokantaan ei tarvitse ottaa yhteyttä. Toisaalta, jos sovellus on sellainen, että merkittävä osa käsittelystä sisältää myös tietokannassa olevan tiedon muokkausoperaatioita, ei edellä kuvatusta välimuistista ole juurikaan hyötyä.







