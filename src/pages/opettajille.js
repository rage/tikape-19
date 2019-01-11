import React from "react"
import Helmet from "react-helmet"
import Layout from "../templates/Layout"
import Container from "../components/Container"
import { withLoginStateContext } from "../contexes/LoginStateContext"

const IndexPage = () => (
  <Layout>
    <Container>
      <Helmet title="Opettajille ja opinto-ohjaajille" />
      <section id="yleistä">
        <h1>Opettajille ja opinto-ohjaajille</h1>
        <p>
          Kurssin tai sen osan saa ottaa vapaasti osaksi peruskoulun, lukion,
          ammattikoulun, ammattikorkeakoulun tai yliopiston opintotarjontaa.
          Kerro opiskelijoillesi mahdollisuudesta osallistua kurssille.
        </p>
        <p>
          Kurssista järjestetään toistaiseksi vain ajastettuja versioita
          Helsingin yliopiston Avoimen yliopiston kautta. Tämä tarkoittaa sitä,
          että kokeet järjestetään kurssin aikataulussa.
        </p>
        <p>
          Avoimen yliopiston kurssisuoritus luetaan automaattisesti osaksi
          Helsingin yliopiston opintoja.
        </p>
      </section>
    </Container>
  </Layout>
)

export default withLoginStateContext(IndexPage)
