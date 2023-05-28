import { useDispatch, useSelector } from 'react-redux'
import {useState, useEffect} from "react"
import {userLogin, reset} from '../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaUserAlt } from "react-icons/fa";


function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { success, userInfo, loading, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {email, password} = formData

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (userInfo || success) {
      navigate('/dashboard')
    }

    if(error) {
      toast.error(error)
    }

    dispatch(reset())
  }, [dispatch, error, navigate, userInfo, success])

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(formData));
  }

  return (
    <Row>
      <Col className="mt-4" lg="12" md="12" sm="12" xs="12">
        <h1 className="text-center "><FaUserAlt size={33}/> &nbsp; Login</h1>
        <h5 className="text-center">Please type in your login credentials</h5>
      </Col>
      <Col className="mt-4" lg="12" md="12" sm="12" xs="12">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={email}
              required
              placeholder="Enter your email"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              value={password}
              required
              placeholder="Enter password"
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="text-center pt-3">
            <Button
              className="outline-primary w-50"
              variant="primary"
              type="submit"
              size="lg"
              disabled={loading}
            >
              Login
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
