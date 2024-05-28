import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "../../api/axiosConfig";
import "./Login.css";

const Login = ({ open, setAuth, setWatchList, setOpenLoginModal }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setOpenLoginModal(false);
  };

  useEffect(() => {
    setShow(open);
  }, [open]);

  const responseMessage = async (response) => {
    const decoded = jwtDecode(response.credential);
    setShow(false);
    setAuth(true);
    const watchList = await axios.get(`/api/v1/user/${decoded.email}`);
    sessionStorage.setItem("email",decoded.email)
    setWatchList(watchList.data);
  };
  const errorMessage = (error) => {
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      onBackdropClick={handleClose}
      centered
    >
      <Modal.Header>
        <Modal.Title>MovieTime</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </Modal.Body>
    </Modal>
  );
};

export default Login;
