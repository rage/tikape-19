---
path: '/osa-7/2-tietokantakyselyiden-automatisointi'
title: 'Tietokantakyselyiden automatisointi'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet joitakin kirjastoja yksinkertaisten SQL-kyselyiden automatisointiin.
- N+1 -kysely

</text-box>


#
  Valmiit Dao-kirjastot
<% end %>


  Nykyään löytyy huomattava määrä valmiita kirjastoja, jotka tarjoavat Dao-toiminnallisuuksia valmiina siten, että käyttäjän ei tarvitse kirjoittaa yksinkertaisimpia SQL-kyselyitä itse.





  Eräs tällainen kirjasto on <a href="http://ormlite.com/" target="_blank">ORMLite</a>, joka abstrahoi ja toteuttaa osan tietokantakyselyistä ohjelmoijan puolesta. ORMLite-kirjaston saa projektiin lisäämällä siihen liittyvän riippuvuuden Mavenin `pom.xml`-tiedostoon.


<% partial 'partials/xml_highlight' do %>
&lt;dependency&gt;
    &lt;groupId&gt;com.j256.ormlite&lt;/groupId&gt;
    &lt;artifactId&gt;ormlite-jdbc&lt;/artifactId&gt;
    &lt;version&gt;5.1&lt;/version&gt;
&lt;/dependency&gt;
<% end %>


  ORMLiteä käytettäessä tietokantatauluja kuvaaville luokille lisätään annotaatiot `@DatabaseTable(tableName = "*taulun nimi*")`, jonka lisäksi oliomuuttujille lisätään `@DatabaseField`-annotaatiot, joissa määritellään sarakkeen nimi, johon oliomuuttuja liittyy. Jos oliomuuttuja on taulun pääavain, lisätään sille erillinen määrittely (id=true) annotaatioon @DatabaseField: `@DatabaseField(id = true, columnName = "*sarakkeen nimi*")`.



##
  Tiedon hakeminen yhdestä taulusta
<% end %>


  Käytännössä ORMLite osaa luoda olioita tietokannasta haettavista riveistä annotaatioiden perusteella. Jokaisessa tietokantataulua kuvaavassa luokassa tulee olla myös tyhjä konstruktori.



  Esimerkiksi luokka `Pyora` ORMLite-annotaatioilla olisi seuraavanlainen (tässä pyörään liittyviä varauksia ei ole otettu huomioon):


```java
import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "Pyora")
public class Pyora {

    @DatabaseField(id = true, columnName = "rekisterinumero")
    private String rekisterinumero;
    @DatabaseField(columnName = "merkki")
    private String merkki;

    // jokaisella tallennettavalla oliolle tulee olla parametriton konstruktori
    public Pyora() {
    }

    public Pyora(String rekisterinumero, String merkki) {
        this.rekisterinumero = rekisterinumero;
        this.merkki = merkki;
    }

// getterit ja setterit
}
<% end %>


<% partial 'partials/hint', locals: { name: 'ORMLite ja annotaatio @DatabaseField' } do %>


    Jos tietokannassa olevan sarakkeen nimi on sama kuin oliomuuttujan nimi, voidaan annotaatiosta `@DatabaseField` jättää `columnName`-määrittely pois. Tietokantataulun sarakkeet, jotka ovat muotoa `sarakkeen_nimi` tulee olla määriteltynä *camelCase*-muodossa oliomuuttujina. Sarake `sarakkeen_nimi` olisi siis oliomuuttujana muotoa `sarakkeenNimi`.


<% end %>


  Nyt kaikkien pyörien hakeminen tietokannasta onnistuu seuraavasti. Käytössä on useampia ORMLiten tarjoamia luokkia ja rajapintoja kuten `ConnectionSource`, `JdbcConnectionSource`, `DaoManager` ja `Dao`. ORMLiteä käyttäessä emme kirjoita erikseen ohjelmakoodia (suoraviivaisten) kyselyiden tulosten muuttamiseksi olioiksi.


```java
ConnectionSource connectionSource
        = new JdbcConnectionSource("jdbc:sqlite:vuokraamo.db");

Dao&lt;Pyora, String&gt; pyoraDao
        = DaoManager.createDao(connectionSource, Pyora.class);

