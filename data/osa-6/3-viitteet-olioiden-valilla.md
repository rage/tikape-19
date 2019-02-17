---
path: '/osa-6/3-viitteet-olioiden-valilla'
title: 'Viitteet olioiden välillä'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- N+1 -kyselyn ongelma

</text-box>


Olemme toistaiseksi käsitelleet olioita, joilla ei ole viitteitä muihin olioihin. Tutustutaan seuraavaksi viitteiden lisäämiseen. 

Oletetaan, että käytössämme aiemmin kuvatun `Asiakas`-käsitteen lisäksi käsite `Tilaus`, johon liittyy seuraava tietokantataulu ja luokka.

```sql
CREATE TABLE Tilaus (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    asiakas_id INTEGER,
    aika TIMESTAMP,
    kuljetustapa VARCHAR(40),
    vastaanotettu BOOLEAN,
    toimitettu BOOLEAN,
    FOREIGN KEY (asiakas_id) REFERENCES Asiakas(id)
);
```

```java
public class Tilaus {
    Integer id;
    Asiakas asiakas;
    LocalDate aika;
    String kuljetustapa;
    Boolean vastaanotettu;
    Boolean toimitettu;

    // konstruktorit sekä getterit ja setterit

}
```

Jokaiseen tilaukseen liittyy `Asiakas`. Tarkastellaan seuraavaksi asiakkaan hakemista tilauksen yhteydessä. 

Toteutetaan tilausten käsittelyyn tarkoitettu `TilausDao`-luokka. Luokalla on käytössään `JdbcTemplate`-olio sekä aiemmin toteutettu `AsiakasDao`-luokka.


```java
// importit

@Component
public class TilausDao implements Dao<Tilaus, Integer> {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    AsiakasDao asiakasDao;

    @Override
    public Tilaus read(Integer key) throws SQLException {
        List<Tilaus> tilaukset = jdbcTemplate.query("SELECT * FROM Tilaus WHERE ID = ?",
            (rs, rowNum) -> new Tilaus(rs.getInt("id"), asiakasDao.read(rs.getInt("asiakas_id")),
            rs.getDate("aika"), rs.getString("kuljetustapa"),
            rs.getBoolean("vastaanotettu"), rs.getBoolean("toimitettu")),
            key);

        if (tilaukset.isEmpty()) {
            return null;
        }

        return tilaukset.get(0);
    }

    @Override
    public void create(Tilaus tilaus) throws SQLException {
	    // ei toteutettu
    }


    @Override
    public Tilaus update(Tilaus object) throws SQLException {
	    // ei toteutettu
	    return null;
    }

    @Override
    public void delete(Integer key) throws SQLException {
        // ei toteutettu
    }

    @Override
    public List<Tilaus> list() throws SQLException {
        // ei toteutettu
    }
}
```

Tilauksen hakemisen yhteydessä palautetaan sekä tilaus että siihen liittyvä asiakas. Rajapintaa käyttävän toteutuksen näkökulmasta tietokannan käyttäminen toimii seuraavasti.

```java
// importit

@SpringBootApplication
public class NimetSpringSovellus implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(NimetSpringSovellus.class);
    }

    @Autowired
    TilausDao tilausDao;

    @Override
    public void run(String... args) throws Exception {
        Tilaus t = tilausDao.read(4);
        System.out.println("Tilauksen teki: " + t.getAsiakas().getNimi());        
    }
}
```

Tarkastellaan seuraavaksi metodin `list` toteutusta. Voimme ottaa ensin mallia metodista `read`.

```java
@Override
public List<Tilaus> list() throws SQLException {
    List<Tilaus> tilaukset = jdbcTemplate.query("SELECT * FROM Tilaus",
        (rs, rowNum) -> new Tilaus(rs.getInt("id"), asiakasDao.read(rs.getInt("asiakas_id")),
        rs.getDate("aika"), rs.getString("kuljetustapa"),
        rs.getBoolean("vastaanotettu"), rs.getBoolean("toimitettu")));

    return tilaukset;
}
```

Metodi on selkeä, mutta siinä on pieni ongelma. Tietokantaan tehdään ensin yksi kysely `SELECT * FROM Tilaus`, mutta tämän jälkeen jokaiselle tietokantakyselyn palauttamalle riville tehdään kysely `SELECT * FROM Asiakas WHERE id = ?`. Kysely on piilossa `asiakasDao`-luokkaan tehdyssä toteutuksessa, joten sitä ei välttämättä huomaa. 

