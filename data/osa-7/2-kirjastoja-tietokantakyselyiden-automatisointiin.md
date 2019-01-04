---
path: '/osa-7/2-tietokantakyselyiden-automatisointi'
title: 'Tietokantakyselyiden automatisointi'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet joitakin kirjastoja yksinkertaisten SQL-kyselyiden automatisointiin.
- N+1 -kysely

</text-box>


<% partial 'partials/material_heading' do %>
  Valmiit Dao-kirjastot
<% end %>

<p>
  Nykyään löytyy huomattava määrä valmiita kirjastoja, jotka tarjoavat Dao-toiminnallisuuksia valmiina siten, että käyttäjän ei tarvitse kirjoittaa yksinkertaisimpia SQL-kyselyitä itse.
</p>



<p>
  Eräs tällainen kirjasto on <a href="http://ormlite.com/" target="_blank">ORMLite</a>, joka abstrahoi ja toteuttaa osan tietokantakyselyistä ohjelmoijan puolesta. ORMLite-kirjaston saa projektiin lisäämällä siihen liittyvän riippuvuuden Mavenin <code>pom.xml</code>-tiedostoon.
</p>

<% partial 'partials/xml_highlight' do %>
&lt;dependency&gt;
    &lt;groupId&gt;com.j256.ormlite&lt;/groupId&gt;
    &lt;artifactId&gt;ormlite-jdbc&lt;/artifactId&gt;
    &lt;version&gt;5.1&lt;/version&gt;
&lt;/dependency&gt;
<% end %>

<p>
  ORMLiteä käytettäessä tietokantatauluja kuvaaville luokille lisätään annotaatiot <code>@DatabaseTable(tableName = "<em>taulun nimi</em>")</code>, jonka lisäksi oliomuuttujille lisätään <code>@DatabaseField</code>-annotaatiot, joissa määritellään sarakkeen nimi, johon oliomuuttuja liittyy. Jos oliomuuttuja on taulun pääavain, lisätään sille erillinen määrittely (id=true) annotaatioon @DatabaseField: <code>@DatabaseField(id = true, columnName = "<em>sarakkeen nimi</em>")</code>.
</p>


<% partial 'partials/material_sub_heading' do %>
  Tiedon hakeminen yhdestä taulusta
<% end %>

<p>
  Käytännössä ORMLite osaa luoda olioita tietokannasta haettavista riveistä annotaatioiden perusteella. Jokaisessa tietokantataulua kuvaavassa luokassa tulee olla myös tyhjä konstruktori.
</p>

<p>
  Esimerkiksi luokka <code>Pyora</code> ORMLite-annotaatioilla olisi seuraavanlainen (tässä pyörään liittyviä varauksia ei ole otettu huomioon):
</p>

<% partial 'partials/code_highlight' do %>
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

  <p>
    Jos tietokannassa olevan sarakkeen nimi on sama kuin oliomuuttujan nimi, voidaan annotaatiosta <code>@DatabaseField</code> jättää <code>columnName</code>-määrittely pois. Tietokantataulun sarakkeet, jotka ovat muotoa <code>sarakkeen_nimi</code> tulee olla määriteltynä <em>camelCase</em>-muodossa oliomuuttujina. Sarake <code>sarakkeen_nimi</code> olisi siis oliomuuttujana muotoa <code>sarakkeenNimi</code>.
  </p>

<% end %>

<p>
  Nyt kaikkien pyörien hakeminen tietokannasta onnistuu seuraavasti. Käytössä on useampia ORMLiten tarjoamia luokkia ja rajapintoja kuten <code>ConnectionSource</code>, <code>JdbcConnectionSource</code>, <code>DaoManager</code> ja <code>Dao</code>. ORMLiteä käyttäessä emme kirjoita erikseen ohjelmakoodia (suoraviivaisten) kyselyiden tulosten muuttamiseksi olioiksi.
</p>

