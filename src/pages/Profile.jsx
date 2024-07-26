import { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import ResetPassword from "../components/ResetPassword";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { FaPenToSquare, FaX } from "react-icons/fa6";

export default function Profile() {
  const { user } = useContext(UserContext);

  const [details, setDetails] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const [profileModal, setProfileModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

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
            <Col className="mt-5 p-md-5 p-4 border border-4 border-warning rounded-4">
              <div className=" d-flex w-100 gap-5">
                <div className=" d-none d-md-block w-25">
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""
                   className=" object-fit-cover rounded-circle w-100" />
                </div>
                <div className=" w-100"> 
                 <div>
                  <h1 className=" text-uppercase text-center text-md-start">Welcome Back!</h1>
                  <h3 className=" fs-1 color-secondary text-center text-md-start">
                    {`${firstName} ${lastName}`}
                  </h3>
                 </div>
                 <hr />
                 <div>
                  <h4>Contacts</h4>
                    <ul>
                      <li><span className=" fw-semibold">Email:</span> {email}</li>
                      <li><span className=" fw-semibold">Mobile No:</span> {mobileNo}</li>{" "}
                    </ul>
                 </div>
                 <div className=" mt-3 d-flex gap-4">
                    <Button variant="success" 
                      className=" d-flex align-items-center"
                      onClick={() => setProfileModal(true)}>
                      <FaPenToSquare className=" me-3 d-md-block d-none"/>
                      Edit Profile
                    </Button>
                    <Button onClick={() => setPasswordModal(true)}>
                        Update Password
                    </Button>
                 </div>
                </div>
              </div>
            </Col>
          </Row>
          
          {profileModal && (
            <Modal show={profileModal}>
              <Row className="p-5">
                <Col>
                  <FaX className="mb-3 d-flex ms-auto" onClick={() => setProfileModal(false)}/> 
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
            </Modal>
          )}
          
          {passwordModal && (
            <Modal show={passwordModal}>
              <Row className="p-5">
                <Col>
                  <FaX className="mb-3 d-flex ms-auto" onClick={() => setPasswordModal(false)}/> 
                  <ResetPassword />
                </Col>
              </Row>
            </Modal>
          )}
        </>
      )}
    </>
  );
}
