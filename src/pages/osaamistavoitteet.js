import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../templates/Layout'
import Container from '../components/Container'
import { withLoginStateContext } from '../contexes/LoginStateContext'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

const IndexPage = () => (
  <Layout>
    <Helmet title="Osaamistavoitteet" />
    <Container>
      <section id="yleistä">
        <h1>Osaamistavoitteet</h1>
        <p>
          Tietokantojen perusteet -kurssilla opit perustaidot relaatiotietokantojen käytöstä ja suunnittelusta. Kurssilla on yhteensä seitsemän osaa, joiden osakohtaiset osaamistavoitteet ovat seuraavat.
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
                Tunnet käsitteet tieto, tietokannanhallintajärjestelmä, relaatiotietokanta, tietokanta, tietokantataulu, pääavain ja viiteavain. Tiedät että tietoa voi esittää useammalla eri abstraktiotasolla. Tunnet tietokantakyselyiden muodostamiseen käytettävän SQL-kielen toimintaperiaatteet. Osaat hakea SQL-kielen avulla tietoa yhdestä tai useammasta tietokantataulusta ja osaat rajata ja järjestää kyselyiden tuloksia.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>
                Osaat lisätä tietoa tietokantatauluun ja osaat muokata tietokantataulun sisältöä. Osaat luoda ja poistaa tietokantatauluja. Osaat tehdä yhteenvetokyselyitä ja rajata yhteenvetokyselyiden tuloksia. Tiedät joitakin olemassaolevia tietokannanhallintajärjestelmiä.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>
                Tiedät mitä tietokannan normalisointi tarkoittaa. Tunnet käsitteen normaalimuoto ja osaat perustella onko annettu tietokantataulu ensimmäisessä, toisessa tai kolmannessa normaalimuodossa. Osaat muuntaa annetun tietokantataulun kolmanteen normaalimuotoon.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>
                Tunnet menetelmiä tietokannan sekä tietokannan käsitteiden kuvaamiseen. Tunnet käsiteanalyysin askeleet ja osaat luoda ongelma-alueen kuvauksesta tietokannan käsiteanalyysin askeleita noudattaen.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>5</TableCell>
              <TableCell>
                Tunnet menetelmiä tietokantakyselyiden tehokkuuden tarkasteluun. Tiedät mitä indeksit ovat ja tiedät milloin tietokantatauluihin tulee määritellä indeksejä. Tiedät mitä tietokannan denormalisointi tarkoittaa. Tunnet käsitteen tietokannan eheys ja tietokantatransaktio, ja tiedät milloin tietokantatransaktioita käytetään. Tiedät tietokannanhallintajärjestelmältä vaadittuja ominaisuuksia, joita tarvitaan tietokantatransaktioiden toimintaan.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>6</TableCell>
              <TableCell>
                Osaat luoda tietokantaa käyttävän Java-kielisen sovelluksen. Tunnet sekvenssikaaviot ja osaat kuvata sovelluksesi toimintaa sekvenssikaavioiden avulla. Tunnet käsitteen SQL-injektio ja tunnet menetelmiä SQL-injektioiden estämiseen.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>7</TableCell>
              <TableCell>
                Tunnet Data Access Object (DAO) -suunnittelumallin. Tunnet joitakin kirjastoja yksinkertaisten SQL-kyselyiden automatisointiin ja tiedät näihin liittyviä ongelmia. Tunnet pinnallisesti muutamia NoSQL- ja NewSQL-tietokantoja. Tunnet termit käsitteellinen abstraktiotaso, rakenteellinen abstraktiotaso ja fyysinen abstraktiotaso, ja osaat kertoa näistä esimerkkejä. Tunnet GDPR-lainsäädännön ja tiedät miten se vaikuttaa henkilöihin liittyvän tiedon tallentamiseen ja käsittelyyn.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </Container>
  </Layout>
)

export default withLoginStateContext(IndexPage)