<% partial 'partials/code_highlight' do %>
ConnectionSource connectionSource
        = new JdbcConnectionSource("jdbc:sqlite:vuokraamo.db");

Dao&lt;Pyora, String&gt; pyoraDao
        = DaoManager.createDao(connectionSource, Pyora.class);

List&lt;Pyora&gt; pyorat = pyoraDao.queryForAll();
for (Pyora pyora : pyorat) {
    System.out.println(pyora.getMerkki() + " " + pyora.getRekisterinumero());
}
<% end %>

<p>
  Käytännössä ORMLite lukee luokkaan määritellyt annotaatiot, ja tekee niiden perusteella käytettävät tietokantakyselyt, joita ohjelmoija käyttää ORMLiten toteuttaman Dao-rajapinnan kautta.
</p>


<% partial 'partials/material_sub_heading' do %>
  Viitteiden käsittely
<% end %>

<p>
  Lisätään seuraavaksi toiminnallisuus pyörien hakemiseen Varaus-luokan kautta.
</p>

<p>
  Osoitteessa <a href="http://ormlite.com/javadoc/ormlite-core/doc-files/ormlite_2.html" target="_blank">http://ormlite.com/javadoc/ormlite-core/doc-files/ormlite_2.html</a> oleva ORMLiten "How to Use"-dokumentaatio sisältää neuvoja ORMLiten käyttöön.
</p>

<p>
  Viitteiden hakemisessa tarvittavien annotaatioiden määrittely tapahtuu kuten Pyora-luokalle. Viittausta pyörään määriteltäessä annotaatiolle <code>@DatabaseField</code> tulee kertoa, että sarake viittaa toiseen tauluun, ja että viitatusta taulusta tulee hakea oliolle arvo.
</p>

<p>
  Tämä tapahtuu lisäämällä annotaatioon parametrit <code>foreign = true</code> ja <code>foreignAutoRefresh = true</code>. Tämän lisäksi, myös viitattuun tauluun tulee lisätä annotaatiot.
</p>

<% partial 'partials/code_highlight' do %>
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

<p>
  Ylläolevassa esimerkissä Varaus-luokka on määritelty siten, että se liittyy tietokantatauluun Varaus. Sillä on lisäksi kenttä pyora, joka viittaa tauluun, johon Pyora-luokka liittyy. Luokalle Varaaja ei ole määritelty toiminnallisuutta.
</p>

<p>
  Varauksiin liittyvien pyörien tulostaminen onnistuu nyt seuraavasti:
</p>

<% partial 'partials/code_highlight' do %>
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

  <p>
    Vastaavanlaista toiminnallisuutta tarjoavia kirjastoja on huomattava määrä. Esimerkiksi Ruby on Railsille löytyy <a href="http://guides.rubyonrails.org/active_record_basics.html" target="_blank">ActiveRecord</a> ja NodeJS:lle löytyy <a href="http://docs.sequelizejs.com/" target="_blank">Sequelize</a>. Java-maailmassa vastaavia kirjastoja on niin monia, että niille on ehditty määrittelemään standardikin, mikä (saattaa) helpottaa kirjastojen käyttöä ja vaihtamista.
  </p>

  <p>
    Javalle määritellyn standardin nimi on <a href="https://en.wikipedia.org/wiki/Java_Persistence_API" target="_blank">Java Persistence API</a>, ja se määrittelee notaation luokkien annotoinnille ja kyselyiden kirjoittamiselle.
  </p>

  <p>
    Edellisissä esimerkeissä käyttämämme ORMLite-kirjasto tarjoaa vain pienen määrän toiminnallisuutta, mutta samalla oleelliset osat on toteutettu melko hyvin. Jos toiminnallisuutta kaipaa enemmän, voi käyttöön valita esimerkiksi <a href="http://hibernate.org/" target="_blank">Hibernaten</a>, joka on ehkäpä eniten käytetty vastaavaa toiminnallisuutta tarjoava Java-kirjasto.
  </p>

<% end %>


