import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  setFormData,
  setFormErrors,
  regexForTagetUrl,
} from "../../../../../../resources/APIS/ApiConstants";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";

export default function TargetUrl() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.updateApiState);
  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    switch (name) {
      case "targetUrl":
        setFormErrors(
          {
            ...state.errors,
            [name]: regexForTagetUrl.test(value)
              ? ""
              : "Enter a Valid Target URL",
          },
          dispatch
        );
        break;
      default:
        break;
    }
    setFormData(event, dispatch, state);
  }
  return (
    <div>
      <div className="accordion" id="accordionTargetUrl">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
            >
              Targets
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse show"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionTargetUrl"
          >
            <div className="accordion-body">
              <div>
                <Row>
                  <Col md="12">
                    <Form.Group className="mb-3">
                      <Form.Label> Target Url :</Form.Label>
                      <br />
                      <i className="mb-3">
                        Supported protocol schemes:
                        http,https,tcp,tls,h2c,tyk,ws,wss.If empty, fallback to
                        default protocolof current API.:
                      </i>
                      <Form.Control
                        className="mt-2"
                        type="text"
                        id="targetUrl"
                        placeholder="Enter Target Url"
                        name="targetUrl"
                        value={state.form?.targetUrl}
                        isInvalid={!!state.errors?.targetUrl}
                        isValid={!state.errors?.targetUrl}
                        onChange={(e: any) => validateForm(e)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {state.errors?.targetUrl}
                      </Form.Control.Feedback>
                      <i>
                        If you add a trailing &apos;/ &apos; to your listen
                        path, you can only make requests that include the
                        trailing &apos;/ &apos;
                      </i>
                    </Form.Group>
                  </Col>
                  <Col md="12">
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Enable round-robin load balancing"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="12">
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Enable service discovery"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
