import "./about-page.css";
import { Fragment } from "react";

const AboutPage = () => {
  return (
    <Fragment>
      <br />
      <div className="container">
        <h1 className="d-flex align-items-center justify-content-center about-us-title">
          About us
        </h1>
        <br />
        <br />
        <div className="row">
          <section className="col-sm">
            <div className="mb-3">
              <h3 className="about-us-sub-titles">How we start</h3>
              <p className="about-us-text-p">
                We are on the market since 2008. Our idea was, Make website,
                that people will search items they want to buy. We are allow to
                people upload some product they want to sell, it's have to be
                New Product , in the box. On our webiste there are 3 categories
                of products : Desktop Pc,Smartphones & Laptops.
              </p>
              <br />
              <h3 className="about-us-sub-titles">You can trust us</h3>
              <p className="about-us-text-p">
                We are over 10 Years on Market, Many people visit Our Website
                each day, You can buy with full confident, Before the Item send
                to you,we are store it in our store,we check the item is 100%
                Original and not fake.
              </p>
              <br />
              <h3 className="about-us-sub-titles">Feel free to contacts us</h3>
              <p className="about-us-text-p">
                We are here to listen you ! <br />
                If you have any Prolblem with your order or,want ask some
                questions, You can send us email : {""}
                <span className="about-us-our-email">
                  refua.store@gmail.com
                </span>
                . <br />
                Enjoy Here !
              </p>
            </div>
          </section>
          <section className="col-sm">
            <p>
              <iframe
                className="about-us-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.432584034318!2d34.798700814469214!3d32.08459242627529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4bbf5cf3bda9%3A0xa09291a1a8077d5a!2zSGFja2VyVSB8INeU15DXp9eo15nXlQ!5e0!3m2!1sen!2sil!4v1656255189490!5m2!1sen!2sil"
                allowFullScreen=""
                loading="lazy"
                referrerpolicyy="no-referrer-when-downgrade"
              ></iframe>
            </p>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutPage;
