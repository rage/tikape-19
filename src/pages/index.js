import React from "react"

import Layout from "../templates/Layout"
import Banner from "../components/Banner"
import { withLoginStateContext } from "../contexes/LoginStateContext"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"
import Container from "../components/Container"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const IndexPage = () => (
  <Layout>
    <Banner />
    <Container>
      <section id="yleistä">
        <h1>Tietoa kurssista</h1>
        <p>
          Tietokantojen perusteet on kaikille avoin ja ilmainen nimensä
          mukaisesti tietokantojen perusteet opettava verkkokurssi. Kurssilla
          perehdytään Structured Query Language (SQL) -kieleen, tiedon
          kuvausmenetelmiin, tietokantojen suunnitteluun sekä tietokantaa
          käyttävien sovellusten toteutukseen.
        </p>
        <p>
          Kurssi vastaa sisällöltään ja laajuudeltaan Helsingin yliopiston
          tietojenkäsittelytieteen laitoksen kurssia Tietokantojen perusteet
          (TKT10004), joka on viiden opintopisteen kurssi. Kurssille
          osallistuminen vaatii ennakkotiedot ohjelmoinnista Helsingin
          yliopiston Ohjelmoinnin MOOC -kurssin laajuudessa (vastaa kursseja
          Ohjelmoinnin perusteet ja Ohjelmoinnin jatkokurssi).
        </p>
        <p>
          <strong>
            Materiaalia käytetään sekä verkkokursseilla että läsnäoloa
            vaativilla kursseilla. Materiaalissa olevat tiedot liittyvät
            Helsingin yliopiston syksyn 2019 kurssitoteutukseen.
          </strong>
        </p>
      </section>

      <section id="sisältö-ja-aikataulu">
        <h2>Sisältö ja aikataulu</h2>
        <p>
          Kurssi koostuu seitsemästä tehtäviä sisältävästä osasta, kahdesta
          projektista sekä kokeesta.
        </p>
        <p>
          Kurssin tehtävien aikataulu on kuvattuna alla. Koeaikataulu löytyy
          kurssin Moodlesta.
        </p>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Aikataulu</TableCell>
              <TableCell>Deadline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Osa 1</TableCell>
              <TableCell>9.9.2019</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Osa 2</TableCell>
              <TableCell>16.9.2019</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Osa 3</TableCell>
              <TableCell>23.9.2019</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Osa 4</TableCell>
              <TableCell>30.9.2019</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Osa 5</TableCell>
              <TableCell>7.10.2019</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Osa 6</TableCell>
              <TableCell>14.10.2019</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Osa 7</TableCell>
              <TableCell>21.10.2019</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p>
          Kurssilla on viikoittaisten kurssitehtävien lisäksi kaksi laajempaa
          projektia. Projektien tehtävänannot tulevat Moodle-järjestelmään,
          johon ne myös palautetaan. Projektit itse- ja vertaisarvioidaan.
        </p>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Projekti</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Itse- ja vertaisarvioinnin deadline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Suunnitteluprojekti</TableCell>
              <TableCell>25.9.2019</TableCell>
              <TableCell>2.10.2019</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ohjelmointiprojekti</TableCell>
              <TableCell>16.10.2019</TableCell>
              <TableCell>23.10.2019</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p>
          <b>
            Palautusten määräajat ovat aina klo 23:59:00. Virallisena
            määräaikana käytetään tehtäviä vastaanottavan palvelimen kelloa,
            joka on Suomen ajassa. Huomaa, että oman koneesi kello voi olla
            jäljessä tai edellä, joten älä jätä tehtävien palauttamista viime
            hetkeen.
          </b>
        </p>
      </section>

      <section id="kokeet">
        <h2>Kokeet</h2>
        <p>
          Kurssista järjestetään yksi koe sekä kaksi uusintaa. Kokeen hyväksytty
          suorittaminen johtaa kurssin läpäisyyn, mikäli kurssin tehtävät ja
          projektit on suorittanut tarpeeksi hyvin. Arvosana määräytyy tehtyjen
          tehtävien ja projektien perusteella.
        </p>
        <p>
          Koeaikataulu on annettuna kurssin Moodle-järjestelmässä.
          Uusintakokeisiin osallistutaan mikäli osallistuja ei läpäise
          varsinaista kurssikoetta. Kokeet tehdään kurssin
          Moodle-järjestelmässä.
        </p>
        <p>
          Tenttimateriaalina on kurssin materiaali (ml. tehtävät ja projektit).
        </p>
      </section>

      <section id="arvostelu">
        <h2>Arvostelu</h2>
        <p>
          Kurssin arvostelu perustuu harjoitusryhmäaktiivisuuteen, tehtäviin,
          harjoitustöihin, sekä kurssikokeeseen. Tarkempi pisteytys löytyy
          kurssin Moodle-järjestelmästä.
        </p>
      </section>
    </Container>
  </Layout>
)

export default withLoginStateContext(IndexPage)
