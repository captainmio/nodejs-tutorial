import {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, reset } from '../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaUserAlt } from "react-icons/fa";


function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { userInfo, loading, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {name, email, password, confirmPassword} = formData

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) {
      toast.success("Account successfully registered")
      navigate('/')
      console.log('good chit')
    }

    if (userInfo || success) {
      navigate('/dashboard')
    }

    if(error) {
      toast.error(error)
    }

    dispatch(reset())
  }, [dispatch, userInfo, error, navigate, success])

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
  }

  return (
    <Row>
      <Col className="mt-4" lg="12" md="12" sm="12" xs="12">
        <h1 className="text-center "><FaUserAlt size={33}/> &nbsp; Registration Form</h1>
      </Col>
      <Col className="mt-4" lg="12" md="12" sm="12" xs="12">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="name"
              value={name}
              required
              placeholder="Enter your name"
              onChange={handleInputChange}
            />
          </Form.Group>
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
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              required
              placeholder="Confirm Password"
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
              Register
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Register;

