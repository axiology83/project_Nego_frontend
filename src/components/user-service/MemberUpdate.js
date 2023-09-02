import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFn } from "../../NetworkUtils";

function MemberUpdate() {
  const email = useParams().email;
  const [member, setMember] = useState(null);

  useEffect(() => {
    fetchFn(
      "GET",
      `http://localhost:9005/api/member/name/${email}`,
      null
    ).then((data) => {
      setMember(data.result);
    });
  }, [email]);


function onInputHandler(e) {
    let val = e.target.value;
    let newMember = {...member, [e.target.name]:val};
    setMember(newMember);
}

function onSubmitHandler(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const password = formData.get("password");
    const dto ={
        email,
        name,
        password
    }

    console.log(dto);

    fetchFn("PUT", "http://localhost:9005/api/member", dto)
    .then(data => {

        window.location.href=`/member/detail/${data.result.email}`;

    })


}

  return (
  <div>
<h2>회원 정보 수정</h2>
{member !==null &&
<form action ="#" onSubmit={onSubmitHandler}>
    <span className="squaretxt2">email</span> <input value={email} disabled/><br/>
    <span className="squaretxt2">name</span> <input name='name' value={member.name} onInput={onInputHandler}/><br/>
    <span className="squaretxt2">password</span> <input name='password'/><br/>
    <button>수정(비번 수정은 딴데서 하셈)</button>
</form>
}


  </div>);
}

export default MemberUpdate;
