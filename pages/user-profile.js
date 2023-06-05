import React from "react";

const UserProfilePage = (props) => {
  return (
    <div>
      <h1>{props.username}</h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  console.log('serverside code')


  return {
    props: {
      username: "Valentine",
    },
  };
}

export default UserProfilePage;
