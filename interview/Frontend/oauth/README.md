# oauth

일반적인 사람들은 많은 서비스를 동일 id, pw를 사용하여 가입하는 데, 보안이 취약한 한 사이트가 털리면 해당 계정으로 타 사이트에 서도 피해가 발생할 가능성이 있다. <br/>
OAuth가 등장하기 이전에는 구글의 AuthSub, 야후의 BBAuth 등 회사가 개발한 방법을 사용하였는데, 이 방식을 표준화한 것이 OAuth이다. 현재는 2.0버전(2012년)으로 사용 중이다.

- 구글, 페이스북, 트위터 등 다양한 플랫폼의 특정 사용자 데이터에 접근하기 위해 제 3자 클라이언트가 사용자의 접근 권한을 위임받을 수 있는 표준 프로토콜이다.

![](https://velog.velcdn.com/images/pangkyu/post/9558a37f-db3b-42e8-86be-0cb8dbef9951/image.png)

### Resource Owner

- 리소스의 소유자. 플랫폼에서 리소스를 소유하고 있는 사용자이다.

### Authorization & Resource Server

- Authorization server는 Resource Owner를 인증하고, 클라이언트에게 액세스 토큰을 발급해주는 서버다.

### Client

- Resource server의 자원을 이용하고자 하는 서비스. 보통 우리가 개발하려는 서비스를 말한다.

## 어플리케이션 등록

- OAuth 2.0 서비스를 이용하기전에 클라이언트를 Resource Server에 등록해야하는 작업이 필요하다.
- 이때, Redirect URI를 등록해야한다. Redirect URI는 사용자가 OAuth 2.0 서비스에서 인증을 마친 뒤 사용자를 리디렉션시킬 위치다.

### Redirect URI

- OAuth 2.0서비스는 인증이 성공한 사용자를 사전 등록된 Redirect URI로 리디렉션 시킨다.
- 승인되지 않은 URI로 리디렉션 될 경우, Authorization code를 중간에 탈취당할 수 있기 때문에.
- Redircet URI는 기본적으로 https만 허용되나 localhost의 경우 예외적으로 http가 허용된다.

### Client ID, Client Secret

- 등록과정을 마치면 Client ID와 Client Secret을 얻을 수 있음. 이것들을 사용하여 액세스 토큰을 획득하는데 사용된다.
- 클라이언트 아이디는 공개되어도 상관없으나, Client Secret은 절대 유출되어서는 안된다.

### Refresh Token

- 리프레시 토큰의 발급 여부와 방법 그리고 갱신 주기등은 OAuth를 제공하는 Resource server마다 상이하다.
- Access Token은 만료기간이 있으며, 만료된 액세스 토큰으로 API를 요청하면 401 에러가 발생한다.
- 액세스 토큰이 만료되어 401 에러가 발생하면 Client는 보관 중이던 Refresh Token을 보내서 새로운 액세스 토큰을 발급받도록 만듭니다.
-
