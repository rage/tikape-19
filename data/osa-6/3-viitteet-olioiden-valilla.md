---
path: '/osa-6/3-viitteet-olioiden-valilla'
title: 'Viitteet olioiden välillä'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Osaat luoda ohjelmia, missä tietokantatauluja kuvaavien olioiden välillä on viitteitä.
- Tiedät mitä N+1 -kyselyn ongelma tarkoittaa.
- Tiedät miten N+1 -kyselyn ongemla ratkaistaan.


</text-box>


Olemme toistaiseksi käsitelleet olioita, joilla ei ole viitteitä muihin olioihin. Tutustutaan seuraavaksi viitteiden lisäämiseen.

Oletetaan, että käytössämme on aiemmin kuvatun `Asiakas`-käsitteen lisäksi käsite `Tilaus`. Käsite on kuvattu alla sekä tietokantatauluna että luokkana.

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
// importit

public class Tilaus {
    Integer id;
    Asiakas asiakas;
    Date aika;
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
    public void create(Tilaus tilaus) throws SQLException {
	    // ei toteutettu
    }

    @Override
    public Tilaus read(Integer key) throws SQLException {
        List<Tilaus> tilaukset =
            jdbcTemplate.query("SELECT * FROM Tilaus WHERE ID = ?",
                (rs, rowNum) -> new Tilaus(rs.getInt("id"),
                                   asiakasDao.read(rs.getInt("asiakas_id")),
                                   rs.getDate("aika"),
                                   rs.getString("kuljetustapa"),
                                   rs.getBoolean("vastaanotettu"),
                                   rs.getBoolean("toimitettu")),
            key);

        if (tilaukset.isEmpty()) {
            return null;
        }

        return tilaukset.get(0);
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

Luodaan seuraavaksi toteutus metodille `list`. Toteutuksessa on otettu mallia metodista `read`.

```java
@Override
public List<Tilaus> list() throws SQLException {
    List<Tilaus> tilaukset =
        jdbcTemplate.query("SELECT * FROM Tilaus",
            (rs, rowNum) -> new Tilaus(rs.getInt("id"),
                                   asiakasDao.read(rs.getInt("asiakas_id")),
                                   rs.getDate("aika"),
                                   rs.getString("kuljetustapa"),
                                   rs.getBoolean("vastaanotettu"),
                                   rs.getBoolean("toimitettu")));

    return tilaukset;
}
```

Metodi on selkeä, mutta siinä on pieni ongelma. Tietokantaan tehdään ensin yksi kysely `SELECT * FROM Tilaus`. Mutta! Tämän jälkeen jokaiselle tietokantakyselyn palauttamalle riville tehdään kysely `SELECT * FROM Asiakas WHERE id = ?`. Kysely on piilossa `asiakasDao`-luokkaan tehdyssä toteutuksessa, joten sitä ei välttämättä yllä olevaa koodia tarkastelemalla heti huomaa.

Edellinen ongelma on esimerkki tietokantasovelluksissa esiintyvästä N+1 -kyselyn ongelmasta. N+1 -kyselyn ongelmaa esiintyy sovelluksissa, joissa listataan jonkun käsitteen ilmentymiä sekä näihin ilmentymiin liittyviä toisia käsitteitä. Ongelmassa tehdään ensin yksi kysely alkuperäiselle käsitteelle, jonka jälkeen jokaiselle käsitteen ilmentymälle haetaan siihen viittaavat käsitteet. Käytännössä siis yhden kyselyn lisäksi täytyy tehdä N kyselyä -- yksi jokaiselle alkuperäisen kyselyn palauttamalle riville.

Yllä oleva tilaukset hakeva listausmetodi voidaan kirjoittaa myös yhdellä kyselyllä toimivaksi tutun `JOIN`-kyselyn avulla. Tällöin toiminnallisuus on seuraava:

```java
@Override
public List<Tilaus> list() throws SQLException {
    String sql = "SELECT * FROM Tilaus JOIN Asiakas "
            + "ON Tilaus.asiakas_id = Asiakas.id";
    List<Tilaus> tilaukset = jdbcTemplate.query(kysely,
        (rs, rowNum) -> fromRs(rs));

    return tilaukset;
}

private Tilaus fromRs(ResultSet rs) {
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

Yllä olevassakaan esimerkissä ratkaisu ei ole ideaali, sillä jokaisesta rivistä luodaan uusi asiakasolio, vaikka asiakas olisi jo tuttu aiemmasta tilauksesta. Eräs ratkaisuvaihtoehto olisi luoda metodiin hajautustaulu, missä tutuista olioista pidettäisiin kirjaa.

```java
@Override
public List<Tilaus> list() throws SQLException {
    HashMap<Integer, Asiakas> asiakkaat = new HashMap<>();
    String sql = "SELECT * FROM Tilaus JOIN Asiakas "
            + "ON Tilaus.asiakas_id = Asiakas.id";
    List<Tilaus> tilaukset = jdbcTemplate.query(kysely,
        (rs, rowNum) -> fromRs(rs, asiakkaat));

    return tilaukset;
}

private Tilaus fromRs(ResultSet rs, HashMap<Integer, Asiakas> asiakkaat) {
    Tilaus t = new Tilaus();
    t.setId(rs.getInt("Tilaus.id"));
    t.setDate(rs.getDate("Tilaus.aika"));
    t.setString(rs.getString("Tilaus.kuljetustapa"));
    t.setBoolean(rs.getBoolean("Tilaus.vastaanotettu"));
    t.setBoolean(rs.getBoolean("Tilaus.toimitettu"));

    int asiakasId = rs.getInt("Asiakas.id");

    if (!asiakkaat.containsKey(asiakasId)) {
        Asiakas a = new Asiakas(
            asiakasId,
            rs.getString("Asiakas.nimi"),
            rs.getString("Asiakas.puhelinnumero"),
            rs.getString("Asiakas.katuosoite"),
            rs.getInt("Asiakas.postinumero"),
            rs.getString("Asiakas.postitoimipaikka"));
        asiakkaat.put(asiakasId, a);
    }

    Asiakas a = asiakkaat.get(asiakasId);

    t.setAsiakas(a);

    return t;
}
```


<text-box variant='hint' name='Mitä tietokannasta pitäisi noutaa?'>

Kun laajennamme edellistä esimerkkiä ja lisäämme tilaukseen ravintolan, pitäisikö annosta haettaessa hakea aina siihen liittyvä ravintola? Entä pitääkö tilausta haettaessa oikeasti hakea myös tilaukseen liittyvä asiakas?

Hyvä kysymys.

Kun tietokantataulujen välisten yhteyksien perusteella tehdään uusia kyselyitä tietokantaan, olemassa on oleellisesti kaksi vaihtoehtoa sekä niiden seuraukset: (1) haetaan liikaa tietoa, jolloin hakemisoperaatioon menee turhaan aikaa, tai (2) haetaan liian vähän tietoa, jolloin tieto tulee hakea myöhemmin.

Yksi tapa ratkaista ongelma on toimia siten, että tietoa haetaan vain silloin kun sitä tarvitaan. Tällöin esimerkiksi vasta Tilaus-olioon mahdollisesti liittyvää `getAsiakas`-metodia kutsuttaessa asiakkaaseen liittyvät tiedot haetaan tietokannasta -- `getAsiakas`-metodi tekisi siis tietokantahaun. Tämäkään ei kuitenkaan ratkaise tilannetta, sillä jos tavoitteenamme olisi vaikkapa tulostaa kaikki tilaukset ja niihin liittyvät asiakkaat, saattaisi toteutus lopulta tehdä jokaisen tilauksen ja asiakkaan kohdalla oman erillisen tietokantahaun -- N+1 -kyselyn ongelma tulisi siis takaisin kummittelemaan.

Tähän ei ole suoraviivaista ratkaisua. Tyypillisesti `Dao`-rajapinnan määrittelemiä metodeja toteutettaessa päätetään, tuleeko haettaviin olioihin liittyvät viitteet hakea erikseen. Tämän lisäksi `Dao`-rajapinnan toteuttaviin luokkiin voi tehdä luokkakohtaisia rajapinnasta poikkeavia metodeja.

</text-box>

<quiznator id="5c69cb383972a914741062cc"></quiznator>

<quiznator id="5c69cd8f3972a914741062d1"></quiznator>
