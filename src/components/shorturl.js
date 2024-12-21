import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Alert } from "antd";
const UrlshortnerApp = () => {
  const [inputUrl, setInputurl] = useState("");
  const [urldata, setUrldata] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetchUrls();
  }, [urldata]);

  //feth data

  const fetchUrls = async () => {
    try {
      const response = await fetch("https://url-shortner-be-gamma.vercel.app/");
      const res = await response.json();
      const dbdata = [...res.data];
      setUrldata([...dbdata]);
    } catch (err) {
      console.error(err);
    }
  };

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      if (!inputUrl) {
        setError(true);
        console.log("please enter your url.....");
      } else {
        const data = await fetch(
          "https://url-shortner-be-gamma.vercel.app/fullurl",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ full: inputUrl }),
          }
        );
        const response = await data.json();
        console.log(response);
        setUrldata((preData) => [...preData, response]);

        setInputurl("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <InputGroup className="mb-3 w-50">
        <Form.Control
          placeholder="Enter/Paste your Full URL"
          onChange={(e) => setInputurl(e.target.value)}
        />
        <Button
          variant="outline-primary"
          id="button-addon2"
          className="bg-warning"
          onClick={(e) => handlesubmit(e)}
        >
          Shorten
        </Button>
      </InputGroup>

      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Full Url</th>
            <th>Short Url</th>
            <th>Clicks Count</th>
          </tr>
        </thead>
        <tbody>
          {urldata.map((data, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td
                style={{
                  maxWidth: "10rem",
                  textOverflow: "clip",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {data.full}
              </td>
              <td>
                <a
                  href={`https://url-shortner-be-gamma.vercel.app/${data.short}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.short}
                </a>
              </td>
              <td>{data.click}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {error && (
        <Alert
          message="Warning"
          description="Please Enter valid url."
          type="warning"
          showIcon
          closable
          onClick={() => setError(!error)}
          className="warning-alert"
        />
      )}
    </>
  );
};
export default UrlshortnerApp;
