import "./not-found-page.css";

const NotFoundPage = () => {
  return (
    <div className="container  ">
      <br />
      <br />
      <div className="d-flex align-items-center justify-content-center  box-img-not-found">
        <img
          className="img-fluid img-not-found-page "
          src="https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="Page Not Found"
        />
        <div className="center-text">
          <h2 className="not-found-title">404</h2>
          <p className="text-not-found">
            Ops Someting going wrong , Please try again later
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
