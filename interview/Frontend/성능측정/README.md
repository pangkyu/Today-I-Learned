# 성능측정

## 1. 라이트 하우스

웹 성능을 전반적으로 검사하고 성능을 향상하는 가이드를 준다.
<br/>
개발자도구 -> 라이트하우스

### 측정 기준

- First Contentful Paint(FCP) : 페이지가 로드되기 시작한 시점부터 콘텐츠의 일부가 화면에 렌더링될 때까지의 측정된 시간
- Time to Interactive(TCI) : 사용자가 상호작용 가능하기 까지의 시간
- Speed Index : 페이지가 로딩되면서 얼마나 빨리 콘텐츠가 시각적으로 나타났는지까지의 시간
- Total Blocking Time : 메인스레드에서 오래 작업을 할 때 FCP와 TTI사이의 시간
- Largest Contentful Paint(LCP) : 메인콘텐츠(가장 큰 이미지 또는 텍스트)가 로드되기까지의 시간
- Cumulative Layout Shift(CLS) : 예상치못한 레이아웃 이동을 경험하는 빈도

#### hs-graduate-ok.com 의 라이트하우스 측정결과

![](https://velog.velcdn.com/images/pangkyu/post/0a98826b-3554-49ff-9f78-0935b633202f/image.png)

![](https://velog.velcdn.com/images/pangkyu/post/7b5d0970-72b8-4a30-ae2c-3c8e5c920b7b/image.png)

![](https://velog.velcdn.com/images/pangkyu/post/ac829117-8f97-43f7-bea2-92f6e40b8425/image.png)

---

## 2. [PageSpeed Insights](https://pagespeed.web.dev/)

구글에서 개발한 서비스로, 웹 성능 지표를 바탕으로 다양한 웹 성능 영역을 검출한다.

<br/>
심플하게 피씨와 모바일 환경에서 테스트를 진행할 수 있다.