List&lt;Pyora&gt; pyorat = pyoraDao.queryForAll();
for (Pyora pyora : pyorat) {
    System.out.println(pyora.getMerkki() + " " + pyora.getRekisterinumero());
}
<% end %>


  Käytännössä ORMLite lukee luokkaan määritellyt annotaatiot, ja tekee niiden perusteella käytettävät tietokantakyselyt, joita ohjelmoija käyttää ORMLiten toteuttaman Dao-rajapinnan kautta.



##
  Viitteiden käsittely
<% end %>


  Lisätään seuraavaksi toiminnallisuus pyörien hakemiseen Varaus-luokan kautta.



  Osoitteessa <a href="http://ormlite.com/javadoc/ormlite-core/doc-files/ormlite_2.html" target="_blank">http://ormlite.com/javadoc/ormlite-core/doc-files/ormlite_2.html</a> oleva ORMLiten "How to Use"-dokumentaatio sisältää neuvoja ORMLiten käyttöön.



  Viitteiden hakemisessa tarvittavien annotaatioiden määrittely tapahtuu kuten Pyora-luokalle. Viittausta pyörään määriteltäessä annotaatiolle `@DatabaseField` tulee kertoa, että sarake viittaa toiseen tauluun, ja että viitatusta taulusta tulee hakea oliolle arvo.



  Tämä tapahtuu lisäämällä annotaatioon parametrit `foreign = true` ja `foreignAutoRefresh = true`. Tämän lisäksi, myös viitattuun tauluun tulee lisätä annotaatiot.


```java
@DatabaseTable(tableName = "Varaus")
public class Varaus {

    @DatabaseField(id = true)
    private Integer varaustunnus;
    @DatabaseField(columnName = "pyora", canBeNull = false, foreign = true, foreignAutoRefresh = true)
    private Pyora pyora;
    private Varaaja varaaja;
    @DatabaseField(columnName = "varaus_alkaa")
    private Timestamp varausAlkaa;
    @DatabaseField(columnName = "varaus_loppuu")
    private Timestamp varausLoppuu;

    public Varaus() {
    }

// konstruktorit, getterit, setterit
}
<% end %>


  Ylläolevassa esimerkissä Varaus-luokka on määritelty siten, että se liittyy tietokantatauluun Varaus. Sillä on lisäksi kenttä pyora, joka viittaa tauluun, johon Pyora-luokka liittyy. Luokalle Varaaja ei ole määritelty toiminnallisuutta.



  Varauksiin liittyvien pyörien tulostaminen onnistuu nyt seuraavasti:


```java
ConnectionSource connectionSource
        = new JdbcConnectionSource("jdbc:sqlite:vuokraamo.db");

Dao&lt;Varaus, String&gt; varausDao
        = DaoManager.createDao(connectionSource, Varaus.class);

List&lt;Varaus&gt; varaukset = varausDao.queryForAll();
for (Varaus varaus : varaukset) {
    System.out.println(varaus.getPyora().getRekisterinumero() + ", alkaa " + varaus.getVarausAlkaa());
}
<% end %>

<% partial 'partials/hint', locals: { name: 'Java Persistence API ja Hibernate' } do %>


    Vastaavanlaista toiminnallisuutta tarjoavia kirjastoja on huomattava määrä. Esimerkiksi Ruby on Railsille löytyy <a href="http://guides.rubyonrails.org/active_record_basics.html" target="_blank">ActiveRecord</a> ja NodeJS:lle löytyy <a href="http://docs.sequelizejs.com/" target="_blank">Sequelize</a>. Java-maailmassa vastaavia kirjastoja on niin monia, että niille on ehditty määrittelemään standardikin, mikä (saattaa) helpottaa kirjastojen käyttöä ja vaihtamista.



    Javalle määritellyn standardin nimi on <a href="https://en.wikipedia.org/wiki/Java_Persistence_API" target="_blank">Java Persistence API</a>, ja se määrittelee notaation luokkien annotoinnille ja kyselyiden kirjoittamiselle.



    Edellisissä esimerkeissä käyttämämme ORMLite-kirjasto tarjoaa vain pienen määrän toiminnallisuutta, mutta samalla oleelliset osat on toteutettu melko hyvin. Jos toiminnallisuutta kaipaa enemmän, voi käyttöön valita esimerkiksi <a href="http://hibernate.org/" target="_blank">Hibernaten</a>, joka on ehkäpä eniten käytetty vastaavaa toiminnallisuutta tarjoava Java-kirjasto.


<% end %>


