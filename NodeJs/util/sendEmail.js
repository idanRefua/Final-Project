const { map } = require("lodash");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  debug: false,
  logger: false,
});

const sendEmailToUser = async (linkToReset, userEmail) => {
  return transport.sendMail(
    {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Hello You want to reset your password?",
      text: `We saw that you want to reset Your password, please enter to the link to change your password , be aware that the link ,
  can be activate for only 30 mintues, after that time the link is Invalid.
  ${linkToReset}
  `,
    },
    function (err, data) {
      if (err) {
        console.log("Error here", err);
      } else {
        throw "Email has been send";
      }
    }
  );
};

const sendCart = (cartArray) => {
  let totalPrice = 0;
  cartArray.forEach((product) => {
    totalPrice += product.price;
  });
  return `<div>${cartArray.map((product) => {
    return `<h4>Product : ${product.title}</h4>
<h4>Price : ${product.price}$ </h4>`;
  })}
<br/>
  <h2>Total : ${totalPrice}$</h2>
</div>
  `;
};

const sendEmailAfterBuyPorducts = async (userName, products, userEmail) => {
  return transport.sendMail(
    {
      from: process.env.EMAIL,
      to: userEmail,
      subject: `Thank You ${userName}`,
      html: `We Happy to see you Buy from us , Thank You ! 
      Here The Products You Buy :
       ${sendCart(products)} `,
    },
    function (err, data) {
      if (err) {
        console.log("Error here", err);
      } else {
        throw "Thank You ! email with the products has been send";
      }
    }
  );
};

module.exports = {
  sendEmailToUser,
  sendEmailAfterBuyPorducts,
};
