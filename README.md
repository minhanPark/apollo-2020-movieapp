# 아폴로 2020 무비앱

## 참고문서

https://www.apollographql.com/docs/react/  
아폴로 클라이언트의 문서

> 문서가 업데이트 되었다.

https://github.com/minhanPark/graphql-movie-back  
백엔드 부분

## 완성 이미지

![홈](https://user-images.githubusercontent.com/29043491/98258780-a22f6c00-1fc4-11eb-9ff7-720469693cfb.png)

![디테일](https://user-images.githubusercontent.com/29043491/98258821-ae1b2e00-1fc4-11eb-834e-b12e740062a8.png)

## graphql 시작하기

```
npm install @apollo/client graphql
```

해당 형태로 환경을 구축할 수 있다.

```js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io", //받아올 주소
  cache: new InMemoryCache(),
});
```

클라이언트를 만드는 ApolloClient, InMemoryCache는 @apollo/client에서 갖고와서 만들면 된다.

> graphql의 경우 여러 엔드포인트를 가지는 것이 아니라 하나의 엔드 포인트를 통해서 그래프 형태로 데이터롤 갖고온다.

```js
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
```

App 컴포넌트를 ApolloProvider로 감싼 뒤에 위에 만든 client를 전달해주면 된다.

## 컴포넌트 안에서 사용하기

```js
// Home.js

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

(...)

export default () => {
  const { loading, data } = useQuery(GET_MOVIES);


};
(...)
```

gql을 통해서 쿼리를 정의하고, 해당 쿼리를 useQuery에 전달하면 loading 값과 data, error를 받을 수 있다.

## 왜 graphql인가?

graphql이 해결하는 점은 무엇일까?  
바로 불필요한 데이터 및 api를 지양하는 것이다.  
api를 요청했을 때 데이터의 값들 중에서 필요한건 name과 age뿐이지만 요청한 데이터에는 해당 엔드포인트에서 주는 모든 것이 담겨져 있다(오버페칭)

또한 인물 정보뿐만 아니라 다른 정보까지 갖고오려면 거기에 맞게 다시 다른 엔드포인트에도 요청을 해야한다.(언더페칭)

**하나의 엔드포인트에서 쿼리를 통해서 해당 문제를 해결하는 것이 graphql**이고  
프론트에서 graphql환경을 쉽게 구축할 수 있도록 만들어주는것이 apollo이다.
