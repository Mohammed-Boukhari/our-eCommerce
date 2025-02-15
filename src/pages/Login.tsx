import { Navigate } from "react-router-dom";

import { Heading } from "@components/common";
import { Input } from "@components/Form";

import { Button, Col, Form, Row, Alert, Spinner } from "react-bootstrap";
import UseLogin from "@hooks/useLogin";

const Login = () => {
  const {
    accessToken,
    emailOnblurHandler,
    error,
    errors,
    handleSubmit,
    loading,
    register,
    submitForm,
    searchParams,
  } = UseLogin();

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading title={"User Login"} />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") === "login_required" && (
            <Alert variant="success">
              You need to login to view this content
            </Alert>
          )}
          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">
              Your account successfully created, please login
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)} className="mb-2 mt-2">
            <Input
              label={"Email"}
              name={"email"}
              register={register}
              error={errors.email?.message}
              onBlur={emailOnblurHandler}
            />

            <Input
              label={"Password"}
              type="password"
              name={"password"}
              register={register}
              error={errors.password?.message}
            />

            <Button
              className=" mt-2"
              variant="info"
              type="submit"
              style={{ color: "white" }}
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
