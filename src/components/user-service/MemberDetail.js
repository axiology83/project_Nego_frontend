import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFn } from "../../NetworkUtils";

function MemberDetail() {
  const [member, setMember] = useState(null);

  const email = useParams().email;

  useEffect(() => {
    fetchFn(
      "GET",
      `http://localhost:9005/api/member/name/${email}`,
      null
    ).then((data) => {
      console.log(data);
      setMember(data.result);
    });
  }, [email]);

  function logout(){
    localStorage.setItem("jwt", null);
    window.location.href = "/"
  }

  return (
    <div>
      {member !== null && (<>
        <div>
          <p className="squaretxt2"><span className="squaretxt1">id</span>&nbsp;{member.id} </p>
          <p className="squaretxt2"><span className="squaretxt1">email</span>&nbsp;{member.email}</p>
          <p className="squaretxt2"><span className="squaretxt1">name</span>&nbsp;{member.name}</p>
          <p className="squaretxt2"><span className="squaretxt1">가입일</span>&nbsp;{member.createDate}</p>
          <p className="squaretxt2"><span className="squaretxt1">최종 수정일</span>&nbsp;{member.updateDate}</p>
        </div>
        <Link to={"/"} className="squaretxt3">홈으로</Link>
        <Link to={`/member/update/${email}`} className="squaretxt3">수정</Link>
        <Link to={`/member/delete/${email}`} className="squaretxt3">삭제</Link>
        <Link to={"/member/insert"} className="squaretxt3">등록</Link>
        <Link onClick={logout} className="squaretxt3">로그 아웃</Link>
        </>
      )}
    </div>
  );
}

export default MemberDetail;
