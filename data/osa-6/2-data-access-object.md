---
path: '/osa-6/2-data-access-object'
title: 'Data Access Object -suunnittelumalli'
hidden: false
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet Data Access Object (DAO) -suunnittelumallin.
- Osaat käyttää Data Access Object (DAO) -suunnittelumallia osana omia ohjelmiasi.
- Tiedät joitakin muita käyttötapauksia DAO -suunnttelumallille.

</text-box>


Esimerkkiemme sovelluslogiikka ja tietokantalogiikka on toistaiseksi ollut samaan kasaan nivottuna. Tämä käytäntö voi pitkässä juoksussa johtaa hyvin sekavaan koodiin.

Tietokantasovelluksissa tyypillisesti konkreettinen tiedon hakemis- ja tallennustoiminnallisuus abstrahoidaan siten, että ohjelmoijan ei tarvitse nähdä sitä jatkuvasti. Tämä tiedon käsittelyn abstrahointi tunnetaan Data Access Object (DAO) -suunnittelumallina.


<text-box variant='learningObjectives' name='Data Access Object (DAO)'>

Wikipedia: *In computer software, a data access object (DAO) is an object that provides an abstract interface to some type of database or other persistence mechanism. By mapping application calls to the persistence layer, DAO provide some specific data operations without exposing details of the database. This isolation supports the Single responsibility principle. It separates what data accesses the application needs, in terms of domain-specific objects and data types (the public interface of the DAO), from how these needs can be satisfied with a specific DBMS, database schema, etc. (the implementation of the DAO).*

