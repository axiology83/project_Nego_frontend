import React from "react";
import { fetchFn } from "../../NetworkUtils";
import { API_URL } from "../../Constants";



function Login() {
  localStorage.setItem("jwt", null);

  function onSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const dto = { email, password };

    fetchFn("POST", `${API_URL}/user-service/login`, dto)
    .then(
      (data) => {
        console.log(data)
        localStorage.setItem("jwt", data.result.token);
        localStorage.setItem("longitude", data.result.longitude);
        localStorage.setItem("latitude", data.result.latitude);
        window.location.href = "/";
      }
    );
  }

  function googleOAuth2BtnClickHandler(e) {
    e.preventDefault();
    window.location.href = `${API_URL}/oauth2/authorization/google`


  }




  return (<>
    <div>
      <form action="#" onSubmit={onSubmitHandler}>
        <div className="topmargin" style={{display: 'inline-block'}}>
        <input style={{width: '445px', height: '33px', margin: '1%'}} placeholder="ID" className="border" name="email" /> <br />
        <input style={{width: '445px', height: '33px', margin: '1%'}} placeholder="PW" className="border" type="password" name="password" /></div>
        <button className="loginbutton" style={{display: 'inline-block', verticalAlign: '-12px' }}></button>
        
      </form>
      <button className="googleoauth2button" onClick={googleOAuth2BtnClickHandler}></button>
    </div>
    <div>
   
    </div>
    </>
  );
}

export default Login;
