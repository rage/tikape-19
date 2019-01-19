---
path: '/osa-2/3-tietokannanhallintajarjestelmia'
title: 'Muutamia tietokannanhallintajärjestelmiä'
hidden: true
---


<text-box variant='learningObjectives' name='Oppimistavoitteet'>

- Tiedät erilaisia tietokannanhallintajärjestelmiä ja osaat tehdä SQL-kielisiä kyselyjä muutamissa tietokannanhallintajärjestelmissä.

</text-box>



*
  Valitettavasti SQLite ei tue RIGHT JOIN ja FULL JOIN -tyyppisiä kyselyitä.
*



<% partial 'partials/hint', locals: { name: 'Visuaalinen opas JOIN-kyselyihin' } do %>


  C.L. Moffatt on kirjoittanut hyvän yhteenvedon erilaisista JOIN-tyypeistä. Tutustu yhteenvetoon osoitteessa <a href="http://www.codeproject.com/Articles/33052/Visual-Representation-of-SQL-Joins" target="_blank">http://www.codeproject.com/Articles/33052/Visual-Representation-of-SQL-Joins</a>.


<figure>
  <img src="/img/viikko3/moffatt-visual_joins.png"/>
  &nbsp;
  <figcaption>Yhteenveto erilaisista JOIN-kyselyistä ja niiden merkityksistä joukkojen kautta visualisoituna.</figcaption>
</figure>

```



## Tietokannanhallintajärjestelmä omalle koneelle: SQLite

Joku lead-in

SQLiten saa ladattua osoitteesta <a href="https://www.sqlite.org/download.html" target="_blank" norel>https://www.sqlite.org/download.html</a>. Kun olet tallentanut (ja asentanut) SQLiten, käynnistä käyttöjärjestelmässä terminaali, ja kirjoita komento `sqlite3 tietokanta.db`.

Kyseinen komento luo tietokanta.db-nimisen tiedoston, joka sisältää käsittelemäsi tietokannan, ja avaa yhteyden kyseiseen tietokantaan.

Suorittamalla kyselyn "SELECT 1" sqlite tulostaa arvon 1.


<sample-output>
kayttaja@kone:~/kansio/$ sqlite3 tietokanta.db
SQLite version 3.11.0 2016-02-15 17:29:24
Enter ".help" for usage hints.
sqlite> SELECT 1;
1
sqlite>
</sample-output>


Voit käyttää kyseistä tietokantaa esimerkkien testaamiseen.


```



<% partial 'partials/hint', locals: { name: 'SQLiten konfigurointi' } do %>


SQLite:n voi myös konfiguroida oman mieleseksi määrittelemällä `.sqliterc`-tiedoston kotihakemistoon. Tällöin samoja asetuksia ei tarvitse määritellä jokaisen käynnistyksen yhteydessä.



`.sqliterc`-pikaohje (macOS/Linux):


<ol>
- Siirry kotihakemistoosi: `cd ~` tai `cd $HOME`.
- Luo tiedosto nimeltä `.sqliterc` (jos sitä ei jo ole olemassa): `touch .sqliterc`.
- Avaa tiedosto mieleisellä tekstieditorilla, esim. `nano .sqliterc`.
- Lisää haluamasi asetukset erillisille riveille, tallenna muutokset ja poistu tekstieditorista. Useimmat järjestelmät vaativat terminaalin uudelleen käynnistämistä (tai ainakin uuden session avaamista) niin että SQLite lukee `.sqliterc`:n.
</ol>


Esimerkiksi seuraavat asetukset voivat olla hyödyllisiä `.sqliterc`-tiedostossa:


<ul>
- `.mode column` – tulostaa kyselyn tuloksen sarakkeissa.
- `.headers on` – näyttää sarakkeiden otsikot.
- `.timer on` – tulostaa kyselyn tuloksen jälkeen kyselyyn kuluneen ajan.
- `.prompt "# "` – käyttää merkkijonoa `# ` rivin alussa normaalin `sqlite> ` sijaan.
</ul>


Tiedostoon voi myös lisätä `PRAGMA`-lauseita, kuten esimerkiksi `PRAGMA FOREIGN_KEYS = ON;` jolloin SQLite tottelee viiteavainten rajoitteita.


```