*Although this design pattern is equally applicable to the following: (1- most programming languages; 2- most types of software with persistence needs; and 3- most types of databases) it is traditionally associated with Java EE applications and with relational databases (accessed via the JDBC API because of its origin in Sun Microsystems' best practice guidelines "Core J2EE Patterns" for that platform).*

</text-box>


## Yleiskäyttöinen DAO-rajapinta

Hahmotellaan tietokantaan tehtäviä kyselyitä abstrahoivaa rajapintaa. Rajapinta tarjoaa metodit `create`, `read`, `update`, `delete` ja `list`, eli toiminnallisuudet tallentamiseen, lukemiseen, päivittämiseen, poistamiseen ja listaamiseen. Tehdään rajapinnasta *geneerinen*, eli rajapinnan toteutuksen yhteydessä tulee määritellä palautettavien olioiden tyyppi sekä pääavaimen tyyppi.


```java
import java.sql.*;
import java.util.*;

public interface Dao<T, K> {
    void create(T object) throws SQLException;
    T read(K key) throws SQLException;
    T update(T object) throws SQLException;
    void delete(K key) throws SQLException;
    List<T> list() throws SQLException;
}
```

Metodi `create` tallentaa annetun olion tietokantaan, metodi `read` hakee olion tietokannasta parametrina annetulla avaimella, metodi `update` päivittää parametrina annetun olion tiedot tietokantaan (tyypillisesti olettaen, että tietokannasta löytyy parametrina annetun olion avainta vastaava rivi), metodi `delete` poistaa olion annetulla avaimella, ja metodi `list` hakee kaikki oliot tietokannasta.

*Tällaisen rajapinnan toteuttavia tietokannan käsittelyyn käytettäviä luokkia kutsutaan arkikielessä CRUDeiksi.*

Yllä olevassa rajapinnassa tyypit `T` ja `K` ovat Javan geneerisiä tyyppiparametreja, joiden tilalle voidaan asettaa rajapinnan toteuttavassa luokassa mitkä tahansa tyypit.


## Asiakkaiden käsittely DAO-rajapinnan avulla

Luodaan Dao-rajapinnan toteuttava luokka AsiakasDao, jota käytetään asiakkaiden tietojen käsittelyyn. Oletetaan, että käytössämme on edellisestä luvusta tuttu luokka `Asiakas` sekä asiakasta kuvaava tietokantataulu `Asiakas`.

```java
public class Asiakas {
    Integer id;
    String nimi;
    String puhelinnumero;
    String katuosoite;
    Integer postinumero;
    String postitoimipaikka;


    // konstruktorit ja metodit
}
```

```sql
CREATE TABLE Asiakas (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nimi VARCHAR(200),
    puhelinnumero VARCHAR(20),
    katuosoite VARCHAR(50),
    postinumero INTEGER,
    postitoimipaikka VARCHAR(20)
);
```

Asiakkaan pääavain on `Integer`-tyyppinen ja luokan tyyppi on `Asiakas`. Toteutetaan rajapinta luokkaamme `AsiakasDao`.

```java
public class AsiakasDao implements Dao<Asiakas, Integer> {
    // ...
```

Kuten yllä nähdään, tyyppiparametrit annetaan rajapinnan toteuttamisesta kertovan avainsanan `implements`-yhteyteen. Ylläolevassa esimerkissä haettavan olion tyyppi on `Asiakas` ja sen pääavaimen tyyppi on `Integer`.

Kun toteutamme rajapinnan, Java vaatii, että metodeihin on määritelty oikeat parametrit ja paluutyypit. Alustava hahmotelma konkreettisesta asiakkaiden käsittelyyn tarkoitetusta `AsiakasDao`-luokasta on seuraavanlainen.

```java
import java.util.*;
import java.sql.*;

public class AsiakasDao implements Dao<Asiakas, Integer> {

    @Override
    public void create(Asiakas object) throws SQLException {
        // ei toteutettu
    }

    @Override
    public Asiakas read(Integer key) throws SQLException {
        // ei toteutettu
        return null;
    }

    @Override
    public Asiakas update(Asiakas object) throws SQLException {
        // ei toteutettu
        return null;
    }

    @Override
    public void delete(Integer key) throws SQLException {
        // ei toteutettu
    }

    @Override
    public List<Asiakas> list() throws SQLException {
	      // ei toteutettu
	      return null;
    }
}
```

Luokan pohja on olemassa. Aloitetaan seuraavaksi tietokantakyselyiden tekemiseen tarvittavan toiminnallisuuden toteutus.

Toteutetaan ensin metodit `create` ja `read`.

```java
import java.util.*;
import java.sql.*;

public class AsiakasDao implements Dao<Asiakas, Integer> {

    @Override
    public void create(Asiakas asiakas) throws SQLException {
        Connection connection = DriverManager.getConnection("jdbc:h2:./asiakkaat", "sa", "");

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
        connection.close();
    }

    @Override
    public Asiakas read(Integer key) throws SQLException {
        Connection connection = DriverManager.getConnection("jdbc:h2:./asiakkaat", "sa", "");

        PreparedStatement stmt = connection.prepareStatement("SELECT * FROM Asiakas WHERE id = ?");
        stmt.setInteger(1, key);
        ResultSet rs = stmt.executeQuery();

        // Mikäli tulostaulussa ei ole yhtäkään riviä,
        // palautetaan null-viite
        if(!rs.next()) {
            return null;
        }

        // Edellä siirryttiin ensimmäiselle tulostaulun
        // riville -- luodaan asiakas
        Asiakas a = new Asiakas(rs.getInt("id"), rs.getString("nimi"),
            rs.getString("puhelinnumero"), rs.getString("katuosoite"),
            rs.getInt("postinumero"), rs.getString("postitoimipaikka"));

        stmt.close();
        rs.close();
        connection.close();

        return a;
    }

    @Override
    public Asiakas update(Asiakas object) throws SQLException {
        // ei toteutettu
        return null;
    }

    @Override
    public void delete(Integer key) throws SQLException {
        // ei toteutettu
    }

    @Override
    public List<Asiakas> list() throws SQLException {
	      // ei toteutettu
	      return null;
    }
}
```

`AsiakasDao`-luokan Käyttöönotto on suoraviivaista.

```java
Scanner lukija = new Scanner(System.in);
AsiakasDao dao = new AsiakasDao();

System.out.println("Mikä id haetaan?");
int id = Integer.valueOf(lukija.nextLine());
Asiakas asiakas = dao.read(id);
if (asiakas == null) {
    System.out.println("Ei löytynyt!");
} else {
    System.out.println("Löytyi! " + asiakas.getNimi());
}
```

Edellä esitetty lähestymistapa luo melko paljon "boilerplate" -koodia, sillä yhteyden muodostaminen ym. esiintyy jokaisessa `Dao`-luokan metodissa. Tätä voisi keventää pilkkomalla ohjelmaa pienempiin osiin siten, että yhden osan vastuulla olisi tietokantayhteyden muodostaminen, ja toisen osan vastuulla tietokantayhteyden läpikäynti ym.


## Asiakkaiden käsittely DAO-rajapinnan avulla, osa 2

Tarkastellaan samaa Spring-sovelluskehyksen kanssa. Oletetaan, että käytössämme on aiemmin kuvattu luokka `Asiakas` ja rajapinta `Dao<T, K>`. Luodaan luokka `AsiakasDao`, joka toteuttaa rajapinnan `Dao<Asiakas, Integer>`.

```java
// importit

@Component
public class AsiakasDao implements Dao<Asiakas, Integer> {
    // toteutus
}
```

Toteutus on tähän mennessä lähes samanlainen edellisen toteutuksemme kanssa. Luokalle tulee kuitenkin määritellä annotaatio `@Component`, joka kertoo Spring-sovelluskehykselle, että Spring-sovelluskehyksen tulee hallinnoida luokan luomista ja käyttöä. Tämä tarkoittaa sitä, että mikäli luokkaan `AsiakasDao` määritellään `@Autowired`-annotaatiolla olioita, lisää Spring niihin oikeat oliot automaattisesti. Vastaavasti, mikäli `AsiakasDao`-oliota halutaan käyttää jossain toisessa luokassa, osaa Spring tuoda `AsiakasDao`-olion sinne käyttöön -- olettaen, että olio määritellään `@Autowired`-annotaatiolla.


<text-box variant='hint' name='Mitä nämä annotaatiot oikein ovat?'>

Annotaatiot ovat Spring-sovelluskehyksen tapa merkitä hallinnoitavia luokkia, tuoda niitä ohjelman käyttöön, sekä laajemmin määritellä sovelluksen asetuksia.

Spring-sovelluskehyksen annotaatioiden tarkempaan merkitykseen tutustutaan mm. kurssilla "Web-palvelinohjelmointi Java".

</text-box>


Tuodaan seuraavaksi luokkaan `AsiakasDao` `JdbcTemplate`-olio, jota käytetään kyselyiden tekemiseen.


```java
// importit

@Component
public class AsiakasDao implements Dao<Asiakas, Integer> {

    @Autowired
    JdbcTemplate jdbcTemplate;

    // toteutus
}
```

Ja lisätään luokkaan rajapinnan vaatimat metodit.

```java
// importit

@Component
public class AsiakasDao implements Dao<Asiakas, Integer> {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void create(Asiakas object) throws SQLException {
        // ei toteutettu
    }

    @Override
    public Asiakas read(Integer key) throws SQLException {
        // ei toteutettu
        return null;
    }

    @Override
    public Asiakas update(Asiakas object) throws SQLException {
        // ei toteutettu
        return null;
    }

    @Override
    public void delete(Integer key) throws SQLException {
        // ei toteutettu
    }

    @Override
    public List<Asiakas> list() throws SQLException {
	      // ei toteutettu
	      return null;
    }
}
```

Toteutetaan taas metodit `create` ja `read`.


```java
// importit

@Component
public class AsiakasDao implements Dao<Asiakas, Integer> {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void create(Asiakas asiakas) throws SQLException {
        jdbcTemplate.update("INSERT INTO Asiakas"
            + " (nimi, puhelinnumero, katuosoite, postinumero, postitoimipaikka)"
            + " VALUES (?, ?, ?, ?, ?)"
            , asiakas.getNimi(), asiakas.getPuhelinnumero(),
            asiakas.getKatuosoite(), asiakas.getPostinumero(),
            asiakas.getPostitoimipaikka());
    }

    @Override
    public Asiakas read(Integer key) throws SQLException {
        List<Asiakas> asiakkaat = jdbcTemplate.query(
            "SELECT * FROM Asiakas WHERE id = ?",
            (rs, rowNum) -> new Asiakas(rs.getInt("id"), rs.getString("nimi"),
            rs.getString("puhelinnumero"), rs.getString("katuosoite"),
            rs.getInt("postinumero"), rs.getString("postitoimipaikka")),
            key);

        if(asiakkaat.isEmpty()) {
            return null;
        }

        return asiakkaat.get(0);
    }

    @Override
    public Asiakas update(Asiakas object) throws SQLException {
        // ei toteutettu
        return null;
    }

    @Override
    public void delete(Integer key) throws SQLException {
        // ei toteutettu
    }

    @Override
    public List<Asiakas> list() throws SQLException {
	      // ei toteutettu
	      return null;
    }
}
```

Yllä olevassa `read`-esimerkissä luetaan asiakkaat listalle. Todellisuudessa asiakkaita on korkeintaan yksi.

Spring tarjoaa joissain tapauksissa näppäriä apuvälineitä olioiden muutokseen muodosta toiseen. Esimerkiksi yllä kuvatun `read`-metodin voi toteuttaa myös seuraavalla tavalla.

```java
@Override
public Asiakas read(Integer key) throws SQLException {
    Asiakas asiakas = jdbcTemplate.queryForObject(
            "SELECT * FROM Asiakas WHERE id = ?",
            new BeanPropertyRowMapper<>(Asiakas.class),
            key);

    return asiakas;
}
```

Tässä käytännössä annetaan Spring-sovelluskehykselle ja tarkemmin sen tarjoamalle `BeanPropertyRowMapper`-oliolle vastuu `Asiakas`-olion luomisesta. Tämä vaatii sen, että käsiteltävällä luokalla -- tässä `Asiakas` -- on parametriton konstruktori sekä getterit ja setterit.
Tässä on kuitenkin huomioitava, mikäli kysely ei palauta yhtään riviä tulee queryForObject-metodi heittämään EmptyResultDataAccessException-poikkeuksen. Jos taas kysely palauttaa enemmän kuin yhden rivin tulee metodi heittämään IncorrectResultSizeDataAccessException-poikkeuksen.

<programming-exercise name='AsiakasDaon Täydennys' tmcname='osa06-Osa06_03.AsiakasDaonTaydennys'>

Tehtäväpohjassa on yllä olevassa materiaalissa kuvattu luokka `AsiakasDao`. Täydennä luokkaan metodit `update`, `delete` ja `list`.

Metodien tulee toimia seuraavasti:

- Metodi `update` päivittää parametrina annetun olion tiedot tietokantaan siten, että kaikki kyseiseen olioon liittyvät tietokannan sarakkeet (paitsi pääavain) päivitetään. Päivitettänä rivi tunnistetaan parametrina annetun olion `id`-kentän perusteella.

- Metodi `delete` poistaa tietokannasta rivin, jonka `id`-sarakkeen arvo on parametrina annettu arvo.

- Metodi `list` palauttaa tietokantataulun rivit listana `Asiakas`-olioita.

Tehtäväpohjassa on valmis tietokanta `asiakkaat`. Voit testata metodien toimintaa esimerkiksi luokassa `AsiakasSovellus`. Tehtävän testit ovat vain palvelimella.

</programming-exercise>


## Avaimen palauttaminen kyselyn vastauksena

Mikäli tietokantataulu on määritelty siten, että tietokantatauluun luodan uuden rivin pääavain automaattisesti, voi lisäysmetodin toteuttaa niin, että se palauttaa uuden rivin pääavaimen. Tällöin `prepareStatement`-metodille tulee antaa kyselyn lisäksi parametrina `Statement`-luokassa määritelty vakio `RETURN_GENERATED_KEYS`.



JDBCn avulla toiminnallisuus on seuraava:

```java
// Oletetaan, että käytössämme on Asiakas-tyyppinen olio
// asiakas
Connection connection = DriverManager.getConnection("jdbc:h2:./asiakkaat", "sa", "");

PreparedStatement stmt = connection.prepareStatement("INSERT INTO Asiakas"
    + " (nimi, puhelinnumero, katuosoite, postinumero, postitoimipaikka)"
    + " VALUES (?, ?, ?, ?, ?)",
    Statement.RETURN_GENERATED_KEYS);
stmt.setString(1, asiakas.getNimi());
stmt.setString(2, asiakas.getPuhelinnumero());
stmt.setString(3, asiakas.getKatuosoite());
stmt.setInt(4, asiakas.getPostinumero());
stmt.setString(5, asiakas.getPostitoimipaikka());

// asiakas lisätään tietokantaan
stmt.executeUpdate();

int id = -1;
ResultSet generatedKeys = stmt.getGeneratedKeys();
// haetaan id vain mikäli tulostaulussa on rivi
if(generatedKeys.next()) {
    id = generatedKeys.getInt(1);
}

generatedKeys.close();
stmt.close();
connection.close();

System.out.println("Juuri luodun asiakkaan id on: " + id);
```

Tämän avulla `create`-metodi voitaisiin toteuttaa esimerkiksi juuri luodun asiakkaan palauttavaksi. Muutos vaatisi luonnollisesti myös  `Dao`-rajapinnan muutoksen siten, että `create` metodi palauttaa juuri tallennetun olion.

```java
@Override
public Asiakas create(Asiakas asiakas) throws SQLException {
    Connection connection = DriverManager.getConnection("jdbc:h2:./asiakkaat", "sa", "");

    PreparedStatement stmt = connection.prepareStatement("INSERT INTO Asiakas"
        + " (nimi, puhelinnumero, katuosoite, postinumero, postitoimipaikka)"
        + " VALUES (?, ?, ?, ?, ?)",
        Statement.RETURN_GENERATED_KEYS);
    stmt.setString(1, asiakas.getNimi());
    stmt.setString(2, asiakas.getPuhelinnumero());
    stmt.setString(3, asiakas.getKatuosoite());
    stmt.setInt(4, asiakas.getPostinumero());
    stmt.setString(5, asiakas.getPostitoimipaikka());

    // asiakas lisätään tietokantaan
    stmt.executeUpdate();

    int id = -1;
    ResultSet generatedKeys = stmt.getGeneratedKeys();
    // haetaan id vain mikäli tulostaulussa on rivi
    if(generatedKeys.next()) {
        id = generatedKeys.getInt(1);
    }

    generatedKeys.close();
    stmt.close();
    connection.close();

    // oletetaan, että avain saatu
    return read(id);
}
```

Vastaaava toiminnallisuus löytyy myös Spring-sovelluskehyksestä. Spring-sovelluskehyksen `JdbcTemplate`-oliota käytettäessä juuri lisätyn rivin pääavaimen hakeminen tapahtuu Spring-sovelluskehyksen tarjoaman `KeyHolder`-luokan avulla. Yllä kuvattu uuden asiakkaan palauttava `create`-metodi toteutettaisiin Spring-sovelluskehyksellä seuraavasti.

```java
@Override
public Asiakas create(Asiakas asiakas) throws SQLException {
    KeyHolder keyHolder = new GeneratedKeyHolder();

    jdbcTemplate.update(connection -> {
        PreparedStatement stmt = connection.prepareStatement(
            "INSERT INTO Asiakas"
            + " (nimi, puhelinnumero, katuosoite, postinumero, postitoimipaikka)"
            + " VALUES (?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, asiakas.getNimi());
            stmt.setString(2, asiakas.getPuhelinnumero());
            stmt.setString(3, asiakas.getKatuosoite());
            stmt.setint(4, asiakas.getPostinumero());
            stmt.setString(5, asiakas.getPostitoimipaikka());
            return stmt;
    }, keyHolder);

    int id = keyHolder.getKey().intValue();
    return read(id);
}
```

Edellä kuvatusta esimerkistä löytyy hieman laajempi kuvaus osoitteessa <a href="https://www.baeldung.com/spring-jdbc-autogenerated-keys" target="_blank">https://www.baeldung.com/spring-jdbc-autogenerated-keys</a> olevasta oppaasta.


## Välimuistit sovelluksissa

Tarkastellaan esimerkinomaisesti muita `Dao`-rajapinnan tarjoamia hyötyjä.

Kun tietokantaa käytetään osana sovellusta (esimerkiksi web-sovellusta), sovelluksen vastuulla on tietokantakyselyiden tekeminen tietokannanhallintajärjestelmään. Jos sovellus on ainoa tietokannan käyttäjä (tietokantaa ei muokata muista järjestelmistä), ja jos merkittävä osa kyselyistä on toistuvia hakukyselyjä, voi sovellukseen rakentaa tietokannan toimintaa abstrahoiva välimuisti.

Välimuistissa on käytännössä kyse käsiteltävän tiedon tuomisesta lähemmäksi käyttäjää. Tietokantaa käyttävien sovellusten tapauksessa usein haettava tieto tuodaan sovelluksen muistiin, jolloin sovelluksen ei tarvitse hakea tietoa erikseen tietokannasta. Välimuisti tyhjennetään aina tietokannan päivityksen yhteydessä, jolloin käyttäjälle päätyvä tieto on aina ajan tasalla.

Yksinkertaisimmillaan välimuistitoteutus voi olla olemassaolevan `Dao`-toteutuksen kapselointi erilliseen `Dao`-toteutukseen.

Oletetaan, että käytössämme on nyt jo tuttu vaillinainen `AsiakasDao`-toteutus. Välimuistillisen toteutuksen luominen on melko suoraviivaista -- alla toteutuksessa muistetaan vain yksittäiset asiakkaat. Alla olevassa toteutuksessa oletetaan, että metodi `create` on määritelty asiakkaan palauttavaksi.

```java
// importit

@Component
public class CachedAsiakasDao implements Dao<Asiakas, Integer> {

    @Autowired
    AsiakasDao asiakasDao;

    HashMap<Integer, Asiakas> cache = new HashMap<>();

    @Override
    public Asiakas create(Asiakas object) throws SQLException {
        Asiakas created = asiakasDao.create(object);
        cache.put(created.getId(), created);
        return created;
    }

    @Override
    public Asiakas read(Integer key) throws SQLException {
        if(!cache.containsKey(key)) {
            cache.put(key, asiakasDao.read(key));
        }


        return cache.get(key);
    }

    @Override
    public Asiakas update(Asiakas object) throws SQLException {
        object = asiakasDao.update(object);
        cache.put(object.getKey(), object);
        return object;
    }

    @Override
    public void delete(Integer key) throws SQLException {
        asiakasDao.delete(key);
        cache.remove(key);
    }

    @Override
    public List<Asiakas> list() throws SQLException {
	      // ei toteutettu
	      return null;
    }
}

```

Jos asiakkaiden tietohin liittyvistä tietokantakyselyistä 99% on hakuoperaatioita, on merkittävässä osassa tapauksia tieto valmiiksi sovelluksen käytössä ja tietokantaan ei tarvitse ottaa yhteyttä. Toisaalta, jos sovellus on sellainen, että merkittävä osa käsittelystä sisältää myös tietokannassa olevan tiedon muokkausoperaatioita, ei edellä kuvatusta välimuistista ole juurikaan hyötyä.

Yllä olevassa esimerkissä välimuisti on kuitenkin naiivi. Miljoonia rivejä sisältävää tietokantaa ei kannattane ladata sovelluksen muistiin. Tällaisessa tapauksessa on hyvä tarkastella yleisimmin haettuja rivejä ja mahdollisesti tallentaa vain ne.
