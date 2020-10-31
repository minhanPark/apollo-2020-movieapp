import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

export default () => {
  const { loading, data } = useQuery(GET_MOVIES);
  if (loading) {
    return <h1>loading ....</h1>;
  }
  if (data && data.movies) {
    return data.movies.map((data) => <h1>{data.id}</h1>);
  }
};
