---
path: '/osa-2/x-sql-komennot'
title: 'Yhteenveto SQL-komennoista'
overview: true
hidden: true
---


<% partial 'partials/material_sub_heading' do %>
  Yhteenveto
<% end %>

<table class="table">

  <tr>
    <th>
      Operaatio
    </th>
    <th>
      Avainsana
    </th>
    <th>
      Esimerkki
    </th>
  </tr>

  <tr>
    <td>
      Tietokantataulun luominen
    </td>
    <td>
      CREATE
    </td>
    <td>
      <% partial 'partials/sql_highlight' do %>
CREATE TABLE Opiskelija (
    opiskelijanumero integer,
    nimi varchar(60),
    sahkopostiosoite varchar(40)
)
      <% end %>
    </td>
  </tr>

  <tr>
    <td>
      Tietokantataulun poistaminen
    </td>
    <td>
      DROP
    </td>
    <td>
      <% partial 'partials/sql_highlight' do %>
DROP TABLE Opiskelija
      <% end %>
    </td>
  </tr>

  <tr>
    <td>
      Tiedon lisääminen
    </td>
    <td>
      INSERT
    </td>
    <td>
      <% partial 'partials/sql_highlight' do %>
INSERT INTO
    Opiskelija (opiskelijanumero, nimi, sahkopostiosoite)
    VALUES (1008286, 'Ari', 'posti@osoite.net');
      <% end %>
    </td>
  </tr>

  <tr>
    <td>
      Tiedon hakeminen
    </td>
    <td>
      SELECT
    </td>
    <td>
      <% partial 'partials/sql_highlight' do %>
SELECT nimi FROM Opiskelija
      <% end %>
    </td>
  </tr>

  <tr>
    <td>
      Tiedon päivittäminen
    </td>
    <td>
      UPDATE
    </td>
    <td>
      <% partial 'partials/sql_highlight' do %>
UPDATE Opiskelija
    SET nimi='Ari V'
    WHERE opiskelijanumero=1008286
      <% end %>
    </td>
  </tr>

  <tr>
    <td>
      Tiedon (rivien) poistaminen
    </td>
    <td>
      DELETE
    </td>
    <td>
      <% partial 'partials/sql_highlight' do %>
DELETE FROM Opiskelija
    WHERE opiskelijanumero=1008286
      <% end %>
    </td>
  </tr>

</table>

