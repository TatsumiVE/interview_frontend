import { ButtonLink } from "../../components/utilites/button.link";
export const NotFound = () => {
  return (
    <>
      <div className="notfound_body">
        <h1 className="notfound_header">404</h1>
        <div className="cloak__wrapper">
          <div className="cloak__container">
            <div className="cloak"></div>
          </div>
        </div>
        <div className="info">
          <h2>We cannot find that page</h2>
          <p>
            We are fairly sure that page used to be here, but seems to have gone
            missing. We do apologize on its behalf.
          </p>

          <ButtonLink
            className="notfound_btn"
            type="button"
            route="/"
            text="Home"
            linkText="txt-light"
          />
        </div>
      </div>
    </>
  );
};
