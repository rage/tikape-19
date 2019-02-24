import React from "react"
import Helmet from "react-helmet"

import Layout from "../templates/Layout"
import Container from "../components/Container"
import { withLoginStateContext } from "../contexes/LoginStateContext"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"

const IndexPage = () => (
  <Layout>
    <Helmet title="Osaamistavoitteet" />
    <Container>
      <section id="yleistä">
        <h1>Osaamistavoitteet</h1>
        <p>
          Tietokantojen perusteet -kurssilla opit perustaidot
          relaatiotietokantojen käytöstä ja suunnittelusta. Kurssilla on
          yhteensä seitsemän osaa, joiden osakohtaiset osaamistavoitteet ovat
          seuraavat.
        </p>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Osa</TableCell>
              <TableCell>Osaamistavoitteet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>
                Tunnet käsitteet tieto, tietokannanhallintajärjestelmä,
                relaatiotietokanta, tietokanta, tietokantataulu, pääavain ja
                viiteavain. Tunnet tietokantakyselyiden muodostamiseen
                käytettävän SQL-kielen toimintaperiaatteet. Osaat hakea
                SQL-kielen avulla tietoa yhdestä tai useammasta
                tietokantataulusta ja osaat rajata ja järjestää kyselyiden
                tuloksia.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>
                Osaat luoda ja poistaa tietokantatauluja. Osaat lisätä
                tietokantaan tietoa ja osaat muokata tietokannassa olevaa
                tietoa. Osaat tehdä yhteenvetokyselyitä ja rajata
                yhteenvetokyselyiden tuloksia. Tiedät joitakin olemassaolevia
                tietokannanhallintajärjestelmiä ja olet kokeillut niiden
                käyttämistä.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>
                Tunnet menetelmiä tiedon ja tietokannan kuvaamiseen. Tunnet
                käsiteanalyysin askeleet ja osaat luoda ongelma-alueen
                kuvauksesta käsitekaavion. Osaat luoda käsitekaaviosta
                tietokantakaavion.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>
                Tiedät mitä tietokannan normalisointi tarkoittaa osaat muuntaa
                annetun tietokantataulun kolmanteen normaalimuotoon. Tunnet
                käsitteen tietokannan eheys ja tietokantatransaktio, ja tiedät
                milloin tietokantatransaktioita käytetään. Tiedät
                tietokannanhallintajärjestelmältä vaadittuja ominaisuuksia,
                joita tarvitaan tietokantatransaktioiden toimintaan. Osaat tehdä
                alikyselyitä SQL-kielellä.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>5</TableCell>
              <TableCell>
                Tunnet menetelmiä tietokantakyselyiden tehokkuuden tarkasteluun.
                Tiedät mitä indeksit ovat ja tiedät milloin tietokantatauluihin
                kannattaa määritellä indeksejä. Tiedät mitä tietokannan
                denormalisointi tarkoittaa. Osaat luoda tietokantaa käyttävän
                Java-kielisen sovelluksen.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>6</TableCell>
              <TableCell>
                Tunnistat olio-ohjelmoinnista tuttujen luokkien ja
                tietokantataulujen välisen yhteyden. Tunnet Data Access Object
                (DAO) -suunnittelumallin ja ymmärrät sen toiminnan. Tiedät
                DAO-suunnittelumallin mahdollisia haittapuolia ja osaat kuvata
                N+1 -kyselyn ongelman. Tunnet käsitteen SQL-injektio ja tunnet
                menetelmiä SQL-injektioiden estämiseen.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>7</TableCell>
              <TableCell>
                Tunnet pinnallisesti tietokannanhallintajärjestelmien historiaa
                ja tunnet muitakin kuin relaatiotietokannanhallintajärjestelmiä.
                Tiedät termit ACID ja BASE. Tiedät mitä henkilötiedoilla
                tarkoitetaan ja tiedät muutamia GDPR-lainsäädännön oleellisia
                kohtia henkilötietojen käsittelyyn liittyen.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </Container>
  </Layout>
)

export default withLoginStateContext(IndexPage)
