import { useEffect, useState } from "react";
import axios from "axios";

function getToAxios(url) {
  const [resFromGet, setResFromGet] = useState("");
  const [resFromPost, setResFromPost] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setResFromGet(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
}

function postToAxios(url) {
  useEffect(() => {
    axios
      .post(url)
      .then((res) => {
        console.log(res.data);
        setResFromPost(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
}

export default { getToAxios, postToAxios };
