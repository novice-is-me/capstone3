import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import ResetPassword from "../components/ResetPassword";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

export default function Profile() {
  const { user } = useContext(UserContext);

  const [details, setDetails] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (typeof data !== undefined) {
          setDetails(data);
          setFirstName(data.user.firstName);
          setLastName(data.user.lastName);
          setEmail(data.user.email);
          setMobileNo(data.user.mobileNo);
        } else if (data.error === "User not found") {
          Swal.fire({
            title: "User Not Found",
            icon: "error",
            text: "User not found, please check if you're logged in or contact the administrator.",
          });
        } else {
          Swal.fire({
            title: "Profile Error",
            icon: "error",
            text: "Something went wrong, kindly contact us for assistance.",
          });
        }
      });
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            mobileNo: mobileNo,
          }),
        }
      );
      if (response.ok) {
        Swal.fire({
          title: "Profile Updated",
          icon: "success",
          text: "Your profile has been updated successfully.",
        });
        // Optionally update local state or trigger a fetch for updated details
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Update Failed",
          icon: "error",
          text:
            errorData.message || "Failed to update profile. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Update Error",
        icon: "error",
        text: "An error occurred while updating your profile. Please try again.",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateProfile();
  };

  return (
    <>
      {user.id === null && user.id === undefined ? (
        <Navigate to="/products" />
      ) : (
        <>
          <Row>
            <div className="pt-3">
              <Button variant="dark" as={Link} to="/products">
                <FaArrowLeft />
              </Button>
            </div>
            <Col className="mt-5 p-5 border border-4 border-success rounded-4">
              <h1 className="mb-5">Profile</h1>
              <h2 className="mt-3">{`${firstName} ${lastName}`}</h2>{" "}
              <hr />
              <h4>Contacts</h4>
              <ul>
                <li>Email: {email}</li>
                <li>Mobile No: {mobileNo}</li>{" "}
              </ul>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col>
              <h3>Update Profile</h3>
              <Form onSubmit={handleSubmit}>
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="my-3">
                  {" "}
                  Update Profile
                </Button>
              </Form>
            </Col>
          </Row>
          <Row className="pt-4 mt-4">
            <Col>
              <ResetPassword />
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
