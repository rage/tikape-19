import React from 'react'
import Helmet from 'react-helmet'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import Layout from '../templates/Layout'
import Container from '../components/Container'
import { withLoginStateContext } from '../contexes/LoginStateContext'

const IndexPage = () => (
  <Layout>
    <Container>
      <Helmet title="Tukiväylät" />
      <h1>Tukiväylät</h1>
      <p>
        Kurssilla on Telegram-keskustelukanava sekä kurssin Moodle-alueella oleva keskustelualue. Tukiväylät perustuvat vertaistukeen. Lisätietoja näistä myöhemmin.
      </p>
      {/*
      <h2>Keskustelukanava</h2>
      <p>
        Kurssilla on käytössä Telegram-keskusteluhuone. Suosittelemme, että
        käytät tukikanavaa joko Telegramin selaimessa toimivalla versiolla tai
        Telegrammin työpöytäohjelmalla.
      </p>
      <p>
        Pääset kanavalle tästä linkistä:{' '}
        <OutboundLink href="https://t.me/tkt-tikape">
          https://t.me/tkt-tikape
        </OutboundLink>
        . Pääset Telegrammin selaimessa toimivaan versioon täältä:{' '}
        <OutboundLink href="https://web.telegram.org/">
          https://web.telegram.org
        </OutboundLink>
        .
      </p>
      <p>
        Kanavan osallistujat ovat kanssaopiskelijoita sekä vapaaehtoisia
        ohjaajia. Kanavan toiminta perustuu vapaaehtoisuuteen. Autathan muita
        myös vastavuoroisesti.
      </p>
      <h2>Moodle-foorumi</h2>
      <p>
        Kurssin Moodle-järjestelmässä on lisäksi Foorumi, jossa kurssin tehtäviin voi kysellä vinkkejä. 
      </p>
      <p>
        Pääset Moodleen tästä linkistä:{' '}
        <OutboundLink href="https://moodle.helsinki.fi/course/view.php?id=29094">
        https://moodle.helsinki.fi/course/view.php?id=29094
        </OutboundLink>
        .
      </p>
      <h2>Yleistä ja muu ohjaus</h2>
      <p>
        Järjestämme kurssille myös vapaaehtoisia ohjaustunteja Helsingin yliopiston kumpulan kampuksella. Lisätietoa ohjauksesta tulee tänne myöhemmin.
      </p>
      <p>
        Mikäli kysyt apua ohjelmointitehtävään, voit liittää kysymykseesi
        myös ohjelmasi lähdekoodin. Valitse Netbeanssista "<code>TMC</code>" ->
        "<code>Send code to TMC Pastebin</code>" ja valitse avautuvasta
        ikkunasta "<code>Send</code>". Tämän jälkeen saat linkin koodiisi, jonka
        voit jakaa keskustelukanavalla apupyynnön yhteydessä.
      </p>
       */}
    </Container>
  </Layout>
)

export default withLoginStateContext(IndexPage)
