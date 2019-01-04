---
path: '/osa-6/3-sql-injektiot'
title: 'SQL-injektiot'
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tunnet käsitteen SQL-injektio ja tunnet menetelmiä SQL-injektioiden estämiseen.

</text-box>



<% partial 'partials/material_heading' do %>
  SQL-injektiot
<% end %>

<p>
  Suurin osa olemassaolevista sovelluksista käyttää tietokannanhallintajärjestelmiä jollain tavalla: tietoa haetaan tietokannasta, tietokannassa olevaa tietoa muokataan, ja tietokantaan tallennetaan tietoa. Tyypillisesti sovelluksiin on myös käyttöliittymä, minkä kautta sovelluksen käyttäjät pääsevät vaikuttamaan kyselyiden sisältöön.
</p>

<p>
  SQL-injektioiden tekeminen onnistuu jos ohjelmoija jättää tietokantaa käsitteleviin kyselyihin ns. käyttäjän mentävän aukon. Tämä onnistuu Javalla siten, että kyselyt luodaan niin, että kyselyihin lisättävät parametrit syötetään kyselyyn suoraan merkkijonona.
</p>

<p>
  Alla on esimerkki, missä käyttäjältä kysytään haettavan pyörän merkkiä.
</p>

<% partial 'partials/code_highlight' do %>
  Scanner lukija = new Scanner(System.in);
  System.out.println("Minkä merkkiset pyörät tulostetaan?");
  String merkki = lukija.nextLine();

  // ...

  PreparedStatement statement = connection.prepareStatement("SELECT * FROM Pyora WHERE merkki = ?");
  statement.setString(1, merkki);

  // ...

  ResultSet resultSet = statement.executeQuery();
<% end %>

<p>
  Kysely on turvallinen, sillä merkki asetetaan metodin setString avulla. Metodi tarkastaa myös, ettei kyselyssä ole ylimääräistä sisältöä.
</p>

<p>
  Kyselystä saa helposti erittäin turvattoman. Seuraavassa esimerkissä on mahdollisuus SQL-injektioon.
</p>

<% partial 'partials/code_highlight' do %>
  Scanner lukija = new Scanner(System.in);
  System.out.println("Minkä merkkiset pyörät tulostetaan?");
  String merkki = lukija.nextLine();

  // ...

  PreparedStatement statement = connection.prepareStatement("SELECT * FROM Pyora WHERE merkki = '" + merkki + "'");

  // ...

  ResultSet resultSet = statement.executeQuery();
<% end %>

<p>
  Kun käyttäjän syöttämä merkkijono lisätään suoraan osaksi kyselyä, voi käyttäjä syöttää SQL-lauseita komentoonsa. Jos käyttäjä syöttää ohjelmaan esimerkiksi merkkijono <code>a' OR 'a'='a</code>, on suoritettava SQL-lause lopulta muotoa:
</p>

<% partial 'partials/sql_highlight' do %>
  SELECT * FROM Pyora WHERE merkki = 'a' OR 'a'='a'
<% end %>

<p>
  Edellinen lause on aina totta, sillä tarkastus 'a'='a' on totta.
</p>

<p>
  Myös muunlaisten SQL-lauseiden suoritus olisi em. tapauksessa mahdollista. Web-sarjakuva <a href="http://xkcd.com/" target="_blank">xkcd</a> kuvastaa tätä ilmiötä hyvin <em>Exploits of a Mom</em>-sarjakuvallaan.
</p>

<figure>

  <img src="http://imgs.xkcd.com/comics/exploits_of_a_mom.png" alt="School: Hi, this is your son's school. We're having some computer trouble.

								    Mom: Oh, dear -- Did he break something?

								    School: In a way. Did you really name your son Robert'); DROP TABLE Students;--?

								    Mom: Oh. Yes. Little Bobby Tables we call him.

								    School: Well, we've lost this year's student records. I hope you're happy.

								    Mom: And I hope you've learned to sanitize your database inputs."/>

  <figcaption>http://xkcd.com/327/ -- Exploits of a Mom. </figcaption>

</figure>


<% partial 'partials/exercise', locals: { name: 'SQL-injektio' } do %>

  <p>
    Tehtäväpohjassa on sovellus, joka mahdollistaa huonekalujen lisäämisen, listaamisen ja poistamisen. Muokkaa sovellusta siten, että huonekalujen poistamisessa on SQL-injektiomahdollisuus. Tällä hetkellä huonekalun, jonka id on 3, poistaminen onnistuu POST-pyynnöllä sovelluksen polkuun <code>/delete/3</code>. SQL-injektion tulee muuntaa tilannetta siten, että esimerkiksi pyyntö osoitteeseen <code>/delete/3%20OR%2042=42</code> poistaakin kaikki tietokannan rivit. Edellisessä esimerkissä <code>%20</code> on osoitteissa käytettävä välilyönnin merkki.
  </p>

<% end %>

