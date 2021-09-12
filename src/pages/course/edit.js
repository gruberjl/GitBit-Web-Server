import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Link, navigate } from "gatsby"
import {onAuthStateChanged, getAllDocs, deleteDoc} from '../../components/firebase'
import Page from '../../components/page'

export default class EditCourse extends React.Component {
  constructor(props) {
    super(props)
    this.setUid = this.setUid.bind(this)
    this.addDoc = this.addDoc.bind(this)
    this.saveDoc = this.saveDoc.bind(this)
    this.deleteDoc = this.deleteDoc.bind(this)

    const params = new URLSearchParams(props.location.search)

    this.state = {
      course: {},
      uid: '',
      courseId: params.get('courseId'),
    }

    const isBrowser = () => typeof window !== 'undefined'

    if (isBrowser()) {
      onAuthStateChanged(this.setUid)
    }
  }

  setUid(user) {
    if (user) {
      this.setState({
        uid: user.uid
      })

      getDoc('courses', this.state.courseId).then(this.addDoc)
    } else {
      navigate("/login")
    }
  }

  addDoc(doc) {
    this.setState({
      course: doc
    })
  }

  removeDoc(id) {
    const tests = this.state.tests.filter(test => {
      return test.id !== id;
    })

    this.setState({tests})
  }

  deleteTest(event) {
    const id = event.target.dataset.id
    deleteDoc(`users/${this.state.uid}/tests`, id).then(() => {
        this.removeDoc(id)
    }).catch((error) => {
        console.error("Error removing document: ", error);
    })
  }

  render() {
    return (
      <Page title={'Practice Tests to help you prepare for Microsoft 365 MS-500'} description={'Practice Tests to help you prepare for Microsoft 365 MS-500'}>
        <main>
          <Container>
            <Row>
              <Col xs={10}>
                <h1>Tests</h1>
              </Col>
              <Col xs={2} className='text-end'>
                <Button as={Link} to="/tests/new">Start New</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Number of Questions</th>
                      <th>Is Complete</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tests.map((doc, idx) => (
                      <tr key={idx}>
                        <td><Button variant="link" as={Link} to={`/course/ms-500/test/?testid=${doc.id}`}>MS-500</Button></td>
                        <td>{Object.keys(doc.questions).length}</td>
                        <td>{doc.isComplete ? 'Complete' : 'Incomplete'}</td>
                        <td><Button onClick={this.deleteTest} data-id={doc.id}>Delete</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </main>
      </Page>
    )
  }
}
