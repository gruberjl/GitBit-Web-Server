import * as React from "react"
import { useState } from 'react'
import Page from '../components/page'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import M365CertificationImg from '../images/microsoft365-security-administrator-associate-600x600.png'
import { onAuthStateChanged } from "../components/firebase"
import {Link} from "react-router-dom"
import { ImCheckboxChecked, ImHappy2 } from "react-icons/im"
import {RiMoneyDollarCircleFill} from 'react-icons/ri'
import {MdAttachMoney} from 'react-icons/md'
import {GiChart} from 'react-icons/gi'

// styles
const landingStyles = {
  alignItems: 'center',
  display: 'flex',
  minHeight: 'calc(100vh - 66px)',
  position: 'relative',
  zIndex: 1,
  backgroundColor: '#212529',
  color: 'white',
  paddingTop: '12px',
  paddingBottom: '12px'
}

const pageStyle = {
  backgroundColor: '#212529',
  color: 'white',
  marginTop: '-25px'
}

const marginTop = {
  marginTop: '-25px'
}

const alignCenterStyles = {
  display: 'flex',
  alignItems: 'center',
  paddingTop:'12px',
  padddingBottom:'12px'
}

const sectionStyles = {
  paddingTop:'80px',
  padddingBottom:'80px'
}

const imageCenterStyles = {
  display: 'flex',
  justifyContent: 'center',
}

const buttonStyles = {
  margin: '12px 0px'
}

const textStyles = {
  fontSize: '18px',
  lineHeight: 1.67
}

const checkedBoxSyle = {
  color: '#27FB6B',
  marginRight: '12px',
}

const iconStyle = {
  fontSize: '25px',
  marginRight: '12px',
  color: '#E0BE36'
}

const HomePage = () => {
  const [uid, setUid] = useState('')
  // const [rightNavStyles, setRightNavStyles] = useState({display: 'flex!important'})

  const isBrowser = () => typeof window !== 'undefined'

  if (isBrowser()) {
    onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid)
      }
    })
  }

  return (
    <Page jsonLdType={'Course'}>
      <main style={pageStyle}>
        <div style={landingStyles}>
          <Container>
            <Row style={alignCenterStyles}>
              <Col style={imageCenterStyles}>
                <img src={M365CertificationImg} alt="Microsoft 365 MS-500 Logo" width='340' height='340'/>
              </Col>
              <Col>
                <Row>
                  <h1>Get Certified in MS-500 Microsoft 365 Security Administration</h1>
                </Row>
                  { uid
                    ? (
                      <Row style={buttonStyles}>
                        <Button variant="primary" as={Link} size="lg" to='/course?courseId=MS-500'>Go to course</Button>
                      </Row>
                    ) : (
                      <span>
                        <Row style={buttonStyles}>
                          <Button variant="primary" as={Link} size="lg" to='/sign-up'>Get Started Now</Button>
                        </Row>
                        <Row style={buttonStyles}>
                          <Button variant="secondary" as={Link} size="lg" to='/login'>I already have an account</Button>
                        </Row>
                      </span>
                    )
                  }
                <Row style={buttonStyles}>
                  <Button variant="info" as={Link} size="lg" to='/course/ms-500/browse-questions/'>Browse Questions</Button>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <div>
          <Container>
            <Row style={sectionStyles}>
              <Col xs={12} md={6}>
                <Row>
                  <Col>
                    <h2 style={buttonStyles}>Course Details</h2>
                  </Col>
                </Row>
                <Row>
                  <Col style={buttonStyles}>
                    <ImCheckboxChecked style={checkedBoxSyle} />
                    Self-paced learning
                  </Col>
                  <Col style={buttonStyles}>
                    <ImCheckboxChecked style={checkedBoxSyle} />
                    Unlimited access
                  </Col>
                </Row>
                <Row>
                  <Col style={buttonStyles}>
                    <ImCheckboxChecked style={checkedBoxSyle} />
                    Beginner to Advanced
                  </Col>
                  <Col style={buttonStyles}>
                    <ImCheckboxChecked style={checkedBoxSyle} />
                    Free
                  </Col>
                </Row>
                <Row>
                  <Col style={buttonStyles}>
                    <ImCheckboxChecked style={checkedBoxSyle} />
                    Prepared to take MS-500: Microsoft 365 Security Administration
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <h2 style={buttonStyles}>About this course</h2>
                </Row>
                <Row>
                  <p style={textStyles}>Become a master of securing Microsoft 365 with our free course and be prepared to take the Microsoft MS-500. There are 42 modules to explore, all created by John Gruber, packed full of practical, real-world lessons and examples to help you turn knowledge into action.</p>
                </Row>
              </Col>
            </Row>
            <Row style={sectionStyles}>
              <Col><h2 style={buttonStyles}>Why get certified?</h2></Col>
            </Row>
            <Row>
              <Col style={buttonStyles}>
                <MdAttachMoney style={iconStyle} />
                <strong>Get a raise.</strong> According to a Burningglass salary survey verified employees earn 18 percent more than their peers.
              </Col>
            </Row>
            <Row>
              <Col style={buttonStyles}>
                <GiChart style={iconStyle} />
                <strong>Get promoted.</strong> According to a Nigel Frank International Microsoft Salary Survey verified employees earn 15 percent more than their peers.
              </Col>
            </Row>
            <Row>
              <Col style={buttonStyles}>
                <ImHappy2 style={iconStyle} />
                <strong>Gain confidence.</strong> 91% of candidates experienced increased confidence.
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    </Page>
  )
}

export default HomePage