Edellinen ongelma on esimerkki tietokantasovelluksissa esiintyvästä N+1 -kyselyn ongelmasta. N+1 -kyselyn ongelmaa esiintyy sovelluksissa, joissa listataan jonkun käsitteen ilmentymiä sekä näihin ilmentymiin viittaavia toisia käsitteitä. Ongelmassa tehdään ensin yksi kysely alkuperäiselle käsitteelle, jonka jälkeen jokaiselle käsitteen ilmentymälle haetaan siihen viittaavat käsitteet. Käytännössä siis yhden kyselyn lisäksi täytyy tehdä N kyselyä -- yksi jokaiselle alkuperäisen kyselyn palauttamalle riville. 

Yllä oleva tilaukset hakeva listausmetodi voidaan kirjoittaa myös yhdellä kyselyllä toimivaksi. Tällöin toiminnallisuus on seuraava:

```java
@Override
public List<Tilaus> list() throws SQLException {
    String sql = "SELECT * FROM Tilaus JOIN Asiakas ON Tilaus.asiakas_id = Asiakas.id";
    List<Tilaus> tilaukset = jdbcTemplate.query(kysely,
        (rs, rowNum) -> fromRs(rs));

    return tilaukset;
}

private static Tilaus fromRs(ResultSet rs) {
    Tilaus t = new Tilaus();
    t.setId(rs.getInt("Tilaus.id"));
    t.setDate(rs.getDate("Tilaus.aika"));
    t.setString(rs.getString("Tilaus.kuljetustapa"));
    t.setBoolean(rs.getBoolean("Tilaus.vastaanotettu"));
    t.setBoolean(rs.getBoolean("Tilaus.toimitettu"));

    Asiakas a = new Asiakas(
        rs.getInt("Asiakas.id"), 
        rs.getString("Asiakas.nimi"),
        rs.getString("Asiakas.puhelinnumero"), 
        rs.getString("Asiakas.katuosoite"),
        rs.getInt("Asiakas.postinumero"), 
        rs.getString("Asiakas.postitoimipaikka"));
    
    t.setAsiakas(a);

    return t;
}
```

Yllä olevassakaan esimerkissä ratkaisu ei ole ideaali, sillä yllä jokaisesta rivistä luodaan uusi asiakasolio, vaikka asiakas olisi jo tuttu aiemmasta tilauksesta. Tähän ei kuitenkaan paneuduta tässä sen laajemmin.

<text-box variant='hint' name='Mitä tietokannasta pitäisi noutaa?'>

Kun laajennamme edellistä esimerkkiä ja lisäämme tilaukseen ravintolan, pitäisikö annosta haettaessa hakea aina siihen liittyvä ravintola? Entä pitääkö tilausta haettaessa oikeasti hakea myös tilaukseen liittyvä asiakas?

Hyvä kysymys. 

Kun tietokantataulujen välisten yhteyksien perusteella tehdään uusia kyselyitä tietokantaan, olemassa on oleellisesti kaksi vaihtoehtoa sekä niiden seuraukset: (1) haetaan liikaa tietoa, jolloin hakemisoperaatioon menee turhaan aikaa, tai (2) haetaan liian vähän tietoa, jolloin tieto tulee hakea myöhemmin.

Yksi tapa ratkaista ongelma on toimia siten, että tietoa haetaan vain silloin kun sitä tarvitaan. Tällöin esimerkiksi vasta Tilaus-olioon mahdollisesti liittyvää `getAsiakas`-metodia kutsuttaessa asiakkaaseen liittyvät tiedot haetaan tietokannasta -- `getAsiakas`-metodi tekisi siis tietokantahaun. Tämäkään ei kuitenkaan ratkaise tilannetta, sillä jos tavoitteenamme olisi vaikkapa tulostaa kaikki tilaukset ja niihin liittyvät asiakkaat, saattaisi toteutus lopulta tehdä jokaisen tilauksen ja asiakkaan kohdalla oman erillisen tietokantahaun.

Tähän ei ole suoraviivaista ratkaisua. Tyypillisesti `Dao`-rajapinnan määrittelemille metodeille kerrotaan, tuleeko haettaviin olioihin liittyvät viitteet hakea erikseen.

</text-box>


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
