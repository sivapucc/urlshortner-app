import UrlshortnerApp from "./components/shorturl.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useSearchParams } from "react-router-dom";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      click here to see user info
    </Tooltip>
  );

  function handleLogout() {
    window.location.href = "https://user-login-appsk.netlify.app/";
  }

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const name = searchParams.get("name");

  return (
    <div className="App">
      <div>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <Button
            variant="primary"
            onClick={handleShow}
            className="user-button"
            onMouseOver={{}}
          ></Button>
        </OverlayTrigger>

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Welcome {name ? name : ""}</Offcanvas.Title>
            <div>{token}</div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div>
              <Button variant="success" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <h1 className="htitle-text">Url shortner</h1>
      <UrlshortnerApp />
    </div>
  );
}

export default App;
