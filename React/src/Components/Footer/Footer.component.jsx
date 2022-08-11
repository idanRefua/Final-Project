import "./footer.component.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEnvelope, faLocationArrow } from "@fortawesome/free-solid-svg-icons";

const placeMap = "https://g.page/HackerUIsrael?share";

const FooterComponent = () => {
  return (
    <div className="my-5">
      <footer className="text-center text-lg-start footer-main">
        <div className="d-flex justify-content-center py-5">
          <a href="https://he-il.facebook.com/hackerucenter/">
            <button
              type="button"
              className="btn btn-lg btn-floating mx-2 fa fa-facebook fa-footer-comp"
            ></button>
          </a>
          <a href="https://www.youtube.com/c/HackerUCenter">
            <button
              type="button"
              className="btn btn-lg btn-floating mx-2 fa fa-youtube fa-footer-comp"
            ></button>
          </a>
          <a href="https://www.instagram.com/hackerucenter/">
            <button
              type="button"
              className="btn btn-lg btn-floating mx-2 fa fa-instagram fa-footer-comp"
            ></button>
          </a>
          <a href={placeMap}>
            <button
              type="button"
              className="btn btn-lg btn-floating mx-2  fa-footer-comp"
            >
              <FontAwesomeIcon icon={faLocationArrow} size="xs" />
            </button>
          </a>
        </div>

        <div className="text-center text-white p-3 copyright-div">
          © 2022 Copyright :{" "}
          <a className="text-white" href="#">
            wwww.Idanrefua-websites.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default FooterComponent;
