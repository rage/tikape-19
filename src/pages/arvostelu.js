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
    <Container>
      <Helmet title="Arvostelu" />
      <section id="yleistä">
        <h1>Arvostelu</h1>
        <p>
          Tietokantojen perusteet on viiden opintopisteen kurssi. Kurssi
          sisältää viikoittaiset tehtävät, kaksi projektia sekä loppukokeen.
          Kurssin arvosana muodostuu tehtävien ja projektien perusteella,
          loppukokeella tarkastetaan pääseekö kurssista läpi.
        </p>
        <p>Kurssin tehtävien ja projektien vaikutus arvosanaan on seuraava:</p>
        <ul>
          <li>Viikoittaiset tehtävät (60% pisteistä)</li>
          <li>Suunnitteluprojekti (20% pisteistä)</li>
          <li>Ohjelmointiprojekti (20% pisteistä)</li>
        </ul>
        <p>
          Täydet pisteet tehtävistä saa tekemällä kaikki kunkin osan tehtävät.
          Tehtäviksi lasketaan materiaalissa olevat kyselyt,
          SQL-harjoittelutehtävät, itsearvioinnit, Moodleen laitettavat tehtävät
          sekä muut erikseen materiaalissa mainittavat tehtävät. Suunnittelu- ja
          ohjelmointiprojektin tarkempi arvostelu julkaistaan projektien
          julkaisun yhteydessä.
        </p>
        <p>
          Yllä oleva arvostelu on kurssin etänä tehtäville versioille.
          Ryhmämuotoiseen viikoittaiset harjoitusryhmät sisältävään
          kurssimuotoon ilmoittautuneilla tehtävien painoarvo on 50% pisteistä
          ja viikoittaisen osallistumisen painoarvo 10% pisteistä.
        </p>
        <h2>Arvosanan muodostuminen</h2>
        <p>Kurssin arvosana muodostuu seuraavasti.</p>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pisteet</TableCell>
              <TableCell>Arvosana</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>90% tai yli</TableCell>
              <TableCell>5 (erinomainen)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>80% tai yli, alle 90%</TableCell>
              <TableCell>4 (kiitettävä)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>70% tai yli, alle 80%</TableCell>
              <TableCell>3 (hyvä)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>60% tai yli, alle 70%</TableCell>
              <TableCell>2 (tyydyttävä)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>50% tai yli, alle 60%</TableCell>
              <TableCell>1 (välttävä)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>alle 50%</TableCell>
              <TableCell>0 (hylätty)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section id="kokeet">
        <h2>Kokeet</h2>
        <p>
          Kurssista järjestetään yksi koe sekä kaksi uusintaa. Kokeen hyväksytty
          suorittaminen johtaa kurssin läpäisyyn, mikäli kurssin tehtävät ja
          projektit on suorittanut tarpeeksi hyvin. Arvosana määräytyy tehtyjen
          tehtävien ja projektien perusteella.
        </p>
        <ul>
          <li>Kurssikoe: Lauantai 9.3.2019 klo 10-14</li>
          <li>Uusintakoe 1: Lauantai 13.4.2019 klo 10-14</li>
          <li>Uusintakoe 2: Keskiviikko 15.5.2019 klo 10-14</li>
        </ul>
        <p>
          Uusintakokeisiin osallistutaan mikäli osallistuja ei läpäise
          varsinaista kurssikoetta. Kokeet tehdään kurssin
          Moodle-järjestelmässä.
        </p>
        <p>
          Helsingin yliopiston opiskelijat voivat suorittaa kurssin myös
          erillistentillä Examinariumissa. Tenttimateriaalina on kurssin
          materiaali (ml. tehtävät ja projektit).
        </p>
      </section>
    </Container>
  </Layout>
)

export default withLoginStateContext(IndexPage)
