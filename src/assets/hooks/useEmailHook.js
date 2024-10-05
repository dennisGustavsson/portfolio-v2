import { useState, useEffect } from "react";

const useEmail = (encodedEmail) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (encodedEmail) {
      setEmail(atob(encodedEmail));
    }
  }, [encodedEmail]);

  return email;
};

export default useEmail;
